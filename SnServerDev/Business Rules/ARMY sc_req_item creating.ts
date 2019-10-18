/// <reference path="../SnTypings/ServiceNowLegacy.d.ts" />
namespace ARMY_sc_req_item_creating {
    declare var current: Isc_req_itemGlideRecord;
    declare var previous: Isc_req_itemGlideRecord | undefined;
    (function executeRule(current: Isc_req_itemGlideRecord, previous?: Isc_req_itemGlideRecord /*null when async*/) {
        if (current.cat_item.group.nil()) {
            gs.warn("Catalog item " + current.cat_item.sys_id + " (" + current.cat_item.getDisplayValue() + ") has no fulfillment group.");
        }
        else
            current.assignment_group.setValue(current.cat_item.group);
var CatItem = new sn_sc.CatItem("fdafdfa1dba4bb00683b300f7c9619f6");
gs.info("hardware = " + CatItem.getRecordClass());
CatItem = new sn_sc.CatItem("8e07d871db68bb00683b300f7c9619bc");
gs.info("other = " + CatItem.getRecordClass());
CatItem = new sn_sc.CatItem("d8f4212bdb11f300683b300f7c96193a");
gs.info("new token = " + CatItem.getRecordClass());
CatItem = new sn_sc.CatItem("ad5323e6db81ff00b53f341f7c961997");
gs.info("incident = " + CatItem.getRecordClass());
        
        
        var gr: Isc_cat_itemGlideRecord = <Isc_cat_itemGlideRecord><any>new GlideRecord('sc_req_item');
        gr.addQuery('sys_id', 'fdafdfa1dba4bb00683b300f7c9619f6');
        gr.query();
        if (gr.next()) {
            gr.category.
        } else
            gs.warn('not found');
    })(current, previous);
}