/// <reference path="Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="sys.ts" />

namespace regexTester {
    const MAX_INPUT_ITEMS: number = 32;
    const DEFAULT_TEXTAREA_LINES: number = 6;
    const MAX_TEXTAREA_LINES: number = 24;

    const WHITESPACE_GLOBAL_REGEXP: RegExp = /[\s\r\n\p{C}]+/g;
    const NEWLINE_GLOBAL_REGEXP: RegExp = /\r\n?|\n/g;
    const LINETEXT_REGEXP: RegExp = /^([^\r\n]+)?(\r\n?|\n)/;

    function preventEventDefaultAndStopPropogation(event: BaseJQueryEventObject): void {
        if (typeof event === undefined)
            return;
        if (!event.isDefaultPrevented())
            event.preventDefault();
        if (!event.isPropagationStopped())
            event.stopPropagation();
    }

    // #region evaluation-item directive

    enum EvaluationState {
        /** Setting the state to this value causes evaluation to start. */
        pending,
        /** Item not evaluated (usually due to expression error) */
        notEvaluated,
        /** State gets set to this value when evaluation has started. */
        evaluating,
        /** Evaluation succeeded */
        success,
        /** Evaluation indicated no match */
        noMatch,
        /** Exception occurred during evaluation */
        error
    }

    interface IEvaluationResultGroup {
        length: number;
        success: boolean;
        text: string;
    }

    interface IEvaluationResultLine {
        lineNumber: number;
        length: number;
        sourceText: string;
        escapedText: string;
        trailingNewLine: string;
        isCurrentComparison: boolean;
        selectForComparison: { (event: BaseJQueryEventObject): void };
    }

    interface IEvaluationItemScope extends ng.IScope {
        evaluationItem: EvaluationItemController;
        index: number;
        outerCssClass: string[];
        state: EvaluationState;
        isCurrent: boolean;
        showReplacementTextBox: boolean;
        showReplacementTextRo: boolean;
        showReplaceButton: boolean;
        showMatchButton: boolean;
        showRowDeleteButton: boolean;
        showCurrentDeleteButton: boolean;
        canDeleteCurrent: boolean;
        inputText: string;
        replacementText: string;
        hasEvalError: boolean;
        evalErrorMessage: string;
        hasEvalErrorDetails: boolean;
        evalErrorDetailMessage: string;
        isReplaceMode: boolean;
        matchIndex: number;
        groups: IEvaluationResultGroup[];
        resultText: string;
        inputLines: IEvaluationResultLine[];
        resultLines: IEvaluationResultLine[];
        comparison: {
            leadingEqualText: string;
            differenceIndex: number;
            areEqual: boolean;
            trailingInputDifference: string;
            inputLineNumber: number;
            trailingResultDifference: string;
            resultLineNumber: number;
        }
    }

    class EvaluationItemController implements ng.IController {
        private _uriBuilder: RegexTesterController | undefined;

        // TODO: Cleanup , inputText: "", isReplaceMode: false, replacementText: ""
        constructor(public $scope: IEvaluationItemScope, private $element: JQuery, private $q: ng.IQService, private $log: ng.ILogService) {
            $scope.resultText = $scope.evalErrorMessage = $scope.evalErrorDetailMessage = "";
            $scope.hasEvalError = $scope.hasEvalErrorDetails = $scope.showReplacementTextBox = $scope.showMatchButton = $scope.showReplaceButton = $scope.showRowDeleteButton =
                $scope.showCurrentDeleteButton = false;
            $scope.showReplacementTextRo = !$scope.isCurrent;
            $scope.matchIndex = -1;
            $scope.groups = [];
            $scope.inputLines = [{ lineNumber: 1, length: 0, sourceText: "", escapedText: "", trailingNewLine: "", isCurrentComparison: true, selectForComparison: preventEventDefaultAndStopPropogation }];
            $scope.resultLines = [{ lineNumber: 1, length: 0, sourceText: "", escapedText: "", trailingNewLine: "", isCurrentComparison: true, selectForComparison: preventEventDefaultAndStopPropogation }];
            $scope.comparison = {
                leadingEqualText: "",
                differenceIndex: 0,
                areEqual: true,
                trailingInputDifference: "",
                inputLineNumber: 1,
                trailingResultDifference: "",
                resultLineNumber: 1
            };
            let uriBuilder: RegexTesterController = <RegexTesterController>$scope.uriBuilder;
            if (sys.isNil(uriBuilder) || !(uriBuilder instanceof RegexTesterController)) {
                let rootId: number = $scope.$root.$id;
                for (let parentScope: ng.IScope = $scope.$parent; sys.notNil(parentScope); parentScope = (parentScope.$id === rootId) ? undefined : parentScope.$parent) {
                    if (sys.notNil(parentScope.uriBuilder) && parentScope.uriBuilder instanceof RegexTesterController) {
                        uriBuilder = parentScope.uriBuilder;
                        break;
                    }
                }
                if (sys.isNil(uriBuilder) || !(uriBuilder instanceof RegexTesterController))
                    throw new Error("Unable to detect parent uriBuilder controller scope");
            }

            this._uriBuilder = uriBuilder;

            let evaluationItem: EvaluationItemController = this;

            $scope.$watch("state", (newValue: EvaluationState, oldValue: EvaluationState) => {
                $log.debug("Watch raised for 'EvaluationItemController.state'");
                if (newValue === EvaluationState.pending)
                    evaluationItem.startEvaluation();
            });

            $scope.$watch("inputText", () => {
                $log.debug("Watch raised for 'EvaluationItemController.inputText'");
                evaluationItem.startEvaluation();
            });

            $scope.$watch("replacementText", () => {
                $log.debug("Watch raised for 'EvaluationItemController.replacementText'");
                if (evaluationItem.$scope.isReplaceMode)
                    evaluationItem.startEvaluation();
            });

            $scope.$watch("isCurrent", () => {
                $log.debug("Watch raised for 'EvaluationItemController.isCurrent'");
                if (evaluationItem.$scope.isCurrent) {
                    evaluationItem.$scope.showReplacementTextBox = evaluationItem.$scope.showMatchButton = evaluationItem.$scope.isReplaceMode;
                    evaluationItem.$scope.showReplaceButton = !evaluationItem.$scope.showMatchButton;
                    evaluationItem.$scope.showReplacementTextRo = evaluationItem.$scope.showRowDeleteButton = false;
                    evaluationItem.$scope.showCurrentDeleteButton = evaluationItem.$scope.canDeleteCurrent;
                } else {
                    evaluationItem.$scope.showRowDeleteButton = evaluationItem.$scope.canDeleteCurrent;
                    evaluationItem.$scope.showReplaceButton = evaluationItem.$scope.showMatchButton = evaluationItem.$scope.showReplacementTextBox =
                        evaluationItem.$scope.showCurrentDeleteButton = false;
                    evaluationItem.$scope.showReplacementTextRo = evaluationItem.$scope.isReplaceMode;
                }
            });

            $scope.$watch("isReplaceMode", () => {
                $log.debug("Watch raised for 'EvaluationItemController.isReplaceMode'");
                if (evaluationItem.$scope.isReplaceMode) {
                    evaluationItem.$scope.showReplacementTextBox = evaluationItem.$scope.isReplaceMode && evaluationItem.$scope.isCurrent;
                    evaluationItem.$scope.showReplacementTextRo = !evaluationItem.$scope.showReplacementTextBox;
                } else
                    evaluationItem.$scope.showReplacementTextBox = evaluationItem.$scope.showReplacementTextRo = false;
                evaluationItem.startEvaluation();
            });

            $scope.$watch("evalErrorMessage", () => {
                $log.debug("Watch raised for 'EvaluationItemController.evalErrorMessage'");
                let value: boolean = $scope.evalErrorMessage.trim().length > 0;
                if (value !== $scope.hasEvalError)
                    $scope.hasEvalError = value;
                if (value) {
                    if ($scope.state !== EvaluationState.error)
                        $scope.state = EvaluationState.error;
                    value = $scope.evalErrorDetailMessage.trim().length > 0;
                }
                if (value !== $scope.hasEvalErrorDetails)
                    $scope.hasEvalErrorDetails = value;
                if (!value && $scope.evalErrorDetailMessage.length > 0)
                    $scope.evalErrorDetailMessage = "";
                evaluationItem.updateCssClasses();
            });

            $scope.$watch("evalErrorDetailMessage", () => {
                $log.debug("Watch raised for 'EvaluationItemController.evalErrorDetailMessage'");
                let value: boolean = $scope.hasEvalError && $scope.evalErrorDetailMessage.length > 0;
                if (value !== $scope.hasEvalErrorDetails)
                    $scope.hasEvalErrorDetails = value;
            });

            if ($scope.state === EvaluationState.pending) {
                this.updateCssClasses();
                this.startEvaluation();
            } else {
                if ($scope.state !== EvaluationState.notEvaluated)
                    $scope.state = EvaluationState.notEvaluated;
                this.updateCssClasses();
            }
        }

        private startEvaluation() {
            if (typeof this._uriBuilder === "undefined") {
                this.$scope.state = EvaluationState.notEvaluated;
                return;
            }
            let expression: RegExp | undefined = this._uriBuilder.expression;
            if (sys.isNil(expression)) {
                this.$scope.state = EvaluationState.notEvaluated;
                this.$scope.outerCssClass = ["border", "border-dark"];
                return;
            }
            this.$scope.state = EvaluationState.evaluating;

            let flags: string = this._uriBuilder.flags;
            let pattern: string = this._uriBuilder.pattern;
            let controller: EvaluationItemController = this;
            let isReplaceMode: boolean = this.$scope.isReplaceMode;
            let inputText: string = this.$scope.inputText;
            let replacementText: string = this.$scope.replacementText;
            this.$q<RegExpExecArray | string | null | undefined>((resolve: ng.IQResolveReject<RegExpExecArray | string | null | undefined>, reject: ng.IQResolveReject<any>) => {
                if (typeof controller._uriBuilder === "undefined" || controller.$scope.isReplaceMode !== isReplaceMode || controller.$scope.inputText !== inputText || controller.$scope.replacementText !== replacementText || sys.isNil(controller._uriBuilder.expression) || flags !== controller._uriBuilder.flags || pattern !== controller._uriBuilder.pattern)
                    resolve(undefined);
                else
                    try {
                        if (isReplaceMode)
                            resolve(inputText.replace(expression, replacementText));
                        else
                            resolve(expression.exec(controller.$scope.inputText));
                    } catch (reason) { reject(reason); }
            }).then((result: RegExpExecArray | string | null | undefined) => {
                if (typeof controller._uriBuilder === "undefined" || controller.$scope.isReplaceMode !== isReplaceMode || controller.$scope.inputText !== inputText || controller.$scope.replacementText !== replacementText || sys.isNil(controller._uriBuilder.expression) || flags !== controller._uriBuilder.flags || pattern !== controller._uriBuilder.pattern)
                    return;
                try { controller.$scope.evalErrorMessage = ""; } finally { controller.onEvaluationCompleted(result); }
            }, (reason: any) => {
                if (typeof controller._uriBuilder === "undefined" || controller.$scope.isReplaceMode !== isReplaceMode || controller.$scope.inputText !== inputText || controller.$scope.replacementText !== replacementText || sys.isNil(controller._uriBuilder.expression) || flags !== controller._uriBuilder.flags || pattern !== controller._uriBuilder.pattern)
                    return;
                try {
                    controller.$scope.state = EvaluationState.error;
                    if (typeof reason === "string") {
                        if ((reason = reason.trim()).length > 0) {
                            controller.$scope.evalErrorDetailMessage = "";
                            controller.$scope.evalErrorMessage = reason;
                            return;
                        }
                    } else if (typeof reason !== "undefined" && reason !== null) {
                        let message: any = (<{ [key: string]: any }>reason).message;
                        let name: any = (<{ [key: string]: any }>reason).name;
                        if (typeof message === "string" && (message = message.trim().length) > 0) {
                            let data: any = (<{ [key: string]: any }>reason).data;
                            controller.$scope.evalErrorDetailMessage = (typeof data !== "undefined" && data !== null) ? angular.toJson(data) : "";
                            controller.$scope.evalErrorMessage = (typeof name === "string" && (name = name.trim()).length > 0) ? name + ": " + message : message;
                        } else if (typeof name === "string" && (name = name.trim()).length > 0) {
                            controller.$scope.evalErrorMessage = '"' + name + '" error';
                            controller.$scope.evalErrorDetailMessage = angular.toJson(reason);
                        } else {
                            controller.$scope.evalErrorDetailMessage = "";
                            controller.$scope.evalErrorMessage = (typeof reason === "object") ? angular.toJson(reason) : reason + "";
                        }
                        return;
                    }
                    controller.$scope.evalErrorDetailMessage = "";
                    controller.$scope.evalErrorMessage = "An unspecified error has occurred.";
                } finally {

                }
            });
        }

        private onEvaluationCompleted(results: RegExpExecArray | string | null | undefined) {
            let inputText: string = this.$scope.inputText;
            let inputLength: number = inputText.length;
            if (sys.isNil(results)) {
                this.$scope.state = EvaluationState.noMatch;
                this.$scope.outerCssClass = ["border", "border-warning"];
                this.$scope.resultText = this.$scope.evalErrorMessage = "";
                this.$scope.matchIndex = -1;
                this.$scope.groups = [];
                this.$scope.inputLines = [{ lineNumber: 1, length: 0, sourceText: "", escapedText: "", trailingNewLine: "", isCurrentComparison: true, selectForComparison: preventEventDefaultAndStopPropogation }];
                this.$scope.resultLines = [{ lineNumber: 1, length: 0, sourceText: "", escapedText: "", trailingNewLine: "", isCurrentComparison: true, selectForComparison: preventEventDefaultAndStopPropogation }];
                this.$scope.comparison = {
                    leadingEqualText: "",
                    differenceIndex: 0,
                    areEqual: true,
                    trailingInputDifference: "",
                    inputLineNumber: 1,
                    trailingResultDifference: "",
                    resultLineNumber: 1
                };
                return;
            }

            if (typeof results === "string") {
                this.$scope.resultText = results;
                let resultLength: number = results.length;
                let hasChange: boolean = results !== this.$scope.inputText;
                this.$scope.groups = [];
                this.$scope.inputLines = [];
                let lineText: string = inputText;
                let m: RegExpExecArray = LINETEXT_REGEXP.exec(lineText);
                while (sys.notNil(m)) {
                    let n: string = angular.toJson(m[2]);
                    let t: string = m[1];
                    if (sys.isNil(t))
                        this.$scope.resultLines.push({ sourceText: "", escapedText: "", length: 0, lineNumber: this.$scope.inputLines.length + 1, trailingNewLine: n.substr(1, n.length - 2), isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation });
                    else {
                        t = angular.toJson(t);
                        this.$scope.resultLines.push({ sourceText: m[1], escapedText: t.substr(1, n.length - 2), length: m[1].length, lineNumber: this.$scope.resultLines.length + 1, trailingNewLine: n.substr(1, n.length - 2), isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation });
                    }
                    lineText = lineText.substr(m[0].length);
                }
                if (lineText.length > 0) {
                    let s: string = angular.toJson(lineText);
                    this.$scope.inputLines.push({ sourceText: lineText, escapedText: s.substr(1, s.length - 2), length: lineText.length, lineNumber: this.$scope.inputLines.length + 1, trailingNewLine: "", isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation });
                } else if (this.$scope.inputLines.length == 0)
                    this.$scope.inputLines.push({ sourceText: "", escapedText: "", length: 0, lineNumber: 1, trailingNewLine: "", isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation });

                if (hasChange) {
                    this.$scope.state = EvaluationState.success;
                    this.$scope.outerCssClass = ["border", "border-success"];
                    this.$scope.resultLines = [];
                    let matchIndex: number = (resultLength < inputLength) ? resultLength : inputLength;
                    for (let i: number = 0; i < matchIndex; i++) {
                        if (inputText.substr(i, 1) !== results.substr(i, 1)) {
                            matchIndex = i;
                            break;
                        }
                    }
                    this.$scope.matchIndex = matchIndex;
                    m = LINETEXT_REGEXP.exec(results);
                    while (sys.notNil(m)) {
                        let n: string = angular.toJson(m[2]);
                        let t: string = m[1];
                        if (sys.isNil(t))
                            this.$scope.resultLines.push({ sourceText: "", escapedText: "", length: 0, lineNumber: this.$scope.resultLines.length + 1, trailingNewLine: n.substr(1, n.length - 2), isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation });
                        else {
                            t = angular.toJson(t);
                            this.$scope.resultLines.push({ sourceText: m[1], escapedText: t.substr(1, n.length - 2), length: m[1].length, lineNumber: this.$scope.resultLines.length + 1, trailingNewLine: n.substr(1, n.length - 2), isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation });
                        }
                        results = results.substr(m[0].length);
                    }
                    if (results.length > 0) {
                        let s: string = angular.toJson(results);
                        this.$scope.resultLines.push({ sourceText: results, escapedText: s.substr(1, s.length - 2), length: results.length, lineNumber: this.$scope.resultLines.length + 1, trailingNewLine: "", isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation });
                    } else if (this.$scope.resultLines.length == 0)
                        this.$scope.resultLines.push({ sourceText: "", escapedText: "", length: 0, lineNumber: 1, trailingNewLine: "", isCurrentComparison: false, selectForComparison: preventEventDefaultAndStopPropogation});
                } else {
                    this.$scope.state = EvaluationState.noMatch;
                    this.$scope.outerCssClass = ["border", "border-info"];
                    this.$scope.matchIndex = inputLength;
                    this.$scope.resultLines = this.$scope.inputLines.map((value: IEvaluationResultLine) => { return { sourceText: value.sourceText, escapedText: value.escapedText, length: value.length, lineNumber: value.lineNumber, trailingNewLine: value.trailingNewLine, isCurrentComparison: value.isCurrentComparison, selectForComparison: value.selectForComparison } });
                }
                let controller: EvaluationItemController = this;
                if (this.$scope.inputLines.length > 1)
                    this.$scope.inputLines.forEach((item: IEvaluationResultLine) => {
                        item.selectForComparison = (event: BaseJQueryEventObject) => {
                            try { preventEventDefaultAndStopPropogation(event); } finally {
                                if (!item.isCurrentComparison)
                                    controller.selectComparisonLines(item.lineNumber, controller.$scope.comparison.resultLineNumber);
                            }
                        }
                    });
                if (this.$scope.resultLines.length > 1)
                    this.$scope.resultLines.forEach((item: IEvaluationResultLine) => {
                        item.selectForComparison = (event: BaseJQueryEventObject) => {
                            try { preventEventDefaultAndStopPropogation(event); } finally {
                                if (!item.isCurrentComparison)
                                    controller.selectComparisonLines(controller.$scope.comparison.inputLineNumber, item.lineNumber);
                            }
                        }
                    });
            } else {
                this.$scope.state = EvaluationState.success;
                this.$scope.outerCssClass = ["border", "border-success"];
                this.$scope.resultText = this.$scope.evalErrorMessage = "";
                this.$scope.inputLines = [{ lineNumber: 1, length: 0, sourceText: "", escapedText: "", trailingNewLine: "", isCurrentComparison: true, selectForComparison: preventEventDefaultAndStopPropogation }];
                this.$scope.resultLines = [{ lineNumber: 1, length: 0, sourceText: "", escapedText: "", trailingNewLine: "", isCurrentComparison: true, selectForComparison: preventEventDefaultAndStopPropogation }];

                throw new Error("Method not implemented.");
            }
            this.selectComparisonLines(1, 1);
            this.$scope.evalErrorMessage = "";
            this.updateCssClasses();
        }

        private updateCssClasses(): void {
            switch (this.$scope.state) {
                case EvaluationState.error:
                    this.$scope.outerCssClass = ["border", "border-danger"];
                    break;
                case EvaluationState.success:
                    this.$scope.outerCssClass = ["border", "border-success"];
                    break;
                case EvaluationState.noMatch:
                    this.$scope.outerCssClass = ["border", (this.$scope.isReplaceMode) ? "border-dark" : "border-success"];
                    break;
                default:
                    this.$scope.outerCssClass = ["border", "border-dark"];
                    break;
            }
        }

        selectComparisonLines(inputLineNumber: number, resultLineNumber: number) {
            let inputLine: IEvaluationResultLine = this.$scope.inputLines[inputLineNumber - 1];
            let resultLine: IEvaluationResultLine = this.$scope.resultLines[resultLineNumber - 1];
            this.$scope.inputLines = this.$scope.inputLines.map((item: IEvaluationResultLine) => { item.isCurrentComparison = item.lineNumber === inputLineNumber; return item; });
            this.$scope.resultLines = this.$scope.resultLines.map((item: IEvaluationResultLine) => { item.isCurrentComparison = item.lineNumber === resultLineNumber; return item; });
            if (inputLine.sourceText === resultLine.sourceText)
                this.$scope.comparison = {
                    leadingEqualText: inputLine.escapedText,
                    differenceIndex: inputLine.length,
                    areEqual: true,
                    trailingInputDifference: "",
                    inputLineNumber: inputLineNumber,
                    trailingResultDifference: "",
                    resultLineNumber: resultLineNumber
                };
            else {
                let differenceIndex: number = (inputLine.length < resultLine.length) ? inputLine.length : resultLine.length;
                for (let i: number = 0; i < differenceIndex; i++) {
                    if (inputLine.sourceText.substr(i, 1) !== resultLine.sourceText.substr(i, 1)) {
                        differenceIndex = i;
                        break;
                    }
                }
                if (differenceIndex == 0)
                    this.$scope.comparison = {
                        leadingEqualText: "",
                        differenceIndex: differenceIndex,
                        areEqual: false,
                        trailingInputDifference: inputLine.escapedText,
                        inputLineNumber: inputLineNumber,
                        trailingResultDifference: resultLine.escapedText,
                        resultLineNumber: resultLineNumber
                    };
                else {
                    let leadingEqualText: string;
                    if (differenceIndex === inputLine.length)
                        leadingEqualText = inputLine.escapedText;
                    else if (differenceIndex == resultLine.length)
                        leadingEqualText = resultLine.escapedText;
                    else {
                        leadingEqualText = angular.toJson(inputLine.sourceText.substr(0, differenceIndex));
                        leadingEqualText = leadingEqualText.substr(1, differenceIndex - 2);
                    }
                    let trailingInputDifference: string;
                    if (differenceIndex < inputLine.length) {
                        trailingInputDifference = angular.toJson(inputLine.sourceText.substr(differenceIndex));
                        trailingInputDifference = trailingInputDifference.substr(1, trailingInputDifference.length - 2);
                    } else
                        trailingInputDifference = "";
                    let trailingResultDifference: string;
                    if (differenceIndex < resultLine.length) {
                        trailingResultDifference = angular.toJson(resultLine.sourceText.substr(differenceIndex));
                        trailingResultDifference = trailingResultDifference.substr(1, trailingInputDifference.length - 2);
                    } else
                        trailingResultDifference = "";
                    this.$scope.comparison = {
                        leadingEqualText: leadingEqualText,
                        differenceIndex: differenceIndex,
                        areEqual: false,
                        trailingInputDifference: trailingInputDifference,
                        inputLineNumber: inputLineNumber,
                        trailingResultDifference: trailingResultDifference,
                        resultLineNumber: resultLineNumber
                    };
                }
            }
        }

        editCurrent(event: BaseJQueryEventObject): void {
            preventEventDefaultAndStopPropogation(event);
            if (typeof this._uriBuilder === "undefined" || this.$scope.isCurrent)
                return;
            this._uriBuilder.editInputItem(this.$scope.index);
            this._uriBuilder = undefined;
        }

        deleteCurrent(event: BaseJQueryEventObject): void {
            preventEventDefaultAndStopPropogation(event);
            if (typeof this._uriBuilder === "undefined" || !this.$scope.canDeleteCurrent)
                return;
            this._uriBuilder.deleteInputItem(this.$scope.index);
            this._uriBuilder = undefined;
        }

        setReplaceMode(replace: boolean, event: BaseJQueryEventObject) {
            preventEventDefaultAndStopPropogation(event);
            if (typeof this._uriBuilder !== "undefined" && this.$scope.isReplaceMode !== (replace = replace === true))
                this.$scope.isReplaceMode = replace;
        }

        $doCheck(): void { }

        static createDirective(): ng.IDirective {
            return {
                controller: ["$scope", "$element", "$q", "$log", EvaluationItemController],
                controllerAs: "evaluationItem",
                scope: {
                    index: '=',
                    state: '=',
                    canDeleteCurrent: '=',
                    isCurrent: '=',
                    inputText: '=',
                    replacementText: '=',
                    isReplaceMode: '='
                },
                template: '<div ng-class="outerCssClass" ng-transclude></div>',
                transclude: true
            };
        }
    }

    app.appModule.directive("evaluationItem", EvaluationItemController.createDirective);

    // #endregion

    // #region LocalStorageService

    export interface IStoredInputItem {
        inputText: string;
        replacementText: string;
        isReplaceMode: boolean;
    }

    export interface IStoredRegex {
        pattern: string;
        inputText: IStoredInputItem[];
        isGlobal: boolean;
        ignoreCase: boolean;
        multiline: boolean;
        unicode: boolean;
        sticky: boolean;
        stripWhitespace: boolean;
        isMultiLineInput: boolean;
    }

    const USER_STORAGE_KEY_PREFIX = "u_";
    const CURRENT_SESSION_STORAGE_KEY = "s";

    class localRegexStorageService {
        keys(): string[] {
            let result: string[] = [];
            for (let i: number = 0; i < localStorage.length; i++) {
                let key: string = localStorage.key(i);
                if (key.startsWith(USER_STORAGE_KEY_PREFIX))
                    result.push(key.substr(USER_STORAGE_KEY_PREFIX.length));
            }
            return result;
        }
        length(): number { return localStorage.length; }

        loadLastSession(controller: RegexTesterController): boolean { return this._load(CURRENT_SESSION_STORAGE_KEY, controller); }

        load(key: string, controller: RegexTesterController): boolean { return this._load(USER_STORAGE_KEY_PREFIX + key, controller); }

        private _load(key: string, controller: RegexTesterController): boolean {
            try {
                let json: string = localStorage.getItem(key);
                if (!sys.isNilOrWhiteSpace(json)) {
                    let data: IStoredRegex = <IStoredRegex>(JSON.parse(json));
                    if (data.isMultiLineInput) {
                        controller.mode = EditMode.multiLine;
                        controller.$scope.multiLinePattern = data.pattern;
                    } else {
                        controller.mode = EditMode.singleLine;
                        controller.$scope.singleLinePattern = data.pattern;
                    }
                    controller.$scope.stripWhitespace = data.stripWhitespace;
                    controller.$scope.globalOption = data.isGlobal;
                    controller.$scope.ignoreCaseOption = data.ignoreCase;
                    controller.$scope.multiLineOption = data.multiline;
                    controller.$scope.unicodeOption = data.unicode;
                    controller.$scope.stickyOption = data.sticky;

                    let count: number = data.inputText.length;
                    while (controller.$scope.inputItems.length < count)
                        controller.addInputItem(undefined);
                    while (controller.$scope.inputItems.length > count)
                        controller.deleteInputItem(count);
                    for (let i: number = 0; i < count; i++) {
                        controller.$scope.inputItems[i].inputText = data.inputText[i].inputText;
                        controller.$scope.inputItems[i].isReplaceMode = data.inputText[i].isReplaceMode;
                        controller.$scope.inputItems[i].replacementText = data.inputText[i].replacementText;
                    }
                }
            } catch { }
            return false;
        }

        save(key: string, controller: RegexTesterController): void { this._save(USER_STORAGE_KEY_PREFIX + key, controller); }

        saveCurrentSession(controller: RegexTesterController): void { this._save(CURRENT_SESSION_STORAGE_KEY, controller); }

        private _save(key: string, controller: RegexTesterController): void {
            localStorage.setItem(key, JSON.stringify({
                pattern: (controller.isMultiLineInput) ? controller.$scope.multiLinePattern : controller.$scope.singleLinePattern,
                inputText: controller.$scope.inputItems.map((i: IEvaluationItem) => <IStoredInputItem>{ inputText: i.inputText, isReplaceMode: i.isReplaceMode, replacementText: i.replacementText }),
                isGlobal: controller.$scope.globalOption,
                ignoreCase: controller.$scope.ignoreCaseOption,
                multiline: controller.$scope.multiLineOption,
                unicode: controller.$scope.unicodeOption,
                sticky: controller.$scope.stickyOption,
                stripWhitespace: controller.$scope.stripWhitespace
            }));
        }

        private _remove(key: string): void { localStorage.removeItem(key); }

        remove(key: string): void { this._remove(USER_STORAGE_KEY_PREFIX + key); }

        clear(): void {
            let json: string = localStorage.getItem(CURRENT_SESSION_STORAGE_KEY);
            localStorage.clear();
            if (!sys.isNilOrWhiteSpace(json))
                localStorage.setItem(CURRENT_SESSION_STORAGE_KEY, json);
        }

        resetAll(): void { localStorage.clear(); }
    }

    app.appModule.factory("localRegexStorage", localRegexStorageService);

    // #endregion

    // #region uriBuilder controller

    interface IEvaluationItem {
        state: EvaluationState;
        canDeleteCurrent: boolean;
        isCurrent: boolean;
        inputText: string;
        replacementText: string;
        isReplaceMode: boolean;
    }

    enum EditMode {
        singleLine,
        multiLine,
        item
    }

    interface IRegexTesterScope extends ng.IScope {
        regexTester: RegexTesterController;
        inputItems: IEvaluationItem[];
        singleLinePattern: string;
        multiLinePattern: string;
        flags: string;
        ignoreCaseOption: boolean;
        globalOption: boolean;
        multiLineOption: boolean;
        unicodeOption: boolean;
        stickyOption: boolean;
        stripWhitespace: boolean;
        hasParseError: boolean;
        parseErrorMessage: string;
        hasParseErrorDetail: boolean;
        parseErrorDetail: string;
        patternDisplayText: string;
        canAddInputItem: boolean;
        patternLineCount: number;
        showPatternEditControl: boolean;
        showSingleLineEditControl: boolean;
        showMultiLineEditControl: boolean;
        canAddPatternEditLine: boolean;
        canRemovePatternEditLine: boolean;
        showInputItemHeading: boolean;
    }

    class RegexTesterController implements ng.IController {
        private _expression: RegExp | undefined;
        private _pattern: string;
        private _flags: string;
        private _isMultiLineInput: boolean;
        private _mode: EditMode = EditMode.singleLine;
        private _parseError: any | undefined;

        get expression(): RegExp | undefined { return this._expression; }
        get pattern(): string { return this._pattern; }
        get flags(): string { return this._flags; }

        get parseError(): any | undefined { return this._parseError; }
        set parseError(value: any | undefined) {
            let message: string | undefined, details: any | undefined;
            if (sys.isNil(value)) {
                if (this.$scope.hasParseError !== false)
                    this.$scope.hasParseError = false;
                if (this.$scope.hasParseErrorDetail !== false)
                    this.$scope.hasParseErrorDetail = false;
                details = message = "";
            } else {
                if (typeof value === "string")
                    message = value;
                else {
                    let m: any = (<{ [index: string]: any }>value).message;
                    let name: any = (<{ [index: string]: any }>value).name;
                    if (typeof m === "string" && (m = m.trim()).length > 0) {
                        message = m;
                        details = (<{ [index: string]: any }>value).data;
                        m = (<{ [index: string]: any }>value).name;
                        if (typeof m === "string" && (m = m.trim()).length > 0)
                            name = m;
                    } else if (typeof (m = (<{ [index: string]: any }>value).name) === "string" && (m = m.trim()).length > 0)
                        name = m;
                    if (typeof message !== "string") {
                        if (typeof name === "string") {
                            details = value;
                            message = name;
                        } else
                            message = angular.toJson(value);
                    } else if (typeof name === "string")
                        message = name + ": " + name;
                }
                if (sys.isNil(details))
                    details = "";
                else if (typeof details !== "string")
                    details = angular.toJson(details);
                else
                    details = details.trim();
                if (sys.isNil(message) || (message = message.trim()).length == 0)
                    message = "An unspecified error has occurred.";
                if (details.length === 0) {
                    if (this.$scope.hasParseErrorDetail !== true)
                        this.$scope.hasParseErrorDetail = true;
                } else if (this.$scope.hasParseErrorDetail !== false)
                    this.$scope.hasParseErrorDetail = false;
                if (this.$scope.hasParseError !== true)
                    this.$scope.hasParseError = true;
            }
            if (this.$scope.parseErrorMessage !== message)
                this.$scope.parseErrorMessage = message;
            if (this.$scope.parseErrorDetail !== details)
                this.$scope.parseErrorDetail = details;
        }

        get mode(): EditMode { return this._mode; }
        set mode(value: EditMode) {
            if (value === this._mode)
                return;
            this._mode = value;
            switch (value) {
                case EditMode.singleLine:
                    this.isMultiLineInput = false;
                    this.$scope.showPatternEditControl = this.$scope.showSingleLineEditControl = true;
                    this.$scope.showMultiLineEditControl = false;
                    break;
                case EditMode.multiLine:
                    this.isMultiLineInput = true;
                    this.$scope.showPatternEditControl = this.$scope.showMultiLineEditControl = true;
                    this.$scope.showSingleLineEditControl = false;
                    break;
                default:
                    this.$scope.showPatternEditControl = this.$scope.showSingleLineEditControl = this.$scope.showMultiLineEditControl = false;
                    this.$scope.showInputItemHeading = this.$scope.inputItems.length > 1;
                    return;
            }
            
            this.$scope.showInputItemHeading = true;
            if (sys.notNil(sys.first(this.$scope.inputItems, (value: IEvaluationItem) => value.isCurrent)))
                this.$scope.inputItems = this.$scope.inputItems.map((value: IEvaluationItem) => { value.isCurrent = false; return value; });
        }

        get isMultiLineInput(): boolean { return this._isMultiLineInput; }
        set isMultiLineInput(value: boolean) {
            if ((value = value === true) === this._isMultiLineInput)
                return;
            this._isMultiLineInput = value;
            let pattern: string;
            if (value) {
                if (this._mode === EditMode.multiLine)
                    this.mode = EditMode.singleLine;
                if (this.$scope.multiLinePattern !== (pattern = this.$scope.singleLinePattern))
                    this.$scope.multiLinePattern = pattern;
            } else {
                if (this._mode === EditMode.singleLine)
                    this.mode = EditMode.multiLine;
                if (this.$scope.singleLinePattern !== (pattern = this.$scope.multiLinePattern.replace((this.$scope.stripWhitespace) ? NEWLINE_GLOBAL_REGEXP : WHITESPACE_GLOBAL_REGEXP, "")))
                    this.$scope.singleLinePattern = pattern;
            }
        }

        constructor(public $scope: IRegexTesterScope, private $q: ng.IQService, private $log: ng.ILogService, private localRegexStorage: localRegexStorageService) {
            $scope.regexTester = this;
            $scope.ignoreCaseOption = $scope.globalOption = $scope.multiLineOption = $scope.unicodeOption = $scope.stickyOption = $scope.stripWhitespace = $scope.hasParseError = $scope.hasParseErrorDetail =
                $scope.canRemovePatternEditLine = this._isMultiLineInput = false;
            $scope.canAddInputItem = $scope.canAddPatternEditLine = $scope.showInputItemHeading = true;
            $scope.patternLineCount = DEFAULT_TEXTAREA_LINES;
            $scope.singleLinePattern = $scope.multiLinePattern = $scope.parseErrorMessage = $scope.parseErrorDetail = $scope.flags = $scope.patternDisplayText = this._pattern = this._flags = "";
            localRegexStorage.loadLastSession(this);
            $scope.$watch("singleLinePattern", () => { $scope.regexTester.onSingleLinePatternChanged(); });
            $scope.$watch("multiLinePattern", () => { $scope.regexTester.onMultiLinePatternChanged(); });
            $scope.$watchGroup(["ignoreCaseOption", "globalOption", "multiLineOption", "unicodeOption", "stickyOption"], () => { $scope.regexTester.onFlagValuesChanged(); });
            $scope.$watch("stripWhitespace", () => { $scope.regexTester.onStripWhitespaceChanged(); });
            if (sys.isNil($scope.inputItems) || $scope.inputItems.length == 0) {
                this.addInputItem(undefined);
                this.mode = EditMode.singleLine;
            } else
                this.startParseRegex();
        }

        saveCurrentSession() { this.localRegexStorage.saveCurrentSession(this); }

        private onSingleLinePatternChanged(): void {
            this.$log.debug("Watch raised for 'singleLinePattern'");
            if (this._isMultiLineInput)
                return;
            let pattern: string = (this.$scope.stripWhitespace) ? this.$scope.singleLinePattern.replace(WHITESPACE_GLOBAL_REGEXP, "") : this.$scope.singleLinePattern;
            if (pattern === this._pattern)
                return;
            this._pattern = pattern;
            this.saveCurrentSession();
            this.startParseRegex();
        }

        private onMultiLinePatternChanged(): void {
            this.$log.debug("Watch raised for 'multiLinePattern'");
            if (!this._isMultiLineInput)
                return;
            let pattern: string = this.$scope.multiLinePattern.replace(WHITESPACE_GLOBAL_REGEXP, "");
            if (pattern === this._pattern)
                return;
            this._pattern = pattern;
            this.startParseRegex();
        }

        private onFlagValuesChanged(): void {
            this.$log.debug("Watch raised for flag value");
            let flags: string = (this.$scope.ignoreCaseOption) ? "i" : "";
            if (this.$scope.globalOption)
                flags += "g";
            if (this.$scope.multiLineOption)
                flags += "m";
            if (this.$scope.unicodeOption)
                flags += "u";
            if (this.$scope.stickyOption)
                flags += "s";
            if (this._flags === flags)
                return;
            this._flags = this.$scope.flags = flags;
            this.startParseRegex();
        }

        private onStripWhitespaceChanged(): void {
            this.$log.debug("Watch raised for 'stripWhitespace'");
            if (this.$scope.stripWhitespace === true)
                return;

            if (this._isMultiLineInput)
                this.isMultiLineInput = false;
            else {
                let singleLinePattern: string = this.$scope.singleLinePattern.replace(WHITESPACE_GLOBAL_REGEXP, "");
                if (this.$scope.singleLinePattern !== singleLinePattern)
                    this.$scope.singleLinePattern = singleLinePattern;
            }
        }

        private startParseRegex(): void {
            let flags: string = this._flags;
            let pattern: string = this._pattern;
            let controller: RegexTesterController = this;
            this.$q<RegExp | undefined>((resolve: ng.IQResolveReject<RegExp | undefined>, reject: ng.IQResolveReject<any>) => {
                if (flags !== controller._flags || pattern !== controller._pattern)
                    resolve(undefined);
                let re: RegExp;
                try {
                    re = (flags.length == 0) ? new RegExp(pattern) : new RegExp(pattern, flags);
                } catch (reason) {
                    reject(reason);
                    return;
                }
                if (sys.isNil(re))
                    reject("Failed to parse expression.");
                resolve(re);
            }).then((re: RegExp | undefined) => {
                if (typeof re === "undefined" || flags !== controller._flags || pattern !== controller._pattern)
                    return;
                try { controller.parseError = undefined; } finally {
                    controller._expression = re;
                    controller.onExpressionChanged();
                }
            }, (reason: any) => {
                if (flags !== controller._flags || pattern !== controller._pattern)
                    return;
                try { controller.parseError = (sys.isNil(reason)) ? "" : reason; }
                finally {
                    controller._expression = undefined;
                    controller.onExpressionChanged();
                }
            });
        }

        private onExpressionChanged(): void {
            if (sys.isNil(this._expression)) {
                try {
                    let arr: string[] = this._pattern.split("\\\\").map((value: string) => value.split("\\/").map((value: string) => value.replace("/", "\\/")).join("\\/"));
                    let patternDisplayText: string = "/" + arr.join("\\\\") + ((arr[arr.length - 1].endsWith("\\")) ? "\\/" : "/") + this._flags;
                    if (this.$scope.patternDisplayText !== patternDisplayText)
                        this.$scope.patternDisplayText = patternDisplayText;
                } finally { this.$scope.inputItems.forEach((value: IEvaluationItem) => { value.state = EvaluationState.notEvaluated; }); }
            }
            else
                try { this.$scope.patternDisplayText = this._expression.toString(); } finally { this.$scope.inputItems.forEach((value: IEvaluationItem) => { value.state = EvaluationState.pending; }); }
        }

        addInputItem(event: BaseJQueryEventObject): void {
            try { preventEventDefaultAndStopPropogation(event); }
            finally {
                let index = this.$scope.inputItems.length;
                if (index < MAX_INPUT_ITEMS) {
                    if (sys.isNil(this.$scope.inputItems) || this.$scope.inputItems.length == 0)
                        this.$scope.inputItems = [{ state: (typeof this._expression === "undefined") ? EvaluationState.notEvaluated : EvaluationState.pending, canDeleteCurrent: false, isCurrent: false, inputText: "", isReplaceMode: false, replacementText: "" }];
                    else {
                        this.$scope.inputItems = this.$scope.inputItems.concat([{ state: (typeof this._expression === "undefined") ? EvaluationState.notEvaluated : EvaluationState.pending, canDeleteCurrent: true, isCurrent: false, inputText: "", isReplaceMode: false, replacementText: "" }]);
                        if (this.$scope.inputItems.length == 2)
                            this.$scope.inputItems[0].canDeleteCurrent = true;
                        this.$scope.canAddInputItem = this.$scope.inputItems.length < MAX_INPUT_ITEMS;
                    }
                }
                this.editInputItem(index);
            }
        }

        editInputItem(index: number) {
            let item: IEvaluationItem = this.$scope.inputItems[index];
            if (item.isCurrent)
                return;
            this.$scope.inputItems = this.$scope.inputItems.map((value: IEvaluationItem, i: number) => {
                if (index == i) {
                    this.mode = EditMode.item;
                    value.isCurrent = true;
                } else
                    value.isCurrent = false;
                return value;
            })
        }

        deleteInputItem(index: number): void {
            if (this.$scope.inputItems.length < 2)
                return;
            let oldItem: IEvaluationItem = this.$scope.inputItems[index];
            this.$scope.inputItems = this.$scope.inputItems.filter((value: IEvaluationItem, i: number) => i !== index);
            if (oldItem.isCurrent) {
                let items: IEvaluationItem[] = this.$scope.inputItems.filter((value: IEvaluationItem) => value.isCurrent);
                if (items.length == 0)
                    this.$scope.inputItems[(index < this.$scope.inputItems.length) ? index : this.$scope.inputItems.length - 1].isCurrent = true;
            }
            this.$scope.showInputItemHeading = this._mode !== EditMode.item || this.$scope.inputItems.length > 1;
        }

        setInputRowCount(isIncrement: boolean, event: BaseJQueryEventObject): void {
            try { preventEventDefaultAndStopPropogation(event); }
            finally {
                if (isIncrement) {
                    if (this.$scope.patternLineCount < MAX_TEXTAREA_LINES)
                        this.$scope.patternLineCount++;
                } else if (this.$scope.patternLineCount > 1)
                    this.$scope.patternLineCount--;
            }
        }

        optionsModal(show: boolean, event: BaseJQueryEventObject): void {
            try { preventEventDefaultAndStopPropogation(event); }
            finally { $("#optionsModal").modal({ show: show }); }
        }

        $doCheck() { }
    }

    app.appModule.controller("regexTester", ["$scope", "$q", "$log", "localRegexStorage", RegexTesterController]);

    // #endregion
}
