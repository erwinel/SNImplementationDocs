/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="MainModule.ts" />
/// <reference path="CollapsibleCardControllers.ts" />

namespace initialConfig {
  type TopLevelCardName = 'adminLogins' | 'importInitiaUpdateSet' | 'importUtilityApp' | 'initialConfig' | 'uploadLogoImage' | 'bulkPluginActivation' | 'activeDirectoryImport' | 'importPhysNetworks' |
    'serviceCatalogConfig';

  type ITopLevelCardScope = cards.ICardScope<cards.ICardContainerScope<app.IMainControllerScope>>;

  abstract class topLevelCardController extends cards.CardController<cards.ICardContainerScope<app.IMainControllerScope>, ITopLevelCardScope> {
    constructor(protected $scope: ITopLevelCardScope, name: TopLevelCardName, headingText: string) {
      super($scope, name, headingText);
    }
  }

  class InitialConfigController extends cards.CardParentController<app.IMainControllerScope, cards.ICardContainerScope<app.IMainControllerScope>> {
    constructor(protected $scope: cards.ICardContainerScope<app.IMainControllerScope>) {
      super($scope)
      $scope.cardNames = ['adminLogins', 'importInitiaUpdateSet', 'importUtilityApp', 'initialConfig', 'uploadLogoImage', 'bulkPluginActivation', 'activeDirectoryImport', 'importPhysNetworks',
        'serviceCatalogConfig'];
      $scope.selectedCard = 'adminLogins';
    }
  }

  app.MainModule.controller("InitialConfigController", ['$scope', InitialConfigController]);

  class adminLoginsController extends topLevelCardController {
    static cardName: TopLevelCardName = 'adminLogins';
    constructor($scope: ITopLevelCardScope) { super($scope, adminLoginsController.cardName, 'Add Administrative Logins'); }
  }
  app.MainModule.controller("adminLoginsController", ['$scope', adminLoginsController]);

  class importInitiaUpdateSetController extends topLevelCardController {
    static cardName: TopLevelCardName = 'importInitiaUpdateSet';
    constructor($scope: ITopLevelCardScope) { super($scope, importInitiaUpdateSetController.cardName, 'Import Initial Update Set'); }
  }
  app.MainModule.controller("importInitiaUpdateSetController", ['$scope', importInitiaUpdateSetController]);

  class importUtilityAppController extends topLevelCardController {
    static cardName: TopLevelCardName = 'importUtilityApp';
    constructor($scope: ITopLevelCardScope) { super($scope, importUtilityAppController.cardName, 'Import Utility Application'); }
  }
  app.MainModule.controller("importUtilityAppController", ['$scope', importUtilityAppController]);

  class initialConfigController extends topLevelCardController {
    static cardName: TopLevelCardName = 'initialConfig';
    constructor($scope: ITopLevelCardScope) { super($scope, initialConfigController.cardName, 'Initial Config'); }
  }
  app.MainModule.controller("initialConfigController", ['$scope', initialConfigController]);

  class uploadLogoImageController extends topLevelCardController {
    static cardName: TopLevelCardName = 'uploadLogoImage';
    constructor($scope: ITopLevelCardScope) { super($scope, uploadLogoImageController.cardName, 'Upload logo image'); }
  }
  app.MainModule.controller("uploadLogoImageController", ['$scope', uploadLogoImageController]);

  class bulkPluginActivationController extends topLevelCardController {
    static cardName: TopLevelCardName = 'bulkPluginActivation';
    constructor($scope: ITopLevelCardScope) { super($scope, bulkPluginActivationController.cardName, 'Bulk Plugin Activation'); }
  }
  app.MainModule.controller("bulkPluginActivationController", ['$scope', bulkPluginActivationController]);

  class activeDirectoryImportController extends topLevelCardController {
    static cardName: TopLevelCardName = 'activeDirectoryImport';
    constructor($scope: ITopLevelCardScope) { super($scope, activeDirectoryImportController.cardName, 'Configure Active Directory Import'); }
  }
  app.MainModule.controller("activeDirectoryImportController", ['$scope', activeDirectoryImportController]);

  class importPhysNetworksController extends topLevelCardController {
    static cardName: TopLevelCardName = 'importPhysNetworks';
    constructor($scope: ITopLevelCardScope) { super($scope, importPhysNetworksController.cardName, 'Import Physical Networks Application'); }
  }
  app.MainModule.controller("importPhysNetworksController", ['$scope', importPhysNetworksController]);

  class serviceCatalogConfigController extends topLevelCardController {
    static cardName: TopLevelCardName = 'serviceCatalogConfig';
    constructor($scope: ITopLevelCardScope) { super($scope, serviceCatalogConfigController.cardName, 'Import Service Catalog Update Set'); }
  }
  app.MainModule.controller("serviceCatalogConfigController", ['$scope', serviceCatalogConfigController]);

// #endregion
}
