/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />
/// <reference path="cards.ts" />

namespace snippets {
    app.appModule.controller("snippetsController", ['$scope', cards.CardParentController]);

    interface IClipboardCardScope extends cards.ICardScope {
        copyToClipboard(): boolean;
        contentElementId: string;
    }

    abstract class ClipardCardController extends cards.CardController {
        constructor($scope: IClipboardCardScope, protected readonly copyToClipboardService: app.copyToClipboardService, headingText: string, public readonly contentElementId: string, public readonly copyToClipboardSuccessMsg?: string) {
            super($scope, headingText);
            let controller: ClipardCardController = this;
            $scope.contentElementId = contentElementId;
            $scope.copyToClipboard = () => { return controller.copyToClipboard(); }
        }
        copyToClipboard(): boolean {
            this.copyToClipboardService.copy($("#" + this.contentElementId), this.copyToClipboardSuccessMsg);
            return false;
        }
    }

    class ForceToUpdateSetWithValidationController extends ClipardCardController {
        constructor($scope: IClipboardCardScope, copyToClipboard: app.copyToClipboardService) { super($scope, copyToClipboard, 'Force To Update Set', 'forceToUpdateSetWithValidation', 'Code copied to clipboard'); }
    }
    app.appModule.controller("forceToUpdateSetWithValidationController", ['$scope', 'copyToClipboardService', ForceToUpdateSetWithValidationController]);

    class ForceToUpdateSetNoValidationController extends ClipardCardController {
        constructor($scope: IClipboardCardScope, copyToClipboard: app.copyToClipboardService) { super($scope, copyToClipboard, 'Force To Update Set (no validation)', 'forceToUpdateSetNoValidation', 'Code copied to clipboard'); }
    }
    app.appModule.controller("forceToUpdateSetNoValidationController", ['$scope', 'copyToClipboardService', ForceToUpdateSetNoValidationController]);

    class MoveToUpdateSetController extends ClipardCardController {
        constructor($scope: IClipboardCardScope, copyToClipboard: app.copyToClipboardService) { super($scope, copyToClipboard, 'Move To Current Update Set', 'moveToUpdateSet', 'Code copied to clipboard'); }
    }
    app.appModule.controller("moveToUpdateSetController", ['$scope', 'copyToClipboardService', MoveToUpdateSetController]);

}
