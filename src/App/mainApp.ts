/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />


namespace mainApp {
    // #region Constant definitions

    export const DEFAULT_PAGE_TITLE = 'ServiceNow Implementation and Maintenance';
    export const SERVICE_NAME_NAV_LINK_SERVICE = 'navigationLinkService';
    export const PROVIDER_NAME_NAV_LINK_SERVICE = SERVICE_NAME_NAV_LINK_SERVICE + 'Provider';
    export const DIRECTIVE_NAME_SN_NAV_LINK = 'snNavLink';
    export const DIRECTIVE_NAME_A_CONFIG_LINK = 'aConfigLink';
    export const DIRECTIVE_NAME_CONFIG_URL = 'configUrl';
    export const SERVICE_NAME_USER_PREFERENCES = 'userPreferences';
    export const CONTROLLER_NAME_MAIN_CONTENT = 'mainContent';
    export const CONTROLLER_NAME_DEFAULT_PAGE = 'defautPage';
    export const EVENT_NAME_GIT_URL_CHANGED = SERVICE_NAME_USER_PREFERENCES + ':gitUrlChanged';
    export const STORAGE_KEY_GIT_URL = SERVICE_NAME_USER_PREFERENCES + ':gitUrl';
    export const EVENT_NAME_SN_URL_CHANGED = SERVICE_NAME_USER_PREFERENCES + ':snUrlChanged';
    export const STORAGE_KEY_SN_URL = SERVICE_NAME_USER_PREFERENCES + ':snUrl';
    export const DEFAULT_URL_GIT_BASE = 'https://github.com/erwinel';
    export const DEFAULT_URL_SERVICENOW = 'https://inscomscd.service-now.com';

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

    /**
     * Handles W3C DOM event.
     * @export
     * @typedef {(event?: BaseJQueryEventObject) => void} DOMelementEventCallback
     * @param {BaseJQueryEventObject} [event] - Contains information about the W3C DOM event that occurred.
     */
    export type DOMelementEventCallback = (event?: BaseJQueryEventObject) => void;

    // #endregion

    // #region navigationLinkService Service

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

    export class NavigationLinkService {
        readonly [Symbol.toStringTag]: string = SERVICE_NAME_NAV_LINK_SERVICE;
        private _pageTitle = DEFAULT_PAGE_TITLE;
        private _pageSubTitle = '';
        private _mainScope: IMainContentControllerScope;
        private _currentRouteInfo: PageRouteInfo;
        private _currentRoute: ng.route.ICurrentRoute;

        public pageTitle(value?: string): string {
            if (arguments.length > 0) {
                this._pageTitle = (typeof value != "string" || (value = value.trim()).length == 0) ? DEFAULT_PAGE_TITLE : value;
                if (typeof this._mainScope !== "undefined")
                    this._mainScope.pageTitle = this._pageTitle;
            }
            return this._pageTitle;
        }

        public pageSubTitle(value?: string): string {
            if (arguments.length > 0) {
                if (this._pageSubTitle === (value = (typeof value != "string") ? "" : value.trim()))
                    return this._pageSubTitle;
                this._pageSubTitle = value;
                if (typeof this._mainScope !== "undefined") {
                    this._mainScope.subTitle = value;
                    this._mainScope.showSubtitle = value.length > 0;
                }
            }
        }

        private setCurrentRoute(route: NavRouteInfo): void {
            this.$log.info("Entering mainApp.NavigationLinkService.setCurrentRoute(route: " + angular.toJson(route, true) + ")");
            if (isRouteRedirectInfo(route)) {
                this.$log.info("Exiting mainApp.NavigationLinkService.setCurrentRoute(route: " + angular.toJson(route, true) + "): isRouteRedirectInfo(route) == true");
                return;
            }
            this._currentRouteInfo = route;
            if (routeInfoUsesDefaultController(route)) {
                this.pageTitle(route.title);
                this.pageSubTitle(route.subTitle);
                this.$log.info("Exiting mainApp.NavigationLinkService.setCurrentRoute(route: " + angular.toJson(route, true) + "): Using default controller");
            } else
                this.$log.info("Exiting mainApp.NavigationLinkService.setCurrentRoute(route: " + angular.toJson(route, true) + "): Using controller defined by route");
        }

        public getRouteInfoById(id: string): NavRouteInfo | undefined {
            this.$log.info("Entering pageManager.Service.getRouteInfoById(id: " + angular.toJson(id) + ")");
            for (let i: number = 0; i < this._pageRouteInfo.length; i++) {
                if ((<ICustomRouteMembers>this._pageRouteInfo[i]).id === id) {
                    this.$log.info("Exiting pageManager.Service.getRouteInfoById(id: " + angular.toJson(id) + "): route found at index " + i);
                    return this._pageRouteInfo[i];
                }
            }
            this.$log.warn("Exiting pageManager.Service.getRouteInfoById(id: " + angular.toJson(id) + "): no route found");
        }

        public currentPage(): PageRouteInfo { return this._currentRouteInfo; }

        public currentRoute(): ng.route.ICurrentRoute { return this._currentRoute; }

        constructor(private readonly $rootScope: ng.IRootScopeService, private readonly $log: ng.ILogService, private readonly _pageRouteInfo: ReadonlyArray<NavRouteInfo>) {
            $log.info("Entering mainApp.NavigationLinkService.constructor(ng.IRootScopeService, ng.ILogService, _pageRouteInfo: " + angular.toJson(_pageRouteInfo, true) + ")");
            const svc: NavigationLinkService = this;
            this.setCurrentRoute(_pageRouteInfo[0]);
            $rootScope.$on('$routeChangeSuccess', function (event: ng.IAngularEvent, current: ng.route.ICurrentRoute): void {
                $log.info("Entering pageManager.Service.$rootScope.$on('$routeChangeSuccess', { (event: ng.IAngularEvent, current: " + angular.toJson({ name: current.name }) + "): void; })");
                if (typeof current.name !== 'string') {
                    $log.warn("Exiting pageManager.Service.$rootScope.$on('$routeChangeSuccess', { (event: ng.IAngularEvent, current: " + angular.toJson({ name: current.name }) + "): void; }) - no route name");
                    return;
                }
                svc._currentRoute = current;
                let routeInfo: NavRouteInfo | undefined = svc.getRouteInfoById(current.name);
                if (typeof routeInfo !== 'undefined')
                    svc.setCurrentRoute(routeInfo);
                $log.info("Exiting pageManager.Service.$rootScope.$on('$routeChangeSuccess', { (event: ng.IAngularEvent, current: " + angular.toJson({ name: current.name }) + "): void; })");
            });
            $log.info("Exiting pageManager.Service.constructor($rootScope, $log, _pageRouteInfo)");
        }
    }
    
    function isRouteRedirectInfo(routeInfo: NavRouteInfo): routeInfo is RouteRedirectInfo {
        return typeof routeInfo === "object" && routeInfo !== null && typeof (<RouteRedirectInfo>routeInfo).redirectTo === "string";
    }
    function routeInfoHasPageTemplateUrl(routeInfo: NavRouteInfo): routeInfo is Exclude < PageRouteInfo, RouteTemplateString | RouteTemplateStringDefaultController > {
        return typeof routeInfo === "object" && routeInfo !== null && typeof (<RouteTemplateUrl>routeInfo).templateUrl === "string";
    }
    function routeInfoHasPageTemplateString(routeInfo: NavRouteInfo): routeInfo is Exclude < PageRouteInfo, RouteTemplateUrl | RouteTemplateUrlDefaultController > {
        return typeof routeInfo === "object" && routeInfo !== null && typeof (<RouteTemplateString>routeInfo).template === "string";
    }
    function routeInfoHasExplicitController(routeInfo: NavRouteInfo): routeInfo is Exclude < PageRouteInfo, RouteTemplateStringDefaultController | RouteTemplateUrlDefaultController > {
        return typeof routeInfo === "object" && routeInfo !== null && typeof (<RouteTemplateUrlDefaultController>routeInfo).title !== "string";
    }
    function routeInfoUsesDefaultController(routeInfo: NavRouteInfo): routeInfo is Exclude < PageRouteInfo, RouteTemplateString | RouteTemplateUrl > {
        return typeof routeInfo === "object" && routeInfo !== null && typeof (<RouteTemplateUrlDefaultController>routeInfo).title === "string";
    }

    export class NavigationLinkProvider implements ng.IServiceProvider {
        readonly [Symbol.toStringTag]: string = PROVIDER_NAME_NAV_LINK_SERVICE;
        private _pageRouteInfo: ReadonlyArray<RouteTemplateUrl | RouteTemplateString | RouteTemplateUrlDefaultController | RouteTemplateStringDefaultController | RouteRedirectInfo>;
        get $get(): ['$rootScope', '$log', ($rootScope: ng.IRootScopeService, $log: ng.ILogService) => NavigationLinkService] {
            window.console.log("Called mainApp.NavigationLinkProvider.$get()");
            let provider: NavigationLinkProvider = this;
            return ['$rootScope', '$log', function navigationLinkServiceFactory($rootScope: ng.IRootScopeService, $log: ng.ILogService): NavigationLinkService {
                window.console.log("Called mainApp.NavigationLinkProvider.$get()->navigationLinkServiceFactory(ng.IRootScopeService, ng.ILogService)");
                return new NavigationLinkService($rootScope, $log, provider.getRouteInfo());
            }];
        }
        private getRouteInfo(): ReadonlyArray<NavRouteInfo> {
            return this._pageRouteInfo.map(function (value: NavRouteInfo, index: number): NavRouteInfo {
                if (isRouteRedirectInfo(value))
                    return value;
                if (typeof value.id !== "string")
                    (<ICustomRouteMembers>value).id = "__page" + index;
                return <NavRouteInfo>value;
            });
        }
        ConfigureRoutes($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider, routes: (RouteTemplateUrl | RouteTemplateString | RouteTemplateUrlDefaultController | RouteTemplateStringDefaultController | RouteRedirectInfo)[]): void {
            window.console.log("Entering mainApp.NavigationLinkProvider.ConfigureRoutes(ng.route.IRouteProvider, ng.ILocationProvider, routes: " + angular.toJson(routes, true) + ")");
            this._pageRouteInfo = routes;
            $locationProvider.hashPrefix(HASH_PREFIX);
            routes.forEach(function (value: NavRouteInfo): void {
                window.console.log("Processing route " + angular.toJson(value, true) + ")");
                let routeDef: ng.route.IRoute;
                if (isRouteRedirectInfo(value))
                    routeDef = { redirectTo: value.redirectTo };
                else {
                    if (routeInfoUsesDefaultController(value))
                        routeDef = { controller: CONTROLLER_NAME_DEFAULT_PAGE, controllerAs: CONTROLLER_NAME_DEFAULT_PAGE };
                    else {
                        routeDef = { controller: value.controller };
                        if (typeof value.controllerAs === 'string')
                            routeDef.controllerAs = value.controllerAs;
                    }
                    routeDef.name = value.id;
                    if (routeInfoHasPageTemplateUrl(value))
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
                window.console.log("Adding route " + angular.toJson(value, true) + ")");
                $routeProvider.when(value.route, routeDef);
            });
            window.console.log("Exiting mainApp.NavigationLinkProvider.ConfigureRoutes(ng.route.IRouteProvider, ng.ILocationProvider, (RouteTemplateUrl | RouteTemplateString | RouteTemplateUrlDefaultController | RouteTemplateStringDefaultController | RouteRedirectInfo)[])");
        }
    }

    // #endregion

    // #region userPreferences Service

    export class UserPreferencesService {
        private _gitBaseUrl: URL;
        private _snBaseUrl: URL;

        readonly [Symbol.toStringTag]: string = SERVICE_NAME_USER_PREFERENCES;

        public normalizeBaseSnURL(value: URL | string): URL {
            let u: URL;
            if (typeof value === "string") {
                if (value.trim().length > 0)
                    u = new URL(value);
            } else
                u = value;
            if (typeof u !== "object" || u === null)
                u = new URL(DEFAULT_URL_SERVICENOW);
            if (typeof u.pathname === "string" && u.pathname.length > 0)
                u.pathname = "";
            if (typeof u.hash === "string" && u.hash.length > 0)
                u.hash = "";
            if (typeof u.search === "string" && u.search.length > 0)
                u.search = "";
            return u;
        }

        public normalizeBaseGitURL(value: URL | string): URL {
            let u: URL;
            if (typeof value === "string") {
                if (value.trim().length > 0)
                    u = new URL(value);
            } else
                u = value;
            if (typeof u !== "object" || u === null)
                u = new URL(DEFAULT_URL_GIT_BASE);
            if (typeof u.pathname === "string" && u.pathname.length > 0) {
                if (!u.pathname.startsWith("/"))
                    u.pathname = "/" + u.pathname;
                if (!u.pathname.endsWith("/"))
                    u.pathname = u.pathname + "/";
            } else
                u.pathname = "/";
            if (typeof u.hash === "string" && u.hash.length > 0)
                u.hash = "";
            if (typeof u.search === "string" && u.search.length > 0)
                u.search = "";
            return u;
        }

        public snBaseUrl(value?: URL): URL {
            if (arguments.length > 0) {
                this.$log.info("Entering mainApp.UserPreferencesService.snBaseUrl(value: " + angular.toJson(value) + ")");
                value = this.normalizeBaseSnURL(value);
                if (typeof this._snBaseUrl !== "undefined" && this._snBaseUrl.toJSON() == value.toJSON())
                    return this._snBaseUrl;
                let oldValue: URL = this._snBaseUrl;
                this._snBaseUrl = value;
                this.$window.localStorage.setItem(STORAGE_KEY_SN_URL, this._snBaseUrl.href);
                this.$log.info("Firing event " + EVENT_NAME_SN_URL_CHANGED + "(" + angular.toJson(oldValue) + ", " + angular.toJson(this._snBaseUrl) + ")");
                this.$root.$broadcast(EVENT_NAME_SN_URL_CHANGED, oldValue, this._snBaseUrl);
                this.$log.info("Exiting mainApp.UserPreferencesService.snBaseUrl(value: " + angular.toJson(value) + ")");
            }
            return this._snBaseUrl;
        }

        public gitBaseUrl(value?: URL): URL {
            if (arguments.length > 0) {
                this.$log.info("Entering mainApp.UserPreferencesService.gitBaseUrl(value: " + angular.toJson(value) + ")");
                value = this.normalizeBaseGitURL(value);
                if (typeof this._gitBaseUrl !== "undefined" && this._gitBaseUrl.toJSON() == value.toJSON())
                    return this._gitBaseUrl;
                let oldValue: URL = this._gitBaseUrl;
                this._gitBaseUrl = value;
                this.$window.localStorage.setItem(STORAGE_KEY_GIT_URL, this._gitBaseUrl.href);
                this.$log.info("Firing event " + EVENT_NAME_GIT_URL_CHANGED + "(" + angular.toJson(oldValue) + ", " + angular.toJson(this._gitBaseUrl) + ")");
                this.$root.$broadcast(EVENT_NAME_GIT_URL_CHANGED, oldValue, this._gitBaseUrl);
                this.$log.info("Exiting mainApp.UserPreferencesService.gitBaseUrl(value: " + angular.toJson(value) + ")");
            }
            return this._gitBaseUrl;
        }

        public addSnUrlChangeListener(scope: ng.IScope, cb: { (event: ng.IAngularEvent, oldValue: URL, newValue: URL): void; }) {
            scope.$on(EVENT_NAME_SN_URL_CHANGED, cb);
        }

        public removeSnUrlChangeListener(scope: ng.IScope) { scope.$on(EVENT_NAME_SN_URL_CHANGED, null); }

        public addGitUrlChangeListener(scope: ng.IScope, cb: { (event: ng.IAngularEvent, oldValue: URL, newValue: URL): void; }) {
            scope.$on(EVENT_NAME_GIT_URL_CHANGED, cb);
        }

        public removeGitUrlChangeListener(scope: ng.IScope) { scope.$on(EVENT_NAME_GIT_URL_CHANGED, null); }

        constructor(private readonly $root: ng.IRootScopeService, private readonly $window: ng.IWindowService, private readonly $log: ng.ILogService) {
            try { this._snBaseUrl = this.normalizeBaseSnURL(this.$window.localStorage.getItem(STORAGE_KEY_SN_URL)); } catch { /* okay to ignore */ }
            if (typeof this._snBaseUrl !== "object" || this._snBaseUrl === null)
                this._snBaseUrl = new URL(DEFAULT_URL_SERVICENOW);
            try { this._gitBaseUrl = this.normalizeBaseGitURL(this.$window.localStorage.getItem(STORAGE_KEY_GIT_URL)); } catch { /* okay to ignore */ }
            if (typeof this._gitBaseUrl !== "object" || this._gitBaseUrl === null)
                this._gitBaseUrl = new URL(DEFAULT_URL_GIT_BASE);
        }

        static getServiceInjectable(): ng.Injectable<Function> {
            window.console.log("called mainApp.UserPreferencesService.getServiceInjectable()");
            return ['$root', '$window', '$log', UserPreferencesService];
        }
    }

    // #endregion

    // #region mainContent Controller

    interface IMainContentControllerScope extends ng.IScope {
        pageTitle: string;
        subTitle: string;
        showSubtitle: boolean;
        mainSectionClass: string[];
        showNavAsideElement: boolean;
    }

    export class MainContentController implements ng.IController {
        readonly [Symbol.toStringTag]: string = CONTROLLER_NAME_MAIN_CONTENT;

        public get showNavAsideElement() { return this.$scope.showNavAsideElement; }
        public set showNavAsideElement(value: boolean) {
            if ((value = value == true) === this.$scope.showNavAsideElement)
                return;
            this.$scope.showNavAsideElement = value;
            this.updateSideNavVisibility();
        }
        private updateSideNavVisibility() {
            if (this.$scope.showNavAsideElement)
                this.$scope.mainSectionClass = ["container-fluid", "col-8", "col-lg-9"];
            else
                this.$scope.mainSectionClass = ["container-fluid", "col-12"];
        }

        public get pageTitle(): string { return this.$scope.pageTitle; }
        public set pageTitle(value: string) {
            this.$scope.pageTitle = (typeof value != "string" || (value = value.trim()).length == 0) ? DEFAULT_PAGE_TITLE : value;
        }

        public get subTitle(): string { return this.$scope.subTitle; }
        public set subTitle(value: string) {
            if (this.$scope.subTitle === (value = (typeof value != "string") ? "" : value.trim()))
                return;
            this.$scope.subTitle = value;
            this.$scope.showSubtitle = value.length > 0;
        }

        constructor(private readonly $scope: IMainContentControllerScope, navigationLinkService: NavigationLinkService, $log: ng.ILogService) {
            $log.info("Entering mainApp.MainContentController.constructor($scope, navigationLinkService, $log)");
            this.pageTitle = "";
            this.subTitle = "";
            this.showNavAsideElement = false;
            $log.info("Exiting mainApp.MainContentController.constructor($scope, navigationLinkService, $log)");
        }
        $doCheck(): void { }
        static getControllerInjectable(): ng.Injectable<ng.IControllerConstructor> {
            window.console.log("called mainApp.MainContentController.getControllerInjectable()");
            return ['$scope', SERVICE_NAME_NAV_LINK_SERVICE, '$log', MainContentController];
        }
    }

    // #endregion

    // #region defaultPage Controller

    interface IDefaultPageControllerScope extends ng.IScope {
    }

    export class DefaultPageController implements ng.IController {
        readonly [Symbol.toStringTag]: string = CONTROLLER_NAME_DEFAULT_PAGE;
        constructor(private readonly $scope: IDefaultPageControllerScope, navigationLinkService: NavigationLinkService, $log: ng.ILogService) {
            $log.info("Called mainApp.DefaultPageController.constructor($scope, navigationLinkService, $log)");
        }
        $doCheck(): void { }
        static getControllerInjectable(): ng.Injectable<ng.IControllerConstructor> {
            window.console.log("called mainApp.DefaultPageController.getControllerInjectable()");
            return ['$scope', SERVICE_NAME_NAV_LINK_SERVICE, '$log', DefaultPageController];
        }
    }

    // #endregion

    // #region sn-nav-link Directive

    interface ISnNavLinkAttributes extends ng.IAttributes { pathNodes: string; href?: string; toNav?: "true"|"false" }

    interface ISnNavLinkScope extends ng.IScope {
        nodeString: string;
        relativeHref?: string;
        pathNodes: string[];
        href: string;
        text: string;
        click: DOMelementEventCallback;
    }

    export class SnNavLinkController {
        readonly [Symbol.toStringTag]: string = DIRECTIVE_NAME_SN_NAV_LINK + "Controller";

        public get toNav(): boolean { return this.$scope.toNav === "true"; }

        private onUrlChange(baseUrl: URL): void {
            let nodes: string[] = (typeof this.$scope.nodeString !== "string") ? [] : this.$scope.nodeString.split("/").filter((value: string) => value.trim().length > 0);
            let e = nodes.length;
            if (e == 0) {
                while (this.$scope.pathNodes.length > 0)
                    this.$scope.pathNodes.pop();
                this.$scope.text = this.$scope.relativeHref;
            } else {
                this.$scope.text = nodes.pop();
                if (e > this.$scope.pathNodes.length) {
                    for (let i: number = 0; i < this.$scope.pathNodes.length; i++)
                        this.$scope.pathNodes[i] = nodes[i];
                    for (let i: number = this.$scope.pathNodes.length; i < e; i++)
                        this.$scope.pathNodes.push(nodes[i]);
                } else {
                    while (this.$scope.pathNodes.length > e)
                        this.$scope.pathNodes.pop();
                    for (let i: number = 0; i < e; i++)
                        this.$scope.pathNodes[i] = nodes[i];
                }
            }
            if (typeof baseUrl !== "object" || baseUrl == null || typeof baseUrl.href !== 'string' || baseUrl.href.trim().length == 0) {
                this.$scope.href = "#";
                return;
            }
            let path: string = this.$scope.relativeHref;
            if (typeof path === "string" && path.trim().length > 0) {
                let hash: string;
                let index: number = path.indexOf('#');
                if (index < 0)
                    hash = "";
                else {
                    hash = path.substring(index);
                    path = path.substring(0, index);
                }
                index = path.indexOf('?');
                let search: string;
                if (index < 0)
                    search = "";
                else {
                    search = path.substring(index);
                    path = path.substring(0, index);
                }
                baseUrl = this.userPreferences.normalizeBaseSnURL(new URL(baseUrl.href));
                if (this.toNav) {
                    baseUrl.pathname = "/nav_to.do";
                    baseUrl.search = "?uri=" + escape(path + search + hash);
                } else {
                    if (path.length > 0 && path === "/")
                        baseUrl = new URL((path.startsWith("/")) ? path : "/" + path, baseUrl);
                    if (search.length > 0)
                        baseUrl.search = search;
                    if (hash.length > 0)
                        baseUrl.hash = hash;
                }
            }
            this.$scope.href = baseUrl.href;
        }

        constructor(private readonly $scope: ISnNavLinkScope, private readonly userPreferences: UserPreferencesService, private readonly $log: ng.ILogService) {
            $scope.click = (event?: BaseJQueryEventObject) => {
                if (typeof event === "object" && event !== null && (typeof $scope.href !== "string" || $scope.href === "#")) {
                    if (!event.isDefaultPrevented())
                        event.preventDefault();
                    if (!event.isPropagationStopped())
                        event.stopPropagation();
                }
            };
            let controller: SnNavLinkController = this;
            $scope.$watchGroup(["nodeString", "relativeHref", "toNav"], () => {
                controller.onUrlChange(userPreferences.snBaseUrl());
            });
            userPreferences.addSnUrlChangeListener($scope, (event: ng.IAngularEvent, oldValue: URL, newValue: URL) => {
                controller.onUrlChange(newValue);
            });
        }

        static createDirective(): ng.IDirective {
            return <ng.IDirective>{
                restrict: "E",
                scope: {
                    nodeString: '@pathNodes',
                    relativeHref: '@href?',
                    toNav: '@?'
                },
                controller: ['$scope', SERVICE_NAME_USER_PREFERENCES, '$log', SnNavLinkController],
                template: '<span ng-repeat="n in pathNodes">{{text}} &rArr; </span><a ng-href="href" target="_blank" ng-click="click">{{text}}</a>',
                link: function (scope: ISnNavLinkScope, element: JQuery, instanceAttributes: ISnNavLinkAttributes, controller: SnNavLinkController): void {
                    controller.onUrlChange(controller.userPreferences.snBaseUrl());
                }
            };
        }
    }

    // #endregion

    // #region a:config-link

    interface IAConfigLinkAttributes extends ng.IAttributes { base: "sn" | "git"; href?: string; toNav?: "true" | "false" }

    interface IAConfigLinkAScope extends ng.IScope {
        base: "sn" | "git";
        relativeHref?: string;
        toNav: "true" | "false";
        href: string;
        click: DOMelementEventCallback;
    }

    export class AConfigLinkController {
        readonly [Symbol.toStringTag]: string = DIRECTIVE_NAME_A_CONFIG_LINK + "Controller";

        public get isGitUrl(): boolean { return this.$scope.base === "git"; }

        public get toNav(): boolean { return this.$scope.toNav === "true"; }

        private onUrlChange(baseUrl: URL): void {
            if (typeof baseUrl !== "object" || baseUrl == null || typeof baseUrl.href !== 'string' || baseUrl.href.trim().length == 0) {
                this.$scope.href = "#";
                return;
            }
            let path: string = this.$scope.relativeHref;
            if (typeof path === "string" && path.trim().length > 0) {
                let hash: string;
                let index: number = path.indexOf('#');
                if (index < 0)
                    hash = "";
                else {
                    hash = path.substring(index);
                    path = path.substring(0, index);
                }
                index = path.indexOf('?');
                let search: string;
                if (index < 0)
                    search = "";
                else {
                    search = path.substring(index);
                    path = path.substring(0, index);
                }
                if (this.isGitUrl) {
                    if (path === "/")
                        path = "";
                    else if (path.startsWith("/"))
                        path = path.substring(1);
                } else {
                    if (this.toNav) {
                        baseUrl = this.userPreferences.normalizeBaseSnURL(new URL(baseUrl.href));
                        baseUrl.pathname = "/nav_to.do";
                        baseUrl.search = "?uri=" + escape(path + search + hash);
                        this.$scope.href = baseUrl.href;
                        return;
                    }
                    if (path === "/")
                        path = "";
                    else if (!path.startsWith("/"))
                        path = "/" + path;
                }
                baseUrl = this.userPreferences.normalizeBaseGitURL(new URL(baseUrl.href));
                if (path.length > 0)
                    baseUrl = new URL(path, baseUrl);
                if (search.length > 0)
                    baseUrl.search = search;
                if (hash.length > 0)
                    baseUrl.hash = hash;
            }
            this.$scope.href = baseUrl.href;
        }

        constructor(private readonly $scope: IAConfigLinkAScope, private readonly userPreferences: UserPreferencesService, private readonly $log: ng.ILogService) {
            $scope.click = (event?: BaseJQueryEventObject) => {
                if (typeof event === "object" && event !== null && (typeof $scope.href !== "string" || $scope.href === "#")) {
                    if (!event.isDefaultPrevented())
                        event.preventDefault();
                    if (!event.isPropagationStopped())
                        event.stopPropagation();
                }
            };
            let controller: AConfigLinkController = this;
            $scope.$watchGroup(["base", "relativeHref", "toNav"], () => {
                if (this.isGitUrl)
                    controller.onUrlChange(userPreferences.gitBaseUrl());
                else
                    controller.onUrlChange(userPreferences.snBaseUrl());
            });
            userPreferences.addGitUrlChangeListener($scope, (event: ng.IAngularEvent, oldValue: URL, newValue: URL) => {
                if (this.isGitUrl)
                    controller.onUrlChange(newValue);
            });
            userPreferences.addSnUrlChangeListener($scope, (event: ng.IAngularEvent, oldValue: URL, newValue: URL) => {
                if (!this.isGitUrl)
                    controller.onUrlChange(newValue);
            });
        }

        static createDirective(): ng.IDirective {
            return <ng.IDirective>{
                restrict: "E",
                scope: {
                    base: '@',
                    relativeHref: '@href?',
                    toNav: '@?'
                },
                transclude: true,
                controller: ['$scope', SERVICE_NAME_USER_PREFERENCES, '$log', AConfigLinkController],
                template: '<a ng-href="href" target="_blank" ng-click="click"><ng-transclude></ng-transclude></a>',
                link: function (scope: IAConfigLinkAScope, element: JQuery, instanceAttributes: IAConfigLinkAttributes, controller: AConfigLinkController): void {
                    if (controller.isGitUrl)
                        controller.onUrlChange(controller.userPreferences.gitBaseUrl());
                    else
                        controller.onUrlChange(controller.userPreferences.snBaseUrl());
                }
            };
        }
    }

    // #endregion

    // #region config-url

    interface IConfigUrlAttributes extends ng.IAttributes { base: "sn" | "git"; href?: string; toNav?: "true" | "false"; text?: string }

    interface IConfigUrlLinkAScope extends ng.IScope {
        base: "sn" | "git";
        relativeHref?: string;
        toNav: "true" | "false";
        sourceText?: string;
        href: string;
        text: string;
        click: DOMelementEventCallback;
    }

    export class ConfigUrlController {
        readonly [Symbol.toStringTag]: string = DIRECTIVE_NAME_CONFIG_URL + "Controller";

        public get isGitUrl(): boolean { return this.$scope.base === "git"; }

        public get toNav(): boolean { return this.$scope.toNav === "true"; }

        private onUrlChange(baseUrl: URL): void {
            this.$scope.text = (typeof this.$scope.sourceText === "string" && this.$scope.sourceText.trim().length > 0) ? this.$scope.sourceText :
                ((typeof this.$scope.relativeHref === "string" && this.$scope.relativeHref.trim().length > 0) ? this.$scope.relativeHref : "" + baseUrl);
            if (typeof baseUrl !== "object" || baseUrl == null || typeof baseUrl.href !== 'string' || baseUrl.href.trim().length == 0) {
                this.$scope.href = "#";
                return;
            }
            let path: string = this.$scope.relativeHref;
            if (typeof path === "string" && path.trim().length > 0) {
                let hash: string;
                let index: number = path.indexOf('#');
                if (index < 0)
                    hash = "";
                else {
                    hash = path.substring(index);
                    path = path.substring(0, index);
                }
                index = path.indexOf('?');
                let search: string;
                if (index < 0)
                    search = "";
                else {
                    search = path.substring(index);
                    path = path.substring(0, index);
                }
                if (this.isGitUrl) {
                    if (path === "/")
                        path = "";
                    else if (path.startsWith("/"))
                        path = path.substring(1);
                } else {
                    if (this.toNav) {
                        baseUrl = this.userPreferences.normalizeBaseSnURL(new URL(baseUrl.href));
                        baseUrl.pathname = "/nav_to.do";
                        baseUrl.search = "?uri=" + escape(path + search + hash);
                        this.$scope.href = baseUrl.href;
                        return;
                    }
                    if (path === "/")
                        path = "";
                    else if (!path.startsWith("/"))
                        path = "/" + path;
                }
                baseUrl = this.userPreferences.normalizeBaseGitURL(new URL(baseUrl.href));
                if (path.length > 0)
                    baseUrl = new URL(path, baseUrl);
                if (search.length > 0)
                    baseUrl.search = search;
                if (hash.length > 0)
                    baseUrl.hash = hash;
            }
            this.$scope.href = baseUrl.href;
        }

        constructor(private readonly $scope: IConfigUrlLinkAScope, private readonly userPreferences: UserPreferencesService, private readonly $log: ng.ILogService) {
            $scope.click = (event?: BaseJQueryEventObject) => {
                if (typeof event === "object" && event !== null && (typeof $scope.href !== "string" || $scope.href === "#")) {
                    if (!event.isDefaultPrevented())
                        event.preventDefault();
                    if (!event.isPropagationStopped())
                        event.stopPropagation();
                }
            };
            let controller: ConfigUrlController = this;
            $scope.$watchGroup(["base", "relativeHref", "toNav", "sourceText"], () => {
                if (this.isGitUrl)
                    controller.onUrlChange(userPreferences.gitBaseUrl());
                else
                    controller.onUrlChange(userPreferences.snBaseUrl());
            });
            userPreferences.addGitUrlChangeListener($scope, (event: ng.IAngularEvent, oldValue: URL, newValue: URL) => {
                if (this.isGitUrl)
                    controller.onUrlChange(newValue);
            });
            userPreferences.addSnUrlChangeListener($scope, (event: ng.IAngularEvent, oldValue: URL, newValue: URL) => {
                if (!this.isGitUrl)
                    controller.onUrlChange(newValue);
            });
        }

        static createDirective(): ng.IDirective {
            return <ng.IDirective>{
                restrict: "E",
                scope: {
                    base: '@',
                    relativeHref: '@href?',
                    sourceText: '@text?',
                    toNav: '@?'
                },
                controller: ['$scope', SERVICE_NAME_USER_PREFERENCES, '$log', ConfigUrlController],
                template: '<a ng-href="href" target="_blank" ng-click="click">{{text}}</a>',
                link: function (scope: IConfigUrlLinkAScope, element: JQuery, instanceAttributes: IConfigUrlAttributes, controller: ConfigUrlController): void {
                    if (controller.isGitUrl)
                        controller.onUrlChange(controller.userPreferences.gitBaseUrl());
                    else
                        controller.onUrlChange(controller.userPreferences.snBaseUrl());
                }
            };
        }
    }

    // #endregion

    export const mainAppModule: ng.IModule = angular.module("mainApp", ['ngRoute'])
        .provider(SERVICE_NAME_NAV_LINK_SERVICE, NavigationLinkProvider)
        .config(['$locationProvider', '$routeProvider', PROVIDER_NAME_NAV_LINK_SERVICE,
            function ($locationProvider: ng.ILocationProvider, $routeProvider: ng.route.IRouteProvider, navigationLinkServiceProvider: NavigationLinkProvider) {
                window.console.log("Entering mainApp.config()");
                navigationLinkServiceProvider.ConfigureRoutes($routeProvider, $locationProvider, [
                    {
                        templateUrl: 'Template/Pages/Home.htm',
                        route: '/home',
                        title: DEFAULT_PAGE_TITLE,
                        linkTitle: "Home"
                    },
                    {
                        templateUrl: 'Template/Pages/InitialConfig.htm',
                        route: '/initialConfig',
                        title: 'Initial Configuration Instructions',
                        linkTitle: 'Initial Config'
                    },
                    { route: '/', redirectTo: "/home" }
                ]);
                window.console.log("Exiting mainApp.config()");
            }])
        .service(SERVICE_NAME_USER_PREFERENCES, UserPreferencesService.getServiceInjectable())
        .directive(DIRECTIVE_NAME_SN_NAV_LINK, SnNavLinkController.createDirective)
        .directive(DIRECTIVE_NAME_A_CONFIG_LINK, AConfigLinkController.createDirective)
        .directive(DIRECTIVE_NAME_CONFIG_URL, ConfigUrlController.createDirective)
        .controller(CONTROLLER_NAME_MAIN_CONTENT, MainContentController.getControllerInjectable())
        .controller(CONTROLLER_NAME_DEFAULT_PAGE, DefaultPageController.getControllerInjectable());
}
