/// <reference path="SnTypings/GlideSystem.d.ts" />
/// <reference path="SnTypings/GlideRecord.d.ts" />
/// <reference path="SnTypings/ServiceCatalog.d.ts" />

namespace BackgroundScript {
    var gr: sc_req_itemGlideRecord = <sc_req_itemGlideRecord>new GlideRecord('sc_req_item');
    gr.query();
    var data: { number: string; active?: string; backordered?: string; received?: string; sourced?: string; }[] = [];
    while (gr.next()) {
        let d: { number: string; active?: string; backordered?: string; received?: string; sourced?: string; } = { number: "" + gr.number };
        if (!gr.active.nil())
            d.active = "" + gr.active;
        if (!gr.backordered.nil())
            d.backordered = "" + gr.backordered;
        if (!gr.received.nil())
            d.received = "" + gr.received;
        if (!gr.sourced.nil())
            d.sourced = "" + gr.sourced;
        data.push(d);
    }
    gs.info(JSON.stringify(data));
}