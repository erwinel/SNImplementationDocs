declare namespace x_44813_devjournal {
    interface Ix_44813_devjournal_entryColumns extends Isys_metadataColumns {
        readonly number: StringGlideElement;
        short_description: StringGlideElement;
        details: StringGlideElement;
    }
    type x_44813_devjournal_entryGlideRecord = GlideRecord & Ix_44813_devjournal_entryColumns;
    type x_44813_devjournal_entryGlideElementReference = GlidePropertiesElementReference<Ix_44813_devjournal_entryColumns, x_44813_devjournal_entryGlideRecord>;
    interface Ix_44813_devjournal_table_dev_journal_entryColumns extends Ix_44813_devjournal_entryColumns {
        source_table: StringGlideElement;
    }
    type x_44813_devjournal_table_dev_journal_entryGlideRecord = x_44813_devjournal_entryGlideRecord & Ix_44813_devjournal_table_dev_journal_entryColumns;
    type x_44813_devjournal_table_dev_journal_entryGlideElementReference = GlidePropertiesElementReference<Ix_44813_devjournal_table_dev_journal_entryColumns, x_44813_devjournal_table_dev_journal_entryGlideRecord>;
    interface Ix_44813_devjournal_field_dev_journal_entryColumns extends Ix_44813_devjournal_table_dev_journal_entryColumns {
        source_field: StringGlideElement;
    }
    type x_44813_devjournal_field_dev_journal_entryGlideRecord = x_44813_devjournal_table_dev_journal_entryGlideRecord & Ix_44813_devjournal_field_dev_journal_entryColumns;
    type x_44813_devjournal_field_dev_journal_entryGlideElementReference = GlidePropertiesElementReference<Ix_44813_devjournal_field_dev_journal_entryColumns, x_44813_devjournal_field_dev_journal_entryGlideRecord>;
    interface Ix_44813_devjournal_record_dev_journal_entryColumns extends Ix_44813_devjournal_field_dev_journal_entryColumns {
        field_value: StringGlideElement;
        url: StringGlideElement;
    }
    type x_44813_devjournal_record_dev_journal_entryGlideRecord = x_44813_devjournal_field_dev_journal_entryGlideRecord & Ix_44813_devjournal_record_dev_journal_entryColumns;
    type x_44813_devjournal_record_dev_journal_entryGlideElementReference = GlidePropertiesElementReference<Ix_44813_devjournal_record_dev_journal_entryColumns, x_44813_devjournal_record_dev_journal_entryGlideRecord>;
}
