/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />

namespace app {
    /**
    * The main module for this app.
    *
    * @type {ng.IModule}
    */
    export let appModule: ng.IModule = angular.module("app", []);

    export const ScopeEvent_OpenMainModalPopupDialog: string = 'OpenMainModalPopupDialog';
    export const ScopeEvent_CloseMainModalPopupDialog: string = 'CloseMainModalPopupDialog';
    export const ScopeEvent_ShowSetupParametersDialog: string = 'showSetupParameterDefinitionsControllerDialog';
    export const ScopeEvent_HideSetupParametersDialog: string = 'hideSetupParameterDefinitionsControllerDialog';
    export const ScopeEvent_SetupParameterSettingsChanged: string = "SetupParameterSettingsChanged";
    export const ScopeEvent_AddCollapsibleCard: string = "AddCollapsibleCard";
    export const ScopeEvent_: string = "";
    export const StorageKey_SetupParameterSettings = "targetSysConfigSettings";
    const DefaultURL_ServiceNow = "https://inscomscd.service-now.com";
    const DefaultURL_GitRepositoryBase = "https://github.com/erwinel";

    // #region Navigation

    interface INavigationDefinition {
        url: string;
        linkTitle: string;
        pageTitle?: string;
        items?: INavigationDefinition[];
    }

    interface INavigationJSON {
        currentItemClass: string[];
        selectedItemClass: string[];
        otherItemClass: string[];
        items: INavigationDefinition[];
    }

    // #region PageNavigationScope

    export interface INavigationContainerScope extends ng.IScope {
        currentItemIndex: number;
        pageTitle: string;
        items: INavigationItemScope[];
    }

    export interface IPageNavigationScope extends ng.IScope {
        top: INavigationContainerScope;
        side: INavigationContainerScope;
    }

    export interface INavigationItemScope extends ng.IScope, INavigationContainerScope {
        linkTitle: string;
        pageTitle: string;
        href: string;
        class: string[];
        isCurrent: boolean;
        onClick(): void;
    }

    function initializePageNavigationScope(parentScope: IMainControllerScope, location: ng.ILocationService, http: ng.IHttpService) {
        let scope: IPageNavigationScope = parentScope.pageNavigation = <IPageNavigationScope>(parentScope.$new());
        scope.top = <INavigationContainerScope>(scope.pageNavigation.$new());
        scope.top.items = [];
        scope.top.currentItemIndex = -1;
        scope.side = <INavigationContainerScope>(scope.pageNavigation.$new());
        scope.side.items = [];
        scope.side.currentItemIndex = -1;

        http.get<INavigationJSON>("./pageNavigation.json").then((nav: ng.IHttpPromiseCallbackArg<INavigationJSON>) => {
            let pageName: string = location.path().split("/").reduce((previousValue: string, currentValue: string) => { return (currentValue.length > 0) ? currentValue : previousValue }, "").toLowerCase();
            if (sys.isNil(nav.data))
                alert("Failed to load navigation from ./pageNavigation.json. Reason (" + nav.status + "): " + nav.statusText);
            else if (typeof (nav.data.items) === 'undefined')
                alert("Failed to load navigation from ./pageNavigation.json. Reason: No items returned. Status: (" + nav.status + "): " + nav.statusText);
            else {
                nav.data.items.forEach((d: INavigationDefinition, index: number) => {
                    let item: INavigationItemScope = toNavItem(pageName, nav.data, scope.top, d);
                    if ((item.isCurrent || item.currentItemIndex > -1) && scope.top.currentItemIndex < 0)
                        scope.top.currentItemIndex = index;
                });
                if (scope.top.currentItemIndex > -1) {
                    let sideItem: INavigationItemScope = scope.top.items[scope.top.currentItemIndex];
                    scope.side.items = sideItem.items;
                    scope.side.currentItemIndex = sideItem.currentItemIndex;
                    sideItem.items = [];
                    sideItem.currentItemIndex = -1;
                }
                let container: INavigationContainerScope = (scope.side.currentItemIndex < 0) ? scope.top : scope.side;

                let selectedItem: INavigationItemScope = container.items[(container.currentItemIndex < 0) ? 0 : container.currentItemIndex];
                while (!selectedItem.isCurrent) {
                    if (selectedItem.currentItemIndex < 0)
                        break;
                    selectedItem = selectedItem.items[selectedItem.currentItemIndex];
                }
                scope.pageTitle = selectedItem.pageTitle;
            }
        }).catch((reason: any) => {
            if (!sys.isNil(reason)) {
                if (typeof (reason) !== 'string') {
                    try { alert("Failed to load navigation from ./pageNavigation.json. Reason: " + JSON.stringify(reason) + "."); }
                    catch { alert("Failed to load navigation from ./pageNavigation.json. Reason: " + reason + "."); }
                }
                else if ((reason = reason.trim()).length > 0)
                    alert("Failed to load navigation from ./pageNavigation.json. Reason: " + reason);
            }
            alert("Failed to load navigation from ./pageNavigation.json. Reason: unknown.");
        });
    }

    // #endregion

    // #region NavigationItemScope

    function toNavItem(pageName: string, config: INavigationJSON, container: INavigationContainerScope, definition: INavigationDefinition): INavigationItemScope {
        let item: INavigationItemScope = <INavigationItemScope>(container.$new());
        item.linkTitle = definition.linkTitle;
        item.pageTitle = (sys.isNilOrWhiteSpace(definition.pageTitle)) ? definition.linkTitle : definition.pageTitle;
        item.currentItemIndex = -1;
        if (pageName === definition.url) {
            item.href = '#';
            item.class = config.currentItemClass;
            item.isCurrent = true;
            item.onClick = () => { return false; };
        } else {
            item.isCurrent = false;
            item.href = definition.url;
            item.class = config.otherItemClass;
            item.onClick = () => { return true; };
        }
        item.items = [];
        if (!sys.isNilOrEmpty(definition.items)) {
            definition.items.forEach((d: INavigationDefinition, index: number) => {
                let childItem: INavigationItemScope = toNavItem(pageName, config, item, d);
                if ((childItem.isCurrent || childItem.currentItemIndex > -1) && item.currentItemIndex < 0) {
                    item.currentItemIndex = index;
                    item.class = config.selectedItemClass;
                }
            });
        }
        container.items.push(item);
        return item;
    }

    // #endregion

    // #region Directives

    appModule.directive("mainAppPageHead", () => {
        return {
            restrict: "E",
            scope: true,
            templateUrl: 'Template/mainAppPageHead.htm'
        };
    });

    // #endregion

    // #endregion

    // #region mainPageController

    //export interface INestedControllerScope<TParent extends IMainControllerScope> extends IMainControllerScope {
    //    $parent: TParent
    //}

    export interface IMainControllerScope extends ng.IScope {
        serviceNowUrl: string;
        gitRepositoryBaseUrl: string;
        pageNavigation: IPageNavigationScope;
        showSetupParametersEditDialog(): void;
    }

    class mainPageController implements ng.IController {
        $doCheck() { }

        showSetupParametersEditDialog() { targetSysConfigEditController.show(this.$scope); }

        hideSetupParametersEditDialog() { targetSysConfigEditController.hide(this.$scope); }

        showModalDialogMessage(message: string, type: DialogMessageType = 'info', title?: string) { mainModalPopupDialogController.show(this.$scope, message, type, title); }

        hideModalDialogMessage() { mainModalPopupDialogController.hide(this.$scope); }

        constructor(protected $scope: IMainControllerScope, protected $location: ng.ILocationService, protected $http: ng.IHttpService, settings: targetSysConfigSettings) {
            $scope.serviceNowUrl = settings.serviceNowUrl;
            $scope.gitRepositoryBaseUrl = settings.gitRepositoryBaseUrl;
            settings.onChanged($scope, (event: ng.IAngularEvent, value: ISysConfigSettings) => {
                $scope.serviceNowUrl = value.serviceNowUrl;
                $scope.gitRepositoryBaseUrl = value.gitRepositoryBaseUrl;
            });
            initializePageNavigationScope($scope, $location, $http);
            $scope.showSetupParametersEditDialog = () => {
                targetSysConfigEditController.show($scope);
            };
        }
    }

    appModule.controller("mainPageController", ['$scope', "$location", "$http", "targetSysConfigSettings", mainPageController]);

    export abstract class MainControllerChild<TScope extends IMainControllerScope> implements ng.IController {
        $doCheck() { }
        constructor(protected $scope: TScope) { }
        showSetupParametersEditDialog() { targetSysConfigEditController.show(this.$scope); }
        hideSetupParametersEditDialog() { targetSysConfigEditController.hide(this.$scope); }
        showModalDialogMessage(message: string, type: DialogMessageType = 'info', title?: string) { mainModalPopupDialogController.show(this.$scope, message, type, title); }
        hideModalDialogMessage() { mainModalPopupDialogController.hide(this.$scope); }
    }

    // #endregion

    // #region DialogScope

    export type DialogMessageType = 'info' | 'warning' | 'danger' | 'primary' | 'success';

    interface IDialogScope extends ng.IScope {
        isVisible: boolean;
        title: string;
        message: string;
        bodyClass: string;
        show(message: string, type?: DialogMessageType, title?: string);
        close();
    }

    export class mainModalPopupDialogController implements ng.IController {
        static show($scope: ng.IScope, message: string, type?: DialogMessageType, title?: string) {
            $scope.$broadcast(ScopeEvent_OpenMainModalPopupDialog, message, type, title);
        }
        static hide($scope: ng.IScope) {
            $scope.$broadcast(ScopeEvent_CloseMainModalPopupDialog);
        }
        constructor($scope: IDialogScope, $rootScope: ng.IScope) {
            $scope.title = '';
            $scope.message = '';
            $scope.bodyClass = '';
            $scope.close = () => { $('#mainModalPopupDialog').modal('hide'); };
            $rootScope.$on(ScopeEvent_OpenMainModalPopupDialog, (event: ng.IAngularEvent, message: string, type?: DialogMessageType, title?: string) => {
                if (sys.isNilOrWhiteSpace(title)) {
                    switch (type) {
                        case 'warning':
                            $scope.title = 'Warning';
                            break;
                        case 'danger':
                            $scope.title = 'Critical';
                            break;
                        case 'success':
                            $scope.title = 'Success';
                            break;
                        default:
                            $scope.title = 'Notice';
                    }
                } else
                    $scope.title = title;
                $scope.bodyClass = 'modal-body alert alert-' + type;
                $scope.message = (sys.isNil(message)) ? '' : message;
                $('#mainModalPopupDialog').modal('show');
            });
            $rootScope.$on(ScopeEvent_CloseMainModalPopupDialog, (event: ng.IAngularEvent) => { $('#mainModalPopupDialog').modal('hide'); });
        }
    }

    appModule.controller("mainModalPopupDialogController", ['$scope', '$rootScope', mainModalPopupDialogController]);

    // #endregion

    // #region Session Storage Service

    class SessionStorageEntryEnumerator implements IterableIterator<[string, string]> {
        private _index: number = 0;

        constructor(private _window: ng.IWindowService, private _keys: string[]) { }

        [Symbol.iterator](): IterableIterator<[string, string]> { return this; }

        next(): IteratorResult<[string, string]> {
            if (this._window.sessionStorage.length !== this._keys.length)
                this._index = this._keys.length;
            else if (this._index < this._keys.length) {
                try {
                    let key: string = this._keys[this._index];
                    let value: string = this._window.sessionStorage.getItem(key);
                    if (!sys.isNil(value))
                        return { done: false, value: [key, value] };
                    this._index = this._keys.length;
                } catch { this._index = this._keys.length; }
            }
            return { done: true, value: undefined };
        }
    }

    class SessionStorageValueEnumerator implements IterableIterator<string> {
        private _index: number = 0;

        constructor(private _window: ng.IWindowService, private _keys: string[]) { }

        [Symbol.iterator](): IterableIterator<string> { return this; }

        next(): IteratorResult<string> {
            if (this._window.sessionStorage.length !== this._keys.length)
                this._index = this._keys.length;
            else if (this._index < this._keys.length) {
                try {
                    let value: string = this._window.sessionStorage.getItem(this._keys[this._index]);
                    if (!sys.isNil(value))
                        return { done: false, value: value };
                    this._index = this._keys.length;
                } catch { this._index = this._keys.length; }
            }
            return { done: true, value: undefined };
        }
    }

    export class sessionStorageService implements Map<string, string> {
        private _allKeys: string[];
        private _parsedKeys: string[];
        private _parsedObjects: (any | null | undefined)[];

        [Symbol.toStringTag]: string;

        get size(): number { return this.$window.sessionStorage.length; }

        constructor(private $window: ng.IWindowService) {
            this[Symbol.toStringTag] = 'sessionStorageService';
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

        forEach(callbackfn: (value: string, key: string, map: sessionStorageService) => void, thisArg?: any): void {
            this.check();
            if (typeof (thisArg) === "undefined")
                this._allKeys.forEach((key: string, index: number) => {
                    if (index < this._allKeys.length && this._allKeys[index] === key) {
                        let value: string | undefined;
                        try { value = this.$window.sessionStorage.getItem(key); } catch { /* okay to ignore */ }
                        if (!sys.isNil(value))
                            callbackfn(value, key, this);
                    }
                }, this);
            else
                this._allKeys.forEach((key: string, index: number) => {
                    if (index < this._allKeys.length && this._allKeys[index] === key) {
                        let value: string | undefined;
                        try { value = this.$window.sessionStorage.getItem(key); } catch { /* okay to ignore */ }
                        if (!sys.isNil(value))
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
                if (typeof (value) === "undefined")
                    this.$window.sessionStorage.setItem(key, "undefined");
                else
                    this.$window.sessionStorage.setItem(key, ng.toJson(value, false));
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

    appModule.service("sessionStorageService", ["$window", sessionStorageService]);

    // #endregion

    // #region Target SyStem Configuration Information

    export enum cssValidationClass {
        isValid = 'is-valid',
        isInvalid = 'is-invalid'
    }

    export enum cssFeedbackClass {
        isValid = 'is-valid',
        isInvalid = 'is-invalid'
    }

    // #region targetSysConfigEditController

    interface ISysConfigEditFieldState extends ISysConfigEditScope {
        original: string;
        text: string;
        isValid: boolean;
        lastValidated: string;
        validationMessage: string;
        validationClass: string[];
        messageClass: string[];
    }

    interface ISysConfigEditScope extends ng.IScope {
        serviceNowUrl: string;
        gitRepositoryBaseUrl: string;
        cancel(): void;
        accept(): void;
        close(): void;
        serviceNowUrlField: ISysConfigEditFieldState;
        gitRepositoryBaseUrlField: ISysConfigEditFieldState;
    }

    export class targetSysConfigEditController implements ng.IController {
        constructor(protected $scope: ISysConfigEditScope, private _settings: targetSysConfigSettings) {
            $scope.serviceNowUrlField = <ISysConfigEditFieldState>($scope.$new());
            $scope.serviceNowUrlField.original = $scope.serviceNowUrlField.text = $scope.serviceNowUrlField.lastValidated = _settings.serviceNowUrl;
            $scope.serviceNowUrlField.validationMessage = '';
            $scope.serviceNowUrlField.validationClass = ['form-control', cssValidationClass.isValid];
            $scope.serviceNowUrlField.messageClass = ['invalid-feedback'];
            $scope.serviceNowUrlField.isValid = true;

            $scope.gitRepositoryBaseUrlField = <ISysConfigEditFieldState>($scope.$new());
            $scope.gitRepositoryBaseUrlField.original = $scope.gitRepositoryBaseUrlField.text = $scope.gitRepositoryBaseUrlField.lastValidated = _settings.gitRepositoryBaseUrl;
            $scope.gitRepositoryBaseUrlField.validationMessage = '';
            $scope.gitRepositoryBaseUrlField.validationClass = ['form-control', cssValidationClass.isValid];
            $scope.gitRepositoryBaseUrlField.messageClass = ['invalid-feedback'];
            $scope.gitRepositoryBaseUrlField.isValid = true;

            $scope.message = '';
            $scope.bodyClass = '';
            $scope.close = () => { $('#setupParametersDialog').modal('hide'); }
            $scope.cancel = () => {
                $scope.serviceNowUrlField.text = $scope.serviceNowUrlField.lastValidated = $scope.serviceNowUrlField.original;
                $scope.serviceNowUrlField.validationMessage = '';
                $scope.serviceNowUrlField.validationClass = ['form-control', cssValidationClass.isValid];
                $scope.serviceNowUrlField.messageClass = ['invalid-feedback'];
                $scope.serviceNowUrlField.isValid = true;
                $scope.gitRepositoryBaseUrlField.text = $scope.gitRepositoryBaseUrlField.lastValidated = $scope.gitRepositoryBaseUrlField.original;
                $scope.gitRepositoryBaseUrlField.validationMessage = '';
                $scope.gitRepositoryBaseUrlField.validationClass = ['form-control', cssValidationClass.isValid];
                $scope.gitRepositoryBaseUrlField.isValid = true;
                $scope.gitRepositoryBaseUrlField.messageClass = ['invalid-feedback'];
                $('#setupParametersDialog').modal('hide');
            };
            $scope.accept = () => {
                this.$doCheck();
                if (!$scope.serviceNowUrlField.isValid) {
                    if (!$scope.gitRepositoryBaseUrlField.isValid)
                        alert("ServiceNow URL and GIT Repository Base URL are not valid.");
                    alert("ServiceNow URL is not valid.");
                    return;
                }
                if (!$scope.gitRepositoryBaseUrlField.isValid) {
                    alert("GIT Repository Base URL is not valid.");
                    return;
                }

                $scope.serviceNowUrlField.original = $scope.serviceNowUrlField.text = $scope.serviceNowUrlField.lastValidated = $scope.serviceNowUrlField.text =
                    sys.subStringBefore(sys.subStringBefore($scope.serviceNowUrlField.text, '#'), '?');
                $scope.serviceNowUrlField.validationMessage = '';
                $scope.serviceNowUrlField.validationClass = ['form-control', cssValidationClass.isValid];
                $scope.serviceNowUrlField.messageClass = ['invalid-feedback'];
                $scope.gitRepositoryBaseUrlField.original = $scope.gitRepositoryBaseUrlField.text = $scope.gitRepositoryBaseUrlField.lastValidated =
                    $scope.gitRepositoryBaseUrlField.text = sys.subStringBefore(sys.subStringBefore($scope.gitRepositoryBaseUrlField.text, '#'), '?');
                $scope.gitRepositoryBaseUrlField.validationMessage = '';
                $scope.gitRepositoryBaseUrlField.validationClass = ['form-control', cssValidationClass.isValid];
                $scope.gitRepositoryBaseUrlField.messageClass = ['invalid-feedback'];
                $('#setupParametersDialog').modal('hide');
                this._settings.serviceNowUrl = $scope.serviceNowUrlField.original;
                this._settings.gitRepositoryBaseUrl = $scope.gitRepositoryBaseUrlField.original;
            };
            $scope.$on(ScopeEvent_ShowSetupParametersDialog, (event: ng.IAngularEvent) => {
                $('#setupParametersDialog').modal('show');
            });
            $scope.$on(ScopeEvent_HideSetupParametersDialog, (event: ng.IAngularEvent) => {
                $('#setupParametersDialog').modal('hide');
            });
        }

        $doCheck() {
            [this.$scope.serviceNowUrlField, this.$scope.gitRepositoryBaseUrlField].forEach((item: ISysConfigEditFieldState) => {
                if (item.lastValidated === item.text)
                    return;
                let uri: string = sys.asString(item.text, true, '');
                item.lastValidated = uri;
                if (uri.length === 0)
                    item.validationMessage = 'URL is required.';
                else {
                    let fragment: string = '', query: string = '';
                    let i: number = uri.indexOf('#');
                    if (i > -1) {
                        fragment = uri.substr(i);
                        uri = uri.substr(0, i);
                    }
                    i = uri.indexOf('?');
                    if (i > -1) {
                        fragment = uri.substr(i);
                        uri = uri.substr(0, i);
                    }
                    let match: RegExpExecArray | null | undefined;
                    if (uri.length > 0)
                        match = sys.uriParseRegex.exec(uri);
                    if (sys.isNilOrEmpty(match))
                        item.validationMessage = 'Invalid URL.';
                    else if (sys.isNilOrWhiteSpace(match[sys.uriParseGroup.origin]))
                        item.validationMessage = 'URL cannot be relative.';
                    else if (sys.isNilOrWhiteSpace(match[sys.uriParseGroup.schemeName]) || sys.isNilOrWhiteSpace(match[sys.uriParseGroup.hostname]))
                        item.validationMessage = 'Invalid URL.';
                    else {
                        item.isValid = true;
                        if (query.length > 0)
                            item.validationMessage = 'URI query string will be ignored.';
                        else if (fragment.length > 0)
                            item.validationMessage = 'URI fragment (hash) will be ignored.';
                        else
                            return;
                        item.validationClass = ['form-control', cssValidationClass.isInvalid];
                        item.messageClass = ['invalid-feedback', 'text-warning'];
                        return;
                    }
                }
                item.isValid = false;
                item.validationClass = ['form-control', cssValidationClass.isInvalid];
                item.messageClass = ['invalid-feedback'];
            });
        }

        static show($scope: ng.IScope) {
            $scope.$broadcast(ScopeEvent_ShowSetupParametersDialog);
        }

        static hide($scope: ng.IScope) {
            $scope.$broadcast(ScopeEvent_HideSetupParametersDialog);
        }
    }

    appModule.controller("targetSysConfigEditController", ['$scope', 'targetSysConfigSettings', targetSysConfigEditController]);

    // #endregion

    // #region targetSysConfigSettings Service

    interface ISysConfigSettings {
        serviceNowUrl: string;
        gitRepositoryBaseUrl: string;
    }

    class targetSysConfigSettings {
        private _settings: ISysConfigSettings;

        get serviceNowUrl(): string { return this._settings.serviceNowUrl; }
        set serviceNowUrl(value: string) {
            if (value === this._settings.serviceNowUrl)
                return;
            if (sys.isNilOrWhiteSpace(value))
                throw new Error("URL cannot be empty.");
            let parsedUrl: sys.IParsedUriString = sys.parseUriString(value);
            if (sys.isNil(parsedUrl.origin))
                throw new Error("URL cannot be relative.");
            if (!(sys.isNil(parsedUrl.queryString) && sys.isNil(parsedUrl.fragment) && parsedUrl.path.length == 0)) {
                if (value === parsedUrl.origin.value)
                    return;
                this._settings.serviceNowUrl = parsedUrl.origin.value;
            } else
                this._settings.serviceNowUrl = value;
            this._sessionStorage.setObject(StorageKey_SetupParameterSettings, this._settings);
            this.raiseUpdated();
        }

        get gitRepositoryBaseUrl(): string { return this._settings.gitRepositoryBaseUrl; }
        set gitRepositoryBaseUrl(value: string) {
            if (value === this._settings.gitRepositoryBaseUrl)
                return;
            if (sys.isNilOrWhiteSpace(value))
                throw new Error("URL cannot be empty.");
            let parsedUrl: sys.IParsedUriString = sys.parseUriString(value);
            if (sys.isNil(parsedUrl.origin))
                throw new Error("URL cannot be relative.");
            if (!(sys.isNil(parsedUrl.queryString) && sys.isNil(parsedUrl.fragment))) {
                value = parsedUrl.origin.value + parsedUrl.path;
                if (value === this._settings.gitRepositoryBaseUrl)
                    return;
            }
            this._settings.gitRepositoryBaseUrl = value;
            this._sessionStorage.setObject(StorageKey_SetupParameterSettings, this._settings);
            this.raiseUpdated();
        }

        private raiseUpdated() {
            this.$rootScope.$emit(ScopeEvent_SetupParameterSettingsChanged, <ISysConfigSettings>{
                serviceNowUrl: this._settings.serviceNowUrl,
                gitRepositoryBaseUrl: this._settings.gitRepositoryBaseUrl
            });
        }

        onChanged(scope: ng.IScope, handler: (event: ng.IAngularEvent, settings: ISysConfigSettings) => void) { scope.$on(ScopeEvent_SetupParameterSettingsChanged, handler); }

        constructor(private $rootScope: ng.IScope, private _sessionStorage: sessionStorageService, $http: ng.IHttpService) {
            this._settings = _sessionStorage.getObject<ISysConfigSettings>("targetSysConfigSettings");
            if (sys.isNil(this._settings))
                this._settings = { serviceNowUrl: DefaultURL_ServiceNow, gitRepositoryBaseUrl: DefaultURL_GitRepositoryBase };
            else {
                if (sys.isNilOrWhiteSpace(this._settings.serviceNowUrl))
                    this._settings.serviceNowUrl = DefaultURL_ServiceNow;
                if (sys.isNilOrWhiteSpace(this._settings.gitRepositoryBaseUrl))
                    this._settings.gitRepositoryBaseUrl = DefaultURL_GitRepositoryBase;
            }

            $http.get("./defaults.json").then((nav: ng.IHttpPromiseCallbackArg<ISysConfigSettings>) => {
                if (sys.isNil(nav.data))
                    return;
                if (sys.isNil(nav.data.serviceNowUrl) || this._settings.serviceNowUrl === nav.data.serviceNowUrl) {
                    if (sys.isNil(nav.data.serviceNowUrl) || this._settings.serviceNowUrl === nav.data.serviceNowUrl)
                        return;
                    this._settings.gitRepositoryBaseUrl = nav.data.gitRepositoryBaseUrl;
                } else {
                    this._settings.serviceNowUrl = nav.data.serviceNowUrl;
                    if (!sys.isNil(nav.data.serviceNowUrl) && this._settings.serviceNowUrl !== nav.data.serviceNowUrl)
                        this._settings.gitRepositoryBaseUrl = nav.data.gitRepositoryBaseUrl;
                }
                this._sessionStorage.setObject(StorageKey_SetupParameterSettings, this._settings);
                this.raiseUpdated();
            });
        }
    }

    appModule.factory("targetSysConfigSettings", ["$rootScope", "sessionStorageService", "$http", targetSysConfigSettings]);

    // #endregion

    // #endregion
}
