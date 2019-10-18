/// <reference path="../SnTypings/ServiceNowLegacy.d.ts" />
namespace ARMY_sc_task_created {
    declare var current: Isc_taskGlideRecord, previous: Isc_taskGlideRecord;
    (function executeRule(current: Isc_taskGlideRecord, previous?: Isc_taskGlideRecord /*null when async*/) {
        if (!current.assignment_group.nil())
            gs.eventQueue("sc_task.assigned.to.group", <sc_taskGlideRecord>current, current.assignment_group.getDisplayValue(), (gs.nil(previous)) ? "" : previous.getDisplayValue());
    })(current, previous);
}