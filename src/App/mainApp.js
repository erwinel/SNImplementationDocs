/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
var mainApp;
(function (mainApp) {
    // #region Constant definitions
    mainApp.DEFAULT_PAGE_TITLE = 'ServiceNow Implementation and Maintenance';
    mainApp.SERVICE_NAME_NAV_LINK_SERVICE = 'navigationLinkService';
    mainApp.PROVIDER_NAME_NAV_LINK_SERVICE = mainApp.SERVICE_NAME_NAV_LINK_SERVICE + 'Provider';
    mainApp.DIRECTIVE_NAME_SN_NAV_LINK = 'snNavLink';
    mainApp.DIRECTIVE_NAME_A_CONFIG_LINK = 'aConfigLink';
    mainApp.DIRECTIVE_NAME_CONFIG_URL = 'configUrl';
    mainApp.SERVICE_NAME_USER_PREFERENCES = 'userPreferences';
    mainApp.CONTROLLER_NAME_MAIN_CONTENT = 'mainContent';
    mainApp.CONTROLLER_NAME_DEFAULT_PAGE = 'defautPage';
    mainApp.EVENT_NAME_GIT_URL_CHANGED = mainApp.SERVICE_NAME_USER_PREFERENCES + ':gitUrlChanged';
    mainApp.STORAGE_KEY_GIT_URL = mainApp.SERVICE_NAME_USER_PREFERENCES + ':gitUrl';
    mainApp.EVENT_NAME_SN_URL_CHANGED = mainApp.SERVICE_NAME_USER_PREFERENCES + ':snUrlChanged';
    mainApp.STORAGE_KEY_SN_URL = mainApp.SERVICE_NAME_USER_PREFERENCES + ':snUrl';
    mainApp.DEFAULT_URL_GIT_BASE = 'https://github.com/erwinel';
    mainApp.DEFAULT_URL_SERVICENOW = 'https://inscomscd.service-now.com';
    /**
     * Prefix for hash portion of navigation URI strings.
     * @export
     * @constant HashPrefix
     * @type {"!"}
     */
    mainApp.HASH_PREFIX = '!';
    /**
     * Prefix for relative navigation URI path strings.
     * @export
     * @constant NavPrefix
     * @type {"#!"}
     */
    mainApp.NAV_PREFIX = '#!';
    class NavigationLinkService {
        constructor($rootScope, $log, _pageRouteInfo) {
            this.$rootScope = $rootScope;
            this.$log = $log;
            this._pageRouteInfo = _pageRouteInfo;
            this[Symbol.toStringTag] = mainApp.SERVICE_NAME_NAV_LINK_SERVICE;
            this._pageTitle = mainApp.DEFAULT_PAGE_TITLE;
            this._pageSubTitle = '';
            $log.info("Entering mainApp.NavigationLinkService.constructor(ng.IRootScopeService, ng.ILogService, _pageRouteInfo: " + angular.toJson(_pageRouteInfo, true) + ")");
            const svc = this;
            this.setCurrentRoute(_pageRouteInfo[0]);
            $rootScope.$on('$routeChangeSuccess', function (event, current) {
                $log.info("Entering pageManager.Service.$rootScope.$on('$routeChangeSuccess', { (event: ng.IAngularEvent, current: " + angular.toJson({ name: current.name }) + "): void; })");
                if (typeof current.name !== 'string') {
                    $log.warn("Exiting pageManager.Service.$rootScope.$on('$routeChangeSuccess', { (event: ng.IAngularEvent, current: " + angular.toJson({ name: current.name }) + "): void; }) - no route name");
                    return;
                }
                svc._currentRoute = current;
                let routeInfo = svc.getRouteInfoById(current.name);
                if (typeof routeInfo !== 'undefined')
                    svc.setCurrentRoute(routeInfo);
                $log.info("Exiting pageManager.Service.$rootScope.$on('$routeChangeSuccess', { (event: ng.IAngularEvent, current: " + angular.toJson({ name: current.name }) + "): void; })");
            });
            $log.info("Exiting pageManager.Service.constructor($rootScope, $log, _pageRouteInfo)");
        }
        pageTitle(value) {
            if (arguments.length > 0) {
                this._pageTitle = (typeof value != "string" || (value = value.trim()).length == 0) ? mainApp.DEFAULT_PAGE_TITLE : value;
                if (typeof this._mainScope !== "undefined")
                    this._mainScope.pageTitle = this._pageTitle;
            }
            return this._pageTitle;
        }
        pageSubTitle(value) {
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
        setCurrentRoute(route) {
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
            }
            else
                this.$log.info("Exiting mainApp.NavigationLinkService.setCurrentRoute(route: " + angular.toJson(route, true) + "): Using controller defined by route");
        }
        getRouteInfoById(id) {
            this.$log.info("Entering pageManager.Service.getRouteInfoById(id: " + angular.toJson(id) + ")");
            for (let i = 0; i < this._pageRouteInfo.length; i++) {
                if (this._pageRouteInfo[i].id === id) {
                    this.$log.info("Exiting pageManager.Service.getRouteInfoById(id: " + angular.toJson(id) + "): route found at index " + i);
                    return this._pageRouteInfo[i];
                }
            }
            this.$log.warn("Exiting pageManager.Service.getRouteInfoById(id: " + angular.toJson(id) + "): no route found");
        }
        currentPage() { return this._currentRouteInfo; }
        currentRoute() { return this._currentRoute; }
    }
    mainApp.NavigationLinkService = NavigationLinkService;
    function isRouteRedirectInfo(routeInfo) {
        return typeof routeInfo === "object" && routeInfo !== null && typeof routeInfo.redirectTo === "string";
    }
    function routeInfoHasPageTemplateUrl(routeInfo) {
        return typeof routeInfo === "object" && routeInfo !== null && typeof routeInfo.templateUrl === "string";
    }
    function routeInfoHasPageTemplateString(routeInfo) {
        return typeof routeInfo === "object" && routeInfo !== null && typeof routeInfo.template === "string";
    }
    function routeInfoHasExplicitController(routeInfo) {
        return typeof routeInfo === "object" && routeInfo !== null && typeof routeInfo.title !== "string";
    }
    function routeInfoUsesDefaultController(routeInfo) {
        return typeof routeInfo === "object" && routeInfo !== null && typeof routeInfo.title === "string";
    }
    class NavigationLinkProvider {
        constructor() {
            this[Symbol.toStringTag] = mainApp.PROVIDER_NAME_NAV_LINK_SERVICE;
        }
        get $get() {
            window.console.log("Called mainApp.NavigationLinkProvider.$get()");
            let provider = this;
            return ['$rootScope', '$log', function navigationLinkServiceFactory($rootScope, $log) {
                    window.console.log("Called mainApp.NavigationLinkProvider.$get()->navigationLinkServiceFactory(ng.IRootScopeService, ng.ILogService)");
                    return new NavigationLinkService($rootScope, $log, provider.getRouteInfo());
                }];
        }
        getRouteInfo() {
            return this._pageRouteInfo.map(function (value, index) {
                if (isRouteRedirectInfo(value))
                    return value;
                if (typeof value.id !== "string")
                    value.id = "__page" + index;
                return value;
            });
        }
        ConfigureRoutes($routeProvider, $locationProvider, routes) {
            window.console.log("Entering mainApp.NavigationLinkProvider.ConfigureRoutes(ng.route.IRouteProvider, ng.ILocationProvider, routes: " + angular.toJson(routes, true) + ")");
            this._pageRouteInfo = routes;
            $locationProvider.hashPrefix(mainApp.HASH_PREFIX);
            routes.forEach(function (value) {
                window.console.log("Processing route " + angular.toJson(value, true) + ")");
                let routeDef;
                if (isRouteRedirectInfo(value))
                    routeDef = { redirectTo: value.redirectTo };
                else {
                    if (routeInfoUsesDefaultController(value))
                        routeDef = { controller: mainApp.CONTROLLER_NAME_DEFAULT_PAGE, controllerAs: mainApp.CONTROLLER_NAME_DEFAULT_PAGE };
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
    mainApp.NavigationLinkProvider = NavigationLinkProvider;
    // #endregion
    // #region userPreferences Service
    class UserPreferencesService {
        constructor($root, $window, $log) {
            this.$root = $root;
            this.$window = $window;
            this.$log = $log;
            this[Symbol.toStringTag] = mainApp.SERVICE_NAME_USER_PREFERENCES;
            try {
                this._snBaseUrl = this.normalizeBaseSnURL(this.$window.localStorage.getItem(mainApp.STORAGE_KEY_SN_URL));
            }
            catch ( /* okay to ignore */_a) { /* okay to ignore */ }
            if (typeof this._snBaseUrl !== "object" || this._snBaseUrl === null)
                this._snBaseUrl = new URL(mainApp.DEFAULT_URL_SERVICENOW);
            try {
                this._gitBaseUrl = this.normalizeBaseGitURL(this.$window.localStorage.getItem(mainApp.STORAGE_KEY_GIT_URL));
            }
            catch ( /* okay to ignore */_b) { /* okay to ignore */ }
            if (typeof this._gitBaseUrl !== "object" || this._gitBaseUrl === null)
                this._gitBaseUrl = new URL(mainApp.DEFAULT_URL_GIT_BASE);
        }
        normalizeBaseSnURL(value) {
            let u;
            if (typeof value === "string") {
                if (value.trim().length > 0)
                    u = new URL(value);
            }
            else
                u = value;
            if (typeof u !== "object" || u === null)
                u = new URL(mainApp.DEFAULT_URL_SERVICENOW);
            if (typeof u.pathname === "string" && u.pathname.length > 0)
                u.pathname = "";
            if (typeof u.hash === "string" && u.hash.length > 0)
                u.hash = "";
            if (typeof u.search === "string" && u.search.length > 0)
                u.search = "";
            return u;
        }
        normalizeBaseGitURL(value) {
            let u;
            if (typeof value === "string") {
                if (value.trim().length > 0)
                    u = new URL(value);
            }
            else
                u = value;
            if (typeof u !== "object" || u === null)
                u = new URL(mainApp.DEFAULT_URL_GIT_BASE);
            if (typeof u.pathname === "string" && u.pathname.length > 0) {
                if (!u.pathname.startsWith("/"))
                    u.pathname = "/" + u.pathname;
                if (!u.pathname.endsWith("/"))
                    u.pathname = u.pathname + "/";
            }
            else
                u.pathname = "/";
            if (typeof u.hash === "string" && u.hash.length > 0)
                u.hash = "";
            if (typeof u.search === "string" && u.search.length > 0)
                u.search = "";
            return u;
        }
        snBaseUrl(value) {
            if (arguments.length > 0) {
                this.$log.info("Entering mainApp.UserPreferencesService.snBaseUrl(value: " + angular.toJson(value) + ")");
                value = this.normalizeBaseSnURL(value);
                if (typeof this._snBaseUrl !== "undefined" && this._snBaseUrl.toJSON() == value.toJSON())
                    return this._snBaseUrl;
                let oldValue = this._snBaseUrl;
                this._snBaseUrl = value;
                this.$window.localStorage.setItem(mainApp.STORAGE_KEY_SN_URL, this._snBaseUrl.href);
                this.$log.info("Firing event " + mainApp.EVENT_NAME_SN_URL_CHANGED + "(" + angular.toJson(oldValue) + ", " + angular.toJson(this._snBaseUrl) + ")");
                this.$root.$broadcast(mainApp.EVENT_NAME_SN_URL_CHANGED, oldValue, this._snBaseUrl);
                this.$log.info("Exiting mainApp.UserPreferencesService.snBaseUrl(value: " + angular.toJson(value) + ")");
            }
            return this._snBaseUrl;
        }
        gitBaseUrl(value) {
            if (arguments.length > 0) {
                this.$log.info("Entering mainApp.UserPreferencesService.gitBaseUrl(value: " + angular.toJson(value) + ")");
                value = this.normalizeBaseGitURL(value);
                if (typeof this._gitBaseUrl !== "undefined" && this._gitBaseUrl.toJSON() == value.toJSON())
                    return this._gitBaseUrl;
                let oldValue = this._gitBaseUrl;
                this._gitBaseUrl = value;
                this.$window.localStorage.setItem(mainApp.STORAGE_KEY_GIT_URL, this._gitBaseUrl.href);
                this.$log.info("Firing event " + mainApp.EVENT_NAME_GIT_URL_CHANGED + "(" + angular.toJson(oldValue) + ", " + angular.toJson(this._gitBaseUrl) + ")");
                this.$root.$broadcast(mainApp.EVENT_NAME_GIT_URL_CHANGED, oldValue, this._gitBaseUrl);
                this.$log.info("Exiting mainApp.UserPreferencesService.gitBaseUrl(value: " + angular.toJson(value) + ")");
            }
            return this._gitBaseUrl;
        }
        addSnUrlChangeListener(scope, cb) {
            scope.$on(mainApp.EVENT_NAME_SN_URL_CHANGED, cb);
        }
        removeSnUrlChangeListener(scope) { scope.$on(mainApp.EVENT_NAME_SN_URL_CHANGED, null); }
        addGitUrlChangeListener(scope, cb) {
            scope.$on(mainApp.EVENT_NAME_GIT_URL_CHANGED, cb);
        }
        removeGitUrlChangeListener(scope) { scope.$on(mainApp.EVENT_NAME_GIT_URL_CHANGED, null); }
        static getServiceInjectable() {
            window.console.log("called mainApp.UserPreferencesService.getServiceInjectable()");
            return ['$root', '$window', '$log', UserPreferencesService];
        }
    }
    mainApp.UserPreferencesService = UserPreferencesService;
    class MainContentController {
        constructor($scope, navigationLinkService, $log) {
            this.$scope = $scope;
            this[Symbol.toStringTag] = mainApp.CONTROLLER_NAME_MAIN_CONTENT;
            $log.info("Entering mainApp.MainContentController.constructor($scope, navigationLinkService, $log)");
            this.pageTitle = "";
            this.subTitle = "";
            this.showNavAsideElement = false;
            $log.info("Exiting mainApp.MainContentController.constructor($scope, navigationLinkService, $log)");
        }
        get showNavAsideElement() { return this.$scope.showNavAsideElement; }
        set showNavAsideElement(value) {
            if ((value = value == true) === this.$scope.showNavAsideElement)
                return;
            this.$scope.showNavAsideElement = value;
            this.updateSideNavVisibility();
        }
        updateSideNavVisibility() {
            if (this.$scope.showNavAsideElement)
                this.$scope.mainSectionClass = ["container-fluid", "col-8", "col-lg-9"];
            else
                this.$scope.mainSectionClass = ["container-fluid", "col-12"];
        }
        get pageTitle() { return this.$scope.pageTitle; }
        set pageTitle(value) {
            this.$scope.pageTitle = (typeof value != "string" || (value = value.trim()).length == 0) ? mainApp.DEFAULT_PAGE_TITLE : value;
        }
        get subTitle() { return this.$scope.subTitle; }
        set subTitle(value) {
            if (this.$scope.subTitle === (value = (typeof value != "string") ? "" : value.trim()))
                return;
            this.$scope.subTitle = value;
            this.$scope.showSubtitle = value.length > 0;
        }
        $doCheck() { }
        static getControllerInjectable() {
            window.console.log("called mainApp.MainContentController.getControllerInjectable()");
            return ['$scope', mainApp.SERVICE_NAME_NAV_LINK_SERVICE, '$log', MainContentController];
        }
    }
    mainApp.MainContentController = MainContentController;
    class DefaultPageController {
        constructor($scope, navigationLinkService, $log) {
            this.$scope = $scope;
            this[Symbol.toStringTag] = mainApp.CONTROLLER_NAME_DEFAULT_PAGE;
            $log.info("Called mainApp.DefaultPageController.constructor($scope, navigationLinkService, $log)");
        }
        $doCheck() { }
        static getControllerInjectable() {
            window.console.log("called mainApp.DefaultPageController.getControllerInjectable()");
            return ['$scope', mainApp.SERVICE_NAME_NAV_LINK_SERVICE, '$log', DefaultPageController];
        }
    }
    mainApp.DefaultPageController = DefaultPageController;
    class SnNavLinkController {
        constructor($scope, userPreferences, $log) {
            this.$scope = $scope;
            this.userPreferences = userPreferences;
            this.$log = $log;
            this[Symbol.toStringTag] = mainApp.DIRECTIVE_NAME_SN_NAV_LINK + "Controller";
            $scope.click = (event) => {
                if (typeof event === "object" && event !== null && (typeof $scope.href !== "string" || $scope.href === "#")) {
                    if (!event.isDefaultPrevented())
                        event.preventDefault();
                    if (!event.isPropagationStopped())
                        event.stopPropagation();
                }
            };
            let controller = this;
            $scope.$watchGroup(["nodeString", "relativeHref", "toNav"], () => {
                controller.onUrlChange(userPreferences.snBaseUrl());
            });
            userPreferences.addSnUrlChangeListener($scope, (event, oldValue, newValue) => {
                controller.onUrlChange(newValue);
            });
        }
        get toNav() { return this.$scope.toNav === "true"; }
        onUrlChange(baseUrl) {
            let nodes = (typeof this.$scope.nodeString !== "string") ? [] : this.$scope.nodeString.split("/").filter((value) => value.trim().length > 0);
            let e = nodes.length;
            if (e == 0) {
                while (this.$scope.pathNodes.length > 0)
                    this.$scope.pathNodes.pop();
                this.$scope.text = this.$scope.relativeHref;
            }
            else {
                this.$scope.text = nodes.pop();
                if (e > this.$scope.pathNodes.length) {
                    for (let i = 0; i < this.$scope.pathNodes.length; i++)
                        this.$scope.pathNodes[i] = nodes[i];
                    for (let i = this.$scope.pathNodes.length; i < e; i++)
                        this.$scope.pathNodes.push(nodes[i]);
                }
                else {
                    while (this.$scope.pathNodes.length > e)
                        this.$scope.pathNodes.pop();
                    for (let i = 0; i < e; i++)
                        this.$scope.pathNodes[i] = nodes[i];
                }
            }
            if (typeof baseUrl !== "object" || baseUrl == null || typeof baseUrl.href !== 'string' || baseUrl.href.trim().length == 0) {
                this.$scope.href = "#";
                return;
            }
            let path = this.$scope.relativeHref;
            if (typeof path === "string" && path.trim().length > 0) {
                let hash;
                let index = path.indexOf('#');
                if (index < 0)
                    hash = "";
                else {
                    hash = path.substring(index);
                    path = path.substring(0, index);
                }
                index = path.indexOf('?');
                let search;
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
                }
                else {
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
        static createDirective() {
            return {
                restrict: "E",
                scope: {
                    nodeString: '@pathNodes',
                    relativeHref: '@href?',
                    toNav: '@?'
                },
                controller: ['$scope', mainApp.SERVICE_NAME_USER_PREFERENCES, '$log', SnNavLinkController],
                template: '<span ng-repeat="n in pathNodes">{{text}} &rArr; </span><a ng-href="href" target="_blank" ng-click="click">{{text}}</a>',
                link: function (scope, element, instanceAttributes, controller) {
                    controller.onUrlChange(controller.userPreferences.snBaseUrl());
                }
            };
        }
    }
    mainApp.SnNavLinkController = SnNavLinkController;
    class AConfigLinkController {
        constructor($scope, userPreferences, $log) {
            this.$scope = $scope;
            this.userPreferences = userPreferences;
            this.$log = $log;
            this[Symbol.toStringTag] = mainApp.DIRECTIVE_NAME_A_CONFIG_LINK + "Controller";
            $scope.click = (event) => {
                if (typeof event === "object" && event !== null && (typeof $scope.href !== "string" || $scope.href === "#")) {
                    if (!event.isDefaultPrevented())
                        event.preventDefault();
                    if (!event.isPropagationStopped())
                        event.stopPropagation();
                }
            };
            let controller = this;
            $scope.$watchGroup(["base", "relativeHref", "toNav"], () => {
                if (this.isGitUrl)
                    controller.onUrlChange(userPreferences.gitBaseUrl());
                else
                    controller.onUrlChange(userPreferences.snBaseUrl());
            });
            userPreferences.addGitUrlChangeListener($scope, (event, oldValue, newValue) => {
                if (this.isGitUrl)
                    controller.onUrlChange(newValue);
            });
            userPreferences.addSnUrlChangeListener($scope, (event, oldValue, newValue) => {
                if (!this.isGitUrl)
                    controller.onUrlChange(newValue);
            });
        }
        get isGitUrl() { return this.$scope.base === "git"; }
        get toNav() { return this.$scope.toNav === "true"; }
        onUrlChange(baseUrl) {
            if (typeof baseUrl !== "object" || baseUrl == null || typeof baseUrl.href !== 'string' || baseUrl.href.trim().length == 0) {
                this.$scope.href = "#";
                return;
            }
            let path = this.$scope.relativeHref;
            if (typeof path === "string" && path.trim().length > 0) {
                let hash;
                let index = path.indexOf('#');
                if (index < 0)
                    hash = "";
                else {
                    hash = path.substring(index);
                    path = path.substring(0, index);
                }
                index = path.indexOf('?');
                let search;
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
                }
                else {
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
        static createDirective() {
            return {
                restrict: "E",
                scope: {
                    base: '@',
                    relativeHref: '@href?',
                    toNav: '@?'
                },
                transclude: true,
                controller: ['$scope', mainApp.SERVICE_NAME_USER_PREFERENCES, '$log', AConfigLinkController],
                template: '<a ng-href="href" target="_blank" ng-click="click"><ng-transclude></ng-transclude></a>',
                link: function (scope, element, instanceAttributes, controller) {
                    if (controller.isGitUrl)
                        controller.onUrlChange(controller.userPreferences.gitBaseUrl());
                    else
                        controller.onUrlChange(controller.userPreferences.snBaseUrl());
                }
            };
        }
    }
    mainApp.AConfigLinkController = AConfigLinkController;
    class ConfigUrlController {
        constructor($scope, userPreferences, $log) {
            this.$scope = $scope;
            this.userPreferences = userPreferences;
            this.$log = $log;
            this[Symbol.toStringTag] = mainApp.DIRECTIVE_NAME_CONFIG_URL + "Controller";
            $scope.click = (event) => {
                if (typeof event === "object" && event !== null && (typeof $scope.href !== "string" || $scope.href === "#")) {
                    if (!event.isDefaultPrevented())
                        event.preventDefault();
                    if (!event.isPropagationStopped())
                        event.stopPropagation();
                }
            };
            let controller = this;
            $scope.$watchGroup(["base", "relativeHref", "toNav", "sourceText"], () => {
                if (this.isGitUrl)
                    controller.onUrlChange(userPreferences.gitBaseUrl());
                else
                    controller.onUrlChange(userPreferences.snBaseUrl());
            });
            userPreferences.addGitUrlChangeListener($scope, (event, oldValue, newValue) => {
                if (this.isGitUrl)
                    controller.onUrlChange(newValue);
            });
            userPreferences.addSnUrlChangeListener($scope, (event, oldValue, newValue) => {
                if (!this.isGitUrl)
                    controller.onUrlChange(newValue);
            });
        }
        get isGitUrl() { return this.$scope.base === "git"; }
        get toNav() { return this.$scope.toNav === "true"; }
        onUrlChange(baseUrl) {
            this.$scope.text = (typeof this.$scope.sourceText === "string" && this.$scope.sourceText.trim().length > 0) ? this.$scope.sourceText :
                ((typeof this.$scope.relativeHref === "string" && this.$scope.relativeHref.trim().length > 0) ? this.$scope.relativeHref : "" + baseUrl);
            if (typeof baseUrl !== "object" || baseUrl == null || typeof baseUrl.href !== 'string' || baseUrl.href.trim().length == 0) {
                this.$scope.href = "#";
                return;
            }
            let path = this.$scope.relativeHref;
            if (typeof path === "string" && path.trim().length > 0) {
                let hash;
                let index = path.indexOf('#');
                if (index < 0)
                    hash = "";
                else {
                    hash = path.substring(index);
                    path = path.substring(0, index);
                }
                index = path.indexOf('?');
                let search;
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
                }
                else {
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
        static createDirective() {
            return {
                restrict: "E",
                scope: {
                    base: '@',
                    relativeHref: '@href?',
                    sourceText: '@text?',
                    toNav: '@?'
                },
                controller: ['$scope', mainApp.SERVICE_NAME_USER_PREFERENCES, '$log', ConfigUrlController],
                template: '<a ng-href="href" target="_blank" ng-click="click">{{text}}</a>',
                link: function (scope, element, instanceAttributes, controller) {
                    if (controller.isGitUrl)
                        controller.onUrlChange(controller.userPreferences.gitBaseUrl());
                    else
                        controller.onUrlChange(controller.userPreferences.snBaseUrl());
                }
            };
        }
    }
    mainApp.ConfigUrlController = ConfigUrlController;
    // #endregion
    mainApp.mainAppModule = angular.module("mainApp", ['ngRoute'])
        .provider(mainApp.SERVICE_NAME_NAV_LINK_SERVICE, NavigationLinkProvider)
        .config(['$locationProvider', '$routeProvider', mainApp.PROVIDER_NAME_NAV_LINK_SERVICE,
        function ($locationProvider, $routeProvider, navigationLinkServiceProvider) {
            window.console.log("Entering mainApp.config()");
            navigationLinkServiceProvider.ConfigureRoutes($routeProvider, $locationProvider, [
                {
                    templateUrl: 'Template/Pages/Home.htm',
                    route: '/home',
                    title: mainApp.DEFAULT_PAGE_TITLE,
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
        .service(mainApp.SERVICE_NAME_USER_PREFERENCES, UserPreferencesService.getServiceInjectable())
        .directive(mainApp.DIRECTIVE_NAME_SN_NAV_LINK, SnNavLinkController.createDirective)
        .directive(mainApp.DIRECTIVE_NAME_A_CONFIG_LINK, AConfigLinkController.createDirective)
        .directive(mainApp.DIRECTIVE_NAME_CONFIG_URL, ConfigUrlController.createDirective)
        .controller(mainApp.CONTROLLER_NAME_MAIN_CONTENT, MainContentController.getControllerInjectable())
        .controller(mainApp.CONTROLLER_NAME_DEFAULT_PAGE, DefaultPageController.getControllerInjectable());
})(mainApp || (mainApp = {}));
//# sourceMappingURL=mainApp.js.map