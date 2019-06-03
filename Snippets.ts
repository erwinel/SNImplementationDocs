/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />
/// <reference path="cards.ts" />

namespace snippets {
    app.appModule.controller("snippetsController", ['$scope', cards.CardParentController]);

    interface IClipboardCardScope extends cards.ICardScope {
        contentElementId: string;
        copyContentToClipboard(): boolean;
    }

    abstract class ClipardCardController extends cards.CardController {
        constructor($scope: IClipboardCardScope, protected readonly copyToClipboardService: app.copyToClipboardService, headingText: string, public readonly contentElementId: string, public readonly copyToClipboardSuccessMsg?: string) {
            super($scope, headingText);
            let controller: ClipardCardController = this;
            $scope.contentElementId = contentElementId;
            $scope.copyContentToClipboard = () => { return controller.copyContentToClipboard(); }
        }
        copyContentToClipboard(): boolean {
            this.copyToClipboardService.copy($("#" + this.contentElementId), this.copyToClipboardSuccessMsg);
            return false;
        }
    }

    interface IClipboardWithConditionCardScope extends IClipboardCardScope {
        conditionElementId: string;
        copyConditionToClipboard(): boolean;
    }
    abstract class ClipboardWithConditionCardController extends ClipardCardController {
        constructor($scope: IClipboardCardScope, copyToClipboardService: app.copyToClipboardService, headingText: string, contentElementId: string, public readonly conditionElementId: string, copyToClipboardSuccessMsg?: string) {
            super($scope, copyToClipboardService, headingText, contentElementId, copyToClipboardSuccessMsg);
            $scope.conditionElementId = conditionElementId;
            let controller: ClipboardWithConditionCardController = this;
            $scope.copyConditionToClipboard = () => { return controller.copyConditionToClipboard(); }
        }
        copyConditionToClipboard(): boolean {
            this.copyToClipboardService.copy($("#" + this.conditionElementId));
            return false;
        }
    }

    class ForceToUpdateSetWithValidationController extends ClipboardWithConditionCardController {
        constructor($scope: IClipboardCardScope, copyToClipboard: app.copyToClipboardService) { super($scope, copyToClipboard, 'Force To Update Set', 'forceToUpdateSet1Content', 'forceToUpdateSet1Condition', 'Code copied to clipboard'); }
    }
    app.appModule.controller("forceToUpdateSetWithValidationController", ['$scope', 'copyToClipboardService', ForceToUpdateSetWithValidationController]);

    class ForceToUpdateSetNoValidationController extends ClipboardWithConditionCardController {
        constructor($scope: IClipboardCardScope, copyToClipboard: app.copyToClipboardService) { super($scope, copyToClipboard, 'Force To Update Set (no validation)', 'forceToUpdateSet2Content', 'forceToUpdateSet2Condition', 'Code copied to clipboard'); }
    }
    app.appModule.controller("forceToUpdateSetNoValidationController", ['$scope', 'copyToClipboardService', ForceToUpdateSetNoValidationController]);

    class MoveToUpdateSetController extends ClipboardWithConditionCardController {
        constructor($scope: IClipboardCardScope, copyToClipboard: app.copyToClipboardService) { super($scope, copyToClipboard, 'Move To Current Update Set', 'moveToUpdateSetContent', 'moveToUpdateSetCondition', 'Code copied to clipboard'); }
    }
    app.appModule.controller("moveToUpdateSetController", ['$scope', 'copyToClipboardService', MoveToUpdateSetController]);

}
