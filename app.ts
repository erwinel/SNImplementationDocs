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

        constructor(protected $scope: IMainControllerScope, protected $location: ng.ILocationService, protected $http: ng.IHttpService, protected settings: targetSysConfigSettings) {
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

    // #region mainModalPopupDialog

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

    appModule.service("sessionStorageService", ["$window", sessionStorageService]);

    // #endregion

    // #region Copy To Clipboard Service

    export class CopyToClipboardService {
        constructor(private $window: ng.IWindowService) { }
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

    appModule.service("copyToClipboardService", ["$window", CopyToClipboardService]);

    // #endregion

    // #region copyToClipboardButton directive <copy-to-clipboard-button target="id" class="" success-message=""></copy-to-clipboard-button>

    interface ICopyToClipboardButtonAttributes extends ng.IAttributes {
        class?: string;
        target: string;
        successMessage?: string;
    }

    interface IClipboardCopyScope extends ng.IScope {
        clipboardCopyController: ClipboardCopyController;
    }
    
    const btnCssClassRe: RegExp = /(^|\s)btn(\s|$)/g;
    const btnStyleCssClassRe: RegExp = /(^|\s)btn-\S/g;
    const paddingCssClassRe: RegExp = /(^|\s)p(l|t|r|b)?-\S/g;

    class ClipboardCopyController implements ng.IController {
        private _cssClass: string[];
        private _targetId: string;
        private _successMessage?: string;

        get cssClass(): string[] { return this._cssClass; }

        get targetId(): string { return this._targetId; }

        constructor(public $scope: IClipboardCopyScope, public copyToClipboardService: CopyToClipboardService) {

        }

        copyToClipboard(): void { this.copyToClipboardService.copy($("#" + this._targetId), this._successMessage); }

        static createDirective(): ng.IDirective {
            return {
                restrict: "E",
                controllerAs: "clipboardCopyController",
                controller: ["$scope", "copyToClipboardService", ClipboardCopyController],
                replace: true,
                template: '<button ng-click="clipboardCopyController.copyToClipboard()" onclick="return false;"><svg class="fill-light stroke-dark" width="16" height="16"><use xlink:href="images/icons.svg#clipboard"></use></svg></button>',
                link: (scope: IClipboardCopyScope, element: JQuery, attr: ICopyToClipboardButtonAttributes, controller: ng.IController) => {
                    scope.clipboardCopyController.initialize(attr.target, attr.successMessage, attr.class);
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

    app.appModule.directive("copyToClipboardButton", ClipboardCopyController.createDirective);

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

    export class targetSysConfigSettings {
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
