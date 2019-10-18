/// <reference path="../SnTypings/ServiceNowLegacy.d.ts" />
namespace Catalog_requestor_profile_validation {
    declare var current: Isc_requestGlideRecord;
    declare var previous: Isc_requestGlideRecord | undefined;
    (function executeRule(current: Isc_requestGlideRecord, previous?: Isc_requestGlideRecord /*null when async*/) {
        if (current.requested_for.nil())
            current.requested_for.setValue(current.opened_by);
        else if (!current.requested_for.changes())
            return;

        var message: string;
        var missing: string[] = [];
        if (current.requested_for.building.nil())
            missing.push('Building');
        if (current.requested_for.department.nil())
            missing.push("Department");
        if (current.requested_for.u_red_phone.nil())
            missing.push("Red Phone");
        if (missing.length == 1)
            message = missing[0] + '.\nThis is';
        else {
            if (missing.length == 0)
                return;
            if (missing.length > 2)
                missing = [missing.join(", "), missing.pop()];
            message = missing.join(' or ') + '.\nThese are';
        }
        var sys_id = current.requested_for.sys_id.toString();
        if (sys_id == gs.getUserID())
            gs.addErrorMessage('Your user profile does not specify your ' + message +
                ' required for expedient request fulfillment.\n<a href="/sys_user.do?sys_id=' + sys_id + '&sysparm_view=ess">Click here</a> to open your Profile and fix this issue.');
        else {
            message = "You have submitted a request on behalf of a user whose profile does not specify their " + message +
                " required for expedient request fulfillment.\nAn email was sent to that user alerting them to update their profile.";
            if (gs.hasRole('user_admin,itil,admin'))
                gs.addErrorMessage(message + '\nYou may also <a href="/sys_user.do?sys_id=' + sys_id + '&sysparm_view=itil">Click here</a> to open their Profile and fix this issue.');
            else
                gs.addErrorMessage(message);
            gs.eventQueue('army.sc_requested_for.profile_incomplete', <sc_requestGlideRecord>current, sys_id);
        }
    })(current, previous);
}