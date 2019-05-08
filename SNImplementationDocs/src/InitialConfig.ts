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

interface ICardState extends ng.IScope {
    cardNumber: number,
    headingText: string,
    iconUrl: 'images/collapse.svg' | 'images/expand.svg',
    actionVerb: 'Collapse' | 'Expand',
    visible: boolean
}
type TopLevelCardNames = 'adminLogins' | 'importInitiaUpdateSet' | 'importUtilityApp' | 'initialConfig' | 'uploadLogoImage' | 'bulkPluginActivation' | 'activeDirectoryImport' | 'importPhysNetworks' | 'serviceCatalogConfig';
interface IFieldInput extends ng.IScope {
    label: string;
    userInput: string;
    text: string;
    isRequired: boolean;
    isValid: boolean;
    errorMessages: { label?: string, message: string, details?: string }[];
}
interface IUrlFieldInput extends IFieldInput {
    url?: URL;
}
interface IFieldDefinitions extends ng.IScope {
    serviceNowUrl: IUrlFieldInput;
    gitRepositoryBaseUrl: IUrlFieldInput;
    show: boolean;
}
interface IDialogInfo extends ng.IScope {
    visible: boolean;
    title: string;
    message: string;
    bodyClass: string;
}
interface ITopLevelCards extends ng.IScope {
    adminLogins: ICardState;
    importInitiaUpdateSet: ICardState;
    importUtilityApp: ICardState;
    initialConfig: ICardState;
    uploadLogoImage: ICardState;
    bulkPluginActivation: ICardState;
    activeDirectoryImport: ICardState;
    importPhysNetworks: ICardState;
    serviceCatalogConfig: ICardState;
}
interface IMainControllerScope extends ng.IScope {
    definitions: IFieldDefinitions;
    showDefinitionFields: Function;
    closeDefinitionFields: Function;
    cards: ITopLevelCards;
    selectedCard?: TopLevelCardNames
    toggleCardVisibility: { (name: TopLevelCardNames): void; };
    dialogInfo: IDialogInfo;
    showDialog(message: string, type?: 'info' | 'warn' | 'danger' | 'primary' | 'success', title?: string);
    closeDialog();
}

function newDefinition(parent: IFieldDefinitions, label: string, url: string): IUrlFieldInput {
    let result: IUrlFieldInput = <IUrlFieldInput>parent.$new(true);
    result.label = label;
    result.url = new URL(url);
    result.userInput = result.text = url;
    result.isRequired = true;
    result.isValid = true;
    result.errorMessages = [];
    return result;
}

function makeTopLevelCardScope(this: ITopLevelCards, value: { name: TopLevelCardNames, headingText: string }, index: number): void {
    let card: ICardState = <ICardState>this.$new(true);
    card.cardNumber = index + 1;
    card.headingText = value.headingText;
    card.iconUrl = 'images/expand.svg';
    card.actionVerb = 'Expand';
    card.visible = false;
    this[value.name] = card;
}
module.controller("mainController", function ($scope: IMainControllerScope) {
    $scope.cards = <ITopLevelCards>$scope.$new(true);
    let orderedTopLevelCards: { name: TopLevelCardNames, headingText: string }[] = [
        { name: 'adminLogins', headingText: 'Add Administrative Logins' },
        { name: 'importInitiaUpdateSet', headingText: 'Import Initial Update Set' },
        { name: 'importUtilityApp', headingText: 'Import Utility Application' },
        { name: 'initialConfig', headingText: 'Initial Config' },
        { name: 'uploadLogoImage', headingText: 'Upload logo image' },
        { name: 'bulkPluginActivation', headingText: 'Bulk Plugin Activation' },
        { name: 'activeDirectoryImport', headingText: 'Configure Active Directory Import' },
        { name: 'importPhysNetworks', headingText: 'Import Physical Networks Application' },
        { name: 'serviceCatalogConfig', headingText: 'Import Service Catalog Update Set' }
    ];
    orderedTopLevelCards.forEach(makeTopLevelCardScope, $scope.cards);

    $scope.cards.toggleVisibility = function (name: TopLevelCardNames) {
        let card: ICardState;
        if (typeof ($scope.selectedCard) !== 'undefined') {
            card = $scope.cards[$scope.selectedCard];
            card.iconUrl = 'images/collapse.svg';
            card.actionVerb = 'Collapse';
            card.visible = true;
        }
        card = $scope.cards[name];
        if (name === $scope.selectedCard)
            $scope.selectedCard = undefined;
        else {
            card.iconUrl = 'images/collapse.svg';
            card.actionVerb = 'Collapse';
            card.visible = true;
            $scope.selectedCard = name;
        }
    };
    $scope.toggleCardVisibility(orderedTopLevelCards[0].name);

    $scope.definitions = <IFieldDefinitions>$scope.$new(true);
    $scope.definitions.serviceNowUrl = newDefinition($scope.definitions, 'ServiceNow URL', 'https://inscomscd.service-now.com');
    $scope.definitions.gitRepositoryBaseUrl = newDefinition($scope.definitions, 'GIT Repository Base URL', 'https://github.com/erwinel');

    $scope.definitions.show = true;
    $scope.showDefinitionFields = function () { $scope.definitions.show = true; };
    $scope.closeDefinitionFields = function () { $scope.definitions.show = false; };
    $scope.dialogInfo = <IDialogInfo>$scope.$new();
    $scope.dialogInfo.visible = false;
    $scope.dialogInfo.title = '';
    $scope.dialogInfo.message = '';
    $scope.dialogInfo.bodyClass = '';
    $scope.showDialog = function (message: string, type: 'info' | 'warn' | 'danger' | 'primary' | 'success' = 'info', title?: string) {
        if (CJS.isWhiteSpaceOrNotString(title)) {
            switch (type) {
                case 'warn':
                    $scope.dialogInfo.title = 'Warning';
                    break;
                case 'danger':
                    $scope.dialogInfo.title = 'Critical';
                    break;
                case 'success':
                    $scope.dialogInfo.title = 'Success';
                    break;
                default:
                    $scope.dialogInfo.title = 'Notice';
            }
        } else
            $scope.dialogInfo.title = title;
        $scope.dialogInfo.bodyClass = 'modal-body alert alert-' + type;
        $scope.dialogInfo.message = (CJS.isNil(message)) ? '' : message;
        $scope.dialogInfo.visible = true;
    };
    $scope.closeDialog = function () { $scope.dialogInfo.visible = false; };
});