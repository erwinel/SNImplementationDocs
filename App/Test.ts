/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />

class AppConfigDataService {
    private _serviceNowUrl: URL = new URL('http://tempuri.org');
    private _serviceNowUrlChangedCallback: { (value: URL): void; } | undefined;

    constructor(private $log: ng.ILogService) {
        $log.info("AppConfigDataService constructor");
    }

    serviceNowUrl(value?: URL): URL {
        if (typeof value === "object" && value !== null && value instanceof URL && this._serviceNowUrl.href !== value.href) {
            this.$log.info("Changing URL");
            this._serviceNowUrl = value;
            this.raiseServiceNowUrlChanged();
        }
        return this._serviceNowUrl;
    }

    onServiceNowUrlChanged<T>(callback: { (this: T, value: URL): void; }, thisArg: T): void;
    onServiceNowUrlChanged(callback: { (value: URL): void; }): void;
    onServiceNowUrlChanged(callback: { (value: URL): void; }, thisArg?: any): void {
        if (typeof callback !== "function")
            return;
        let serviceNowUrlChangedCallback: { (value: URL): void; } | undefined = this._serviceNowUrlChangedCallback;
        if (arguments.length > 1) {
            if (typeof serviceNowUrlChangedCallback === "function")
                this._serviceNowUrlChangedCallback = (value: URL) => { try { serviceNowUrlChangedCallback(value); } finally { callback.call(thisArg, value); } };
            else
                this._serviceNowUrlChangedCallback = (value: URL) => { callback.call(thisArg, value); };
            callback.call(thisArg, this._serviceNowUrl);
            return;
        }
        if (typeof serviceNowUrlChangedCallback === "function")
            this._serviceNowUrlChangedCallback = (value: URL) => { try { serviceNowUrlChangedCallback(value); } finally { callback(value); } };
        else
            this._serviceNowUrlChangedCallback = callback;
        callback(this._serviceNowUrl);
    }

    getServiceNowUrlString(relativeURL?: string) {
        if (typeof relativeURL === "string" && relativeURL.length > 0 && relativeURL !== ".")
            return (new URL(relativeURL, this._serviceNowUrl)).href;
        return this._serviceNowUrl.href;
    }

    private raiseServiceNowUrlChanged() {
        let callback: { (value: URL): void; } = this._serviceNowUrlChangedCallback;
        if (typeof callback === "function")
            callback(this._serviceNowUrl);
    }
}

interface IMainScope extends ng.IScope {
    ctrl: MainController;
    serviceNowUrl: string;
    cssClass: string[];
}

class MainController implements ng.IController {
    constructor(private $scope: IMainScope, private appConfigData: AppConfigDataService, private $log: ng.ILogService) {
        $log.info("MainController constructor start");
        $scope.serviceNowUrl = appConfigData.getServiceNowUrlString();
        $scope.cssClass = ['alert', 'alert-success'];
        $log.info("MainController constructor end");
    }

    changeServiceNowUrlClick(event: ng.IAngularEvent) {
        if (typeof this.$scope.serviceNowUrl === "string" && this.$scope.serviceNowUrl.trim().length > 0)
            try {
                this.$log.info("Setting URL");
                this.appConfigData.serviceNowUrl(new URL(this.$scope.serviceNowUrl));
                this.$scope.cssClass = ['alert', 'alert-success'];
            } catch (e) {
                this.$log.error("Error changing URL: " + 3);
                this.$scope.cssClass = ['alert', 'alert-danger'];
            }
        else {
            this.$log.warn("URL is empty");
            this.$scope.cssClass = ['alert', 'alert-warning'];
        }
        if (!event.defaultPrevented)
            event.preventDefault();
    }

    $doCheck(): void { }
}

interface ISnInstanceLinkScope extends ng.IScope {
    href: string;
    relativeUrl?: string;
    relativeUrlModel?: string;
}

interface ISnInstanceLinkAttributes extends ng.IAttributes {
    target?: string;
}

class SnInstanceLinkController implements ng.IController {
    constructor(private $scope: ISnInstanceLinkScope, private appConfigData: AppConfigDataService, private $log: ng.ILogService) {
        $log.info("SnInstanceLinkController constructor start");
        appConfigData.onServiceNowUrlChanged((value: URL) => {
            $log.info("SnInstanceLinkController onServiceNowUrlChanged start");
            if (typeof $scope.relativeUrlModel === "string" && $scope.relativeUrlModel.length > 0)
                $scope.href = appConfigData.getServiceNowUrlString($scope.relativeUrlModel);
            else
                $scope.href = appConfigData.getServiceNowUrlString($scope.relativeUrl);
            $log.info("SnInstanceLinkController onServiceNowUrlChanged end; href=" + angular.toJson($scope.href));
        });
        $log.info("SnInstanceLinkController constructor end");
    }

    $doCheck(): void { }
}

let module: ng.IModule = angular.module("mainModule", []);
module.service('appConfigData', ['$log', AppConfigDataService]).directive("snInstanceLink", () => {
    return <ng.IDirective>{
        restrict: "E",
        controller: ['$scope', 'appConfigData', '$log', SnInstanceLinkController],
        transclude: true,
        link: (scope: ISnInstanceLinkScope, element: JQuery, attrs: ISnInstanceLinkAttributes) => {
            if (typeof attrs.target !== "string")
                attrs.$set("target", "_blank");
        },
        scope: {
            relativeUrl: "@?",
            relativeUrlModel: "=?"
        },
        replace: true,
        template: '<a ng-href="{{href}}" ng-transclude></a>'
    }
}).controller("mainController", ['$scope', 'appConfigData', '$log', MainController]);
