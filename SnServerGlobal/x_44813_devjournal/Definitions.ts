namespace x_44813_devjournal {
    export declare interface Ix_44813_devjournal_entryColumns extends Isys_metadataColumns {
        readonly number: StringGlideElement,
        short_description: StringGlideElement,
        details: StringGlideElement
    }

    export declare type x_44813_devjournal_entryGlideRecord = GlideRecord & Ix_44813_devjournal_entryColumns;

    export declare type x_44813_devjournal_entryGlideElementReference = GlidePropertiesElementReference<Ix_44813_devjournal_entryColumns, x_44813_devjournal_entryGlideRecord>;

    export declare interface Ix_44813_devjournal_table_dev_journal_entryColumns extends Ix_44813_devjournal_entryColumns {
        source_table: StringGlideElement;
    }

    export declare type x_44813_devjournal_table_dev_journal_entryGlideRecord = x_44813_devjournal_entryGlideRecord & Ix_44813_devjournal_table_dev_journal_entryColumns;
    export declare type x_44813_devjournal_table_dev_journal_entryGlideElementReference = GlidePropertiesElementReference<Ix_44813_devjournal_table_dev_journal_entryColumns, x_44813_devjournal_table_dev_journal_entryGlideRecord>;

    export declare interface Ix_44813_devjournal_field_dev_journal_entryColumns extends Ix_44813_devjournal_table_dev_journal_entryColumns {
        source_field: StringGlideElement;
    }

    export declare type x_44813_devjournal_field_dev_journal_entryGlideRecord = x_44813_devjournal_table_dev_journal_entryGlideRecord & Ix_44813_devjournal_field_dev_journal_entryColumns;
    export declare type x_44813_devjournal_field_dev_journal_entryGlideElementReference = GlidePropertiesElementReference<Ix_44813_devjournal_field_dev_journal_entryColumns, x_44813_devjournal_field_dev_journal_entryGlideRecord>;

    export declare interface Ix_44813_devjournal_record_dev_journal_entryColumns extends Ix_44813_devjournal_field_dev_journal_entryColumns {
        field_value: StringGlideElement;
        url: StringGlideElement;
    }
    export declare type x_44813_devjournal_record_dev_journal_entryGlideRecord = x_44813_devjournal_field_dev_journal_entryGlideRecord & Ix_44813_devjournal_record_dev_journal_entryColumns;
    export declare type x_44813_devjournal_record_dev_journal_entryGlideElementReference = GlidePropertiesElementReference<Ix_44813_devjournal_record_dev_journal_entryColumns, x_44813_devjournal_record_dev_journal_entryGlideRecord>;
}