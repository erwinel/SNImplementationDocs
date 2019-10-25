/// <reference path="../../SnTypings/GlideSystem.d.ts" />
/// <reference path="../../SnTypings/GlideRecord.d.ts" />
/// <reference path="../../SnTypings/ServiceCatalog.d.ts" />

namespace workflows_generic_it_request {
    type genericRequestItemGlideRecord = sc_req_itemGlideRecord & {
        variables: {
            it_req_approval_group: GlideElementVariable;
            mission_impact: GlideElementVariable;
        };
    };
    type wfWorkflowScratchPad = WorkflowScratchPad & { task_number: StringGlideElement | string; backordered: GlideElementBoolean | boolean; sourced: GlideElementBoolean | boolean; received: GlideElementBoolean | boolean; };
    interface IWorkflowVar extends IScopedWorkflow { scratchpad(): wfWorkflowScratchPad; }
    function initialize_impact_urgency_and_priority(current: genericRequestItemGlideRecord, workflow: IWorkflowVar): void {
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
        function advancedScript(current: genericRequestItemGlideRecord, task: sc_taskGlideRecord, workflow: IWorkflowVar): void {
            task.short_description.setValue('Route IT Request request for ' +
                (((current.short_description + "").indexOf(current.cat_item.short_description.getValue()) < 0) ?
                    current.request.requested_for.getDisplayValue() + ' (' + current.short_description + ')' :
                    current.request.requested_for.getDisplayValue()));
            task.impact = current.impact;
            task.urgency = current.urgency;
            task.priority = current.priority;
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
                '        Fill in the "Assignment Group" field of the associated request item.',
                '        Close this task to move the request item into the "Approved" stage.',
                '    Route to group for approval.',
                '        Fill in the "Assignment Group" field of the associated request item.',
                '        Use the "Variables" section of this task to select the approval group.',
                '        Close this task to generate the approval tasks.',
                '    Re-Route this task to another group for assessment.',
                '        Update the Assignment Group of this task (not the requested item) to re-route this to another group for assessment.',
                '        Do not close the task if you have re-assigned it to some one else.');
            task.description.setValue(description.join('\n'));
            workflow.scratchpad().task_number = task.number;
            gs.eventQueue('army.generic.request.route', current, task.number.getValue());
        }
    }
    namespace Wait_Approval {
        declare var current: genericRequestItemGlideRecord, answer: boolean, workflow: IWorkflowVar;
        answer = (function (): boolean {
            let scratchpad: wfWorkflowScratchPad = workflow.scratchpad();
            if (gs.nil(scratchpad.task_number))
                return true;
            var gr: sc_taskGlideRecord = <sc_taskGlideRecord>new GlideRecord('sc_task');
            gr.addQuery('number', scratchpad.task_number);
            gr.query();
            if (gr.next() && gr.state < 3) {
                if (current.active && current.variables.it_req_approval_group.nil() && (current.approval == "requested" || current.approval == "not requested"))
                    return false;
                gr.state = 7;
                gr.update();
                gs.addInfoMessage('Cancelled request item routing task');
            }
            scratchpad.task_number = null;
            return true;
        })();
    }
    namespace Needs_Approval {
        declare var current: genericRequestItemGlideRecord, answer: 'yes' | 'no', workflow: IWorkflowVar;
        function ifScript(): 'yes' | 'no' {
            return (current.variables.it_req_approval_group.nil() || (current.approval != "requested" && current.approval != "not requested")) ? 'no' : 'yes';
        }
        answer = ifScript();
    }
    namespace Save_Current_State {
        declare var current: genericRequestItemGlideRecord, answer: 'yes' | 'no', workflow: IWorkflowVar;
        let scratchpad: wfWorkflowScratchPad = workflow.scratchpad();
        scratchpad.backordered = current.backordered;
        scratchpad.received = current.received;
        scratchpad.sourced = current.sourced;
    }
    namespace Wait_Source_Changed_or_Closed {
        declare var current: genericRequestItemGlideRecord, answer: boolean, workflow: IWorkflowVar;
        answer = (function (): boolean {
            let scratchpad: wfWorkflowScratchPad = workflow.scratchpad();
            return current.backordered != scratchpad.backordered || current.sourced != scratchpad.sourced || current.received != scratchpad.received || current.active != true;
        })();
    }
}