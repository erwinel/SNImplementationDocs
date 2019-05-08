"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="CommonJsUtility.ts" />
const CJS = require("./CommonJsUtility");
let module = angular.module("mainModule", []);
class MessageCollection {
    constructor() {
        this._messages = new Map();
    }
    get size() { return this._messages.size; }
    get isEmpty() { return this._messages.size == 0; }
    get notEmpty() { return this._messages.size > 0; }
    get keys() { return this._messages.keys(); }
    entries() {
        return CJS.asArray(this._messages.entries()).map((value) => value[1]).map(v => (typeof (v) === 'string') ? v : ((CJS.isWhiteSpaceOrNotString(v.label)) ? ((v.encoded) ? v.message : escape(v.message)) :
            ((v.encoded) ? '<strong>' + v.label + '</strong>: ' + v.message : '<strong>' + escape(v.label) + '</strong>: ' + escape(v.message))));
    }
    get(key) {
        if (this._messages.has(key))
            return this._messages.get(key);
    }
    clear(key) { this._messages.clear(); }
    has(key) { return this._messages.has(key); }
    set(key, value) {
        if (CJS.isStringAndNotWhiteSpace(value) || (CJS.notNil(value) && CJS.isStringAndNotWhiteSpace(value.message)))
            this._messages.set(key, value);
        else if (this._messages.has(key))
            this._messages.delete(key);
    }
    delete(key) {
        if (this._messages.has(key))
            this._messages.delete(key);
    }
    [Symbol.iterator]() { return this.entries()[Symbol.iterator](); }
}
class FieldInput {
    constructor(label, value, requiredFieldMessage) {
        this._label = '';
        this._requiredFieldMessage = '';
        this._userInput = '';
        this._text = '';
        this._validationMessages = new MessageCollection();
        this.label = label;
        if (!CJS.isNil(value))
            this.userInput = value;
        if (!CJS.isNil(requiredFieldMessage))
            this.requiredFieldMessage = requiredFieldMessage;
    }
    get label() { return this._label; }
    set label(value) { this._label = CJS.asStringOrDefault(value, '').trim(); }
    get userInput() { return this._userInput; }
    set userInput(value) {
        let oldValue = this._userInput;
        value = CJS.asStringOrDefault(value, '');
        if (value == oldValue)
            return;
        this._userInput = value;
        this.onValueChanged(oldValue);
        if (this._validationMessages.size == 0)
            this._text = value;
    }
    get text() { return this._userInput; }
    set text(value) {
        let oldValue = this._text;
        value = CJS.asStringOrDefault(value, '');
        if (value == oldValue)
            return;
        this._text = value;
        this.onTextChanged(oldValue);
    }
    get requiredFieldMessage() { return this._requiredFieldMessage; }
    set requiredFieldMessage(message) {
        message = CJS.asStringOrDefault(message, '').trim();
        if (message == this._requiredFieldMessage)
            return;
        this._requiredFieldMessage = message;
        this.onValueChanged(this._text);
        if (this._validationMessages.isEmpty)
            this._text = this._userInput;
    }
    get isRequired() { return this._requiredFieldMessage.length > 0; }
    get notRequired() { return this._requiredFieldMessage.length == 0; }
    get isValid() { return this._validationMessages.size == 0; }
    get notValid() { return this._validationMessages.size > 0; }
    get errorMessageHTML() {
        let arr = this._validationMessages.entries();
        if (arr.length == 0)
            return "";
        if (arr.length == 1)
            return arr[0];
        return "<ul><li>" + arr.join("</li><li>") + "</li></ul>";
    }
    raiseValueChanged(oldValue) {
        try {
            this.onValueChanged(oldValue);
            this._validationMessages.delete('error');
        }
        catch (e) {
            if (CJS.isError(e)) {
                if (CJS.isWhiteSpaceOrNotString(e.stack)) {
                    if (CJS.isWhiteSpaceOrNotString(e.name)) {
                        if (CJS.isWhiteSpaceOrNotString(e.message))
                            this._validationMessages.set('error', { message: '<pre>' + escape(JSON.stringify(e)) + '</pre>', encoded: true });
                        else
                            this._validationMessages.set('error', e.message);
                    }
                    else if (CJS.isWhiteSpaceOrNotString(e.message))
                        this._validationMessages.set('error', e.name);
                    else
                        this._validationMessages.set('error', { label: e.name, message: e.message });
                }
                else if (CJS.isWhiteSpaceOrNotString(e.name)) {
                    if (CJS.isWhiteSpaceOrNotString(e.message))
                        this._validationMessages.set('error', { message: '<pre>' + escape(JSON.stringify(e)) + '</pre>', encoded: true });
                    else
                        this._validationMessages.set('error', { message: escape(e.message) + '<pre>' + escape(e.stack) + '</pre>', encoded: true });
                }
                else if (CJS.isWhiteSpaceOrNotString(e.message))
                    this._validationMessages.set('error', { label: escape(e.name), message: '<pre>' + escape(e.stack) + '</pre>', encoded: true });
                else
                    this._validationMessages.set('error', { label: escape(e.name), message: escape(e.message) + '<pre>' + escape(e.stack) + '</pre>', encoded: true });
            }
            else if (typeof (e) === 'string')
                this._validationMessages.set('error', e);
            else
                this._validationMessages.set('error', { label: 'Error', message: '<pre>' + escape(JSON.stringify(e)) + '</pre>', encoded: true });
        }
    }
    onValueChanged(oldValue) {
        if (CJS.isWhiteSpaceOrNotString(this._userInput) && this._requiredFieldMessage.length > 0)
            this._validationMessages.set('required', this._requiredFieldMessage);
        else
            this._validationMessages.delete('required');
    }
    onTextChanged(oldValue) { }
}
class UrlFieldInput extends FieldInput {
    get url() { return this._url; }
    set url(url) {
        let oldUrl = this._url;
        if (CJS.isNil(url)) {
            if (typeof (this._url) === 'undefined')
                return;
            this._url = undefined;
        }
        else {
            if (typeof (this._url) !== 'undefined' && this._url.href === url.href)
                return;
            this._url = url;
        }
        this._url = (CJS.isNil(url)) ? undefined : url;
        let text = (typeof (this._url) === 'undefined') ? '' : this._url.href;
        if (this.text.trim() !== text)
            this.text = (typeof (this._url) === 'undefined') ? '' : this._url.href;
        this.onUrlChanged(oldUrl);
    }
    constructor(label, value, requiredFieldMessage) {
        super(label, (typeof (value) !== 'object' || value == null) ? value : value.href, requiredFieldMessage);
        if (typeof (value) === 'object' && value !== null)
            this.url = value;
    }
    onValueChanged(oldValue) {
        super.onValueChanged(oldValue);
        if (CJS.isWhiteSpaceOrNotString(this.userInput)) {
            if (this.isRequired)
                return;
        }
        else {
            let url = new URL(this.userInput.trim());
            if (typeof (url) !== 'object' || url === null)
                throw new Error('Could not parse URL');
            this.onUrlChanging(url);
        }
    }
    onUrlChanging(newUrl) { }
    onUrlChanged(oldUrl) { }
    onTextChanged(oldValue) {
        let oldUrl = this._url;
        if (CJS.isWhiteSpaceOrNotString(this.text)) {
            if (typeof (oldUrl) === 'undefined')
                return;
            this._url = undefined;
        }
        else {
            let text = this.text.trim();
            if (typeof (oldUrl) !== 'undefined' && oldUrl.href === text)
                return;
            let url;
            try {
                url = new URL(this.text.trim());
            }
            catch ( /* okay to ignore */_a) { /* okay to ignore */ }
            if (CJS.isNil(url)) {
                if (typeof (this._url) === 'undefined')
                    return;
                this._url = undefined;
            }
            else {
                if (typeof (this._url) !== 'undefined' && this._url.href === url.href)
                    return;
                this._url = url;
            }
            this._url = (CJS.isNil(url)) ? undefined : url;
        }
        this.onUrlChanged(oldUrl);
    }
}
function newDefinition(parent, label, url) {
    let result = parent.$new(true);
    result.label = label;
    result.url = new URL(url);
    result.userInput = result.text = url;
    result.isRequired = true;
    result.isValid = true;
    result.errorMessages = [];
    return result;
}
function makeTopLevelCardScope(value, index) {
    let card = this.$new(true);
    card.cardNumber = index + 1;
    card.headingText = value.headingText;
    card.iconUrl = 'images/expand.svg';
    card.actionVerb = 'Expand';
    card.visible = false;
    this[value.name] = card;
}
module.controller("mainController", function ($scope) {
    $scope.cards = $scope.$new(true);
    let orderedTopLevelCards = [
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
    $scope.cards.toggleVisibility = function (name) {
        let card;
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
    $scope.definitions = $scope.$new(true);
    $scope.definitions.serviceNowUrl = newDefinition($scope.definitions, 'ServiceNow URL', 'https://inscomscd.service-now.com');
    $scope.definitions.gitRepositoryBaseUrl = newDefinition($scope.definitions, 'GIT Repository Base URL', 'https://github.com/erwinel');
    $scope.definitions.show = true;
    $scope.showDefinitionFields = function () { $scope.definitions.show = true; };
    $scope.closeDefinitionFields = function () { $scope.definitions.show = false; };
    $scope.dialogInfo = $scope.$new();
    $scope.dialogInfo.visible = false;
    $scope.dialogInfo.title = '';
    $scope.dialogInfo.message = '';
    $scope.dialogInfo.bodyClass = '';
    $scope.showDialog = function (message, type = 'info', title) {
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
        }
        else
            $scope.dialogInfo.title = title;
        $scope.dialogInfo.bodyClass = 'modal-body alert alert-' + type;
        $scope.dialogInfo.message = (CJS.isNil(message)) ? '' : message;
        $scope.dialogInfo.visible = true;
    };
    $scope.closeDialog = function () { $scope.dialogInfo.visible = false; };
});
//# sourceMappingURL=InitialConfig.js.map