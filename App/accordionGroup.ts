/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />

namespace accordionGroup {
    interface IShowHideCallback { (show: boolean, state?: any): void; }

    // #region <accordion-group></accordion-group>

    interface IAccordionGroupItemState {
        id: number;
        callback: IShowHideCallback;
        name: string;
        state?: any;
    }

    class AccordionGroupController implements ng.IController {
        private _state: IAccordionGroupItemState[] = [];
        private _current: string | undefined = undefined;

        private find(name: string): IAccordionGroupItemState[] { return this._state.filter((value: IAccordionGroupItemState) => value.name === name); }
        private get(id: number): IAccordionGroupItemState | undefined {
            if (this._state.length > 0) {
                let result: IAccordionGroupItemState = this._state.find((value: IAccordionGroupItemState) => value.id == id);
                if (typeof result === "object" && result !== null)
                    return result;
            }
        }

        add(name: string, showHideCallback: IShowHideCallback, autoExpand?: boolean, state?: any): number {
            if (typeof name !== "string")
                name = "";
            let id: number = this._state.length;
            if (this._state.length > 0) {
                while (typeof (this.get(id)) !== "undefined")
                    id--;
            }
            if (this._state.length == 0) {
                this._state.push({ id: id, callback: showHideCallback, name: name, state: state });
                if (typeof autoExpand === "boolean" && !autoExpand)
                    showHideCallback(false, state);
                else {
                    this._current = name;
                    showHideCallback(true, state);
                }
            } else if (typeof autoExpand === "boolean" && autoExpand) {
                this._current = undefined;
                if (typeof this._current === "string") {
                    let toHide: IAccordionGroupItemState[] = this.find(this._current);
                    toHide.forEach((item: IAccordionGroupItemState) => item.callback(false, item.state));
                }
                let toShow: IAccordionGroupItemState[] = this.find(name);
                this._current = name;
                if (toShow.length > 0)
                    toShow.forEach((item: IAccordionGroupItemState) => item.callback(true, item.state));
                this._state.push({ id: id, callback: showHideCallback, name: name, state: state });
                showHideCallback(true, state);
            } else {
                this._state.push({ id: id, callback: showHideCallback, name: name, state: state });
                showHideCallback(this._current === name);
            }
            return id;
        }

        remove(id: number): boolean {
            let index: number = this._state.findIndex((value: IAccordionGroupItemState) => value.id == id);
            let item: IAccordionGroupItemState;
            if (index == 0)
                item = this._state.shift();
            else if (index == this._state.length - 1)
                item = this._state.pop();
            else if (index > 0)
                item = this._state.splice(index, 1)[0];
            else
                return false;
            if (this._current == item.name && this._state.length > 0 && this.find(item.name).length == 0)
                this.show(this._state[0].name);
            return true;
        }

        show(name: string): void {
            if (typeof name !== "string")
                name = "";
            if (name === this._current)
                return;
            let toHide: IAccordionGroupItemState[] = (this._state.length == 0 || (typeof this._current !== "string")) ? [] : this.find(this._current);
            let toShow: IAccordionGroupItemState[] = this.find(name);
            if (toShow.length == 0)
                return;
            toHide.forEach((item: IAccordionGroupItemState) => item.callback(false, item.state));
            this._current = name;
            toShow.forEach((item: IAccordionGroupItemState) => item.callback(true, item.state));
        }

        hide(name: string): void {
            if (typeof name !== "string")
                name = "";
            if (name !== this._current || this._state.length == 0)
                return;
            this._current = undefined;
            this.find(name).forEach((toHide: IAccordionGroupItemState) => toHide.callback(false, toHide.state));
        }

        toggle(name: string): void {
            if (typeof name !== "string")
                name = "";
            if (name === this._current)
                this.hide(name);
            else
                this.show(name);
        }

        $onInit(): void { }
    }

    app.appModule.directive("accordionGroup", () => <ng.IDirective>{
        restrict: "E",
        controller: ["$scope", AccordionGroupController]
    });

    // #endregion

    // #region accordion-group-toggle-on-click

    interface IAccordionGroupToggleOnClickAttributes extends ng.IAttributes { accordionGroupToggleOnClick: string; class?: string }

    function AccordionGroupToggleOnClickLink(scope: ng.IScope, element: JQuery, instanceAttributes: IAccordionGroupToggleOnClickAttributes, controller: AccordionGroupController): void {
        element.on("click", () => controller.toggle(instanceAttributes.accordionGroupToggleOnClick));
        if (typeof instanceAttributes.class === "string") {
            let c: string = instanceAttributes.class.trim();
            if (c.length > 0) {
                let n: string[] = c.split(sys.whitespaceRe);
                if (n.indexOf("cursor-pointer") >= 0)
                    return;
            }
        }
        instanceAttributes.$addClass("cursor-pointer");
    }

    app.appModule.directive("accordionGroupToggleOnClick", () => <ng.IDirective>{
        require: "^^accordionGroup",
        restrict: "A",
        transclude: true,
        template: '<ng-transclude></ng-transclude>',
        link: AccordionGroupToggleOnClickLink
    });

    // #endregion

    // #region <accordion-group-content-item auto-expand="(true|false)?"></accordion-group-content-item>

    interface IAccordionGroupContentItemAttributes extends ng.IAttributes { accordionGroupContentItem: string; autoExpand: string; }

    function AccordionGroupContentItemLink(scope: ng.IScope, element: JQuery, instanceAttributes: IAccordionGroupContentItemAttributes, controller: AccordionGroupController): void {
        let autoExpand: boolean | undefined;
        if (typeof instanceAttributes.autoExpand === "string") {
            let s: string = instanceAttributes.autoExpand.trim();
            if (s.length > 0) {
                if (sys.isTrueRe.test(s))
                    autoExpand = true;
                else if (sys.isFalseRe.test(s))
                    autoExpand = false;
            }
        }
        let id: number = controller.add(instanceAttributes.accordionGroupContentItem, (show: boolean) => {
            if (show)
                element.show();
            else
                element.hide();
        }, autoExpand);
        element.on("$destory", () => controller.remove(id));
    }

    app.appModule.directive("accordionGroupContentItem", () => <ng.IDirective>{
        require: "^^accordionGroup",
        restrict: "A",
        transclude: true,
        template: '<ng-transclude></ng-transclude>',
        link: AccordionGroupContentItemLink
    });

    // #endregion

    // #region <accordion-group-toggle-button item-id="" expanded-class="" collapsed-class=""></accordion-group-toggle-button>

    interface IAccordionGroupToggleButtonAttributes extends ng.IAttributes {
        class?: string;
        itemId: string;
        expandedClass?: string;
        collapsedClass?: string;
    }

    interface IAccordionGroupToggleButtonScope extends ng.IScope {
        class?: string;
        itemId: string;
        isShown: boolean;
    }

    function AccordionGroupToggleButtonLink(scope: IAccordionGroupToggleButtonScope, element: JQuery, instanceAttributes: IAccordionGroupToggleButtonAttributes, controller: AccordionGroupController): void {
        let expandedClass: string[] = [];
        let collapsedClass: string[] = [];
        let s: string;
        if ((typeof instanceAttributes.class === "string") && (s = instanceAttributes.class.trim()).length > 0) {
            expandedClass = s.split(/\s+/);
            collapsedClass = s.split(/\s+/);
        }
        if ((typeof instanceAttributes.expandedClass === "string") && (s = instanceAttributes.expandedClass.trim()).length > 0)
            expandedClass = expandedClass.concat(s.split(/\s+/));
        if ((typeof instanceAttributes.collapsedClass === "string") && (s = instanceAttributes.collapsedClass.trim()).length > 0)
            collapsedClass = collapsedClass.concat(s.split(/\s+/));
        if (expandedClass.indexOf("cursor-pointer") < 0)
            expandedClass.unshift("cursor-pointer");
        if (collapsedClass.indexOf("cursor-pointer") < 0)
            collapsedClass.unshift("cursor-pointer");
        scope.isShown = false;
        let id: number = controller.add(instanceAttributes.accordionGroupContentItem, (show: boolean) => {
            scope.isShown = show;
            if (show) {
                collapsedClass.forEach((n: string) => {
                    if (element.hasClass(n))
                        element.removeClass(n);
                });
                expandedClass.forEach((n: string) => {
                    if (!element.hasClass(n))
                        element.addClass(n);
                });
            } else {
                expandedClass.forEach((n: string) => {
                    if (element.hasClass(n))
                        element.removeClass(n);
                });
                collapsedClass.forEach((n: string) => {
                    if (!element.hasClass(n))
                        element.addClass(n);
                });
            }
        });
        element.on("$destory", () => controller.remove(id));
    }

    app.appModule.directive("accordionGroupToggleButton", () => <ng.IDirective>{
        restrict: "E",
        transclude: true,
        require: "^^accordionGroup",
        scope: { itemId: "@" },
        link: AccordionGroupToggleButtonLink,
        template: '<button onclick="return false;" ng-transclude></button>'
    });

    // #endregion

    // #region <accordion-group-button-text expanded-text="" collapsed-text="" expanded-class="" collapsed-class="" />

    interface IAccordionGroupButtonTextAttributes extends ng.IAttributes { expandedText?: string; collapsedText?: string, class?: string, expandedClass?: string; collapsedClass?: string }

    function AccordionGroupButtonTextLink(scope: IAccordionGroupToggleButtonScope, element: JQuery, instanceAttributes: IAccordionGroupButtonTextAttributes, controller: AccordionGroupController): void {
        let expandedClass: string[] = [];
        let collapsedClass: string[] = [];
        let s: string;
        if ((typeof instanceAttributes.class === "string") && (s = instanceAttributes.class.trim()).length > 0) {
            expandedClass = s.split(/\s+/);
            collapsedClass = s.split(/\s+/);
        }
        if ((typeof instanceAttributes.expandedClass === "string") && (s = instanceAttributes.expandedClass.trim()).length > 0)
            expandedClass = expandedClass.concat(s.split(/\s+/));
        if ((typeof instanceAttributes.collapsedClass === "string") && (s = instanceAttributes.collapsedClass.trim()).length > 0)
            collapsedClass = collapsedClass.concat(s.split(/\s+/));

        function onShownCanged(newValue: boolean) {
            if (newValue) {
                element.text((typeof instanceAttributes.expandedText === "string") ? instanceAttributes.expandedText : "");
                collapsedClass.forEach((n: string) => {
                    if (element.hasClass(n))
                        element.removeClass(n);
                });
                expandedClass.forEach((n: string) => {
                    if (!element.hasClass(n))
                        element.addClass(n);
                });
            } else {
                element.text((typeof instanceAttributes.collapsedText === "string") ? instanceAttributes.collapsedText : "");
                expandedClass.forEach((n: string) => {
                    if (element.hasClass(n))
                        element.removeClass(n);
                });
                collapsedClass.forEach((n: string) => {
                    if (!element.hasClass(n))
                        element.addClass(n);
                });
            }
        }
        onShownCanged(scope.isShown);
        scope.$watch("isShown", onShownCanged);
    }

    app.appModule.directive("accordionGroupButtonText", () => <ng.IDirective>{
        require: "^^accordionGroupToggleButton",
        restrict: "E",
        link: AccordionGroupButtonTextLink,
        template: '<span></span>'
    });

    // #endregion

    // #region <accordion-group-button-expanded></accordion-group-button-expanded>

    function AccordionGroupButtonExpandedLink(scope: IAccordionGroupToggleButtonScope, element: JQuery, instanceAttributes: ng.IAttributes, controller: AccordionGroupController): void {
        function onShownCanged(newValue: boolean) {
            if (newValue)
                element.show();
            else
                element.hide();
        }
        onShownCanged(scope.isShown);
        scope.$watch("isShown", onShownCanged);
    }

    app.appModule.directive("accordionGroupButtonExpanded", () => <ng.IDirective>{
        require: "^^accordionGroupToggleButton",
        restrict: "E",
        transclude: true,
        template: '<ng-transclude></ng-transclude>',
        link: AccordionGroupButtonExpandedLink
    });

    // #endregion

    // #region <accordion-group-button-collapsed></accordion-group-button-collapsed>

    function AccordionGroupButtonCollapsedLink(scope: IAccordionGroupToggleButtonScope, element: JQuery, instanceAttributes: ng.IAttributes, controller: AccordionGroupController): void {
        function onShownCanged(newValue: boolean) {
            if (newValue)
                element.hide();
            else
                element.show();
        }
        onShownCanged(scope.isShown);
        scope.$watch("isShown", onShownCanged);
    }

    app.appModule.directive("accordionGroupButtonCollapsed", () => <ng.IDirective>{
        require: "^^accordionGroupToggleButton",
        restrict: "E",
        transclude: true,
        template: '<ng-transclude></ng-transclude>',
        link: AccordionGroupButtonCollapsedLink
    });

    // #endregion

    // #region <accordion-group-button-image expanded-src="" collapsed-src="" expanded-alt="" collapsed-alt="" expanded-class="" collapsed-class=""></accordion-group-button-image>

    interface IAccordionGroupButtonImageAttributes extends ng.IAttributes { expandedSrc?: string; collapsedSrc?: string, expandedAlt?: string, collapsedAlt?: string, class?: string, expandedClass?: string; collapsedClass?: string }

    function AccordionGroupButtonImageLink(scope: IAccordionGroupToggleButtonScope, element: JQuery, instanceAttributes: IAccordionGroupButtonImageAttributes, controller: AccordionGroupController): void {
        let expandedClass: string[] = [];
        let collapsedClass: string[] = [];
        let s: string;
        if ((typeof instanceAttributes.class === "string") && (s = instanceAttributes.class.trim()).length > 0) {
            expandedClass = s.split(/\s+/);
            collapsedClass = s.split(/\s+/);
        }
        if ((typeof instanceAttributes.expandedClass === "string") && (s = instanceAttributes.expandedClass.trim()).length > 0)
            expandedClass = expandedClass.concat(s.split(/\s+/));
        if ((typeof instanceAttributes.collapsedClass === "string") && (s = instanceAttributes.collapsedClass.trim()).length > 0)
            collapsedClass = collapsedClass.concat(s.split(/\s+/));

        function onShownCanged(newValue: boolean) {
            if (newValue) {
                if (typeof (instanceAttributes.expandedSrc) === "string")
                    element.attr("src", instanceAttributes.expandedSrc);
                else
                    element.removeAttr("src");
                if (typeof (instanceAttributes.expandedAlt) === "string")
                    element.attr("alt", instanceAttributes.expandedAlt);
                else
                    element.removeAttr("alt");
                collapsedClass.forEach((n: string) => {
                    if (element.hasClass(n))
                        element.removeClass(n);
                });
                expandedClass.forEach((n: string) => {
                    if (!element.hasClass(n))
                        element.addClass(n);
                });
            } else {
                if (typeof (instanceAttributes.collapsedSrc) === "string")
                    element.attr("src", instanceAttributes.collapsedSrc);
                else
                    element.removeAttr("src");
                if (typeof (instanceAttributes.collapsedAlt) === "string")
                    element.attr("alt", instanceAttributes.collapsedAlt);
                else
                    element.removeAttr("alt");
                expandedClass.forEach((n: string) => {
                    if (element.hasClass(n))
                        element.removeClass(n);
                });
                collapsedClass.forEach((n: string) => {
                    if (!element.hasClass(n))
                        element.addClass(n);
                });
            }
        }
        onShownCanged(scope.isShown);
        scope.$watch("isShown", onShownCanged);
    }

    app.appModule.directive("accordionGroupButtonImage", () => <ng.IDirective>{
        require: "^^accordionGroupToggleButton",
        restrict: "E",
        link: AccordionGroupButtonImageLink,
        template: '<img />'
    });

    // #endregion
}
