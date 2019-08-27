/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
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
            _window.console.log(angular.toJson({
                activity: "persistentStorageLoaderService.SessionStorageEntryEnumerator#constructor invoked",
                arguments: sys.asArray(arguments)
            }));
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
            _window.console.log(angular.toJson({
                activity: "persistentStorageLoaderService.SessionStorageValueEnumerator#constructor invoked",
                arguments: sys.asArray(arguments)
            }));
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
            $window.console.log(angular.toJson({
                activity: "persistentStorageLoaderService.Service#constructor invoked",
                arguments: sys.asArray(arguments)
            }));
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
            this._idpUrl = new URL(appConfigLoaderService.DEFAULT_URL_GIT_SERVICE);
            $log.debug(angular.toJson({
                activity: "appConfigLoaderService.Service#constructor invoked",
                persistentStorageLoader: sys.getClassName(persistentStorageLoader),
                $http: sys.getClassName($http),
                $log: sys.getClassName($log),
                $root: sys.getClassName($rootScope),
                $q: sys.getClassName($q),
                additionalArguments: sys.skipFirst(sys.asArray(arguments), 5)
            }, true));
            this[Symbol.toStringTag] = appConfigLoaderService.SERVICE_NAME;
            let svc = this;
            let original = persistentStorageLoader.getObject(persistentStorageLoaderService.STORAGEKEY_URL_CONFIG_SETTINGS);
            if (sys.notNil(original)) {
                $log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#constructor: Loaded original " + persistentStorageLoaderService.STORAGEKEY_URL_CONFIG_SETTINGS,
                    original: original
                }, true));
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
            $log.debug(angular.toJson({
                activity: "appConfigLoaderService.Service#constructor: Requesting application configuration data",
                url: JSON_RELATIVE_URL_APPCONFIGDATA
            }, true));
            let promise = $http.get(JSON_RELATIVE_URL_APPCONFIGDATA).then((result) => {
                $log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#constructor: Application configuration data retrieval response received",
                    headers: result.headers,
                    status: result.status,
                    statusText: result.statusText
                }, true));
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
                    else {
                        $log.debug(angular.toJson({
                            activity: "appConfigLoaderService.Service#constructor: Accepting application configuration retrieval response data",
                            data: result.data
                        }, true));
                        resolve(result.data);
                    }
                });
            }, (reason) => {
                $log.error({
                    activity: "Unexpected error making application configuration data request",
                    reason: reason
                }, true);
            });
            this._loadNavigationSettings = promise.then((data) => {
                $log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#loadNavigationSettings=>then invoked",
                    navigation: data.navigation
                }, true));
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
                    else {
                        $log.debug(angular.toJson({
                            activity: "appConfigLoaderService.Service#loadNavigationSettings=>then: Accepting Application Navigation configuration",
                            navigation: data.navigation
                        }, true));
                        resolve(data.navigation);
                    }
                });
            });
            promise.then((data) => {
                function applyUrlSetting(name, cfgValue, settingsValue, defaultValue) {
                    $log.debug(angular.toJson({
                        activity: "appConfigLoaderService.Service#constructor: Applying URL setting",
                        name: name,
                        cfgValue: cfgValue,
                        settingsValue: settingsValue,
                        defaultValue: defaultValue
                    }, true));
                    if (sys.notNilOrEmpty(settingsValue))
                        try {
                            $log.debug(angular.toJson({
                                activity: "appConfigLoaderService.Service#constructor: Returning value from persistent storage",
                                name: name,
                                href: settingsValue
                            }, true));
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
                            $log.debug(angular.toJson({
                                activity: "appConfigLoaderService.Service#constructor: Returning value from application configuration settings",
                                name: name,
                                href: cfgValue
                            }, true));
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
                    $log.debug(angular.toJson({
                        activity: "appConfigLoaderService.Service#constructor: Returning default value",
                        name: name,
                        url: defaultValue
                    }, true));
                    return defaultValue;
                }
                ;
                let settings = {
                    serviceNowUrl: this.serviceNowUrl(applyUrlSetting("serviceNowUrl", data.serviceNowUrl, original.serviceNowUrl, this.serviceNowUrl())).href,
                    gitServiceUrl: this.gitServiceUrl(applyUrlSetting("gitServiceUrl", data.gitServiceUrl, original.gitServiceUrl, this.gitServiceUrl())).href,
                    idpUrl: this.idpUrl(applyUrlSetting("idpUrl", data.idpUrl, original.idpUrl, this.idpUrl())).href
                };
                if (original.serviceNowUrl !== settings.serviceNowUrl || original.gitServiceUrl !== settings.gitServiceUrl || original.idpUrl !== settings.idpUrl) {
                    $log.debug(angular.toJson({
                        activity: "appConfigLoaderService.Service#constructor: Saving URL settings",
                        original: original,
                        settings: settings
                    }, true));
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
            this.$log.debug(angular.toJson({
                reason: "appConfigLoaderService.Service#serviceNowUrl: Comparing URL values",
                oldValue: oldValue,
                value: value
            }, true));
            if (typeof oldValue !== "object" || oldValue.href !== value.href) {
                this._serviceNowUrl = value;
                this.$log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#serviceNowUrl: Broadcasting event",
                    name: appConfigLoaderService.EVENT_NAME_SERVICENOW,
                    newValue: value,
                    oldValue: oldValue
                }, true));
                this.$rootScope.$broadcast(appConfigLoaderService.EVENT_NAME_SERVICENOW, value, oldValue);
                this.$log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#serviceNowUrl: Broadcast event complete",
                    name: appConfigLoaderService.EVENT_NAME_SERVICENOW,
                    newValue: value,
                    oldValue: oldValue
                }, true));
            }
            else
                this.$log.debug("appConfigLoaderService.Service#serviceNowUrl: no change");
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
        * @description Changes in this value cause any callbacks specified through {@link appConfigData#onGitRepositoryUrlChanged} to be invoked.
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
            this.$log.debug(angular.toJson({
                reason: "appConfigLoaderService.Service#gitServiceUrl: Comparing URL values",
                oldValue: oldValue,
                value: value
            }, true));
            if (typeof oldValue !== "object" || oldValue.href !== value.href) {
                this._gitServiceUrl = value;
                this.$log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#gitServiceUrl: Broadcasting event",
                    name: appConfigLoaderService.EVENT_NAME_GIT_SERVICE,
                    newValue: value,
                    oldValue: oldValue
                }, true));
                this.$rootScope.$broadcast(appConfigLoaderService.EVENT_NAME_GIT_SERVICE, value, oldValue);
                this.$log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#gitServiceUrl: Broadcast event complete",
                    name: appConfigLoaderService.EVENT_NAME_GIT_SERVICE,
                    newValue: value,
                    oldValue: oldValue
                }, true));
            }
            else
                this.$log.debug("appConfigLoaderService.Service#gitServiceUrl: no change");
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
            let validated = Service.validateURL(value, true);
            if (typeof validated === "string") {
                this.$log.warn(angular.toJson({
                    reason: "appConfigLoaderService.Service#idpUrl: Error validating URL value",
                    activity: validated,
                    value: value
                }, true));
                throw new Error(validated);
            }
            let oldValue = this._idpUrl;
            this.$log.debug(angular.toJson({
                reason: "appConfigLoaderService.Service#idpUrl: Comparing URL values",
                oldValue: oldValue,
                value: value
            }, true));
            if (typeof oldValue !== "object" || oldValue.href !== value.href) {
                this._idpUrl = value;
                this.$log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#idpUrl: Broadcasting event",
                    name: appConfigLoaderService.EVENT_NAME_IDP,
                    newValue: value,
                    oldValue: oldValue
                }, true));
                this.$rootScope.$broadcast(appConfigLoaderService.EVENT_NAME_IDP, value, oldValue);
                this.$log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#idpUrl: Broadcast event complete",
                    name: appConfigLoaderService.EVENT_NAME_IDP,
                    newValue: value,
                    oldValue: oldValue
                }, true));
            }
            else
                this.$log.debug("appConfigLoaderService.Service#idpUrl: no change");
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
            this.$log.debug(angular.toJson({
                activity: "appConfigLoaderService.Service#createUrl invoked",
                setting: setting,
                relativeUrl: relativeUrl,
                queryParameter: queryParameter,
                queryValue: queryValue
            }, true));
            let url;
            if (setting === "git")
                url = this._gitServiceUrl;
            else
                url = sys.makeDirectoryUrl((setting == "sn") ? this._serviceNowUrl : this._idpUrl);
            if (typeof relativeUrl === "string" && relativeUrl.length > 0 && relativeUrl !== ".")
                url = new URL(relativeUrl, url);
            else
                url = new URL(url.href);
            this.$log.debug(angular.toJson({
                activity: "appConfigLoaderService.Service#createUrl: Got base URL",
                url: url
            }, true));
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
            this.$log.debug(angular.toJson({
                activity: "appConfigLoaderService.Service#createUrl: returning URL",
                url: url
            }, true));
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
            appConfigLoader.$log.debug(angular.toJson({
                activity: "navConfigLoaderService.Service#constructor invoked",
                appConfigLoader: sys.getClassName(appConfigLoader),
                $window: sys.getClassName($window),
                $document: sys.getClassName($document),
                $q: sys.getClassName($q),
                additionalArguments: sys.skipFirst(sys.asArray(arguments), 4)
            }, true));
            this[Symbol.toStringTag] = navConfigLoaderService.SERVICE_NAME;
            let headElement = $document.find('head').first();
            let titleElement = headElement.find('title');
            if (titleElement.length == 0) {
                appConfigLoader.$log.debug("navConfigLoaderService.Service#constructor: Adding title element to document head");
                headElement.add(titleElement = $('<title></title>'));
                this._pageTitle = "";
            }
            else {
                this._pageTitle = titleElement.text().trim();
                appConfigLoader.$log.debug(angular.toJson({
                    activity: "navConfigLoaderService.Service#constructor: Got page title",
                    title: this._pageTitle
                }, true));
            }
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
            appConfigLoader.$log.debug(angular.toJson({
                activity: "navConfigLoaderService.Service#constructor: Got current page URL",
                currentPageURL: this._currentPageURL,
                segments: segments
            }, true));
            this._currentPageURL.pathname = "/" + (this._relativePagePath = (segments.length == 1) ? segments[0] : segments.join("/"));
            appConfigLoader.$log.debug(angular.toJson({
                activity: "navConfigLoaderService.Service#constructor: Normalized current page URL",
                currentPageURL: this._currentPageURL
            }, true));
            if ((this._currentPageId = headElement.find('meta[name="app:pageId"]').attr("content")).length == 0) {
                this._currentPageId = toPageId(this._currentPageURL.pathname);
                appConfigLoader.$log.debug(angular.toJson({
                    activity: "navConfigLoaderService.Service#constructor: app:pageId meta element not found - created page ID from path name",
                    pathname: this._currentPageURL.pathname,
                    currentPageId: this._currentPageId
                }, true));
            }
            else
                appConfigLoader.$log.debug(angular.toJson({
                    activity: "navConfigLoaderService.Service#constructor: Got page id from app:pageId meta element",
                    currentPageId: this._currentPageId
                }, true));
            if (this._pageTitle.length === 0) {
                appConfigLoader.$log.debug(angular.toJson({
                    activity: "navConfigLoaderService.Service#constructor: Using page id as page title",
                    pageTitle: this._currentPageId
                }, true));
                this._pageTitle = this._currentPageId;
            }
            let svc = this;
            appConfigLoader.$log.debug("navConfigLoaderService.Service#constructor: Loading navigation configuration");
            this._loadTopNavItems = appConfigLoader.loadNavigationSettings().then((navConfig) => {
                appConfigLoader.$log.debug(angular.toJson({
                    activity: "navConfigLoaderService.Service#loadTopNavItems=>then invoked",
                    navConfig: navConfig
                }, true));
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
                                appConfigLoader.$log.debug("navConfigLoaderService.Service#loadTopNavItems=>then: Accepting navigation configuration items");
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
            this._loadCurrentItem = this._loadTopNavItems.then((items) => {
                appConfigLoader.$log.debug("navConfigLoaderService.Service#loadCurrentItem=>then Invoked");
                return NavigationItem.findCurrentItem(items);
            });
            this._loadPageTitle = this._loadCurrentItem.then((item) => {
                appConfigLoader.$log.debug(angular.toJson({
                    activity: "navConfigLoaderService.Service#loadPageTitle=>then invoked",
                    item: item
                }, true));
                if (sys.notNil(item) && item.pageTitle.length > 0) {
                    appConfigLoader.$log.debug(angular.toJson({
                        activity: "navConfigLoaderService.Service#loadPageTitle=>then: Setting page title",
                        pageTitle: item.pageTitle
                    }, true));
                    this._pageTitle = item.pageTitle;
                }
                else if (this._pageTitle.trim() === titleElement.text().trim()) {
                    appConfigLoader.$log.debug(angular.toJson({
                        activity: "navConfigLoaderService.Service#loadPageTitle=>then: Returning current page title",
                        pageTitle: this._pageTitle
                    }, true));
                    return this._pageTitle;
                }
                appConfigLoader.$log.debug(angular.toJson({
                    activity: "navConfigLoaderService.Service#loadPageTitle=>then: Setting page title element text and returning current page title",
                    pageTitle: this._pageTitle
                }, true));
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
            appConfigLoader.$log.debug(angular.toJson({
                activity: "appModalPopupService.Service#constructor invoked",
                appConfigLoader: sys.getClassName(appConfigLoader),
                $window: sys.getClassName($window),
                $document: sys.getClassName($document),
                $q: sys.getClassName($q),
                additionalArguments: sys.skipFirst(sys.asArray(arguments), 4)
            }, true));
            this[Symbol.toStringTag] = appModalPopupService.SERVICE_NAME;
            let svc = this;
            this._scope = { buttons: [], class: [], closePopupDialog: (event) => { svc.closePopupDialog(); }, message: "", title: "" };
        }
        showPopupDialog(message, arg1, arg2, arg3, arg4, thisObj) {
            this.appConfigLoader.$log.debug(angular.toJson({
                activity: "appModalPopupService.Service#showPopupDialog invoked",
                arguments: sys.asArray(arguments)
            }, true));
            let title;
            let buttons;
            if (this._isVisible) {
                this.appConfigLoader.$log.debug("appModalPopupService.Service#showPopupDialog: closing popup dialog");
                this.closePopupDialog();
            }
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
            this.appConfigLoader.$log.debug(angular.toJson({
                activity: "appModalPopupService.Service#showPopupDialog: Showing popup dialog",
                isVisible: this._isVisible,
                type: this._type,
                class: this._scope.class,
                title: this._scope.title,
                message: this._scope.message,
                hasThis: this._hasThis,
                thisObj: sys.getClassName(this._thisObj),
                onClose: typeof this._onClose,
                closePopupDialog: typeof this._scope.closePopupDialog,
                buttons: this._scope.buttons
            }, true));
            $(appModalPopupService.JQUERY_SELECTOR_DIALOG).modal('show');
        }
        _closePopupDialog(value) {
            this.appConfigLoader.$log.debug(angular.toJson({
                activity: "appModalPopupService.Service#_closePopupDialog invoked",
                isVisible: this._isVisible,
                type: this._type,
                class: this._scope.class,
                title: this._scope.title,
                message: this._scope.message,
                hasThis: this._hasThis,
                thisObj: sys.getClassName(this._thisObj),
                onClose: typeof this._onClose,
                closePopupDialog: typeof this._scope.closePopupDialog,
                buttons: this._scope.buttons
            }, true));
            $(appModalPopupService.JQUERY_SELECTOR_DIALOG).modal('hide');
            if (typeof this._onClose !== "function") {
                this.appConfigLoader.$log.debug("appModalPopupService.Service#_closePopupDialog: No callback method");
                return;
            }
            if (arguments.length == 0) {
                if (this._hasThis) {
                    this.appConfigLoader.$log.debug(angular.toJson({
                        activity: "appModalPopupService.Service#_closePopupDialog: Invoking callback",
                        thisObj: sys.getClassName(this._thisObj),
                        arguments: []
                    }, true));
                    this._onClose.call(this._thisObj);
                }
                else {
                    this.appConfigLoader.$log.debug(angular.toJson({
                        activity: "appModalPopupService.Service#_closePopupDialog: Invoking callback",
                        arguments: []
                    }, true));
                    this._onClose();
                }
            }
            else if (this._hasThis) {
                this.appConfigLoader.$log.debug(angular.toJson({
                    activity: "appModalPopupService.Service#_closePopupDialog: Invoking callback",
                    thisObj: sys.getClassName(this._thisObj),
                    arguments: [value]
                }, true));
                this._onClose.call(this._thisObj, value);
            }
            else {
                this.appConfigLoader.$log.debug(angular.toJson({
                    activity: "appModalPopupService.Service#_closePopupDialog: Invoking callback",
                    arguments: [value]
                }, true));
                this._onClose(value);
            }
            this.appConfigLoader.$log.debug("appModalPopupService.Service#_closePopupDialog: Callback invoked");
        }
        closePopupDialog(value) {
            this.appConfigLoader.$log.debug("appModalPopupService.Service#closePopupDialog invoked");
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
            else
                this.appConfigLoader.$log.debug("appModalPopupService.Service#closePopupDialog: Popup dialog already closed");
        }
        static getDirectiveInjectable() {
            window.console.debug("Returning directive " + appModalPopupService.DIRECTIVE_NAME);
            return [appModalPopupService.SERVICE_NAME, (appModalPopup) => ({
                    restrict: "E",
                    link: (scope, element, attrs) => {
                        appModalPopup.appConfigLoader.$log.debug(angular.toJson({
                            activity: "appModalPopupService." + appModalPopupService.DIRECTIVE_NAME + "#link invoked",
                            arguments: sys.asArray(arguments),
                            serviceScope: appModalPopup._scope
                        }, true));
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
    app.appModule = angular.module("app", []);
    window.console.debug("Creating service " + persistentStorageLoaderService.SERVICE_NAME);
    app.appModule.service(persistentStorageLoaderService.SERVICE_NAME, persistentStorageLoaderService.getServiceInjectable());
    window.console.debug("Creating service " + appConfigLoaderService.SERVICE_NAME);
    app.appModule.service(appConfigLoaderService.SERVICE_NAME, appConfigLoaderService.getServiceInjectable());
    window.console.debug("Creating service " + navConfigLoaderService.SERVICE_NAME);
    app.appModule.service(navConfigLoaderService.SERVICE_NAME, navConfigLoaderService.getServiceInjectable());
    window.console.debug("Creating service " + appModalPopupService.SERVICE_NAME);
    app.appModule.service(appModalPopupService.SERVICE_NAME, appModalPopupService.getServiceInjectable());
    window.console.debug("Creating directive " + appModalPopupService.DIRECTIVE_NAME);
    app.appModule.directive(appModalPopupService.DIRECTIVE_NAME, appModalPopupService.Service.getDirectiveInjectable());
    // #region Constants
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
    })(cssValidationClass = app.cssValidationClass || (app.cssValidationClass = {}));
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
    })(cssFeedbackClass = app.cssFeedbackClass || (app.cssFeedbackClass = {}));
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
    })(cssAlertClass = app.cssAlertClass || (app.cssAlertClass = {}));
    // #endregion
    //// #region persistentStorageLegacy Service.
    ///**
    // * Defines the service name as "persistentStorageLegacyService".
    // * @export
    // * @constant {string}
    // */
    //export const SERVICE_NAME_persistentStorageLegacy: string = "persistentStorageLegacy";
    ///**
    // * The session storage key used by the {@link Service} for storing URL configuration information.
    // * @export
    // * @constant {string}
    // */
    //export const STORAGEKEY_URL_CONFIG_SETTINGS: string = "UrlConfig";
    //class SessionStorageEntryEnumerator implements IterableIterator<[string, string]> {
    //    private _index: number = 0;
    //    constructor(private _window: ng.IWindowService, private _keys: string[]) { }
    //    [Symbol.iterator](): IterableIterator<[string, string]> { return this; }
    //    next(): IteratorResult<[string, string]> {
    //        if (this._window.persistentStorageLegacy.length !== this._keys.length)
    //            this._index = this._keys.length;
    //        else if (this._index < this._keys.length) {
    //            try {
    //                let key: string = this._keys[this._index];
    //                let value: string = this._window.persistentStorageLegacy.getItem(key);
    //                if (sys.notNil(value))
    //                    return { done: false, value: [key, value] };
    //                this._index = this._keys.length;
    //            } catch { this._index = this._keys.length; }
    //        }
    //        return { done: true, value: undefined };
    //    }
    //}
    //class SessionStorageValueEnumerator implements IterableIterator<string> {
    //    private _index: number = 0;
    //    constructor(private _window: ng.IWindowService, private _keys: string[]) { }
    //    [Symbol.iterator](): IterableIterator<string> { return this; }
    //    next(): IteratorResult<string> {
    //        if (this._window.persistentStorageLegacy.length !== this._keys.length)
    //            this._index = this._keys.length;
    //        else if (this._index < this._keys.length) {
    //            try {
    //                let value: string = this._window.persistentStorageLegacy.getItem(this._keys[this._index]);
    //                if (sys.notNil(value))
    //                    return { done: false, value: value };
    //                this._index = this._keys.length;
    //            } catch { this._index = this._keys.length; }
    //        }
    //        return { done: true, value: undefined };
    //    }
    //}
    ///**
    // * Implements the persistentStorageLegacy service.
    // * @export
    // * @class Service
    // * @implements {Map<string, string>}
    // */
    //export class persistentStorageLegacyService implements Map<string, string> {
    //    private _allKeys: string[];
    //    private _parsedKeys: string[];
    //    private _parsedObjects: (any | null | undefined)[];
    //    [Symbol.toStringTag]: string;
    //    /**
    //     * The number of settings values being stored.
    //     * @readonly
    //     * @type {number}
    //     * @memberof Service
    //     */
    //    get size(): number { return this.$window.sessionStorage.length; }
    //    constructor(private $window: ng.IWindowService) {
    //        this[Symbol.toStringTag] = SERVICE_NAME_persistentStorageLegacy;
    //        this.check(true);
    //    }
    //    private check(forceRefresh: boolean = false) {
    //        if (!forceRefresh && this.$window.sessionStorage.length == this._allKeys.length)
    //            return;
    //        this._allKeys = [];
    //        this._parsedKeys = [];
    //        this._parsedObjects = [];
    //        for (let i: number = 0; i < this.$window.sessionStorage.length; i++)
    //            this._allKeys.push(this.$window.sessionStorage.key(i));
    //    }
    //    clear(): void {
    //        this.$window.sessionStorage.clear();
    //        this._allKeys = [];
    //        this._parsedKeys = [];
    //        this._parsedObjects = [];
    //    }
    //    delete(key: string): boolean {
    //        this.check();
    //        this.$window.sessionStorage.removeItem(key);
    //        let i: number = this._parsedKeys.indexOf(key);
    //        if (i < 0)
    //            return false;
    //        if (i == 0) {
    //            this._parsedKeys.shift();
    //            this._parsedObjects.shift();
    //        } else if (i == (this._parsedKeys.length - 1)) {
    //            this._parsedKeys.pop();
    //            this._parsedObjects.pop();
    //        } else {
    //            this._parsedKeys.splice(i, 1);
    //            this._parsedObjects.splice(i, 1);
    //        }
    //    }
    //    entries(): IterableIterator<[string, string]> { return new SessionStorageEntryEnumerator(this.$window, this._allKeys); }
    //    [Symbol.iterator](): IterableIterator<[string, string]> { return this.entries(); }
    //    forEach(callbackfn: (value: string, key: string, map: persistentStorageLegacyService) => void, thisArg?: any): void {
    //        this.check();
    //        if (typeof (thisArg) === "undefined")
    //            this._allKeys.forEach((key: string, index: number) => {
    //                if (index < this._allKeys.length && this._allKeys[index] === key) {
    //                    let value: string | undefined;
    //                    try { value = this.$window.sessionStorage.getItem(key); } catch { /* okay to ignore */ }
    //                    if (sys.notNil(value))
    //                        callbackfn(value, key, this);
    //                }
    //            }, this);
    //        else
    //            this._allKeys.forEach((key: string, index: number) => {
    //                if (index < this._allKeys.length && this._allKeys[index] === key) {
    //                    let value: string | undefined;
    //                    try { value = this.$window.sessionStorage.getItem(key); } catch { /* okay to ignore */ }
    //                    if (sys.notNil(value))
    //                        callbackfn.call(thisArg, value, key, this);
    //                }
    //            }, this);
    //    }
    //    get(key: string): string | null {
    //        this.check();
    //        try {
    //            if (this._allKeys.indexOf(key) > -1)
    //                return this.$window.sessionStorage.getItem(key);
    //        } catch { /* okay to ignore */ }
    //        return null;
    //    }
    //    getKeys(): string[] {
    //        this.check();
    //        return Array.from(this._allKeys);
    //    }
    //    getObject<T>(key: string): T | undefined {
    //        this.check();
    //        let i: number = this._parsedKeys.indexOf(key);
    //        if (i > -1)
    //            return <T>this._parsedObjects[i];
    //        try {
    //            let json: string = this.$window.sessionStorage.getItem(key);
    //            if (!sys.isNilOrEmpty(json)) {
    //                let result: T | undefined;
    //                if (json !== "undefined")
    //                    result = <T>(ng.fromJson(json));
    //                this._parsedKeys.push(key);
    //                this._parsedObjects.push(result);
    //                return result;
    //            }
    //        } catch { }
    //    }
    //    has(key: string): boolean {
    //        this.check();
    //        return this._allKeys.indexOf(key) > -1;
    //    }
    //    keys(): IterableIterator<string> {
    //        this.check();
    //        return Array.from(this._allKeys).values();
    //    }
    //    set(key: string, value: string): any | undefined {
    //        try {
    //            if (sys.isNil(value))
    //                this.$window.sessionStorage.removeItem(key);
    //            else
    //                this.$window.sessionStorage.setItem(key, value);
    //            let i: number = this._parsedKeys.indexOf(key);
    //            if (i == 0) {
    //                this._parsedKeys.shift();
    //                this._parsedObjects.shift();
    //            } else if (i == (this._parsedKeys.length - 1)) {
    //                this._parsedKeys.pop();
    //                this._parsedObjects.pop();
    //            } else if (i < this._parsedKeys.length) {
    //                this._parsedKeys.splice(i, 1);
    //                this._parsedObjects.splice(i, 1);
    //            }
    //        } catch (e) { return e; }
    //    }
    //    setObject<T>(key: string, value: T | undefined): any | undefined {
    //        try {
    //            if (typeof (value) === "undefined")
    //                this.$window.sessionStorage.setItem(key, "undefined");
    //            else
    //                this.$window.sessionStorage.setItem(key, angular.toJson(value, false));
    //            let i: number = this._parsedKeys.indexOf(key);
    //            if (i < 0) {
    //                this._parsedKeys.push(key);
    //                this._parsedObjects.push(value);
    //            } else
    //                this._parsedObjects[i] = value;
    //        } catch (e) { return e; }
    //    }
    //    values(): IterableIterator<string> { return new SessionStorageValueEnumerator(this.$window, this._allKeys); }
    //}
    //appModule.service(SERVICE_NAME_persistentStorageLegacy, ["$window", persistentStorageLegacyService]);
    //// #endregion
    //// #region appConfigData Service
    ///**
    //* Defines the service name as "appConfigData".
    //* @export
    //* @constant {string}
    //*/
    //export const SERVICE_NAME_appConfigData: string = "appConfigData";
    ///**
    //* The relative path of the default page.
    //* @export
    //* @constant {string}
    //* @description - This is for a path string only - This MUST NOT contain relative segment names ("." or ".."), URL query or fragment and MUST NOT start or end with "/".
    //*/
    //export const DEFAULT_PAGE_PATH: string = "index.html";
    ///**
    //* The default root absolute URL of the target ServiceNow instance.
    //* @export
    //* @constant {string}
    //* @description - This MUST be an absolute URL and MUST NOT contain an explicit path (cannot end with "/"), URL query or fragment.
    //*/
    //export const DEFAULT_URL_SERVICENOW: string = "https://inscomscd.service-now.com";
    ///**
    //* The default root absolute URL of the remote GIT repository service.
    //* @export
    //* @constant {string}
    //* @description - This MUST be an absolute URL and MUST NOT contain a URL query or fragment. If this contains an explicit path (which is usually the case), the path must end with a "/".
    //*/
    //export const DEFAULT_URL_GIT_SERVICE: string = "https://github.com/erwinel/";
    ///**
    //* The default root absolute URL of the SAML identity provider to be used by ServiceNow.
    //* @export
    //* @constant {string}
    //* @description - This MUST be an absolute URL and MUST NOT contain an explicit path (cannot end with "/"), URL query or fragment.
    //*/
    //export const DEFAULT_URL_IDP: string = "https://myidp.com";
    ///**
    //* Contains service URL definitions.
    //* @export
    //* @interface IUrlConfigSettings
    //*/
    //export interface IUrlConfigSettings {
    //    /**
    //    * The base URL for the target ServiceNow instance.
    //    * @type {string}
    //    * @memberof IUrlConfigSettings
    //    */
    //    serviceNowUrl: string;
    //    /**
    //    * The base URL for the target remote GIT repository service.
    //    * @type {string}
    //    * @memberof IUrlConfigSettings
    //    */
    //    gitServiceUrl: string;
    //    /**
    //    * The base URL for the SAML identity provider to be used by ServiceNow.
    //    * @type {string}
    //    * @memberof IUrlConfigSettings
    //    */
    //    idpUrl: string;
    //}
    ///**
    //* Defines the URL setting names supported by the appConfigData service.
    //* @export
    //* @typedef {('sn' | 'git' | 'idp')} UrlSettingsNames
    //*/
    //export type UrlSettingsNames = 'sn' | 'git' | 'idp';
    ///**
    //* Defines a navigation menu item.
    //* @interface INavigationDefinition
    //*/
    //interface INavigationDefinition {
    //    /**
    //    * Unique identifier of navigation menu item.
    //    *
    //    * @type {string}
    //    * @memberof INavigationDefinition
    //    */
    //    id?: string;
    //    /**
    //    * Relative target URL of navigation menu item.
    //    *
    //    * @type {string}
    //    * @memberof INavigationDefinition
    //    */
    //    url: string;
    //    /**
    //    * Display text for navigation menu item.
    //    *
    //    * @type {string}
    //    * @memberof INavigationDefinition
    //    */
    //    linkTitle: string;
    //    /**
    //    * Page title for navigation menu item.
    //    *
    //    * @type {string}
    //    * @memberof INavigationDefinition
    //    */
    //    pageTitle?: string;
    //    /**
    //    * Tooltip to use for navigation menu item.
    //    *
    //    * @type {string}
    //    * @memberof INavigationDefinition
    //    */
    //    toolTip?: string;
    //    /**
    //    * Heading text for child menu items that are displayed in the secondary navigation menu.
    //    *
    //    * @type {string}
    //    * @memberof INavigationDefinition
    //    */
    //    sideNavHeading?: string;
    //    /**
    //    * Child navigation menu items for the current navigation item, which gets displayed in the secondary navigation menu.
    //    *
    //    * @type {INavigationDefinition[]}
    //    * @memberof INavigationDefinition
    //    */
    //    items?: INavigationDefinition[];
    //}
    ///**
    //* Represents the {@link IAppConfigJSON#navigation} property in the appConfigData.json file.
    //* @interface INavigationJSON
    //*/
    //interface INavigationJSON {
    //    /**
    //    * CSS class names to be applied to any of the ancestor navigation menu items of the item that corresponds to the current page.
    //    *
    //    * @type {string[]}
    //    * @memberof INavigationJSON
    //    */
    //    currentItemClass: string[];
    //    /**
    //    * CSS class names to be applied to the navigation menu item that corresponds to the current page.
    //    *
    //    * @type {string[]}
    //    * @memberof INavigationJSON
    //    */
    //    selectedItemClass: string[];
    //    /**
    //    * CSS class names to be applied to the navigation menu items that do no correspond to the current page or any of its ancestor items.
    //    *
    //    * @type {string[]}
    //    * @memberof INavigationJSON
    //    */
    //    otherItemClass: string[];
    //    /**
    //    * Top-leve navigation menu items.
    //    *
    //    * @type {INavigationDefinition[]}
    //    * @memberof INavigationDefinition
    //    */
    //    items: INavigationDefinition[];
    //}
    ///**
    //* Represents the contents of the appConfigData.json file.
    //*
    //* @interface IAppConfigJSON
    //* @description The file represented by this interface is asynchronously loaded by the appConfigData service.
    //*/
    //interface IAppConfigJSON extends IUrlConfigSettings {
    //    /**
    //        * Navigation menu settings.
    //        *
    //        * @type {INavigationJSON}
    //        * @memberof IAppConfigJSON
    //        */
    //    navigation: INavigationJSON;
    //}
    ///**
    //* Represents a menu navigation item.
    //*
    //* @export
    //* @class NavigationItem
    //*/
    //export class NavigationItem {
    //    private _id: string;
    //    private _linkTitle: string;
    //    private _pageTitle: string;
    //    private _toolTip: string;
    //    private _sideNavHeading: string;
    //    private _url: string;
    //    private _isCurrentPage?: boolean;
    //    private _previousNavItem: NavigationItem | undefined;
    //    private _nextNavItem: NavigationItem | undefined;
    //    private _parentNavItem: NavigationItem | undefined;
    //    private _childNavItems: ReadonlyArray<NavigationItem>;
    //    /**
    //    * The unique identifier of the navigation menu item.
    //    *
    //    * @readonly
    //    * @type {string}
    //    * @memberof NavigationItem
    //    */
    //    get id(): string { return this._id; }
    //    /**
    //    * The display text for the current navigation menu item.
    //    *
    //    * @readonly
    //    * @type {string}
    //    * @memberof NavigationItem
    //    */
    //    get linkTitle(): string { return this._linkTitle; }
    //    /**
    //    * The title of the page that corresponds to the current navigation menu item.
    //    *
    //    * @readonly
    //    * @type {string}
    //    * @memberof NavigationItem
    //    */
    //    get pageTitle(): string { return this._pageTitle; }
    //    /**
    //    * The tooltip for the current navigation menu item.
    //    *
    //    * @readonly
    //    * @type {string}
    //    * @memberof NavigationItem
    //    */
    //    get toolTip(): string { return this._toolTip; }
    //    /**
    //    * The secondary navigation heading text for child navigation menu items.
    //    *
    //    * @readonly
    //    * @type {string}
    //    * @memberof NavigationItem
    //    */
    //    get sideNavHeading(): string { return this._sideNavHeading; }
    //    /**
    //    * The navigation menu hyperlink for the current item.
    //    *
    //    * @readonly
    //    * @type {string}
    //    * @memberof NavigationItem
    //    */
    //    get navMenuHref(): string { return (this.hasOrIsCurrentPage) ? "#" : this._url; }
    //    /**
    //    * The relative URL of the current navigation menu item.
    //    *
    //    * @readonly
    //    * @type {string}
    //    * @memberof NavigationItem
    //    */
    //    get url(): string { return this._url; }
    //    /**
    //    * Indicates whether the current navigation menu item represents the current page.
    //    *
    //    * @readonly
    //    * @type {boolean}
    //    * @memberof NavigationItem
    //    */
    //    get isCurrentPage(): boolean { return this._isCurrentPage === true; }
    //    /**
    //    * Indicates whether the current navigation menu item represents the current page or the parent of the current page.
    //    *
    //    * @readonly
    //    * @type {boolean}
    //    * @memberof NavigationItem
    //    */
    //    get hasOrIsCurrentPage(): boolean { return typeof this._isCurrentPage === "boolean"; }
    //    /**
    //    * Indicates whether the current navigation menu item represents an ancestor of the current page.
    //    *
    //    * @readonly
    //    * @type {boolean}
    //    * @memberof NavigationItem
    //    */
    //    get hasCurrentPage(): boolean { return this._isCurrentPage === false; }
    //    /**
    //    * The CSS class names to be applied to the anchor tag.
    //    *
    //    * @readonly
    //    * @type {ReadonlyArray<string>}
    //    * @memberof NavigationItem
    //    */
    //    get anchorCssClass(): ReadonlyArray<string> { return (this.isCurrentPage) ? this._appConfigData.currentItemClass() : ((this.hasOrIsCurrentPage) ? this._appConfigData.selectedItemClass() : this._appConfigData.otherItemClass()); }
    //    /**
    //    * The child navigation menu items to display within the secondary navigation menu.
    //    *
    //    * @readonly
    //    * @type {ReadonlyArray<NavigationItem>}
    //    * @memberof NavigationItem
    //    */
    //    get childNavItems(): ReadonlyArray<NavigationItem> { return this._childNavItems; }
    //    /**
    //    * Indicates whether the current navigation menu item has child menu items.
    //    *
    //    * @readonly
    //    * @type {boolean}
    //    * @memberof NavigationItem
    //    */
    //    get hasChildNavItem(): boolean { return this._childNavItems.length > 0; }
    //    /**
    //    * Indicates whether the current navigation menu item has sibling items that share the same parent menu item.
    //    *
    //    * @readonly
    //    * @type {boolean}
    //    * @memberof NavigationItem
    //    */
    //    get hasSiblingNavItem(): boolean { return sys.notNil(this._previousNavItem) || sys.notNil(this._nextNavItem); }
    //    /**
    //    * Indicates whether the current navigation menu item is a child item of another.
    //    *
    //    * @readonly
    //    * @type {boolean}
    //    * @memberof NavigationItem
    //    */
    //    get isNestedNavItem(): boolean { return sys.notNil(this._parentNavItem) }
    //    /**
    //    * Navigation menu items to be displayed as nested items within the secondary navigation menu.
    //    *
    //    * @readonly
    //    * @type {ReadonlyArray<NavigationItem>}
    //    * @memberof NavigationItem
    //    */
    //    get nestedSideNavChildItems(): ReadonlyArray<NavigationItem> { return (this.showNestedSideNavChildItems) ? this._childNavItems : []; }
    //    /**
    //    * Indicates whether the current navigation menu item represents the current page, is being displayed within the secondary navigation menu, and has child items.
    //    *
    //    * @readonly
    //    * @type {boolean}
    //    * @memberof NavigationItem
    //    */
    //    get showNestedSideNavChildItems(): boolean { return this.isCurrentPage && this.isNestedNavItem && this.hasChildNavItem && !this.hasSiblingNavItem; }
    //    /**
    //    * Gets the parent navigation menu item.
    //    *
    //    * @readonly
    //    * @type {(NavigationItem | undefined)}
    //    * @memberof NavigationItem
    //    */
    //    get parentNavItem(): NavigationItem | undefined { return this._parentNavItem; }
    //    /**
    //    * Creates an instance of NavigationItem.
    //    *
    //    * @param {appConfigDataService} _appConfigData - The appConfigData service provider.
    //    * @param {INavigationDefinition} navDef - The navigation menu item definition.
    //    * @memberof NavigationItem
    //    */
    //    constructor(private _appConfigData: appConfigDataService, navDef: INavigationDefinition) {
    //        this._url = navDef.url;
    //        this._sideNavHeading = (typeof navDef.sideNavHeading === "string") ? navDef.sideNavHeading.trim() : "";
    //        this._linkTitle = (typeof navDef.linkTitle === "string" && navDef.linkTitle.length > 0) ? navDef.linkTitle : navDef.url;
    //        this._pageTitle = (typeof navDef.pageTitle === "string") ? navDef.pageTitle.trim() : "";
    //        this._toolTip = (typeof navDef.toolTip === "string") ? navDef.toolTip.trim() : ((this._pageTitle != this._linkTitle) ? this._pageTitle : "");
    //        if (typeof navDef.id !== "string" || (this._id = navDef.id).length === 0)
    //            this._id = appConfigDataService.toPageId(this._url);
    //        if (this._id === _appConfigData.currentPageId())
    //            this._isCurrentPage = true;
    //        this._childNavItems = NavigationItem.createNavItems(_appConfigData, navDef.items);
    //        this._childNavItems.forEach((item: NavigationItem) => { item._parentNavItem = this; }, this);
    //        if (this.isCurrentPage)
    //            this.getAncestorNavItems().forEach((item: NavigationItem) => { item._isCurrentPage = false; });
    //    }
    //    /**
    //    * Gets preceding sibling items for the current menu navigation item.
    //    *
    //    * @returns {NavigationItem[]}
    //    * @memberof NavigationItem
    //    */
    //    precedingSiblings(): NavigationItem[] {
    //        if (typeof this._previousNavItem === "undefined")
    //            return [];
    //        let result: NavigationItem[] = this._previousNavItem.precedingSiblings();
    //        result.push(this._previousNavItem);
    //        return result;
    //    }
    //    /**
    //    * Gets following sibling items for the current menu navigation item.
    //    *
    //    * @returns {NavigationItem[]}
    //    * @memberof NavigationItem
    //    */
    //    followingSiblings(): NavigationItem[] {
    //        let result: NavigationItem[] = [];
    //        for (let i: NavigationItem = this._nextNavItem; typeof i !== "undefined"; i = i._nextNavItem)
    //            result.push(i);
    //        return result;
    //    }
    //    /**
    //    * Gets all ancestor navigation menu items.
    //    *
    //    * @returns {NavigationItem[]}
    //    * @memberof NavigationItem
    //    */
    //    getAncestorNavItems(): NavigationItem[] {
    //        let result: NavigationItem[] = [];
    //        for (let i: NavigationItem = this._parentNavItem; typeof i !== "undefined"; i = i._parentNavItem)
    //            result.unshift(i);
    //        return result;
    //    }
    //    /**
    //    * Gets ancestor navigation menu items that do not appear in the primary navigation menu.
    //    *
    //    * @returns {NavigationItem[]}
    //    * @memberof NavigationItem
    //    */
    //    getBreadcrumbLinks(): NavigationItem[] {
    //        let result: NavigationItem[] = [];
    //        if (sys.notNil(this._parentNavItem) && sys.notNil(this._parentNavItem._parentNavItem))
    //            for (let i: NavigationItem = this._parentNavItem; typeof i !== "undefined"; i = i._parentNavItem)
    //                result.unshift(i);
    //        return result;
    //    }
    //    /**
    //    * Handles the menu item click event.
    //    *
    //    * @param {BaseJQueryEventObject} [event]
    //    * @memberof NavigationItem
    //    * @description The purpose of this member is to prevent the default action for the navigation menu item that represents the current page.
    //    */
    //    onClick(event?: BaseJQueryEventObject): void {
    //        if (this.isCurrentPage && sys.notNil(event)) {
    //            if (!event.isDefaultPrevented)
    //                event.preventDefault();
    //            if (!event.isPropagationStopped)
    //                event.stopPropagation();
    //        }
    //    }
    //    /**
    //    * Creates a navigation menu item objects from navigation menu definition objects.
    //    *
    //    * @static
    //    * @param {appConfigDataService} appConfigData - The application configuration data service provider.
    //    * @param {INavigationDefinition[]} [items] - Defines the navigation menu items to be created.
    //    * @returns {ReadonlyArray<NavigationItem>} The navigation menu item objects.
    //    * @memberof NavigationItem
    //    */
    //    static createNavItems(appConfigData: appConfigDataService, items?: INavigationDefinition[]): ReadonlyArray<NavigationItem> {
    //        if (typeof items !== "object" || items === null)
    //            return [];
    //        let result: NavigationItem[] = items.filter((value: INavigationDefinition) => typeof value === "object" && value !== null).map((value: INavigationDefinition) => new NavigationItem(appConfigData, value));
    //        if (result.length > 0) {
    //            let previous: NavigationItem = result[0];
    //            for (let i: number = 1; i < result.length; i++)
    //                previous = (result[0]._previousNavItem = previous)._nextNavItem = result[0];
    //        }
    //        return result;
    //    }
    //    /**
    //    * Finds the navigation menu item that represents the current page.
    //    *
    //    * @static
    //    * @param {ReadonlyArray<NavigationItem>} items - Navigation menu items to recursively search.
    //    * @returns {(NavigationItem | undefined)} The navigation menu item that represents the current page or undefined if none are found that represent the current page.
    //    * @memberof NavigationItem
    //    */
    //    static findCurrentItem(items: ReadonlyArray<NavigationItem>): NavigationItem | undefined {
    //        if (items.length == 0)
    //            return undefined;
    //        if (items.length == 1)
    //            return (items[0].isCurrentPage) ? items[0] : this.findCurrentItem(items[0]._childNavItems);
    //        for (let i: number = 0; i < items.length; i++) {
    //            if (items[i].hasOrIsCurrentPage)
    //                return (items[i].isCurrentPage) ? items[i] : this.findCurrentItem(items[i]._childNavItems);
    //        }
    //    }
    //    /**
    //    * Creates an array of ancestor navigation menu items to be displayed as breadcrumb links.
    //    *
    //    * @static
    //    * @param {NavigationItem} [current] - The navigation menu item that represents the current page.
    //    * @returns {ReadonlyArray<NavigationItem>}
    //    * @memberof NavigationItem
    //    */
    //    static createSideNavBreadcrumbItems(current?: NavigationItem): ReadonlyArray<NavigationItem> {
    //        if (typeof current === "undefined" || typeof current._parentNavItem === "undefined")
    //            return [];
    //        let result: NavigationItem[] = [];
    //        while (typeof (current = current._parentNavItem)._parentNavItem !== "undefined")
    //            result.unshift(current);
    //        return result;
    //    }
    //    /**
    //    * Creates an array of sibling navigation menu items.
    //    *
    //    * @static
    //    * @param {NavigationItem} [current] - The navigation menu item that represents the current page.
    //    * @returns {ReadonlyArray<NavigationItem>}
    //    * @memberof NavigationItem
    //    */
    //    static createSideNavSiblingItems(current?: NavigationItem): ReadonlyArray<NavigationItem> {
    //        if (typeof current === "undefined" || typeof current._parentNavItem === "undefined")
    //            return [];
    //        let result: NavigationItem[] = [current];
    //        if (typeof current._previousNavItem === "undefined") {
    //            if (typeof current._nextNavItem === "undefined")
    //                return [];
    //        } else
    //            for (let item: NavigationItem | undefined = current._previousNavItem; typeof item != "undefined"; item = item._previousNavItem)
    //                result.unshift(item);
    //        for (let item: NavigationItem | undefined = current._nextNavItem; typeof item != "undefined"; item = item._nextNavItem)
    //            result.push(item);
    //        return result;
    //    }
    //}
    ///**
    //* Severity of message for the modal dialog.
    //* @typedef {('info' | 'warning' | 'danger' | 'primary' | 'success')} DialogMessageType
    //*/
    //export type DialogMessageType = 'info' | 'warning' | 'danger' | 'primary' | 'success';export type DialogMessageType = 'info' | 'warning' | 'danger' | 'primary' | 'success';
    //* Defines a button to be displayed in a modal popup dialog.
    //*
    //* @export
    //* @interface IPopupDialogButtonDefinition
    //* @template T The type of value returned when the associated button is clicked.
    //*/
    //export interface IPopupDialogButtonDefinition<T> {
    //    /**
    //    * Value to be returned when the associated button is clicked.
    //    *
    //    * @type {T}
    //    * @memberof IPopupDialogButtonDefinition
    //    */
    //    value: T;
    //    /**
    //    * The text to be displayed for the button.
    //    *
    //    * @type {string}
    //    * @memberof IPopupDialogButtonDefinition
    //    */
    //    displayText: string;
    //}
    ///**
    //* Callback for displaying a modal popup dialog.
    //*
    //* @export
    //* @typedef {(this: TThis, message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<TResult>[], onClose?: { (result?: TResult): void; })} ITHisPopupDialogShowCallback
    //* @template TThis - Type of object to use as the "this" object when invoking the callback.
    //* @template TResult - The type of result value to be produced by the modal dialog.
    //* @this {TThis}
    //* @param {string} message - The message text for the modal popup.
    //* @param {string} [title] - The title for the modal popup.
    //* @param {DialogMessageType} [type] - The type (severity) of the modal popup.
    //* @param {IPopupDialogButtonDefinition<TResult>[]} [buttons] - The buttons to display for the modal popup, which closes the modal dialog and defines the result value.
    //* @param {{ (result?: TResult): void; }} [onClose] - The callback to invoke when the modal popup dialog is closed.
    //*/
    //export interface ITHisPopupDialogShowCallback<TThis, TResult> {
    //    (this: TThis, message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<TResult>[], onClose?: { (result?: TResult): void; }): void;
    //}
    ///**
    //* Callback for displaying a modal popup dialog.
    //* @export
    //* @typedef {{ (message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<T>[], onClose?: { (result?: T): void; }): void; }} IPopupDialogShowCallback
    //* @template T - The type of result value to be produced by the modal dialog.
    //* @param {string} message - The message text for the modal popup.
    //* @param {string} [title] - The title for the modal popup.
    //* @param {DialogMessageType} [type] - The type (severity) of the modal popup.
    //* @param {IPopupDialogButtonDefinition<T>[]} [buttons] - The buttons to display for the modal popup, which closes the modal dialog and defines the result value.
    //* @param {{ (result?: T): void; }} [onClose] - The callback to invoke when the modal popup dialog is closed.
    //* @description - This is used within the {@link Controller} when the main modal popup dialog is displayed.
    //*/
    //export interface IPopupDialogShowCallback<T> { (message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<T>[], onClose?: { (result?: T): void; }): void; }
    ///**
    //* Callback for notifying changes to a settings value.
    //* @export
    //* @typedef {(this: TThis, newValue: TValue, oldValue: TValue)} IThisNotifyValueChange
    //* @template TValue - The type of value that was changed.
    //* @template TThis - Type of object to use as the "this" object when invoking the callback.
    //* @this {TThis}
    //* @param {TValue} newValue - The new value after the change.
    //* @param {TValue} oldValue - The previous value before the change.
    //*/
    //export interface IThisNotifyValueChange<TValue, TThis> { (this: TThis, newValue: TValue, oldValue: TValue): void; }
    ///**
    //* Callback for notifying changes to a settings value.
    //* @export
    //* @typedef {(newValue: T, oldValue: T)} INotifyValueChange
    //* @template T - The type of value that was changed.
    //* @param {T} newValue - The new value after the change.
    //* @param {T} oldValue - The previous value before the change.
    //*/
    //export interface INotifyValueChange<T> { (newValue: T, oldValue: T): void; }
    //export interface IChangeLinkParent<T> { first?: NotifyChangeLink<T>; last?: NotifyChangeLink<T>; }
    ///**
    //* Represents a registered settings value change notification.
    //* @export
    //* @class NotifyChangeLink
    //* @template T - The type of value to be notified for changes.
    //*/
    //export class NotifyChangeLink<T> {
    //    private _id: symbol = Symbol();
    //    private _previous?: NotifyChangeLink<T>;
    //    private _next?: NotifyChangeLink<T>;
    //    private _args: [INotifyValueChange<T>] | [IThisNotifyValueChange<T, any>, any];
    //    constructor(parent: IChangeLinkParent<T>, onChange: INotifyValueChange<T>);
    //    constructor(parent: IChangeLinkParent<T>, onChange: IThisNotifyValueChange<T, any>, thisObj: any);
    //    constructor(parent: IChangeLinkParent<T>, onChange: INotifyValueChange<T> | IThisNotifyValueChange<T, any>, thisObj?: any) {
    //        if (sys.isNil(parent.last))
    //            parent.first = parent.last = this;
    //        else
    //            (this._previous = parent.last)._previous = this;
    //        this._args = (arguments.length > 2) ? [onChange, thisObj] : [onChange];
    //    }
    //    static raiseChange<T>(parent: IChangeLinkParent<T>, newValue: T, oldValue: T): void {
    //        if (sys.notNil(parent.first))
    //            NotifyChangeLink.__raiseChange<T>(parent.first, newValue, oldValue);
    //    }
    //    static remove<T>(parent: IChangeLinkParent<T>, item: NotifyChangeLink<T>): boolean {
    //        if (!(typeof parent === "object" && parent !== null && sys.notNil(parent.first) && typeof item === "object" && item !== null && item instanceof NotifyChangeLink))
    //            return false;
    //        if (sys.isNil(item._next)) {
    //            if (item._id !== parent.last._id)
    //                return false;
    //            parent.last = item._previous;
    //            if (sys.isNil(parent.last))
    //                parent.first = undefined;
    //            else
    //                item._previous = parent.last._next = undefined;
    //        } else if (sys.isNil(item._previous)) {
    //            if (item._id !== parent.first._id)
    //                return false;
    //            parent.first = item._next;
    //            if (sys.isNil(parent.first))
    //                parent.last = undefined;
    //            else
    //                item._next = parent.first._previous = undefined;
    //        } else {
    //            let first: NotifyChangeLink<T> = item;
    //            do { first = first._previous; } while (sys.notNil(first._previous));
    //            if (first._id !== parent.first._id)
    //                return false;
    //            (item._next._previous = item._previous)._next = item._next;
    //            item._next = item._previous = undefined;
    //        }
    //        return true;
    //    }
    //    private static __raiseChange<T>(item: NotifyChangeLink<T>, newValue: T, oldValue: T): void {
    //        let next: NotifyChangeLink<T> | undefined = item._next;
    //        try {
    //            if (item._args.length > 1)
    //                item._args[0].call(item._args[1], newValue, oldValue);
    //            else
    //                item._args[0](newValue, oldValue);
    //        } finally {
    //            if (sys.notNil(next))
    //                NotifyChangeLink.__raiseChange<T>(next, newValue, oldValue);
    //        }
    //    }
    //}
    ///**
    //* Class which implements the appConfigData service.
    //* @export
    //* @class appConfigData
    //*/
    //export class appConfigDataService {
    //    // #region Private properties
    //    private _currentPageId: string;
    //    private _currentPageURL: URL;
    //    private _promise: ng.IPromise<void>;
    //    private _serviceNowUrl: URL = new URL(DEFAULT_URL_SERVICENOW);
    //    private _gitServiceUrl: URL = new URL(DEFAULT_URL_GIT_SERVICE);
    //    private _idpUrl: URL = new URL(DEFAULT_URL_GIT_SERVICE);
    //    private _relativePagePath: string;
    //    private _pageTitle: string;
    //    private _currentItemClass: ReadonlyArray<string> = DEFAULT_CURRENT_ITEM_CLASS;
    //    private _selectedItemClass: ReadonlyArray<string> = DEFAULT_SELECTED_ITEM_CLASS;
    //    private _otherItemClass: ReadonlyArray<string> = DEFAULT_OTHER_ITEM_CLASS;
    //    private _topNavItems: ReadonlyArray<NavigationItem> = [];
    //    private _serviceNowUrlChangeNotify: IChangeLinkParent<URL> = {};
    //    private _gitServiceUrlChangeNotify: IChangeLinkParent<URL> = {};
    //    private _idpUrlChangeNotify: IChangeLinkParent<URL> = {};
    //    private _pageTitleChangeNotify: IChangeLinkParent<string> = {};
    //    /**
    //    * @todo - Remove method when no longer used.
    //    */
    //    private _serviceNowUrlChangedCallback: { (value: URL): void; } | undefined;
    //    /**
    //    * @todo - Remove method when no longer used.
    //    */
    //    private _gitServiceUrlChangedCallback: { (value: URL): void; } | undefined;
    //    /**
    //    * @todo - Remove method when no longer used.
    //    */
    //    private _idpUrlChangedCallback: { (value: URL): void; } | undefined;
    //    /**
    //    * @todo - Remove method when no longer used.
    //    */
    //    private _pageTitleChangedCallback: { (value: string): void; } | undefined;
    //    private _showMainModalPopupDialogCallback: IPopupDialogShowCallback<any> | undefined;
    //    private _hideMainModalPopupDialogCallback: { (result?: any): void } | undefined;
    //    // #endregion
    //    [Symbol.toStringTag]: string;
    //    // #region Getter/Setter methods
    //    /**
    //    * Gets the current page ID.
    //    *
    //    * @returns {string} The value of the "content" attribute for the html meta tag with the name attribute of "app:pageId".
    //    * @memberof appConfigData
    //    */
    //    currentPageId(): string { return this._currentPageId; }
    //    /**
    //    * Gets relative path to the current page.
    //    *
    //    * @returns {string}
    //    * @memberof appConfigData
    //    */
    //    pagePath(): string { return this._relativePagePath; }
    //    /**
    //    * Gets or sets the title of the current page
    //    *
    //    * @param {string} [value] - The optional value to set for the page title.
    //    * @returns {string} The title of the current apge.
    //    * @memberof appConfigData
    //    */
    //    pageTitle(value?: string): string {
    //        let oldValue: string = this._pageTitle;
    //        if (typeof value === "string" && value.trim().length > 0 && value !== oldValue) {
    //            this._pageTitle = value;
    //            this.raiseTitleChanged(value, oldValue);
    //        }
    //        return this._pageTitle;
    //    }
    //    /**
    //    * Gets the CSS class names to apply to navigation menu items that are ancestors of the item that represents the current page.
    //    *
    //    * @returns {ReadonlyArray<string>}
    //    * @memberof appConfigData
    //    */
    //    currentItemClass(): ReadonlyArray<string> { return this._currentItemClass; }
    //    /**
    //    * Gets the CSS class names to apply to the navigation menu item that represents the current page.
    //    *
    //    * @returns {ReadonlyArray<string>}
    //    * @memberof appConfigData
    //    */
    //    selectedItemClass(): ReadonlyArray<string> { return this._selectedItemClass; }
    //    /**
    //    * Gets the CSS class names to apply to the navigation menu item that do not represent the current page or any of its ancestors.
    //    *
    //    * @returns {ReadonlyArray<string>}
    //    * @memberof appConfigData
    //    */
    //    otherItemClass(): ReadonlyArray<string> { return this._otherItemClass; }
    //    /**
    //    * Gets the navigation menu items that appear in the primary navigation menu.
    //    *
    //    * @returns {ReadonlyArray<NavigationItem>}
    //    * @memberof appConfigData
    //    */
    //    topNavItems(): ReadonlyArray<NavigationItem> { return this._topNavItems; }
    //    static validateURL(value: URL, allowPath: boolean = false): URL | string {
    //        if (!(typeof value === "object" && value !== null && value instanceof URL))
    //            return "Value is not a URL";
    //        value = new URL(value.href);
    //        if (allowPath) {
    //            if (typeof value.pathname !== "string" || value.pathname.length == 0)
    //                value.pathname = "/";
    //            else if (!value.pathname.endsWith("/"))
    //                value.pathname = value.pathname + "/";
    //        }
    //        else if (typeof value.pathname === "string" && value.pathname.length > 0) {
    //            if (value.pathname !== "/")
    //                return "Path not allowed";
    //            value.pathname = "";
    //        }
    //        if (typeof value.search === "string" && value.search.length > 0) {
    //            if (value.search !== "?")
    //                return "Query parameters not allowed";
    //            value.search = "";
    //        }
    //        if (typeof value.hash === "string" && value.hash.length > 0) {
    //            if (value.hash !== "#")
    //                return "Fragment not allowed";
    //            value.hash = "";
    //        }
    //        return value;
    //    }
    //    /**
    //    * Gets or sets the base URL for the target ServiceNow instance.
    //    *
    //    * @param {URL} [value] - Optionally specify new value for base URL of the target ServiceNow instance.
    //    * @returns {URL}
    //    * @memberof appConfigData
    //    * @description Changes in this value cause any callbacks specified through {@link appConfigData#onServiceNowUrlChanged} to be invoked.
    //    */
    //    serviceNowUrl(value?: URL): URL {
    //        if (sys.isNil(value))
    //            return this._serviceNowUrl;
    //        let validated: URL | string = appConfigDataService.validateURL(value);
    //        if (typeof validated === "string")
    //            throw new Error(validated);
    //        let oldValue: URL = this._serviceNowUrl;
    //        if (typeof oldValue !== "object" || oldValue.href !== value.href) {
    //            this._serviceNowUrl = value;
    //            this.raiseServiceNowUrlChanged(value, oldValue);
    //        }
    //        return this._serviceNowUrl;
    //    }
    //    /**
    //    * Gets or sets the base URL for the GIT repository service being used by the target ServiceNow instance.
    //    *
    //    * @param {URL} [value] - Optionally specify new value for base URL of the GIT repository service being used by the target ServiceNow instance.
    //    * @returns {URL}
    //    * @memberof appConfigData
    //    * @description Changes in this value cause any callbacks specified through {@link appConfigData#onGitRepositoryUrlChanged} to be invoked.
    //    */
    //    gitServiceUrl(value?: URL): URL {
    //        if (sys.isNil(value))
    //            return this._gitServiceUrl;
    //        let validated: URL | string = appConfigDataService.validateURL(value, true);
    //        if (typeof validated === "string")
    //            throw new Error(validated);
    //        let oldValue: URL = this._gitServiceUrl;
    //        if (typeof oldValue !== "object" || oldValue.href !== value.href) {
    //            this._gitServiceUrl = value;
    //            this.raiseGitServiceUrlChanged(value, oldValue);
    //        }
    //        return this._gitServiceUrl;
    //    }
    //    /**
    //    * Gets or sets the base URL of the Identity provider to be used by ServiceNow.
    //    *
    //    * @param {URL} [value] - Optionally specify new value for base URL of the Identity provider to be used by ServiceNow.
    //    * @returns {URL}
    //    * @memberof appConfigData
    //    * @description Changes in this value cause any callbacks specified through {@link appConfigData#onIdpUrlChanged} to be invoked.
    //    */
    //    idpUrl(value?: URL): URL {
    //        if (sys.isNil(value))
    //            return this._idpUrl;
    //        let validated: URL | string = appConfigDataService.validateURL(value);
    //        if (typeof validated === "string")
    //            throw new Error(validated);
    //        let oldValue: URL = this._idpUrl;
    //        if (typeof oldValue !== "object" || oldValue.href !== value.href) {
    //            this._idpUrl = value;
    //            this.raiseIdpUrlChanged(value, oldValue);
    //        }
    //        return this._idpUrl;
    //    }
    //    /**
    //    * Creates a URL that is relative to a configuration setting URL base value.
    //    * @param {UrlSettingsNames} setting - The name of the URL setting.
    //    * @param {string} [relativeUrl] - The relative URL string.
    //    * @param {string} [queryParameter] - The name of the query parameter to add to the result URL.
    //    * @param {string} [queryValue] - The value of the query parameter to add to the result URL.
    //    * @returns {URL} A URL that is relative to the configuration settings URL base value.
    //    * @memberof appConfigData
    //    */
    //    createUrl(setting: UrlSettingsNames, relativeUrl?: string, queryParameter?: string, queryValue?: string): URL {
    //        let url: URL;
    //        if (setting === "git")
    //            url = this._gitServiceUrl;
    //        else
    //            url = sys.makeDirectoryUrl((setting == "sn") ? this._serviceNowUrl : this._idpUrl);
    //        if (typeof relativeUrl === "string" && relativeUrl.length > 0 && relativeUrl !== ".")
    //            url = new URL(relativeUrl, url);
    //        else
    //            url = new URL(url.href);
    //        if (typeof queryParameter === "string" && queryParameter.length > 0) {
    //            if (typeof queryValue === "string") {
    //                if (url.searchParams.has(queryParameter))
    //                    url.searchParams.set(queryParameter, queryValue);
    //                else
    //                    url.searchParams.append(queryParameter, queryValue);
    //            } else {
    //                if (url.searchParams.has(queryParameter))
    //                    url.searchParams.delete(queryParameter);
    //                if (typeof url.search !== "string" || url.search.length == 0 || url.search === "?")
    //                    url.search = "?" + queryParameter;
    //                else
    //                    url.search = url.search + "&" + queryParameter;
    //            }
    //        }
    //        return url;
    //    }
    //    // #endregion
    //    /**
    //    * Creates an instance of the appConfigData service.
    //    * @param {persistentStorageLoaderService.Service} persistentStorageLoader - The persistentStorageLegacy service provider.
    //    * @param {ng.IHttpService} $http - The $http service provider.
    //    * @param {ng.ILogService} $log - The $log service provider.
    //    * @param {ng.IDocumentService} $document - The $document service provider.
    //    * @param {ng.IWindowService} $window - The $window service provider
    //    * @memberof appConfigData
    //    */
    //    constructor(private persistentStorageLoader: persistentStorageLoaderService.Service, $http: ng.IHttpService, private $log: ng.ILogService, $document: ng.IDocumentService, private $window: ng.IWindowService) {
    //        this[Symbol.toStringTag] = SERVICE_NAME_appConfigData;
    //        let headElement: JQuery = $document.find('head').first();
    //        let titleElement: JQuery = headElement.find('title');
    //        if (titleElement.length == 0) {
    //            headElement.children().append(titleElement = $('<title></title>'));
    //            this._pageTitle = "";
    //        } else
    //            this._pageTitle = titleElement.text().trim();
    //        try { this._currentPageURL = new URL($window.location.href); } catch {
    //            // Just in case
    //            this._currentPageURL = new URL("http://localhost");
    //            this._currentPageURL.pathname = DEFAULT_PAGE_PATH;
    //        }
    //        let segments: string[] = (typeof this._currentPageURL.pathname !== "string" || this._currentPageURL.pathname.length == 0 || this._currentPageURL.pathname == "/") ? [] : this._currentPageURL.pathname.split("/").filter((n: string) => n.length > 0);
    //        if (segments.length == 0)
    //            segments = DEFAULT_PAGE_PATH.split("/");
    //        else if (!(/\.html?$/i).test(segments[segments.length - 1])) {
    //            let arr: string[] = DEFAULT_PAGE_PATH.split("/");
    //            segments.push(arr[arr.length - 1]);
    //        }
    //        this._currentPageURL.pathname = "/" + (this._relativePagePath = (segments.length == 1) ? segments[0] : segments.join("/"));
    //        if ((this._currentPageId = headElement.find('meta[name="app:pageId"]').attr("content")).length == 0)
    //            this._currentPageId = appConfigDataService.toPageId(this._currentPageURL.pathname);
    //        if (this._pageTitle.length === 0)
    //            this._pageTitle = this._currentPageId;
    //        let svc: appConfigDataService = this;
    //        this._promise = $http.get("./appConfigData.json").then((result: ng.IHttpPromiseCallbackArg<IAppConfigJSON>) => {
    //            if (typeof result.data !== "object")
    //                sys.logResponse(result, $log, "Expected object response type, actual is " + (typeof result.data), true);
    //            else if (result.data == null) {
    //                if (sys.toHttpResponseStatusCode(result) === sys.HttpResponseStatusCode.noContent)
    //                    $log.warn("Response object was null.");
    //            }
    //            else {
    //                svc.applySettings(result.data);
    //                if (this._pageTitle.trim() !== titleElement.text().trim())
    //                    titleElement.text(this._pageTitle);
    //                return;
    //            }
    //            result
    //            svc.applySettings();
    //        }, (reason: any) => {
    //            $log.error("Unexpected error making application configuration data request: " + ((typeof reason === "object") ? angular.toJson(reason) : reason));
    //        });
    //    }
    //    // #region Application modal popup methods
    //    /**
    //    * Displays the main application modal dialog box.
    //    *
    //    * @template TThis - The "this" object to use for the onClose callback method.
    //    * @template TResult - The type of result value produced by the modal dialog.
    //    * @param {string} message - The message to display in the modal dialog.
    //    * @param {(string | undefined)} title - The title of the modal dialog.
    //    * @param {(DialogMessageType | undefined)} type - The message type (severity) of the modal dailog.
    //    * @param {(IPopupDialogButtonDefinition<TResult>[] | undefined)} buttons - The option buttons to display in the modal dailog.
    //    * @param {({ (this: TThis, result?: TResult): void; } | undefined)} onClose - The callback to invoke when the dialog box is closed.
    //    * @param {TThis} thisArg - The object to use as the "this" object when onClose is invoked.
    //    * @memberof appConfigData
    //    * @description This invokes the callback specified through the {@link appConfigData#onShowMainModalPopupDialog} method by the {@link Controller} during its construction.
    //    */
    //    showMainModalPopupDialog<TThis, TResult>(message: string, title: string | undefined, type: DialogMessageType | undefined, buttons: IPopupDialogButtonDefinition<TResult>[] | undefined,
    //        onClose: { (this: TThis, result?: TResult): void; } | undefined, thisArg: TThis): void;
    //    /**
    //    * Displays the main application modal dialog box
    //    *
    //    * @template T - The type of result value produced by the modal dialog.
    //    * @param {string} message - The message to display in the modal dialog.
    //    * @param {string} [title] - The title of the modal dialog.
    //    * @param {DialogMessageType} [type] - The message type (severity) of the modal dailog.
    //    * @param {IPopupDialogButtonDefinition<T>[]} [buttons] - The option buttons to display in the modal dailog.
    //    * @param {{ (result?: T): void; }} [onClose] - The callback to invoke when the dialog box is closed.
    //    * @memberof appConfigData
    //    * @description This invokes the callback specified through the {@link appConfigData#onShowMainModalPopupDialog} method by the {@link Controller} during its construction.
    //    */
    //    showMainModalPopupDialog<T>(message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<T>[], onClose?: { (result?: T): void; }): void;
    //    showMainModalPopupDialog(message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<any>[], onClose?: { (result?: any): void; }, thisArg?: any): void {
    //        let callback: IPopupDialogShowCallback<any> | undefined = this._showMainModalPopupDialogCallback;
    //        if (typeof callback === "function") {
    //            if (arguments.length > 5)
    //                callback(message, title, type, buttons, (result?: any) => callback.call(thisArg, result));
    //            else
    //                callback(message, title, type, buttons, onClose);
    //        }
    //    }
    //    /**
    //    * Specifies a callback to invoke when the main modal popup dialog is to be displayed.
    //    *
    //    * @param {ITHisPopupDialogShowCallback<TThis, TResult>} callback - The callback to invoke when the main modal popup dialog is to be displayed.
    //    * @param {TThis} thisArg - The object to use as the "this" object when the callback is invoked.
    //    * @memberof appConfigData
    //    */
    //    onShowMainModalPopupDialog<TThis, TResult>(callback: ITHisPopupDialogShowCallback<TThis, TResult>, thisArg: TThis): void;
    //    /**
    //    * Specifies a callback to invoke when the main modal popup dialog is to be displayed.
    //    *
    //    * @param {IPopupDialogShowCallback<T>} callback - The callback to invoke when the main modal popup dialog is to be displayed.
    //    * @memberof appConfigData
    //    * @description - The {@link Controller} invokes this method during its construction to specify the callback that will actually display the popup dialog.
    //    */
    //    onShowMainModalPopupDialog<T>(callback: IPopupDialogShowCallback<T>): void;
    //    onShowMainModalPopupDialog(callback: IPopupDialogShowCallback<any> | ITHisPopupDialogShowCallback<any, any>, thisArg?: any): void {
    //        if (typeof callback !== "function")
    //            return;
    //        let showMainModalPopupDialogCallback: IPopupDialogShowCallback<any> | undefined = this._showMainModalPopupDialogCallback;
    //        if (arguments.length > 1) {
    //            if (typeof showMainModalPopupDialogCallback === "function")
    //                this._showMainModalPopupDialogCallback = (message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<any>[], onClose?: { (result?: any): void; }) => {
    //                    try { showMainModalPopupDialogCallback(title, message, type, buttons, onClose); }
    //                    finally { callback.call(thisArg, message, title, type, buttons, onClose); }
    //                };
    //            else
    //                this._showMainModalPopupDialogCallback = (message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<any>[], onClose?: { (result?: any): void; }) => {
    //                    callback.call(thisArg, message, title, type, buttons, onClose);
    //                };
    //        } else if (typeof showMainModalPopupDialogCallback === "function")
    //            this._showMainModalPopupDialogCallback = (message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<any>[], onClose?: { (result?: any): void; }) => {
    //                try { showMainModalPopupDialogCallback(message, title, type, buttons, onClose); }
    //                finally { callback(message, title, type, buttons, onClose); }
    //            };
    //        else
    //            this._showMainModalPopupDialogCallback = callback;
    //    }
    //    /**
    //    * Closes the main modal popup dialog.
    //    *
    //    * @param {*} [result] - Result value to apply.
    //    * @memberof appConfigData
    //    */
    //    closeMainModalPopupDialog(result?: any): void {
    //        let callback: { (result?: any): void } | undefined = this._hideMainModalPopupDialogCallback;
    //        if (typeof callback === "function")
    //            callback(result);
    //    }
    //    /**
    //    * Specifies a callback to invoke when the main modal popup dialog is to be closed.
    //    *
    //    * @template TThis - The type of object used as the "this" object when the callback is invoked.
    //    * @template TResult - The type of result value for the modal popup dialog.
    //    * @param {{ (this: TThis, result?: TResult): void }} callback - The callback to invoke when the main modal popup dialog is to be closed.
    //    * @param {TThis} thisArg - The object to use as the "this" object when the callback is invoked.
    //    * @memberof appConfigData
    //    */
    //    onCloseMainModalPopupDialog<TThis, TResult>(callback: { (this: TThis, result?: TResult): void }, thisArg: TThis): void;
    //    /**
    //    * Specifies a callback to invoke when the main modal popup dialog is to be closed.
    //    *
    //    * @template T - The type of result value for the modal popup dialog.
    //    * @param {{ (result?: T): void }} callback - The callback to invoke when the main modal popup dialog is to be closed.
    //    * @memberof appConfigData
    //    * @description - The {@link Controller} invokes this method during its construction to specify the callback that will actually close the popup dialog.
    //    */
    //    onCloseMainModalPopupDialog<T>(callback: { (result?: T): void }): void;
    //    onCloseMainModalPopupDialog(callback: { (result?: any): void } | { (this: any, result?: any): void }, thisArg?: any): void {
    //        if (typeof callback !== "function")
    //            return;
    //        let hideMainModalPopupDialogCallback: { (result?: any): void } | undefined = this._hideMainModalPopupDialogCallback;
    //        if (arguments.length > 1) {
    //            if (typeof hideMainModalPopupDialogCallback === "function")
    //                this._hideMainModalPopupDialogCallback = (result?: any) => {
    //                    try { hideMainModalPopupDialogCallback(result); }
    //                    finally { callback.call(thisArg, result); }
    //                };
    //            else
    //                this._hideMainModalPopupDialogCallback = (result?: any) => {
    //                    callback.call(thisArg, result);
    //                };
    //        } else if (typeof hideMainModalPopupDialogCallback === "function")
    //            this._hideMainModalPopupDialogCallback = (result?: any) => {
    //                try { hideMainModalPopupDialogCallback(result); }
    //                finally { callback(result); }
    //            };
    //        else
    //            this._hideMainModalPopupDialogCallback = callback;
    //    }
    //    // #endregion
    //    // #region URL setting value change methods
    //    /**
    //    * Registers a notification callback that will be invoked when the value of {@link appConfigData#serviceNowUrl} has changed.
    //    * @param {INotifyValueChange<URL>} onChange - The callback to invoke when the value of {@link appConfigData#serviceNowUrl} has changed.
    //    * @returns {NotifyChangeLink<URL>} An object that can be used to un-register the change notification.
    //    * @memberof appConfigData
    //    */
    //    notifyServiceNowUrlChange(onChange: INotifyValueChange<URL>): NotifyChangeLink<URL>;
    //    /**
    //    * Registers a notification callback that will be invoked when the value of {@link appConfigData#serviceNowUrl} has changed.
    //    * @template T - The type of object that will be used as the "this" object when the callback is invoked.
    //    * @param {IThisNotifyValueChange<URL, T>} onChange - The callback to invoke when the value of {@link appConfigData#serviceNowUrl} has changed.
    //    * @param {T} thisObj - The object that will be the "this" object when the callback is invoked.
    //    * @returns {NotifyChangeLink<URL>} An object that can be used to un-register the change notification.
    //    * @memberof appConfigData
    //    */
    //    notifyServiceNowUrlChange<T>(onChange: IThisNotifyValueChange<URL, T>, thisObj: T): NotifyChangeLink<URL>;
    //    notifyServiceNowUrlChange(onChange: INotifyValueChange<URL> | IThisNotifyValueChange<URL, any>, thisObj?: any): NotifyChangeLink<URL> {
    //        if (arguments.length > 1)
    //            return new NotifyChangeLink<URL>(this._serviceNowUrlChangeNotify, onChange, thisObj);
    //        return new NotifyChangeLink<URL>(this._serviceNowUrlChangeNotify, onChange);
    //    }
    //    /**
    //    * Unregister a notification callback to no longer be notified of changes to {@link appConfigData#serviceNowUrl}.
    //    * @param {NotifyChangeLink<URL>} notifier - The {@see NotifyChangeLink} that represents the registered notifcation callback.
    //    * @returns {boolean} true if the notification callback was un-registered or false if the notification callback was not registered for changes to {@link appConfigData#serviceNowUrl}.
    //    * @memberof appConfigData
    //    */
    //    removeServiceNowUrlChangeNotify(notifier: NotifyChangeLink<URL>): boolean { return NotifyChangeLink.remove<URL>(this._serviceNowUrlChangeNotify, notifier); }
    //    /**
    //    * Specifies a callback to invoke when the value of {@link appConfigData#serviceNowUrl} has changed.
    //    * @deprecated - Use {@link appConfigData#notifyServiceNowUrlChange}, instead.
    //    * @todo - Remove method when no longer used.
    //    * @template T - The type of object used as the "this" object when the callback is invoked.
    //    * @param {{ (this: T, value: URL): void; }} callback - The callback to invoke when the value of {@link appConfigData#serviceNowUrl} has changed.
    //    * @param {T} thisArg - The object to use as the "this" object when the callback is invoked.
    //    * @memberof appConfigData
    //    */
    //    onServiceNowUrlChanged<T>(callback: { (this: T, value: URL): void; }, thisArg: T): void;
    //    /**
    //    * Specifies a callback to invoke when the value of {@link appConfigData#serviceNowUrl} has changed.
    //    * @deprecated - Use {@link appConfigData#notifyServiceNowUrlChange}, instead.
    //    * @todo - Remove method when no longer used.
    //    * @param {{ (value: URL): void; }} callback - The callback to invoke when the value of {@link appConfigData#serviceNowUrl} has changed.
    //    * @memberof appConfigData
    //    */
    //    onServiceNowUrlChanged(callback: { (value: URL): void; }): void;
    //    onServiceNowUrlChanged(callback: { (value: URL): void; }, thisArg?: any): void {
    //        if (typeof callback !== "function")
    //            return;
    //        let serviceNowUrlChangedCallback: { (value: URL): void; } | undefined = this._serviceNowUrlChangedCallback;
    //        if (arguments.length > 1) {
    //            if (typeof serviceNowUrlChangedCallback === "function")
    //                this._serviceNowUrlChangedCallback = (value: URL) => { try { serviceNowUrlChangedCallback(value); } finally { callback.call(thisArg, value); } };
    //            else
    //                this._serviceNowUrlChangedCallback = (value: URL) => { callback.call(thisArg, value); };
    //            callback.call(thisArg, this._serviceNowUrl);
    //            return;
    //        }
    //        if (typeof serviceNowUrlChangedCallback === "function")
    //            this._serviceNowUrlChangedCallback = (value: URL) => { try { serviceNowUrlChangedCallback(value); } finally { callback(value); } };
    //        else
    //            this._serviceNowUrlChangedCallback = callback;
    //        callback(this._serviceNowUrl);
    //    }
    //    private raiseServiceNowUrlChanged(newValue: URL, oldValue: URL): void {
    //        NotifyChangeLink.raiseChange<URL>(this._serviceNowUrlChangeNotify, newValue, oldValue);
    //        let callback: { (value: URL): void; } = this._serviceNowUrlChangedCallback;
    //        if (typeof callback === "function")
    //            callback(this._serviceNowUrl);
    //    }
    //    /**
    //    * Registers a notification callback that will be invoked when the value of {@link appConfigData#gitServiceUrl} has changed.
    //    * @param {INotifyValueChange<URL>} onChange - The callback to invoke when the value of {@link appConfigData#gitServiceUrl} has changed.
    //    * @returns {NotifyChangeLink<URL>} An object that can be used to un-register the change notification.
    //    * @memberof appConfigData
    //    */
    //    notifyGitServiceUrlChange(onChange: INotifyValueChange<URL>): NotifyChangeLink<URL>;
    //    /**
    //    * Registers a notification callback that will be invoked when the value of {@link Service#gitappConfigDataUrl} has changed.
    //    * @template T - The type of object that will be used as the "this" object when the callback is invoked.
    //    * @param {IThisNotifyValueChange<URL, T>} onChange - The callback to invoke when the value of {@link Service#gitappConfigDataUrl} has changed.
    //    * @param {T} thisObj - The object that will be the "this" object when the callback is invoked.
    //    * @returns {NotifyChangeLink<URL>} An object that can be used to un-register the change notification.
    //    * @memberof Service
    //    */
    //    notifyGitServiceUrlChange<T>(onChange: IThisNotifyValueChange<URL, T>, thisObj: T): NotifyChangeLink<URL>;
    //    notifyGitServiceUrlChange(onChange: INotifyValueChange<URL> | IThisNotifyValueChange<URL, any>, thisObj?: any): NotifyChangeLink<URL> {
    //        if (arguments.length > 1)
    //            return new NotifyChangeLink<URL>(this._gitServiceUrlChangeNotify, onChange, thisObj);
    //        return new NotifyChangeLink<URL>(this._gitServiceUrlChangeNotify, onChange);
    //    }
    //    /**
    //    * Unregister a notification callback to no longer be notified of changes to {@link appConfigData#gitServiceUrl}.
    //    * @param {NotifyChangeLink<URL>} notifier - The {@see NotifyChangeLink} that represents the registered notifcation callback.
    //    * @returns {boolean} true if the notification callback was un-registered or false if the notification callback was not registered for changes to {@link appConfigData#gitServiceUrl}.
    //    * @memberof appConfigData
    //    */
    //    removeGitServiceUrlChangeNotify(notifier: NotifyChangeLink<URL>): boolean { return NotifyChangeLink.remove<URL>(this._gitServiceUrlChangeNotify, notifier); }
    //    /**
    //    * Specifies a callback to invoke when the value of {@link appConfigData#gitRepositoryUrl} has changed.
    //    * @deprecated - Use {@link appConfigData#notifyGitServiceUrlChange}, instead.
    //    * @todo - Remove method when no longer used.
    //    * @template T - The type of object used as the "this" object when the callback is invoked.
    //    * @param {{ (this: T, value: URL): void; }} callback - The callback to invoke when the value of {@link appConfigData#gitRepositoryUrl} has changed.
    //    * @param {T} thisArg - The object to use as the "this" object when the callback is invoked.
    //    * @memberof appConfigData
    //    */
    //    onGitServiceUrlChanged<T>(callback: { (this: T, value: URL): void; }, thisArg: T): void;
    //    /**
    //    * Specifies a callback to invoke when the value of {@link appConfigData#gitRepositoryUrl} has changed.
    //    * @deprecated - Use {@link appConfigData#notifyGitServiceUrlChange}, instead.
    //    * @todo - Remove method when no longer used.
    //    * @param {{ (value: URL): void; }} callback - The callback to invoke when the value of {@link appConfigData#gitRepositoryUrl} has changed.
    //    * @memberof appConfigData
    //    */
    //    onGitServiceUrlChanged(callback: { (value: URL): void; }): void;
    //    onGitServiceUrlChanged(callback: { (value: URL): void; }, thisArg?: any): void {
    //        if (typeof callback !== "function")
    //            return;
    //        let gitRepositoryUrlChangedCallback: { (value: URL): void; } | undefined = this._gitServiceUrlChangedCallback;
    //        if (arguments.length > 1) {
    //            if (typeof gitRepositoryUrlChangedCallback === "function")
    //                this._gitServiceUrlChangedCallback = (value: URL) => { try { gitRepositoryUrlChangedCallback(value); } finally { callback.call(thisArg, value); } };
    //            else
    //                this._gitServiceUrlChangedCallback = (value: URL) => { callback.call(thisArg, value); };
    //            callback.call(thisArg, this._serviceNowUrl);
    //            return;
    //        }
    //        if (typeof gitRepositoryUrlChangedCallback === "function")
    //            this._gitServiceUrlChangedCallback = (value: URL) => { try { gitRepositoryUrlChangedCallback(value); } finally { callback(value); } };
    //        else
    //            this._gitServiceUrlChangedCallback = callback;
    //        callback(this._gitServiceUrl);
    //    }
    //    private raiseGitServiceUrlChanged(newValue: URL, oldValue: URL): void {
    //        NotifyChangeLink.raiseChange<URL>(this._gitServiceUrlChangeNotify, newValue, oldValue);
    //        let callback: { (value: URL): void; } = this._gitServiceUrlChangedCallback;
    //        if (typeof callback === "function")
    //            callback(this._gitServiceUrl);
    //    }
    //    /**
    //    * Registers a notification callback that will be invoked when the value of {@link appConfigData#idpUrl} has changed.
    //    * @param {INotifyValueChange<URL>} onChange - The callback to invoke when the value of {@link appConfigData#idpUrl} has changed.
    //    * @returns {NotifyChangeLink<URL>} An object that can be used to un-register the change notification.
    //    * @memberof appConfigData
    //    */
    //    notifyIdpUrlChange(onChange: INotifyValueChange<URL>): NotifyChangeLink<URL>;
    //    /**
    //    * Registers a notification callback that will be invoked when the value of {@link appConfigData#idpUrl} has changed.
    //    * @template T - The type of object that will be used as the "this" object when the callback is invoked.
    //    * @param {IThisNotifyValueChange<URL, T>} onChange - The callback to invoke when the value of {@link appConfigData#idpUrl} has changed.
    //    * @param {T} thisObj - The object that will be the "this" object when the callback is invoked.
    //    * @returns {NotifyChangeLink<URL>} An object that can be used to un-register the change notification.
    //    * @memberof appConfigData
    //    */
    //    notifyIdpUrlChange<T>(onChange: IThisNotifyValueChange<URL, T>, thisObj: T): NotifyChangeLink<URL>;
    //    notifyIdpUrlChange(onChange: INotifyValueChange<URL> | IThisNotifyValueChange<URL, any>, thisObj?: any): NotifyChangeLink<URL> {
    //        if (arguments.length > 1)
    //            return new NotifyChangeLink<URL>(this._idpUrlChangeNotify, onChange, thisObj);
    //        return new NotifyChangeLink<URL>(this._idpUrlChangeNotify, onChange);
    //    }
    //    /**
    //    * Unregister a notification callback to no longer be notified of changes to {@link appConfigData#idpUrl}.
    //    * @param {NotifyChangeLink<URL>} notifier - The {@see NotifyChangeLink} that represents the registered notifcation callback.
    //    * @returns {boolean} true if the notification callback was un-registered or false if the notification callback was not registered for changes to {@link appConfigData#idpUrl}.
    //    * @memberof appConfigData
    //    */
    //    removeIdpUrlChangeNotify(notifier: NotifyChangeLink<URL>): boolean { return NotifyChangeLink.remove<URL>(this._idpUrlChangeNotify, notifier); }
    //    /**
    //    * Specifies a callback to invoke when the value of {@link appConfigData#idpUrl} has changed.
    //    * @deprecated - Use {@link appConfigData#notifyIdpUrlChange}, instead.
    //    * @todo - Remove method when no longer used.
    //    * @template T - The type of object used as the "this" object when the callback is invoked.
    //    * @param {{ (this: T, value: URL): void; }} callback - The callback to invoke when the value of {@link appConfigData#idpUrl} has changed.
    //    * @param {T} thisArg - The object to use as the "this" object when the callback is invoked.
    //    * @memberof appConfigData
    //    */
    //    onIdpUrlChanged<T>(callback: { (this: T, value: URL): void; }, thisArg: T): void;
    //    /**
    //    * Specifies a callback to invoke when the value of {@link appConfigData#idpUrl} has changed.
    //    * @deprecated - Use {@link appConfigData#notifyIdpUrlChange}, instead.
    //    * @todo - Remove method when no longer used.
    //    * @param {{ (value: URL): void; }} callback - The callback to invoke when the value of {@link appConfigData#idpUrl} has changed.
    //    * @memberof appConfigData
    //    */
    //    onIdpUrlChanged(callback: { (value: URL): void; }): void;
    //    onIdpUrlChanged(callback: { (value: URL): void; }, thisArg?: any): void {
    //        if (typeof callback !== "function")
    //            return;
    //        let idpChangedCallback: { (value: URL): void; } | undefined = this._idpUrlChangedCallback;
    //        if (arguments.length > 1) {
    //            if (typeof idpChangedCallback === "function")
    //                this._idpUrlChangedCallback = (value: URL) => { try { idpChangedCallback(value); } finally { callback.call(thisArg, value); } };
    //            else
    //                this._idpUrlChangedCallback = (value: URL) => { callback.call(thisArg, value); };
    //            callback.call(thisArg, this._idpUrl);
    //            return;
    //        }
    //        if (typeof idpChangedCallback === "function")
    //            this._idpUrlChangedCallback = (value: URL) => { try { idpChangedCallback(value); } finally { callback(value); } };
    //        else
    //            this._idpUrlChangedCallback = callback;
    //        callback(this._idpUrl);
    //    }
    //    private raiseIdpUrlChanged(newValue: URL, oldValue: URL): void {
    //        NotifyChangeLink.raiseChange<URL>(this._idpUrlChangeNotify, newValue, oldValue);
    //        let callback: { (value: URL): void; } = this._idpUrlChangedCallback;
    //        if (typeof callback === "function")
    //            callback(this._idpUrl);
    //    }
    //    /**
    //    * Registers a notification callback that will be invoked when the value of URL setting has changed.
    //    * @param {UrlSettingsNames} setting - The name of the URL setting.
    //    * @param {INotifyValueChange<URL>} onChange - The callback to invoke when the corresponding {@link URL} has changed.
    //    * @returns {NotifyChangeLink<URL>} An object that can be used to un-register the change notification.
    //    * @memberof appConfigData
    //    */
    //    notifyUrlChange(setting: UrlSettingsNames, onChange: INotifyValueChange<URL>): NotifyChangeLink<URL>;
    //    /**
    //    * Registers a notification callback that will be invoked when the value of URL setting has changed.
    //    * @template T - The type of object that will be used as the "this" object when the callback is invoked.
    //    * @param {UrlSettingsNames} setting - The name of the URL setting.
    //    * @param {IThisNotifyValueChange<URL, T>} onChange - The callback to invoke when the corresponding {@link URL} has changed.
    //    * @param {T} thisObj - The object that will be the "this" object when the callback is invoked.
    //    * @returns {NotifyChangeLink<URL>} An object that can be used to un-register the change notification.
    //    * @memberof appConfigData
    //    */
    //    notifyUrlChange<T>(setting: UrlSettingsNames, onChange: IThisNotifyValueChange<URL, T>, thisObj: T): NotifyChangeLink<URL>;
    //    notifyUrlChange(setting: UrlSettingsNames, onChange: INotifyValueChange<URL> | IThisNotifyValueChange<URL, any>, thisObj?: any): NotifyChangeLink<URL> {
    //        if (setting === "sn") {
    //            if (arguments.length > 2)
    //                return this.notifyServiceNowUrlChange(onChange, thisObj);
    //            return this.notifyServiceNowUrlChange(onChange);
    //        }
    //        if (setting == "git") {
    //            if (arguments.length > 2)
    //                return this.notifyGitServiceUrlChange(onChange, thisObj);
    //            return this.notifyGitServiceUrlChange(onChange);
    //        }
    //        if (setting !== "idp")
    //            throw new Error("Invalid setting name");
    //        if (arguments.length > 2)
    //            return this.notifyIdpUrlChange(onChange, thisObj);
    //        return this.notifyIdpUrlChange(onChange);
    //    }
    //    /**
    //    * Unregister a notification callback to no longer be notified of changes to a URL setting.
    //    * @param {UrlSettingsNames} setting - The name of the URL setting.
    //    * @param {NotifyChangeLink<URL>} notifier - The {@see NotifyChangeLink} that represents the registered notifcation callback.
    //    * @returns {boolean} true if the notification callback was un-registered or false if the notification callback was not registered for changes to {@link appConfigData#idpUrl}.
    //    * @memberof appConfigData
    //    */
    //    removeUrlChangeNofify(setting: UrlSettingsNames, notifier: NotifyChangeLink<URL>): boolean {
    //        if (setting === "sn")
    //            return this.removeServiceNowUrlChangeNotify(notifier);
    //        if (setting === "git")
    //            return this.removeGitServiceUrlChangeNotify(notifier);
    //        return setting === "idp" && this.removeIdpUrlChangeNotify(notifier);
    //    }
    //    /**
    //    * Registers a notification callback that will be invoked when the value of {@link appConfigData#pageTitle} has changed.
    //    * @param {INotifyValueChange<string>} onChange - The callback to invoke when the value of {@link appConfigData#pageTitle} has changed.
    //    * @returns {NotifyChangeLink<string>} An object that can be used to un-register the change notification.
    //    * @memberof appConfigData
    //    */
    //    notifyPageTitleChange(onChange: INotifyValueChange<string>): NotifyChangeLink<string>;
    //    /**
    //    * Registers a notification callback that will be invoked when the value of {@link appConfigData#pageTitle} has changed.
    //    * @template T - The type of object that will be used as the "this" object when the callback is invoked.
    //    * @param {IThisNotifyValueChange<string, T>} onChange - The callback to invoke when the value of {@link appConfigData#pageTitle} has changed.
    //    * @param {T} thisObj - The object that will be the "this" object when the callback is invoked.
    //    * @returns {NotifyChangeLink<string>} An object that can be used to un-register the change notification.
    //    * @memberof appConfigData
    //    */
    //    notifyPageTitleChange<T>(onChange: IThisNotifyValueChange<string, T>, thisObj: T): NotifyChangeLink<string>;
    //    notifyPageTitleChange(onChange: INotifyValueChange<string> | IThisNotifyValueChange<string, any>, thisObj?: any): NotifyChangeLink<string> {
    //        if (arguments.length > 1)
    //            return new NotifyChangeLink<string>(this._pageTitleChangeNotify, onChange, thisObj);
    //        return new NotifyChangeLink<string>(this._pageTitleChangeNotify, onChange);
    //    }
    //    /**
    //    * Unregister a notification callback to no longer be notified of changes to {@link appConfigData#pageTitle}.
    //    * @param {NotifyChangeLink<string>} notifier - The {@see NotifyChangeLink} that represents the registered notifcation callback.
    //    * @returns {boolean} true if the notification callback was un-registered or false if the notification callback was not registered for changes to {@link appConfigData#idpUrl}.
    //    * @memberof appConfigData
    //    */
    //    removePageTitleChangeNotify(notifier: NotifyChangeLink<string>): boolean { return NotifyChangeLink.remove<string>(this._pageTitleChangeNotify, notifier); }
    //    /**
    //    * Specifies a callback to invoke when the value of {@link appConfigData#pageTitle} has changed.
    //    * @deprecated - Use {@link appConfigData#notifyPageTitleChange}, instead.
    //    * @todo - Remove method when no longer used.
    //    * @template T - The type of object used as the "this" object when the callback is invoked.
    //    * @param {{ (this: T, value: URL): void; }} callback - The callback to invoke when the value of {@link appConfigData#pageTitle} has changed.
    //    * @param {T} thisArg - The object to use as the "this" object when the callback is invoked.
    //    * @memberof appConfigData
    //    */
    //    onTitleChanged<T>(callback: { (this: T, value: string): void; }, thisArg: T): void;
    //    /**
    //    * Specifies a callback to invoke when the value of {@link appConfigData#pageTitle} has changed.
    //    * @deprecated - Use {@link appConfigData#notifyPageTitleChange}, instead.
    //    * @todo - Remove method when no longer used.
    //    * @param {{ (value: string): void; }} callback - The callback to invoke when the value of {@link appConfigData#pageTitle} has changed.
    //    * @memberof appConfigData
    //    */
    //    onTitleChanged(callback: { (value: string): void; }): void;
    //    onTitleChanged(callback: { (value: string): void; }, thisArg?: any): void {
    //        if (typeof callback !== "function")
    //            return;
    //        let pageTitleChangedCallback: { (value: string): void; } | undefined = this._pageTitleChangedCallback;
    //        if (arguments.length > 1) {
    //            if (typeof pageTitleChangedCallback === "function")
    //                this._pageTitleChangedCallback = (value: string) => { try { pageTitleChangedCallback(value); } finally { callback.call(thisArg, value); } };
    //            else
    //                this._pageTitleChangedCallback = (value: string) => { callback.call(thisArg, value); };
    //            callback.call(thisArg, this._serviceNowUrl);
    //            return;
    //        }
    //        if (typeof pageTitleChangedCallback === "function")
    //            this._pageTitleChangedCallback = (value: string) => { try { pageTitleChangedCallback(value); } finally { callback(value); } };
    //        else
    //            this._pageTitleChangedCallback = callback;
    //        callback(this._pageTitle);
    //    }
    //    private raiseTitleChanged(newValue: string, oldValue: string): void {
    //        NotifyChangeLink.raiseChange<string>(this._pageTitleChangeNotify, newValue, oldValue);
    //        let callback: { (value: string): void; } = this._pageTitleChangedCallback;
    //        if (typeof callback === "function")
    //            callback(this._pageTitle);
    //    }
    //    // #endregion
    //    /**
    //    * Specifies callback(s) to invoke when settings have been loaded from appConfigData.json.
    //    * @template T - The type of object used as the "this" object when the callback is invoked.
    //    * @param {{ (this: T, svc: appConfigDataService): void; }} successCallback - The callback to invoke when settings have been successfully loaded.
    //    * @param {({ (this: T, reason: any, svc: appConfigDataService): void; } | undefined)} errorCallback - The callback to invoke when there was an error loading settings from appConfigData.json.
    //    * @param {T} thisArg - The object to use as the "this" object when the callback is invoked.
    //    * @memberof appConfigData
    //    */
    //    onSettingsLoaded<T>(successCallback: { (this: T, svc: appConfigDataService): void; }, errorCallback: { (this: T, reason: any, svc: appConfigDataService): void; } | undefined, thisArg: T): void;
    //    /**
    //    * Specifies callback(s) to invoke when settings have been loaded from appConfigData.json.
    //    *
    //    * @param {{ (svc: appConfigDataService): void; }} successCallback - The callback to invoke when settings have been successfully loaded.
    //    * @param {{ (reason: any, svc: appConfigDataService): void; }} [errorCallback] - The callback to invoke when there was an error loading settings from appConfigData.json.
    //    * @memberof appConfigData
    //    */
    //    onSettingsLoaded(successCallback: { (svc: appConfigDataService): void; }, errorCallback?: { (reason: any, svc: appConfigDataService): void; }): void;
    //    onSettingsLoaded(successCallback: { (svc: appConfigDataService): void; }, errorCallback?: { (reason: any, svc: appConfigDataService): void; }, thisArg?: any): void {
    //        let svc: appConfigDataService = this;
    //        this._promise.then(() => {
    //            if (arguments.length > 2)
    //                successCallback.call(thisArg, svc);
    //            else
    //                successCallback(svc);
    //        }, (reason: any) => {
    //            if (typeof errorCallback === "function") {
    //                if (arguments.length > 2)
    //                    errorCallback.call(thisArg, reason, svc);
    //                else
    //                    errorCallback(reason, svc);
    //            }
    //        });
    //    }
    //    private applySettings(appJson?: IAppConfigJSON): void {
    //        let settings: IUrlConfigSettings | undefined = this.persistentStorageLoader.getObject<IUrlConfigSettings>(persistentStorageLoaderService.STORAGEKEY_URL_CONFIG_SETTINGS);
    //        if (typeof settings === "object" && settings !== null) {
    //            if (typeof settings.serviceNowUrl === "string" && settings.serviceNowUrl.length > 0)
    //                this.serviceNowUrl(new URL(settings.serviceNowUrl));
    //            else if (typeof appJson === "object" && appJson !== null && typeof appJson.serviceNowUrl === "string" && appJson.serviceNowUrl.length > 0)
    //                this.serviceNowUrl(new URL(appJson.serviceNowUrl));
    //            if (typeof settings.gitServiceUrl === "string" && settings.gitServiceUrl.length > 0)
    //                this.gitServiceUrl(new URL(settings.gitServiceUrl));
    //            else if (typeof appJson === "object" && appJson !== null && typeof appJson.gitServiceUrl === "string" && appJson.gitServiceUrl.length > 0)
    //                this.gitServiceUrl(new URL(appJson.gitServiceUrl));
    //        } else if (typeof appJson === "object" && appJson !== null) {
    //            if (typeof appJson.serviceNowUrl === "string" && appJson.serviceNowUrl.length > 0)
    //                this.serviceNowUrl(new URL(appJson.serviceNowUrl));
    //            if (typeof appJson.gitServiceUrl === "string" && appJson.gitServiceUrl.length > 0)
    //                this.gitServiceUrl(new URL(appJson.gitServiceUrl));
    //        }
    //        this.persistentStorageLoader.setObject(persistentStorageLoaderService.STORAGEKEY_URL_CONFIG_SETTINGS, settings);
    //        if (typeof appJson === "object" && appJson !== null && typeof appJson.navigation === "object" && appJson.navigation !== null)
    //            this._topNavItems = NavigationItem.createNavItems(this, appJson.navigation.items);
    //        else
    //            this._topNavItems = NavigationItem.createNavItems(this);
    //        let current: NavigationItem | undefined = NavigationItem.findCurrentItem(this.topNavItems());
    //        if (sys.notNil(current) && current.pageTitle.length > 0)
    //            this.pageTitle(current.pageTitle);
    //    }
    //    /**
    //    * Converts a URL path to a fallback (default) page ID.
    //    * @static
    //    * @param {string} path - The URL Path to convert.
    //    * @returns {string} The fallback page ID for the given URL path.
    //    * @memberof appConfigData
    //    */
    //    static toPageId(path: string): string {
    //        let arr: string[];
    //        let i: number;
    //        if (typeof path !== "string" || path.length == 0 || path == "/" || (arr = path.split("/").filter((value: string) => value.length > 0)).length === 0)
    //            arr = DEFAULT_PAGE_PATH.split("/").filter((value: string) => value.length > 0);
    //        let n: string = arr.pop();
    //        if ((i = n.lastIndexOf(".")) < 1 || i === n.length - 1) {
    //            let a: string[] = DEFAULT_PAGE_PATH.split("/").filter((value: string) => value.length > 0);
    //            arr.push(n);
    //            n = a[a.length - 1];
    //            if ((i = n.lastIndexOf(".")) < 0) {
    //                arr.push(n);
    //                return arr.join("/");
    //            }
    //        }
    //        arr.push(n.substr(0, i));
    //        return (arr.length === 1) ? arr[0] : arr.join("/");
    //    }
    //}
    //appModule.factory(SERVICE_NAME_appConfigData, [persistentStorageLoaderService.SERVICE_NAME, "$http", '$log', '$document', '$window', appConfigDataService]);
    //// #endregion
    // #region urlInput directive
    /**
     * Defines the directive name as "urlInput".
     *
     * @todo Rename to inputUrl to use as <input:url />
     * @export
     * @constant {string}
     */
    app.DIRECTIVE_NAME_urlInputDirective = "urlInput";
    class urlInputDirectiveController {
        constructor($scope) {
            this.$scope = $scope;
            this._isEmpty = true;
            this._invalidFormat = false;
            window.console.debug(angular.toJson({
                activity: "app.urlInputDirectiveController#constructor invoked",
                arguments: sys.asArray(arguments)
            }, true));
            let ctrl = this;
        }
        validate(value) {
            if (typeof value != "string" || value.trim().length === 0) {
                if (this.$scope.required === true) {
                    this.$scope.inputClass = [cssFeedbackClass.isInvalid];
                    this.$scope.messageClass = [cssAlertClass.alert, cssAlertClass.warning];
                    this.$scope.validationMessage = "URL not provided.";
                    this.$scope.isValid = false;
                }
                else {
                    this.$scope.isValid = true;
                    this.$scope.inputClass = [cssFeedbackClass.isValid];
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
                    this.$scope.inputClass = [cssFeedbackClass.isInvalid];
                    this.$scope.messageClass = [cssAlertClass.alert, cssAlertClass.danger];
                    this.$scope.validationMessage = "Invalid URL format: " + err;
                    this.$scope.isValid = false;
                    return false;
                }
                if (this.$scope.allowRelative !== true) {
                    this.$scope.inputClass = [cssFeedbackClass.isInvalid];
                    this.$scope.messageClass = [cssAlertClass.alert, cssAlertClass.danger];
                    this.$scope.validationMessage = "Relative URL not allowed";
                    this.$scope.isValid = false;
                    return false;
                }
            }
            if (url.hash.length > 0 && this.$scope.allowFragment !== true)
                this.$scope.validationMessage = "URL fragment not allowed";
            else if (url.search.length > 0 && this.$scope.allowQuery !== true)
                this.$scope.validationMessage = "URL query string not allowed";
            else if (url.pathname.length > 0 && url.pathname != "/" && this.$scope.allowPath !== true)
                this.$scope.validationMessage = "URL path not allowed";
            else {
                this.$scope.isValid = true;
                this.$scope.inputClass = [cssFeedbackClass.isValid];
                this.$scope.messageClass = [];
                this.$scope.validationMessage = "";
                this.$scope.textModel = value;
                return true;
            }
            this.$scope.inputClass = [cssFeedbackClass.isInvalid];
            this.$scope.messageClass = [cssAlertClass.alert, cssAlertClass.danger];
            this.$scope.isValid = false;
            return false;
        }
        static createDirective() {
            window.console.debug("Returning directive " + app.DIRECTIVE_NAME_urlInputDirective);
            return {
                restrict: "E",
                controller: ['$scope', urlInputDirectiveController],
                controllerAs: 'ctrl',
                link: (scope, element, attrs) => {
                    window.console.debug(angular.toJson({
                        activity: "app." + app.DIRECTIVE_NAME_urlInputDirective + "#link invoked",
                        arguments: sys.asArray(arguments)
                    }, true));
                    if (typeof scope.textBoxId !== "string" || scope.textBoxId.trim().length == 0) {
                        let i = 0;
                        let id = app.DIRECTIVE_NAME_urlInputDirective + ":" + i++;
                        for (let e = $(id); sys.notNil(e) && e.length > 0; e = $(id))
                            id = app.DIRECTIVE_NAME_urlInputDirective + ":" + i++;
                        scope.textBoxId = id;
                    }
                    scope.$watch('textModel', (value) => {
                        if (typeof value === "string" && value !== scope.text)
                            scope.text = value;
                    });
                    scope.$watch('text', (value) => { scope.ctrl.validate((typeof value !== "string") ? "" : value); });
                    scope.$watchGroup(["required", "allowRelative", "allowPath", "allowQuery", "allowFragment"], () => { scope.ctrl.validate((typeof scope.text !== "string") ? "" : scope.text); });
                },
                scope: {
                    textModel: '=',
                    isValid: '=?',
                    allowPath: '=?',
                    allowFragment: '=?',
                    allowQuery: '=?',
                    allowRelative: '=?',
                    required: '=?',
                    labelText: '@',
                    textBoxId: '@?'
                },
                template: '<label for="{{textBoxId}}">{{labelText}}</label><input type="text" ng-class="inputClass" id="{{textBoxId}}" ng-model="text" /><div ng-class="messageClass" ng-hide="isValid">{{validationMessage}}</div>'
            };
        }
    }
    app.urlInputDirectiveController = urlInputDirectiveController;
    window.console.debug("Creating directive " + app.DIRECTIVE_NAME_urlInputDirective);
    app.appModule.directive(app.DIRECTIVE_NAME_urlInputDirective, urlInputDirectiveController.createDirective);
    // #endregion
    // #region appContent directive.
    /**
     * Defines the directive name as "appContent".
     * @export
     * @constant {string}
     */
    app.DIRECTIVE_NAME_appContentDirective = "appContent";
    /**
     * Implements the controller for the appContent directive
     * @class Controller
     * @implements {ng.IController}
     */
    class appContentController {
        /**
         * Creates an instance of the controller for the appContent directive.
         *
         * @param {IAppContentDirectiveScope} $scope - The scope for the current appContent directive.
         * @param {ng.ILogService} $log - The $log service.
         * @param {ng.IWindowService} $window - The $window service.
         * @param {appConfigDataService} appConfigData - The appConfigData service.
         * @memberof Controller
         */
        constructor($scope, $log, $window, navConfigLoader, appConfigLoader) {
            this.$scope = $scope;
            this.$log = $log;
            this.$window = $window;
            this.navConfigLoader = navConfigLoader;
            this.appConfigLoader = appConfigLoader;
            $log.debug(angular.toJson({
                activity: "app.appContentController#constructor invoked",
                $scope: sys.getClassName($scope),
                $log: sys.getClassName($log),
                $window: sys.getClassName($window),
                navConfigLoader: sys.getClassName(navConfigLoader),
                appConfigLoader: sys.getClassName(appConfigLoader),
                additionalArguments: sys.skipFirst(sys.asArray(arguments), 5)
            }, true));
            $scope.serviceNowUrlIsValid = $scope.gitServiceUrlIsValid = $scope.idpUrlIsValid = $scope.setupParametersAreInvalid = true;
            $scope.setupParametersDialogVisible = $scope.showSideMenu = $scope.showBreadcrumbLinks = $scope.showSideNavItems = $scope.showSideNavHeading = $scope.showCurrentItem = $scope.popupDialogVisible = false;
            $scope.topNavItems = $scope.sideNavBreadcrumbItems = $scope.sideNavItems = $scope.followingSideNavItems = [];
            $scope.popupDialogButtons = [];
            $scope.sideNavHeading = $scope.popupDialogTitle = $scope.popupDialogMessage = '';
            appConfigLoader.onServiceNowUrlChanged($scope, (url) => { $scope.serviceNowUrl = url.href; });
            $scope.serviceNowUrl = appConfigLoader.serviceNowUrl().href;
            appConfigLoader.onGitServiceUrlChanged($scope, (url) => { $scope.gitServiceUrl = url.href; });
            $scope.gitServiceUrl = appConfigLoader.gitServiceUrl().href;
            appConfigLoader.onIdpUrlChanged($scope, (url) => { $scope.idpUrl = url.href; });
            $scope.idpUrl = appConfigLoader.idpUrl().href;
            $scope.popupDialogBodyClass = [];
            $log.debug(angular.toJson({
                activity: "app.appContentController#constructor: Initialized scope",
                appContentController: sys.getClassName($scope.appContentController),
                currentNavItem: $scope.currentNavItem,
                followingSideNavItems: $scope.followingSideNavItems,
                gitServiceUrl: $scope.gitServiceUrl,
                gitServiceUrlIsValid: $scope.gitServiceUrlIsValid,
                idpUrl: $scope.idpUrl,
                idpUrlIsValid: $scope.idpUrlIsValid,
                mainSectionClass: $scope.mainSectionClass,
                onPopupDialogClose: typeof $scope.onPopupDialogClose,
                pageTitle: $scope.pageTitle,
                popupDialogBodyClass: $scope.popupDialogBodyClass,
                popupDialogButtons: $scope.popupDialogButtons,
                popupDialogMessage: $scope.popupDialogMessage,
                popupDialogTitle: $scope.popupDialogTitle,
                popupDialogVisible: $scope.popupDialogVisible,
                serviceNowUrl: $scope.serviceNowUrl,
                serviceNowUrlIsValid: $scope.serviceNowUrlIsValid,
                setupParametersAreInvalid: $scope.setupParametersAreInvalid,
                setupParametersDialogVisible: $scope.setupParametersDialogVisible,
                showBreadcrumbLinks: $scope.showBreadcrumbLinks,
                showCurrentItem: $scope.showCurrentItem,
                showSideMenu: $scope.showSideMenu,
                showSideNavHeading: $scope.showSideNavHeading,
                showSideNavItems: $scope.showSideNavItems,
                sideNavBreadcrumbItems: $scope.sideNavBreadcrumbItems,
                sideNavHeading: $scope.sideNavHeading,
                sideNavItems: $scope.sideNavItems,
                topNavItems: $scope.topNavItems
            }, true));
            this.updateMainSectionClass();
            navConfigLoader.loadPageTitle().then((title) => {
                $log.debug(angular.toJson({
                    activity: "app.appContentController#navConfigLoader#loadPageTitle->then invoked",
                    title: title
                }, true));
                $scope.pageTitle = title;
            });
            $scope.$watchGroup(['serviceNowUrlIsValid', 'gitServiceUrlIsValid', 'idpUrlIsValid'], () => {
                $log.debug(angular.toJson({
                    activity: "app.appContentController#$scope#$watchGroup('serviceNowUrlIsValid', 'gitServiceUrlIsValid', 'idpUrlIsValid')=>listener invoked",
                    arguments: sys.asArray(arguments),
                    gitServiceUrl: $scope.gitServiceUrl,
                    gitServiceUrlIsValid: $scope.gitServiceUrlIsValid,
                    idpUrl: $scope.idpUrl,
                    idpUrlIsValid: $scope.idpUrlIsValid,
                    serviceNowUrl: $scope.serviceNowUrl,
                    serviceNowUrlIsValid: $scope.serviceNowUrlIsValid,
                    setupParametersAreInvalid: $scope.setupParametersAreInvalid
                }, true));
                let areValid = $scope.serviceNowUrlIsValid && $scope.gitRepositoryBaseUrlIsValid && $scope.idpUrlIsValid;
                if (areValid !== $scope.setupParametersAreInvalid) {
                    $log.debug(angular.toJson({
                        activity: "app.appContentController#$scope#$watchGroup('serviceNowUrlIsValid', 'gitServiceUrlIsValid', 'idpUrlIsValid')=>listener: Setting setupParametersAreInvalid",
                        areValid: areValid
                    }, true));
                    $scope.setupParametersAreInvalid = areValid;
                }
            });
            $scope.setupParametersAreInvalid = $scope.serviceNowUrlIsValid && $scope.gitRepositoryBaseUrlIsValid && $scope.idpUrlIsValid;
            $log.debug(angular.toJson({
                activity: "app.appContentController#constructor: Updated setupParametersAreInvalid",
                areValid: $scope.setupParametersAreInvalid
            }, true));
            navConfigLoader.loadTopNavItems().then((items) => {
                $log.debug(angular.toJson({
                    activity: "app.appContentController#navConfigLoader#loadPageTitle->then invoked",
                    items: items
                }, true));
                $scope.topNavItems = items;
            });
            let ctrl = this;
            navConfigLoader.loadCurrentItem().then((currentNavItem) => {
                $log.debug(angular.toJson({
                    activity: "app.appContentController#navConfigLoader#loadCurrentItem->then invoked",
                    currentNavItem: currentNavItem
                }, true));
                if (sys.isNil(currentNavItem)) {
                    $scope.showBreadcrumbLinks = $scope.showSideMenu = $scope.showSideNavHeading = $scope.showSideNavItems = $scope.showCurrentItem = false;
                    $scope.sideNavHeading = '';
                    $scope.sideNavBreadcrumbItems = $scope.sideNavItems = $scope.followingSideNavItems = [];
                    $scope.currentNavItem = undefined;
                    $log.debug(angular.toJson({
                        activity: "app.appContentController#navConfigLoader#loadCurrentItem->then: currentNavItem is nil - updated scope",
                        currentNavItem: $scope.currentNavItem,
                        followingSideNavItems: $scope.followingSideNavItems,
                        mainSectionClass: $scope.mainSectionClass,
                        pageTitle: $scope.pageTitle,
                        showBreadcrumbLinks: $scope.showBreadcrumbLinks,
                        showCurrentItem: $scope.showCurrentItem,
                        showSideMenu: $scope.showSideMenu,
                        showSideNavHeading: $scope.showSideNavHeading,
                        showSideNavItems: $scope.showSideNavItems,
                        sideNavBreadcrumbItems: $scope.sideNavBreadcrumbItems,
                        sideNavHeading: $scope.sideNavHeading,
                        sideNavItems: $scope.sideNavItems,
                        topNavItems: $scope.topNavItems
                    }, true));
                }
                else {
                    if (currentNavItem.isNestedNavItem) {
                        $scope.showBreadcrumbLinks = ($scope.sideNavBreadcrumbItems = currentNavItem.getBreadcrumbLinks()).length > 0;
                        let parentNavItem = currentNavItem.parentNavItem;
                        if (currentNavItem.hasSiblingNavItem) {
                            $scope.showSideMenu = $scope.showSideNavItems = $scope.showCurrentItem = true;
                            $scope.sideNavItems = currentNavItem.precedingSiblings();
                            $scope.followingSideNavItems = currentNavItem.followingSiblings();
                            $scope.showSideNavHeading = ($scope.sideNavHeading = parentNavItem.sideNavHeading.trim()).length > 0;
                            $scope.currentNavItem = currentNavItem;
                            $log.debug(angular.toJson({
                                activity: "app.appContentController#navConfigLoader#loadCurrentItem->then: currentNavItem is nested with sibling - updated scope",
                                currentNavItem: $scope.currentNavItem,
                                followingSideNavItems: $scope.followingSideNavItems,
                                mainSectionClass: $scope.mainSectionClass,
                                pageTitle: $scope.pageTitle,
                                showBreadcrumbLinks: $scope.showBreadcrumbLinks,
                                showCurrentItem: $scope.showCurrentItem,
                                showSideMenu: $scope.showSideMenu,
                                showSideNavHeading: $scope.showSideNavHeading,
                                showSideNavItems: $scope.showSideNavItems,
                                sideNavBreadcrumbItems: $scope.sideNavBreadcrumbItems,
                                sideNavHeading: $scope.sideNavHeading,
                                sideNavItems: $scope.sideNavItems,
                                topNavItems: $scope.topNavItems
                            }, true));
                        }
                        else {
                            $scope.showSideNavItems = $scope.showSideNavHeading = $scope.showCurrentItem = false;
                            $scope.followingSideNavItems = $scope.sideNavItems = [];
                            $scope.showSideMenu = $scope.showBreadcrumbLinks;
                            $scope.sideNavHeading = '';
                            $scope.currentNavItem = undefined;
                            $log.debug(angular.toJson({
                                activity: "app.appContentController#navConfigLoader#loadCurrentItem->then: currentNavItem is nested - updated scope",
                                currentNavItem: $scope.currentNavItem,
                                followingSideNavItems: $scope.followingSideNavItems,
                                mainSectionClass: $scope.mainSectionClass,
                                pageTitle: $scope.pageTitle,
                                showBreadcrumbLinks: $scope.showBreadcrumbLinks,
                                showCurrentItem: $scope.showCurrentItem,
                                showSideMenu: $scope.showSideMenu,
                                showSideNavHeading: $scope.showSideNavHeading,
                                showSideNavItems: $scope.showSideNavItems,
                                sideNavBreadcrumbItems: $scope.sideNavBreadcrumbItems,
                                sideNavHeading: $scope.sideNavHeading,
                                sideNavItems: $scope.sideNavItems,
                                topNavItems: $scope.topNavItems
                            }, true));
                        }
                    }
                    else {
                        $scope.currentNavItem = undefined;
                        $scope.showBreadcrumbLinks = $scope.showCurrentItem = false;
                        $scope.sideNavBreadcrumbItems = $scope.followingSideNavItems = [];
                        $scope.showSideMenu = $scope.showSideNavItems = currentNavItem.hasChildNavItem;
                        if ($scope.showSideMenu) {
                            $scope.showSideNavHeading = ($scope.sideNavHeading = currentNavItem.sideNavHeading.trim()).length > 0;
                            $scope.sideNavItems = currentNavItem.childNavItems;
                            $log.debug(angular.toJson({
                                activity: "app.appContentController#navConfigLoader#loadCurrentItem->then: currentNavItem is top level with sidenav - updated scope",
                                currentNavItem: $scope.currentNavItem,
                                followingSideNavItems: $scope.followingSideNavItems,
                                mainSectionClass: $scope.mainSectionClass,
                                pageTitle: $scope.pageTitle,
                                showBreadcrumbLinks: $scope.showBreadcrumbLinks,
                                showCurrentItem: $scope.showCurrentItem,
                                showSideMenu: $scope.showSideMenu,
                                showSideNavHeading: $scope.showSideNavHeading,
                                showSideNavItems: $scope.showSideNavItems,
                                sideNavBreadcrumbItems: $scope.sideNavBreadcrumbItems,
                                sideNavHeading: $scope.sideNavHeading,
                                sideNavItems: $scope.sideNavItems,
                                topNavItems: $scope.topNavItems
                            }, true));
                        }
                        else {
                            $scope.sideNavItems = [];
                            $scope.sideNavHeading = '';
                            $scope.showSideNavHeading = $scope.showSideNavItems = false;
                            $log.debug(angular.toJson({
                                activity: "app.appContentController#navConfigLoader#loadCurrentItem->then: currentNavItem is top level - updated scope",
                                currentNavItem: $scope.currentNavItem,
                                followingSideNavItems: $scope.followingSideNavItems,
                                mainSectionClass: $scope.mainSectionClass,
                                pageTitle: $scope.pageTitle,
                                showBreadcrumbLinks: $scope.showBreadcrumbLinks,
                                showCurrentItem: $scope.showCurrentItem,
                                showSideMenu: $scope.showSideMenu,
                                showSideNavHeading: $scope.showSideNavHeading,
                                showSideNavItems: $scope.showSideNavItems,
                                sideNavBreadcrumbItems: $scope.sideNavBreadcrumbItems,
                                sideNavHeading: $scope.sideNavHeading,
                                sideNavItems: $scope.sideNavItems,
                                topNavItems: $scope.topNavItems
                            }, true));
                        }
                    }
                }
                ctrl.updateMainSectionClass();
            }, (reason) => {
                $log.error(angular.toJson({
                    message: "Error loading application settings",
                    reason: reason
                }, true));
                $window.alert("Unexpected error loading application settings. See browser log for more detail.");
            });
        }
        updateMainSectionClass() {
            if (this.$scope.showSideMenu)
                this.$scope.mainSectionClass = ["container-fluid", "col-8", "col-lg-9"];
            else
                this.$scope.mainSectionClass = ["container-fluid", "col-12"];
            this.$log.debug(angular.toJson({
                activity: "app.appContentController#updateMainSectionClass: Updated main section css",
                showSideMenu: this.$scope.showSideMenu,
                mainSectionClass: this.$scope.mainSectionClass
            }, true));
        }
        /**
         * Opens the edit dialog for setup parameters.
         *
         * @param {JQueryInputEventObject} [event] - The event object.
         * @memberof Controller
         */
        openSetupParametersEditDialog(event) {
            this.$log.debug(angular.toJson({
                activity: "app.appContentController#openSetupParametersEditDialog invoked",
                gitServiceUrl: this.$scope.gitServiceUrl,
                gitServiceUrlIsValid: this.$scope.gitServiceUrlIsValid,
                idpUrl: this.$scope.idpUrl,
                idpUrlIsValid: this.$scope.idpUrlIsValid,
                serviceNowUrl: this.$scope.serviceNowUrl,
                serviceNowUrlIsValid: this.$scope.serviceNowUrlIsValid,
                setupParametersAreInvalid: this.$scope.setupParametersAreInvalid,
                setupParametersDialogVisible: this.$scope.setupParametersDialogVisible
            }, true));
            sys.preventEventDefault(event);
            if (this.$scope.setupParametersDialogVisible)
                this.$log.debug("app.appContentController#openSetupParametersEditDialog: Setup parameters dialog already open");
            else {
                this.$log.debug("app.appContentController#openSetupParametersEditDialog: Showing dialog");
                $("#setupParametersDialog").modal('show');
                this.$scope.setupParametersDialogVisible = true;
            }
        }
        /**
         * Closes the edit dialog for setup parameters.
         *
         * @param {JQueryInputEventObject} [event] - The event object.
         * @param {boolean} [accept] - Whether to accept any validated changes that were made.
         * @memberof Controller
         */
        closeSetupParametersEditDialog(event, accept) {
            this.$log.debug(angular.toJson({
                activity: "app.appContentController#closeSetupParametersEditDialog invoked",
                gitServiceUrl: this.$scope.gitServiceUrl,
                gitServiceUrlIsValid: this.$scope.gitServiceUrlIsValid,
                idpUrl: this.$scope.idpUrl,
                idpUrlIsValid: this.$scope.idpUrlIsValid,
                serviceNowUrl: this.$scope.serviceNowUrl,
                serviceNowUrlIsValid: this.$scope.serviceNowUrlIsValid,
                setupParametersAreInvalid: this.$scope.setupParametersAreInvalid,
                setupParametersDialogVisible: this.$scope.setupParametersDialogVisible
            }, true));
            sys.preventEventDefault(event);
            if (this.$scope.setupParametersDialogVisible) {
                this.$log.debug("app.appContentController#closeSetupParametersEditDialog: Hiding dialog");
                $("#setupParametersDialog").modal('hide');
                this.$scope.setupParametersDialogVisible = false;
            }
            else
                this.$log.debug("app.appContentController#closeSetupParametersEditDialog: Setup parameters dialog already hidden");
        }
        /**
         * Closes the main modal popup dialog.
         *
         * @param {JQueryInputEventObject} [event] - The event object.
         * @param {*} [result] - The result value use as the the modal dialog result.
         * @memberof Controller
         */
        closePopupDialog(event, result) {
            sys.preventEventDefault(event);
            if (this.$scope.popupDialogVisible) {
                $("#mainModalPopupDialog").modal('hide');
                this.$scope.popupDialogVisible = false;
                if (typeof this.$scope.onPopupDialogClose === "function") {
                    if (arguments.length > 1)
                        this.$scope.onPopupDialogClose(result);
                    else
                        this.$scope.onPopupDialogClose();
                }
            }
        }
        $onInit() { }
    }
    app.appContentController = appContentController;
    window.console.debug("Creating directive " + app.DIRECTIVE_NAME_appContentDirective);
    app.appModule.directive(app.DIRECTIVE_NAME_appContentDirective, () => {
        window.console.debug("Returning directive " + app.DIRECTIVE_NAME_appContentDirective);
        return {
            controller: ['$scope', '$log', '$window', navConfigLoaderService.SERVICE_NAME, appConfigLoaderService.SERVICE_NAME, appContentController],
            controllerAs: 'appContentController',
            restrict: "E",
            scope: true,
            templateUrl: 'Template/appContent.htm',
            transclude: true
        };
    });
    // #endregion
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
            $window.console.debug(angular.toJson({
                activity: "app.copyToClipboardService#constructor invoked",
                $window: sys.getClassName($window),
                additionalArguments: sys.skipFirst(sys.asArray(arguments), 1)
            }, true));
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
            copyToClipboardService.$window.console.debug(angular.toJson({
                activity: "app.copyToClipboardButtonController#constructor invoked",
                $scope: sys.getClassName($scope),
                copyToClipboardService: sys.getClassName(copyToClipboardService),
                additionalArguments: sys.skipFirst(sys.asArray(arguments), 2)
            }, true));
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
            window.console.debug("Returning directive " + app.DIRECTIVE_NAME_copyToClipboard);
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
            this.copyToClipboardService.$window.console.debug(angular.toJson({
                activity: "app.copyToClipboardButtonController#initialize invoked",
                targetId: targetId,
                successMessage: successMessage,
                cssClass: cssClass
            }, true));
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
    window.console.debug("Creating service " + app.SERVICE_NAME_copyToClipboard);
    app.appModule.service(app.SERVICE_NAME_copyToClipboard, ["$window", copyToClipboardService]);
    window.console.debug("Creating directive " + app.DIRECTIVE_NAME_copyToClipboard);
    app.appModule.directive(app.DIRECTIVE_NAME_copyToClipboard, copyToClipboardButtonController.createDirective);
    // #endregion
    // #region configUrl directive
    /**
     * Defines the directive name as "configUrl".
     * @export
     * @constant {string}
     */
    app.DIRECTIVE_NAME_configUrl = "configUrl";
    function getConfigUrlDirectiveDirective(appConfigLoader) {
        appConfigLoader.$log.debug(angular.toJson({
            activity: "Returning directive " + app.DIRECTIVE_NAME_configUrl,
            appConfigLoader: sys.getClassName(appConfigLoader),
            additionalArguments: sys.skipFirst(sys.asArray(arguments), 1)
        }, true));
        return {
            restrict: "AE",
            link: (scope, element, attrs) => {
                appConfigLoader.$log.debug(angular.toJson({
                    activity: "app." + app.DIRECTIVE_NAME_configUrl + "#link invoked",
                    arguments: sys.asArray(arguments)
                }, true));
                function updateText() {
                    appConfigLoader.$log.debug(angular.toJson({
                        activity: "app." + app.DIRECTIVE_NAME_configUrl + "#link: Updating text",
                        element: element.serialize(),
                        base: scope.base,
                        href: scope.href,
                        q: scope.q,
                        v: scope.v,
                        asLink: scope.asLink,
                        target: scope.target,
                        linkClass: scope.linkClass,
                        linkClassModel: scope.linkClassModel
                    }, true));
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
                    appConfigLoader.$log.debug(angular.toJson({
                        activity: "app." + app.DIRECTIVE_NAME_configUrl + "#link: Text updated",
                        element: element.serialize(),
                        base: scope.base,
                        href: scope.href,
                        q: scope.q,
                        v: scope.v,
                        asLink: scope.asLink,
                        target: scope.target,
                        linkClass: scope.linkClass,
                        linkClassModel: scope.linkClassModel
                    }, true));
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
    window.console.debug("Creating directive " + app.DIRECTIVE_NAME_configUrl);
    app.appModule.directive(app.DIRECTIVE_NAME_configUrl, [appConfigLoaderService.SERVICE_NAME, getConfigUrlDirectiveDirective]);
    // #endregion
    // #region aConfigLink directive
    /**
     * Defines the directive name as "aConfigLink".
     * @export
     * @constant {string}
     */
    app.DIRECTIVE_NAME_aConfigLink = "aConfigLink";
    const DEFAULT_TARGET = "_blank";
    class aConfigLinkController {
        constructor($scope, appConfigLoader) {
            this.$scope = $scope;
            this.appConfigLoader = appConfigLoader;
            appConfigLoader.$log.debug(angular.toJson({
                activity: "app.aConfigLinkController#constructor invoked",
                $scope: sys.getClassName($scope),
                appConfigLoader: sys.getClassName(appConfigLoader),
                additionalArguments: sys.skipFirst(sys.asArray(arguments), 2)
            }, true));
            $scope.absHRef = $scope.href = "";
            $scope.linkTarget = DEFAULT_TARGET;
            $scope.class = [];
            appConfigLoader.$log.debug(angular.toJson({
                activity: "app.aConfigLinkController#constructor: Initialized scope",
                base: $scope.base,
                href: $scope.href,
                q: $scope.q,
                v: $scope.v,
                absHRef: $scope.absHRef,
                linkTarget: $scope.linkTarget,
                target: $scope.target,
                class: $scope.class,
                linkClass: $scope.linkClass,
                linkClassModel: $scope.linkClassModel
            }, true));
            let ctrl = this;
            $scope.$watchGroup(["base", "url", "q", "v"], () => { ctrl.updateHref(); });
            $scope.$watchGroup(["linkClass", "linkClassModel"], () => {
                $scope.class = (typeof $scope.linkClass === "string" && $scope.linkClass.length > 0) ?
                    sys.unique(((typeof $scope.linkClassModel === "string" && $scope.linkClassModel.length > 0) ?
                        $scope.linkClass.split(sys.whitespaceRe).concat($scope.linkClassModel.split(sys.whitespaceRe)) :
                        $scope.linkClass.split(sys.whitespaceRe)).filter((v) => v.length > 0)) :
                    ((typeof $scope.linkClassModel === "string" && $scope.linkClassModel.length > 0) ? sys.unique($scope.linkClassModel.split(sys.whitespaceRe).filter((v) => v.length > 0)) : []);
                appConfigLoader.$log.debug(angular.toJson({
                    activity: "app.aConfigLinkController#constructor: Set class",
                    linkClass: $scope.linkClass,
                    linkClassModel: $scope.linkClassModel,
                    class: $scope.class
                }, true));
            });
            $scope.$watch("target", () => {
                if (typeof $scope.target === "string")
                    $scope.linkTarget = $scope.target;
                else
                    $scope.linkTarget = DEFAULT_TARGET;
                appConfigLoader.$log.debug(angular.toJson({
                    activity: "app.aConfigLinkController#constructor: Set target",
                    linkTarget: $scope.linkTarget
                }, true));
            });
        }
        updateHref() {
            if (typeof this.$scope.q === "string" && this.$scope.q.length > 0)
                this.$scope.absHRef = ((typeof this.$scope.v === "string") ? this.appConfigLoader.createUrl(this.$scope.base, this.$scope.href, this.$scope.q, this.$scope.v) :
                    this.appConfigLoader.createUrl(this.$scope.base, this.$scope.href, this.$scope.q)).href;
            else
                this.$scope.absHRef = this.appConfigLoader.createUrl(this.$scope.base, this.$scope.href).href;
            this.appConfigLoader.$log.debug(angular.toJson({
                activity: "app.aConfigLinkController#constructor: Set absHRef",
                absHRef: this.$scope.absHRef
            }, true));
        }
        $onInit() { }
    }
    app.aConfigLinkController = aConfigLinkController;
    window.console.debug("Creating directive " + app.DIRECTIVE_NAME_aConfigLink);
    app.appModule.directive(app.DIRECTIVE_NAME_aConfigLink, () => {
        window.console.debug("Returning directive " + app.DIRECTIVE_NAME_aConfigLink);
        return {
            restrict: "E",
            controller: ['$scope', appConfigLoaderService.SERVICE_NAME, aConfigLinkController],
            scope: { base: "@", href: "@?", q: "@?", v: "@?", linkClass: "@?", linkClassModel: "=?" },
            replace: true,
            template: '<a ng-href="{{absHRef}}" target="{{linkTarget}}" ng-class="class" ng-transclude></a>',
            transclude: true
        };
    });
    // #endregion
    // #region snNavLink directive
    /**
     * Defines the directive name as "snNavLink".
     * @export
     * @constant {string}
     */
    app.DIRECTIVE_NAME_snNavLink = "snNavLink";
    class snNavLinkController {
        constructor($scope) {
            this.$scope = $scope;
            window.console.debug(angular.toJson({
                activity: "app.snNavLinkController#constructor invoked",
                $scope: sys.getClassName($scope),
                additionalArguments: sys.skipFirst(sys.asArray(arguments), 1)
            }, true));
            $scope.effectiveHRef = "";
            $scope.text = "";
            $scope.hasLink = false;
            $scope.leadingSegments = [];
            $scope.trailingSegments = [];
            window.console.debug(angular.toJson({
                activity: "app.snNavLinkController#constructor: Initialized scope",
                effectiveHRef: $scope.effectiveHRef,
                hasLink: $scope.hasLink,
                href: $scope.href,
                leadingSegments: $scope.leadingSegments,
                absHlinkIndexRef: $scope.linkIndex,
                nodeSeparator: $scope.nodeSeparator,
                pathNodes: $scope.pathNodes,
                q: $scope.q,
                v: $scope.v,
                target: $scope.target,
                text: $scope.text,
                toNav: $scope.toNav,
                trailingSegments: $scope.trailingSegments
            }, true));
            $scope.$watchGroup(['toNav', 'pathNodes', 'nodeSeparator', 'hrefModel', 'href'], () => {
                window.console.debug(angular.toJson({
                    activity: "app.snNavLinkController#$scope$watchGroup()=>listener invoked",
                    effectiveHRef: $scope.effectiveHRef,
                    hasLink: $scope.hasLink,
                    href: $scope.href,
                    leadingSegments: $scope.leadingSegments,
                    absHlinkIndexRef: $scope.linkIndex,
                    nodeSeparator: $scope.nodeSeparator,
                    pathNodes: $scope.pathNodes,
                    q: $scope.q,
                    v: $scope.v,
                    target: $scope.target,
                    text: $scope.text,
                    toNav: $scope.toNav,
                    trailingSegments: $scope.trailingSegments
                }, true));
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
                window.console.debug(angular.toJson({
                    activity: "app.snNavLinkController#$scope$watchGroup()=>listener: Updated scope",
                    effectiveHRef: $scope.effectiveHRef,
                    hasLink: $scope.hasLink,
                    href: $scope.href,
                    leadingSegments: $scope.leadingSegments,
                    absHlinkIndexRef: $scope.linkIndex,
                    nodeSeparator: $scope.nodeSeparator,
                    pathNodes: $scope.pathNodes,
                    q: $scope.q,
                    v: $scope.v,
                    target: $scope.target,
                    text: $scope.text,
                    toNav: $scope.toNav,
                    trailingSegments: $scope.trailingSegments
                }, true));
            });
        }
        $onInit() { }
    }
    app.snNavLinkController = snNavLinkController;
    window.console.debug("Creating directive " + app.DIRECTIVE_NAME_snNavLink);
    app.appModule.directive(app.DIRECTIVE_NAME_snNavLink, () => {
        window.console.debug("Returning directive " + app.DIRECTIVE_NAME_snNavLink);
        return {
            restrict: "E",
            controller: ['$scope', snNavLinkController],
            scope: { href: "@?", hrefModel: "=?", toNav: "@?", target: "@?", pathNodes: "@?", nodeSeparator: "@?", linkIndex: "@?" },
            replace: true,
            template: '<samp class="navPath"><span ng-repeat="s in leadingSegments"><var>{{s}}</var> &rArr; </span><a:config-link ng-show="hasLink" base="sn" href="{{effectiveHRef}}" q="{{q}}" v="{{v}}" target="{{target}}"><var class="targetName">{{text}}</var></a:config-link><var ng-hide="hasLink" class="targetName">{{text}}</var><span ng-repeat="s in trailingSegments"> &rArr; <var>{{s}}</var></span></samp>'
        };
    });
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
    // #region notificationMessageService
    let NotificationMessageType;
    (function (NotificationMessageType) {
        NotificationMessageType[NotificationMessageType["error"] = 0] = "error";
        NotificationMessageType[NotificationMessageType["warning"] = 1] = "warning";
        NotificationMessageType[NotificationMessageType["info"] = 2] = "info";
    })(NotificationMessageType = app.NotificationMessageType || (app.NotificationMessageType = {}));
    class NotificationMessageService {
        constructor($log) {
            this.$log = $log;
            this._messages = [];
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
    app.NotificationMessageService = NotificationMessageService;
    app.appModule.factory("notificationMessageService", ["$log", NotificationMessageService]);
    // #endregion
})(app || (app = {}));
//# sourceMappingURL=app.js.map