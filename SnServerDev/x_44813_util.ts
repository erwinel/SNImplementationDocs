/// <reference path="SnTypings/ServiceNowScoped.d.ts" />

namespace x_44813_util {
    export class IncidentHelper {
        readonly type: string = "IncidentHelper";
    }
    export class CatalogHelper {
        readonly type: string = 'CatalogHelper';
        initialize() {
            var gr: Isc_cat_itemGlideRecord = <Isc_cat_itemGlideRecord><any>new GlideRecord('sc_cat_item');
            gr.addQuery('sys_id', 'fdafdfa1dba4bb00683b300f7c9619f6');
            gr.query();
            gr.next();
            var category: Isc_categoryGlideRecord = gr.category.getRefRecord();
            category
        }
    }
}