/// <reference path="../SnTypings/ServiceNowLegacy.d.ts" />
declare var current: GlideRecord, previous: GlideRecord;

(function executeRule(current: GlideRecord, previous: GlideRecord /*null when async*/) {
    try {
        var gr = new GlideRecord('u_caller_vip_lookup_rules');
        gr.addQuery('u_caller', current.sys_id);
        gr.query();
        if (gr.next()) {
            gr.setValue('u_vip_priority', current.vip);
            gr.update();
            gs.addInfoMessage("Updated Incident VIP priority lookup table: Turning VIP status " + ((current.vip) ? "on." : "off."));
        } else {
            if (!current.vip)
                return;
            gr.newRecord();
            gr.setValue('u_caller', current.sys_id);
            gr.setValue('u_vip_priority', current.vip);
            gr.insert();
            gs.addInfoMessage("Added Incident VIP priority lookup table entry.");
        }
        gr = new GlideRecord('incident');
        gr.addActiveQuery();
        gr.addQuery('caller_id', current.sys_id);
        gr.addQuery('u_vip_priority', !current.vip);
        var lookups = [];
        var changes = [];
        var i, a;
        while (gr.next()) {
            var oldPriority = gr.priority;
            var priority = oldPriority;
            gr.u_vip_priority = current.vip;
            var impact = parseInt(gr.getValue('impact'));
            var urgency = parseInt(gr.getValue('urgency'));
            if (impact > 0 && impact < 4 && urgency > 0 && urgency < 4) {
                if (impact > lookups.length) {
                    for (i = lookups.length; i < impact; i++)
                        lookups.push([]);
                }
                var arr = lookups[impact - 1];
                if (urgency > arr.length) {
                    for (i = arr.length; i < urgency; i++)
                        arr.push([]);
                }
                var is_mission_related = gr.getValue('u_is_mission_related');
                arr = arr[impact - 1];
                if (is_mission_related) {
                    if (arr.length < 2) {
                        if (arr.length == 0)
                            arr.push([]);
                        a = [];
                        arr.push(a);
                        arr = a;
                    } else
                        arr = arr[1];
                } else {
                    if (arr.length == 0) {
                        a = [];
                        arr.push(a);
                        arr = a;
                    } else
                        arr = arr[0];
                }
                if (current.vip) {
                    if (arr.length < 2) {
                        if (arr.length == 0)
                            arr.push(0);
                        priority = 0;
                    } else
                        priority = arr[1];
                } else {
                    if (arr.length == 0) {
                        arr.push(0);
                        priority = 0;
                    } else
                        priority = arr[0];
                }
                if (priority == 0) {
                    var p = new GlideRecord('u_vip_priority_lookup_matcher_rules');
                    p.addActiveQuery();
                    p.addQuery('u_impact', gr.impact);
                    p.addQuery('u_urgency', gr.urgency);
                    p.addQuery('u_is_mission_related', is_mission_related);
                    p.addQuery('u_vip_priority', current.vip);
                    p.query();
                    if (!p.next() || (priority = parseInt(p.getValue('u_incident_priority'))) < 1)
                        priority = -1;
                    arr[(current.vip) ? 1 : 0] = priority;
                }

                if (priority > 0)
                    gr.setValue('priority', i);
            }
            gr.update();
            if (priority < 1 || priority == oldPriority)
                changes.push(gr.sys_id);
            else
                changes.push(gr.sys_id + " (" + oldPriority + "=>" + priority + ")");
        }
        if (changes.length == 0)
            gs.addInfoMessage("No incidents were updated");
        else if (changes.length == 1)
            gs.addInfoMessage("1 incident updated: " + changes[0]);
        else
            gs.addInfoMessage(changes.length + " incidents updated: " + changes.join(", "));
    } catch (e) {
        gs.addErrorMessage("Error updating VIP priority: " + e);
        gs.error("Error updating VIP priority: " + e);
    }
})(current, previous);