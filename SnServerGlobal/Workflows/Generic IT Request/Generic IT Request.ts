/// <reference path="../../SnTypings/GlideSystem.d.ts" />
/// <reference path="../../SnTypings/GlideRecord.d.ts" />
/// <reference path="../../SnTypings/ServiceCatalog.d.ts" />

namespace workflows_generic_it_request {
    type genericRequestItemGlideRecord = sc_req_itemGlideRecord & {
        variables: {
            it_req_approval_group: GlideElementVariable;
            it_req_group_assignment: GlideElementVariable;
            mission_impact: GlideElementVariable;
        };
    };
    interface IWorkflowVar extends IScopedWorkflow {
        scratchpad: {
            task_number: string;
        }
    }
    function initialize_impact_urgency_and_priority(current: sc_req_itemGlideRecord, workflow: IWorkflowVar): void {
        if (gs.nil(current.variables.mission_impact))
            gs.warn('Mission Impact not defined (mission_impact variable missing or misconfigured)');
        else {
            switch (current.variables.mission_impact.getValue()) {
                case 'critical':
                    current.impact.setValue(1);
                    current.urgency.setValue(1);
                    current.priority.setValue(1);
                    break;
                case 'essential':
                    current.impact.setValue(1);
                    current.urgency.setValue(2);
                    current.priority.setValue(2);
                    break;
                case 'enhancing':
                    current.impact.setValue(2);
                    current.urgency.setValue(2);
                    current.priority.setValue(3);
                    break;
                default:
                    current.impact.setValue(3);
                    current.urgency.setValue(3);
                    current.priority.setValue(4);
                    break;
            }
        }
    }

    namespace route_request {
        function advancedScript(current: sc_req_itemGlideRecord, task: sc_taskGlideRecord, workflow: IWorkflowVar): void {
            task.short_description.setValue('Route IT Request request for ' +
                (((current.short_description + "").indexOf(current.cat_item.short_description.getValue()) < 0) ?
                    current.request.requested_for.getDisplayValue() + ' (' + current.short_description + ')' :
                    current.request.requested_for.getDisplayValue()));
            let requested_for: string = current.request.requested_for.getDisplayValue();
            let description: string[] = [
                'Please verify routing options for the associated generic service catalog IT service request item ' + current.number + '.',
                '',
                'Short Description' + current.short_description,
                'Requested For: ' + current.request.requested_for,
                'VIP: ' + ((current.request.requested_for.vip) ? "Yes" : "No"),
                'Catalog Item: ' + current.cat_item.getDisplayValue(),
                'Quantity: ' + current.quantity
            ];
            if (!current.description.nil()) {
                let d: string = ("" + current.description).trim();
                if (d.length > 0)
                    description.push('Detailed Description: ' + d.split(/\r\n?|\n/g).map(function (s: string, i: number) {
                        let v: string = s.trim();
                        return (i > 0 && v.length > 0) ? '                      ' + v : v;
                    }).join("\n"));
            }
            let opened_by: string = current.request.opened_by.getDisplayValue();
            if (opened_by != requested_for)
                description.push('Requested By: ' + opened_by);
            description.push('',
                'Routing Options',
                '    Directly route to fulfillment group.',
                '        Use the "Variables" section to select the fulfillment group, leaving the approval group blank.',
                '        Click the "Close Task" button to continue. The status for the associated request will be automatically updated and routed accordingly.',
                '    Route to group for approval.',
                '        Use the "Variables" section to select both the approval and the fulfillment groups.',
                '        Click the "Close Task" button to continue. The status for the associated request will be automatically updated.',
                '        Once (and if) the item is approved, the requested item will be re-assigned to the fulfillment groups.');
            task.description.setValue(description.join('\n'));
            workflow.scratchpad.task_number = task.number.getValue();
            gs.eventQueue('army.generic.request.route', current, task.number.getValue());
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