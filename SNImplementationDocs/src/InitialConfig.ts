/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="CommonJsUtility.ts" />
/// <reference path="UriBuilder.ts" />
import * as CJS from './CommonJsUtility';

/**
 * The main module for this app.
 * 
 * @type {ng.IModule}
 */
let mainModule: ng.IModule = angular.module("mainModule", []);

// #region Cards

/**
 * Defines the {@link ng.IScope.$parent} scope of {@link cardController} objects.
 *
 * @interface ICardParentScope
 * @extends {ng.IScope}
 */
interface ICardParentScope extends ng.IScope {
    /**
     * The names of cards represented by child {@link cardController} objects contained in the current scope.
     *
     * @type {string[]}
     * @memberof ICardParentScope
     */
    cardNames: string[];

    /**
     * The name of the currently selected {@link cardController}, taken from {@link ICardParentScope.cardNames}.
     *
     * @type {string}
     * @memberof ICardParentScope
     */
    selectedCard?: string;
}

/**
 * Options for the relative icon URL of collapsable items.
 *
 * @enum {string}
 */
enum CollapsableIconUrl {
    collapse = 'images/collapse.svg',
    expand = 'images/expand.svg'
}

/**
 * Options for the verb name of collapsable items.
 *
 * @enum {string}
 */
enum CollapsableActionVerb {
    collapse = 'Collapse',
    expand = 'Expand'
}

/**
 * Interface for the angular {@link ng.IScope} for collapsable cards using a {@link cardController}.
 *
 * @interface ICardScope
 * @extends {ng.IScope}
 */
interface ICardScope extends ng.IScope {
    /**
     * The name that uniquely identifies the current {@link cardController}.
     *
     * @type {string}
     * @memberof ICardScope
     */
    name: string,

    /**
     * The 1-based number of the current {@link cardController} within the current series of cards.
     *
     * @type {number}
     * @memberof ICardScope
     */
    cardNumber: number,

    /**
     * The heading text for the current card.
     *
     * @type {string}
     * @memberof ICardScope
     */
    headingText: string,

    /**
     * The relative image icon URL for the current card's expand/collapse button.
     *
     * @type {CollapsableIconUrl}
     * @memberof ICardScope
     */
    iconUrl: 'images/collapse.svg' | 'images/expand.svg',

    /**
     * The prefix verb name for the current card's expand/collapse button.
     *
     * @type {CollapsableActionVerb}
     * @memberof ICardScope
     */
    actionVerb: 'Collapse' | 'Expand',

    /**
     * Indicates whether the body of the current card is visible.
     *
     * @type {boolean}
     * @memberof ICardScope
     */
    isExpanded: boolean,

    /**
     * The assumed parent {@link ng.IScope} of the current {@link cardController}.
     *
     * @type {ICardParentScope}
     * @memberof ICardScope
     */
    $parent: ICardParentScope,

    /**
     * Calls the {@link cardController.expand} method of the current {@link cardController} to make the body of the current card visible.
     *
     * @memberof ICardScope
     */
    expand(): void,

    /**
     * Calls the {@link cardController.collapse} method of the current {@link cardController} to hide the body of the current card.
     *
     * @memberof ICardScope
     */
    collapse(): void,

    /**
     * Calls the {@link cardController.toggleExpanded} method of the current {@link cardController} to toggle the visibility of the current card's body.
     *
     * @returns {boolean} true if the current card was changed to being expanded; otherwise, false if the card was changed to being collapsed.
     * @memberof ICardScope
     */
    toggleExpanded(): boolean
}

/**
 * The base class for collapsable cards.
 *
 * @abstract
 * @class cardController
 * @implements {ng.IController}
 */
abstract class cardController implements ng.IController {
    $doCheck() {
        if (this.$scope.$parent.selectedCard === this.$scope.name) {
            if (!this.$scope.isExpanded)
                this.expand();
        } else if (this.$scope.isExpanded)
            this.collapse();
    }

    /**
     * Makes the body of the current card visible.
     *
     * @memberof cardController
     */
    expand(): void {
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
    collapse(): void {
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
    toggleExpanded(): boolean {
        if (this.$scope.$parent.selectedCard === this.$scope.name) {
            this.collapse();
            return false;
        }
        this.expand();
        return true;
    }

    /**
     * Creates an instance of cardController to represent a new collapsable card.
     * @param {ICardScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ICardScope}.
     * @param {string} name The name which uniquely identifies the new card.
     * @param {string} headingText The heading text for the new card.
     * @memberof cardController
     */
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
        $scope.expand = this.expand;
        $scope.collapse = this.collapse;
        $scope.toggleExpanded = this.toggleExpanded;
        if ($scope.$parent.selectedCard === name || (i < 1 && typeof($scope.$parent.selectedCard) === 'undefined'))
            this.expand();
        else
            this.collapse();
    }
}

// #region Top Level Cards


/**
 * Valid names that uniquely identify individual {@link topLevelCardController}s.
 * 
 * @type {'adminLogins' | 'importInitiaUpdateSet' | 'importUtilityApp' | 'initialConfig' | 'uploadLogoImage' | 'bulkPluginActivation' | 'activeDirectoryImport' | 'importPhysNetworks' | 'serviceCatalogConfig'}
 */
type TopLevelCardName = 'adminLogins' | 'importInitiaUpdateSet' | 'importUtilityApp' | 'initialConfig' | 'uploadLogoImage' | 'bulkPluginActivation' | 'activeDirectoryImport' | 'importPhysNetworks' | 'serviceCatalogConfig';

/**
 * The {@link ng.IScope} object, which implements {@link ICardScope}, for {@link topLevelCardController} objects.
 *
 * @interface ITopLevelCardState
 * @extends {ICardScope}
 * @extends {IMainControllerScope}
 */
interface ITopLevelCardScope extends ICardScope, IMainControllerScope {
    /**
     * The name that uniquely identifies the current {@link topLevelCardController}.
     *
     * @type {TopLevelCardName}
     * @memberof ITopLevelCardState
     */
    name: TopLevelCardName;

    /**
     * The assumed parent {@link ng.IScope} of the current {@link topLevelCardController}.
     *
     * @type {IMainControllerScope}
     * @memberof ITopLevelCardState
     */
    $parent: IMainControllerScope;
}

/**
 * The base class for top-level collapsable cards.
 *
 * @abstract
 * @class topLevelCardController
 * @extends {cardController}
 */
abstract class topLevelCardController extends cardController {
    /**
     * Creates an instance of topLevelCardController.
     * @param {ITopLevelCardScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ITopLevelCardState}.
     * @param {TopLevelCardName} name The name that uniquely indentifies the new top-level card.
     * @param {string} headingText The heading text for the new top-level card.
     * @memberof topLevelCardController
     */
    constructor(protected $scope: ITopLevelCardScope, name: TopLevelCardName, headingText: string) {
        super($scope, name, headingText);
    }
}

class adminLoginsController extends topLevelCardController {
    static cardName: TopLevelCardName = 'adminLogins';
    constructor($scope: ITopLevelCardScope) { super($scope, adminLoginsController.cardName, 'Add Administrative Logins'); }
}
mainModule.controller("adminLoginsController", ['$scope', adminLoginsController]);

class importInitiaUpdateSetController extends topLevelCardController {
    static cardName: TopLevelCardName = 'importInitiaUpdateSet';
    constructor($scope: ITopLevelCardScope) { super($scope, importInitiaUpdateSetController.cardName, 'Import Initial Update Set'); }
}
mainModule.controller("importInitiaUpdateSetController", ['$scope', importInitiaUpdateSetController]);

class importUtilityAppController extends topLevelCardController {
    static cardName: TopLevelCardName = 'importUtilityApp';
    constructor($scope: ITopLevelCardScope) { super($scope, importUtilityAppController.cardName, 'Import Utility Application'); }
}
mainModule.controller("importUtilityAppController", ['$scope', importUtilityAppController]);

class initialConfigController extends topLevelCardController {
    static cardName: TopLevelCardName = 'initialConfig';
    constructor($scope: ITopLevelCardScope) { super($scope, initialConfigController.cardName, 'Initial Config'); }
}
mainModule.controller("initialConfigController", ['$scope', initialConfigController]);

class uploadLogoImageController extends topLevelCardController {
    static cardName: TopLevelCardName = 'uploadLogoImage';
    constructor($scope: ITopLevelCardScope) { super($scope, uploadLogoImageController.cardName, 'Upload logo image'); }
}
mainModule.controller("uploadLogoImageController", ['$scope', uploadLogoImageController]);

class bulkPluginActivationController extends topLevelCardController {
    static cardName: TopLevelCardName = 'bulkPluginActivation';
    constructor($scope: ITopLevelCardScope) { super($scope, bulkPluginActivationController.cardName, 'Bulk Plugin Activation'); }
}
mainModule.controller("bulkPluginActivationController", ['$scope', bulkPluginActivationController]);

class activeDirectoryImportController extends topLevelCardController {
    static cardName: TopLevelCardName = 'activeDirectoryImport';
    constructor($scope: ITopLevelCardScope) { super($scope, activeDirectoryImportController.cardName, 'Configure Active Directory Import'); }
}
mainModule.controller("activeDirectoryImportController", ['$scope', activeDirectoryImportController]);

class importPhysNetworksController extends topLevelCardController {
    static cardName: TopLevelCardName = 'importPhysNetworks';
    constructor($scope: ITopLevelCardScope) { super($scope, importPhysNetworksController.cardName, 'Import Physical Networks Application'); }
}
mainModule.controller("importPhysNetworksController", ['$scope', importPhysNetworksController]);

class serviceCatalogConfigController extends topLevelCardController {
    static cardName: TopLevelCardName = 'serviceCatalogConfig';
    constructor($scope: ITopLevelCardScope) { super($scope, serviceCatalogConfigController.cardName, 'Import Service Catalog Update Set'); }
}
mainModule.controller("serviceCatalogConfigController", ['$scope', serviceCatalogConfigController]);

// #endregion

// #endregion

// #region Field Edit

interface IFieldInputParentScope extends ng.IScope {
    inputFieldValueChanged(name: string, value: any | undefined): void;
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
    validationMessage: string;
    cssClassNames: string[];
}
enum cssValidationClass {
    isValid = 'is-valid',
    isInvalid = 'is-invalid'
}
abstract class fieldEditController implements ng.IController {
    private _name: string;
    private _text: string = '';
    private _value?: any = undefined;
    private _isRequired: boolean = false;
    private _validationMessage: string = '';

    get name(): string { return this._name; }

    get text(): string { return this._text; }
    set text(value: string) {
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

    get isValid(): boolean {
        if (typeof (this.$scope.isValid) !== 'boolean') {
            this.updateValidationMessage();
            this.$scope.isValid = (CJS.isWhiteSpaceOrNotString(this.$scope.validationMessage.length));
        }
        return this.$scope.isValid;
    }

    get validationMessage(): string {
        if (typeof (this.$scope.validationMessage) !== 'string')
            this.$scope.validationMessage = this._validationMessage;
        return this.$scope.validationMessage;
    }
    set validationMessage(message: string) {
        message = CJS.asStringOrDefault(message, '').trim();
        if (message === this.validationMessage)
            return;
        this.$scope.validationMessage = this._validationMessage = message;
        this.onValidationChange();
    }

    abstract get cssBaseClassNames(): string[];

    constructor(protected $scope: IFieldInputScope, name: string, label?: string, isRequired: boolean = false) {
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

    $doCheck() {
        if (this.$scope.text !== this._text || this.$scope.isRequired !== this._isRequired || typeof (this.$scope.validationMessage) !== 'string' || typeof (this.$scope.isValid) !== 'boolean')
            this.validate();
        else if (this._value !== this.$scope.value)
            this.text = this.convertToString(this._value);
    }

    private onValidationChange(): void {
        let cssClassNames = CJS.asArray<string>(this.cssBaseClassNames, false);
        let i: number;
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
        } else {
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

    protected coerceValue(value: any | null | undefined): any | null | undefined { return value; }
    protected convertToString(value: any | null | undefined): string { return CJS.asStringOrDefault(value, ''); }
    protected convertToValue(text: string, currentValue: any | null | undefined): any | null | undefined { return text; }

    /**
     * Re-validates the {@link IFieldInputScope#text} if any changes are detected.
     * 
     * @returns {boolean} true if the {@link IFieldInputScope#text} is valid; otherwise, false.
     */
    validate(): boolean {
        if (this.$scope.text !== this._text) {
            if (typeof (this.$scope.text) !== 'string')
                this.$scope.text = '';
        } else if (this.$scope.isRequired === this._isRequired && typeof (this.$scope.validationMessage) === 'string') {
            if (this.$scope.validationMessage !== this._validationMessage) {
                this.$scope.isValid = (this._validationMessage = this.$scope.validationMessage.trim()).length == 0;
                if (this._validationMessage.length != this.$scope.validationMessage.length)
                    this.$scope.validationMessage = this._validationMessage;
                return this.$scope.isValid;
            } else {
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
        let wasValid: any = this.$scope.isValid;
        this.$scope.isValid = true;
        this.updateValidationMessage();
        if (typeof (this.$scope.validationMessage) !== 'string')
            this.$scope.validationMessage = this._validationMessage;
        else if (this.$scope.validationMessage !== this._validationMessage)
            this._validationMessage = this.$scope.validationMessage;
        let isValid: boolean = (this._validationMessage.length == 0);
        if (isValid !== wasValid)
            this.onValidationChange();
        return this.$scope.isValid;
    }
    protected updateValidationMessage() {
        if (this.$scope.isRequired && this._text.trim().length == 0)
            this.$scope.validationMessage = 'Value is required.';
    }
}

// #region URL Field Edit

interface IUrlFieldInputScope extends IFieldInputScope { url?: URL; }
abstract class urlFieldEditController extends fieldEditController {
    constructor($scope: IUrlFieldInputScope, name: string, label?: string) { super($scope, name); }
    protected updateValidationMessage() {
        if (this.$scope.isRequired && CJS.isWhiteSpaceOrNotString(this.text))
            this.$scope.validationMessage = 'URL is required.';
    }
}

class serviceNowUrlFieldEditController extends urlFieldEditController {
    static readonly fieldName: string = 'serviceNowUrl';
    constructor($scope: IUrlFieldInputScope) { super($scope, serviceNowUrlFieldEditController.fieldName, 'ServiceNow URL'); }
}
mainModule.controller("serviceNowUrlFieldEditController", ['$scope', serviceNowUrlFieldEditController]);

class gitRepositoryBaseUrlFieldEditController extends urlFieldEditController {
    static readonly fieldName: string = 'gitRepositoryBaseUrl';
    constructor($scope: IUrlFieldInputScope) { super($scope, gitRepositoryBaseUrlFieldEditController.fieldName, 'Git Repository Base URL'); }
}
mainModule.controller("gitRepositoryBaseUrlFieldEditController", ['$scope', gitRepositoryBaseUrlFieldEditController]);

// #endregion

// #endregion

// #region mainController

interface IFieldDefinitionsScope extends ng.IScope {
    serviceNowUrl: string;
    gitRepositoryBaseUrl: string;
    editDialogVisible: boolean;
    showEditDialog(): void;
    hideEditDialog(): void;
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
    showFieldDefinitions() { this.$scope.definitions.editDialogVisible = true; }
    hideFieldDefinitions() { this.$scope.definitions.editDialogVisible = false; }
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
        $scope.definitions.editDialogVisible = true;
        $scope.definitions.showEditDialog = this.showFieldDefinitions;
        $scope.definitions.hideEditDialog = this.hideFieldDefinitions;
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

mainModule.controller("mainController", ['$scope', mainController]);

// #endregion
