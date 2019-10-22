var workflow_service_catalog_item;
(function (workflow_service_catalog_item) {
    var no_assignment_group;
    (function (no_assignment_group) {
        function advancedScript(current, task, workflow) {
            task.short_description.setValue('Assign catalog item request: ' + current.cat_item.short_description);
            gs.eventQueue('army.sc_req_item.no.fulfillment_group', current, task.number.getValue(), current.cat_item.getDisplayValue());
        }
    })(no_assignment_group || (no_assignment_group = {}));
})(workflow_service_catalog_item || (workflow_service_catalog_item = {}));
//# sourceMappingURL=Service Castalog Item.js.map