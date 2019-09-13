/// <reference path="ServiceNow.d.ts" />
/*
record/sys_user.department/write CONTEXT = Victor Paramount RC = false RULE =
cached, not evaluated	cached, access granted	cached, access granted	cached, access granted	record/sys_user/write	 Global
not evaluated	access denied	not evaluated	not evaluated	record/sys_user.department/write	 Global

record/sys_user.manager/write CONTEXT = Victor Paramount RC = false RULE =
cached, not evaluated	cached, access granted	cached, access granted	cached, access granted	record/sys_user/write	 Global
not evaluated	access denied	not evaluated	not evaluated	record/sys_user.manager/write	 Global

record/sys_user.mobile_phone/write CONTEXT = Victor Paramount RC = false RULE =
cached, not evaluated	cached, access granted	cached, access granted	cached, access granted	record/sys_user/write	 Global
not evaluated	access denied	not evaluated	not evaluated	record/sys_user.mobile_phone/write	 Global

record/sys_user.phone/write CONTEXT = Victor Paramount RC = false RULE =
cached, not evaluated	cached, access granted	cached, access granted	cached, access granted	record/sys_user/write	 Global
not evaluated	access denied	not evaluated	not evaluated	record/sys_user.phone/write	 Global

record/sys_user.title/write CONTEXT = Victor Paramount RC = false RULE =
cached, not evaluated	cached, access granted	cached, access granted	cached, access granted	record/sys_user/write	 Global
not evaluated	access denied	not evaluated	not evaluated	record/sys_user.title/write	 Global
https://dev75813.service-now.com/nav_to.do?uri=sys_user.do?sys_id=a8f98bb0eb32010045e1a5115206fe3a&sysparm_view=itil
https://dev75813.service-now.com/nav_to.do?uri=sys_user.do?sys_id=a8f98bb0eb32010045e1a5115206fe3a%26sysparm_view=ess

sc_request.inserted
sc_request.updated
sc_request.requested_for

army.sc_requested_for.profile_incomplete
Catalog requestor profile validation business rule
Notifies user when profile is incomplete when a service catalog item is submitted on their behalf.


army.incident_caller.profile_incomplete
Incident caller profile validation business rule
Notifies user when profile is incomplete when an incident is submitted on their behalf.

Your user profile is incomplete


record/cmn_building/read CONTEXT = cmn_building.sys_id=null RC = false RULE =*/
//not evaluated	access denied	not evaluated	not evaluated	record/*/read	 Global
//not evaluated	access granted	access granted	access denied	record/*/read	 Global
//not evaluated	access granted	access granted	access denied	record/*/read	 Global
function advancedScriptFunction(current, answer) {
    if (gs.getUserID() == current.sys_id.getValue() || gs.getUser().hasRole('itil,admin,user_admin'))
        answer = true;
    else
        answer = false;
}
function executeRule(current, previous /*null when async*/) {
    if (current.caller_id.nil())
        current.setValue('requested_for', current.opened_by);
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
    var sys_id = current.caller_id.sys_id.toString();
    if (sys_id == gs.getUserID())
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
}
//# sourceMappingURL=aclRuleCurrentUserOrUserAdmin.js.map