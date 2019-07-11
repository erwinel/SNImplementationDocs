/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />

namespace uriBuilder {

    // #region evaluation-item directive

    interface IEvaluationItemScope extends ng.IScope {
        evaluationItem: EvaluationItemController;
    }

    interface IEvaluationItemAttributes extends ng.IAttributes {

    }

    class EvaluationItemController implements ng.IController {
        private readonly _uriBuilder: UriBuilderController;

        constructor(public $scope: IEvaluationItemScope, private $element: JQuery, private $attrs: IEvaluationItemAttributes, private $q: ng.IQService, private $log: ng.ILogService) {
            $scope.evaluationItem = this;
            let uriBuilder: UriBuilderController = <UriBuilderController>$scope.uriBuilder;
            if (sys.isNil(uriBuilder) || !(uriBuilder instanceof UriBuilderController)) {
                let rootId: number = $scope.$root.$id;
                for (let parentScope: ng.IScope = $scope.$parent; !sys.isNil(parentScope); parentScope = (parentScope.$id === rootId) ? undefined : parentScope.$parent) {
                    if (!sys.isNil(parentScope.uriBuilder) && parentScope.uriBuilder instanceof UriBuilderController) {
                        uriBuilder = parentScope.uriBuilder;
                        break;
                    }
                }
                if (sys.isNil(uriBuilder) || !(uriBuilder instanceof UriBuilderController))
                    throw new Error("Unable to detect parent uriBuilder controller scope");
            }

            this._uriBuilder = uriBuilder;

            uriBuilder.$scope.$watch("expression", (newValue: RegExp | undefined, oldValue: RegExp | undefined, uriBuilderScope: IUriBuilderScope) => {

            });
        }

        $doCheck() {

        }

        static createDirective(): ng.IDirective {
            return {
                controller: ["$scope", "$element", "$attrs", "$q", "$log", EvaluationItemController],
                controllerAs: "evaluationItem",
                scope: {
                    id: '=',
                    success: '='
                },
                template: '',
                transclude: true
            };
        }
    }

    app.appModule.directive("evaluationItem", EvaluationItemController.createDirective);

    // #endregion

    // #region regexPattern controller

    interface IRegexPatternScope extends ng.IScope {
        currentController: RegexPatternController;
        singleLineText: string;
        multiLineText: string;
        isMultiLine: string;
    }

    class RegexPatternController implements ng.IController {
        private readonly _uriBuilder: UriBuilderController;

        constructor(public $scope: IRegexPatternScope, private $q: ng.IQService, private $log: ng.ILogService) {
            $scope.currentController = this;
            let uriBuilder: UriBuilderController = <UriBuilderController>$scope.uriBuilder;
            if (sys.isNil(uriBuilder) || !(uriBuilder instanceof UriBuilderController)) {
                let rootId: number = $scope.$root.$id;
                for (let parentScope: ng.IScope = $scope.$parent; !sys.isNil(parentScope); parentScope = (parentScope.$id === rootId) ? undefined : parentScope.$parent) {
                    if (!sys.isNil(parentScope.uriBuilder) && parentScope.uriBuilder instanceof UriBuilderController) {
                        uriBuilder = parentScope.uriBuilder;
                        break;
                    }
                }
                if (sys.isNil(uriBuilder) || !(uriBuilder instanceof UriBuilderController))
                    throw new Error("Unable to detect parent uriBuilder controller scope");
            }

            this._uriBuilder = uriBuilder;
        }

        $doCheck() {

        }
    }

    app.appModule.controller("regexPattern", ["$scope", "$q", "$log", RegexPatternController]);

    // #endregion

    // #region uriBuilder controller

    interface IEvaluationItem {
        id: number;
        success?: boolean;
    }

    interface IUriBuilderScope extends ng.IScope {
        uriBuilder: UriBuilderController;
        expression: RegExp | undefined;
        inputItems: IEvaluationItem[];
    }

    class UriBuilderController implements ng.IController {
        constructor(public $scope: IUriBuilderScope, private $log: ng.ILogService) {
            $scope.uriBuilder = this;
            $scope.inputItems = [{ id: 0 }];
        }

        $doCheck() {

        }
    }

    app.appModule.controller("uriBuilder", ["$scope", "$log", UriBuilderController]);

    // #endregion
}

namespace uriBuilder_old {
    const CSS_CLASS_VALID: string = "is-valid";
    const CSS_CLASS_INVALID: string = "is-invalid";
    const CSS_CLASS_TEXT_WARNING: string = "text-warning";

    export type UriSchemeSeparator = "://" | ":/" | ":";
    export type UriPathSegmentSeparator = "/" | "\\" | ":";

    const uriSchemeParseRe: RegExp = /^([a-zA-Z_][-.\dA-_a-z~\ud800-\udbff]*)(:[\\/]{0,2})/;

    const uriAuthorityParseRe: RegExp = /^(([^@:\\\/]+)?(:([^@:\\\/]+)?)?@)?(?:([^@:\\\/]+)?(?::(\d+)(?=[\\\/:]|$))?)?/;

    const leadingPathSegmentRe: RegExp = /^[^:\\\/]+/;

    const trailingPathSegmentRe: RegExp = /^(:\\\/)([^:\\\/]+)?/;

    /*
      https://john.doe:userpassword@www.example.com:65535/forum/questions/?tag=networking&order=newest#top
      ├─┬─┘└┬┘├───┬──┘ └─────┬────┤ ├──────┬──────┘ └─┬─┤│               │ │                         │ │ │
      │ │   │ │username  password │ │  hostname     port││               │ │                         │ │ │
      │ │   │ ├─────────┬─────────┘ └─────────┬─────────┤│               │ │                         │ │ │
      │ │ sep │     userinfo                 host       ││               │ │                         │ │ │
      │ │     └──────────────────┬──────────────────────┤│               │ │                         │ │ │
      │ scheme               authority                  ││               │ │                         │ │ │
      └───────────────────────┬─────────────────────────┘└───────┬───────┘ └────────────┬────────────┘ └┬┘
                            origin                              path                   query        fragment

      file:///C:/Program%20Files%20(x86)/Common%20Files/microsoft%20shared
      ├─┬┘└┬┘││                                                          │
      │ │sep ││                                                          │
      │scheme││                                                          │
      └───┬──┘└────────────────────────────┬─────────────────────────────┘
        origin                           path

      file://remoteserver.mycompany.org/Shared%20Files/Report.xlsx
      ├─┬┘└┬┘└────────────┬───────────┤│                         │
      │ │ sep       host/authority    ││                         │
      │scheme                         ││                         │
      └───────────────┬───────────────┘└────────────┬────────────┘
                    origin                        path

      ldap://[2001:db8::7]/c=GB?objectClass?one
      ├─┬┘└┬┘└─────┬─────┤│   │ │             │
      │ │ sep    host    ││   │ │             │
      │ scheme           ││   │ │             │
      └─────────┬────────┘└─┬─┘ └──────┬──────┘
             origin        path      query

      mailto:John.Doe@example.com
      ├──┬─┘ ├───┬──┘ └────┬────┤
      │  │   │username    host  │
      │  │   └─────────┬────────┤
      │scheme       authority   │
      └────────────┬────────────┘
                origin

      news:comp.infosystems.www.servers.unix
      ├─┬┘ └───────────────┬───────────────┤
      │scheme        host/authority        │
      └──────────────────┬─────────────────┘
                      origin
    
      tel:+1-816-555-1212
      ├┬┘ └──────┬──────┤
      ││  host/authority│
      │scheme           │
      └────────┬────────┘
    
      telnet://192.0.2.16:80/
      ├──┬─┘└┬┘├────┬───┘ ├┤│
      │  │   │ │hostname  │││
      │  │   │ │       port││
      │  │ sep └─────┬─────┤│
      │ scheme   host/auth ││
      └──────────┬─────────┘│
               origin      path
    
      urn:oasis:names:specification:docbook:dtd:xml:4.1.2
      ├┬┘ └─┬─┤ │                                       │
      ││  host│ │                                       │
      │scheme │ │                                       │
      └───┬───┘ └───────────────────┬───────────────────┘
        origin                     path
     */

    export function getUriSchemeInfo(uri: string): UriSchemeInfo | undefined {
        if ((typeof uri === "string") && uri.length > 0) {
            let m: RegExpExecArray = uriSchemeParseRe.exec(uri);
            if ((typeof m === "object") && m !== null) {
                let scheme: UriSchemeInfo = UriSchemeInfo.getSchemaProperties(m[1]);
                let s: string = m[2].replace("\\", "/");
                if (scheme.schemeSeparator === s)
                    return scheme;
                return new UriSchemeInfo(scheme.name, {
                    supportsPath: scheme.supportsPath, supportsQuery: scheme.supportsQuery, supportsFragment: scheme.supportsFragment, supportsCredentials: scheme.supportsCredentials,
                    requiresHost: scheme.requiresHost, supportsHost: scheme.supportsHost, supportsPort: scheme.supportsPort, requiresUsername: scheme.requiresUsername, schemeSeparator: <UriSchemeSeparator>s, defaultPort: scheme.defaultPort
                }, scheme.description);
            }
        }
    }

    export interface IUriSchemeOption extends IUriSchemeProperties {
        name: string;
        displayText: string;
        description?: string;
        schemeSeparator: UriSchemeSeparator;
    }

    export interface IUriSchemeProperties {
        supportsPath?: boolean;
        supportsQuery?: boolean;
        supportsFragment?: boolean;
        supportsCredentials?: boolean;
        requiresHost?: boolean;
        supportsHost?: boolean;
        supportsPort?: boolean;
        requiresUsername?: boolean;
        schemeSeparator?: UriSchemeSeparator;
        defaultPort?: number;
    }

    export class UriSchemeInfo implements IUriSchemeOption {
        readonly description: string;
        readonly supportsPath: boolean;
        readonly supportsQuery: boolean;
        readonly supportsFragment: boolean;
        readonly supportsCredentials: boolean;
        readonly supportsHost: boolean;
        readonly requiresHost: boolean;
        readonly supportsPort: boolean;
        readonly requiresUsername: boolean;
        readonly defaultPort: number;
        readonly schemeSeparator: UriSchemeSeparator;
        get displayText(): string {
            return (this.description.length == 0) ? "\"" + this.name + "\" Schema" : this.description + " (" + this.name + ")";
        }
        constructor(readonly name: string, properties?: IUriSchemeProperties, description?: string) {
            this.description = (typeof description === "string") ? description.trim() : "";
            if (typeof (properties) === 'undefined' || properties === null) {
                this.supportsPath = true;
                this.supportsQuery = true;
                this.supportsFragment = true;
                this.supportsCredentials = true;
                this.supportsHost = true;
                this.requiresHost = false;
                this.supportsPort = true;
                this.requiresUsername = false;
                this.defaultPort = NaN;
                this.schemeSeparator = "://";
            } else {
                this.schemeSeparator = (typeof (properties.schemeSeparator) == 'string') ? properties.schemeSeparator : "://";
                if (this.schemeSeparator == ":") {
                    this.supportsHost = ((typeof properties.supportsHost === 'boolean') && properties.supportsHost === true);
                    this.requiresHost = (this.supportsHost && (typeof properties.requiresHost === 'boolean') && properties.requiresHost === true);
                } else {
                    this.supportsHost = ((typeof properties.supportsHost !== 'boolean') || properties.supportsHost === true);
                    this.requiresHost = (this.supportsHost && (typeof properties.requiresHost !== 'boolean') || properties.requiresHost === true);
                }
                this.supportsPath = ((typeof properties.supportsPath !== 'boolean') || properties.supportsPath === true);
                this.supportsQuery = ((typeof properties.supportsQuery !== 'boolean') || properties.supportsQuery === true);
                this.supportsFragment = ((typeof properties.supportsFragment !== 'boolean') || properties.supportsFragment === true);
                this.supportsCredentials = (this.supportsHost && (typeof properties.supportsCredentials !== 'boolean') || properties.supportsCredentials === true);
                this.supportsPort = (this.supportsHost && (typeof properties.supportsPort !== 'boolean') || properties.supportsPort === true);
                this.requiresUsername = (this.supportsHost && (typeof properties.requiresUsername === 'boolean') && properties.requiresUsername === true);
                this.defaultPort = (this.supportsPort && typeof properties.defaultPort === "number") ? properties.defaultPort : NaN;
            }
        }
        static getSchemaProperties(name: string): UriSchemeInfo {
            if (name.endsWith(':'))
                name = name.substr(0, name.length - 1);
            switch (name) {
                case 'ftp':
                    return UriSchemeInfo.uriScheme_ftp;
                case 'ftps':
                    return UriSchemeInfo.uriScheme_ftps;
                case 'sftp':
                    return UriSchemeInfo.uriScheme_sftp;
                case 'http':
                    return UriSchemeInfo.uriScheme_http;
                case 'https':
                    return UriSchemeInfo.uriScheme_https;
                case 'gopher':
                    return UriSchemeInfo.uriScheme_gopher;
                case 'mailto':
                    return UriSchemeInfo.uriScheme_mailto;
                case 'news':
                    return UriSchemeInfo.uriScheme_news;
                case 'nntp':
                    return UriSchemeInfo.uriScheme_nntp;
                case 'telnet':
                    return UriSchemeInfo.uriScheme_telnet;
                case 'wais':
                    return UriSchemeInfo.uriScheme_wais;
                case 'file':
                    return UriSchemeInfo.uriScheme_file;
                case 'net.pipe':
                    return UriSchemeInfo.uriScheme_netPipe;
                case 'net.tcp':
                    return UriSchemeInfo.uriScheme_netTcp;
                case 'ldap':
                    return UriSchemeInfo.uriScheme_ldap;
                case 'ssh':
                    return UriSchemeInfo.uriScheme_ssh;
                case 'git':
                    return UriSchemeInfo.uriScheme_git;
                case 'tel':
                    return UriSchemeInfo.uriScheme_tel;
                case 'urn':
                    return UriSchemeInfo.uriScheme_urn;
            }
            return new UriSchemeInfo(name);
        }
        /**
         * File Transfer protocol
         **/
        static readonly uriScheme_ftp: UriSchemeInfo = new UriSchemeInfo("ftp", { supportsQuery: false, supportsFragment: false, defaultPort: 21 }, "File Transfer protocol");
        /**
         * File Transfer protocol (secure)
         **/
        static readonly uriScheme_ftps: UriSchemeInfo = new UriSchemeInfo("ftps", { supportsQuery: false, supportsFragment: false, defaultPort: 990 }, "File Transfer protocol (secure)");
        /**
         * Secure File Transfer Protocol
         **/
        static readonly uriScheme_sftp: UriSchemeInfo = new UriSchemeInfo("sftp", { supportsQuery: false, supportsFragment: false, defaultPort: 22 }, "Secure File Transfer Protocol");
        /**
         * Hypertext Transfer Protocol
         **/
        static uriScheme_http: UriSchemeInfo = new UriSchemeInfo("http", { defaultPort: 80 }, "Hypertext Transfer Protocol");
        /**
         * Hypertext Transfer Protocol (secure)
         **/
        static uriScheme_https: UriSchemeInfo = new UriSchemeInfo("https", { defaultPort: 443 }, "Hypertext Transfer Protocol (secure)");
        /**
         * Gopher protocol
         **/
        static uriScheme_gopher: UriSchemeInfo = new UriSchemeInfo("gopher", { defaultPort: 70 }, "Gopher protocol");
        /**
         * Electronic mail address
         **/
        static uriScheme_mailto: UriSchemeInfo = new UriSchemeInfo("mailto", { schemeSeparator: ":", requiresUsername: true, supportsCredentials: false }, "Electronic mail address");
        /**
         * USENET news
         **/
        static uriScheme_news: UriSchemeInfo = new UriSchemeInfo("news", { supportsHost: false, schemeSeparator: ":" }, "USENET news");
        /**
         * USENET news using NNTP access
         **/
        static uriScheme_nntp: UriSchemeInfo = new UriSchemeInfo("nntp", { defaultPort: 119 }, "USENET news using NNTP access");
        /**
         * Reference to interactive sessions
         **/
        static uriScheme_telnet: UriSchemeInfo = new UriSchemeInfo("telnet", { supportsPath: false, supportsQuery: false, supportsFragment: false, supportsCredentials: false, defaultPort: 23 }, "Reference to interactive sessions");
        /**
         * Wide Area Information Servers
         **/
        static uriScheme_wais: UriSchemeInfo = new UriSchemeInfo("wais", { defaultPort: 443 }, "Wide Area Information Servers");
        /**
         * Host-specific file names
         **/
        static uriScheme_file: UriSchemeInfo = new UriSchemeInfo("file", { supportsQuery: false, supportsFragment: false, supportsCredentials: false, requiresHost: false, supportsPort: false }, "Host-specific file names");
        /**
         * Net Pipe
         **/
        static uriScheme_netPipe: UriSchemeInfo = new UriSchemeInfo("net.pipe", { supportsPort: false }, "Net Pipe");
        /**
         * Net-TCP
         **/
        static uriScheme_netTcp: UriSchemeInfo = new UriSchemeInfo("net.tcp", { defaultPort: 808 }, "Net-TCP");
        /**
         * Lightweight Directory Access Protocol
         **/
        static uriScheme_ldap: UriSchemeInfo = new UriSchemeInfo("ldap", { defaultPort: 389 }, "Lightweight Directory Access Protocol");
        /**
         * Lightweight Directory Access Protocol
         **/
        static uriScheme_ssh: UriSchemeInfo = new UriSchemeInfo("ssh", { defaultPort: 22 }, "Lightweight Directory Access Protocol");
        /**
         * GIT Respository
         **/
        static uriScheme_git: UriSchemeInfo = new UriSchemeInfo("git", { supportsQuery: false, supportsFragment: false, defaultPort: 9418 }, "GIT Respository");
        /**
         * Telephone Number
         **/
        static uriScheme_tel: UriSchemeInfo = new UriSchemeInfo("tel", { supportsHost: false, schemeSeparator: ":", supportsPath: false, supportsFragment: false, supportsQuery: false }, "Telephone Number");
        /**
         * Uniform Resource notation
         **/
        static uriScheme_urn: UriSchemeInfo = new UriSchemeInfo("urn", { supportsHost: false, schemeSeparator: ":" }, "Uniform Resource notation");
    }

    class UriBuilderQueryItem {
        private _hasValue: boolean;
        private _value: string;
        get key(): string { return this._key; }
        set key(value: string) {
            if (this._key === (value = sys.asString(value, "")))
                return;
            this._key = value;
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }
        get hasValue(): boolean { return this._hasValue; }
        set hasValue(value: boolean) {
            if (this._hasValue === (value = value == true))
                return;
            this._hasValue = value;
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }
        get value(): string { return (this._hasValue) ? this._value : ""; }
        set value(value: string) {
            if (this._value === (value = sys.asString(value, "")))
                return;
            this._value = value;
            if (this._hasValue && typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }
        constructor(private _id: number, private _key: string, value?: string, private _onChangeCallback?: Function, private _onDeleteCallback?: { (item?: UriBuilderQueryItem): void; }) {
            if (typeof _key !== "string")
                _key = "";
            this._hasValue = typeof value === "string";
            this._value = (this._hasValue && typeof value === "string") ? value : "";
        }
        toString(): string { return (this._hasValue) ? escape(this._key) + "=" + escape(this._value) : escape(this._key); }
        deleteCurrent(): void {
            if (typeof this._onDeleteCallback === "function")
                this._onDeleteCallback(this);
        }
        static push(array: UriBuilderQueryItem[], key: string, value?: string, onChangeCallback?: Function, onDeleteCallback?: { (item?: UriBuilderQueryItem): void; }): void {
            let id: number = array.length;
            array.push(new UriBuilderQueryItem(id, key, value, onChangeCallback, onDeleteCallback));
        }
        static clear(array: UriBuilderQueryItem[]): void {
            while (array.length > 0) {
                let item: UriBuilderQueryItem = array.pop();
                item._onChangeCallback = undefined;
                item._onDeleteCallback = undefined;
                item._id = -1;
            }
        }
        static deleteItem(array: UriBuilderQueryItem[], item: UriBuilderQueryItem): boolean {
            let index: number;
            if (sys.isNil(item) || (index = item._id) < 0 || index >= array.length || item._key !== array[index]._key || item._hasValue !== array[index]._hasValue || item._value !== array[index]._value)
                return false;
            item = array[index];
            item._onChangeCallback = undefined;
            item._onDeleteCallback = undefined;
            item._id = -1;
            if (index == 0)
                array.shift();
            else if (index < array.length)
                array.splice(index, 1);
            else {
                array.pop();
                return true;
            }
            for (let i: number = index; i < array.length; i++)
                array[i]._id = i;
            return true;
        }
    }

    class UriPathSegmentSeparatorOption {
        get label(): string { return (this._value.length == 0) ? "(none)" : this._value; }
        get value(): UriPathSegmentSeparator | "" { return this._value; }
        constructor(private _value: UriPathSegmentSeparator | "") { }
    }
    class UriBuilderPathSegment {
        static readonly _pathSeparatorOptions: UriPathSegmentSeparatorOption[] = [
            new UriPathSegmentSeparatorOption("/"),
            new UriPathSegmentSeparatorOption(":"),
            new UriPathSegmentSeparatorOption("\\"),
            new UriPathSegmentSeparatorOption("")
        ];
        private _separatorOptions: UriPathSegmentSeparatorOption[];
        private _selectedSeparatorIndex: number;
        get leadingSeparator(): UriPathSegmentSeparator | "" { return this._leadingSeparator; }
        set leadingSeparator(value: UriPathSegmentSeparator | "") {
            value = sys.asString(value);
            if (this._leadingSeparator === (value = sys.asString(value)))
                return;
            for (let index: number = 0; index < this._separatorOptions.length; index++) {
                if (this._separatorOptions[index].value === value) {
                    this._leadingSeparator = value;
                    this.selectedSeparatorIndex = index;
                    return;
                }
            }
        }
        get selectedSeparatorIndex(): number { return this._selectedSeparatorIndex; }
        set selectedSeparatorIndex(value: number) {
            if (typeof value !== "number" || isNaN(value) || value < 0 || (value = Math.round(value)) >= this._separatorOptions.length || value === this._selectedSeparatorIndex)
                return;
            this._selectedSeparatorIndex = value;
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }
        get name(): string { return this._name; }
        set name(value: string) {
            if (this._name === (value = sys.asString(value, "")))
                return;
            this._name = value;
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }
        get separatorOptional(): boolean { return this._separatorOptional; }
        set separatorOptional(value: boolean) {
            if (this._separatorOptional === (value = value == true))
                return;
            this._separatorOptions = (this._separatorOptional) ? this._separatorOptions : this._separatorOptions.filter((value: UriPathSegmentSeparatorOption) => value.value.length > 0);
            for (let index: number = 0; index < this._separatorOptions.length; index++) {
                if (this._separatorOptions[index].value === this._leadingSeparator) {
                    if (this._selectedSeparatorIndex !== index) {
                        this._selectedSeparatorIndex = index;
                        if (typeof this._onChangeCallback === "function")
                            this._onChangeCallback();
                    }
                    return;
                }
            }
            this._selectedSeparatorIndex = 0;
            this._leadingSeparator = this._separatorOptions[0].value;
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }
        constructor(private _id: number, private _leadingSeparator: UriPathSegmentSeparator | "", private _name: string, private _onChangeCallback?: Function, private _onDeleteCallback?: { (item?: UriBuilderPathSegment): void; }, private _separatorOptional: boolean = false) {
            if (typeof _leadingSeparator !== "string")
                _leadingSeparator = (_separatorOptional) ? "/" : "";
            else if (_separatorOptional && _leadingSeparator.length == 0)
                _leadingSeparator = "/";
            if (typeof _name !== "string")
                _name = "";
            this._separatorOptions = (_separatorOptional) ? this._separatorOptions : this._separatorOptions.filter((value: UriPathSegmentSeparatorOption) => value.value.length > 0);
            for (let index: number = 0; index < this._separatorOptions.length; index++) {
                if (this._separatorOptions[index].value === _leadingSeparator) {
                    this._selectedSeparatorIndex = index;
                    return;
                }
            }
            this._selectedSeparatorIndex = 0;
            this._leadingSeparator = this._separatorOptions[0].value;
        }
        deleteCurrent(): void {
            if (typeof this._onDeleteCallback === "function")
                this._onDeleteCallback(this);
        }
        static push(array: UriBuilderPathSegment[], leadingSeparator: UriPathSegmentSeparator | "", name: string, onChangeCallback?: Function, onDeleteCallback?: { (item?: UriBuilderPathSegment): void; }): void {
            let id: number = array.length;
            array.push(new UriBuilderPathSegment(id, leadingSeparator, name, onChangeCallback, onDeleteCallback, id == 0));
        }
        static reset(array: UriBuilderPathSegment[], leadingSeparator: UriPathSegmentSeparator | "", name: string): boolean {
            while (array.length > 1) {
                let item: UriBuilderPathSegment = array.pop();
                item._onChangeCallback = undefined;
                item._onDeleteCallback = undefined;
                item._id = -1;
            }
            if (array[0]._name === name && array[0]._leadingSeparator === leadingSeparator)
                return false;
            array[0]._name = name;
            array[0]._leadingSeparator = leadingSeparator;
            return true;
        }
        static deleteItem(array: UriBuilderPathSegment[], item: UriBuilderPathSegment): boolean {
            let index: number;
            if (sys.isNil(item) || (index = item._id) < 0 || index >= array.length || item._name !== array[index]._name || item._selectedSeparatorIndex !== array[index]._selectedSeparatorIndex)
                return false;
            item._id = -1;
            item = array[index];
            item._onChangeCallback = undefined;
            item._onDeleteCallback = undefined;
            if (array.length < 2) {
                if (array[0]._name.length == 0 && array[0]._leadingSeparator.length == 0)
                    return false;
                array[0]._name = "";
                array[0]._leadingSeparator = "";
                return true;
            }
            if (index == 0)
                array.shift();
            else if (index < array.length)
                array.splice(index, 1);
            else {
                array.pop();
                return true;
            }
            for (let i: number = index; i < array.length; i++)
                array[i]._id = i;
            if (index == 0)
                array[0]._separatorOptional = true;
            return true;
        }
    }

    class UriBuilderController implements ng.IController {
        private _isBuildUriMode: boolean = false;
        private _isBuildPathMode: boolean = false;
        private _isBuildQueryMode: boolean = false;
        private _href: string = "";
        private static readonly _schemeOptions: IUriSchemeOption[] = [
            UriSchemeInfo.uriScheme_http,
            UriSchemeInfo.uriScheme_https,
            UriSchemeInfo.uriScheme_file,
            UriSchemeInfo.uriScheme_ldap,
            UriSchemeInfo.uriScheme_ftp,
            UriSchemeInfo.uriScheme_ftps,
            UriSchemeInfo.uriScheme_git,
            UriSchemeInfo.uriScheme_mailto,
            UriSchemeInfo.uriScheme_netPipe,
            UriSchemeInfo.uriScheme_netTcp,
            UriSchemeInfo.uriScheme_nntp,
            UriSchemeInfo.uriScheme_sftp,
            UriSchemeInfo.uriScheme_ssh,
            UriSchemeInfo.uriScheme_tel,
            UriSchemeInfo.uriScheme_telnet,
            UriSchemeInfo.uriScheme_news,
            UriSchemeInfo.uriScheme_gopher,
            UriSchemeInfo.uriScheme_urn,
            <IUriSchemeOption>{ name: "", displayText: "(other)"}
        ];
        private _selectedSchemIndex: number = 0;
        private _otherSchemeName: string = "";
        private _schemeErrorMessage: string = "";
        private static readonly _schemeSeparatorOptions: UriSchemeSeparator[] = ["://", ":/", ":"];
        private _selectedSchemeSeparatorIndex: number = 0;
        private _isAbsolute: boolean = false;
        private _hasAuthority: boolean = false;
        private _hasUserInfo: boolean = false;
        private _userName: string = "";
        private _hasPassword: boolean = false;
        private _password: string = "";
        private _hostName: string = "";
        private _hasPort: boolean = false;
        private _portNumber: string = "";
        private _portValue: number = NaN;
        private _defaultPort: number = NaN;
        private _portErrorMessage: string = "";
        private _pathString: string = "";
        private _pathSegments: UriBuilderPathSegment[] = [];
        private _hasQuery: boolean = false;
        private _queryValues: UriBuilderQueryItem[] = [];
        private _queryString: string;
        private _hasFragment: boolean = false;
        private _fragment: string = "";
        private _isAbsoluteUri: boolean;

        get isBuildUriMode(): boolean { return this._isBuildUriMode; }
        set isBuildUriMode(value: boolean) {
            if (this._isBuildUriMode === (value = value == true))
                return;
            this._isBuildUriMode = value;
            this.validate();
        }
        get isParseUriMode(): boolean { return !this._isBuildUriMode; }

        get href(): string { return this._href; }
        set href(value: string) {
            if (this._href === (value = (typeof value === "string") ? value.trim() : ""))
                return;
            this._href = value;
            if (this._isBuildUriMode)
                return;
            let index: number = value.indexOf("#");
            this._hasFragment = index >= 0;
            if (this._hasFragment) {
                this._fragment = unescape(value.substr(index + 1));
                value = value.substr(0, index);
            } else
                this._fragment = "";
            index = value.indexOf("?");
            this._hasQuery = index >= 0;
            UriBuilderQueryItem.clear(this._queryValues);
            let controller: UriBuilderController = this;
            if (this._hasQuery) {
                this._queryString = value.substr(index + 1);
                if (this._queryString.length > 0) {
                    this._queryString.split("&").forEach((kvp: string) => {
                        let i: number = kvp.indexOf("=");
                        if (i < 0)
                            UriBuilderQueryItem.push(this._queryValues, unescape(kvp), undefined, () => {
                                if (controller.isBuildQueryMode)
                                    controller.rebuildQuery();
                            }, (item: UriBuilderQueryItem) => {
                                if (UriBuilderQueryItem.deleteItem(controller._queryValues, item) && controller.isBuildQueryMode)
                                    controller.rebuildQuery();
                            });
                        else
                            UriBuilderQueryItem.push(this._queryValues, unescape(kvp.substr(0, i)), unescape(kvp.substr(i + 1)), () => {
                                if (controller.isBuildQueryMode)
                                    controller.rebuildQuery();
                            }, (item: UriBuilderQueryItem) => {
                                if (UriBuilderQueryItem.deleteItem(controller._queryValues, item) && controller.isBuildQueryMode)
                                    controller.rebuildQuery();
                            });
                    });
                }
                value = value.substr(0, index);
            }
            let scheme: UriSchemeInfo | undefined = getUriSchemeInfo(value);
            this._isAbsoluteUri = !sys.isNil(scheme);
            let m: RegExpExecArray;
            if (this._isAbsoluteUri) {
                value = value.substr(scheme.name.length + scheme.schemeSeparator.length);
                this._otherSchemeName = scheme.name;
                this._selectedSchemeSeparatorIndex = UriBuilderController._schemeSeparatorOptions.indexOf(scheme.schemeSeparator);
                this._selectedSchemIndex = -1;
                for (let i: number = 0; i < UriBuilderController._schemeSeparatorOptions.length; i++) {
                    if (UriBuilderController._schemeOptions[i].name === scheme.name && UriBuilderController._schemeOptions[i].schemeSeparator === scheme.schemeSeparator) {
                        this._selectedSchemIndex = i;
                        break;
                    }
                }
                m = uriAuthorityParseRe.exec(value);
                this._hasAuthority = !sys.isNil(m);
                if (this._hasAuthority) {
                    this._hasUserInfo = !sys.isNil(m[1]);
                    if (this._hasUserInfo) {
                        this._userName = unescape(sys.asString(m[2], ""));
                        this._hasPassword = !sys.isNil(m[3]);
                        this._password = (this._hasPassword) ? unescape(m[4]) : "";
                    } else {
                        this._hasPassword = false;
                        this._userName = this._password = "";
                    }
                    this._hostName = unescape(sys.asString(m[5], ""));
                    this._hasPort = !sys.isNil(m[6]);
                    this._portNumber = (this._hasPort) ? m[6] : "";
                    value = value.substr(m[0].length);
                } else {
                    this._hasUserInfo = this._hasPassword = this._hasPort = false;
                    this._userName = this._password = this._portNumber = "";
                    m = trailingPathSegmentRe.exec(value);
                    if (sys.isNil(m) || sys.isNil(m[1]))
                        this._hostName = "";
                    else {
                        this._hostName = unescape(m[1]);
                        value = value.substr(m[1].length);
                    }
                }
            } else {
                this._hasAuthority = this._hasUserInfo = this._hasPassword = this._hasPort = false;
                this._userName = this._password = this._hostName = this._portNumber = "";
            }
            this._pathString = value;

            m = leadingPathSegmentRe.exec(value);
            if (sys.isNil(m)) {
                m = trailingPathSegmentRe.exec(value);
                if (sys.isNil(m)) {
                    UriBuilderPathSegment.reset(this._pathSegments, "", unescape(value));
                    return;
                }
                UriBuilderPathSegment.reset(this._pathSegments, <UriPathSegmentSeparator>m[1], unescape(sys.asString(m[2])));
            } else
                UriBuilderPathSegment.reset(this._pathSegments, "", unescape(m[0]));
            while (value.length > m[0].length) {
                value = value.substr(m[0].length);
                m = trailingPathSegmentRe.exec(value);
                UriBuilderPathSegment.push(this._pathSegments, <UriPathSegmentSeparator>m[1], unescape(sys.asString(m[2])), () => {
                    if (controller.isBuildPathMode)
                        controller.rebuildPath();
                }, (item: UriBuilderPathSegment) => {
                    if (UriBuilderPathSegment.deleteItem(controller._pathSegments, item) && controller.isBuildPathMode)
                        controller.rebuildPath();
                });
            }
            this.validate();
        }
        get uriType(): string { return (this._isAbsolute) ? "Absolute" : ((this._pathSegments[0].leadingSeparator.length > 0) ? "Relative (rooted)" : "Relative"); }
        get isAbsolute(): boolean { return this._isAbsolute; }
        set isAbsolute(value: boolean) {
            if (this._isAbsolute === (value = sys.asBoolean(value, false)))
                return;
            this._isAbsolute = value;
            this.validate();
            if (this._isBuildUriMode)
                this.rebuildHref();
        }
        get isRelative(): boolean { return !this._isAbsolute; }
        get schemeName(): string {
            let s: string = this.selectedSchemeName;
            return (s.length == 0) ? this._otherSchemeName : s;
        }
        get schemeSeparator(): UriSchemeSeparator {
            return (this.isCustomScheme) ? this.selectedSchemeSeparator : UriBuilderController._schemeOptions[this._selectedSchemIndex].schemeSeparator;
        }
        get schemeOptions(): IUriSchemeOption[] { return UriBuilderController._schemeOptions; }
        get selectedSchemeName(): string { return UriBuilderController._schemeOptions[this._selectedSchemIndex].name; }
        set selectedSchemeName(value: string) {
            for (let index: number = 0; index < UriBuilderController._schemeOptions.length; index++) {
                if (UriBuilderController._schemeOptions[index].name === value) {
                    this.selectedSchemIndex = index;
                    return;
                }
            }
        }
        get isCustomScheme(): boolean { return this.selectedSchemeName.length == 0; }
        get selectedSchemIndex(): number { return this._selectedSchemIndex; }
        set selectedSchemIndex(value: number) {
            if (typeof value !== "number" || isNaN(value) || value < 0 || value >= UriBuilderController._schemeOptions.length || value === this._selectedSchemIndex)
                return;
            this._selectedSchemIndex = value;
            this.validate();
            if (this._isBuildUriMode && this._isAbsolute)
                this.rebuildHref();
        }
        get otherSchemeName(): string { return this._otherSchemeName; }
        set otherSchemeName(value: string) {
            if (this._otherSchemeName === (value = sys.asString(value, "")))
                return;
            this._otherSchemeName = value;
            this.validate();
            if (this._isBuildUriMode && this._isAbsolute && this.isCustomScheme)
                this.rebuildHref();
        }
        get schemeErrorMessage(): string { return (this._isAbsolute) ? this._schemeErrorMessage : ""; }
        get hasSchemeError(): boolean { return this._isAbsolute && this._schemeErrorMessage.length > 0; }
        get schemeSeparatorOptions(): UriSchemeSeparator[] { return UriBuilderController._schemeSeparatorOptions; }
        get selectedSchemeSeparator(): UriSchemeSeparator { return UriBuilderController._schemeSeparatorOptions[this._selectedSchemeSeparatorIndex]; }
        set selectedSchemeSeparator(value: UriSchemeSeparator) {
            for (let index: number = 0; index < UriBuilderController._schemeSeparatorOptions.length; index++) {
                if (UriBuilderController._schemeSeparatorOptions[index] === value) {
                    this.selectedSchemeSeparatorIndex = index;
                    return;
                }
            }
        }
        get selectedSchemeSeparatorIndex(): number { return this._selectedSchemeSeparatorIndex; }
        set selectedSchemeSeparatorIndex(value: number) {
            if (typeof value !== "number" || isNaN(value) || value < 0 || value >= UriBuilderController._schemeSeparatorOptions.length || value === this._selectedSchemeSeparatorIndex)
                return;
            this._selectedSchemeSeparatorIndex = value;
            this.validate();
            if (this._isBuildUriMode && this._isAbsolute && this.isCustomScheme)
                this.rebuildHref();
        }
        get hasAuthority(): boolean { return this._hasAuthority && this._isAbsolute; }
        set hasAuthority(value: boolean) {
            if (this._hasAuthority === (value = sys.asBoolean(value, false)))
                return;
            this._hasAuthority = value;
            this.validate();
            if (this._isBuildUriMode && this._isAbsolute)
                this.rebuildHref();
        }
        get hasUserInfo(): boolean { return this._hasUserInfo && this.hasAuthority; }
        set hasUserInfo(value: boolean) {
            if (this._hasUserInfo === (value = sys.asBoolean(value, false)))
                return;
            this._hasUserInfo = value;
            if (this._isBuildUriMode && this._isAbsolute && this.hasAuthority)
                this.rebuildHref();
        }
        get userName(): string { return (this.hasUserInfo) ? this._userName : ""; }
        set userName(value: string) {
            if (this._userName === (value = sys.asString(value, "")))
                return;
            this._userName = value;
            if (this._isBuildUriMode && this._isAbsolute && this.hasUserInfo)
                this.rebuildHref();
        }
        get hasPassword(): boolean { return this._hasPassword && this.hasUserInfo; }
        set hasPassword(value: boolean) {
            if (this._hasPassword === (value = sys.asBoolean(value, false)))
                return;
            this._hasPassword = value;
            if (this._isBuildUriMode && this._isAbsolute && this.hasUserInfo)
                this.rebuildHref();
        }
        get password(): string { return (this.hasPassword) ? this._password : ""; }
        set password(value: string) {
            if (this._password === (value = sys.asString(value, "")))
                return;
            this._password = value;
            if (this._isBuildUriMode && this._isAbsolute && this.hasPassword)
                this.rebuildHref();
        }
        get hostName(): string { return (this.hasAuthority) ? this._hostName : ""; }
        set hostName(value: string) {
            if (this._hostName === (value = sys.asString(value, "")))
                return;
            this._hostName = value;
            this.validate();
            if (this._isBuildUriMode && this.hasAuthority)
                this.rebuildHref();
        }
        get hasPort(): boolean { return this._hasPort && this.hasAuthority; }
        set hasPort(value: boolean) {
            if (this._hasPort === (value = sys.asBoolean(value, false)))
                return;
            this._hasPort = value;
            this.validate();
            if (this._isBuildUriMode && this.hasAuthority)
                this.rebuildHref();
        }
        get usingDefaultPort(): boolean { return this.isAbsolute && (!this.hasPort || this._portNumber.trim().length == 0) && !isNaN(this._defaultPort); }
        get portNumber(): string { return (this.hasPort) ? this._portNumber : ""; }
        set portNumber(value: string) {
            if (this._portNumber === (value = sys.asString(value, "")))
                return;
            this._portNumber = value;
            this.validate();
            if (this._isBuildUriMode && this._isAbsolute)
                this.rebuildHref();
        }
        get portValue(): number { return this._portValue; }
        get portDisplayText(): string {
            if (this.isAbsolute) {
                let n: number;
                if (this.hasPort) {
                    n = this._portValue;
                    return (isNaN(n)) ? this._portNumber : n.toString();
                }
                n = this._defaultPort;
                if (!isNaN(n))
                    return n.toString();
            }
            return "";
        }
        get hasPortError(): boolean { return this.hasPort && this._portErrorMessage.length > 0; }
        get portErrorMessage(): string { return (this.hasPortError) ? this._portErrorMessage : ""; }

        get isBuildPathMode(): boolean { return this._isBuildUriMode && this._isBuildPathMode; }
        set isBuildPathMode(value: boolean) {
            if (this._isBuildPathMode === (value = value == true))
                return;
            this._isBuildPathMode = value;
            this.validate();
        }
        get isParsePathMode(): boolean { return this._isBuildUriMode && !this._isBuildPathMode; }
        get pathSegments(): UriBuilderPathSegment[] { return this._pathSegments; }
        get pathString(): string { return this._pathString; }
        set pathString(value: string) {
            if (this._pathString === (value = sys.asString(value, "")))
                return;
            this._pathString = value;
            if (this.isParsePathMode)
                this.rebuildHref();
        }

        get isBuildQueryMode(): boolean { return this._isBuildUriMode && this._isBuildQueryMode; }
        set isBuildQueryMode(value: boolean) {
            if (this._isBuildQueryMode === (value = value == true))
                return;
            this._isBuildQueryMode = value;
        }
        get isParseQueryMode(): boolean { return this._isBuildUriMode && !this._isBuildQueryMode; }
        get hasQuery(): boolean { return this._hasQuery; }
        set hasQuery(value: boolean) {
            if (this._hasQuery === (value = sys.asBoolean(value, false)))
                return;
            this._hasQuery = value;
            if (this._isBuildUriMode)
                this.rebuildHref();
        }
        get queryValues(): UriBuilderQueryItem[] { return this._queryValues; }
        get queryString(): string { return this._queryString; }
        set queryString(value: string) {
            if (this._queryString === (value = sys.asString(value, "")))
                return;
            this._queryString = value;
            if (this.isParseQueryMode)
                this.rebuildHref();
        }

        get hasFragment(): boolean { return this._hasFragment; }
        set hasFragment(value: boolean) {
            if (this._hasFragment === (value = sys.asBoolean(value, false)))
                return;
            this._hasFragment = value;
            if (this._isBuildUriMode)
                this.rebuildHref();
        }
        get fragment(): string { return this._fragment; }
        set fragment(value: string) {
            if (this._fragment === (value = sys.asString(value, "")))
                return;
            this._fragment = value;
            if (this._isBuildUriMode)
                this.rebuildHref();
        }

        get parseUriButtonClass(): string[] { return ["btn", (this._isBuildUriMode) ? "btn-primary" : "btn-secondary"]; }

        get buildUriButtonClass(): string[] { return ["btn", (this._isBuildUriMode) ? "btn-secondary" : "btn-primary"]; }

        constructor() {
            let controller: UriBuilderController = this;
            UriBuilderPathSegment.push(this._pathSegments, "", "", () => {
                if (controller.isBuildPathMode)
                    controller.rebuildPath();
            }, (item: UriBuilderPathSegment) => {
                if (UriBuilderPathSegment.deleteItem(controller._pathSegments, item) && controller.isBuildPathMode)
                    controller.rebuildPath();
            });
        }


        validate(): void {
            if (this.isAbsolute) {
                let opt: IUriSchemeOption = UriBuilderController._schemeOptions[this._selectedSchemIndex];
                if (opt.name.length == 0) {
                    let m: RegExpExecArray = uriSchemeParseRe.exec(this._otherSchemeName);
                    if (sys.isNil(m))
                        this._schemeErrorMessage = (this._otherSchemeName.trim().length == 0) ? "Scheme name cannot be empty." : "Invalid scheme name.";
                    else {
                        opt = UriBuilderController._schemeOptions.filter((v: IUriSchemeOption) => v.name === this._otherSchemeName).concat(opt)[0];
                        this._schemeErrorMessage = "";
                    }
                } else
                    this._schemeErrorMessage = "";
                this._defaultPort = (typeof opt.defaultPort == "number") ? opt.defaultPort : NaN;
                if (this.hasAuthority) {
                    if (this.hasPort) {
                        let s: string = this._portNumber.trim();
                        if (s.length == 0) {
                            this._portValue = this._defaultPort;
                            this._portErrorMessage = "Port cannot be empty.";
                        } else {
                            this._portValue = parseInt(s);
                            if (isNaN(this._portValue))
                                this._portErrorMessage = "Invalid port number.";
                            else if (this._portValue < 1 || this._portValue > 65535)
                                this._portErrorMessage = "Port number out of range.";
                            else
                                this._portErrorMessage = "";
                        }
                    }
                } else {
                    this._portValue = this._defaultPort;
                    this._portErrorMessage = "";
                }
            } else {
                this._portValue = this._defaultPort = NaN;
                this._schemeErrorMessage = this._portErrorMessage = "";
            }
        }

        rebuildHref() {
            let path: string = this._pathString;
            if (this.isAbsolute) {
                if (path.length > 0 && (!path.startsWith("/") || path.startsWith("\\") || path.startsWith(":")))
                    path = "/" + path;
                let href: string = this.schemeName + this.schemeSeparator;
                if (this.hasUserInfo)
                    href += ((this.hasPassword) ? encodeURIComponent(this.userName) + ":" + encodeURIComponent(this.password) : encodeURIComponent(this.userName)) + "@";
                href += this.hostName;
                if (this.hasPort)
                    href += ":" + this.portNumber;
                path = ((path.length > 0 && (!path.startsWith("/") || path.startsWith("\\") || path.startsWith(":"))) ? href + "/" : href) + path;
            }
            if (this.hasQuery)
                path += "?" + this._queryString;
            this._href = (this.hasFragment) ? path + "#" + encodeURI(this.fragment) : path;
        }

        rebuildQuery(): void {
            let s: string = this._queryValues.map((value: UriBuilderQueryItem) => (value.hasValue) ? encodeURIComponent(value.key) + "=" + encodeURIComponent(value.value) : encodeURIComponent(value.key)).join("&");
            if (s !== this._queryString) {
                this._queryString = s;
                this.rebuildHref();
            }
        }

        rebuildPath(): void {
            let s: string = this._pathSegments.map((value: UriBuilderPathSegment) => value.leadingSeparator + encodeURIComponent(value.name)).join("");
            if (s !== this._pathString) {
                this._pathString = s;
                this.rebuildHref();
            }
        }

        $onInit(): void { }
    }
    app.appModule.controller("uriBuilderController_old", ["$Scope", UriBuilderController]);
}
