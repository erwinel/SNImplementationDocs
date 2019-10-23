/// <reference path="../../SnTypings/GlideSystem.d.ts" />
/// <reference path="../../SnTypings/GlideRecord.d.ts" />
/// <reference path="../../SnTypings/ServiceCatalog.d.ts" />

namespace workflows_hardware_catalog_item_request {
    interface IWorkflowVar extends IScopedWorkflow {
        scratchpad: {
            task_number: any;
        }
    }

    namespace verify_availability {
        function advanced_script(current: sc_req_itemGlideRecord, task: sc_taskGlideRecord, workflow: IWorkflowVar): void {
            task.short_description.setValue('Verify ' + current.cat_item.short_description + ' availability for ' +
                (((current.short_description + "").indexOf(current.cat_item.short_description.getValue()) < 0) ?
                    current.request.requested_for.getDisplayValue() + ' (' + current.short_description + ')' :
                    current.request.requested_for.getDisplayValue()));
            let catItemDisplayValue: string = current.cat_item.getDisplayValue();
            let lines: string[] = [
                'Please verify availability of ' + catItemDisplayValue + ' (quantity: ' + current.quantity + ').',
                '',
                'If the item is not available (ie. needs to be ordered), make sure to check the Backordered checkbox and specify the Estimated Delivery date on the associated request item.',
                ''
            ];
            if (current.short_description.getValue() != catItemDisplayValue)
                lines.push('Description: ' + current.short_description);
            let requested_for: string = current.request.requested_for.getDisplayValue();
            lines.push('Requested For: ' + requested_for, 'VIP: ' + ((JSUtil.toBoolean(current.request.requested_for.vip)) ? "Yes" : "No"), 'Catalog Item: ' + catItemDisplayValue,
                'Quantity: ' + current.quantity);
            let opened_by: string = current.request.opened_by.getDisplayValue();
            if (opened_by != requested_for)
                lines.push('Requested By: ' + opened_by);
            lines.push('', 'IMPORTANT: The workflow for this request does not proceed until you close this task. Cancelling this task will also cancel the associated requested item!');
            task.description.setValue(lines.join('\n'));
            gs.eventQueue('army.sc_req_item.fulfill_order', current, task.number.getValue());
        }
    }

    namespace notify_availability_validation_task {
        declare var current: sc_req_itemGlideRecord, workflow: IWorkflowVar;
        (function (): string {
            var gr: sc_taskGlideRecord = <sc_taskGlideRecord>new GlideRecord('sc_task');
            gr.addQuery('number', workflow.scratchpad.task_number);
            gr.query();
            if (gr.next())
                return "" + gr.sys_id;
            return "";
        }());
    }
    function setItem1(current: sc_req_itemGlideRecord, workflow: IWorkflowVar): string {
        var gr: sc_taskGlideRecord = <sc_taskGlideRecord>new GlideRecord('sc_task');
        gr.addQuery('number', workflow.scratchpad.task_number);
        gr.query();
        if (gr.next())
            return "" + gr.sys_id;
        //gs.eventQueue('army.sc_req_item.fulfill_order', current, "" + gr.sys_id);
    }
    namespace wait_approval_change {
        declare var current: sc_req_itemGlideRecord, workflow: IWorkflowVar, answer: boolean;
        answer = (function (): boolean {
            if (JSUtil.getBooleanValue(current, "active") && current.approval.getValue() === "requested") {
                var gr: sc_taskGlideRecord = <sc_taskGlideRecord>new GlideRecord('sc_task');
                gr.addQuery('number', workflow.scratchpad.task_number);
                gr.query();
                return !(gr.next() && JSUtil.getBooleanValue(gr, "active"));
            }
            return true;
        }());
    }
    namespace receive_backordered_item {
        function advanced_script(current: sc_req_itemGlideRecord, task: sc_taskGlideRecord, workflow: IWorkflowVar): void {
            task.short_description.setValue('Receive ' + current.cat_item.short_description + ' order for ' +
                (((current.short_description + "").indexOf(current.cat_item.short_description.getValue()) < 0) ?
                    current.request.requested_for.getDisplayValue() + ' (' + current.short_description + ')' :
                    current.request.requested_for.getDisplayValue()));
            let catItemDisplayValue: string = current.cat_item.getDisplayValue();
            let lines: string[] = [
                'Receive Backordered ' + catItemDisplayValue + '.',
                ''
            ];
            if (current.short_description.getValue() != catItemDisplayValue)
                lines.push('Description: ' + current.short_description);
            let requested_for: string = current.request.requested_for.getDisplayValue();
            lines.push('Requested For: ' + requested_for, 'VIP: ' + ((JSUtil.toBoolean(current.request.requested_for.vip)) ? "Yes" : "No"), 'Catalog Item: ' + catItemDisplayValue,
                'Quantity: ' + current.quantity);
            let opened_by: string = current.request.opened_by.getDisplayValue();
            if (opened_by != requested_for)
                lines.push('Requested By: ' + opened_by);
            lines.push('', 'IMPORTANT: The workflow for this request does not proceed until you close this task. Cancelling this task will also cancel the associated requested item!');
            task.description.setValue(lines.join('\n'));
            gs.eventQueue('army.sc_req_item.backordered', current, task.number.getValue());
            current.variables.request_item_backordered.setValue(true);
        }
    }
    namespace is_available_task_canceled {
        declare var current: sc_req_itemGlideRecord, workflow: IWorkflowVar, answer: 'yes' | 'no';
        function ifScript(): 'yes' | 'no' {
            if (JSUtil.toBoolean(current.active)) {
                var gr: sc_taskGlideRecord = <sc_taskGlideRecord>new GlideRecord('sc_task');
                gr.addQuery('number', workflow.scratchpad.task_number);
                gr.query();
                if (gr.next()) {
                    let state: number = parseInt(gr.state.getValue());
                    if (state < 3) {
                        gr.setValue('state', 3);
                        gr.update();
                    } else if (state > 3)
                        return 'yes';
                }
            }
            return 'no';
        }
        answer = ifScript();


    }
    function set_fulfillment_group_from_cat_item(current: sc_req_itemGlideRecord, workflow: IWorkflowVar): void {
        current.assignment_group = current.cat_item.group;
    }
}