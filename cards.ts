/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="app.ts" />

namespace cards {
    // #region CardParentController

    /**
     * Defines the {@link ng.IScope.$parent} scope of {@link cardController} objects.
     *
     * @interface ICardParentScope
     * @extends {ng.IScope}
     */
    export interface ICardContainerScope<TParent extends app.IMainControllerScope> extends app.INestedControllerScope<TParent> {
        cardNames: string[];
        selectedCardName?: string;
        selectedCardIndex?: number;
        collapseSelectedCard(): boolean;
        collapseCard(name: string): boolean;
        expandCard(name: string): boolean;
        toggleCard(name: string): boolean;
        indexOfCard(name: string): number;
        $parent: TParent;
    }

    /**
     * Manages a collection of nested collapsible cards.
     *
     * @abstract
     * @class CardParentController
     * @extends {cardController}
     */
    export class CardParentController<TParentScope extends app.IMainControllerScope, TScope extends ICardContainerScope<TParentScope>> extends app.MainControllerChild<TScope> {
        private _selectedCardName?: string;
        private _selectedCardIndex: number;
        /**
         * Creates an instance of topLevelCardController.
         * @param {ICardContainerScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ICardParentScope}.
         */
        constructor($scope: TScope) {
            super($scope);
            $scope.cardNames = [];
            $scope.selectedCardName = this._selectedCardName = undefined;
            $scope.selectedCardIndex = this._selectedCardIndex = -1;
            let controller: CardParentController<TParentScope, TScope> = this;
            $scope.collapseSelectedCard = () => { return controller.collapseSelectedCard(); }
            $scope.collapseCard = (name: string) => { return controller.collapseCard(name); }
            $scope.expandCard = (name: string) => { return controller.expandCard(name); }
            $scope.toggleCard = (name: string) => { return controller.toggleCard(name); }
            $scope.indexOfCard = (name: string) => { return controller.indexOfCard(name); }
        }

        collapseSelectedCard(): boolean {
            this.$doCheck();
            if (this._selectedCardIndex < 0)
                return false;
            let previousIndex: number = this._selectedCardIndex;
            let previousName: string | undefined = this._selectedCardName;
            this.$scope.selectedCardIndex = this._selectedCardIndex = -1;
            this.$scope.selectedCardName = this._selectedCardName = undefined;
            if (!app.isNil(previousName))
                this.onCardNameChanged(previousName);
            this.onCardIndexChanged(previousIndex);
            return true;
        }

        collapseCard(name: string): boolean {
            this.$doCheck();
            let index: number = this.indexOfCard(name);
            if (index < 0)
                return true;
            if (index !== this._selectedCardIndex)
                return false;

            name = this.$scope.cardNames[index];
            this.$scope.selectedCardIndex = this._selectedCardIndex = -1;
            this.$scope.selectedCardName = this._selectedCardName = undefined;
            this.onCardNameChanged(name);
            this.onCardIndexChanged(index);
            return true;
        }

        indexOfCard(name: string): number {
            let i: number = this.$scope.cardNames.indexOf(name);
            if (i < 0 && !app.isNilOrEmpty(name)) {
                let lc: string = name.toLowerCase();
                if (lc !== name || name.toUpperCase() !== name) {
                    while (++i < this.$scope.cardNames.length) {
                        if (this.$scope.cardNames[i].toLowerCase() === lc)
                            return i;
                    }
                    return -1;
                }
            }
            return i;
        }

        expandCard(name: string): boolean {
            this.$doCheck();
            let index: number = this.indexOfCard(name);
            if (index < 0)
                return false;
            if (index === this._selectedCardIndex)
                return true;
            let previousIndex: number = this._selectedCardIndex;
            let previousName: string | undefined = this._selectedCardName;
            this.$scope.selectedCardIndex = this._selectedCardIndex = index;
            this.$scope.selectedCardName = this._selectedCardName = name = this.$scope.cardNames[index];
            if (previousName !== name)
                this.onCardNameChanged(previousName);
            this.onCardIndexChanged(previousIndex);
            return true;
        }

        toggleCard(name: string): boolean {
            this.$doCheck();
            let index: number = this.indexOfCard(name);
            if (index < 0)
                return false;
            name = this.$scope.cardNames[index];
            if (index !== this._selectedCardIndex) {
                let previousIndex: number = this._selectedCardIndex;
                let previousName: string | undefined = this._selectedCardName;
                this.$scope.selectedCardIndex = this._selectedCardIndex = index;
                this.$scope.selectedCardName = this._selectedCardName = name;
                if (previousName !== name)
                    this.onCardNameChanged(previousName);
                this.onCardIndexChanged(previousIndex);
                return true;
            }
            this.$scope.selectedCardIndex = this._selectedCardIndex = -1;
            this.$scope.selectedCardName = this._selectedCardName = undefined;
            this.onCardNameChanged(name);
            this.onCardIndexChanged(index);
            return false;
        }

        onCardNameChanged(previousName: string | undefined) { }

        onCardIndexChanged(previousIndex: number) { }

        $doCheck() {
            if (app.isNil(this.$scope.cardNames))
                this.$scope.cardNames = [];
            let previousIndex: number = this._selectedCardIndex;
            let previousName: string | undefined = this._selectedCardName;
            if (this.$scope.selectedCardName !== previousName) {
                if (app.isNil(this.$scope.selectedCardName))
                    this.$scope.selectedCardIndex = -1;
                else {
                    let index: number = this.indexOfCard(this.$scope.selectedCardName);
                    if (index < 0) {
                        if (this.$scope.selectedCardIndex === previousIndex || this.$scope.selectedCardIndex < 0 || this.$scope.selectedCardIndex >= this.$scope.cardNames.length) {
                            this.$scope.selectedCardIndex = -1;
                            this.$scope.selectedCardName = undefined;
                        } else
                            this.$scope.selectedCardName = this.$scope.cardNames[this.$scope.selectedCardIndex];
                    } else {
                        this.$scope.selectedCardIndex = index;
                        this.$scope.selectedCardName = this.$scope.cardNames[index];
                    }
                }
            } else if (this.$scope.selectedCardIndex !== this._selectedCardIndex) {
                if (this.$scope.selectedCardIndex < 0 || this.$scope.selectedCardIndex >= this.$scope.cardNames.length) {
                    this.$scope.selectedCardIndex = -1;
                    this.$scope.selectedCardName = undefined;
                } else
                    this.$scope.selectedCardName = this.$scope.cardNames[this.$scope.selectedCardIndex];
            } else
                return;
            this._selectedCardName = this.$scope.selectedCardName;
            this._selectedCardIndex = this.$scope.selectedCardIndex;
            if (previousName !== this._selectedCardName)
                this.onCardNameChanged(previousName);
            if (previousIndex !== this._selectedCardIndex)
                this.onCardIndexChanged(previousIndex);
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
    export interface ICardScope<TParent extends ICardContainerScope<app.IMainControllerScope>> extends ICardContainerScope<app.IMainControllerScope> {
        currentCardName: string,
        currentCardNumber: number,
        cardHeadingText: string,
        cardIconUrl: CollapsibleIconUrl,
        cardActionVerb: CollapsibleActionVerb,
        currentCardIsExpanded: boolean,
        $parent: TParent,
        expandCurrentCard(): boolean,
        collapseCurrentCard(): boolean,
        toggleCurrentCard(): boolean
    }

    /**
     * The base class for collapsible cards.
     *
     * @abstract
     * @class cardController
     * @implements {ng.IController}
     */
    export abstract class CardController<TParentScope extends ICardContainerScope<app.IMainControllerScope>, TScope extends ICardScope<TParentScope>> extends CardParentController<TParentScope, TScope> {
        get currentCardName(): string { return this._name; }

        /**
         * Creates an instance of cardController to represent a new collapsible card.
         * @param {TScope extends ICardScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ICardScope}.
         * @param {string} name The name which uniquely identifies the new card.
         * @param {string} headingText The heading text for the new card.
         * @memberof cardController
         */
        constructor(protected $scope: TScope, private _name: string, headingText: string) {
            super($scope);
            $scope.currentCardName = _name;
            $scope.cardHeadingText = headingText;
            let i: number = $scope.$parent.indexOfCard(_name);
            if (i < 0) {
                $scope.currentCardNumber = $scope.$parent.cardNames.length + 1;
                $scope.$parent.cardNames.push(name);
            }
            else
                $scope.currentCardNumber = i + 1;
            let controller: CardController<TParentScope, TScope> = this;
            $scope.expandCurrentCard = () => { return controller.expandCurrentCard(); }
            $scope.collapseCurrentCard = () => { return controller.collapseCurrentCard(); }
            $scope.toggleCurrentCard = () => { return controller.toggleCurrentCard(); }
            if ($scope.$parent.selectedCardName === _name || (i < 1 && typeof ($scope.$parent.selectedCardName) === 'undefined'))
                this.expandCurrentCard();
            else
                this.collapseCurrentCard();
        }

        $doCheck() {
            if (this.$scope.$parent.selectedCardName === this._name) {
                if (!this.$scope.currentCardIsExpanded)
                    this.expandCurrentCard();
            } else if (this.$scope.currentCardIsExpanded)
                this.collapseCurrentCard();
        }

        /**
         * Makes the body of the current card visible.
         *
         * @memberof cardController
         */
        expandCurrentCard(): boolean {
            this.$scope.cardIconUrl = CollapsibleIconUrl.collapse;
            this.$scope.cardActionVerb = CollapsibleActionVerb.collapse;
            this.$scope.currentCardIsExpanded = true;
            return this.$scope.$parent.expandCard(this._name);
        }

        /**
         * Hides the body of the current card.
         *
         * @memberof cardController
         */
        collapseCurrentCard(): boolean {
            this.$scope.cardIconUrl = CollapsibleIconUrl.expand;
            this.$scope.cardActionVerb = CollapsibleActionVerb.expand;
            this.$scope.currentCardIsExpanded = false;
            return this.$scope.$parent.collapseCard(this._name);
        }

        /**
         * Toggles the visibility of the current card's body.
         *
         * @returns {boolean} true if the current card was changed to being expanded; otherwise, false if the card was changed to being collapsed.
         * @memberof cardController
         */
        toggleCurrentCard(): boolean {
            this.$scope.currentCardIsExpanded = this.$scope.$parent.toggleCard(this._name);
            return this.$scope.currentCardIsExpanded;
        }
    }

    // #endregion
}
