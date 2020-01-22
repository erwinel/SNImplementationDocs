/// <reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../Scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
var azureDevApp;
(function (azureDevApp) {
    azureDevApp.MODULE_NAME_AZURE_DEV_APP = 'azureDevApp';
    azureDevApp.CONTROLLER_NAME_MAIN_CONTENT = 'mainContentController';
    class MainContentController {
        constructor($scope, $log) {
            this.$scope = $scope;
            this.$log = $log;
            this[Symbol.toStringTag] = azureDevApp.CONTROLLER_NAME_MAIN_CONTENT;
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
            const ctrl = this;
            $scope.cardVisibility = $scope.$new(true);
            $scope.cardVisibility.testEnvSetup = true;
            $scope.cardVisibility.references = false;
            $scope.cardVisibility.resourcePlanning = true;
            $scope.cardVisibility.createVirtualNetwork = false;
            $scope.cardVisibility.createGateway = false;
            $scope.cardVisibility.generateCerts = false;
            $scope.cardVisibility.showTestEnvSetup = function (event) {
                $scope.cardVisibility.testEnvSetup = true;
                $scope.cardVisibility.references = false;
            };
            $scope.cardVisibility.showReferences = function (event) {
                $scope.cardVisibility.references = true;
                $scope.cardVisibility.testEnvSetup = false;
            };
            $scope.cardVisibility.showResourcePlanning = function (event) {
                $scope.cardVisibility.testEnvSetup = true;
                $scope.cardVisibility.resourcePlanning = true;
                $scope.cardVisibility.createVirtualNetwork = false;
                $scope.cardVisibility.createGateway = false;
                $scope.cardVisibility.generateCerts = false;
            };
            $scope.cardVisibility.showCreateVirtualNetwork = function (event) {
                $scope.cardVisibility.testEnvSetup = true;
                $scope.cardVisibility.resourcePlanning = false;
                $scope.cardVisibility.createVirtualNetwork = true;
                $scope.cardVisibility.createGateway = false;
                $scope.cardVisibility.generateCerts = false;
            };
            $scope.cardVisibility.showCreateGateway = function (event) {
                $scope.cardVisibility.testEnvSetup = true;
                $scope.cardVisibility.resourcePlanning = false;
                $scope.cardVisibility.createVirtualNetwork = false;
                $scope.cardVisibility.createGateway = true;
                $scope.cardVisibility.generateCerts = false;
            };
            $scope.cardVisibility.showGenerateCerts = function (event) {
                $scope.cardVisibility.testEnvSetup = true;
                $scope.cardVisibility.resourcePlanning = false;
                $scope.cardVisibility.createVirtualNetwork = false;
                $scope.cardVisibility.createGateway = false;
                $scope.cardVisibility.generateCerts = true;
            };
            $scope.$watchGroup(['rootCertPrefix', 'rootCertSuffix', 'clientCertSuffix', 'firstClientCertCertSuffix'], function (newValue, oldValue, scope) {
                ctrl.updateSelfSignedCertCode();
            });
            this.updateSelfSignedCertCode();
        }
        updateSelfSignedCertCode() {
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
        $doCheck() { }
        static getControllerInjectable() {
            return ['$scope', '$log', MainContentController];
        }
    }
    azureDevApp.MainContentController = MainContentController;
    let module = angular.module(azureDevApp.MODULE_NAME_AZURE_DEV_APP, []);
    module.controller(azureDevApp.CONTROLLER_NAME_MAIN_CONTENT, MainContentController.getControllerInjectable());
})(azureDevApp || (azureDevApp = {}));
//# sourceMappingURL=script.js.map