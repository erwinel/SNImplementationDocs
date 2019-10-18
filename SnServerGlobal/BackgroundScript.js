var BackgroundScript;
(function (BackgroundScript) {
    var gr = new GlideRecord('sc_task');
    gr.addActiveQuery();
    gr.query();
    gr.next();
    var current = gr.request_item.getRefRecord();
    gs.eventQueue('lerwine.test.event', current, gr.getLink(true), gr.getDisplayValue());
    gs.info(gr.sys_id.toString());
})(BackgroundScript || (BackgroundScript = {}));
//# sourceMappingURL=BackgroundScript.js.map