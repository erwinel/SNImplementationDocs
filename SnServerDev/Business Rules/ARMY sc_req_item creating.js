/// <reference path="../SnTypings/ServiceNowLegacy.d.ts" />
var ARMY_sc_req_item_creating;
(function (ARMY_sc_req_item_creating) {
    (function executeRule(current, previous /*null when async*/) {
        if (current.cat_item.group.nil()) {

            gs.warn("Catalog item " + current.cat_item.sys_id + " (" + current.cat_item.getDisplayValue() + ") has no fulfillment group.");
        }
        else
            current.assignment_group.setValue(current.cat_item.group);

        var gr: sc_req_itemGlideRecord = new GlideRecord('sc_req_item');

    })(current, previous);
})(ARMY_sc_req_item_creating || (ARMY_sc_req_item_creating = {}));
//# sourceMappingURL=ARMY sc_req_item creating.js.map