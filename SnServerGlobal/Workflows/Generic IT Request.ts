/// <reference path="../SnTypings/GlideSystem.d.ts" />
/// <reference path="../SnTypings/GlideRecord.d.ts" />
/// <reference path="../SnTypings/ServiceCatalog.d.ts" />

namespace workflows_generic_it_request {
    interface IWorkflowVar extends IScopedWorkflow {
        scratchpad: {
            task_number: string;
        }
    }
    namespace route_request {
        function advancedScript(current: sc_req_itemGlideRecord, task: sc_taskGlideRecord, workflow: IWorkflowVar): void {
            task.short_description.setValue('Route IT Request: ' + current.short_description);
            workflow.scratchpad.task_number = task.number.getValue();
            gs.eventQueue('army.generic.request.route', current, task.number.getValue(), current.cat_item.getDisplayValue());
        }
    }
    namespace cancel_task_if_still_open {
        function advancedScript(current: sc_req_itemGlideRecord, task: sc_taskGlideRecord, workflow: IWorkflowVar): void {
            if (!gs.nil(workflow.scratchpad.task_number)) {
                var gr: sc_taskGlideRecord = <sc_taskGlideRecord>new GlideRecord('sc_task');
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
    }
}