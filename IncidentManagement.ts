/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="commonServiceNowDefinitions.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />

namespace inicidentManagment {
    type YesNoValue = "Yes" | "No";

    interface IEmulatedProducer {
        users_impacted: number;
        productivity_impact: number;
        is_mission_related: YesNoValue;
    }

    type ImactUrgencySrc = 1 | 2 | 3;
    const ImpactUrgencyNames: string[] = ["High", "Medium", "Low"];
    type IncidentPrioritySrc = 1 | 2 | 3 | 4 | 5;
    const IncidentPriorityNames = ["Critical", "High", "Moderate", "Low", "Planning"];
    

    class SortableColumnState<TRow extends { [key: string]: any }> {
        private readonly _headingText: string;
        private _isDescending: boolean = false;
        private _isCurrent: boolean = false;
        private _imageAltText: string;
        private _buttonTooltip: string;
        private _buttonImageUrl: string;
        private _buttonClass: string;

        get propertyName(): string { return this._propertyName; }
        get headingText(): string { return this._headingText; }
        get imageAltText(): string { return this._imageAltText; }
        get buttonTooltip(): string { return this._buttonTooltip; }
        get buttonImageUrl(): string { return this._buttonImageUrl; }
        get buttonClass(): string[] { return ["btn", this._buttonClass, "p-1", "w-100"]; }

        get isDescending(): boolean { return this._isDescending; }
        set isDescending(value: boolean) {
            if (this._isDescending === (value = sys.asBoolean(value, false)))
                return;
            this._isDescending = value;
            this.updateText();
            this._onSortChangeCallback(this);
        }

        get isCurrent(): boolean { return this._isCurrent; }
        set isCurrent(value: boolean) {
            if (this._isCurrent === (value = sys.asBoolean(value, false)))
                return;
            this._isCurrent = value;
            this.updateText();
        }

        constructor(headingText: string, private readonly _propertyName: string, private readonly _onSortChangeCallback: { (col?: SortableColumnState<TRow>): void }) {
            if (typeof _propertyName !== "string" || _propertyName.trim().length == 0)
                throw new Error("Property name cannot be empty.");
            this._headingText = (typeof headingText != "string" || (headingText = headingText.trim()).length == 0) ? _propertyName.trim() : headingText;
            this.updateText();
        }

        compare(x: TRow, y: TRow): number {
            let a: any, b: any;
            let t1: string = typeof x;
            if (t1 === "object" && x !== null) {
                a = x[this._propertyName];
                t1 = typeof a;
            } else
                a = x;
            let t2: string = typeof y;
            if (t2 === "object" && y !== null) {
                b = y[this._propertyName];
                t2 = typeof b;
            } else
                b = y;
            if (t1 === "undefined")
                return (t2 === "undefined") ? 0 : -1;
            if (t2 === "undefined")
                return 1;
            if (t1 === "boolean") {
                if (t2 === "boolean")
                    return (a === b) ? 0 : ((a) ? -1 : 1);
                if (t2 === "number")
                    return ((isNaN(b) || b === 0) === a) ? 0 : ((a) ? -1 : 1);
                if (t2 === "object" && b === null)
                    return 1;
            } else if (t1 === "number") {
                if (t2 === "number")
                    return a - b;
                if (t2 === "boolean")
                    return ((isNaN(a) || a === 0) === b) ? 0 : ((b) ? 1 : -1);
                if (t2 === "object" && b === null)
                    return 1;
            } else if (t1 === "object" && a === null)
                return (t2 === "object" && b === null) ? 0 : -1;
            return (a < b) ? -1 : ((a > b) ? 1 : 0);
        }

        toggleSort(): void {
            if (this._isCurrent)
                this.isDescending = !this._isDescending;
            else
                this._onSortChangeCallback(this);
        }

        private updateText(): void {
            if (this._isDescending) {
                this._imageAltText = "Sorted by column in descending order";
                this._buttonImageUrl = "./images/open-iconic/arrow-top.svg";
            } else {
                this._imageAltText = "Sorted by column in ascending order";
                this._buttonImageUrl = "./images/open-iconic/arrow-bottom.svg";
            }
            this._buttonTooltip = (this._isCurrent == this._isDescending) ? "Sort ascending" : "Sort descending";
            this._buttonClass = (this._isCurrent) ? "btn-primary" : "btn-outline-secondary";
        }
    }

    class PriorityMatcherRule {
        private _rowClass: string;
        get order(): number { return this._order; }
        get impact_value(): ImactUrgencySrc { return this._impact; }
        get urgency_value(): ImactUrgencySrc { return this._urgency; }
        get is_mission_related_value(): boolean { return this._is_mission_related; }
        get vip_priority_value(): boolean { return this._vip_priority; }
        get incident_priority_value(): IncidentPrioritySrc { return this._incident_priority; }
        get impact_display_text(): string { return ImpactUrgencyNames[this._impact - 1]; }
        get urgency_display_text(): string { return ImpactUrgencyNames[this._urgency - 1]; }
        get is_mission_related_display_text(): YesNoValue { return (this._is_mission_related) ? "Yes" : "No"; }
        get vip_priority_display_text(): YesNoValue { return (this._is_mission_related) ? "Yes" : "No"; }
        get incident_priority_display_text(): string { return IncidentPriorityNames[this._urgency - 1]; }
        get rowClass(): string[] { return ["row", "flex-nowrap", this._rowClass]; }

        constructor(private readonly _order: number,
            private readonly _impact: ImactUrgencySrc,
            private readonly _urgency: ImactUrgencySrc,
            private readonly _is_mission_related: boolean,
            private readonly _vip_priority: boolean,
            private readonly _incident_priority: IncidentPrioritySrc) { }

        static sortRules(sortColumn: SortableColumnState<PriorityMatcherRule>, rules: PriorityMatcherRule[]): void {
            ((sortColumn.isDescending) ?
                rules.sort((x: PriorityMatcherRule, y: PriorityMatcherRule) => sortColumn.compare(y, x)) :
                rules.sort((x: PriorityMatcherRule, y: PriorityMatcherRule) => sortColumn.compare(x, y))).forEach((value: PriorityMatcherRule, index: number) => {
                value._rowClass = ((index % 2) === 0) ? "bg-white" : "bg-gray";
                rules[index] = value;
            });
        }

        static lookupPriority(impact: ImactUrgencySrc, urgency: ImactUrgencySrc, isMissionRelated: boolean, isVip: boolean): IncidentPrioritySrc {
            return PriorityMatcherRule._priorityMatcherRules.filter((value: PriorityMatcherRule) => { return impact === value._impact && urgency === value._urgency && isMissionRelated == value._is_mission_related && isVip == value._vip_priority })[0]._incident_priority;
        }

        static getRules(sortColumn: SortableColumnState<PriorityMatcherRule>): PriorityMatcherRule[] {
            let result: PriorityMatcherRule[] = PriorityMatcherRule._priorityMatcherRules.sort((x: PriorityMatcherRule, y: PriorityMatcherRule) => sortColumn.compare(x, y)).map((value: PriorityMatcherRule) => {
                return new PriorityMatcherRule(value._order, value._impact, value._urgency, value._is_mission_related, value._vip_priority, value._incident_priority);
            });
            this.sortRules(sortColumn, result);
            return result;
        }

        private static readonly _priorityMatcherRules: PriorityMatcherRule[] = [
            new PriorityMatcherRule(100, 1, 1, true, true, 1),
            new PriorityMatcherRule(200, 1, 1, false, true, 1),
            new PriorityMatcherRule(300, 1, 1, true, false, 1),
            new PriorityMatcherRule(400, 1, 2, true, true, 1),
            new PriorityMatcherRule(500, 2, 1, true, true, 1),
            new PriorityMatcherRule(600, 1, 1, false, false, 2),
            new PriorityMatcherRule(700, 1, 2, false, true, 2),
            new PriorityMatcherRule(800, 1, 2, true, false, 2),
            new PriorityMatcherRule(900, 2, 1, false, true, 2),
            new PriorityMatcherRule(1000, 2, 1, true, false, 2),
            new PriorityMatcherRule(1100, 1, 3, true, true, 2),
            new PriorityMatcherRule(1200, 2, 2, true, true, 2),
            new PriorityMatcherRule(1300, 3, 1, true, true, 2),
            new PriorityMatcherRule(1400, 1, 2, false, false, 3),
            new PriorityMatcherRule(1500, 2, 1, false, false, 3),
            new PriorityMatcherRule(1600, 1, 3, false, true, 3),
            new PriorityMatcherRule(1700, 1, 3, true, false, 3),
            new PriorityMatcherRule(1800, 2, 2, false, true, 3),
            new PriorityMatcherRule(1900, 2, 2, true, false, 3),
            new PriorityMatcherRule(2000, 3, 1, false, true, 3),
            new PriorityMatcherRule(2100, 3, 1, true, false, 3),
            new PriorityMatcherRule(2200, 2, 3, true, true, 3),
            new PriorityMatcherRule(2300, 3, 2, true, true, 3),
            new PriorityMatcherRule(2400, 1, 3, false, false, 4),
            new PriorityMatcherRule(2500, 2, 2, false, false, 4),
            new PriorityMatcherRule(2600, 3, 1, false, false, 4),
            new PriorityMatcherRule(2700, 2, 3, false, true, 4),
            new PriorityMatcherRule(2800, 2, 3, true, false, 4),
            new PriorityMatcherRule(2900, 3, 2, false, true, 4),
            new PriorityMatcherRule(3000, 3, 2, true, false, 4),
            new PriorityMatcherRule(3100, 3, 3, true, true, 4),
            new PriorityMatcherRule(3200, 2, 3, false, false, 5),
            new PriorityMatcherRule(3300, 3, 2, false, false, 5),
            new PriorityMatcherRule(3400, 3, 3, false, true, 5),
            new PriorityMatcherRule(3500, 3, 3, true, false, 5),
            new PriorityMatcherRule(3600, 3, 3, false, false, 5)
        ];
    }

    class IncidentManagmentController implements ng.IController {
        private readonly _priorityMatcherColumns: SortableColumnState<PriorityMatcherRule>[];
        private readonly _priorityMatcherRules: PriorityMatcherRule[];

        get priorityMatcherColumns(): SortableColumnState<PriorityMatcherRule>[] { return this._priorityMatcherColumns; }

        get priorityMatcherRules(): PriorityMatcherRule[] { return this._priorityMatcherRules; }

        constructor() {
            let controller: IncidentManagmentController = this;
            function onSortChangeCallback(col: SortableColumnState<PriorityMatcherRule>) {
                if (!col.isCurrent) {
                    controller._priorityMatcherColumns.forEach((value: SortableColumnState<PriorityMatcherRule>) => value.isCurrent = false);
                    col.isCurrent = true;
                }
                PriorityMatcherRule.sortRules(col, controller._priorityMatcherRules);
            }
            this._priorityMatcherColumns = [
                new SortableColumnState<PriorityMatcherRule>("Order", "order", onSortChangeCallback),
                new SortableColumnState<PriorityMatcherRule>("Impact", "impact_value", onSortChangeCallback),
                new SortableColumnState<PriorityMatcherRule>("Urgency", "urgency_value", onSortChangeCallback),
                new SortableColumnState<PriorityMatcherRule>("Is Mission Related?", "is_mission_related_value", onSortChangeCallback),
                new SortableColumnState<PriorityMatcherRule>("Is Caller VIP?", "vip_priority_value", onSortChangeCallback),
                new SortableColumnState<PriorityMatcherRule>("Priority Assignment", "incident_priority_value", onSortChangeCallback)
            ];
            this._priorityMatcherColumns[0].isCurrent = true;
            this._priorityMatcherRules = PriorityMatcherRule.getRules(this._priorityMatcherColumns[0]);
        }

        $doCheck() { }
    }

    interface ISelectionOption<TValue> { value: TValue; label: string, id?: string; }

    app.appModule.controller("incidentManagmentController", [IncidentManagmentController]);

    class DropdownSelectionState<TValue> {
        private _selectedIndex: number;
        private _selectedValue?: TValue;
        private _selectedText?: string;
        private _selectedLabel?: string;

        get options(): ISelectionOption<TValue>[] { return this._options; }

        get selectedIndex(): number { return this._selectedIndex; }
        set selectedIndex(value: number) {
            if (typeof value != "number" || isNaN(value) || value < 0 || value >= this._options.length)
                value = -1;
            if (value === this._selectedIndex)
                return;
            let option: ISelectionOption<TValue> | undefined;
            this._selectedIndex = value;
            if (value < 0) {
                this._selectedValue = undefined;
                this._selectedLabel = undefined;
                this._selectedText = undefined;
            } else {
                option = this._options[value];
                this._selectedLabel = option.label;
                this._selectedValue = option.value;
                this._selectedText = sys.asString(option.value, false, "");
            }
            if (typeof this._changeCallback === "function")
                this._changeCallback(option, value);
        }

        get selectedValue(): TValue | undefined { return this._selectedValue; }
        set selectedValue(value: TValue | undefined) {
            if (typeof value !== "undefined") {
                for (let index: number = 0; index < this._options.length; index++) {
                    if (this._options[index].value === value) {
                        this.selectedIndex = index;
                        return;
                    }
                }
            }
            this.selectedIndex = -1;
        }

        get selectedText(): string | undefined { return this._selectedText; }
        set selectedText(value: string | undefined) {
            if (typeof value === "string") {
                for (let index: number = 0; index < this._options.length; index++) {
                    if (sys.asString(this._options[index].value, false, "") === value) {
                        this.selectedIndex = index;
                        return;
                    }
                }
            }
            this.selectedIndex = -1;
        }

        get selectedLabel(): string | undefined { return this._selectedLabel; }
        set selectedLabel(value: string | undefined) {
            if (typeof value === "string") {
                for (let index: number = 0; index < this._options.length; index++) {
                    if (this._options[index].label === value) {
                        this.selectedIndex = index;
                        return;
                    }
                }
            }
            this.selectedIndex = -1;
        }

        constructor(private _options: ISelectionOption<TValue>[], private _changeCallback?: { (option?: ISelectionOption<TValue>, index?: number): void }) {
            if (typeof _options != "object" || _options === null || _options.length == 0)
                this._selectedIndex = -1;
            else {
                this._selectedIndex = 0;
                this._selectedLabel = _options[0].label;
                this._selectedValue = _options[0].value;
                this._selectedText = sys.asString(_options[0].value, false, "");
            }
        }
    }

    class ProducerEmulatorController implements ng.IController {
        private _users_impacted: DropdownSelectionState<number>;
        private _productivity_impact: DropdownSelectionState<number>;
        private _is_mission_related: DropdownSelectionState<boolean>;
        private _is_caller_vip: boolean = false;
        private _comment: string;
        private _impact: string;
        private _urgency: string;
        private _priority: string;
        private _effective_productivity_impact: number;
        private _effective_user_impact: number;
        private _showCalculations: boolean = false;

        get users_impacted(): DropdownSelectionState<number> { return this._users_impacted; }
        get productivity_impact(): DropdownSelectionState<number> { return this._productivity_impact; }
        get is_mission_related(): DropdownSelectionState<boolean> { return this._is_mission_related; }
        get is_caller_vip(): boolean { return this._is_caller_vip; }
        set is_caller_vip(value: boolean) {
            if (this._is_caller_vip === (value = value === true))
                return;
            this._is_caller_vip = value;
            this.emulateCalculation();
        }
        get impact(): string { return this._impact; }
        get urgency(): string { return this._urgency; }
        get priority(): string { return this._priority; }
        get comment(): string { return this._comment; }
        get noUserImpactSelection(): boolean { return this._users_impacted.selectedValue == 0 && this._productivity_impact.selectedValue > 0; }
        get noProductivityImpactSelection(): boolean { return this._productivity_impact.selectedValue == 0 && this._users_impacted.selectedValue > 0; }
        get noImpactSelection(): boolean { return this._productivity_impact.selectedValue == 0 && this._users_impacted.selectedValue == 0; }
        get effective_productivity_impact(): number { return this._effective_productivity_impact; }
        get effective_user_impact(): number { return this._effective_user_impact; }
        get vipOrMission(): boolean { return this._is_caller_vip || this._is_mission_related.selectedValue; }
        get vipAndMission(): boolean { return this._is_caller_vip && this._is_mission_related.selectedValue; }
        get missionAndNotVip(): boolean { return this._is_mission_related.selectedValue && !this._is_caller_vip; }
        get showCalculations(): boolean { return this._showCalculations; }
        set showCalculations(value: boolean) { this._showCalculations = value === true; }
        
        constructor() {
            let controller: ProducerEmulatorController = this;
            this._users_impacted = new DropdownSelectionState<number>(<ISelectionOption<number>[]>[
                { value: 0, label: "Unspecified / Unknown", id: "usersImpacted0" },
                { value: 1, label: "More than 100 people", id: "usersImpacted1" },
                { value: 2, label: "50 to 100 people", id: "usersImpacted2" },
                { value: 3, label: "10 to 49 people", id: "usersImpacted3" },
                { value: 4, label: "Less than 10 people", id: "usersImpacted4" }
            ], () => {
                controller.emulateCalculation();
            });
            this._productivity_impact = new DropdownSelectionState<number>(<ISelectionOption<number>[]>[
                { value: 0, label: "Unspecified / Unknown", id: "productivityImpact0" },
                { value: 1, label: "Complete work stoppage", id: "productivityImpact1" },
                { value: 2, label: "Partial work stoppage", id: "productivityImpact2" },
                { value: 3, label: "Effects execution of time-sensitive activities", id: "productivityImpact3" },
                { value: 4, label: "Currently using a work-around / alternate method to perform affected duties", id: "productivityImpact4" }
            ], () => {
                controller.emulateCalculation();
            });
            this._is_mission_related = new DropdownSelectionState<boolean>(<ISelectionOption<boolean>[]>[
                { value: true, label: "Yes", id: "isMissionRelated" },
                { value: false, label: "No", id: "isMissionRelated" }
            ], () => {
                controller.emulateCalculation();
            });
            this._is_mission_related.selectedIndex = 1;
            this.emulateCalculation();
        }

        toggleShowCalculations(): void { this._showCalculations = !this._showCalculations; }

        emulateCalculation(): void {
            let current: sn_emulation_helpers.Emulated_GlideRecord = new sn_emulation_helpers.Emulated_GlideRecord({
                u_is_mission_related: false,
                impact: 3,
                urgency: 3,
                comment: ""
            });
            ProducerEmulatorController.emulateSubmitAnIncidentBusinessRule({
                is_mission_related: <YesNoValue>this._is_mission_related.selectedText,
                productivity_impact: this._productivity_impact.selectedValue,
                users_impacted: this._users_impacted.selectedValue
            }, current, new sn_emulation_helpers.Emulated_GlideRecord({ vip: false }));
            let s: string = current.impact.toString();
            let i: ImactUrgencySrc = <ImactUrgencySrc>parseInt(s);
            this._impact = s + " - " + ImpactUrgencyNames[i - 1];
            s = current.urgency.toString();
            let u: ImactUrgencySrc = <ImactUrgencySrc>parseInt(s);
            this._urgency = s + " - " + ImpactUrgencyNames[u - 1];
            let p: IncidentPrioritySrc = PriorityMatcherRule.lookupPriority(i, u, this._is_mission_related.selectedValue, this._is_caller_vip);
            this._priority = p + " - " + IncidentPriorityNames[p - 1];
            this._comment = current.comment.toString();
            if (this._productivity_impact.selectedValue === 0) {
                if (this._users_impacted.selectedValue === 0) {
                    this._effective_productivity_impact = this._effective_user_impact = (this._is_caller_vip) ? 2 : ((this._is_mission_related.selectedValue) ? 3 : 4);
                } else {
                    this._effective_user_impact = this._users_impacted.selectedValue;
                    this._effective_productivity_impact = this._effective_user_impact;
                }
            } else {
                this._effective_productivity_impact = this._productivity_impact.selectedValue;
                if (this._users_impacted.selectedValue === 0) {
                    this._effective_user_impact = this._effective_productivity_impact;
                } else {
                    this._effective_user_impact = this._users_impacted.selectedValue;
                }
            }
        }

        static emulateSubmitAnIncidentBusinessRule(producer: IEmulatedProducer, current: sn.GlideRecord, caller: sn.GlideRecord): void {
            let users_impacted: number = (typeof producer.users_impacted === "number") ? producer.users_impacted : parseInt(producer.users_impacted);
            let isMissionRelated = current.u_is_mission_related = (producer.is_mission_related == "Yes");
            let isVip = caller.getValue('vip') == 'true';
            
            let notes: string = "User selected the following incident submission options:\n\nMission Related: " + producer.is_mission_related  + "\nUsers Affected: ";
            if (isVip)
                notes = "VIP " + notes;
            switch (users_impacted) {
                case 1:
                    notes += "More than 100 people";
                    break;
                case 2:
                    notes += "50 to 100 people";
                    break;
                case 3:
                    notes += "10 to 49 people";
                    break;
                case 4:
                    notes += "Less than 10 people";
                    break;
                default:
                    notes += "Unspecified / Unknown";
                    break;
            }
            let productivity_impact: number = (typeof producer.productivity_impact === "number") ? producer.productivity_impact : parseInt(producer.productivity_impact);
            notes += "\nEffect on productivity: "
            switch (productivity_impact) {
                case 1:
                    current.comment = notes + "Complete work stoppage";
                    break;
                case 2:
                    current.comment = notes + "Partial work stoppage";
                    break;
                case 3:
                    current.comment = notes + "Effects execution of time-sensitive activities";
                    break;
                case 4:
                    current.comment = notes + "Currently using a work-around / alternate method to perform affected duties";
                    break;
                default:
                    current.comment = notes + "Unspecified / Unknown";
                    break;
            }
            if (users_impacted < 1) {
                if (productivity_impact < 1)
                    productivity_impact = users_impacted = (caller.vip) ? 2 : ((isMissionRelated) ? 3 : 4);
                else
                    users_impacted = productivity_impact;
            } else if (productivity_impact < 1)
                productivity_impact = users_impacted;

            current.impact = Math.round(((isVip) ? ((isMissionRelated) ? (productivity_impact + users_impacted) :
                (productivity_impact + users_impacted) * 1.125) :
                (productivity_impact + users_impacted) * ((isMissionRelated) ? 1.25 : 1.375)) / (11.0 / 3.0));
            current.urgency = Math.round((productivity_impact + ((isVip) ? ((isMissionRelated) ? 1 : 2) : ((isMissionRelated) ? 3 : 4))) * 0.35);
        }

        $doCheck() { }
    }

    app.appModule.controller("producerEmulatorController", [ProducerEmulatorController]);
}
