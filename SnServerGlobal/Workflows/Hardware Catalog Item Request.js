/// <reference path="../SnTypings/GlideSystem.d.ts" />
/// <reference path="../SnTypings/GlideRecord.d.ts" />
/// <reference path="../SnTypings/ServiceCatalog.d.ts" />
var workflows_hardware_catalog_item_request;
(function (workflows_hardware_catalog_item_request) {
    var route_request;
    (function (route_request) {
        function advancedScript(current, task, workflow) {
            task.short_description.setValue('Fulfill catalog item request: ' + current.cat_item.short_description);
            gs.eventQueue('army.sc_req_item.fulfill_order', current, task.number.getValue(), current.cat_item.getDisplayValue());
        }
    })(route_request || (route_request = {}));
})(workflows_hardware_catalog_item_request || (workflows_hardware_catalog_item_request = {}));
//# sourceMappingURL=Hardware Catalog Item Request.js.map