/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />
/// <reference path="cards.ts" />

namespace inicidentManagment {
  class InicidentManagmentController extends cards.CardParentController {
    constructor(protected $scope: cards.ICardContainerScope) {
      super($scope);
    }
  }

  app.appModule.controller("InicidentManagmentController", ['$scope', InicidentManagmentController]);
}
