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

/**
 * Basic definition of a GlideElement.
 * @interface GlideElement
 */
declare interface IGlideElement {
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
    getRefRecord(): IGlideRecord;
    
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
    getValue(): string;

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
    setValue(value: any): void;

    /**
     * Converts the value to a string.
     * @returns {string} The value as a string
     * @memberof IGlideElement
     */
    toString(): string;
}

declare type BooleanString = "true"|"false";

declare interface INumberBasedGlideElement<S extends string, N extends number, T extends S | N> extends IGlideElement {
    /**
     * Gets the value of the current element.
     * @returns {S}
     * @memberof INumberBasedGlideElement
     */
    getValue(): S;

    /**
     * Sets the value of a field.
     * @param {T} value Object value to set the field to.
     * @memberof INumberBasedGlideElement
     */
    setValue(value: T): void;

    toString(): S;
}

declare interface INumberGlideElement extends INumberBasedGlideElement<string, number, string | number> { }

declare interface IStringBasedGlideElement<T extends string> extends IGlideElement {
    /**
     * Gets the value of the current element.
     * @returns {T}
     * @memberof IStringGlideElement<T>
     */
    getValue(): T;

    /**
     * Sets the value of a field.
     * @param {T} value Object value to set the field to.
     * @memberof IStringGlideElement<T>
     */
    setValue(value: T): void;

    toString(): T;
}

type GUIDString = string & ({ length: 32 } | { length: 0 });
declare interface IGUIDGlideElement extends IStringBasedGlideElement<GUIDString> { }

declare interface IStringGlideElement extends IStringBasedGlideElement<string> { }

declare interface IBooleanGlideElement extends IStringBasedGlideElement<BooleanString> { }

/**
 * Basic definition of a GlideElement that is a reference to another record.
 * @interface IGlideRefElement
 * @extends {IGlideElement}
 * @template T The type of GlideRecord that this GlideElement references.
 */
declare interface IGlideRefElement<T extends IGlideRecord> extends IGlideElement {
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof IGlideRefElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof IGlideRefElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof IGlideRefElement<T>
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof IGlideRefElement
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof IGlideRefElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof IGlideRefElement<T>
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
    /**
     * Gets a GlideRecord object for a given reference element.
     * @returns {T}
     * @memberof IGlideRefElement
     */
    getRefRecord(): T;
}

/**
 * GlideElement API.
 * @class GlideElement
 * @extends {IGlideElement}
 */
declare abstract class GlideElement implements IGlideElement {
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
     * @returns {string} Attribute value
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
     * @returns {string} The table name of the reference
     * @memberof GlideElement
     */
    getReferenceTable(): string;

    /**
     * Gets a GlideRecord object for a given reference element.
     * @returns {GlideRecord} The GlideRecord object
     * @memberof GlideElement
     */
    getRefRecord(): IGlideRecord;

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

declare abstract class GlideReferenceElement extends GlideElement implements IGlideRefElement<GlideRecord> {
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof GlideReferenceElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof GlideReferenceElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {GlideElement}
	 * @memberof GlideReferenceElement
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof GlideReferenceElement
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof GlideReferenceElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {GlideElement}
	 * @memberof GlideReferenceElement
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
    /**
     * Gets a GlideRecord object for a given reference element.
     * @returns {GlideRecord}
     * @memberof GlideReferenceElement
     */
    getRefRecord(): GlideRecord;
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
    addCondition(name: string, oper: QueryOperator, value: any) : GlideQueryCondition;
    /**
     * Adds an AND condition to the current condition. Assumes the equals operator.
     * @param {string} name The name of a field.
     * @param {*} value The value of a field.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addCondition(name: string, value: any) : GlideQueryCondition;
    /**
     * Adds an AND condition to the current condition.
     * @param {GlideQueryCondition} queryCondition Condition to add.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addCondition(queryCondition: GlideQueryCondition) : GlideQueryCondition
    /**
     * Adds an OR condition to the current condition.
     * @param {string} name The name of a field.
     * @param {QueryOperator} oper The operator for the query (=,!=,>,>=,<,<=,IN,NOT IN,STARTSWITH,ENDSWITH,CONTAINS,DOES NOT CONTAIN,INSTANCEOF).
     * @param {*} value The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addOrCondition(name: string, oper: QueryOperator, value: any) : GlideQueryCondition;
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

/**
 * Basic defintion of a GlideRecord
 * @interface IGlideRecord
 */
declare interface IGlideRecord {
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof IGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof IGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof IGlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof IGlideRecord
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof IGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof IGlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
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

/**
 * GlideElement values from the Calendar table.
 * @interface Isys_calendarFields
 * @extends {Isys_metadataFields}
 */
declare interface Isys_calendarFields extends Isys_metadataFields {
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_calendarFields
	 */
    name: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_calendarFields
	 */
    sys_id: IGUIDGlideElement;
}
declare interface Isys_calendarGlideRecord extends Isys_metadataGlideRecordBase, Isys_calendarFields { }
declare interface Isys_calendarGlideElement extends Isys_metadataGlideElementBase<Isys_calendarGlideRecord>, Isys_calendarFields { }

/**
 * GlideElement values from the Agreement table.
 * @interface IslaFields
 */
declare interface IslaFields {
	/**
	 * Accountable user
	 * @type {Isys_userGlideElement}
	 * @memberof IslaFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    accountable_user: Isys_userGlideElement;
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof IslaFields
	 */
    active: IBooleanGlideElement;
	/**
	 * Avail pct
	 * @type {INumberGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is decimal
	 */
    avail_pct: INumberGlideElement;
	/**
	 * Begins
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is glide_date
	 */
    begins: IStringGlideElement;
	/**
	 * Business lead
	 * @type {Isys_userGlideElement}
	 * @memberof IslaFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    business_lead: Isys_userGlideElement;
	/**
	 * Business unit
	 * @type {IStringBasedGlideElement<("Operations" | "Sales")>}
	 * @memberof IslaFields
	 */
    business_unit: IStringBasedGlideElement<("Operations" | "Sales")>;
	/**
	 * Calendar
	 * @type {Isys_calendarGlideElement}
	 * @memberof IslaFields
	 * @description Reference to Calendar (IGlideRefElement<Isys_calendarGlideRecord>)
	 */
    calendar: Isys_calendarGlideElement;
	/**
	 * Change procedures
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is html
	 */
    change_procedures: IStringGlideElement;
	/**
	 * Consultant user
	 * @type {Isys_userGlideElement}
	 * @memberof IslaFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    consultant_user: Isys_userGlideElement;
	/**
	 * Contract
	 * @type {GlideReferenceElement}
	 * @memberof IslaFields
	 * @description Reference to Contract (IGlideRefElement<Iast_contractGlideRecord>)
	 */
    contract: GlideReferenceElement;
	/**
	 * Department
	 * @type {Icmn_departmentGlideElement}
	 * @memberof IslaFields
	 * @description Reference to Department (IGlideRefElement<Icmn_departmentGlideRecord>)
	 */
    department: Icmn_departmentGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is html
	 */
    description: IStringGlideElement;
	/**
	 * Disaster recovery
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is html
	 */
    disaster_recovery: IStringGlideElement;
	/**
	 * Ends
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is glide_date
	 */
    ends: IStringGlideElement;
	/**
	 * Functional area
	 * @type {IStringBasedGlideElement<("Data Management" | "Network" | "Security")>}
	 * @memberof IslaFields
	 */
    functional_area: IStringBasedGlideElement<("Data Management" | "Network" | "Security")>;
	/**
	 * Incident procedures
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is html
	 */
    incident_procedures: IStringGlideElement;
	/**
	 * Informed user
	 * @type {Isys_userGlideElement}
	 * @memberof IslaFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    informed_user: Isys_userGlideElement;
	/**
	 * Maintenance
	 * @type {Isys_calendarGlideElement}
	 * @memberof IslaFields
	 * @description Reference to Calendar (IGlideRefElement<Isys_calendarGlideRecord>)
	 */
    maintenance: Isys_calendarGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 */
    name: IStringGlideElement;
	/**
	 * Next review
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is glide_date
	 */
    next_review: IStringGlideElement;
	/**
	 * Notes
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is html
	 */
    notes: IStringGlideElement;
	/**
	 * Number
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 */
    number: IStringGlideElement;
	/**
	 * Reponsibilities
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is html
	 */
    reponsibilities: IStringGlideElement;
	/**
	 * Response time
	 * @type {INumberGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is decimal
	 */
    response_time: INumberGlideElement;
	/**
	 * Responsible user
	 * @type {Isys_userGlideElement}
	 * @memberof IslaFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    responsible_user: Isys_userGlideElement;
	/**
	 * Security notes
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is html
	 */
    security_notes: IStringGlideElement;
	/**
	 * Service goals
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is html
	 */
    service_goals: IStringGlideElement;
	/**
	 * Short description
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 */
    short_description: IStringGlideElement;
	/**
	 * Signatures
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is html
	 */
    signatures: IStringGlideElement;
	/**
	 * Agreement type
	 * @type {GlideElement}
	 * @memberof IslaFields
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof IslaFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Technical lead
	 * @type {Isys_userGlideElement}
	 * @memberof IslaFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    technical_lead: Isys_userGlideElement;
	/**
	 * Transaction load
	 * @type {INumberGlideElement}
	 * @memberof IslaFields
	 * @description Internal type is decimal
	 */
    transaction_load: INumberGlideElement;
	/**
	 * Users
	 * @type {Isys_user_groupGlideElement}
	 * @memberof IslaFields
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    users: Isys_user_groupGlideElement;
}
declare interface IslaGlideRecord extends IGlideRecord, IslaFields { }
declare interface IslaGlideElement extends IGlideRefElement<IslaGlideRecord>, IslaFields { }

type TaskAppproval = "not requested" | "requested" | "approved" | "rejected";
type TaskContactType = "email" | "phone" | "self-service" | "walk-in";
type TaskEscalationString = "0" | "1" | "2" | "3";
type TaskEscalationValue = 0 | 1 | 2 | 3;
type TaskEscalation = TaskEscalationString | TaskEscalationValue;
type Task3ScaleString = "0" | "1" | "2" | "3";
type Task3ScaleValue = 0 | 1 | 2 | 3;
type Task3Scale = Task3ScaleString | Task3ScaleValue;
type TaskPriorityString = "1" | "2" | "3" | "4" | "5";
type TaskPriorityValue = 1 | 2 | 3 | 4 | 5;
type TaskPriority = TaskPriorityString | TaskPriorityValue;
type TaskStateString = "-5" | "1" | "2" | "3" | "4" | "7";
type TaskStateValue = -5 | 1 | 2 | 3 | 4 | 7;
type TaskState = TaskStateString | TaskStateValue;

/**
 * GlideElement values from the Task table.
 * @interface ItaskFields
 */
declare interface ItaskFields {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof ItaskFields
	 */
    active: IBooleanGlideElement;
	/**
	 * Activity due
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is due_date
	 */
    activity_due: IStringGlideElement;
	/**
	 * Additional assignee list
	 * @type {GlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is "glide_list"
	 */
    additional_assignee_list: GlideElement;
	/**
	 * Approval
	 * @type {IStringBasedGlideElement<TaskAppproval>}
	 * @memberof ItaskFields
	 */
    approval: IStringBasedGlideElement<TaskAppproval>;
	/**
	 * Approval history
	 * @type {GlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is "journal"
	 */
    approval_history: GlideElement;
	/**
	 * Approval set
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is glide_date_time
	 */
    approval_set: IStringGlideElement;
	/**
	 * Assigned to
	 * @type {Isys_userGlideElement}
	 * @memberof ItaskFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    assigned_to: Isys_userGlideElement;
	/**
	 * Assignment group
	 * @type {Isys_user_groupGlideElement}
	 * @memberof ItaskFields
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    assignment_group: Isys_user_groupGlideElement;
	/**
	 * Business duration
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is glide_duration
	 */
    business_duration: IStringGlideElement;
	/**
	 * Business service
	 * @type {Icmdb_ci_serviceGlideElement}
	 * @memberof ItaskFields
	 * @description Reference to Business Service (IGlideRefElement<Icmdb_ci_serviceGlideRecord>)
	 */
    business_service: Icmdb_ci_serviceGlideElement;
	/**
	 * Duration
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is glide_duration
	 */
    calendar_duration: IStringGlideElement;
	/**
	 * Closed
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is glide_date_time
	 */
    closed_at: IStringGlideElement;
	/**
	 * Closed by
	 * @type {Isys_userGlideElement}
	 * @memberof ItaskFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    closed_by: Isys_userGlideElement;
	/**
	 * Close notes
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 */
    close_notes: IStringGlideElement;
	/**
	 * Configuration item
	 * @type {Icmdb_ciGlideElement}
	 * @memberof ItaskFields
	 * @description Reference to Configuration Item (IGlideRefElement<Icmdb_ciGlideRecord>)
	 */
    cmdb_ci: Icmdb_ciGlideElement;
	/**
	 * Additional comments
	 * @type {GlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is "journal_input"
	 */
    comments: GlideElement;
	/**
	 * Comments and Work notes
	 * @type {GlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is "journal_list"
	 */
    comments_and_work_notes: GlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof ItaskFields
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Contact type
	 * @type {IStringBasedGlideElement<TaskContactType>}
	 * @memberof ItaskFields
	 */
    contact_type: IStringBasedGlideElement<TaskContactType>;
	/**
	 * Contract
	 * @type {GlideReferenceElement}
	 * @memberof ItaskFields
	 * @description Reference to Contract (IGlideRefElement<Iast_contractGlideRecord>)
	 */
    contract: GlideReferenceElement;
	/**
	 * Correlation display
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 */
    correlation_display: IStringGlideElement;
	/**
	 * Correlation ID
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 */
    correlation_id: IStringGlideElement;
	/**
	 * Delivery plan
	 * @type {GlideReferenceElement}
	 * @memberof ItaskFields
	 * @description Reference to Execution Plan (IGlideRefElement<Isc_cat_item_delivery_planGlideRecord>)
	 */
    delivery_plan: GlideReferenceElement;
	/**
	 * Delivery task
	 * @type {GlideReferenceElement}
	 * @memberof ItaskFields
	 * @description Reference to Execution Plan Task (IGlideRefElement<Isc_cat_item_delivery_taskGlideRecord>)
	 */
    delivery_task: GlideReferenceElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 */
    description: IStringGlideElement;
	/**
	 * Due date
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is glide_date_time
	 */
    due_date: IStringGlideElement;
	/**
	 * Escalation
	 * @type {INumberBasedGlideElement<TaskEscalationString, TaskEscalationValue, TaskEscalation>}
	 * @memberof ItaskFields
	 * @description Internal type is integer
	 */
    escalation: INumberBasedGlideElement<TaskEscalationString, TaskEscalationValue, TaskEscalation>;
	/**
	 * Expected start
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is glide_date_time
	 */
    expected_start: IStringGlideElement;
	/**
	 * Follow up
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is glide_date_time
	 */
    follow_up: IStringGlideElement;
	/**
	 * Group list
	 * @type {GlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is "glide_list"
	 */
    group_list: GlideElement;
	/**
	 * Impact
	 * @type {INumberBasedGlideElement<Task3ScaleString, Task3ScaleValue, Task3Scale>}
	 * @memberof ItaskFields
	 * @description Internal type is integer; 1="1 - High"; 2="2 - Medium"; 3="3 - Low"
	 */
    impact: INumberBasedGlideElement<Task3ScaleString, Task3ScaleValue, Task3Scale>;
	/**
	 * Knowledge
	 * @type {IBooleanGlideElement}
	 * @memberof ItaskFields
	 */
    knowledge: IBooleanGlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof ItaskFields
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Made SLA
	 * @type {IBooleanGlideElement}
	 * @memberof ItaskFields
	 */
    made_sla: IBooleanGlideElement;
	/**
	 * Number
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 */
    number: IStringGlideElement;
	/**
	 * Opened
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is glide_date_time
	 */
    opened_at: IStringGlideElement;
	/**
	 * Opened by
	 * @type {Isys_userGlideElement}
	 * @memberof ItaskFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    opened_by: Isys_userGlideElement;
	/**
	 * Order
	 * @type {INumberGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is integer
	 */
    order: INumberGlideElement;
	/**
	 * Parent
	 * @type {ItaskGlideElement}
	 * @memberof ItaskFields
	 * @description Reference to Task (IGlideRefElement<ItaskGlideRecord>)
	 */
    parent: ItaskGlideElement;
	/**
	 * Priority
	 * @type {INumberBasedGlideElement<TaskPriorityString, TaskPriorityValue, TaskPriority>}
	 * @memberof ItaskFields
	 * @description Internal type is integer
	 */
    priority: INumberBasedGlideElement<TaskPriorityString, TaskPriorityValue, TaskPriority>;
	/**
	 * Reassignment count
	 * @type {INumberGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is integer
	 */
    reassignment_count: INumberGlideElement;
	/**
	 * Rejection goto
	 * @type {ItaskGlideElement}
	 * @memberof ItaskFields
	 * @description Reference to Task (IGlideRefElement<ItaskGlideRecord>)
	 */
    rejection_goto: ItaskGlideElement;
	/**
	 * Service offering
	 * @type {Iservice_offeringGlideElement}
	 * @memberof ItaskFields
	 * @description Reference to Service Offering (IGlideRefElement<Iservice_offeringGlideRecord>)
	 */
    service_offering: Iservice_offeringGlideElement;
	/**
	 * Short description
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 */
    short_description: IStringGlideElement;
	/**
	 * Skills
	 * @type {GlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is "glide_list"
	 */
    skills: GlideElement;
	/**
	 * SLA due
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is due_date
	 */
    sla_due: IStringGlideElement;
	/**
	 * State
	 * @type {INumberBasedGlideElement<TaskStateString, TaskStateValue, TaskState>}
	 * @memberof ItaskFields
	 * @description Internal type is integer; -5="Pending"; 1="Open"; 2="Work in Progress"; 3="Closed Complete"; 4="Closed Incomplete"; 7="Closed Skipped"
	 */
    state: INumberBasedGlideElement<TaskStateString, TaskStateValue, TaskState>;
	/**
	 * Task type
	 * @type {GlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is "domain_path"
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof ItaskFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Time worked
	 * @type {GlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is "timer"
	 */
    time_worked: GlideElement;
	/**
	 * Upon approval
	 * @type {IStringBasedGlideElement<("proceed" | "do_nothing")>}
	 * @memberof ItaskFields
     * @description "proceed"="Proceed to Next Task"; "do_nothing"="Wait for a User to Close this task"
	 */
    upon_approval: IStringBasedGlideElement<("proceed" | "do_nothing")>;
	/**
	 * Upon reject
	 * @type {IStringBasedGlideElement<("cancel" | "goto")>}
	 * @memberof ItaskFields
     * @description "cancel"="Cancel all future Tasks"; "goto"="Go to a previous Task"
	 */
    upon_reject: IStringBasedGlideElement<("cancel" | "goto")>;
	/**
	 * Urgency
	 * @type {INumberBasedGlideElement<Task3ScaleString, Task3ScaleValue, Task3Scale>}
	 * @memberof ItaskFields
	 * @description Internal type is integer; 1="1 - High"; 2="2 - Medium"; 3="3 - Low"
	 */
    urgency: INumberBasedGlideElement<Task3ScaleString, Task3ScaleValue, Task3Scale>;
	/**
	 * User input
	 * @type {GlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is "user_input"
	 */
    user_input: GlideElement;
	/**
	 * Variables
	 * @type {GlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is "variables"
	 */
    variables: GlideElement;
	/**
	 * Watch list
	 * @type {GlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is "glide_list"
	 */
    watch_list: GlideElement;
	/**
	 * Workflow activity
	 * @type {GlideReferenceElement}
	 * @memberof ItaskFields
	 * @description Reference to Workflow Activity (IGlideRefElement<Iwf_activityGlideRecord>)
	 */
    wf_activity: GlideReferenceElement;
	/**
	 * Actual end
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is glide_date_time
	 */
    work_end: IStringGlideElement;
	/**
	 * Work notes
	 * @type {GlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is "journal_input"
	 */
    work_notes: GlideElement;
	/**
	 * Work notes list
	 * @type {GlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is "glide_list"
	 */
    work_notes_list: GlideElement;
	/**
	 * Actual start
	 * @type {IStringGlideElement}
	 * @memberof ItaskFields
	 * @description Internal type is glide_date_time
	 */
    work_start: IStringGlideElement;
}

/**
 * Basic definition of a GlideElement that is a reference to a GlideRecord whose table is derrived from the task table.
 * @interface ITaskGlideElementBase
 * @extends {IGlideRefElement<T>}
 * @template T The type of GlideRecord, whose table derrives from the task table, that this GlideElement references.
 */
declare interface ItaskGlideElementBase<T extends ItaskGlideRecordBase> extends IGlideRefElement<T>, ItaskFields { }

/**
 * Generic GlideElement insatnce that references a GlideRecord whose table derrives from the task table.
 * @interface ITaskGlideElement
 * @extends {ItaskGlideElementBase<ItaskGlideRecord>}
 */
declare interface ItaskGlideElement extends ItaskGlideElementBase<ItaskGlideRecord> { }

/**
 * GlideRecord that contains values from a record in the Task table.
 * @interface ItaskGlideRecordBase
 * @extends {IGlideRecord}
 */
declare interface ItaskGlideRecordBase extends IGlideRecord, ItaskFields { }

/**
 * Generic GlideRecord whose table derrives from the task table.
 * @interface ItaskGlideRecord
 * @extends {ItaskGlideRecordBase}
 * @extends {IGenericGlideRecord}
 */
declare interface ItaskGlideRecord extends ItaskGlideRecordBase, IGenericGlideRecord { }

/**
 * GlideElement values from the Package table.
 * @interface Isys_packageFields
 */
declare interface Isys_packageFields {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_packageFields
	 */
    active: IBooleanGlideElement;
	/**
	 * Subscription requirement
	 * @type {IStringGlideElement}
	 * @memberof Isys_packageFields
	 */
    enforce_license: IStringGlideElement;
	/**
	 * Licensable
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_packageFields
	 */
    licensable: IBooleanGlideElement;
	/**
	 * Subscription Category
	 * @type {IStringGlideElement}
	 * @memberof Isys_packageFields
	 */
    license_category: IStringGlideElement;
	/**
	 * Subscription Model
	 * @type {IStringGlideElement}
	 * @memberof Isys_packageFields
	 */
    license_model: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_packageFields
	 */
    name: IStringGlideElement;
	/**
	 * ID
	 * @type {IStringGlideElement}
	 * @memberof Isys_packageFields
	 */
    source: IStringGlideElement;
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof Isys_packageFields
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Isys_packageFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Isys_packageFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_packageFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Isys_packageFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Isys_packageFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Isys_packageFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Trackable
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_packageFields
	 */
    trackable: IBooleanGlideElement;
	/**
	 * Version
	 * @type {GlideElement}
	 * @memberof Isys_packageFields
	 * @description Internal type is "version"
	 */
    version: GlideElement;
}
declare interface Isys_packageGlideRecordBase extends IGlideRecord, Isys_packageFields { }
declare interface Isys_packageGlideRecord extends Isys_packageGlideRecordBase, IGenericGlideRecord { }
declare interface Isys_packageGlideElementBase<T extends Isys_packageGlideRecordBase> extends IGlideRefElement<T>, Isys_packageFields { }
declare interface Isys_packageGlideElement extends Isys_packageGlideElementBase<Isys_packageGlideRecord> { }

/**
 * GlideElement values from the Application table.
 * @interface Isys_scopeFields
 * @extends {Isys_packageFields}
 */
declare interface Isys_scopeFields extends Isys_packageFields {
	/**
	 * JavaScript Mode
	 * @type {IStringGlideElement}
	 * @memberof Isys_scopeFields
	 */
    js_level: IStringGlideElement;
	/**
	 * Logo
	 * @type {GlideElement}
	 * @memberof Isys_scopeFields
	 * @description Internal type is "user_image"
	 */
    logo: GlideElement;
	/**
	 * Private
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_scopeFields
	 */
    private: IBooleanGlideElement;
	/**
	 * Restrict Table Choices
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_scopeFields
	 */
    restrict_table_access: IBooleanGlideElement;
	/**
	 * Restrict Runtime Access
	 * @type {IStringGlideElement}
	 * @memberof Isys_scopeFields
	 */
    runtime_access_tracking: IStringGlideElement;
	/**
	 * Scope
	 * @type {IStringGlideElement}
	 * @memberof Isys_scopeFields
	 */
    scope: IStringGlideElement;
	/**
	 * Application administration
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_scopeFields
	 */
    scoped_administration: IBooleanGlideElement;
	/**
	 * Short description
	 * @type {IStringGlideElement}
	 * @memberof Isys_scopeFields
	 */
    short_description: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_scopeFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Template
	 * @type {IStringGlideElement}
	 * @memberof Isys_scopeFields
	 */
    template: IStringGlideElement;
	/**
	 * Vendor
	 * @type {IStringGlideElement}
	 * @memberof Isys_scopeFields
	 */
    vendor: IStringGlideElement;
	/**
	 * Vendor prefix
	 * @type {IStringGlideElement}
	 * @memberof Isys_scopeFields
	 */
    vendor_prefix: IStringGlideElement;
}
declare interface Isys_scopeGlideRecord extends Isys_packageGlideRecordBase, Isys_scopeFields { }
declare interface Isys_scopeGlideElement extends Isys_packageGlideElementBase<Isys_scopeGlideRecord>, Isys_scopeFields { }

/**
 * GlideElement values from the Application File table.
 * @interface Isys_metadataFields
 */
declare interface Isys_metadataFields {
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof Isys_metadataFields
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Isys_metadataFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Isys_metadataFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_metadataFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Isys_metadataFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Display name
	 * @type {IStringGlideElement}
	 * @memberof Isys_metadataFields
	 */
    sys_name: IStringGlideElement;
	/**
	 * Package
	 * @type {Isys_packageGlideElement}
	 * @memberof Isys_metadataFields
	 * @description Reference to Package (IGlideRefElement<Isys_packageGlideRecord>)
	 */
    sys_package: Isys_packageGlideElement;
	/**
	 * Protection policy
	 * @type {IStringGlideElement}
	 * @memberof Isys_metadataFields
	 */
    sys_policy: IStringGlideElement;
	/**
	 * Application
	 * @type {Isys_scopeGlideElement}
	 * @memberof Isys_metadataFields
	 * @description Reference to Application (IGlideRefElement<Isys_scopeGlideRecord>)
	 */
    sys_scope: Isys_scopeGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Isys_metadataFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Isys_metadataFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Update name
	 * @type {IStringGlideElement}
	 * @memberof Isys_metadataFields
	 */
    sys_update_name: IStringGlideElement;
}

/**
 * Basic definition of a GlideElement that is a reference to a GlideRecord whose table is derrived from the sys_metadata (Application File) table.
 * @interface Isys_metadataGlideElementBase
 * @extends {IGlideRefElement<T>}
 * @template T The type of GlideRecord, whose table derrives from the sys_metadata (Application File) table, that this GlideElement references.
 */
declare interface Isys_metadataGlideElementBase<T extends Isys_metadataGlideRecordBase> extends IGlideRefElement<T>, Isys_metadataFields { }

/**
 * Generic GlideElement that references a GlideRecord whose table derrives from the sys_metadata (Application File) table.
 * @interface Isys_metadataGlideElement
 * @extends {Isys_metadataGlideElementBase<Isys_metadataGlideRecord>}
 */
declare interface Isys_metadataGlideElement extends Isys_metadataGlideElementBase<Isys_metadataGlideRecord> { }

/**
 * Basic definition of a GlideRecord whose table derrives from the sys_metadata (Application File) table.
 * @interface Isys_metadataGlideRecordBase
 * @extends {IGlideRecord}
 */
declare interface Isys_metadataGlideRecordBase extends IGlideRecord, Isys_metadataFields { }

/**
 * Generic GlideRecord whose table derrives from the sys_metadata (Application File) table.
 * @interface Isys_metadataGlideRecord
 * @extends {Isys_metadataGlideRecordBase}
 * @extends {IGenericGlideRecord}
 */
declare interface Isys_metadataGlideRecord extends Isys_metadataGlideRecordBase, IGenericGlideRecord { }

type IncidentCloseCode = "Solved (Work Around)" | "Solved (Permanently)" | "Solved Remotely (Work Around)" | "Solved Remotely (Permanently)" | "Not Solved (Not Reproducible)" | "Not Solved (Too Costly)" | "Closed/Resolved by Caller";
type IncidentHoldReasonString = "1" | "5" | "3" | "4";
type IncidentHoldReasonValue = 1 | 5 | 3 | 4;
type IncidentHoldReason = IncidentHoldReasonString | IncidentHoldReasonValue;
type IncidentStateString = "1" | "2" | "3" | "6" | "7" | "8";
type IncidentStateValue = 1 | 2 | 3 | 6 | 7 | 8;
type IncidentState = IncidentStateString | IncidentStateValue;
type IncidentNotifyString = "1" | "2" | "3";
type IncidentNotifyValue = 1 | 2 | 3;
type IncidentNotify = IncidentNotifyString | IncidentNotifyValue;

/**
 * GlideElement values from the Incident table.
 * @interface IincidentFields
 * @extends {ItaskFields}
 */
declare interface IincidentFields extends ItaskFields {
	/**
	 * Business resolve time
	 * @type {INumberGlideElement}
	 * @memberof IincidentFields
	 * @description Internal type is integer
	 */
    business_stc: INumberGlideElement;
	/**
	 * Resolve time
	 * @type {INumberGlideElement}
	 * @memberof IincidentFields
	 * @description Internal type is integer
	 */
    calendar_stc: INumberGlideElement;
	/**
	 * Caller
	 * @type {Isys_userGlideElement}
	 * @memberof IincidentFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    caller_id: Isys_userGlideElement;
	/**
	 * Category
	 * @type {IStringGlideElement}
	 * @memberof IincidentFields
	 */
    category: IStringGlideElement;
	/**
	 * Caused by Change
	 * @type {Ichange_requestGlideElement}
	 * @memberof IincidentFields
	 * @description Reference to Change Request (IGlideRefElement<Ichange_requestGlideRecord>)
	 */
    caused_by: Ichange_requestGlideElement;
	/**
	 * Child Incidents
	 * @type {INumberGlideElement}
	 * @memberof IincidentFields
	 * @description Internal type is integer
	 */
    child_incidents: INumberGlideElement;
	/**
	 * Close code
	 * @type {IStringBasedGlideElement<IncidentCloseCode>}
	 * @memberof IincidentFields
	 */
    close_code: IStringBasedGlideElement<IncidentCloseCode>;
	/**
	 * On hold reason
	 * @type {INumberBasedGlideElement<IncidentHoldReasonString, IncidentHoldReasonValue, IncidentHoldReason>}
	 * @memberof IincidentFields
	 * @description Internal type is integer; 1="Awaiting Caller"; 5="Awaiting Change"; 3="Awaiting Problem"; 4="Awaiting Vendor"
	 */
    hold_reason: INumberBasedGlideElement<IncidentHoldReasonString, IncidentHoldReasonValue, IncidentHoldReason>;
	/**
	 * Incident state
	 * @type {INumberBasedGlideElement<IncidentStateString, IncidentStateValue, IncidentState>}
	 * @memberof IincidentFields
	 * @description Internal type is integer; 1="New"; 2="In Progress"; 3="On Hold"; 6="Resolved"; 7="Closed"; 8="Canceled"
	 */
    incident_state: INumberBasedGlideElement<IncidentStateString, IncidentStateValue, IncidentState>;
	/**
	 * Notify
	 * @type {INumberBasedGlideElement<IncidentNotifyString, IncidentNotifyValue, IncidentNotify>}
	 * @memberof IincidentFields
	 * @description Internal type is integer
	 */
    notify: INumberBasedGlideElement<IncidentNotifyString, IncidentNotifyValue, IncidentNotify>;
	/**
	 * Parent Incident
	 * @type {IincidentGlideElement}
	 * @memberof IincidentFields
	 * @description Reference to Incident (IGlideRefElement<IincidentGlideRecord>)
	 */
    parent_incident: IincidentGlideElement;
	/**
	 * Problem
	 * @type {IproblemGlideElement}
	 * @memberof IincidentFields
	 * @description Reference to Problem (IGlideRefElement<IproblemGlideRecord>)
	 */
    problem_id: IproblemGlideElement;
	/**
	 * Last reopened by
	 * @type {Isys_userGlideElement}
	 * @memberof IincidentFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    reopened_by: Isys_userGlideElement;
	/**
	 * Last reopened at
	 * @type {IStringGlideElement}
	 * @memberof IincidentFields
	 * @description Internal type is glide_date_time
	 */
    reopened_time: IStringGlideElement;
	/**
	 * Reopen count
	 * @type {INumberGlideElement}
	 * @memberof IincidentFields
	 * @description Internal type is integer
	 */
    reopen_count: INumberGlideElement;
	/**
	 * Resolved
	 * @type {IStringGlideElement}
	 * @memberof IincidentFields
	 * @description Internal type is glide_date_time
	 */
    resolved_at: IStringGlideElement;
	/**
	 * Resolved by
	 * @type {Isys_userGlideElement}
	 * @memberof IincidentFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    resolved_by: Isys_userGlideElement;
	/**
	 * Change Request
	 * @type {Ichange_requestGlideElement}
	 * @memberof IincidentFields
	 * @description Reference to Change Request (IGlideRefElement<Ichange_requestGlideRecord>)
	 */
    rfc: Ichange_requestGlideElement;
	/**
	 * Severity
	 * @type {INumberBasedGlideElement<Task3ScaleString, Task3ScaleValue, Task3Scale>}
	 * @memberof IincidentFields
	 * @description Internal type is integer; "1"="1 - High"; "2"="2 - Medium"; "3"="3 - Low"
	 */
    severity: INumberBasedGlideElement<Task3ScaleString, Task3ScaleValue, Task3Scale>;
	/**
	 * Subcategory
	 * @type {IStringGlideElement}
	 * @memberof IincidentFields
	 */
    subcategory: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof IincidentFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Is Mission Related
	 * @type {IBooleanGlideElement}
	 * @memberof IincidentFields
	 */
    u_is_mission_related: IBooleanGlideElement;
	/**
	 * Network
	 * @type {Ix_44813_phys_net_networkGlideElement}
	 * @memberof IincidentFields
	 * @description Reference to Physical Network (IGlideRefElement<Ix_44813_phys_net_networkGlideRecord>)
	 */
    u_network: Ix_44813_phys_net_networkGlideElement;
	/**
	 * VIP Priority
	 * @type {IBooleanGlideElement}
	 * @memberof IincidentFields
	 */
    u_vip_priority: IBooleanGlideElement;
}
declare interface IincidentGlideRecord extends ItaskGlideRecordBase, IincidentFields { }
declare interface IincidentGlideElement extends ItaskGlideElementBase<IincidentGlideRecord>, IincidentFields { }

declare type ChangeCloseCode = "successful" | "successful_issues" | "unsuccessful";

/**
 * GlideElement values from the Change Task table.
 * @interface Ichange_taskFields
 * @extends {ItaskFields}
 */
declare interface Ichange_taskFields extends ItaskFields {
	/**
	 * Change request
	 * @type {Ichange_requestGlideElement}
	 * @memberof Ichange_taskFields
	 * @description Reference to Change Request (IGlideRefElement<Ichange_requestGlideRecord>)
	 */
    change_request: Ichange_requestGlideElement;
	/**
	 * Type
	 * @type {IStringBasedGlideElement<("planning" | "implementation" | "testing" | "review")>}
	 * @memberof Ichange_taskFields
	 */
    change_task_type: IStringBasedGlideElement<("planning" | "implementation" | "testing" | "review")>;
	/**
	 * Close code
	 * @type {IStringBasedGlideElement<ChangeCloseCode>}
	 * @memberof Ichange_taskFields
	 * @description "successful"="Successful"; "successful_issues"="Successful with issues"; "unsuccessful"="Unsuccessful"
	 */
    close_code: IStringBasedGlideElement<ChangeCloseCode>;
	/**
	 * Created from
	 * @type {IStringBasedGlideElement<("workflow" | "manual")>}
	 * @memberof Ichange_taskFields
	 * @description "workflow"="Workflow"; "manual"="Manual"
	 */
    created_from: IStringBasedGlideElement<("workflow" | "manual")>;
	/**
	 * On hold
	 * @type {IBooleanGlideElement}
	 * @memberof Ichange_taskFields
	 */
    on_hold: IBooleanGlideElement;
	/**
	 * On hold reason
	 * @type {IStringGlideElement}
	 * @memberof Ichange_taskFields
	 */
    on_hold_reason: IStringGlideElement;
	/**
	 * Planned end date
	 * @type {IStringGlideElement}
	 * @memberof Ichange_taskFields
	 * @description Internal type is glide_date_time
	 */
    planned_end_date: IStringGlideElement;
	/**
	 * Planned start date
	 * @type {IStringGlideElement}
	 * @memberof Ichange_taskFields
	 * @description Internal type is glide_date_time
	 */
    planned_start_date: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Ichange_taskFields
	 */
    sys_id: IGUIDGlideElement;
}
declare interface Ichange_taskGlideRecord extends ItaskGlideRecordBase, Ichange_taskFields { }
declare interface Ichange_taskGlideElement extends ItaskGlideElementBase<Ichange_taskGlideRecord>, Ichange_taskFields { }

type ChangeReviewStatusString = "1" | "2";
type ChangeReviewStatusValue = 1 | 2;
type ChangeReviewStatus = ChangeReviewStatusString | ChangeReviewStatusValue;
type ChangeRiskString = "2" | "3" | "4";
type ChangeRiskValue = 2 | 3 | 4;
type ChangeRisk = ChangeRiskString | ChangeRiskValue;
type ChangeScopeString = "1" | "2" | "3" | "4" | "5";
type ChangeScopeValue = 1 | 2 | 3 | 4 | 5;
type ChangeScope = ChangeScopeString | ChangeScopeValue;
type ChangeType = "standard" | "normal" | "emergency";

/**
 * GlideElement values from the Change Request table.
 * @interface Ichange_requestFields
 * @extends {ItaskFields}
 */
declare interface Ichange_requestFields extends ItaskFields {
	/**
	 * Backout plan
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 */
    backout_plan: IStringGlideElement;
	/**
	 * CAB date
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 * @description Internal type is glide_date
	 */
    cab_date: IStringGlideElement;
	/**
	 * CAB delegate
	 * @type {Isys_userGlideElement}
	 * @memberof Ichange_requestFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    cab_delegate: Isys_userGlideElement;
	/**
	 * CAB recommendation
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 */
    cab_recommendation: IStringGlideElement;
	/**
	 * CAB required
	 * @type {IBooleanGlideElement}
	 * @memberof Ichange_requestFields
	 */
    cab_required: IBooleanGlideElement;
	/**
	 * Category
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 */
    category: IStringGlideElement;
	/**
	 * Change plan
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 */
    change_plan: IStringGlideElement;
	/**
	 * CI class
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 * @description Internal type is table_name
	 */
    ci_class: IStringGlideElement;
	/**
	 * Close code
	 * @type {IStringBasedGlideElement<ChangeCloseCode>}
	 * @memberof Ichange_requestFields
	 * @description "successful"="Successful"; "successful_issues"="Successful with issues"; "unsuccessful"="Unsuccessful"
	 */
    close_code: IStringBasedGlideElement<ChangeCloseCode>;
	/**
	 * Conflict last run
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 * @description Internal type is glide_date_time
	 */
    conflict_last_run: IStringGlideElement;
	/**
	 * Conflict status
	 * @type {IStringBasedGlideElement<("Not Run" | "Conflict" | "No Conflict")>}
	 * @memberof Ichange_requestFields
	 */
    conflict_status: IStringBasedGlideElement<("Not Run" | "Conflict" | "No Conflict")>;
	/**
	 * Planned end date
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 * @description Internal type is glide_date_time
	 */
    end_date: IStringGlideElement;
	/**
	 * Implementation plan
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 */
    implementation_plan: IStringGlideElement;
	/**
	 * Justification
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 */
    justification: IStringGlideElement;
	/**
	 * On hold
	 * @type {IBooleanGlideElement}
	 * @memberof Ichange_requestFields
	 */
    on_hold: IBooleanGlideElement;
	/**
	 * On hold reason
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 */
    on_hold_reason: IStringGlideElement;
	/**
	 * On Hold Change Tasks
	 * @type {GlideElement}
	 * @memberof Ichange_requestFields
	 * @description Internal type is "glide_list"
	 */
    on_hold_task: GlideElement;
	/**
	 * Outside maintenance schedule
	 * @type {IBooleanGlideElement}
	 * @memberof Ichange_requestFields
	 */
    outside_maintenance_schedule: IBooleanGlideElement;
	/**
	 * Phase
	 * @type {IStringBasedGlideElement<("requested" | "plan" | "build" | "accept")>}
	 * @memberof Ichange_requestFields
	 */
    phase: IStringBasedGlideElement<("requested" | "plan" | "build" | "accept")>;
	/**
	 * Phase state
	 * @type {IStringBasedGlideElement<("open" | "work in progress" | "approved" | "rejected" | "testing" | "implementation" | "on hold" | "complete")>}
	 * @memberof Ichange_requestFields
	 */
    phase_state: IStringBasedGlideElement<("open" | "work in progress" | "approved" | "rejected" | "testing" | "implementation" | "on hold" | "complete")>;
	/**
	 * Production system
	 * @type {IBooleanGlideElement}
	 * @memberof Ichange_requestFields
	 */
    production_system: IBooleanGlideElement;
	/**
	 * Proposed change
	 * @type {GlideElement}
	 * @memberof Ichange_requestFields
	 * @description Internal type is "template_value"
	 */
    proposed_change: GlideElement;
	/**
	 * Reason
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 */
    reason: IStringGlideElement;
	/**
	 * Requested by
	 * @type {Isys_userGlideElement}
	 * @memberof Ichange_requestFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    requested_by: Isys_userGlideElement;
	/**
	 * Requested by date
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 * @description Internal type is glide_date_time
	 */
    requested_by_date: IStringGlideElement;
	/**
	 * Review comments
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 */
    review_comments: IStringGlideElement;
	/**
	 * Review date
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 * @description Internal type is glide_date
	 */
    review_date: IStringGlideElement;
	/**
	 * Review status
	 * @type {INumberBasedGlideElement<ChangeReviewStatusString, ChangeReviewStatusValue, ChangeReviewStatus>}
	 * @memberof Ichange_requestFields
	 * @description Internal type is integer; "1"="Success"; "2"="Fail"
	 */
    review_status: INumberBasedGlideElement<ChangeReviewStatusString, ChangeReviewStatusValue, ChangeReviewStatus>;
	/**
	 * Risk
	 * @type {INumberBasedGlideElement<ChangeRiskString, ChangeRiskValue, ChangeRisk>}
	 * @memberof Ichange_requestFields
	 * @description Internal type is integer; "2"="High"; "3"="Moderate"; "4"="Low"
	 */
    risk: INumberBasedGlideElement<ChangeRiskString, ChangeRiskValue, ChangeRisk>;
	/**
	 * Risk and impact analysis
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 */
    risk_impact_analysis: IStringGlideElement;
	/**
	 * Risk value
	 * @type {INumberGlideElement}
	 * @memberof Ichange_requestFields
	 * @description Internal type is integer
	 */
    risk_value: INumberGlideElement;
	/**
	 * Scope
	 * @type INumberBasedGlideElement<ChangeScopeString, ChangeScopeValue, ChangeScope>}
	 * @memberof Ichange_requestFields
	 * @description Internal type is integer; "1"="Massive"; "2"="Large"; "3"="Medium"; "4"="Small"; "5"="Tiny"
	 */
    scope: INumberBasedGlideElement<ChangeScopeString, ChangeScopeValue, ChangeScope>;
	/**
	 * Planned start date
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 * @description Internal type is glide_date_time
	 */
    start_date: IStringGlideElement;
	/**
	 * Standard Change Template version
	 * @type {GlideReferenceElement}
	 * @memberof Ichange_requestFields
	 * @description Reference to Standard Change Template Version (IGlideRefElement<Istd_change_producer_versionGlideRecord>)
	 */
    std_change_producer_version: GlideReferenceElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Ichange_requestFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Test plan
	 * @type {IStringGlideElement}
	 * @memberof Ichange_requestFields
	 */
    test_plan: IStringGlideElement;
	/**
	 * Type
	 * @type {IStringBasedGlideElement<ChangeType>}
	 * @memberof Ichange_requestFields
	 */
    type: IStringBasedGlideElement<ChangeType>;
}
declare interface Ichange_requestGlideRecord extends ItaskGlideRecordBase, Ichange_requestFields { }
declare interface Ichange_requestGlideElement extends ItaskGlideElementBase<Ichange_requestGlideRecord>, Ichange_requestFields { }

/**
 * GlideElement values from the Problem Task table.
 * @interface Iproblem_taskFields
 * @extends {ItaskFields}
 */
declare interface Iproblem_taskFields extends ItaskFields {
	/**
	 * Problem
	 * @type {IproblemGlideElement}
	 * @memberof Iproblem_taskFields
	 * @description Reference to Problem (IGlideRefElement<IproblemGlideRecord>)
	 */
    problem: IproblemGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Iproblem_taskFields
	 */
    sys_id: IGUIDGlideElement;
}
declare interface Iproblem_taskGlideRecord extends ItaskGlideRecordBase, Iproblem_taskFields { }
declare interface Iproblem_taskGlideElement extends ItaskGlideElementBase<Iproblem_taskGlideRecord>, Iproblem_taskFields { }

type ProblemStateString = "1" | "2";
type ProblemStateValue = 1 | 2;
type ProblemState = ProblemStateString | ProblemStateValue;
/**
 * GlideElement values from the Problem table.
 * @interface IproblemFields
 * @extends {ItaskFields}
 */
declare interface IproblemFields extends ItaskFields {
	/**
	 * Known error
	 * @type {IBooleanGlideElement}
	 * @memberof IproblemFields
	 */
    known_error: IBooleanGlideElement;
	/**
	 * Major problem
	 * @type {IBooleanGlideElement}
	 * @memberof IproblemFields
	 */
    major_problem: IBooleanGlideElement;
	/**
	 * Problem state
	 * @type {INumberBasedGlideElement<ProblemStateString, ProblemStateValue, ProblemState>}
	 * @memberof IproblemFields
	 * @description Internal type is integer; "1"="Open"; "3"="Pending Change"; "2"="Known Error"; "4"="Closed/Resolved"
	 */
    problem_state: INumberBasedGlideElement<ProblemStateString, ProblemStateValue, ProblemState>;
	/**
	 * Related Incidents
	 * @type {INumberGlideElement}
	 * @memberof IproblemFields
	 * @description Internal type is integer
	 */
    related_incidents: INumberGlideElement;
	/**
	 * Review outcome
	 * @type {IStringGlideElement}
	 * @memberof IproblemFields
	 */
    review_outcome: IStringGlideElement;
	/**
	 * Change request
	 * @type {Ichange_requestGlideElement}
	 * @memberof IproblemFields
	 * @description Reference to Change Request (IGlideRefElement<Ichange_requestGlideRecord>)
	 */
    rfc: Ichange_requestGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof IproblemFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Workaround
	 * @type {GlideElement}
	 * @memberof IproblemFields
	 * @description Internal type is "journal_input"
	 */
    work_around: GlideElement;
}
declare interface IproblemGlideRecord extends ItaskGlideRecordBase, IproblemFields { }
declare interface IproblemGlideElement extends ItaskGlideElementBase<IproblemGlideRecord>, IproblemFields { }

/**
 * GlideElement values from the Schedule table.
 * @interface Icmn_scheduleFields
 * @extends {Isys_metadataFields}
 */
declare interface Icmn_scheduleFields extends Isys_metadataFields {
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Icmn_scheduleFields
	 */
    description: IStringGlideElement;
	/**
	 * Document
	 * @type {IStringGlideElement}
	 * @memberof Icmn_scheduleFields
	 */
    document: IStringGlideElement;
	/**
	 * Document key
	 * @type {IStringGlideElement}
	 * @memberof Icmn_scheduleFields
	 */
    document_key: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_scheduleFields
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Icmn_scheduleGlideElement}
	 * @memberof Icmn_scheduleFields
	 * @description Reference to Schedule (IGlideRefElement<Icmn_scheduleGlideRecord>)
	 */
    parent: Icmn_scheduleGlideElement;
	/**
	 * Read only
	 * @type {IBooleanGlideElement}
	 * @memberof Icmn_scheduleFields
	 */
    read_only: IBooleanGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmn_scheduleFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Time zone
	 * @type {IStringGlideElement}
	 * @memberof Icmn_scheduleFields
	 * @description "NULL_OVERRIDE"="-- Floating --"
	 */
    time_zone: IStringGlideElement;
	/**
	 * Type
	 * @type {IStringGlideElement}
	 * @memberof Icmn_scheduleFields
	 */
    type: IStringGlideElement;
}
declare interface Icmn_scheduleGlideRecord extends Isys_metadataGlideRecordBase, Icmn_scheduleFields { }
declare interface Icmn_scheduleGlideElement extends Isys_metadataGlideElementBase<Icmn_scheduleGlideRecord>, Icmn_scheduleFields { }

/**
 * GlideElement values from the Role table.
 * @interface Isys_user_roleFields
 * @extends {Isys_metadataFields}
 */
declare interface Isys_user_roleFields extends Isys_metadataFields {
	/**
	 * Assignable by
	 * @type {Isys_user_roleGlideElement}
	 * @memberof Isys_user_roleFields
	 * @description Reference to Role (IGlideRefElement<Isys_user_roleGlideRecord>)
	 */
    assignable_by: Isys_user_roleGlideElement;
	/**
	 * Can delegate
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_roleFields
	 */
    can_delegate: IBooleanGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_roleFields
	 */
    description: IStringGlideElement;
	/**
	 * Elevated privilege
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_roleFields
	 */
    elevated_privilege: IBooleanGlideElement;
	/**
	 * Encryption context
	 * @type {GlideReferenceElement}
	 * @memberof Isys_user_roleFields
	 * @description Reference to Encryption Context (IGlideRefElement<Isys_encryption_contextGlideRecord>)
	 */
    encryption_context: GlideReferenceElement;
	/**
	 * Grantable
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_roleFields
	 */
    grantable: IBooleanGlideElement;
	/**
	 * Includes roles
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_roleFields
	 */
    includes_roles: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_roleFields
	 */
    name: IStringGlideElement;
	/**
	 * Requires Subscription
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_roleFields
	 */
    requires_subscription: IStringGlideElement;
	/**
	 * Application Administrator
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_roleFields
	 */
    scoped_admin: IBooleanGlideElement;
	/**
	 * Suffix
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_roleFields
	 */
    suffix: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_user_roleFields
	 */
    sys_id: IGUIDGlideElement;
}
declare interface Isys_user_roleGlideRecord extends Isys_metadataGlideRecordBase, Isys_user_roleFields { }
declare interface Isys_user_roleGlideElement extends Isys_metadataGlideElementBase<Isys_user_roleGlideRecord>, Isys_user_roleFields { }

/**
 * GlideElement values from the Table table.
 * @interface Isys_db_objectFields
 * @extends {Isys_metadataFields}
 */
declare interface Isys_db_objectFields extends Isys_metadataFields {
	/**
	 * Accessible from
	 * @type {IStringGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    access: IStringGlideElement;
	/**
	 * Allow UI actions
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    actions_access: IBooleanGlideElement;
	/**
	 * Allow new fields
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    alter_access: IBooleanGlideElement;
	/**
	 * Caller Access
	 * @type {IStringGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    caller_access: IStringGlideElement;
	/**
	 * Allow client scripts
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    client_scripts_access: IBooleanGlideElement;
	/**
	 * Allow configuration
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    configuration_access: IBooleanGlideElement;
	/**
	 * Can create
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    create_access: IBooleanGlideElement;
	/**
	 * Create access controls
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    create_access_controls: IBooleanGlideElement;
	/**
	 * Can delete
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    delete_access: IBooleanGlideElement;
	/**
	 * Extension model
	 * @type {IStringGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    extension_model: IStringGlideElement;
	/**
	 * Extensible
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    is_extendable: IBooleanGlideElement;
	/**
	 * Label
	 * @type {GlideElement}
	 * @memberof Isys_db_objectFields
	 * @description Internal type is "documentation_field"
	 */
    label: GlideElement;
	/**
	 * Live feed
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    live_feed_enabled: IBooleanGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    name: IStringGlideElement;
	/**
	 * Auto number
	 * @type {GlideReferenceElement}
	 * @memberof Isys_db_objectFields
	 * @description Reference to Number (IGlideRefElement<Isys_numberGlideRecord>)
	 */
    number_ref: GlideReferenceElement;
	/**
	 * Provider class
	 * @type {IStringGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    provider_class: IStringGlideElement;
	/**
	 * Can read
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    read_access: IBooleanGlideElement;
	/**
	 * Extends table
	 * @type {Isys_db_objectGlideElement}
	 * @memberof Isys_db_objectFields
	 * @description Reference to Table (IGlideRefElement<Isys_db_objectGlideRecord>)
	 */
    super_class: Isys_db_objectGlideElement;
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
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Can update
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    update_access: IBooleanGlideElement;
	/**
	 * User role
	 * @type {Isys_user_roleGlideElement}
	 * @memberof Isys_db_objectFields
	 * @description Reference to Role (IGlideRefElement<Isys_user_roleGlideRecord>)
	 */
    user_role: Isys_user_roleGlideElement;
	/**
	 * Allow access to this table via web services
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectFields
	 */
    ws_access: IBooleanGlideElement;
}
declare interface Isys_db_objectGlideRecord extends Isys_metadataGlideRecordBase, Isys_db_objectFields { }
declare interface Isys_db_objectGlideElement extends Isys_metadataGlideElementBase<Isys_db_objectGlideRecord>, Isys_db_objectFields { }

/**
 * GlideRecord that contains values from a record in the Dictionary Entry table.
 * @interface Isys_dictionaryGlideRecord
 * @extends {Isys_metadataGlideRecord}
 */
declare interface Isys_dictionaryGlideRecord extends Isys_metadataGlideRecordBase {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    active: IBooleanGlideElement;
	/**
	 * Array
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    array: IBooleanGlideElement;
	/**
	 * Array denormalized
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    array_denormalized: IBooleanGlideElement;
	/**
	 * Attributes
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    attributes: IStringGlideElement;
	/**
	 * Audit
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    audit: IBooleanGlideElement;
	/**
	 * Calculation
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "script"
	 */
    calculation: GlideElement;
	/**
	 * Choice
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "integer"
	 */
    choice: IStringGlideElement;
	/**
	 * Choice field
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "field_name"
	 */
    choice_field: IStringGlideElement;
	/**
	 * Choice table
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "table_name"
	 */
    choice_table: IStringGlideElement;
	/**
	 * Column label
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "documentation_field"
	 */
    column_label: GlideElement;
	/**
	 * Comments
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    comments: IStringGlideElement;
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
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "integer"
	 */
    defaultsort: IStringGlideElement;
	/**
	 * Default value
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    default_value: IStringGlideElement;
	/**
	 * Delete roles
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "user_roles"
	 */
    delete_roles: GlideElement;
	/**
	 * Dependent
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    dependent: IStringGlideElement;
	/**
	 * Dependent on field
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "field_name"
	 */
    dependent_on_field: IStringGlideElement;
	/**
	 * Display
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    display: IBooleanGlideElement;
	/**
	 * Dynamic creation
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    dynamic_creation: IBooleanGlideElement;
	/**
	 * Dynamic creation script
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    dynamic_creation_script: IStringGlideElement;
	/**
	 * Dynamic default value
	 * @type {GlideReferenceElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Reference to Dynamic Filter Options (IGlideRefElement<Isys_filter_option_dynamicGlideRecord>)
	 */
    dynamic_default_value: GlideReferenceElement;
	/**
	 * Dynamic ref qual
	 * @type {GlideReferenceElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Reference to Dynamic Filter Options (IGlideRefElement<Isys_filter_option_dynamicGlideRecord>)
	 */
    dynamic_ref_qual: GlideReferenceElement;
	/**
	 * Column name
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    element: IStringGlideElement;
	/**
	 * Element reference
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    element_reference: IBooleanGlideElement;
	/**
	 * Foreign database
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    foreign_database: IStringGlideElement;
	/**
	 * Function definition
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    function_definition: IStringGlideElement;
	/**
	 * Function field
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    function_field: IBooleanGlideElement;
	/**
	 * Type
	 * @type {GlideReferenceElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Reference to Field class (IGlideRefElement<Isys_glide_objectGlideRecord>)
	 */
    internal_type: GlideReferenceElement;
	/**
	 * Mandatory
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    mandatory: IBooleanGlideElement;
	/**
	 * Max length
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "integer"
	 */
    max_length: IStringGlideElement;
	/**
	 * Table
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "table_name"
	 */
    name: IStringGlideElement;
	/**
	 * Next element
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    next_element: IStringGlideElement;
	/**
	 * Primary
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    primary: IBooleanGlideElement;
	/**
	 * Read only
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    read_only: IBooleanGlideElement;
	/**
	 * Read roles
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "user_roles"
	 */
    read_roles: GlideElement;
	/**
	 * Reference
	 * @type {Isys_db_objectGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Reference to Table (IGlideRefElement<Isys_db_objectGlideRecord>)
	 */
    reference: Isys_db_objectGlideElement;
	/**
	 * Reference cascade rule
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    reference_cascade_rule: IStringGlideElement;
	/**
	 * Reference floats
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    reference_floats: IBooleanGlideElement;
	/**
	 * Reference key
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    reference_key: IStringGlideElement;
	/**
	 * Reference qual
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    reference_qual: IStringGlideElement;
	/**
	 * Reference qual condition
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "conditions"
	 */
    reference_qual_condition: GlideElement;
	/**
	 * Reference type
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    reference_type: IStringGlideElement;
	/**
	 * Sizeclass
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "integer"
	 */
    sizeclass: IStringGlideElement;
	/**
	 * Spell check
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    spell_check: IBooleanGlideElement;
	/**
	 * Staged
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    staged: IBooleanGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Table reference
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    table_reference: IBooleanGlideElement;
	/**
	 * Text index
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    text_index: IBooleanGlideElement;
	/**
	 * Unique
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    unique: IBooleanGlideElement;
	/**
	 * Use dependent field
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    use_dependent_field: IBooleanGlideElement;
	/**
	 * Use dynamic default
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    use_dynamic_default: IBooleanGlideElement;
	/**
	 * Use reference qualifier
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    use_reference_qualifier: IStringGlideElement;
	/**
	 * Calculated
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    virtual: IBooleanGlideElement;
	/**
	 * Widget
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    widget: IStringGlideElement;
	/**
	 * Write roles
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "user_roles"
	 */
    write_roles: GlideElement;
	/**
	 * XML view
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    xml_view: IBooleanGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Progress Worker table.
 * @interface Isys_progress_workerGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Isys_progress_workerGlideRecord extends IGlideRecord {
	/**
	 * Error message
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    error_message: IStringGlideElement;
	/**
	 * Message
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    message: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Output summary
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    output_summary: IStringGlideElement;
	/**
	 * Queued Time
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 * @description Internal type is "glide_duration"
	 */
    queued_time: IStringGlideElement;
	/**
	 * Run in background
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    run_in_background: IStringBasedGlideElement<BooleanString>;
	/**
	 * State
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    state: IStringBasedGlideElement<GlideProgressWorkerState>;
	/**
	 * Completion code
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    state_code: IStringBasedGlideElement<GlideProgressWorkerCompletionCode>;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Total Execute Time
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 * @description Internal type is "glide_duration"
	 */
    total_execute_time: IStringGlideElement;
	/**
	 * Total Run Time
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 * @description Internal type is "glide_duration"
	 */
    total_run_time: IStringGlideElement;
}

/**
 * GlideElement values from the Attachment table.
 * @interface Isys_attachmentFields
 */
declare interface Isys_attachmentFields {
	/**
	 * Average image color
	 * @type {GlideElement}
	 * @memberof Isys_attachmentFields
	 * @description Internal type is "color"
	 */
    average_image_color: GlideElement;
	/**
	 * Chunk size bytes
	 * @type {INumberGlideElement}
	 * @memberof Isys_attachmentFields
	 * @description Internal type is integer
	 */
    chunk_size_bytes: INumberGlideElement;
	/**
	 * Compressed
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_attachmentFields
	 */
    compressed: IBooleanGlideElement;
	/**
	 * Content type
	 * @type {IStringGlideElement}
	 * @memberof Isys_attachmentFields
	 */
    content_type: IStringGlideElement;
	/**
	 * Encryption context
	 * @type {GlideReferenceElement}
	 * @memberof Isys_attachmentFields
	 * @description Reference to Encryption Context (IGlideRefElement<Isys_encryption_contextGlideRecord>)
	 */
    encryption_context: GlideReferenceElement;
	/**
	 * File name
	 * @type {IStringGlideElement}
	 * @memberof Isys_attachmentFields
	 */
    file_name: IStringGlideElement;
	/**
	 * Image height
	 * @type {INumberGlideElement}
	 * @memberof Isys_attachmentFields
	 * @description Internal type is integer
	 */
    image_height: INumberGlideElement;
	/**
	 * Image width
	 * @type {INumberGlideElement}
	 * @memberof Isys_attachmentFields
	 * @description Internal type is integer
	 */
    image_width: INumberGlideElement;
	/**
	 * Size bytes
	 * @type {INumberGlideElement}
	 * @memberof Isys_attachmentFields
	 * @description Internal type is longint
	 */
    size_bytes: INumberGlideElement;
	/**
	 * Size compressed
	 * @type {INumberGlideElement}
	 * @memberof Isys_attachmentFields
	 * @description Internal type is longint
	 */
    size_compressed: INumberGlideElement;
	/**
	 * State
	 * @type {IStringBasedGlideElement<("pending" | "available" | "not_available" | "available_conditionally")>}
	 * @memberof Isys_attachmentFields
	 * @description "pending"="Pending"; "available"="Available"; "not_available"="Not available"; "available_conditionally"="Available Conditionally"
	 */
    state: IStringBasedGlideElement<("pending" | "available" | "not_available" | "available_conditionally")>;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Isys_attachmentFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Isys_attachmentFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_attachmentFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Isys_attachmentFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Isys_attachmentFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Isys_attachmentFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Table name
	 * @type {IStringGlideElement}
	 * @memberof Isys_attachmentFields
	 */
    table_name: IStringGlideElement;
	/**
	 * Table sys ID
	 * @type {IStringGlideElement}
	 * @memberof Isys_attachmentFields
	 * @description Internal type is char
	 */
    table_sys_id: IStringGlideElement;
}
declare interface Isys_attachmentGlideRecord extends IGlideRecord, Isys_attachmentFields { }
declare interface Isys_attachmentGlideElement extends IGlideRefElement<Isys_attachmentGlideRecord>, Isys_attachmentFields { }

/**
 * GlideElement values from the Choice table.
 * @interface Isys_choiceFields
 */
declare interface Isys_choiceFields {
	/**
	 * Dependent value
	 * @type {IStringGlideElement}
	 * @memberof Isys_choiceFields
	 */
    dependent_value: IStringGlideElement;
	/**
	 * Element
	 * @type {IStringGlideElement}
	 * @memberof Isys_choiceFields
	 */
    element: IStringGlideElement;
	/**
	 * Hint
	 * @type {IStringGlideElement}
	 * @memberof Isys_choiceFields
	 */
    hint: IStringGlideElement;
	/**
	 * Inactive
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_choiceFields
	 */
    inactive: IBooleanGlideElement;
	/**
	 * Label
	 * @type {IStringGlideElement}
	 * @memberof Isys_choiceFields
	 */
    label: IStringGlideElement;
	/**
	 * Language
	 * @type {IStringGlideElement}
	 * @memberof Isys_choiceFields
	 */
    language: IStringGlideElement;
	/**
	 * Table
	 * @type {IStringGlideElement}
	 * @memberof Isys_choiceFields
	 * @description Internal type is "table_name"
	 */
    name: IStringGlideElement;
	/**
	 * Sequence
	 * @type {INumberGlideElement}
	 * @memberof Isys_choiceFields
	 * @description Internal type is integer
	 */
    sequence: INumberGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Isys_choiceFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Isys_choiceFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Isys_choiceFields
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof Isys_choiceFields
	 * @description Internal type is "domain_path"
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_choiceFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Isys_choiceFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Isys_choiceFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Isys_choiceFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Value
	 * @type {IStringGlideElement}
	 * @memberof Isys_choiceFields
	 */
    value: IStringGlideElement;
}
declare interface Isys_choiceGlideRecord extends IGlideRecord, Isys_choiceFields { }
declare interface Isys_choiceGlideElement extends IGlideRefElement<Isys_choiceGlideRecord>, Isys_choiceFields { }

/**
 * GlideRecord that contains values from a record in the System Plugin table.
 * @interface Iv_pluginGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Iv_pluginGlideRecord extends IGlideRecord {
	/**
	 * Status
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    active: IStringGlideElement;
	/**
	 * Available version
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    available_version: IStringGlideElement;
	/**
	 * Definition
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    definition: IStringGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    description: IStringGlideElement;
	/**
	 * Entitled
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    entitled: IStringGlideElement;
	/**
	 * Has demo data
	 * @type {IBooleanGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    has_demo_data: IBooleanGlideElement;
	/**
	 * Help
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 * @description Internal type is "url"
	 */
    help: IStringGlideElement;
	/**
	 * ID
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    id: IStringGlideElement;
	/**
	 * Licensable
	 * @type {IBooleanGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    licensable: IBooleanGlideElement;
	/**
	 * Subscription Category
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    license_category: IStringGlideElement;
	/**
	 * Subscription Model
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    license_model: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Path
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    path: IStringGlideElement;
	/**
	 * Provider
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    provider: IStringGlideElement;
	/**
	 * Requires
	 * @type {GlideElement}
	 * @memberof Iv_pluginGlideRecord
	 * @description Internal type is "glide_list"
	 */
    requires: GlideElement;
	/**
	 * Scope
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    scope: IStringGlideElement;
	/**
	 * State
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    state: IStringGlideElement;
	/**
	 * Supports Rollback
	 * @type {IBooleanGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    supports_rollback: IBooleanGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Trackable
	 * @type {IBooleanGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    trackable: IBooleanGlideElement;
	/**
	 * Type
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    type: IStringGlideElement;
	/**
	 * Version
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    version: IStringGlideElement;
}

/**
 * Generic GlideRecord object.
 * @interface IGenericGlideRecord
 * @extends {IGlideRecord}
 */
declare interface IGenericGlideRecord extends IGlideRecord {
    [key: string]: any;
    getFields(): Packages.java.lang.util.ArrayList;
}

/**
 * GlideRecord API.
 * @class GlideRecord
 * @implements {IGenericGlideRecord}
 */
declare class GlideRecord implements IGenericGlideRecord {
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof GlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof GlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {GlideElement}
	 * @memberof GlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof GlideRecord
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof GlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof GlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
    
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

/**
 * GlideUser API.
 * @class GlideUser
 */
declare abstract class GlideUser {
    /**
     * Returns the current user's company sys_id.
     * @returns {string} Company sys_id.
     */
    getCompanyID(): string;

    /**
     * Returns the current user's display name.
     * @returns {string} User's display name
     */
    getDisplayName(): string;
    getDomainID(): string;
    /**
     * Returns the user's email address.
     * @returns {string} User's email address
     */
    getEmail(): string;
    /**
     * Returns the user's first name.
     * @returns {string} User's first name
     */
    getFirstName(): string;
    /**
     * Gets the sys_id of the current user.
     * @returns {string} User's sys_id
     */
    getID(): string;
    /**
     * Returns the user's last name.
     * @returns {string} User's last name
     */
    getLastName(): string;

    /**
     * Returns the user ID, or login name, of the current user.
     * @returns {string} User ID
     */
    getName(): string;
    /**
     * Gets the specified user preference value for the current user.
     * @param name The name of the preference.
     * @returns {string} The preference value.
     */
    getPreference(name: string): string;

    /**
     * Returns a list of roles that includes explicitly granted roles, inherited roles, and roles acquired by group membership.
     * @returns {string[]} List of all roles available to the user.
     */
    getRoles(): string[];
    /**
     * Returns the list of roles explicitly granted to the user.
     * @returns {string[]} List of roles explicitly assigned to the user.
     */
    getUserRoles(): string[];
    /**
     * Returns true if the current user belongs to any of the specified roles.
     * @param {string} role - The name of a role or a comma-separated string containing role names.
     * @returns {boolean}
     * @memberof GlideUser
     */
    hasRole(role: string): boolean;
    /**
     * Returns true if the current user belongs to all of the specified roles.
     * @param {string} roles - Names of all required roles.
     * @returns {boolean}
     * @memberof GlideUser
     */
    hasRole(roles: string[]): boolean;
    /**
     * Returns true if the current user has any roles.
     * @returns {boolean}
     * @memberof GlideUser
     */
    hasRoles(): boolean;

    /**
     * Determines if the current user is a member of the specified group.
     * @param group Group to check
     * @returns {boolean} True if the user is a member of the group.
     */
    isMemberOf(group: string): boolean;

    /**
     * Saves a user preference value to the database.
     * @param name The preference to save.
     * @param value The preference value.
     */
    savePreference(name: string, value: string): void;
}

/**
 * GlideUri API.
 * @class GlideURI
 */
declare class GlideURI {
    constructor();
    /**
     * Returns the specified parameter.
     * @param name The parameter name.
     * @returns {string} The value for the specified parameter.
     */
    get(name: string): string;

    /**
     * Returns the file name portion of the URI.
     * @returns {string} The file name portion of the URI.
     */
    getFileFromPath(): string;

    /**
     * Sets the specified parameter to the specified value.
     * @param name The parameter name.
     * @param value The value.
     */
    set(name: string, value: string): void;

    /**
     * Reconstructs the URI string and performs the proper URL encoding by converting non-valid characters to their URL code. For example, converting & to '%26'.
     * @param path The base portion of the system URL to which the URI is appended.
     * @returns {string} The URL.
     */
    toString(path: string): string;
}


declare interface IEmailWatermark  {
	getWatermark(): string;
}

/**
 * GlideEmail API.
 * @class GlideEmail
 */
declare abstract class GlideEmail  {
	/**
	 * Adds the recipient to either the cc or bcc list
	 * @param {"cc"|"bcc"} type Either cc or bcc, determines the list to which the address is added.
	 * @param {string} address The recipient's email address.
	 * @param {string} [displayName] The name to be shown instead of the email address.
	 */
	addAddress(type: "cc"|"bcc", address: string, displayName?: string): void;

	/**
	 * 
	 * @param address 
	 */
	addRecipient(address: string): void;

	/**
	 * Instantiates a scoped GlideEmailOutbound object.
	 * @param {string} [body] Body of message
	 */
	constructor(body?: string);

	/**
	 * 
	 */
	getSMSText(): string;

	/**
	 * Returns the email's subject line.
	 * @returns {string} The email's subject line.
	 */
	getSubject(): string;
	getTextBody(): string;
	getWatermark(): IEmailWatermark;

	/**
	 * Sets the body of the email.
	 * @param body The body of the email.
	 */
	setBody(body: string): void;

	/**
	 * Sets the sender's address.
	 * @param from The sender's email address.
	 */
	setFrom(address: string): void;
	setRecipients(recipients: string): void;

	/**
	 * Sets the reply to address.
	 * @param replyTo The reply to email address.
	 */
	setReplyTo(address: string): void;

	/**
	 * Sets the email's subject line.
	 * @param subject Text for the subject line.
	 */
	setSubject(subject: string): void;
}

declare class GlideEmailOutbound extends GlideEmail {
	// constructor(actionType: string);
	// constructor();
	// constructor(action: GlideRecord);
	// constructor(action: GlideRecord, m: IEmailWatermark);
	constructor(actionType_OR_action?: string|GlideRecord, m?: IEmailWatermark);
	save(): void;
}

declare abstract class JSUtil {
    static doesNotHave(item: any): boolean;
    static escapeAttr(text: string): string;
    static escapeText(text: string): string;
    static getBooleanValue(gr: GlideRecord, field: string);
    static has(item: any): boolean;
    static instance_of(item: any, className: string): boolean;
    static isJavaObject(value: any): boolean;
    static logObject(value: any, name: string): void;
    static nil(value: any): boolean;
    static notNil(value: any): boolean;
    static toBoolean(value: any): boolean;
    static type_of(value: any): string;
    static unescapeAttr(vtext: string): string;
    static unescapeText(vtext: string): string;
}

declare class ArrayUtil {
    concat<T>(parent: T[], child: T[]): T[];
    contains<T>(array: T[], element: T): boolean;
    convertArray(a: any): any[];
    diff<T>(parent: T[], child: T[]): T[];
    ensureArray<T>(o: any): Packages.java.lang.util.Collection | Packages.java.lang.util.Set | any[];
    indexOf<T>(array: T[], element: T, startIndex?: number): number;
    intersect<T>(a: T[], b: T[]): T[];
    union<T>(a: T[], b: T[]): T[];
    unique<T>(parent: T[]): T[];
}

declare interface GlidePlugin {
    getDescription(): any;
    getDisplayName(): string;
    getName(): string;
    getPath(): string;
    refreshArtifacts(): void;
}

declare interface GlideExtensionPoint {
    getAttribute(name: string): string;
}

/**
 * GlidePluginManager API.
 * @class GlidePluginManager
 */
declare class GlidePluginManager {
    constructor();

    /**
     * Determines if the specified plugin has been activated.
     * @param plugin_id - The plugin ID
     * @returns {boolean} True if the plugin has been activated.
     */
    isActive(plugin_id: string): boolean;
}

declare interface ScriptedProgressWorkerCallback {
    process(...args: any[]): void;
}

declare interface IServerClass {
    intialize(...args: (any | null | undefined)[]): void;
    type: string;
}

declare interface IBackgroundProgressWorkerHandler extends IServerClass {
    process(...args: (any | null | undefined)[]): void;
}

declare type GlideProgressWorkerState = "starting" | "running" | "complete" | "cancelled" | "unknown";

declare type GlideProgressWorkerCompletionCode = "success" | "cancelled" | "error";

/**
 * GlideProgressWorker API.
 * @class GlideProgressWorker
 */
declare class GlideProgressWorker {
    constructor();
    getProgressID(): string;
    setOutputSummary(msg: string): void;
    setProgressErrorState(): void;
    setProgressMessage(m: string): void;
    setProgressName(name: string): void;
    setProgressState(status: GlideProgressWorkerState): void;
    setProgressStateCode(stateCode: GlideProgressWorkerCompletionCode): void;
    setBackground(isBackground: boolean): void;
    start(): void;
}

/**
 * GlideScriptedProgressWorker API.
 * @class GlideScriptedProgressWorker
 */
declare class GlideScriptedProgressWorker extends GlideProgressWorker {
    addMessage(message: string): void;
    addNonEscapedParameter(parm: string): void;
    addParameter(parm: string): void;
    constructor();
    setName(name: string): void;
}

/**
 * GlidePluginManagerWorker API.
 * @class GlidePluginManagerWorker
 */
declare class GlidePluginManagerWorker extends GlideProgressWorker {
    setPluginId(id: string): void;
    setIncludeDemoData(includeDemoData: boolean): void;
}

declare class GlideChoice {
    // constructor(value: string, label: string);
    // constructor(value: string, label: string, sysId: string);
    constructor(value: string, label: string, sysId?: string);
    getId(): string;
    getImage(): string;
    getLabel(): string;
    getParameter(name: string): any;
    getSelected(): boolean;
    getValue(): string;
    setId(sysId: string): void;
    setImage(image: string): void;
    setLabel(string_1: string): void;
    setParameter(name: string, value: any): void;
    setSelected(selected: boolean): void;
    setValue(string_1: string): void;
}

declare class GlideScriptEvaluator {
    constructor();
    evaluateGeneratedString(expression: string, returnError: boolean): any;
    // evaluateString(expression: string, returnError: boolean): any;
    // evaluateString(expression: string, identifierKey: string, returnError: boolean): any;
    evaluateString(expression: string, returnError_OR_identifierKey: boolean | string, returnError?: boolean): any;
    haveError(): boolean;
    setEnforceSecurity(enforce: boolean): void;
}

declare class GlideEvaluator extends GlideScriptEvaluator {
    // constructor();
    // constructor(inter: boolean);
    // constructor(inter: boolean, strict: boolean);
    constructor(inter?: boolean, strict?: boolean);
    static evaluateCondition(condition: string): boolean;
    // evaluateString(expression: string, returnError: boolean): any;
    // evaluateString(expression: string, identifierKey: string, returnError: boolean): any;
    // static evaluateString(expression: string): any;
    evaluateString(expression: string, returnError_OR_identifierKey?: boolean | string, returnError?: boolean): any;
    static evaluateStringWithGlobals(expression: string, globals: { [key: string]: any; }): any;
    // static interpretGeneratedString(expression: string): any;
    // static interpretGeneratedString(expression: string, returnError: boolean): any;
    static interpretGeneratedString(expression: string, returnError?: boolean): any;
    // static interpretString(expression: string): any;
    // static interpretString(expression: string, returnError: boolean): any;
    static interpretString(expression: string, returnError?: boolean): any;
}

declare class GlideLRUCache {
    // constructor();
    // constructor(initialCapacity: number, loadFactor: number);
    // constructor(initialCapacity: number);
    constructor(initialCapacity?: number, loadFactor?: number);
    get(key: any): any;
}

declare class GlideController extends GlideEvaluator {
    // constructor();
    // constructor(global: any);
    constructor(global?: any);
    // evaluateAsObject(expression: string): any;
    // evaluateAsObject(expression: string, ed: GlideElementDescriptor): any;
    evaluateAsObject(expression: string, ed?: GlideElementDescriptor): any;
    static exists(name: string): any;
    static getCache(): GlideLRUCache;
    static getGlobal(name: string): any;
    static getSandboxGlobal(name: string): any;
    static putGlobal(name: string, value: any): void;
    static removeGlobal(string_1: string): void;
}

declare class GlideXMLDocument {
    // constructor();
    // constructor(d: any);
    // constructor(rootName: string);
    // constructor(file: any);
    constructor(d_OR_rootName_OR_file?: any | string);
    createCDATAElement(name: string, value: string): any;
    createComment(msg: string): any;
    // createElement(name: string, value: string): any;
    // createElement(name: string): any;
    createElement(name: string, value?: string): any;
    getChildTextByTagName(parent: any, tagName: string): string;
    getDocument(): any;
    getDocumentElement(): any;
    getElementByTagName(tagName: string): any;
    getElementValueByTagName(tagName: string): string;
    importElement(e: any): any;
    importElementToParent(e: any, parent: any): any;
    isNamespaceAware(): boolean;
    isValid(): boolean;
    parse(xml: string): boolean;
    pop(): void;
    selectNodes(xpath: string): any;
    // selectSingleNode(xpath: string): any;
    // selectSingleNode(currentNode: any, xpath: string): any;
    selectSingleNode(xpath_OR_currentNode: string | any, xpath?: string): any;
    selectSingleNodeText(xpath: string): string;
    setAttribute(name: string, value: string): void;
    setCurrent(e: any): void;
    // setDocument(document: any): void;
    // setDocument(document: string): void;
    setDocument(document: any | string): void;
    setNamespaceAware(nsAware: boolean): void;
    setText(e: any, text: string): void;
    toIndentedString(): string;
    toString(): string;
}

declare class GlideChoiceList {
    // add(choice: GlideChoice): boolean;
    // add(value: string, label: string): GlideChoice;
    add(choice_OR_value: GlideChoice | string, label?: string): boolean;
    addAll(cl: GlideChoiceList): void;
    addFirst(value: string, label: string): void;
    addNone(): GlideChoice;
    constructor();
    // getChoice(index: number): GlideChoice;
    // getChoice(value: string): GlideChoice;
    getChoice(index_OR_value: number | string): GlideChoice;
    static getChoiceList(tableName: string, fieldName: string): GlideChoiceList;
    getChoiceNoTrim(value: string): GlideChoice;
    getLabelOf(value: string): string;
    getNullOverride(gc: GlideController): string;
    getSelectedIndex(): number;
    getSize(): number;
    getValueOf(label: string): string;
    // removeChoice(value: string): GlideChoice;
    // removeChoice(i: number): GlideChoice;
    removeChoice(value_OR_i: string | number): GlideChoice;
    removeNone(): void;
    sort(): void;
    toJSON(): any;
    toXML(x: GlideXMLDocument): void;
}

declare class GlideSysForm {
    // constructor(tableName: string);
    // constructor(tableName: string, viewName: string);
    // constructor();
    constructor(tableName?: string, viewName?: string);
    createDefaultBaselineVersion(record: GlideRecord): void;
    static generateDefaultForm(tableName: string): string;
    static getRelatedTables(tableName: string): GlideChoiceList;
    getSuggestedFields(): Array<string>;
    getTableName(): string;
    save(): void;
    setAvailable(available: string): void;
    setCollection(s: string): void;
    setForm(form: string): void;
    setName(name: string): void;
    setPackageID(packageID: string): void;
    setScopeID(scopeID: string): void;
    setSelected(selected: string): void;
    setTablePackageID(): void;
    setTableScopeID(): void;
    setView(viewName: string): void;
    setViewName(viewName: string): void;
}

declare class GlideChoiceListSet {
    constructor();
    getColumns(): GlideChoiceList;
    getSelected(): GlideChoiceList;
    setColumns(clColumns: GlideChoiceList): void;
    setSelected(clSelected: GlideChoiceList): void;
    sortColumns(): void;
    toXML(): any;
}

declare class GlideSysList extends GlideSysForm {
    InsertListElements(fields: Array<any>): void;
    // constructor(tableName: string);
    // constructor(tableName: string, parentName: string);
    constructor(tableName: string, parentName?: string);
    createDefaultBaseline(): void;
    getAccessList(collectionKey: string): Array<string>;
    getListColumns(): GlideChoiceList;
    getListRecords(): Array<string>;
    getListSet(): GlideChoiceListSet;
    getRecordSet(): GlideRecord;
    getStandardListID(): string;
    isUserList(): boolean;
    // save(): void;
    // save(fields: string): void;
    save(fields?: string): void;
    saveForUser(fields: string): void;
    setIncludeFormatting(b: boolean): void;
    setReconcileList(b: boolean): void;
    setRelatedParentID(parentID: string): void;
    setRelatedParentName(parentName: string): void;
    setRelationshipID(relationshipID: string): void;
    setUserApplies(b: boolean): void;
}

declare class GlideUpdateManager2 {
    allowBackout(sysId: string): boolean;
    allowVersionBackout(sysId: string): boolean;
    // constructor();
    // constructor(updateSetId: string);
    constructor(updateSetId?: string);
    getDefaultUpdateName(tableName: string, uniqueValue: string): string;
    getUpdateName(gr: GlideRecord): string;
    // load(updateName: string): void;
    // load(updateName: string, directory: string): void;
    load(updateName: string, directory?: string): void;
    loadFile(filePath: string): void;
    // loadFixes(updateName: string, before: boolean): void;
    // loadFixes(updateName: string): void;
    loadFixes(updateName: string, before?: boolean): void;
    loadFromDatabase(category: string): void;
    loadIntoDatabase(category: string): boolean;
    // loadXML(xml: string): void;
    // loadXML(xml: string, writeVersion: boolean, revertedFrom: string, sourceTable: string, sourceId: string): void;
    loadXML(xml: string, writeVersion?: boolean, revertedFrom?: string, sourceTable?: string, sourceId?: string): void;
    removeUpdateSet(setID: string): void;
    saveBaselineChoiceListElements(tableName: string, fieldName: string): void;
    saveChoiceListElements(tableName: string, fieldName: string): void;
    saveListElements(sl: GlideSysList): void;
    saveRecord(gr: GlideRecord): boolean;
    setInstalling(b: boolean): void;
}

declare class GlideActionURL {
    setRedirectURL(o: string | GlideRecord): void;
}

/**
 * Class for performing date operators and working with GlideDate fields.
 * @class GlideDate
 */
declare class GlideDate {
    /**
     * Creates a GlideDate object with the current date time.
     */
    constructor();

    /**
     * Gets the date in the specified date format.
     * @param {string} format The desired date format.
     * @returns {string} The date in the specified format.
     */
    getByFormat(format: string): string;

    /**
     * Gets the day of the month stored by the {@link GlideDate} object, expressed in the UTC time zone.
     * @returns {number} The day of the month in the UTC time zone, from 1 to 31.
     */
    getDayOfMonthNoTZ(): number;

    /**
     * Gets the date in the current user's display format and time zone.
     * @returns {string} The date in the user's format and time zone.
     * @description Keep in mind when designing business rules or script includes that this method may return values in different formats for different users.
     */
    getDisplayValue(): string;

    /**
     * Gets the display value in the internal format (yyyy-MM-dd).
     * @returns {string} The date values for the {@link GlideDate} object in the current user's time zone and the internal time format of yyyy-MM-dd.
     */
    getDisplayValueInternal(): string;

    /**
     * Gets the month stored by the {@link GlideDate} object, expressed in the UTC time zone.
     * @returns {number} The numerical value of the month from 1 to 12.
     */
    getMonthNoTZ(): number;

    /**
     * Gets the date value stored in the database by the {@link GlideDate} object in the internal format, yyyy-MM-dd, and the system time zone, UTC by default.
     * @returns {string} The date value in the internal format and system time zone.
     */
    getValue(): string;

    /**
     * Gets the year stored by the {@link GlideDate} object, expressed in the UTC time zone.
     * @returns {number} The numerical value of the year.
     */
    getYearNoTZ(): number;

    /**
     * Sets a date value using the current user's display format and time zone.
     * @param {string} asDisplayed The date in the current user's display format and time zone.
     * @description The parameter must be formatted using the current user's preferred display format, such as yyyy-MM-dd.
     */
    setDisplayValue(asDisplayed: string): void;

    /**
     * Sets the date of the {@link GlideDate} object.
     * @param {string} o The date and time to use.
     */
    setValue(o: string): void;

    /**
     * Gets the duration difference between two {@link GlideDate} values.
     * @param {GlideDate} start The start value.
     * @param {GlideDate} end The end value.
     * @returns {GlideDate} The {@link GlideDate|duration} between the two values.
     */
    static subtract(start: GlideDate, end: GlideDate): GlideDate;
}

/**
 * Class for performing time operations and working with GlideTime fields.
 * @class GlideTime
 */
declare class GlideTime {
    /**
     * Instantiates a GlideTime object
     * @param {number|GlideTime} [milliseconds] The time in milliseconds.
     * @description If a parameter is passed, the object is initialized with the specified number of seconds.
     * If a {@link GlideTime} object is passed, then that object will be cloned. Otherwise, it is initiated with the current time.
     */
    constructor(milliseconds?: number | GlideTime);

    /**
     * Gets the time in the specified format.
     * @param {string} format The time format.
     * @returns {string} The time in the specified format.
     */
    getByFormat(format: string): string;

    /**
     * Gets the time in the current user's display format and time zone.
     * @returns {string} The time in the user's format and time zone.
     * @description When designing business rules or script includes remember that this method may return values in different formats for different users.
     */
    getDisplayValue(): string;

    /**
     * Gets the display value in the current user's time zone and the internal format (HH:mm:ss).
     * @returns {string} The time value for the GlideTime object in the current user's time zone and the internal time format of HH:mm:ss.
     */
    getDisplayValueInternal(): string;

    /**
     * Returns the hours part of the time using the local time zone.
     * @returns {number} The hours using the local time zone.
     */
    getHourLocalTime(): number;

    /**
     * Returns the hours part of the time using the local time zone.
     * @returns {number} The hours using the local time zone.
     * @description The number of hours is based on a 24 hour clock.
     */
    getHourOfDayLocalTime(): number;

    /**
     * Returns the hours part of the time using the UTC time zone.
     * @returns {number} The hours using the UTC time zone.
     * @description The number of hours is based on a 24 hour clock.
     */
    getHourOfDayUTC(): number;

    /**
     * Returns the hours part of the time using the UTC time zone.
     * @returns {number} The hours using the UTC time zone.
     * @description The number of hours is based on a 12 hour clock. Noon and midnight are represented by 0, not 12.
     */
    getHourUTC(): number;

    /**
     * Returns the number of minutes using the local time zone.
     * @returns {number} The number of minutes using the local time zone.
     */
    getMinutesLocalTime(): number;

    /**
     * Returns the number of minutes in the hour based on the UTC time zone.
     * @returns {number} The number of minutes in the hour using the UTC time zone.
     */
    getMinutesUTC(): number;

    /**
     * Returns the number of seconds in the current minute.
     * @returns {number} The number of seconds in the minute.
     */
    getSeconds(): number;

    /**
     * Gets the time value stored in the database by the {@link GlideTime} object in the internal format, HH:mm:ss, and the system time zone.
     * @returns {string} The time value in the internal fomat and system time zone.
     */
    getValue(): string;

    getXMLValue(): string;

    setXMLValue(xml: string): void;

    /**
     * Sets a time value using the current user's display format and time zone.
     * @param {string} asDisplayed The time in the current user's display format and time zone.
     * @description The parameter must be formatted using the current user's preferred display format, such as HH:mm:ss.
     */
    setDisplayValue(asDisplayed: string): void;

    /**
     * Sets the time of the {@link GlideTime} object in the internal time zone.
     * @param {string | GlideElement} o The time in hh:mm:ss format.
     */
    setValue(o: string | GlideElement): void;

    /**
     * Gets the duration difference between two {@link GlideTime} object values.
     * @param {GlideTime} startTime The start value.
     * @param {GlideTime} endTime The end value.
     * @returns {GlideTime} The duration between the two values.
     */
    static subtract(startTime: GlideTime, endTime: GlideTime): GlideTime;
}

/**
 * Class for working with spans of time or durations.
 * @description GlideDuration objects store the duration as a date and time from January 1, 1970, 00:00:00.
 * As a result, {@link GlideDuration#setValue|setValue()} and {@link GlideDuration#getValue|getValue()} use the scoped GlideDateTime object for parameters and return values.
 * @class GlideDuration
 */
declare class GlideDuration extends GlideTime {
    /**
     * Instantiates a {@link GlideDuration} object. by cloning the value of another {@link GlideDuration} object.
     * @param {number|string|GlideDuration} [value] If a number is passed, then this is instantiated with the specified duration in milliseconds.
     * If a string is passed, then this is initialized with the specified display value. If a {@link GlideDuration} object is passed, then this is cloned from that object.
     */
    constructor(value?: number | string | GlideDuration);

    /**
     * Add the specified duration to the object.
     * @param {GlideDuration} other The value to add to the object.
     * @returns {GlideDuration} The sum of the current and the added duration.
     */
    add(other: GlideDuration): GlideDuration;

    /**
     * Gets the number of days.
     * @returns {number} The number of days.
     */
    getDayPart(): number;

    /**
     * Gets the duration value in "d HH:mm:ss" format.
     * @returns {string} The duration value.
     */
    getDurationValue(): string;

    /**
     * Gets the rounded number of days.
     * @returns {number} The day part, rounded.
     * @description If the time part is more than 12 hours, the return value is rounded up. Otherwise, it is rounded down.
     */
    getRoundedDayPart(): number;

    /**
     * Subtracts the specified duration from the current duration.
     * @param {GlideDuration} duration The duration to subtract.
     */
    subtract(duration: GlideDuration): void;
}

/**
 * Class for performing date/time operations and working with glide_date_time fields.
 * @description Methods in this class perform date-time operations, such as instantiating a GlideDateTime object, performing date-time calculations, formatting a date-time,
 * or converting between date-time formats.
 * @class GlideDateTime
 */
declare class GlideDateTime {
    /**
     * Instantiates a new {@link GlideDateTime} object.
     * @param {string|GlideDateTime} [value] {@link GlideDateTime} to initialize from or string representation of date and time value in the UTC time zone specified with the
     * format yyyy-MM-dd HH:mm:ss. If omitted, then it is initialized with the current date and time in Greenwich Mean Time (GMT).
     */
    constructor(value?: string | GlideDateTime);

    /**
     * Adds a {@link GlideTime} object or milliseconds to the current {@link GlideDateTime} object
     * @param {GlideTime|number} value The {@link GlideTime|time} or milliseconds to add.
     */
    add(value: GlideTime | number): void;

    /**
     * Adds a specified number of days to the current {@link GlideDateTime} object. A negative parameter subtracts days.
     * @param {number} days The number of days to add. Use a negative value to subtract.
     * @deprecated Use {@link GlideDateTime#addDaysLocalTime|addDaysLocalTime()} and {@link GlideDateTime#addDaysUTC|addDaysUTC()} instead of this method.
     */
    addDays(days: number): void;

    /**
     * Adds a specified number of days to the current {@link GlideDateTime} object.
     * @param {number} days The number of days to add. Use a negative value to subtract.
     * @description A negative parameter subtracts days. The method determines the local date and time equivalent to the value stored by the {@link GlideDateTime} object,
     * then adds or subtracts days using the local date and time values.
     */
    addDaysLocalTime(days: number): void;

    /**
     * Adds a specified number of days to the current {@link GlideDateTime} object.
     * @param {number} days The number of days to add. Use a negative number to subtract.
     * @description A negative parameter subtracts days. The method determines the UTC date and time equivalent to the value stored by the {@link GlideDateTime} object,
     * then adds or subtracts days using the UTC date and time values.
     */
    addDaysUTC(days: number): void;

    /**
     * Adds a specified number of months to the current {@link GlideDateTime} object.
     * @param {number} months The number of months to add. Use a negative number to subtract.
     * @deprecated Use {@link GlideDateTime#addMonthsLocalTime|addMonthsLocalTime()} and {@link GlideDateTime#addMonthsUTC|addMonthsUTC()} instead of this method.
     */
    addMonths(months: number): void;

    /**
     * Adds a specified number of months to the current {@link GlideDateTime} object.
     * @param {number} months The number of months to add. Use a negative value to subtract.
     * @description A negative parameter subtracts months. The method determines the local date and time equivalent to the value stored by the {@link GlideDateTime} object,
     * then adds or subtracts months using the local date and time values.
     */
    addMonthsLocalTime(months: number): void;

    /**
     * Adds a specified number of months to the current {@link GlideDateTime} object.
     * @param {number} months The number of months to add. Use a negative value to subtract.
     * @description A negative parameter subtracts months. The method determines the UTC date and time equivalent to the value stored by the {@link GlideDateTime} object,
     * then adds or subtracts months using the UTC date and time values.
     */
    addMonthsUTC(months: number): void;

    /**
     * Adds the specified number of seconds to the current {@link GlideDateTime} object.
     * @param {number} seconds The number of seconds to add.
     */
    addSeconds(seconds: number): void;

    /**
     * Adds a specified number of weeks to the current {@link GlideDateTime} object.
     * @param {number} weeks The number of weeks to add. Use a negative number to subtract.
     * @deprecated Use {@link GlideDateTime#addWeeksLocalTime|addWeeksLocalTime()} and {@link GlideDateTime#addWeeksUTC|addWeeksUTC()} instead of this method.
     */
    addWeeks(weeks: number): void;

    /**
     * dds a specified number of weeks to the current {@link GlideDateTime} object.
     * @param {number} weeks The number of weeks to add. Use a negative value to subtract.
     * @description The method determines the local date and time equivalent to the value stored by the {@link GlideDateTime} object, then adds or subtracts weeks using the
     * local date and time values.
     */
    addWeeksLocalTime(weeks: number): void;

    /**
     * Adds a specified number of weeks to the current {@link GlideDateTime} object.
     * @param {number} weeks The number of weeks to add. Use a negative value to subtract.
     * @description A negative parameter subtracts weeks. The method determines the UTC date and time equivalent to the value stored by the {@link GlideDateTime} object,
     * then adds or subtracts weeks using the UTC date and time values.
     */
    addWeeksUTC(weeks: number): void;

    /**
     * Adds a specified number of years to the current {@link GlideDateTime} object.
     * @param {number} years The number of years to add. Use a negative number to subtract.
     * @deprecated Use {@link GlideDateTime#addYearsLocalTime|addYearsLocalTime()} and {@link GlideDateTime#addYearsUTC|addYearsUTC()} instead of this method.
     */
    addYears(years: number): void;

    /**
     * Adds a specified number of years to the current {@link GlideDateTime} object.
     * @param {number} years The number of years to add. Use a negative value to subtract.
     * @description The method determines the local date and time equivalent to the value stored by the {@link GlideDateTime} object, then adds or subtracts years using the
     * local date and time values.
     */
    addYearsLocalTime(years: number): void;

    /**
     * Adds a specified number of years to the current {@link GlideDateTime} object.
     * @param {number} years The number of years to add. Use a negative value to subtract.
     * @description A negative parameter subtracts years. The date and time value stored by {@link GlideDateTime} object is interpreted as being in the UTC time zone.
     */
    addYearsUTC(years: number): void;

    /**
     * Determines if the {@link GlideDateTime} object occurs after the specified {@link GlideDateTime}.
     * @param {GlideDateTime} gdt The time to check against.
     * @returns {boolean} Returns true if the {@link GlideDateTime} object's time is after the time specified by the parameter.
     */
    after(gdt: GlideDateTime): boolean;

    /**
     * Determines if the {@link GlideDateTime} object occurs before the specified {@link GlideDateTime}.
     * @param {GlideDateTime} gdt The time to check against.
     * @returns {boolean} Returns true if the {@link GlideDateTime} object's time is before the time specified by the parameter.
     */
    before(gdt: GlideDateTime): boolean;

    /**
     * Compares two date and time objects to determine whether they are equivalent or one occurs before or after the other.
     * @param {*} o Date and time object in {@link GlideDateTime} format.
     * @returns {number} 0 = Dates are equal; 1 = The object's date is after the date specified in the parameter; -1 = The object's date is before the date specified in the
     * parameter.
     */
    compareTo(o: any): number;

    /**
     * Compares a datetime with an existing value for equality.
     * @param {GlideDateTime|string} o The datetime to compare.
     * @returns {boolean} Returns true if they are equal; otherwise, false.
     */
    equals(o: any): boolean;

    /**
     * Gets the {@link GlideDate|date} stored by the {@link GlideDateTime} object, expressed in the standard format, yyyy-MM-dd, and the system time zone, UTC by default.
     * @returns {GlideDate} The {@link GlideDate|date} in the system time zone.
     */
    getDate(): GlideDate;

    /**
     * Returns the current day of the month in the UTC time zone.
     * @returns {number} The day of the month in the UTC time zone, from 1 to 31.
     * @deprecated Use {@link GlideDateTime#getDayOfMonthLocalTime|getDayOfMonthLocalTime()} and {@link GlideDateTime#getDayOfMonthUTC|getDayOfMonthUTC()} instead of this method.
     */
    getDayOfMonth(): number;

    /**
     * Gets the day of the month stored by the {@link GlideDateTime} object, expressed in the current user's time zone.
     * @returns {number} The day of the month in the user's time zone, from 1 to 31.
     */
    getDayOfMonthLocalTime(): number;

    /**
     * Gets the day of the month stored by the {@link GlideDateTime} object, expressed in the UTC time zone.
     * @returns {number} The day of the month in the UTC time zone, from 1 to 31.
     */
    getDayOfMonthUTC(): number;

    /**
     * Returns the day of the week stored by the {@link GlideDateTime} object, expressed in the user's time zone.
     * @returns {number} The day of the week value - Monday = 1, ... Sunday = 7.
     * @deprecated Use {@link GlideDateTime#getDayOfWeekLocalTime|getDayOfWeekLocalTime()} and {@link GlideDateTime#getDayOfWeekUTC|getDayOfWeekUTC()} instead of this method.
     */
    getDayOfWeek(): number;

    /**
     * Gets the day of the week stored by the {@link GlideDateTime} object, expressed in the user's time zone.
     * @returns {number} The day of week value, in the user's time zone, from 1 to 7. Monday equals 1, Sunday equals 7.
     */
    getDayOfWeekLocalTime(): number;

    /**
     * Gets the day of the week stored by the {@link GlideDateTime} object, expressed in the UTC time zone.
     * @returns {number} The day of week value from 1 to 7. Monday equals 1, Sunday equals 7.
     */
    getDayOfWeekUTC(): number;

    /**
     * Returns the number of days in the month stored by the {@link GlideDateTime} object, expressed in the Java Virtual Machine time zone.
     * @returns {number} The number of days in the current month in the Java Virtual Machine time zone.
     * @deprecated Use {@link GlideDateTime#getDaysInMonthLocalTime|getDaysInMonthLocalTime()} and {@link GlideDateTime#getDaysInMonthUTC|getDaysInMonthUTC()} instead of this method.
     */
    getDaysInMonth(): number;

    /**
     * Gets the number of days in the month stored by the {@link GlideDateTime} object, expressed in the current user's time zone.
     * @returns {number} The number of days in the current month in the user's time zone.
     */
    getDaysInMonthLocalTime(): number;

    /**
     * Gets the number of days in the month stored by the {@link GlideDateTime} object, expressed in the UTC time zone.
     * @returns {number} The number of days in the month stored by the {@link GlideDateTime} object, expressed in the UTC time zone.
     */
    getDaysInMonthUTC(): number;

    /**
     * Gets the date and time value in the current user's display format and time zone.
     * @returns {string} The date and time in the user's format and time zone.
     * @description Keep in mind when designing business rules or script includes that this method may return values in different formats for different users.
     */
    getDisplayValue(): string;

    /**
     * Gets the display value in the internal format (yyyy-MM-dd HH:mm:ss).
     * @returns {string} The date and time values for the {@link GlideDateTime} object in the current user's time zone and the internal date and time format of
     * yyyy-MM-dd HH:mm:ss.
     */
    getDisplayValueInternal(): string;

    /**
     * Gets the amount of time that daylight saving time is offset.
     * @returns {number} Amount of time, in milliseconds, that daylight saving is offset. Returns 0 if there is no offset or if the time is not during daylight saving time.
     */
    getDSTOffset(): number;

    /**
     * Gets the current error message.
     * @returns {string} The error message.
     */
    getErrorMsg(): string | null | undefined;

    /**
     * Returns the object's time in the local time zone and in the internal format.
     * @returns {string} The object's time in the local time zone and the internal format.
     */
    getInternalFormattedLocalTime(): string;

    /**
     * Returns a date and time object set to midnight of a specified day using UTC.
     * @param dayOfTheWeek The day of the week for which to return the date/time object.
     * @returns {GlideDateTime} A {@link GlideDateTime} object set to midnight.
     */
    getInternalMidnight(dayOfTheWeek: number): GlideDateTime;

    /**
     * Gets the {@link GlideDate|date} stored by the {@link GlideDateTime} object, expressed in the standard format, yyyy-MM-dd, and the current user's time zone.
     * @returns {GlideDate} The {@link GlideDate|date} in the user's time zone.
     */
    getLocalDate(): GlideDate;

    /**
     * Returns a {@link GlideTime} object that represents the time portion of the {@link GlideDateTime} object in the user's time zone.
     * @returns {GlideTime} The {@link GlideTime|time} in the user's time zone.
     */
    getLocalTime(): GlideTime;

    /**
     * Returns the month stored by the {@link GlideDateTime} object, expressed in Java Virtual Machine time zone.
     * @returns {number} The numerical value of the month, Jan=1, Dec=12.
     * @deprecated Use {@link GlideDateTime#getMonthLocalTime|getMonthLocalTime()} and {@link GlideDateTime#getMonthUTC|getMonthUTC()} instead of this method.
     */
    getMonth(): number;

    /**
     * Gets the month stored by the {@link GlideDateTime} object, expressed in the current user's time zone.
     * @returns {number} The numerical value of the month.
     */
    getMonthLocalTime(): number;

    /**
     * Gets the month stored by the {@link GlideDateTime} object, expressed in the UTC time zone.
     * @returns {number} The numerical value of the month.
     */
    getMonthUTC(): number;

    /**
     * Gets the number of milliseconds since January 1, 1970, 00:00:00 GMT.
     * @returns {number} The number of milliseconds since January 1, 1970, 00:00:00 GMT.
     */
    getNumericValue(): number;

    /**
     * Returns the amount of time elapsed since the midnight of a specified day to the current time.
     * @param dayOfTheWeek Day of week value from 1 to 7. 1 = Monday, 7=Sunday.
     * @returns {GlideDateTime} The amount of time elapsed since midnight of the specified day.
     * @description To display the result in user-friendly terms, set the value to {@link GlideDuration}.
     */
    getSpanTime(dayOfTheWeek: number): GlideDateTime;

    /**
     * Returns the Unix duration stamp.
     * @returns {GlideTime} The Unix duration stamp in system format based on GMT time.
     */
    getTime(): GlideTime;

    /**
     * Gets the time zone offset in milliseconds.
     * @returns {number} The number of milliseconds of time zone offset.
     */
    getTZOffset(): number;

    /**
     * Returns the object's time in the local time zone and in the user's format.
     * @returns {string} The object's time in the local time zone and in the user's format.
     */
    getUserFormattedLocalTime(): string;

    /**
     * Returns the time zone for the current user session.
     * @returns {string} The {@link TimeZone} object for the current user.
     */
    getUserTimeZone(): TimeZone;

    /**
     * Returns a {@link GlideDateTime} object with the time set to midnight using the UTC time zone.
     * @param dayOfTheWeek The day of the week, from 1 to 7. Monday=1, Sunday=7. Do not enter 0 in this parameter.
     * @returns {GlideDateTime} A new {@link GlideDateTime} object set to midnight.
     */
    getUTCMidnight(dayOfTheWeek: number): GlideDateTime;

    /**
     * Gets the date and time value stored by the {@link GlideDateTime} object in the internal format, yyyy-MM-dd HH:mm:ss, and the system time zone, UTC by default.
     * @returns {string} The date and time value in the internal format and system time zone.
     */
    getValue(): string;

    /**
     * Gets the number of the week stored by the {@link GlideDateTime} object, expressed in the current user's time zone.
     * @returns {number} The number of the current week in local time. The highest week number in a year is either 52 or 53.
     * @description All weeks begin on Sunday. The first week of the year is the week that contains at least one day of the new year. The week beginning Sunday
     * 2015-12-27 is considered the first week of 2016 as that week contains January 1 and 2.
     */
    getWeekOfYearLocalTime(): number;

    /**
     * Gets the number of the week stored by the {@link GlideDateTime} object, expressed in the UTC time zone.
     * @returns {number} The number of the current week in UTC time. The highest week number in a year is either 52 or 53.
     * @description All weeks begin on Sunday. The first week of the year is the week that contains at least one day of the new year. The week beginning Sunday 2015-12-27
     * is considered the first week of 2016 as that week contains January 1 and 2.
     */
    getWeekOfYearUTC(): number;

    /**
     * Returns the year stored by the {@link GlideDateTime} object, expressed in the Java Virtual Machine time zone.
     * @returns {number} The 4-digit year value in the Java Virtual Machine time zone.
     * @deprecated Use {@link GlideDateTime#getYearLocalTime|getYearLocalTime()} and {@link GlideDateTime#getYearUTC|getYearUTC()} instead of this method.
     */
    getYear(): number;

    /**
     * Gets the year stored by the {@link GlideDateTime} object, expressed in the current user's time zone.
     * @returns {number} Four-digit year value in the user's time zone.
     */
    getYearLocalTime(): number;

    /**
     * Gets the year stored by the {@link GlideDateTime} object, expressed in the UTC time zone.
     * @returns {number} 4-digit year value in the UTC time zone.
     */
    getYearUTC(): number;

    /**
     * Determines if an object's date is set.
     * @returns {boolean} True if the object date is set; otherwise, returns false.
     */
    hasDate(): boolean;

    /**
     * Determines if an object's time uses a daylight saving offset.
     * @returns {boolean} True if the time is daylight saving; otherwise, returns false.
     */
    isDST(): boolean;

    /**
     * Determines if a value is a valid date and time.
     * @returns {boolean} True if value is valid; otherwise, returns false.
     */
    isValid(): boolean;

    /**
     * Determines if the {@link GlideDateTime} object occurs on or after the specified {@link GlideDateTime}.
     * @param {GlideDateTime} gdt The time to check against.
     * @returns {boolean} Returns true if the {@link GlideDateTime} object's time is on or after the time specified by the parameter.
     */
    onOrAfter(gdt: GlideDateTime): boolean;

    /**
     * Determines if the {@link GlideDateTime} object occurs on or before the specified {@link GlideDateTime}.
     * @param {GlideDateTime} gdt The time to check against.
     * @returns {boolean} Returns true if the {@link GlideDateTime} object's time is on or before the time specified by the parameter.
     */
    onOrBefore(gdt: GlideDateTime): boolean;

    /**
     * Sets the day of the month to a specified value.
     * @param {number} day Day of the month, from 1 to 31.
     * @deprecated Use {@link GlideDateTime#setDayOfMonthLocalTime|setDayOfMonthLocalTime()} and {@link GlideDateTime#setDayOfMonthUTC|setDayOfMonthUTC()} instead of this method.
     */
    setDayOfMonth(day: number): void;

    /**
     * Sets the day of the month to a specified value.
     * @param {number} day The day of month to change to, from 1 to 31. If this value is greater than the maximum number of days in the month, the value is set to the last
     * day of the month.
     */
    setDayOfMonthLocalTime(day: number): void;

    /**
     * Sets the day of the month to a specified value in the UTC time zone.
     * @param {number} day The day of month to change to, from 1 to 31. If this value is greater than the maximum number of days in the month, the value is set to the last
     * day of the month.
     */
    setDayOfMonthUTC(day: number): void;

    /**
     * Sets a date and time value using the current user's display format and time zone.
     * @param {string} asDisplayed The date and time in the current user's display format and time zone.
     * @param {string} [format] The date and time format to use to parse the value parameter.
     * @description If the 'format' parameter is used, this method throws a runtime exception if the date and time format used in the value parameter does not match the
     * format parameter. You can retrieve the error message by calling {@link GlideDateTime#getErrorMsg|getErrorMsg()} on the {@link GlideDateTime} object after the
     * exception is caught.
     * If the 'format' parameter is not used, then the 'asDisplayed' parameter must be formatted using the current user's preferred display format, such as
     * MM-dd-yyyy HH:mm:ss. To assign the current date and time to a variable in a workflow script, use
     * variable.setDisplayValue({@link GlideSystem#nowDateTime|gs.nowDateTime});.
     */
    setDisplayValue(asDisplayed: string, format?: string): void;

    /**
     * Sets a date and time value using the internal format (yyyy-MM-dd HH:mm:ss) and the current user's time zone.
     * @param {string} asDisplayed The date and time in internal format.
     */
    setDisplayValueInternal(asDisplayed: string): void;

    /**
     * Sets a date and time value using the internal format (yyyy-MM-dd HH:mm:ss) and the current user's time zone.
     * @param {string} dateTime The date and time in internal format.
     * @description This method attempts to parse incomplete date and time values.
     */
    setDisplayValueInternalWithAlternates(dateTime: string): void;

    /**
     * Sets the date and time of the current object using an existing {@link GlideDateTime} object.
     * @param {GlideDateTime} gdt The object to use for setting the datetime value.
     * @description This method is equivalent to instantiating a new object with a {@link GlideDateTime} parameter.
     */
    setGlideDateTime(gdt: GlideDateTime): void;

    /**
     * Sets the date and time.
     * @param {string|GlideDateTime} dateTime The date and time to use.
     * @description This method is equivalent to {@link GlideDateTime#setValue|setValue(Object)}.
     */
    setInitialValue(dateTime: string): void;

    /**
     * Sets the month stored by the {@link GlideDateTime} object to a specified value using the Java Virtual Machine time zone.
     * @param {number} month The month to change to.
     * @deprecated Use {@link GlideDateTime#setMonthLocalTime|setMonthLocalTime()} and {@link GlideDateTime#setMonthUTC|setMonthUTC()} instead of this method.
     */
    setMonth(month: number): void;

    /**
     * Sets the month stored by the {@link GlideDateTime} object to the specified value using the current user's time zone.
     * @param {number} month The month to change to.
     */
    setMonthLocalTime(month: number): void;

    /**
     * Sets the month stored by the {@link GlideDateTime} object to the specified value using the UTC time zone.
     * @param {number} month The month to change to.
     */
    setMonthUTC(month: number): void;

    /**
     * Sets the date and time to the number of milliseconds since January 1, 1970 00:00:00 GMT.
     * @param {number} milliseconds Number of milliseconds.
     */
    setNumericValue(milliseconds: number): void;

    /**
     * Sets the time zone of the GlideDateTime object to be the specified time zone.
     * @param {TimeZone} timeZone A time zone object.
     */
    setTZ(timeZone: TimeZone): void;

    /**
     * Sets the date and time of the {@link GlideDateTime} object.
     * @param {string | GlideElement} o The date and time to use.
     * This parameter may be one of several types: 
     * A string in the UTC time zone and the internal format of yyyy-MM-dd HH:mm:ss: Sets the value of the object to the specified date and time.
     * Using the method this way is equivalent to instantiating a new {@link GlideDateTime} object using the {@link GlideDateTime|GlideDateTime(String value)} constructor.
     * If the date and time format used does not match the internal format, the method attempts to set the date and time using other available formats.
     * Resolving the date and time this way can lead to inaccurate data due to ambiguity in the day and month values. When using a non-standard date and time format,
     * use {@link GlideDateTime#setValueUTC|setValueUTC(String dt, String format)} instead.
     * -- or --
     * A {@link GlideDateTime} object. Sets the value of the object to the date and time stored by the {@link GlideDateTime} passed in the parameter.
     * Using the method this way is equivalent to instantiating a new {@link GlideDateTime} object using the {@link GlideDateTime|GlideDateTime(GlideDateTime g)} constructor.
     * -- or --
     * A JavaScript Number. Sets the value of the object using the Number value as milliseconds past January 1, 1970 00:00:00 GMT.
     */
    setValue(o: string | GlideElement): void;

    /**
     * Sets a date and time value using the UTC time zone and the specified date and time format.
     * @param {string} dt The date and time to use.
     * @param {string} format The date and time format to use.
     * @description This method throws a runtime exception if the date and time format used in the dt parameter does not match the format parameter.
     * You can retrieve the error message by calling {@link GlideDateTime#getErrorMsg|getErrorMsg()} on the {@link GlideDateTime} object after the exception is caught.
     */
    setValueUTC(dt: string, format: string): void;

    /**
     * Sets the year stored by the {@link GlideDateTime} object to a specified value using the Java Virtual Machine time zone.
     * @param {number} year The year to change to.
     * @deprecated Use {@link GlideDateTime#setYearLocalTime|setYearLocalTime()} and {@link GlideDateTime#setYearUTC|setYearUTC()} instead of this method.
     */
    setYear(year: number): void;

    /**
     * Sets the year stored by the {@link GlideDateTime} object to the specified value using the current user's time zone.
     * @param {number} year The year to change to.
     */
    setYearLocalTime(year: number): void;

    /**
     * Sets the year stored by the {@link GlideDateTime} object to the specified value using the UTC time zone.
     * @param {number} year The year to change to.
     */
    setYearUTC(year: number): void;

    /**
     * Gets the duration difference between two {@link GlideDateTime} values.
     * @param {GlideDateTime} start The start value.
     * @param {GlideDateTime} end The end value.
     * @returns {GlideDuration} The {@link GlideDuration|duration} between the two values
     */
    static subtract(start: GlideDateTime, end: GlideDateTime): GlideDuration;

    /**
     * Subtracts a specified amount of time from the current {@link GlideDateTime} object.
     * @param {GlideTime|number} value The {@link GlideTime|time} value or milliseconds to subtract.
     */
    subtract(value: GlideTime | number): void;

    /**
     * Gets the date and time value stored by the {@link GlideDateTime} object in the internal format, yyyy-MM-dd HH:mm:ss, and the system time zone, UTC by default.
     * @returns {string} The date and time stored by the {@link GlideDateTime} object in the system time zone and format.
     * @description This method is equivalent to {@link GlideDateTime#getValue|getValue()}.
     */
    toString(): string;
}

/**
 * Represents a time zone offset, and also figures out daylight savings.
 * @class TimeZone
 */
declare class TimeZone {
    /**
     * Creates a copy of this TimeZone.
     * @returns {TimeZone}
     * @memberof TimeZone
     */
    clone(): TimeZone;

    /**
     * Returns the amount of time to be added to local standard time to get local wall clock time.
     * @returns {number}
     * @memberof TimeZone
     */
    getDSTSavings(): number;

    /**
     * Returns a long standard time name of this TimeZone suitable for presentation to the user in the default locale.
     * @returns {string}
     * @memberof TimeZone
     */
    getDisplayName(): string;

    /**
     * Returns a name in the specified style of this TimeZone suitable for presentation to the user in the default locale. If the specified daylight is true, a Daylight Saving Time name is returned (even if this TimeZone doesn't observe Daylight Saving Time). Otherwise, a Standard Time name is returned.
     * @param {boolean} daylight
     * @param {number} style
     * @memberof TimeZone
     */
    getDisplayName(daylight: boolean, style: number);

    /**
     * Gets the ID of this time zone.
     * @returns {string}
     * @memberof TimeZone
     */
    getID(): string;

    /**
     * Returns the offset of this time zone from UTC at the specified date. If Daylight Saving Time is in effect at the specified date, the offset value is adjusted with the amount of daylight saving.
     * @param {number} date
     * @returns {number}
     * @memberof TimeZone
     */
    getOffset(date: number): number;

    /**
     * Gets the time zone offset, for current date, modified in case of daylight savings. This is the offset to add to UTC to get local time.
     * @param {number} era
     * @param {number} year
     * @param {number} month
     * @param {number} day
     * @param {number} dayOfWeek
     * @param {number} milliseconds
     * @returns {number}
     * @memberof TimeZone
     */
    getOffset(era: number, year: number, month: number, day: number, dayOfWeek: number, milliseconds: number): number;

    /**
     * Gets the raw GMT offset and the amount of daylight saving of this time zone at the given time.
     * @param {number} date
     * @param {number[]} offsets
     * @returns {number}
     * @memberof TimeZone
     */
    getOffsets(date: number, offsets: number[]): number;

    /**
     * Returns true if this zone has the same rule and offset as another zone. That is, if this zone differs only in ID, if at all. Returns false if the other zone is null.
     * @param {TimeZone} other
     * @memberof TimeZone
     */
    hasSameRules(other: TimeZone);

    /**
     * Returns true if this TimeZone is currently in Daylight Saving Time, or if a transition from Standard Time to Daylight Saving Time occurs at any future time.
     * @returns {boolean}
     * @memberof TimeZone
     */
    observesDaylightTime(): boolean;

    /**
     * Sets the time zone ID. This does not change any other data in the time zone object.
     * @param {string} id
     * @memberof TimeZone
     */
    setID(id: string);

    /**
     * Queries if this TimeZone uses Daylight Saving Time.
     * @returns {boolean}
     * @memberof TimeZone
     */
    useDaylightTime(): boolean;
}

//declare function j2js(javaObject: Boolean): boolean;
//declare function j2js(javaObject: String): string;
//declare function j2js(javaObject: Packages.java.lang.Integer): number
//declare function j2js(javaObject: Packages.java.lang.Long): number
//declare function j2js(javaObject: Packages.java.lang.Double): number
//declare function j2js(javaObject: Packages.java.lang.Byte): number
//declare function j2js(javaObject: Packages.java.lang.Float): number
//declare function j2js(javaObject: Packages.java.lang.Short): number
//declare function j2js(javaObject: Packages.java.lang.Character): number
//declare function j2js(javaObject: Packages.java.lang.util.List): any[];
//declare function j2js(javaObject: Packages.java.lang.util.Map): { [key: string]: any; };
//declare function j2js(javaObject: Packages.java.lang.util.Set): any[];
//declare function j2js(javaObject: Object): any;

/**
 * GlideSession API.
 * @class GlideSession
 */
declare abstract class GlideSession {
    getClientData(paramName: string): string;
    getClientIP(): string;
    getCurrentApplicationId(): string;
    getLanguage(): string;
    getSessionToken(): string;
    getTimeZoneName(): string;
    getUrlOnStack(): string;
    isImpersonating(): boolean;
    isInteractive(): boolean;
    isLoggedIn(): boolean;
    putClientData(paramName: string, paramValue: string): void;
}

/**
 * GlideSystem API.
 * @class GlideSystem
 */
declare abstract class GlideSystem {
    /**
     * Directly calling the constructor is not supported.
     * @memberof GlideSystem
     * @protected
     */
    constructor();
    isInteractive(): boolean;
    isLoggedIn(): boolean;

    /**
     * Adds an error message for the current session.
     * @param {*} message The message to add.
     */
    addErrorMessage(message: any): void;

    /**
     * Adds an info message for the current session. This method is not supported for asynchronous business rules.
     * @param {*} message An info message object.
     */
    addInfoMessage(message: any): void;

    /**
     * Returns the date and time for the beginning of last month in GMT.
     * @returns {string} GMT beginning of last month, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfLastMonth(): string;

    /**
     * Returns the date and time for the beginning of next month in GMT.
     * @returns {string} GMT beginning of next month, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfNextMonth(): string;

    /**
     * Returns the date and time for the beginning of next week in GMT.
     * @returns {string} The GMT beginning of next week, in the format yyyy-mm-dd hh:mm:ss.
     */
    beginningOfNextWeek(): string;

    /**
     * Returns the date and time for the beginning of next year in GMT.
     * @returns {string} GMT beginning of next year, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfNextYear(): string;

    /**
     * Returns the date and time for the beginning of this month in GMT.
     * @returns {string} GMT beginning of this month, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisMonth(): string;

    /**
     * Returns the date and time for the beginning of this quarter in GMT.
     * @returns {string} GMT beginning of this quarter, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisQuarter(): string;

    /**
     * Returns the date and time for the beginning of this week in GMT.
     * @returns {string} GMT beginning of this week, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisWeek(): string;

    /**
     * Returns the date and time for the beginning of this year in GMT.
     * @returns {string} GMT beginning of this year, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisYear(): string;

    /**
     * Returns the date and time for the beginning of last week in GMT.
     * @returns {string} GMT beginning of this year, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfLastWeek(): string;

    /**
     * Generates a date and time for the specified date in GMT.
     * @param {string} date Format: yyyy-mm-dd
     * @param {string} range Start, end, or a time in the 24 hour format hh:mm:ss.
     * @returns {string} A date and time in the format yyyy-mm-dd hh:mm:ss. If range is start, the returned value is yyyy-mm-dd 00:00:00; If range is end the return value is yyyy-mm-dd 23:59:59.
     */
    dateGenerate(date: string, range: string): string;

    /**
     * Returns the date and time for a specified number of days ago.
     * @param {number} days Integer number of days
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    daysAgo(days: number): string;

    /**
     * Returns the date and time for the end of the day a specified number of days ago.
     * @param {number} days Integer number of days
     * @returns {string} GMT end of the day in the format yyyy-mm-dd hh:mm:ss
     */
    daysAgoEnd(days: number): string;

    /**
     * Returns the date and time for the beginning of the day a specified number of days ago.
     * @param {number} days Integer number of days
     * @returns {string} GMT end of the day in the format yyyy-mm-dd hh:mm:ss
     */
    daysAgoStart(days: number): string;

    /**
     * Adds an info message for the current session. This method is not supported for asynchronous business rules.
     * @param {string} message The log message with place holders for any variable arguments.
     * @param {*} [parm1] First variable argument.
     * @param {*} [parm2] Second variable argument.
     * @param {*} [parm3] Third variable argument.
     * @param {*} [parm4] Fourth variable argument.
     * @param {*} [parm5] Fifth variable argument.
     */
    debug(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;

    /**
     * Returns the date and time for the end of last month in GMT.
     * @returns {string} GMT end of last month, in the format yyyy-mm-dd hh:mm:ss
     */
    endOfLastMonth(): string;

    /**
     * Returns the date and time for the end of last week in GMT.
     * @returns {string} GMT end of last week, in the format yyyy-mm-dd hh:mm:ss
     */
    endOfLastWeek(): string;

    /**
     * Returns the date and time for the end of last year in GMT.
     * @returns {string} GMT in format yyyy-mm-dd hh:mm:ss
     */
    endOfLastYear(): string;

    /**
     * Returns the date and time for the end of next month in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfNextMonth(): string;

    /**
     * Returns the date and time for the end of next week in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfNextWeek(): string;

    /**
     * Returns the date and time for the end of next year in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfNextYear(): string;

    /**
     * Returns the date and time for the end of this month in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisMonth(): string;

    /**
     * Returns the date and time for the end of this quarter in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisQuarter(): string;

    /**
     * Returns the date and time for the end of this week in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisWeek(): string;

    /**
     * Returns the date and time for the end of this year in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisYear(): string;

    /**
     * Writes an error message to the system log.
     * @param {string} message The log message with place holders for any variable arguments.
     * @param {*} [parm1] First variable argument.
     * @param {*} [parm2] Second variable argument.
     * @param {*} [parm3] Third variable argument.
     * @param {*} [parm4] Fourth variable argument.
     * @param {*} [parm5] Fifth variable argument.
     */
    error(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;

    /**
     * Writes a warning message to the system log.
     * @param {string} message The log message with place holders for any variable arguments.
     * @param {*} [parm1] First variable argument.
     * @param {*} [parm2] Second variable argument.
     * @param {*} [parm3] Third variable argument.
     * @param {*} [parm4] Fourth variable argument.
     * @param {*} [parm5] Fifth variable argument.
     */
    warn(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;

    /**
     * Writes an info message to the system log.
     * @param {string} message The log message with place holders for any variable arguments.
     * @param {*} [parm1] First variable argument.
     * @param {*} [parm2] Second variable argument.
     * @param {*} [parm3] Third variable argument.
     * @param {*} [parm4] Fourth variable argument.
     * @param {*} [parm5] Fifth variable argument.
     */
    info(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;

    /**
     * Creates a base64 string from the specified string.
     * @param {string} source The string to be encoded.
     * @returns {string} The base64 string.
     */
    base64Encode(source: string): string;

    /**
     * Returns an ASCII string from the specified base64 string..
     * @param {string} source A base64 encoded string.
     * @returns {string} The decoded string.
     */
    base64Decode(source: string): string;

    /**
     * Queues an event for the event manager.
     * @param {string} name Name of the event being queued.
     * @param {GlideRecord} instance A GlideRecord object, such as "current".
     * @param {string|null|undefined} parm1 Saved with the instance if specified.
     * @param {string|null|undefined} parm2 Saved with the instance if specified.
     * @param {string} parm3 The name of the queue
     */
    eventQueue(name: string, instance: GlideRecord, parm1: string | null | undefined, parm2: string | null | undefined, parm3: string): void;

    /**
     * Queues an event for the event manager.
     * @param {string} name Name of the event being queued.
     * @param {GlideRecord} instance A GlideRecord object, such as "current".
     * @param {string|null|undefined} parm1 Saved with the instance if specified.
     * @param {string} parm3 The name of the queue
     */
    eventQueue(name: string, instance: GlideRecord, parm1: string | null | undefined, parm3: string): void;

    /**
     * Queues an event for the event manager.
     * @param {string} name - Name of the event being queued.
     * @param {GlideRecord} instance - A GlideRecord object, such as "current".
     * @param {string} parm3 - The name of the queue
     */
    eventQueue(name: string, instance: GlideRecord, parm3: string): void;

    /**
     * Alerts the user if event was not scheduled. Does nothing if the event is scheduled.
     * @param {string} name - Name of the event being queued.
     * @param {GlideRecord} instance - A GlideRecord object, such as "current".
     * @param {string} [parm1] - Saved with the instance if specified.
     * @param {string} [parm2] - Saved with the instance if specified.
     * @param {object} [expiration] - When the event expires.
     */
    eventQueueScheduled(name: string, instance: GlideRecord, parm1?: string, parm2?: string, expiration?: Object): void;

    /**
     * Executes a job for a scoped application.
     * @param job The job to be run.
     * @description You can only use this method on a job in the same application as the script calling this method.
     * @returns {string} Returns the sysID of the scheduled job. Returns null if the job is global.
     */
    executeNow(job: GlideRecord): string;

    /**
     * Generates a GUID that can be used when a unique identifier is required.
     * @returns {string} A 32-character hexadecimal GUID.
     */
    generateGUID(): string;

    /**
     * Gets the caller scope name; returns null if there is no caller.
     * @returns {string|null} The caller's scope name, or null if there is no caller.
     */
    getCallerScopeName(): string | null;

    /**
     * Gets a string representing the cache version for a CSS file.
     * @returns {string} The CSS cache version.
     */
    getCssCacheVersionString(): string;

    /**
     * Generates a GUID that can be used when a unique identifier is required.
     * @returns {string} A 32-character hexadecimal GUID.
     */
    generateGUID(): string;

    /**
     * Gets the caller scope name; returns null if there is no caller.
     * @returns {string|null} The caller's scope name, or null if there is no caller.
     */
    getCallerScopeName(): string | null;

    /**
     * Gets a string representing the cache version for a CSS file.
     * @returns {string} The CSS cache version.
     */
    getCssCacheVersionString(): string;

    /**
     * Returns the list of error messages for the session that were added by addErrorMessage().
     * @returns {string[]} List of error messages.
     */
    getErrorMessages(): string[];

    /**
     * Retrieves a message from UI messages with HTML special characters replaced with escape sequences, for example, & becomes &amp;.
     * @param id The ID of the message.
     * @param {*[]} [args] A list of strings or other values defined by java.text.MessageFormat, which allows you to produce language-neutral messages for display to users.
     * @returns {string} The UI message with HTML special characters replaced with escape sequences.
     */
    getEscapedMessage(id: string, args?: any[]): string;

    /**
     * Retrieves a message from UI messages.
     * @param id The ID of the message.
     * @param {*[]} [args] A list of strings or other values defined by java.text.MessageFormat, which allows you to produce language-neutral messages for display to users.
     * @returns {string} The UI message.
     */
    getMessage(id: string, args?: any[]): string;

    getProperty(key: string): string;

    /**
     * Gets the value of a Glide property. If the property is not found, returns an alternate value.
     * @param {string} id The key for the property whose value should be returned.
     * @param {string} alt Alternate object to return if the property is not found.
     * @returns {string | T} The value of the Glide property, or the alternate object defined above.
     */
    getProperty<T>(key: string, alt: T): string | T;

    /**
     * Gets a reference to the current Glide session.
     * @returns {GlideSession} A reference for the current session.
     */
    getSession(): GlideSession;

    /**
     * Retrieves the GlideSession session ID.
     * @returns {string} The session ID.
     */
    getSessionID(): string;

    getSessionToken(): string;

    /**
     * Returns the name of the time zone associated with the current user.
     * @returns {string} The time zone name.
     */
    getTimeZoneName(): string;

    /**
     * Gets the current URI for the session.
     * @returns {string} The URI.
     */
    getUrlOnStack(): string;

    /**
     * Returns a reference to the scoped GlideUser object for the current user.
     * @returns {GlideUser} Reference to a scoped user object.
     */
    getUser(): GlideUser;

    /**
     * Gets the display name of the current user.
     * @returns {string} The name field of the current user. Returns Abel Tuter, as opposed to abel.tuter.
     */
    getUserDisplayName(): string;

    /**
     * Gets the sys_id of the current user.
     * @returns {string} The sys_id of the current user.
     */
    getUserID(): string;


    /**
     * Gets the user name, or user id, of the current user.
     * @returns {string} The user name of the current user.
     */
    getUserName(): string;

    /**
     * Determines if the current user has the specified role.
     * @param {string} role The role to check.
     * @returns {boolean} True if the user had the role. Returns true for users with the administrator role.
     */
    hasRole(role: string): boolean;

    /**
     * Returns the date and time for a specified number of hours ago.
     * @param {number} hours Integer number of hours
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    hoursAgo(hours: number): string;

    /**
     * Returns the date and time for the end of the hour a specified number of hours ago.
     * @param {number} hours Integer number of hours
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    hoursAgoEnd(hours: number): string;

    /**
     * Returns the date and time for the start of the hour a specified number of hours ago.
     * @param {number} hours Integer number of hours
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    hoursAgoStart(hours: number): string;

    /**
     * Provides a safe way to call from the sandbox, allowing only trusted scripts to be included.
     * @param {string} name The name fo the script to include.
     * @returns {boolean} True if the include worked.
     */
    include(name: string): boolean;

    /**
     * Determines if debugging is active for a specific scope.
     * @returns {boolean} True if either session debugging is active or the log level is set to debug for the specified scope.
     */
    isDebugging(): boolean;

    /**
     * Checks if the current session is interactive. An example of an interactive session is when a user logs in normally. An example of a non-interactive session is using a SOAP request to retrieve data.
     * @returns {boolean} True if the session is interactive.
     */
    isInteractive(): boolean;


    /**
     * Determines if the current user is currently logged in.
     * @returns {boolean} True if the current user is logged in.
     */
    isLoggedIn(): boolean;

    /**
     * You can determine if a request comes from a mobile device.
     * @returns {boolean} True if the request comes from a mobile device; otherwise, false.
     */
    isMobile(): boolean;

    /**
     * Returns the date and time for the end of the minute a specified number of minutes ago.
     * @param {number} minutes Integer number of minutes.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    minutesAgoEnd(minutes: number): string;

    /**
     * Returns the date and time for the start of the minute a specified number of minutes ago.
     * @param {number} minutes Integer number of minutes.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    minutesAgoStart(minutes: number): string;

    /**
     * Returns the date and time for a specified number of months ago.
     * @param {number} months Integer number of months.
     * @returns {string} GMT on today's date of the specified month, in the format yyyy-mm-dd hh:mm:ss.
     */
    monthsAgo(months: number): string;

    /**
     * Returns the date and time for the end of the minute a specified number of minutes ago.
     * @param {number} minutes Integer number of minutes.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    minutesAgoEnd(minutes: number): string;

    /**
     * Returns the date and time for the start of the minute a specified number of minutes ago.
     * @param {number} minutes Integer number of minutes.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    minutesAgoStart(minutes: number): string;

    /**
     * Returns the date and time for the start of the month a specified number of months ago.
     * @param {number} months Integer number of months.
     * @returns {string} GMT start of the month the specified number of months ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    monthsAgoStart(months: number): string;

    /**
     * Queries an object and returns true if the object is null, undefined, or contains an empty string.
     * @param {*} o The object to be checked.
     * @returns {boolean} True if the object is null, undefined, or contains an empty string; otherwise, returns false.
     */
    nil(o: any | null | undefined): o is "" | null | undefined;

    /**
     * Returns the date and time for the last day of the quarter for a specified number of quarters ago.
     * @param {number} quarters Integer number of quarters.
     * @returns {string} GMT end of the quarter that was the specified number of quarters ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    quartersAgoEnd(quarters: number): string;

    /**
     * Returns the date and time for the first day of the quarter for a specified number of quarters ago.
     * @param {number} quarters Integer number of quarters.
     * @returns {string} GMT end of the month that was the specified number of quarters ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    quartersAgoStart(quarters: number): string;

    /**
     * Sets the specified key to the specified value if the property is within the script's scope.
     * @param {string} id The key for the property to be set.
     * @param {string} value The value of the property to be set.
     * @param {string} [description] A description of the property.
     */
    setProperty(key: string, value: string, description?: string): void;

    /**
     * Sets the redirect URI for this transaction, which then determines the next page the user will see.
     * @param {string|GlideURI} o URI object or URI string to set as the redirect.
     */
    setRedirect(o: string | GlideURI): void;

    /**
     * Determines if a database table exists.
     * @param {string} name Name of the table to check for existence.
     * @returns {boolean} True if the table exists. False if the table was not found.
     */
    tableExists(name: string): boolean;

    /**
     * Encodes non-ASCII characters, unsafe ASCII characters, and spaces so the returned string can be used on the Internet. Uses UTF-8 encoding. Uses percent (%) encoding.
     * @param {string} url The string to be encoded.
     * @returns {string} A string with non-ASCII characters, unsafe ASCII characters, and spaces encoded.
     */
    urlEncode(url: string): string;

    /**
     * Replaces UTF-8 encoded characters with ASCII characters.
     * @param {string} url A string with UTF-8 percent (%) encoded characters.
     * @returns {string} A string with encoded characters replaced with ASCII characters.
     */
    urlDecode(url: string): string;

    /**
     * Takes an XML string and returns a JSON object.
     * @param {string} xmlString The XML string to be converted.
     * @returns {object|null} A JSON object representing the XML string. Null if unable to process the XML string.
     */
    xmlToJSON(xmlString: string): { [key: string]: any } | null;

    /**
     * Returns a date and time for a certain number of years ago.
     * @param {number} years Integer number of years.
     * @returns {string} GMT beginning of the year that is the specified number of years ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    yearsAgo(years: number): string;

    /**
     * Returns yesterday's time (24 hours ago).
     * @returns {string} GMT for 24 hours ago, in the format yyyy-mm-dd hh:mm:ss
     */
    yesterday(): string;
}

/**
 * Global GlideSystem instance.
 */
declare let gs: GlideSystem;