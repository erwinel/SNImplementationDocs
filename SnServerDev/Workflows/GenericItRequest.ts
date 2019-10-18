/// <reference path="../SnTypings/ServiceNowLegacy.d.ts" />

namespace GenericItRequest {
    declare type MissionImpactValue = "critical" | "essential" | "enhancing" | "low";
    declare type YesOrNo = 'yes' | 'no';

    declare abstract class MissionImpactVariable extends GlideElementVariable {
        getValue(): MissionImpactValue;
        setValue(value: MissionImpactValue): void;
        toString(): MissionImpactValue;
    }
    declare abstract class WorkflowVariables extends GlideElementVariables {
        item_approval_group: GlideElementVariable;
        item_fulfillment_group: GlideElementVariable;
    }
    declare abstract class GenericItRequestVariables extends WorkflowVariables {
        short_description: GlideElementVariable;
        virtual_location: GlideElementVariable;
        network: GlideElementVariable;
        mission_impact: MissionImpactVariable;
        desired_fulfillment_date: GlideElementVariable;
        due_date: GlideElementVariable;
        justification: GlideElementVariable;
        description: GlideElementVariable;
        business_service: GlideElementVariable;
        cmdb_ci: GlideElementVariable;
        assignment_group: GlideElementVariable;
    }
    
    declare var current: sc_req_itemGlideRecordV<GenericItRequestVariables>;
    interface IWorkflowScratchpad extends IGlideElement {
        task_number?: string;
        task_canceled: YesOrNo;
        fulfillmentGroup?: string;
    }
    interface IGenericItRequestWorkflowGlideRecord extends IGlideRecord {
        scratchpad: GlideElement & IWorkflowScratchpad;
    }

    declare var workflow: GlideRecord & IGenericItRequestWorkflowGlideRecord;
    namespace Generic_Flow {
        var answer: YesOrNo = ifScript();
        function ifScript(): YesOrNo {
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

        } else {

        }
    }
    namespace Has_Fulfillment_Group {
        var answer: YesOrNo = ifScript();
        function ifScript(): YesOrNo {
            current.state.setValue(1);
            if (gs.nil(current.variables.mission_impact)) {
                current.impact.setValue(current.request.impact.getValue());
                current.urgency.setValue(current.request.urgency.getValue());
                current.priority.setValue(current.request.priority.getValue());
            } else
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
            let group: GlideElement | GlideElementVariable = current.assignment_group;
            if (gs.nil(group)) {
                if (gs.nil(current.variables.assignment_group)) {
                    if (gs.nil(current.cat_item.group)) {
                        return 'no';
                    }
                    group = current.cat_item.group;
                    try { current.variables.assignment_group.setValue(group); } catch (e) { }
                } else
                    group = current.variables.assignment_group;
            }
            current.variables.item_fulfillment_group.setValue(group);
            current.assignment_group.setValue(group);
            return 'yes';
        }
    }
    namespace Cancel_task_if_still_open {
        (function (task_number: string): void {
            workflow.scratchpad.task_number = undefined;
            if (gs.nil(task_number))
                return;
            workflow.scratchpad.task_canceled = (parseInt(current.state.getValue()) > 3) ? 'yes' : 'no';
            var gr: sc_taskGlideRecord = <sc_taskGlideRecord>new GlideRecord('sc_task');
            gr.addQuery('number', task_number);
            gr.query();
            if (gr.next() && parseInt(gr.state.getValue()) < 4) {
                gr.state.setValue(7);
                gr.update();
                gs.addInfoMessage('Cancelled request item routing task ' + task_number);
            }
        })(workflow.scratchpad.task_number);
    }
    namespace Route_Requested_Item {
        declare var task: sc_taskGlideRecord;
        (function (task_number: string): void {
            task.short_description.setValue('Route Service Request Item ' + task.request_item.number + ' - ' + task.request_item.short_description);
            workflow.scratchpad.task_number = task_number;
            task.impact.setValue(current.impact.getValue());
            task.urgency.setValue(current.urgency.getValue());
            task.priority.setValue(current.priority.getValue());
            gs.eventQueue('x_44813_servic_cat.generic.request.route', <GlideRecord><any>task.request_item.getRefRecord(), task_number);
        })(task.number.getValue());
    }
    namespace Cancel_Request {
        (function (task_number: string): void {
            workflow.scratchpad.task_number = undefined;
            if (parseInt(current.state.getValue()) < 4)
                current.state.setValue(7);
            if (gs.nil(task_number))
                return;
            workflow.scratchpad.task_canceled = 'yes';
            var gr: sc_taskGlideRecord = <sc_taskGlideRecord>new GlideRecord('sc_task');
            gr.addQuery('number', task_number);
            gr.query();
            if (gr.next() && parseInt(gr.state.getValue()) < 4) {
                gr.state.setValue(7);
                gr.update();
                gs.addInfoMessage('Cancelled request item routing task ' + task_number);
            }
        })(workflow.scratchpad.task_number);
    }
    namespace Assigment_Group_Selected {
        var answer: YesOrNo = ifScript();
        function ifScript(): YesOrNo {
            if (gs.nil(current.variables.item_fulfillment_group))
                return 'no';
            if (current.variables.item_approval_group.nil())
                try { current.assignment_group.setValue(current.variables.item_fulfillment_group); } catch (e) { }
            return 'yes';
        }
    }
    namespace Requires_Approval {
        var answer: YesOrNo = ifScript();
        function ifScript(): YesOrNo {
            if (gs.nil(current.variables.item_approval_group))
                return 'no';
            current.state.setValue(-5);
            return 'yes';
        }
    }
    namespace Set_Fulfillment_Group {
        (function (group: GlideElementVariable) {
            if (gs.nil(current.variables.assignment_group))
                try { current.variables.assignment_group.setValue(group); } catch (e) { }
            current.assignment_group.setValue(group);
        })(current.variables.item_approval_group);
    }



    namespace Request_Was_Canceled {
        var answer: YesOrNo = ifScript();
        function ifScript(): YesOrNo {
            var task_canceled: YesOrNo = workflow.scratchpad.task_canceled;
            if (gs.nil(task_canceled) || task_canceled == 'no')
                return 'no';
            current.state.setValue(7);
            return 'yes';
        }
    }
    namespace Assignment_Specified {
        var answer: YesOrNo = ifScript();
        function ifScript(): YesOrNo {
            let assignmentGroup: GlideElementVariable = current.variables.item_fulfillment_group;
            if (gs.nil(assignmentGroup))
                return 'no';
            if (gs.nil(current.variables.item_approval_group)) {
                try { current.variables.assignment_group.setValue(assignmentGroup); } catch (e) { }
                current.assignment_group.setValue(assignmentGroup);
                gs.addInfoMessage('Requested item will be marked as approved.');
            }
            return 'yes';
        }
    }
    namespace Set_Approvals {
        var answer: GlideElementVariable[] = [];
        answer.push(current.variables.item_approval_group);
    }
}
