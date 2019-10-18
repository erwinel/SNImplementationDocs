/// <reference path="../SnTypings/ServiceNowLegacy.d.ts" />
var GenericItRequest;
(function (GenericItRequest) {
    var Generic_Flow;
    (function (Generic_Flow) {
        var answer = ifScript();
        function ifScript() {
            if (gs.nil(current.assignment_group)) {
                if (gs.nil(current.variables.assignment_group)) {
                    if (gs.nil(current.cat_item.group)) {
                        return 'no';
                    }
                }
            }
            if (current.assignment_group.nil())
                current.assignment_group.setValue(current.variables.assignment_group);
            return 'yes';
        }
        if (gs.nil(current.variables.assignment_group)) {
        }
        else {
        }
    })(Generic_Flow || (Generic_Flow = {}));
    var Has_Fulfillment_Group;
    (function (Has_Fulfillment_Group) {
        var answer = ifScript();
        function ifScript() {
            current.state.setValue(1);
            if (gs.nil(current.variables.mission_impact)) {
                current.impact.setValue(current.request.impact.getValue());
                current.urgency.setValue(current.request.urgency.getValue());
                current.priority.setValue(current.request.priority.getValue());
            }
            else
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
            var group = current.assignment_group;
            if (gs.nil(group)) {
                if (gs.nil(current.variables.assignment_group)) {
                    if (gs.nil(current.cat_item.group)) {
                        return 'no';
                    }
                    group = current.cat_item.group;
                    try {
                        current.variables.assignment_group.setValue(group);
                    }
                    catch (e) { }
                }
                else
                    group = current.variables.assignment_group;
            }
            current.variables.item_fulfillment_group.setValue(group);
            current.assignment_group.setValue(group);
            return 'yes';
        }
    })(Has_Fulfillment_Group || (Has_Fulfillment_Group = {}));
    var Cancel_task_if_still_open;
    (function (Cancel_task_if_still_open) {
        (function (task_number) {
            workflow.scratchpad.task_number = undefined;
            if (gs.nil(task_number))
                return;
            workflow.scratchpad.task_canceled = (parseInt(current.state.getValue()) > 3) ? 'yes' : 'no';
            var gr = new GlideRecord('sc_task');
            gr.addQuery('number', task_number);
            gr.query();
            if (gr.next() && parseInt(gr.state.getValue()) < 4) {
                gr.state.setValue(7);
                gr.update();
                gs.addInfoMessage('Cancelled request item routing task ' + task_number);
            }
        })(workflow.scratchpad.task_number);
    })(Cancel_task_if_still_open || (Cancel_task_if_still_open = {}));
    var Route_Requested_Item;
    (function (Route_Requested_Item) {
        (function (task_number) {
            task.short_description.setValue('Route Service Request Item ' + task.request_item.number + ' - ' + task.request_item.short_description);
            workflow.scratchpad.task_number = task_number;
            task.impact.setValue(current.impact.getValue());
            task.urgency.setValue(current.urgency.getValue());
            task.priority.setValue(current.priority.getValue());
            gs.eventQueue('x_44813_servic_cat.generic.request.route', task.request_item.getRefRecord(), task_number);
        })(task.number.getValue());
    })(Route_Requested_Item || (Route_Requested_Item = {}));
    var Cancel_Request;
    (function (Cancel_Request) {
        (function (task_number) {
            workflow.scratchpad.task_number = undefined;
            if (parseInt(current.state.getValue()) < 4)
                current.state.setValue(7);
            if (gs.nil(task_number))
                return;
            workflow.scratchpad.task_canceled = 'yes';
            var gr = new GlideRecord('sc_task');
            gr.addQuery('number', task_number);
            gr.query();
            if (gr.next() && parseInt(gr.state.getValue()) < 4) {
                gr.state.setValue(7);
                gr.update();
                gs.addInfoMessage('Cancelled request item routing task ' + task_number);
            }
        })(workflow.scratchpad.task_number);
    })(Cancel_Request || (Cancel_Request = {}));
    var Assigment_Group_Selected;
    (function (Assigment_Group_Selected) {
        var answer = ifScript();
        function ifScript() {
            if (gs.nil(current.variables.item_fulfillment_group))
                return 'no';
            if (current.variables.item_approval_group.nil())
                try {
                    current.assignment_group.setValue(current.variables.item_fulfillment_group);
                }
                catch (e) { }
            return 'yes';
        }
    })(Assigment_Group_Selected || (Assigment_Group_Selected = {}));
    var Requires_Approval;
    (function (Requires_Approval) {
        var answer = ifScript();
        function ifScript() {
            if (gs.nil(current.variables.item_approval_group))
                return 'no';
            current.state.setValue(-5);
            return 'yes';
        }
    })(Requires_Approval || (Requires_Approval = {}));
    var Set_Fulfillment_Group;
    (function (Set_Fulfillment_Group) {
        (function (group) {
            if (gs.nil(current.variables.assignment_group))
                try {
                    current.variables.assignment_group.setValue(group);
                }
                catch (e) { }
            current.assignment_group.setValue(group);
        })(current.variables.item_approval_group);
    })(Set_Fulfillment_Group || (Set_Fulfillment_Group = {}));
    var Request_Was_Canceled;
    (function (Request_Was_Canceled) {
        var answer = ifScript();
        function ifScript() {
            var task_canceled = workflow.scratchpad.task_canceled;
            if (gs.nil(task_canceled) || task_canceled == 'no')
                return 'no';
            current.state.setValue(7);
            return 'yes';
        }
    })(Request_Was_Canceled || (Request_Was_Canceled = {}));
    var Assignment_Specified;
    (function (Assignment_Specified) {
        var answer = ifScript();
        function ifScript() {
            var assignmentGroup = current.variables.item_fulfillment_group;
            if (gs.nil(assignmentGroup))
                return 'no';
            if (gs.nil(current.variables.item_approval_group)) {
                try {
                    current.variables.assignment_group.setValue(assignmentGroup);
                }
                catch (e) { }
                current.assignment_group.setValue(assignmentGroup);
                gs.addInfoMessage('Requested item will be marked as approved.');
            }
            return 'yes';
        }
    })(Assignment_Specified || (Assignment_Specified = {}));
    var Set_Approvals;
    (function (Set_Approvals) {
        var answer = [];
        answer.push(current.variables.item_approval_group);
    })(Set_Approvals || (Set_Approvals = {}));
})(GenericItRequest || (GenericItRequest = {}));
//# sourceMappingURL=GenericItRequest.js.map