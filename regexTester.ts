/// <reference path="Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="sys.ts" />

namespace regexTester {
    // #region regexParsingService

    // #region regex patterns

    const RegexPatternParseRe: RegExp = /([.^$|)])|(\[(\^)?)|(?:{(\d+)(,\d+)?}(\?)?)|([?*+]\??)|(\((?:\?(?:([:#=!])|(<([^[^$.|?*+()<>']+)>)|('([^[^$.|?*+()<>']+)')))?)|(?:\\(?:u([a-f\d]{4})|x([a-f\d]{2})|(0(?:(?:[123][0-7]?|[4-7])[0-7]?)?|[1-3](?:[0-7]{1,2}|[89])?|[4-9]\d?)|(.)))/i;

    enum RegexPatternParseGroups {
        all = 0,
        special = 1,
        charClass = 2,
        negateCharClass = 3,
        minRepeat = 4,
        maxRepeat = 5,
        minMaxLazy = 6,
        quantifier = 7,
        openGroup = 8,
        groupType = 9,
        groupNameA = 10,
        groupNameS = 11,
        unicode = 12,
        hex = 13,
        escNumber = 14,
        escLiteral = 15
    }

    const regexCharsParseRe: RegExp = /(\])|(-(?!]))|(?:\\(?:u([a-f\d]{4})|x([a-f\d]{2})|(0(?:(?:[123][0-7]?|[4-7])[0-7]?)?|[1-3](?:[0-7]{1,2}|[89])?|[4-9]\d?)|(.)))/i;

    enum RegexCharsParseGroups {
        all = 0,
        end = 1,
        range = 2,
        unicode = 3,
        hex = 4,
        escNumber = 5,
        escLiteral = 6
    }

    const parseRegexCommentRe: RegExp = /(\))|(?:\\(?:u([a-f\d]{4})|x([a-f\d]{2})|(0(?:(?:[123][0-7]?|[4-7])[0-7]?)?|[1-3](?:[0-7]{1,2}|[89])?|[4-9]\d?)|(.)))/;

    enum RegexCommentParseGroups {
        all = 0,
        endGroup = 1,
        unicode = 2,
        hex = 3,
        escNumber = 4,
        escLiteral = 5
    }

    // #endregion

    // #region RegexToken Classes

    enum RegexTokenType { literal, group, charClass, anyChar, startAnchor, endAnchor, alternation, range, escape, quantifier, comment, error };

    abstract class RegexToken {
        get type(): RegexTokenType { return this._type; }
        constructor(private _type: RegexTokenType) { }
    }

    class ErrorRegexToken extends RegexToken {
        get text(): string { return this._text; }
        constructor(private _text: string) { super(RegexTokenType.error); }
    }

    abstract class QuantifierRegexToken extends RegexToken {
        get isLazy(): boolean { return this._isLazy; }
        constructor(private _isLazy: boolean) { super(RegexTokenType.quantifier); }
    }

    class SimpleQuantifierRegexToken extends QuantifierRegexToken {
        get oneOrMore(): boolean { return this._oneOrMore; }
        constructor(private _oneOrMore: boolean, isLazy: boolean) { super(isLazy); }
    }

    abstract class LimitedQuantifierRegexToken extends QuantifierRegexToken {
        get min(): string { return this._min; }
        constructor(isLazy: boolean, private _min: string) { super(isLazy); }
    }

    class FixedQuantifierRegexToken extends LimitedQuantifierRegexToken {
        constructor(isLazy: boolean, min: string) { super(isLazy, min); }
    }

    class BoundedQuantifierRegexToken extends LimitedQuantifierRegexToken {
        get max(): string | undefined { return this._max; }
        constructor(isLazy: boolean, min: string, private _max?: string) { super(isLazy, min); }
    }

    class SpecialCharRegexToken extends RegexToken {
        constructor(type: RegexTokenType.anyChar | RegexTokenType.endAnchor | RegexTokenType.startAnchor | RegexTokenType.alternation | RegexTokenType.range) { super(type); }
    }

    abstract class GroupRegexToken extends RegexToken {
        private _subExpressions: RegexToken[] = [];

        get modifier(): string | undefined { return this._modifier; }

        get subExpressions(): ReadonlyArray<RegexToken> { return this._subExpressions; }

        constructor(private _modifier?: "=" | "!" | ":" | "<" | "'" | "#") { super(RegexTokenType.group); }

        static parse(pattern: string): RegexToken[] {
            let root: NormalGroupRegexToken = new NormalGroupRegexToken();
            pattern = GroupRegexToken.parseSubExpressions(pattern, root);
            if (pattern.length > 0)
                root._subExpressions.push(new ErrorRegexToken(pattern));
            return root._subExpressions;
        }

        private static parseSubExpressions(pattern: string, group: GroupRegexToken): string {
            if (sys.isNilOrEmpty(pattern))
                return pattern;
            let match: RegExpExecArray = RegexPatternParseRe.exec(pattern);
            while (!sys.isNilOrEmpty(match)) {
                if (match.index > 0)
                    group._subExpressions.push(new LiteralCharactersRegexToken(pattern.substr(0, match.index)));
                pattern = pattern.substr(match.index + match[0].length);
                if (typeof match[RegexPatternParseGroups.special] === "string") {
                    if (match[RegexPatternParseGroups.special] === ")")
                        return pattern;
                    group._subExpressions.push(new SpecialCharRegexToken((match[RegexPatternParseGroups.special] === "^") ? RegexTokenType.startAnchor : ((match[RegexPatternParseGroups.special] === "$") ? RegexTokenType.endAnchor :
                        ((match[RegexPatternParseGroups.special] === "|") ? RegexTokenType.alternation : RegexTokenType.anyChar))));
                } else if (typeof match[RegexPatternParseGroups.charClass] === "string") {
                    let subExpressions: RegexToken[] = [];
                    pattern = GroupRegexToken.parseCharClass(pattern, subExpressions);
                    group._subExpressions.push(new CharacterClassRegexToken(typeof match[RegexPatternParseGroups.negateCharClass] === "string", subExpressions));
                } else if (typeof match[RegexPatternParseGroups.minRepeat] === "string") {
                    if (typeof match[RegexPatternParseGroups.maxRepeat] !== "string")
                        group._subExpressions.push(new FixedQuantifierRegexToken(typeof match[RegexPatternParseGroups.minMaxLazy] === "string", match[RegexPatternParseGroups.minRepeat]));
                    else if (match[RegexPatternParseGroups.maxRepeat].length == 1)
                        group._subExpressions.push(new BoundedQuantifierRegexToken(typeof match[RegexPatternParseGroups.minMaxLazy] === "string", match[RegexPatternParseGroups.minRepeat]));
                    else
                        group._subExpressions.push(new BoundedQuantifierRegexToken(typeof match[RegexPatternParseGroups.minMaxLazy] === "string", match[RegexPatternParseGroups.minRepeat], match[RegexPatternParseGroups.maxRepeat].substr(1)));
                }
                else if (typeof match[RegexPatternParseGroups.quantifier] === "string")
                    group._subExpressions.push(new SimpleQuantifierRegexToken(match[RegexPatternParseGroups.quantifier].startsWith("+"), match[RegexPatternParseGroups.quantifier].length > 1));
                else if (typeof match[RegexPatternParseGroups.openGroup] === "string") {
                    let groupType: string | null | undefined = match[RegexPatternParseGroups.groupType];
                    if (groupType === "#") {
                        let comment: CommentGroupRegextToken = new CommentGroupRegextToken();
                        group._subExpressions.push(comment);
                        pattern = GroupRegexToken.parseCommentGroup(pattern, comment);
                    } else {
                        let subGroup: GroupRegexToken;
                        if (typeof match[RegexPatternParseGroups.groupNameA] === "string")
                            subGroup = new NamedGroupRegexToken(match[RegexPatternParseGroups.groupNameA], "<");
                        else if (typeof match[RegexPatternParseGroups.groupNameS] === "string")
                            subGroup = new NamedGroupRegexToken(match[RegexPatternParseGroups.groupNameA], "'");
                        else if (typeof groupType === "string") {
                            if (groupType === "=" || groupType === "!")
                                subGroup = new LookAheadGroupRegexToken(groupType);
                            else
                                subGroup = new NonCapturingGroupRegexToken();
                        } else
                            subGroup = new NormalGroupRegexToken();
                        group._subExpressions.push(subGroup);
                        pattern = GroupRegexToken.parseSubExpressions(pattern, subGroup);
                    }
                } else if (typeof match[RegexPatternParseGroups.unicode] === "string")
                    group._subExpressions.push(new EscapedValueRegexToken(match[RegexPatternParseGroups.unicode], "u"));
                else if (typeof match[RegexPatternParseGroups.hex] === "string")
                    group._subExpressions.push(new EscapedValueRegexToken(match[RegexPatternParseGroups.hex], "x"));
                else if (typeof match[RegexPatternParseGroups.escNumber] === "string")
                    group._subExpressions.push(new EscapedValueRegexToken(match[RegexPatternParseGroups.escNumber]));
                else if (typeof match[RegexPatternParseGroups.escLiteral] === "string")
                    group._subExpressions.push(new EscapedCharacterRegexToken(match[RegexPatternParseGroups.escLiteral]));
                if (pattern.length == 0)
                    return pattern;
                match = RegexPatternParseRe.exec(pattern);
            }

            group._subExpressions.push(new LiteralCharactersRegexToken(pattern));
            return "";
        }

        private static parseCharClass(pattern: string, subExpressions: RegexToken[]): string {
            if (sys.isNilOrEmpty(pattern))
                return pattern;
            let match: RegExpExecArray = regexCharsParseRe.exec(pattern);
            while (!sys.isNilOrEmpty(match)) {
                if (match.index > 0)
                    subExpressions.push(new LiteralCharactersRegexToken(pattern.substr(0, match.index)));
                pattern = pattern.substr(match.index + match[0].length);
                if (typeof match[RegexCharsParseGroups.end] === "string")
                    break;
                if (typeof match[RegexCharsParseGroups.range] === "string")
                    subExpressions.push(new SpecialCharRegexToken(RegexTokenType.range));
                else if (typeof match[RegexCharsParseGroups.hex] === "string")
                    subExpressions.push(new EscapedValueRegexToken(match[RegexCharsParseGroups.hex], "x"));
                else if (typeof match[RegexCharsParseGroups.escNumber] === "string")
                    subExpressions.push(new EscapedValueRegexToken(match[RegexCharsParseGroups.escNumber]));
                else if (typeof match[RegexCharsParseGroups.escLiteral] === "string")
                    subExpressions.push(new EscapedCharacterRegexToken(match[RegexCharsParseGroups.escLiteral]));
                if (pattern.length == 0)
                    break;
                match = regexCharsParseRe.exec(pattern);
            }
            return pattern;
        }

        private static parseCommentGroup(pattern: string, comment: CommentGroupRegextToken): string {
            if (sys.isNilOrEmpty(pattern))
                return pattern;
            let match: RegExpExecArray = parseRegexCommentRe.exec(pattern);
            while (!sys.isNilOrEmpty(match)) {
                if (match.index > 0)
                    comment._subExpressions.push(new LiteralCharactersRegexToken(pattern.substr(0, match.index)));
                pattern = pattern.substr(match.index + match[0].length);
                if (typeof match[RegexCommentParseGroups.endGroup] === "string")
                    break;
                if (typeof match[RegexCommentParseGroups.hex] === "string")
                    comment._subExpressions.push(new EscapedValueRegexToken(match[RegexCommentParseGroups.hex], "x"));
                else if (typeof match[RegexCommentParseGroups.escNumber] === "string")
                    comment._subExpressions.push(new EscapedValueRegexToken(match[RegexCommentParseGroups.escNumber]));
                else if (typeof match[RegexCommentParseGroups.escLiteral] === "string")
                    comment._subExpressions.push(new EscapedCharacterRegexToken(match[RegexCommentParseGroups.escLiteral]));
                if (pattern.length == 0)
                    break;
                match = parseRegexCommentRe.exec(pattern);
            }
            return pattern;
        }
    }

    class CommentGroupRegextToken extends GroupRegexToken { constructor() { super("#"); } }

    class NonCapturingGroupRegexToken extends GroupRegexToken { constructor() { super(":"); } }

    class LookAheadGroupRegexToken extends GroupRegexToken { constructor(modifier: "=" | "!") { super(modifier); } }

    abstract class CapturingGroupRegexToken extends GroupRegexToken { constructor(modifier?: "<" | "'") { super(modifier); } }

    class NormalGroupRegexToken extends CapturingGroupRegexToken { constructor() { super(); } }

    class NamedGroupRegexToken extends CapturingGroupRegexToken {
        get name(): string { return this._name; }
        constructor(private _name: string, modifier: "<" | "'") { super(modifier); }
    }

    abstract class EscapedRegexToken extends RegexToken {
        get text(): string { return this._text; }
        constructor(private _text: string) { super(RegexTokenType.escape); }
    }

    class EscapedCharacterRegexToken extends EscapedRegexToken { constructor(char: string) { super(char); } }

    class EscapedValueRegexToken extends EscapedRegexToken {
        get prefix(): string | undefined { return this._prefix; }

        constructor(text: string, private _prefix?: "x" | "u") { super(text); }
    }

    class LiteralCharactersRegexToken extends RegexToken {
        get text(): string { return this._text; }
        constructor(private _text: string) { super(RegexTokenType.literal); }
    }

    class CharacterClassRegexToken extends RegexToken {
        private _subExpressions: RegexToken[] = [];

        get subExpressions(): ReadonlyArray<RegexToken> { return this._subExpressions; }

        get isNegative(): boolean { return this._isNegative; }
        constructor(private _isNegative: boolean, subExpressions?: RegexToken[]) {
            super(RegexTokenType.literal);
            this._subExpressions = (sys.isNil(subExpressions)) ? [] : subExpressions;
        }
    }

    // #endregion

    class RegexParsingService {
        getTokens(pattern: string): RegexToken[] { return GroupRegexToken.parse(pattern); }
    }

    app.appModule.factory("regexParsingService", RegexParsingService);

    // #endregion

    // #region LocalStorageService

    export interface IStoredRegex {
        pattern: string;
        inputText: string[];
        isGlobal: boolean;
        ignoreCase: boolean;
        multiline: boolean;
        unicode: boolean;
        sticky: boolean;
        dotAll: boolean;
        ignoreWhitespace: boolean;
    }

    class localRegexStorageService {
        keys(): string[] {
            let result: string[] = [];
            for (let i: number = 0; i < localStorage.length; i++)
                result.push(localStorage.key(i));
            return result;
        }
        length(): number { return localStorage.length; }
        load(key: string, controller: regexTesterController): boolean {
            try {
                let json: string = localStorage.getItem(key);
                if (!sys.isNilOrWhiteSpace(json)) {
                    let data: IStoredRegex = <IStoredRegex>(JSON.parse(json));
                    controller.inputPattern = data.pattern;
                    let i: number = data.inputText.length;
                    while (controller.inputItems.length < i)
                        controller.addInputItem();
                    i--;
                    while (controller.inputItems.length > i)
                        controller.inputItems[i].delete();
                    do {
                        controller.inputItems[i].inputText = data.inputText[i--];
                    } while (i > -1);
                    controller.inputItems.forEach((i: TestStringItem) => i.setNotEvaluated());
                    controller.areEvaluationsVisible = false;
                }
            } catch { }
            return false;
        }
        save(key: string, controller: regexTesterController): void {
            localStorage.setItem(key, JSON.stringify({
                pattern: controller.inputPattern,
                inputText: controller.inputItems.map((i: TestStringItem) => i.inputText),
                isGlobal: controller.isGlobal,
                ignoreCase: controller.ignoreCase,
                multiline: controller.multiline,
                unicode: controller.unicode,
                sticky: controller.sticky,
                dotAll: controller.dotAll,
                ignoreWhitespace: controller.ignoreWhitespace
            }));
        }
        remove(key: string): void { localStorage.removeItem(key); }
        clear(): void { localStorage.clear(); }
    }

    app.appModule.factory("localRegexStorageService", localRegexStorageService);

    // #endregion

    // #region regex-group-content directive

    interface IRegexGroupsScope extends ng.IScope {
        regexTester: regexTesterController;
        regexGroups: RegexGroupContentController;
        regexTokens: RegexToken[];
    }

    interface IRegexGroupsAttributes extends ng.IAttributes {
        tokens: RegexToken[];
    }

    class RegexGroupContentController implements ng.IController {
        constructor(public $scope: IRegexGroupsScope) { }

        static createDirective(): ng.IDirective {
            return {
                controller: ["$scope", RegexGroupContentController],
                controllerAs: "regexGroupContent",
                require: "^^regexTesterController",
                restrict: "E",
                scope: { regexTokens: "=tokens" },
                templateUrl: "regexGroupContent.htm",
                transclude: true,
                link: (scope: IRegexGroupsScope, element: JQuery, attr: IRegexGroupsAttributes, regexTester: regexTesterController) => {
                    scope.regexTester = regexTester;
                    let regexGroups: RegexGroupContentController = scope.regexGroups;
                }
            };
        }

        $onInit(): void { }
    }

    app.appModule.directive("regexGroupContent", RegexGroupContentController.createDirective);

    // #endregion

    // #region regexTesterController

    //interface ITestStringItemScope extends IRegexTesterControllerScope {
    //    itemNumber: number;
    //    success: boolean;
    //    statusMessage: string;
    //    cssClass: string[];
    //    evaluated: boolean;
    //    inputText: string;
    //    canDelete: boolean;
    //    isCurrent: boolean;
    //    matchIndex: number;
    //    matchGroups: { index: number; statusMessage: string; success: boolean; value: string; cssClass: string[] }[];
    //    edit(): void;
    //    delete(): void;
    //}

    //interface IRegexTesterControllerScope extends ng.IScope {
    //    inputPattern: string;
    //    inputItems: ITestStringItemScope[];
    //    fullPattern: string;
    //    flags: string;
    //    isGlobal: boolean;
    //    ignoreCase: boolean;
    //    multiline: boolean;
    //    unicode: boolean;
    //    sticky: boolean;
    //    dotAll: boolean;
    //    ignoreWhitespace: boolean;
    //    areOptionsVisible: boolean;
    //    hasParseError: boolean;
    //    currentSavedName: string;
    //    savedNames: string[];
    //    patternParseError: string;
    //    validationClass: string[];
    //    areEvaluationsVisible: boolean;
    //    hideInputTextBox: boolean;
    //    evaluate(): void;
    //    addInputItem(): void;
    //    editInput(): void;
    //    editOptions(value: boolean): void;
    //    loadSession(name: string): void;
    //    deleteSession(name: string): void;
    //    saveSession(): void;
    //    sessionLoadMessage: string;
    //    sessionSaveMessage: string;
    //    inputRowCount: number;
    //    setInputRowCount(inc: boolean): void;
    //}

    interface ITestMatchGroup { index: number; statusMessage: string; success: boolean; value: string; cssClass: string[] }

    class TestStringItem {
        private readonly _itemNumber: number;
        private _success: boolean = false;
        private _statusMessage: string = "Not evaluated";
        private _cssClass: string[] = ['alert', 'alert-secondary'];
        private _evaluated: boolean = false;
        private _inputText: string = "";
        private _canDelete: boolean = false;
        private _isCurrent: boolean = false;
        private _matchIndex: number = -1;
        private _matchGroups: ITestMatchGroup[] = [];

        get itemNumber(): number { return this._itemNumber; }

        get success(): boolean { return this._success; }

        get statusMessage(): string { return this._statusMessage; }

        get cssClass(): string[] { return this._cssClass; }

        get evaluated(): boolean { return this._evaluated; }

        get inputText(): string { return this._inputText; }
        set inputText(value: string) {
            if (this._inputText === (value = sys.asString(value)))
                return;
            this._inputText = value;
            this.setNotEvaluated();
            let regex: RegExp = this._owner.regex;
            if (sys.isNil(regex))
                return;
            let item: TestStringItem = this;
            this._owner.$q<{ matchIndex: number, groups: ITestMatchGroup[] }>((resolve: ng.IQResolveReject<{ matchIndex: number, groups: ITestMatchGroup[] }>, reject: ng.IQResolveReject<any>) => {
                try { resolve(item.evaluateRegex(regex, value)); } catch (e) { reject(e); }
            }).then((results: { matchIndex: number, groups: ITestMatchGroup[] }) => {
                item.onEvaluated(value, regex, results);
                item._owner.hasEvaluations = true;
            }, (reason: any) => { item.onError(reason); });
        }

        get canDelete(): boolean { return this._canDelete; }

        get isCurrent(): boolean { return this._isCurrent; }

        get matchIndex(): number { return this._matchIndex; }

        get matchGroups(): { index: number; statusMessage: string; success: boolean; value: string; cssClass: string[] }[] { return this._matchGroups; }

        constructor(private _owner: regexTesterController) {
            let n: number = _owner.inputItems.length;
            if (!sys.isNil(TestStringItem.find(n, _owner))) {
                for (n = 0; n < _owner.inputItems.length; n++) {
                    if (sys.isNil(TestStringItem.find(n, _owner)))
                        break;
                }
            }
            this._itemNumber = n;
        }

        edit(): void { this._owner.inputItems.forEach((value: TestStringItem) => value._isCurrent = (value._itemNumber === this._itemNumber)); }

        delete(): boolean {
            if (this._owner.inputItems.length < 2)
                return false;
            for (let i: number = 0; i < this._owner.inputItems.length; i++) {
                if (this._owner.inputItems[i]._itemNumber === this._itemNumber) {
                    let removed: TestStringItem;
                    if (i == 0)
                        removed = this._owner.inputItems.shift();
                    else if (i === this._owner.inputItems.length - 1)
                        removed = this._owner.inputItems.pop();
                    else
                        removed = this._owner.inputItems.splice(i, 1)[0];
                    if (this._owner.inputItems.length == 1) {
                        this._owner.inputItems[0]._canDelete = false;
                        this._owner.inputItems[0]._isCurrent = true;
                    } else if (removed._isCurrent)
                        this._owner.inputItems[(i > 1) ? i - 1: 0]._isCurrent = true;
                    return true;
                }
            }
            return false;
        }

        private evaluateRegex(regex: RegExp, source: string): { matchIndex: number, groups: ITestMatchGroup[] } {
            let match: RegExpExecArray = regex.exec(source);
            if (sys.isNilOrEmpty(match))
                return { matchIndex: -1, groups: [] };
            let result: ITestMatchGroup[] = [];
            return {
                matchIndex: match.index,
                groups: match.map((value: string, index: number) => {
                    if (sys.isNil(value))
                        return { index: index, statusMessage: "No match", success: false, value: value, cssClass: ['alert', 'alert-warning'] };
                    return { index: index, statusMessage: "Matched " + value.length + " characters", success: true, value: value, cssClass: ['alert', 'alert-success'] };
                })
            };
        }

        private onEvaluated(value: string, regex: RegExp, results: { matchIndex: number, groups: ITestMatchGroup[] }): void {
            if (value !== this._inputText)
                return;
            let r: RegExp = this._owner.regex;
            if (sys.isNil(r) || r.source !== regex.source || r.flags !== regex.flags)
                return;
            this._evaluated = true;
            if (sys.isNilOrEmpty(results.groups)) {
                this._matchGroups = [];
                this._cssClass = ["alert", "alert-danger"];
                this._statusMessage = "No match";
                this._matchIndex = -1;
            } else {
                this._matchGroups = results.groups;
                this._cssClass = ["alert", "alert-success"];
                this._statusMessage = results.groups.length + " matches starting at index " + results.matchIndex;
                this._matchIndex = results.matchIndex;
            }
        }

        private onError(reason: any): void {
            this._evaluated = true;
            this._matchGroups = [];
            this._cssClass = ["alert", "alert-danger"];
            if (sys.isNil(reason))
                this._statusMessage = "Match evaluation error";
            else
                this._statusMessage = "Match evaluation error: " + ((typeof reason === "string") ? reason : (((typeof reason === "object") ? angular.toJson(reason) : sys.asString(reason))));
            this._matchIndex = -1;
        }

        evaluate(regex: RegExp): void {
            let value: string = this._inputText;
            this.setNotEvaluated();
            let results: { matchIndex: number, groups: ITestMatchGroup[] };
            try { results = this.evaluateRegex(regex, value); }
            catch (e) {
                this.onError(e);
                return;
            }
            this.onEvaluated(value, regex, results);
        }

        setNotEvaluated(): void {
            this._evaluated = this._success = false;
            this._statusMessage = "Not evaluated";
            this._cssClass = ['alert', 'alert-secondary'];
            this._matchIndex = -1;
        }

        static add(owner: regexTesterController): TestStringItem {
            owner.inputItems.forEach((value: TestStringItem) => value._isCurrent = false);
            let result: TestStringItem = new TestStringItem(owner);
            result._isCurrent = true;
            owner.inputItems.push(result);
            if (owner.inputItems.length < 2)
                return result;
            if (owner.inputItems.length == 2)
                owner.inputItems[0]._canDelete = true;
            result._canDelete = true;
            return result;
        }

        static find(itemNumber: number, owner: regexTesterController): TestStringItem | undefined { return owner.inputItems.find((value: TestStringItem) => value.itemNumber === itemNumber); }
    }
    
    const whitespacRe: RegExp = /\s+/g;

    class regexTesterController implements ng.IController {
        private readonly _inputItems: TestStringItem[] = [];
        private _regex: RegExp | undefined;
        private _inputPattern: string = "";
        private _isGlobal: boolean = false;
        private _ignoreCase: boolean = false;
        private _multiline: boolean = false;
        private _unicode: boolean = false;
        private _sticky: boolean = false;
        private _dotAll: boolean = false;
        private _ignoreWhitespace: boolean = false;
        private _normalizedPattern: string = "";
        private _fullPattern: string = "";
        private _flags: string = "";
        private _areOptionsVisible: boolean = false;
        private _hasParseError: boolean = false;
        private _currentSavedName: string = "";
        private _savedNames: string[] = [];
        private _patternParseError: string = "";
        private _validationClass: string[] = [];
        private _areEvaluationsVisible: boolean = false;
        private _hasEvaluations: boolean = false;
        private _sessionLoadMessage: string = "";
        private _sessionSaveMessage: string = "";
        private _inputRowCount: number = 3;

        get regex(): RegExp | undefined { return this._regex; }

        get inputPattern(): string { return this._inputPattern; }
        set inputPattern(value: string) {
            if (this._inputPattern === (value = sys.asString(value)))
                return;
            this._inputPattern = value;
            if (this._ignoreWhitespace)
                value = value.trim().replace(whitespacRe, "");
            if (this._normalizedPattern === value)
                return;
            this._normalizedPattern = value;
            this.updateFullPattern();
        }

        get hasEvaluations(): boolean { return this._hasEvaluations; }
        set hasEvaluations(value: boolean) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._hasEvaluations = value;
        }

        get inputRowCount(): number { return this._inputRowCount; }

        get canIncreaseInputRows(): boolean { return this._inputRowCount < 25 && this._ignoreWhitespace; }

        get canDecreaseInputRows(): boolean { return this._inputRowCount > 3 && this._ignoreWhitespace; }

        get inputItems(): TestStringItem[] { return this._inputItems; }

        get fullPattern(): string { return this._fullPattern; }

        get flags(): string { return this._flags; }

        get isGlobal(): boolean { return this._isGlobal; }
        set isGlobal(value: boolean) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }

        get ignoreCase(): boolean { return this._ignoreCase; }
        set ignoreCase(value: boolean) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }

        get multiline(): boolean { return this._multiline; }
        set multiline(value: boolean) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }

        get unicode(): boolean { return this._unicode; }
        set unicode(value: boolean) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }

        get sticky(): boolean { return this._sticky; }
        set sticky(value: boolean) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }

        get dotAll(): boolean { return this._dotAll; }
        set dotAll(value: boolean) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }

        get ignoreWhitespace(): boolean { return this._ignoreWhitespace; }
        set ignoreWhitespace(value: boolean) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }

        get areOptionsVisible(): boolean { return this._areOptionsVisible; }
        set areOptionsVisible(value: boolean) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._isGlobal = value;
        }

        get hasParseError(): boolean { return this._hasParseError; }

        get currentSavedName(): string { return this._currentSavedName; }

        get savedNames(): string[] { return this._savedNames; }

        get isSessionInfoVisible(): boolean { return this._areOptionsVisible && (this._savedNames.length > 0 || this._sessionLoadMessage.length > 0); }

        get isSessionNameHeadingVisible(): boolean { return this._sessionLoadMessage.length > 0 || (this._areOptionsVisible && this._savedNames.length > 0); }

        get sessionLoadMessage(): string { return this._sessionLoadMessage; }

        get hasSessionLoadMessage(): boolean { return this._sessionLoadMessage.length > 0; }

        get hasSavedSessionNames(): boolean { return this._areOptionsVisible && this._savedNames.length > 0; }

        get sessionSaveMessage(): string { return this._sessionSaveMessage; }

        get hasSaveSessionMessage(): boolean { return this._sessionSaveMessage.length > 0; }

        get patternParseError(): string { return this._patternParseError; }

        get validationClass(): string[] { return this._validationClass; }

        get areEvaluationsVisible(): boolean { return this._areEvaluationsVisible; }
        set areEvaluationsVisible(value: boolean) {
            if (value === (value = sys.asBoolean(value)))
                return;
            this._areEvaluationsVisible = value;
        }

        get displayInputTextBox(): boolean { return !this._areEvaluationsVisible; }
        set displayInputTextBox(value: boolean) {
            if (value !== (value = sys.asBoolean(value)))
                return;
            this._areEvaluationsVisible = !value;
        }

        constructor(protected $scope: ng.IScope, public $q: ng.IQService, protected storageSvc: localRegexStorageService) {
            TestStringItem.add(this);
        }

        setInputRowCount(inc: boolean) {
            if (inc) {
                if (this._inputRowCount < 25)
                    this._inputRowCount++;
            } else if (this._inputRowCount > 3)
                this._inputRowCount--;
        }

        loadSession(name: string): void {
            this._sessionLoadMessage = this._sessionSaveMessage = '';
            this.storageSvc.load(name, this);
            this._currentSavedName = name;
            this._sessionLoadMessage = 'Session "' + name + '" loaded at ' + Date();
        }

        deleteSession(name: string): void {
            this._sessionLoadMessage = this._sessionSaveMessage = '';
            this.storageSvc.remove(name);
            this._savedNames = this.storageSvc.keys();
            this._sessionLoadMessage = 'Session "' + name + '" deleted.';
        }

        saveSession(): void {
            this._sessionLoadMessage = this._sessionSaveMessage = '';
            if (sys.isNilOrWhiteSpace(this._currentSavedName))
                alert("Saved session must have a name.");
            else {
                this.storageSvc.save((this._currentSavedName = this._currentSavedName.trim()), this);
                this._sessionSaveMessage = 'Session "' + this._currentSavedName + '" saved at ' + Date();
            }
            this._savedNames = this.storageSvc.keys();
        }

        editOptions(value: boolean): void {
            this._sessionLoadMessage = this._sessionSaveMessage = '';
            this._areOptionsVisible = value;
        }

        editInput(): void { this.displayInputTextBox = true; }

        showEvaluations(): void { this.areEvaluationsVisible = true; }

        addInputItem() { TestStringItem.add(this); }

        updateFlags(): void {
            let flags: string = (this._ignoreCase) ? "i" : "";
            if (this._isGlobal)
                flags += "g";
            if (this._multiline)
                flags += "m";
            if (this._unicode)
                flags += "u";
            if (this._sticky)
                flags += "y";
            if (this._dotAll)
                flags += "s";
            if (flags === this._flags)
                return;
            this._flags = flags;
            this.updateFullPattern();
        }

        updateFullPattern(): void {
            let fullPattern = "/" + this._normalizedPattern + "/" + this._flags;
            if (this._fullPattern === fullPattern)
                return;
            this._fullPattern = fullPattern;
            this._patternParseError = "";
            this._hasParseError = false;
            this._regex = undefined;
            this._inputItems.forEach((item: TestStringItem) => item.setNotEvaluated());
            this._hasEvaluations = false;
            let controller: regexTesterController = this;
            this.$q<RegExp>((resolve: ng.IQResolveReject<RegExp>, reject: ng.IQResolveReject<any>) => {
                try {
                    let regex: RegExp = (controller._flags.length == 0) ? new RegExp(controller._normalizedPattern) : new RegExp(controller._normalizedPattern, controller._flags);
                    if (sys.isNil(regex))
                        throw "Failed to create regular expression.";
                    resolve(regex);
                } catch (e) {
                    reject(e);
                    return;
                }
            }).then((regex: RegExp) => {
                if (fullPattern !== controller._fullPattern || !sys.isNil(controller._regex))
                    return;
                controller._regex = regex;
                let failCount: number;
                failCount = controller.inputItems.filter((value: TestStringItem) => {
                    value.evaluate(regex);
                    return !value.success;
                }).length;
                if (failCount > 0 && (controller.inputItems.length > 1 || controller.inputItems[0].inputText.length > 0)) {
                    controller._patternParseError = (failCount == 1) ? "1 string did not match" : failCount + " strings did not match";
                    controller._validationClass = ['alert', 'alert-warning'];
                } else if (controller._normalizedPattern.length == 0) {
                    controller._patternParseError = 'Pattern is empty.';
                    controller._validationClass = ['alert', 'alert-warning'];
                } else
                    controller._validationClass = [];
                this._hasEvaluations = true;
            }, (reason: any) => {
                    controller._patternParseError = "Pattern parse error: " + ((typeof reason === "string") ? reason : (((typeof reason === "object") ? angular.toJson(reason) : sys.asString(reason))));
                    controller._validationClass = ['alert', 'alert-danger'];
            });
        }

        $doCheck(): void { }
    }

    app.appModule.controller("regexTesterController", ["$scope", "$q", "localRegexStorageService", regexTesterController]);

    // #endregion
}
