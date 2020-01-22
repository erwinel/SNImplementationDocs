/// <reference path="../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../Scripts/typings/angularjs/angular.d.ts"/>

interface IUriTesterScope extends ng.IScope {
    disableHref: boolean;
    hrefText: string;
    originText: string;
    disableProtocol: boolean;
    protocolText: string;
    disableUsername: boolean;
    usernameText: string;
    disablePassword: boolean;
    passwordText: string;
    disableHost: boolean;
    hostText: string;
    disableHostname: boolean;
    hostnameText: string;
    disablePort: boolean;
    portText: string;
    disablePathname: boolean;
    pathnameText: string;
    disableSearch: boolean;
    searchText: string;
    disableHash: boolean;
    hashText: string;
    relativeUrlText: string;
    errorMessage: string;
    showError: boolean;
}

class UriTesterController implements ng.IController {
    private _mode: string;
    private _enableUsername: boolean = false;
    private _enablePassword: boolean = false;
    private _enablePort: boolean = false;
    private _enablePathname: boolean = false;
    private _enableSearch: boolean = false;
    private _enableHash: boolean = false;

    get isBuild(): boolean { return this._mode === "build"; }
    get isParseHost(): boolean { return this._mode === "parseHost"; }
    get isParseHref(): boolean { return this._mode === "parseHref"; }
    get mode(): string { return this._mode; }
    set mode(value: string) {
        if (this._mode === value)
            return;
        
        this._mode = value;
        switch (value) {
            case "build":
                this.$scope.disableHash = !this._enableHash;
                this.$scope.disableHost = true;
                this.$scope.disableHostname = false;
                this.$scope.disableHref = true;
                this.$scope.disablePassword = !(this._enableUsername && this._enablePassword);
                this.$scope.disablePathname = !this._enablePathname;
                this.$scope.disablePort = !this._enablePort;
                this.$scope.disableProtocol = false;
                this.$scope.disableSearch = !this._enableSearch;
                this.$scope.disableUsername = !this._enableUsername;
                this.rebuild();
                return;
            case "parseHost":
                this.$scope.disableHash = !this._enableHash;
                this.$scope.disableHost = false;
                this.$scope.disableHostname = true;
                this.$scope.disableHref = true;
                this.$scope.disablePassword = !(this._enableUsername && this._enablePassword);
                this.$scope.disablePathname = !this._enablePathname;
                this.$scope.disablePort = true;
                this.$scope.disableProtocol = false;
                this.$scope.disableSearch = !this._enableSearch;
                this.$scope.disableUsername = !this._enableUsername;
                this.rebuild();
                return;
            case "parseHref":
                break;
            default:
                this._mode = "parseHref";
                break;
        }
        this.$scope.relativeUrlText = "";
        this.$scope.disableHash = true;
        this.$scope.disableHost = true;
        this.$scope.disableHostname = true;
        this.$scope.disableHref = false;
        this.$scope.disablePassword = true;
        this.$scope.disablePathname = true;
        this.$scope.disablePort = true;
        this.$scope.disableProtocol = true;
        this.$scope.disableSearch = true;
        this.$scope.disableUsername = true;
        this.rebuild();
    }

    get enableUsername(): boolean { return this._enableUsername; }
    set enableUsername(value: boolean) {
        if ((value = (typeof value === "string") ? value === "true" : value == true) === this._enableUsername)
            return;
        this._enableUsername = value;
        if (this.isParseHref)
            return;
        this.$scope.disablePassword = !value;
        this.$scope.disableUsername = !value;
        this.$scope.disablePassword = this.$scope.disableUsername || !this._enablePassword;
        this.rebuild();
    }

    get enablePassword(): boolean { return this._enablePassword; }
    set enablePassword(value: boolean) {
        if ((value = (typeof value === "string") ? value === "true" : value == true) === this._enablePassword)
            return;
        this._enablePassword = value;
        if (this.isParseHref)
            return;
        this.$scope.disablePassword = !value;
        if (value)
            this._enableUsername = true;
        this.rebuild();
    }

    get enablePort(): boolean { return this._enablePort; }
    set enablePort(value: boolean) {
        if ((value = (typeof value === "string") ? value === "true" : value == true) === this._enablePort)
            return;
        this._enablePort = value;
        if (this.isParseHref || this.isParseHost)
            return;
        this.$scope.disablePort = !value;
        this.rebuild();
    }

    get enablePathname(): boolean { return this._enablePathname; }
    set enablePathname(value: boolean) {
        if ((value = (typeof value === "string") ? value === "true" : value == true) === this._enablePathname)
            return;
        this._enablePathname = value;
        if (this.isParseHref)
            return;
        this.$scope.disablePathname = !value;
        this.rebuild();
    }

    get enableSearch(): boolean { return this._enableSearch; }
    set enableSearch(value: boolean) {
        if ((value = (typeof value === "string") ? value === "true" : value == true) === this._enableSearch)
            return;
        this._enableSearch = value;
        if (this.isParseHref)
            return;
        this.$scope.disableSearch = !value;
        this.rebuild();
    }

    get enableHash(): boolean { return this._enableHash; }
    set enableHash(value: boolean) {
        if ((value = (typeof value === "string") ? value === "true" : value == true) === this._enableHash)
            return;
        this._enableHash = value;
        if (this.isParseHref)
            return;
        this.$scope.disableHash = !value;
        this.rebuild();
    }

    rebuild(event?: BaseJQueryEventObject): void {
        if (typeof event === "object" && event !== null)
            event.preventDefault();
        let url: URL;
        if (this.isParseHref) {
            try {
                url = new URL(this.$scope.hrefText);
            } catch (e) {
                this.$scope.errorMessage = 'Error parsing HREF: ' + e;
                this.$scope.showError = true;
                return;
            }
            if (this.$scope.relativeUrlText.trim().length > 0) {
                try {
                    url = new URL(this.$scope.relativeUrlText, url);
                } catch (e) {
                    this.$scope.errorMessage = 'Error parsing relative URL: ' + e;
                    this.$scope.showError = true;
                    return;
                }
            }
            this.$scope.originText = url.origin;
            this.$scope.protocolText = url.protocol;
            this.$scope.passwordText = url.password;
            this._enablePassword = typeof url.password === "string" && url.password.trim().length > 0;
            this.$scope.usernameText = url.username;
            this._enableUsername = this._enablePassword || (typeof url.username === "string" && url.username.trim().length > 0);
            this.$scope.hostText = url.host;
            this.$scope.hostnameText = url.hostname;
            this.$scope.portText = url.port;
            this._enablePort = typeof url.port === "string" && url.port.trim().length > 0;
            this.$scope.pathnameText = url.pathname;
            this._enablePathname = typeof url.pathname === "string" && url.pathname.trim().length > 0;
            this.$scope.searchText = url.search;
            this._enableSearch = typeof url.search === "string" && url.search.trim().length > 0;
            this.$scope.hashText = url.hash;
            this._enableHash = typeof url.hash === "string" && url.hash.trim().length > 0;
            this.$scope.showError = false;
        } else {
            url = new URL("http://tempuri.org");
            try { url.protocol = this.$scope.protocolText; }
            catch (e) {
                this.$scope.errorMessage = 'Error parsing protocol: ' + e;
                this.$scope.showError = true;
                return;
            }
            if (this._enableUsername) {
                try { url.username = this.$scope.usernameText; }
                catch (e) {
                    this.$scope.errorMessage = 'Error parsing username: ' + e;
                    this.$scope.showError = true;
                    return;
                }
                if (this._enablePassword) {
                    try { url.password = this.$scope.passwordText; }
                    catch (e) {
                        this.$scope.errorMessage = 'Error parsing password: ' + e;
                        this.$scope.showError = true;
                        return;
                    }
                }
            }
            if (this.isParseHost) {
                try { url.host = this.$scope.hostText; }
                catch (e) {
                    this.$scope.errorMessage = 'Error parsing host: ' + e;
                    this.$scope.showError = true;
                    return;
                }
                this.$scope.hostnameText = url.hostname;
                this.$scope.portText = url.port;
                this._enablePort = typeof url.port === "string" && url.port.trim().length > 0;
            } else {
                try { url.hostname = this.$scope.hostnameText; }
                catch (e) {
                    this.$scope.errorMessage = 'Error parsing hostname: ' + e;
                    this.$scope.showError = true;
                    return;
                }
                if (this._enablePort) {
                    try { url.port = this.$scope.portText; }
                    catch (e) {
                        this.$scope.errorMessage = 'Error parsing port: ' + e;
                        this.$scope.showError = true;
                        return;
                    }
                }
            }
            if (this._enablePathname) {
                try { url.pathname = this.$scope.pathnameText; }
                catch (e) {
                    this.$scope.errorMessage = 'Error parsing pathname: ' + e;
                    this.$scope.showError = true;
                    return;
                }
            }
            if (this._enableSearch) {
                try { url.search = this.$scope.searchText; }
                catch (e) {
                    this.$scope.errorMessage = 'Error parsing search: ' + e;
                    this.$scope.showError = true;
                    return;
                }
            }
            if (this._enableHash) {
                try { url.hash = this.$scope.hashText; }
                catch (e) {
                    this.$scope.errorMessage = 'Error parsing hash: ' + e;
                    this.$scope.showError = true;
                    return;
                }
            }
            if (this.$scope.relativeUrlText.trim().length > 0) {
                try {
                    url = new URL(this.$scope.relativeUrlText, url);
                } catch (e) {
                    this.$scope.errorMessage = 'Error parsing relative URL: ' + e;
                    this.$scope.showError = true;
                    return;
                }
                this.$scope.relativeUrlText = "";
            }
            this.$scope.showError = false;
            this.$scope.hrefText = url.href;
            this.$scope.originText = url.origin;
        }
    }

    constructor(private readonly $scope: IUriTesterScope) {
        $scope.hrefText = "http://tempuri.org";
        $scope.relativeUrlText = "";
        this.mode = "parseHref";
    }

    $onInit() { }
}

angular.module("myApp", []).controller("myController", ['$scope', UriTesterController]);
