namespace workflow_service_catalog_item {
    namespace no_assignment_group {
        function advancedScript(current: sc_req_itemGlideRecord, task: sc_taskGlideRecord, workflow: IScopedWorkflow): void {
            task.short_description.setValue('Assign catalog item request: ' + current.cat_item.short_description);
            gs.eventQueue('army.sc_req_item.no.fulfillment_group', current, task.number.getValue(), current.cat_item.getDisplayValue());
        }
    }
}