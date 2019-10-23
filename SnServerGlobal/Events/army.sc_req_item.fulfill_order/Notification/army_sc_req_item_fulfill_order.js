/// <reference path="../../../SnTypings/GlideSystem.d.ts" />
/// <reference path="../../../SnTypings/GlideRecord.d.ts" />
/// <reference path="../../../SnTypings/ServiceCatalog.d.ts" />
var army_sc_req_item_fulfill_order;
(function (army_sc_req_item_fulfill_order) {
    (function runMailScript(current, template, email, email_action, event) {
        if (gs.nil(event.parm1))
            gs.info(event.name + " raised, but parm1 had no value");
        else {
            gs.info(event.name + " raised, parm1 = " + event.parm1 + ' (' + JSUtil.describeObject(event.parm1) + ')');
            var gr = new GlideRecord('sc_task');
            gr.addQuery('number', event.parm1.getValue());
            gr.query();
            if (gr.next()) {
                gs.info(event.name + ': Found task');
                gs.addInfoMessage('Found task');
                var taskLink = '<a href="' + gr.getLink(true) + '">' + event.parm1 + '</a>';
                template.print('<ol>\n<li>Open ' + taskLink + '.</li>\n');
                template.print('<li>If the item has to be ordered, Check the Backordered flag.</li>\n');
                template.print('<li>Close ' + taskLink + ' to indicate that the item has been backordered or it is ready for delivery / provisioning.</li>\n</ol>\n');
                template.print('Note: If you backordered the item, don\'t forget to specify the estimated delivery date on teh associted request item (<a href="' + current.getLink(true) + '">' + current.getDisplayValue() + '</a>)');
            }
            else
                gs.info(event.name + ': Task not found');
        }
    })(current, template, email, email_action, event);
})(army_sc_req_item_fulfill_order || (army_sc_req_item_fulfill_order = {}));
//# sourceMappingURL=army_sc_req_item_fulfill_order.js.map