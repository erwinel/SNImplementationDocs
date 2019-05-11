"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="CommonJsUtility.ts" />
/// <reference path="UriBuilder.ts" />
const CJS = require("./CommonJsUtility");
/**
 * The main module for this app.
 *
 * @type {ng.IModule}
 */
let mainModule = angular.module("mainModule", []);
/**
 * Options for the relative icon URL of collapsable items.
 *
 * @enum {string}
 */
var CollapsableIconUrl;
(function (CollapsableIconUrl) {
    CollapsableIconUrl["collapse"] = "images/collapse.svg";
    CollapsableIconUrl["expand"] = "images/expand.svg";
})(CollapsableIconUrl || (CollapsableIconUrl = {}));
/**
 * Options for the verb name of collapsable items.
 *
 * @enum {string}
 */
var CollapsableActionVerb;
(function (CollapsableActionVerb) {
    CollapsableActionVerb["collapse"] = "Collapse";
    CollapsableActionVerb["expand"] = "Expand";
})(CollapsableActionVerb || (CollapsableActionVerb = {}));
/**
 * The base class for collapsable cards.
 *
 * @abstract
 * @class cardController
 * @implements {ng.IController}
 */
class cardController {
    /**
     * Creates an instance of cardController to represent a new collapsable card.
     * @param {ICardScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ICardScope}.
     * @param {string} name The name which uniquely identifies the new card.
     * @param {string} headingText The heading text for the new card.
     * @memberof cardController
     */
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
        $scope.expand = this.expand;
        $scope.collapse = this.collapse;
        $scope.toggleExpanded = this.toggleExpanded;
        if ($scope.$parent.selectedCard === name || (i < 1 && typeof ($scope.$parent.selectedCard) === 'undefined'))
            this.expand();
        else
            this.collapse();
    }
    $doCheck() {
        if (this.$scope.$parent.selectedCard === this.$scope.name) {
            if (!this.$scope.isExpanded)
                this.expand();
        }
        else if (this.$scope.isExpanded)
            this.collapse();
    }
    /**
     * Makes the body of the current card visible.
     *
     * @memberof cardController
     */
    expand() {
        this.$scope.iconUrl = 'images/collapse.svg';
        this.$scope.actionVerb = 'Collapse';
        this.$scope.isExpanded = true;
        this.$scope.$parent.selectedCard = this.$scope.name;
    }
    /**
     * Hides the body of the current card.
     *
     * @memberof cardController
     */
    collapse() {
        this.$scope.iconUrl = 'images/expand.svg';
        this.$scope.actionVerb = 'Expand';
        this.$scope.isExpanded = false;
        if (this.$scope.$parent.selectedCard === this.$scope.name)
            this.$scope.$parent.selectedCard = undefined;
    }
    /**
     * Toggles the visibility of the current card's body.
     *
     * @returns {boolean} true if the current card was changed to being expanded; otherwise, false if the card was changed to being collapsed.
     * @memberof cardController
     */
    toggleExpanded() {
        if (this.$scope.$parent.selectedCard === this.$scope.name) {
            this.collapse();
            return false;
        }
        this.expand();
        return true;
    }
}
/**
 * The base class for top-level collapsable cards.
 *
 * @abstract
 * @class topLevelCardController
 * @extends {cardController}
 */
class topLevelCardController extends cardController {
    /**
     * Creates an instance of topLevelCardController.
     * @param {ITopLevelCardScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ITopLevelCardState}.
     * @param {TopLevelCardName} name The name that uniquely indentifies the new top-level card.
     * @param {string} headingText The heading text for the new top-level card.
     * @memberof topLevelCardController
     */
    constructor($scope, name, headingText) {
        super($scope, name, headingText);
        this.$scope = $scope;
    }
}
class adminLoginsController extends topLevelCardController {
    constructor($scope) { super($scope, adminLoginsController.cardName, 'Add Administrative Logins'); }
}
adminLoginsController.cardName = 'adminLogins';
mainModule.controller("adminLoginsController", ['$scope', adminLoginsController]);
class importInitiaUpdateSetController extends topLevelCardController {
    constructor($scope) { super($scope, importInitiaUpdateSetController.cardName, 'Import Initial Update Set'); }
}
importInitiaUpdateSetController.cardName = 'importInitiaUpdateSet';
mainModule.controller("importInitiaUpdateSetController", ['$scope', importInitiaUpdateSetController]);
class importUtilityAppController extends topLevelCardController {
    constructor($scope) { super($scope, importUtilityAppController.cardName, 'Import Utility Application'); }
}
importUtilityAppController.cardName = 'importUtilityApp';
mainModule.controller("importUtilityAppController", ['$scope', importUtilityAppController]);
class initialConfigController extends topLevelCardController {
    constructor($scope) { super($scope, initialConfigController.cardName, 'Initial Config'); }
}
initialConfigController.cardName = 'initialConfig';
mainModule.controller("initialConfigController", ['$scope', initialConfigController]);
class uploadLogoImageController extends topLevelCardController {
    constructor($scope) { super($scope, uploadLogoImageController.cardName, 'Upload logo image'); }
}
uploadLogoImageController.cardName = 'uploadLogoImage';
mainModule.controller("uploadLogoImageController", ['$scope', uploadLogoImageController]);
class bulkPluginActivationController extends topLevelCardController {
    constructor($scope) { super($scope, bulkPluginActivationController.cardName, 'Bulk Plugin Activation'); }
}
bulkPluginActivationController.cardName = 'bulkPluginActivation';
mainModule.controller("bulkPluginActivationController", ['$scope', bulkPluginActivationController]);
class activeDirectoryImportController extends topLevelCardController {
    constructor($scope) { super($scope, activeDirectoryImportController.cardName, 'Configure Active Directory Import'); }
}
activeDirectoryImportController.cardName = 'activeDirectoryImport';
mainModule.controller("activeDirectoryImportController", ['$scope', activeDirectoryImportController]);
class importPhysNetworksController extends topLevelCardController {
    constructor($scope) { super($scope, importPhysNetworksController.cardName, 'Import Physical Networks Application'); }
}
importPhysNetworksController.cardName = 'importPhysNetworks';
mainModule.controller("importPhysNetworksController", ['$scope', importPhysNetworksController]);
class serviceCatalogConfigController extends topLevelCardController {
    constructor($scope) { super($scope, serviceCatalogConfigController.cardName, 'Import Service Catalog Update Set'); }
}
serviceCatalogConfigController.cardName = 'serviceCatalogConfig';
mainModule.controller("serviceCatalogConfigController", ['$scope', serviceCatalogConfigController]);
var cssValidationClass;
(function (cssValidationClass) {
    cssValidationClass["isValid"] = "is-valid";
    cssValidationClass["isInvalid"] = "is-invalid";
})(cssValidationClass || (cssValidationClass = {}));
class fieldEditController {
    constructor($scope, name, label, isRequired = false) {
        this.$scope = $scope;
        this._text = '';
        this._value = undefined;
        this._isRequired = false;
        this._validationMessage = '';
        this._name = $scope.name = name;
        $scope.label = (CJS.isStringAndNotWhiteSpace(label)) ? label : name;
        this._value = $scope.value = this.coerceValue($scope.$parent.getInputFieldValue(name));
        this._text = $scope.text = this.convertToString(this._value);
        this._isRequired = $scope.isRequired = isRequired;
        this._validationMessage = $scope.validationMessage = '';
        this.$scope.isValid = true;
        this.updateValidationMessage();
        this.onValidationChange();
    }
    get name() { return this._name; }
    get text() { return this._text; }
    set text(value) {
        value = CJS.asStringOrDefault(value, '');
        if (value === this._text)
            return;
        this._isRequired = this.$scope.isRequired == true;
        this.$scope.validationMessage = '';
        this._text = this.$scope.text = value;
        this.updateValidationMessage();
        this.$scope.isValid = (this.$scope.validationMessage.length == 0);
        if (this.$scope.isValid)
            this.$scope.value = this._value = this.convertToValue(this._text, this._value);
    }
    get isValid() {
        if (typeof (this.$scope.isValid) !== 'boolean') {
            this.updateValidationMessage();
            this.$scope.isValid = (CJS.isWhiteSpaceOrNotString(this.$scope.validationMessage.length));
        }
        return this.$scope.isValid;
    }
    get validationMessage() {
        if (typeof (this.$scope.validationMessage) !== 'string')
            this.$scope.validationMessage = this._validationMessage;
        return this.$scope.validationMessage;
    }
    set validationMessage(message) {
        message = CJS.asStringOrDefault(message, '').trim();
        if (message === this.validationMessage)
            return;
        this.$scope.validationMessage = this._validationMessage = message;
        this.onValidationChange();
    }
    $doCheck() {
        if (this.$scope.text !== this._text || this.$scope.isRequired !== this._isRequired || typeof (this.$scope.validationMessage) !== 'string' || typeof (this.$scope.isValid) !== 'boolean')
            this.validate();
        else if (this._value !== this.$scope.value)
            this.text = this.convertToString(this._value);
    }
    onValidationChange() {
        let cssClassNames = CJS.asArray(this.cssBaseClassNames, false);
        let i;
        if (this.$scope.validationMessage.length == 0) {
            this.$scope.isValid = true;
            if (cssClassNames.length > 0) {
                if ((i = cssClassNames.indexOf(cssValidationClass.isInvalid)) == 0)
                    cssClassNames.shift();
                else if (i == cssClassNames.length - 1)
                    cssClassNames.pop();
                else if (i > 0)
                    cssClassNames.splice(i, 1);
            }
            if (cssClassNames.indexOf(cssValidationClass.isValid) < 0)
                cssClassNames.push(cssValidationClass.isValid);
        }
        else {
            this.$scope.isValid = false;
            if (cssClassNames.length > 0) {
                if ((i = cssClassNames.indexOf(cssValidationClass.isValid)) == 0)
                    cssClassNames.shift();
                else if (i == cssClassNames.length - 1)
                    cssClassNames.pop();
                else if (i > 0)
                    cssClassNames.splice(i, 1);
            }
            if (cssClassNames.indexOf(cssValidationClass.isInvalid) < 0)
                cssClassNames.push(cssValidationClass.isInvalid);
        }
        this.$scope.cssClassNames = cssClassNames;
    }
    coerceValue(value) { return value; }
    convertToString(value) { return CJS.asStringOrDefault(value, ''); }
    convertToValue(text, currentValue) { return text; }
    /**
     * Re-validates the {@link IFieldInputScope#text} if any changes are detected.
     *
     * @returns {boolean} true if the {@link IFieldInputScope#text} is valid; otherwise, false.
     */
    validate() {
        if (this.$scope.text !== this._text) {
            if (typeof (this.$scope.text) !== 'string')
                this.$scope.text = '';
        }
        else if (this.$scope.isRequired === this._isRequired && typeof (this.$scope.validationMessage) === 'string') {
            if (this.$scope.validationMessage !== this._validationMessage) {
                this.$scope.isValid = (this._validationMessage = this.$scope.validationMessage.trim()).length == 0;
                if (this._validationMessage.length != this.$scope.validationMessage.length)
                    this.$scope.validationMessage = this._validationMessage;
                return this.$scope.isValid;
            }
            else {
                if (typeof (this.$scope.isValid) != 'boolean')
                    this.$scope.isValid = this._validationMessage.length == 0;
                return this.$scope.isValid;
            }
        }
        if (typeof (this.$scope.isRequired) === 'boolean')
            this._isRequired = this.$scope.isRequired;
        else
            this.$scope.isRequired = this._isRequired;
        this._validationMessage = this.$scope.validationMessage = '';
        let wasValid = this.$scope.isValid;
        this.$scope.isValid = true;
        this.updateValidationMessage();
        if (typeof (this.$scope.validationMessage) !== 'string')
            this.$scope.validationMessage = this._validationMessage;
        else if (this.$scope.validationMessage !== this._validationMessage)
            this._validationMessage = this.$scope.validationMessage;
        let isValid = (this._validationMessage.length == 0);
        if (isValid !== wasValid)
            this.onValidationChange();
        return this.$scope.isValid;
    }
    updateValidationMessage() {
        if (this.$scope.isRequired && this._text.trim().length == 0)
            this.$scope.validationMessage = 'Value is required.';
    }
}
class urlFieldEditController extends fieldEditController {
    constructor($scope, name, label) { super($scope, name); }
    updateValidationMessage() {
        if (this.$scope.isRequired && CJS.isWhiteSpaceOrNotString(this.text))
            this.$scope.validationMessage = 'URL is required.';
    }
}
class serviceNowUrlFieldEditController extends urlFieldEditController {
    constructor($scope) { super($scope, serviceNowUrlFieldEditController.fieldName, 'ServiceNow URL'); }
}
serviceNowUrlFieldEditController.fieldName = 'serviceNowUrl';
mainModule.controller("serviceNowUrlFieldEditController", ['$scope', serviceNowUrlFieldEditController]);
class gitRepositoryBaseUrlFieldEditController extends urlFieldEditController {
    constructor($scope) { super($scope, gitRepositoryBaseUrlFieldEditController.fieldName, 'Git Repository Base URL'); }
}
gitRepositoryBaseUrlFieldEditController.fieldName = 'gitRepositoryBaseUrl';
mainModule.controller("gitRepositoryBaseUrlFieldEditController", ['$scope', gitRepositoryBaseUrlFieldEditController]);
class mainController {
    constructor($scope) {
        this.$scope = $scope;
        $scope.definitions = ($scope.$new());
        $scope.definitions.serviceNowUrl = 'https://inscomscd.service-now.com';
        $scope.definitions.gitRepositoryBaseUrl = 'https://github.com/erwinel';
        $scope.definitions.editDialogVisible = true;
        $scope.definitions.showEditDialog = this.showFieldDefinitions;
        $scope.definitions.hideEditDialog = this.hideFieldDefinitions;
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
    showFieldDefinitions() { this.$scope.definitions.editDialogVisible = true; }
    hideFieldDefinitions() { this.$scope.definitions.editDialogVisible = false; }
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
mainModule.controller("mainController", ['$scope', mainController]);
// #endregion
