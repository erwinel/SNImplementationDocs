/// <reference path="CommonJsUtility.ts" />
import * as CJS from './CommonJsUtility';

let module: ng.IModule = angular.module("mainModule", []);
type MessageItem = string | { label?: string; message: string; encoded?: boolean };
class MessageCollection implements Iterable<string> {
    private _messages: Map<string, MessageItem> = new Map<string, MessageItem>();

    get size(): number { return this._messages.size; }

    get isEmpty(): boolean { return this._messages.size == 0; }

    get notEmpty(): boolean { return this._messages.size > 0; }

    get keys(): IterableIterator<string> { return this._messages.keys(); }

    entries(): string[] { 
        return CJS.asArray(this._messages.entries()).map((value: [string, MessageItem]) => value[1]).map(v =>
            (typeof (v) === 'string') ? v : ((CJS.isWhiteSpaceOrNotString(v.label)) ? ((v.encoded) ? v.message : escape(v.message)) :
                ((v.encoded) ? '<strong>' + v.label + '</strong>: ' + v.message : '<strong>' + escape(v.label) + '</strong>: ' + escape(v.message))));
    }

    get(key: string): MessageItem | undefined {
        if (this._messages.has(key))
            return this._messages.get(key);
    }

    clear(key: string): void { this._messages.clear(); }

    has(key: string): boolean { return this._messages.has(key); }

    set(key: string, value?: MessageItem | null): void {
        if (CJS.isStringAndNotWhiteSpace(value) || (CJS.notNil(value) && CJS.isStringAndNotWhiteSpace(value.message)))
            this._messages.set(key, value);
        else if (this._messages.has(key))
            this._messages.delete(key);
    }

    delete(key: string): void {
        if (this._messages.has(key))
            this._messages.delete(key);
    }

    [Symbol.iterator](): Iterator<string> { return this.entries()[Symbol.iterator](); }
}
class FieldInput {
    private _label: string = '';
    private _requiredFieldMessage = '';
    private _userInput: string = '';
    private _text: string = '';
    private _validationMessages: MessageCollection = new MessageCollection();

    get label(): string { return this._label; }
    set label(value: string) { this._label = CJS.asStringOrDefault(value, '').trim(); }

    get userInput(): string { return this._userInput; }
    set userInput(value: string) {
        let oldValue: string = this._userInput;
        value = CJS.asStringOrDefault(value, '');
        if (value == oldValue)
            return;
        this._userInput = value;
        this.onValueChanged(oldValue);
        if (this._validationMessages.size == 0)
            this._text = value;
    }

    get text(): string { return this._userInput; }
    set text(value: string) {
        let oldValue: string = this._text;
        value = CJS.asStringOrDefault(value, '');
        if (value == oldValue)
            return;
        this._text = value;
        this.onTextChanged(oldValue);
    }

    get requiredFieldMessage(): string { return this._requiredFieldMessage; }
    set requiredFieldMessage(message: string) {
        message = CJS.asStringOrDefault(message, '').trim();
        if (message == this._requiredFieldMessage)
            return;
        this._requiredFieldMessage = message;
        this.onValueChanged(this._text);
        if (this._validationMessages.isEmpty)
            this._text = this._userInput;
    }

    get isRequired(): boolean { return this._requiredFieldMessage.length > 0; }

    get notRequired(): boolean { return this._requiredFieldMessage.length == 0; }

    get isValid(): boolean { return this._validationMessages.size == 0; }

    get notValid(): boolean { return this._validationMessages.size > 0; }

    get errorMessageHTML(): string {
        let arr: string[] = this._validationMessages.entries();
        if (arr.length == 0)
            return "";
        if (arr.length == 1)
            return arr[0];
        return "<ul><li>" + arr.join("</li><li>") + "</li></ul>";
    }

    constructor(label: string, value?: string | null, requiredFieldMessage?: string) {
        this.label = label;
        if (!CJS.isNil(value))
            this.userInput = value;
        if (!CJS.isNil(requiredFieldMessage))
            this.requiredFieldMessage = requiredFieldMessage;
    }

    private raiseValueChanged(oldValue: string): void {
        try {
            this.onValueChanged(oldValue);
            this._validationMessages.delete('error');
        } catch (e) {
            if (CJS.isError(e)) {
                if (CJS.isWhiteSpaceOrNotString(e.stack)) {
                    if (CJS.isWhiteSpaceOrNotString(e.name)) {
                        if (CJS.isWhiteSpaceOrNotString(e.message))
                            this._validationMessages.set('error', { message: '<pre>' + escape(JSON.stringify(e)) + '</pre>', encoded: true });
                        else
                            this._validationMessages.set('error', e.message);
                    } else if (CJS.isWhiteSpaceOrNotString(e.message))
                        this._validationMessages.set('error', e.name);
                    else
                        this._validationMessages.set('error', { label: e.name, message: e.message });
                } else if (CJS.isWhiteSpaceOrNotString(e.name)) {
                    if (CJS.isWhiteSpaceOrNotString(e.message))
                        this._validationMessages.set('error', { message: '<pre>' + escape(JSON.stringify(e)) + '</pre>', encoded: true });
                    else
                        this._validationMessages.set('error', { message: escape(e.message) + '<pre>' + escape(e.stack) + '</pre>', encoded: true });
                } else if (CJS.isWhiteSpaceOrNotString(e.message))
                    this._validationMessages.set('error', { label: escape(e.name), message: '<pre>' + escape(e.stack) + '</pre>', encoded: true });
                else
                    this._validationMessages.set('error', { label: escape(e.name), message: escape(e.message) + '<pre>' + escape(e.stack) + '</pre>', encoded: true });
            } else if (typeof (e) === 'string')
                this._validationMessages.set('error', e);
            else
                this._validationMessages.set('error', { label: 'Error', message: '<pre>' + escape(JSON.stringify(e)) + '</pre>', encoded: true });
        }
    }
    protected onValueChanged(oldValue: string): void {
        if (CJS.isWhiteSpaceOrNotString(this._userInput) && this._requiredFieldMessage.length > 0)
            this._validationMessages.set('required', this._requiredFieldMessage);
        else
            this._validationMessages.delete('required');
    }

    protected onTextChanged(oldValue: string): void { }
}

class UrlFieldInput extends FieldInput {
    private _url?: URL;

    get url(): URL | undefined { return this._url; }
    set url(url: URL | undefined) {
        let oldUrl: URL | undefined = this._url;
        if (CJS.isNil(url)) {
            if (typeof (this._url) === 'undefined')
                return;
            this._url = undefined;
        } else {
            if (typeof (this._url) !== 'undefined' && this._url.href === url.href)
                return;
            this._url = url;
        }
        this._url = (CJS.isNil(url)) ? undefined : url;
        let text: string = (typeof (this._url) === 'undefined') ? '' : this._url.href;
        if (this.text.trim() !== text)
            this.text = (typeof (this._url) === 'undefined') ? '' : this._url.href;
        this.onUrlChanged(oldUrl);
    }

    constructor(label: string, value?: string | URL | null, requiredFieldMessage?: string) {
        super(label, (typeof (value) !== 'object' || value == null) ? <string | null | undefined>value : value.href, requiredFieldMessage);
        if (typeof (value) === 'object' && value !== null)
            this.url = value;
    }

    protected onValueChanged(oldValue: string) {
        super.onValueChanged(oldValue);
        if (CJS.isWhiteSpaceOrNotString(this.userInput)) {
            if (this.isRequired)
                return;
        } else {
            let url: URL = new URL(this.userInput.trim());
            if (typeof (url) !== 'object' || url === null)
                throw new Error('Could not parse URL');
            this.onUrlChanging(url);
        }
    }
    protected onUrlChanging(newUrl: URL) { }
    protected onUrlChanged(oldUrl: URL) { }
    protected onTextChanged(oldValue: string): void {
        let oldUrl: URL | undefined = this._url;
        if (CJS.isWhiteSpaceOrNotString(this.text)) {
            if (typeof (oldUrl) === 'undefined')
                return;
            this._url = undefined;
        } else {
            let text: string = this.text.trim();
            if (typeof (oldUrl) !== 'undefined' && oldUrl.href === text)
                return;
            let url: URL | undefined;
            try { url = new URL(this.text.trim()); } catch { /* okay to ignore */ }
            if (CJS.isNil(url)) {
                if (typeof (this._url) === 'undefined')
                    return;
                this._url = undefined;
            } else {
                if (typeof (this._url) !== 'undefined' && this._url.href === url.href)
                    return;
                this._url = url;
            }
            this._url = (CJS.isNil(url)) ? undefined : url;
        }
        this.onUrlChanged(oldUrl);
    }
}


// #region Cards

interface ICardParentScope extends ng.IScope {
    cardNames: string[];
    selectedCard?: string

}
interface ICardScope extends ng.IScope {
    name: string,
    cardNumber: number,
    headingText: string,
    iconUrl: 'images/collapse.svg' | 'images/expand.svg',
    actionVerb: 'Collapse' | 'Expand',
    visible: boolean,
    $parent: ICardParentScope,
    select(): void,
    deselect(): void,
    toggleSelect(): boolean
}
abstract class cardController implements ng.IController {
    $doCheck() {
        if (this.$scope.$parent.selectedCard === this.$scope.name) {
            if (!this.$scope.visible)
                this.select();
        } else if (this.$scope.visible)
            this.deselect();
    }
    select(): void {
        this.$scope.iconUrl = 'images/collapse.svg';
        this.$scope.actionVerb = 'Collapse';
        this.$scope.visible = true;
        this.$scope.$parent.selectedCard = this.$scope.name;
    }
    deselect(): void {
        this.$scope.iconUrl = 'images/expand.svg';
        this.$scope.actionVerb = 'Expand';
        this.$scope.visible = false;
        if (this.$scope.$parent.selectedCard === this.$scope.name)
            this.$scope.$parent.selectedCard = undefined;
    }
    toggleSelect(): boolean {
        if (this.$scope.$parent.selectedCard === this.$scope.name) {
            this.deselect();
            return false;
        }
        this.select();
        return true;
    }
    constructor(protected $scope: ICardScope, name: string, headingText: string) {
        $scope.name = name;
        $scope.headingText = headingText;
        let i: number = $scope.$parent.cardNames.indexOf(name);
        if (i < 0) {
            $scope.cardNumber = $scope.$parent.cardNames.length + 1;
            $scope.$parent.cardNames.push(name);
        }
        else
            $scope.cardNumber = i + 1;
        $scope.select = this.select;
        $scope.deselect = this.deselect;
        $scope.toggleSelect = this.toggleSelect;
        if ($scope.$parent.selectedCard === name || (i < 1 && typeof($scope.$parent.selectedCard) === 'undefined'))
            this.select();
        else
            this.deselect();
    }
}

// #region Top Level Cards

type TopLevelCardName = 'adminLogins' | 'importInitiaUpdateSet' | 'importUtilityApp' | 'initialConfig' | 'uploadLogoImage' | 'bulkPluginActivation' | 'activeDirectoryImport' | 'importPhysNetworks' | 'serviceCatalogConfig';

interface ITopLevelCardState extends ICardScope, IMainControllerScope {
    name: TopLevelCardName;
    $parent: IMainControllerScope;
}

abstract class topLevelCardController extends cardController {
    constructor(protected $scope: ITopLevelCardState, name: TopLevelCardName, headingText: string) {
        super($scope, name, headingText);
    }
}

class adminLoginsController extends topLevelCardController {
    static cardName: TopLevelCardName = 'adminLogins';
    constructor($scope: ITopLevelCardState) { super($scope, adminLoginsController.cardName, 'Add Administrative Logins'); }
}
module.controller("adminLoginsController", ['$scope', adminLoginsController]);

class importInitiaUpdateSetController extends topLevelCardController {
    static cardName: TopLevelCardName = 'importInitiaUpdateSet';
    constructor($scope: ITopLevelCardState) { super($scope, importInitiaUpdateSetController.cardName, 'Import Initial Update Set'); }
}
module.controller("importInitiaUpdateSetController", ['$scope', importInitiaUpdateSetController]);

class importUtilityAppController extends topLevelCardController {
    static cardName: TopLevelCardName = 'importUtilityApp';
    constructor($scope: ITopLevelCardState) { super($scope, importUtilityAppController.cardName, 'Import Utility Application'); }
}
module.controller("importUtilityAppController", ['$scope', importUtilityAppController]);

class initialConfigController extends topLevelCardController {
    static cardName: TopLevelCardName = 'initialConfig';
    constructor($scope: ITopLevelCardState) { super($scope, initialConfigController.cardName, 'Initial Config'); }
}
module.controller("initialConfigController", ['$scope', initialConfigController]);

class uploadLogoImageController extends topLevelCardController {
    static cardName: TopLevelCardName = 'uploadLogoImage';
    constructor($scope: ITopLevelCardState) { super($scope, uploadLogoImageController.cardName, 'Upload logo image'); }
}
module.controller("uploadLogoImageController", ['$scope', uploadLogoImageController]);

class bulkPluginActivationController extends topLevelCardController {
    static cardName: TopLevelCardName = 'bulkPluginActivation';
    constructor($scope: ITopLevelCardState) { super($scope, bulkPluginActivationController.cardName, 'Bulk Plugin Activation'); }
}
module.controller("bulkPluginActivationController", ['$scope', bulkPluginActivationController]);

class activeDirectoryImportController extends topLevelCardController {
    static cardName: TopLevelCardName = 'activeDirectoryImport';
    constructor($scope: ITopLevelCardState) { super($scope, activeDirectoryImportController.cardName, 'Configure Active Directory Import'); }
}
module.controller("activeDirectoryImportController", ['$scope', activeDirectoryImportController]);

class importPhysNetworksController extends topLevelCardController {
    static cardName: TopLevelCardName = 'importPhysNetworks';
    constructor($scope: ITopLevelCardState) { super($scope, importPhysNetworksController.cardName, 'Import Physical Networks Application'); }
}
module.controller("importPhysNetworksController", ['$scope', importPhysNetworksController]);

class serviceCatalogConfigController extends topLevelCardController {
    static cardName: TopLevelCardName = 'serviceCatalogConfig';
    constructor($scope: ITopLevelCardState) { super($scope, serviceCatalogConfigController.cardName, 'Import Service Catalog Update Set'); }
}
module.controller("serviceCatalogConfigController", ['$scope', serviceCatalogConfigController]);

// #endregion

// #endregion

// #region Field Edit

interface IFieldInputParentScope extends ng.IScope {
    inputFieldValueChanged(name: string, value: any | undefined);
    getInputFieldValue(name: string): any | undefined;
}
interface IFieldInputScope extends ng.IScope {
    name: string;
    label: string;
    text: string;
    value: any;
    isRequired: boolean;
    isValid: boolean;
    $parent: IFieldInputParentScope;
    errorMessages: { label?: string, message: string, details?: string }[];
}
abstract class fieldEditController implements ng.IController {
    private _name: string;
    private _text: string = '';
    private _value?: any = undefined;
    private _isRequired: boolean = false;

    get name(): string { return this._name; }

    get text(): string { return this._text; }
    set text(value: string) {
        value = CJS.asStringOrDefault(value, '');
        if (value === this._text)
            return;
        this._isRequired = this.$scope.isRequired == true;
        this.$scope.errorMessages = [];
        this._text = this.$scope.text = value;
        this.validateText();
        this.$scope.isValid = (this.$scope.errorMessages.length == 0);
        if (this.$scope.isValid)
            this.$scope.value = this._value = this.convertToValue(this._text, this._value);
    }

    private ensureText(): boolean {
        if (this.$scope.text !== this._text) {
            this.text = this.$scope.text;
            return true;
        }
        return false;
    }

    $doCheck() {
        if (!(this.ensureText() && this._isRequired == this.$scope.isRequired)) {
            this._isRequired = this.$scope.isRequired == true;
            if (this._isRequired) {
                this.$scope.errorMessages = [];
                if (this._value !== this.$scope.value) {
                    this._value = this.$scope.value;
                    this.$scope.text = this._text = this.convertToString(this._value);
                }
                this.validateText();
                return;
            }
        }

        if (this._value !== this.$scope.value) {
            this.$scope.errorMessages = [];
            this._value = this.$scope.value;
            this.$scope.text = this._text = this.convertToString(this._value);
            this.$scope.isValid = true;
        }
    }

    constructor(protected $scope: IFieldInputScope, name: string, label?: string) {
        $scope.errorMessages = [];
        $scope.name = this._name = name;
        $scope.label = (CJS.isStringAndNotWhiteSpace(label)) ? label : name;
        $scope.value = this._value = this.coerceValue($scope.$parent.getInputFieldValue(name));
        $scope.text = this._text = this.convertToString(this._value);
        this.validateText();
        $scope.isValid = ($scope.errorMessages.length == 0);
    }

    protected coerceValue(value: any | null | undefined): any | null | undefined { return value; }
    protected convertToString(value: any | null | undefined): string { return CJS.asStringOrDefault(value, ''); }
    protected convertToValue(text: string, currentValue: any | null | undefined): any | null | undefined { return text; }
    protected validateText() {
        if (this.$scope.isRequired && CJS.isWhiteSpaceOrNotString(this._text))
            this.$scope.errorMessages.push({ message: 'Value is required.' });
    }
}

// #region URL Field Edit

interface IUrlFieldInputScope extends IFieldInputScope { url?: URL; }
abstract class urlFieldEditController extends fieldEditController {
    constructor($scope: IUrlFieldInputScope, name: string, label?: string) { super($scope, name); }
    protected validateText() {
        if (this.$scope.isRequired && CJS.isWhiteSpaceOrNotString(this.text))
            this.$scope.errorMessages.push({ message: 'Value is required.' });
    }
}

class serviceNowUrlFieldEditController extends urlFieldEditController {
    static readonly fieldName: string = 'serviceNowUrl';
    constructor($scope: IUrlFieldInputScope) { super($scope, serviceNowUrlFieldEditController.fieldName, 'ServiceNow URL'); }
}
module.controller("serviceNowUrlFieldEditController", ['$scope', serviceNowUrlFieldEditController]);

class gitRepositoryBaseUrlFieldEditController extends urlFieldEditController {
    static readonly fieldName: string = 'gitRepositoryBaseUrl';
    constructor($scope: IUrlFieldInputScope) { super($scope, gitRepositoryBaseUrlFieldEditController.fieldName, 'Git Repository Base URL'); }
}
module.controller("gitRepositoryBaseUrlFieldEditController", ['$scope', gitRepositoryBaseUrlFieldEditController]);

// #endregion

// #endregion

// #region mainController

interface IFieldDefinitionsScope extends ng.IScope {
    serviceNowUrl: string;
    gitRepositoryBaseUrl: string;
    isVisible: boolean;
    show(): void;
    hide(): void;
}
interface IDialogScope extends ng.IScope {
    isVisible: boolean;
    title: string;
    message: string;
    bodyClass: string;
    show(message: string, type?: DialogMessageType, title?: string);
    close();
}
type DialogMessageType = 'info' | 'warning' | 'danger' | 'primary' | 'success';

interface IMainControllerScope extends ng.IScope, ICardParentScope, IFieldInputParentScope {
    definitions: IFieldDefinitionsScope;
    cardNames: TopLevelCardName[];
    selectedCard?: TopLevelCardName
    popupDialog: IDialogScope;
}
class mainController implements ng.IController {
    $doCheck() { }
    showFieldDefinitions() { this.$scope.definitions.isVisible = true; }
    hideFieldDefinitions() { this.$scope.definitions.isVisible = false; }
    showDialog(message: string, type: DialogMessageType = 'info', title?: string) {
        if (CJS.isWhiteSpaceOrNotString(title)) {
            switch (type) {
                case 'warning':
                    this.$scope.popupDialog.title = 'Warning';
                    break;
                case 'danger':
                    this.$scope.popupDialog.title = 'Critical';
                    break;
                case 'success':
                    this.$scope.popupDialog.title = 'Success';
                    break;
                default:
                    this.$scope.popupDialog.title = 'Notice';
            }
        } else
            this.$scope.popupDialog.title = title;
        this.$scope.popupDialog.bodyClass = 'modal-body alert alert-' + type;
        this.$scope.popupDialog.message = (CJS.isNil(message)) ? '' : message;
        this.$scope.popupDialog.isVisible = true;
    }
    closeDialog() { this.$scope.popupDialog.isVisible = false; }
    inputFieldValueChanged(name: string, value: any | undefined) {
        switch (name) {
            case 'serviceNowUrl':
                this.$scope.definitions.serviceNowUrl = <string>value;
                break;
            case 'gitRepositoryBaseUrl':
                this.$scope.definitions.gitRepositoryBaseUrl = <string>value;
                break;
        }
    }
    getInputFieldValue(name: string): any | undefined {
        switch (name) {
            case 'serviceNowUrl':
                return this.$scope.definitions.serviceNowUrl;
            case 'gitRepositoryBaseUrl':
                return this.$scope.definitions.gitRepositoryBaseUrl;
        }
    }
    constructor(protected $scope: IMainControllerScope) {
        $scope.definitions = <IFieldDefinitionsScope>($scope.$new());
        $scope.definitions.serviceNowUrl = 'https://inscomscd.service-now.com';
        $scope.definitions.gitRepositoryBaseUrl = 'https://github.com/erwinel';
        $scope.definitions.isVisible = true;
        $scope.definitions.show = this.showFieldDefinitions;
        $scope.definitions.hide = this.hideFieldDefinitions;
        $scope.cardNames = ['adminLogins', 'importInitiaUpdateSet', 'importUtilityApp', 'initialConfig', 'uploadLogoImage', 'bulkPluginActivation', 'activeDirectoryImport', 'importPhysNetworks', 'serviceCatalogConfig'];
        $scope.selectedCard = 'adminLogins';
        $scope.popupDialog = <IDialogScope>($scope.$new());
        $scope.popupDialog.isVisible = false;
        $scope.popupDialog.title = '';
        $scope.popupDialog.message = '';
        $scope.popupDialog.bodyClass = '';
        $scope.popupDialog.show = this.showDialog;
        $scope.popupDialog.close = this.closeDialog;
        $scope.inputFieldValueChanged = this.inputFieldValueChanged;
        $scope.getInputFieldValue = this.getInputFieldValue;
    }
}

module.controller("mainController", ['$scope', mainController]);

// #endregion
