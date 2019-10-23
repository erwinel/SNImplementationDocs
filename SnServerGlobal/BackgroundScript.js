/// <reference path="SnTypings/GlideSystem.d.ts" />
/// <reference path="SnTypings/GlideRecord.d.ts" />
/// <reference path="SnTypings/ServiceCatalog.d.ts" />
var BackgroundScript;
(function (BackgroundScript) {
    var gr = new GlideRecord('sc_req_item');
    gr.query();
    var data = [];
    while (gr.next()) {
        var d = { number: "" + gr.number };
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
})(BackgroundScript || (BackgroundScript = {}));
//# sourceMappingURL=BackgroundScript.js.map