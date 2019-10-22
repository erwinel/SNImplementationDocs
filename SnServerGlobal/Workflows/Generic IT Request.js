/// <reference path="../SnTypings/GlideSystem.d.ts" />
/// <reference path="../SnTypings/GlideRecord.d.ts" />
/// <reference path="../SnTypings/ServiceCatalog.d.ts" />
var workflows_generic_it_request;
(function (workflows_generic_it_request) {
    var route_request;
    (function (route_request) {
        function advancedScript(current, task, workflow) {
            task.short_description.setValue('Route IT Request: ' + current.short_description);
            workflow.scratchpad.task_number = task.number.getValue();
            gs.eventQueue('army.generic.request.route', current, task.number.getValue(), current.cat_item.getDisplayValue());
        }
    })(route_request || (route_request = {}));
    var cancel_task_if_still_open;
    (function (cancel_task_if_still_open) {
        function advancedScript(current, task, workflow) {
            if (!gs.nil(workflow.scratchpad.task_number)) {
                var gr = new GlideRecord('sc_task');
                gr.addQuery('number', workflow.scratchpad.task_number);
                workflow.scratchpad.task_number = null;
                gr.query();
                if (gr.next()) {
                    gr.state.setValue(7);
                    gr.update();
                    gs.addInfoMessage('Cancelled request item routing task');
                }
            }
        }
    })(cancel_task_if_still_open || (cancel_task_if_still_open = {}));
})(workflows_generic_it_request || (workflows_generic_it_request = {}));
//# sourceMappingURL=Generic IT Request.js.map