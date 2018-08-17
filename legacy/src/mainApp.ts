module armySnDocsNavigation {
    type NavConfigNodeNamedType = "page"|"link";
    type NavConfigNodeType = NavConfigNodeNamedType|"separator";
    interface INavConfigNode {
        type: NavConfigNodeType;
    }
    interface INavConfigNamedNode extends INavConfigNode {
        type: NavConfigNodeNamedType;
        id?: string;
        name: string;
        tooltip?: string;
    }
    function isNavConfigNamedNode(node: INavConfigNode): node is INavConfigNamedNode {
        return node.type == "page" || node.type == "link";
    }
    interface INavConfigPageRef extends INavConfigNamedNode {
        type: "page";
        heading?: string;
        subHeading?: string;
        path: string;
        navBar?: NavConfigNode[];
        sideBar?: NavConfigNode[];
        hiddenIds?: string[];
    }
    function isNavConfigPageRef(node: INavConfigNode): node is INavConfigPageRef {
        return node.type == "page";
    }
    interface INavConfigLink extends INavConfigNamedNode {
        type: "link";
        url: string;
    }
    function isNavConfigLink(node: INavConfigNode): node is INavConfigLink {
        return node.type == "link";
    }
    interface INavConfigSeparator extends INavConfigNode {
        type: "separator";
    }
    function isNavConfigSeparator(node: INavConfigNode): node is INavConfigSeparator {
        return node.type == "separator";
    }
    type NavConfigNode = INavConfigPageRef|INavConfigLink|INavConfigSeparator;
    interface INavConfigSettings {
        navBar: NavConfigNode[];
        sideBar: NavConfigNode[];
    }
    export interface INavNodeScope extends angular.IScope {
        type: NavConfigNodeType;
        positionType: "first"|"middle"|"last";
    }
    export function isNestedLevelParent(parent: INavContainer): parent is NavPage { return parent instanceof NavPage; }
    export abstract class NavNode {
        private _type : NavConfigNodeType;
        private _parent : INavContainer;
        private _precedingSibling : NavNode|undefined;
        private _followingSibling : NavNode|undefined;
        private _scope : INavNodeScope|undefined;
        public get type() : NavConfigNodeType { return this._type; }
        public get parent() : INavContainer { return this._parent; }
        public get precedingSibling() : NavItem|undefined { return this._precedingSibling; }
        public get followingSibling() : NavItem|undefined { return this._followingSibling; }
        public get scope() : INavNodeScope|undefined { return this._scope; }
        constructor(config: INavConfigNode, parent: INavContainer, precedingSibling?: NavItem) {
            this._type = config.type;
            this._precedingSibling = precedingSibling;
            if (typeof(this._precedingSibling) == "undefined")
                this._parent = parent;
            else {
                this._parent = this._precedingSibling._parent;
                this._followingSibling = this._precedingSibling._followingSibling;
                this._precedingSibling._followingSibling = this;
                if (typeof(this._followingSibling) != "undefined")
                    this._followingSibling._precedingSibling = this;
            }
        }
        protected OnScopeInit(scope: INavNodeScope): void {
            scope.type = this._type;
            scope.positionType = (typeof(this._precedingSibling) == "undefined") ? "first" : ((typeof(this._followingSibling) == "undefined") ? "last" : "middle");
        }
        ensureScope(parentScope: angular.IScope): INavNodeScope {
            if (typeof(this._scope) == "undefined") {
                this._scope = <INavNodeScope>(((isNestedLevelParent(this.parent)) ? this.parent.ensureScope(parentScope) : parentScope).$new(true));
                this.OnScopeInit(this._scope);
            }
            return <INavNodeScope>(this._scope);
        }
    }
    export interface INamedNavNodeScope extends INavNodeScope {
        name: string;
        tooltip: string;
    }
    export function isNamedNavNodeScope(scope: INavNodeScope): scope is INamedNavNodeScope { return scope.type === "page" || scope.type === "link"; }
    export abstract class NamedNavNode extends NavNode {
        private _id : string;
        private _name : string;
        private _tooltip : string;
        public get id() : string { return this._id; }
        public get name() : string { return this._name; }
        public get tooltip() : string { return this._tooltip; }
        constructor(config: INavConfigNamedNode, parent: INavContainer, precedingSibling?: NavItem) {
            super(config, parent, precedingSibling);
            this._id = (typeof(config.id) == "string") ? config.id.trim() : "";
            this._name = config.name;
            this._tooltip = (typeof(config.tooltip) == "string") ? config.tooltip.trim() : "";
        }
        protected OnScopeInit(scope: INamedNavNodeScope): void {
            super.OnScopeInit(scope);
            scope.name = this._name;
            scope.tooltip = this._tooltip;
        }
        static findNodeById(nodes: INavContainer, id: string) : NamedNavNode|undefined {
            let namedNodes: NamedNavNode[];
            if (nodes.topNavBar.length > 0) {
                namedNodes = <NamedNavNode[]>(nodes.topNavBar.filter(function(value: NavItem): boolean { return isNamedNavNode(value); }));
                if (nodes.sideNav.length > 0)
                    namedNodes = namedNodes.concat(<NamedNavNode[]>(nodes.sideNav.filter(function(value: NavItem): boolean { return isNavPage(value); })));
            } else
                namedNodes = (nodes.sideNav.length > 0) ? <NamedNavNode[]>(nodes.sideNav.filter(function(value: NavItem): boolean { return isNavPage(value); })) : [];
            if (namedNodes.length > 0) {
                let matching: NamedNavNode[] = namedNodes.filter(function(p: NamedNavNode): boolean { return p.id == id; });
                if (matching.length > 0)
                    return matching[0];
                for (let i: number = 0; i < namedNodes.length; i++) {
                    if (isNavPage(namedNodes[i])) {
                        let result: NamedNavNode|undefined = NamedNavNode.findNodeById(<NavPage>(namedNodes[i]), id);
                        if (typeof(result) != "undefined")
                            return result;
                    }
                }
            }
        }
    }
    export function isNamedNavNode(node: NavNode|NavItem): node is NamedNavNode { return node.type === "page" || node.type === "link"; }
    export interface INavPageScope extends INamedNavNodeScope {
        heading: string;
        subHeading: string;
        path: string;
    }
    export function isNavPageScope(scope: INavNodeScope): scope is INavPageScope { return scope.type === "page"; }
    export interface INavContainer {
        topNavBar : NavItem[];
        sideNav : NavItem[];
    }
    export class NavPage extends NamedNavNode implements INavContainer {
        private _heading : string;
        private _subHeading : string;
        private _path : string;
        private _hiddenIds : string[];
        private _topNavBar : NavItem[];
        private _sideNav : NavItem[];
        public get heading() : string { return this._heading; }
        public get subHeading() : string { return this._subHeading; }
        public get path() : string { return this._path; }
        public get hiddenIds() : string[] { return this._hiddenIds; }
        public get topNavBar() : NavItem[] { return this._topNavBar; }
        public get sideNav() : NavItem[] { return this._sideNav; }
        private _isSelected : boolean = false;
        public get isSelected() : boolean { return this._isSelected; }
        public set isSelected(v : boolean) {
            if (this._isSelected === v)
                return;
            this._isSelected = v;
            if (v) {
                if (isNestedLevelParent(this.parent))
                    this.parent.isSelected = true;
                let n: NavItem|undefined = this.precedingSibling;
                while (typeof(n) != "undefined") {
                    if (isNavPage(n))
                        n.isSelected = false;
                    n = n.precedingSibling;
                }
                n = this.followingSibling;
                while (typeof(n) != "undefined") {
                    if (isNavPage(n))
                        n.isSelected = false;
                    n = n.followingSibling;
                }
            } else {
                this.isCurrent = false;
                this._topNavBar.forEach(function(item: NavItem) {
                    if (isNavPage(item))
                        item.isSelected = false;
                });
                this._sideNav.forEach(function(item: NavItem) {
                    if (isNavPage(item))
                        item.isSelected = false;
                });
            }
        }
        private _isCurrent : boolean = false;
        public get isCurrent() : boolean { return this._isCurrent; }
        public set isCurrent(v : boolean) {
            if (this._isCurrent === v)
                return;
            this._isCurrent = v;
            if (v) {
                this.isSelected = true;
                this._topNavBar.forEach(function(item: NavItem) {
                    if (isNavPage(item))
                        item.isSelected = false;
                });
                this._sideNav.forEach(function(item: NavItem) {
                    if (isNavPage(item))
                        item.isSelected = false;
                });
            }
        }
        
        constructor(config: INavConfigPageRef, parent: INavContainer, precedingSibling?: NavItem) {
            super(config, parent, precedingSibling);
            this._heading = (typeof(config.heading) == "string") ? config.heading.trim() : "";
            if (this._heading.length == 0)
                this._heading = this.name;
            this._subHeading = (typeof(config.subHeading) == "string") ? config.subHeading.trim() : "";
            this._path = config.path;
            let thisObj: INodeMapContext<NavPage> = { parent: this }
            this._hiddenIds = (typeof(config.hiddenIds) == "undefined" || config.hiddenIds.length == 0) ? [] : config.hiddenIds.map(function(s: string): string { return s.trim(); }).filter(function(s: string): boolean { return s.length > 0; });
            this._topNavBar = (typeof(config.navBar) == "undefined" || config.navBar.length == 0) ? [] : config.navBar.map(NavPage.mapToNavItem, thisObj);
            thisObj.precedingSibling = undefined;
            this._sideNav = (typeof(config.sideBar) == "undefined" || config.sideBar.length == 0) ? [] : config.sideBar.map(NavPage.mapToNavItem, thisObj);
        }
        protected OnScopeInit(scope: INavPageScope): void {
            super.OnScopeInit(scope);
            scope.heading = this._heading;
            scope.subHeading = this._subHeading;
            scope.path = this._path;
        }
        private static mapToNavItem(this: INodeMapContext<NavPage>, value: NavConfigNode): NavItem {
            if (isNavConfigPageRef(value))
                this.precedingSibling = new NavPage(value, this.parent, this.precedingSibling);
            else if (isNavConfigLink(value))
                this.precedingSibling = new NavLink(value, this.parent, this.precedingSibling);
            else
                this.precedingSibling = new NavSeparator(value, this.parent, this.precedingSibling);
            return this.precedingSibling;
        }
        static findPageByPath(nodes: INavContainer, path: string) : NavPage|undefined {
            let pages: NavPage[];
            if (nodes.topNavBar.length > 0) {
                pages = <NavPage[]>(nodes.topNavBar.filter(function(value: NavItem): boolean { return isNavPage(value); }));
                if (nodes.sideNav.length > 0)
                    pages = pages.concat(<NavPage[]>(nodes.sideNav.filter(function(value: NavItem): boolean { return isNavPage(value); })));
            } else
                pages = (nodes.sideNav.length > 0) ? <NavPage[]>(nodes.sideNav.filter(function(value: NavItem): boolean { return isNavPage(value); })) : [];
            if (pages.length > 0) {
                let matching: NavPage[] = pages.filter(function(p: NavPage): boolean { return p._path == path; });
                if (matching.length > 0)
                    return matching[0];
                for (let i: number = 0; i < pages.length; i++) {
                    let result: NavPage|undefined = NavPage.findPageByPath(pages[i], path);
                    if (typeof(result) != "undefined")
                        return result;
                }
            }
        }
        private getNavNodes(): INavContainer {
            let result: INavContainer = (isNestedLevelParent(this.parent)) ? this.parent.getNavNodes() : { topNavBar: this.parent.topNavBar.map(function(v: NavNode): NavNode { return v; }), sideNav: this.parent.sideNav.map(function(v: NavNode): NavNode { return v; }) };
            if (this._hiddenIds.length > 0) {
                if (result.topNavBar.length > 0)
                    result.topNavBar = result.topNavBar.filter(function(this: NavPage, n: NavNode): boolean {
                        if (isNamedNavNode(n))
                            return this._hiddenIds.filter(function(i: string): boolean { return i == n.id; }).length == 0;
                        return true;
                    }, this);
                if (result.sideNav.length > 0)
                    result.sideNav = result.sideNav.filter(function(this: NavPage, n: NavNode): boolean {
                        if (isNamedNavNode(n))
                            return this._hiddenIds.filter(function(i: string): boolean { return i == n.id; }).length == 0;
                        return true;
                    }, this);
            }
            let n: number;
            if (result.topNavBar.length > 0) {
                while (result.topNavBar.length > 0 && isNavSeparator(result.topNavBar[0]))
                    result.topNavBar.unshift();
                n = result.topNavBar.length - 1;
                while (n >= 0 && isNavSeparator(result.topNavBar[n])) {
                    result.topNavBar.pop();
                    n--;
                }
            }
            if (result.sideNav.length > 0) {
                while (result.sideNav.length > 0 && isNavSeparator(result.sideNav[0]))
                    result.sideNav.unshift();
                n = result.sideNav.length - 1;
                while (n >= 0 && isNavSeparator(result.sideNav[n])) {
                    result.sideNav.pop();
                    n--;
                }
            }
            return result;
        }
        private setCurrentPage(page: NavPage, mainScope: armySnDocsMain.IMainAppScope): void {
            this.ensureScope(mainScope);
            if (!isNestedLevelParent(this.parent))
                mainScope.currentRootNavItem = <INavPageScope>(this.scope);
        }
        setAsSelectedPage(scope: armySnDocsMain.IMainAppScope): INavContainer {
            this.ensureScope(scope);
            if (isNestedLevelParent(this.parent))
                this.parent.setCurrentPage(this, scope);
            else
                scope.currentRootNavItem = <INavPageScope>(this.scope);
            scope.currentPage = <INavPageScope>(this.scope);
            let navLists: INavContainer = this.getNavNodes();
            scope.topNavBar = navLists.topNavBar.map(function(item: NavItem): INavNodeScope { return item.ensureScope(scope); });
            scope.sideNav = navLists.sideNav.map(function(item: NavItem): INavNodeScope { return item.ensureScope(scope); });
            return navLists;
        }
    }
    export function isNavPage(node: NavNode|NavItem): node is NavPage { return node.type === "page"; }
    export interface INavLinkScope extends INamedNavNodeScope {
        url: string;
    }
    export function isNavLinkScope(scope: INavNodeScope): scope is INavLinkScope { return scope.type === "link"; }
    export class NavLink extends NamedNavNode {
        private _url : string;
        public get url() : string { return this._url; }
        constructor(config: INavConfigLink, parent: INavContainer, precedingSibling?: NavItem) {
            super(config, parent, precedingSibling);
            this._url = config.url.trim();
        }
        protected OnScopeInit(scope: INavLinkScope): void {
            super.OnScopeInit(scope);
            scope.url = this._url;
        }
    }
    export function isNavLink(node: NavNode|NavItem): node is NavLink { return node.type === "link"; }
    export class NavSeparator extends NavNode {
        constructor(config: INavConfigSeparator, parent: INavContainer, precedingSibling?: NavItem) {
            super(config, parent, precedingSibling);
        }
    }
    export function isNavSeparator(node: NavNode|NavItem): node is NavSeparator { return node.type === "separator"; }
    export function isNavSeparatorScope(scope: INavNodeScope): boolean { return scope.type === "separator"; }
    export type NavItem = NavPage|NavLink|NavSeparator;
    export interface ICurrentNavNodes extends INavContainer { current?: NavItem; }
    interface INodeMapContext<TParent> { parent: TParent; precedingSibling?: NavItem; }
    export class NavConfigSettingsService {
        private _location: angular.ILocationService;
        private _document: angular.IDocumentService;
        private _http: angular.IHttpService;
        private _allNodes: angular.IPromise<INavContainer>|undefined;
        private _currentNav: angular.IPromise<ICurrentNavNodes>|undefined;
        static $inject: string[] = ["$location", "$document", "$http"];
        constructor($location: angular.ILocationService, $document: angular.IDocumentService, $http: angular.IHttpService) {
            this._location = $location;
            this._document = $document;
            this._http = $http;
        }
        private static mapToNavItem(this: INodeMapContext<INavContainer>, value: NavConfigNode): NavItem {
            if (isNavConfigPageRef(value))
                this.precedingSibling = new NavPage(value, this.parent, this.precedingSibling);
            else if (isNavConfigLink(value))
                this.precedingSibling = new NavLink(value, this.parent, this.precedingSibling);
            else
                this.precedingSibling = new NavSeparator(value, this.parent, this.precedingSibling);
            return this.precedingSibling;
        }
        private ensureAllNodes(): angular.IPromise<INavContainer> {
            if (typeof(this._allNodes) == "undefined") {
                this._allNodes = this._http.get<INavConfigSettings>("navSettings.json", { responseType: "json" }).then<INavContainer>(function(value: angular.IHttpResponse<INavConfigSettings>): armySnDocsNavigation.INavContainer {
                    let result: INavContainer = { topNavBar: [], sideNav: [] };
                    result.topNavBar = (typeof(value.data.navBar) == "undefined" || value.data.navBar.length == 0) ? [] : value.data.navBar.map(NavConfigSettingsService.mapToNavItem, { parent: context });
                    result.sideNav = (typeof(value.data.sideBar) == "undefined" || value.data.sideBar.length == 0) ? [] : value.data.navBar.map(NavConfigSettingsService.mapToNavItem, { parent: context });
                    return result;
                });
            }
            return this._allNodes;
        }
        applyCurrentNavigation(scope: armySnDocsMain.IMainAppScope): angular.IPromise<ICurrentNavNodes> {
            if (typeof(this._currentNav) == "undefined") {
                let thisObj: NavConfigSettingsService = this;
                this._currentNav = this.ensureAllNodes().then<ICurrentNavNodes>(function(importedNodes: armySnDocsNavigation.INavContainer): ICurrentNavNodes {
                    let currentPage: NavPage|undefined = NavPage.findPageByPath(importedNodes, thisObj._location.path());
                    if (typeof(currentPage) == "undefined") {
                        scope.currentRootNavItem = undefined;
                        scope.topNavBar = importedNodes.topNavBar.map(function(value: NavItem): INavNodeScope { return value.ensureScope(scope); });
                        scope.sideNav = importedNodes.sideNav.map(function(value: NavItem): INavNodeScope { return value.ensureScope(scope); });
                        return { topNavBar: importedNodes.topNavBar, sideNav: importedNodes.sideNav };
                    }
                    let result: ICurrentNavNodes = currentPage.setAsSelectedPage(scope);
                    scope.currentPage = <INavPageScope>(currentPage.scope);
                    result.current = currentPage;
                    return result;
                });
            }
            return this._currentNav;
        }
    }
}

module appUtility {
    export function isScopeObject(value: object): value is angular.IScope {
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

    export function hasNamedValue(target: object, name: string, ...type: ("string" | "number" | "boolean" | "symbol" | "object" | "function")[]): boolean {
        let value: any|undefined = (<{ [key: string]: any }>target)[name];
        let t = typeof(value);
        return t != "undefined" && (t != "object" || value !== null) && (type == null || type.length == 0 || type.filter(function(s: string) { return s == t; }).length > 0);
    }
    
    export function hasTypedValue(target: object, name: string, c: Function): boolean {
        let value: any|undefined = (<{ [key: string]: any }>target)[name];
        let t = typeof(value);
        return t != "undefined" && (t != "object" || value !== null) && target instanceof c;
    }
    
    export function getNamedValue(target: object, name: string, allowNull?: boolean, defaultValue?: any): any|undefined {
        let value: any|undefined = (<{ [key: string]: any }>target)[name];
        let t = typeof(value);
        return (t != "undefined" && (t != "object" || value !== null || allowNull === true)) ? value : defaultValue;
    }
    
    export class uniqueIdentifierService {
        private _document: angular.IDocumentService;
        static $inject: string[] = ['$document'];
        constructor($document: angular.IDocumentService) {
            this._document = $document;
        }
    }
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
                if (!NavItem.isNavItem(parent) && typeof(parent.current) != "undefined" && parent.current.controller.__NavItem__uniqueId === current.__NavItem__uniqueId)
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
        static findNavItemByPath(path: string, items: NavItem[]): NavItem|undefined {
            for (let i: number = 0; i < items.length; i++) {
                if (items[i].url == path)
                    return items[i];
                if (items[i]._navItems.length > 0) {
                    let r: NavItem|undefined = NavItem.findNavItemByPath(path, items[i]._navItems);
                    if (typeof(r) !== "undefined")
                        return r;
                }
            }
        }
    }
    export function initializeTopLevelScope(scope: ITopLevelScope, location: angular.ILocationService) {
        scope.sideNavNodes = [];
        scope.titleText = "";
        scope.descriptionText = "";
        let items: NavItem[] = NavItem.import(navSettingsJSON.navItems, scope);
        scope.navItems = items.map(function(item: NavItem): INavScope { return item.scope;  });
        let path: string = location.path();
        if (path.startsWith("/"))
            path = path.substr(1);
        let current: NavItem|undefined = NavItem.findNavItemByPath(path, items);
        if (typeof(current) != "undefined")
            current.isActive = true;
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

module armySnDocsMain {
    export interface IMainAppScope extends angular.IScope {
        currentPage: armySnDocsNavigation.INavPageScope|undefined;
        currentRootNavItem: armySnDocsNavigation.INavPageScope|undefined;
        topNavBar: armySnDocsNavigation.INavNodeScope[];
        sideNav: armySnDocsNavigation.INavNodeScope[]
    }
    export function isMainAppScope(scope: angular.IScope): scope is IMainAppScope {
        return appUtility.hasTypedValue(scope, "currentPage", armySnDocsNavigation.NavPage);
    }
    export class MainController {
        private _scope: IMainAppScope;
        private _http: angular.IHttpService;
        private _location: angular.ILocationService;
        private _anchorScroll: angular.IAnchorScrollService;
        private _navConfigSettings: armySnDocsNavigation.NavConfigSettingsService;
        static $inject: string[] = ['$scope', '$http', '$location', '$anchorScroll', 'armySnDocsNavigation.NavConfigSettingsService'];
        constructor($scope: IMainAppScope, $http: angular.IHttpService, $location: angular.ILocationService, $anchorScroll: angular.IAnchorScrollService, navConfigSettings: armySnDocsNavigation.NavConfigSettingsService) {
            this._scope = $scope;
            this._http = $http;
            this._location = $location;
            this._anchorScroll = $anchorScroll;
            this._navConfigSettings = navConfigSettings;
        }
    }
    export class PageHeadingAndNavDirective2 implements angular.IDirective<IMainAppScope> {
        private _scope: IMainAppScope;
        private _http: angular.IHttpService;
        private _location: angular.ILocationService;
        private _navConfigSettings: armySnDocsNavigation.NavConfigSettingsService;
        static $inject: string[] = ['$scope', '$http', '$location', 'armySnDocsNavigation.NavConfigSettingsService'];
        link(scope: IMainAppScope, instanceElement: JQLite, instanceAttributes: angular.IAttributes
        ): void {
            instanceElement.append('\n\t<!--[if lt IE 7]>\n\t\t<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>\n\t<![endif]-->');
            let headerElement: JQuery = $('<header />');
            instanceElement.append(headerElement);
            headerElement.addClass(['container-fluid', 'border', 'border-secondary', 'p-sm-1', 'defaultHeader']);
            let element: JQuery = $('<h1 />');
            headerElement.append(element);
            element.text("Did we get this?");
            let navElement: JQuery = $('<nav />');
            instanceElement.append(navElement);
            navElement.addClass(['container-fluid', 'navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light', 'border', 'border-light', 'p-sm-1', 'mr-md-3']);
            let ulElement: JQuery = $('<ul />');
            navElement.append(ulElement);
            ulElement.addClass(['navbar-nav', 'mr-auto']);
            this._navConfigSettings.applyCurrentNavigation(scope).then(function(currentNav: armySnDocsNavigation.ICurrentNavNodes) {
                currentNav.topNavBar.forEach(function(node: armySnDocsNavigation.NavItem) {
                    node.addTopNavElement(ulElement);
                });
            })
        }
        constructor($scope: IMainAppScope, $http: angular.IHttpService, $location: angular.ILocationService, navConfigSettings: armySnDocsNavigation.NavConfigSettingsService) {
            this._scope = $scope;
            this._http = $http;
            this._location = $location;
            this._navConfigSettings = navConfigSettings;
        }
    }
    export function PageHeadingAndNavDirective(): angular.IDirective<angular.IScope> {
        return {
            template: `
    <!--[if lt IE 7]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
    <header class="container-fluid border border-secondary p-sm-1 defaultHeader">
        <h1>{{titleText}}</h1>{{descriptionText}}
    </header>
    <nav class="container-fluid navbar navbar-expand-lg navbar-light bg-light border border-light p-sm-1 mr-md-3">
        <ul class="navbar-nav mr-auto">
            <li ng-repeat="m in navItems" class="{{m.itemClass}}">
                <a href="{{m.url}}" ng-if="m.isPage" class="{{m.linkClass}}">{{m.title}}</a>
                <a href="{{m.url}}" ng-if="!m.isPage" class="{{m.linkClass}}" target="_blank">{{m.title}}</a>
            </li>
        </ul>
    </nav>
    <aside ng-if="sideNavNodes.length > 0" class="float-right d-inline-flex">
        <ul class="nav flex-column">
            <li ng-repeat="m in sideNavNodes" class="nav-item {{m.itemClass}}">
                <a href="{{m.url}}" ng-if="m.isPage" class="{{m.linkClass}}">{{m.title}}</a>
                <a href="{{m.url}}" ng-if="!m.isPage" class="{{m.linkClass}}" target="_blank">{{m.title}}</a>
            </li>
        </ul>
    </aside>
`
        };
    }
}
class armySnDocsMainController {
    private _scope: IMainAppScope;
    private _http: angular.IHttpService;
    private _location: angular.ILocationService;
    private _anchorScroll: angular.IAnchorScrollService;
    private _navConfigSettings: armySnDocsNavigation.NavConfigSettingsService;
    static $inject: string[] = ['$scope', '$http', '$location', '$anchorScroll', 'armySnDocsNavigation.NavConfigSettingsService'];
    constructor($scope: IMainAppScope, $http: angular.IHttpService, $location: angular.ILocationService, $anchorScroll: angular.IAnchorScrollService, navConfigSettings: armySnDocsNavigation.NavConfigSettingsService) {
        this._scope = $scope;
        this._http = $http;
        this._location = $location;
        this._anchorScroll = $anchorScroll;
        this._navConfigSettings = navConfigSettings;
    }
    static isMainAppScope(scope: angular.IScope): scope is IMainAppScope {
        return menuControllers.isTopLevelScope(scope) && typeof((<{ [key: string]: any }>scope).scrollToAnchor) == "function";
    }
}

angular.module('armySnDocsApp', [])
.service('armySnDocsNavigation.NavConfigSettingsService', armySnDocsNavigation.NavConfigSettingsService)
.controller('armySnDocsMain.MainController', armySnDocsMain.MainController)
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
                element.attr("href", "#");
                if (typeof(instanceAttributes.class) == "string" && instanceAttributes.class.trim().length > 0)
                    element.addClass(instanceAttributes.class);
                element.click(function() {
                    $location.hash(id);
                    $anchorScroll(id);
                    return false;
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
.directive('pageHeadingAndNav', [armySnDocsMain.PageHeadingAndNavDirective])
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
                            element = $('<a href="#" />');
                            element.attr("href", item.url);
                            if (!item.isPage)
                                element.attr("target", "_blank");
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
