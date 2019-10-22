/// <reference path="../SnTypings/GlideSystem.d.ts" />
/// <reference path="../SnTypings/GlideRecord.d.ts" />
/// <reference path="../SnTypings/ServiceCatalog.d.ts" />

namespace workflows_hardware_catalog_item_request {
    namespace route_request {
        function advancedScript(current: sc_req_itemGlideRecord, task: sc_taskGlideRecord, workflow: IScopedWorkflow): void {
            task.short_description.setValue('Fulfill catalog item request: ' + current.cat_item.short_description);
            gs.eventQueue('army.sc_req_item.fulfill_order', current, task.number.getValue(), current.cat_item.getDisplayValue());
        }
    }
}