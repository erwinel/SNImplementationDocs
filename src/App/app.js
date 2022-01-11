/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="IncidentManagement.ts" />
var persistentStorageLoaderService;
(function (persistentStorageLoaderService) {
    /**
     * Defines the service name as "persistentStorageLoader".
     * @export
     * @constant {string}
     */
    persistentStorageLoaderService.SERVICE_NAME = "persistentStorageLoader";
    /**
     * The session storage key used by the {@link Service} for storing URL configuration information.
     * @export
     * @constant {string}
     */
    persistentStorageLoaderService.STORAGEKEY_URL_CONFIG_SETTINGS = "UrlConfig";
    class SessionStorageEntryEnumerator {
        constructor(_window, _keys) {
            this._window = _window;
            this._keys = _keys;
            this._index = 0;
        }
        [Symbol.iterator]() { return this; }
        next() {
            if (this._window.persistentStorageLegacy.length !== this._keys.length)
                this._index = this._keys.length;
            else if (this._index < this._keys.length) {
                try {
                    let key = this._keys[this._index];
                    let value = this._window.persistentStorageLegacy.getItem(key);
                    if (sys.notNil(value))
                        return { done: false, value: [key, value] };
                    this._index = this._keys.length;
                }
                catch (_a) {
                    this._index = this._keys.length;
                }
            }
            return { done: true, value: undefined };
        }
    }
    class SessionStorageValueEnumerator {
        constructor(_window, _keys) {
            this._window = _window;
            this._keys = _keys;
            this._index = 0;
        }
        [Symbol.iterator]() { return this; }
        next() {
            if (this._window.persistentStorageLegacy.length !== this._keys.length)
                this._index = this._keys.length;
            else if (this._index < this._keys.length) {
                try {
                    let value = this._window.persistentStorageLegacy.getItem(this._keys[this._index]);
                    if (sys.notNil(value))
                        return { done: false, value: value };
                    this._index = this._keys.length;
                }
                catch (_a) {
                    this._index = this._keys.length;
                }
            }
            return { done: true, value: undefined };
        }
    }
    /**
     * Implements the persistentStorageLoader service.
     * @export
     * @class Service
     * @implements {Map<string, string>}
     */
    class Service {
        constructor($window) {
            this.$window = $window;
            this[Symbol.toStringTag] = persistentStorageLoaderService.SERVICE_NAME;
            this.check(true);
        }
        /**
         * The number of settings values being stored.
         * @readonly
         * @type {number}
         * @memberof Service
         */
        get size() { return this.$window.sessionStorage.length; }
        check(forceRefresh = false) {
            if (!forceRefresh && this.$window.sessionStorage.length == this._allKeys.length)
                return;
            this._allKeys = [];
            this._parsedKeys = [];
            this._parsedObjects = [];
            for (let i = 0; i < this.$window.sessionStorage.length; i++)
                this._allKeys.push(this.$window.sessionStorage.key(i));
        }
        clear() {
            this.$window.sessionStorage.clear();
            this._allKeys = [];
            this._parsedKeys = [];
            this._parsedObjects = [];
        }
        delete(key) {
            this.check();
            this.$window.sessionStorage.removeItem(key);
            let i = this._parsedKeys.indexOf(key);
            if (i < 0)
                return false;
            if (i == 0) {
                this._parsedKeys.shift();
                this._parsedObjects.shift();
            }
            else if (i == (this._parsedKeys.length - 1)) {
                this._parsedKeys.pop();
                this._parsedObjects.pop();
            }
            else {
                this._parsedKeys.splice(i, 1);
                this._parsedObjects.splice(i, 1);
            }
        }
        entries() { return new SessionStorageEntryEnumerator(this.$window, this._allKeys); }
        [Symbol.iterator]() { return this.entries(); }
        forEach(callbackfn, thisArg) {
            this.check();
            if (typeof (thisArg) === "undefined")
                this._allKeys.forEach((key, index) => {
                    if (index < this._allKeys.length && this._allKeys[index] === key) {
                        let value;
                        try {
                            value = this.$window.sessionStorage.getItem(key);
                        }
                        catch ( /* okay to ignore */_a) { /* okay to ignore */ }
                        if (sys.notNil(value))
                            callbackfn(value, key, this);
                    }
                }, this);
            else
                this._allKeys.forEach((key, index) => {
                    if (index < this._allKeys.length && this._allKeys[index] === key) {
                        let value;
                        try {
                            value = this.$window.sessionStorage.getItem(key);
                        }
                        catch ( /* okay to ignore */_a) { /* okay to ignore */ }
                        if (sys.notNil(value))
                            callbackfn.call(thisArg, value, key, this);
                    }
                }, this);
        }
        get(key) {
            this.check();
            try {
                if (this._allKeys.indexOf(key) > -1)
                    return this.$window.sessionStorage.getItem(key);
            }
            catch ( /* okay to ignore */_a) { /* okay to ignore */ }
            return null;
        }
        getKeys() {
            this.check();
            return Array.from(this._allKeys);
        }
        getObject(key) {
            this.check();
            let i = this._parsedKeys.indexOf(key);
            if (i > -1)
                return this._parsedObjects[i];
            try {
                let json = this.$window.sessionStorage.getItem(key);
                if (!sys.isNilOrEmpty(json)) {
                    let result;
                    if (json !== "undefined")
                        result = (ng.fromJson(json));
                    this._parsedKeys.push(key);
                    this._parsedObjects.push(result);
                    return result;
                }
            }
            catch (_a) { }
        }
        has(key) {
            this.check();
            return this._allKeys.indexOf(key) > -1;
        }
        keys() {
            this.check();
            return Array.from(this._allKeys).values();
        }
        set(key, value) {
            try {
                if (sys.isNil(value))
                    this.$window.sessionStorage.removeItem(key);
                else
                    this.$window.sessionStorage.setItem(key, value);
                let i = this._parsedKeys.indexOf(key);
                if (i == 0) {
                    this._parsedKeys.shift();
                    this._parsedObjects.shift();
                }
                else if (i == (this._parsedKeys.length - 1)) {
                    this._parsedKeys.pop();
                    this._parsedObjects.pop();
                }
                else if (i < this._parsedKeys.length) {
                    this._parsedKeys.splice(i, 1);
                    this._parsedObjects.splice(i, 1);
                }
            }
            catch (e) {
                return e;
            }
        }
        setObject(key, value) {
            try {
                if (typeof value === "undefined")
                    this.$window.sessionStorage.setItem(key, "undefined");
                else
                    this.$window.sessionStorage.setItem(key, angular.toJson(value, false));
                let i = this._parsedKeys.indexOf(key);
                if (i < 0) {
                    this._parsedKeys.push(key);
                    this._parsedObjects.push(value);
                }
                else
                    this._parsedObjects[i] = value;
            }
            catch (e) {
                return e;
            }
        }
        values() { return new SessionStorageValueEnumerator(this.$window, this._allKeys); }
    }
    persistentStorageLoaderService.Service = Service;
    function getServiceInjectable() { return ["$window", Service]; }
    persistentStorageLoaderService.getServiceInjectable = getServiceInjectable;
})(persistentStorageLoaderService || (persistentStorageLoaderService = {}));
var notificationMessageService;
(function (notificationMessageService) {
    notificationMessageService.SERVICE_NAME = "notificationMessage";
    let NotificationMessageType;
    (function (NotificationMessageType) {
        NotificationMessageType[NotificationMessageType["error"] = 0] = "error";
        NotificationMessageType[NotificationMessageType["warning"] = 1] = "warning";
        NotificationMessageType[NotificationMessageType["info"] = 2] = "info";
    })(NotificationMessageType = notificationMessageService.NotificationMessageType || (notificationMessageService.NotificationMessageType = {}));
    class Service {
        constructor($log) {
            this.$log = $log;
            this._messages = [];
            this[Symbol.toStringTag] = notificationMessageService.SERVICE_NAME;
        }
        addNotificationMessage(message, title, type) {
            if (typeof title === "number") {
                type = title;
                title = undefined;
            }
            if (typeof type !== "number" || (type !== NotificationMessageType.error && type !== NotificationMessageType.warning && type !== NotificationMessageType.info))
                type = NotificationMessageType.info;
            this._messages.push({
                type: type,
                title: (typeof title !== "string" || (title = title.trim()).length == 0) ? (type === NotificationMessageType.error) ? "Error" : ((type === NotificationMessageType.warning) ? "Warning" : "Notice") : title,
                message: message
            });
        }
        getMessages(type, clear) {
            let result = this._messages;
            if (typeof type === "boolean")
                clear = type;
            else if (typeof type === "number" && (type === NotificationMessageType.error || type === NotificationMessageType.warning || type === NotificationMessageType.info)) {
                if (clear === true)
                    this._messages = result.filter((item) => item.type !== type);
                return result.filter((item) => item.type === type);
            }
            if (clear === true)
                this._messages = [];
            return result;
        }
    }
    notificationMessageService.Service = Service;
    function getServiceInjectable() { return ["$log", Service]; }
    notificationMessageService.getServiceInjectable = getServiceInjectable;
})(notificationMessageService || (notificationMessageService = {}));
var appConfigLoaderService;
(function (appConfigLoaderService) {
    /**
     * Defines the service name as "appConfigLoader".
     * @export
     * @constant {string}
     */
    appConfigLoaderService.SERVICE_NAME = "appConfigLoader";
    appConfigLoaderService.EVENT_NAME_SERVICENOW = "appConfigLoader:urlChange:sn";
    appConfigLoaderService.EVENT_NAME_GIT_SERVICE = "appConfigLoader:urlChange:git";
    appConfigLoaderService.EVENT_NAME_IDP = "appConfigLoader:urlChange:idp";
    /**
    * The default root absolute URL of the target ServiceNow instance.
    * @export
    * @constant {string}
    * @description - This MUST be an absolute URL and MUST NOT contain an explicit path (cannot end with "/"), URL query or fragment.
    */
    appConfigLoaderService.DEFAULT_URL_SERVICENOW = "https://inscomscd.service-now.com";
    /**
    * The default root absolute URL of the remote GIT repository service.
    * @export
    * @constant {string}
    * @description - This MUST be an absolute URL and MUST NOT contain a URL query or fragment. If this contains an explicit path (which is usually the case), the path must end with a "/".
    */
    appConfigLoaderService.DEFAULT_URL_GIT_SERVICE = "https://github.com/erwinel/";
    /**
     * The default root absolute URL of the SAML identity provider to be used by ServiceNow.
     * @export
     * @constant {string}
     * @description - This MUST be an absolute URL and MUST NOT contain an explicit path (cannot end with "/"), URL query or fragment.
     */
    appConfigLoaderService.DEFAULT_URL_IDP = "https://myidp.com";
    const JSON_RELATIVE_URL_APPCONFIGDATA = "./appConfigData.json";
    class Service {
        /**
        * Creates an instance of the appConfigLoader service.
        * @param {persistentStorageLoaderService.Service} persistentStorageLoader - The persistentStorageLegacy service provider.
        * @param {ng.IHttpService} $http - The $http service provider.
        * @param {ng.ILogService} $log - The $log service provider.
        * @param {ng.IRootScopeService} $rootScope - The $root service provider.
        * @param {ng.IQService} $q - The $q service provider
        * @memberof appConfigData
        */
        constructor(persistentStorageLoader, $http, $log, $rootScope, $q) {
            this.$log = $log;
            this.$rootScope = $rootScope;
            this._serviceNowUrl = new URL(appConfigLoaderService.DEFAULT_URL_SERVICENOW);
            this._gitServiceUrl = new URL(appConfigLoaderService.DEFAULT_URL_GIT_SERVICE);
            this._idpUrl = new URL(appConfigLoaderService.DEFAULT_URL_IDP);
            this[Symbol.toStringTag] = appConfigLoaderService.SERVICE_NAME;
            let svc = this;
            let original = persistentStorageLoader.getObject(persistentStorageLoaderService.STORAGEKEY_URL_CONFIG_SETTINGS);
            if (sys.notNil(original)) {
                if (typeof original !== "object") {
                    $log.warn("Expected object for " + persistentStorageLoaderService.STORAGEKEY_URL_CONFIG_SETTINGS + " setting object; actual is " + (typeof original));
                    original = {};
                }
                else {
                    if (sys.notNil(original.serviceNowUrl)) {
                        if (typeof original.serviceNowUrl !== "string") {
                            $log.warn("Expected string for serviceNowUrl setting value; actual is " + (typeof original.serviceNowUrl));
                            original.serviceNowUrl = "";
                        }
                        else
                            try {
                                this.serviceNowUrl(new URL(original.serviceNowUrl));
                            }
                            catch (e) {
                                $log.error("Error parsing application setting " + name + ": " + e);
                                original.serviceNowUrl = "";
                            }
                    }
                    if (sys.notNil(original.gitServiceUrl)) {
                        if (typeof original.gitServiceUrl !== "string") {
                            $log.warn("Expected string for gitServiceUrl setting value; actual is " + (typeof original.gitServiceUrl));
                            original.gitServiceUrl = "";
                        }
                        else
                            try {
                                this.gitServiceUrl(new URL(original.gitServiceUrl));
                            }
                            catch (e) {
                                $log.error("Error parsing application setting " + name + ": " + e);
                                original.gitServiceUrl = "";
                            }
                    }
                    if (sys.notNil(original.idpUrl)) {
                        if (typeof original.idpUrl !== "string") {
                            $log.warn("Expected string for idpUrl setting value; actual is " + (typeof original.idpUrl));
                            original.idpUrl = "";
                        }
                        else
                            try {
                                this.gitServiceUrl(new URL(original.idpUrl));
                            }
                            catch (e) {
                                $log.error("Error parsing application setting " + name + ": " + e);
                                original.idpUrl = "";
                            }
                    }
                }
            }
            else
                original = {};
            let promise = $http.get(JSON_RELATIVE_URL_APPCONFIGDATA).then((result) => {
                return $q((resolve, reject) => {
                    if (typeof result.data !== "object") {
                        $log.warn(angular.toJson({
                            activity: "Invalid application configuration retrieval response data",
                            data: result.data
                        }, true));
                        reject("Expected object response type, actual is " + (typeof result.data));
                    }
                    else if (result.data == null) {
                        $log.warn("Application configuration retrieval response data was null");
                        reject("Expected object response type, actual is null");
                    }
                    else
                        resolve(result.data);
                });
            }, (reason) => {
                $log.error({
                    activity: "Unexpected error making application configuration data request",
                    reason: reason
                }, true);
            });
            this._loadNavigationSettings = promise.then((data) => {
                return $q((resolve, reject) => {
                    if (typeof data.navigation !== "object") {
                        $log.warn(angular.toJson({
                            activity: "Invalid Application Navigation configuration property",
                            navigation: data.navigation
                        }, true));
                        reject("Expected object navigation property type, actual is " + (typeof data.navigation));
                    }
                    else if (data.navigation == null) {
                        $log.warn("Application Navigation configuration property was null");
                        reject("Expected object navigation property type, actual is null");
                    }
                    else
                        resolve(data.navigation);
                });
            });
            promise.then((data) => {
                function applyUrlSetting(name, cfgValue, settingsValue, defaultValue) {
                    if (sys.notNilOrEmpty(settingsValue))
                        try {
                            return new URL(cfgValue);
                        }
                        catch (e) {
                            $log.warn(angular.toJson({
                                reason: "Error parsing URL",
                                name: name,
                                href: settingsValue,
                                error: e
                            }, true));
                        }
                    if (sys.notNilOrEmpty(cfgValue))
                        try {
                            return new URL(cfgValue);
                        }
                        catch (e) {
                            $log.warn(angular.toJson({
                                reason: "Error parsing URL",
                                name: name,
                                href: cfgValue,
                                error: e
                            }, true));
                        }
                    return defaultValue;
                }
                ;
                let settings = {
                    serviceNowUrl: this.serviceNowUrl(applyUrlSetting("serviceNowUrl", data.serviceNowUrl, original.serviceNowUrl, this.serviceNowUrl())).href,
                    gitServiceUrl: this.gitServiceUrl(applyUrlSetting("gitServiceUrl", data.gitServiceUrl, original.gitServiceUrl, this.gitServiceUrl())).href,
                    idpUrl: this.idpUrl(applyUrlSetting("idpUrl", data.idpUrl, original.idpUrl, this.idpUrl())).href
                };
                if (original.serviceNowUrl !== settings.serviceNowUrl || original.gitServiceUrl !== settings.gitServiceUrl || original.idpUrl !== settings.idpUrl) {
                    persistentStorageLoader.setObject(persistentStorageLoaderService.STORAGEKEY_URL_CONFIG_SETTINGS, settings);
                }
            });
        }
        static validateURL(value, allowPath = false) {
            if (!(typeof value === "object" && value !== null && value instanceof URL))
                return "Value is not a URL";
            value = new URL(value.href);
            if (allowPath) {
                if (typeof value.pathname !== "string" || value.pathname.length == 0)
                    value.pathname = "/";
                else if (!value.pathname.endsWith("/"))
                    value.pathname = value.pathname + "/";
            }
            else if (typeof value.pathname === "string" && value.pathname.length > 0) {
                if (value.pathname !== "/")
                    return "Path not allowed";
                value.pathname = "";
            }
            if (typeof value.search === "string" && value.search.length > 0) {
                if (value.search !== "?")
                    return "Query parameters not allowed";
                value.search = "";
            }
            if (typeof value.hash === "string" && value.hash.length > 0) {
                if (value.hash !== "#")
                    return "Fragment not allowed";
                value.hash = "";
            }
            return value;
        }
        /**
        * Gets or sets the base URL for the target ServiceNow instance.
        *
        * @param {URL} [value] - Optionally specify new value for base URL of the target ServiceNow instance.
        * @returns {URL}
        * @memberof appConfigData
        * @description Changes in this value cause any callbacks specified through {@link appConfigData#onServiceNowUrlChanged} to be invoked.
        */
        serviceNowUrl(value) {
            if (sys.isNil(value))
                return this._serviceNowUrl;
            let validated = Service.validateURL(value);
            if (typeof validated === "string") {
                this.$log.warn(angular.toJson({
                    reason: "appConfigLoaderService.Service#serviceNowUrl: Error validating URL value",
                    message: validated,
                    value: value
                }, true));
                throw new Error(validated);
            }
            let oldValue = this._serviceNowUrl;
            if (typeof oldValue !== "object" || oldValue.href !== value.href) {
                this._serviceNowUrl = value;
                this.$rootScope.$broadcast(appConfigLoaderService.EVENT_NAME_SERVICENOW, value, oldValue);
            }
            return this._serviceNowUrl;
        }
        onServiceNowUrlChanged(scope, cb, thisArg) {
            if (arguments.length > 2)
                scope.$on(appConfigLoaderService.EVENT_NAME_SERVICENOW, (event, newValue, oldValue) => { cb.call(thisArg, newValue, oldValue); });
            else
                scope.$on(appConfigLoaderService.EVENT_NAME_SERVICENOW, (event, newValue, oldValue) => { cb(newValue, oldValue); });
        }
        /**
        * Gets or sets the base URL for the GIT repository service being used by the target ServiceNow instance.
        *
        * @param {URL} [value] - Optionally specify new value for base URL of the GIT repository service being used by the target ServiceNow instance.
        * @returns {URL}
        * @memberof appConfigData
        * @description Changes in this value cause any callbacks specified through {@link appConfigData#onGitServiceUrlChanged} to be invoked.
        */
        gitServiceUrl(value) {
            if (sys.isNil(value))
                return this._gitServiceUrl;
            let validated = Service.validateURL(value, true);
            if (typeof validated === "string") {
                this.$log.warn(angular.toJson({
                    reason: "appConfigLoaderService.gitServiceUrl#serviceNowUrl: Error validating URL value",
                    activity: validated,
                    value: value
                }, true));
                throw new Error(validated);
            }
            let oldValue = this._gitServiceUrl;
            if (typeof oldValue !== "object" || oldValue.href !== value.href) {
                this._gitServiceUrl = value;
                this.$rootScope.$broadcast(appConfigLoaderService.EVENT_NAME_GIT_SERVICE, value, oldValue);
            }
            return this._gitServiceUrl;
        }
        onGitServiceUrlChanged(scope, cb, thisArg) {
            if (arguments.length > 2)
                scope.$on(appConfigLoaderService.EVENT_NAME_GIT_SERVICE, (event, newValue, oldValue) => { cb.call(thisArg, newValue, oldValue); });
            else
                scope.$on(appConfigLoaderService.EVENT_NAME_GIT_SERVICE, (event, newValue, oldValue) => { cb(newValue, oldValue); });
        }
        /**
        * Gets or sets the base URL of the Identity provider to be used by ServiceNow.
        *
        * @param {URL} [value] - Optionally specify new value for base URL of the Identity provider to be used by ServiceNow.
        * @returns {URL}
        * @memberof appConfigData
        * @description Changes in this value cause any callbacks specified through {@link appConfigData#onIdpUrlChanged} to be invoked.
        */
        idpUrl(value) {
            if (sys.isNil(value))
                return this._idpUrl;
            let validated = Service.validateURL(value);
            if (typeof validated === "string") {
                this.$log.warn(angular.toJson({
                    reason: "appConfigLoaderService.Service#idpUrl: Error validating URL value",
                    activity: validated,
                    value: value
                }, true));
                throw new Error(validated);
            }
            let oldValue = this._idpUrl;
            if (typeof oldValue !== "object" || oldValue.href !== value.href) {
                this._idpUrl = value;
                this.$rootScope.$broadcast(appConfigLoaderService.EVENT_NAME_IDP, value, oldValue);
            }
            return this._idpUrl;
        }
        onIdpUrlChanged(scope, cb, thisArg) {
            if (arguments.length > 2)
                scope.$on(appConfigLoaderService.EVENT_NAME_IDP, (event, newValue, oldValue) => { cb.call(thisArg, newValue, oldValue); });
            else
                scope.$on(appConfigLoaderService.EVENT_NAME_IDP, (event, newValue, oldValue) => { cb(newValue, oldValue); });
        }
        /**
        * Creates a URL that is relative to a configuration setting URL base value.
        * @param {UrlSettingsNames} setting - The name of the URL setting.
        * @param {string} [relativeUrl] - The relative URL string.
        * @param {string} [queryParameter] - The name of the query parameter to add to the result URL.
        * @param {string} [queryValue] - The value of the query parameter to add to the result URL.
        * @returns {URL} A URL that is relative to the configuration settings URL base value.
        * @memberof appConfigData
        */
        createUrl(setting, relativeUrl, queryParameter, queryValue) {
            let url;
            if (setting === "git")
                url = this._gitServiceUrl;
            else
                url = sys.makeDirectoryUrl((setting == "sn") ? this._serviceNowUrl : this._idpUrl);
            if (typeof relativeUrl === "string" && relativeUrl.length > 0 && relativeUrl !== ".")
                url = new URL(relativeUrl, url);
            else
                url = new URL(url.href);
            if (typeof queryParameter === "string" && queryParameter.length > 0) {
                if (typeof queryValue === "string") {
                    if (url.searchParams.has(queryParameter))
                        url.searchParams.set(queryParameter, queryValue);
                    else
                        url.searchParams.append(queryParameter, queryValue);
                }
                else {
                    if (url.searchParams.has(queryParameter))
                        url.searchParams.delete(queryParameter);
                    if (typeof url.search !== "string" || url.search.length == 0 || url.search === "?")
                        url.search = "?" + queryParameter;
                    else
                        url.search = url.search + "&" + queryParameter;
                }
            }
            return url;
        }
        loadNavigationSettings() { return this._loadNavigationSettings; }
    }
    appConfigLoaderService.Service = Service;
    function getServiceInjectable() { return [persistentStorageLoaderService.SERVICE_NAME, "$http", '$log', '$rootScope', '$q', Service]; }
    appConfigLoaderService.getServiceInjectable = getServiceInjectable;
})(appConfigLoaderService || (appConfigLoaderService = {}));
var navConfigLoaderService;
(function (navConfigLoaderService) {
    /**
     * Defines the service name as "navConfigLoader".
     * @export
     * @constant {string}
     */
    navConfigLoaderService.SERVICE_NAME = "navConfigLoader";
    /**
    * The relative path of the default page.
    * @export
    * @constant {string}
    * @description - This is for a path string only - This MUST NOT contain relative segment names ("." or ".."), URL query or fragment and MUST NOT start or end with "/".
    */
    navConfigLoaderService.DEFAULT_PAGE_PATH = "index.html";
    const DEFAULT_CURRENT_ITEM_CLASS = ["active", "nav-link"];
    const DEFAULT_SELECTED_ITEM_CLASS = ["active", "nav-link"];
    const DEFAULT_OTHER_ITEM_CLASS = ["nav-link"];
    /**
    * Converts a URL path to a fallback (default) page ID.
    * @static
    * @param {string} path - The URL Path to convert.
    * @returns {string} The fallback page ID for the given URL path.
    * @memberof appConfigData
    */
    function toPageId(path) {
        let arr;
        let i;
        if (typeof path !== "string" || path.length == 0 || path == "/" || (arr = path.split("/").filter((value) => value.length > 0)).length === 0)
            arr = navConfigLoaderService.DEFAULT_PAGE_PATH.split("/").filter((value) => value.length > 0);
        let n = arr.pop();
        if ((i = n.lastIndexOf(".")) < 1 || i === n.length - 1) {
            let a = navConfigLoaderService.DEFAULT_PAGE_PATH.split("/").filter((value) => value.length > 0);
            arr.push(n);
            n = a[a.length - 1];
            if ((i = n.lastIndexOf(".")) < 0) {
                arr.push(n);
                return arr.join("/");
            }
        }
        arr.push(n.substr(0, i));
        return (arr.length === 1) ? arr[0] : arr.join("/");
    }
    navConfigLoaderService.toPageId = toPageId;
    /**
    * Represents a menu navigation item.
    *
    * @export
    * @class NavigationItem
    */
    class NavigationItem {
        /**
        * Creates an instance of NavigationItem.
        *
        * @param {appConfigDataService} _appConfigData - The appConfigData service provider.
        * @param {INavigationDefinition} navDef - The navigation menu item definition.
        * @memberof NavigationItem
        */
        constructor(_appConfigData, navDef) {
            this._appConfigData = _appConfigData;
            this._url = navDef.url;
            this._sideNavHeading = (typeof navDef.sideNavHeading === "string") ? navDef.sideNavHeading.trim() : "";
            this._linkTitle = (typeof navDef.linkTitle === "string" && navDef.linkTitle.length > 0) ? navDef.linkTitle : navDef.url;
            this._pageTitle = (typeof navDef.pageTitle === "string") ? navDef.pageTitle.trim() : "";
            this._toolTip = (typeof navDef.toolTip === "string") ? navDef.toolTip.trim() : ((this._pageTitle != this._linkTitle) ? this._pageTitle : "");
            if (typeof navDef.id !== "string" || (this._id = navDef.id).length === 0)
                this._id = toPageId(this._url);
            if (this._id === _appConfigData.currentPageId())
                this._isCurrentPage = true;
            this._childNavItems = NavigationItem.createNavItems(_appConfigData, navDef.items);
            this._childNavItems.forEach((item) => { item._parentNavItem = this; }, this);
            if (this.isCurrentPage)
                this.getAncestorNavItems().forEach((item) => { item._isCurrentPage = false; });
        }
        /**
        * The unique identifier of the navigation menu item.
        *
        * @readonly
        * @type {string}
        * @memberof NavigationItem
        */
        get id() { return this._id; }
        /**
        * The display text for the current navigation menu item.
        *
        * @readonly
        * @type {string}
        * @memberof NavigationItem
        */
        get linkTitle() { return this._linkTitle; }
        /**
        * The title of the page that corresponds to the current navigation menu item.
        *
        * @readonly
        * @type {string}
        * @memberof NavigationItem
        */
        get pageTitle() { return this._pageTitle; }
        /**
        * The tooltip for the current navigation menu item.
        *
        * @readonly
        * @type {string}
        * @memberof NavigationItem
        */
        get toolTip() { return this._toolTip; }
        /**
        * The secondary navigation heading text for child navigation menu items.
        *
        * @readonly
        * @type {string}
        * @memberof NavigationItem
        */
        get sideNavHeading() { return this._sideNavHeading; }
        /**
        * The navigation menu hyperlink for the current item.
        *
        * @readonly
        * @type {string}
        * @memberof NavigationItem
        */
        get navMenuHref() { return (this.hasOrIsCurrentPage) ? "#" : this._url; }
        /**
        * The relative URL of the current navigation menu item.
        *
        * @readonly
        * @type {string}
        * @memberof NavigationItem
        */
        get url() { return this._url; }
        /**
        * Indicates whether the current navigation menu item represents the current page.
        *
        * @readonly
        * @type {boolean}
        * @memberof NavigationItem
        */
        get isCurrentPage() { return this._isCurrentPage === true; }
        /**
        * Indicates whether the current navigation menu item represents the current page or the parent of the current page.
        *
        * @readonly
        * @type {boolean}
        * @memberof NavigationItem
        */
        get hasOrIsCurrentPage() { return typeof this._isCurrentPage === "boolean"; }
        /**
        * Indicates whether the current navigation menu item represents an ancestor of the current page.
        *
        * @readonly
        * @type {boolean}
        * @memberof NavigationItem
        */
        get hasCurrentPage() { return this._isCurrentPage === false; }
        /**
        * The CSS class names to be applied to the anchor tag.
        *
        * @readonly
        * @type {ReadonlyArray<string>}
        * @memberof NavigationItem
        */
        get anchorCssClass() { return (this.isCurrentPage) ? this._appConfigData.currentItemClass() : ((this.hasOrIsCurrentPage) ? this._appConfigData.selectedItemClass() : this._appConfigData.otherItemClass()); }
        /**
        * The child navigation menu items to display within the secondary navigation menu.
        *
        * @readonly
        * @type {ReadonlyArray<NavigationItem>}
        * @memberof NavigationItem
        */
        get childNavItems() { return this._childNavItems; }
        /**
        * Indicates whether the current navigation menu item has child menu items.
        *
        * @readonly
        * @type {boolean}
        * @memberof NavigationItem
        */
        get hasChildNavItem() { return this._childNavItems.length > 0; }
        /**
        * Indicates whether the current navigation menu item has sibling items that share the same parent menu item.
        *
        * @readonly
        * @type {boolean}
        * @memberof NavigationItem
        */
        get hasSiblingNavItem() { return sys.notNil(this._previousNavItem) || sys.notNil(this._nextNavItem); }
        /**
        * Indicates whether the current navigation menu item is a child item of another.
        *
        * @readonly
        * @type {boolean}
        * @memberof NavigationItem
        */
        get isNestedNavItem() { return sys.notNil(this._parentNavItem); }
        /**
        * Navigation menu items to be displayed as nested items within the secondary navigation menu.
        *
        * @readonly
        * @type {ReadonlyArray<NavigationItem>}
        * @memberof NavigationItem
        */
        get nestedSideNavChildItems() { return (this.showNestedSideNavChildItems) ? this._childNavItems : []; }
        /**
        * Indicates whether the current navigation menu item represents the current page, is being displayed within the secondary navigation menu, and has child items.
        *
        * @readonly
        * @type {boolean}
        * @memberof NavigationItem
        */
        get showNestedSideNavChildItems() { return this.isCurrentPage && this.isNestedNavItem && this.hasChildNavItem && !this.hasSiblingNavItem; }
        /**
        * Gets the parent navigation menu item.
        *
        * @readonly
        * @type {(NavigationItem | undefined)}
        * @memberof NavigationItem
        */
        get parentNavItem() { return this._parentNavItem; }
        /**
        * Gets preceding sibling items for the current menu navigation item.
        *
        * @returns {NavigationItem[]}
        * @memberof NavigationItem
        */
        precedingSiblings() {
            if (typeof this._previousNavItem === "undefined")
                return [];
            let result = this._previousNavItem.precedingSiblings();
            result.push(this._previousNavItem);
            return result;
        }
        /**
        * Gets following sibling items for the current menu navigation item.
        *
        * @returns {NavigationItem[]}
        * @memberof NavigationItem
        */
        followingSiblings() {
            let result = [];
            for (let i = this._nextNavItem; typeof i !== "undefined"; i = i._nextNavItem)
                result.push(i);
            return result;
        }
        /**
        * Gets all ancestor navigation menu items.
        *
        * @returns {NavigationItem[]}
        * @memberof NavigationItem
        */
        getAncestorNavItems() {
            let result = [];
            for (let i = this._parentNavItem; typeof i !== "undefined"; i = i._parentNavItem)
                result.unshift(i);
            return result;
        }
        /**
        * Gets ancestor navigation menu items that do not appear in the primary navigation menu.
        *
        * @returns {NavigationItem[]}
        * @memberof NavigationItem
        */
        getBreadcrumbLinks() {
            let result = [];
            if (sys.notNil(this._parentNavItem) && sys.notNil(this._parentNavItem._parentNavItem))
                for (let i = this._parentNavItem; typeof i !== "undefined"; i = i._parentNavItem)
                    result.unshift(i);
            return result;
        }
        /**
        * Handles the menu item click event.
        *
        * @param {BaseJQueryEventObject} [event]
        * @memberof NavigationItem
        * @description The purpose of this member is to prevent the default action for the navigation menu item that represents the current page.
        */
        onClick(event) {
            if (this.isCurrentPage && sys.notNil(event)) {
                if (!event.isDefaultPrevented)
                    event.preventDefault();
                if (!event.isPropagationStopped)
                    event.stopPropagation();
            }
        }
        toJSON() {
            return {
                childNavItems: (typeof this._childNavItems === "object" && this._childNavItems !== null) ? this._childNavItems.map((item) => item.toJSON()) : this._childNavItems,
                id: this._id,
                linkTitle: this._linkTitle,
                pageTitle: this._pageTitle,
                toolTip: this._toolTip,
                url: this._url,
                isCurrentPage: this._isCurrentPage,
                sideNavHeading: this._sideNavHeading
            };
        }
        /**
        * Creates a navigation menu item objects from navigation menu definition objects.
        *
        * @static
        * @param {appConfigDataService} appConfigData - The application configuration data service provider.
        * @param {INavigationDefinition[]} [items] - Defines the navigation menu items to be created.
        * @returns {NavigationItem[]} The navigation menu item objects.
        * @memberof NavigationItem
        */
        static createNavItems(appConfigData, items) {
            if (typeof items !== "object" || items === null)
                return [];
            let result = items.filter((value) => typeof value === "object" && value !== null).map((value) => new NavigationItem(appConfigData, value));
            if (result.length > 0) {
                let previous = result[0];
                for (let i = 1; i < result.length; i++)
                    previous = (result[0]._previousNavItem = previous)._nextNavItem = result[0];
            }
            return result;
        }
        /**
        * Finds the navigation menu item that represents the current page.
        *
        * @static
        * @param {ReadonlyArray<NavigationItem>} items - Navigation menu items to recursively search.
        * @returns {(NavigationItem | undefined)} The navigation menu item that represents the current page or undefined if none are found that represent the current page.
        * @memberof NavigationItem
        */
        static findCurrentItem(items) {
            if (items.length == 0)
                return undefined;
            if (items.length == 1)
                return (items[0].isCurrentPage) ? items[0] : this.findCurrentItem(items[0]._childNavItems);
            for (let i = 0; i < items.length; i++) {
                if (items[i].hasOrIsCurrentPage)
                    return (items[i].isCurrentPage) ? items[i] : this.findCurrentItem(items[i]._childNavItems);
            }
        }
        /**
        * Creates an array of ancestor navigation menu items to be displayed as breadcrumb links.
        *
        * @static
        * @param {NavigationItem} [current] - The navigation menu item that represents the current page.
        * @returns {ReadonlyArray<NavigationItem>}
        * @memberof NavigationItem
        */
        static createSideNavBreadcrumbItems(current) {
            if (typeof current === "undefined" || typeof current._parentNavItem === "undefined")
                return [];
            let result = [];
            while (typeof (current = current._parentNavItem)._parentNavItem !== "undefined")
                result.unshift(current);
            return result;
        }
        /**
        * Creates an array of sibling navigation menu items.
        *
        * @static
        * @param {NavigationItem} [current] - The navigation menu item that represents the current page.
        * @returns {ReadonlyArray<NavigationItem>}
        * @memberof NavigationItem
        */
        static createSideNavSiblingItems(current) {
            if (typeof current === "undefined" || typeof current._parentNavItem === "undefined")
                return [];
            let result = [current];
            if (typeof current._previousNavItem === "undefined") {
                if (typeof current._nextNavItem === "undefined")
                    return [];
            }
            else
                for (let item = current._previousNavItem; typeof item != "undefined"; item = item._previousNavItem)
                    result.unshift(item);
            for (let item = current._nextNavItem; typeof item != "undefined"; item = item._nextNavItem)
                result.push(item);
            return result;
        }
    }
    navConfigLoaderService.NavigationItem = NavigationItem;
    class Service {
        constructor(appConfigLoader, $window, $document, $q) {
            this._currentItemClass = DEFAULT_CURRENT_ITEM_CLASS;
            this._selectedItemClass = DEFAULT_SELECTED_ITEM_CLASS;
            this._otherItemClass = DEFAULT_OTHER_ITEM_CLASS;
            this[Symbol.toStringTag] = navConfigLoaderService.SERVICE_NAME;
            let headElement = $document.find('head').first();
            let titleElement = headElement.find('title');
            if (titleElement.length == 0) {
                headElement.add(titleElement = $('<title></title>'));
                this._pageTitle = "";
            }
            else
                this._pageTitle = titleElement.text().trim();
            try {
                this._currentPageURL = new URL($window.location.href);
            }
            catch (_a) {
                // Just in case
                this._currentPageURL = new URL("http://localhost");
                this._currentPageURL.pathname = navConfigLoaderService.DEFAULT_PAGE_PATH;
            }
            let segments = (typeof this._currentPageURL.pathname !== "string" || this._currentPageURL.pathname.length == 0 || this._currentPageURL.pathname == "/") ? [] : this._currentPageURL.pathname.split("/").filter((n) => n.length > 0);
            if (segments.length == 0)
                segments = navConfigLoaderService.DEFAULT_PAGE_PATH.split("/");
            else if (!(/\.html?$/i).test(segments[segments.length - 1])) {
                let arr = navConfigLoaderService.DEFAULT_PAGE_PATH.split("/");
                segments.push(arr[arr.length - 1]);
            }
            this._currentPageURL.pathname = "/" + (this._relativePagePath = (segments.length == 1) ? segments[0] : segments.join("/"));
            if ((this._currentPageId = headElement.find('meta[name="app:pageId"]').attr("content")).length == 0)
                this._currentPageId = toPageId(this._currentPageURL.pathname);
            if (this._pageTitle.length === 0)
                this._pageTitle = this._currentPageId;
            let svc = this;
            this._loadTopNavItems = appConfigLoader.loadNavigationSettings().then((navConfig) => {
                return $q((resolve, reject) => {
                    if (typeof navConfig.items !== "object") {
                        appConfigLoader.$log.warn("Invalid navigation configuration items property type");
                        reject("Expected object items property type; actual is " + (typeof navConfig.items));
                    }
                    else if (navConfig.items === null) {
                        appConfigLoader.$log.warn("Navigation configuration items property is null");
                        reject("Expected object items property type; actual is null");
                    }
                    else if (Array.isArray(navConfig.items)) {
                        let items = navConfig.items.filter((i) => { return (typeof i === "object" && i !== null); });
                        if (items.length == 0) {
                            appConfigLoader.$log.warn("Navigation configuration items property is empty");
                            reject("Items property is empty.");
                        }
                        else
                            try {
                                resolve(NavigationItem.createNavItems(svc, items));
                            }
                            catch (e) {
                                appConfigLoader.$log.error(angular.toJson({
                                    reason: "Unexpected error importing navigation configuration items",
                                    error: e
                                }, true));
                                reject(e);
                            }
                    }
                    else {
                        appConfigLoader.$log.warn("Navigation configuration items property is not an array");
                        reject("Items property is not an array");
                    }
                });
            });
            this._loadCurrentItem = this._loadTopNavItems.then((items) => { return NavigationItem.findCurrentItem(items); });
            this._loadPageTitle = this._loadCurrentItem.then((item) => {
                if (sys.notNil(item) && item.pageTitle.length > 0)
                    this._pageTitle = item.pageTitle;
                else if (this._pageTitle.trim() === titleElement.text().trim())
                    return this._pageTitle;
                titleElement.text(this._pageTitle);
                return this._pageTitle;
            });
        }
        /**
        * Gets the current page ID.
        *
        * @returns {string} The value of the "content" attribute for the html meta tag with the name attribute of "app:pageId".
        * @memberof navConfigLoaderService.Service
        */
        currentPageId() { return this._currentPageId; }
        /**
        * Gets relative path to the current page.
        *
        * @returns {string}
        * @memberof navConfigLoaderService.Service
        */
        pagePath() { return this._relativePagePath; }
        /**
        * Gets the CSS class names to apply to navigation menu items that are ancestors of the item that represents the current page.
        *
        * @returns {string[]}
        * @memberof navConfigLoaderService.Service
        */
        currentItemClass() { return this._currentItemClass; }
        /**
        * Gets the CSS class names to apply to the navigation menu item that represents the current page.
        *
        * @returns {string[]}
        * @memberof navConfigLoaderService.Service
        */
        selectedItemClass() { return this._selectedItemClass; }
        /**
        * Gets the CSS class names to apply to the navigation menu item that do not represent the current page or any of its ancestors.
        *
        * @returns {string[]}
        * @memberof navConfigLoaderService.Service
        */
        otherItemClass() { return this._otherItemClass; }
        /**
        * Gets the navigation menu items that appear in the primary navigation menu.
        *
        * @returns {ng.IPromise<NavigationItem[]>}
        * @memberof navConfigLoaderService.Service
        */
        loadTopNavItems() { return this._loadTopNavItems; }
        loadPageTitle() { return this._loadPageTitle; }
        loadCurrentItem() { return this._loadCurrentItem; }
    }
    navConfigLoaderService.Service = Service;
    function getServiceInjectable() { return [appConfigLoaderService.SERVICE_NAME, '$window', '$document', '$q', Service]; }
    navConfigLoaderService.getServiceInjectable = getServiceInjectable;
})(navConfigLoaderService || (navConfigLoaderService = {}));
var appModalPopupService;
(function (appModalPopupService) {
    /**
     * Defines the service name as "appModalPopup".
     * @export
     * @constant {string}
    */
    appModalPopupService.SERVICE_NAME = "appModalPopup";
    appModalPopupService.DIRECTIVE_NAME = "appModalPopupDialog";
    appModalPopupService.JQUERY_SELECTOR_DIALOG = "#appModalPopupDialog";
    class Service {
        constructor(appConfigLoader, $window, $document, $q) {
            this.appConfigLoader = appConfigLoader;
            this._isVisible = false;
            this._type = "info";
            this._hasThis = false;
            this[Symbol.toStringTag] = appModalPopupService.SERVICE_NAME;
            let svc = this;
            this._scope = { buttons: [], class: [], closePopupDialog: (event) => { svc.closePopupDialog(); }, message: "", title: "" };
        }
        showPopupDialog(message, arg1, arg2, arg3, arg4, thisObj) {
            let title;
            let buttons;
            if (this._isVisible)
                this.closePopupDialog();
            this._type = "info";
            this._onClose = undefined;
            if (arguments.length < 2 || typeof arg1 === "string") {
                this._type = arg1;
                title = arg2;
                this._hasThis = false;
            }
            else if (arguments.length > 5) {
                this._onClose = arg1;
                buttons = arg2;
                this._type = arg3;
                title = arg4;
                this._hasThis = true;
                this._thisObj = thisObj;
            }
            else {
                this._onClose = arg1;
                if (arguments.length < 3 || typeof arg2 === "string" || sys.isNil(arg2)) {
                    this._type = arg2;
                    title = arg3;
                    thisObj = arg4;
                    this._hasThis = (arg2.length == 5);
                }
                else {
                    this._type = arg3;
                    title = arg4;
                    buttons = arg2;
                    this._hasThis = false;
                }
            }
            if (sys.isNilOrWhiteSpace(title)) {
                switch (this._type) {
                    case 'warning':
                        this._scope.title = 'Warning';
                        break;
                    case 'danger':
                        this._scope.title = 'Critical';
                        break;
                    case 'success':
                        this._scope.title = 'Success';
                        break;
                    default:
                        this._scope.title = 'Notice';
                        this._type = "info";
                        break;
                }
            }
            else
                this._scope.title = title;
            this._scope.message = message;
            switch (this._type) {
                case 'warning':
                    this._scope.class = ['alert', 'alert-warning'];
                    break;
                case 'danger':
                    this._scope.class = ['alert', 'alert-danger'];
                    break;
                case 'success':
                    this._scope.class = ['alert', 'alert-success'];
                    break;
                default:
                    this._scope.class = ['alert', 'alert-info'];
                    break;
            }
            let svc = this;
            if (sys.isNil(buttons) || (buttons = buttons.filter((value) => sys.notNil)).length == 0)
                this._scope.buttons = [{
                        displayText: "OK", isDefault: false, closePopupDialog: (event) => {
                            sys.preventEventDefault(event, true);
                            svc._closePopupDialog();
                        }, class: ["btn", "btn-primary"]
                    }];
            else {
                let hasDefault = false;
                this._scope.buttons = buttons.map((value) => {
                    if (hasDefault)
                        return {
                            displayText: value.displayText, value: value.value, isDefault: false, closePopupDialog: (event) => {
                                sys.preventEventDefault(event, true);
                                svc._closePopupDialog(value.value);
                            }, class: ["btn", "btn-secondary"]
                        };
                    hasDefault = value.isDefault === true;
                    return {
                        displayText: value.displayText, value: value.value, isDefault: hasDefault, closePopupDialog: (event) => {
                            sys.preventEventDefault(event, true);
                            svc._closePopupDialog(value.value);
                        }, class: ["btn", (hasDefault) ? "btn-primary" : "btn-secondary"]
                    };
                });
                if (!hasDefault)
                    this._scope.buttons[0].class[1] = "btn-primary";
            }
            $(appModalPopupService.JQUERY_SELECTOR_DIALOG).modal('show');
        }
        _closePopupDialog(value) {
            $(appModalPopupService.JQUERY_SELECTOR_DIALOG).modal('hide');
            if (typeof this._onClose !== "function")
                return;
            if (arguments.length == 0) {
                if (this._hasThis)
                    this._onClose.call(this._thisObj);
                else
                    this._onClose();
            }
            else if (this._hasThis)
                this._onClose.call(this._thisObj, value);
            else
                this._onClose(value);
        }
        closePopupDialog(value) {
            if (this._isVisible) {
                if (arguments.length == 0) {
                    let btn = this._scope.buttons.filter((value) => value.isDefault);
                    if (btn.length == 0)
                        this._closePopupDialog();
                    else
                        this._closePopupDialog(btn[0].value);
                }
                else
                    this._closePopupDialog(value);
            }
        }
        static getDirectiveInjectable() {
            return [appModalPopupService.SERVICE_NAME, (appModalPopup) => ({
                    restrict: "E",
                    link: (scope, element, attrs) => {
                        scope.buttons = appModalPopup._scope.buttons;
                        scope.class = appModalPopup._scope.class;
                        scope.closePopupDialog = appModalPopup._scope.closePopupDialog;
                        scope.message = appModalPopup._scope.message;
                        scope.title = appModalPopup._scope.title;
                        appModalPopup._scope = scope;
                    },
                    scope: true,
                    templateUrl: "Template/" + appModalPopupService.SERVICE_NAME + ".htm"
                })];
        }
    }
    appModalPopupService.Service = Service;
    function getServiceInjectable() { return [appConfigLoaderService.SERVICE_NAME, '$window', '$document', '$q', Service]; }
    appModalPopupService.getServiceInjectable = getServiceInjectable;
})(appModalPopupService || (appModalPopupService = {}));
var urlInputDirective;
(function (urlInputDirective) {
    /**
     * Defines the directive name as "urlInput".
     *
     * @todo Rename to inputUrl to use as <input:url />
     * @export
     * @constant {string}
     */
    urlInputDirective.DIRECTIVE_NAME = "urlInput";
    const DEFAULT_CURRENT_ITEM_CLASS = ["active", "nav-link"];
    const DEFAULT_SELECTED_ITEM_CLASS = ["active", "nav-link"];
    const DEFAULT_OTHER_ITEM_CLASS = ["nav-link"];
    /**
     *
     * @export
     * @enum {string}
     */
    let cssValidationClass;
    (function (cssValidationClass) {
        cssValidationClass["isValid"] = "is-valid";
        cssValidationClass["isInvalid"] = "is-invalid";
    })(cssValidationClass = urlInputDirective.cssValidationClass || (urlInputDirective.cssValidationClass = {}));
    /**
     *
     *
     * @export
     * @enum {string}
     */
    let cssFeedbackClass;
    (function (cssFeedbackClass) {
        cssFeedbackClass["isValid"] = "valid-feedback";
        cssFeedbackClass["isInvalid"] = "invalid-feedback";
    })(cssFeedbackClass = urlInputDirective.cssFeedbackClass || (urlInputDirective.cssFeedbackClass = {}));
    /**
     *
     *
     * @export
     * @enum {string}
     */
    let cssAlertClass;
    (function (cssAlertClass) {
        cssAlertClass["alert"] = "alert";
        cssAlertClass["danger"] = "alert-danger";
        cssAlertClass["dark"] = "alert-dark";
        cssAlertClass["dismissible"] = "alert-dismissible";
        cssAlertClass["info"] = "alert-info";
        cssAlertClass["heading"] = "alert-heading";
        cssAlertClass["light"] = "alert-light";
        cssAlertClass["link"] = "alert-link";
        cssAlertClass["primary"] = "alert-primary";
        cssAlertClass["secondary"] = "alert-secondary";
        cssAlertClass["success"] = "alert-success";
        cssAlertClass["warning"] = "alert-warning";
    })(cssAlertClass = urlInputDirective.cssAlertClass || (urlInputDirective.cssAlertClass = {}));
    /**
     *
     *
     * @export
     * @enum {string}
     */
    let cssBorderClass;
    (function (cssBorderClass) {
        cssBorderClass["border"] = "border";
        cssBorderClass["danger"] = "border-danger";
        cssBorderClass["dark"] = "border-dark";
        cssBorderClass["info"] = "alert-info";
        cssBorderClass["light"] = "border-light";
        cssBorderClass["primary"] = "border-primary";
        cssBorderClass["secondary"] = "border-secondary";
        cssBorderClass["success"] = "border-success";
        cssBorderClass["warning"] = "border-warning";
    })(cssBorderClass = urlInputDirective.cssBorderClass || (urlInputDirective.cssBorderClass = {}));
    class Controller {
        constructor($scope) {
            this.$scope = $scope;
            let ctrl = this;
            if (typeof $scope.textBoxId !== "string" || $scope.textBoxId.trim().length == 0) {
                let i = 0;
                let id = urlInputDirective.DIRECTIVE_NAME + ":" + i++;
                for (let e = $(id); sys.notNil(e) && e.length > 0; e = $(id))
                    id = urlInputDirective.DIRECTIVE_NAME + ":" + i++;
                $scope.textBoxId = id;
            }
            $scope.text = $scope.validationMessage = "";
            $scope.inputClass = ["form-control", cssValidationClass.isValid];
            $scope.messageClass = [];
            $scope.isValid = true;
            $scope.$watch('text', (value) => { ctrl.validate((typeof value !== "string") ? "" : value); });
            $scope.$watch('ngModel', (value) => {
                if (typeof value === "string" && value !== $scope.text)
                    $scope.text = value;
            });
            $scope.$watchGroup(["required", "allowRelative", "allowPath", "allowQuery", "allowFragment"], () => { ctrl.validate((typeof $scope.text !== "string") ? "" : $scope.text); });
        }
        validate(value) {
            if (typeof value != "string" || value.trim().length === 0) {
                if (this.$scope.required === true) {
                    this.$scope.inputClass = ["form-control", cssBorderClass.warning];
                    this.$scope.messageClass = [cssFeedbackClass.isInvalid];
                    this.$scope.validationMessage = "URL not provided.";
                    this.$scope.isValid = false;
                }
                else {
                    this.$scope.isValid = true;
                    this.$scope.inputClass = ["form-control", cssValidationClass.isValid];
                    this.$scope.messageClass = [];
                    this.$scope.validationMessage = "";
                    this.$scope.textModel = "";
                }
                return this.$scope.isValid;
            }
            let url;
            try {
                url = new URL(value);
            }
            catch (_a) {
                let i = value.indexOf('#');
                let hash;
                if (i > -1) {
                    hash = value.substr(i);
                    value = value.substr(0, i);
                }
                else
                    hash = '';
                let search;
                i = value.indexOf('?');
                if (i > -1) {
                    search = value.substr(i);
                    value = value.substr(0, i);
                }
                else
                    search = '';
                try {
                    url = new URL(((value.length > 0) ? new URL(value, 'http://tempuri.org') : new URL('http://tempuri.org')) + search + hash);
                }
                catch (err) {
                    this.$scope.inputClass = ["form-control", cssValidationClass.isInvalid];
                    this.$scope.messageClass = [cssFeedbackClass.isInvalid];
                    this.$scope.validationMessage = "Invalid URL format: " + err;
                    this.$scope.isValid = false;
                    return false;
                }
                if (this.$scope.allowRelative !== true) {
                    this.$scope.inputClass = ["form-control", cssValidationClass.isInvalid];
                    this.$scope.messageClass = [cssFeedbackClass.isInvalid];
                    this.$scope.validationMessage = "Relative URL not allowed";
                    this.$scope.isValid = false;
                    return false;
                }
            }
            if (sys.isNilOrWhiteSpace(url.host))
                this.$scope.validationMessage = "Invalid URL format: Host name not specified";
            else if (url.hash.length > 0 && this.$scope.allowFragment !== true)
                this.$scope.validationMessage = "URL fragment not allowed";
            else if (url.search.length > 0 && this.$scope.allowQuery !== true)
                this.$scope.validationMessage = "URL query string not allowed";
            else if (url.pathname.length > 0 && url.pathname != "/" && this.$scope.allowPath !== true)
                this.$scope.validationMessage = "URL path not allowed";
            else {
                this.$scope.isValid = true;
                this.$scope.inputClass = ["form-control", cssValidationClass.isValid];
                this.$scope.messageClass = [];
                this.$scope.validationMessage = "";
                this.$scope.ngModel = value;
                return true;
            }
            this.$scope.inputClass = ["form-control", cssValidationClass.isInvalid];
            this.$scope.messageClass = [cssFeedbackClass.isInvalid];
            this.$scope.isValid = false;
            return false;
        }
        static createDirective() {
            return {
                restrict: "E",
                controller: ['$scope', Controller],
                controllerAs: 'ctrl',
                scope: {
                    ngModel: '=',
                    isValid: '=?',
                    allowPath: '=?',
                    allowFragment: '=?',
                    allowQuery: '=?',
                    allowRelative: '=?',
                    required: '=?',
                    labelText: '@',
                    textBoxId: '@?'
                },
                template: '<div class="form-group"><label for="{{textBoxId}}">{{labelText}}</label><input type="text" ng-class="inputClass" id="{{textBoxId}}" ng-model="text" /><div ng-class="messageClass" ng-hide="isValid">{{validationMessage}}</div></div>'
            };
        }
    }
    urlInputDirective.Controller = Controller;
    function getDirectiveInjectable() { return Controller.createDirective; }
    urlInputDirective.getDirectiveInjectable = getDirectiveInjectable;
})(urlInputDirective || (urlInputDirective = {}));
var configUrlDirective;
(function (configUrlDirective) {
    /**
     * Defines the directive name as "configUrl".
     * @export
     * @constant {string}
     */
    configUrlDirective.DIRECTIVE_NAME = "configUrl";
    function getConfigUrlDirectiveDirective(appConfigLoader) {
        return {
            restrict: "AE",
            link: (scope, element, attrs) => {
                function updateText() {
                    let url = (typeof scope.q === "string" && scope.q.length > 0) ?
                        (((typeof scope.v === "string") ? appConfigLoader.createUrl(scope.base, scope.href, scope.q, scope.v) :
                            appConfigLoader.createUrl(scope.base, scope.href, scope.q))) : appConfigLoader.createUrl(scope.base, scope.href);
                    let a = element.children("a");
                    if (sys.asBoolean(scope.asLink)) {
                        if (a.length == 0) {
                            element.text("");
                            a = element.add("<a></a>");
                        }
                        a.attr("href", url.href);
                        a.attr("target", (typeof scope.target === "string" && scope.target.length > 0) ? scope.target : "_blank");
                        let c = (typeof scope.linkClass === "string" && scope.linkClass.length > 0) ?
                            sys.unique(((typeof scope.linkClassModel === "string" && scope.linkClassModel.length > 0) ?
                                scope.linkClass.split(sys.whitespaceRe).concat(scope.linkClassModel.split(sys.whitespaceRe)) :
                                scope.linkClass.split(sys.whitespaceRe)).filter((v) => v.length > 0)) :
                            ((typeof scope.linkClassModel === "string" && scope.linkClassModel.length > 0) ? sys.unique(scope.linkClassModel.split(sys.whitespaceRe).filter((v) => v.length > 0)) : []);
                        if (c.length > 0)
                            a.attr("class", c.join(" "));
                        else {
                            let s = a.attr("class");
                            if (typeof s === "string" && s.length > 0)
                                a.removeAttr("class");
                        }
                        a.text(url.href);
                    }
                    else {
                        if (a.length > 0)
                            a.remove();
                        element.text(url.href);
                    }
                }
                appConfigLoader.onServiceNowUrlChanged(scope, (value) => {
                    if (scope.base === "sn")
                        updateText();
                });
                appConfigLoader.onGitServiceUrlChanged(scope, (value) => {
                    if (scope.base === "git")
                        updateText();
                });
                appConfigLoader.onIdpUrlChanged(scope, (value) => {
                    if (scope.base === "idp")
                        updateText();
                });
                updateText();
                scope.$watchGroup(["base", "href", "q", "v", "asLink", "target"], () => { updateText(); });
            },
            scope: { base: "@", href: "@?", q: "@?", v: "@?", asLink: "@?", linkClass: "@?", linkClassModel: "=?" }
        };
    }
    function getDirectiveInjectable() { return [appConfigLoaderService.SERVICE_NAME, getConfigUrlDirectiveDirective]; }
    configUrlDirective.getDirectiveInjectable = getDirectiveInjectable;
})(configUrlDirective || (configUrlDirective = {}));
var aConfigLinkDirective;
(function (aConfigLinkDirective) {
    /**
     * Defines the directive name as "aConfigLink".
     * @export
     * @constant {string}
     */
    aConfigLinkDirective.DIRECTIVE_NAME = "aConfigLink";
    const DEFAULT_TARGET = "_blank";
    class Controller {
        constructor($scope, appConfigLoader) {
            this.$scope = $scope;
            this.appConfigLoader = appConfigLoader;
            $scope.absHRef = $scope.href = "";
            $scope.linkTarget = DEFAULT_TARGET;
            $scope.class = [];
            let ctrl = this;
            $scope.$watchGroup(["base", "url", "q", "v"], () => { ctrl.updateHref(); });
            $scope.$watchGroup(["linkClass", "linkClassModel"], () => {
                $scope.class = (typeof $scope.linkClass === "string" && $scope.linkClass.length > 0) ?
                    sys.unique(((typeof $scope.linkClassModel === "string" && $scope.linkClassModel.length > 0) ?
                        $scope.linkClass.split(sys.whitespaceRe).concat($scope.linkClassModel.split(sys.whitespaceRe)) :
                        $scope.linkClass.split(sys.whitespaceRe)).filter((v) => v.length > 0)) :
                    ((typeof $scope.linkClassModel === "string" && $scope.linkClassModel.length > 0) ? sys.unique($scope.linkClassModel.split(sys.whitespaceRe).filter((v) => v.length > 0)) : []);
            });
            $scope.$watch("target", () => {
                if (typeof $scope.target === "string")
                    $scope.linkTarget = $scope.target;
                else
                    $scope.linkTarget = DEFAULT_TARGET;
            });
        }
        updateHref() {
            if (typeof this.$scope.q === "string" && this.$scope.q.length > 0)
                this.$scope.absHRef = ((typeof this.$scope.v === "string") ? this.appConfigLoader.createUrl(this.$scope.base, this.$scope.href, this.$scope.q, this.$scope.v) :
                    this.appConfigLoader.createUrl(this.$scope.base, this.$scope.href, this.$scope.q)).href;
            else
                this.$scope.absHRef = this.appConfigLoader.createUrl(this.$scope.base, this.$scope.href).href;
        }
        $onInit() { }
    }
    function getDirectiveInjectable() {
        return [appConfigLoaderService.SERVICE_NAME, () => {
                return {
                    restrict: "E",
                    controller: ['$scope', appConfigLoaderService.SERVICE_NAME, Controller],
                    scope: { base: "@", href: "@?", q: "@?", v: "@?", linkClass: "@?", linkClassModel: "=?" },
                    replace: true,
                    template: '<a ng-href="{{absHRef}}" target="{{linkTarget}}" ng-class="class" ng-transclude></a>',
                    transclude: true
                };
            }];
    }
    aConfigLinkDirective.getDirectiveInjectable = getDirectiveInjectable;
})(aConfigLinkDirective || (aConfigLinkDirective = {}));
var snNavLinkDirective;
(function (snNavLinkDirective) {
    // #region snNavLink directive
    /**
     * Defines the directive name as "snNavLink".
     * @export
     * @constant {string}
     */
    snNavLinkDirective.DIRECTIVE_NAME = "snNavLink";
    class Controller {
        constructor($scope) {
            this.$scope = $scope;
            $scope.effectiveHRef = "";
            $scope.text = "";
            $scope.hasLink = false;
            $scope.leadingSegments = [];
            $scope.trailingSegments = [];
            $scope.$watchGroup(['toNav', 'pathNodes', 'nodeSeparator', 'hrefModel', 'href'], () => {
                let nodeSeparator = (typeof $scope.nodeSeparator === "string" && $scope.nodeSeparator.length > 0) ? $scope.nodeSeparator : "/";
                let allSegments = (typeof $scope.pathNodes === "string" && $scope.pathNodes.length > 0) ?
                    $scope.pathNodes.split(nodeSeparator).map((value) => value.trim()).filter((value) => value.length > 0) : [];
                let index = allSegments.length - 1;
                if ((index = sys.asInt($scope.linkIndex, -1)) > -1 && index < (allSegments.length - 1)) {
                    $scope.leadingSegments = [];
                    while ($scope.leadingSegments.length < index)
                        $scope.leadingSegments.push(allSegments.shift());
                    $scope.text = allSegments.shift();
                    $scope.trailingSegments = allSegments;
                }
                else {
                    $scope.trailingSegments = [];
                    $scope.text = allSegments.pop();
                    $scope.leadingSegments = allSegments;
                }
                let href = (typeof $scope.hrefModel === "string" && $scope.hrefModel.length > 0) ? $scope.hrefModel :
                    ((typeof $scope.href === "string" && $scope.href.length > 0) ? $scope.href : "");
                if (href.length == 0) {
                    $scope.hasLink = false;
                    $scope.effectiveHRef = "";
                    $scope.q = $scope.v = undefined;
                }
                else {
                    if (sys.asBoolean($scope.toNav)) {
                        $scope.effectiveHRef = "/nav_to.do";
                        $scope.q = "uri";
                        $scope.v = href;
                    }
                    else {
                        $scope.q = $scope.v = undefined;
                        $scope.effectiveHRef = href;
                    }
                    $scope.hasLink = true;
                }
            });
        }
        $onInit() { }
    }
    snNavLinkDirective.Controller = Controller;
    function getDirectiveInjectable() {
        return () => {
            return {
                restrict: "E",
                controller: ['$scope', Controller],
                scope: { href: "@?", hrefModel: "=?", toNav: "@?", target: "@?", pathNodes: "@?", nodeSeparator: "@?", linkIndex: "@?" },
                replace: true,
                template: '<samp class="navPath"><span ng-repeat="s in leadingSegments"><var>{{s}}</var> &rArr; </span><a:config-link ng-show="hasLink" base="sn" href="{{effectiveHRef}}" q="{{q}}" v="{{v}}" target="{{target}}"><var class="targetName">{{text}}</var></a:config-link><var ng-hide="hasLink" class="targetName">{{text}}</var><span ng-repeat="s in trailingSegments"> &rArr; <var>{{s}}</var></span></samp>'
            };
        };
    }
    snNavLinkDirective.getDirectiveInjectable = getDirectiveInjectable;
})(snNavLinkDirective || (snNavLinkDirective = {}));
var pageManager;
(function (pageManager_1) {
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
    pageManager_1.DEFAULT_PAGE_TITLE = 'ServiceNow Implementation and Maintenance';
    pageManager_1.CONTROLLER_NAME_MAIN_CONTENT = 'mainContentController';
    pageManager_1.CONTROLLER_NAME_DEFAULT_PAGE = 'defaultPageController';
    pageManager_1.SERVICE_NAME_PAGE_MANAGER = 'pageManager';
    pageManager_1.PROVIDER_NAME_PAGE_MANAGER = pageManager_1.SERVICE_NAME_PAGE_MANAGER + 'Provider';
    pageManager_1.CSS_CLASS_MAIN_SHOWING_ASIDE_NAV = [];
    pageManager_1.CSS_CLASS_MAIN_HIDING_ASIDE_NAV = [];
    pageManager_1.CSS_CLASS_NAV_ANCHOR_IS_CURRENT = [];
    pageManager_1.CSS_CLASS_NAV_LINK_ITEM_IS_CURRENT = [];
    pageManager_1.CSS_CLASS_NAV_ANCHOR_HAS_CURRENT = [];
    pageManager_1.CSS_CLASS_NAV_LINK_ITEM_HAS_CURRENT = [];
    pageManager_1.CSS_CLASS_NAV_ANCHOR_NOT_IN_CURRENT = [];
    pageManager_1.CSS_CLASS_NAV_LINK_ITEM_NOT_IN_CURRENT = [];
    class NavMenuItem {
        constructor(routeInfo, parent) {
            this._isCurrent = false;
            this._containsCurrent = false;
            this._linkItemCss = pageManager_1.CSS_CLASS_NAV_LINK_ITEM_NOT_IN_CURRENT;
            this._anchorCss = pageManager_1.CSS_CLASS_NAV_ANCHOR_NOT_IN_CURRENT;
            this._click = NavMenuItem.clickNotCurrent;
            this._id = routeInfo.id;
            this._title = ((typeof routeInfo.linkTitle === 'string' && routeInfo.linkTitle.trim().length > 0) || Provider.routeInfoHasExplicitController(routeInfo)) ?
                routeInfo.linkTitle : routeInfo.title;
            this._tooltip = (typeof routeInfo.tooltip === 'string' && routeInfo.tooltip.trim().length > 0) ? routeInfo.tooltip : '';
            let arr;
            if (Array.isArray(parent)) {
                parent.push(this);
                arr = parent;
            }
            else {
                parent._childItems.push(this);
                arr = parent._childItems;
            }
            let i = arr.length - 2;
            (arr[i]._next = this)._previous = arr[i];
        }
        get title() { return this._title; }
        get tooltip() { return this._tooltip; }
        get parent() { return this._parent; }
        get previous() { return this._previous; }
        get next() { return this._next; }
        get isCurrent() { return this._isCurrent; }
        get containsCurrent() { return this._containsCurrent; }
        get notCurrent() { return !(this._isCurrent || this._containsCurrent); }
        get linkItemCss() { return this._linkItemCss; }
        get anchorCss() { return this._anchorCss; }
        get href() { return this._href; }
        get url() { return this._url; }
        get click() { return this._click; }
        static clickIsCurrent(event) {
            if (typeof event === 'object' && event !== null && !event.isDefaultPrevented())
                event.preventDefault();
            return false;
        }
        static clickNotCurrent(event) { return true; }
        static find(source, id) {
            for (let i = 0; i < source.length; i++) {
                if (source[i].id === id)
                    return source[i];
            }
        }
        static getParent(source, target) {
            return NavMenuItem.find(source, (typeof target === 'string') ? target : target.id);
        }
        static getChildren(source, target) {
            let result = [];
            let id = (typeof target === 'string') ? target : target.id;
            for (let i = 0; i < source.length; i++) {
                if (source[i].parentId === id)
                    result.push(source[i]);
            }
            return result;
        }
        static import(source, scope, target) {
            let id;
            if (typeof target === 'string') {
                id = target;
                if (typeof (target = NavMenuItem.find(source, target)) === 'undefined')
                    return;
            }
            let parentRouteInfo = NavMenuItem.getParent(source, id);
            let item;
            let i;
            if (typeof parentRouteInfo === 'undefined') {
                if (Array.isArray(scope)) {
                    for (i = 0; i < source.length; i++) {
                        if (!Provider.isRouteRedirectInfo(source[i]) && typeof NavMenuItem.getParent(source, source[i]) === 'undefined') {
                            let m = new NavMenuItem(source[i], scope);
                            if (m._id === id)
                                item = m;
                        }
                    }
                    if (typeof item !== 'undefined')
                        return item;
                    return new NavMenuItem(target, scope);
                }
                for (i = 0; i < scope.pageTopNavItems.length; i++) {
                    if (scope.pageTopNavItems[i]._id === id)
                        return scope.pageTopNavItems[i];
                }
                return new NavMenuItem(target, scope.pageTopNavItems);
            }
            let parentItem = this.import(source, scope, parentRouteInfo);
            if (parentItem._childItems.length == 0) {
                for (i = 0; i < source.length; i++) {
                    if (!Provider.isRouteRedirectInfo(source[i]) && typeof source[i].id === parentItem._id) {
                        let m = new NavMenuItem(source[i], parentItem);
                        if (m._id === id)
                            item = m;
                    }
                }
                if (typeof item !== 'undefined')
                    return item;
            }
            else
                for (i = 0; i < parentItem._childItems.length; i++) {
                    if (parentItem._childItems[i]._id === id)
                        return parentItem._childItems[i];
                }
            return new NavMenuItem(target, parentItem);
        }
        static setCurrent(source, scope, routeInfo) {
            let currentNavItem = NavMenuItem.import(source, scope, routeInfo);
            let item;
            if (Array.isArray(scope)) {
                for (let i = 0; i < scope.length; i++) {
                    if (scope[i]._id === currentNavItem._id) {
                        if (scope[i]._isCurrent)
                            return scope[i];
                        scope[i]._isCurrent = false;
                        scope[i]._anchorCss = pageManager_1.CSS_CLASS_NAV_ANCHOR_NOT_IN_CURRENT;
                        scope[i]._linkItemCss = pageManager_1.CSS_CLASS_NAV_LINK_ITEM_NOT_IN_CURRENT;
                        scope[i]._click = NavMenuItem.clickNotCurrent;
                        scope[i]._href = currentNavItem._url;
                        for (let item = scope[i]._parent; typeof item !== 'undefined'; item = item._parent) {
                            item._containsCurrent = false;
                            item._anchorCss = pageManager_1.CSS_CLASS_NAV_ANCHOR_NOT_IN_CURRENT;
                            item._linkItemCss = pageManager_1.CSS_CLASS_NAV_LINK_ITEM_NOT_IN_CURRENT;
                            item._click = NavMenuItem.clickNotCurrent;
                            item._href = item._url;
                        }
                        break;
                    }
                }
                currentNavItem._isCurrent = true;
                currentNavItem._anchorCss = pageManager_1.CSS_CLASS_NAV_ANCHOR_IS_CURRENT;
                currentNavItem._linkItemCss = pageManager_1.CSS_CLASS_NAV_LINK_ITEM_IS_CURRENT;
                currentNavItem._click = NavMenuItem.clickIsCurrent;
                currentNavItem._href = currentNavItem._url;
                for (item = currentNavItem._parent; typeof item !== 'undefined'; item = item._parent) {
                    item._containsCurrent = false;
                    item._anchorCss = pageManager_1.CSS_CLASS_NAV_ANCHOR_HAS_CURRENT;
                    item._linkItemCss = pageManager_1.CSS_CLASS_NAV_LINK_ITEM_HAS_CURRENT;
                    item._click = NavMenuItem.clickNotCurrent;
                    item._href = item._url;
                }
                return currentNavItem;
            }
            if (typeof scope.currentNavItem === 'object' && scope.currentNavItem !== null) {
                if (routeInfo.id === scope.currentNavItem._id)
                    return scope.currentNavItem;
                scope.currentNavItem._isCurrent = false;
                scope.currentNavItem._anchorCss = pageManager_1.CSS_CLASS_NAV_ANCHOR_NOT_IN_CURRENT;
                scope.currentNavItem._linkItemCss = pageManager_1.CSS_CLASS_NAV_LINK_ITEM_NOT_IN_CURRENT;
                scope.currentNavItem._click = NavMenuItem.clickNotCurrent;
                scope.currentNavItem._href = scope.currentNavItem._url;
                for (item = scope.currentNavItem._parent; typeof item !== 'undefined'; item = item._parent) {
                    item._containsCurrent = false;
                    item._anchorCss = pageManager_1.CSS_CLASS_NAV_ANCHOR_NOT_IN_CURRENT;
                    item._linkItemCss = pageManager_1.CSS_CLASS_NAV_LINK_ITEM_NOT_IN_CURRENT;
                    item._click = NavMenuItem.clickNotCurrent;
                    item._href = item._url;
                }
            }
            while (scope.precedingSideNavItems.length > 0)
                scope.precedingSideNavItems.pop();
            while (scope.followingSideNavItems.length > 0)
                scope.followingSideNavItems.pop();
            while (scope.sideNavBreadcrumbItems.length > 0)
                scope.sideNavBreadcrumbItems.pop();
            while (scope.nestedChildNavItems.length > 0)
                scope.nestedChildNavItems.pop();
            (scope.currentNavItem = currentNavItem)._isCurrent = true;
            currentNavItem._isCurrent = true;
            currentNavItem._anchorCss = pageManager_1.CSS_CLASS_NAV_ANCHOR_IS_CURRENT;
            currentNavItem._linkItemCss = pageManager_1.CSS_CLASS_NAV_LINK_ITEM_IS_CURRENT;
            currentNavItem._click = NavMenuItem.clickIsCurrent;
            currentNavItem._href = currentNavItem._url;
            for (let item = currentNavItem._parent; typeof item !== 'undefined'; item = item._parent) {
                item._containsCurrent = false;
                item._anchorCss = pageManager_1.CSS_CLASS_NAV_ANCHOR_HAS_CURRENT;
                item._linkItemCss = pageManager_1.CSS_CLASS_NAV_LINK_ITEM_HAS_CURRENT;
                item._click = NavMenuItem.clickNotCurrent;
                item._href = item._url;
            }
            if (typeof currentNavItem._parent === 'undefined') {
                scope.showNestedChildNav = scope.showSideNavBreadcrumbs = scope.showCurrentItem = false;
                NavMenuItem.getChildren(source, routeInfo).forEach(function (value) {
                    scope.precedingSideNavItems.push(NavMenuItem.import(source, scope, value));
                });
            }
            else {
                for (item = currentNavItem._parent; typeof item._parent !== 'undefined'; item = item._parent)
                    scope.sideNavBreadcrumbItems.push(item);
                scope.showSideNavBreadcrumbs = scope.sideNavBreadcrumbItems.length > 0;
                let i = 0;
                let id = scope.currentNavItem._id;
                let arr = currentNavItem._parent._childItems;
                while (arr[i]._id !== id)
                    scope.precedingSideNavItems.push(arr[i++]);
                while (++i < arr.length)
                    scope.followingSideNavItems.push(arr[i]);
                NavMenuItem.getChildren(source, routeInfo).forEach(function (value) {
                    scope.nestedChildNavItems.push(NavMenuItem.import(source, scope, value));
                });
                scope.showNestedChildNav = scope.nestedChildNavItems.length > 0;
                scope.showCurrentItem = scope.precedingSideNavItems.length > 0 || scope.showNestedChildNav || scope.followingSideNavItems.length > 0 || scope.showSideNavBreadcrumbs;
            }
            scope.mainSectionClass = ((scope.showNavAsideElement = scope.showCurrentItem || scope.precedingSideNavItems.length > 0) == true) ? pageManager_1.CSS_CLASS_MAIN_SHOWING_ASIDE_NAV : pageManager_1.CSS_CLASS_MAIN_HIDING_ASIDE_NAV;
            return currentNavItem;
        }
    }
    pageManager_1.NavMenuItem = NavMenuItem;
    class VisibilityState {
        constructor(_whenVisible, _whenNotVisible, _dependency) {
            this._whenVisible = _whenVisible;
            this._whenNotVisible = _whenNotVisible;
            this._dependency = _dependency;
        }
        get whenVisible() { return this._whenVisible; }
        set whenVisibile(value) { this._whenVisible = value; }
        get whenNotVisible() { return this._whenNotVisible; }
        set whenNotVisible(value) { this._whenNotVisible = value; }
        get dependency() { return this._dependency; }
        set dependency(value) { this._dependency = value; }
        get isVisible() { return !VisbleDependency2.isNil(this._dependency) && this._dependency.isVisible; }
        get notVisible() { return VisbleDependency2.isNil(this._dependency) || this._dependency.notVisible; }
        get state() { return (this.isVisible) ? this._whenVisible : this._whenNotVisible; }
    }
    pageManager_1.VisibilityState = VisibilityState;
    class VisbleDependency2 {
        constructor(_item1, _item2) {
            this._item1 = _item1;
            this._item2 = _item2;
        }
        get item1() { return this._item1; }
        get item2() { return this._item2; }
        get isVisible() { return !(VisbleDependency2.isNil(this._item1) || VisbleDependency2.isNil(this._item2)) && this._item1.isVisible && this._item2.isVisible; }
        get notVisible() { return VisbleDependency2.isNil(this._item1) || VisbleDependency2.isNil(this._item2) || this._item1.notVisible || this._item2.notVisible; }
        static isNil(obj) { return typeof obj === 'undefined' || (typeof obj === 'object' && obj === null); }
    }
    pageManager_1.VisbleDependency2 = VisbleDependency2;
    class VisbleDependency3 extends VisbleDependency2 {
        constructor(item1, item2, _item3) {
            super(item1, item2);
            this._item3 = _item3;
        }
        get item3() { return this._item3; }
        get isVisible() { return !VisbleDependency2.isNil(this._item3) && super.isVisible; }
        get notVisible() { return VisbleDependency2.isNil(this._item3) || super.notVisible; }
    }
    pageManager_1.VisbleDependency3 = VisbleDependency3;
    class VisbleDependency4 extends VisbleDependency3 {
        constructor(item1, item2, item3, _item4) {
            super(item1, item2, item3);
            this._item4 = _item4;
        }
        get item4() { return this._item4; }
        get isVisible() { return !VisbleDependency2.isNil(this._item4) && super.isVisible; }
        get notVisible() { return VisbleDependency2.isNil(this._item4) || super.notVisible; }
    }
    pageManager_1.VisbleDependency4 = VisbleDependency4;
    class OrderedMap {
        constructor(arg0, arg1, ...items) {
            this._key = Symbol();
            if (arguments.length == 0)
                this._items = new HideIfEmpty();
            else {
                let k;
                if (arguments.length == 1)
                    this._items = new HideIfEmpty(arg0);
                else if (arguments.length == 2) {
                    this._items = new HideIfEmpty();
                    k = arg0(arg1);
                    if (typeof k !== 'string')
                        throw new Error('Invalid key');
                    if (typeof arg1 === 'undefined')
                        this._undefinedKey = k;
                    else if (typeof arg1 === 'object' && arg1 === null)
                        this._nullKey = k;
                    else
                        arg1[this._key] = k;
                    this._items.add(arg1);
                }
                else {
                    if (typeof arg1 === 'function')
                        this._items = new HideIfEmpty(arg1);
                    else {
                        k = arg0(arg1);
                        if (typeof k !== 'string')
                            throw new Error('Invalid key');
                        if (typeof arg1 === 'undefined')
                            this._undefinedKey = k;
                        else if (typeof arg1 === 'object' && arg1 === null)
                            this._nullKey = k;
                        else
                            arg1[this._key] = k;
                        this._items = new HideIfEmpty();
                        this._items.add(arg1);
                    }
                    for (let i = 0; i < items.length; i++) {
                        if (typeof this.keyOf(items[i]) === 'string') {
                            this.clear();
                            throw new Error('Duplicate key');
                        }
                        k = arg0(items[i]);
                        if (typeof k !== 'string') {
                            this.clear();
                            throw new Error('Invalid key');
                        }
                    }
                }
            }
        }
        get isVisible() { return this._items.isVisible; }
        get notVisible() { return this._items.notVisible; }
        get size() { return this._items.size; }
        add(values) {
            let iterator = values.entries();
            let items = [];
            for (let r = iterator.next(); r.done !== true; r = iterator.next()) {
                if (typeof r.value[0] !== 'string')
                    throw new Error("Invalid key");
                if (typeof this.keyOf(r.value) === 'string')
                    throw new Error("Item has already been added");
                items.push(r.value);
            }
            items.forEach(function (value) { this.set(value[0], value[1]); });
        }
        merge(values) {
            let iterator = values.entries();
            let items = [];
            for (let r = iterator.next(); r.done !== true; r = iterator.next()) {
                if (typeof r.value[0] !== 'string')
                    throw new Error("Invalid key");
                items.push(r.value);
            }
            items.forEach(function (value) { this.set(value[0], value[1]); });
        }
        clear() {
            this._items.forEach(function (value) {
                if (typeof value !== 'undefined' && (typeof value !== 'object' || value !== null))
                    value[this._key] = undefined;
            }, this);
            this._nullKey = this._undefinedKey = undefined;
            this._items.clear();
        }
        delete(key) {
            for (let i = 0; i < this._items.size; i++) {
                if (this.keyOf(this._items[i]) === key) {
                    this.deleteAt(i);
                    return true;
                }
            }
            return false;
        }
        deleteAt(index) {
            let item = this._items.get(index);
            this._items.deleteAt(index);
            if (typeof item === 'undefined')
                this._undefinedKey = undefined;
            else if (typeof item === 'object' && item === null)
                this._nullKey = undefined;
            else
                item[this._key] = undefined;
        }
        filter(callbackfn, thisArg) {
            if (arguments.length > 1)
                return this._items.filter(function (value, index) { return callbackfn.call(thisArg, value, this.keyOf(value), index, this); }, this);
            return this._items.filter(function (value, index) { return callbackfn(value, this.keyOf(value), index, this); }, this);
        }
        forEach(callbackfn, thisArg) {
            if (arguments.length > 1)
                this._items.forEach(function (value) { callbackfn.call(thisArg, value, this.keyOf(value), this); }, this);
            else
                this._items.forEach(function (value) { callbackfn(value, this.keyOf(value), this); }, this);
        }
        map(callbackfn, thisArg) {
            if (arguments.length > 1)
                return this._items.map(function (value, index) { return callbackfn.call(thisArg, value, this.keyOf(value), index, this); }, this);
            return this._items.map(function (value, index) { return callbackfn(value, this.keyOf(value), index, this); }, this);
        }
        get(arg) {
            if (typeof arg === "number")
                return this._items.get(arg);
            for (let i = 0; i < this._items.size; i++) {
                if (this.keyOf(this._items[i]) === arg)
                    return this._items[i];
            }
        }
        has(key) {
            for (let i = 0; i < this._items.size; i++) {
                if (this.keyOf(this._items[i]) === key)
                    return true;
            }
            return false;
        }
        hasValue(value) { return typeof this.keyOf(value) === 'string'; }
        indexOfValue(value) {
            let key = this.keyOf(value);
            if (typeof key === 'string')
                return this.indexOf(key);
        }
        indexOf(key) {
            for (let i = 0; i < this._items.size; i++) {
                if (this.keyOf(this._items[i]) === key)
                    return i;
            }
            return -1;
        }
        keyOf(item) {
            if (typeof item === 'undefined')
                return this._undefinedKey;
            if (typeof item === 'object' && item === null)
                return this._nullKey;
            return item[this._key];
        }
        set(key, value) {
            if (typeof key !== 'string')
                throw new Error("Invalid key");
            let index = this.indexOf(key);
            if (index < 0) {
                if (typeof value === 'undefined')
                    this._undefinedKey = key;
                else if (typeof value === 'object' && value === null)
                    this._nullKey = key;
                else
                    value[this._key] = key;
                this._items.add(value);
            }
            else {
                if (key === this._undefinedKey)
                    this._undefinedKey = undefined;
                else if (key === this._nullKey)
                    this._nullKey = undefined;
                else
                    this._items.get(index)[this._key] = undefined;
                if (typeof value === 'undefined')
                    this._undefinedKey = key;
                else if (typeof value === 'object' && value === null)
                    this._nullKey = key;
                else
                    value[this._key] = key;
                this._items.set(index, value);
            }
            return this;
        }
        [Symbol.iterator]() { return new SymbolKeyValueIterator(this._items.values(), this._key, this._nullKey, this._undefinedKey); }
        entries() { return new SymbolKeyValueIterator(this._items.values(), this._key, this._nullKey, this._undefinedKey); }
        keys() { return new SymbolKeyIterator(this._items.values(), this._key, this._nullKey, this._undefinedKey); }
        values() { return this._items.values(); }
    }
    pageManager_1.OrderedMap = OrderedMap;
    class SymbolKeyIterator {
        constructor(_iterator, _keySymbol, _nullKey, _undefinedKey) {
            this._iterator = _iterator;
            this._keySymbol = _keySymbol;
            this._nullKey = _nullKey;
            this._undefinedKey = _undefinedKey;
        }
        [Symbol.iterator]() { return this; }
        next() {
            if (typeof this._iterator !== 'undefined') {
                let result = this._iterator.next();
                if (!result.done)
                    return { value: (typeof result.value === 'undefined') ? this._undefinedKey : ((typeof result.value === 'object' && result.value === null) ? this._nullKey : result.value[this._keySymbol]) };
                this._iterator = undefined;
            }
            return { done: true };
        }
    }
    pageManager_1.SymbolKeyIterator = SymbolKeyIterator;
    class SymbolKeyValueIterator {
        constructor(_iterator, _keySymbol, _nullKey, _undefinedKey) {
            this._iterator = _iterator;
            this._keySymbol = _keySymbol;
            this._nullKey = _nullKey;
            this._undefinedKey = _undefinedKey;
        }
        [Symbol.iterator]() { return this; }
        next() {
            if (typeof this._iterator !== 'undefined') {
                let result = this._iterator.next();
                if (!result.done)
                    return { value: [(typeof result.value === 'undefined') ? this._undefinedKey : ((typeof result.value === 'object' && result.value === null) ? this._nullKey : result.value[this._keySymbol]), result.value] };
                this._iterator = undefined;
            }
            return { done: true };
        }
    }
    pageManager_1.SymbolKeyValueIterator = SymbolKeyValueIterator;
    class HideIfEmpty {
        constructor(arg0, ...items) {
            this._items = [];
            if (arguments.length == 0)
                this._items = [];
            else {
                if (typeof arg0 == 'function') {
                    this._comparer = arg0;
                    this._items = (arguments.length > 0) ? items : [];
                    return;
                }
                this._items = (arguments.length == 1) ? [arg0] : [arg0].concat(items);
            }
            this._comparer = function (x, y) { return x === y; };
        }
        get isVisible() { return this._items.length > 0; }
        get notVisible() { return this._items.length == 0; }
        get size() { return this._items.length; }
        add(value) {
            this._items.push(value);
            return this;
        }
        clear() { this._items.length == 0; }
        deleteAt(index) {
            if (this._items.length > 0) {
                if (index === 0)
                    this._items.shift();
                else if (index == this._items.length - 1)
                    this._items.pop();
                else {
                    if (index >= this._items.length)
                        throw new RangeError("Index out of range");
                    this._items.splice(index, 1);
                }
            }
        }
        delete(value) {
            for (let i = 0; i < this._items.length; i++) {
                if (this._comparer(this._items[i], value)) {
                    if (i === 0)
                        this._items.shift();
                    else if (i < this._items.length - 1)
                        this._items.splice(i, 1);
                    else
                        this._items.pop();
                    return true;
                }
            }
            return false;
        }
        filter(callbackfn, thisArg) {
            if (arguments.length > 1)
                return this._items.filter(function (value, index) { return callbackfn.call(thisArg, value, index, this); }, this);
            return this._items.filter(function (value, index) { return callbackfn(value, index, this); }, this);
        }
        forEach(callbackfn, thisArg) {
            if (arguments.length > 1)
                this._items.forEach(function (value, index) { callbackfn.call(thisArg, value, value, this); }, this);
            else
                this._items.forEach(function (value, index) { callbackfn(value, value, this); }, this);
        }
        map(callbackfn, thisArg) {
            if (arguments.length > 1)
                return this._items.map(function (value, index) { return callbackfn.call(thisArg, value, index, this); }, this);
            return this._items.map(function (value, index) { return callbackfn(value, index, this); }, this);
        }
        get(index) { return this._items[index]; }
        has(value) {
            for (let i = 0; i < this._items.length; i++) {
                if (this._comparer(this._items[i], value))
                    return true;
            }
            return false;
        }
        indexOf(value) {
            for (let i = 0; i < this._items.length; i++) {
                if (this._comparer(this._items[i], value))
                    return i;
            }
            return -1;
        }
        set(index, value) { this._items[index] = value; }
        [Symbol.iterator]() { return this._items.values(); }
        entries() { return this._items.map(function (value) { return [value, value]; }).values(); }
        keys() { return this._items.values(); }
        values() { return this._items.values(); }
    }
    pageManager_1.HideIfEmpty = HideIfEmpty;
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
        constructor($scope, pageManager) {
            this.$scope = $scope;
            this[Symbol.toStringTag] = pageManager_1.CONTROLLER_NAME_MAIN_CONTENT;
            const ctrl = this;
            pageManager.setScope($scope);
        }
        $doCheck() { }
        static getControllerInjectable() {
            return ['$scope', 'pageManager', MainContentController];
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
        constructor($scope, pageManager) {
            this.$scope = $scope;
            this[Symbol.toStringTag] = pageManager_1.CONTROLLER_NAME_DEFAULT_PAGE;
        }
        $doCheck() { }
        static getControllerInjectable() {
            return ['$scope', 'pageManager', DefaultPageController];
        }
    }
    pageManager_1.DefaultPageController = DefaultPageController;
    /**
     * Service which provides page-related information and tracks and updates the current app page title.
     * @export
     * @class pageManager.Service
     */
    class Service {
        constructor($rootScope, _pageRouteInfo) {
            this._pageRouteInfo = _pageRouteInfo;
            this._pageTitle = pageManager_1.DEFAULT_PAGE_TITLE;
            this._pageSubTitle = '';
            this._rootItems = [];
            this[Symbol.toStringTag] = pageManager_1.SERVICE_NAME_PAGE_MANAGER;
            const svc = this;
            this.setCurrentRoute(this._pageRouteInfo[0]);
            let item = this._currentNavItem;
            while (typeof item.parent !== 'undefined')
                item = item.parent;
            while (typeof item.previous !== 'undefined')
                item = item.previous;
            do {
                this._rootItems.push(item);
            } while (typeof (item = item.next) !== 'undefined');
            $rootScope.$on('$routeChangeSuccess', function (event, current) {
                if (typeof current.name !== 'string')
                    return;
                svc._currentRoute = current;
                let routeInfo = svc.getRouteInfoById(current.name);
                if (typeof routeInfo !== 'undefined')
                    svc.setCurrentRoute(routeInfo);
            });
        }
        getRouteInfoById(id) {
            for (let i = 0; i < this._pageRouteInfo.length; i++) {
                if (this._pageRouteInfo[i].id === id)
                    return this._pageRouteInfo[i];
            }
        }
        currentPage() { return this._currentRouteInfo; }
        currentRoute() { return this._currentRoute; }
        setCurrentRoute(route) {
            if (Provider.isRouteRedirectInfo(route))
                return;
            this._currentRouteInfo = route;
            if (Provider.routeInfoUsesDefaultController(route)) {
                if (route.subTitle === 'string' && route.subTitle.length > 0)
                    this.pageTitle(route.title, route.subTitle);
                else
                    this.pageTitle(route.title);
            }
            this._currentNavItem = NavMenuItem.setCurrent(this._pageRouteInfo, (typeof this._mainScope === 'undefined') ? this._rootItems : this._mainScope, route);
        }
        pageTitle(value, subTitle) {
            if (typeof value === 'string') {
                this._pageTitle = ((value = value.trim()).length == 0) ? pageManager_1.DEFAULT_PAGE_TITLE : value;
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
        pageSubTitle(value) { return this._pageSubTitle; }
        /**
         * This should only be called by the main controller so the main controller's page title properties can be updated.
         * @param {IPageTitleScope & INavigationScope} scope - The scope of the main application controller.
         * @memberof PageLocationService
         */
        setScope(scope) {
            if (typeof scope !== 'object' || scope === null)
                return;
            (this._mainScope = scope).pageTitle = this._pageTitle;
            scope.showSubtitle = (scope.subTitle = this._pageSubTitle).trim().length > 0;
            NavMenuItem.setCurrent(this._pageRouteInfo, this._mainScope, this._currentRouteInfo);
        }
    }
    pageManager_1.Service = Service;
    class Provider {
        constructor() {
            this[Symbol.toStringTag] = pageManager_1.PROVIDER_NAME_PAGE_MANAGER;
            this._pageRouteInfo = [
                {
                    templateUrl: 'Template/Pages/Home.htm',
                    route: '/home',
                    title: pageManager_1.DEFAULT_PAGE_TITLE,
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
        }
        get $get() {
            let provider = this;
            return ['$rootScope', function pageManagerFactory($rootScope) {
                    return new Service($rootScope, provider.getRouteInfo());
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
        ConfigureRoutes($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix(pageManager_1.HASH_PREFIX);
            this.getRouteInfo().forEach(function (value) {
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
        }
    }
    pageManager_1.Provider = Provider;
})(pageManager || (pageManager = {}));
/**
 * The main application namespace
 * @namespace
 */
var app;
(function (app) {
    /**
     * The main module for this app.
     * @export
     * @constant {ng.IModule}
     */
    app.appModule = angular.module("app", [])
        .provider(pageManager.SERVICE_NAME_PAGE_MANAGER, pageManager.Provider)
        .config(['$locationProvider', '$routeProvider', 'pageManagerProvider',
        function ($locationProvider, $routeProvider, pageManagerProvider) {
            pageManagerProvider.ConfigureRoutes($routeProvider, $locationProvider);
            window.alert('Called config');
        }])
        .controller(pageManager.CONTROLLER_NAME_MAIN_CONTENT, pageManager.MainContentController.getControllerInjectable())
        .controller(pageManager.CONTROLLER_NAME_DEFAULT_PAGE, pageManager.DefaultPageController.getControllerInjectable())
        .service(persistentStorageLoaderService.SERVICE_NAME, persistentStorageLoaderService.getServiceInjectable())
        .service(notificationMessageService.SERVICE_NAME, notificationMessageService.getServiceInjectable())
        .service(appConfigLoaderService.SERVICE_NAME, appConfigLoaderService.getServiceInjectable())
        .service(navConfigLoaderService.SERVICE_NAME, navConfigLoaderService.getServiceInjectable())
        .service(appModalPopupService.SERVICE_NAME, appModalPopupService.getServiceInjectable())
        .directive(appModalPopupService.DIRECTIVE_NAME, appModalPopupService.Service.getDirectiveInjectable())
        .directive(urlInputDirective.DIRECTIVE_NAME, urlInputDirective.getDirectiveInjectable())
        .directive(configUrlDirective.DIRECTIVE_NAME, configUrlDirective.getDirectiveInjectable())
        .directive(aConfigLinkDirective.DIRECTIVE_NAME, aConfigLinkDirective.getDirectiveInjectable())
        .directive(snNavLinkDirective.DIRECTIVE_NAME, snNavLinkDirective.getDirectiveInjectable());
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
})(app || (app = {}));
//# sourceMappingURL=app.js.map