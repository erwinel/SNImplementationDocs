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
class cardController {
    constructor($scope, name, headingText) {
        this.$scope = $scope;
        $scope.name = name;
        $scope.headingText = headingText;
        let i = $scope.$parent.cardNames.indexOf(name);
        if (i < 0) {
            $scope.cardNumber = $scope.$parent.cardNames.length + 1;
            $scope.$parent.cardNames.push(name);
        }
        else
            $scope.cardNumber = i + 1;
        $scope.select = this.select;
        $scope.deselect = this.deselect;
        $scope.toggleSelect = this.toggleSelect;
        if ($scope.$parent.selectedCard === name || (i < 1 && typeof ($scope.$parent.selectedCard) === 'undefined'))
            this.select();
        else
            this.deselect();
    }
    $doCheck() {
        if (this.$scope.$parent.selectedCard === this.$scope.name) {
            if (!this.$scope.visible)
                this.select();
        }
        else if (this.$scope.visible)
            this.deselect();
    }
    select() {
        this.$scope.iconUrl = 'images/collapse.svg';
        this.$scope.actionVerb = 'Collapse';
        this.$scope.visible = true;
        this.$scope.$parent.selectedCard = this.$scope.name;
    }
    deselect() {
        this.$scope.iconUrl = 'images/expand.svg';
        this.$scope.actionVerb = 'Expand';
        this.$scope.visible = false;
        if (this.$scope.$parent.selectedCard === this.$scope.name)
            this.$scope.$parent.selectedCard = undefined;
    }
    toggleSelect() {
        if (this.$scope.$parent.selectedCard === this.$scope.name) {
            this.deselect();
            return false;
        }
        this.select();
        return true;
    }
}
class topLevelCardController extends cardController {
    constructor($scope, name, headingText) {
        super($scope, name, headingText);
        this.$scope = $scope;
    }
}
class adminLoginsController extends topLevelCardController {
    constructor($scope) { super($scope, adminLoginsController.cardName, 'Add Administrative Logins'); }
}
adminLoginsController.cardName = 'adminLogins';
module.controller("adminLoginsController", ['$scope', adminLoginsController]);
class importInitiaUpdateSetController extends topLevelCardController {
    constructor($scope) { super($scope, importInitiaUpdateSetController.cardName, 'Import Initial Update Set'); }
}
importInitiaUpdateSetController.cardName = 'importInitiaUpdateSet';
module.controller("importInitiaUpdateSetController", ['$scope', importInitiaUpdateSetController]);
class importUtilityAppController extends topLevelCardController {
    constructor($scope) { super($scope, importUtilityAppController.cardName, 'Import Utility Application'); }
}
importUtilityAppController.cardName = 'importUtilityApp';
module.controller("importUtilityAppController", ['$scope', importUtilityAppController]);
class initialConfigController extends topLevelCardController {
    constructor($scope) { super($scope, initialConfigController.cardName, 'Initial Config'); }
}
initialConfigController.cardName = 'initialConfig';
module.controller("initialConfigController", ['$scope', initialConfigController]);
class uploadLogoImageController extends topLevelCardController {
    constructor($scope) { super($scope, uploadLogoImageController.cardName, 'Upload logo image'); }
}
uploadLogoImageController.cardName = 'uploadLogoImage';
module.controller("uploadLogoImageController", ['$scope', uploadLogoImageController]);
class bulkPluginActivationController extends topLevelCardController {
    constructor($scope) { super($scope, bulkPluginActivationController.cardName, 'Bulk Plugin Activation'); }
}
bulkPluginActivationController.cardName = 'bulkPluginActivation';
module.controller("bulkPluginActivationController", ['$scope', bulkPluginActivationController]);
class activeDirectoryImportController extends topLevelCardController {
    constructor($scope) { super($scope, activeDirectoryImportController.cardName, 'Configure Active Directory Import'); }
}
activeDirectoryImportController.cardName = 'activeDirectoryImport';
module.controller("activeDirectoryImportController", ['$scope', activeDirectoryImportController]);
class importPhysNetworksController extends topLevelCardController {
    constructor($scope) { super($scope, importPhysNetworksController.cardName, 'Import Physical Networks Application'); }
}
importPhysNetworksController.cardName = 'importPhysNetworks';
module.controller("importPhysNetworksController", ['$scope', importPhysNetworksController]);
class serviceCatalogConfigController extends topLevelCardController {
    constructor($scope) { super($scope, serviceCatalogConfigController.cardName, 'Import Service Catalog Update Set'); }
}
serviceCatalogConfigController.cardName = 'serviceCatalogConfig';
module.controller("serviceCatalogConfigController", ['$scope', serviceCatalogConfigController]);
class fieldEditController {
    constructor($scope, name, label) {
        this.$scope = $scope;
        this._text = '';
        this._value = undefined;
        this._isRequired = false;
        $scope.errorMessages = [];
        $scope.name = this._name = name;
        $scope.label = (CJS.isStringAndNotWhiteSpace(label)) ? label : name;
        $scope.value = this._value = this.coerceValue($scope.$parent.getInputFieldValue(name));
        $scope.text = this._text = this.convertToString(this._value);
        this.validateText();
        $scope.isValid = ($scope.errorMessages.length == 0);
    }
    get name() { return this._name; }
    get text() { return this._text; }
    set text(value) {
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
    ensureText() {
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
    coerceValue(value) { return value; }
    convertToString(value) { return CJS.asStringOrDefault(value, ''); }
    convertToValue(text, currentValue) { return text; }
    validateText() {
        if (this.$scope.isRequired && CJS.isWhiteSpaceOrNotString(this._text))
            this.$scope.errorMessages.push({ message: 'Value is required.' });
    }
}
class urlFieldEditController extends fieldEditController {
    constructor($scope, name, label) { super($scope, name); }
    validateText() {
        if (this.$scope.isRequired && CJS.isWhiteSpaceOrNotString(this.text))
            this.$scope.errorMessages.push({ message: 'Value is required.' });
    }
}
class serviceNowUrlFieldEditController extends urlFieldEditController {
    constructor($scope) { super($scope, serviceNowUrlFieldEditController.fieldName, 'ServiceNow URL'); }
}
serviceNowUrlFieldEditController.fieldName = 'serviceNowUrl';
module.controller("serviceNowUrlFieldEditController", ['$scope', serviceNowUrlFieldEditController]);
class gitRepositoryBaseUrlFieldEditController extends urlFieldEditController {
    constructor($scope) { super($scope, gitRepositoryBaseUrlFieldEditController.fieldName, 'Git Repository Base URL'); }
}
gitRepositoryBaseUrlFieldEditController.fieldName = 'gitRepositoryBaseUrl';
module.controller("gitRepositoryBaseUrlFieldEditController", ['$scope', gitRepositoryBaseUrlFieldEditController]);
class mainController {
    constructor($scope) {
        this.$scope = $scope;
        $scope.definitions = ($scope.$new());
        $scope.definitions.serviceNowUrl = 'https://inscomscd.service-now.com';
        $scope.definitions.gitRepositoryBaseUrl = 'https://github.com/erwinel';
        $scope.definitions.isVisible = true;
        $scope.definitions.show = this.showFieldDefinitions;
        $scope.definitions.hide = this.hideFieldDefinitions;
        $scope.cardNames = ['adminLogins', 'importInitiaUpdateSet', 'importUtilityApp', 'initialConfig', 'uploadLogoImage', 'bulkPluginActivation', 'activeDirectoryImport', 'importPhysNetworks', 'serviceCatalogConfig'];
        $scope.selectedCard = 'adminLogins';
        $scope.popupDialog = ($scope.$new());
        $scope.popupDialog.isVisible = false;
        $scope.popupDialog.title = '';
        $scope.popupDialog.message = '';
        $scope.popupDialog.bodyClass = '';
        $scope.popupDialog.show = this.showDialog;
        $scope.popupDialog.close = this.closeDialog;
        $scope.inputFieldValueChanged = this.inputFieldValueChanged;
        $scope.getInputFieldValue = this.getInputFieldValue;
    }
    $doCheck() { }
    showFieldDefinitions() { this.$scope.definitions.isVisible = true; }
    hideFieldDefinitions() { this.$scope.definitions.isVisible = false; }
    showDialog(message, type = 'info', title) {
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
        }
        else
            this.$scope.popupDialog.title = title;
        this.$scope.popupDialog.bodyClass = 'modal-body alert alert-' + type;
        this.$scope.popupDialog.message = (CJS.isNil(message)) ? '' : message;
        this.$scope.popupDialog.isVisible = true;
    }
    closeDialog() { this.$scope.popupDialog.isVisible = false; }
    inputFieldValueChanged(name, value) {
        switch (name) {
            case 'serviceNowUrl':
                this.$scope.definitions.serviceNowUrl = value;
                break;
            case 'gitRepositoryBaseUrl':
                this.$scope.definitions.gitRepositoryBaseUrl = value;
                break;
        }
    }
    getInputFieldValue(name) {
        switch (name) {
            case 'serviceNowUrl':
                return this.$scope.definitions.serviceNowUrl;
            case 'gitRepositoryBaseUrl':
                return this.$scope.definitions.gitRepositoryBaseUrl;
        }
    }
}
module.controller("mainController", ['$scope', mainController]);
// #endregion
