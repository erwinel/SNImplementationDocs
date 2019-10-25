/// <reference path="../../SnTypings/GlideSystem.d.ts" />
/// <reference path="../../SnTypings/GlideRecord.d.ts" />
/// <reference path="../../SnTypings/ServiceCatalog.d.ts" />
var workflows_generic_it_request;
(function (workflows_generic_it_request) {
    function initialize_impact_urgency_and_priority(current, workflow) {
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
    var route_request;
    (function (route_request) {
        function advancedScript(current, task, workflow) {
            task.short_description.setValue('Route IT Request request for ' +
                (((current.short_description + "").indexOf(current.cat_item.short_description.getValue()) < 0) ?
                    current.request.requested_for.getDisplayValue() + ' (' + current.short_description + ')' :
                    current.request.requested_for.getDisplayValue()));
            task.impact = current.impact;
            task.urgency = current.urgency;
            task.priority = current.priority;
            var requested_for = current.request.requested_for.getDisplayValue();
            var description = [
                'Please verify routing options for the associated generic service catalog IT service request item ' + current.number + '.',
                '',
                'Short Description' + current.short_description,
                'Requested For: ' + current.request.requested_for,
                'VIP: ' + ((current.request.requested_for.vip) ? "Yes" : "No"),
                'Catalog Item: ' + current.cat_item.getDisplayValue(),
                'Quantity: ' + current.quantity
            ];
            if (!current.description.nil()) {
                var d = ("" + current.description).trim();
                if (d.length > 0)
                    description.push('Detailed Description: ' + d.split(/\r\n?|\n/g).map(function (s, i) {
                        var v = s.trim();
                        return (i > 0 && v.length > 0) ? '                      ' + v : v;
                    }).join("\n"));
            }
            var opened_by = current.request.opened_by.getDisplayValue();
            if (opened_by != requested_for)
                description.push('Requested By: ' + opened_by);
            description.push('', 'Routing Options', '    Directly route to fulfillment group.', '        Fill in the "Assignment Group" field of the associated request item.', '        Close this task to move the request item into the "Approved" stage.', '    Route to group for approval.', '        Fill in the "Assignment Group" field of the associated request item.', '        Use the "Variables" section of this task to select the approval group.', '        Close this task to generate the approval tasks.', '    Re-Route this task to another group for assessment.', '        Update the Assignment Group of this task (not the requested item) to re-route this to another group for assessment.', '        Do not close the task if you have re-assigned it to some one else.');
            task.description.setValue(description.join('\n'));
            workflow.scratchpad().task_number = task.number;
            gs.eventQueue('army.generic.request.route', current, task.number.getValue());
        }
    })(route_request || (route_request = {}));
    var Wait_Approval;
    (function (Wait_Approval) {
        answer = (function () {
            var scratchpad = workflow.scratchpad();
            if (gs.nil(scratchpad.task_number))
                return true;
            var gr = new GlideRecord('sc_task');
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
    })(Wait_Approval || (Wait_Approval = {}));
    var Needs_Approval;
    (function (Needs_Approval) {
        function ifScript() {
            return (current.variables.it_req_approval_group.nil() || (current.approval != "requested" && current.approval != "not requested")) ? 'no' : 'yes';
        }
        answer = ifScript();
    })(Needs_Approval || (Needs_Approval = {}));
    var Save_Current_State;
    (function (Save_Current_State) {
        var scratchpad = workflow.scratchpad();
        scratchpad.backordered = current.backordered;
        scratchpad.received = current.received;
        scratchpad.sourced = current.sourced;
    })(Save_Current_State || (Save_Current_State = {}));
    var Wait_Source_Changed_or_Closed;
    (function (Wait_Source_Changed_or_Closed) {
        answer = (function () {
            var scratchpad = workflow.scratchpad();
            return current.backordered != scratchpad.backordered || current.sourced != scratchpad.sourced || current.received != scratchpad.received || current.active != true;
        })();
    })(Wait_Source_Changed_or_Closed || (Wait_Source_Changed_or_Closed = {}));
})(workflows_generic_it_request || (workflows_generic_it_request = {}));
//# sourceMappingURL=Generic IT Request.js.map