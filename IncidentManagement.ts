/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="MainModule.ts" />
/// <reference path="CollapsibleCardControllers.ts" />

namespace inicidentManagment {
  class InicidentManagmentController extends cards.CardParentController<app.IMainControllerScope, cards.ICardContainerScope<app.IMainControllerScope>> {
    constructor(protected $scope: cards.ICardContainerScope<app.IMainControllerScope>) {
      super($scope);
    }
  }

  app.MainModule.controller("InicidentManagmentController", ['$scope', InicidentManagmentController]);
}
