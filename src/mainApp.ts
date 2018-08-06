module navSettingsJSON {
    interface IPlainObj { [key: string]: any }
    export interface INavItem {
        id?: string;
        title: string;
        heading?: string;
        description?: string;
    }
    export interface ILinkPage extends INavItem {
        linkUrl: string;
    }
    export interface ILeafPage extends INavItem {
        pageUrl: string;
    }
    export interface IContainer extends INavItem {
        navItems: NavItem[];
    }
    export interface IContainerPage extends IContainer, ILeafPage { }
    export interface IContainerLink extends IContainer, ILinkPage { }
    export type NavItem = ILeafPage|ILinkPage|IContainerPage|IContainerLink;
    export function isContainer(item: INavItem): item is IContainer { return typeof((<IPlainObj>item).navItems) == "object" && Array.isArray((<IPlainObj>item).navItems); }
    export function isPageItem(item: INavItem): item is ILeafPage { return typeof((<IPlainObj>item).pageUrl) == "string"; }
    export function isLinkItem(item: INavItem): item is ILinkPage { return typeof((<IPlainObj>item).linkUrl) == "string"; }
}

module menuControllers {
    export interface IParentItem {
        activeNavItem?: INavScope;
    }
    export interface IContainerScope extends angular.IScope {
        navItems: INavScope[];
        current?: INavScope;
    }
    export interface ITopLevelScope extends IContainerScope, IParentItem {
        includeUrl: string;
        titleText: string;
        descriptionText: string;
        sideNavNodes: INavScope[];
    }
    export interface INavScope extends IContainerScope {
        title: string;
        heading: string;
        description: string;
        url: string;
        isPage: boolean;
        isActive: boolean;
        isSelected: boolean;
        level: number;
        controller: NavItem;
        itemClass: string;
        linkClass: string;
    }
    export class NavItem implements IParentItem {
        private __NavItem__uniqueId: Symbol;
        private _id: string|undefined;
        private _scope: INavScope;
        private _parent: NavItem|ITopLevelScope;
        private _precedingNode?: NavItem;
        private _followingNode?: NavItem;
        private _navItems: NavItem[];
        public get id(): string|undefined { return this._id; }
        public get scope(): INavScope { return this._scope; }
        public get parent(): NavItem|ITopLevelScope { return this._parent; }
        public get title(): string { return this._scope.title; }
        public get description(): string { return this._scope.description; }
        public get heading(): string { return this._scope.heading; }
        public get url(): string { return this._scope.url; }
        public get isPage(): boolean { return this._scope.isPage; }
        public get isActive(): boolean { return this._scope.isActive; }
        public set isActive(value: boolean) {
            if (this._scope.isActive == value || !this._scope.isPage)
                return;
            let parent: NavItem|ITopLevelScope = this._parent;
            let current: NavItem = this;
            if (value) {
                let oldScope: INavScope|undefined = this._parent.activeNavItem;
                if (typeof(oldScope) != "undefined" && oldScope.controller.__NavItem__uniqueId == this.__NavItem__uniqueId)
                    return;
                
                while (NavItem.isNavItem(parent)) {
                    parent._scope.linkClass = "nav-link light";
                    parent._scope.itemClass = "nav-item border active border-secondary bg-light";
                    parent._scope.isSelected = true;
                    parent._scope.current = current._scope;
                    current = parent;
                    parent = parent._parent;
                }
                parent.current = current._scope;
                parent.sideNavNodes = current._scope.navItems;
                parent.includeUrl = "pages/" + this._scope.url;
                parent.titleText = this.title;
                parent.descriptionText = this.heading;
                parent.activeNavItem = this._scope;
                this._scope.linkClass = "nav-link light";
                this._scope.itemClass = "nav-item border active border-secondary bg-light";
                if (typeof(oldScope) != "undefined")
                    oldScope.controller.isActive = false;
            } else {
                this._scope.linkClass = "nav-link text-light";
                this._scope.itemClass = "nav-item border border-secondary bg-dark";
                while (NavItem.isNavItem(parent)) {
                    if (typeof(parent._scope.current) == "undefined" || parent._scope.current.controller.__NavItem__uniqueId !== current.__NavItem__uniqueId)
                        break;
                    parent._scope.isSelected = false;
                    parent._scope.current = undefined;
                    parent._scope.linkClass = "nav-link text-light";
                    parent._scope.itemClass = "nav-item border border-secondary bg-dark";
                    current = parent;
                    parent = parent._parent;
                }
                if (!NavItem.isNavItem(parent))
                    parent.current = undefined;
            }
            this._scope.isActive = value;
            this._scope.isSelected = value;
        }
        public get isSelected(): boolean { return this._scope.isSelected; }
        public get level(): number { return this._scope.level; }
        public get precedingNode(): NavItem|undefined { return this._precedingNode; }
        public get followingNode(): NavItem|undefined { return this._followingNode; }
        public get navItems(): ReadonlyArray<NavItem> { return this._navItems; }
        public get activeNavItem(): INavScope|undefined { return this._parent.activeNavItem; }
        public set activeNavItem(scope: INavScope|undefined) {
            if (typeof(scope) == "undefined")
                this.isActive = false;        
            else
                scope.isActive = true;
        }
        isAncestor(other: NavItem|ITopLevelScope): boolean {
            let parent: NavItem|ITopLevelScope = this._parent;
            if (NavItem.isNavItem(other)) {
                while (NavItem.isNavItem(parent)) {
                    if (parent.__NavItem__uniqueId == other.__NavItem__uniqueId)
                        return true;
                    parent = parent._parent;
                }
            } else {
                while (NavItem.isNavItem(parent))
                    parent = parent._parent;
                return parent.navItems.filter(function(this: NavItem, n: INavScope): boolean {
                    return n.controller.__NavItem__uniqueId === this.__NavItem__uniqueId;
                }, this).length > 0;
            }
            return false;
        }
        raiseActivate(): boolean { this.isActive = true; return false; }
        equals(other: NavItem|ITopLevelScope): boolean { return NavItem.isNavItem(other) && other.__NavItem__uniqueId === this.__NavItem__uniqueId; }
        constructor(source: navSettingsJSON.NavItem, parent: NavItem|ITopLevelScope, precedingNode?: NavItem) {
            this.__NavItem__uniqueId = Symbol();
            this._parent = parent;
            this._id = source.id;
            this._scope = <INavScope>(((NavItem.isNavItem(parent)) ? parent._scope : parent).$new(true));
            this._scope.controller = this;
            this._scope.isActive = false;
            this._scope.isSelected = false;
            this._scope.level = (NavItem.isNavItem(parent)) ? parent.level + 1 : 0;
            this._scope.linkClass = "nav-link text-light";
            this._scope.itemClass = "nav-item border border-secondary bg-dark";
            this._scope.title = source.title;
            this._scope.heading = (typeof(source.heading) == "string" && source.heading.length > 0) ? source.heading : source.title;
            this._scope.description = (typeof(source.description) == "string") ? source.description : "";
            if (navSettingsJSON.isPageItem(source)) {
                this._scope.url = source.pageUrl;
                this._scope.isPage = true;
            } else {
                this._scope.isPage = false;
                this._scope.url = (navSettingsJSON.isLinkItem(source)) ? source.linkUrl : "";
            }
            this._navItems = (navSettingsJSON.isContainer(source)) ? NavItem.import(source.navItems, this) : [];
            this._scope.navItems = this._navItems.map(function(value: NavItem): INavScope { return value._scope; });
            this._precedingNode = precedingNode;
            if (typeof(precedingNode) != "undefined") {
                this._followingNode = precedingNode.followingNode;
                precedingNode._followingNode = this;
                if (typeof(this._followingNode) != "undefined")
                    this._followingNode._precedingNode = this;
            }
        }
        static import(source: navSettingsJSON.NavItem[], parent: NavItem|ITopLevelScope): NavItem[] {
            let precedingNode: NavItem|undefined;
            return source.map(function(n: navSettingsJSON.NavItem): NavItem {
                precedingNode = new NavItem(n, parent, precedingNode);
                return precedingNode;
            });
        }
        static isNavItem(node: NavItem|ITopLevelScope): node is NavItem { return typeof((<{ [key: string]: any }>node).__NavItem__uniqueId) == "symbol"; }

        static getNavItemById(parent: IContainerScope|NavItem|NavItem[], idValue: string|string[], ...idValues: string[]): NavItem|undefined {
            idValues = (typeof(idValues) != "undefined" && idValues.length > 0) ? ((typeof(idValue) == "string") ? [idValue] : idValue).concat(idValues) : (typeof(idValue) == "string") ? [idValue] : idValue;
            if ((idValues = idValues.map(function(v: string): string { return v.trim(); }).filter(function(v: string): boolean { return v.length > 0; })).length > 0) {
                let initialId: string = <string>(idValues.shift());
                let matches: NavItem[] = ((parent instanceof NavItem) ? parent._navItems : ((!Array.isArray(parent)) ? parent.navItems.map(function(v: INavScope): NavItem { return v.controller; }) : parent))
                    .filter(function(v: NavItem): boolean { return v._id === initialId; });
                if (matches.length > 0) {
                    if (idValues.length > 0) {
                        matches = idValues.reduce(function(pv: NavItem[], cv: string): NavItem[] {
                            if (pv.length > 0)
                                return (pv[0]._navItems.length == 0) ? pv[0]._navItems : pv[0]._navItems.filter(function(v: NavItem): boolean { return v.id === cv });
                            return pv;
                        }, matches);
                        if (matches.length == 0)
                            return;
                    }
                    return matches[0];
                }
            }
        }
    }
    export function initializeTopLevelScope(scope: ITopLevelScope, http: angular.IHttpService) {
        scope.navItems = [];
        scope.sideNavNodes = [];
        scope.titleText = "";
        scope.descriptionText = "";
        http.get<{ navItems: navSettingsJSON.NavItem[]; }>("navSettings.json").then(function(response: angular.IHttpResponse<{ navItems: navSettingsJSON.NavItem[]; }>): void {
            scope.navItems = NavItem.import(response.data.navItems, scope).map(function(item: NavItem): INavScope { return item.scope;  });
            if (scope.navItems.length > 0)
                scope.navItems[0].controller.isActive = true;
        });
    }
    export function isContainerScope(scope: angular.IScope): scope is IContainerScope {
        return typeof((<{ [key: string]: any }>scope).navItems) == "object" && (<{ [key: string]: any }>scope).navItems !== null && Array.isArray((<{ [key: string]: any }>scope).navItems);
    }
    export function isNavScope(scope: angular.IScope): scope is INavScope {
        return typeof((<{ [key: string]: any }>scope).title) == "string" && typeof((<{ [key: string]: any }>scope).heading) == "string" &&
            typeof((<{ [key: string]: any }>scope).description) == "string" && typeof((<{ [key: string]: any }>scope).url) == "string" &&
            typeof((<{ [key: string]: any }>scope).isPage) == "boolean" && typeof((<{ [key: string]: any }>scope).isActive) == "boolean" &&
            typeof((<{ [key: string]: any }>scope).isSelected) == "boolean" && typeof((<{ [key: string]: any }>scope).level) == "number" &&
            typeof((<{ [key: string]: any }>scope).itemClass) == "string" && typeof((<{ [key: string]: any }>scope).linkClass) == "string" &&
            typeof((<{ [key: string]: any }>scope).controller) == "object" && (<{ [key: string]: any }>scope).controller !== null &&
            (<{ [key: string]: any }>scope).controller instanceof NavItem;
    }
    export function isParentItem(value: object): value is IParentItem {
        return typeof((<{ [key: string]: any }>value).activeNavItem) == "object" && (<{ [key: string]: any }>value).activeNavItem !== null &&
            isScopeObject((<{ [key: string]: any }>value).activeNavItem) && isNavScope((<{ [key: string]: any }>value).activeNavItem);
    }
    export function isTopLevelScope(scope: angular.IScope): scope is ITopLevelScope {
        return isContainerScope(scope) && isParentItem(scope) && typeof((<{ [key: string]: any }>scope).includeUrl) == "string" && typeof((<{ [key: string]: any }>scope).titleText) == "string" &&
            typeof((<{ [key: string]: any }>scope).descriptionText) == "string" && typeof((<{ [key: string]: any }>scope).sideNavNodes) == "object" && 
            (<{ [key: string]: any }>scope).sideNavNodes !== null && Array.isArray((<{ [key: string]: any }>scope).sideNavNodes);
    }
}

function isScopeObject(value: object): value is angular.IScope {
    return typeof((<{ [key: string]: any }>value).$apply) == "function" && typeof((<{ [key: string]: any }>value).$applyAsync) == "function" &&
    typeof((<{ [key: string]: any }>value).$broadcast) == "function" && typeof((<{ [key: string]: any }>value).$destroy) == "function" &&
    typeof((<{ [key: string]: any }>value).$digest) == "function" && typeof((<{ [key: string]: any }>value).$suspend) == "function" &&
    typeof((<{ [key: string]: any }>value).$isSuspended) == "function" && typeof((<{ [key: string]: any }>value).$resume) == "function" &&
    typeof((<{ [key: string]: any }>value).$emit) == "function" && typeof((<{ [key: string]: any }>value).$eval) == "function" &&
    typeof((<{ [key: string]: any }>value).$evalAsync) == "function" && typeof((<{ [key: string]: any }>value).$new) == "function" &&
    typeof((<{ [key: string]: any }>value).$on) == "function" && typeof((<{ [key: string]: any }>value).$watch) == "function" &&
    typeof((<{ [key: string]: any }>value).$watchCollection) == "function" && typeof((<{ [key: string]: any }>value).$watchGroup) == "function" &&
    typeof((<{ [key: string]: any }>value).$parent) == "object" && typeof((<{ [key: string]: any }>value).$root) == "object" &&
    typeof((<{ [key: string]: any }>value).$id) == "number";
}

interface IMainAppScope extends menuControllers.ITopLevelScope {
    scrollToAnchor: { (name: string): void; };
    setPage: { (id: string, ...subId: string[]): void; };
    getPageHeading: { (id: string, ...subId: string[]): string; };
    getPageTitle: { (id: string, ...subId: string[]): string; };
    logMessages: IAppLoggerEntry[];
}

class mainController {
    static isMainAppScope(scope: angular.IScope): scope is IMainAppScope {
        return menuControllers.isTopLevelScope(scope) && typeof((<{ [key: string]: any }>scope).scrollToAnchor) == "function";
    }

    constructor($scope: IMainAppScope, $http: angular.IHttpService, $location: angular.ILocationService, $anchorScroll: angular.IAnchorScrollService, logger: AppLoggerService) {
        $scope.logMessages = logger.getLogEntries();
        menuControllers.initializeTopLevelScope($scope, $http);
        $scope.scrollToAnchor = function(name: string): void {
            $location.hash(name);
            $anchorScroll(name);
        };
        $scope.setPage = function(id: string, ...subId: string[]): void {
            let item: menuControllers.NavItem|undefined = mainController.getNavItem($scope, id, subId);
            if (typeof(item) != "undefined")
                item.isActive = true;
        };
        $scope.getPageHeading = function(id: string, ...subId: string[]): string {
            let item: menuControllers.NavItem|undefined = mainController.getNavItem($scope, id, subId);
            return (typeof(item) != "undefined") ? ((item.heading.length == 0) ? item.title : item.heading) : ((typeof(subId) != "undefined" && subId.length > 0) ? id + "/" + subId.join("/") : id);
        };
        $scope.getPageTitle = function(id: string, ...subId: string[]): string {
            let item: menuControllers.NavItem|undefined = mainController.getNavItem($scope, id, subId);
            return (typeof(item) != "undefined") ? item.title : ((typeof(subId) != "undefined" && subId.length > 0) ? id + "/" + subId.join("/") : id);
        };
        return this;
    }
    static getNavItem($scope: IMainAppScope, id:string, subId: string[]|undefined):  menuControllers.NavItem|undefined {
        throw "getNavItem is obsolete. Use pageRefLink, pageRefHeadingText or pageRefTitleText directive, instead";
    }
}

function ensureUniqueId(defaultId: string, id?: any) {
    if ((defaultId = defaultId.trim()).length == 0)
        defaultId = "_node";
    if (typeof(id) != "string" || (id = id.trim().length) == 0)
        id = defaultId;
        
    let element: JQuery = $('#' + id);
    if (element.length > 0) {
        let idx: number = 0;
        do {
            id = defaultId + idx;
            element = $('#' + id);
            idx++;
        } while (element.length > 0);
    }
    return id;
}

interface IAppLoggerInfo {
    message: string;
    type?: string;
    code?: number;
    detail?: any;
};

interface IAppLogger {
    log: { (message: string|IAppLoggerInfo|Error): void; };
}

class AppLoggerService {
    log(message: string|IAppLoggerInfo|Error): void {
        if (typeof(message) == "string")
            console.log(message);
        else {
            let detailStr: string;
            if (typeof((<{ [index: string]: any }>message).detail) == "string")
                detailStr = (<{ [index: string]: any }>message).detail;
            else if (typeof((<{ [index: string]: any }>message).detail) == "undefined" || (<{ [index: string]: any }>message).detail === null) {
                let detailObj: { [index: string]: any } = { };
                let count: number = 0;
                detailStr = "";
                if (typeof((<{ [index: string]: any }>message).description) == "string") {
                    count++;
                    detailStr = (<{ [index: string]: any }>message).description;
                    detailObj.description = detailStr;
                }
                if (typeof((<{ [index: string]: any }>message).fileName) == "string") {
                    count++;
                    detailStr = (<{ [index: string]: any }>message).fileName;
                    detailObj.fileName = detailStr;
                }
                if (typeof((<{ [index: string]: any }>message).lineNumber) == "number") {
                    count++;
                    detailObj.lineNumber = (<{ [index: string]: any }>message).lineNumber;
                    detailStr = detailObj.lineNumber.toString();
                }
                if (typeof((<{ [index: string]: any }>message).columnNumber) == "number") {
                    count++;
                    detailObj.columnNumber = (<{ [index: string]: any }>message).columnNumber;
                    detailStr = detailObj.columnNumber.toString();
                }
                if (typeof((<{ [index: string]: any }>message).stack) == "string") {
                    count++;
                    detailStr = (<{ [index: string]: any }>message).stack;
                    detailObj.stack = detailStr;
                }
                if (count > 1)
                    detailStr = JSON.stringify(detailObj);
            } else if (typeof((<{ [index: string]: any }>message).detail) != "function")
                detailStr = JSON.stringify((<{ [index: string]: any }>message).detail);
            else
                detailStr = (<{ [index: string]: any }>message).detail.ToString();

                console.log(JSON.stringify({
                    message: message.message,
                    type: ((<{ [index: string]: any }>message).type == "string") ? (<{ [index: string]: any }>message).type : (((<{ [index: string]: any }>message).name == "string") ? (<{ [index: string]: any }>message).name : ((message instanceof Error) ? "Error" : "Message")),
                    code: ((<{ [index: string]: any }>message).code == "number") ? (<{ [index: string]: any }>message).code : (((<{ [index: string]: any }>message).number == "number") ? (<{ [index: string]: any }>message).number : ((message instanceof Error) ? -1 : 0)),
                    detail: detailStr
                }));
        }
    }
}
angular.module("main", [])
.service('appLogger', AppLoggerService)
.controller("mainController", ['$scope', '$http', '$location', '$anchorScroll', 'appLogger', mainController])
.directive('hashScrollLink', ['$location', '$anchorScroll', 'appLogger', function($location: angular.ILocationService, $anchorScroll: angular.IAnchorScrollService, logger: AppLoggerService): angular.IDirective<angular.IScope> {
    return {
        link: function(
            scope: angular.IScope,
            instanceElement: JQLite,
            instanceAttributes: angular.IAttributes
        ): void {
            let text: any = instanceAttributes.text;
            let id: any = instanceAttributes.refId;
            if (typeof(id) == "string" && (id = id.trim()).length > 0) {
                let element: JQuery = $('<a />');
                let contentHtml: string|undefined;
                if (instanceAttributes.encapsulateContents === "true" && (contentHtml = instanceElement.html()).trim().length == 0)
                    contentHtml = undefined;
                if (typeof(contentHtml) == "string") {
                    element.append(contentHtml);
                    instanceElement.empty();
                }
                instanceElement.append(element);
                element.attr("href", "javascript:noop()");
                if (typeof(instanceAttributes.class) == "string" && instanceAttributes.class.trim().length > 0)
                    element.addClass(instanceAttributes.class);
                element.click(function() {
                    $location.hash(id);
                    $anchorScroll(id);
                });
                if (typeof(text) == "string" && (text = text.trim()).length > 0)
                    element.text(text);
                else if (typeof(contentHtml) != "string") {
                    let target: JQuery = $('#' + id);
                    if (target.length > 0)
                        element.text(target.text());
                    else
                        element.text(id);
                }
            } else if (typeof(text) == "string" && (text = text.trim()).length > 0)
                instanceElement.text(text);
        }
    };
}])
.directive('pageRefLink', ['appLogger', function(logger: AppLoggerService): angular.IDirective<angular.IScope> {
    return {
        link: function(
            scope: angular.IScope,
            instanceElement: JQLite,
            instanceAttributes: angular.IAttributes
        ): void {
            if (typeof(instanceAttributes.menuPath) == "string" && mainController.isMainAppScope(scope)) {
                let id: string[] = instanceAttributes.menuPath.split("/").map(function(v: string): string { return v.trim(); }).filter(function(v: string) { return v.length > 0; });
                if (id.length > 0) {
                    logger.log("Looking up pageRefLink " + instanceAttributes.menuPath);
                    let item: menuControllers.NavItem|undefined = menuControllers.NavItem.getNavItemById(scope, id);
                    if (typeof(item) != "undefined") {
                        logger.log("Found pageRefLink url " + item.url);
                        let element: JQuery;
                        if (item.isActive)
                            element = $('<samp />');
                        else {
                            element = $('<a href="javascript:noop()" />');
                            element.click(function(this: HTMLButtonElement) {
                                (<menuControllers.NavItem>item).isActive = true;
                            });
                        }
                        if (typeof(instanceAttributes.class) == "string" && instanceAttributes.class.trim().length > 0)
                            element.addClass(instanceAttributes.class);
                        if (typeof(instanceAttributes.text) != "string" || instanceAttributes.text === "heading")
                            element.text(item.heading);
                        else if (instanceAttributes.text === "title")
                            element.text(item.title);
                        else if (instanceAttributes.text === "description")
                            element.text(item.description);
                        else
                            element.text(item.url);
                        instanceElement.append(element);
                        if (instanceAttributes.appendDescription === "true" && instanceAttributes.text !== "description" && item.description.length > 0)
                            instanceElement.text(" - " + item.description);
                        return;
                    }
                }
            }
            instanceElement.text("");
        }
    };
}])
.directive('pageRefHeadingText', ['appLogger', function(logger: AppLoggerService): angular.IDirective<angular.IScope> {
    return {
        link: function(
            scope: angular.IScope,
            instanceElement: JQLite,
            instanceAttributes: angular.IAttributes
        ): void {
            let element: JQuery;
            if (typeof(instanceAttributes.tagName) == "string" && instanceAttributes.tagName.trim().length > 0) {
                element = $('<' + instanceAttributes.tagName + ' />');
                instanceElement.append(element);
            } else 
                element = instanceElement;
            if (typeof(instanceAttributes.class) == "string" && instanceAttributes.class.trim().length > 0)
                element.addClass(instanceAttributes.class);
            if (typeof(instanceAttributes.menuPath) == "string" && mainController.isMainAppScope(scope)) {
                let id: string[] = instanceAttributes.menuPath.split("/").map(function(v: string): string { return v.trim(); }).filter(function(v: string) { return v.length > 0; });
                if (id.length > 0) {
                    let item: menuControllers.NavItem|undefined = menuControllers.NavItem.getNavItemById(scope, id);
                    if (typeof(item) != "undefined") {
                        element.text((item.heading.length > 0) ? item.heading : item.title);
                        return;
                    }
                }
            }
            element.text("");
        }
    };
}])
.directive('pageRefTitleText', ['appLogger', function(logger: AppLoggerService): angular.IDirective<angular.IScope> {
    return {
        link: function(
            scope: angular.IScope,
            instanceElement: JQLite,
            instanceAttributes: angular.IAttributes
        ): void {
            let element: JQuery;
            if (typeof(instanceAttributes.tagName) == "string" && instanceAttributes.tagName.trim().length > 0) {
                element = $('<' + instanceAttributes.tagName + ' />');
                instanceElement.append(element);
            } else 
                element = instanceElement;
            if (typeof(instanceAttributes.class) == "string" && instanceAttributes.class.trim().length > 0)
                element.addClass(instanceAttributes.class);
            if (typeof(instanceAttributes.menuPath) == "string" && mainController.isMainAppScope(scope)) {
                let id: string[] = instanceAttributes.menuPath.split("/").map(function(v: string): string { return v.trim(); }).filter(function(v: string) { return v.length > 0; });
                if (id.length > 0) {
                    let item: menuControllers.NavItem|undefined = menuControllers.NavItem.getNavItemById(scope, id);
                    if (typeof(item) != "undefined") {
                        element.text(item.title);
                        return;
                    }
                }
            }
            element.text("");
        }
    };
}])
.directive('modalPopupDialogCentered', ['appLogger', function(logger: AppLoggerService): angular.IDirective<angular.IScope> {
    return {
        link: function(
            scope: angular.IScope,
            instanceElement: JQLite,
            instanceAttributes: angular.IAttributes
        ): void {
            let id: string = ensureUniqueId("modalPopupDialogCentered", instanceAttributes.id);
            let modalPopupButtonElement: JQuery = instanceElement.children('modal-popup-dialog-button:first');
            let buttonElement: JQuery = ((modalPopupButtonElement.length == 0) ? instanceElement : modalPopupButtonElement).children('button[type="button"][data-toggle="modal"]:first');
            if (buttonElement.length == 0) {
                buttonElement = $('<button type="button" class="btn d-inline-flex align-top btn-outline-info mb-1 bg-light" data-toggle="modal" />');
                ((modalPopupButtonElement.length == 0) ? instanceElement : modalPopupButtonElement).append(buttonElement);
            }
            buttonElement.attr("data-target", "#" + id);
            let modalOuterElement: JQuery = $('<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" />');
            modalOuterElement.insertAfter(instanceElement);
            modalOuterElement.attr("id", id);
            let modalDialogElement: JQuery = $('<div class="modal-dialog modal-dialog-centered" role="document" />');
            modalOuterElement.append(modalDialogElement);
            let modalContentElement: JQuery = $('<div class="modal-content" />');
            modalDialogElement.append(modalContentElement);
            let modalHeaderElement: JQuery = instanceElement.children('.modal-header:first');
            let modalBodyElement: JQuery = instanceElement.children('.modal-body:first');
            let modalFooterElement: JQuery = instanceElement.children('.modal-footer:first');
            let modalTitleElement: JQuery;
            let modalCloseElement: JQuery;
            if (modalHeaderElement.length == 0) {
                modalHeaderElement = $('<div class="modal-header" />');
                modalTitleElement = $('<h5 class="modal-title" />');
                modalHeaderElement.append(modalTitleElement);
                modalCloseElement = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" />');
                modalHeaderElement.append(modalCloseElement);
                modalCloseElement.append('<span aria-hidden="true">&times;</span>');
            } else {
                modalHeaderElement.detach();
                modalTitleElement = modalHeaderElement.children('.modal-title:first');
                modalCloseElement = modalHeaderElement.children('button[type="button"][data-dismiss="modal"]:first');
                if (modalCloseElement.length == 0) {
                    modalCloseElement = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close" />');
                    modalHeaderElement.append(modalCloseElement);
                    modalCloseElement.append('<span aria-hidden="true">&times;</span>');
                }
                if (modalTitleElement.length == 0) {
                    modalTitleElement = $('<h5 class="modal-title" />');
                    modalTitleElement.insertBefore(modalCloseElement);
                }
            }
            modalContentElement.append(modalHeaderElement);
            if (modalBodyElement.length == 0) {
                modalBodyElement = $('<div class="modal-footer" />');
                modalBodyElement.append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');
            } else
                modalBodyElement.detach();
            modalContentElement.append(modalBodyElement);
            if (modalFooterElement.length == 0) {
                modalFooterElement = $('<div class="modal-footer" />');
                modalFooterElement.append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');
            } else
                modalFooterElement.detach();
            modalContentElement.append(modalFooterElement);
            let element: JQuery;
            if (typeof(instanceAttributes.text) == "string" && instanceAttributes.text.trim().length > 0)
                modalBodyElement.text(instanceAttributes.text);
            if (typeof(instanceAttributes.title) == "string" && instanceAttributes.title.trim().length > 0) {
                modalTitleElement.text(instanceAttributes.title);
                buttonElement.attr("title", instanceAttributes.title);
            }
        }
    };
}])
.directive('modalPopupDialogButton', ['appLogger', function(logger: AppLoggerService): angular.IDirective<angular.IScope> {
    return {
        link: function(
            scope: angular.IScope,
            instanceElement: JQLite,
            instanceAttributes: angular.IAttributes
        ): void {
            let element: JQuery = $('<button type="button" class="btn d-inline-flex align-top btn-outline-info mb-1 bg-light" data-toggle="modal" />');
            instanceElement.append(element);
            if (typeof(instanceAttributes.class) == "string" && instanceAttributes.class.trim().length > 0)
                element.addClass(instanceAttributes.class);
            if (typeof(instanceAttributes.dataTarget) == "string" && instanceAttributes.dataTarget.trim().length > 0)
                element.attr('data-target', instanceAttributes.dataTarget);
            if (typeof(instanceAttributes.title) == "string" && instanceAttributes.title.trim().length > 0)
                element.attr('title', instanceAttributes.title);
            let contentHtml: string|undefined;
            if (instanceAttributes.encapsulateContents === "true" && (contentHtml = instanceElement.html()).trim().length == 0)
                contentHtml = undefined;
            if (typeof(contentHtml) == "string") {
                element.append(contentHtml);
                instanceElement.empty();
            }
            if (typeof(instanceAttributes.src) == "string" && instanceAttributes.src.trim().length > 0) {
                let img: JQuery = $('<img class="figure-img img-fluid rounded" />');
                element.append(img);
                img.attr('src', instanceAttributes.src);
                if (typeof(instanceAttributes.alt) == "string" && instanceAttributes.alt.trim().length > 0)
                    element.attr('alt', instanceAttributes.alt);
            }
            if (typeof(instanceAttributes.text) == "string" && instanceAttributes.text.trim().length > 0)
                element.text(instanceAttributes.text);
        }
    };
}]);
