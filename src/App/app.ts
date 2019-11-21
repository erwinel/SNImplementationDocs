/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="IncidentManagement.ts" />

type Mandatory<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

namespace pageManager {
    /**
     * Prefix for hash portion of navigation URI strings.
     * @export
     * @constant HashPrefix
     * @type {"!"}
     */
    export const HASH_PREFIX = '!';

    /**
     * Prefix for relative navigation URI path strings.
     * @export
     * @constant NavPrefix
     * @type {"#!"}
     */
    export const NAV_PREFIX = '#!';

    export const DEFAULT_PAGE_TITLE = 'ServiceNow Implementation and Maintenance';
    export const CONTROLLER_NAME_MAIN_CONTENT = 'mainContentController';
    export const CONTROLLER_NAME_DEFAULT_PAGE = 'defaultPageController';
    export const SERVICE_NAME_PAGE_MANAGER = 'pageManager';
    export const PROVIDER_NAME_PAGE_MANAGER = SERVICE_NAME_PAGE_MANAGER + 'Provider';

    /**
     * Handles W3C DOM event.
     * @export
     * @typedef {(event?: BaseJQueryEventObject) => void} DOMelementEventCallback
     * @param {BaseJQueryEventObject} [event] - Contains information about the W3C DOM event that occurred.
     */
    export type DOMelementEventCallback = (event?: BaseJQueryEventObject) => void;

    export interface IPageTitleScope {
        /**
         * The current page title.
         * @type {string}
         * @memberof IMainContentControllerScope
         */
        pageTitle: string;

        /**
         * Indicates whether the current page has a subtitle to be displayed.
         * @type {boolean}
         * @memberof IMainContentControllerScope
         */
        showSubtitle: boolean;

        /**
         * The subtitle for the current page.
         * @type {string}
         * @memberof IMainContentControllerScope
         */
        subTitle: string;
    }
    export interface IAppSettingsScope {
        /**
         * The value of the GIT repository URL field in the edit setup parameters dialog.
         *
         * @type {string}
         * @memberof IDirectiveScope
         */
        serviceNowUrl: string;
        /**
         * Indicates whether the ServiceNow URL field in the edit setup parameters dialog is valid.
         *
         * @type {boolean}
         * @memberof IDirectiveScope
         */
        serviceNowUrlIsValid: boolean;
        /**
         * The value of the GIT repository URL field in the edit setup parameters dialog.
         *
         * @type {string}
         * @memberof IDirectiveScope
         */
        gitServiceUrl: string;
        /**
         * Indicates whether the GIT repository URL field in the edit setup parameters dialog is valid.
         *
         * @type {boolean}
         * @memberof IDirectiveScope
         */
        gitServiceUrlIsValid: boolean;
        idpUrl: string;
        idpUrlIsValid: boolean;
        /**
         * Indicates whether all fields in the edit setup parameters dialog are valid.
         *
         * @type {boolean}
         * @memberof IDirectiveScope
         */
        setupParametersAreInvalid: boolean;
        /**
         * Indicates whether the edit setup parameters dialog is being displayed.
         *
         * @type {boolean}
         * @memberof IDirectiveScope
         */
        setupParametersDialogVisible: boolean;
    }
    export interface INavigationScope {
        /**
         * Navigation menu items to be displayed horizontally above the content.
         * @type {ReadonlyArray<NavMenuItem>}
         * @memberof IDirectiveScope
         */
        pageTopNavItems: ReadonlyArray<NavMenuItem>;
        /**
         * Ancestor navigation menu items to be displayed in the secondary navigation menu.
         *
         * @type {ReadonlyArray<NavMenuItem>}
         * @memberof IDirectiveScope
         */
        sideNavBreadcrumbItems: ReadonlyArray<NavMenuItem>;
        /**
         * Indicates whether ancestor navigation menu items are to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IDirectiveScope
         */
        showSideNavBreadcrumbs: boolean;
        /**
         * Navigation menu items within the secondary navigation menu, exclusing any that represents the current page or sibling items following the one that represents the current page.
         *
         * @type {ReadonlyArray<NavMenuItem>}
         * @memberof IDirectiveScope
         */
        precedingSideNavItems: ReadonlyArray<NavMenuItem>;

        /**
         * Navigation menu item representing the current page.
         *
         * @type {NavMenuItem}
         * @memberof IDirectiveScope
         */
        currentNavItem?: NavMenuItem;
        /**
         * Indicates whether navigation menu item representing the current page is to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IDirectiveScope
         */
        showCurrentItem: boolean;
        /**
         * Navigation menu items within the secondary navigation menu, exclusing any that represents the current page or sibling items following the one that represents the current page.
         *
         * @type {ReadonlyArray<NavMenuItem>}
         * @memberof IDirectiveScope
         */
        nestedChildNavItems: ReadonlyArray<NavMenuItem>;
        /**
         * Indicates whether the child/sibling navigation menu items are to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IDirectiveScope
         */
        showNestedChildNav: boolean;
        /**
         * Navigation menu items within the secondary navigation menu that follow the item representing the current page.
         *
         * @type {ReadonlyArray<NavMenuItem>}
         * @memberof IDirectiveScope
         */
        followingSideNavItems: ReadonlyArray<NavMenuItem>;

        // TODO: Make obsolete
        /**
         * Indicates whether the child/sibling navigation menu items are to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IDirectiveScope
         */
        showFollowingSideNav: boolean;
        /**
         * Heading text for the secondary navigation menu.
         *
         * @type {string}
         * @memberof IDirectiveScope
         */
        sideNavHeading: string;
        /**
         * Indicates whether a heading is to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IDirectiveScope
         */
        showSideNavHeading: boolean;
        /**
         * Indicates whether the secondary navigation menu is to be displayed.
         *
         * @type {boolean}
         * @memberof IDirectiveScope
         */
        showNavAsideElement: boolean;
        /**
         * CSS class names for the main content section.
         *
         * @type {Readonly<string[]>}
         * @memberof IDirectiveScope
         */
        mainSectionClass: Readonly<string[]>;
    }
    /**
     * Defines the scope object for the main application controller.
     * @export
     * @interface IMainContentControllerScope
     * @extends {ng.IScope}
     */
    export interface IMainContentControllerScope extends IPageTitleScope, IAppSettingsScope, INavigationScope, ng.IScope {
    }
    /**
     * The main application controller.
     * @export
     * @class MainContentController
     * @implements {ng.IController}
     */
    export class MainContentController implements ng.IController {
        readonly [Symbol.toStringTag]: string = CONTROLLER_NAME_MAIN_CONTENT;

        /**
         * Creates an instance of MainContentController.
         * @param {IMainContentControllerScope} $scope
         * @param {PageTitleService} pageTitleService
         * @memberof MainContentController
         */
        constructor(private readonly $scope: IMainContentControllerScope, pageManager: Service) {
            const ctrl: MainContentController = this;
            pageManager.setScope($scope);
        }
        $doCheck(): void { }
        static getControllerInjectable(): ng.Injectable<ng.IControllerConstructor> {
            return ['$scope', 'pageManager', MainContentController];
        }
    }

    export interface IDefaultPageControllerScope extends ng.IScope {

    }
    /**
     * Controller for static pages.
     * @export
     * @class DefaultPageController
     * @implements {ng.IController}
     */
    export class DefaultPageController implements ng.IController {
        readonly [Symbol.toStringTag]: string = CONTROLLER_NAME_DEFAULT_PAGE;
        constructor(private readonly $scope: IDefaultPageControllerScope, pageManager: Service) {
        }
        $doCheck(): void { }
        static getControllerInjectable(): ng.Injectable<ng.IControllerConstructor> {
            return ['$scope', 'pageManager', DefaultPageController];
        }
    }

    /**
     * Service which provides page-related information and tracks and updates the current app page title.
     * @export
     * @class pageManager.Service
     */
    export class Service {
        private _pageTitle = DEFAULT_PAGE_TITLE;
        private _pageSubTitle = '';
        private _mainScope: IPageTitleScope & INavigationScope;
        private _currentRouteInfo: PageRouteInfo;
        private _currentRoute: ng.route.ICurrentRoute;
        readonly [Symbol.toStringTag]: string = SERVICE_NAME_PAGE_MANAGER;

        constructor($rootScope: ng.IRootScopeService, private readonly _pageRouteInfo: ReadonlyArray<NavRouteInfo>) {
            const svc: Service = this;
            this.setCurrentRoute(this._pageRouteInfo[0]);
            $rootScope.$on('$routeChangeSuccess', function (event: ng.IAngularEvent, current: ng.route.ICurrentRoute): void {
                if (typeof current.name !== 'string')
                    return;

                svc._currentRoute = current;
                let routeInfo: NavRouteInfo | undefined = svc.getRouteInfoById(current.name);
                if (typeof routeInfo !== 'undefined')
                    svc.setCurrentRoute(routeInfo);
            });
        }

        getRouteInfoById(id: string): NavRouteInfo | undefined {
            for (let i: number = 0; i < this._pageRouteInfo.length; i++) {
                if ((<ICustomRouteMembers>this._pageRouteInfo[i]).id === id)
                    return this._pageRouteInfo[i];
            }
        }

        currentPage(): PageRouteInfo { return this._currentRouteInfo; }

        currentRoute(): ng.route.ICurrentRoute { return this._currentRoute; }

        private setCurrentRoute(route: NavRouteInfo): void {
            if (Provider.isRouteRedirectInfo(route))
                return;
            this._currentRouteInfo = route;
            if (Provider.routeInfoUsesDefaultController(route)) {
                if (route.subTitle === 'string' && route.subTitle.length > 0)
                    this.pageTitle(route.title, route.subTitle);
                else
                    this.pageTitle(route.title);
            }
        }

        /**
         * Gets or sets the the current page title.
         * @param {string} [value] - If defined, this will set the current page title and the page subtitle will be empty.
         * @returns {string} The current page title.
         * @memberof PageLocationService
         */
        pageTitle(value?: string): string;
        /**
         * Sets the new page title and subtitle.
         * @param value - The new page title.
         * @param subTitle - The new page subtitle.
         * @returns {string} The current page title.
         * @memberof PageLocationService
         */
        pageTitle(value: string, subTitle: string): string;
        pageTitle(value?: string, subTitle?: string): string {
            if (typeof value === 'string') {
                this._pageTitle = ((value = value.trim()).length == 0) ? DEFAULT_PAGE_TITLE : value;
                this._pageSubTitle = (typeof subTitle === 'string') ? subTitle : '';
                if (typeof this._mainScope !== 'undefined') {
                    this._mainScope.pageTitle = this._pageTitle;
                    this._mainScope.subTitle = this._pageSubTitle;
                    this._mainScope.showSubtitle = this._pageSubTitle.trim().length > 0;
                }
            }
            return this._pageTitle;
        }

        /**
         * Gets the current page subtitle.
         * @returns {string} - The current page subtitle title or an empty string if there is currently no subtitle.
         * @memberof PageLocationService
         */
        pageSubTitle(value?: string): string { return this._pageSubTitle; }

        /**
         * This should only be called by the main controller so the main controller's page title properties can be updated.
         * @param {IPageTitleScope & INavigationScope} scope - The scope of the main application controller.
         * @memberof PageLocationService
         */
        setScope(scope: IPageTitleScope & INavigationScope): void {
            if (typeof scope !== 'object' || scope === null)
                return;
            (this._mainScope = scope).pageTitle = this._pageTitle;
            scope.showSubtitle = (scope.subTitle = this._pageSubTitle).trim().length > 0;
        }
    }
    export interface ICustomRouteMembers {
        route: string;
        id?: string;
        linkTitle?: string;
        parentId?: string;
        title: string;
        subTitle?: string;
        tooltip?: string;
    }
    export type RouteTemplateUrl = Readonly<Omit<Mandatory<ICustomRouteMembers, "linkTitle">, "title" | "subTitle"> & Omit<Mandatory<ng.route.IRoute, "controller" | "templateUrl">, "template">>;
    export type RouteTemplateString = Readonly<Omit<Mandatory<ICustomRouteMembers, "linkTitle">, "title" | "subTitle"> & Omit<Mandatory<ng.route.IRoute, "controller" | "template">, "templateUrl">>;
    export type RouteTemplateUrlDefaultController = Readonly<ICustomRouteMembers & Omit<Mandatory<ng.route.IRoute, "templateUrl">, "template">>;
    export type RouteTemplateStringDefaultController = Readonly<ICustomRouteMembers & Omit<Mandatory<ng.route.IRoute, "template">, "templateUrl">>;
    export type RouteRedirectInfo = Readonly<Pick<ICustomRouteMembers, "route"> & Omit<Mandatory<ng.route.IRoute, "redirectTo">, "controller" | "template" | "templateUrl" | "resolve">>;
    export type PageRouteInfo = Mandatory<RouteTemplateUrl, 'id'> | Mandatory<RouteTemplateString, 'id'> | Mandatory<RouteTemplateUrlDefaultController, 'id'> |
        Mandatory<RouteTemplateStringDefaultController, 'id'>;
    export type NavRouteInfo = PageRouteInfo | RouteRedirectInfo;
    export class Provider implements ng.IServiceProvider {
        readonly [Symbol.toStringTag]: string = PROVIDER_NAME_PAGE_MANAGER;
        private readonly _pageRouteInfo: ReadonlyArray<RouteTemplateUrl | RouteTemplateString | RouteTemplateUrlDefaultController | RouteTemplateStringDefaultController | RouteRedirectInfo> = [
            {
                templateUrl: 'Template/Pages/Home.htm',
                route: '/home',
                title: DEFAULT_PAGE_TITLE,
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
        ];
        get $get(): ['$rootScope', ($rootScope: ng.IRootScopeService) => Service] {
            let provider: Provider = this;
            return ['$rootScope', function pageManagerFactory($rootScope: ng.IRootScopeService): Service {
                return new Service($rootScope, provider.getRouteInfo());
            }];
        }
        private getRouteInfo(): ReadonlyArray<NavRouteInfo> {
            return this._pageRouteInfo.map(function (value: NavRouteInfo, index: number): NavRouteInfo {
                if (Provider.isRouteRedirectInfo(value))
                    return value;
                if (typeof value.id !== "string")
                    (<ICustomRouteMembers>value).id = "__page" + index;
                return <NavRouteInfo>value;
            });
        }
        static isRouteRedirectInfo(routeInfo: NavRouteInfo): routeInfo is RouteRedirectInfo {
            return typeof routeInfo === "object" && routeInfo !== null && typeof (<RouteRedirectInfo>routeInfo).redirectTo === "string";
        }
        static routeInfoHasPageTemplateUrl(routeInfo: NavRouteInfo): routeInfo is Exclude<PageRouteInfo, RouteTemplateString | RouteTemplateStringDefaultController> {
            return typeof routeInfo === "object" && routeInfo !== null && typeof (<RouteTemplateUrl>routeInfo).templateUrl === "string";
        }
        static routeInfoHasPageTemplateString(routeInfo: NavRouteInfo): routeInfo is Exclude<PageRouteInfo, RouteTemplateUrl | RouteTemplateUrlDefaultController> {
            return typeof routeInfo === "object" && routeInfo !== null && typeof (<RouteTemplateString>routeInfo).template === "string";
        }
        static routeInfoHasExplicitController(routeInfo: NavRouteInfo): routeInfo is Exclude<PageRouteInfo, RouteTemplateStringDefaultController | RouteTemplateUrlDefaultController> {
            return typeof routeInfo === "object" && routeInfo !== null && typeof (<RouteTemplateUrlDefaultController>routeInfo).title !== "string";
        }
        static routeInfoUsesDefaultController(routeInfo: NavRouteInfo): routeInfo is Exclude<PageRouteInfo, RouteTemplateString | RouteTemplateUrl> {
            return typeof routeInfo === "object" && routeInfo !== null && typeof (<RouteTemplateUrlDefaultController>routeInfo).title === "string";
        }
        ConfigureRoutes($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider): void {
            $locationProvider.hashPrefix(HASH_PREFIX);
            this.getRouteInfo().forEach(function (value: NavRouteInfo): void {
                let routeDef: ng.route.IRoute;
                if (Provider.isRouteRedirectInfo(value))
                    routeDef = { redirectTo: value.redirectTo };
                else {
                    if (Provider.routeInfoUsesDefaultController(value))
                        routeDef = { controller: CONTROLLER_NAME_DEFAULT_PAGE, controllerAs: CONTROLLER_NAME_DEFAULT_PAGE };
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
        }
    }
}

/**
 * The main application namespace
 * @namespace
 */
namespace app {
    /**
     * The main module for this app.
     * @export
     * @constant {ng.IModule}
     */
    export const appModule: ng.IModule = angular.module("app", [])
        .provider(pageManager.SERVICE_NAME_PAGE_MANAGER, pageManager.Provider)
        .config(['$locationProvider', '$routeProvider', 'pageManagerProvider',
            function ($locationProvider: ng.ILocationProvider, $routeProvider: ng.route.IRouteProvider, pageManagerProvider: pageManager.Provider) {
                pageManagerProvider.ConfigureRoutes($routeProvider, $locationProvider);
                window.alert('Called config');
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
    export const SERVICE_NAME_copyToClipboard = "copyToClipboardService";

    /**
     * Defines the copy directive name as "copyToClipboardButton".
     *
     * @todo Rename to buttonCopyToClipboard to use as <button:copy-to-clipboard />
     * @export
     * @constant {string}
     */
    export const DIRECTIVE_NAME_copyToClipboard = "copyToClipboardButton";

    const btnCssClassRe: RegExp = /(^|\s)btn(\s|$)/g;
    const btnStyleCssClassRe: RegExp = /(^|\s)btn-\S/g;
    const paddingCssClassRe: RegExp = /(^|\s)p(l|t|r|b)?-\S/g;

    export class copyToClipboardService {
        [Symbol.toStringTag]: string;
        constructor(public $window: ng.IWindowService) { this[Symbol.toStringTag] = SERVICE_NAME_copyToClipboard; }
        copy(element: JQuery, successMsg?: string) {
            try {
                element.text();
                let range: Range = this.$window.document.createRange();
                range.selectNode(element[0]);
                let selection: Selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                this.$window.document.execCommand('copy');
                selection.removeAllRanges();
                if ((typeof successMsg === "string") && (successMsg = successMsg.trim()).length > 0)
                    alert(successMsg);
                else
                    alert('Text copied to clipboard');
            } catch (ex) {
                alert('Failed to copy to clipboard: ' + ex);
            }
        }
    }

    /**
     * Attributes that can be used with the copyToClipboardButton directive.
     * @export
     * @interface ICopyDirectiveAttributes
     * @example <caption>Example with default message.</caption>
     * ```
     * <copy-to-clipboard-button target="exampleCode" ></copy-to-clipboard-button>
     * <code class="multi-line" id="exampleCode">&lt;var class=&quot;targetName&quot;&gt;Example Name&lt;/var&gt;</code>
     * <!-- Clicking the button will produce the message "Text copied to clipboard" and Transpiled code will be: -->
     * <button class="btn btn-light btn-outline-dark p-1">
     *      <svg class="fill-light stroke-dark" width="16" height="16">
     *          <use xlink:href="images/icons.svg#clipboard"></use>
     *      </svg>
     * </button>
     * ```
     * @example <caption>Example with custom message and css.</caption>
     * ```
     * <copy-to-clipboard-button target="exampleCode" success-message="Code Copied" class="btn-secondary"></copy-to-clipboard-button>
     * <code class="multi-line" id="exampleCode">&lt;var class=&quot;targetName&quot;&gt;Example Name&lt;/var&gt;</code>
     * <!-- Clicking the button will produce the message "Code Copied" and Transpiled code will be: -->
     * <button class="btn btn-secondary p-1">
     *      <svg class="fill-light stroke-dark" width="16" height="16">
     *          <use xlink:href="images/icons.svg#clipboard"></use>
     *      </svg>
     * </button>
     * ```
     */
    export interface ICopyToClipboardDirectiveAttributes {
        /**
         * CSS class names to apply to button.
         * @type {string}
         * @memberof ICopyDirectiveAttributes
         */
        class?: string;

        /**
         * The id of the element containing text to be copied.
         * @type {string}
         * @memberof ICopyDirectiveAttributes
         */
        target: string;

        /**
         * Message to display after text is succssfully copied to clipboard.
         * @type {string}
         * @memberof ICopyDirectiveAttributes
         */
        successMessage?: string;
    }

    interface ICopyToClipboardDirectiveScope extends ng.IScope {
        ctrl: copyToClipboardButtonController;
    }

    export class copyToClipboardButtonController implements ng.IController {
        private _cssClass: string[];
        private _targetId: string;
        private _successMessage?: string;

        get cssClass(): string[] { return this._cssClass; }

        get targetId(): string { return this._targetId; }

        constructor(public $scope: ICopyToClipboardDirectiveScope, public copyToClipboardService: copyToClipboardService) { }

        copyToClipboard(event: BaseJQueryEventObject): void {
            try { this.copyToClipboardService.copy($("#" + this._targetId), this._successMessage); }
            finally { sys.preventEventDefault(event); }
        }

        static createDirective(): ng.IDirective {
            return {
                restrict: "E",
                controllerAs: "ctrl",
                controller: ["$scope", "copyToClipboardService", copyToClipboardButtonController],
                replace: true,
                template: '<button ng-click="ctrl.copyToClipboard(event)"><svg class="fill-light stroke-dark" width="16" height="16"><use xlink:href="images/icons.svg#clipboard"></use></svg></button>',
                link: (scope: ICopyToClipboardDirectiveScope, element: JQuery, attr: ICopyToClipboardDirectiveAttributes & ng.IAttributes, controller: ng.IController) => {
                    scope.ctrl.initialize(attr.target, attr.successMessage, attr.class);
                }
            };
        }

        initialize(targetId: string, successMessage?: string, cssClass?: string) {
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
            } else
                this._cssClass = ['btn', 'btn-light', 'btn-outline-dark', 'p-1'];
        }

        $onInit() { }
    }

    appModule.service(SERVICE_NAME_copyToClipboard, ["$window", copyToClipboardService]);
    appModule.directive(DIRECTIVE_NAME_copyToClipboard, copyToClipboardButtonController.createDirective);

    // #endregion

    // #region urlBuilderService

    const uriParseRegex: RegExp = /^(([^\\\/@:]*)(:[\\\/]{0,2})((?=[^\\\/@:]*(?::[^\\\/@:]*)?@)([^\\\/@:]*)(:[^\\\/@:]*)?@)?([^\\\/@:]*)(?:(?=:\d*(?:[\\\/:]|$)):(\d*))?(?=[\\\/:]|$))?(.+)?$/;
    const originParseRegex: RegExp = /^(([^\\\/@\s?#:]+)(:\/{0,2})((?=[^\\\/@?#:]*(?::[^\\\/@?#:]*)?@)([^\\\/@?#:]*)(:[^\\\/@?#:]*)?@)?(?:([^\\\/@?#\s:]+)(?:(?=:\d*(?:[\\\/:]|$)):(\d*))?)?)([\/:])?$/;
    const schemeNameRegex: RegExp = /^([^\\\/@\s:]+):?$/;
    const schemeSeparatorRegex: RegExp = /^:(\/\/?)?$/;
    const hostRegex: RegExp = /^([^\\\/?#@\s"]+)(:\d+)?$/;
    const fileSystemPathRegex: RegExp = /^([a-z]:([\\\/]([^\\\/?#:]|$)|$)|[\\\/]{2}[^\\\/?#:]+)/i;

    enum uriParseGroup {
        all = 0,
        origin = 1,
        schemeName = 2,
        schemeSeparator = 3,
        userInfo = 4,
        username = 5,
        password = 6,
        hostname = 7,
        portnumber = 8,
        path = 9
    }

    /*
     * https://john.doe@www.example.com:123/forum/questions/?tag=networking&order=newest#top
      └─┬─┘ └───────┬────────────────────┘└─┬─────────────┘└──┬───────────────────────┘└┬─┘
      scheme     authority                 path              query                      fragment

      ldap://[2001:db8::7]/c=GB?objectClass?one
      └─┬┘ └───────┬─────┘└─┬─┘ └──────┬──────┘
     scheme    authority  path       query

      mailto:John.Doe@example.com
      └──┬─┘ └─────────┬────────┘
      scheme         path

      news:comp.infosystems.www.servers.unix
      └─┬┘ └───────────────┬───────────────┘
     scheme              path

      tel:+1-816-555-1212
      └┬┘ └──────┬──────┘
    scheme     path

      telnet://192.0.2.16:80/
      └──┬─┘ └──────┬──────┘│
      scheme    authority  path

      urn:oasis:names:specification:docbook:dtd:xml:4.1.2
     */
    export interface ISchemaProperties {
        supportsPath?: boolean;
        supportsQuery?: boolean;
        supportsFragment?: boolean;
        supportsCredentials?: boolean;
        requiresHost?: boolean;
        supportsPort?: boolean;
        requiresUsername?: boolean;
        schemeSeparator?: string;
        defaultPort?: number;
    }

    export class SchemaProperties implements ISchemaProperties {
        readonly name: string;
        readonly description: string;
        readonly supportsPath: boolean;
        readonly supportsQuery: boolean;
        readonly supportsFragment: boolean;
        readonly supportsCredentials: boolean;
        readonly requiresHost: boolean;
        readonly supportsPort: boolean;
        readonly requiresUsername: boolean;
        readonly defaultPort: number;
        readonly schemeSeparator: string;
        constructor(name: string, properties?: ISchemaProperties, description?: string) {
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
            } else {
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

        static getSchemaProperties(name: string): SchemaProperties {
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
        /**
         * File Transfer protocol
         **/
        static readonly uriScheme_ftp: SchemaProperties = new SchemaProperties("ftp", { supportsQuery: false, supportsFragment: false, defaultPort: 21 }, "File Transfer protocol");
        /**
         * File Transfer protocol (secure)
         **/
        static readonly uriScheme_ftps: SchemaProperties = new SchemaProperties("ftps", { supportsQuery: false, supportsFragment: false, defaultPort: 990 }, "File Transfer protocol (secure)");
        /**
         * Secure File Transfer Protocol
         **/
        static readonly uriScheme_sftp: SchemaProperties = new SchemaProperties("sftp", { supportsQuery: false, supportsFragment: false, defaultPort: 22 }, "Secure File Transfer Protocol");
        /**
         * Hypertext Transfer Protocol
         **/
        static uriScheme_http: SchemaProperties = new SchemaProperties("http", { defaultPort: 80 }, "Hypertext Transfer Protocol");
        /**
         * Hypertext Transfer Protocol (secure)
         **/
        static uriScheme_https: SchemaProperties = new SchemaProperties("https", { defaultPort: 443 }, "Hypertext Transfer Protocol (secure)");
        /**
         * Gopher protocol
         **/
        static uriScheme_gopher: SchemaProperties = new SchemaProperties("gopher", { defaultPort: 70 }, "Gopher protocol");
        /**
         * Electronic mail address
         **/
        static uriScheme_mailto: SchemaProperties = new SchemaProperties("mailto", { schemeSeparator: ":" }, "Electronic mail address");
        /**
         * USENET news
         **/
        static uriScheme_news: SchemaProperties = new SchemaProperties("news", { supportsCredentials: false, requiresHost: false, supportsPort: false, schemeSeparator: ":" }, "USENET news")
        /**
         * USENET news using NNTP access
         **/
        static uriScheme_nntp: SchemaProperties = new SchemaProperties("nntp", { defaultPort: 119 }, "USENET news using NNTP access");
        /**
         * Reference to interactive sessions
         **/
        static uriScheme_telnet: SchemaProperties = new SchemaProperties("telnet", { supportsPath: false, supportsQuery: false, supportsFragment: false, supportsCredentials: false, defaultPort: 23 }, "Reference to interactive sessions");
        /**
         * Wide Area Information Servers
         **/
        static uriScheme_wais: SchemaProperties = new SchemaProperties("wais", { defaultPort: 443 }, "Wide Area Information Servers");
        /**
         * Host-specific file names
         **/
        static uriScheme_file: SchemaProperties = new SchemaProperties("file", { supportsQuery: false, supportsFragment: false, supportsCredentials: false, requiresHost: false, supportsPort: false }, "Host-specific file names");
        /**
         * Net Pipe
         **/
        static uriScheme_netPipe: SchemaProperties = new SchemaProperties("net.pipe", { supportsPort: false }, "Net Pipe");
        /**
         * Net-TCP
         **/
        static uriScheme_netTcp: SchemaProperties = new SchemaProperties("net.tcp", { defaultPort: 808 }, "Net-TCP");
        /**
         * Lightweight Directory Access Protocol
         **/
        static uriScheme_ldap: SchemaProperties = new SchemaProperties("ldap", { defaultPort: 389 }, "Lightweight Directory Access Protocol");
        /**
         * Secure Shell
         **/
        static uriScheme_ssh: SchemaProperties = new SchemaProperties("ssh", { defaultPort: 22 }, "Secure Shell");
        /**
         * GIT Respository
         **/
        static uriScheme_git: SchemaProperties = new SchemaProperties("git", { supportsQuery: false, supportsFragment: false, defaultPort: 9418 }, "GIT Respository");
        /**
         * Uniform Resource notation
         **/
        static uriScheme_urn: SchemaProperties = new SchemaProperties("urn", { supportsCredentials: false, requiresHost: false, supportsPort: false, schemeSeparator: ":" }, "Uniform Resource notation");
    }

    export class QueryParameters implements URLSearchParams {
        constructor(params?: string | URLSearchParams) {
            throw new Error("Not Implemented");
            // TODO: Implement QueryParameters constructor.
        }

        append(name: string, value: string): void {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.append().
        }

        delete(name: string): void {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.delete().
        }

        get(name: string): string {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.get().
        }

        getAll(name: string): string[] {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.getAll().
        }

        has(name: string): boolean {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.has().
        }

        set(name: string, value: string): void {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.set().
        }

        sort(): void {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.sort().
        }

        forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.forEach().
        }

        [Symbol.iterator](): IterableIterator<[string, string]> {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.iterator().
        }

        entries(): IterableIterator<[string, string]> {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.entries().
        }

        keys(): IterableIterator<string> {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.keys().
        }

        values(): IterableIterator<string> {
            throw new Error("Method not implemented.");
            // TODO: Implement QueryParameters.values().
        }
    }

    export class Uri implements URL {
        private _href: string = "";
        private _origin: string = "";
        private _schemeName: string = "";
        private _schemeSeparator: string = "";
        private _username?: string = undefined;
        private _password?: string = undefined;
        private _hostname: string = "";
        private _port?: string = undefined;
        private _portnumber: number = NaN;
        private _pathname: string = "";
        private _search?: string = undefined;
        private _searchParams: URLSearchParams = new QueryParameters();
        private _hash?: string = undefined;

        // TODO: Implement QueryParameters.href.
        get href(): string { return this._href; };
        set href(value: string) { this._href = value; }

        get origin(): string { return this._origin; };
        set origin(value: string) {
            if ((typeof (value) == "string") && value.trim().length > 0) {
                let m: RegExpExecArray = originParseRegex.exec(value);
                if ((typeof m !== "object") || m === null)
                    throw new Error("Invalid origin");
                this._origin = m[uriParseGroup.origin];
                this._schemeName = m[uriParseGroup.schemeName];
                this._schemeSeparator = m[uriParseGroup.schemeSeparator];
                this._username = (typeof m[uriParseGroup.username] === "string" || typeof m[uriParseGroup.userInfo] !== "string") ? m[uriParseGroup.username] : "";
                this._password = m[uriParseGroup.password];
                this._hostname = m[uriParseGroup.hostname];
                this._port = m[uriParseGroup.portnumber];
                let s: string;
                this._portnumber = NaN;
                if ((typeof this._port === "string") && (s = this._port.trim()).length > 0) {
                    try { this._portnumber = parseInt(s); } catch { }
                    if (typeof this._portnumber !== "number")
                        this._portnumber = NaN;
                }
                if (typeof m[uriParseGroup.path] == "string" && !this._pathname.startsWith("/"))
                    this._pathname = (this._pathname.length == 0) ? "/" : "/" + this._pathname;
            } else {
                if (this._origin.length == 0)
                    return;
                this._origin = "";
            }
        }

        // TODO: Implement QueryParameters.protocol.
        get protocol(): string { return (typeof (this._schemeName) === "string") ? this._schemeName + this._schemeSeparator.substr(0, 1) : ""; };
        set protocol(value: string) {
            if ((typeof (value) == "string") && value.trim().length > 0) {
                let index: number = value.indexOf(":");
                if (index >= 0 && index < value.length - 1)
                    throw new Error("Invalid protocol string");
                this.schemeName = value;
            } else
                this.schemeName = "";
        }

        // TODO: Implement QueryParameters.schemeName.
        get schemeName(): string { return this._schemeName; }
        set schemeName(value: string) {
            if ((value = (typeof value !== "string") ? "" : value.trim()).length > 0) {
                let m: RegExpExecArray = schemeNameRegex.exec(value);
                if ((typeof m !== "object") || m === null)
                    throw new Error("Invalid scheme name");
                this._schemeName = m[1];
                if (this._schemeSeparator.length == 0)
                    this._schemeSeparator = SchemaProperties.getSchemaProperties(this._schemeName).schemeSeparator;
            } else {
                this._schemeName = this._schemeSeparator = "";

            }
        }

        // TODO: Implement QueryParameters.schemeSeparator.
        get schemeSeparator(): string { return this._schemeSeparator; }
        set schemeSeparator(value: string) {
            if ((value = (typeof value !== "string") ? "" : value.trim()).length > 0) {
                if (!schemeSeparatorRegex.test(value))
                    throw new Error("Invalid scheme separator");
                if (this._schemeName.length == 0)
                    this._schemeName = (value == ":") ? SchemaProperties.uriScheme_urn.name : SchemaProperties.uriScheme_http.name;
                this._schemeSeparator = value;
            } else
                this._schemeName = this._schemeSeparator = "";

            this._schemeSeparator = value;
        }

        // TODO: Implement QueryParameters.username.
        get username(): string { return this._username; };
        set username(value: string) { this._username = value; }

        // TODO: Implement QueryParameters.password.
        get password(): string { return this._password; };
        set password(value: string) { this._password = value; }

        // TODO: Implement QueryParameters.host.
        get host(): string { return (typeof this._port == "string") ? this._hostname + ":" + this._port : this._hostname; }
        set host(value: string) {
            if ((value = (typeof value !== "string") ? "" : value.trim()).length > 0) {
                let m: RegExpExecArray = hostRegex.exec(value);
                if ((typeof m !== "object") || m === null)
                    throw new Error("Invalid host");
                let p: number = NaN;
                if (typeof m[2] === "string") {
                    try { p = parseInt(m[2]); } catch { }
                    if (p === 0 || p === -1)
                        p = NaN;
                    else if (typeof p !== "number" || isNaN(p) || p < 0 || p > 65535)
                        throw new Error("Invalid port");
                }
                this._portnumber = p;
                this._hostname = m[1];
            } else
                this._schemeName = this._schemeSeparator = "";

            this._schemeSeparator = value;
        }

        // TODO: Implement QueryParameters.hostname.
        get hostname(): string { return this._hostname; };
        set hostname(value: string) { this._hostname = value; }

        // TODO: Implement QueryParameters.port.
        get port(): string { return this._port; };
        set port(value: string) { this._port = value; }

        // TODO: Implement QueryParameters.pathname.
        get pathname(): string { return this._pathname; };
        set pathname(value: string) { this._pathname = value; }

        // TODO: Implement QueryParameters.search.
        get search(): string { return this._search; };
        set search(value: string) { this._search = value; }

        // TODO: Implement QueryParameters.searchParams.
        get searchParams(): URLSearchParams { return this._searchParams; }
        set searchParams(value: URLSearchParams) { this._searchParams = value; }

        // TODO: Implement QueryParameters.hash.
        get hash(): string { return this._hash; }
        set hash(value: string) { this._hash = value; }

        // TODO: Implement QueryParameters.toJSON().
        toJSON(): string {
            throw new Error("Method not implemented.");
        }

        constructor(baseUri: URL | Uri, relativeUri: string | URL | Uri);
        constructor(uri: URL | Uri | string);
        constructor(baseUri: string | URL | Uri, relativeUri?: string | URL | Uri) {
            if ((typeof baseUri === "undefined") || ((typeof baseUri !== "string") && ((typeof baseUri !== "object") || baseUri === null))) {
                if ((typeof relativeUri === "undefined") || ((typeof relativeUri !== "string") && ((typeof relativeUri !== "object") || relativeUri === null)))
                    baseUri = "";
                else
                    baseUri = relativeUri;
                relativeUri = undefined;
            }

            if (typeof baseUri === "string") {
                // TODO: Implement QueryParameters constructor(string, *).

            } else if (baseUri instanceof Uri) {
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
            } else {
                // TODO: Implement QueryParameters constructor(Uri, *).

            }

                // TODO: Implement QueryParameters constructor(*, relative).
        }
    }

    export class UriBuilderService {

    }

    appModule.factory("uriBuilderService", ["$rootScope", UriBuilderService]);

    // #endregion
}
