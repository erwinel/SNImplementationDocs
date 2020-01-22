/// <reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../Scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />

namespace azureDevApp {
    export const MODULE_NAME_AZURE_DEV_APP = 'azureDevApp';
    export const CONTROLLER_NAME_MAIN_CONTENT = 'mainContentController';
    export type DOMelementEventCallback = (event?: BaseJQueryEventObject) => void;
    export interface IOuterCardVisibilityScope extends ng.IScope {
        testEnvSetup: boolean;
        showTestEnvSetup: DOMelementEventCallback;
        references: boolean;
        showReferences: DOMelementEventCallback;
        resourcePlanning: boolean;
        showResourcePlanning: DOMelementEventCallback;
        createVirtualNetwork: boolean;
        showCreateVirtualNetwork: DOMelementEventCallback;
        createGateway: boolean;
        showCreateGateway: DOMelementEventCallback;
        generateCerts: boolean;
        showGenerateCerts: DOMelementEventCallback;
    }
    export interface IMainContentControllerScope extends ng.IScope {
        cardVisibility: IOuterCardVisibilityScope;
        vnetName: string;
        addressSpace: string;
        subnetName: string;
        subnetAddressRange: string;
        azSubscription: string;
        resourceGroupName: string;
        azLocation: string;
        gatewaySubnet: string;
        gatewayName: string;
        gatewaySku: string;
        publicIpAddrName: string;
        clientAddrPool: string;
        rootCertPrefix: string;
        rootCertSuffix: string;
        clientCertSuffix: string;
        firstClientCertCertSuffix: string;
        generateRootCertCode: string;
        generateClientCertCode: string;
    }
    export class MainContentController implements ng.IController {
        readonly [Symbol.toStringTag]: string = CONTROLLER_NAME_MAIN_CONTENT;
        constructor(private readonly $scope: IMainContentControllerScope, private readonly $log: ng.ILogService) {
            $scope.showTestEnvSetup = true;
            $scope.vnetName = 'SnVNet';
            $scope.addressSpace = '192.168.0.0/20';
            $scope.subnetName = 'SnFrontEnd';
            $scope.subnetAddressRange = '192.168.0.0/23';
            $scope.azSubscription = 'Visual Studio Enterprise with MSDN';
            $scope.resourceGroupName = 'ServiceNow';
            $scope.azLocation = 'East US';
            $scope.gatewaySubnet = '192.168.2.0/23';
            $scope.gatewayName = 'SnVNetGW';
            $scope.gatewaySku = 'Basic';
            $scope.publicIpAddrName = 'SnVNetGWpip';
            $scope.clientAddrPool = '172.16.6.0/23';
            $scope.rootCertPrefix = 'SnP2S';
            $scope.rootCertSuffix = 'Root';
            $scope.clientCertSuffix = 'Client';
            $scope.firstClientCertCertSuffix = '1';
            const ctrl: MainContentController = this;
            $scope.cardVisibility = <IOuterCardVisibilityScope>$scope.$new(true);
            $scope.cardVisibility.testEnvSetup = true;
            $scope.cardVisibility.references = false;
            $scope.cardVisibility.resourcePlanning = true;
            $scope.cardVisibility.createVirtualNetwork = false;
            $scope.cardVisibility.createGateway = false;
            $scope.cardVisibility.generateCerts = false;
            $scope.cardVisibility.showTestEnvSetup = function (event: BaseJQueryEventObject) {
                $scope.cardVisibility.testEnvSetup = true;
                $scope.cardVisibility.references = false;
            }
            $scope.cardVisibility.showReferences = function (event: BaseJQueryEventObject) {
                $scope.cardVisibility.references = true;
                $scope.cardVisibility.testEnvSetup = false;
            }
            $scope.cardVisibility.showResourcePlanning = function (event: BaseJQueryEventObject) {
                $scope.cardVisibility.testEnvSetup = true;
                $scope.cardVisibility.resourcePlanning = true;
                $scope.cardVisibility.createVirtualNetwork = false;
                $scope.cardVisibility.createGateway = false;
                $scope.cardVisibility.generateCerts = false;
            }
            $scope.cardVisibility.showCreateVirtualNetwork = function (event: BaseJQueryEventObject) {
                $scope.cardVisibility.testEnvSetup = true;
                $scope.cardVisibility.resourcePlanning = false;
                $scope.cardVisibility.createVirtualNetwork = true;
                $scope.cardVisibility.createGateway = false;
                $scope.cardVisibility.generateCerts = false;
            }
            $scope.cardVisibility.showCreateGateway = function (event: BaseJQueryEventObject) {
                $scope.cardVisibility.testEnvSetup = true;
                $scope.cardVisibility.resourcePlanning = false;
                $scope.cardVisibility.createVirtualNetwork = false;
                $scope.cardVisibility.createGateway = true;
                $scope.cardVisibility.generateCerts = false;
            }
            $scope.cardVisibility.showGenerateCerts = function (event: BaseJQueryEventObject) {
                $scope.cardVisibility.testEnvSetup = true;
                $scope.cardVisibility.resourcePlanning = false;
                $scope.cardVisibility.createVirtualNetwork = false;
                $scope.cardVisibility.createGateway = false;
                $scope.cardVisibility.generateCerts = true;
            }
            $scope.$watchGroup(['rootCertPrefix', 'rootCertSuffix', 'clientCertSuffix', 'firstClientCertCertSuffix'], function (newValue: string, oldValue: string, scope: IMainContentControllerScope) {
                ctrl.updateSelfSignedCertCode();
            });
            this.updateSelfSignedCertCode();
        }
        private updateSelfSignedCertCode() {
            this.$scope.generateRootCertCode = "'$cert = New-SelfSignedCertificate -Type Custom -KeySpec Signature `\n" +
                "    -Subject 'CN=" + this.$scope.rootCertPrefix + this.$scope.rootCertSuffix + "' -KeyExportPolicy Exportable `\n" +
                "    -HashAlgorithm sha256 -KeyLength 2048 `\n" +
                "    -CertStoreLocation 'Cert:\\CurrentUser\\My' -KeyUsageProperty Sign -KeyUsage CertSign";
            this.$scope.generateClientCertCode = "New-SelfSignedCertificate -Type Custom -DnsName '" + this.$scope.rootCertPrefix + this.$scope.clientCertSuffix + this.$scope.firstClientCertCertSuffix + "' -KeySpec Signature `" +
                "    -Subject 'CN=" + this.$scope.rootCertPrefix + this.$scope.clientCertSuffix + this.$scope.firstClientCertCertSuffix + "' -KeyExportPolicy Exportable `\n" +
                "    -HashAlgorithm sha256 -KeyLength 2048 `\n" +
                "    -CertStoreLocation 'Cert:\\CurrentUser\\My' `\n" +
                "    -Signer $cert -TextExtension @('2.5.29.37={text}1.3.6.1.5.5.7.3.2')";
        }
        $doCheck(): void { }
        static getControllerInjectable(): ng.Injectable<ng.IControllerConstructor> {
            return ['$scope', '$log', MainContentController];
        }

    }
    let module: ng.IModule = angular.module(MODULE_NAME_AZURE_DEV_APP, []);
    module.controller(CONTROLLER_NAME_MAIN_CONTENT, MainContentController.getControllerInjectable());
}
