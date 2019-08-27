/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />

namespace persistentStorageLoaderService {
    /**
     * Defines the service name as "persistentStorageLoader".
     * @export
     * @constant {string}
     */
    export const SERVICE_NAME: string = "persistentStorageLoader";

    /**
     * The session storage key used by the {@link Service} for storing URL configuration information.
     * @export
     * @constant {string}
     */
    export const STORAGEKEY_URL_CONFIG_SETTINGS: string = "UrlConfig";

    class SessionStorageEntryEnumerator implements IterableIterator<[string, string]> {
        private _index: number = 0;

        constructor(private _window: ng.IWindowService, private _keys: string[]) {
            _window.console.log(angular.toJson({
                activity: "persistentStorageLoaderService.SessionStorageEntryEnumerator#constructor invoked",
                arguments: sys.asArray(arguments)
            }));
        }

        [Symbol.iterator](): IterableIterator<[string, string]> { return this; }

        next(): IteratorResult<[string, string]> {
            if (this._window.persistentStorageLegacy.length !== this._keys.length)
                this._index = this._keys.length;
            else if (this._index < this._keys.length) {
                try {
                    let key: string = this._keys[this._index];
                    let value: string = this._window.persistentStorageLegacy.getItem(key);
                    if (sys.notNil(value))
                        return { done: false, value: [key, value] };
                    this._index = this._keys.length;
                } catch { this._index = this._keys.length; }
            }
            return { done: true, value: undefined };
        }
    }

    class SessionStorageValueEnumerator implements IterableIterator<string> {
        private _index: number = 0;

        constructor(private _window: ng.IWindowService, private _keys: string[]) {
            _window.console.log(angular.toJson({
                activity: "persistentStorageLoaderService.SessionStorageValueEnumerator#constructor invoked",
                arguments: sys.asArray(arguments)
            }));
        }

        [Symbol.iterator](): IterableIterator<string> { return this; }

        next(): IteratorResult<string> {
            if (this._window.persistentStorageLegacy.length !== this._keys.length)
                this._index = this._keys.length;
            else if (this._index < this._keys.length) {
                try {
                    let value: string = this._window.persistentStorageLegacy.getItem(this._keys[this._index]);
                    if (sys.notNil(value))
                        return { done: false, value: value };
                    this._index = this._keys.length;
                } catch { this._index = this._keys.length; }
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
    export class Service implements Map<string, string>  {
        private _allKeys: string[];
        private _parsedKeys: string[];
        private _parsedObjects: (any | null | undefined)[];
        [Symbol.toStringTag]: string;

        /**
         * The number of settings values being stored.
         * @readonly
         * @type {number}
         * @memberof Service
         */
        get size(): number { return this.$window.sessionStorage.length; }

        constructor(private $window: ng.IWindowService) {
            $window.console.log(angular.toJson({
                activity: "persistentStorageLoaderService.Service#constructor invoked",
                arguments: sys.asArray(arguments)
            }))
            this[Symbol.toStringTag] = SERVICE_NAME;
            this.check(true);
        }

        private check(forceRefresh: boolean = false) {
            if (!forceRefresh && this.$window.sessionStorage.length == this._allKeys.length)
                return;
            this._allKeys = [];
            this._parsedKeys = [];
            this._parsedObjects = [];
            for (let i: number = 0; i < this.$window.sessionStorage.length; i++)
                this._allKeys.push(this.$window.sessionStorage.key(i));
        }

        clear(): void {
            this.$window.sessionStorage.clear();
            this._allKeys = [];
            this._parsedKeys = [];
            this._parsedObjects = [];
        }

        delete(key: string): boolean {
            this.check();
            this.$window.sessionStorage.removeItem(key);
            let i: number = this._parsedKeys.indexOf(key);
            if (i < 0)
                return false;
            if (i == 0) {
                this._parsedKeys.shift();
                this._parsedObjects.shift();
            } else if (i == (this._parsedKeys.length - 1)) {
                this._parsedKeys.pop();
                this._parsedObjects.pop();
            } else {
                this._parsedKeys.splice(i, 1);
                this._parsedObjects.splice(i, 1);
            }
        }

        entries(): IterableIterator<[string, string]> { return new SessionStorageEntryEnumerator(this.$window, this._allKeys); }
        [Symbol.iterator](): IterableIterator<[string, string]> { return this.entries(); }

        forEach(callbackfn: (value: string, key: string, map: Service) => void, thisArg?: any): void {
            this.check();
            if (typeof (thisArg) === "undefined")
                this._allKeys.forEach((key: string, index: number) => {
                    if (index < this._allKeys.length && this._allKeys[index] === key) {
                        let value: string | undefined;
                        try { value = this.$window.sessionStorage.getItem(key); } catch { /* okay to ignore */ }
                        if (sys.notNil(value))
                            callbackfn(value, key, this);
                    }
                }, this);
            else
                this._allKeys.forEach((key: string, index: number) => {
                    if (index < this._allKeys.length && this._allKeys[index] === key) {
                        let value: string | undefined;
                        try { value = this.$window.sessionStorage.getItem(key); } catch { /* okay to ignore */ }
                        if (sys.notNil(value))
                            callbackfn.call(thisArg, value, key, this);
                    }
                }, this);
        }

        get(key: string): string | null {
            this.check();
            try {
                if (this._allKeys.indexOf(key) > -1)
                    return this.$window.sessionStorage.getItem(key);
            } catch { /* okay to ignore */ }
            return null;
        }

        getKeys(): string[] {
            this.check();
            return Array.from(this._allKeys);
        }

        getObject<T>(key: string): T | undefined {
            this.check();
            let i: number = this._parsedKeys.indexOf(key);
            if (i > -1)
                return <T>this._parsedObjects[i];
            try {
                let json: string = this.$window.sessionStorage.getItem(key);
                if (!sys.isNilOrEmpty(json)) {
                    let result: T | undefined;
                    if (json !== "undefined")
                        result = <T>(ng.fromJson(json));
                    this._parsedKeys.push(key);
                    this._parsedObjects.push(result);
                    return result;
                }
            } catch { }
        }

        has(key: string): boolean {
            this.check();
            return this._allKeys.indexOf(key) > -1;
        }

        keys(): IterableIterator<string> {
            this.check();
            return Array.from(this._allKeys).values();
        }

        set(key: string, value: string): any | undefined {
            try {
                if (sys.isNil(value))
                    this.$window.sessionStorage.removeItem(key);
                else
                    this.$window.sessionStorage.setItem(key, value);
                let i: number = this._parsedKeys.indexOf(key);
                if (i == 0) {
                    this._parsedKeys.shift();
                    this._parsedObjects.shift();
                } else if (i == (this._parsedKeys.length - 1)) {
                    this._parsedKeys.pop();
                    this._parsedObjects.pop();
                } else if (i < this._parsedKeys.length) {
                    this._parsedKeys.splice(i, 1);
                    this._parsedObjects.splice(i, 1);
                }
            } catch (e) { return e; }
        }

        setObject<T>(key: string, value: T | undefined): any | undefined {
            try {
                if (typeof value === "undefined")
                    this.$window.sessionStorage.setItem(key, "undefined");
                else
                    this.$window.sessionStorage.setItem(key, angular.toJson(value, false));
                let i: number = this._parsedKeys.indexOf(key);
                if (i < 0) {
                    this._parsedKeys.push(key);
                    this._parsedObjects.push(value);
                } else
                    this._parsedObjects[i] = value;
            } catch (e) { return e; }
        }

        values(): IterableIterator<string> { return new SessionStorageValueEnumerator(this.$window, this._allKeys); }
    }

    export function getServiceInjectable(): ng.Injectable<Function> { return ["$window", Service]; }
}

namespace appConfigLoaderService {
    /**
     * Defines the service name as "appConfigLoader".
     * @export
     * @constant {string}
     */
    export const SERVICE_NAME: string = "appConfigLoader";
    export const EVENT_NAME_SERVICENOW: string = "appConfigLoader:urlChange:sn";
    export const EVENT_NAME_GIT_SERVICE: string = "appConfigLoader:urlChange:git";
    export const EVENT_NAME_IDP: string = "appConfigLoader:urlChange:idp";

    /**
    * The default root absolute URL of the target ServiceNow instance.
    * @export
    * @constant {string}
    * @description - This MUST be an absolute URL and MUST NOT contain an explicit path (cannot end with "/"), URL query or fragment.
    */
    export const DEFAULT_URL_SERVICENOW: string = "https://inscomscd.service-now.com";

    /**
    * The default root absolute URL of the remote GIT repository service.
    * @export
    * @constant {string}
    * @description - This MUST be an absolute URL and MUST NOT contain a URL query or fragment. If this contains an explicit path (which is usually the case), the path must end with a "/".
    */
    export const DEFAULT_URL_GIT_SERVICE: string = "https://github.com/erwinel/";

    /**
     * The default root absolute URL of the SAML identity provider to be used by ServiceNow.
     * @export
     * @constant {string}
     * @description - This MUST be an absolute URL and MUST NOT contain an explicit path (cannot end with "/"), URL query or fragment.
     */
    export const DEFAULT_URL_IDP: string = "https://myidp.com";

    /**
    * Contains service URL definitions.
    * @export
    * @interface IUrlConfigSettings
    */
    export interface IUrlConfigSettings {
        /**
        * The base URL for the target ServiceNow instance.
        * @type {string}
        * @memberof IUrlConfigSettings
        */
        serviceNowUrl: string;

        /**
        * The base URL for the target remote GIT repository service.
        * @type {string}
        * @memberof IUrlConfigSettings
        */
        gitServiceUrl: string;

        /**
        * The base URL for the SAML identity provider to be used by ServiceNow.
        * @type {string}
        * @memberof IUrlConfigSettings
        */
        idpUrl: string;
    }

    /**
    * Defines the URL setting names supported by the appConfigData service.
    * @export
    * @typedef {('sn' | 'git' | 'idp')} UrlSettingsNames
    */
    export type UrlSettingsNames = 'sn' | 'git' | 'idp';

    /**
     * Defines a navigation menu item.
     * @interface INavigationDefinition
     */
    export interface INavigationDefinition {
        /**
        * Unique identifier of navigation menu item.
        *
        * @type {string}
        * @memberof INavigationDefinition
        */
        id?: string;
        /**
        * Relative target URL of navigation menu item.
        *
        * @type {string}
        * @memberof INavigationDefinition
        */
        url: string;
        /**
        * Display text for navigation menu item.
        *
        * @type {string}
        * @memberof INavigationDefinition
        */
        linkTitle: string;
        /**
        * Page title for navigation menu item.
        *
        * @type {string}
        * @memberof INavigationDefinition
        */
        pageTitle?: string;
        /**
        * Tooltip to use for navigation menu item.
        *
        * @type {string}
        * @memberof INavigationDefinition
        */
        toolTip?: string;
        /**
        * Heading text for child menu items that are displayed in the secondary navigation menu.
        *
        * @type {string}
        * @memberof INavigationDefinition
        */
        sideNavHeading?: string;
        /**
        * Child navigation menu items for the current navigation item, which gets displayed in the secondary navigation menu.
        *
        * @type {INavigationDefinition[]}
        * @memberof INavigationDefinition
        */
        items?: INavigationDefinition[];
    }

    /**
    * Represents the {@link IAppConfigJSON#navigation} property in the appConfigData.json file.
    * @interface INavigationJSON
    */
    export interface INavigationJSON {
        /**
        * CSS class names to be applied to any of the ancestor navigation menu items of the item that corresponds to the current page.
        *
        * @type {string[]}
        * @memberof INavigationJSON
        */
        currentItemClass: string[];
        /**
        * CSS class names to be applied to the navigation menu item that corresponds to the current page.
        *
        * @type {string[]}
        * @memberof INavigationJSON
        */
        selectedItemClass: string[];
        /**
        * CSS class names to be applied to the navigation menu items that do no correspond to the current page or any of its ancestor items.
        *
        * @type {string[]}
        * @memberof INavigationJSON
        */
        otherItemClass: string[];
        /**
        * Top-leve navigation menu items.
        *
        * @type {INavigationDefinition[]}
        * @memberof INavigationDefinition
        */
        items: INavigationDefinition[];
    }

    /**
     * Represents the contents of the appConfigData.json file.
     *
     * @interface IAppConfigJSON
     * @description The file represented by this interface is asynchronously loaded by the appConfigData service.
     */
    interface IAppConfigJSON extends IUrlConfigSettings {
        /**
         * Navigation menu settings.
         *
         * @type {INavigationJSON}
         * @memberof IAppConfigJSON
         */
        navigation: INavigationJSON;
    }

    const JSON_RELATIVE_URL_APPCONFIGDATA = "./appConfigData.json";

    export class Service {
        private _serviceNowUrl: URL = new URL(DEFAULT_URL_SERVICENOW);
        private _gitServiceUrl: URL = new URL(DEFAULT_URL_GIT_SERVICE);
        private _idpUrl: URL = new URL(DEFAULT_URL_GIT_SERVICE);
        private _loadNavigationSettings: ng.IPromise<INavigationJSON>;
        [Symbol.toStringTag]: string;

        static validateURL(value: URL, allowPath: boolean = false): URL | string {
            if (!(typeof value === "object" && value !== null && value instanceof URL))
                return "Value is not a URL";
            value = new URL(value.href);
            if (allowPath) {
                if (typeof value.pathname !== "string" || value.pathname.length == 0)
                    value.pathname = "/";
                else if (!value.pathname.endsWith("/"))
                    value.pathname = value.pathname + "/";
            } else if (typeof value.pathname === "string" && value.pathname.length > 0) {
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
        serviceNowUrl(value?: URL): URL {
            if (sys.isNil(value))
                return this._serviceNowUrl;
            let validated: URL | string = Service.validateURL(value);
            if (typeof validated === "string") {
                this.$log.warn(angular.toJson({
                    reason: "appConfigLoaderService.Service#serviceNowUrl: Error validating URL value",
                    message: validated,
                    value: value
                }, true));
                throw new Error(validated);
            }
            let oldValue: URL = this._serviceNowUrl;
            this.$log.debug(angular.toJson({
                reason: "appConfigLoaderService.Service#serviceNowUrl: Comparing URL values",
                oldValue: oldValue,
                value: value
            }, true));
            if (typeof oldValue !== "object" || oldValue.href !== value.href) {
                this._serviceNowUrl = value;
                this.$log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#serviceNowUrl: Broadcasting event",
                    name: EVENT_NAME_SERVICENOW,
                    newValue: value,
                    oldValue: oldValue
                }, true));
                this.$rootScope.$broadcast(EVENT_NAME_SERVICENOW, value, oldValue);
                this.$log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#serviceNowUrl: Broadcast event complete",
                    name: EVENT_NAME_SERVICENOW,
                    newValue: value,
                    oldValue: oldValue
                }, true));
            } else
                this.$log.debug("appConfigLoaderService.Service#serviceNowUrl: no change");
            return this._serviceNowUrl;
        }

        onServiceNowUrlChanged(scope: ng.IScope, cb: { (newValue: URL, oldValue: URL): void }): void;
        onServiceNowUrlChanged<T>(scope: ng.IScope, cb: { (this: T, newValue: URL, oldValue: URL): void }, thisArg: T): void;
        onServiceNowUrlChanged(scope: ng.IScope, cb: { (newValue: URL, oldValue: URL): void }, thisArg?: any): void {
            if (arguments.length > 2)
                scope.$on(EVENT_NAME_SERVICENOW, (event: ng.IAngularEvent, newValue: URL, oldValue: URL) => { cb.call(thisArg, newValue, oldValue); });
            else
                scope.$on(EVENT_NAME_SERVICENOW, (event: ng.IAngularEvent, newValue: URL, oldValue: URL) => { cb(newValue, oldValue); });
        }

        /**
        * Gets or sets the base URL for the GIT repository service being used by the target ServiceNow instance.
        *
        * @param {URL} [value] - Optionally specify new value for base URL of the GIT repository service being used by the target ServiceNow instance.
        * @returns {URL}
        * @memberof appConfigData
        * @description Changes in this value cause any callbacks specified through {@link appConfigData#onGitRepositoryUrlChanged} to be invoked.
        */
        gitServiceUrl(value?: URL): URL {
            if (sys.isNil(value))
                return this._gitServiceUrl;
            let validated: URL | string = Service.validateURL(value, true);
            if (typeof validated === "string") {
                this.$log.warn(angular.toJson({
                    reason: "appConfigLoaderService.gitServiceUrl#serviceNowUrl: Error validating URL value",
                    activity: validated,
                    value: value
                }, true));
                throw new Error(validated);
            }
            let oldValue: URL = this._gitServiceUrl;
            this.$log.debug(angular.toJson({
                reason: "appConfigLoaderService.Service#gitServiceUrl: Comparing URL values",
                oldValue: oldValue,
                value: value
            }, true));
            if (typeof oldValue !== "object" || oldValue.href !== value.href) {
                this._gitServiceUrl = value;
                this.$log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#gitServiceUrl: Broadcasting event",
                    name: EVENT_NAME_GIT_SERVICE,
                    newValue: value,
                    oldValue: oldValue
                }, true));
                this.$rootScope.$broadcast(EVENT_NAME_GIT_SERVICE, value, oldValue);
                this.$log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#gitServiceUrl: Broadcast event complete",
                    name: EVENT_NAME_GIT_SERVICE,
                    newValue: value,
                    oldValue: oldValue
                }, true));
            } else
                this.$log.debug("appConfigLoaderService.Service#gitServiceUrl: no change");
            return this._gitServiceUrl;
        }

        onGitServiceUrlChanged(scope: ng.IScope, cb: { (newValue: URL, oldValue: URL): void }): void;
        onGitServiceUrlChanged<T>(scope: ng.IScope, cb: { (this: T, newValue: URL, oldValue: URL): void }, thisArg: T): void;
        onGitServiceUrlChanged(scope: ng.IScope, cb: { (newValue: URL, oldValue: URL): void }, thisArg?: any): void {
            if (arguments.length > 2)
                scope.$on(EVENT_NAME_GIT_SERVICE, (event: ng.IAngularEvent, newValue: URL, oldValue: URL) => { cb.call(thisArg, newValue, oldValue); });
            else
                scope.$on(EVENT_NAME_GIT_SERVICE, (event: ng.IAngularEvent, newValue: URL, oldValue: URL) => { cb(newValue, oldValue); });
        }

        /**
        * Gets or sets the base URL of the Identity provider to be used by ServiceNow.
        *
        * @param {URL} [value] - Optionally specify new value for base URL of the Identity provider to be used by ServiceNow.
        * @returns {URL}
        * @memberof appConfigData
        * @description Changes in this value cause any callbacks specified through {@link appConfigData#onIdpUrlChanged} to be invoked.
        */
        idpUrl(value?: URL): URL {
            if (sys.isNil(value))
                return this._idpUrl;
            let validated: URL | string = Service.validateURL(value, true);
            if (typeof validated === "string") {
                this.$log.warn(angular.toJson({
                    reason: "appConfigLoaderService.Service#idpUrl: Error validating URL value",
                    activity: validated,
                    value: value
                }, true));
                throw new Error(validated);
            }
            let oldValue: URL = this._idpUrl;
            this.$log.debug(angular.toJson({
                reason: "appConfigLoaderService.Service#idpUrl: Comparing URL values",
                oldValue: oldValue,
                value: value
            }, true));
            if (typeof oldValue !== "object" || oldValue.href !== value.href) {
                this._idpUrl = value;
                this.$log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#idpUrl: Broadcasting event",
                    name: EVENT_NAME_IDP,
                    newValue: value,
                    oldValue: oldValue
                }, true));
                this.$rootScope.$broadcast(EVENT_NAME_IDP, value, oldValue);
                this.$log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#idpUrl: Broadcast event complete",
                    name: EVENT_NAME_IDP,
                    newValue: value,
                    oldValue: oldValue
                }, true));
            } else
                this.$log.debug("appConfigLoaderService.Service#idpUrl: no change");
            return this._idpUrl;
        }

        onIdpUrlChanged(scope: ng.IScope, cb: { (newValue: URL, oldValue: URL): void }): void;
        onIdpUrlChanged<T>(scope: ng.IScope, cb: { (this: T, newValue: URL, oldValue: URL): void }, thisArg: T): void;
        onIdpUrlChanged(scope: ng.IScope, cb: { (newValue: URL, oldValue: URL): void }, thisArg?: any): void {
            if (arguments.length > 2)
                scope.$on(EVENT_NAME_IDP, (event: ng.IAngularEvent, newValue: URL, oldValue: URL) => { cb.call(thisArg, newValue, oldValue); });
            else
                scope.$on(EVENT_NAME_IDP, (event: ng.IAngularEvent, newValue: URL, oldValue: URL) => { cb(newValue, oldValue); });
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
        createUrl(setting: UrlSettingsNames, relativeUrl?: string, queryParameter?: string, queryValue?: string): URL {
            this.$log.debug(angular.toJson({
                activity: "appConfigLoaderService.Service#createUrl invoked",
                setting: setting,
                relativeUrl: relativeUrl,
                queryParameter: queryParameter,
                queryValue: queryValue
            }, true));
            let url: URL;
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
                } else {
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

        loadNavigationSettings(): ng.IPromise<INavigationJSON> { return this._loadNavigationSettings; }

        /**
        * Creates an instance of the appConfigLoader service.
        * @param {persistentStorageLoaderService.Service} persistentStorageLoader - The persistentStorageLegacy service provider.
        * @param {ng.IHttpService} $http - The $http service provider.
        * @param {ng.ILogService} $log - The $log service provider.
        * @param {ng.IRootScopeService} $rootScope - The $root service provider.
        * @param {ng.IQService} $q - The $q service provider
        * @memberof appConfigData
        */
        constructor(persistentStorageLoader: persistentStorageLoaderService.Service, $http: ng.IHttpService, public $log: ng.ILogService, private $rootScope: ng.IRootScopeService, $q: ng.IQService) {
            $log.debug(angular.toJson({
                activity: "appConfigLoaderService.Service#constructor invoked",
                persistentStorageLoader: sys.getClassName(persistentStorageLoader),
                $http: sys.getClassName($http),
                $log: sys.getClassName($log),
                $root: sys.getClassName($rootScope),
                $q: sys.getClassName($q),
                additionalArguments: sys.skipFirst(sys.asArray(arguments), 5)
            }, true));
            this[Symbol.toStringTag] = SERVICE_NAME;
            let svc: Service = this;
            let original: IUrlConfigSettings | undefined = persistentStorageLoader.getObject<IUrlConfigSettings>(persistentStorageLoaderService.STORAGEKEY_URL_CONFIG_SETTINGS);
            if (sys.notNil(original)) {
                $log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#constructor: Loaded original " + persistentStorageLoaderService.STORAGEKEY_URL_CONFIG_SETTINGS,
                    original: original
                }, true));
                if (typeof original !== "object") {
                    $log.warn("Expected object for " + persistentStorageLoaderService.STORAGEKEY_URL_CONFIG_SETTINGS + " setting object; actual is " + (typeof original));
                    original = <IUrlConfigSettings>{};
                } else {
                    if (sys.notNil(original.serviceNowUrl)) {
                        if (typeof original.serviceNowUrl !== "string") {
                            $log.warn("Expected string for serviceNowUrl setting value; actual is " + (typeof original.serviceNowUrl));
                            original.serviceNowUrl = "";
                        }
                        else
                            try { this.serviceNowUrl(new URL(original.serviceNowUrl)); }
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
                            try { this.gitServiceUrl(new URL(original.gitServiceUrl)); }
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
                            try { this.gitServiceUrl(new URL(original.idpUrl)); }
                            catch (e) {
                                $log.error("Error parsing application setting " + name + ": " + e);
                                original.idpUrl = "";
                            }
                    }
                }
            } else
                original = <IUrlConfigSettings>{};
            $log.debug(angular.toJson({
                activity: "appConfigLoaderService.Service#constructor: Requesting application configuration data",
                url: JSON_RELATIVE_URL_APPCONFIGDATA
            }, true));
            let promise: ng.IPromise<IAppConfigJSON> = $http.get(JSON_RELATIVE_URL_APPCONFIGDATA).then((result: ng.IHttpPromiseCallbackArg<IAppConfigJSON>) => {
                $log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#constructor: Application configuration data retrieval response received",
                    headers: result.headers,
                    status: result.status,
                    statusText: result.statusText
                }, true));
                return $q((resolve: ng.IQResolveReject<IAppConfigJSON>, reject: ng.IQResolveReject<any>) => {
                    if (typeof result.data !== "object") {
                        $log.warn(angular.toJson({
                            activity: "Invalid application configuration retrieval response data",
                            data: result.data
                        }, true));
                        reject("Expected object response type, actual is " + (typeof result.data));
                    } else if (result.data == null) {
                        $log.warn("Application configuration retrieval response data was null");
                        reject("Expected object response type, actual is null");
                    } else {
                        $log.debug(angular.toJson({
                            activity: "appConfigLoaderService.Service#constructor: Accepting application configuration retrieval response data",
                            data: result.data
                        }, true));
                        resolve(result.data);
                    }
                });
            }, (reason: any) => {
                $log.error({
                    activity: "Unexpected error making application configuration data request",
                    reason: reason
                }, true);
            });
            this._loadNavigationSettings = promise.then((data: IAppConfigJSON) => {
                $log.debug(angular.toJson({
                    activity: "appConfigLoaderService.Service#loadNavigationSettings=>then invoked",
                    navigation: data.navigation
                }, true));
                return $q((resolve: ng.IQResolveReject<INavigationJSON>, reject: ng.IQResolveReject<any>) => {
                    if (typeof data.navigation !== "object") {
                        $log.warn(angular.toJson({
                            activity: "Invalid Application Navigation configuration property",
                            navigation: data.navigation
                        }, true));
                        reject("Expected object navigation property type, actual is " + (typeof data.navigation));
                    } else if (data.navigation == null) {
                        $log.warn("Application Navigation configuration property was null");
                        reject("Expected object navigation property type, actual is null");
                    } else {
                        $log.debug(angular.toJson({
                            activity: "appConfigLoaderService.Service#loadNavigationSettings=>then: Accepting Application Navigation configuration",
                            navigation: data.navigation
                        }, true));
                        resolve(data.navigation);
                    }
                });
            });
            promise.then((data: IAppConfigJSON) => {
                function applyUrlSetting(name: string, cfgValue: string, settingsValue: string, defaultValue: URL): URL {
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
                        } catch (e) {
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
                        } catch (e) {
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
                };
                let settings: IUrlConfigSettings = {
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
                    persistentStorageLoader.setObject<IUrlConfigSettings>(persistentStorageLoaderService.STORAGEKEY_URL_CONFIG_SETTINGS, settings);
                }
            });
        }
    }

    export function getServiceInjectable(): ng.Injectable<Function> { return [persistentStorageLoaderService.SERVICE_NAME, "$http", '$log', '$rootScope', '$q', Service]; }
}

namespace navConfigLoaderService {
    /**
     * Defines the service name as "navConfigLoader".
     * @export
     * @constant {string}
     */
    export const SERVICE_NAME: string = "navConfigLoader";

    /**
    * The relative path of the default page.
    * @export
    * @constant {string}
    * @description - This is for a path string only - This MUST NOT contain relative segment names ("." or ".."), URL query or fragment and MUST NOT start or end with "/".
    */
    export const DEFAULT_PAGE_PATH: string = "index.html";

    const DEFAULT_CURRENT_ITEM_CLASS: ReadonlyArray<string> = ["active", "nav-link"];
    const DEFAULT_SELECTED_ITEM_CLASS: ReadonlyArray<string> = ["active", "nav-link"];
    const DEFAULT_OTHER_ITEM_CLASS: ReadonlyArray<string> = ["nav-link"];

    /**
    * Converts a URL path to a fallback (default) page ID.
    * @static
    * @param {string} path - The URL Path to convert.
    * @returns {string} The fallback page ID for the given URL path.
    * @memberof appConfigData
    */
    export function toPageId(path: string): string {
        let arr: string[];
        let i: number;
        if (typeof path !== "string" || path.length == 0 || path == "/" || (arr = path.split("/").filter((value: string) => value.length > 0)).length === 0)
            arr = DEFAULT_PAGE_PATH.split("/").filter((value: string) => value.length > 0);
        let n: string = arr.pop();
        if ((i = n.lastIndexOf(".")) < 1 || i === n.length - 1) {
            let a: string[] = DEFAULT_PAGE_PATH.split("/").filter((value: string) => value.length > 0);
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

    /**
    * Represents a menu navigation item.
    *
    * @export
    * @class NavigationItem
    */
    export class NavigationItem {
        private _id: string;
        private _linkTitle: string;
        private _pageTitle: string;
        private _toolTip: string;
        private _sideNavHeading: string;
        private _url: string;
        private _isCurrentPage?: boolean;
        private _previousNavItem: NavigationItem | undefined;
        private _nextNavItem: NavigationItem | undefined;
        private _parentNavItem: NavigationItem | undefined;
        private _childNavItems: ReadonlyArray<NavigationItem>;

        /**
        * The unique identifier of the navigation menu item.
        *
        * @readonly
        * @type {string}
        * @memberof NavigationItem
        */
        get id(): string { return this._id; }

        /**
        * The display text for the current navigation menu item.
        *
        * @readonly
        * @type {string}
        * @memberof NavigationItem
        */
        get linkTitle(): string { return this._linkTitle; }

        /**
        * The title of the page that corresponds to the current navigation menu item.
        *
        * @readonly
        * @type {string}
        * @memberof NavigationItem
        */
        get pageTitle(): string { return this._pageTitle; }

        /**
        * The tooltip for the current navigation menu item.
        *
        * @readonly
        * @type {string}
        * @memberof NavigationItem
        */
        get toolTip(): string { return this._toolTip; }

        /**
        * The secondary navigation heading text for child navigation menu items.
        *
        * @readonly
        * @type {string}
        * @memberof NavigationItem
        */
        get sideNavHeading(): string { return this._sideNavHeading; }

        /**
        * The navigation menu hyperlink for the current item.
        *
        * @readonly
        * @type {string}
        * @memberof NavigationItem
        */
        get navMenuHref(): string { return (this.hasOrIsCurrentPage) ? "#" : this._url; }

        /**
        * The relative URL of the current navigation menu item.
        *
        * @readonly
        * @type {string}
        * @memberof NavigationItem
        */
        get url(): string { return this._url; }

        /**
        * Indicates whether the current navigation menu item represents the current page.
        *
        * @readonly
        * @type {boolean}
        * @memberof NavigationItem
        */
        get isCurrentPage(): boolean { return this._isCurrentPage === true; }

        /**
        * Indicates whether the current navigation menu item represents the current page or the parent of the current page.
        *
        * @readonly
        * @type {boolean}
        * @memberof NavigationItem
        */
        get hasOrIsCurrentPage(): boolean { return typeof this._isCurrentPage === "boolean"; }

        /**
        * Indicates whether the current navigation menu item represents an ancestor of the current page.
        *
        * @readonly
        * @type {boolean}
        * @memberof NavigationItem
        */
        get hasCurrentPage(): boolean { return this._isCurrentPage === false; }

        /**
        * The CSS class names to be applied to the anchor tag.
        *
        * @readonly
        * @type {ReadonlyArray<string>}
        * @memberof NavigationItem
        */
        get anchorCssClass(): ReadonlyArray<string> { return (this.isCurrentPage) ? this._appConfigData.currentItemClass() : ((this.hasOrIsCurrentPage) ? this._appConfigData.selectedItemClass() : this._appConfigData.otherItemClass()); }

        /**
        * The child navigation menu items to display within the secondary navigation menu.
        *
        * @readonly
        * @type {ReadonlyArray<NavigationItem>}
        * @memberof NavigationItem
        */
        get childNavItems(): ReadonlyArray<NavigationItem> { return this._childNavItems; }

        /**
        * Indicates whether the current navigation menu item has child menu items.
        *
        * @readonly
        * @type {boolean}
        * @memberof NavigationItem
        */
        get hasChildNavItem(): boolean { return this._childNavItems.length > 0; }

        /**
        * Indicates whether the current navigation menu item has sibling items that share the same parent menu item.
        *
        * @readonly
        * @type {boolean}
        * @memberof NavigationItem
        */
        get hasSiblingNavItem(): boolean { return sys.notNil(this._previousNavItem) || sys.notNil(this._nextNavItem); }

        /**
        * Indicates whether the current navigation menu item is a child item of another.
        *
        * @readonly
        * @type {boolean}
        * @memberof NavigationItem
        */
        get isNestedNavItem(): boolean { return sys.notNil(this._parentNavItem) }

        /**
        * Navigation menu items to be displayed as nested items within the secondary navigation menu.
        *
        * @readonly
        * @type {ReadonlyArray<NavigationItem>}
        * @memberof NavigationItem
        */
        get nestedSideNavChildItems(): ReadonlyArray<NavigationItem> { return (this.showNestedSideNavChildItems) ? this._childNavItems : []; }

        /**
        * Indicates whether the current navigation menu item represents the current page, is being displayed within the secondary navigation menu, and has child items.
        *
        * @readonly
        * @type {boolean}
        * @memberof NavigationItem
        */
        get showNestedSideNavChildItems(): boolean { return this.isCurrentPage && this.isNestedNavItem && this.hasChildNavItem && !this.hasSiblingNavItem; }

        /**
        * Gets the parent navigation menu item.
        *
        * @readonly
        * @type {(NavigationItem | undefined)}
        * @memberof NavigationItem
        */
        get parentNavItem(): NavigationItem | undefined { return this._parentNavItem; }

        /**
        * Creates an instance of NavigationItem.
        *
        * @param {appConfigDataService} _appConfigData - The appConfigData service provider.
        * @param {INavigationDefinition} navDef - The navigation menu item definition.
        * @memberof NavigationItem
        */
        constructor(private _appConfigData: Service, navDef: appConfigLoaderService.INavigationDefinition) {
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
            this._childNavItems.forEach((item: NavigationItem) => { item._parentNavItem = this; }, this);
            if (this.isCurrentPage)
                this.getAncestorNavItems().forEach((item: NavigationItem) => { item._isCurrentPage = false; });
        }

        /**
        * Gets preceding sibling items for the current menu navigation item.
        *
        * @returns {NavigationItem[]}
        * @memberof NavigationItem
        */
        precedingSiblings(): NavigationItem[] {
            if (typeof this._previousNavItem === "undefined")
                return [];
            let result: NavigationItem[] = this._previousNavItem.precedingSiblings();
            result.push(this._previousNavItem);
            return result;
        }

        /**
        * Gets following sibling items for the current menu navigation item.
        *
        * @returns {NavigationItem[]}
        * @memberof NavigationItem
        */
        followingSiblings(): NavigationItem[] {
            let result: NavigationItem[] = [];
            for (let i: NavigationItem = this._nextNavItem; typeof i !== "undefined"; i = i._nextNavItem)
                result.push(i);
            return result;
        }

        /**
        * Gets all ancestor navigation menu items.
        *
        * @returns {NavigationItem[]}
        * @memberof NavigationItem
        */
        getAncestorNavItems(): NavigationItem[] {
            let result: NavigationItem[] = [];
            for (let i: NavigationItem = this._parentNavItem; typeof i !== "undefined"; i = i._parentNavItem)
                result.unshift(i);
            return result;
        }

        /**
        * Gets ancestor navigation menu items that do not appear in the primary navigation menu.
        *
        * @returns {NavigationItem[]}
        * @memberof NavigationItem
        */
        getBreadcrumbLinks(): NavigationItem[] {
            let result: NavigationItem[] = [];
            if (sys.notNil(this._parentNavItem) && sys.notNil(this._parentNavItem._parentNavItem))
                for (let i: NavigationItem = this._parentNavItem; typeof i !== "undefined"; i = i._parentNavItem)
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
        onClick(event?: BaseJQueryEventObject): void {
            if (this.isCurrentPage && sys.notNil(event)) {
                if (!event.isDefaultPrevented)
                    event.preventDefault();
                if (!event.isPropagationStopped)
                    event.stopPropagation();
            }
        }

        toJSON(): { [key: string]: any } {
            return {
                childNavItems: (typeof this._childNavItems === "object" && this._childNavItems !== null) ? this._childNavItems.map((item: NavigationItem) => item.toJSON()) : this._childNavItems,
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
        static createNavItems(appConfigData: Service, items?: appConfigLoaderService.INavigationDefinition[]): NavigationItem[] {
            if (typeof items !== "object" || items === null)
                return [];
            let result: NavigationItem[] = items.filter((value: appConfigLoaderService.INavigationDefinition) => typeof value === "object" && value !== null).map((value: appConfigLoaderService.INavigationDefinition) => new NavigationItem(appConfigData, value));
            if (result.length > 0) {
                let previous: NavigationItem = result[0];
                for (let i: number = 1; i < result.length; i++)
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
        static findCurrentItem(items: ReadonlyArray<NavigationItem>): NavigationItem | undefined {
            if (items.length == 0)
                return undefined;
            if (items.length == 1)
                return (items[0].isCurrentPage) ? items[0] : this.findCurrentItem(items[0]._childNavItems);
            for (let i: number = 0; i < items.length; i++) {
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
        static createSideNavBreadcrumbItems(current?: NavigationItem): ReadonlyArray<NavigationItem> {
            if (typeof current === "undefined" || typeof current._parentNavItem === "undefined")
                return [];
            let result: NavigationItem[] = [];
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
        static createSideNavSiblingItems(current?: NavigationItem): ReadonlyArray<NavigationItem> {
            if (typeof current === "undefined" || typeof current._parentNavItem === "undefined")
                return [];
            let result: NavigationItem[] = [current];
            if (typeof current._previousNavItem === "undefined") {
                if (typeof current._nextNavItem === "undefined")
                    return [];
            } else
                for (let item: NavigationItem | undefined = current._previousNavItem; typeof item != "undefined"; item = item._previousNavItem)
                    result.unshift(item);
            for (let item: NavigationItem | undefined = current._nextNavItem; typeof item != "undefined"; item = item._nextNavItem)
                result.push(item);
            return result;
        }
    }

    export class Service {
        private _currentPageId: string;
        private _currentPageURL: URL;
        private _relativePagePath: string;
        private _pageTitle: string;
        private _currentItemClass: string[] = <string[]>DEFAULT_CURRENT_ITEM_CLASS;
        private _selectedItemClass: string[] = <string[]>DEFAULT_SELECTED_ITEM_CLASS;
        private _otherItemClass: string[] = <string[]>DEFAULT_OTHER_ITEM_CLASS;
        private _loadTopNavItems: ng.IPromise<NavigationItem[]>;
        private _loadPageTitle: ng.IPromise<string>;
        private _loadCurrentItem: ng.IPromise<NavigationItem | undefined>;
        [Symbol.toStringTag]: string;

        /**
        * Gets the current page ID.
        *
        * @returns {string} The value of the "content" attribute for the html meta tag with the name attribute of "app:pageId".
        * @memberof navConfigLoaderService.Service
        */
        currentPageId(): string { return this._currentPageId; }

        /**
        * Gets relative path to the current page.
        *
        * @returns {string}
        * @memberof navConfigLoaderService.Service
        */
        pagePath(): string { return this._relativePagePath; }

        /**
        * Gets the CSS class names to apply to navigation menu items that are ancestors of the item that represents the current page.
        *
        * @returns {string[]}
        * @memberof navConfigLoaderService.Service
        */
        currentItemClass(): string[] { return this._currentItemClass; }

        /**
        * Gets the CSS class names to apply to the navigation menu item that represents the current page.
        *
        * @returns {string[]}
        * @memberof navConfigLoaderService.Service
        */
        selectedItemClass(): string[] { return this._selectedItemClass; }

        /**
        * Gets the CSS class names to apply to the navigation menu item that do not represent the current page or any of its ancestors.
        *
        * @returns {string[]}
        * @memberof navConfigLoaderService.Service
        */
        otherItemClass(): string[] { return this._otherItemClass; }

        /**
        * Gets the navigation menu items that appear in the primary navigation menu.
        *
        * @returns {ng.IPromise<NavigationItem[]>}
        * @memberof navConfigLoaderService.Service
        */
        loadTopNavItems(): ng.IPromise<NavigationItem[]> { return this._loadTopNavItems; }

        loadPageTitle(): ng.IPromise<string> { return this._loadPageTitle; }

        loadCurrentItem(): ng.IPromise<NavigationItem | undefined> { return this._loadCurrentItem; }

        constructor(appConfigLoader: appConfigLoaderService.Service, $window: ng.IWindowService, $document: ng.IDocumentService, $q: ng.IQService) {
            appConfigLoader.$log.debug(angular.toJson({
                activity: "navConfigLoaderService.Service#constructor invoked",
                appConfigLoader: sys.getClassName(appConfigLoader),
                $window: sys.getClassName($window),
                $document: sys.getClassName($document),
                $q: sys.getClassName($q),
                additionalArguments: sys.skipFirst(sys.asArray(arguments), 4)
            }, true));
            this[Symbol.toStringTag] = SERVICE_NAME;
            let headElement: JQuery = $document.find('head').first();
            let titleElement: JQuery = headElement.find('title');
            if (titleElement.length == 0) {
                appConfigLoader.$log.debug("navConfigLoaderService.Service#constructor: Adding title element to document head");
                headElement.add(titleElement = $('<title></title>'));
                this._pageTitle = "";
            } else {
                this._pageTitle = titleElement.text().trim();
                appConfigLoader.$log.debug(angular.toJson({
                    activity: "navConfigLoaderService.Service#constructor: Got page title",
                    title: this._pageTitle
                }, true));
            }
            try { this._currentPageURL = new URL($window.location.href); } catch {
                // Just in case
                this._currentPageURL = new URL("http://localhost");
                this._currentPageURL.pathname = DEFAULT_PAGE_PATH;
            }
            let segments: string[] = (typeof this._currentPageURL.pathname !== "string" || this._currentPageURL.pathname.length == 0 || this._currentPageURL.pathname == "/") ? [] : this._currentPageURL.pathname.split("/").filter((n: string) => n.length > 0);
            if (segments.length == 0)
                segments = DEFAULT_PAGE_PATH.split("/");
            else if (!(/\.html?$/i).test(segments[segments.length - 1])) {
                let arr: string[] = DEFAULT_PAGE_PATH.split("/");
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
            } else
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
            let svc: Service = this;
            appConfigLoader.$log.debug("navConfigLoaderService.Service#constructor: Loading navigation configuration");
            this._loadTopNavItems = appConfigLoader.loadNavigationSettings().then((navConfig: appConfigLoaderService.INavigationJSON) => {
                appConfigLoader.$log.debug(angular.toJson({
                    activity: "navConfigLoaderService.Service#loadTopNavItems=>then invoked",
                    navConfig: navConfig
                }, true));
                return $q((resolve: ng.IQResolveReject<NavigationItem[]>, reject: ng.IQResolveReject<any>) => {
                    if (typeof navConfig.items !== "object") {
                        appConfigLoader.$log.warn("Invalid navigation configuration items property type");
                        reject("Expected object items property type; actual is " + (typeof navConfig.items));
                    } else if (navConfig.items === null) {
                        appConfigLoader.$log.warn("Navigation configuration items property is null");
                        reject("Expected object items property type; actual is null");
                    } else if (Array.isArray(navConfig.items)) {
                        let items: appConfigLoaderService.INavigationDefinition[] = navConfig.items.filter((i: appConfigLoaderService.INavigationDefinition) => { return (typeof i === "object" && i !== null); });
                        if (items.length == 0) {
                            appConfigLoader.$log.warn("Navigation configuration items property is empty");
                            reject("Items property is empty.");
                        }
                        else
                            try {
                                appConfigLoader.$log.debug("navConfigLoaderService.Service#loadTopNavItems=>then: Accepting navigation configuration items");
                                resolve(NavigationItem.createNavItems(svc, items));
                            } catch (e) {
                                appConfigLoader.$log.error(angular.toJson({
                                    reason: "Unexpected error importing navigation configuration items",
                                    error: e
                                }, true));
                                reject(e);
                            }
                    } else {
                        appConfigLoader.$log.warn("Navigation configuration items property is not an array");
                        reject("Items property is not an array");
                    }
                });
            });
            this._loadCurrentItem = this._loadTopNavItems.then((items: NavigationItem[]) => {
                appConfigLoader.$log.debug("navConfigLoaderService.Service#loadCurrentItem=>then Invoked");
                return NavigationItem.findCurrentItem(items);
            });
            this._loadPageTitle = this._loadCurrentItem.then((item: NavigationItem | undefined) => {
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
                } else if (this._pageTitle.trim() === titleElement.text().trim()) {
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
    }

    export function getServiceInjectable(): ng.Injectable<Function> { return [appConfigLoaderService.SERVICE_NAME, '$window', '$document', '$q', Service]; }
}

namespace appModalPopupService {
    /**
     * Defines the service name as "appModalPopup".
     * @export
     * @constant {string}
    */
    export const SERVICE_NAME: string = "appModalPopup";
    export const DIRECTIVE_NAME: string = "appModalPopupDialog";
    export const JQUERY_SELECTOR_DIALOG: string = "#appModalPopupDialog";

    /**
    * Severity of message for the modal dialog.
    * @typedef {('info' | 'warning' | 'danger' | 'primary' | 'success')} DialogMessageType
    */
    export type DialogMessageType = 'info' | 'warning' | 'danger' | 'primary' | 'success';

    /**
    * Defines a button to be displayed in a modal popup dialog.
    *
    * @export
    * @interface IPopupDialogButtonDefinition
    * @template T The type of value returned when the associated button is clicked.
    */
    export interface IPopupDialogButtonDefinition<T> {
        /**
        * Value to be returned when the associated button is clicked.
        *
        * @type {T}
        * @memberof IPopupDialogButtonDefinition
        */
        value?: T;

        /**
        * The text to be displayed for the button.
        *
        * @type {string}
        * @memberof IPopupDialogButtonDefinition
        */
        displayText: string;
        isDefault?: boolean;
    }

    interface IPopupDialogButtonConfig extends IPopupDialogButtonDefinition<any> {
        class: string[];
        closePopupDialog(event: BaseJQueryEventObject): void;
    }

    interface IDirectiveScope {
        title: string;
        class: string[];
        message: string;
        buttons: IPopupDialogButtonConfig[];
        closePopupDialog(event: BaseJQueryEventObject, value?: any): void;
    }

    export class Service {
        private _isVisible: boolean = false;
        private _type: DialogMessageType = "info";
        private _onClose?: Function;
        private _thisObj?: any;
        private _hasThis: boolean = false;
        private _scope: IDirectiveScope;
        [Symbol.toStringTag]: string;
        constructor(public appConfigLoader: appConfigLoaderService.Service, $window: ng.IWindowService, $document: ng.IDocumentService, $q: ng.IQService) {
            appConfigLoader.$log.debug(angular.toJson({
                activity: "appModalPopupService.Service#constructor invoked",
                appConfigLoader: sys.getClassName(appConfigLoader),
                $window: sys.getClassName($window),
                $document: sys.getClassName($document),
                $q: sys.getClassName($q),
                additionalArguments: sys.skipFirst(sys.asArray(arguments), 4)
            }, true));
            this[Symbol.toStringTag] = SERVICE_NAME;
            let svc: Service = this;
            this._scope = { buttons: [], class: [], closePopupDialog: (event: BaseJQueryEventObject) => { svc.closePopupDialog(); }, message: "", title: "" };
        }

        showPopupDialog(message: string, type?: DialogMessageType, title?: string): void;
        showPopupDialog(message: string, onClose: Function, type?: DialogMessageType, title?: string): void;
        showPopupDialog<T>(message: string, onClose: { (this: T): void }, type: DialogMessageType | null | undefined, title: string | null | undefined, thisObj: T): void;
        showPopupDialog<T>(message: string, onClose: { (result: T): void }, buttons: IPopupDialogButtonDefinition<T>[], type?: DialogMessageType, title?: string): void;
        showPopupDialog<TResult, TThis>(message: string, onClose: { (this: TThis, result: TResult): void }, buttons: IPopupDialogButtonDefinition<TResult>[], type: DialogMessageType | null | undefined, title: string | null | undefined, thisObj: TThis): void;
        showPopupDialog(message: string, arg1?: Function | string, arg2?: IPopupDialogButtonDefinition<any>[] | string | null | undefined, arg3?: string, arg4?: any, thisObj?: any): void {
            this.appConfigLoader.$log.debug(angular.toJson({
                activity: "appModalPopupService.Service#showPopupDialog invoked",
                arguments: sys.asArray(arguments)
            }, true));
            let title: string;
            let buttons: IPopupDialogButtonDefinition<any>[];
            if (this._isVisible) {
                this.appConfigLoader.$log.debug("appModalPopupService.Service#showPopupDialog: closing popup dialog");
                this.closePopupDialog();
            }
            this._type = "info";
            this._onClose = undefined;
            if (arguments.length < 2 || typeof arg1 === "string") {
                this._type = <DialogMessageType>arg1;
                title = <string>arg2;
                this._hasThis = false;
            } else if (arguments.length > 5) {
                this._onClose = <Function>arg1;
                buttons = <IPopupDialogButtonDefinition<any>[]>arg2;
                this._type = <DialogMessageType>arg3;
                title = <string>arg4;
                this._hasThis = true;
                this._thisObj = thisObj;
            } else {
                this._onClose = <Function>arg1;
                if (arguments.length < 3 || typeof arg2 === "string" || sys.isNil(arg2)) {
                    this._type = <DialogMessageType>arg2;
                    title = <string>arg3;
                    thisObj = arg4;
                    this._hasThis = (arg2.length == 5);
                } else {
                    this._type = <DialogMessageType>arg3;
                    title = <string>arg4;
                    buttons = <IPopupDialogButtonDefinition<any>[]>arg2;
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
            } else
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
            let svc: Service = this;
            if (sys.isNil(buttons) || (buttons = buttons.filter((value: IPopupDialogButtonDefinition<any>) => sys.notNil)).length == 0)
                this._scope.buttons = [{
                    displayText: "OK", isDefault: false, closePopupDialog: (event: BaseJQueryEventObject) => {
                        sys.preventEventDefault(event, true);
                        svc._closePopupDialog();
                    }, class: ["btn", "btn-primary"]
                }];
            else {
                let hasDefault: boolean = false;
                this._scope.buttons = buttons.map((value: IPopupDialogButtonDefinition<any>) => {
                    if (hasDefault)
                        return {
                            displayText: value.displayText, value: value.value, isDefault: false, closePopupDialog: (event: BaseJQueryEventObject) => {
                                sys.preventEventDefault(event, true);
                                svc._closePopupDialog(value.value);
                            }, class: ["btn", "btn-secondary"]
                        };
                    hasDefault = value.isDefault === true;
                    return {
                        displayText: value.displayText, value: value.value, isDefault: hasDefault, closePopupDialog: (event: BaseJQueryEventObject) => {
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
            $(JQUERY_SELECTOR_DIALOG).modal('show');
        }
        private _closePopupDialog(value?: any): void {
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
            $(JQUERY_SELECTOR_DIALOG).modal('hide');
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
                } else {
                    this.appConfigLoader.$log.debug(angular.toJson({
                        activity: "appModalPopupService.Service#_closePopupDialog: Invoking callback",
                        arguments: []
                    }, true));
                    this._onClose();
                }
            } else if (this._hasThis) {
                this.appConfigLoader.$log.debug(angular.toJson({
                    activity: "appModalPopupService.Service#_closePopupDialog: Invoking callback",
                    thisObj: sys.getClassName(this._thisObj),
                    arguments: [value]
                }, true));
                this._onClose.call(this._thisObj, value);
            } else {
                this.appConfigLoader.$log.debug(angular.toJson({
                    activity: "appModalPopupService.Service#_closePopupDialog: Invoking callback",
                    arguments: [value]
                }, true));
                this._onClose(value);
            }
            this.appConfigLoader.$log.debug("appModalPopupService.Service#_closePopupDialog: Callback invoked");
        }

        closePopupDialog(value?: any): void {
            this.appConfigLoader.$log.debug("appModalPopupService.Service#closePopupDialog invoked");
            if (this._isVisible) {
                if (arguments.length == 0) {
                    let btn: IPopupDialogButtonConfig[] = this._scope.buttons.filter((value: IPopupDialogButtonConfig) => value.isDefault);
                    if (btn.length == 0)
                        this._closePopupDialog();
                    else
                        this._closePopupDialog(btn[0].value);
                }
                else
                    this._closePopupDialog(value);
            } else
                this.appConfigLoader.$log.debug("appModalPopupService.Service#closePopupDialog: Popup dialog already closed");
        }

        static getDirectiveInjectable(): ng.Injectable<ng.IDirectiveFactory> {
            window.console.debug("Returning directive " + DIRECTIVE_NAME);
            return [SERVICE_NAME, (appModalPopup: Service) => <ng.IDirective>{
                restrict: "E",
                link: (scope: IDirectiveScope & ng.IScope, element: JQuery, attrs: ng.IAttributes) => {
                    appModalPopup.appConfigLoader.$log.debug(angular.toJson({
                        activity: "appModalPopupService." + DIRECTIVE_NAME + "#link invoked",
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
                templateUrl: "Template/" + SERVICE_NAME + ".htm"
            }];
        }
    }

    export function getServiceInjectable(): ng.Injectable<Function> { return [appConfigLoaderService.SERVICE_NAME, '$window', '$document', '$q', Service]; }
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
    export let appModule: ng.IModule = angular.module("app", []);

    window.console.debug("Creating service " + persistentStorageLoaderService.SERVICE_NAME);
    appModule.service(persistentStorageLoaderService.SERVICE_NAME, persistentStorageLoaderService.getServiceInjectable());
    window.console.debug("Creating service " + appConfigLoaderService.SERVICE_NAME);
    appModule.service(appConfigLoaderService.SERVICE_NAME, appConfigLoaderService.getServiceInjectable());
    window.console.debug("Creating service " + navConfigLoaderService.SERVICE_NAME);
    appModule.service(navConfigLoaderService.SERVICE_NAME, navConfigLoaderService.getServiceInjectable());
    window.console.debug("Creating service " + appModalPopupService.SERVICE_NAME);
    appModule.service(appModalPopupService.SERVICE_NAME, appModalPopupService.getServiceInjectable());
    window.console.debug("Creating directive " + appModalPopupService.DIRECTIVE_NAME);
    appModule.directive(appModalPopupService.DIRECTIVE_NAME, appModalPopupService.Service.getDirectiveInjectable());

    // #region Constants

    const DEFAULT_CURRENT_ITEM_CLASS: ReadonlyArray<string> = ["active", "nav-link"];
    const DEFAULT_SELECTED_ITEM_CLASS: ReadonlyArray<string> = ["active", "nav-link"];
    const DEFAULT_OTHER_ITEM_CLASS: ReadonlyArray<string> = ["nav-link"];

    /**
     *
     * @export
     * @enum {string}
     */
    export enum cssValidationClass {
        isValid = 'is-valid',
        isInvalid = 'is-invalid'
    }

    /**
     *
     *
     * @export
     * @enum {string}
     */
    export enum cssFeedbackClass {
        isValid = 'valid-feedback',
        isInvalid = 'invalid-feedback'
    }

    /**
     *
     *
     * @export
     * @enum {string}
     */
    export enum cssAlertClass {
        alert = 'alert',
        danger = 'alert-danger',
        dark = 'alert-dark',
        dismissible = 'alert-dismissible',
        info = 'alert-info',
        heading = 'alert-heading',
        light = 'alert-light',
        link = 'alert-link',
        primary = 'alert-primary',
        secondary = 'alert-secondary',
        success = 'alert-success',
        warning = 'alert-warning'
    }

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
    export const DIRECTIVE_NAME_urlInputDirective: string = "urlInput";

    /**
     * Attributes that can be used with the urlInput directive.
     *
     * @export
     * @interface IDirectiveAttributes
     * @example <caption>Example of a required URL.</caption>
     * ```
     * <!-- Where gitRepositoryUrl == "https://yourinstance.servicenow.com" -->
     * <url-input ng-model="serviceNowUrl" is-valid="gitUrlIsValid" required="true" label-text="ServiceNow URL" />
     * <!-- Model gitUrlIsValid will be set to true and transpiled code will be: -->
     * <label for="urlInput:0">ServiceNow URL</label>
     * <input type="text" class="valid-feedback" id="urlInput:0" value="https://yourinstance.servicenow.com" />
     * ```
     * @example <caption>Example of a required URL that is initially empty.</caption>
     * ```
     * <!-- Where gitRepositoryUrl == "" -->
     * <url-input ng-model="serviceNowUrl" is-valid="gitUrlIsValid" required="true" label-text="ServiceNow URL" />
     * <!-- Model gitUrlIsValid will be set to false and transpiled code will be: -->
     * <label for="urlInput:0">ServiceNow URL</label>
     * <input type="text" class="invalid-feedback" id="urlInput:0" value="" />
     * <div class="alert alert-warning">URL not provided.</div>
     * ```
     */
    export interface IUrlInputDirectiveAttributes {
        /**
         * Model containing validated URL.
         *
         * @type {string}
         * @memberof IDirectiveAttributes
         */
        textModel: string,

        /**
         * Indicates whether the content of the input text field represents a valid URL.
         *
         * @type {string}
         * @memberof IDirectiveAttributes
         */
        isValid?: boolean,

        /**
         * Indicates whether a path is allowed in the URL.
         *
         * @type {string}
         * @memberof IDirectiveAttributes
         */
        allowPath?: boolean,

        /**
         * Indicates whether a fragment (hash) is allowed in the URL.
         *
         * @type {string}
         * @memberof IDirectiveAttributes
         */
        allowFragment?: boolean,

        /**
         * Indicates whether a query string is allowed in the URL.
         *
         * @type {string}
         * @memberof IDirectiveAttributes
         */
        allowQuery?: boolean,

        /**
         * Indicates whether the URL can be relative.
         *
         * @type {string}
         * @memberof IDirectiveAttributes
         */
        allowRelative?: boolean,

        /**
         * Indicates whether the URL is required (cannot be blank).
         *
         * @type {string}
         * @memberof IDirectiveAttributes
         */
        required?: boolean,

        /**
         * The text to display for the input field label.
         *
         * @type {string}
         * @memberof IDirectiveAttributes
         */
        labelText: string,

        /**
         * The value if the id attribute of the input text field.
         *
         * @type {string}
         * @memberof IDirectiveAttributes
         */
        textBoxId?: string
    }

    interface IUrlInputDirectiveScope extends IUrlInputDirectiveAttributes, ng.IScope {
        ctrl: urlInputDirectiveController;
        text: string;
        textBoxId: string;
        inputClass: string[];
        messageClass: string[];
        validationMessage: string;
        isValid: boolean;
    }

    export class urlInputDirectiveController {
        private _isEmpty: boolean = true;
        private _invalidFormat: boolean = false;

        constructor(private $scope: IUrlInputDirectiveScope) {
            window.console.debug(angular.toJson({
                activity: "app.urlInputDirectiveController#constructor invoked",
                arguments: sys.asArray(arguments)
            }, true));
            let ctrl: urlInputDirectiveController = this;
        }

        validate(value: string): boolean {
            if (typeof value != "string" || value.trim().length === 0) {
                if (this.$scope.required === true) {
                    this.$scope.inputClass = [cssFeedbackClass.isInvalid];
                    this.$scope.messageClass = [cssAlertClass.alert, cssAlertClass.warning];
                    this.$scope.validationMessage = "URL not provided.";
                    this.$scope.isValid = false;
                } else {
                    this.$scope.isValid = true;
                    this.$scope.inputClass = [cssFeedbackClass.isValid];
                    this.$scope.messageClass = [];
                    this.$scope.validationMessage = "";
                    this.$scope.textModel = "";
                }
                return this.$scope.isValid;
            }
            let url: URL | undefined;
            try { url = new URL(value); } catch {
                let i: number = value.indexOf('#');
                let hash: string;
                if (i > -1) {
                    hash = value.substr(i);
                    value = value.substr(0, i);
                } else
                    hash = '';
                let search: string;
                i = value.indexOf('?');
                if (i > -1) {
                    search = value.substr(i);
                    value = value.substr(0, i);
                } else
                    search = '';
                try { url = new URL(((value.length > 0) ? new URL(value, 'http://tempuri.org') : new URL('http://tempuri.org')) + search + hash); }
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

        static createDirective(): ng.IDirective {
            window.console.debug("Returning directive " + DIRECTIVE_NAME_urlInputDirective);
            return <ng.IDirective>{
                restrict: "E",
                controller: ['$scope', urlInputDirectiveController],
                controllerAs: 'ctrl',
                link: (scope: IUrlInputDirectiveScope, element: JQuery, attrs: IUrlInputDirectiveAttributes & ng.IAttributes) => {
                    window.console.debug(angular.toJson({
                        activity: "app." + DIRECTIVE_NAME_urlInputDirective + "#link invoked",
                        arguments: sys.asArray(arguments)
                    }, true));
                    if (typeof scope.textBoxId !== "string" || scope.textBoxId.trim().length == 0) {
                        let i: number = 0;
                        let id: string = DIRECTIVE_NAME_urlInputDirective + ":" + i++;
                        for (let e: JQuery = $(id); sys.notNil(e) && e.length > 0; e = $(id))
                            id = DIRECTIVE_NAME_urlInputDirective + ":" + i++;
                        scope.textBoxId = id;
                    }
                    scope.$watch('textModel', (value: string) => {
                        if (typeof value === "string" && value !== scope.text)
                            scope.text = value;
                    });
                    scope.$watch('text', (value: string) => { scope.ctrl.validate((typeof value !== "string") ? "" : value); });
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

    window.console.debug("Creating directive " + DIRECTIVE_NAME_urlInputDirective);
    app.appModule.directive(DIRECTIVE_NAME_urlInputDirective, urlInputDirectiveController.createDirective);

    // #endregion

    // #region appContent directive.

    /**
     * Defines the directive name as "appContent".
     * @export
     * @constant {string}
     */
    export const DIRECTIVE_NAME_appContentDirective: string = "appContent";

    /**
     * Defines a button to be shown in the modal popup dialog.
     * @interface IPopupDialogButtonConfig
     * @extends {IPopupDialogButtonDefinition<any>}
     */
    export interface IPopupDialogButtonConfig extends appModalPopupService.IPopupDialogButtonDefinition<any> {
        /**
         * The click event handler for the associated button.
         *
         * @param {JQueryInputEventObject} [event] - The event object.
         * @memberof IPopupDialogButtonConfig
         */
        onClick(event?: JQueryInputEventObject);
    }

    /**
     *
     *
     * @interface IDirectiveScope
     * @extends {ng.IScope}
     */
    export interface IAppContentDirectiveScope extends ng.IScope {
        /**
         * The controller associated with the current scope.
         *
         * @type {appContentController}
         * @memberof IDirectiveScope
         */
        appContentController: appContentController;
        /**
         * The title of the current page.
         *
         * @type {string}
         * @memberof IDirectiveScope
         */
        pageTitle: string;
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
        /**
         * Navigation menu items to be displayed in the primary navigation menu.
         *
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof IDirectiveScope
         */
        topNavItems: ReadonlyArray<navConfigLoaderService.NavigationItem>;
        /**
         * Indicates whether the secondary navigation menu is to be displayed.
         *
         * @type {boolean}
         * @memberof IDirectiveScope
         */
        showSideMenu: boolean;
        /**
         * Ancestor navigation menu items to be displayed in the secondary navigation menu.
         *
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof IDirectiveScope
         */
        sideNavBreadcrumbItems: ReadonlyArray<navConfigLoaderService.NavigationItem>;
        /**
         * Indicates whether ancestor navigation menu items are to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IDirectiveScope
         */
        showBreadcrumbLinks: boolean;
        /**
         * Indicates whether the child/sibling navigation menu items are to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IDirectiveScope
         */
        showSideNavItems: boolean;
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
         * Navigation menu items within the secondary navigation menu, exclusing any that represents the current page or sibling items following the one that represents the current page.
         *
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof IDirectiveScope
         */
        sideNavItems: ReadonlyArray<navConfigLoaderService.NavigationItem>;
        /**
         * Indicates whether navigation menu item representing the current page is to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IDirectiveScope
         */
        showCurrentItem: boolean;
        /**
         * Navigation menu item representing the current page.
         *
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof IDirectiveScope
         */
        currentNavItem?: navConfigLoaderService.NavigationItem;
        /**
         * Navigation menu items within the secondary navigation menu that follow the item representing the current page.
         *
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof IDirectiveScope
         */
        followingSideNavItems: ReadonlyArray<navConfigLoaderService.NavigationItem>;
        /**
         * CSS class names for the main content section.
         *
         * @type {string[]}
         * @memberof IDirectiveScope
         */
        mainSectionClass: string[];
        /**
         * Indicates whether the main modal popup dialog is being displayed.
         *
         * @type {boolean}
         * @memberof IDirectiveScope
         */
        popupDialogVisible: boolean;
        /**
         * The title of the modal popup dialog.
         *
         * @type {string}
         * @memberof IDirectiveScope
         */
        popupDialogTitle: string;
        /**
         * Message text for modal popup dialog.
         *
         * @type {string}
         * @memberof IDirectiveScope
         */
        popupDialogMessage: string;
        /**
         * Buttons to be displayed in modal popup dialog.
         *
         * @type {IPopupDialogButtonConfig[]}
         * @memberof IDirectiveScope
         */
        popupDialogButtons: IPopupDialogButtonConfig[];
        /**
         * The callback to invoke when the modal popup dialog has been closed.
         *
         * @type {{ (result?: any): void; }}
         * @param {*} [result] - The dialog result value.
         * @memberof IDirectiveScope
         */
        onPopupDialogClose?: { (result?: any): void; };
        /**
         * CSS class names for the modal popup dialog body element.
         *
         * @type {string[]}
         * @memberof IDirectiveScope
         */
        popupDialogBodyClass: string[];
    }

    /**
     * Implements the controller for the appContent directive
     * @class Controller
     * @implements {ng.IController}
     */
    export class appContentController implements ng.IController {
        /**
         * Creates an instance of the controller for the appContent directive.
         *
         * @param {IAppContentDirectiveScope} $scope - The scope for the current appContent directive.
         * @param {ng.ILogService} $log - The $log service.
         * @param {ng.IWindowService} $window - The $window service.
         * @param {appConfigDataService} appConfigData - The appConfigData service.
         * @memberof Controller
         */
        constructor(private $scope: IAppContentDirectiveScope, private $log: ng.ILogService, private $window: ng.IWindowService, private navConfigLoader: navConfigLoaderService.Service, private appConfigLoader: appConfigLoaderService.Service) {
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
            appConfigLoader.onServiceNowUrlChanged($scope, (url: URL) => { $scope.serviceNowUrl = url.href; });
            $scope.serviceNowUrl = appConfigLoader.serviceNowUrl().href;
            appConfigLoader.onGitServiceUrlChanged($scope, (url: URL) => { $scope.gitServiceUrl = url.href; });
            $scope.gitServiceUrl = appConfigLoader.gitServiceUrl().href;
            appConfigLoader.onIdpUrlChanged($scope, (url: URL) => { $scope.idpUrl = url.href; });
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
            navConfigLoader.loadPageTitle().then((title: string) => {
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
                let areValid: boolean = $scope.serviceNowUrlIsValid && $scope.gitRepositoryBaseUrlIsValid && $scope.idpUrlIsValid;
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
            navConfigLoader.loadTopNavItems().then((items: navConfigLoaderService.NavigationItem[]) => {
                $log.debug(angular.toJson({
                    activity: "app.appContentController#navConfigLoader#loadPageTitle->then invoked",
                    items: items
                }, true));
                $scope.topNavItems = items;
            });
            let ctrl: appContentController = this;
            navConfigLoader.loadCurrentItem().then((currentNavItem: navConfigLoaderService.NavigationItem) => {
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
                } else {
                    if (currentNavItem.isNestedNavItem) {
                        $scope.showBreadcrumbLinks = ($scope.sideNavBreadcrumbItems = currentNavItem.getBreadcrumbLinks()).length > 0;
                        let parentNavItem: navConfigLoaderService.NavigationItem = currentNavItem.parentNavItem;
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
                        } else {
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
                    } else {
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
                        } else {
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
            }, (reason: any) => {
                $log.error(angular.toJson({
                    message: "Error loading application settings",
                    reason: reason
                }, true));
                $window.alert("Unexpected error loading application settings. See browser log for more detail.");
            });
        }

        private updateMainSectionClass() {
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
        openSetupParametersEditDialog(event?: JQueryInputEventObject): void {
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
        closeSetupParametersEditDialog(event?: JQueryInputEventObject, accept?: boolean): void {
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
            } else
                this.$log.debug("app.appContentController#closeSetupParametersEditDialog: Setup parameters dialog already hidden");
        }

        /**
         * Closes the main modal popup dialog.
         *
         * @param {JQueryInputEventObject} [event] - The event object.
         * @param {*} [result] - The result value use as the the modal dialog result.
         * @memberof Controller
         */
        closePopupDialog(event?: JQueryInputEventObject, result?: any): void {
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

        $onInit(): void { }
    }

    window.console.debug("Creating directive " + DIRECTIVE_NAME_appContentDirective);
    appModule.directive(DIRECTIVE_NAME_appContentDirective, () => {
        window.console.debug("Returning directive " + DIRECTIVE_NAME_appContentDirective);
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
        constructor(public $window: ng.IWindowService) {
            $window.console.debug(angular.toJson({
                activity: "app.copyToClipboardService#constructor invoked",
                $window: sys.getClassName($window),
                additionalArguments: sys.skipFirst(sys.asArray(arguments), 1)
            }, true));
            this[Symbol.toStringTag] = SERVICE_NAME_copyToClipboard;
        }
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
         * ID of element containing text to be copied.
         * @type {string}
         * @memberof ICopyDirectiveAttributes
         */
        target: string;

        /**
         * Message to display after text succssfully copied to clipboard.
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

        constructor(public $scope: ICopyToClipboardDirectiveScope, public copyToClipboardService: copyToClipboardService) {
            copyToClipboardService.$window.console.debug(angular.toJson({
                activity: "app.copyToClipboardButtonController#constructor invoked",
                $scope: sys.getClassName($scope),
                copyToClipboardService: sys.getClassName(copyToClipboardService),
                additionalArguments: sys.skipFirst(sys.asArray(arguments), 2)
            }, true));
        }

        copyToClipboard(event: BaseJQueryEventObject): void {
            try { this.copyToClipboardService.copy($("#" + this._targetId), this._successMessage); }
            finally { sys.preventEventDefault(event); }
        }

        static createDirective(): ng.IDirective {
            window.console.debug("Returning directive " + DIRECTIVE_NAME_copyToClipboard);
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
            } else
                this._cssClass = ['btn', 'btn-light', 'btn-outline-dark', 'p-1'];
        }

        $onInit() { }
    }

    window.console.debug("Creating service " + SERVICE_NAME_copyToClipboard);
    appModule.service(SERVICE_NAME_copyToClipboard, ["$window", copyToClipboardService]);
    window.console.debug("Creating directive " + DIRECTIVE_NAME_copyToClipboard);
    appModule.directive(DIRECTIVE_NAME_copyToClipboard, copyToClipboardButtonController.createDirective);

    // #endregion

    // #region configUrl directive

    /**
     * Defines the directive name as "configUrl".
     * @export
     * @constant {string}
     */
    export const DIRECTIVE_NAME_configUrl: string = "configUrl";

    /**
     * Represents attributes that can be used with the configUrl directive.
     * @export
     * @interface IConfigUrlDirectiveAttributes
     * @example <caption>Example for simple url text.</caption>
     * ```
     * <!-- Where Service#idpUrl() returns "https://idp.f5server.com" -->
     * <config-url base="idp" />
     * <!-- Transpiled code will be: -->
     * https://idp.f5server.com/
     * ```
     * @example <caption>Example using directive as attribute.</caption>
     * ```
     * <!-- Where Service#idpUrl() returns "https://idp.f5server.com" -->
     * <div class="detail" config-url base="idp"></div>
     * <!-- Transpiled code will be: -->
     * <div class="detail">https://idp.f5server.com/</div>
     * ```
     * @example <caption>Example with a relative URL.</caption>
     * ```
     * <!-- Where Service#gitServiceUrl() returns "https://github.com/your-root/" -->
     * <config-url base="git" href="myRepo.git" />
     * <!-- Transpiled code will be: -->
     * https://github.com/your-root/myRepo.git
     * ```
     * @example <caption>Example for generating a hyperlink.</caption>
     * ```
     * <!-- Where Service#serviceNowUrl() returns "https://yourinstance.servicenow.com" -->
     * <config-url base="sn" href="login.do" as-link="true" />
     * <!-- Transpiled code will be: -->
     * <a href="https://yourinstance.servicenow.com/login.do" target="_blank">https://yourinstance.servicenow.com/login.do</a>
     * ```
     * @example <caption>Example for generating including a query parameter and css classes.</caption>
     * ```
     * <!-- Where Service#serviceNowUrl() returns "https://yourinstance.servicenow.com" -->
     * <config-url base="sn" href="nav_to.do" q="uri" v="/sys_user_group_list.do" as-link="true" link-class="myClass" />
     * <!-- Transpiled code will be: -->
     * <a href="https://yourinstance.servicenow.com/nav_to.do?uri=%2Fsys_user_group_list.do" target="_blank" class="myClass">https://yourinstance.servicenow.com/nav_to.do?uri=%2Fsys_user_group_list.do</a>
     * ```
     */
    export interface IConfigUrlDirectiveAttributes {
        /**
         * The name of the base URL setting.
         * @type {UrlSettingsNames}
         * @memberof IDirectiveAttributes
         * @example <caption>Example that emits the url of ServiceNow instance.</caption>
         * ```
         * <config-url base="sn" />
         * ```
         * @example <caption>Example that emits the url of git service.</caption>
         * ```
         * <config-url base="git" />
         * ```
         * @example <caption>Example that emits the url of identity provider.</caption>
         * ```
         * <config-url base="idp" />
         * ```
         */
        base: appConfigLoaderService.UrlSettingsNames;

        /**
         * The relative URL.
         * @type {string}
         * @memberof IDirectiveAttributes
         * @example
         * ```
         * <!-- Where Service#gitServiceUrl() returns "https://github.com/your-root/" -->
         * <config-url base="git" href="myRepo.git" />
         * <!-- Transpiled code will be: -->
         * https://github.com/your-root/myRepo.git
         * ```
         */
        href?: string;

        /**
         * The name of the query parameter to include.
         * @type {string}
         * @memberof IDirectiveAttributes
         * @example
         * ```
         * <!-- Where Service#serviceNowUrl() returns "https://yourinstance.servicenow.com" -->
         * <config-url base="sn" href="sys_user_group_list.do" q="XML" as-link="true" />
         * <!-- Transpiled code will be: -->
         * <a href="https://yourinstance.servicenow.com/sys_user_group_list.do?XML" target="_blank">https://yourinstance.servicenow.com/sys_user_group_list.do?XML</a>
         * ```
         */
        q?: string;

        /**
         * The value for the query parameter to be included.
         * @type {string}
         * @memberof IDirectiveAttributes
         * @description This is ignored if {@link IDirectiveAttributes#q} is empty or not defined.
         * @example
         * ```
         * <!-- Where Service#serviceNowUrl() returns "https://yourinstance.servicenow.com" -->
         * <config-url base="sn" href="nav_to.do" q="uri" v="/sys_user_group_list.do" as-link="true" link-class="myClass" />
         * <!-- Transpiled code will be: -->
         * <a href="https://yourinstance.servicenow.com/nav_to.do?uri=%2Fsys_user_group_list.do" target="_blank" class="myClass">https://yourinstance.servicenow.com/nav_to.do?uri=%2Fsys_user_group_list.do</a>
         * ```
         */
        v?: string;

        /**
         * Whether to render as an anchor tag (default is false - render as plain text).
         * @type {("true" | "false")}
         * @memberof IDirectiveAttributes
         * @example
         * ```
         * <!-- Where Service#idpUrl() returns "https://idp.f5server.com" -->
         * <config-url base="idp" as-link="true" />
         * <!-- Transpiled code will be: -->
         * <a href="https://idp.f5server.com/" target="_blank">https://idp.f5server.com/</a>
         * ```
         */
        asLink?: "true" | "false";

        /**
         * Specifies an alternate target frame.
         * @type {string}
         * @memberof IDirectiveAttributes
         * @description This is ignored if {@link IDirectiveAttributes#asLink} is false or not specified.
         * @example
         * ```
         * <!-- Where Service#idpUrl() returns "https://idp.f5server.com" -->
         * <config-url base="idp" as-link="true" target="_parent" />
         * <!-- Transpiled code will be: -->
         * <a href="https://idp.f5server.com/" target="_parent">https://idp.f5server.com/</a>
         * ```
         */
        target?: string;

        /**
         * Define class names for the rendered anchor tag.
         * @type {string}
         * @memberof IDirectiveAttributes
         * @description This is ignored if {@link IDirectiveAttributes#asLink} is false or not specified.
         * @example
         * ```
         * <!-- Where Service#idpUrl() returns "https://idp.f5server.com" -->
         * <config-url base="idp" as-link="true" link-class="myClass" />
         * <!-- Transpiled code will be: -->
         * <a href="https://idp.f5server.com/" target="_blank" class="myClass">https://idp.f5server.com/</a>
         * ```
         */
        linkClass?: string;

        /**
         * Bind to a model for class name(s).
         * @type {string}
         * @memberof IDirectiveAttributes
         * @description This is ignored if {@link IDirectiveAttributes#asLink} is false or not specified.
         * @example
         * ```
         * <!-- Where Service#idpUrl() returns "https://idp.f5server.com" and $scope.myClass = ["nav", "nav-link"] -->
         * <config-url base="idp" as-link="true" link-class="p-1" link-class-model="myClass" />
         * <!-- Transpiled code will be: -->
         * <a href="https://idp.f5server.com/" target="_blank" class="p-1 nav nav-link">https://idp.f5server.com/</a>
         * ```
         */
        linkClassModel?: string;
    }

    function getConfigUrlDirectiveDirective(appConfigLoader: appConfigLoaderService.Service): ng.IDirective {
        appConfigLoader.$log.debug(angular.toJson({
            activity: "Returning directive " + DIRECTIVE_NAME_configUrl,
            appConfigLoader: sys.getClassName(appConfigLoader),
            additionalArguments: sys.skipFirst(sys.asArray(arguments), 1)
        }, true));
        return <ng.IDirective>{
            restrict: "AE",
            link: (scope: IConfigUrlDirectiveAttributes & ng.IScope, element: JQuery, attrs: IConfigUrlDirectiveAttributes & ng.IAttributes) => {
                appConfigLoader.$log.debug(angular.toJson({
                    activity: "app." + DIRECTIVE_NAME_configUrl + "#link invoked",
                    arguments: sys.asArray(arguments)
                }, true));
                function updateText() {
                    appConfigLoader.$log.debug(angular.toJson({
                        activity: "app." + DIRECTIVE_NAME_configUrl + "#link: Updating text",
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
                    let url: URL = (typeof scope.q === "string" && scope.q.length > 0) ?
                        (((typeof scope.v === "string") ? appConfigLoader.createUrl(scope.base, scope.href, scope.q, scope.v) :
                            appConfigLoader.createUrl(scope.base, scope.href, scope.q))) : appConfigLoader.createUrl(scope.base, scope.href);
                    let a: JQuery = element.children("a");
                    if (sys.asBoolean(scope.asLink)) {
                        if (a.length == 0) {
                            element.text("");
                            a = element.add("<a></a>");
                        }
                        a.attr("href", url.href);
                        a.attr("target", (typeof scope.target === "string" && scope.target.length > 0) ? scope.target : "_blank");
                        let c: string[] = (typeof scope.linkClass === "string" && scope.linkClass.length > 0) ?
                            sys.unique(((typeof scope.linkClassModel === "string" && scope.linkClassModel.length > 0) ?
                                scope.linkClass.split(sys.whitespaceRe).concat(scope.linkClassModel.split(sys.whitespaceRe)) :
                                scope.linkClass.split(sys.whitespaceRe)).filter((v: string) => v.length > 0)) :
                            ((typeof scope.linkClassModel === "string" && scope.linkClassModel.length > 0) ? sys.unique(scope.linkClassModel.split(sys.whitespaceRe).filter((v: string) => v.length > 0)) : []);
                        if (c.length > 0)
                            a.attr("class", c.join(" "));
                        else {
                            let s: string = a.attr("class");
                            if (typeof s === "string" && s.length > 0)
                                a.removeAttr("class");
                        }
                        a.text(url.href);
                    } else {
                        if (a.length > 0)
                            a.remove();
                        element.text(url.href);
                    }
                    appConfigLoader.$log.debug(angular.toJson({
                        activity: "app." + DIRECTIVE_NAME_configUrl + "#link: Text updated",
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
                appConfigLoader.onServiceNowUrlChanged(scope, (value: URL) => {
                    if (scope.base === "sn")
                        updateText();
                });
                appConfigLoader.onGitServiceUrlChanged(scope, (value: URL) => {
                    if (scope.base === "git")
                        updateText();
                });
                appConfigLoader.onIdpUrlChanged(scope, (value: URL) => {
                    if (scope.base === "idp")
                        updateText();
                });
                updateText();
                scope.$watchGroup(["base", "href", "q", "v", "asLink", "target"], () => { updateText(); });
            },
            scope: { base: "@", href: "@?", q: "@?", v: "@?", asLink: "@?", linkClass: "@?", linkClassModel: "=?" }
        }
    }
    window.console.debug("Creating directive " + DIRECTIVE_NAME_configUrl);
    appModule.directive(DIRECTIVE_NAME_configUrl, [appConfigLoaderService.SERVICE_NAME, getConfigUrlDirectiveDirective]);

    // #endregion

    // #region aConfigLink directive

    /**
     * Defines the directive name as "aConfigLink".
     * @export
     * @constant {string}
     */
    export const DIRECTIVE_NAME_aConfigLink: string = "aConfigLink";

    const DEFAULT_TARGET = "_blank";

    /**
     * Represents attributes that can be used with the aConfigLink directive.
     * @export
     * @interface IDirectiveAttributes
     * @example <caption>Example for simple url text.</caption>
     * ```
     * <!-- Where Service#idpUrl() returns "https://idp.f5server.com" -->
     * <a:config-link base="idp">IDP<a:config-link>
     * <!-- Transpiled code will be: -->
     * <a href="https://idp.f5server.com/" target="_blank">IDP</a>
     * ```
     * @example <caption>Example with a relative URL.</caption>
     * ```
     * <!-- Where Service#gitServiceUrl() returns "https://github.com/your-root/" -->
     * <a:config-link base="git" href="myRepo.git">Git Repository<a:config-link>
     * <!-- Transpiled code will be: -->
     * <a href="https://github.com/your-root/myRepo.git" target="_blank">Git Repository</a>
     * ```
     * @example <caption>Example for generating including a query parameter.</caption>
     * ```
     * <!-- Where Service#serviceNowUrl() returns "https://yourinstance.servicenow.com" -->
     * <a:config-link base="sn" href="nav_to.do" q="uri" v="/sys_user_group_list.do">Group List<a:config-link>
     * <!-- Transpiled code will be: -->
     * <a href="https://yourinstance.servicenow.com/nav_to.do?uri=%2Fsys_user_group_list.do" target="_blank">Group List</a>
     * ```
     * @example <caption>Example for generating including css classes.</caption>
     * ```
     * <!-- Where Service#serviceNowUrl() returns "https://yourinstance.servicenow.com" -->
     * <a:config-link base="sn" href="nav_to.do" link-class="myClass">Group List<a:config-link>
     * <!-- Transpiled code will be: -->
     * <a href="https://yourinstance.servicenow.com/" target="_blank" class="myClass">Group List</a>
     * ```
     */
    export interface IAConfigLinkDirectiveAttributes {
        /**
         * The name of the base URL setting.
         * @type {UrlSettingsNames}
         * @memberof IDirectiveAttributes
         * @example <caption>Example that emits a link to the ServiceNow instance.</caption>
         * ```
         * <a:config-link base="sn">ServiceNow</a:config-link>
         * ```
         * @example <caption>Example that emits a link to the git service.</caption>
         * ```
         * <a:config-link base="git">Git Service</a:config-link>
         * ```
         * @example <caption>Example that emits a link to the identity provider.</caption>
         * ```
         * <a:config-link base="idp">Identity Provider</a:config-link>
         * ```
         */
        base: appConfigLoaderService.UrlSettingsNames;

        /**
         * The relative URL.
         * @type {string}
         * @memberof IDirectiveAttributes
         * @example
         * ```
         * <!-- Where Service#idpUrl() returns "https://idp.f5server.com" -->
         * <a:config-link base="idp">IDP<a:config-link>
         * <!-- Transpiled code will be: -->
         * <a href="https://idp.f5server.com/" target="_blank">IDP</a>
         * ```
         */
        href?: string;

        /**
         * The name of the query parameter to include.
         * @type {string}
         * @memberof IDirectiveAttributes
         * @example <caption>Example for generating including a query parameter.</caption>
         * ```
         * <!-- Where Service#serviceNowUrl() returns "https://yourinstance.servicenow.com" -->
         * <a:config-link base="sn" href="sys_user_group_list.do" q="XML" v="/sys_user_group_list.do">Group XML Export<a:config-link>
         * <!-- Transpiled code will be: -->
         * <a href="https://yourinstance.servicenow.com/sys_user_group_list.do?XML" target="_blank">Group XML Export</a>
         * ```
         */
        q?: string;

        /**
         * The value for the query parameter to be included.
         * @type {string}
         * @memberof IDirectiveAttributes
         * @description This is ignored if {@link IDirectiveAttributes#q} is empty or not defined.
         * @example <caption>Example for generating including a query parameter.</caption>
         * ```
         * <!-- Where Service#serviceNowUrl() returns "https://yourinstance.servicenow.com" -->
         * <a:config-link base="sn" href="nav_to.do" q="uri" v="/sys_user_group_list.do">Group List<a:config-link>
         * <!-- Transpiled code will be: -->
         * <a href="https://yourinstance.servicenow.com/nav_to.do?uri=%2Fsys_user_group_list.do" target="_blank">Group List</a>
         * ```
         */
        v?: string;

        /**
         * Specifies an alternate target frame.
         * @type {string}
         * @memberof IDirectiveAttributes
         * @example
         * ```
         * <!-- Where Service#idpUrl() returns "https://idp.f5server.com" -->
         * <a:config-link base="idp" target="_self">IDP<a:config-link>
         * <!-- Transpiled code will be: -->
         * <a href="https://idp.f5server.com/" target="_self">IDP</a>
         * ```
         */
        target?: string;

        /**
         * Define class names for the rendered anchor tag.
         * @type {string}
         * @memberof IDirectiveAttributes
         * @example
         * ```
         * <!-- Where Service#serviceNowUrl() returns "https://yourinstance.servicenow.com" -->
         * <a:config-link base="sn" href="nav_to.do" link-class="myClass">Group List<a:config-link>
         * <!-- Transpiled code will be: -->
         * <a href="https://yourinstance.servicenow.com/" target="_blank" class="myClass">Group List</a>
         * ```
         */
        linkClass?: string;

        /**
         * Bind to a model for class name(s).
         * @type {string}
         * @memberof IDirectiveAttributes
         * @example
         * ```
         * <!-- Where Service#serviceNowUrl() returns "https://yourinstance.servicenow.com" and $scope.myClass = ["nav", "nav-link"] -->
         * <a:config-link base="sn" href="nav_to.do" link-class="p-1" link-class-model="myClass">Group List<a:config-link>
         * <!-- Transpiled code will be: -->
         * <a href="https://yourinstance.servicenow.com/" target="_blank" class="p-1 nav nav-link">Group List</a>
         * ```
         */
        linkClassModel?: string;
    }

    interface IAConfigLinkDirectiveScope extends IAConfigLinkDirectiveAttributes, ng.IScope {
        absHRef: string;
        linkTarget: string;
        class: string[];
    }

    export class aConfigLinkController implements ng.IController {
        constructor(private $scope: IAConfigLinkDirectiveScope, private appConfigLoader: appConfigLoaderService.Service) {
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
            let ctrl: aConfigLinkController = this;
            $scope.$watchGroup(["base", "url", "q", "v"], () => { ctrl.updateHref(); });
            $scope.$watchGroup(["linkClass", "linkClassModel"], () => {
                $scope.class = (typeof $scope.linkClass === "string" && $scope.linkClass.length > 0) ?
                    sys.unique(((typeof $scope.linkClassModel === "string" && $scope.linkClassModel.length > 0) ?
                        $scope.linkClass.split(sys.whitespaceRe).concat($scope.linkClassModel.split(sys.whitespaceRe)) :
                        $scope.linkClass.split(sys.whitespaceRe)).filter((v: string) => v.length > 0)) :
                    ((typeof $scope.linkClassModel === "string" && $scope.linkClassModel.length > 0) ? sys.unique($scope.linkClassModel.split(sys.whitespaceRe).filter((v: string) => v.length > 0)) : []);
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

    window.console.debug("Creating directive " + DIRECTIVE_NAME_aConfigLink);
    appModule.directive(DIRECTIVE_NAME_aConfigLink, () => {
        window.console.debug("Returning directive " + DIRECTIVE_NAME_aConfigLink);
        return <ng.IDirective>{
            restrict: "E",
            controller: ['$scope', appConfigLoaderService.SERVICE_NAME, aConfigLinkController],
            scope: { base: "@", href: "@?", q: "@?", v: "@?", linkClass: "@?", linkClassModel: "=?" },
            replace: true,
            template: '<a ng-href="{{absHRef}}" target="{{linkTarget}}" ng-class="class" ng-transclude></a>',
            transclude: true
        }
    });

    // #endregion

    // #region snNavLink directive

    /**
     * Defines the directive name as "snNavLink".
     * @export
     * @constant {string}
     */
    export const DIRECTIVE_NAME_snNavLink: string = "snNavLink";

    /**
     * Attributes that may be used with the snNavLink directive.
     *
     * @export
     * @interface IDirectiveAttributes
     * @example <caption>Example of simple statically defined relative URL.</caption>
     * ```
     * <!-- Where Service.serviceNowUrl() returns "https://yourinstance.servicenow.com" -->
     * <sn-nav-link path-nodes="System LDAP/Data Sources" href="/sys_data_source_list.do" />
     * <!-- Transpiled code will be: -->
     * <samp class="navPath">
     *      <span>
     *          <var>System LDAP</var>
     *          &rArr;
     *      </span>
     *      <a href="https://yourinstance.servicenow.com/sys_data_source_list.do" target="_blank">
     *          <var class="targetName">Data Sources</var>
     *      </a>
     * </samp>
     * ```
     * @example <caption>Example of navigation path with alternate link index.</caption>
     * ```
     * <!-- Where Service.serviceNowUrl() returns "https://yourinstance.servicenow.com" -->
     * <sn-nav-link path-nodes="System LDAP/Transform Maps/Enterprise User Import" link-index="1" href="/sys_transform_map_list.do" />
     * <!-- Transpiled code will be: -->
     * <samp class="navPath">
     *      <span>
     *          <var>System LDAP</var>
     *          &rArr;
     *      </span>
     *      <a href="https://yourinstance.servicenow.com/sys_transform_map_list.do" target="_blank">
     *          <var>Transform Maps</var>
     *      </a>
     *      <span>
     *          &rArr;
     *          <var class="targetName">Enterprise User Import</var>
     *      </span>
     * </samp>
     * ```
     * @example <caption>Example of navigation path with alternate node separator.</caption>
     * ```
     * <!-- Where Service.serviceNowUrl() returns "https://yourinstance.servicenow.com" -->
     * <sn-nav-link path-nodes="Configuration|Identification/Reconciliation|CI Identifiers" node-separator="|" href="/cmdb_identifier_list.do" />
     * <!-- Transpiled code will be: -->
     * <samp class="navPath">
     *      <span>
     *          <var>Configuration</var>
     *          &rArr;
     *          <var>Identification/Reconciliation</var>
     *          &rArr;
     *      </span>
     *      <a href="https://yourinstance.servicenow.com/cmdb_identifier_list.do" target="_blank">
     *          <var class="targetName">CI Identifiers</var>
     *      </a>
     * </samp>
     * ```
     * @example <caption>Example of statically defined relative URL encoded in nav_to.do query parameter.</caption>
     * ```
     * <!-- Where Service.serviceNowUrl() returns "https://yourinstance.servicenow.com" -->
     * <sn-nav-link path-nodes="System LDAP/Data Sources" href="/sys_data_source_list.do" to-nav="true" />
     * <!-- Transpiled code will be: -->
     * <samp class="navPath">
     *      <span>
     *          <var>System LDAP</var>
     *          &rArr;
     *      </span>
     *      <a href="https://yourinstance.servicenow.com/nav_to.do?uri=%2Fsys_data_source_list.do" target="_blank">
     *          <var class="targetName">Data Sources</var>
     *      </a>
     * </samp>
     * ```
     * @example <caption>Example of bound URL model.</caption>
     * ```
     * <!-- Where modelVar === "/sys_data_source_list.do" and Service.serviceNowUrl() returns "https://yourinstance.servicenow.com" -->
     * <sn-nav-link path-nodes="System LDAP/Data Sources" href-model="modelVar" />
     * <!-- Transpiled code will be: -->
     * <samp class="navPath">
     *      <span>
     *          <var>System LDAP</var>
     *          &rArr;
     *      </span>
     *      <a href="https://yourinstance.servicenow.com/sys_data_source_list.do" target="_blank">
     *          <var class="targetName">Data Sources</var>
     *      </a>
     * </samp>
     * ```
     * @example <caption>Example of navigation path with no relative URL.</caption>
     * ```
     * <sn-nav-link path-nodes="System Policy/Rules/Caller VIP Lookup Rules" />
     * <!-- Transpiled code will be -->
     * <samp class="navPath">
     *      <span>
     *          <var>System Policy</var>
     *          &rArr;
     *          <var>Rules</var>
     *          &rArr;
     *      </span>
     *      <var class="targetName">Caller VIP Lookup Rules</var>
     * </samp>
     * ```
     */
    export interface ISnNavLinkDirectiveAttributes {
        href?: string;
        hrefModel?: string;
        toNav?: "true"|"false";
        target?: string;
        pathNodes: string;
        nodeSeparator?: string;
        linkIndex?: string
    }

    interface ISnNavLinkDirectiveScope extends ISnNavLinkDirectiveAttributes, ng.IScope {
        effectiveHRef: string;
        text: string;
        hasLink: boolean;
        leadingSegments: string[];
        trailingSegments: string[];
        q?: string;
        v?: string;
    }

    export class snNavLinkController implements ng.IController {
        constructor(private $scope: ISnNavLinkDirectiveScope) {
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
                let nodeSeparator: string = (typeof $scope.nodeSeparator === "string" && $scope.nodeSeparator.length > 0) ? $scope.nodeSeparator : "/";
                let allSegments: string[] = (typeof $scope.pathNodes === "string" && $scope.pathNodes.length > 0) ?
                    $scope.pathNodes.split(nodeSeparator).map((value: string) => value.trim()).filter((value: string) => value.length > 0) : [];
                let index: number = allSegments.length - 1;
                if ((index = sys.asInt($scope.linkIndex, -1)) > -1 && index < (allSegments.length - 1)) {
                    $scope.leadingSegments = [];
                    while ($scope.leadingSegments.length < index)
                        $scope.leadingSegments.push(allSegments.shift());
                    $scope.text = allSegments.shift();
                    $scope.trailingSegments = allSegments;
                } else {
                    $scope.trailingSegments = [];
                    $scope.text = allSegments.pop();
                    $scope.leadingSegments = allSegments;
                }
                let href: string = (typeof $scope.hrefModel === "string" && $scope.hrefModel.length > 0) ? $scope.hrefModel :
                    ((typeof $scope.href === "string" && $scope.href.length > 0) ? $scope.href : "");
                if (href.length == 0) {
                    $scope.hasLink = false;
                    $scope.effectiveHRef = "";
                    $scope.q = $scope.v = undefined;
                } else {
                    if (sys.asBoolean($scope.toNav)) {
                        $scope.effectiveHRef = "/nav_to.do";
                        $scope.q = "uri";
                        $scope.v = href;
                    } else {
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

    window.console.debug("Creating directive " + DIRECTIVE_NAME_snNavLink);
    appModule.directive(DIRECTIVE_NAME_snNavLink, () => {
        window.console.debug("Returning directive " + DIRECTIVE_NAME_snNavLink);
        return <ng.IDirective>{
            restrict: "E",
            controller: ['$scope', snNavLinkController],
            scope: { href: "@?", hrefModel: "=?", toNav: "@?", target: "@?", pathNodes: "@?", nodeSeparator: "@?", linkIndex: "@?" },
            replace: true,
            template: '<samp class="navPath"><span ng-repeat="s in leadingSegments"><var>{{s}}</var> &rArr; </span><a:config-link ng-show="hasLink" base="sn" href="{{effectiveHRef}}" q="{{q}}" v="{{v}}" target="{{target}}"><var class="targetName">{{text}}</var></a:config-link><var ng-hide="hasLink" class="targetName">{{text}}</var><span ng-repeat="s in trailingSegments"> &rArr; <var>{{s}}</var></span></samp>'
        }
    });

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

    // #region notificationMessageService

    export enum NotificationMessageType {
        error,
        warning,
        info
    }

    export interface INotificationMessage {
        type: NotificationMessageType;
        title?: string;
        message: string;
    }

    export class NotificationMessageService {
        private _messages: INotificationMessage[] = [];

        constructor(public readonly $log: ng.ILogService) { }

        addNotificationMessage(message: string, title: string, type: NotificationMessageType): void;
        addNotificationMessage(message: string, type: NotificationMessageType): void;
        addNotificationMessage(message: string, title: string): void;
        addNotificationMessage(message: string): void;
        addNotificationMessage(message: string, title?: string | NotificationMessageType, type?: NotificationMessageType): void {
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
        getMessages(type: NotificationMessageType, clear: boolean): INotificationMessage[];
        getMessages(type: NotificationMessageType): INotificationMessage[];
        getMessages(clear: boolean): INotificationMessage[];
        getMessages(): INotificationMessage[];
        getMessages(type?: NotificationMessageType | boolean, clear?: boolean): INotificationMessage[] {
            let result: INotificationMessage[] = this._messages;
            if (typeof type === "boolean")
                clear = type;
            else if (typeof type === "number" && (type === NotificationMessageType.error || type === NotificationMessageType.warning || type === NotificationMessageType.info)) {
                if (clear === true)
                    this._messages = result.filter((item: INotificationMessage) => item.type !== type);
                return result.filter((item: INotificationMessage) => item.type === type);
            }
            if (clear === true)
                this._messages = [];
            return result;
        }
    }

    appModule.factory("notificationMessageService", ["$log", NotificationMessageService]);

    // #endregion
}
