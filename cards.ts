/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />

namespace cards {
    // #region CardParentController

    /**
     * Defines the {@link ng.IScope.$parent} scope of {@link cardController} objects.
     *
     * @interface ICardParentScope
     * @extends {ng.IScope}
     */
    export interface ICardContainerScope extends ng.IScope {
        selectedCardIndex: number;
        collapseSelectedCard(): boolean;
        collapseCard(index: ICardScope | number): boolean;
        expandCard(index: ICardScope | number): boolean;
        toggleCard(index: ICardScope | number): boolean;
        indexOfCard(scopeId: number): number;
        scopeIdOfCard(index: number): number;
        addCard(card: ICardScope): number;
    }

    export function isCardContainerScope(scope: ng.IScope): scope is ICardContainerScope {
        return !((sys.isNil(scope) || sys.isNil((<ICardContainerScope>scope).selectedCardIndex) || sys.isNil((<ICardContainerScope>scope).collapseCard) || sys.isNil((<ICardContainerScope>scope).collapseSelectedCard) ||
            sys.isNil((<ICardContainerScope>scope).expandCard) || sys.isNil((<ICardContainerScope>scope).toggleCard) || sys.isNil((<ICardContainerScope>scope).addCard))) && sys.isNumber((<ICardContainerScope>scope).selectedCardIndex) &&
            (typeof (<ICardContainerScope>scope).collapseCard === "function") && (typeof (<ICardContainerScope>scope).collapseSelectedCard === "function") &&
            (typeof (<ICardContainerScope>scope).expandCard === "function") && (typeof (<ICardContainerScope>scope).toggleCard === "function" && (typeof (<ICardContainerScope>scope).addCard === "function"));
    }

    /**
     * Manages a collection of nested collapsible cards.
     *
     * @abstract
     * @class CardParentController
     * @extends {cardController}
     */
    export class CardParentController implements ng.IController {
        private _scopeIds: number[] = [];
        private _childCards: ICardScope[] = [];
        private _selectedCardIndex: number = -1;

        get selectedCardScopeId(): number | undefined {
            if (this._selectedCardIndex > -1)
                return this._scopeIds[this._selectedCardIndex];
        }
        set selectedCardScopeId(scopeId: number | undefined) { this.selectedCardIndex = (typeof (scopeId) === "number") ? this._scopeIds.indexOf(scopeId) : -1; }

        get selectedCardIndex(): number | undefined { return this._selectedCardIndex; }
        set selectedCardIndex(index: number) {
            if (index < 0) {
                if (this._selectedCardIndex > -1)
                    this.collapseCard(this._selectedCardIndex);
            } else
                this.expandCard(index);
        }

        /**
         * Creates an instance of topLevelCardController.
         * @param {ICardContainerScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ICardParentScope}.
         */
        constructor(protected $scope: ICardContainerScope) {
            let controller: CardParentController = this;
            $scope.selectedCardIndex = this.selectedCardIndex;
            $scope.addCard = (card: ICardScope) => { return controller.addCard(card); };
            $scope.collapseSelectedCard = () => { return controller.collapseSelectedCard(); }
            $scope.collapseCard = (index: ICardScope | number) => { return controller.collapseCard(index); }
            $scope.expandCard = (index: ICardScope | number) => { return controller.expandCard(index); }
            $scope.toggleCard = (index: ICardScope | number) => { return controller.toggleCard(index); }
            $scope.indexOfCard = (scopeId: number) => { return controller.indexOfCard(scopeId); }
        }

        addCard(card: ICardScope): number {
            if (sys.isNil(card) || !sys.isNumber(card.$id))
                throw new Error("Invalid card.");
            if (!sys.isNil(card.currentCardParent))
                throw new Error("Card \"" + card.cardHeadingText + "\" belongs to another collection");
            let index: number = this._scopeIds.indexOf(card.$id);
            if (index > -1)
                throw new Error("A card with the name scope ID has already been added.");
            index = this._childCards.length;
            this._scopeIds.push(card.$id);
            this._childCards.push(card);
            card.currentCardNumber = index + 1;
            card.currentCardParent = this.$scope;
            if (this._selectedCardIndex < 0) {
                this._selectedCardIndex = this.$scope.selectedCardIndex = index;
                card.cardActionVerb = CollapsibleActionVerb.collapse;
                card.cardIconUrl = CollapsibleIconUrl.collapse;
                card.currentCardIsExpanded = true;
            } else {
                card.cardActionVerb = CollapsibleActionVerb.expand;
                card.cardIconUrl = CollapsibleIconUrl.expand;
                card.currentCardIsExpanded = false;
            }
            return index;
        }

        collapseSelectedCard(): boolean { return this._selectedCardIndex > -1 && this.collapseCard(this._selectedCardIndex); }

        collapseCard(index: ICardScope | number): boolean {
            let card: ICardScope;
            if (typeof (index) === "number") {
                if (isNaN(index) || index !== this._selectedCardIndex)
                    return false;
                card = this._childCards[index];
            } else {
                card = index;
                if (sys.isNil(index) || !sys.isNumber(index.$id) || (index = this._scopeIds.indexOf(index.$id)) < 0 || index !== this._selectedCardIndex)
                    return false;
            }
            this._selectedCardIndex = this.$scope.selectedCardIndex = -1;
            card.cardActionVerb = CollapsibleActionVerb.expand;
            card.cardIconUrl = CollapsibleIconUrl.expand;
            card.currentCardIsExpanded = false;
            return true;
        }

        expandCard(index: ICardScope | number): boolean {
            let oldIndex: number = this._selectedCardIndex;
            let card: ICardScope;
            if (typeof (index) === "number") {
                if (isNaN(index) || index === this._selectedCardIndex || index < 0 || index >= this._childCards.length)
                    return false;
                index = name;
                card = this._childCards[index];
            } else {
                card = index;
                if (sys.isNil(index) || (index = this._scopeIds.indexOf(index.$id)) < 0 || index == this._selectedCardIndex)
                    return false;
            }
            
            this._selectedCardIndex = this.$scope.selectedCardIndex = index;
            card.cardActionVerb = CollapsibleActionVerb.collapse;
            card.cardIconUrl = CollapsibleIconUrl.collapse;
            card.currentCardIsExpanded = true;
            if (oldIndex > -1) {
                card = this._childCards[oldIndex];
                card.cardActionVerb = CollapsibleActionVerb.expand;
                card.cardIconUrl = CollapsibleIconUrl.expand;
                card.currentCardIsExpanded = false;
            }
            return true;
        }

        toggleCard(index: ICardScope | number): boolean {
            let card: ICardScope;
            if (typeof (index) === "number") {
                if (isNaN(name) || name < 0 || name >= this._childCards.length)
                    return false;
                card = this._childCards[index];
            } else {
                card = index;
                if (sys.isNil(index) || (index = this._scopeIds.indexOf(index.$id)) < 0)
                    return false;
            }
            if (index == this._selectedCardIndex) {
                this._selectedCardIndex = this.$scope.selectedCardIndex = -1;
                card.cardActionVerb = CollapsibleActionVerb.expand;
                card.cardIconUrl = CollapsibleIconUrl.expand;
                card.currentCardIsExpanded = false;
            } else {
                let oldIndex: number = this._selectedCardIndex;
                this._selectedCardIndex = this.$scope.selectedCardIndex = index;
                card.cardActionVerb = CollapsibleActionVerb.collapse;
                card.cardIconUrl = CollapsibleIconUrl.collapse;
                card.currentCardIsExpanded = true;
                if (oldIndex > -1) {
                    card = this._childCards[oldIndex];
                    card.cardActionVerb = CollapsibleActionVerb.expand;
                    card.cardIconUrl = CollapsibleIconUrl.expand;
                    card.currentCardIsExpanded = false;
                }
            }
            return true;
        }

        indexOfCard(scopeId: number): number { return (typeof (scopeId) === "string") ? this._scopeIds.indexOf(scopeId) : -1; }

        scopeIdOfCard(index: number): number | undefined {
            if (index > -1 && index < this._scopeIds.length)
                return this._scopeIds[index];
        }

        $doCheck() {
            if (typeof (this.$scope.selectedCardIndex) !== "number" || isNaN(this.$scope.selectedCardIndex) || this.$scope.selectedCardIndex >= this._childCards.length || this.$scope.selectedCardIndex < -2)
                this.$scope.selectedCardIndex = -1;

            if (this.$scope.selectedCardIndex === this._selectedCardIndex) {
                if (this.$scope.selectedCardIndex > -1) {
                    let card: ICardScope = this._childCards[this.$scope.selectedCardIndex];
                    if (!card.currentCardIsExpanded) {
                        this._selectedCardIndex = this.$scope.selectedCardIndex = -1;
                        card.cardActionVerb = CollapsibleActionVerb.expand;
                        card.cardIconUrl = CollapsibleIconUrl.expand;
                    }   
                }
            } else if (this.$scope.selectedCardIndex < 0)
                this.collapseCard(this._selectedCardIndex);
            else
                this.expandCard(this.$scope.selectedCardIndex);
        }
    }

    // #endregion

    // #region CardController

    /**
     * Options for the relative icon URL of collapsible items.
     *
     * @enum {string}
     */
    export enum CollapsibleIconUrl {
        collapse = 'images/collapse.svg',
        expand = 'images/expand.svg'
    }

    /**
     * Options for the verb name of collapsible items.
     *
     * @enum {string}
     */
    export enum CollapsibleActionVerb {
        collapse = 'Collapse',
        expand = 'Expand'
    }

    /**
     * Interface for the angular {@link ng.IScope} for collapsible cards using a {@link cardController}.
     *
     * @interface ICardScope
     * @extends {ng.IScope}
     */
    export interface ICardScope extends ICardContainerScope {
        currentCardNumber: number,
        cardHeadingText: string,
        cardIconUrl: CollapsibleIconUrl,
        cardActionVerb: CollapsibleActionVerb,
        currentCardIsExpanded: boolean,
        expandCurrentCard(): boolean,
        collapseCurrentCard(): boolean,
        toggleCurrentCard(): boolean,
        currentCardParent: ICardContainerScope
    }

    /**
     * The base class for collapsible cards.
     *
     * @abstract
     * @class cardController
     * @implements {ng.IController}
     */
    export abstract class CardController extends CardParentController {
        private _parentScope: ICardContainerScope;
        private _currentCardIsExpanded: boolean;

        get currentCardId(): number { return this.$scope.$id; }

        /**
         * Creates an instance of cardController to represent a new collapsible card.
         * @param {TScope extends ICardScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ICardScope}.
         * @param {string} headingText The heading text for the new card.
         * @memberof cardController
         */
        constructor(protected readonly $scope: ICardScope, public readonly headingText: string) {
            super($scope);
            let parentScope: ICardContainerScope | undefined;
            for (let ps: ng.IScope = $scope.$parent; !sys.isNil(ps); ps = ps.$parent) {
                if (isCardContainerScope(ps)) {
                    parentScope = ps;
                    break;
                }
            }
            $scope.cardHeadingText = headingText;
            let controller: CardController = this;
            $scope.expandCurrentCard = () => { return controller.expandCurrentCard(); }
            $scope.collapseCurrentCard = () => { return controller.collapseCurrentCard(); }
            $scope.toggleCurrentCard = () => { return controller.toggleCurrentCard(); }
            if (sys.isNil(parentScope)) {
                let parentController: CardParentController = new CardParentController(<ICardContainerScope>($scope.$parent.$new(true)));
                parentController.addCard($scope);
            } else
                parentScope.addCard($scope);

            this._parentScope = $scope.currentCardParent;
            this._currentCardIsExpanded = $scope.currentCardIsExpanded;
        }

        $doCheck() {
            super.$doCheck();
            if (sys.isNil(this.$scope.currentCardParent) || this.$scope.currentCardParent.$id !== this._parentScope.$id)
                this.$scope.currentCardParent = this._parentScope;
            if (this._currentCardIsExpanded !== this.$scope.currentCardIsExpanded) {
                if (this._parentScope.selectedCardIndex < 0 || this.$scope.$id !== this._parentScope.scopeIdOfCard(this._parentScope.selectedCardIndex)) {
                    if (this._currentCardIsExpanded)
                        this._currentCardIsExpanded = false;
                    else
                        this._parentScope.expandCard(this.$scope);
                } else if (this._currentCardIsExpanded)
                    this._parentScope.collapseCard(this.$scope);
                else
                    this._currentCardIsExpanded = true;
            }
        }

        /**
         * Makes the body of the current card visible.
         *
         * @memberof cardController
         */
        expandCurrentCard(): boolean { return this._parentScope.expandCard(this.$scope); }

        /**
         * Hides the body of the current card.
         *
         * @memberof cardController
         */
        collapseCurrentCard(): boolean { return this._parentScope.collapseCard(this.$scope); }

        /**
         * Toggles the visibility of the current card's body.
         *
         * @returns {boolean} true if the current card was changed to being expanded; otherwise, false if the card was changed to being collapsed.
         * @memberof cardController
         */
        toggleCurrentCard(): boolean { return this._parentScope.toggleCard(this.$scope); }
    }

    // #endregion
}
