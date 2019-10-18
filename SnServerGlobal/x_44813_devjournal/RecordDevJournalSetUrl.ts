/// <reference path="Definitions.ts" />

namespace x_44813_devjournal {
    export namespace RecordDevJournalSetUrl {
        declare var current: x_44813_devjournal_record_dev_journal_entryGlideRecord, previous: x_44813_devjournal_record_dev_journal_entryGlideRecord;
        (function executeRule(current: x_44813_devjournal_record_dev_journal_entryGlideRecord, previous?: x_44813_devjournal_record_dev_journal_entryGlideRecord /*null when async*/) {
            if (!(current.source_table.nil() || current.source_field.nil())) {
                try {
                    let tableName: string = current.source_table.getValue();
                    var gr: GlideRecord = new GlideRecord(tableName);
                    let fieldName: string = current.source_field.getValue();
                    if (current.field_value.nil())
                        gr.addNullQuery(fieldName);
                    else
                        gr.addQuery(fieldName, current.field_value.getValue());
                    current.url.setValue(tableName + "_list.do?" + gr.getEncodedQuery());
                    return;
                } catch { }
            }
            current.url.setValue('');
        })(current, previous);
    }
}