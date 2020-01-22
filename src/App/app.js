/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="IncidentManagement.ts" />
var pageManager;
(function (pageManager_1) {
    window.console.log("Entering pageManager");
    pageManager_1.DEFAULT_PAGE_TITLE = 'ServiceNow Implementation and Maintenance';
    pageManager_1.CONTROLLER_NAME_MAIN_CONTENT = 'mainContentController';
    pageManager_1.CONTROLLER_NAME_DEFAULT_PAGE = 'defaultPageController';
    pageManager_1.SERVICE_NAME_PAGE_MANAGER = 'pageManager';
    pageManager_1.PROVIDER_NAME_PAGE_MANAGER = pageManager_1.SERVICE_NAME_PAGE_MANAGER + 'Provider';
    /**
     * Prefix for hash portion of navigation URI strings.
     * @export
     * @constant HashPrefix
     * @type {"!"}
     */
    pageManager_1.HASH_PREFIX = '!';
    /**
     * Prefix for relative navigation URI path strings.
     * @export
     * @constant NavPrefix
     * @type {"#!"}
     */
    pageManager_1.NAV_PREFIX = '#!';
    /**
     * The main application controller.
     * @export
     * @class MainContentController
     * @implements {ng.IController}
     */
    class MainContentController {
        /**
         * Creates an instance of MainContentController.
         * @param {IMainContentControllerScope} $scope
         * @param {PageTitleService} pageTitleService
         * @memberof MainContentController
         */
        constructor($scope, pageManager, $log) {
            this.$scope = $scope;
            this[Symbol.toStringTag] = pageManager_1.CONTROLLER_NAME_MAIN_CONTENT;
            $log.info("Entering pageManager.MainContentController.constructor($scope, pageManagere, $log)");
            const ctrl = this;
            pageManager.setScope($scope);
            $log.info("Exiting pageManager.MainContentController.constructor($scope, pageManagere, $log)");
        }
        $doCheck() { }
        static getControllerInjectable() {
            window.console.log("Called: pageManager.MainContentController.getControllerInjectable()");
            return ['$scope', 'pageManager', '$log', MainContentController];
        }
    }
    pageManager_1.MainContentController = MainContentController;
    /**
     * Controller for static pages.
     * @export
     * @class DefaultPageController
     * @implements {ng.IController}
     */
    class DefaultPageController {
        constructor($scope, pageManager, $log) {
            this.$scope = $scope;
            this[Symbol.toStringTag] = pageManager_1.CONTROLLER_NAME_DEFAULT_PAGE;
            $log.info("Called pageManager.DefaultPageController.constructor($scope, pageManagere, $log)");
        }
        $doCheck() { }
        static getControllerInjectable() {
            window.console.log("called pageManager.DefaultPageController.getControllerInjectable()");
            return ['$scope', 'pageManager', '$log', DefaultPageController];
        }
    }
    pageManager_1.DefaultPageController = DefaultPageController;
    /**
     * Service which provides page-related information and tracks and updates the current app page title.
     * @export
     * @class pageManager.Service
     */
    class Service {
        constructor($rootScope, $log, _pageRouteInfo) {
            this.$rootScope = $rootScope;
            this.$log = $log;
            this._pageRouteInfo = _pageRouteInfo;
            this._pageTitle = pageManager_1.DEFAULT_PAGE_TITLE;
            this._pageSubTitle = '';
            this[Symbol.toStringTag] = pageManager_1.SERVICE_NAME_PAGE_MANAGER;
            $log.info("Entering pageManager.Service.constructor($rootScope, $log, _pageRouteInfo)");
            const svc = this;
            this.setCurrentRoute(this._pageRouteInfo[0]);
            $rootScope.$on('$routeChangeSuccess', function (event, current) {
                $log.info("Entering pageManager.Service.$rootScope.$on('$routeChangeSuccess', { (event: ng.IAngularEvent, current: " + ng.toJson({ name: current.name }) + "): void; })");
                if (typeof current.name !== 'string') {
                    $log.warn("Exiting pageManager.Service.$rootScope.$on('$routeChangeSuccess', { (event: ng.IAngularEvent, current: " + ng.toJson({ name: current.name }) + "): void; }) - no route name");
                    return;
                }
                svc._currentRoute = current;
                let routeInfo = svc.getRouteInfoById(current.name);
                if (typeof routeInfo !== 'undefined')
                    svc.setCurrentRoute(routeInfo);
                $log.info("Exiting pageManager.Service.$rootScope.$on('$routeChangeSuccess', { (event: ng.IAngularEvent, current: " + ng.toJson({ name: current.name }) + "): void; })");
            });
            $log.info("Exiting pageManager.Service.constructor($rootScope, $log, _pageRouteInfo)");
        }
        getRouteInfoById(id) {
            this.$log.info("Entering pageManager.Service.getRouteInfoById(id: " + ng.toJson(id) + ")");
            for (let i = 0; i < this._pageRouteInfo.length; i++) {
                if (this._pageRouteInfo[i].id === id) {
                    this.$log.info("Exiting pageManager.Service.getRouteInfoById(id: " + ng.toJson(id) + "): route found at index " + i);
                    return this._pageRouteInfo[i];
                }
            }
            this.$log.warn("Exiting pageManager.Service.getRouteInfoById(id: " + ng.toJson(id) + "): no route found");
        }
        currentPage() { return this._currentRouteInfo; }
        currentRoute() { return this._currentRoute; }
        setCurrentRoute(route) {
            this.$log.info("Entering pageManager.Service.setCurrentRoute(route: " + ng.toJson(route, true) + ")");
            if (Provider.isRouteRedirectInfo(route)) {
                this.$log.info("Exiting pageManager.Service.setCurrentRoute(route: " + ng.toJson(route, true) + "): Provider.isRouteRedirectInfo(route) == true");
                return;
            }
            this._currentRouteInfo = route;
            if (Provider.routeInfoUsesDefaultController(route)) {
                if (route.subTitle === 'string' && route.subTitle.length > 0)
                    this.pageTitle(route.title, route.subTitle);
                else
                    this.pageTitle(route.title);
                this.$log.info("Exiting pageManager.Service.setCurrentRoute(route: " + ng.toJson(route, true) + "): Using default controller");
            }
            else
                this.$log.info("Exiting pageManager.Service.setCurrentRoute(route: " + ng.toJson(route, true) + "): Using controller defined by route");
        }
        pageTitle(value, subTitle) {
            this.$log.info("Entering pageManager.Service.setCurrentRoute(value: " + ng.toJson(value) + ", subTitle: " + ng.toJson(subTitle) + ")");
            if (typeof value === 'string') {
                this._pageTitle = ((value = value.trim()).length == 0) ? pageManager_1.DEFAULT_PAGE_TITLE : value;
                this._pageSubTitle = (typeof subTitle === 'string') ? subTitle : '';
                if (typeof this._mainScope !== 'undefined') {
                    this._mainScope.pageTitle = this._pageTitle;
                    this._mainScope.subTitle = this._pageSubTitle;
                    this._mainScope.showSubtitle = this._pageSubTitle.trim().length > 0;
                }
            }
            this.$log.info("Exiting pageManager.Service.setCurrentRoute(value: " + ng.toJson(value) + ", subTitle: " + ng.toJson(subTitle) + "): " + ng.toJson({
                _mainScope: {
                    pageTitle: this._mainScope.pageTitle,
                    subTitle: this._mainScope.subTitle,
                    showSubtitle: this._mainScope.showSubtitle
                },
                "return": this._pageTitle
            }, true));
            return this._pageTitle;
        }
        /**
         * Gets the current page subtitle.
         * @returns {string} - The current page subtitle title or an empty string if there is currently no subtitle.
         * @memberof PageLocationService
         */
        pageSubTitle(value) { return this._pageSubTitle; }
        /**
         * This should only be called by the main controller so the main controller's page title properties can be updated.
         * @param {IPageTitleScope & INavigationScope} scope - The scope of the main application controller.
         * @memberof PageLocationService
         */
        setScope(scope) {
            this.$log.info("Entering: pageManager.Service.setScope(IPageTitleScope)");
            if (typeof scope !== 'object' || scope === null) {
                this.$log.warn("Exiting: pageManager.Service.setScope(scope: " + ng.toJson(scope) + "): invalid scope ogbject");
                return;
            }
            (this._mainScope = scope).pageTitle = this._pageTitle;
            scope.showSubtitle = (scope.subTitle = this._pageSubTitle).trim().length > 0;
            this.$log.info("Exiting pageManager.Service.setScope(IPageTitleScope): " + ng.toJson({
                scope: {
                    pageTitle: scope.pageTitle,
                    subTitle: scope.subTitle,
                    showSubtitle: scope.showSubtitle
                }
            }, true));
        }
    }
    pageManager_1.Service = Service;
    class Provider {
        constructor() {
            this[Symbol.toStringTag] = pageManager_1.PROVIDER_NAME_PAGE_MANAGER;
            window.console.log("Called pageManager.Provider.constructor()");
        }
        get $get() {
            window.console.log("Called pageManager.Provider.$get()");
            let provider = this;
            return ['$rootScope', '$log', function pageManagerFactory($rootScope, $log) {
                    window.console.log("Called pageManager.Provider.$get()->pageManagerFactory($rootScope: ng.IRootScopeService, $log: ng.ILogService)");
                    return new Service($rootScope, $log, provider.getRouteInfo());
                }];
        }
        getRouteInfo() {
            return this._pageRouteInfo.map(function (value, index) {
                if (Provider.isRouteRedirectInfo(value))
                    return value;
                if (typeof value.id !== "string")
                    value.id = "__page" + index;
                return value;
            });
        }
        static isRouteRedirectInfo(routeInfo) {
            return typeof routeInfo === "object" && routeInfo !== null && typeof routeInfo.redirectTo === "string";
        }
        static routeInfoHasPageTemplateUrl(routeInfo) {
            return typeof routeInfo === "object" && routeInfo !== null && typeof routeInfo.templateUrl === "string";
        }
        static routeInfoHasPageTemplateString(routeInfo) {
            return typeof routeInfo === "object" && routeInfo !== null && typeof routeInfo.template === "string";
        }
        static routeInfoHasExplicitController(routeInfo) {
            return typeof routeInfo === "object" && routeInfo !== null && typeof routeInfo.title !== "string";
        }
        static routeInfoUsesDefaultController(routeInfo) {
            return typeof routeInfo === "object" && routeInfo !== null && typeof routeInfo.title === "string";
        }
        ConfigureRoutes($routeProvider, $locationProvider, routes) {
            window.console.log("Entering pageManager.Provider.ConfigureRoutes(ng.route.IRouteProvider, ng.ILocationProvider, routes: " + ng.toJson(routes, true) + ")");
            this._pageRouteInfo = routes;
            $locationProvider.hashPrefix(pageManager_1.HASH_PREFIX);
            routes.forEach(function (value) {
                let routeDef;
                if (Provider.isRouteRedirectInfo(value))
                    routeDef = { redirectTo: value.redirectTo };
                else {
                    if (Provider.routeInfoUsesDefaultController(value))
                        routeDef = { controller: pageManager_1.CONTROLLER_NAME_DEFAULT_PAGE, controllerAs: pageManager_1.CONTROLLER_NAME_DEFAULT_PAGE };
                    else {
                        routeDef = { controller: value.controller };
                        if (typeof value.controllerAs === 'string')
                            routeDef.controllerAs = value.controllerAs;
                    }
                    routeDef.name = value.id;
                    if (Provider.routeInfoHasPageTemplateUrl(value))
                        routeDef.templateUrl = value.templateUrl;
                    else
                        routeDef.template = value.template;
                    if (typeof value.caseInsensitiveMatch === "boolean")
                        routeDef.caseInsensitiveMatch = value.caseInsensitiveMatch;
                    if (typeof value.reloadOnSearch === "boolean")
                        routeDef.reloadOnSearch = value.reloadOnSearch;
                    if (typeof value.resolve === "object" && value.resolve !== null)
                        routeDef.resolve = value.resolve;
                }
                $routeProvider.when(value.route, routeDef);
            });
            window.console.log("Exiting pageManager.Provider.ConfigureRoutes(ng.route.IRouteProvider, ng.ILocationProvider, (RouteTemplateUrl | RouteTemplateString | RouteTemplateUrlDefaultController | RouteTemplateStringDefaultController | RouteRedirectInfo)[])");
        }
    }
    pageManager_1.Provider = Provider;
    window.console.log("Exiting pageManager");
})(pageManager || (pageManager = {}));
/**
 * The main application namespace.
 * @namespace
 */
var app;
(function (app) {
    window.console.log("Entering app");
    /**
     * The main module for this app.
     * @export
     * @constant {ng.IModule}
     */
    app.appModule = angular.module("app", ['ngRoute'])
        .provider(pageManager.SERVICE_NAME_PAGE_MANAGER, pageManager.Provider)
        .config(['$locationProvider', '$routeProvider', 'pageManagerProvider',
        function ($locationProvider, $routeProvider, pageManagerProvider) {
            window.console.log("Entering app.config()");
            pageManagerProvider.ConfigureRoutes($routeProvider, $locationProvider, [
                {
                    templateUrl: 'Template/Pages/Home.htm',
                    route: '/home',
                    title: pageManager.DEFAULT_PAGE_TITLE,
                    linkTitle: "Home"
                },
                {
                    id: 'implementation',
                    templateUrl: 'Template/Pages/Implementation/Index.htm',
                    route: '/implementation',
                    title: 'ServiceNow Implementation Notes',
                    linkTitle: 'Implementation Notes'
                },
                {
                    parentId: 'implementation',
                    templateUrl: 'Template/Pages/Implementation/ServiceCatalog.htm',
                    route: '/implementation/serviceCatalog',
                    title: 'ServiceNow Implementation Notes',
                    subTitle: 'Service Catalog',
                    linkTitle: 'Service Catalog'
                },
                {
                    parentId: 'implementation',
                    templateUrl: 'Template/Pages/Implementation/Incident.htm',
                    route: '/implementation/incident',
                    controller: incidentManagment.CONTROLLER_NAME_INCIDENT_MGMT,
                    controllerAs: 'incidentManagment',
                    linkTitle: 'Incident Management'
                },
                {
                    parentId: 'implementation',
                    templateUrl: 'Template/Pages/Implementation/Change.htm',
                    route: '/implementation/change',
                    title: 'ServiceNow Implementation Notes',
                    subTitle: 'Change Management',
                    linkTitle: 'Change Management'
                },
                {
                    parentId: 'implementation',
                    templateUrl: 'Template/Pages/Implementation/Security.htm',
                    route: '/implementation/security',
                    title: 'ServiceNow Implementation Notes',
                    subTitle: 'Security Operations',
                    linkTitle: 'Security Operations'
                },
                {
                    templateUrl: 'Template/Pages/InitialConfig.htm',
                    route: '/initialConfig',
                    title: 'Initial Configuration Instructions',
                    linkTitle: 'Initial Config'
                },
                {
                    id: 'dev',
                    templateUrl: 'Template/Pages/Dev/Index.htm',
                    route: '/dev',
                    title: 'Development Resources',
                    linkTitle: 'Dev Resources'
                },
                {
                    parentId: 'dev',
                    templateUrl: 'Template/Pages/Dev/Notes.htm',
                    route: '/dev/notes',
                    title: 'Development Resources',
                    subTitle: 'Development Notes',
                    linkTitle: 'Notes'
                },
                {
                    parentId: 'dev',
                    templateUrl: 'Template/Pages/Dev/Git.htm',
                    route: '/dev/git',
                    title: 'Development Resources',
                    subTitle: 'Git Notes',
                    linkTitle: 'Git'
                },
                {
                    parentId: 'dev',
                    templateUrl: 'Template/Pages/Dev/Azure.htm',
                    route: '/dev/azure',
                    title: 'Development Resources',
                    subTitle: 'Azure Notes',
                    linkTitle: 'Azure'
                },
                {
                    parentId: 'dev',
                    templateUrl: 'Template/Pages/Dev/Snippets.htm',
                    route: '/dev/snippets',
                    title: 'Development Resources',
                    subTitle: 'Code Snippets',
                    linkTitle: 'Snippets'
                },
                {
                    parentId: 'dev',
                    templateUrl: 'Template/Pages/Dev/SiteDesign.htm',
                    route: '/dev/siteDesign',
                    title: 'Development Resources',
                    subTitle: "Documentation Website Design Notes",
                    linkTitle: "Site Design"
                },
                { route: '/', redirectTo: "/home" }
            ]);
            window.console.log('Exiting  app.config()');
        }])
        .controller(pageManager.CONTROLLER_NAME_MAIN_CONTENT, pageManager.MainContentController.getControllerInjectable())
        .controller(pageManager.CONTROLLER_NAME_DEFAULT_PAGE, pageManager.DefaultPageController.getControllerInjectable());
    //// #region appContent directive.
    ///**
    // * Defines the directive name as "appContent".
    // * @export
    // * @constant {string}
    // */
    //export const DIRECTIVE_NAME_appContentDirective: string = "appContent";
    ///**
    // *
    // *
    // * @interface IDirectiveScope
    // * @extends {ng.IScope}
    // */
    //export interface IAppContentDirectiveScope extends ng.IScope {
    //    /**
    //     * The controller associated with the current scope.
    //     *
    //     * @type {appContentController}
    //     * @memberof IDirectiveScope
    //     */
    //    appContentController: appContentController;
    //    /**
    //     * The title of the current page.
    //     *
    //     * @type {string}
    //     * @memberof IDirectiveScope
    //     */
    //    pageTitle: string;
    //    /**
    //     * The value of the GIT repository URL field in the edit setup parameters dialog.
    //     *
    //     * @type {string}
    //     * @memberof IDirectiveScope
    //     */
    //    serviceNowUrl: string;
    //    /**
    //     * Indicates whether the ServiceNow URL field in the edit setup parameters dialog is valid.
    //     *
    //     * @type {boolean}
    //     * @memberof IDirectiveScope
    //     */
    //    serviceNowUrlIsValid: boolean;
    //    /**
    //     * The value of the GIT repository URL field in the edit setup parameters dialog.
    //     *
    //     * @type {string}
    //     * @memberof IDirectiveScope
    //     */
    //    gitServiceUrl: string;
    //    /**
    //     * Indicates whether the GIT repository URL field in the edit setup parameters dialog is valid.
    //     *
    //     * @type {boolean}
    //     * @memberof IDirectiveScope
    //     */
    //    gitServiceUrlIsValid: boolean;
    //    idpUrl: string;
    //    idpUrlIsValid: boolean;
    //    /**
    //     * Indicates whether all fields in the edit setup parameters dialog are valid.
    //     *
    //     * @type {boolean}
    //     * @memberof IDirectiveScope
    //     */
    //    setupParametersAreInvalid: boolean;
    //    /**
    //     * Indicates whether the edit setup parameters dialog is being displayed.
    //     *
    //     * @type {boolean}
    //     * @memberof IDirectiveScope
    //     */
    //    setupParametersDialogVisible: boolean;
    //    /**
    //     * Navigation menu items to be displayed in the primary navigation menu.
    //     *
    //     * @type {ReadonlyArray<NavigationItem>}
    //     * @memberof IDirectiveScope
    //     */
    //    topNavItems: ReadonlyArray<navConfigLoaderService.NavigationItem>;
    //    /**
    //     * Indicates whether the secondary navigation menu is to be displayed.
    //     *
    //     * @type {boolean}
    //     * @memberof IDirectiveScope
    //     */
    //    showSideMenu: boolean;
    //    /**
    //     * Ancestor navigation menu items to be displayed in the secondary navigation menu.
    //     *
    //     * @type {ReadonlyArray<NavigationItem>}
    //     * @memberof IDirectiveScope
    //     */
    //    sideNavBreadcrumbItems: ReadonlyArray<navConfigLoaderService.NavigationItem>;
    //    /**
    //     * Indicates whether ancestor navigation menu items are to be displayed in the secondary navigation menu.
    //     *
    //     * @type {boolean}
    //     * @memberof IDirectiveScope
    //     */
    //    showBreadcrumbLinks: boolean;
    //    /**
    //     * Indicates whether the child/sibling navigation menu items are to be displayed in the secondary navigation menu.
    //     *
    //     * @type {boolean}
    //     * @memberof IDirectiveScope
    //     */
    //    showSideNavItems: boolean;
    //    /**
    //     * Heading text for the secondary navigation menu.
    //     *
    //     * @type {string}
    //     * @memberof IDirectiveScope
    //     */
    //    sideNavHeading: string;
    //    /**
    //     * Indicates whether a heading is to be displayed in the secondary navigation menu.
    //     *
    //     * @type {boolean}
    //     * @memberof IDirectiveScope
    //     */
    //    showSideNavHeading: boolean;
    //    /**
    //     * Navigation menu items within the secondary navigation menu, exclusing any that represents the current page or sibling items following the one that represents the current page.
    //     *
    //     * @type {ReadonlyArray<NavigationItem>}
    //     * @memberof IDirectiveScope
    //     */
    //    sideNavItems: ReadonlyArray<navConfigLoaderService.NavigationItem>;
    //    /**
    //     * Indicates whether navigation menu item representing the current page is to be displayed in the secondary navigation menu.
    //     *
    //     * @type {boolean}
    //     * @memberof IDirectiveScope
    //     */
    //    showCurrentItem: boolean;
    //    /**
    //     * Navigation menu item representing the current page.
    //     *
    //     * @type {ReadonlyArray<NavigationItem>}
    //     * @memberof IDirectiveScope
    //     */
    //    currentNavItem?: navConfigLoaderService.NavigationItem;
    //    /**
    //     * Navigation menu items within the secondary navigation menu that follow the item representing the current page.
    //     *
    //     * @type {ReadonlyArray<NavigationItem>}
    //     * @memberof IDirectiveScope
    //     */
    //    followingSideNavItems: ReadonlyArray<navConfigLoaderService.NavigationItem>;
    //    /**
    //     * CSS class names for the main content section.
    //     *
    //     * @type {string[]}
    //     * @memberof IDirectiveScope
    //     */
    //    mainSectionClass: string[];
    //    ///**
    //    // * Indicates whether the main modal popup dialog is being displayed.
    //    // *
    //    // * @type {boolean}
    //    // * @memberof IDirectiveScope
    //    // */
    //    //popupDialogVisible: boolean;
    //    ///**
    //    // * The title of the modal popup dialog.
    //    // *
    //    // * @type {string}
    //    // * @memberof IDirectiveScope
    //    // */
    //    //popupDialogTitle: string;
    //    ///**
    //    // * Message text for modal popup dialog.
    //    // *
    //    // * @type {string}
    //    // * @memberof IDirectiveScope
    //    // */
    //    //popupDialogMessage: string;
    //    ///**
    //    // * Buttons to be displayed in modal popup dialog.
    //    // *
    //    // * @type {IPopupDialogButtonConfig[]}
    //    // * @memberof IDirectiveScope
    //    // */
    //    //popupDialogButtons: IPopupDialogButtonConfig[];
    //    ///**
    //    // * The callback to invoke when the modal popup dialog has been closed.
    //    // *
    //    // * @type {{ (result?: any): void; }}
    //    // * @param {*} [result] - The dialog result value.
    //    // * @memberof IDirectiveScope
    //    // */
    //    //onPopupDialogClose?: { (result?: any): void; };
    //    /**
    //     * CSS class names for the modal popup dialog body element.
    //     *
    //     * @type {string[]}
    //     * @memberof IDirectiveScope
    //     */
    //    //popupDialogBodyClass: string[];
    //}
    ///**
    // * Implements the controller for the appContent directive
    // * @class Controller
    // * @implements {ng.IController}
    // */
    //export class appContentController implements ng.IController {
    //    /**
    //     * Creates an instance of the controller for the appContent directive.
    //     *
    //     * @param {IAppContentDirectiveScope} $scope - The scope for the current appContent directive.
    //     * @param {ng.ILogService} $log - The $log service.
    //     * @param {ng.IWindowService} $window - The $window service.
    //     * @param {appConfigDataService} appConfigData - The appConfigData service.
    //     * @memberof Controller
    //     */
    //    constructor(private $scope: IAppContentDirectiveScope, private $log: ng.ILogService, private $window: ng.IWindowService, private navConfigLoader: navConfigLoaderService.Service, private appConfigLoader: appConfigLoaderService.Service) {
    //        $scope.serviceNowUrlIsValid = $scope.gitServiceUrlIsValid = $scope.idpUrlIsValid = $scope.setupParametersAreInvalid = true;
    //        $scope.setupParametersDialogVisible = $scope.showSideMenu = $scope.showBreadcrumbLinks = $scope.showSideNavItems = $scope.showSideNavHeading = $scope.showCurrentItem = false;
    //        $scope.topNavItems = $scope.sideNavBreadcrumbItems = $scope.sideNavItems = $scope.followingSideNavItems = [];
    //        $scope.sideNavHeading = '';
    //        appConfigLoader.onServiceNowUrlChanged($scope, (url: URL) => {
    //            $scope.serviceNowUrl = url.href;
    //        });
    //        $scope.serviceNowUrl = appConfigLoader.serviceNowUrl().href;
    //        appConfigLoader.onGitServiceUrlChanged($scope, (url: URL) => {
    //            $scope.gitServiceUrl = url.href;
    //        });
    //        $scope.gitServiceUrl = appConfigLoader.gitServiceUrl().href;
    //        appConfigLoader.onIdpUrlChanged($scope, (url: URL) => {
    //            $scope.idpUrl = url.href;
    //        });
    //        $scope.idpUrl = appConfigLoader.idpUrl().href;
    //        this.updateMainSectionClass();
    //        navConfigLoader.loadPageTitle().then((title: string) => { $scope.pageTitle = title; });
    //        $scope.$watchGroup(['serviceNowUrlIsValid', 'gitServiceUrlIsValid', 'idpUrlIsValid'], () => {
    //            let areValid: boolean = $scope.serviceNowUrlIsValid && $scope.gitServiceUrlIsValid && $scope.idpUrlIsValid;
    //            if (areValid !== $scope.setupParametersAreInvalid)
    //                $scope.setupParametersAreInvalid = !areValid;
    //        });
    //        $scope.setupParametersAreInvalid = !($scope.serviceNowUrlIsValid && $scope.gitServiceUrlIsValid && $scope.idpUrlIsValid);
    //        navConfigLoader.loadTopNavItems().then((items: navConfigLoaderService.NavigationItem[]) => { $scope.topNavItems = items; });
    //        let ctrl: appContentController = this;
    //        navConfigLoader.loadCurrentItem().then((currentNavItem: navConfigLoaderService.NavigationItem) => {
    //            if (sys.isNil(currentNavItem)) {
    //                $scope.showBreadcrumbLinks = $scope.showSideMenu = $scope.showSideNavHeading = $scope.showSideNavItems = $scope.showCurrentItem = false;
    //                $scope.sideNavHeading = '';
    //                $scope.sideNavBreadcrumbItems = $scope.sideNavItems = $scope.followingSideNavItems = [];
    //                $scope.currentNavItem = undefined;
    //            } else {
    //                if (currentNavItem.isNestedNavItem) {
    //                    $scope.showBreadcrumbLinks = ($scope.sideNavBreadcrumbItems = currentNavItem.getBreadcrumbLinks()).length > 0;
    //                    let parentNavItem: navConfigLoaderService.NavigationItem = currentNavItem.parentNavItem;
    //                    if (currentNavItem.hasSiblingNavItem) {
    //                        $scope.showSideMenu = $scope.showSideNavItems = $scope.showCurrentItem = true;
    //                        $scope.sideNavItems = currentNavItem.precedingSiblings();
    //                        $scope.followingSideNavItems = currentNavItem.followingSiblings();
    //                        $scope.showSideNavHeading = ($scope.sideNavHeading = parentNavItem.sideNavHeading.trim()).length > 0;
    //                        $scope.currentNavItem = currentNavItem;
    //                    } else {
    //                        $scope.showSideNavItems = $scope.showSideNavHeading = $scope.showCurrentItem = false;
    //                        $scope.followingSideNavItems = $scope.sideNavItems = [];
    //                        $scope.showSideMenu = $scope.showBreadcrumbLinks;
    //                        $scope.sideNavHeading = '';
    //                        $scope.currentNavItem = undefined;
    //                    }
    //                } else {
    //                    $scope.currentNavItem = undefined;
    //                    $scope.showBreadcrumbLinks = $scope.showCurrentItem = false;
    //                    $scope.sideNavBreadcrumbItems = $scope.followingSideNavItems = [];
    //                    $scope.showSideMenu = $scope.showSideNavItems = currentNavItem.hasChildNavItem;
    //                    if ($scope.showSideMenu) {
    //                        $scope.showSideNavHeading = ($scope.sideNavHeading = currentNavItem.sideNavHeading.trim()).length > 0;
    //                        $scope.sideNavItems = currentNavItem.childNavItems;
    //                    } else {
    //                        $scope.sideNavItems = [];
    //                        $scope.sideNavHeading = '';
    //                        $scope.showSideNavHeading = $scope.showSideNavItems = false;
    //                    }
    //                }
    //            }
    //            ctrl.updateMainSectionClass();
    //        }, (reason: any) => {
    //            $log.error(angular.toJson({
    //                message: "Error loading application settings",
    //                reason: reason
    //            }, true));
    //            $window.alert("Unexpected error loading application settings. See browser log for more detail.");
    //        });
    //    }
    //    private updateMainSectionClass() {
    //        if (this.$scope.showSideMenu)
    //            this.$scope.mainSectionClass = ["container-fluid", "col-8", "col-lg-9"];
    //        else
    //            this.$scope.mainSectionClass = ["container-fluid", "col-12"];
    //    }
    //    /**
    //     * Opens the edit dialog for setup parameters.
    //     *
    //     * @param {JQueryInputEventObject} [event] - The event object.
    //     * @memberof Controller
    //     */
    //    openSetupParametersEditDialog(event?: JQueryInputEventObject): void {
    //        sys.preventEventDefault(event);
    //        if (!this.$scope.setupParametersDialogVisible) {
    //            $("#setupParametersDialog").modal('show');
    //            this.$scope.setupParametersDialogVisible = true;
    //        }
    //    }
    //    /**
    //     * Closes the edit dialog for setup parameters.
    //     *
    //     * @param {JQueryInputEventObject} [event] - The event object.
    //     * @param {boolean} [accept] - Whether to accept any validated changes that were made.
    //     * @memberof Controller
    //     */
    //    closeSetupParametersEditDialog(event?: JQueryInputEventObject, accept?: boolean): void {
    //        sys.preventEventDefault(event);
    //        if (this.$scope.setupParametersDialogVisible) {
    //            $("#setupParametersDialog").modal('hide');
    //            this.$scope.setupParametersDialogVisible = false;
    //        }
    //    }
    //    $onInit(): void { }
    //}
    //appModule.directive(DIRECTIVE_NAME_appContentDirective, () => {
    //    return {
    //        controller: ['$scope', '$log', '$window', navConfigLoaderService.SERVICE_NAME, appConfigLoaderService.SERVICE_NAME, appContentController],
    //        controllerAs: 'appContentController',
    //        restrict: "E",
    //        scope: true,
    //        templateUrl: 'Template/appContent.htm',
    //        transclude: true
    //    };
    //});
    //// #endregion
    // #region copyToClipboardButton directive and copyToClipboardService.
    /**
     * Defines the copy service name as "copyToClipboardService".
     * @export
     * @constant {string}
     */
    app.SERVICE_NAME_copyToClipboard = "copyToClipboardService";
    /**
     * Defines the copy directive name as "copyToClipboardButton".
     *
     * @todo Rename to buttonCopyToClipboard to use as <button:copy-to-clipboard />
     * @export
     * @constant {string}
     */
    app.DIRECTIVE_NAME_copyToClipboard = "copyToClipboardButton";
    const btnCssClassRe = /(^|\s)btn(\s|$)/g;
    const btnStyleCssClassRe = /(^|\s)btn-\S/g;
    const paddingCssClassRe = /(^|\s)p(l|t|r|b)?-\S/g;
    class copyToClipboardService {
        constructor($window) {
            this.$window = $window;
            this[Symbol.toStringTag] = app.SERVICE_NAME_copyToClipboard;
        }
        copy(element, successMsg) {
            try {
                element.text();
                let range = this.$window.document.createRange();
                range.selectNode(element[0]);
                let selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                this.$window.document.execCommand('copy');
                selection.removeAllRanges();
                if ((typeof successMsg === "string") && (successMsg = successMsg.trim()).length > 0)
                    alert(successMsg);
                else
                    alert('Text copied to clipboard');
            }
            catch (ex) {
                alert('Failed to copy to clipboard: ' + ex);
            }
        }
    }
    app.copyToClipboardService = copyToClipboardService;
    class copyToClipboardButtonController {
        constructor($scope, copyToClipboardService) {
            this.$scope = $scope;
            this.copyToClipboardService = copyToClipboardService;
        }
        get cssClass() { return this._cssClass; }
        get targetId() { return this._targetId; }
        copyToClipboard(event) {
            try {
                this.copyToClipboardService.copy($("#" + this._targetId), this._successMessage);
            }
            finally {
                sys.preventEventDefault(event);
            }
        }
        static createDirective() {
            return {
                restrict: "E",
                controllerAs: "ctrl",
                controller: ["$scope", "copyToClipboardService", copyToClipboardButtonController],
                replace: true,
                template: '<button ng-click="ctrl.copyToClipboard(event)"><svg class="fill-light stroke-dark" width="16" height="16"><use xlink:href="images/icons.svg#clipboard"></use></svg></button>',
                link: (scope, element, attr, controller) => {
                    scope.ctrl.initialize(attr.target, attr.successMessage, attr.class);
                }
            };
        }
        initialize(targetId, successMessage, cssClass) {
            this._targetId = targetId;
            this._successMessage = successMessage;
            if (typeof cssClass === "string" && (cssClass = cssClass.trim()).length > 0) {
                this._cssClass = sys.unique(cssClass.split(sys.whitespaceRe));
                if (this._cssClass.indexOf('btn') < 0)
                    this._cssClass.unshift('btn');
                if (!btnStyleCssClassRe.test(cssClass)) {
                    this._cssClass.push("btn-light");
                    this._cssClass.push("btn-outline-dark");
                }
                if (!paddingCssClassRe.test(cssClass))
                    this._cssClass.push("p-1");
            }
            else
                this._cssClass = ['btn', 'btn-light', 'btn-outline-dark', 'p-1'];
        }
        $onInit() { }
    }
    app.copyToClipboardButtonController = copyToClipboardButtonController;
    app.appModule.service(app.SERVICE_NAME_copyToClipboard, ["$window", copyToClipboardService]);
    app.appModule.directive(app.DIRECTIVE_NAME_copyToClipboard, copyToClipboardButtonController.createDirective);
    // #endregion
    // #region urlBuilderService
    const uriParseRegex = /^(([^\\\/@:]*)(:[\\\/]{0,2})((?=[^\\\/@:]*(?::[^\\\/@:]*)?@)([^\\\/@:]*)(:[^\\\/@:]*)?@)?([^\\\/@:]*)(?:(?=:\d*(?:[\\\/:]|$)):(\d*))?(?=[\\\/:]|$))?(.+)?$/;
    const originParseRegex = /^(([^\\\/@\s?#:]+)(:\/{0,2})((?=[^\\\/@?#:]*(?::[^\\\/@?#:]*)?@)([^\\\/@?#:]*)(:[^\\\/@?#:]*)?@)?(?:([^\\\/@?#\s:]+)(?:(?=:\d*(?:[\\\/:]|$)):(\d*))?)?)([\/:])?$/;
    const schemeNameRegex = /^([^\\\/@\s:]+):?$/;
    const schemeSeparatorRegex = /^:(\/\/?)?$/;
    const hostRegex = /^([^\\\/?#@\s"]+)(:\d+)?$/;
    const fileSystemPathRegex = /^([a-z]:([\\\/]([^\\\/?#:]|$)|$)|[\\\/]{2}[^\\\/?#:]+)/i;
    let uriParseGroup;
    (function (uriParseGroup) {
        uriParseGroup[uriParseGroup["all"] = 0] = "all";
        uriParseGroup[uriParseGroup["origin"] = 1] = "origin";
        uriParseGroup[uriParseGroup["schemeName"] = 2] = "schemeName";
        uriParseGroup[uriParseGroup["schemeSeparator"] = 3] = "schemeSeparator";
        uriParseGroup[uriParseGroup["userInfo"] = 4] = "userInfo";
        uriParseGroup[uriParseGroup["username"] = 5] = "username";
        uriParseGroup[uriParseGroup["password"] = 6] = "password";
        uriParseGroup[uriParseGroup["hostname"] = 7] = "hostname";
        uriParseGroup[uriParseGroup["portnumber"] = 8] = "portnumber";
        uriParseGroup[uriParseGroup["path"] = 9] = "path";
    })(uriParseGroup || (uriParseGroup = {}));
    class SchemaProperties {
        constructor(name, properties, description) {
            this.name = name;
            description = ((typeof description !== "string") || (description = description.trim()).length == 0) ? "\"" + name + "\" scheme" : description;
            if (typeof (properties) === 'undefined' || properties === null) {
                this.supportsPath = true;
                this.supportsQuery = true;
                this.supportsFragment = true;
                this.supportsCredentials = true;
                this.requiresHost = false;
                this.supportsPort = true;
                this.requiresUsername = false;
                this.defaultPort = NaN;
                this.schemeSeparator = "://";
            }
            else {
                this.supportsPath = (typeof (properties.supportsPath) !== 'boolean' || properties.supportsPath === true);
                this.supportsQuery = (typeof (properties.supportsQuery) !== 'boolean' || properties.supportsQuery === true);
                this.supportsFragment = (typeof (properties.supportsFragment) !== 'boolean' || properties.supportsFragment === true);
                this.supportsCredentials = (typeof (properties.supportsCredentials) !== 'boolean' || properties.supportsCredentials === true);
                this.requiresHost = (typeof (properties.requiresHost) !== 'boolean' || properties.requiresHost === true);
                this.supportsPort = (typeof (properties.supportsPort) !== 'boolean' || properties.supportsPort === true);
                this.requiresUsername = (typeof (properties.requiresUsername) === 'boolean' && properties.requiresUsername === true);
                this.defaultPort = properties.defaultPort;
                this.schemeSeparator = (typeof (properties.schemeSeparator) == 'string') ? properties.schemeSeparator : "://";
            }
        }
        static getSchemaProperties(name) {
            if (name.endsWith(':'))
                name = name.substr(0, name.length - 1);
            switch (name) {
                case 'ftp':
                    return SchemaProperties.uriScheme_ftp;
                case 'ftps':
                    return SchemaProperties.uriScheme_ftps;
                case 'sftp':
                    return SchemaProperties.uriScheme_sftp;
                case 'http':
                    return SchemaProperties.uriScheme_http;
                case 'https':
                    return SchemaProperties.uriScheme_https;
                case 'gopher':
                    return SchemaProperties.uriScheme_gopher;
                case 'mailto':
                    return SchemaProperties.uriScheme_mailto;
                case 'news':
                    return SchemaProperties.uriScheme_news;
                case 'nntp':
                    return SchemaProperties.uriScheme_nntp;
                case 'telnet':
                    return SchemaProperties.uriScheme_telnet;
                case 'wais':
                    return SchemaProperties.uriScheme_wais;
                case 'file':
                    return SchemaProperties.uriScheme_file;
                case 'net.pipe':
                    return SchemaProperties.uriScheme_netPipe;
                case 'net.tcp':
                    return SchemaProperties.uriScheme_netTcp;
                case 'ldap':
                    return SchemaProperties.uriScheme_ldap;
                case 'ssh':
                    return SchemaProperties.uriScheme_ssh;
                case 'git':
                    return SchemaProperties.uriScheme_git;
                case 'urn':
                    return SchemaProperties.uriScheme_urn;
            }
            return new SchemaProperties(name);
        }
    }
    /**
     * File Transfer protocol
     **/
    SchemaProperties.uriScheme_ftp = new SchemaProperties("ftp", { supportsQuery: false, supportsFragment: false, defaultPort: 21 }, "File Transfer protocol");
    /**
     * File Transfer protocol (secure)
     **/
    SchemaProperties.uriScheme_ftps = new SchemaProperties("ftps", { supportsQuery: false, supportsFragment: false, defaultPort: 990 }, "File Transfer protocol (secure)");
    /**
     * Secure File Transfer Protocol
     **/
    SchemaProperties.uriScheme_sftp = new SchemaProperties("sftp", { supportsQuery: false, supportsFragment: false, defaultPort: 22 }, "Secure File Transfer Protocol");
    /**
     * Hypertext Transfer Protocol
     **/
    SchemaProperties.uriScheme_http = new SchemaProperties("http", { defaultPort: 80 }, "Hypertext Transfer Protocol");
    /**
     * Hypertext Transfer Protocol (secure)
     **/
    SchemaProperties.uriScheme_https = new SchemaProperties("https", { defaultPort: 443 }, "Hypertext Transfer Protocol (secure)");
    /**
     * Gopher protocol
     **/
    SchemaProperties.uriScheme_gopher = new SchemaProperties("gopher", { defaultPort: 70 }, "Gopher protocol");
    /**
     * Electronic mail address
     **/
    SchemaProperties.uriScheme_mailto = new SchemaProperties("mailto", { schemeSeparator: ":" }, "Electronic mail address");
    /**
     * USENET news
     **/
    SchemaProperties.uriScheme_news = new SchemaProperties("news", { supportsCredentials: false, requiresHost: false, supportsPort: false, schemeSeparator: ":" }, "USENET news");
    /**
     * USENET news using NNTP access
     **/
    SchemaProperties.uriScheme_nntp = new SchemaProperties("nntp", { defaultPort: 119 }, "USENET news using NNTP access");
    /**
     * Reference to interactive sessions
     **/
    SchemaProperties.uriScheme_telnet = new SchemaProperties("telnet", { supportsPath: false, supportsQuery: false, supportsFragment: false, supportsCredentials: false, defaultPort: 23 }, "Reference to interactive sessions");
    /**
     * Wide Area Information Servers
     **/
    SchemaProperties.uriScheme_wais = new SchemaProperties("wais", { defaultPort: 443 }, "Wide Area Information Servers");
    /**
     * Host-specific file names
     **/
    SchemaProperties.uriScheme_file = new SchemaProperties("file", { supportsQuery: false, supportsFragment: false, supportsCredentials: false, requiresHost: false, supportsPort: false }, "Host-specific file names");
    /**
     * Net Pipe
     **/
    SchemaProperties.uriScheme_netPipe = new SchemaProperties("net.pipe", { supportsPort: false }, "Net Pipe");
    /**
     * Net-TCP
     **/
    SchemaProperties.uriScheme_netTcp = new SchemaProperties("net.tcp", { defaultPort: 808 }, "Net-TCP");
    /**
     * Lightweight Directory Access Protocol
     **/
    SchemaProperties.uriScheme_ldap = new SchemaProperties("ldap", { defaultPort: 389 }, "Lightweight Directory Access Protocol");
    /**
     * Secure Shell
     **/
    SchemaProperties.uriScheme_ssh = new SchemaProperties("ssh", { defaultPort: 22 }, "Secure Shell");
    /**
     * GIT Respository
     **/
    SchemaProperties.uriScheme_git = new SchemaProperties("git", { supportsQuery: false, supportsFragment: false, defaultPort: 9418 }, "GIT Respository");
    /**
     * Uniform Resource notation
     **/
    SchemaProperties.uriScheme_urn = new SchemaProperties("urn", { supportsCredentials: false, requiresHost: false, supportsPort: false, schemeSeparator: ":" }, "Uniform Resource notation");
    app.SchemaProperties = SchemaProperties;
    class QueryParameters {
        constructor(params) {
            throw new Error("Not Implemented");
            // TODO: Implement QueryParameters constructor.
        }
        append(name, value) {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.append().
        }
        delete(name) {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.delete().
        }
        get(name) {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.get().
        }
        getAll(name) {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.getAll().
        }
        has(name) {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.has().
        }
        set(name, value) {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.set().
        }
        sort() {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.sort().
        }
        forEach(callbackfn, thisArg) {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.forEach().
        }
        [Symbol.iterator]() {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.iterator().
        }
        entries() {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.entries().
        }
        keys() {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.keys().
        }
        values() {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.values().
        }
    }
    app.QueryParameters = QueryParameters;
    class Uri {
        constructor(baseUri, relativeUri) {
            this._href = "";
            this._origin = "";
            this._schemeName = "";
            this._schemeSeparator = "";
            this._username = undefined;
            this._password = undefined;
            this._hostname = "";
            this._port = undefined;
            this._portnumber = NaN;
            this._pathname = "";
            this._search = undefined;
            this._searchParams = new QueryParameters();
            this._hash = undefined;
            if ((typeof baseUri === "undefined") || ((typeof baseUri !== "string") && ((typeof baseUri !== "object") || baseUri === null))) {
                if ((typeof relativeUri === "undefined") || ((typeof relativeUri !== "string") && ((typeof relativeUri !== "object") || relativeUri === null)))
                    baseUri = "";
                else
                    baseUri = relativeUri;
                relativeUri = undefined;
            }
            if (typeof baseUri === "string") {
                // TODO: Implement QueryParameters constructor(string, *).
            }
            else if (baseUri instanceof Uri) {
                this._href = baseUri._href;
                this._origin = baseUri._origin;
                this._schemeName = baseUri._href;
                this._schemeSeparator = baseUri._schemeSeparator;
                this._username = baseUri._username;
                this._password = baseUri._password;
                this._hostname = baseUri._hostname;
                this._port = baseUri._port;
                this._portnumber = baseUri._portnumber;
                this._pathname = baseUri._pathname;
                this._search = baseUri._search;
                this._searchParams = new QueryParameters(baseUri._searchParams);
                this._hash = baseUri._hash;
            }
            else {
                // TODO: Implement QueryParameters constructor(Uri, *).
            }
            // TODO: Implement QueryParameters constructor(*, relative).
        }
        // TODO: Implement QueryParameters.href.
        get href() { return this._href; }
        ;
        set href(value) { this._href = value; }
        get origin() { return this._origin; }
        ;
        set origin(value) {
            if ((typeof (value) == "string") && value.trim().length > 0) {
                let m = originParseRegex.exec(value);
                if ((typeof m !== "object") || m === null)
                    throw new Error("Invalid origin");
                this._origin = m[uriParseGroup.origin];
                this._schemeName = m[uriParseGroup.schemeName];
                this._schemeSeparator = m[uriParseGroup.schemeSeparator];
                this._username = (typeof m[uriParseGroup.username] === "string" || typeof m[uriParseGroup.userInfo] !== "string") ? m[uriParseGroup.username] : "";
                this._password = m[uriParseGroup.password];
                this._hostname = m[uriParseGroup.hostname];
                this._port = m[uriParseGroup.portnumber];
                let s;
                this._portnumber = NaN;
                if ((typeof this._port === "string") && (s = this._port.trim()).length > 0) {
                    try {
                        this._portnumber = parseInt(s);
                    }
                    catch (_a) { }
                    if (typeof this._portnumber !== "number")
                        this._portnumber = NaN;
                }
                if (typeof m[uriParseGroup.path] == "string" && !this._pathname.startsWith("/"))
                    this._pathname = (this._pathname.length == 0) ? "/" : "/" + this._pathname;
            }
            else {
                if (this._origin.length == 0)
                    return;
                this._origin = "";
            }
        }
        // TODO: Implement QueryParameters.protocol.
        get protocol() { return (typeof (this._schemeName) === "string") ? this._schemeName + this._schemeSeparator.substr(0, 1) : ""; }
        ;
        set protocol(value) {
            if ((typeof (value) == "string") && value.trim().length > 0) {
                let index = value.indexOf(":");
                if (index >= 0 && index < value.length - 1)
                    throw new Error("Invalid protocol string");
                this.schemeName = value;
            }
            else
                this.schemeName = "";
        }
        // TODO: Implement QueryParameters.schemeName.
        get schemeName() { return this._schemeName; }
        set schemeName(value) {
            if ((value = (typeof value !== "string") ? "" : value.trim()).length > 0) {
                let m = schemeNameRegex.exec(value);
                if ((typeof m !== "object") || m === null)
                    throw new Error("Invalid scheme name");
                this._schemeName = m[1];
                if (this._schemeSeparator.length == 0)
                    this._schemeSeparator = SchemaProperties.getSchemaProperties(this._schemeName).schemeSeparator;
            }
            else {
                this._schemeName = this._schemeSeparator = "";
            }
        }
        // TODO: Implement QueryParameters.schemeSeparator.
        get schemeSeparator() { return this._schemeSeparator; }
        set schemeSeparator(value) {
            if ((value = (typeof value !== "string") ? "" : value.trim()).length > 0) {
                if (!schemeSeparatorRegex.test(value))
                    throw new Error("Invalid scheme separator");
                if (this._schemeName.length == 0)
                    this._schemeName = (value == ":") ? SchemaProperties.uriScheme_urn.name : SchemaProperties.uriScheme_http.name;
                this._schemeSeparator = value;
            }
            else
                this._schemeName = this._schemeSeparator = "";
            this._schemeSeparator = value;
        }
        // TODO: Implement QueryParameters.username.
        get username() { return this._username; }
        ;
        set username(value) { this._username = value; }
        // TODO: Implement QueryParameters.password.
        get password() { return this._password; }
        ;
        set password(value) { this._password = value; }
        // TODO: Implement QueryParameters.host.
        get host() { return (typeof this._port == "string") ? this._hostname + ":" + this._port : this._hostname; }
        set host(value) {
            if ((value = (typeof value !== "string") ? "" : value.trim()).length > 0) {
                let m = hostRegex.exec(value);
                if ((typeof m !== "object") || m === null)
                    throw new Error("Invalid host");
                let p = NaN;
                if (typeof m[2] === "string") {
                    try {
                        p = parseInt(m[2]);
                    }
                    catch (_a) { }
                    if (p === 0 || p === -1)
                        p = NaN;
                    else if (typeof p !== "number" || isNaN(p) || p < 0 || p > 65535)
                        throw new Error("Invalid port");
                }
                this._portnumber = p;
                this._hostname = m[1];
            }
            else
                this._schemeName = this._schemeSeparator = "";
            this._schemeSeparator = value;
        }
        // TODO: Implement QueryParameters.hostname.
        get hostname() { return this._hostname; }
        ;
        set hostname(value) { this._hostname = value; }
        // TODO: Implement QueryParameters.port.
        get port() { return this._port; }
        ;
        set port(value) { this._port = value; }
        // TODO: Implement QueryParameters.pathname.
        get pathname() { return this._pathname; }
        ;
        set pathname(value) { this._pathname = value; }
        // TODO: Implement QueryParameters.search.
        get search() { return this._search; }
        ;
        set search(value) { this._search = value; }
        // TODO: Implement QueryParameters.searchParams.
        get searchParams() { return this._searchParams; }
        set searchParams(value) { this._searchParams = value; }
        // TODO: Implement QueryParameters.hash.
        get hash() { return this._hash; }
        set hash(value) { this._hash = value; }
        // TODO: Implement QueryParameters.toJSON().
        toJSON() {
            throw new Error("Method not implemented.");
        }
    }
    app.Uri = Uri;
    class UriBuilderService {
    }
    app.UriBuilderService = UriBuilderService;
    app.appModule.factory("uriBuilderService", ["$rootScope", UriBuilderService]);
    // #endregion
    window.console.log("Exiting app");
})(app || (app = {}));
//# sourceMappingURL=app.js.map