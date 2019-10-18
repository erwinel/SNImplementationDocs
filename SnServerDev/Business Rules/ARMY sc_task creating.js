/// <reference path="../SnTypings/ServiceNowLegacy.d.ts" />
var ARMY_sc_task_creating;
(function (ARMY_sc_task_creating) {
    (function executeRule(current, previous /*null when async*/) {
        if (current.assignment_group.nil() && current.assigned_to.nil()) {
            if (current.request_item.assignment_group.nil()) {
                if (!current.request_item.cat_item.group.nil())
                    current.assignment_group.setValue(current.request_item.cat_item.group);
            }
            else
                current.assignment_group.setValue(current.request_item.assignment_group);
        }
    })(current, previous);
})(ARMY_sc_task_creating || (ARMY_sc_task_creating = {}));
//# sourceMappingURL=ARMY sc_task creating.js.map