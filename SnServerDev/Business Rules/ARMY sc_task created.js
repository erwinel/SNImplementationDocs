/// <reference path="../SnTypings/ServiceNowLegacy.d.ts" />
var ARMY_sc_task_created;
(function (ARMY_sc_task_created) {
    (function executeRule(current, previous /*null when async*/) {
        if (!current.assignment_group.nil())
            gs.eventQueue("sc_task.assigned.to.group", current, current.assignment_group.getDisplayValue(), (gs.nil(previous)) ? "" : previous.getDisplayValue());
    })(current, previous);
})(ARMY_sc_task_created || (ARMY_sc_task_created = {}));
//# sourceMappingURL=ARMY sc_task created.js.map