/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />
/// <reference path="accordionGroup.ts" />

namespace snippets {
    interface IClipboardCardScope extends ng.IScope {
        contentElementId: string;
        copyContentToClipboard(): boolean;
    }

    abstract class ClipardCardController implements ng.IController {
        constructor(protected $scope: IClipboardCardScope, protected readonly copyToClipboardService: app.CopyToClipboardService, public readonly contentElementId: string, public readonly copyToClipboardSuccessMsg?: string) {
            let controller: ClipardCardController = this;
            $scope.contentElementId = contentElementId;
            $scope.copyContentToClipboard = () => { return controller.copyContentToClipboard(); }
        }
        copyContentToClipboard(): boolean {
            this.copyToClipboardService.copy($("#" + this.contentElementId), this.copyToClipboardSuccessMsg);
            return false;
        }
        $doCheck() { }
    }

    interface IClipboardWithConditionCardScope extends IClipboardCardScope {
        conditionElementId: string;
        copyConditionToClipboard(): boolean;
    }
    abstract class ClipboardWithConditionCardController extends ClipardCardController {
        constructor($scope: IClipboardWithConditionCardScope, copyToClipboardService: app.CopyToClipboardService, contentElementId: string, public readonly conditionElementId: string, copyToClipboardSuccessMsg?: string) {
            super($scope, copyToClipboardService, contentElementId, copyToClipboardSuccessMsg);
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
        constructor($scope: IClipboardWithConditionCardScope, copyToClipboard: app.CopyToClipboardService) { super($scope, copyToClipboard, 'forceToUpdateSet1Content', 'forceToUpdateSet1Condition', 'Code copied to clipboard'); }
    }
    app.appModule.controller("forceToUpdateSetWithValidationController", ['$scope', 'copyToClipboardService', ForceToUpdateSetWithValidationController]);

    class ForceToUpdateSetNoValidationController extends ClipboardWithConditionCardController {
        constructor($scope: IClipboardWithConditionCardScope, copyToClipboard: app.CopyToClipboardService) { super($scope, copyToClipboard, 'forceToUpdateSet2Content', 'forceToUpdateSet2Condition', 'Code copied to clipboard'); }
    }
    app.appModule.controller("forceToUpdateSetNoValidationController", ['$scope', 'copyToClipboardService', ForceToUpdateSetNoValidationController]);

    class MoveToUpdateSetController extends ClipboardWithConditionCardController {
        constructor($scope: IClipboardWithConditionCardScope, copyToClipboard: app.CopyToClipboardService) { super($scope, copyToClipboard, 'moveToUpdateSetContent', 'moveToUpdateSetCondition', 'Code copied to clipboard'); }
    }
    app.appModule.controller("moveToUpdateSetController", ['$scope', 'copyToClipboardService', MoveToUpdateSetController]);

}
