/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />

namespace uriBuilder {
    const CSS_CLASS_VALID: string = "is-valid";
    const CSS_CLASS_INVALID: string = "is-invalid";
    const CSS_CLASS_TEXT_WARNING: string = "text-warning";

    enum ValidationStatus {
        Success,
        Warning,
        Error
    }
    interface IFieldWithValidationScope extends ng.IScope {
        fieldName: string;
        inputText: string;
        validationStatus: ValidationStatus;
        cssClass: string[];
        validationMessage: string;
        onChange(): void;
    }
    interface IOptionFieldScope extends ng.IScope {
        isChecked: boolean;
        enableRelated: boolean;
        onChange(): void;
    }
    interface IUriBuilderScope extends ng.IScope {
        href: IFieldWithValidationScope;
        hasOrigin: IOptionFieldScope;
        schemeOptions: IUriSchemeOption[];
        selectedScheme: string;
        currentScheme: IUriSchemeOption;
        scheme: IFieldWithValidationScope;
        selectedSeparator: "" | UriSchemeSeparator;
        separatorOptions: UriSchemeSeparator[];
        hasUsername: IOptionFieldScope;
        username: IFieldWithValidationScope;
        hasPassword: IOptionFieldScope;
        password: IFieldWithValidationScope;
        hasHost: IOptionFieldScope;
        host: IFieldWithValidationScope;
        hasPort: IOptionFieldScope;
        port: IFieldWithValidationScope;
        pathString: IFieldWithValidationScope;
        hasQuery: IOptionFieldScope;
        queryString: IFieldWithValidationScope;
        hasFragment: IOptionFieldScope;
        fragment: IFieldWithValidationScope;
    }

    class optionField {
        private _enableRelated: boolean = true;
        private _isChecked: boolean = false;

        get isChecked(): boolean { return this._isChecked; }
        set isChecked(value: boolean) {
            if (this._isChecked === value)
                return;
            this._isChecked = this.$Scope.isChecked = value;
            this.$Scope.enableRelated = this._enableRelated && this._isChecked;
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback(!this._isChecked, this._isChecked);
        }

        get enableRelated(): boolean { return this._enableRelated; }
        set enableRelated(value: boolean) {
            if (this._enableRelated === value)
                return;
            this._enableRelated = value;
            if (value) {
                let isChecked: boolean = (this.$Scope.isChecked == true);
                this.$Scope.enableRelated = isChecked;
                if (this._isChecked != isChecked) {
                    this._isChecked = isChecked;
                    if (typeof this._onChangeCallback === "function")
                        this._onChangeCallback(!this._isChecked, this._isChecked);
                }
            } else
                this.$Scope.enableRelated = false;
        }

        constructor(protected $Scope: IOptionFieldScope, private readonly _onChangeCallback?: Function) {
            $Scope.isChecked = this._isChecked;
            $Scope.enableRelated = this._enableRelated && this._isChecked;
            let current: optionField = this;
            $Scope.onChange = () => {
                if (current._isChecked === ($Scope.isChecked == true) || !current._enableRelated)
                    return;
                current._isChecked = ($Scope.isChecked == true);
                $Scope.enableRelated = current._enableRelated && current._isChecked;
                if (typeof current._onChangeCallback === "function")
                    current._onChangeCallback(!current._isChecked, current._isChecked);
            };
        }

        setWithoutChangeNotify(value: boolean): void {
            this._isChecked = this.$Scope.isChecked = value;
            this.$Scope.enableRelated = this._enableRelated && this._isChecked;
        }
    }
    abstract class FieldWithValidation {
        private _originalText: string;
        private _outputText: string;

        get inputText(): string { return this.$Scope.inputText; }
        set inputText(text: string) {
            this.$Scope.inputText = (typeof text === "string") ? text : "";
            let newValue: string = this.coerceOutput(this.$Scope.inputText);
            if (newValue === this._originalText)
                return;
            this._originalText = newValue;
            this.validate();
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }

        get outputText(): string { return this._outputText; }

        get validationMessage(): string { return this.$Scope.validationMessage; }

        get validationStatus(): ValidationStatus {
            let result: ValidationStatus = this.$Scope.validationStatus;
            if ((typeof result !== "number") || isNaN(result))
                this.$Scope.validationStatus = result = (((typeof this.$Scope.validationMessage !== "string") || this.$Scope.validationMessage.length == 0) ? ValidationStatus.Success : ValidationStatus.Error);
            return result;
        }

        constructor(readonly name: string, protected $Scope: IFieldWithValidationScope, private readonly _onChangeCallback?: Function) {
            $Scope.inputText = "";
            $Scope.fieldName = name;
            $Scope.validationStatus = ValidationStatus.Success;
            $Scope.cssClass = [CSS_CLASS_VALID];
            $Scope.validationMessage = "";
            let current: FieldWithValidation = this;
            $Scope.onChange = () => {
                let newValue: string = this.coerceOutput(this.$Scope.inputText);
                if (newValue === this._originalText)
                    return;
                this._originalText = newValue;
                this.validate();
                if (typeof this._onChangeCallback === "function")
                    this._onChangeCallback();
            };
        }

        setWithoutChangeNotify(text: string) {
            this.$Scope.inputText = (typeof text === "string") ? text : "";
            let newValue: string = this.coerceOutput(this.$Scope.inputText);
            if (newValue === this._originalText)
                return;
            this._originalText = newValue;
            this.validate();
        }

        protected validate(): ValidationStatus {
            let newValue: string = this.coerceOutput(this.$Scope.inputText);
            if (newValue === this._outputText)
                return this.validationStatus;
            this._outputText = newValue;
            let message: string | ValidationStatus | [string, ValidationStatus] = this.getValidationMessage(newValue);
            if (typeof message === "string")
                this.setValidation(message);
            else if (typeof message === "number")
                this.setValidation("", message);
            else if ((typeof message === "object") && message !== null && Array.isArray(message))
                this.setValidation(message[0], message[1]);
            else 
                this.setValidation("");
            
            this.$Scope.cssClass = (this.$Scope.validationStatus == ValidationStatus.Warning) ? [CSS_CLASS_INVALID, CSS_CLASS_TEXT_WARNING] : [(this.$Scope.validationStatus == ValidationStatus.Success) ? CSS_CLASS_VALID : CSS_CLASS_INVALID];
            return this.validationStatus;
        }

        setValidText(text: string) {
            this.$Scope.inputText = this._originalText = this._outputText = this.coerceOutput(text);
            this.$Scope.cssClass = [CSS_CLASS_VALID];
            this.$Scope.validationMessage = "";
            this.$Scope.isValid = true;
            if (typeof this._onChangeCallback === "function")
                this._onChangeCallback();
        }

        protected coerceOutput(inputText: string) { return (typeof inputText === "string") ? inputText : ""; }
        protected abstract getValidationMessage(inputText: string): string | ValidationStatus | [string, ValidationStatus];
        setValidation(message: string, status?: ValidationStatus) {
            if ((typeof message === "string") && (message = message.trim()).length > 0) {
                this.$Scope.validationMessage = message;
                this.$Scope.validationStatus = (isNaN(status)) ? ValidationStatus.Success : ((status === ValidationStatus.Success || status === ValidationStatus.Warning) ? status : ValidationStatus.Error);
            } else if (typeof status === "number" && !isNaN(status)) {
                switch (status) {
                    case ValidationStatus.Success:
                        this.$Scope.validationMessage = "";
                        this.$Scope.validationStatus = ValidationStatus.Success;
                        break;
                    case ValidationStatus.Warning:
                        this.$Scope.validationMessage = "Invalid value";
                        this.$Scope.validationStatus = ValidationStatus.Warning;
                        break;
                    default:
                        this.$Scope.validationMessage = "Invalid value";
                        this.$Scope.validationStatus = ValidationStatus.Error;
                        break;
                }
            } else {
                this.$Scope.validationMessage = "";
                this.$Scope.validationStatus = ValidationStatus.Success;
            }
        }
    }
    class HrefField extends FieldWithValidation {
        constructor(name: string, $Scope: IFieldWithValidationScope, onChangeCallback?: Function) { super(name, $Scope, onChangeCallback); }
        protected getValidationMessage(inputText: string): string | ValidationStatus | [string, ValidationStatus] { return ""; }
        setValidTextAndStatus(text: string, message: string): void {
            this.setValidText(text);
            
        }
    }
    class SchemeField extends FieldWithValidation {
        constructor(name: string, $Scope: IFieldWithValidationScope, onChangeCallback?: Function) { super(name, $Scope, onChangeCallback); }
        protected getValidationMessage(inputText: string): string | ValidationStatus | [string, ValidationStatus] { return ""; }
    }
    class UserNameField extends FieldWithValidation {
        constructor(name: string, $Scope: IFieldWithValidationScope, onChangeCallback?: Function) { super(name, $Scope, onChangeCallback); }
        protected getValidationMessage(inputText: string): string | ValidationStatus | [string, ValidationStatus] { return ""; }
    }
    class PasswordField extends FieldWithValidation {
        constructor(name: string, $Scope: IFieldWithValidationScope, onChangeCallback?: Function) { super(name, $Scope, onChangeCallback); }
        protected getValidationMessage(inputText: string): string | ValidationStatus | [string, ValidationStatus] { return ""; }
    }
    class HostField extends FieldWithValidation {
        constructor(name: string, $Scope: IFieldWithValidationScope, onChangeCallback?: Function) { super(name, $Scope, onChangeCallback); }
        protected getValidationMessage(inputText: string): string | ValidationStatus | [string, ValidationStatus] { return ""; }
    }
    class PortField extends FieldWithValidation {
        constructor(name: string, $Scope: IFieldWithValidationScope, onChangeCallback?: Function) { super(name, $Scope, onChangeCallback); }
        protected getValidationMessage(inputText: string): string | ValidationStatus | [string, ValidationStatus] { return ""; }
    }
    class PathStringField extends FieldWithValidation {
        constructor(name: string, $Scope: IFieldWithValidationScope, onChangeCallback?: Function) { super(name, $Scope, onChangeCallback); }
        protected getValidationMessage(inputText: string): string | ValidationStatus | [string, ValidationStatus] { return ""; }
    }
    class QueryStringField extends FieldWithValidation {
        constructor(name: string, $Scope: IFieldWithValidationScope, onChangeCallback?: Function) { super(name, $Scope, onChangeCallback); }
        protected getValidationMessage(inputText: string): string | ValidationStatus | [string, ValidationStatus] { return ""; }
    }
    class FragmentField extends FieldWithValidation {
        constructor(name: string, $Scope: IFieldWithValidationScope, onChangeCallback?: Function) { super(name, $Scope, onChangeCallback); }
        protected getValidationMessage(inputText: string): string | ValidationStatus | [string, ValidationStatus] { return ""; }
    }
    class UriBuilderController implements ng.IController {
        private _href: HrefField;
        private _hasOrigin: optionField;
        private _hasUsername: optionField;
        private _hasPassword: optionField;
        private _hasHost: optionField;
        private _hasPort: optionField;
        private _hasQuery: optionField;
        private _hasFragment: optionField;
        private _selectedScheme: string;
        private _selectedSeparator: UriSchemeSeparator;
        private _scheme: SchemeField;
        private _currrentScheme: UriSchemeInfo;
        private _username: UserNameField;
        private _password: PasswordField;
        private _host: HostField;
        private _port: PortField;
        private _pathString: PathStringField;
        private _queryString: QueryStringField;
        private _fragment: FragmentField;

        constructor(protected readonly $Scope: IUriBuilderScope) {
            $Scope.href = <IFieldWithValidationScope>($Scope.$new());
            $Scope.hasOrigin = <IOptionFieldScope>($Scope.$new());
            $Scope.hasUsername = <IOptionFieldScope>($Scope.$new());
            $Scope.hasPassword = <IOptionFieldScope>($Scope.$new());
            $Scope.hasHost = <IOptionFieldScope>($Scope.$new());
            $Scope.hasPort = <IOptionFieldScope>($Scope.$new());
            $Scope.hasQuery = <IOptionFieldScope>($Scope.$new());
            $Scope.hasFragment = <IOptionFieldScope>($Scope.$new());
            $Scope.schemeOptions = [
                UriSchemeInfo.uriScheme_https,
                UriSchemeInfo.uriScheme_http,
                UriSchemeInfo.uriScheme_ssh,
                UriSchemeInfo.uriScheme_file,
                UriSchemeInfo.uriScheme_ldap,
                UriSchemeInfo.uriScheme_netPipe,
                UriSchemeInfo.uriScheme_netTcp,
                UriSchemeInfo.uriScheme_wais,
                UriSchemeInfo.uriScheme_mailto,
                UriSchemeInfo.uriScheme_ftp,
                UriSchemeInfo.uriScheme_ftps,
                UriSchemeInfo.uriScheme_sftp,
                UriSchemeInfo.uriScheme_git,
                UriSchemeInfo.uriScheme_news,
                UriSchemeInfo.uriScheme_nntp,
                UriSchemeInfo.uriScheme_tel,
                UriSchemeInfo.uriScheme_telnet,
                UriSchemeInfo.uriScheme_gopher,
                UriSchemeInfo.uriScheme_urn,
                <IUriSchemeOption>{ name: "", displayText: "(other)" }
            ];
            $Scope.separatorOptions = ["://", ":", ":/"];
            $Scope.selectedScheme = this._selectedScheme = ($Scope.currentScheme = this._currrentScheme = UriSchemeInfo.uriScheme_https).name;
            $Scope.selectedSeparator = <UriSchemeSeparator>$Scope.currentScheme.name;

            let controller: UriBuilderController = this;
            this._href = new HrefField("Full URI", $Scope.href, () => controller.onHrefChanged());
            this._hasOrigin = new optionField($Scope.hasOrigin, () => { controller.onHasOriginChange(); });
            this._hasUsername = new optionField($Scope.hasUsername, () => {
                controller._hasPassword.enableRelated = controller._hasUsername.isChecked;
                controller.rebuildHref();
            });
            this._hasPassword = new optionField($Scope.hasPassword, () => { controller.rebuildHref(); });
            this._hasHost = new optionField($Scope.hasHost, () => {
                controller._hasPort.enableRelated = controller._hasHost.isChecked;
                controller.rebuildHref();
            });
            this._hasPort = new optionField($Scope.hasPort, () => { controller.rebuildHref(); });
            this._hasQuery = new optionField($Scope.hasQuery, () => { controller.rebuildHref(); });
            this._hasFragment = new optionField($Scope.hasFragment, () => { controller.rebuildHref(); });
            this._scheme = new SchemeField("Scheme", $Scope.scheme, () => { controller.onSchemeChange(); });
            this._username = new UserNameField("User Name", $Scope.username, () => { controller.rebuildHref(); });
            this._password = new PasswordField("Password", $Scope.password, () => { controller.rebuildHref(); });
            this._host = new HostField("Host Name", $Scope.host, () => { controller.rebuildHref(); });
            this._port = new PortField("Port", $Scope.port, () => { controller.rebuildHref(); });
            this._pathString = new PathStringField("Path", $Scope.pathString, () => { controller.rebuildHref(); });
            this._queryString = new QueryStringField("Query", $Scope.queryString, () => { controller.rebuildHref(); });
            this._fragment = new FragmentField("Fragment", $Scope.fragment, () => { controller.rebuildHref(); });
        }
        private onSchemeChange(): void {
            let selectedScheme: string = (typeof this.$Scope.selectedScheme === "string") ? this.$Scope.selectedScheme : "";
            if (selectedScheme !== this._selectedScheme) {
                if (selectedScheme.length == 0) {
                    this._selectedScheme = "";
                    this.$Scope.selectedSeparator = this._selectedSeparator = this.$Scope.currentScheme.schemeSeparator;
                    this._scheme.setValidText(this._currrentScheme.name);
                    return;
                }
                this._selectedScheme = this.$Scope.selectedScheme;
                this.$Scope.currentScheme = this._currrentScheme = UriSchemeInfo.getSchemaProperties(this._selectedScheme);
            } else if (this._selectedScheme.length == 0) {
                if (this._scheme.validationStatus === ValidationStatus.Error)
                    return;
                if ((this.$Scope.selectedSeparator === "://" || this.$Scope.selectedSeparator === ":/" || this.$Scope.selectedSeparator === ":"))
                    this._selectedSeparator = this.$Scope.selectedSeparator;
                else
                    this.$Scope.selectedSeparator = this._selectedSeparator;
                let scheme: UriSchemeInfo = UriSchemeInfo.getSchemaProperties(this._scheme.outputText);
                this.$Scope.currentScheme = this._currrentScheme = (scheme.schemeSeparator === this._selectedSeparator) ? scheme : new UriSchemeInfo(scheme.name, {
                    defaultPort: scheme.defaultPort, requiresHost: scheme.requiresHost, requiresUsername: scheme.requiresUsername, schemeSeparator: this._selectedSeparator, supportsCredentials: scheme.supportsCredentials, supportsFragment: scheme.supportsFragment,
                    supportsHost: scheme.supportsHost, supportsPath: scheme.supportsPath, supportsPort: scheme.supportsPort, supportsQuery: scheme.supportsQuery
                }, scheme.description);
            }
            this.rebuildHref();
        }
        onHasOriginChange(): void {
            if (this._hasOrigin.isChecked) {
                this._hasUsername.enableRelated = true;
                if (this._hasUsername.isChecked)
                    this._hasPassword.enableRelated = true;
                this._hasHost.enableRelated = true;
                if (this._hasHost.isChecked)
                    this._hasPort.enableRelated = true;
            } else
                this._hasUsername.enableRelated = this._hasPassword.enableRelated = this._hasHost.enableRelated = this._hasPort.enableRelated = false;
            this.rebuildHref();
        }
        rebuildHref(): void {
            let validationFields: FieldWithValidation[] = [this._pathString];
            if (this._hasOrigin.isChecked) {
                if (this._selectedScheme.length == 0)
                    validationFields.push(this._scheme);
                if (this._hasUsername.isChecked) {
                    validationFields.push(this._username);
                    if (this._hasPassword.isChecked)
                        validationFields.push(this._password);
                }
                if (this._hasHost.isChecked) {
                    validationFields.push(this._host);
                    if (this._hasPort.isChecked)
                        validationFields.push(this._port);
                }
            }
            if (this._hasQuery)
                validationFields.push(this._queryString);
            if (this._hasFragment)
                validationFields.push(this._fragment);
            if (validationFields.filter((f: FieldWithValidation) => f.validationStatus == ValidationStatus.Error).length > 0)
                return;
            let href: string = "";
            if (this._hasOrigin.isChecked) {
                href = this._currrentScheme.name + this._currrentScheme.schemeSeparator;
                if (this._hasUsername.isChecked) {
                    href += encodeURIComponent(this._username.outputText);
                    if (this._hasPassword.isChecked)
                        href += ":" + encodeURIComponent(this._password.outputText);
                    href += "@";
                }
                if (this._hasHost.isChecked) {
                    href += this._host.outputText;
                    if (this._hasPort.isChecked)
                        href += ":" + this._port.outputText;
                }

                if (this._pathString.outputText.length > 0 && !this._pathString.outputText.startsWith("/"))
                    href += "/";
                if (this._pathString.outputText.length > 0)
                    href += this._pathString.outputText;
            } else
                href = this._pathString.outputText;
            if (this._hasQuery.isChecked)
                href += "?" + this._queryString.outputText;
            this._href.setValidText((this._hasFragment) ? href + "#" + this._fragment.outputText : href);
        }

        onHrefChanged(): void {
            let href: string = this._href.outputText;
            let index: number = href.indexOf("#");
            if (index < 0) {
                this._hasFragment.setWithoutChangeNotify(false);
                this._fragment.setWithoutChangeNotify("");
            } else {
                this._hasFragment.setWithoutChangeNotify(true);
                this._fragment.setWithoutChangeNotify(href.substr(index + 1));
                href = href.substr(0, index);
            }
            index = href.indexOf("?");
            if (index < 0) {
                this._hasQuery.setWithoutChangeNotify(false);
                this._queryString.setWithoutChangeNotify("");
            } else {
                this._hasQuery.setWithoutChangeNotify(true);
                this._queryString.setWithoutChangeNotify(href.substr(index + 1));
                href = href.substr(0, index);
            }

            let scheme: UriSchemeInfo = getUriSchemeInfo(href);

            if (typeof scheme === "object") {
                this._hasOrigin.setWithoutChangeNotify(true);
                // TODO: Parse after scheme
                this.$Scope.currentScheme = this._currrentScheme = scheme;
                let selectedOption: IUriSchemeOption = this.$Scope.schemeOptions.find((value: IUriSchemeOption) => value.name === scheme.name && value.schemeSeparator === scheme.schemeSeparator);
                if ((typeof selectedOption === "object") && selectedOption !== null)
                    this.$Scope.selectedScheme = this._selectedScheme = scheme.name;
                else {
                    this.$Scope.selectedScheme = this._selectedScheme = "";
                    this.$Scope.selectedSeparator = scheme.schemeSeparator;
                }
                href = href.substr(scheme.name.length + scheme.schemeSeparator.length);
                // TODO: Parse for username/password
                // TODO: Parse for host/port
            } else {
                this._hasOrigin.setWithoutChangeNotify(false);
                this._hasUsername.setWithoutChangeNotify(false);
                this._hasPassword.setWithoutChangeNotify(false);
                this._hasHost.setWithoutChangeNotify(false);
                this._hasPort.setWithoutChangeNotify(false);
                this._username.setWithoutChangeNotify("");
                this._password.setWithoutChangeNotify("");
                this._host.setWithoutChangeNotify("");
                this._port.setWithoutChangeNotify("");
            }

            let validationFields: FieldWithValidation[] = [this._pathString];
            if (this._hasOrigin.isChecked) {
                if (this._selectedScheme.length == 0)
                    validationFields.push(this._scheme);
                if (this._hasUsername.isChecked) {
                    validationFields.push(this._username);
                    if (this._hasPassword.isChecked)
                        validationFields.push(this._password);
                }
                if (this._hasHost.isChecked) {
                    validationFields.push(this._host);
                    if (this._hasPort.isChecked)
                        validationFields.push(this._port);
                }
            }
            if (this._hasQuery)
                validationFields.push(this._queryString);
            if (this._hasFragment)
                validationFields.push(this._fragment);
            validationFields = validationFields.filter((f: FieldWithValidation) => f.validationStatus != ValidationStatus.Success);
            if (validationFields.length == 0)
                this._href.setValidation("", ValidationStatus.Success);
            else
                this._href.setValidation((validationFields.length == 1) ? validationFields[0].name + ": " + validationFields[0].validationMessage : validationFields.map((f: FieldWithValidation) => f.name + ": " + f.validationMessage).join("; "),
                    (validationFields.filter((f: FieldWithValidation) => f.validationStatus == ValidationStatus.Error).length == 0) ? ValidationStatus.Warning : ValidationStatus.Error);
        }
        $onInit(): void {

        }
    }
    app.appModule.controller("uriBuilderController", ["$Scope", UriBuilderController]);

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

    export type UriSchemeSeparator = "://" | ":/" | ":";

    const uriSchemeParseRe: RegExp = /^([a-zA-Z_][-.\dA-_a-z~\ud800-\udbff]*)(:[\\/]{0,2})/;

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

}
