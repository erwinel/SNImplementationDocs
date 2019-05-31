/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />
/// <reference path="cards.ts" />

namespace changeManagment {
    interface IChangeManagmentScope extends cards.ICardContainerScope {
        serviceNowUrl: string;
        gitRepositoryBaseUrl: string;
    }
    class ChangeManagmentController extends cards.CardParentController {
        constructor(protected $scope: IChangeManagmentScope, settings: app.targetSysConfigSettings) {
            super($scope);
            $scope.serviceNowUrl = settings.serviceNowUrl;
            $scope.gitRepositoryBaseUrl = settings.gitRepositoryBaseUrl;
        }
    }

    app.appModule.controller("changeManagmentController", ['$scope', "targetSysConfigSettings", ChangeManagmentController]);
}
