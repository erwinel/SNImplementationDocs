/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />

namespace app {
    /**
    * The main module for this app.
    *
    * @type {ng.IModule}
    */
    export let appModule: ng.IModule = angular.module("app", []);

    // #region Constants

    /**
     * The relative path of the default page.
     *
     * @type {string}
     * @description - This is for a path string only - This MUST NOT contain relative segment names ("." or ".."), URL query or fragment and MUST NOT start or end with "/".
     */
    export const DEFAULT_PAGE_PATH: string = "index.html";

    /**
     * The default root absolute URL of the target ServiceNow instance.
     *
     * @type {string}
     * @description - This MUST be an absolute URL and MUST NOT contain an explicit path (cannot end with "/"), URL query or fragment.
     */
    export const DEFAULT_URL_SERVICENOW: string = "https://inscomscd.service-now.com";

    /**
     * The default root absolute URL of the remote GIT repository.
     *
     * @type {string}
     * @description - This MUST be an absolute URL and MUST NOT contain a URL query or fragment. If this contains an explicit path (which is usually the case), the path must end with a "/".
     */
    export const DEFAULT_URL_GIT_REPOSITORY: string = "https://github.com/erwinel/";

    const DEFAULT_CURRENT_ITEM_CLASS: ReadonlyArray<string> = ["active", "nav-link"];
    const DEFAULT_SELECTED_ITEM_CLASS: ReadonlyArray<string> = ["active", "nav-link"];
    const DEFAULT_OTHER_ITEM_CLASS: ReadonlyArray<string> = ["nav-link"];

    const SERVICENAME_APP_CONFIG_DATA: string = "appConfigData";
    const DIRECTIVE_NAME_APPCONTENT: string = "appContent";
    const DIRECTIVE_NAME_URLINPUT: string = "urlInput";

    export const StorageKey_UrlConfigSettings: string = "UrlConfig";
    export const StorageKey_SetupParameterSettings: string = "targetSysConfigSettings";

    /**
     *
     *
     * @export
     * @enum {string}
     */
    export enum cssValidationClass {
        /**
         *
         */
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

    // #region appConfigData Service

    /**
     * Contains service URL definitions.
     *
     * @export
     * @interface IUrlConfigSettings
     */
    export interface IUrlConfigSettings {
        /**
         * The base URL for the target ServiceNow instance.
         *
         * @type {string}
         * @memberof IUrlConfigSettings
         */
        serviceNowUrl: string;

        /**
         * The base URL for the target remote GIT repository.
         *
         * @type {string}
         * @memberof IUrlConfigSettings
         */
        gitRepositoryUrl: string;
    }

    /**
     * Defines a navigation menu item.
     *
     * @interface INavigationDefinition
     */
    interface INavigationDefinition {
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
     *
     * @interface INavigationJSON
     */
    interface INavigationJSON {
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
         * @param {AppConfigDataService} _appConfigData - The appConfigData service provider.
         * @param {INavigationDefinition} navDef - The navigation menu item definition.
         * @memberof NavigationItem
         */
        constructor(private _appConfigData: AppConfigDataService, navDef: INavigationDefinition) {
            this._url = navDef.url;
            this._sideNavHeading = (typeof navDef.sideNavHeading === "string") ? navDef.sideNavHeading.trim() : "";
            this._linkTitle = (typeof navDef.linkTitle === "string" && navDef.linkTitle.length > 0) ? navDef.linkTitle : navDef.url;
            this._pageTitle = (typeof navDef.pageTitle === "string") ? navDef.pageTitle.trim() : "";
            this._toolTip = (typeof navDef.toolTip === "string") ? navDef.toolTip.trim() : ((this._pageTitle != this._linkTitle) ? this._pageTitle : "");
            if (typeof navDef.id !== "string" || (this._id = navDef.id).length === 0)
                this._id = AppConfigDataService.toPageId(this._url);
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

        /**
         * Creates a navigation menu item objects from navigation menu definition objects.
         *
         * @static
         * @param {AppConfigDataService} appConfigData - The application configuration data service provider.
         * @param {INavigationDefinition[]} [items] - Defines the navigation menu items to be created.
         * @returns {ReadonlyArray<NavigationItem>} - The navigation menu item objects.
         * @memberof NavigationItem
         */
        static createNavItems(appConfigData: AppConfigDataService, items?: INavigationDefinition[]): ReadonlyArray<NavigationItem> {
            if (typeof items !== "object" || items === null)
                return [];
            let result: NavigationItem[] = items.filter((value: INavigationDefinition) => typeof value === "object" && value !== null).map((value: INavigationDefinition) => new NavigationItem(appConfigData, value));
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
         * @returns {(NavigationItem | undefined)} - The navigation menu item that represents the current page or undefined if none are found that represent the current page.
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
        value: T;

        /**
         * The text to be displayed for the button.
         *
         * @type {string}
         * @memberof IPopupDialogButtonDefinition
         */
        displayText: string;
    }

    /**
     * Callback for displaying a modal popup dialog.
     *
     * @export
     * @interface ITHisPopupDialogShowCallback
     * @template TTHis - Type of object to use as the "this" object when invoking the callback.
     * @template TResult - The type of result value to be produced by the modal dialog.
     * @param {string} message - The message text for the modal popup.
     * @param {string} [title] - The title for the modal popup.
     * @param {DialogMessageType} [type] - The type (severity) of the modal popup.
     * @param {IPopupDialogButtonDefinition<TResult>[]} [buttons] - The buttons to display for the modal popup, which closes the modal dialog and defines the result value.
     * @param {{ (result?: TResult): void; }} [onClose] - The callback to invoke when the modal popup dialog is closed.
     */
    export interface ITHisPopupDialogShowCallback<TTHis, TResult> {
        (this: TTHis, message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<TResult>[], onClose?: { (result?: TResult): void; }): void;
    }

    /**
     * Callback for displaying a modal popup dialog.
     *
     * @export
     * @interface IPopupDialogShowCallback
     * @template T - The type of result value to be produced by the modal dialog.
     * @param {string} message - The message text for the modal popup.
     * @param {string} [title] - The title for the modal popup.
     * @param {DialogMessageType} [type] - The type (severity) of the modal popup.
     * @param {IPopupDialogButtonDefinition<T>[]} [buttons] - The buttons to display for the modal popup, which closes the modal dialog and defines the result value.
     * @param {{ (result?: T): void; }} [onClose] - The callback to invoke when the modal popup dialog is closed.
     * @description - This is used within the {@link AppContentController} when the main modal popup dialog is displayed.
     */
    export interface IPopupDialogShowCallback<T> { (message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<T>[], onClose?: { (result?: T): void; }): void; }
    
    /**
     * Class which implements the appConfigData service.
     *
     * @export
     * @class AppConfigDataService
     */
    export class AppConfigDataService {
        private _currentPageId: string;
        private _currentPageURL: URL;
        private _promise: ng.IPromise<void>;
        private _serviceNowUrl: URL = new URL(DEFAULT_URL_SERVICENOW);
        private _gitRepositoryUrl: URL = new URL(DEFAULT_URL_GIT_REPOSITORY);
        private _relativePagePath: string;
        private _pageTitle: string;
        private _currentItemClass: ReadonlyArray<string> = DEFAULT_CURRENT_ITEM_CLASS;
        private _selectedItemClass: ReadonlyArray<string> = DEFAULT_SELECTED_ITEM_CLASS;
        private _otherItemClass: ReadonlyArray<string> = DEFAULT_OTHER_ITEM_CLASS;
        private _topNavItems: ReadonlyArray<NavigationItem> = [];
        //private _sideNavBreadcrumbItems: ReadonlyArray<NavigationItem> = [];
        //private _sideNavSiblingItems: ReadonlyArray<NavigationItem> = [];
        //private _sideNavChildItems: ReadonlyArray<NavigationItem> = [];
        private _serviceNowUrlChangedCallback: { (value: URL): void; } | undefined;
        private _gitRepositoryUrlChangedCallback: { (value: URL): void; } | undefined;
        private _pageTitleChangedCallback: { (value: string): void; } | undefined;
        private _showMainModalPopupDialogCallback: IPopupDialogShowCallback<any> | undefined;
        private _hideMainModalPopupDialogCallback: { (result?: any): void } | undefined;

        /**
         * Gets the current page ID.
         *
         * @returns {string} The value of the "content" attribute for the html meta tag with the name attribute of "app:pageId".
         * @memberof AppConfigDataService
         */
        currentPageId(): string { return this._currentPageId; }

        /**
         * Gets relative path to the current page.
         *
         * @returns {string}
         * @memberof AppConfigDataService
         */
        pagePath(): string { return this._relativePagePath; }

        /**
         * Gets or sets the title of the current page
         *
         * @param {string} [value] - The optional value to set for the page title.
         * @returns {string} The title of the current apge.
         * @memberof AppConfigDataService
         */
        pageTitle(value?: string): string {
            if (typeof value === "string" && value.trim().length > 0 && value !== this._pageTitle) {
                this._pageTitle = value;
                this.raiseTitleChanged();
            }
            return this._pageTitle;
        }

        /**
         * Gets the CSS class names to apply to navigation menu items that are ancestors of the item that represents the current page.
         *
         * @returns {ReadonlyArray<string>}
         * @memberof AppConfigDataService
         */
        currentItemClass(): ReadonlyArray<string> { return this._currentItemClass; }

        /**
         * Gets the CSS class names to apply to the navigation menu item that represents the current page.
         *
         * @returns {ReadonlyArray<string>}
         * @memberof AppConfigDataService
         */
        selectedItemClass(): ReadonlyArray<string> { return this._selectedItemClass; }

        /**
         * Gets the CSS class names to apply to the navigation menu item that do not represent the current page or any of its ancestors.
         *
         * @returns {ReadonlyArray<string>}
         * @memberof AppConfigDataService
         */
        otherItemClass(): ReadonlyArray<string> { return this._otherItemClass; }

        /**
         * Gets the navigation menu items that appear in the primary navigation menu.
         *
         * @returns {ReadonlyArray<NavigationItem>}
         * @memberof AppConfigDataService
         */
        topNavItems(): ReadonlyArray<NavigationItem> { return this._topNavItems; }

        /**
         * Gets or sets the base URL for the target ServiceNow instance.
         *
         * @param {URL} [value] - Optionally specify new value for base URL of the target ServiceNow instance.
         * @returns {URL}
         * @memberof AppConfigDataService
         * @description Changes in this value cause any callbacks specified through {@link AppConfigDataService#onServiceNowUrlChanged} to be invoked.
         */
        serviceNowUrl(value?: URL): URL {
            if (typeof value === "object" && value !== null && value instanceof URL && this._serviceNowUrl.href !== value.href) {
                this._serviceNowUrl = value;
                this.raiseServiceNowUrlChanged();
            }
            return this._serviceNowUrl;
        }

        /**
         * Gets or sets the base URL for the GIT repository being used by the target ServiceNow instance.
         *
         * @param {URL} [value] - Optionally specify new value for base URL of the GIT repository being used by the target ServiceNow instance.
         * @returns {URL}
         * @memberof AppConfigDataService
         * @description Changes in this value cause any callbacks specified through {@link AppConfigDataService#onGitRepositoryUrlChanged} to be invoked.
         */
        gitRepositoryUrl(value?: URL): URL {
            if (typeof value === "object" && value !== null && value instanceof URL && this._gitRepositoryUrl.href !== value.href) {
                this._gitRepositoryUrl = value;
                this.raiseGitRepositoryUrlChanged();
            }
            return this._gitRepositoryUrl;
        }

        /**
         *Creates an instance of AppConfigDataService.
         * @param {sessionStorageService} _sessionStorage - The sessionStorage service provider.
         * @param {ng.IHttpService} $http - The $http service provider.
         * @param {ng.ILogService} $log - The $log service provider.
         * @param {ng.IDocumentService} $document - The $document service provider.
         * @param {ng.IWindowService} $window - The $window service provider
         * @memberof AppConfigDataService
         */
        constructor(private _sessionStorage: sessionStorageService, $http: ng.IHttpService, private $log: ng.ILogService, $document: ng.IDocumentService, private $window: ng.IWindowService) {
            let headElement: JQuery = $document.find('head').first();
            let titleElement: JQuery = headElement.find('title');
            if (titleElement.length == 0) {
                headElement.children().append(titleElement = $('<title></title>'));
                this._pageTitle = "";
            } else
                this._pageTitle = titleElement.text().trim();
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
            this._currentPageURL.pathname = "/" + (this._relativePagePath = (segments.length == 1) ? segments[0] : segments.join("/"));
            if ((this._currentPageId = headElement.find('meta[name="app:pageId"]').attr("content")).length == 0)
                this._currentPageId = AppConfigDataService.toPageId(this._currentPageURL.pathname);
            if (this._pageTitle.length === 0)
                this._pageTitle = this._currentPageId;
            let svc: AppConfigDataService = this;
            this._promise = $http.get("./appConfigData.json").then((result: ng.IHttpPromiseCallbackArg<IAppConfigJSON>) => {
                if (typeof result.data !== "object")
                    sys.logResponse(result, $log, "Expected object response type, actual is " + (typeof result.data), true);
                else if (result.data == null) {
                    if (sys.toHttpResponseStatusCode(result) === sys.HttpResponseStatusCode.noContent)
                    $log.warn("Response object was null.");
                }
                else {
                    svc.applySettings(result.data);
                    if (this._pageTitle.trim() !== titleElement.text().trim())
                        titleElement.text(this._pageTitle);
                    return;
                }
                result
                svc.applySettings();
            }, (reason: any) => {
                $log.error("Unexpected error making application configuration data request: " + ((typeof reason === "object") ? angular.toJson(reason) : reason));
            });
        }

        /**
         * Displays the main application modal dialog box.
         *
         * @template TTHis - The "this" object to use for the onClose callback method.
         * @template TResult - The type of result value produced by the modal dialog.
         * @param {string} message - The message to display in the modal dialog.
         * @param {(string | undefined)} title - The title of the modal dialog.
         * @param {(DialogMessageType | undefined)} type - The message type (severity) of the modal dailog.
         * @param {(IPopupDialogButtonDefinition<TResult>[] | undefined)} buttons - The option buttons to display in the modal dailog.
         * @param {({ (this: TTHis, result?: TResult): void; } | undefined)} onClose - The callback to invoke when the dialog box is closed.
         * @param {TTHis} thisArg - The object to use as the "this" object when onClose is invoked.
         * @memberof AppConfigDataService
         * @description This invokes the callback specified through the {@link AppConfigDataService#onShowMainModalPopupDialog} method by the {@link AppContentController} during its construction.
         */
        showMainModalPopupDialog<TTHis, TResult>(message: string, title: string | undefined, type: DialogMessageType | undefined, buttons: IPopupDialogButtonDefinition<TResult>[] | undefined,
            onClose: { (this: TTHis, result?: TResult): void; } | undefined, thisArg: TTHis): void;
        /**
         * Displays the main application modal dialog box
         *
         * @template T - The type of result value produced by the modal dialog.
         * @param {string} message - The message to display in the modal dialog.
         * @param {string} [title] - The title of the modal dialog.
         * @param {DialogMessageType} [type] - The message type (severity) of the modal dailog.
         * @param {IPopupDialogButtonDefinition<T>[]} [buttons] - The option buttons to display in the modal dailog.
         * @param {{ (result?: T): void; }} [onClose] - The callback to invoke when the dialog box is closed.
         * @memberof AppConfigDataService
         * @description This invokes the callback specified through the {@link AppConfigDataService#onShowMainModalPopupDialog} method by the {@link AppContentController} during its construction.
         */
        showMainModalPopupDialog<T>(message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<T>[], onClose?: { (result?: T): void; }): void;
        showMainModalPopupDialog(message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<any>[], onClose?: { (result?: any): void; }, thisArg?: any): void {
            let callback: IPopupDialogShowCallback<any> | undefined = this._showMainModalPopupDialogCallback;
            if (typeof callback === "function") {
                if (arguments.length > 5)
                    callback(message, title, type, buttons, (result?: any) => callback.call(thisArg, result));
                else
                    callback(message, title, type, buttons, onClose);
            }
        }

        /**
         * Specifies a callback to invoke when the main modal popup dialog is to be displayed.
         *
         * @param {ITHisPopupDialogShowCallback<TTHis, TResult>} callback - The callback to invoke when the main modal popup dialog is to be displayed.
         * @param {TTHis} thisArg - The object to use as the "this" object when the callback is invoked.
         * @memberof AppConfigDataService
         */
        onShowMainModalPopupDialog<TTHis, TResult>(callback: ITHisPopupDialogShowCallback<TTHis, TResult>, thisArg: TTHis): void;
        /**
         * Specifies a callback to invoke when the main modal popup dialog is to be displayed.
         *
         * @param {IPopupDialogShowCallback<T>} callback - The callback to invoke when the main modal popup dialog is to be displayed.
         * @memberof AppConfigDataService
         * @description - The {@link AppContentController} invokes this method during its construction to specify the callback that will actually display the popup dialog.
         */
        onShowMainModalPopupDialog<T>(callback: IPopupDialogShowCallback<T>): void;
        onShowMainModalPopupDialog(callback: IPopupDialogShowCallback<any> | ITHisPopupDialogShowCallback<any, any>, thisArg?: any): void {
            if (typeof callback !== "function")
                return;
            let showMainModalPopupDialogCallback: IPopupDialogShowCallback<any> | undefined = this._showMainModalPopupDialogCallback;
            if (arguments.length > 1) {
                if (typeof showMainModalPopupDialogCallback === "function")
                    this._showMainModalPopupDialogCallback = (message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<any>[], onClose?: { (result?: any): void; }) => {
                        try { showMainModalPopupDialogCallback(title, message, type, buttons, onClose); }
                        finally { callback.call(thisArg, message, title, type, buttons, onClose); }
                    };
                else
                    this._showMainModalPopupDialogCallback = (message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<any>[], onClose?: { (result?: any): void; }) => {
                        callback.call(thisArg, message, title, type, buttons, onClose);
                    };
            } else if (typeof showMainModalPopupDialogCallback === "function")
                this._showMainModalPopupDialogCallback = (message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<any>[], onClose?: { (result?: any): void; }) => {
                    try { showMainModalPopupDialogCallback(message, title, type, buttons, onClose); }
                    finally { callback(message, title, type, buttons, onClose); }
                };
            else
                this._showMainModalPopupDialogCallback = callback;
        }

        /**
         * Closes the main modal popup dialog.
         *
         * @param {*} [result] - Result value to apply.
         * @memberof AppConfigDataService
         */
        closeMainModalPopupDialog(result?: any): void {
            let callback: { (result?: any): void } | undefined = this._hideMainModalPopupDialogCallback;
            if (typeof callback === "function")
                callback(result);
        }

        /**
         * Specifies a callback to invoke when the main modal popup dialog is to be closed.
         *
         * @template TTHis - The type of object used as the "this" object when the callback is invoked.
         * @template TResult - The type of result value for the modal popup dialog.
         * @param {{ (this: TTHis, result?: TResult): void }} callback - The callback to invoke when the main modal popup dialog is to be closed.
         * @param {TTHis} thisArg - The object to use as the "this" object when the callback is invoked.
         * @memberof AppConfigDataService
         */
        onCloseMainModalPopupDialog<TTHis, TResult>(callback: { (this: TTHis, result?: TResult): void }, thisArg: TTHis): void;
        /**
         * Specifies a callback to invoke when the main modal popup dialog is to be closed.
         *
         * @template T - The type of result value for the modal popup dialog.
         * @param {{ (result?: T): void }} callback - The callback to invoke when the main modal popup dialog is to be closed.
         * @memberof AppConfigDataService
         * @description - The {@link AppContentController} invokes this method during its construction to specify the callback that will actually close the popup dialog.
         */
        onCloseMainModalPopupDialog<T>(callback: { (result?: T): void }): void;
        onCloseMainModalPopupDialog(callback: { (result?: any): void } | { (this: any, result?: any): void }, thisArg?: any): void {
            if (typeof callback !== "function")
                return;
            let hideMainModalPopupDialogCallback: { (result?: any): void } | undefined = this._hideMainModalPopupDialogCallback;
            if (arguments.length > 1) {
                if (typeof hideMainModalPopupDialogCallback === "function")
                    this._hideMainModalPopupDialogCallback = (result?: any) => {
                        try { hideMainModalPopupDialogCallback(result); }
                        finally { callback.call(thisArg, result); }
                    };
                else
                    this._hideMainModalPopupDialogCallback = (result?: any) => {
                        callback.call(thisArg, result);
                    };
            } else if (typeof hideMainModalPopupDialogCallback === "function")
                this._hideMainModalPopupDialogCallback = (result?: any) => {
                    try { hideMainModalPopupDialogCallback(result); }
                    finally { callback(result); }
                };
            else
                this._hideMainModalPopupDialogCallback = callback;
        }

        /**
         * Specifies a callback to invoke when the value of {@link AppConfigDataService#serviceNowUrl} has changed.
         *
         * @template T - The type of object used as the "this" object when the callback is invoked.
         * @param {{ (this: T, value: URL): void; }} callback - The callback to invoke when the value of {@link AppConfigDataService#serviceNowUrl} has changed.
         * @param {T} thisArg - The object to use as the "this" object when the callback is invoked.
         * @memberof AppConfigDataService
         */
        onServiceNowUrlChanged<T>(callback: { (this: T, value: URL): void; }, thisArg: T): void;
        /**
         * Specifies a callback to invoke when the value of {@link AppConfigDataService#serviceNowUrl} has changed.
         *
         * @param {{ (value: URL): void; }} callback - The callback to invoke when the value of {@link AppConfigDataService#serviceNowUrl} has changed.
         * @memberof AppConfigDataService
         */
        onServiceNowUrlChanged(callback: { (value: URL): void; }): void;
        onServiceNowUrlChanged(callback: { (value: URL): void; }, thisArg?: any): void {
            if (typeof callback !== "function")
                return;
            let serviceNowUrlChangedCallback: { (value: URL): void; } | undefined = this._serviceNowUrlChangedCallback;
            if (arguments.length > 1) {
                if (typeof serviceNowUrlChangedCallback === "function")
                    this._serviceNowUrlChangedCallback = (value: URL) => { try { serviceNowUrlChangedCallback(value); } finally { callback.call(thisArg, value); } };
                else
                    this._serviceNowUrlChangedCallback = (value: URL) => { callback.call(thisArg, value); };
                callback.call(thisArg, this._serviceNowUrl);
                return;
            }
            if (typeof serviceNowUrlChangedCallback === "function")
                this._serviceNowUrlChangedCallback = (value: URL) => { try { serviceNowUrlChangedCallback(value); } finally { callback(value); } };
            else
                this._serviceNowUrlChangedCallback = callback;
            callback(this._serviceNowUrl);
        }

        private raiseServiceNowUrlChanged(): void {
            let callback: { (value: URL): void; } = this._serviceNowUrlChangedCallback;
            if (typeof callback === "function")
                callback(this._serviceNowUrl);
        }

        /**
         * Specifies a callback to invoke when the value of {@link AppConfigDataService#gitRepositoryUrl} has changed.
         *
         * @template T - The type of object used as the "this" object when the callback is invoked.
         * @param {{ (this: T, value: URL): void; }} callback - The callback to invoke when the value of {@link AppConfigDataService#gitRepositoryUrl} has changed.
         * @param {T} thisArg - The object to use as the "this" object when the callback is invoked.
         * @memberof AppConfigDataService
         */
        onGitRepositoryUrlChanged<T>(callback: { (this: T, value: URL): void; }, thisArg: T): void;
        /**
         * Specifies a callback to invoke when the value of {@link AppConfigDataService#gitRepositoryUrl} has changed.
         *
         * @param {{ (value: URL): void; }} callback - The callback to invoke when the value of {@link AppConfigDataService#gitRepositoryUrl} has changed.
         * @memberof AppConfigDataService
         */
        onGitRepositoryUrlChanged(callback: { (value: URL): void; }): void;
        onGitRepositoryUrlChanged(callback: { (value: URL): void; }, thisArg?: any): void {
            if (typeof callback !== "function")
                return;
            let gitRepositoryUrlChangedCallback: { (value: URL): void; } | undefined = this._gitRepositoryUrlChangedCallback;
            if (arguments.length > 1) {
                if (typeof gitRepositoryUrlChangedCallback === "function")
                    this._gitRepositoryUrlChangedCallback = (value: URL) => { try { gitRepositoryUrlChangedCallback(value); } finally { callback.call(thisArg, value); } };
                else
                    this._gitRepositoryUrlChangedCallback = (value: URL) => { callback.call(thisArg, value); };
                callback.call(thisArg, this._serviceNowUrl);
                return;
            }
            if (typeof gitRepositoryUrlChangedCallback === "function")
                this._gitRepositoryUrlChangedCallback = (value: URL) => { try { gitRepositoryUrlChangedCallback(value); } finally { callback(value); } };
            else
                this._gitRepositoryUrlChangedCallback = callback;
            callback(this._gitRepositoryUrl);
        }

        private raiseGitRepositoryUrlChanged(): void {
            let callback: { (value: URL): void; } = this._gitRepositoryUrlChangedCallback;
            if (typeof callback === "function")
                callback(this._gitRepositoryUrl);
        }

        /**
         * Specifies a callback to invoke when the value of {@link AppConfigDataService#pageTitle} has changed.
         *
         * @template T - The type of object used as the "this" object when the callback is invoked.
         * @param {{ (this: T, value: URL): void; }} callback - The callback to invoke when the value of {@link AppConfigDataService#pageTitle} has changed.
         * @param {T} thisArg - The object to use as the "this" object when the callback is invoked.
         * @memberof AppConfigDataService
         */
        onTitleChanged<T>(callback: { (this: T, value: string): void; }, thisArg: T): void;
        /**
         * Specifies a callback to invoke when the value of {@link AppConfigDataService#pageTitle} has changed.
         *
         * @param {{ (value: string): void; }} callback - The callback to invoke when the value of {@link AppConfigDataService#pageTitle} has changed.
         * @memberof AppConfigDataService
         */
        onTitleChanged(callback: { (value: string): void; }): void;
        onTitleChanged(callback: { (value: string): void; }, thisArg?: any): void {
            if (typeof callback !== "function")
                return;
            let pageTitleChangedCallback: { (value: string): void; } | undefined = this._pageTitleChangedCallback;
            if (arguments.length > 1) {
                if (typeof pageTitleChangedCallback === "function")
                    this._pageTitleChangedCallback = (value: string) => { try { pageTitleChangedCallback(value); } finally { callback.call(thisArg, value); } };
                else
                    this._pageTitleChangedCallback = (value: string) => { callback.call(thisArg, value); };
                callback.call(thisArg, this._serviceNowUrl);
                return;
            }
            if (typeof pageTitleChangedCallback === "function")
                this._pageTitleChangedCallback = (value: string) => { try { pageTitleChangedCallback(value); } finally { callback(value); } };
            else
                this._pageTitleChangedCallback = callback;
            callback(this._pageTitle);
        }

        private raiseTitleChanged(): void {
            let callback: { (value: string): void; } = this._pageTitleChangedCallback;
            if (typeof callback === "function")
                callback(this._pageTitle);
        }

        /**
         * Specifies callback(s) to invoke when settings have been loaded from appConfigData.json.
         *
         * @template T - The type of object used as the "this" object when the callback is invoked.
         * @param {{ (this: T, svc: AppConfigDataService): void; }} successCallback - The callback to invoke when settings have been successfully loaded.
         * @param {({ (this: T, reason: any, svc: AppConfigDataService): void; } | undefined)} errorCallback - The callback to invoke when there was an error loading settings from appConfigData.json.
         * @param {T} thisArg - The object to use as the "this" object when the callback is invoked.
         * @memberof AppConfigDataService
         */
        onSettingsLoaded<T>(successCallback: { (this: T, svc: AppConfigDataService): void; }, errorCallback: { (this: T, reason: any, svc: AppConfigDataService): void; } | undefined, thisArg: T): void;
        /**
         * Specifies callback(s) to invoke when settings have been loaded from appConfigData.json.
         *
         * @param {{ (svc: AppConfigDataService): void; }} successCallback - The callback to invoke when settings have been successfully loaded.
         * @param {{ (reason: any, svc: AppConfigDataService): void; }} [errorCallback] - The callback to invoke when there was an error loading settings from appConfigData.json.
         * @memberof AppConfigDataService
         */
        onSettingsLoaded(successCallback: { (svc: AppConfigDataService): void; }, errorCallback?: { (reason: any, svc: AppConfigDataService): void; }): void;
        onSettingsLoaded(successCallback: { (svc: AppConfigDataService): void; }, errorCallback?: { (reason: any, svc: AppConfigDataService): void; }, thisArg?: any): void {
            let svc: AppConfigDataService = this;
            this._promise.then(() => {
                if (arguments.length > 2)
                    successCallback.call(thisArg, svc);
                else
                    successCallback(svc);
            }, (reason: any) => {
                if (typeof errorCallback === "function") {
                    if (arguments.length > 2)
                        errorCallback.call(thisArg, reason, svc);
                    else
                        errorCallback(reason, svc);
                }
            });
        }

        /**
         * Creates an absolute ServiceNow URL from a relative URL.
         *
         * @param {string} [relativeUrl] - The relative ServiceNow URL.
         * @param {boolean} [toNav] - Whether to encapsulate the relative path within "/nav_to.do?uri=path".
         * @returns {string}
         * @memberof AppConfigDataService
         */
        createServiceNowUrl(relativeUrl?: string, toNav?: boolean): string {
            if (typeof relativeUrl === "string" && relativeUrl.length > 0 && relativeUrl !== ".") {
                let url: URL = new URL(relativeUrl, sys.makeDirectoryUrl(this._serviceNowUrl));
                if (toNav === true) {
                    let search: string = url.pathname.replace('/', '%2F');
                    url.pathname = '/nav_to.do';
                    if (typeof url.search === "string" && url.search.length > 0)
                        search += encodeURIComponent(url.search);
                    if (typeof url.hash === "string" && url.hash.length > 0) {
                        search += encodeURIComponent(url.hash);
                        url.hash = '';
                    }
                    url.search = "?uri=" + search;
                }
                return url.href;
            }
            return this._serviceNowUrl.href;
        }

        /**
         * Creates an absolute git URL from a relative URL.
         *
         * @param {string} [relativeUrl] - The relative GIT URL.
         * @returns {string}
         * @memberof AppConfigDataService
         */
        createGitRepositoryUrl(relativeUrl?: string): string {
            if (typeof relativeUrl === "string" && relativeUrl.length > 0 && relativeUrl !== ".")
                return (new URL(relativeUrl, sys.makeDirectoryUrl(this._gitRepositoryUrl))).href;
            return this._gitRepositoryUrl.href;
        }

        private applySettings(appJson?: IAppConfigJSON): void {
            let settings: IUrlConfigSettings | undefined = this._sessionStorage.getObject<IUrlConfigSettings>(StorageKey_UrlConfigSettings);
            if (typeof settings === "object" && settings !== null) {
                if (typeof settings.serviceNowUrl === "string" && settings.serviceNowUrl.length > 0)
                    this.serviceNowUrl(new URL(settings.serviceNowUrl));
                else if (typeof appJson === "object" && appJson !== null && typeof appJson.serviceNowUrl === "string" && appJson.serviceNowUrl.length > 0)
                    this.serviceNowUrl(new URL(appJson.serviceNowUrl));
                if (typeof settings.gitRepositoryUrl === "string" && settings.gitRepositoryUrl.length > 0)
                    this.gitRepositoryUrl(new URL(settings.gitRepositoryUrl));
                else if (typeof appJson === "object" && appJson !== null && typeof appJson.gitRepositoryUrl === "string" && appJson.gitRepositoryUrl.length > 0)
                    this.gitRepositoryUrl(new URL(appJson.gitRepositoryUrl));
            } else if (typeof appJson === "object" && appJson !== null) {
                if (typeof appJson.serviceNowUrl === "string" && appJson.serviceNowUrl.length > 0)
                    this.serviceNowUrl(new URL(appJson.serviceNowUrl));
                if (typeof appJson.gitRepositoryUrl === "string" && appJson.gitRepositoryUrl.length > 0)
                    this.gitRepositoryUrl(new URL(appJson.gitRepositoryUrl));
            }

            this._sessionStorage.setObject(StorageKey_UrlConfigSettings, settings);

            if (typeof appJson === "object" && appJson !== null && typeof appJson.navigation === "object" && appJson.navigation !== null)
                this._topNavItems = NavigationItem.createNavItems(this, appJson.navigation.items);
            else
                this._topNavItems = NavigationItem.createNavItems(this);
            let current: NavigationItem | undefined = NavigationItem.findCurrentItem(this.topNavItems());
            if (sys.notNil(current) && current.pageTitle.length > 0)
                this.pageTitle(current.pageTitle);
            //this._sideNavBreadcrumbItems = NavigationItem.createSideNavBreadcrumbItems(current);
            //this._sideNavSiblingItems = NavigationItem.createSideNavSiblingItems(current);
        }

        /**
         * Converts a URL path to a fallback (default) page ID.
         *
         * @static
         * @param {string} path - The URL Path to convert.
         * @returns {string} The fallback page ID for the given URL path.
         * @memberof AppConfigDataService
         */
        static toPageId(path: string): string {
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
    }

    appModule.factory(SERVICENAME_APP_CONFIG_DATA, ["sessionStorageService", "$http", '$log', '$document', '$window', AppConfigDataService]);

    // #endregion

    // #region urlInput directive

    interface IUrlInputFieldScope extends ng.IScope {
        ctrl: UrlInputFieldController;
        labelText: string;
        textModel: string;
        text: string;
        textBoxId: string;
        inputClass: string[];
        messageClass: string[];
        validationMessage: string;
        isValid: boolean;
        required?: boolean;
        allowRelative?: boolean;
        allowPath?: boolean;
        allowQuery?: boolean;
        allowFragment?: boolean;
    }

    class UrlInputFieldController {
        private _isEmpty: boolean = true;
        private _invalidFormat: boolean = false;

        constructor(private $scope: IUrlInputFieldScope) {
            let ctrl: UrlInputFieldController = this;
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
            return <ng.IDirective>{
                restrict: "E",
                controller: ['$scope', UrlInputFieldController],
                controllerAs: 'ctrl',
                link: (scope: IUrlInputFieldScope, element: JQuery, attrs: ng.IAttributes) => {
                    if (typeof scope.textBoxId !== "string" || scope.textBoxId.trim().length == 0) {
                        let i: number = 0;
                        let id: string = DIRECTIVE_NAME_URLINPUT + ":" + i++;
                        for (let e: JQuery = $(id); sys.notNil(e) && e.length > 0; e = $(id))
                            id = DIRECTIVE_NAME_URLINPUT + ":" + i++;
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

    app.appModule.directive(DIRECTIVE_NAME_URLINPUT, UrlInputFieldController.createDirective);

    // #endregion

    // #region appContent directive <app-content></app-content>

    /**
     * Defines a button to be shown in the modal popup dialog.
     *
     * @interface IPopupDialogButtonConfig
     * @extends {IPopupDialogButtonDefinition<any>}
     */
    export interface IPopupDialogButtonConfig extends IPopupDialogButtonDefinition<any> {
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
     * @interface IAppContentDirectiveScope
     * @extends {ng.IScope}
     */
    export interface IAppContentDirectiveScope extends ng.IScope {
        /**
         * The controller associated with the current scope.
         *
         * @type {AppContentController}
         * @memberof IAppContentDirectiveScope
         */
        appContentController: AppContentController;
        /**
         * The title of the current page.
         *
         * @type {string}
         * @memberof IAppContentDirectiveScope
         */
        pageTitle: string;
        /**
         * The value of the GIT repository URL field in the edit setup parameters dialog.
         *
         * @type {string}
         * @memberof IAppContentDirectiveScope
         */
        serviceNowUrl: string;
        /**
         * Indicates whether the ServiceNow URL field in the edit setup parameters dialog is valid.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        serviceNowUrlIsValid: boolean;
        /**
         * The value of the GIT repository URL field in the edit setup parameters dialog.
         *
         * @type {string}
         * @memberof IAppContentDirectiveScope
         */
        gitRepositoryUrl: string;
        /**
         * Indicates whether the GIT repository URL field in the edit setup parameters dialog is valid.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        gitRepositoryUrlIsValid: boolean;
        /**
         * Indicates whether all fields in the edit setup parameters dialog are valid.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        setupParametersAreInvalid: boolean;
        /**
         * Indicates whether the edit setup parameters dialog is being displayed.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        setupParametersDialogVisible: boolean;
        /**
         * Navigation menu items to be displayed in the primary navigation menu.
         *
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof IAppContentDirectiveScope
         */
        topNavItems: ReadonlyArray<NavigationItem>;
        /**
         * Indicates whether the secondary navigation menu is to be displayed.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        showSideMenu: boolean;
        /**
         * Ancestor navigation menu items to be displayed in the secondary navigation menu.
         *
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof IAppContentDirectiveScope
         */
        sideNavBreadcrumbItems: ReadonlyArray<NavigationItem>;
        /**
         * Indicates whether ancestor navigation menu items are to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        showBreadcrumbLinks: boolean;
        /**
         * Indicates whether the child/sibling navigation menu items are to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        showSideNavItems: boolean;
        /**
         * Heading text for the secondary navigation menu.
         *
         * @type {string}
         * @memberof IAppContentDirectiveScope
         */
        sideNavHeading: string;
        /**
         * Indicates whether a heading is to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        showSideNavHeading: boolean;
        /**
         * Navigation menu items within the secondary navigation menu, exclusing any that represents the current page or sibling items following the one that represents the current page.
         *
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof IAppContentDirectiveScope
         */
        sideNavItems: ReadonlyArray<NavigationItem>;
        /**
         * Indicates whether navigation menu item representing the current page is to be displayed in the secondary navigation menu.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        showCurrentItem: boolean;
        /**
         * Navigation menu item representing the current page.
         *
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof IAppContentDirectiveScope
         */
        currentNavItem?: NavigationItem;
        /**
         * Navigation menu items within the secondary navigation menu that follow the item representing the current page.
         *
         * @type {ReadonlyArray<NavigationItem>}
         * @memberof IAppContentDirectiveScope
         */
        followingSideNavItems: ReadonlyArray<NavigationItem>;
        /**
         * CSS class names for the main content section.
         *
         * @type {string[]}
         * @memberof IAppContentDirectiveScope
         */
        mainSectionClass: string[];
        /**
         * Indicates whether the main modal popup dialog is being displayed.
         *
         * @type {boolean}
         * @memberof IAppContentDirectiveScope
         */
        popupDialogVisible: boolean;
        /**
         * The title of the modal popup dialog.
         *
         * @type {string}
         * @memberof IAppContentDirectiveScope
         */
        popupDialogTitle: string;
        /**
         * Message text for modal popup dialog.
         *
         * @type {string}
         * @memberof IAppContentDirectiveScope
         */
        popupDialogMessage: string;
        /**
         * Buttons to be displayed in modal popup dialog.
         *
         * @type {IPopupDialogButtonConfig[]}
         * @memberof IAppContentDirectiveScope
         */
        popupDialogButtons: IPopupDialogButtonConfig[];
        /**
         * The callback to invoke when the modal popup dialog has been closed.
         *
         * @type {{ (result?: any): void; }}
         * @param {*} [result] - The dialog result value.
         * @memberof IAppContentDirectiveScope
         */
        onPopupDialogClose?: { (result?: any): void; };
        /**
         * CSS class names for the modal popup dialog body element.
         *
         * @type {string[]}
         * @memberof IAppContentDirectiveScope
         */
        popupDialogBodyClass: string[];
    }

    /**
     * Implements the controller for the appContent directive
     *
     * @class AppContentController
     * @implements {ng.IController}
     */
    export class AppContentController implements ng.IController {
        /**
         * Creates an instance of AppContentController.
         * 
         * @param {IAppContentDirectiveScope} $scope - The scope for the current appContent directive.
         * @param {ng.ILogService} $log - The $log service.
         * @param {ng.IWindowService} $window - The $window service.
         * @param {AppConfigDataService} appConfigData - The appConfigData service.
         * @memberof AppContentController
         */
        constructor(private $scope: IAppContentDirectiveScope, private $log: ng.ILogService, private $window: ng.IWindowService, private appConfigData: AppConfigDataService) {
            $scope.serviceNowUrlIsValid = $scope.gitRepositoryUrlIsValid = $scope.setupParametersAreInvalid = true;
            $scope.setupParametersDialogVisible = $scope.showSideMenu = $scope.showBreadcrumbLinks = $scope.showSideNavItems = $scope.showSideNavHeading = $scope.showCurrentItem = $scope.popupDialogVisible = false;
            $scope.topNavItems = $scope.sideNavBreadcrumbItems = $scope.sideNavItems = $scope.followingSideNavItems = [];
            $scope.popupDialogButtons = [];
            $scope.sideNavHeading = $scope.popupDialogTitle = $scope.popupDialogMessage = '';
            $scope.pageTitle = appConfigData.pageTitle();
            $scope.serviceNowUrl = appConfigData.serviceNowUrl().href;
            $scope.gitRepositoryUrl = appConfigData.gitRepositoryUrl().href;
            $scope.popupDialogBodyClass = [];
            this.updateMainSectionClass();
            $scope.$watchGroup(['serviceNowUrlIsValid', 'gitRepositoryBaseUrlIsValid'], () => {
                let areValid: boolean = $scope.serviceNowUrlIsValid && $scope.gitRepositoryBaseUrlIsValid;
                if (areValid !== $scope.setupParametersAreInvalid)
                    $scope.setupParametersAreInvalid = areValid;
            });
            appConfigData.onShowMainModalPopupDialog((message: string, title?: string, type?: DialogMessageType, buttons?: IPopupDialogButtonDefinition<any>[], onClose?: { (result?: any): void; }) => {
                if ($scope.popupDialogVisible) {
                    $('#mainModalPopupDialog').modal('hide');
                    $scope.popupDialogVisible = false;
                    if (typeof $scope.onPopupDialogClose === "function")
                        $scope.onPopupDialogClose();
                }
                $scope.popupDialogMessage = message;
                $scope.onClose = onClose;
                if (typeof buttons !== "object" || buttons === null || ($scope.popupDialogButtons = <IPopupDialogButtonConfig[]>buttons.filter(b => typeof b === "object" && b !== null)).length === 0)
                    $scope.popupDialogButtons = [<IPopupDialogButtonConfig>{ displayText: "Close", onClick: (event?: JQueryInputEventObject) => { $scope.appContentController.closePopupDialog(event); } }];
                else
                    $scope.popupDialogButtons.forEach((value: IPopupDialogButtonConfig) => {
                        value.onClick = (event?: JQueryInputEventObject) => $scope.appContentController.closePopupDialog(event, value.value);
                    });
                if (sys.isNilOrWhiteSpace(title)) {
                    switch (type) {
                        case 'warning':
                            $scope.popupDialogTitle = 'Warning';
                            break;
                        case 'danger':
                            $scope.popupDialogTitle = 'Critical';
                            break;
                        case 'success':
                            $scope.popupDialogTitle = 'Success';
                            break;
                        default:
                            $scope.popupDialogTitle = 'Notice';
                            type = "info";
                            break;
                    }
                } else
                    $scope.popupDialogTitle = title;
                $scope.popupDialogBodyClass = ['modal-body', 'alert', 'alert-' + type];
                $('#mainModalPopupDialog').modal('show');
                $scope.setupParametersDialogVisible = true;
            });
            appConfigData.onCloseMainModalPopupDialog((result?: any) => {
                if ($scope.popupDialogVisible) {
                    $('#mainModalPopupDialog').modal('hide');
                    $scope.popupDialogVisible = false;
                    if (typeof $scope.onPopupDialogClose === "function") {
                        if (arguments.length > 0)
                            $scope.onPopupDialogClose(result);
                        else
                            $scope.onPopupDialogClose();
                    }
                }
            });
            appConfigData.onTitleChanged((value: string) => { $scope.pageTitle = value; });
            appConfigData.onServiceNowUrlChanged((value: URL) => { $scope.serviceNowUrl = value.href; });
            appConfigData.onGitRepositoryUrlChanged((value: URL) => { $scope.gitRepositoryBaseUrl = value.href; });
            appConfigData.onSettingsLoaded(() => {
                $scope.topNavItems = appConfigData.topNavItems();
                let currentNavItem: NavigationItem | undefined = NavigationItem.findCurrentItem($scope.topNavItems);
                if (sys.isNil(currentNavItem)) {
                    $scope.showBreadcrumbLinks = $scope.showSideMenu = $scope.showSideNavHeading = $scope.showSideNavItems = $scope.showCurrentItem = false;
                    $scope.sideNavHeading = '';
                    $scope.sideNavBreadcrumbItems = $scope.sideNavItems = $scope.followingSideNavItems = [];
                    $scope.currentNavItem = undefined;
                } else {
                    if (currentNavItem.isNestedNavItem) {
                        $scope.showBreadcrumbLinks = ($scope.sideNavBreadcrumbItems = currentNavItem.getBreadcrumbLinks()).length > 0;
                        let parentNavItem: NavigationItem = currentNavItem.parentNavItem;
                        if (currentNavItem.hasSiblingNavItem) {
                            $scope.showSideMenu = $scope.showSideNavItems = $scope.showCurrentItem = true;
                            $scope.sideNavItems = currentNavItem.precedingSiblings();
                            $scope.followingSideNavItems = currentNavItem.followingSiblings();
                            $scope.showSideNavHeading = ($scope.sideNavHeading = parentNavItem.sideNavHeading.trim()).length > 0;
                            $scope.currentNavItem = currentNavItem;
                        } else {
                            $scope.showSideNavItems = $scope.showSideNavHeading = $scope.showCurrentItem = false;
                            $scope.followingSideNavItems = $scope.sideNavItems = [];
                            $scope.showSideMenu = $scope.showBreadcrumbLinks;
                            $scope.sideNavHeading = '';
                            $scope.currentNavItem = undefined;
                        }
                    } else {
                        $scope.currentNavItem = undefined;
                        $scope.showBreadcrumbLinks = $scope.showCurrentItem = false;
                        $scope.sideNavBreadcrumbItems = $scope.followingSideNavItems = [];
                        $scope.showSideMenu = $scope.showSideNavItems = currentNavItem.hasChildNavItem;
                        if ($scope.showSideMenu) {
                            $scope.showSideNavHeading = ($scope.sideNavHeading = currentNavItem.sideNavHeading.trim()).length > 0;
                            $scope.sideNavItems = currentNavItem.childNavItems;
                        } else {
                            $scope.sideNavItems = [];
                            $scope.sideNavHeading = '';
                            $scope.showSideNavHeading = $scope.showSideNavItems = false;
                        }
                    }
                }
                this.updateMainSectionClass();
            }, (reason: any) => {
                $log.error("Error loading application settings: " + ((typeof reason === "object") ? angular.toJson(reason) : reason));
                $window.alert("Unexpected error loading application settings. See browser log for more detail.");
            }, this);
        }

        private updateMainSectionClass() {
            if (this.$scope.showSideMenu)
                this.$scope.mainSectionClass = ["container-fluid", "col-8", "col-lg-9"];
            else
                this.$scope.mainSectionClass = ["container-fluid", "col-12"];
        }

        /**
         * Opens the edit dialog for setup parameters.
         *
         * @param {JQueryInputEventObject} [event] - The event object.
         * @memberof AppContentController
         */
        openSetupParametersEditDialog(event?: JQueryInputEventObject): void {
            sys.preventEventDefault(event);
            if (!this.$scope.setupParametersDialogVisible) {
                $("#setupParametersDialog").modal('show');
                this.$scope.setupParametersDialogVisible = true;
            }
        }

        /**
         * Closes the edit dialog for setup parameters.
         *
         * @param {JQueryInputEventObject} [event] - The event object.
         * @param {boolean} [accept] - Whether to accept any validated changes that were made.
         * @memberof AppContentController
         */
        closeSetupParametersEditDialog(event?: JQueryInputEventObject, accept?: boolean): void {
            sys.preventEventDefault(event);
            if (this.$scope.setupParametersDialogVisible) {
                $("#setupParametersDialog").modal('hide');
                this.$scope.setupParametersDialogVisible = false;
            }
        }

        /**
         * Closes the main modal popup dialog.
         *
         * @param {JQueryInputEventObject} [event] - The event object.
         * @param {*} [result] - The result value use as the the modal dialog result.
         * @memberof AppContentController
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

    appModule.directive(DIRECTIVE_NAME_APPCONTENT, () => {
        return {
            controller: ['$scope', '$log', '$window', SERVICENAME_APP_CONFIG_DATA, AppContentController],
            controllerAs: 'appContentController',
            restrict: "E",
            scope: true,
            templateUrl: 'Template/appContent.htm',
            transclude: true
        };
    });

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

        constructor(private _window: ng.IWindowService, private _keys: string[]) { }

        [Symbol.iterator](): IterableIterator<string> { return this; }

        next(): IteratorResult<string> {
            if (this._window.sessionStorage.length !== this._keys.length)
                this._index = this._keys.length;
            else if (this._index < this._keys.length) {
                try {
                    let value: string = this._window.sessionStorage.getItem(this._keys[this._index]);
                    if (sys.notNil(value))
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

    const btnCssClassRe: RegExp = /(^|\s)btn(\s|$)/g;
    const btnStyleCssClassRe: RegExp = /(^|\s)btn-\S/g;
    const paddingCssClassRe: RegExp = /(^|\s)p(l|t|r|b)?-\S/g;

    interface ICopyToClipboardButtonAttributes extends ng.IAttributes {
        class?: string;
        target: string;
        successMessage?: string;
    }

    interface IClipboardCopyScope extends ng.IScope {
        clipboardCopyController: ClipboardCopyController;
    }

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

    // #region snInstanceLink directive - <sn-instance-link relative-url="" relative-url-model="" to-nav="true"></sn-instance-link>

    interface ISnInstanceLinkScope extends ng.IScope {
        relativeUrl: string;
        relativeUrlModel: string;
        href: string;
        toNav?: string;
    }

    interface ISnInstanceLinkAttributes extends ng.IAttributes {
        target?: string;
    }

    class SnInstanceLinkController {
        constructor($scope: ISnInstanceLinkScope, appConfigData: AppConfigDataService) {
            $scope.href = '';
            appConfigData.onServiceNowUrlChanged((value: URL) => {
                if (typeof $scope.relativeUrlModel === "string" && $scope.relativeUrlModel.length > 0)
                    $scope.href = appConfigData.createServiceNowUrl($scope.relativeUrlModel, sys.asBoolean($scope.toNav));
                else
                    $scope.href = appConfigData.createServiceNowUrl($scope.relativeUrl, sys.asBoolean($scope.toNav));
            });
            $scope.$watchGroup(['relativeUrlModel', 'relativeUrl', 'toNav'], () => {
                if (typeof $scope.relativeUrlModel === "string" && $scope.relativeUrlModel.length > 0)
                    $scope.href = appConfigData.createServiceNowUrl($scope.relativeUrlModel, sys.asBoolean($scope.toNav));
                else
                    $scope.href = appConfigData.createServiceNowUrl($scope.relativeUrl, sys.asBoolean($scope.toNav));
            });
        }
    }

    app.appModule.directive("snInstanceLink", () => {
        return <ng.IDirective>{
            restrict: "E",
            controller: ['$scope', 'appConfigData', SnInstanceLinkController],
            link: (scope: ISnInstanceLinkScope, element: JQuery, attrs: ISnInstanceLinkAttributes) => {
                if (typeof attrs.target !== "string")
                    attrs.$set("target", "_blank");
            },
            scope: {
                relativeUrl: "@?",
                relativeUrlModel: "=?",
                toNav: "@?"
            },
            replace: true,
            template: '<a ng-href="{{href}}" ng-transclude></a>',
            transclude: true
        }
    });
    // #endregion

    // #region gitInstanceLink directive - <git-instance-link relative-url="" relative-url-model="" text="" text-model=""></git-instance-link>

    interface IGitInstanceLinkScope extends ng.IScope {
        relativeUrl: string;
        relativeUrlModel: string;
        href: string;
        linkText: string;
        text?: string;
        textModel?: string;
    }

    interface IGitInstanceLinkAttributes extends ng.IAttributes {
        target?: string;
    }

    class GitnInstanceLinkController {
        constructor($scope: IGitInstanceLinkScope, appConfigData: AppConfigDataService) {
            $scope.linkText = $scope.href = '';
            appConfigData.onGitRepositoryUrlChanged((value: URL) => {
                if (typeof $scope.relativeUrlModel === "string" && $scope.relativeUrlModel.length > 0)
                    $scope.href = appConfigData.createGitRepositoryUrl($scope.relativeUrlModel);
                else
                    $scope.href = appConfigData.createGitRepositoryUrl($scope.relativeUrl);
            });
            $scope.$watchGroup(['relativeUrlModel', 'relativeUrl'], () => {
                if (typeof $scope.relativeUrlModel === "string" && $scope.relativeUrlModel.length > 0)
                    $scope.href = appConfigData.createGitRepositoryUrl($scope.relativeUrlModel);
                else
                    $scope.href = appConfigData.createGitRepositoryUrl($scope.relativeUrl);
            });
            $scope.$watchGroup(['textModel', 'text', 'href'], () => {
                $scope.linkText = (typeof $scope.textModel === "string" && $scope.textModel.length > 0) ? $scope.textModel : ((typeof $scope.text === "string" && $scope.text.length > 0) ? $scope.text : $scope.href);
            });
            $scope.linkText = (typeof $scope.textModel === "string" && $scope.textModel.length > 0) ? $scope.textModel : ((typeof $scope.text === "string" && $scope.text.length > 0) ? $scope.text : $scope.href);
        }
    }

    app.appModule.directive("gitInstanceLink", () => {
        return <ng.IDirective>{
            restrict: "E",
            controller: ['$scope', 'appConfigData', GitnInstanceLinkController],
            link: (scope: IGitInstanceLinkScope, element: JQuery, attrs: IGitInstanceLinkAttributes) => {
                if (typeof attrs.target !== "string")
                    attrs.$set("target", "_blank");
            },
            scope: {
                relativeUrl: "@?",
                relativeUrlModel: "=?",
                text: "@?",
                textModel: "=?"
            },
            replace: true,
            template: '<a ng-href="{{href}}">{{linkText}}</a>'
        }
    });
    // #endregion

    // #region pageTitle directive - <title page-title></title>

    class PageTitleDirectiveController {
        constructor($element: JQuery, appConfigData: AppConfigDataService) { appConfigData.onTitleChanged((value: string) => { $element.text(value); }); }
    }

    app.appModule.directive("gitInstanceLink", () => {
        return <ng.IDirective>{
            restrict: "A",
            controller: ['$element', 'appConfigData', PageTitleDirectiveController]
        }
    });
    // #endregion

    // #region externalLink directive <external-link href="" ng-href="" relative-uri="" relative-uri-expression="" anchor-class="" anchor-class-expression=""></external-link>

    interface IExternalLinkAttributes extends ng.IAttributes {
        href?: string;
        ngHref?: string;
        relativeUri?: string;
        anchorClass?: string;
    }

    interface IExternalLinkScope extends ng.IScope {
        href: string;
        relativeUriExpression?: string;
        anchorClass: string[];
        anchorClassExpression?: string;
    }

    app.appModule.directive("externalLink", () => {
        return <ng.IDirective>{
            restrict: "E",
            transclude: true,
            scope: {
                relativeUriExpression: "=?",
                anchorClassExpression: "=?"
            },
            template: '<a ng-href="{{href}}" ng-class="anchorClass" target="_blank"><ng-transclude></ng-transclude></a>',
            link: (scope: IExternalLinkScope, element: JQuery, attr: IExternalLinkAttributes, controller: ng.IController) => {
                let href: string = (typeof attr.ngHref === "string") ? attr.ngHref : ((typeof attr.href === "string") ? attr.href : "");
                let relativeUri: string | undefined = (typeof scope.relativeUriExpression === "string") ? scope.relativeUriExpression : ((typeof attr.relativeUri === "string") ? attr.relativeUri : "");
                if (relativeUri.length > 0) {
                    if (href.length == 0)
                        scope.href = (relativeUri.length > 0) ? relativeUri : "#"
                    else {
                        let url: URL;
                        try { url = new URL(relativeUri, href); } catch { /* okay to ignore */ }
                        if (typeof url === "object" && url !== null)
                            scope.href = url.href;
                        else
                            scope.href = href + relativeUri;
                    }
                } else
                    scope.href = (href.length == 0) ? "#" : href;
                let n: string[];
                let c: string;
                if (typeof attr.anchorClass === "string" && (c = attr.anchorClass.trim()).length > 0) {
                    n = c.split(/\s+/g);
                    if (typeof scope.anchorClassExpression === "string" && (c = scope.anchorClassExpression.trim()).length > 0)
                        n = n.concat(c.split(/\s+/g));
                } else if (typeof scope.anchorClassExpression === "string" && (c = scope.anchorClassExpression.trim()).length > 0)
                    n = c.split(/\s+/g);
                else {
                    scope.anchorClass = [];
                    return;
                }
                scope.anchorClass = sys.unique(n, (x, y) => x === y);
            }
        };
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
