/// <reference path="../../SnTypings/GlideSystem.d.ts" />
/// <reference path="../../SnTypings/GlideRecord.d.ts" />
/// <reference path="../../SnTypings/ServiceCatalog.d.ts" />
var workflows_hardware_catalog_item_request;
(function (workflows_hardware_catalog_item_request) {
    var verify_availability;
    (function (verify_availability) {
        function advanced_script(current, task, workflow) {
            task.short_description.setValue('Verify ' + current.cat_item.short_description + ' availability for ' +
                (((current.short_description + "").indexOf(current.cat_item.short_description.getValue()) < 0) ?
                    current.request.requested_for.getDisplayValue() + ' (' + current.short_description + ')' :
                    current.request.requested_for.getDisplayValue()));
            var catItemDisplayValue = current.cat_item.getDisplayValue();
            var lines = [
                'Please verify availability of ' + catItemDisplayValue + ' (quantity: ' + current.quantity + ').',
                '',
                'If the item is not available (ie. needs to be ordered), make sure to check the Backordered checkbox and specify the Estimated Delivery date on the associated request item.',
                ''
            ];
            if (current.short_description.getValue() != catItemDisplayValue)
                lines.push('Description: ' + current.short_description);
            var requested_for = current.request.requested_for.getDisplayValue();
            lines.push('Requested For: ' + requested_for, 'VIP: ' + ((JSUtil.toBoolean(current.request.requested_for.vip)) ? "Yes" : "No"), 'Catalog Item: ' + catItemDisplayValue, 'Quantity: ' + current.quantity);
            var opened_by = current.request.opened_by.getDisplayValue();
            if (opened_by != requested_for)
                lines.push('Requested By: ' + opened_by);
            lines.push('', 'IMPORTANT: The workflow for this request does not proceed until you close this task. Cancelling this task will also cancel the associated requested item!');
            task.description.setValue(lines.join('\n'));
            gs.eventQueue('army.sc_req_item.fulfill_order', current, task.number.getValue());
        }
    })(verify_availability || (verify_availability = {}));
    var notify_availability_validation_task;
    (function (notify_availability_validation_task) {
        (function () {
            var gr = new GlideRecord('sc_task');
            gr.addQuery('number', workflow.scratchpad().task_number);
            gr.query();
            if (gr.next())
                return "" + gr.sys_id;
            return "";
        }());
    })(notify_availability_validation_task || (notify_availability_validation_task = {}));
    function setItem1(current, workflow) {
        var gr = new GlideRecord('sc_task');
        gr.addQuery('number', workflow.scratchpad().task_number);
        gr.query();
        if (gr.next())
            return "" + gr.sys_id;
        //gs.eventQueue('army.sc_req_item.fulfill_order', current, "" + gr.sys_id);
    }
    var wait_approval_change;
    (function (wait_approval_change) {
        answer = (function () {
            if (JSUtil.getBooleanValue(current, "active") && current.approval.getValue() === "requested") {
                var gr = new GlideRecord('sc_task');
                gr.addQuery('number', workflow.scratchpad().task_number);
                gr.query();
                return !(gr.next() && JSUtil.getBooleanValue(gr, "active"));
            }
            return true;
        }());
    })(wait_approval_change || (wait_approval_change = {}));
    var receive_backordered_item;
    (function (receive_backordered_item) {
        function advanced_script(current, task, workflow) {
            task.short_description.setValue('Receive ' + current.cat_item.short_description + ' order for ' +
                (((current.short_description + "").indexOf(current.cat_item.short_description.getValue()) < 0) ?
                    current.request.requested_for.getDisplayValue() + ' (' + current.short_description + ')' :
                    current.request.requested_for.getDisplayValue()));
            var catItemDisplayValue = current.cat_item.getDisplayValue();
            var lines = [
                'Receive Backordered ' + catItemDisplayValue + '.',
                ''
            ];
            if (current.short_description.getValue() != catItemDisplayValue)
                lines.push('Description: ' + current.short_description);
            var requested_for = current.request.requested_for.getDisplayValue();
            lines.push('Requested For: ' + requested_for, 'VIP: ' + ((JSUtil.toBoolean(current.request.requested_for.vip)) ? "Yes" : "No"), 'Catalog Item: ' + catItemDisplayValue, 'Quantity: ' + current.quantity);
            var opened_by = current.request.opened_by.getDisplayValue();
            if (opened_by != requested_for)
                lines.push('Requested By: ' + opened_by);
            lines.push('', 'IMPORTANT: The workflow for this request does not proceed until you close this task. Cancelling this task will also cancel the associated requested item!');
            task.description.setValue(lines.join('\n'));
            gs.eventQueue('army.sc_req_item.backordered', current, task.number.getValue());
            current.variables.request_item_backordered.setValue(true);
        }
    })(receive_backordered_item || (receive_backordered_item = {}));
    var is_available_task_canceled;
    (function (is_available_task_canceled) {
        function ifScript() {
            if (JSUtil.toBoolean(current.active)) {
                var gr = new GlideRecord('sc_task');
                gr.addQuery('number', workflow.scratchpad().task_number);
                gr.query();
                if (gr.next()) {
                    var state = parseInt(gr.state.getValue());
                    if (state < 3) {
                        gr.setValue('state', 3);
                        gr.update();
                    }
                    else if (state > 3)
                        return 'yes';
                }
            }
            return 'no';
        }
        answer = ifScript();
    })(is_available_task_canceled || (is_available_task_canceled = {}));
    function set_fulfillment_group_from_cat_item(current, workflow) {
        current.assignment_group = current.cat_item.group;
    }
})(workflows_hardware_catalog_item_request || (workflows_hardware_catalog_item_request = {}));
//# sourceMappingURL=Hardware Catalog Item Request.js.map