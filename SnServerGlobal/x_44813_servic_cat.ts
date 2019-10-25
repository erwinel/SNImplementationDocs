/// <reference path="SnTypings/GlideSystem.d.ts" />
/// <reference path="SnTypings/GlideRecord.d.ts" />
/// <reference path="SnTypings/ServiceCatalog.d.ts" />

namespace x_44813_servic_cat {
    namespace RequestItemAvailabilityChanging {
        declare var current: sc_req_itemGlideRecord, previous: null;
        (function executeRule(current: sc_req_itemGlideRecord, previous: null /*null when async*/) {
            if ((<GlideElementBoolean>current.backordered).changesTo(true)) {
                if (current.sourced == true)
                    current.sourced = false;
                if (current.received == true)
                    current.received = false;
            }
            else if ((<GlideElementBoolean>current.received).changesTo(true)) {
                if (current.backordered == true)
                    current.backordered = false;
                if (current.sourced == false)
                    current.sourced = true;
            }
            else if ((<GlideElementBoolean>current.sourced).changesTo(true) && current.backordered == true) {
                current.backordered = false;
                if (current.received == false)
                    current.received = true;
            }
            if (gs.nil(current.assigned_to) && gs.nil(current.assignment_group)) {
                if (gs.nil(current.cat_item.group)) {
                    if (gs.nil(current.request.assignment_group))
                        return;
                    current.assignment_group = current.request.assignment_group;
                    if (!gs.nil(current.request.assigned_to)) {
                        current.assigned_to = current.request.assigned_to;
                        return;
                    }
                } else
                    current.assignment_group = current.cat_item.group;
                if (!gs.nil(current.assignment_group.default_assignee))
                    current.assigned_to = current.assignment_group.default_assignee;
            }
        })(current, previous);
    }
    namespace RequestItemAvailabilityChanged {
        declare var current: sc_req_itemGlideRecord, previous: null;
        (function executeRule(current: sc_req_itemGlideRecord, previous: null /*null when async*/) {
            if ((<GlideElementBoolean>current.backordered).changesTo(true))
                gs.eventQueue('x_44813_servic_cat.army.sc_req_item.backordered', current);
            else if ((<GlideElementBoolean>current.received).changesTo(true))
                gs.eventQueue('x_44813_servic_cat.army.sc_req_item.received', current);
            else if ((<GlideElementBoolean>current.sourced).changesTo(true))
                gs.eventQueue('x_44813_servic_cat.army.sc_req_item.sourced', current);
        })(current, previous);
    }
}