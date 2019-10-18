namespace BackgroundScript {
    var gr: sc_taskGlideRecord = <sc_taskGlideRecord>new GlideRecord('sc_task');
    gr.addActiveQuery();
    gr.query();
    gr.next();
    let current: sc_cat_itemGlideRecord = <sc_cat_itemGlideRecord>gr.request_item.getRefRecord();
    gs.eventQueue('lerwine.test.event', current, gr.getLink(true), gr.getDisplayValue());
    gs.info(gr.sys_id.toString());
}