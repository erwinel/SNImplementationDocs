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
        selectedCardName?: string;
        selectedCardIndex: number;
        collapseSelectedCard(): boolean;
        collapseCard(name: string | number): boolean;
        expandCard(name: string | number): boolean;
        toggleCard(name: string | number): boolean;
        indexOfCard(name: string): number;
        nameOfCard(index: number): string;
        addCard(name: string, card: ICardScope): number;
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
        private _cardNames: string[] = [];
        private _childCards: ICardScope[] = [];
        private _selectedCardIndex: number = -1;

        get selectedCardName(): string | undefined {
            if (this._selectedCardIndex > -1)
                return this._cardNames[this._selectedCardIndex];
        }
        set selectedCardName(name: string | undefined) { this.selectedCardIndex = (typeof (name) === "string") ? this._cardNames.indexOf(name) : -1; }

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
            $scope.selectedCardName = this.selectedCardName;
            $scope.addCard = (name: string, card: ICardScope) => { return controller.addCard(name, card); };
            $scope.collapseSelectedCard = () => { return controller.collapseSelectedCard(); }
            $scope.collapseCard = (name: string | number) => { return controller.collapseCard(name); }
            $scope.expandCard = (name: string | number) => { return controller.expandCard(name); }
            $scope.toggleCard = (name: string | number) => { return controller.toggleCard(name); }
            $scope.indexOfCard = (name: string) => { return controller.indexOfCard(name); }
            $scope.nameOfCard = (index: number) => { return controller.nameOfCard(index); }
        }

        addCard(name: string, card: ICardScope): number {
            if (sys.isNilOrWhiteSpace(name))
                throw new Error("Invalid card name.");
            if (sys.isNil(card) || !sys.isNumber(card.$id))
                throw new Error("Invalid card.");
            if (!sys.isNil(card.currentCardParent))
                throw new Error("Card \"" + name + "\" belongs to another collection");
            let index: number = this._cardNames.indexOf(name);
            if (index > -1) {
                if (this._childCards[index].$id === card.$id)
                    return;
                throw new Error("A card with the name \"" + name + "\" has already been added.");
            }
            index = this._childCards.length;
            this._cardNames.push(name);
            this._childCards.push(card);
            card.currentCardName = name;
            card.currentCardNumber = index + 1;
            card.currentCardParent = this.$scope;
            if (this._selectedCardIndex < 0) {
                this._selectedCardIndex = this.$scope.selectedCardIndex = index;
                this.$scope.selectedCardName = name;
                card.cardActionVerb = CollapsibleActionVerb.collapse;
                card.cardIconUrl = CollapsibleIconUrl.collapse;
                card.currentCardIsExpanded = true;
            } else {
                card.cardActionVerb = CollapsibleActionVerb.expand;
                card.cardIconUrl = CollapsibleIconUrl.expand;
                card.currentCardIsExpanded = false;
            }
        }

        collapseSelectedCard(): boolean { return this._selectedCardIndex > -1 && this.collapseCard(this._selectedCardIndex); }

        collapseCard(name: string | number): boolean {
            if (typeof (name) === "string") {
                if ((name = this._cardNames.indexOf(name)) !== this._selectedCardIndex)
                    return false;
            } else {
                if (typeof (name) !== "number" || isNaN(name) || name !== this._selectedCardIndex)
                    return false;
            }
            let card: ICardScope = this._childCards[name];
            this._selectedCardIndex = this.$scope.selectedCardIndex = -1;
            this.$scope.selectedCardName = undefined;
            card.cardActionVerb = CollapsibleActionVerb.expand;
            card.cardIconUrl = CollapsibleIconUrl.expand;
            card.currentCardIsExpanded = false;
            return true;
        }

        expandCard(name: string | number): boolean {
            let oldIndex: number = this._selectedCardIndex;
            let index: number;
            if (typeof (name) === "string") {
                if ((index = this._cardNames.indexOf(name)) < 0 || index == this._selectedCardIndex)
                    return false;
                this.$scope.selectedCardName = name;
            } else {
                if (typeof (name) !== "number" || isNaN(name) || name === this._selectedCardIndex || name < 0 || name >= this._childCards.length)
                    return false;
                index = name;
                this.$scope.selectedCardName = this._cardNames[index];
            }
            let card: ICardScope = this._childCards[index];
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

        toggleCard(name: string | number): boolean {
            let index: number;
            if (typeof (name) === "string") {
                if ((index = this._cardNames.indexOf(name)) < 0)
                    return false;
            } else {
                if (typeof (name) !== "number" || isNaN(name) || name < 0 || name >= this._childCards.length)
                    return false;
                index = name;
                name = this._cardNames[index];
            }
            let card: ICardScope = this._childCards[index];
            if (index == this._selectedCardIndex) {
                this._selectedCardIndex = this.$scope.selectedCardIndex = -1;
                this.$scope.selectedCardName = undefined;
                card.cardActionVerb = CollapsibleActionVerb.expand;
                card.cardIconUrl = CollapsibleIconUrl.expand;
                card.currentCardIsExpanded = false;
            } else {
                let oldIndex: number = this._selectedCardIndex;
                this._selectedCardIndex = this.$scope.selectedCardIndex = index;
                this.$scope.selectedCardName = name;
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

        indexOfCard(name: string): number { return (typeof (name) === "string") ? this._cardNames.indexOf(name) : -1; }

        nameOfCard(index: number): string {
            if (index > -1 && index < this._cardNames.length)
                return this._cardNames[index];
        }

        $doCheck() {
            if (typeof (this.$scope.selectedCardIndex) !== "number" || isNaN(this.$scope.selectedCardIndex) || this.$scope.selectedCardIndex >= this._cardNames.length || this.$scope.selectedCardIndex < -2)
                this.$scope.selectedCardIndex = -1;
            let index: number;
            if (this.$scope.selectedCardIndex === this._selectedCardIndex)
                index = this.indexOfCard(this.$scope.selectedCardName);
            else
                index = this.$scope.selectedCardIndex;

            if (index === this._selectedCardIndex) {
                if (index > -1) {
                    let card: ICardScope = this._childCards[index];
                    if (!card.currentCardIsExpanded) {
                        this._selectedCardIndex = this.$scope.selectedCardIndex = -1;
                        this.$scope.selectedCardName = undefined;
                        card.cardActionVerb = CollapsibleActionVerb.expand;
                        card.cardIconUrl = CollapsibleIconUrl.expand;
                    }   
                }
            } else if (index < 0)
                this.collapseCard(this._selectedCardIndex);
            else
                this.expandCard(index);
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
        currentCardName: string,
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

        get currentCardName(): string { return this._name; }

        /**
         * Creates an instance of cardController to represent a new collapsible card.
         * @param {TScope extends ICardScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ICardScope}.
         * @param {string} name The name which uniquely identifies the new card.
         * @param {string} headingText The heading text for the new card.
         * @memberof cardController
         */
        constructor(protected $scope: ICardScope, private _name: string, headingText: string) {
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
                parentController.addCard(_name, $scope);
            } else
                parentScope.addCard(_name, $scope);

            this._parentScope = $scope.currentCardParent;
            this._currentCardIsExpanded = $scope.currentCardIsExpanded;
        }

        $doCheck() {
            super.$doCheck();
            if (this.$scope.currentCardName !== this._name)
                this.$scope.currentCardName = this._name
            if (sys.isNil(this.$scope.currentCardParent) || this.$scope.currentCardParent.$id !== this._parentScope.$id)
                this.$scope.currentCardParent = this._parentScope;
            if (this._currentCardIsExpanded !== this.$scope.currentCardIsExpanded) {
                if (this._parentScope.selectedCardName === this._name) { // # Parent says we should be selected
                    if (this._currentCardIsExpanded)
                        this._parentScope.collapseCard(this._name);
                    else
                        this._currentCardIsExpanded = true;
                } else if (this._currentCardIsExpanded)
                    this._currentCardIsExpanded = false;
                else
                    this._parentScope.expandCard(this._name);
            }
        }

        /**
         * Makes the body of the current card visible.
         *
         * @memberof cardController
         */
        expandCurrentCard(): boolean { return this._parentScope.expandCard(this._name); }

        /**
         * Hides the body of the current card.
         *
         * @memberof cardController
         */
        collapseCurrentCard(): boolean { return this._parentScope.collapseCard(this._name); }

        /**
         * Toggles the visibility of the current card's body.
         *
         * @returns {boolean} true if the current card was changed to being expanded; otherwise, false if the card was changed to being collapsed.
         * @memberof cardController
         */
        toggleCurrentCard(): boolean { return this._parentScope.toggleCard(this._name); }
    }

    // #endregion
}
