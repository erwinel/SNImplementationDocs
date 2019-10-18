/// <reference path="Definitions.ts" />
var x_44813_devjournal;
(function (x_44813_devjournal) {
    var RecordDevJournalSetUrl;
    (function (RecordDevJournalSetUrl) {
        (function executeRule(current, previous /*null when async*/) {
            if (!(current.source_table.nil() || current.source_field.nil())) {
                try {
                    var tableName = current.source_table.getValue();
                    var gr = new GlideRecord(tableName);
                    var fieldName = current.source_field.getValue();
                    if (current.field_value.nil())
                        gr.addNullQuery(fieldName);
                    else
                        gr.addQuery(fieldName, current.field_value.getValue());
                    current.url.setValue(tableName + "_list.do?" + gr.getEncodedQuery());
                    return;
                }
                catch (_a) { }
            }
            current.url.setValue('');
        })(current, previous);
    })(RecordDevJournalSetUrl = x_44813_devjournal.RecordDevJournalSetUrl || (x_44813_devjournal.RecordDevJournalSetUrl = {}));
})(x_44813_devjournal || (x_44813_devjournal = {}));
//# sourceMappingURL=RecordDevJournalSetUrl.js.map