/// <reference path="../../SnTypings/GlideSystem.d.ts" />
/// <reference path="../../SnTypings/GlideRecord.d.ts" />
/// <reference path="../../SnTypings/ServiceCatalog.d.ts" />

namespace army_generic_request_route {
    declare var current: sc_catalogGlideRecord;
    declare var template: TemplatePrinter;
    declare var email: GlideEmailOutbound;
    declare var email_action: sysevent_email_actionGlideRecord;
    declare var event: syseventGlideRecord;
    (function runMailScript(current: sc_catalogGlideRecord, template: TemplatePrinter, email: GlideEmailOutbound, email_action: sysevent_email_actionGlideRecord, event: syseventGlideRecord) {
        let gr: sc_taskGlideRecord = <sc_taskGlideRecord>new GlideRecord('sc_task');
        gr.addQuery('number', event.parm1.getValue());
        gr.query();
        gr.next();
        let taskLink: string = '<a href="' + gr.getLink(true) + '">' + event.parm1 + '</a>';
        template.print('<li><strong>Directly route to fulfillment group.</strong><ol>\n\t\t<li>Open ' + taskLink + '.</li>\n');
        template.print('\t\t<li>Use the "Variables" section of the task to select the fulfillment group, leaving the approval group blank.</li>\n');
        template.print('\t\t<li>Click the "Close Task" button to continue. The status for the associated request will be automatically updated and routed accordingly.</li>\n');
        template.print('\t</ol></li>\n<li><strong>Route to group for approval.</strong><ol>\n\t\t<li>Open ' + taskLink + '.</li>\n');
        template.print('\t\t<li>Use the "Variables" section of the task to select both the approval and the fulfillment groups.</li>\n');
        template.print('\t\t<li>Click the "Close Task" button to continue. The status for the associated request will be automatically updated.</li>\n');
        template.print('\t\t<li>Once (and if) the item is approved, the requested item will be re-assigned to the fulfillment groups.</li>\n\t</ol></li>\n');
        template.print('<li><strong>Route to another group for assessment.</strong>\n');
        template.print('\t<br />If your group is not able to determine the appropriate routing option, you can simply assign ' + taskLink + ' to another group.</li>\n');
        template.print('<li><strong>Cancel Request Item</strong><ol>\n');
        template.print('\t\t<li>Change "State" field of ' + taskLink + ' to "Closed Skipped" or "Closed Incomplete".</li>\n');
        template.print('\t\t<li>Click the "Update" button to save changes. The associated request item will be automatically updated.</li>\n\t</ol></li>');
    })(current, template, email, email_action, event);
}