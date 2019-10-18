/// <reference path="../SnTypings/ServiceNowLegacy.d.ts" />
var Incident_caller_profile_validation;
(function (Incident_caller_profile_validation) {
    (function executeRule(current, previous /*null when async*/) {
        if (current.caller_id.nil())
            current.caller_id.setValue(current.opened_by);
        else if (!current.caller_id.changes())
            return;
        var message;
        var missing = [];
        if (current.caller_id.building.nil())
            missing.push('Building');
        if (current.caller_id.department.nil())
            missing.push("Department");
        if (current.caller_id.u_red_phone.nil())
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
        var sys_id = current.caller_id.sys_id.getValue();
        if (sys_id === gs.getUserID())
            gs.addErrorMessage('Your user profile does not specify your ' + message +
                ' required for expedient incident resolution.\n<a href="/sys_user.do?sys_id=' + sys_id + '&sysparm_view=ess">Click here</a> to open your Profile and fix this issue.');
        else {
            message = "You have submitted a request on behalf of a user whose profile does not specify their " + message +
                " required for expedient incident resolution.\nAn email was sent to that user alerting them to update their profile.";
            if (gs.hasRole('user_admin,itil,admin'))
                gs.addErrorMessage(message + '\nYou may also <a href="/sys_user.do?sys_id=' + sys_id + '&sysparm_view=itil">Click here</a> to open their Profile and fix this issue.');
            else
                gs.addErrorMessage(message);
            gs.eventQueue('army.incident_caller.profile_incomplete', current, sys_id);
        }
    })(current, previous);
})(Incident_caller_profile_validation || (Incident_caller_profile_validation = {}));
//# sourceMappingURL=Incident caller profile validation.js.map