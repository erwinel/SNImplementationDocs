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
        itemsById: { [index: string]: INavScope }
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
            this._scope.itemsById = { };
            this._scope.navItems = this._navItems.map(function(value: NavItem): INavScope { return value._scope; });
            for (var i = 0; i < this._scope.navItems.length; i++) {
                let id: string|undefined = this._scope.navItems[i].controller.id;
                if (typeof(id) == "string" && id.length > 0)
                    this._scope.itemsById[id] = this._scope.navItems[i];
            }
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
    }
    export function initializeTopLevelScope(scope: ITopLevelScope, http: ng.IHttpService) {
        scope.navItems = [];
        scope.sideNavNodes = [];
        scope.titleText = "";
        scope.descriptionText = "";
        scope.itemsById = { };
        http.get<{ navItems: navSettingsJSON.NavItem[]; }>("navSettings.json").then(function(response: angular.IHttpResponse<{ navItems: navSettingsJSON.NavItem[]; }>): void {
            scope.navItems = NavItem.import(response.data.navItems, scope).map(function(item: NavItem): INavScope { return item.scope;  });
            if (scope.navItems.length > 0) {
                scope.navItems[0].controller.isActive = true;
                for (var i = 0; i < scope.navItems.length; i++) {
                    let id: string|undefined = scope.navItems[i].controller.id;
                    if (typeof(id) == "string" && id.length > 0)
                        scope.itemsById[id] = scope.navItems[i];
                }
            }
        });
    }
}

interface IMainAppScope extends menuControllers.ITopLevelScope {

}

class mainController {
    constructor($scope: IMainAppScope, $http: ng.IHttpService) {
        menuControllers.initializeTopLevelScope($scope, $http);
        return this;
    }
}

angular.module("main", [])
.controller("mainController", mainController);
