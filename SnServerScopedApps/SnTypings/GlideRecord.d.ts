declare type GlideRefColumn<TFields extends IGlideElementColumns> = TFields & (GlideRecord | GlideElement);

/**
 * GlideElementDescriptor object.
 * @class GlideElementDescriptor
 */
declare abstract class GlideElementDescriptor {
    getAttachmentEncryptionType(): Packages.java.lang.String;
    getEncryptionType(): Packages.java.lang.String;
    getInternalType(): Packages.java.lang.String;
    getLabel(): Packages.java.lang.String;
    getLength(): number;
    getName(): Packages.java.lang.String;
    getPlural(): Packages.java.lang.String;
    hasAttachmentsEncrypted(): boolean;
    isAutoOrSysID(): boolean;
    isChoiceTable(): boolean;
    isEdgeEncrypted(): boolean;
    isVirtual(): boolean;
}

declare type StringGlideElement = IGlideValueElement<string, string> & GlideElement;
declare type StringGlideObject = string | GlideRecord | GlideElement;
declare type BooleanString = "true" | "false";

declare interface IGlideElementColumns {
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof IGlideRecord
	 */
    sys_id: StringGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof IGlideRecord
	 */
    sys_created_by: StringGlideElement;
	/**
	 * Created
	 * @type {GlideElementGlideObject}
	 * @memberof IGlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: GlideElementGlideObject;
	/**
	 * Updates
	 * @type {GlideElementNumeric}
	 * @memberof IGlideRecord
	 * @description Internal type is integer
	 */
    sys_mod_count: GlideElementNumeric;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof IGlideRecord
	 */
    sys_updated_by: StringGlideElement;
	/**
	 * Updated
	 * @type {GlideElementGlideObject}
	 * @memberof IGlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: GlideElementGlideObject;
}

/**
 * Basic definition of a GlideElement.
 * @interface GlideElement
 */
declare interface IGlideElement<TIn, TOut extends TIn & string, TRecord extends GlideRecord> extends IGlideElementColumns {
    /**
     * Determines if the user's role permits the creation of new records in this field.
     * @returns {boolean} True if the field can be created, false otherwise.
     * @memberof IGlideElement
     */
    canCreate(): boolean;

    /**
     * Indicates whether the user's role permits them to read the associated GlideRecord.
     * @returns {boolean} True if the field can be read, false otherwise.
     * @memberof IGlideElement
     */
    canRead(): boolean;

    /**
     * Determines whether the user's role permits them to write to the associated GlideRecord.
     * @returns {boolean} True if the user can write to the field, false otherwise.
     * @memberof IGlideElement
     */
    canWrite(): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @returns {boolean} True if the fields have been changed, false if the field has not.
     * @memberof IGlideElement
     */
    changes(): boolean;

    /**
     * Determines if the previous value of the current field matches the specified object.
     * @param {*} o An object value to check against the previous value of the current field.
     * @returns {boolean} True if the previous value matches, false if it does not.
     * @memberof IGlideElement
     */
    changesFrom(o: any): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @param {*} o An object value to check against the new value of the current field.
     * @returns {boolean} True if the new value matches, false if it does not.
     * @memberof IGlideElement
     */
    changesTo(o: any): boolean;

    /**
     * Returns the value of the specified attribute from the dictionary.
     * @param {string} attributeName Attribute name
     * @returns {string} Attribute value.
     * @memberof IGlideElement
     */
    getAttribute(attributeName: string): string;

    /**
     * Returns the Boolean value of the specified attribute from the dictionary.
     * @param {string} attributeName Attribute name.
     * @returns {boolean} Boolean value of the attribute. Returns false if the attribute does not exist.
     * @memberof IGlideElement
     */
    getBooleanAttribute(attributeName: string): boolean;

    getChoiceValue(): string;

    getChoices(dependent?: string): Packages.java.lang.util.IArrayList<Packages.java.lang.String>;

    getDecryptedValue(): string;

    /**
     * Gets the formatted display value of the field.
     * @param {number} [maxCharacters] Maximum characters desired
     * @memberof IGlideElement
     */
    getDisplayValue(maxCharacters?: number): string;

    /**
     * Gets the current element descriptor.
     * @returns {GlideElementDescriptor}
     * @memberof IGlideElement
     */
    getED(): GlideElementDescriptor;

    getGlobalDisplayValue(): string;

    /**
     * Returns the HTML value of a field.
     * @param {number} [maxChars] Maximum number of characters to return.
     * @returns {string} HTML value for the field.
     * @memberof IGlideElement
     */
    getHTMLValue(maxCharacters?: number): string;

    getJournalEntry(mostRecent: number): string;

    /**
     * Gets the object label.
     * @returns {string} The object label.
     * @memberof IGlideElement
     */
    getLabel(): string;

    // getModifiedBy(): string;

    /**
     * Gets the name of the field.
     * @returns {string} The name of the field.
     * @memberof IGlideElement
     */
    getName(): string;

    /**
     * Gets the table name for a reference element.
     * @returns {string} The table name of the reference.
     * @memberof IGlideElement
     */
    getReferenceTable(): string;

    /**
     * Gets a GlideRecord object for a given reference element.
     * @returns {GlideRecord} The GlideRecord object.
     * @memberof IGlideElement
     */
    getRefRecord(): TRecord;

    /**
     * Gets the name of the table on which the field resides.
     * @returns {string} Name of the table. The returned value may be different from the table Class that the record is in. See Tables and Classes in the product documentation.
     * @memberof IGlideElement
     */
    getTableName(): string;

    /**
     * Gets the value of the current element.
     * @returns {string}
     * @memberof IGlideElement
     */
    getValue(): TOut | "" | null;

    /**
     * Determines if a field is null.
     * @returns {boolean} True if the field is null or an empty string, false if not.
     * @memberof IGlideElement
     */
    nil(): boolean;

    /**
     * Sets the value of a date/time element to the specified number of milliseconds since January 1, 1970 00:00:00 GMT.
     * @param {number} milliseconds Number of milliseconds since 1/1/1970.
     * @memberof IGlideElement
     */
    setDateNumericValue(milliseconds: number): void;

    setDisplayValue(value: any): void;

    setError(errorMessage: string): void;

    setPhoneNumber(phoneNumber: any, strict: boolean): void;

    /**
     * Sets the value of a field.
     * @param {*} value Object value to set the field to.
     * @memberof IGlideElement
     */
    setValue(value: TIn | TOut | IGlideElement<TIn, TOut, TRecord> | "" | null): void;

    /**
     * Converts the value to a string.
     * @returns {string} The value as a string
     * @memberof IGlideElement
     */
    toString(): TOut;
}

declare interface IGlideValueElement<TIn, TOut extends TIn & string> extends IGlideElement<TIn, TOut, GlideRecord> { }

declare type GlideNilElement<TIn, TOut extends TIn & string, TElement extends GlideElement> = IGlideValueElement<TIn, TOut & ""> & GlideElement & { nil(): true };

declare abstract class GlideElement implements IGlideElement<string | GlideElement | GlideRecord, string, GlideRecord> {
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof GlideRecord
	 */
    sys_id: StringGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof GlideRecord
	 */
    sys_created_by: StringGlideElement;
	/**
	 * Created
	 * @type {GlideElementGlideObject}
	 * @memberof GlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: GlideElementGlideObject;
	/**
	 * Updates
	 * @type {GlideElementNumeric}
	 * @memberof GlideRecord
	 * @description Internal type is integer
	 */
    sys_mod_count: GlideElementNumeric;
	/**
	 * Updated by
	 * @type {GlideElementGlideObject}
	 * @memberof GlideRecord
	 */
    sys_updated_by: GlideElementGlideObject;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof GlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: StringGlideElement;

    /**
     * Determines if the user's role permits the creation of new records in this field.
     * @returns {boolean} True if the field can be created, false otherwise.
     * @memberof GlideElement
     */
    canCreate(): boolean;

    /**
     * Indicates whether the user's role permits them to read the associated GlideRecord.
     * @returns {boolean} True if the field can be read, false otherwise.
     * @memberof GlideElement
     */
    canRead(): boolean;

    /**
     * Determines whether the user's role permits them to write to the associated GlideRecord.
     * @returns {boolean} True if the user can write to the field, false otherwise.
     * @memberof GlideElement
     */
    canWrite(): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @returns {boolean} True if the fields have been changed, false if the field has not.
     * @memberof GlideElement
     */
    changes(): boolean;

    /**
     * Determines if the previous value of the current field matches the specified object.
     * @param {*} o An object value to check against the previous value of the current field.
     * @returns {boolean} True if the previous value matches, false if it does not.
     * @memberof GlideElement
     */
    changesFrom(o: any): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @param {*} o An object value to check against the new value of the current field.
     * @returns {boolean} True if the new value matches, false if it does not.
     * @memberof GlideElement
     */
    changesTo(o: any): boolean;

    /**
     * Returns the value of the specified attribute from the dictionary.
     * @param {string} attributeName Attribute name
     * @returns {string} Attribute value.
     * @memberof GlideElement
     */
    getAttribute(attributeName: string): string;

    /**
     * Returns the Boolean value of the specified attribute from the dictionary.
     * @param {string} attributeName Attribute name.
     * @returns {boolean} Boolean value of the attribute. Returns false if the attribute does not exist.
     * @memberof GlideElement
     */
    getBooleanAttribute(attributeName: string): boolean;

    getChoiceValue(): string;

    getChoices(dependent?: string): Packages.java.lang.util.IArrayList<Packages.java.lang.String>;

    getDecryptedValue(): string;

    /**
     * Gets the formatted display value of the field.
     * @param {number} [maxCharacters] Maximum characters desired
     * @memberof GlideElement
     */
    getDisplayValue(maxCharacters?: number): string;

    /**
     * Gets the current element descriptor.
     * @returns {GlideElementDescriptor}
     * @memberof GlideElement
     */
    getED(): GlideElementDescriptor;

    getGlobalDisplayValue(): string;

    /**
     * Returns the HTML value of a field.
     * @param {number} [maxChars] Maximum number of characters to return.
     * @returns {string} HTML value for the field.
     * @memberof GlideElement
     */
    getHTMLValue(maxCharacters?: number): string;

    getJournalEntry(mostRecent: number): string;

    /**
     * Gets the object label.
     * @returns {string} The object label.
     * @memberof GlideElement
     */
    getLabel(): string;

    // getModifiedBy(): string;

    /**
     * Gets the name of the field.
     * @returns {string} The name of the field.
     * @memberof GlideElement
     */
    getName(): string;

    /**
     * Gets the table name for a reference element.
     * @returns {string} The table name of the reference.
     * @memberof GlideElement
     */
    getReferenceTable(): string;

    /**
     * Gets a GlideRecord object for a given reference element.
     * @returns {GlideRecord} The GlideRecord object.
     * @memberof GlideElement
     */
    getRefRecord(): GlideRecord;

    /**
     * Gets the name of the table on which the field resides.
     * @returns {string} Name of the table. The returned value may be different from the table Class that the record is in. See Tables and Classes in the product documentation.
     * @memberof GlideElement
     */
    getTableName(): string;

    /**
     * Gets the value of the current element.
     * @returns {string}
     * @memberof GlideElement
     */
    getValue(): string;

    /**
     * Determines if a field is null.
     * @returns {boolean} True if the field is null or an empty string, false if not.
     * @memberof GlideElement
     */
    nil(): boolean;

    /**
     * Sets the value of a date/time element to the specified number of milliseconds since January 1, 1970 00:00:00 GMT.
     * @param {number} milliseconds Number of milliseconds since 1/1/1970.
     * @memberof GlideElement
     */
    setDateNumericValue(milliseconds: number): void;

    setDisplayValue(value: any): void;

    setError(errorMessage: string): void;

    setPhoneNumber(phoneNumber: any, strict: boolean): void;

    /**
     * Sets the value of a field.
     * @param {*} value Object value to set the field to.
     * @memberof GlideElement
     */
    setValue(value: any): void;

    /**
     * Converts the value to a string.
     * @returns {string} The value as a string
     * @memberof GlideElement
     */
    toString(): string;
}

declare abstract class GlideElementBoolean extends GlideElement implements IGlideValueElement<BooleanString | boolean, BooleanString> {
    /**
     * Gets the value of the current element.
     * @returns {BooleanString}
     * @memberof IGlideElement
     */
    getValue(): BooleanString;
    setValue(value: BooleanString | boolean | GlideElementBoolean): void;
    toString(): BooleanString;
}

declare abstract class GlideElementGlideObject extends GlideElement implements IGlideValueElement<string, string> { }

declare abstract class GlideElementNumeric extends GlideElement implements IGlideValueElement<number | string, string> {
    setValue(value: string | number | IGlideValueElement<number | string, string>): void;
}

declare type GlidePropertiesRecord<TProperties extends IGlideElementColumns> = GlideRecord & TProperties;
declare type GlidePropertiesElement<TProperties extends IGlideElementColumns> = GlideElement & TProperties;
declare type GlidePropertiesElementReference<TProperties extends IGlideElementColumns, TRecord extends GlidePropertiesRecord<TProperties>> = GlideElementReference & TProperties;

declare abstract class GlideElementReference extends GlideElement { }

declare abstract class GlideElementUserImage extends GlideElement implements IGlideValueElement<string, string> { }

declare abstract class GlideElementDocumentation extends GlideElement { }

declare abstract class GlideElementPassword2 extends GlideElement { }

declare abstract class GlideElementRelatedTags extends GlideElement { }

declare abstract class GlideElementScript extends GlideElement { }

declare abstract class GlideElementConditions extends GlideElement { }

declare abstract class GlideElementDomainId extends GlideElement { }

declare interface Isys_metadataColumns extends IGlideElementColumns {
	/**
	 * Class
	 * @type {GlideElementSysClassName}
	 * @memberof Isys_metadataFields
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElementSysClassName;
	/**
	 * Display name
	 * @type {StringGlideElement}
	 * @memberof Isys_metadataFields
	 */
    sys_name: StringGlideElement;
	/**
	 * Package
	 * @type {sys_packageGlideElementReference}
	 * @memberof Isys_metadataFields
	 * @description Reference to Package (IGlideRefElement<Isys_packageGlideRecord>)
	 */
    sys_package: sys_packageGlideElementReference;
	/**
	 * Protection policy
	 * @type {StringGlideElement}
	 * @memberof Isys_metadataFields
	 */
    sys_policy: StringGlideElement;
	/**
	 * Application
	 * @type {sys_scopeGlideElementReference}
	 * @memberof Isys_metadataFields
	 * @description Reference to Application (IGlideRefElement<Isys_scopeGlideRecord>)
	 */
    sys_scope: sys_scopeGlideElementReference;
	/**
	 * Update name
	 * @type {StringGlideElement}
	 * @memberof Isys_metadataFields
	 */
    sys_update_name: StringGlideElement;
}

declare interface Isys_scopeColumns extends Isys_metadataColumns {
	/**
	 * JavaScript Mode
	 * @type {StringGlideElement}
	 * @memberof Isys_scopeFields
	 */
    js_level: StringGlideElement;
	/**
	 * Logo
	 * @type {GlideElementUserImage}
	 * @memberof Isys_scopeFields
	 * @description Internal type is "user_image"
	 */
    logo: GlideElementUserImage;
	/**
	 * Private
	 * @type {GlideElementBoolean}
	 * @memberof Isys_scopeFields
	 */
    private: GlideElementBoolean;
	/**
	 * Restrict Table Choices
	 * @type {GlideElementBoolean}
	 * @memberof Isys_scopeFields
	 */
    restrict_table_access: GlideElementBoolean;
	/**
	 * Restrict Runtime Access
	 * @type {StringGlideElement}
	 * @memberof Isys_scopeFields
	 */
    runtime_access_tracking: StringGlideElement;
	/**
	 * Scope
	 * @type {StringGlideElement}
	 * @memberof Isys_scopeFields
	 */
    scope: StringGlideElement;
	/**
	 * Application administration
	 * @type {GlideElementBoolean}
	 * @memberof Isys_scopeFields
	 */
    scoped_administration: GlideElementBoolean;
	/**
	 * Short description
	 * @type {StringGlideElement}
	 * @memberof Isys_scopeFields
	 */
    short_description: StringGlideElement;
	/**
	 * Template
	 * @type {StringGlideElement}
	 * @memberof Isys_scopeFields
	 */
    template: StringGlideElement;
	/**
	 * Vendor
	 * @type {StringGlideElement}
	 * @memberof Isys_scopeFields
	 */
    vendor: StringGlideElement;
	/**
	 * Vendor prefix
	 * @type {StringGlideElement}
	 * @memberof Isys_scopeFields
	 */
    vendor_prefix: StringGlideElement;
}

declare type sys_scopeGlideElementReference = GlidePropertiesElementReference<Isys_scopeColumns, sys_scopeGlideRecord>;

declare interface Isys_packageColumns extends IGlideElementColumns {
	/**
	 * Active
	 * @type {GlideElementBoolean}
	 * @memberof Isys_packageFields
	 */
    active: GlideElementBoolean;
	/**
	 * Subscription requirement
	 * @type {StringGlideElement}
	 * @memberof Isys_packageFields
	 */
    enforce_license: StringGlideElement;
	/**
	 * Licensable
	 * @type {GlideElementBoolean}
	 * @memberof Isys_packageFields
	 */
    licensable: GlideElementBoolean;
	/**
	 * Subscription Category
	 * @type {StringGlideElement}
	 * @memberof Isys_packageFields
	 */
    license_category: StringGlideElement;
	/**
	 * Subscription Model
	 * @type {StringGlideElement}
	 * @memberof Isys_packageFields
	 */
    license_model: StringGlideElement;
	/**
	 * Name
	 * @type {StringGlideElement}
	 * @memberof Isys_packageFields
	 */
    name: StringGlideElement;
	/**
	 * ID
	 * @type {StringGlideElement}
	 * @memberof Isys_packageFields
	 */
    source: StringGlideElement;
	/**
	 * Class
	 * @type {GlideElementSysClassName}
	 * @memberof Isys_packageFields
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElementSysClassName;
	/**
	 * Trackable
	 * @type {GlideElementBoolean}
	 * @memberof Isys_packageFields
	 */
    trackable: GlideElementBoolean;
	/**
	 * Version
	 * @type {GlideElement}
	 * @memberof Isys_packageFields
	 * @description Internal type is "version"
	 */
    version: GlideElement;
}

declare type sys_packageGlideElementReference = GlidePropertiesElementReference<Isys_packageColumns, sys_packageGlideRecord>;

declare abstract class GlideElementSysClassName extends GlideElement implements IGlideValueElement<string, string> {
    setValue(value: string | IGlideValueElement<string, string>): void;
}

declare interface Isys_numberColumns extends Isys_metadataColumns {
    category: GlideElementReference;
    maximum_digits: GlideElementNumeric;
    number: GlideElementNumeric;
    prefix: GlideElement;
    sys_tags: GlideElementRelatedTags;
}

declare interface Isys_encryption_contextColumns extends Isys_metadataColumns {
    encryption_key: GlideElementPassword2;
    name: GlideElement;
    sys_class_name: GlideElementSysClassName;
    sys_tags: GlideElementRelatedTags;
    type: GlideElement;
}

declare interface Isys_user_roleColumns extends Isys_metadataColumns {
	/**
	 * Assignable by
	 * @type {sys_user_roleElementReference}
	 * @memberof Isys_user_roleFields
	 * @description Reference to Role (IGlideRefElement<Isys_user_roleGlideRecord>)
	 */
    assignable_by: sys_user_roleElementReference;
	/**
	 * Can delegate
	 * @type {GlideElementBoolean}
	 * @memberof Isys_user_roleFields
	 */
    can_delegate: GlideElementBoolean;
	/**
	 * Description
	 * @type {StringGlideElement}
	 * @memberof Isys_user_roleFields
	 */
    description: StringGlideElement;
	/**
	 * Elevated privilege
	 * @type {GlideElementBoolean}
	 * @memberof Isys_user_roleFields
	 */
    elevated_privilege: GlideElementBoolean;
	/**
	 * Encryption context
	 * @type {sys_encryption_contextGlideElementReference}
	 * @memberof Isys_user_roleFields
	 * @description Reference to Encryption Context (IGlideRefElement<Isys_encryption_contextGlideRecord>)
	 */
    encryption_context: sys_encryption_contextGlideElementReference;
	/**
	 * Grantable
	 * @type {GlideElementBoolean}
	 * @memberof Isys_user_roleFields
	 */
    grantable: GlideElementBoolean;
	/**
	 * Includes roles
	 * @type {StringGlideElement}
	 * @memberof Isys_user_roleFields
	 */
    includes_roles: StringGlideElement;
	/**
	 * Name
	 * @type {StringGlideElement}
	 * @memberof Isys_user_roleFields
	 */
    name: StringGlideElement;
	/**
	 * Requires Subscription
	 * @type {StringGlideElement}
	 * @memberof Isys_user_roleFields
	 */
    requires_subscription: StringGlideElement;
	/**
	 * Application Administrator
	 * @type {GlideElementBoolean}
	 * @memberof Isys_user_roleFields
	 */
    scoped_admin: GlideElementBoolean;
	/**
	 * Suffix
	 * @type {StringGlideElement}
	 * @memberof Isys_user_roleFields
	 */
    suffix: StringGlideElement;
}

declare type sys_encryption_contextGlideElementReference = GlidePropertiesElementReference<Isys_encryption_contextColumns, sys_encryption_contextGlideRecord>;

declare type sys_numberGlideElementReference = GlidePropertiesElementReference<Isys_numberColumns, sys_numberGlideRecord>;

declare type sys_db_objectElementReference = GlidePropertiesElementReference<Isys_db_objectColumns, sys_db_objectGlideRecord>;

declare type sys_dictionaryElementReference = GlidePropertiesElementReference<Isys_dictionaryColumns, sys_dictionaryGlideRecord>;

declare type sys_user_roleElementReference = GlidePropertiesElementReference<Isys_user_roleColumns, sys_user_roleGlideRecord>;

declare type sys_choiceElementReference = GlidePropertiesElementReference<Isys_choiceColumns, sys_choiceGlideRecord>;

declare interface Isys_db_objectColumns extends Isys_metadataColumns {
	/**
	 * Accessible from
	 * @type {StringGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    access: StringGlideElement;
	/**
	 * Allow UI actions
	 * @type {GlideElementBoolean}
	 * @memberof Isys_db_objectFields
	 */
    actions_access: GlideElementBoolean;
	/**
	 * Allow new fields
	 * @type {GlideElementBoolean}
	 * @memberof Isys_db_objectFields
	 */
    alter_access: GlideElementBoolean;
	/**
	 * Caller Access
	 * @type {StringGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    caller_access: StringGlideElement;
	/**
	 * Allow client scripts
	 * @type {GlideElementBoolean}
	 * @memberof Isys_db_objectFields
	 */
    client_scripts_access: GlideElementBoolean;
	/**
	 * Allow configuration
	 * @type {GlideElementBoolean}
	 * @memberof Isys_db_objectFields
	 */
    configuration_access: GlideElementBoolean;
	/**
	 * Can create
	 * @type {GlideElementBoolean}
	 * @memberof Isys_db_objectFields
	 */
    create_access: GlideElementBoolean;
	/**
	 * Create access controls
	 * @type {GlideElementBoolean}
	 * @memberof Isys_db_objectFields
	 */
    create_access_controls: GlideElementBoolean;
	/**
	 * Can delete
	 * @type {GlideElementBoolean}
	 * @memberof Isys_db_objectFields
	 */
    delete_access: GlideElementBoolean;
	/**
	 * Extension model
	 * @type {StringGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    extension_model: StringGlideElement;
	/**
	 * Extensible
	 * @type {GlideElementBoolean}
	 * @memberof Isys_db_objectFields
	 */
    is_extendable: GlideElementBoolean;
	/**
	 * Label
	 * @type {GlideElementDocumentation}
	 * @memberof Isys_db_objectFields
	 * @description Internal type is "documentation_field"
	 */
    label: GlideElementDocumentation;
	/**
	 * Live feed
	 * @type {GlideElementBoolean}
	 * @memberof Isys_db_objectFields
	 */
    live_feed_enabled: GlideElementBoolean;
	/**
	 * Name
	 * @type {StringGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    name: StringGlideElement;
	/**
	 * Auto number
	 * @type {sys_numberGlideElementReference}
	 * @memberof Isys_db_objectFields
	 * @description Reference to Number (IGlideRefElement<Isys_numberGlideRecord>)
	 */
    number_ref: sys_numberGlideElementReference;
	/**
	 * Provider class
	 * @type {StringGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    provider_class: StringGlideElement;
	/**
	 * Can read
	 * @type {GlideElementBoolean}
	 * @memberof Isys_db_objectFields
	 */
    read_access: GlideElementBoolean;
	/**
	 * Extends table
	 * @type {sys_db_objectElementReference}
	 * @memberof Isys_db_objectFields
	 * @description Reference to Table (IGlideRefElement<Isys_db_objectGlideRecord>)
	 */
    super_class: sys_db_objectElementReference;
	/**
	 * Sys class code
	 * @type {GlideElement}
	 * @memberof Isys_db_objectFields
	 * @description Internal type is "sys_class_code"
	 */
    sys_class_code: GlideElement;
	/**
	 * Sys class path
	 * @type {GlideElement}
	 * @memberof Isys_db_objectFields
	 * @description Internal type is "sys_class_path"
	 */
    sys_class_path: GlideElement;
	/**
	 * Can update
	 * @type {GlideElementBoolean}
	 * @memberof Isys_db_objectFields
	 */
    update_access: GlideElementBoolean;
	/**
	 * User role
	 * @type {Isys_user_roleGlideElement}
	 * @memberof Isys_db_objectFields
	 * @description Reference to Role (IGlideRefElement<Isys_user_roleGlideRecord>)
	 */
    user_role: sys_user_roleElementReference;
	/**
	 * Allow access to this table via web services
	 * @type {GlideElementBoolean}
	 * @memberof Isys_db_objectFields
	 */
    ws_access: GlideElementBoolean;
}

declare interface Isys_dictionaryColumns extends Isys_metadataColumns {
	/**
	 * Active
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    active: GlideElementBoolean;
	/**
	 * Array
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    array: GlideElementBoolean;
	/**
	 * Array denormalized
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    array_denormalized: GlideElementBoolean;
	/**
	 * Attributes
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    attributes: StringGlideElement;
	/**
	 * Audit
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    audit: GlideElementBoolean;
	/**
	 * Calculation
	 * @type {GlideElementScript}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "script"
	 */
    calculation: GlideElementScript;
	/**
	 * Choice
	 * @type {GlideElementNumeric}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "integer"
	 */
    choice: GlideElementNumeric;
	/**
	 * Choice field
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "field_name"
	 */
    choice_field: StringGlideElement;
	/**
	 * Choice table
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "table_name"
	 */
    choice_table: StringGlideElement;
	/**
	 * Column label
	 * @type {GlideElementDocumentation}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "documentation_field"
	 */
    column_label: GlideElementDocumentation;
	/**
	 * Comments
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    comments: StringGlideElement;
	/**
	 * Create roles
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "user_roles"
	 */
    create_roles: GlideElement;
	/**
	 * Defaultsort
	 * @type {IStringGlideElement}
	 * @memberof GlideElementNumeric
	 * @description Internal type is "integer"
	 */
    defaultsort: GlideElementNumeric;
	/**
	 * Default value
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    default_value: StringGlideElement;
	/**
	 * Delete roles
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "user_roles"
	 */
    delete_roles: GlideElement;
	/**
	 * Dependent
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    dependent: StringGlideElement;
	/**
	 * Dependent on field
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "field_name"
	 */
    dependent_on_field: GlideElement;
	/**
	 * Display
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    display: GlideElementBoolean;
	/**
	 * Dynamic creation
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    dynamic_creation: GlideElementBoolean;
	/**
	 * Dynamic creation script
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    dynamic_creation_script: StringGlideElement;
	/**
	 * Dynamic default value
	 * @type {GlideElementReference}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Reference to Dynamic Filter Options (IGlideRefElement<Isys_filter_option_dynamicGlideRecord>)
	 */
    dynamic_default_value: GlideElementReference;
	/**
	 * Dynamic ref qual
	 * @type {GlideElementReference}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Reference to Dynamic Filter Options (IGlideRefElement<Isys_filter_option_dynamicGlideRecord>)
	 */
    dynamic_ref_qual: GlideElementReference;
	/**
	 * Column name
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    element: StringGlideElement;
	/**
	 * Element reference
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    element_reference: GlideElementBoolean;
	/**
	 * Foreign database
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    foreign_database: StringGlideElement;
	/**
	 * Function definition
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    function_definition: StringGlideElement;
	/**
	 * Function field
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    function_field: GlideElementBoolean;
	/**
	 * Type
	 * @type {GlideElementReference}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Reference to Field class (IGlideRefElement<Isys_glide_objectGlideRecord>)
	 */
    internal_type: GlideElementReference;
	/**
	 * Mandatory
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    mandatory: GlideElementBoolean;
	/**
	 * Max length
	 * @type {GlideElementNumeric}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "integer"
	 */
    max_length: GlideElementNumeric;
	/**
	 * Table
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "table_name"
	 */
    name: StringGlideElement;
	/**
	 * Next element
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    next_element: StringGlideElement;
	/**
	 * Primary
	 * @type {IBooleanGlideElement}
	 * @memberof GlideElementBoolean
	 */
    primary: GlideElementBoolean;
	/**
	 * Read only
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    read_only: GlideElementBoolean;
	/**
	 * Read roles
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "user_roles"
	 */
    read_roles: GlideElement;
	/**
	 * Reference
	 * @type {sys_db_objectElementReference}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Reference to Table (IGlideRefElement<Isys_db_objectGlideRecord>)
	 */
    reference: sys_db_objectElementReference;
	/**
	 * Reference cascade rule
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    reference_cascade_rule: StringGlideElement;
	/**
	 * Reference floats
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    reference_floats: GlideElementBoolean;
	/**
	 * Reference key
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    reference_key: StringGlideElement;
	/**
	 * Reference qual
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    reference_qual: StringGlideElement;
	/**
	 * Reference qual condition
	 * @type {GlideElementConditions}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "conditions"
	 */
    reference_qual_condition: GlideElementConditions;
	/**
	 * Reference type
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    reference_type: StringGlideElement;
	/**
	 * Sizeclass
	 * @type {GlideElementNumeric}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "integer"
	 */
    sizeclass: GlideElementNumeric;
	/**
	 * Spell check
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    spell_check: GlideElementBoolean;
	/**
	 * Staged
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    staged: GlideElementBoolean;
	/**
	 * Table reference
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    table_reference: GlideElementBoolean;
	/**
	 * Text index
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    text_index: GlideElementBoolean;
	/**
	 * Unique
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    unique: GlideElementBoolean;
	/**
	 * Use dependent field
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    use_dependent_field: GlideElementBoolean;
	/**
	 * Use dynamic default
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    use_dynamic_default: GlideElementBoolean;
	/**
	 * Use reference qualifier
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    use_reference_qualifier: StringGlideElement;
	/**
	 * Calculated
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    virtual: GlideElementBoolean;
	/**
	 * Widget
	 * @type {StringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    widget: StringGlideElement;
	/**
	 * Write roles
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "user_roles"
	 */
    write_roles: GlideElement;
	/**
	 * XML view
	 * @type {GlideElementBoolean}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    xml_view: GlideElementBoolean;
}

declare interface Isys_choiceColumns extends IGlideElementColumns {
	/**
	 * Dependent value
	 * @type {StringGlideElement}
	 * @memberof Isys_choiceFields
	 */
    dependent_value: StringGlideElement;
	/**
	 * Element
	 * @type {StringGlideElement}
	 * @memberof Isys_choiceFields
	 */
    element: StringGlideElement;
	/**
	 * Hint
	 * @type {StringGlideElement}
	 * @memberof Isys_choiceFields
	 */
    hint: StringGlideElement;
	/**
	 * Inactive
	 * @type {GlideElementBoolean}
	 * @memberof Isys_choiceFields
	 */
    inactive: GlideElementBoolean;
	/**
	 * Label
	 * @type {StringGlideElement}
	 * @memberof Isys_choiceFields
	 */
    label: StringGlideElement;
	/**
	 * Language
	 * @type {StringGlideElement}
	 * @memberof Isys_choiceFields
	 */
    language: StringGlideElement;
	/**
	 * Table
	 * @type {StringGlideElement}
	 * @memberof Isys_choiceFields
	 * @description Internal type is "table_name"
	 */
    name: StringGlideElement;
	/**
	 * Sequence
	 * @type {GlideElementNumeric}
	 * @memberof Isys_choiceFields
	 * @description Internal type is integer
	 */
    sequence: GlideElementNumeric;
	/**
	 * Domain
	 * @type {GlideElementDomainId}
	 * @memberof Isys_choiceFields
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElementDomainId;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof Isys_choiceFields
	 * @description Internal type is "domain_path"
	 */
    sys_domain_path: GlideElement;
	/**
	 * Value
	 * @type {StringGlideElement}
	 * @memberof Isys_choiceFields
	 */
    value: StringGlideElement;
}
/**
 * Query operator values that can be used for string value comparisons.
 */
declare type StringQueryOperator = "=" | "!=" | "IN" | "NOT IN" | "STARTSWITH" | "ENDSWITH" | "CONTAINS" | "DOES NOT CONTAIN" | "INSTANCEOF";

/**
 * Query operator values that can be used for numerical operations.
 */
declare type NumberQueryOperator = "=" | "!=" | ">" | ">=" | "<" | "<=";

/**
 * Query operator values.
 */
declare type QueryOperator = StringQueryOperator | NumberQueryOperator;

/**
 * GlideQueryCondition object.
 * @class GlideQueryCondition
 */
declare abstract class GlideQueryCondition {
    /**
     * Adds an AND condition to the current condition.
     * @param {string} name The name of a field.
     * @param {QueryOperator} oper The operator for the query (=,!=,>,>=,<,<=,IN,NOT IN,STARTSWITH,ENDSWITH,CONTAINS,DOES NOT CONTAIN,INSTANCEOF).
     * @param {*} value The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addCondition(name: string, oper: QueryOperator, value: any): GlideQueryCondition;
    /**
     * Adds an AND condition to the current condition. Assumes the equals operator.
     * @param {string} name The name of a field.
     * @param {*} value The value of a field.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addCondition(name: string, value: any): GlideQueryCondition;
    /**
     * Adds an AND condition to the current condition.
     * @param {GlideQueryCondition} queryCondition Condition to add.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addCondition(queryCondition: GlideQueryCondition): GlideQueryCondition
    /**
     * Adds an OR condition to the current condition.
     * @param {string} name The name of a field.
     * @param {QueryOperator} oper The operator for the query (=,!=,>,>=,<,<=,IN,NOT IN,STARTSWITH,ENDSWITH,CONTAINS,DOES NOT CONTAIN,INSTANCEOF).
     * @param {*} value The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addOrCondition(name: string, oper: QueryOperator, value: any): GlideQueryCondition;
    /**
     * Adds an OR condition to the current condition. Assumes the equals operator.
     * @param {string} name The name of a field.
     * @param {*} value The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addOrCondition(name: string, value: any): GlideQueryCondition;
    /**
     * Adds an OR condition to the current condition. Assumes the equals operator.
     * @param {GlideQueryCondition} queryCondition Condition to add.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addOrCondition(queryCondition: GlideQueryCondition): GlideQueryCondition;
}

declare interface IGlideRecord extends IGlideElementColumns {
    /**

    /**
     * Adds a filter to return active records.
     * @returns {GlideQueryCondition} Filter to return active records.
     */
    addActiveQuery(): GlideQueryCondition;

    /**
     * Adds an encoded query to other queries that may have been set.
     * @param {string} query An encoded query string.
     */
    addEncodedQuery(query: string): void;

    /**
     * Adds a filter to return records based on a relationship in a related table.
     * @param {string} joinTable Table name
     * @param {*} [primaryField] If other than sys_id, the primary field
     * @param {*} [joinTableField] If other than sys_id, the field that joins the tables
     * @returns {GlideQueryCondition} A filter that lists records where the relationships match.
     */
    addJoinQuery(joinTable: string, primaryField?: any, joinTableField?: any): GlideQueryCondition;

    /**
     * A filter that specifies records where the value of the field passed in the parameter is not null.
     * @param {string} fieldName The name of the field to be checked.
     * @returns {GlideQueryCondition} A filter that specifies records where the value of the field passed in the parameter is not null.
     */
    addNotNullQuery(fieldName: string): GlideQueryCondition;
    /**
     * Adds a filter to return records where the value of the specified field is null.
     * @param {string} fieldName The name of the field to be checked.
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addNullQuery(fieldName: string): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} query An encoded query string.
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(query: string): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} name Table field name.
     * @param {*} value Value on which to query (not case-sensitive).
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(name: string, value: any): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} name Table field name.
     * @param {string} operator Query operator (=,!=,>,>=,<,<=,IN,NOT IN,STARTSWITH,ENDSWITH,CONTAINS,DOES NOT CONTAIN,INSTANCEOF).
     * @param {*} value Value on which to query (not case-sensitive).
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(name: string, operator: QueryOperator, value: any): GlideQueryCondition;
    /**
     * Determines if the Access Control Rules, which include the user's roles, permit inserting new records in this table.
     * @returns {boolean} True if the user's roles permit creation of new records in this table.
     */
    canCreate(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit deleting records in this table.
     * @returns {boolean} True if the user's roles permit deletions of records in this table.
     */
    canDelete(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit reading records in this table.
     * @returns {boolean} True if the user's roles permit reading records from this table.
     */
    canRead(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit editing records in this table.
     * @returns {boolean} True if the user's roles permit writing to records from this table.
     */
    canWrite(): boolean;

    /**
     * Sets a range of rows to be returned by subsequent queries.
     * @param {number} firstRow The first row to include.
     * @param {number} lastRow The last row to include.
     * @param {boolean} forceCount If true, the getRowCount() method will return all possible records.
     */
    chooseWindow(firstRow: number, lastRow: number, forceCount: boolean): void;

    /**
     * Deletes multiple records that satisfy the query condition.
     */
    deleteMultiple(): void;

    /**
     * Deletes the current record.
     * @returns {boolean} True if the record was deleted; false if no record was found to delete.
     */
    deleteRecord(): boolean;
    /**
     * Defines a GlideRecord based on the specified expression of 'name = value'.
     * @param {string} name Column name
     * @param {*} [value] Value to match. If value is not specified, then the expression used is 'sys_id = name'.
     * @returns {boolean} True if one or more matching records was found. False if no matches found.
     */
    get(name: string, value?: any): boolean;

    /**
     * Returns the dictionary attributes for the specified field.
     * @param {string} fieldName Field name for which to return the dictionary attributes
     * @returns {string|null|undefined} Dictionary attributes
     */
    getAttribute(fieldName: string): string | null | undefined;

    /**
     * Returns the table's label.
     * @returns {string} Table's label
     */
    getClassDisplayValue(): string;

    /**
     * Retrieves the display value for the current record.
     * @returns {string|null|undefined} The display value for the current record.
     */
    getDisplayValue(): string | null | undefined;
    getED(): GlideElementDescriptor;

    /**
     * Retrieves the GlideElement object for the specified field.
     * @param {string} columnName Name of the column to get the element from.
     * @returns {GlideElement} The GlideElement for the specified column of the current record.
     */
    getElement(columnName: string): GlideElement;

    /**
     * Retrieves the query condition of the current result set as an encoded query string.
     * @returns {string} The encoded query as a string.
     */
    getEncodedQuery(): string;

    /**
     * Returns the field's label.
     * @returns {string} Field's label.
     */
    getLabel(): string;

    /**
     * Retrieves the last error message. If there is no last error message, null is returned.
     * @returns {string|null|undefined} The last error message as a string.
     */
    getLastErrorMessage(): string | null | undefined;

    /**
     * Retrieves a link to the current record.
     * @param {boolean} noStack If true, the sysparm_stack parameter is not appended to the link. The parameter sysparm_stack specifies the page to visit after closing the current link.
     * @returns {string} A link to the current record as a string.
     */
    getLink(noStack: boolean): string;
    /**
     * Retrieves the class name for the current record.
     * @returns {string} The class name.
     */
    getRecordClassName(): string;

    /**
     * Retrieves the number of rows in the query result.
     * @returns {number} The number of rows.
     */
    getRowCount(): number;

    /**
     * Retrieves the name of the table associated with the GlideRecord.
     * @returns {string} The table name.
     */
    getTableName(): string;
    /**
     * Gets the primary key of the record, which is usually the sys_id unless otherwise specified.
     * @returns {string|null|undefined} The unique primary key as a String, or null if the key is null.
     */
    getUniqueValue(): string | null | undefined;

    /**
     * Retrieves the string value of an underlying element in a field.
     * @param {string} name The name of the field to get the value from.
     * @returns {string|null|undefined} The value of the field.
     */
    getValue(name: string): string | null | undefined;

    /**
     * Determines if there are any more records in the GlideRecord object.
     * @returns {boolean} True if there are more records in the query result set.
     */
    hasNext(): boolean;
    /**
     * Inserts a new record using the field values that have been set for the current record.
     * @returns {string} Unique ID of the inserted record, or null if the record is not inserted.
     */
    insert(): string;

    /**
     * Creates an empty record suitable for population before an insert.
     */
    initialize(): void;

    /**
     * Checks to see if the current database action is to be aborted.
     * @returns {boolean} True if the current database action is to be aborted.
     */
    isActionAborted(): boolean;
    /**
     * Checks if the current record is a new record that has not yet been inserted into the database.
     * @returns {boolean} True if the record is new and has not been inserted into the database.
     */
    isNewRecord(): boolean;

    /**
     * Determines if the table exists.
     * @returns {boolean} True if table is valid or if record was successfully retrieved. False if table is invalid or record was not successfully retrieved.
     */
    isValid(): boolean;

    /**
     * Determines if the specified field is defined in the current table.
     * @param {string} columnName The name of the the field.
     * @returns {boolean} True if the field is defined for the current table.
     */
    isValidField(columnName: string): boolean;

    /**
     * Determines if current record is a valid record.
     * @returns {boolean} True if the current record is valid. False if past the end of the record set.
     */
    isValidRecord(): boolean;
    /**
     * Creates a new GlideRecord record, sets the default values for the fields, and assigns a unique ID to the record.
     */
    newRecord(): void;

    /**
     * Moves to the next record in the GlideRecord object.
     * @returns {boolean} True if moving to the next record is successful. False if there are no more records in the result set.
     */
    next(): boolean;

    /**
     * Moves to the next record in the GlideRecord object.
     * @returns {boolean} True if moving to the next record is successful. False if there are no more records in the result set.
     */
    _next(): boolean;
    /**
     * Retrieves the current operation being performed, such as insert, update, or delete.
     * @returns {string} The current operation.
     */
    operation(): string;

    /**
     * Specifies an orderBy column.
     * @param {string} name The column name used to order the records in this GlideRecord object.
     */
    orderBy(name: string): void;

    query(): void;
    _query(): void;

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.
     * @param {string} [name] The column name to query on.
     * @param {*} [value] The value to query for.
     */
    query(field?: string, value?: any): void;

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.
     * @param {string} [name] The column name to query on.
     * @param {*} [value] The value to query for.
     */
    _query(field: string, value: any): void;

    /**
     * Specifies a decending orderBy column.
     * @param {string} name The column name used to order the records in this GlideRecord object.
     */
    orderByDesc(name: string): void;
    /**
     * Sets a flag to indicate if the next database action (insert, update, delete) is to be aborted. This is often used in business rules.
     * @param b True to abort the next action. False if the action is to be allowed.
     */
    setAbortAction(b: boolean): void;

    /**
     * Sets the limit for number of records are fetched by the GlideRecord query.
     * @param {number} maxNumRecords The maximum number of records to fetch.
     */
    setLimit(maxNumRecords: number): void;
    /**
     * Sets sys_id value for the current record.
     * @param {string} guid The GUID to be assigned to the current record.
     */
    setNewGuidValue(guid: string): void;

    /**
     * Sets the value of the field with the specified name to the specified value.
     * @param {string} name Name of the field.
     * @param {*} value The value to assign to the field.
     */
    setValue(name: string, value: any): void;

    /**
     * Enables or disables the running of business rules, script engines, and audit.
     * @param {boolean} enable If true (default), enables business rules. If false, disables business rules.
     */
    setWorkflow(enable: boolean): void;

    /**
     * Updates the GlideRecord with any changes that have been made. If the record does not already exist, it is inserted.
     * @param {string} [reason] The reason for the update. The reason is displayed in the audit record.
     * @returns {string|null} Unique ID of the new or updated record. Returns null if the update fails.
     */
    update(reason?: string): string | null;

    /**
     * Updates each GlideRecord in the list with any changes that have been made.
     */
    updateMultiple(): void;
}

declare class GlideRecord implements IGlideRecord {
	/**
	 * Sys ID
	 * @type {StringGlideElement}
	 * @memberof GlideRecord
	 */
    sys_id: StringGlideElement;
	/**
	 * Created by
	 * @type {StringGlideElement}
	 * @memberof GlideRecord
	 */
    sys_created_by: StringGlideElement;
	/**
	 * Created
	 * @type {GlideElementGlideObject}
	 * @memberof GlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: GlideElementGlideObject;
	/**
	 * Updates
	 * @type {GlideElementNumeric}
	 * @memberof GlideRecord
	 * @description Internal type is integer
	 */
    sys_mod_count: GlideElementNumeric;
	/**
	 * Updated by
	 * @type {StringGlideElement}
	 * @memberof GlideRecord
	 */
    sys_updated_by: StringGlideElement;
	/**
	 * Updated
	 * @type {GlideElementGlideObject}
	 * @memberof GlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: GlideElementGlideObject;

    [key: string]: any;
    getFields(): Packages.java.lang.util.ArrayList;
    constructor(tableName: string);

    /**
     * Adds a filter to return active records.
     * @returns {GlideQueryCondition} Filter to return active records.
     */
    addActiveQuery(): GlideQueryCondition;

    /**
     * Adds an encoded query to other queries that may have been set.
     * @param {string} query An encoded query string.
     */
    addEncodedQuery(query: string): void;

    /**
     * Adds a filter to return records based on a relationship in a related table.
     * @param {string} joinTable Table name
     * @param {*} [primaryField] If other than sys_id, the primary field
     * @param {*} [joinTableField] If other than sys_id, the field that joins the tables
     * @returns {GlideQueryCondition} A filter that lists records where the relationships match.
     */
    addJoinQuery(joinTable: string, primaryField?: any, joinTableField?: any): GlideQueryCondition;

    /**
     * A filter that specifies records where the value of the field passed in the parameter is not null.
     * @param {string} fieldName The name of the field to be checked.
     * @returns {GlideQueryCondition} A filter that specifies records where the value of the field passed in the parameter is not null.
     */
    addNotNullQuery(fieldName: string): GlideQueryCondition;
    /**
     * Adds a filter to return records where the value of the specified field is null.
     * @param {string} fieldName The name of the field to be checked.
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addNullQuery(fieldName: string): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} query An encoded query string.
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(query: string): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} name Table field name.
     * @param {*} value Value on which to query (not case-sensitive).
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(name: string, value: any): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} name Table field name.
     * @param {string} operator Query operator (=,!=,>,>=,<,<=,IN,NOT IN,STARTSWITH,ENDSWITH,CONTAINS,DOES NOT CONTAIN,INSTANCEOF).
     * @param {*} value Value on which to query (not case-sensitive).
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(name: string, operator: QueryOperator, value: any): GlideQueryCondition;
    /**
     * Determines if the Access Control Rules, which include the user's roles, permit inserting new records in this table.
     * @returns {boolean} True if the user's roles permit creation of new records in this table.
     */
    canCreate(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit deleting records in this table.
     * @returns {boolean} True if the user's roles permit deletions of records in this table.
     */
    canDelete(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit reading records in this table.
     * @returns {boolean} True if the user's roles permit reading records from this table.
     */
    canRead(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit editing records in this table.
     * @returns {boolean} True if the user's roles permit writing to records from this table.
     */
    canWrite(): boolean;

    /**
     * Sets a range of rows to be returned by subsequent queries.
     * @param {number} firstRow The first row to include.
     * @param {number} lastRow The last row to include.
     * @param {boolean} forceCount If true, the getRowCount() method will return all possible records.
     */
    chooseWindow(firstRow: number, lastRow: number, forceCount: boolean): void;

    /**
     * Deletes multiple records that satisfy the query condition.
     */
    deleteMultiple(): void;

    /**
     * Deletes the current record.
     * @returns {boolean} True if the record was deleted; false if no record was found to delete.
     */
    deleteRecord(): boolean;
    /**
     * Defines a GlideRecord based on the specified expression of 'name = value'.
     * @param {string} name Column name
     * @param {*} [value] Value to match. If value is not specified, then the expression used is 'sys_id = name'.
     * @returns {boolean} True if one or more matching records was found. False if no matches found.
     */
    get(name: string, value?: any): boolean;

    /**
     * Returns the dictionary attributes for the specified field.
     * @param {string} fieldName Field name for which to return the dictionary attributes
     * @returns {string|null|undefined} Dictionary attributes
     */
    getAttribute(fieldName: string): string | null | undefined;

    /**
     * Returns the table's label.
     * @returns {string} Table's label
     */
    getClassDisplayValue(): string;

    /**
     * Retrieves the display value for the current record.
     * @returns {string|null|undefined} The display value for the current record.
     */
    getDisplayValue(): string | null | undefined;
    getED(): GlideElementDescriptor;

    /**
     * Retrieves the GlideElement object for the specified field.
     * @param {string} columnName Name of the column to get the element from.
     * @returns {GlideElement} The GlideElement for the specified column of the current record.
     */
    getElement(columnName: string): GlideElement;

    /**
     * Retrieves the query condition of the current result set as an encoded query string.
     * @returns {string} The encoded query as a string.
     */
    getEncodedQuery(): string;

    /**
     * Returns the field's label.
     * @returns {string} Field's label.
     */
    getLabel(): string;

    /**
     * Retrieves the last error message. If there is no last error message, null is returned.
     * @returns {string|null|undefined} The last error message as a string.
     */
    getLastErrorMessage(): string | null | undefined;

    /**
     * Retrieves a link to the current record.
     * @param {boolean} noStack If true, the sysparm_stack parameter is not appended to the link. The parameter sysparm_stack specifies the page to visit after closing the current link.
     * @returns {string} A link to the current record as a string.
     */
    getLink(noStack: boolean): string;
    /**
     * Retrieves the class name for the current record.
     * @returns {string} The class name.
     */
    getRecordClassName(): string;

    /**
     * Retrieves the number of rows in the query result.
     * @returns {number} The number of rows.
     */
    getRowCount(): number;

    /**
     * Retrieves the name of the table associated with the GlideRecord.
     * @returns {string} The table name.
     */
    getTableName(): string;
    /**
     * Gets the primary key of the record, which is usually the sys_id unless otherwise specified.
     * @returns {string|null|undefined} The unique primary key as a String, or null if the key is null.
     */
    getUniqueValue(): string | null | undefined;

    /**
     * Retrieves the string value of an underlying element in a field.
     * @param {string} name The name of the field to get the value from.
     * @returns {string|null|undefined} The value of the field.
     */
    getValue(name: string): string | null | undefined;

    /**
     * Determines if there are any more records in the GlideRecord object.
     * @returns {boolean} True if there are more records in the query result set.
     */
    hasNext(): boolean;
    /**
     * Inserts a new record using the field values that have been set for the current record.
     * @returns {string} Unique ID of the inserted record, or null if the record is not inserted.
     */
    insert(): string;

    /**
     * Creates an empty record suitable for population before an insert.
     */
    initialize(): void;

    /**
     * Checks to see if the current database action is to be aborted.
     * @returns {boolean} True if the current database action is to be aborted.
     */
    isActionAborted(): boolean;
    /**
     * Checks if the current record is a new record that has not yet been inserted into the database.
     * @returns {boolean} True if the record is new and has not been inserted into the database.
     */
    isNewRecord(): boolean;

    /**
     * Determines if the table exists.
     * @returns {boolean} True if table is valid or if record was successfully retrieved. False if table is invalid or record was not successfully retrieved.
     */
    isValid(): boolean;

    /**
     * Determines if the specified field is defined in the current table.
     * @param {string} columnName The name of the the field.
     * @returns {boolean} True if the field is defined for the current table.
     */
    isValidField(columnName: string): boolean;

    /**
     * Determines if current record is a valid record.
     * @returns {boolean} True if the current record is valid. False if past the end of the record set.
     */
    isValidRecord(): boolean;
    /**
     * Creates a new GlideRecord record, sets the default values for the fields, and assigns a unique ID to the record.
     */
    newRecord(): void;

    /**
     * Moves to the next record in the GlideRecord object.
     * @returns {boolean} True if moving to the next record is successful. False if there are no more records in the result set.
     */
    next(): boolean;

    /**
     * Moves to the next record in the GlideRecord object.
     * @returns {boolean} True if moving to the next record is successful. False if there are no more records in the result set.
     */
    _next(): boolean;
    /**
     * Retrieves the current operation being performed, such as insert, update, or delete.
     * @returns {string} The current operation.
     */
    operation(): string;

    /**
     * Specifies an orderBy column.
     * @param {string} name The column name used to order the records in this GlideRecord object.
     */
    orderBy(name: string): void;

    query(): void;
    _query(): void;

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.
     * @param {string} [name] The column name to query on.
     * @param {*} [value] The value to query for.
     */
    query(field?: string, value?: any): void;

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.
     * @param {string} [name] The column name to query on.
     * @param {*} [value] The value to query for.
     */
    _query(field: string, value: any): void;

    /**
     * Specifies a decending orderBy column.
     * @param {string} name The column name used to order the records in this GlideRecord object.
     */
    orderByDesc(name: string): void;
    /**
     * Sets a flag to indicate if the next database action (insert, update, delete) is to be aborted. This is often used in business rules.
     * @param b True to abort the next action. False if the action is to be allowed.
     */
    setAbortAction(b: boolean): void;

    /**
     * Sets the limit for number of records are fetched by the GlideRecord query.
     * @param {number} maxNumRecords The maximum number of records to fetch.
     */
    setLimit(maxNumRecords: number): void;
    /**
     * Sets sys_id value for the current record.
     * @param {string} guid The GUID to be assigned to the current record.
     */
    setNewGuidValue(guid: string): void;

    /**
     * Sets the value of the field with the specified name to the specified value.
     * @param {string} name Name of the field.
     * @param {*} value The value to assign to the field.
     */
    setValue(name: string, value: any): void;

    /**
     * Enables or disables the running of business rules, script engines, and audit.
     * @param {boolean} enable If true (default), enables business rules. If false, disables business rules.
     */
    setWorkflow(enable: boolean): void;

    /**
     * Updates the GlideRecord with any changes that have been made. If the record does not already exist, it is inserted.
     * @param {string} [reason] The reason for the update. The reason is displayed in the audit record.
     * @returns {string|null} Unique ID of the new or updated record. Returns null if the update fails.
     */
    update(reason?: string): string | null;

    /**
     * Updates each GlideRecord in the list with any changes that have been made.
     */
    updateMultiple(): void;
}

declare type InvalidGlideRecord<TRecord extends GlideRecord> = TRecord & {
    isValidRecord(): false;
    sys_id: GlideNilElement<string, string, StringGlideElement>;
}

declare type sys_metadataGlideRecord = GlideRecord & Isys_metadataColumns;

declare type sys_packageGlideRecord = GlideRecord & Isys_packageColumns;

declare type sys_scopeGlideRecord = GlideRecord & Isys_scopeColumns;

declare type sys_numberGlideRecord = GlideRecord & Isys_numberColumns;

declare type sys_db_objectGlideRecord = GlideRecord & Isys_db_objectColumns;

declare type sys_user_roleGlideRecord = GlideRecord & Isys_user_roleColumns;

declare type sys_encryption_contextGlideRecord = GlideRecord & Isys_encryption_contextColumns;

declare type sys_dictionaryGlideRecord = GlideRecord & Isys_dictionaryColumns;

declare type sys_choiceGlideRecord = GlideRecord & Isys_choiceColumns;

declare namespace com {
    export namespace glide {
        export namespace script {
            export abstract class FieldGlideDescriptor extends GlideElement {
            }
        }
    }
}