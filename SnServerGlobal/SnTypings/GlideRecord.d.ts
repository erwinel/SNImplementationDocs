/// <reference path="JavaTypes.d.ts" />
/// <reference path="GlideSystem.d.ts" />

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

declare type BooleanString = "true" | "false";
type TaskAppproval = "not requested" | "requested" | "approved" | "rejected";
declare type TaskAppprovalGlideElement = IStringChoiceGlideElement<TaskAppproval> & GlideElement;
type TaskContactType = "email" | "phone" | "self-service" | "walk-in";
declare type TaskContactTypeGlideElement = IStringChoiceGlideElement<TaskContactType> & GlideElement;
type Task3ScaleString = "0" | "1" | "2" | "3";
type Task3ScaleValue = 0 | 1 | 2 | 3;
type Task3Scale = Task3ScaleString | Task3ScaleValue;
declare type Task3ScaleGlideElement = IGlideValueElement<Task3Scale, Task3ScaleString> & GlideElement;
type TaskPriorityString = "1" | "2" | "3" | "4" | "5";
type TaskPriorityValue = 1 | 2 | 3 | 4 | 5;
type TaskPriority = TaskPriorityString | TaskPriorityValue;
declare type TaskPriorityGlideElement = IGlideValueElement<TaskPriority, TaskPriorityString> & GlideElement;
type TaskStateString = "-5" | "1" | "2" | "3" | "4" | "7";
type TaskStateValue = -5 | 1 | 2 | 3 | 4 | 7;
type TaskState = TaskStateString | TaskStateValue;
declare type TaskStateGlideElement = IGlideValueElement<TaskState, TaskStateString> & GlideElement;

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
/**
 * GlideElement values from the Model Category table.
 * @interface IGlideElementColumns
 */
declare interface IGlideElementColumns {
	/**
     * Created by
     * @type {StringGlideElement}
     * @memberof IGlideElementColumns
     * @description Max length: 40
     */
    sys_created_by: StringGlideElement;

    /**
     * Created
     * @type {StringGlideElement}
     * @memberof IGlideElementColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    sys_created_on: StringGlideElement;

    /**
     * Sys ID
     * @type {StringGlideElement}
     * @memberof IGlideElementColumns
     * @description Internal type is "GUID"
     *      Max length: 32
     */
    sys_id: StringGlideElement;

    /**
     * Updates
     * @type {GlideElementNumeric}
     * @memberof IGlideElementColumns
     */
    sys_mod_count: GlideElementNumeric;

    /**
     * Updated by
     * @type {StringGlideElement}
     * @memberof IGlideElementColumns
     * @description Max length: 40
     */
    sys_updated_by: StringGlideElement;

    /**
     * Updated
     * @type {StringGlideElement}
     * @memberof IGlideElementColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    sys_updated_on: StringGlideElement;
}

declare interface IGlideRecord extends IGlideElementColumns {
    /**
     * Adds a filter to return active records.
     * @memberof IGlideRecord
     * @returns {GlideQueryCondition} Filter to return active records.
     */
    addActiveQuery(): GlideQueryCondition;

    /**
     * Adds an encoded query to other queries that may have been set.
     * @memberof IGlideRecord
     * @param {string} query An encoded query string.
     */
    addEncodedQuery(query: string): void;

    /**
     * Adds a filter to return records based on a relationship in a related table.
     * @memberof IGlideRecord
     * @param {string} joinTable Table name
     * @param {*} [primaryField] If other than sys_id, the primary field
     * @param {*} [joinTableField] If other than sys_id, the field that joins the tables
     * @returns {GlideQueryCondition} A filter that lists records where the relationships match.
     */
    addJoinQuery(joinTable: string, primaryField?: any, joinTableField?: any): GlideQueryCondition;

    /**
     * A filter that specifies records where the value of the field passed in the parameter is not null.
     * @memberof IGlideRecord
     * @param {string} fieldName The name of the field to be checked.
     * @returns {GlideQueryCondition} A filter that specifies records where the value of the field passed in the parameter is not null.
     */
    addNotNullQuery(fieldName: string): GlideQueryCondition;
    /**
     * Adds a filter to return records where the value of the specified field is null.
     * @memberof IGlideRecord
     * @param {string} fieldName The name of the field to be checked.
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addNullQuery(fieldName: string): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @memberof IGlideRecord
     * @param {string} query An encoded query string.
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(query: string): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @memberof IGlideRecord
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
     * @memberof IGlideRecord
     * @returns {boolean} True if the user's roles permit creation of new records in this table.
     */
    canCreate(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit deleting records in this table.
     * @memberof IGlideRecord
     * @returns {boolean} True if the user's roles permit deletions of records in this table.
     */
    canDelete(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit reading records in this table.
     * @memberof IGlideRecord
     * @returns {boolean} True if the user's roles permit reading records from this table.
     */
    canRead(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit editing records in this table.
     * @memberof IGlideRecord
     * @returns {boolean} True if the user's roles permit writing to records from this table.
     */
    canWrite(): boolean;

    /**
     * Sets a range of rows to be returned by subsequent queries.
     * @memberof IGlideRecord
     * @param {number} firstRow The first row to include.
     * @param {number} lastRow The last row to include.
     * @param {boolean} forceCount If true, the getRowCount() method will return all possible records.
     */
    chooseWindow(firstRow: number, lastRow: number, forceCount: boolean): void;

    /**
     * Deletes multiple records that satisfy the query condition.
     * @memberof IGlideRecord
     */
    deleteMultiple(): void;

    /**
     * Deletes the current record.
     * @memberof IGlideRecord
     * @returns {boolean} True if the record was deleted; false if no record was found to delete.
     */
    deleteRecord(): boolean;
    /**
     * Defines a GlideRecord based on the specified expression of 'name = value'.
     * @memberof IGlideRecord
     * @param {string} name Column name
     * @param {*} [value] Value to match. If value is not specified, then the expression used is 'sys_id = name'.
     * @returns {boolean} True if one or more matching records was found. False if no matches found.
     */
    get(name: string, value?: any): boolean;

    /**
     * Returns the dictionary attributes for the specified field.
     * @memberof IGlideRecord
     * @param {string} fieldName Field name for which to return the dictionary attributes
     * @returns {string|null|undefined} Dictionary attributes
     */
    getAttribute(fieldName: string): string | null | undefined;

    /**
     * Returns the table's label.
     * @memberof IGlideRecord
     * @returns {string} Table's label
     */
    getClassDisplayValue(): string;

    /**
     * Retrieves the display value for the current record.
     * @memberof IGlideRecord
     * @returns {string|null|undefined} The display value for the current record.
     */
    getDisplayValue(): string | null | undefined;
    getED(): GlideElementDescriptor;

    /**
     * Retrieves the GlideElement object for the specified field.
     * @memberof IGlideRecord
     * @param {string} columnName Name of the column to get the element from.
     * @returns {GlideElement} The GlideElement for the specified column of the current record.
     */
    getElement(columnName: string): GlideElement;

    /**
     * Retrieves the query condition of the current result set as an encoded query string.
     * @memberof IGlideRecord
     * @returns {string} The encoded query as a string.
     */
    getEncodedQuery(): string;

    /**
     * Returns the field's label.
     * @memberof IGlideRecord
     * @returns {string} Field's label.
     */
    getLabel(): string;

    /**
     * Retrieves the last error message. If there is no last error message, null is returned.
     * @memberof IGlideRecord
     * @returns {string|null|undefined} The last error message as a string.
     */
    getLastErrorMessage(): string | null | undefined;

    /**
     * Retrieves a link to the current record.
     * @memberof IGlideRecord
     * @param {boolean} noStack If true, the sysparm_stack parameter is not appended to the link. The parameter sysparm_stack specifies the page to visit after closing the current link.
     * @returns {string} A link to the current record as a string.
     */
    getLink(noStack: boolean): string;
    /**
     * Retrieves the class name for the current record.
     * @memberof IGlideRecord
     * @returns {string} The class name.
     */
    getRecordClassName(): string;

    /**
     * Retrieves the number of rows in the query result.
     * @memberof IGlideRecord
     * @returns {number} The number of rows.
     */
    getRowCount(): number;

    /**
     * Retrieves the name of the table associated with the GlideRecord.
     * @memberof IGlideRecord
     * @returns {string} The table name.
     */
    getTableName(): string;
    /**
     * Gets the primary key of the record, which is usually the sys_id unless otherwise specified.
     * @memberof IGlideRecord
     * @returns {string|null|undefined} The unique primary key as a String, or null if the key is null.
     */
    getUniqueValue(): string | null | undefined;

    /**
     * Retrieves the string value of an underlying element in a field.
     * @memberof IGlideRecord
     * @param {string} name The name of the field to get the value from.
     * @returns {string|null|undefined} The value of the field.
     */
    getValue(name: string): string | null | undefined;

    /**
     * Determines if there are any more records in the GlideRecord object.
     * @memberof IGlideRecord
     * @returns {boolean} True if there are more records in the query result set.
     */
    hasNext(): boolean;
    /**
     * Inserts a new record using the field values that have been set for the current record.
     * @memberof IGlideRecord
     * @returns {string} Unique ID of the inserted record, or null if the record is not inserted.
     */
    insert(): string;

    /**
     * Creates an empty record suitable for population before an insert.
     * @memberof IGlideRecord
     */
    initialize(): void;

    /**
     * Checks to see if the current database action is to be aborted.
     * @memberof IGlideRecord
     * @returns {boolean} True if the current database action is to be aborted.
     */
    isActionAborted(): boolean;
    /**
     * Checks if the current record is a new record that has not yet been inserted into the database.
     * @memberof IGlideRecord
     * @returns {boolean} True if the record is new and has not been inserted into the database.
     */
    isNewRecord(): boolean;

    /**
     * Determines if the table exists.
     * @memberof IGlideRecord
     * @returns {boolean} True if table is valid or if record was successfully retrieved. False if table is invalid or record was not successfully retrieved.
     */
    isValid(): boolean;

    /**
     * Determines if the specified field is defined in the current table.
     * @memberof IGlideRecord
     * @param {string} columnName The name of the the field.
     * @returns {boolean} True if the field is defined for the current table.
     */
    isValidField(columnName: string): boolean;

    /**
     * Determines if current record is a valid record.
     * @memberof IGlideRecord
     * @returns {boolean} True if the current record is valid. False if past the end of the record set.
     */
    isValidRecord(): boolean;
    /**
     * Creates a new GlideRecord record, sets the default values for the fields, and assigns a unique ID to the record.
     * @memberof IGlideRecord
     */
    newRecord(): void;

    /**
     * Moves to the next record in the GlideRecord object.
     * @memberof IGlideRecord
     * @returns {boolean} True if moving to the next record is successful. False if there are no more records in the result set.
     */
    next(): boolean;

    /**
     * Moves to the next record in the GlideRecord object.
     * @memberof IGlideRecord
     * @returns {boolean} True if moving to the next record is successful. False if there are no more records in the result set.
     */
    _next(): boolean;
    /**
     * Retrieves the current operation being performed, such as insert, update, or delete.
     * @memberof IGlideRecord
     * @returns {string} The current operation.
     */
    operation(): string;

    /**
     * Specifies an orderBy column.
     * @param {string} name The column name used to order the records in this GlideRecord object.
     * @memberof IGlideRecord
     */
    orderBy(name: string): void;

    query(): void;
    _query(): void;

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.
     * @memberof IGlideRecord
     * @param {string} [name] The column name to query on.
     * @param {*} [value] The value to query for.
     */
    query(field?: string, value?: any): void;

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.
     * @memberof IGlideRecord
     * @param {string} [name] The column name to query on.
     * @param {*} [value] The value to query for.
     */
    _query(field: string, value: any): void;

    /**
     * Specifies a decending orderBy column.
     * @memberof IGlideRecord
     * @param {string} name The column name used to order the records in this GlideRecord object.
     */
    orderByDesc(name: string): void;
    /**
     * Sets a flag to indicate if the next database action (insert, update, delete) is to be aborted. This is often used in business rules.
     * @memberof IGlideRecord
     * @param b True to abort the next action. False if the action is to be allowed.
     */
    setAbortAction(b: boolean): void;

    /**
     * Sets the limit for number of records are fetched by the GlideRecord query.
     * @memberof IGlideRecord
     * @param {number} maxNumRecords The maximum number of records to fetch.
     */
    setLimit(maxNumRecords: number): void;
    /**
     * Sets sys_id value for the current record.
     * @memberof IGlideRecord
     * @param {string} guid The GUID to be assigned to the current record.
     */
    setNewGuidValue(guid: string): void;

    /**
     * Sets the value of the field with the specified name to the specified value.
     * @memberof IGlideRecord
     * @param {string} name Name of the field.
     * @param {*} value The value to assign to the field.
     */
    setValue(name: string, value: any): void;

    /**
     * Enables or disables the running of business rules, script engines, and audit.
     * @memberof IGlideRecord
     * @param {boolean} enable If true (default), enables business rules. If false, disables business rules.
     */
    setWorkflow(enable: boolean): void;

    /**
     * Updates the GlideRecord with any changes that have been made. If the record does not already exist, it is inserted.
     * @memberof IGlideRecord
     * @param {string} [reason] The reason for the update. The reason is displayed in the audit record.
     * @returns {string|null} Unique ID of the new or updated record. Returns null if the update fails.
     */
    update(reason?: string): string | null;

    /**
     * Updates each GlideRecord in the list with any changes that have been made.
     * @memberof IGlideRecord
     */
    updateMultiple(): void;
}

declare class GlideRecord implements IGlideRecord {
	/**
     * Created by
     * @type {StringGlideElement}
     * @memberof GlideRecord
     * @description Max length: 40
     */
    sys_created_by: StringGlideElement;

    /**
     * Created
     * @type {StringGlideElement}
     * @memberof GlideRecord
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    sys_created_on: StringGlideElement;

    /**
     * Sys ID
     * @type {StringGlideElement}
     * @memberof GlideRecord
     * @description Internal type is "GUID"
     *      Max length: 32
     */
    sys_id: StringGlideElement;

    /**
     * Updates
     * @type {GlideElementNumeric}
     * @memberof GlideRecord
     */
    sys_mod_count: GlideElementNumeric;

    /**
     * Updated by
     * @type {StringGlideElement}
     * @memberof GlideRecord
     * @description Max length: 40
     */
    sys_updated_by: StringGlideElement;

    /**
     * Updated
     * @type {StringGlideElement}
     * @memberof GlideRecord
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    sys_updated_on: StringGlideElement;

    [key: string]: any;
    getFields(): Packages.java.lang.util.ArrayList;

    constructor(tableName: string);

    /**
     * Adds a filter to return active records.
     * @memberof GlideRecord
     * @returns {GlideQueryCondition} Filter to return active records.
     */
    addActiveQuery(): GlideQueryCondition;

    /**
     * Adds an encoded query to other queries that may have been set.
     * @memberof GlideRecord
     * @param {string} query An encoded query string.
     */
    addEncodedQuery(query: string): void;

    /**
     * Adds a filter to return records based on a relationship in a related table.
     * @memberof GlideRecord
     * @param {string} joinTable Table name
     * @param {*} [primaryField] If other than sys_id, the primary field
     * @param {*} [joinTableField] If other than sys_id, the field that joins the tables
     * @returns {GlideQueryCondition} A filter that lists records where the relationships match.
     */
    addJoinQuery(joinTable: string, primaryField?: any, joinTableField?: any): GlideQueryCondition;

    /**
     * A filter that specifies records where the value of the field passed in the parameter is not null.
     * @memberof GlideRecord
     * @param {string} fieldName The name of the field to be checked.
     * @returns {GlideQueryCondition} A filter that specifies records where the value of the field passed in the parameter is not null.
     */
    addNotNullQuery(fieldName: string): GlideQueryCondition;
    /**
     * Adds a filter to return records where the value of the specified field is null.
     * @memberof GlideRecord
     * @param {string} fieldName The name of the field to be checked.
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addNullQuery(fieldName: string): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @memberof GlideRecord
     * @param {string} query An encoded query string.
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(query: string): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @memberof GlideRecord
     * @param {string} name Table field name.
     * @param {*} value Value on which to query (not case-sensitive).
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(name: string, value: any): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @memberof GlideRecord
     * @param {string} name Table field name.
     * @param {string} operator Query operator (=,!=,>,>=,<,<=,IN,NOT IN,STARTSWITH,ENDSWITH,CONTAINS,DOES NOT CONTAIN,INSTANCEOF).
     * @param {*} value Value on which to query (not case-sensitive).
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(name: string, operator: QueryOperator, value: any): GlideQueryCondition;
    /**
     * Determines if the Access Control Rules, which include the user's roles, permit inserting new records in this table.
     * @memberof GlideRecord
     * @returns {boolean} True if the user's roles permit creation of new records in this table.
     */
    canCreate(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit deleting records in this table.
     * @memberof GlideRecord
     * @returns {boolean} True if the user's roles permit deletions of records in this table.
     */
    canDelete(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit reading records in this table.
     * @memberof GlideRecord
     * @returns {boolean} True if the user's roles permit reading records from this table.
     */
    canRead(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit editing records in this table.
     * @memberof GlideRecord
     * @returns {boolean} True if the user's roles permit writing to records from this table.
     */
    canWrite(): boolean;

    /**
     * Sets a range of rows to be returned by subsequent queries.
     * @memberof GlideRecord
     * @param {number} firstRow The first row to include.
     * @param {number} lastRow The last row to include.
     * @param {boolean} forceCount If true, the getRowCount() method will return all possible records.
     */
    chooseWindow(firstRow: number, lastRow: number, forceCount: boolean): void;

    /**
     * Deletes multiple records that satisfy the query condition.
     * @memberof GlideRecord
     */
    deleteMultiple(): void;

    /**
     * Deletes the current record.
     * @returns {boolean} True if the record was deleted; false if no record was found to delete.
     * @memberof GlideRecord
     */
    deleteRecord(): boolean;
    /**
     * Defines a GlideRecord based on the specified expression of 'name = value'.
     * @memberof GlideRecord
     * @param {string} name Column name
     * @param {*} [value] Value to match. If value is not specified, then the expression used is 'sys_id = name'.
     * @returns {boolean} True if one or more matching records was found. False if no matches found.
     */
    get(name: string, value?: any): boolean;

    /**
     * Returns the dictionary attributes for the specified field.
     * @memberof GlideRecord
     * @param {string} fieldName Field name for which to return the dictionary attributes
     * @returns {string|null|undefined} Dictionary attributes
     */
    getAttribute(fieldName: string): string | null | undefined;

    /**
     * Returns the table's label.
     * @memberof GlideRecord
     * @returns {string} Table's label
     */
    getClassDisplayValue(): string;

    /**
     * Retrieves the display value for the current record.
     * @memberof GlideRecord
     * @returns {string|null|undefined} The display value for the current record.
     */
    getDisplayValue(): string | null | undefined;
    getED(): GlideElementDescriptor;

    /**
     * Retrieves the GlideElement object for the specified field.
     * @memberof GlideRecord
     * @param {string} columnName Name of the column to get the element from.
     * @returns {GlideElement} The GlideElement for the specified column of the current record.
     */
    getElement(columnName: string): GlideElement;

    /**
     * Retrieves the query condition of the current result set as an encoded query string.
     * @memberof GlideRecord
     * @returns {string} The encoded query as a string.
     */
    getEncodedQuery(): string;

    /**
     * Returns the field's label.
     * @memberof GlideRecord
     * @returns {string} Field's label.
     */
    getLabel(): string;

    /**
     * Retrieves the last error message. If there is no last error message, null is returned.
     * @memberof GlideRecord
     * @returns {string|null|undefined} The last error message as a string.
     */
    getLastErrorMessage(): string | null | undefined;

    /**
     * Retrieves a link to the current record.
     * @memberof GlideRecord
     * @param {boolean} noStack If true, the sysparm_stack parameter is not appended to the link. The parameter sysparm_stack specifies the page to visit after closing the current link.
     * @returns {string} A link to the current record as a string.
     */
    getLink(noStack: boolean): string;
    /**
     * Retrieves the class name for the current record.
     * @memberof GlideRecord
     * @returns {string} The class name.
     */
    getRecordClassName(): string;

    /**
     * Retrieves the number of rows in the query result.
     * @memberof GlideRecord
     * @returns {number} The number of rows.
     */
    getRowCount(): number;

    /**
     * Retrieves the name of the table associated with the GlideRecord.
     * @memberof GlideRecord
     * @returns {string} The table name.
     */
    getTableName(): string;
    /**
     * Gets the primary key of the record, which is usually the sys_id unless otherwise specified.
     * @memberof GlideRecord
     * @returns {string|null|undefined} The unique primary key as a String, or null if the key is null.
     */
    getUniqueValue(): string | null | undefined;

    /**
     * Retrieves the string value of an underlying element in a field.
     * @memberof GlideRecord
     * @param {string} name The name of the field to get the value from.
     * @returns {string|null|undefined} The value of the field.
     */
    getValue(name: string): string | null | undefined;

    /**
     * Determines if there are any more records in the GlideRecord object.
     * @memberof GlideRecord
     * @returns {boolean} True if there are more records in the query result set.
     */
    hasNext(): boolean;
    /**
     * Inserts a new record using the field values that have been set for the current record.
     * @memberof GlideRecord
     * @returns {string} Unique ID of the inserted record, or null if the record is not inserted.
     */
    insert(): string;

    /**
     * Creates an empty record suitable for population before an insert.
     * @memberof GlideRecord
     */
    initialize(): void;

    /**
     * Checks to see if the current database action is to be aborted.
     * @memberof GlideRecord
     * @returns {boolean} True if the current database action is to be aborted.
     * @memberof GlideRecord
     */
    isActionAborted(): boolean;
    /**
     * Checks if the current record is a new record that has not yet been inserted into the database.
     * @memberof GlideRecord
     * @returns {boolean} True if the record is new and has not been inserted into the database.
     */
    isNewRecord(): boolean;

    /**
     * Determines if the table exists.
     * @memberof GlideRecord
     * @returns {boolean} True if table is valid or if record was successfully retrieved. False if table is invalid or record was not successfully retrieved.
     */
    isValid(): boolean;

    /**
     * Determines if the specified field is defined in the current table.
     * @memberof GlideRecord
     * @param {string} columnName The name of the the field.
     * @returns {boolean} True if the field is defined for the current table.
     */
    isValidField(columnName: string): boolean;

    /**
     * Determines if current record is a valid record.
     * @memberof GlideRecord
     * @returns {boolean} True if the current record is valid. False if past the end of the record set.
     */
    isValidRecord(): boolean;
    /**
     * Creates a new GlideRecord record, sets the default values for the fields, and assigns a unique ID to the record.
     * @memberof GlideRecord
     */
    newRecord(): void;

    /**
     * Moves to the next record in the GlideRecord object.
     * @memberof GlideRecord
     * @returns {boolean} True if moving to the next record is successful. False if there are no more records in the result set.
     */
    next(): boolean;

    /**
     * Moves to the next record in the GlideRecord object.
     * @memberof GlideRecord
     * @returns {boolean} True if moving to the next record is successful. False if there are no more records in the result set.
     */
    _next(): boolean;
    /**
     * Retrieves the current operation being performed, such as insert, update, or delete.
     * @memberof GlideRecord
     * @returns {string} The current operation.
     */
    operation(): string;

    /**
     * Specifies an orderBy column.
     * @memberof GlideRecord
     * @param {string} name The column name used to order the records in this GlideRecord object.
     */
    orderBy(name: string): void;

    query(): void;
    _query(): void;

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.
     * @memberof GlideRecord
     * @param {string} [name] The column name to query on.
     * @param {*} [value] The value to query for.
     */
    query(field?: string, value?: any): void;

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.
     * @memberof GlideRecord
     * @param {string} [name] The column name to query on.
     * @param {*} [value] The value to query for.
     */
    _query(field: string, value: any): void;

    /**
     * Specifies a decending orderBy column.
     * @param {string} name The column name used to order the records in this GlideRecord object.
     * @memberof GlideRecord
     */
    orderByDesc(name: string): void;
    /**
     * Sets a flag to indicate if the next database action (insert, update, delete) is to be aborted. This is often used in business rules.
     * @memberof GlideRecord
     * @param b True to abort the next action. False if the action is to be allowed.
     */
    setAbortAction(b: boolean): void;

    /**
     * Sets the limit for number of records are fetched by the GlideRecord query.
     * @memberof GlideRecord
     * @param {number} maxNumRecords The maximum number of records to fetch.
     */
    setLimit(maxNumRecords: number): void;
    /**
     * Sets sys_id value for the current record.
     * @param {string} guid The GUID to be assigned to the current record.
     * @memberof GlideRecord
     */
    setNewGuidValue(guid: string): void;

    /**
     * Sets the value of the field with the specified name to the specified value.
     * @memberof GlideRecord
     * @param {string} name Name of the field.
     * @param {*} value The value to assign to the field.
     */
    setValue(name: string, value: any): void;

    /**
     * Enables or disables the running of business rules, script engines, and audit.
     * @memberof GlideRecord
     * @param {boolean} enable If true (default), enables business rules. If false, disables business rules.
     */
    setWorkflow(enable: boolean): void;

    /**
     * Updates the GlideRecord with any changes that have been made. If the record does not already exist, it is inserted.
     * @memberof GlideRecord
     * @param {string} [reason] The reason for the update. The reason is displayed in the audit record.
     * @returns {string|null} Unique ID of the new or updated record. Returns null if the update fails.
     */
    update(reason?: string): string | null;

    /**
     * Updates each GlideRecord in the list with any changes that have been made.
     * @memberof GlideRecord
     */
    updateMultiple(): void;
}

declare type InvalidGlideRecord<TRecord extends GlideRecord> = TRecord & {
    isValidRecord(): false;
    sys_id: GlideNilElement<string, string, StringGlideElement>;
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

declare interface IStringChoiceGlideElement<T extends string> extends IGlideValueElement<T, T> { }

declare type GlideNilElement<TIn, TOut extends TIn & string, TElement extends GlideElement> = IGlideValueElement<TIn, TOut & ""> & GlideElement & { nil(): true };

declare type StringGlideElement = IGlideValueElement<string, string> & GlideElement;
declare type StringGlideObject = string | GlideRecord | GlideElement;

declare abstract class GlideElement implements IGlideElement<string | GlideElement | GlideRecord, string, GlideRecord> {
	/**
     * Created by
     * @type {StringGlideElement}
     * @memberof GlideElement
     * @description Max length: 40
     */
    sys_created_by: StringGlideElement;

    /**
     * Created
     * @type {StringGlideElement}
     * @memberof GlideElement
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    sys_created_on: StringGlideElement;

    /**
     * Sys ID
     * @type {StringGlideElement}
     * @memberof GlideElement
     * @description Internal type is "GUID"
     *      Max length: 32
     */
    sys_id: StringGlideElement;

    /**
     * Updates
     * @type {GlideElementNumeric}
     * @memberof GlideElement
     */
    sys_mod_count: GlideElementNumeric;

    /**
     * Updated by
     * @type {StringGlideElement}
     * @memberof GlideElement
     * @description Max length: 40
     */
    sys_updated_by: StringGlideElement;

    /**
     * Updated
     * @type {StringGlideElement}
     * @memberof GlideElement
     * @description Internal type is "glide_date_time"
     *      Max length: 40
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
     * @returns {GlideElementBoolean}
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
declare type GlidePropertiesElementReference<TProperties extends IGlideElementColumns, TRecord extends GlidePropertiesRecord<TProperties>> = IGlideElementReference<TRecord> & GlideElementReference & TProperties;

declare interface IGlideElementReference<T extends GlideRecord> extends IGlideElement<string | IGlideElementReference<T> & GlideElement | T, string, T> { getRefRecord(): T; }

declare abstract class GlideElementReference extends GlideElement {}

declare abstract class GlideElementUserImage extends GlideElement implements IGlideValueElement<string, string> { }

declare abstract class GlideElementDocumentation extends GlideElement { }

declare abstract class GlideElementPassword2 extends GlideElement { }

declare abstract class GlideElementRelatedTags extends GlideElement { }

declare abstract class GlideElementScript extends GlideElement { }

declare abstract class GlideElementConditions extends GlideElement { }

declare abstract class GlideElementDomainId extends GlideElement { }

declare abstract class GlideElementVariables { [key: string]: GlideElementVariable; }

declare abstract class GlideElementVariable {
    getChoiceValue(): string;

    getChoices(dependent?: string): Packages.java.lang.util.IArrayList<Packages.java.lang.String>;

    /**
     * Gets the current element descriptor.
     * @returns {GlideElementDescriptor}
     * @memberof GlideElementVariable
     */
    getED(): GlideElementDescriptor;

    /**
     * Gets the object label.
     * @returns {string} The object label.
     * @memberof GlideElementVariable
     */
    getLabel(): string;

    // getModifiedBy(): string;

    /**
     * Gets the name of the field.
     * @returns {string} The name of the field.
     * @memberof GlideElementVariable
     */
    getName(): string;

    /**
     * Determines if a field is null.
     * @returns {boolean} True if the field is null or an empty string, false if not.
     * @memberof GlideElementVariable
     */
    nil(): boolean;

    /**
     * Gets the value of the current element.
     * @returns {string}
     * @memberof GlideElementVariable
     */
    getValue(): string;

    /**
     * Gets the formatted display value of the field.
     * @param {number} [maxCharacters] Maximum characters desired
     * @memberof GlideElementVariable
     */
    getDisplayValue(maxCharacters?: number): string;

    /**
     * Returns the HTML value of a field.
     * @param {number} [maxChars] Maximum number of characters to return.
     * @returns {string} HTML value for the field.
     * @memberof GlideElementVariable
     */
    getHTMLValue(maxCharacters?: number): string;

    /**
     * Gets the name of the table on which the field resides.
     * @returns {string} Name of the table. The returned value may be different from the table Class that the record is in. See Tables and Classes in the product documentation.
     * @memberof GlideElementVariable
     */
    getTableName(): string;

    /**
     * Sets the value of a field.
     * @param {*} value Object value to set the field to.
     * @memberof GlideElementVariable
     */
    setValue(value: any): void;

    /**
     * Converts the value to a string.
     * @returns {string} The value as a string
     * @memberof GlideElementVariable
     */
    toString(): string;
}

declare abstract class GlideElementSysClassName extends GlideElement implements IGlideValueElement<string, string> {
    setValue(value: string | IGlideValueElement<string, string>): void;
}

/**
 * GlideElement values from the Application File table.
 * @interface Isys_metadataColumns
 */
declare interface Isys_metadataColumns extends IGlideElementColumns {
    /**
     * Class
     * @type {GlideElementSysClassName}
     * @memberof Isys_metadataColumns
     * @default "javascript:current.getTableName();"
     */
    sys_class_name: GlideElementSysClassName;

    /**
     * Display name
     * @type {StringGlideElement}
     * @memberof Isys_metadataColumns
     * @description Max length: 255
     */
    sys_name: StringGlideElement;

    /**
     * Package
     * @type {sys_packageElementReference}
     * @memberof Isys_metadataColumns
     * @readonly
     * @description Reference to table "sys_package"
     */
    sys_package: sys_packageElementReference;

    /**
     * Protection policy
     * @type {StringGlideElement}
     * @memberof Isys_metadataColumns
     * @description Choices: "protected": "Protected"; "read": "Read-only"
     *      Max length: 40
     */
    sys_policy: StringGlideElement;

    /**
     * Application
     * @type {sys_scopeElementReference}
     * @memberof Isys_metadataColumns
     * @default "javascript:(((typeof parent == 'object') && parent != null && parent.getTableName() == 'sys_app') ? parent.sys_id : gs.getCurrentApplicationId())"
     * @description Reference to table "sys_scope"
     */
    sys_scope: sys_scopeElementReference;

    /**
     * Update name
     * @type {StringGlideElement}
     * @memberof Isys_metadataColumns
     * @description Max length: 250
     */
    sys_update_name: StringGlideElement;
}

declare type sys_metadataGlideRecord = GlideRecord & Isys_metadataColumns;

declare type sys_metadataElementReference = GlidePropertiesElementReference<Isys_metadataColumns, sys_metadataGlideRecord>;

/**
 * GlideElement values from the Application table.
 * @interface Isys_scopeColumns
 * @extends {Isys_packageColumns}
 */
declare interface Isys_scopeColumns extends Isys_packageColumns {
    /**
     * JavaScript Mode
     * @type {StringGlideElement}
     * @memberof Isys_scopeColumns
     * @default "helsinki_es5"
     * @description Choices: "helsinki_es5": "ES5 Standards Mode"; "traditional": "Compatibility Mode"
     *      Max length: 40
     */
    js_level: StringGlideElement;

    /**
     * Logo
     * @type {GlideElementUserImage}
     * @memberof Isys_scopeColumns
     */
    logo: GlideElementUserImage;

    /**
     * Private
     * @type {GlideElementBoolean}
     * @memberof Isys_scopeColumns
     * @default false
     */
    private: GlideElementBoolean;

    /**
     * Restrict Table Choices
     * @type {GlideElementBoolean}
     * @memberof Isys_scopeColumns
     * @default false
     */
    restrict_table_access: GlideElementBoolean;

    /**
     * Restrict Runtime Access
     * @type {StringGlideElement}
     * @memberof Isys_scopeColumns
     * @description Choices: "enforcing": "Enforcing"; "permissive": "Tracking"
     *      Max length: 40
     */
    runtime_access_tracking: StringGlideElement;

    /**
     * Scope
     * @type {StringGlideElement}
     * @memberof Isys_scopeColumns
     * @description Max length: 18
     */
    scope: StringGlideElement;

    /**
     * Application administration
     * @type {GlideElementBoolean}
     * @memberof Isys_scopeColumns
     * @default false
     */
    scoped_administration: GlideElementBoolean;

    /**
     * Short description
     * @type {StringGlideElement}
     * @memberof Isys_scopeColumns
     * @description Max length: 160
     */
    short_description: StringGlideElement;

    /**
     * Template
     * @type {StringGlideElement}
     * @memberof Isys_scopeColumns
     * @readonly
     * @description Choices: "service": "Service"; "esa": "ESA"
     *      Max length: 40
     */
    template: StringGlideElement;

    /**
     * Vendor
     * @type {StringGlideElement}
     * @memberof Isys_scopeColumns
     * @description Max length: 40
     */
    vendor: StringGlideElement;

    /**
     * Vendor prefix
     * @type {StringGlideElement}
     * @memberof Isys_scopeColumns
     * @readonly
     * @description Max length: 40
     */
    vendor_prefix: StringGlideElement;
}

declare type sys_scopeGlideRecord = sys_metadataGlideRecord & Isys_scopeColumns;

declare type sys_scopeElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isys_scopeColumns, sys_scopeGlideRecord>;

/**
 * GlideElement values from the Package table.
 * @interface Isys_packageColumns
 */
declare interface Isys_packageColumns extends IGlideElementColumns {
    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof Isys_packageColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Subscription requirement
     * @type {StringGlideElement}
     * @memberof Isys_packageColumns
     * @default "none"
     * @description Choices: "enforce": "Required"; "log": "Monitor"; "none": "None"
     *      Max length: 40
     */
    enforce_license: StringGlideElement;

    /**
     * Licensable
     * @type {GlideElementBoolean}
     * @memberof Isys_packageColumns
     */
    licensable: GlideElementBoolean;

    /**
     * Subscription Category
     * @type {StringGlideElement}
     * @memberof Isys_packageColumns
     * @default "none"
     * @description Choices: "beta": "Beta"; "general": "General"; "none": "Not applicable"
     *      Max length: 40
     */
    license_category: StringGlideElement;

    /**
     * Subscription Model
     * @type {StringGlideElement}
     * @memberof Isys_packageColumns
     * @default "none"
     * @description Choices: "app_use": "Application in use"; "mixed": "Mixed"; "capacity": "Capacity"; "producer": "Producer"; "fulfiller": "Fulfiller/Requester"; "none": "Not applicable"
     *      Max length: 40
     */
    license_model: StringGlideElement;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Isys_packageColumns
     * @description Max length: 100
     */
    name: StringGlideElement;

    /**
     * ID
     * @type {StringGlideElement}
     * @memberof Isys_packageColumns
     * @default "javascript:_getID();\r\n\r\nfunction _getID() {\r\n  var source = current.getValue('source');\r\n  var sys_id = current.getValue('sys_id');\r\n  var scope = current.getValue('scope');\r\n  return gs.nil(scope) || scope == 'global' ? source||sys_id : source||scope;\r\n}"
     * @description Max length: 100
     */
    source: StringGlideElement;

    /**
     * Class
     * @type {GlideElementSysClassName}
     * @memberof Isys_packageColumns
     * @default "javascript:current.getTableName();"
     */
    sys_class_name: GlideElementSysClassName;

    /**
     * Trackable
     * @type {GlideElementBoolean}
     * @memberof Isys_packageColumns
     * @default false
     */
    trackable: GlideElementBoolean;

    /**
     * Version
     * @type {GlideElement}
     * @memberof Isys_packageColumns
     * @description Internal type is "version"
     */
    version: GlideElement;
}

declare type sys_packageGlideRecord = GlideRecord & Isys_packageColumns;

declare type sys_packageElementReference = GlidePropertiesElementReference<Isys_packageColumns, sys_packageGlideRecord>;

/**
 * GlideElement values from the Number table.
 * @interface Isys_numberColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isys_numberColumns extends Isys_metadataColumns {
    /**
     * Table
     * @type {sys_db_objectElementReference}
     * @memberof Isys_numberColumns
     * @description Reference to table "sys_db_object"
     */
    category: sys_db_objectElementReference;

    /**
     * Number of digits
     * @type {GlideElementNumeric}
     * @memberof Isys_numberColumns
     * @default 7
     */
    maximum_digits: GlideElementNumeric;

    /**
     * Number
     * @type {GlideElementNumeric}
     * @memberof Isys_numberColumns
     * @default 1000
     */
    number: GlideElementNumeric;

    /**
     * Prefix
     * @type {StringGlideElement}
     * @memberof Isys_numberColumns
     * @description Max length: 40
     */
    prefix: StringGlideElement;
}

declare type sys_numberGlideRecord = sys_metadataGlideRecord & Isys_numberColumns;

declare type sys_numberElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isys_numberColumns, sys_numberGlideRecord>;

/**
 * GlideElement values from the Encryption Context table.
 * @interface Isys_encryption_contextColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isys_encryption_contextColumns extends Isys_metadataColumns {
    /**
     * Encryption key
     * @type {GlideElementPassword2}
     * @memberof Isys_encryption_contextColumns
     */
    encryption_key: GlideElementPassword2;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Isys_encryption_contextColumns
     * @description Max length: 40
     */
    name: StringGlideElement;

    /**
     * Type
     * @type {StringGlideElement}
     * @memberof Isys_encryption_contextColumns
     * @default "AES"
     * @description Choices: "AES": "AES 128-bit"; "AES256": "AES 256-bit"; "3DES": "Triple DES"
     *      Max length: 40
     */
    type: StringGlideElement;
}

declare type sys_encryption_contextGlideRecord = sys_metadataGlideRecord & Isys_encryption_contextColumns;

declare type sys_encryption_contextElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isys_encryption_contextColumns, sys_encryption_contextGlideRecord>;

/**
 * GlideElement values from the Table table.
 * @interface Isys_db_objectColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isys_db_objectColumns extends Isys_metadataColumns {
    /**
     * Accessible from
     * @type {StringGlideElement}
     * @memberof Isys_db_objectColumns
     * @default "public"
     * @description Choices: "package_private": "This application scope only"; "public": "All application scopes"
     *      Max length: 40
     */
    access: StringGlideElement;

    /**
     * Allow UI actions
     * @type {GlideElementBoolean}
     * @memberof Isys_db_objectColumns
     * @default false
     */
    actions_access: GlideElementBoolean;

    /**
     * Allow new fields
     * @type {GlideElementBoolean}
     * @memberof Isys_db_objectColumns
     * @default false
     */
    alter_access: GlideElementBoolean;

    /**
     * Caller Access
     * @type {StringGlideElement}
     * @memberof Isys_db_objectColumns
     * @description Choices: "2": "Caller Restriction"; "1": "Caller Tracking"
     *      Max length: 40
     */
    caller_access: StringGlideElement;

    /**
     * Allow client scripts
     * @type {GlideElementBoolean}
     * @memberof Isys_db_objectColumns
     * @default false
     */
    client_scripts_access: GlideElementBoolean;

    /**
     * Allow configuration
     * @type {GlideElementBoolean}
     * @memberof Isys_db_objectColumns
     * @default false
     */
    configuration_access: GlideElementBoolean;

    /**
     * Can create
     * @type {GlideElementBoolean}
     * @memberof Isys_db_objectColumns
     * @default false
     */
    create_access: GlideElementBoolean;

    /**
     * Create access controls
     * @type {GlideElementBoolean}
     * @memberof Isys_db_objectColumns
     */
    create_access_controls: GlideElementBoolean;

    /**
     * Can delete
     * @type {GlideElementBoolean}
     * @memberof Isys_db_objectColumns
     * @default false
     */
    delete_access: GlideElementBoolean;

    /**
     * Extension model
     * @type {StringGlideElement}
     * @memberof Isys_db_objectColumns
     * @readonly
     * @description Choices: "partition": "Table per partition"; "hierarchy": "Table per hierarchy"; "class": "Table per class"
     *      Max length: 40
     */
    extension_model: StringGlideElement;

    /**
     * Extensible
     * @type {GlideElementBoolean}
     * @memberof Isys_db_objectColumns
     * @default false
     */
    is_extendable: GlideElementBoolean;

    /**
     * Label
     * @type {GlideElementDocumentation}
     * @memberof Isys_db_objectColumns
     */
    label: GlideElementDocumentation;

    /**
     * Live feed
     * @type {GlideElementBoolean}
     * @memberof Isys_db_objectColumns
     * @default false
     */
    live_feed_enabled: GlideElementBoolean;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Isys_db_objectColumns
     * @description Max length: 80
     */
    name: StringGlideElement;

    /**
     * Auto number
     * @type {sys_numberElementReference}
     * @memberof Isys_db_objectColumns
     * @description Reference to table "sys_number"
     */
    number_ref: sys_numberElementReference;

    /**
     * Provider class
     * @type {StringGlideElement}
     * @memberof Isys_db_objectColumns
     * @description Max length: 100
     */
    provider_class: StringGlideElement;

    /**
     * Can read
     * @type {GlideElementBoolean}
     * @memberof Isys_db_objectColumns
     * @default true
     */
    read_access: GlideElementBoolean;

    /**
     * Extends table
     * @type {sys_db_objectElementReference}
     * @memberof Isys_db_objectColumns
     * @description Reference to table "sys_db_object"
     */
    super_class: sys_db_objectElementReference;

    /**
     * Sys class code
     * @type {GlideElement}
     * @memberof Isys_db_objectColumns
     * @description Internal type is "sys_class_code"
     */
    sys_class_code: GlideElement;

    /**
     * Sys class path
     * @type {GlideElement}
     * @memberof Isys_db_objectColumns
     * @description Internal type is "sys_class_path"
     */
    sys_class_path: GlideElement;

    /**
     * Can update
     * @type {GlideElementBoolean}
     * @memberof Isys_db_objectColumns
     * @default false
     */
    update_access: GlideElementBoolean;

    /**
     * User role
     * @type {sys_user_roleElementReference}
     * @memberof Isys_db_objectColumns
     * @description Reference to table "sys_user_role"
     */
    user_role: sys_user_roleElementReference;

    /**
     * Allow access to this table via web services
     * @type {GlideElementBoolean}
     * @memberof Isys_db_objectColumns
     * @default true
     */
    ws_access: GlideElementBoolean;
}

declare type sys_db_objectGlideRecord = sys_metadataGlideRecord & Isys_db_objectColumns;

declare type sys_db_objectElementReference = GlidePropertiesElementReference<Isys_db_objectColumns, sys_db_objectGlideRecord> & sys_metadataElementReference;

/**
 * GlideElement values from the Field class table.
 * @interface Isys_glide_objectColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isys_glide_objectColumns extends Isys_metadataColumns {
    /**
     * Attributes
     * @type {StringGlideElement}
     * @memberof Isys_glide_objectColumns
     * @description Max length: 255
     */
    attributes: StringGlideElement;

    /**
     * Class name
     * @type {StringGlideElement}
     * @memberof Isys_glide_objectColumns
     * @description Max length: 80
     */
    class_name: StringGlideElement;

    /**
     * Label
     * @type {StringGlideElement}
     * @memberof Isys_glide_objectColumns
     * @description Internal type is "translated_field"
     *      Max length: 40
     */
    label: StringGlideElement;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Isys_glide_objectColumns
     * @description Max length: 40
     */
    name: StringGlideElement;

    /**
     * Length
     * @type {StringGlideElement}
     * @memberof Isys_glide_objectColumns
     * @description Max length: 40
     */
    scalar_length: StringGlideElement;

    /**
     * Extends
     * @type {StringGlideElement}
     * @memberof Isys_glide_objectColumns
     * @default "string"
     * @description Choices: "binary": "Binary"; "boolean": "Boolean"; "char": "Char"; "date": "Date"; "datetime": "Date/Time"; "decimal": "Decimal"; "float": "Floating Point Number"; "integer": "Integer"; "longint": "Longint"; "string": "String"; "GUID": "Sys ID"; "time": "Time"
     *      Max length: 40
     */
    scalar_type: StringGlideElement;

    /**
     * Use original value
     * @type {GlideElementBoolean}
     * @memberof Isys_glide_objectColumns
     * @default true
     */
    use_original_value: GlideElementBoolean;

    /**
     * Visible
     * @type {GlideElementBoolean}
     * @memberof Isys_glide_objectColumns
     */
    visible: GlideElementBoolean;
}

declare type sys_glide_objectGlideRecord = sys_metadataGlideRecord & Isys_glide_objectColumns;

declare type sys_glide_objectElementReference = GlidePropertiesElementReference<Isys_glide_objectColumns, sys_glide_objectGlideRecord> & sys_metadataElementReference;

/**
 * GlideElement values from the Dictionary Entry table.
 * @interface Isys_dictionaryColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isys_dictionaryColumns extends Isys_metadataColumns {
    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Array
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    array: GlideElementBoolean;

    /**
     * Array denormalized
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    array_denormalized: GlideElementBoolean;

    /**
     * Attributes
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 1000
     */
    attributes: StringGlideElement;

    /**
     * Audit
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    audit: GlideElementBoolean;

    /**
     * Calculation
     * @type {GlideElementScript}
     * @memberof Isys_dictionaryColumns
     * @default "(function calculatedFieldValue(current) {\n\n\t// Add your code here\n\treturn '';  // return the calculated value\n\n})(current);"
     */
    calculation: GlideElementScript;

    /**
     * Choice
     * @type {GlideElementNumeric}
     * @memberof Isys_dictionaryColumns
     * @description Choices: "2": "Suggestion"; "1": "Dropdown with -- None --"; "3": "Dropdown without -- None -- (must specify a default value)"
     */
    choice: GlideElementNumeric;

    /**
     * Choice field
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "field_name"
     *      Max length: 80
     */
    choice_field: StringGlideElement;

    /**
     * Choice table
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    choice_table: StringGlideElement;

    /**
     * Column label
     * @type {GlideElementDocumentation}
     * @memberof Isys_dictionaryColumns
     */
    column_label: GlideElementDocumentation;

    /**
     * Comments
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 4000
     */
    comments: StringGlideElement;

    /**
     * Create roles
     * @type {GlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "user_roles"
     */
    create_roles: GlideElement;

    /**
     * Defaultsort
     * @type {GlideElementNumeric}
     * @memberof Isys_dictionaryColumns
     */
    defaultsort: GlideElementNumeric;

    /**
     * Default value
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 512
     */
    default_value: StringGlideElement;

    /**
     * Delete roles
     * @type {GlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "user_roles"
     */
    delete_roles: GlideElement;

    /**
     * Dependent
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 80
     */
    dependent: StringGlideElement;

    /**
     * Dependent on field
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "field_name"
     *      Max length: 80
     */
    dependent_on_field: StringGlideElement;

    /**
     * Display
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    display: GlideElementBoolean;

    /**
     * Dynamic creation
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    dynamic_creation: GlideElementBoolean;

    /**
     * Dynamic creation script
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 4000
     */
    dynamic_creation_script: StringGlideElement;

    /**
     * Dynamic default value
     * @type {sys_filter_option_dynamicElementReference}
     * @memberof Isys_dictionaryColumns
     * @description Reference to table "sys_filter_option_dynamic"
     */
    dynamic_default_value: GlideElementReference;

    /**
     * Dynamic ref qual
     * @type {sys_filter_option_dynamicElementReference}
     * @memberof Isys_dictionaryColumns
     * @description Reference to table "sys_filter_option_dynamic"
     */
    dynamic_ref_qual: GlideElementReference;

    /**
     * Column name
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 80
     */
    element: StringGlideElement;

    /**
     * Element reference
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    element_reference: GlideElementBoolean;

    /**
     * Foreign database
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 40
     */
    foreign_database: StringGlideElement;

    /**
     * Function definition
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 4000
     */
    function_definition: StringGlideElement;

    /**
     * Function field
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     * @default false
     */
    function_field: GlideElementBoolean;

    /**
     * Type
     * @type {sys_glide_objectElementReference}
     * @memberof Isys_dictionaryColumns
     * @description Reference to table "sys_glide_object"
     */
    internal_type: sys_glide_objectElementReference;

    /**
     * Mandatory
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    mandatory: GlideElementBoolean;

    /**
     * Max length
     * @type {GlideElementNumeric}
     * @memberof Isys_dictionaryColumns
     */
    max_length: GlideElementNumeric;

    /**
     * Table
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    name: StringGlideElement;

    /**
     * Next element
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @readonly
     * @description Max length: 80
     */
    next_element: StringGlideElement;

    /**
     * Primary
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    primary: GlideElementBoolean;

    /**
     * Read only
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    read_only: GlideElementBoolean;

    /**
     * Read roles
     * @type {GlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "user_roles"
     */
    read_roles: GlideElement;

    /**
     * Reference
     * @type {sys_db_objectElementReference}
     * @memberof Isys_dictionaryColumns
     * @description Reference to table "sys_db_object"
     */
    reference: sys_db_objectElementReference;

    /**
     * Reference cascade rule
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Choices: "cascade": "Cascade"; "clear": "Clear"; "delete": "Delete"; "delete_no_workflow": "Delete no workflow"; "none": "None"; "restrict": "Restrict"
     *      Max length: 20
     */
    reference_cascade_rule: StringGlideElement;

    /**
     * Reference floats
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    reference_floats: GlideElementBoolean;

    /**
     * Reference key
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 40
     */
    reference_key: StringGlideElement;

    /**
     * Reference qual
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 1000
     */
    reference_qual: StringGlideElement;

    /**
     * Reference qual condition
     * @type {GlideElementConditions}
     * @memberof Isys_dictionaryColumns
     */
    reference_qual_condition: GlideElementConditions;

    /**
     * Reference type
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 10
     */
    reference_type: StringGlideElement;

    /**
     * Sizeclass
     * @type {GlideElementNumeric}
     * @memberof Isys_dictionaryColumns
     */
    sizeclass: GlideElementNumeric;

    /**
     * Spell check
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    spell_check: GlideElementBoolean;

    /**
     * Staged
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     * @default false
     */
    staged: GlideElementBoolean;

    /**
     * Table reference
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    table_reference: GlideElementBoolean;

    /**
     * Text index
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    text_index: GlideElementBoolean;

    /**
     * Unique
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    unique: GlideElementBoolean;

    /**
     * Use dependent field
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     * @default false
     */
    use_dependent_field: GlideElementBoolean;

    /**
     * Use dynamic default
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    use_dynamic_default: GlideElementBoolean;

    /**
     * Use reference qualifier
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @default "simple"
     * @description Choices: "advanced": "Advanced"; "dynamic": "Dynamic"; "simple": "Simple"
     *      Max length: 40
     */
    use_reference_qualifier: StringGlideElement;

    /**
     * Calculated
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    virtual: GlideElementBoolean;

    /**
     * Widget
     * @type {StringGlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 40
     */
    widget: StringGlideElement;

    /**
     * Write roles
     * @type {GlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "user_roles"
     */
    write_roles: GlideElement;

    /**
     * XML view
     * @type {GlideElementBoolean}
     * @memberof Isys_dictionaryColumns
     */
    xml_view: GlideElementBoolean;
}

declare type sys_dictionaryGlideRecord = sys_metadataGlideRecord & Isys_dictionaryColumns;

declare type sys_dictionaryElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isys_dictionaryColumns, sys_dictionaryGlideRecord>;

/**
 * GlideElement values from the Choice table.
 * @interface Isys_choiceColumns
 */
declare interface Isys_choiceColumns extends IGlideElementColumns {
    /**
     * Dependent value
     * @type {StringGlideElement}
     * @memberof Isys_choiceColumns
     * @description Max length: 100
     */
    dependent_value: StringGlideElement;

    /**
     * Element
     * @type {StringGlideElement}
     * @memberof Isys_choiceColumns
     * @description Max length: 40
     */
    element: StringGlideElement;

    /**
     * Hint
     * @type {StringGlideElement}
     * @memberof Isys_choiceColumns
     * @description Max length: 255
     */
    hint: StringGlideElement;

    /**
     * Inactive
     * @type {GlideElementBoolean}
     * @memberof Isys_choiceColumns
     * @default false
     */
    inactive: GlideElementBoolean;

    /**
     * Label
     * @type {StringGlideElement}
     * @memberof Isys_choiceColumns
     * @description Max length: 100
     */
    label: StringGlideElement;

    /**
     * Language
     * @type {StringGlideElement}
     * @memberof Isys_choiceColumns
     * @default "en"
     * @description Max length: 2
     */
    language: StringGlideElement;

    /**
     * Table
     * @type {StringGlideElement}
     * @memberof Isys_choiceColumns
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    name: StringGlideElement;

    /**
     * Sequence
     * @type {GlideElementNumeric}
     * @memberof Isys_choiceColumns
     */
    sequence: GlideElementNumeric;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof Isys_choiceColumns
     * @default "global"
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof Isys_choiceColumns
     * @default "/"
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;

    /**
     * Value
     * @type {StringGlideElement}
     * @memberof Isys_choiceColumns
     * @description Max length: 4000
     */
    value: StringGlideElement;
}

declare type sys_choiceGlideRecord = GlideRecord & Isys_choiceColumns;

declare type sys_choiceElementReference = GlidePropertiesElementReference<Isys_choiceColumns, sys_choiceGlideRecord>;

/**
 * GlideElement values from the Role table.
 * @interface Isys_user_roleColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isys_user_roleColumns extends Isys_metadataColumns {
    /**
     * Assignable by
     * @type {sys_user_roleElementReference}
     * @memberof Isys_user_roleColumns
     * @description Reference to table "sys_user_role"
     */
    assignable_by: sys_user_roleElementReference;

    /**
     * Can delegate
     * @type {GlideElementBoolean}
     * @memberof Isys_user_roleColumns
     * @default true
     */
    can_delegate: GlideElementBoolean;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Isys_user_roleColumns
     * @description Max length: 1000
     */
    description: StringGlideElement;

    /**
     * Elevated privilege
     * @type {GlideElementBoolean}
     * @memberof Isys_user_roleColumns
     * @default false
     */
    elevated_privilege: GlideElementBoolean;

    /**
     * Encryption context
     * @type {sys_encryption_contextElementReference}
     * @memberof Isys_user_roleColumns
     * @description Reference to table "sys_encryption_context"
     */
    encryption_context: sys_encryption_contextElementReference;

    /**
     * Grantable
     * @type {GlideElementBoolean}
     * @memberof Isys_user_roleColumns
     * @default true
     */
    grantable: GlideElementBoolean;

    /**
     * Includes roles
     * @type {StringGlideElement}
     * @memberof Isys_user_roleColumns
     * @description Internal type is "Array<string>"
     *      Max length: 40
     */
    includes_roles: StringGlideElement;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Isys_user_roleColumns
     * @description Max length: 100
     */
    name: StringGlideElement;

    /**
     * Requires Subscription
     * @type {StringGlideElement}
     * @memberof Isys_user_roleColumns
     * @default "-1"
     * @description Choices: "0": "No"; "-1": "Unspecified"; "1": "Yes"
     *      Max length: 40
     */
    requires_subscription: StringGlideElement;

    /**
     * Application Administrator
     * @type {GlideElementBoolean}
     * @memberof Isys_user_roleColumns
     * @default false
     */
    scoped_admin: GlideElementBoolean;

    /**
     * Suffix
     * @type {StringGlideElement}
     * @memberof Isys_user_roleColumns
     * @description Max length: 100
     */
    suffix: StringGlideElement;
}

declare type sys_user_roleGlideRecord = sys_metadataGlideRecord & Isys_user_roleColumns;

declare type sys_user_roleElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isys_user_roleColumns, sys_user_roleGlideRecord>;

/**
 * GlideElement values from the Location table.
 * @interface Icmn_locationColumns
 */
declare interface Icmn_locationColumns extends IGlideElementColumns {
    /**
     * City
     * @type {StringGlideElement}
     * @memberof Icmn_locationColumns
     * @description Max length: 40
     */
    city: StringGlideElement;

    /**
     * Company
     * @type {core_companyElementReference}
     * @memberof Icmn_locationColumns
     * @description Reference to table "core_company"
     */
    company: core_companyElementReference;

    /**
     * Contact
     * @type {sys_userElementReference}
     * @memberof Icmn_locationColumns
     * @description Reference to table "sys_user"
     */
    contact: sys_userElementReference;

    /**
     * Country
     * @type {StringGlideElement}
     * @memberof Icmn_locationColumns
     * @description Choices: "Belgium": "Belgium"; "Canada": "Canada"; "France": "France"; "Germany": "Germany"; "Italy": "Italy"; "Japan": "Japan"; "Mexico": "Mexico"; "United Kingdom": "United Kingdom"; "USA": "USA"
     *      Max length: 40
     */
    country: StringGlideElement;

    /**
     * Fax phone
     * @type {StringGlideElement}
     * @memberof Icmn_locationColumns
     * @description Max length: 40
     */
    fax_phone: StringGlideElement;

    /**
     * Full name
     * @type {StringGlideElement}
     * @memberof Icmn_locationColumns
     * @description Max length: 255
     */
    full_name: StringGlideElement;

    /**
     * Latitude
     * @type {GlideElementNumeric}
     * @memberof Icmn_locationColumns
     * @description Internal type is "float"
     */
    latitude: GlideElementNumeric;

    /**
     * Lat long error
     * @type {StringGlideElement}
     * @memberof Icmn_locationColumns
     * @description Max length: 1000
     */
    lat_long_error: StringGlideElement;

    /**
     * Longitude
     * @type {GlideElementNumeric}
     * @memberof Icmn_locationColumns
     * @description Internal type is "float"
     */
    longitude: GlideElementNumeric;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Icmn_locationColumns
     * @description Max length: 100
     */
    name: StringGlideElement;

    /**
     * Parent
     * @type {cmn_locationElementReference}
     * @memberof Icmn_locationColumns
     * @description Reference to table "cmn_location"
     */
    parent: cmn_locationElementReference;

    /**
     * Phone
     * @type {StringGlideElement}
     * @memberof Icmn_locationColumns
     * @description Max length: 40
     */
    phone: StringGlideElement;

    /**
     * Phone territory
     * @type {sys_phone_territoryElementReference}
     * @memberof Icmn_locationColumns
     * @description Reference to table "sys_phone_territory"
     */
    phone_territory: GlideElementReference;

    /**
     * State / Province
     * @type {StringGlideElement}
     * @memberof Icmn_locationColumns
     * @description Max length: 40
     */
    state: StringGlideElement;

    /**
     * Stock room
     * @type {GlideElementBoolean}
     * @memberof Icmn_locationColumns
     * @default false
     */
    stock_room: GlideElementBoolean;

    /**
     * Street
     * @type {GlideElement}
     * @memberof Icmn_locationColumns
     * @description Internal type is "multi_two_lines"
     */
    street: GlideElement;

    /**
     * Time zone
     * @type {StringGlideElement}
     * @memberof Icmn_locationColumns
     * @description Max length: 40
     */
    time_zone: StringGlideElement;

    /**
     * Zip / Postal Code
     * @type {StringGlideElement}
     * @memberof Icmn_locationColumns
     * @description Max length: 40
     */
    zip: StringGlideElement;
}

declare type cmn_locationGlideRecord = GlideRecord & Icmn_locationColumns;

declare type cmn_locationElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Icmn_locationColumns, cmn_locationGlideRecord>;

/**
 * GlideElement values from the Building table.
 * @interface Icmn_buildingColumns
 */
declare interface Icmn_buildingColumns extends IGlideElementColumns {
    /**
     * Contact
     * @type {sys_userElementReference}
     * @memberof Icmn_buildingColumns
     * @description Reference to table "sys_user"
     */
    contact: sys_userElementReference;

    /**
     * Floors
     * @type {GlideElementNumeric}
     * @memberof Icmn_buildingColumns
     */
    floors: GlideElementNumeric;

    /**
     * Location
     * @type {cmn_locationElementReference}
     * @memberof Icmn_buildingColumns
     * @description Reference to table "cmn_location"
     */
    location: cmn_locationElementReference;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Icmn_buildingColumns
     * @description Max length: 100
     */
    name: StringGlideElement;

    /**
     * Notes
     * @type {StringGlideElement}
     * @memberof Icmn_buildingColumns
     * @description Max length: 4000
     */
    notes: StringGlideElement;
}

declare type cmn_buildingGlideRecord = GlideRecord & Icmn_buildingColumns;

declare type cmn_buildingElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Icmn_buildingColumns, cmn_buildingGlideRecord>;

/**
 * GlideElement values from the Company table.
 * @interface Icore_companyColumns
 */
declare interface Icore_companyColumns extends IGlideElementColumns {
    /**
     * Apple icon
     * @type {GlideElementUserImage}
     * @memberof Icore_companyColumns
     */
    apple_icon: GlideElementUserImage;

    /**
     * Banner image
     * @type {GlideElementUserImage}
     * @memberof Icore_companyColumns
     */
    banner_image: GlideElementUserImage;

    /**
     * UI16 Banner Image
     * @type {GlideElementUserImage}
     * @memberof Icore_companyColumns
     */
    banner_image_light: GlideElementUserImage;

    /**
     * Banner text
     * @type {StringGlideElement}
     * @memberof Icore_companyColumns
     * @description Max length: 100
     */
    banner_text: StringGlideElement;

    /**
     * City
     * @type {StringGlideElement}
     * @memberof Icore_companyColumns
     * @description Max length: 50
     */
    city: StringGlideElement;

    /**
     * Contact
     * @type {sys_userElementReference}
     * @memberof Icore_companyColumns
     * @description Reference to table "sys_user"
     */
    contact: sys_userElementReference;

    /**
     * Country
     * @type {StringGlideElement}
     * @memberof Icore_companyColumns
     * @default "USA"
     * @description Max length: 40
     */
    country: StringGlideElement;

    /**
     * Customer
     * @type {GlideElementBoolean}
     * @memberof Icore_companyColumns
     * @default false
     */
    customer: GlideElementBoolean;

    /**
     * Discount
     * @type {GlideElementNumeric}
     * @memberof Icore_companyColumns
     * @description Internal type is "decimal"
     */
    discount: GlideElementNumeric;

    /**
     * Fax phone
     * @type {StringGlideElement}
     * @memberof Icore_companyColumns
     * @description Internal type is "ph_number"
     *      Max length: 40
     */
    fax_phone: StringGlideElement;

    /**
     * Fiscal year
     * @type {StringGlideElement}
     * @memberof Icore_companyColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    fiscal_year: StringGlideElement;

    /**
     * Latitude
     * @type {GlideElementNumeric}
     * @memberof Icore_companyColumns
     * @description Internal type is "float"
     */
    latitude: GlideElementNumeric;

    /**
     * Lat long error
     * @type {StringGlideElement}
     * @memberof Icore_companyColumns
     * @description Max length: 1000
     */
    lat_long_error: StringGlideElement;

    /**
     * Longitude
     * @type {GlideElementNumeric}
     * @memberof Icore_companyColumns
     * @description Internal type is "float"
     */
    longitude: GlideElementNumeric;

    /**
     * Manufacturer
     * @type {GlideElementBoolean}
     * @memberof Icore_companyColumns
     * @default false
     */
    manufacturer: GlideElementBoolean;

    /**
     * Market cap
     * @type {GlideElementNumeric}
     * @memberof Icore_companyColumns
     * @description Internal type is "currency"
     */
    market_cap: GlideElementNumeric;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Icore_companyColumns
     * @description Max length: 80
     */
    name: StringGlideElement;

    /**
     * Notes
     * @type {StringGlideElement}
     * @memberof Icore_companyColumns
     * @description Max length: 4000
     */
    notes: StringGlideElement;

    /**
     * Number of employees
     * @type {GlideElementNumeric}
     * @memberof Icore_companyColumns
     */
    num_employees: GlideElementNumeric;

    /**
     * Parent
     * @type {core_companyElementReference}
     * @memberof Icore_companyColumns
     * @description Reference to table "core_company"
     */
    parent: core_companyElementReference;

    /**
     * Phone
     * @type {StringGlideElement}
     * @memberof Icore_companyColumns
     * @description Internal type is "ph_number"
     *      Max length: 40
     */
    phone: StringGlideElement;

    /**
     * Primary
     * @type {GlideElementBoolean}
     * @memberof Icore_companyColumns
     * @default false
     */
    primary: GlideElementBoolean;

    /**
     * Profits
     * @type {GlideElementNumeric}
     * @memberof Icore_companyColumns
     * @description Internal type is "currency"
     */
    profits: GlideElementNumeric;

    /**
     * Publicly traded
     * @type {GlideElementBoolean}
     * @memberof Icore_companyColumns
     */
    publicly_traded: GlideElementBoolean;

    /**
     * Rank tier
     * @type {StringGlideElement}
     * @memberof Icore_companyColumns
     * @description Choices: "other": "Other"; "blacklist": "Blacklisted Supplier"; "tactical": "Tactical Supplier"; "valued": "Valued Partner"; "strategic": "Strategic Partner"
     *      Max length: 40
     */
    rank_tier: StringGlideElement;

    /**
     * Revenue per year
     * @type {GlideElementNumeric}
     * @memberof Icore_companyColumns
     * @description Internal type is "currency"
     */
    revenue_per_year: GlideElementNumeric;

    /**
     * State / Province
     * @type {StringGlideElement}
     * @memberof Icore_companyColumns
     * @description Max length: 40
     */
    state: StringGlideElement;

    /**
     * Stock price
     * @type {StringGlideElement}
     * @memberof Icore_companyColumns
     * @description Max length: 40
     */
    stock_price: StringGlideElement;

    /**
     * Stock symbol
     * @type {StringGlideElement}
     * @memberof Icore_companyColumns
     * @description Max length: 40
     */
    stock_symbol: StringGlideElement;

    /**
     * Street
     * @type {GlideElement}
     * @memberof Icore_companyColumns
     * @description Internal type is "multi_two_lines"
     */
    street: GlideElement;

    /**
     * Class
     * @type {GlideElementSysClassName}
     * @memberof Icore_companyColumns
     * @default "javascript:current.getTableName();"
     */
    sys_class_name: GlideElementSysClassName;

    /**
     * Theme
     * @type {sys_ui_themeElementReference}
     * @memberof Icore_companyColumns
     * @description Reference to table "sys_ui_theme"
     */
    theme: GlideElementReference;

    /**
     * Vendor
     * @type {GlideElementBoolean}
     * @memberof Icore_companyColumns
     * @default false
     */
    vendor: GlideElementBoolean;

    /**
     * Vendor manager
     * @type {GlideElement}
     * @memberof Icore_companyColumns
     * @description Internal type is "glide_list"
     */
    vendor_manager: GlideElement;

    /**
     * Vendor type
     * @type {GlideElement}
     * @memberof Icore_companyColumns
     * @description Internal type is "glide_list"
     */
    vendor_type: GlideElement;

    /**
     * Website
     * @type {StringGlideElement}
     * @memberof Icore_companyColumns
     * @description Internal type is "url"
     *      Max length: 1024
     */
    website: StringGlideElement;

    /**
     * Zip / Postal code
     * @type {StringGlideElement}
     * @memberof Icore_companyColumns
     * @description Max length: 40
     */
    zip: StringGlideElement;
}

declare type core_companyGlideRecord = GlideRecord & Icore_companyColumns;

declare type core_companyElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Icore_companyColumns, core_companyGlideRecord>;

/**
 * GlideElement values from the Business Unit table.
 * @interface Ibusiness_unitColumns
 */
declare interface Ibusiness_unitColumns extends IGlideElementColumns {
    /**
     * Business Unit Head
     * @type {sys_userElementReference}
     * @memberof Ibusiness_unitColumns
     * @description Reference to table "sys_user"
     */
    bu_head: sys_userElementReference;

    /**
     * Company
     * @type {core_companyElementReference}
     * @memberof Ibusiness_unitColumns
     * @description Reference to table "core_company"
     */
    company: core_companyElementReference;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Ibusiness_unitColumns
     * @description Internal type is "wide_text"
     *      Max length: 100
     */
    description: StringGlideElement;

    /**
     * Hierarchy level
     * @type {GlideElementNumeric}
     * @memberof Ibusiness_unitColumns
     */
    hierarchy_level: GlideElementNumeric;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Ibusiness_unitColumns
     * @description Max length: 100
     */
    name: StringGlideElement;

    /**
     * Parent
     * @type {business_unitElementReference}
     * @memberof Ibusiness_unitColumns
     * @description Reference to table "business_unit"
     */
    parent: business_unitElementReference;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof Ibusiness_unitColumns
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof Ibusiness_unitColumns
     * @default "/"
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;
}

declare type business_unitGlideRecord = GlideRecord & Ibusiness_unitColumns;

declare type business_unitElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Ibusiness_unitColumns, business_unitGlideRecord>;

/**
 * GlideElement values from the Department table.
 * @interface Icmn_departmentColumns
 */
declare interface Icmn_departmentColumns extends IGlideElementColumns {
    /**
     * Business unit
     * @type {business_unitElementReference}
     * @memberof Icmn_departmentColumns
     * @description Reference to table "business_unit"
     */
    business_unit: business_unitElementReference;

    /**
     * Code
     * @type {StringGlideElement}
     * @memberof Icmn_departmentColumns
     * @description Max length: 40
     */
    code: StringGlideElement;

    /**
     * Company
     * @type {core_companyElementReference}
     * @memberof Icmn_departmentColumns
     * @description Reference to table "core_company"
     */
    company: core_companyElementReference;

    /**
     * Cost center
     * @type {cmn_cost_centerElementReference}
     * @memberof Icmn_departmentColumns
     * @description Reference to table "cmn_cost_center"
     */
    cost_center: GlideElementReference;

    /**
     * Department head
     * @type {sys_userElementReference}
     * @memberof Icmn_departmentColumns
     * @description Reference to table "sys_user"
     */
    dept_head: sys_userElementReference;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Icmn_departmentColumns
     * @description Max length: 1000
     */
    description: StringGlideElement;

    /**
     * Head count
     * @type {GlideElementNumeric}
     * @memberof Icmn_departmentColumns
     */
    head_count: GlideElementNumeric;

    /**
     * ID
     * @type {StringGlideElement}
     * @memberof Icmn_departmentColumns
     * @description Max length: 40
     */
    id: StringGlideElement;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Icmn_departmentColumns
     * @description Max length: 100
     */
    name: StringGlideElement;

    /**
     * Parent
     * @type {cmn_departmentElementReference}
     * @memberof Icmn_departmentColumns
     * @description Reference to table "cmn_department"
     */
    parent: cmn_departmentElementReference;

    /**
     * Primary contact
     * @type {sys_userElementReference}
     * @memberof Icmn_departmentColumns
     * @description Reference to table "sys_user"
     */
    primary_contact: sys_userElementReference;
}

declare type cmn_departmentGlideRecord = GlideRecord & Icmn_departmentColumns;

declare type cmn_departmentElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Icmn_departmentColumns, cmn_departmentGlideRecord>;

/**
 * GlideElement values from the Schedule table.
 * @interface Icmn_scheduleColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Icmn_scheduleColumns extends Isys_metadataColumns {
    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Icmn_scheduleColumns
     * @description Max length: 1000
     */
    description: StringGlideElement;

    /**
     * Document
     * @type {StringGlideElement}
     * @memberof Icmn_scheduleColumns
     * @description Max length: 40
     */
    document: StringGlideElement;

    /**
     * Document key
     * @type {StringGlideElement}
     * @memberof Icmn_scheduleColumns
     * @description Max length: 32
     */
    document_key: StringGlideElement;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Icmn_scheduleColumns
     * @description Max length: 80
     */
    name: StringGlideElement;

    /**
     * Parent
     * @type {cmn_scheduleElementReference}
     * @memberof Icmn_scheduleColumns
     * @description Reference to table "cmn_schedule"
     */
    parent: cmn_scheduleElementReference;

    /**
     * Read only
     * @type {GlideElementBoolean}
     * @memberof Icmn_scheduleColumns
     * @default false
     */
    read_only: GlideElementBoolean;

    /**
     * Time zone
     * @type {StringGlideElement}
     * @memberof Icmn_scheduleColumns
     * @description Choices: "NULL_OVERRIDE": "-- Floating --"
     *      Max length: 40
     */
    time_zone: StringGlideElement;

    /**
     * Type
     * @type {StringGlideElement}
     * @memberof Icmn_scheduleColumns
     * @description Max length: 40
     */
    type: StringGlideElement;
}

declare type cmn_scheduleGlideRecord = sys_metadataGlideRecord & Icmn_scheduleColumns;

declare type cmn_scheduleElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Icmn_scheduleColumns, cmn_scheduleGlideRecord>;

/**
 * GlideElement values from the User table.
 * @interface Isys_userColumns
 */
declare interface Isys_userColumns extends IGlideElementColumns {
    /**
     * Accumulated roles
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Max length: 4000
     */
    accumulated_roles: StringGlideElement;

    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof Isys_userColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Work agent status
     * @type {GlideElement}
     * @memberof Isys_userColumns
     * @readonly
     * @description Internal type is "choice"
     *      Choices: "off_work": "Off work"; "on_break": "On break"; "on_site": "On site"; "on_route": "On route"
     */
    agent_status: GlideElement;

    /**
     * Average Daily FTE Hours/Hours Per Person Day
     * @type {GlideElementNumeric}
     * @memberof Isys_userColumns
     * @description Internal type is "decimal"
     */
    average_daily_fte: GlideElementNumeric;

    /**
     * Building
     * @type {cmn_buildingElementReference}
     * @memberof Isys_userColumns
     * @description Reference to table "cmn_building"
     */
    building: cmn_buildingElementReference;

    /**
     * Business impact
     * @type {GlideElementNumeric}
     * @memberof Isys_userColumns
     * @default 3
     * @description Choices: "3": "3 - Non-critical"; "2": "2 - High"; "1": "1 - Critical"
     */
    business_criticality: GlideElementNumeric;

    /**
     * Calendar integration
     * @type {GlideElementNumeric}
     * @memberof Isys_userColumns
     * @default 1
     * @description Choices: "1": "Outlook"
     */
    calendar_integration: GlideElementNumeric;

    /**
     * City
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Max length: 40
     */
    city: StringGlideElement;

    /**
     * Company
     * @type {core_companyElementReference}
     * @memberof Isys_userColumns
     * @description Reference to table "core_company"
     */
    company: core_companyElementReference;

    /**
     * Cost center
     * @type {cmn_cost_centerElementReference}
     * @memberof Isys_userColumns
     * @description Reference to table "cmn_cost_center"
     */
    cost_center: GlideElementReference;

    /**
     * Country code
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Choices: "BR": "Brazil"; "CN": "China"; "FR": "France"; "DE": "Germany"; "IT": "Italy"; "JP": "Japan"; "NULL_OVERRIDE": "javascript:'System (' + GlideLocale.get().getCurrent().getCountry() + ')'"; "ES": "Spain"; "GB": "United Kingdom"; "US": "United States"
     *      Max length: 3
     */
    country: StringGlideElement;

    /**
     * Date format
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Choices: "yyyy-MM-dd": "yyyy-MM-dd"; "dd.MM.yyyy": "dd.MM.yyyy"; "dd-MM-yyyy": "dd-MM-yyyy"; "dd/MM/yyyy": "dd/MM/yyyy"; "MM-dd-yyyy": "MM-dd-yyyy"; "NULL_OVERRIDE": "javascript:\"System (\" + gs.getProperty('glide.sys.date_format') + \")\""
     *      Max length: 40
     */
    date_format: StringGlideElement;

    /**
     * Default perspective
     * @type {sys_perspectiveElementReference}
     * @memberof Isys_userColumns
     * @description Reference to table "sys_perspective"
     */
    default_perspective: GlideElementReference;

    /**
     * Department
     * @type {cmn_departmentElementReference}
     * @memberof Isys_userColumns
     * @description Reference to table "cmn_department"
     */
    department: cmn_departmentElementReference;

    /**
     * Email
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Internal type is "email"
     *      Max length: 100
     */
    email: StringGlideElement;

    /**
     * Employee number
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Max length: 40
     */
    employee_number: StringGlideElement;

    /**
     * Enable Multifactor Authentication
     * @type {GlideElementBoolean}
     * @memberof Isys_userColumns
     * @default false
     */
    enable_multifactor_authn: GlideElementBoolean;

    /**
     * Failed login attempts
     * @type {GlideElementNumeric}
     * @memberof Isys_userColumns
     */
    failed_attempts: GlideElementNumeric;

    /**
     * First name
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Max length: 50
     */
    first_name: StringGlideElement;

    /**
     * Gender
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Choices: "Female": "Female"; "Male": "Male"; "Not Specified": "Not Specified"
     *      Max length: 40
     */
    gender: StringGlideElement;

    /**
     * Geolocation tracked
     * @type {GlideElementBoolean}
     * @memberof Isys_userColumns
     * @default false
     */
    geolocation_tracked: GlideElementBoolean;

    /**
     * Home phone
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Internal type is "ph_number"
     *      Max length: 40
     */
    home_phone: StringGlideElement;

    /**
     * Internal Integration User
     * @type {GlideElementBoolean}
     * @memberof Isys_userColumns
     * @default false
     */
    internal_integration_user: GlideElementBoolean;

    /**
     * Prefix
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Choices: "Dr.": "Dr."; "Mr.": "Mr."; "Mrs.": "Mrs."; "Ms.": "Ms."
     *      Max length: 40
     */
    introduction: StringGlideElement;

    /**
     * Last login
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    last_login: StringGlideElement;

    /**
     * Last login time
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    last_login_time: StringGlideElement;

    /**
     * Last name
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Max length: 50
     */
    last_name: StringGlideElement;

    /**
     * Last position update
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    last_position_update: StringGlideElement;

    /**
     * Latitude
     * @type {GlideElementNumeric}
     * @memberof Isys_userColumns
     * @description Internal type is "float"
     */
    latitude: GlideElementNumeric;

    /**
     * LDAP server
     * @type {ldap_server_configElementReference}
     * @memberof Isys_userColumns
     * @description Reference to table "ldap_server_config"
     */
    ldap_server: GlideElementReference;

    /**
     * Location
     * @type {cmn_locationElementReference}
     * @memberof Isys_userColumns
     * @description Reference to table "cmn_location"
     */
    location: cmn_locationElementReference;

    /**
     * Locked out
     * @type {GlideElementBoolean}
     * @memberof Isys_userColumns
     * @default false
     */
    locked_out: GlideElementBoolean;

    /**
     * Longitude
     * @type {GlideElementNumeric}
     * @memberof Isys_userColumns
     * @description Internal type is "float"
     */
    longitude: GlideElementNumeric;

    /**
     * Manager
     * @type {sys_userElementReference}
     * @memberof Isys_userColumns
     * @description Reference to table "sys_user"
     */
    manager: sys_userElementReference;

    /**
     * Middle name
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Max length: 50
     */
    middle_name: StringGlideElement;

    /**
     * Mobile phone
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Internal type is "ph_number"
     *      Max length: 40
     */
    mobile_phone: StringGlideElement;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Max length: 151
     */
    name: StringGlideElement;

    /**
     * Notification
     * @type {GlideElementNumeric}
     * @memberof Isys_userColumns
     * @default 2
     * @description Choices: "2": "Enable"; "1": "Disable"
     */
    notification: GlideElementNumeric;

    /**
     * On schedule
     * @type {GlideElement}
     * @memberof Isys_userColumns
     * @readonly
     * @description Internal type is "choice"
     *      Choices: "ahead": "Ahead of schedule"; "behind_more60": "Behind schedule, more than an hour"; "behind_30to60": "Behind schedule, between 30 to 60 minutes"; "behind_less30": "Behind schedule, less than 30 minutes"; "on_time": "On time"
     */
    on_schedule: GlideElement;

    /**
     * Password needs reset
     * @type {GlideElementBoolean}
     * @memberof Isys_userColumns
     */
    password_needs_reset: GlideElementBoolean;

    /**
     * Black phone
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Internal type is "ph_number"
     *      Max length: 40
     */
    phone: StringGlideElement;

    /**
     * Photo
     * @type {GlideElementUserImage}
     * @memberof Isys_userColumns
     */
    photo: GlideElementUserImage;

    /**
     * Language
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Choices: "en": "English"; "NULL_OVERRIDE": "javascript:'System (' + new I18nUtils().getUserLanguage() + ')'"
     *      Max length: 3
     */
    preferred_language: StringGlideElement;

    /**
     * Roles
     * @type {GlideElement}
     * @memberof Isys_userColumns
     * @description Internal type is "Array<user_roles>"
     */
    roles: GlideElement;

    /**
     * Schedule
     * @type {cmn_scheduleElementReference}
     * @memberof Isys_userColumns
     * @description Reference to table "cmn_schedule"
     */
    schedule: cmn_scheduleElementReference;

    /**
     * Source
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Max length: 255
     */
    source: StringGlideElement;

    /**
     * State / Province
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Max length: 40
     */
    state: StringGlideElement;

    /**
     * Street
     * @type {GlideElement}
     * @memberof Isys_userColumns
     * @description Internal type is "multi_two_lines"
     */
    street: GlideElement;

    /**
     * Class
     * @type {GlideElementSysClassName}
     * @memberof Isys_userColumns
     * @default "javascript:current.getTableName();"
     */
    sys_class_name: GlideElementSysClassName;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof Isys_userColumns
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof Isys_userColumns
     * @default "/"
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;

    /**
     * Time format
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Choices: "NULL_OVERRIDE": "javascript:\"System (\" + gs.getProperty('glide.sys.time_format') + \")\""; "hh.mm.ss a": "hh.mm.ss (12 hour)"; "hh:mm:ss a": "hh:mm:ss (12 hour)"; "HH.mm.ss": "hh.mm.ss (24 hour)"; "HH:mm:ss": "hh:mm:ss (24 hour)"
     *      Max length: 40
     */
    time_format: StringGlideElement;

    /**
     * Time sheet policy
     * @type {time_sheet_policyElementReference}
     * @memberof Isys_userColumns
     * @description Reference to table "time_sheet_policy"
     */
    time_sheet_policy: GlideElementReference;

    /**
     * Time zone
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Choices: "Zulu": "Zulu"; "WET": "WET"; "W-SU": "W-SU"; "VST": "VST"; "UTC": "UTC"; "US/Samoa": "US/Samoa"; "US/Pacific-New": "US/Pacific-New"; "US/Michigan": "US/Michigan"; "US/Indiana-Starke": "US/Indiana-Starke"; "US/East-Indiana": "US/East-Indiana"; "US/Aleutian": "US/Aleutian"; "US/Alaska": "US/Alaska"; "Universal": "Universal"; "UCT": "UCT"; "Turkey": "Turkey"; "SystemV/YST9YDT": "SystemV/YST9YDT"; "SystemV/YST9": "SystemV/YST9"; "SystemV/PST8PDT": "SystemV/PST8PDT"; "SystemV/PST8": "SystemV/PST8"; "SystemV/MST7MDT": "SystemV/MST7MDT"; "SystemV/MST7": "SystemV/MST7"; "SystemV/HST10": "SystemV/HST10"; "SystemV/EST5EDT": "SystemV/EST5EDT"; "SystemV/EST5": "SystemV/EST5"; "SystemV/CST6CDT": "SystemV/CST6CDT"; "SystemV/CST6": "SystemV/CST6"; "SystemV/AST4ADT": "SystemV/AST4ADT"; "SystemV/AST4": "SystemV/AST4"; "SST": "SST"; "Singapore": "Singapore"; "ROK": "ROK"; "PST8PDT": "PST8PDT"; "PST": "PST"; "PRT": "PRT"; "PRC": "PRC"; "Portugal": "Portugal"; "Poland": "Poland"; "PNT": "PNT"; "PLT": "PLT"; "Pacific/Yap": "Pacific/Yap"; "Pacific/Wallis": "Pacific/Wallis"; "Pacific/Wake": "Pacific/Wake"; "Pacific/Truk": "Pacific/Truk"; "Pacific/Tongatapu": "Pacific/Tongatapu"; "Pacific/Tarawa": "Pacific/Tarawa"; "Pacific/Tahiti": "Pacific/Tahiti"; "Pacific/Samoa": "Pacific/Samoa"; "Pacific/Saipan": "Pacific/Saipan"; "Pacific/Rarotonga": "Pacific/Rarotonga"; "Pacific/Port_Moresby": "Pacific/Port_Moresby"; "Pacific/Ponape": "Pacific/Ponape"; "Pacific/Pitcairn": "Pacific/Pitcairn"; "Pacific/Palau": "Pacific/Palau"; "Pacific/Pago_Pago": "Pacific/Pago_Pago"; "Pacific/Noumea": "Pacific/Noumea"; "Pacific/Norfolk": "Pacific/Norfolk"; "Pacific/Niue": "Pacific/Niue"; "Pacific/Nauru": "Pacific/Nauru"; "Pacific/Midway": "Pacific/Midway"; "Pacific/Marquesas": "Pacific/Marquesas"; "Pacific/Majuro": "Pacific/Majuro"; "Pacific/Kwajalein": "Pacific/Kwajalein"; "Pacific/Kosrae": "Pacific/Kosrae"; "Pacific/Kiritimati": "Pacific/Kiritimati"; "Pacific/Johnston": "Pacific/Johnston"; "Pacific/Honolulu": "Pacific/Honolulu"; "Pacific/Guam": "Pacific/Guam"; "Pacific/Guadalcanal": "Pacific/Guadalcanal"; "Pacific/Gambier": "Pacific/Gambier"; "Pacific/Galapagos": "Pacific/Galapagos"; "Pacific/Funafuti": "Pacific/Funafuti"; "Pacific/Fiji": "Pacific/Fiji"; "Pacific/Fakaofo": "Pacific/Fakaofo"; "Pacific/Enderbury": "Pacific/Enderbury"; "Pacific/Efate": "Pacific/Efate"; "Pacific/Easter": "Pacific/Easter"; "Pacific/Chatham": "Pacific/Chatham"; "Pacific/Auckland": "Pacific/Auckland"; "Pacific/Apia": "Pacific/Apia"; "NZ-CHAT": "NZ-CHAT"; "NZ": "NZ"; "NST": "NST"; "NET": "NET"; "Navajo": "Navajo"; "MST7MDT": "MST7MDT"; "MST": "MST"; "MIT": "MIT"; "Mideast/Riyadh89": "Mideast/Riyadh89"; "Mideast/Riyadh88": "Mideast/Riyadh88"; "Mideast/Riyadh87": "Mideast/Riyadh87"; "Mexico/General": "Mexico/General"; "Mexico/BajaSur": "Mexico/BajaSur"; "Mexico/BajaNorte": "Mexico/BajaNorte"; "MET": "MET"; "Libya": "Libya"; "Kwajalein": "Kwajalein"; "JST": "JST"; "Japan": "Japan"; "Jamaica": "Jamaica"; "IST": "IST"; "Israel": "Israel"; "Iran": "Iran"; "Indian/Reunion": "Indian/Reunion"; "Indian/Mayotte": "Indian/Mayotte"; "Indian/Mauritius": "Indian/Mauritius"; "Indian/Maldives": "Indian/Maldives"; "Indian/Mahe": "Indian/Mahe"; "Indian/Kerguelen": "Indian/Kerguelen"; "Indian/Comoro": "Indian/Comoro"; "Indian/Cocos": "Indian/Cocos"; "Indian/Christmas": "Indian/Christmas"; "Indian/Chagos": "Indian/Chagos"; "Indian/Antananarivo": "Indian/Antananarivo"; "IET": "IET"; "Iceland": "Iceland"; "HST": "HST"; "Greenwich": "Greenwich"; "GMT0": "GMT0"; "GB-Eire": "GB-Eire"; "GB": "GB"; "Europe/Zaporozhye": "Europe/Zaporozhye"; "Europe/Zagreb": "Europe/Zagreb"; "Europe/Warsaw": "Europe/Warsaw"; "Europe/Vilnius": "Europe/Vilnius"; "Europe/Vienna": "Europe/Vienna"; "Europe/Vatican": "Europe/Vatican"; "Europe/Vaduz": "Europe/Vaduz"; "Europe/Uzhgorod": "Europe/Uzhgorod"; "Europe/Tiraspol": "Europe/Tiraspol"; "Europe/Tirane": "Europe/Tirane"; "Europe/Tallinn": "Europe/Tallinn"; "Europe/Sofia": "Europe/Sofia"; "Europe/Skopje": "Europe/Skopje"; "Europe/Simferopol": "Europe/Simferopol"; "Europe/Sarajevo": "Europe/Sarajevo"; "Europe/San_Marino": "Europe/San_Marino"; "Europe/Samara": "Europe/Samara"; "Europe/Riga": "Europe/Riga"; "Europe/Prague": "Europe/Prague"; "Europe/Oslo": "Europe/Oslo"; "Europe/Nicosia": "Europe/Nicosia"; "Europe/Moscow": "Europe/Moscow"; "Europe/Monaco": "Europe/Monaco"; "Europe/Minsk": "Europe/Minsk"; "Europe/Malta": "Europe/Malta"; "Europe/Luxembourg": "Europe/Luxembourg"; "Europe/Ljubljana": "Europe/Ljubljana"; "Europe/Lisbon": "Europe/Lisbon"; "Europe/Kiev": "Europe/Kiev"; "Europe/Kaliningrad": "Europe/Kaliningrad"; "Europe/Istanbul": "Europe/Istanbul"; "Europe/Helsinki": "Europe/Helsinki"; "Europe/Gibraltar": "Europe/Gibraltar"; "Europe/Chisinau": "Europe/Chisinau"; "Europe/Budapest": "Europe/Budapest"; "Europe/Bucharest": "Europe/Bucharest"; "Europe/Bratislava": "Europe/Bratislava"; "Europe/Belgrade": "Europe/Belgrade"; "Europe/Belfast": "Europe/Belfast"; "Europe/Athens": "Europe/Athens"; "Europe/Andorra": "Europe/Andorra"; "Etc/Zulu": "Etc/Zulu"; "Etc/UTC": "Etc/UTC"; "Etc/Universal": "Etc/Universal"; "Etc/UCT": "Etc/UCT"; "Etc/Greenwich": "Etc/Greenwich"; "EST5EDT": "EST5EDT"; "EST": "EST"; "Eire": "Eire"; "Egypt": "Egypt"; "EET": "EET"; "ECT": "ECT"; "EAT": "EAT"; "Cuba": "Cuba"; "CTT": "CTT"; "CST6CDT": "CST6CDT"; "CST": "CST"; "CNT": "CNT"; "Chile/EasterIsland": "Chile/EasterIsland"; "Chile/Continental": "Chile/Continental"; "CET": "CET"; "CAT": "CAT"; "Canada/Yukon": "Canada/Yukon"; "Canada/Saskatchewan": "Canada/Saskatchewan"; "Canada/Newfoundland": "Canada/Newfoundland"; "Canada/East-Saskatchewan": "Canada/East-Saskatchewan"; "BST": "BST"; "Brazil/West": "Brazil/West"; "Brazil/East": "Brazil/East"; "Brazil/DeNoronha": "Brazil/DeNoronha"; "Brazil/Acre": "Brazil/Acre"; "BET": "BET"; "Australia/Yancowinna": "Australia/Yancowinna"; "Australia/West": "Australia/West"; "Australia/Victoria": "Australia/Victoria"; "Australia/Tasmania": "Australia/Tasmania"; "Australia/Sydney": "Australia/Sydney"; "Australia/South": "Australia/South"; "Australia/Queensland": "Australia/Queensland"; "Australia/Perth": "Australia/Perth"; "Australia/NSW": "Australia/NSW"; "Australia/North": "Australia/North"; "Australia/Melbourne": "Australia/Melbourne"; "Australia/Lord_Howe": "Australia/Lord_Howe"; "Australia/Lindeman": "Australia/Lindeman"; "Australia/LHI": "Australia/LHI"; "Australia/Hobart": "Australia/Hobart"; "Australia/Darwin": "Australia/Darwin"; "Australia/Canberra": "Australia/Canberra"; "Australia/Broken_Hill": "Australia/Broken_Hill"; "Australia/Brisbane": "Australia/Brisbane"; "Australia/Adelaide": "Australia/Adelaide"; "Australia/ACT": "Australia/ACT"; "Atlantic/St_Helena": "Atlantic/St_Helena"; "Atlantic/Stanley": "Atlantic/Stanley"; "Atlantic/South_Georgia": "Atlantic/South_Georgia"; "Atlantic/Reykjavik": "Atlantic/Reykjavik"; "Atlantic/Madeira": "Atlantic/Madeira"; "Atlantic/Jan_Mayen": "Atlantic/Jan_Mayen"; "Atlantic/Faeroe": "Atlantic/Faeroe"; "Atlantic/Cape_Verde": "Atlantic/Cape_Verde"; "Atlantic/Canary": "Atlantic/Canary"; "Atlantic/Bermuda": "Atlantic/Bermuda"; "Atlantic/Azores": "Atlantic/Azores"; "AST": "AST"; "Asia/Yerevan": "Asia/Yerevan"; "Asia/Yekaterinburg": "Asia/Yekaterinburg"; "Asia/Yakutsk": "Asia/Yakutsk"; "Asia/Vladivostok": "Asia/Vladivostok"; "Asia/Vientiane": "Asia/Vientiane"; "Asia/Urumqi": "Asia/Urumqi"; "Asia/Ulan_Bator": "Asia/Ulan_Bator"; "Asia/Ulaanbaatar": "Asia/Ulaanbaatar"; "Asia/Ujung_Pandang": "Asia/Ujung_Pandang"; "Asia/Tokyo": "Asia/Tokyo"; "Asia/Thimphu": "Asia/Thimphu"; "Asia/Thimbu": "Asia/Thimbu"; "Asia/Tel_Aviv": "Asia/Tel_Aviv"; "Asia/Tehran": "Asia/Tehran"; "Asia/Tbilisi": "Asia/Tbilisi"; "Asia/Tashkent": "Asia/Tashkent"; "Asia/Taipei": "Asia/Taipei"; "Asia/Singapore": "Asia/Singapore"; "Asia/Shanghai": "Asia/Shanghai"; "Asia/Seoul": "Asia/Seoul"; "Asia/Samarkand": "Asia/Samarkand"; "Asia/Sakhalin": "Asia/Sakhalin"; "Asia/Saigon": "Asia/Saigon"; "Asia/Riyadh89": "Asia/Riyadh89"; "Asia/Riyadh88": "Asia/Riyadh88"; "Asia/Riyadh87": "Asia/Riyadh87"; "Asia/Riyadh": "Asia/Riyadh"; "Asia/Rangoon": "Asia/Rangoon"; "Asia/Qyzylorda": "Asia/Qyzylorda"; "Asia/Qatar": "Asia/Qatar"; "Asia/Pyongyang": "Asia/Pyongyang"; "Asia/Pontianak": "Asia/Pontianak"; "Asia/Phnom_Penh": "Asia/Phnom_Penh"; "Asia/Oral": "Asia/Oral"; "Asia/Omsk": "Asia/Omsk"; "Asia/Novosibirsk": "Asia/Novosibirsk"; "Asia/Nicosia": "Asia/Nicosia"; "Asia/Muscat": "Asia/Muscat"; "Asia/Manila": "Asia/Manila"; "Asia/Makassar": "Asia/Makassar"; "Asia/Magadan": "Asia/Magadan"; "Asia/Macau": "Asia/Macau"; "Asia/Macao": "Asia/Macao"; "Asia/Kuwait": "Asia/Kuwait"; "Asia/Kuching": "Asia/Kuching"; "Asia/Kuala_Lumpur": "Asia/Kuala_Lumpur"; "Asia/Krasnoyarsk": "Asia/Krasnoyarsk"; "Asia/Katmandu": "Asia/Katmandu"; "Asia/Kashgar": "Asia/Kashgar"; "Asia/Karachi": "Asia/Karachi"; "Asia/Kamchatka": "Asia/Kamchatka"; "Asia/Kabul": "Asia/Kabul"; "Asia/Jerusalem": "Asia/Jerusalem"; "Asia/Jayapura": "Asia/Jayapura"; "Asia/Jakarta": "Asia/Jakarta"; "Asia/Istanbul": "Asia/Istanbul"; "Asia/Irkutsk": "Asia/Irkutsk"; "Asia/Hovd": "Asia/Hovd"; "Asia/Hong_Kong": "Asia/Hong_Kong"; "Asia/Harbin": "Asia/Harbin"; "Asia/Gaza": "Asia/Gaza"; "Asia/Dushanbe": "Asia/Dushanbe"; "Asia/Dubai": "Asia/Dubai"; "Asia/Dili": "Asia/Dili"; "Asia/Dhaka": "Asia/Dhaka"; "Asia/Damascus": "Asia/Damascus"; "Asia/Dacca": "Asia/Dacca"; "Asia/Colombo": "Asia/Colombo"; "Asia/Chungking": "Asia/Chungking"; "Asia/Chongqing": "Asia/Chongqing"; "Asia/Choibalsan": "Asia/Choibalsan"; "Asia/Brunei": "Asia/Brunei"; "Asia/Bishkek": "Asia/Bishkek"; "Asia/Beirut": "Asia/Beirut"; "Asia/Bangkok": "Asia/Bangkok"; "Asia/Baku": "Asia/Baku"; "Asia/Bahrain": "Asia/Bahrain"; "Asia/Baghdad": "Asia/Baghdad"; "Asia/Ashkhabad": "Asia/Ashkhabad"; "Asia/Ashgabat": "Asia/Ashgabat"; "Asia/Aqtobe": "Asia/Aqtobe"; "Asia/Aqtau": "Asia/Aqtau"; "Asia/Anadyr": "Asia/Anadyr"; "Asia/Amman": "Asia/Amman"; "Asia/Almaty": "Asia/Almaty"; "Asia/Aden": "Asia/Aden"; "ART": "ART"; "Arctic/Longyearbyen": "Arctic/Longyearbyen"; "Antarctica/Vostok": "Antarctica/Vostok"; "Antarctica/Syowa": "Antarctica/Syowa"; "Antarctica/South_Pole": "Antarctica/South_Pole"; "Antarctica/Palmer": "Antarctica/Palmer"; "Antarctica/McMurdo": "Antarctica/McMurdo"; "Antarctica/Mawson": "Antarctica/Mawson"; "Antarctica/DumontDUrville": "Antarctica/DumontDUrville"; "Antarctica/Davis": "Antarctica/Davis"; "Antarctica/Casey": "Antarctica/Casey"; "America/Yellowknife": "America/Yellowknife"; "America/Yakutat": "America/Yakutat"; "America/Winnipeg": "America/Winnipeg"; "America/Whitehorse": "America/Whitehorse"; "America/Virgin": "America/Virgin"; "America/Vancouver": "America/Vancouver"; "America/Tortola": "America/Tortola"; "America/Tijuana": "America/Tijuana"; "America/Thunder_Bay": "America/Thunder_Bay"; "America/Thule": "America/Thule"; "America/Tegucigalpa": "America/Tegucigalpa"; "America/Swift_Current": "America/Swift_Current"; "America/St_Vincent": "America/St_Vincent"; "America/St_Thomas": "America/St_Thomas"; "America/St_Lucia": "America/St_Lucia"; "America/St_Kitts": "America/St_Kitts"; "America/St_Johns": "America/St_Johns"; "America/Shiprock": "America/Shiprock"; "America/Scoresbysund": "America/Scoresbysund"; "America/Sao_Paulo": "America/Sao_Paulo"; "America/Santo_Domingo": "America/Santo_Domingo"; "America/Santiago": "America/Santiago"; "America/Rosario": "America/Rosario"; "America/Rio_Branco": "America/Rio_Branco"; "America/Regina": "America/Regina"; "America/Recife": "America/Recife"; "America/Rankin_Inlet": "America/Rankin_Inlet"; "America/Rainy_River": "America/Rainy_River"; "America/Puerto_Rico": "America/Puerto_Rico"; "America/Port_of_Spain": "America/Port_of_Spain"; "America/Porto_Velho": "America/Porto_Velho"; "America/Porto_Acre": "America/Porto_Acre"; "America/Port-au-Prince": "America/Port-au-Prince"; "America/Phoenix": "America/Phoenix"; "America/Paramaribo": "America/Paramaribo"; "America/Pangnirtung": "America/Pangnirtung"; "America/Panama": "America/Panama"; "America/North_Dakota/Center": "America/North_Dakota/Center"; "America/Noronha": "America/Noronha"; "America/Nome": "America/Nome"; "America/Nipigon": "America/Nipigon"; "America/New_York": "America/New_York"; "America/Nassau": "America/Nassau"; "America/Montserrat": "America/Montserrat"; "America/Montreal": "America/Montreal"; "America/Montevideo": "America/Montevideo"; "America/Monterrey": "America/Monterrey"; "America/Miquelon": "America/Miquelon"; "America/Mexico_City": "America/Mexico_City"; "America/Merida": "America/Merida"; "America/Menominee": "America/Menominee"; "America/Mendoza": "America/Mendoza"; "America/Mazatlan": "America/Mazatlan"; "America/Martinique": "America/Martinique"; "America/Manaus": "America/Manaus"; "America/Managua": "America/Managua"; "America/Maceio": "America/Maceio"; "America/Louisville": "America/Louisville"; "America/Los_Angeles": "America/Los_Angeles"; "America/Lima": "America/Lima"; "America/La_Paz": "America/La_Paz"; "America/Knox_IN": "America/Knox_IN"; "America/Kentucky/Monticello": "America/Kentucky/Monticello"; "America/Kentucky/Louisville": "America/Kentucky/Louisville"; "America/Juneau": "America/Juneau"; "America/Jujuy": "America/Jujuy"; "America/Jamaica": "America/Jamaica"; "America/Iqaluit": "America/Iqaluit"; "America/Inuvik": "America/Inuvik"; "America/Indianapolis": "America/Indianapolis"; "America/Indiana/Vevay": "America/Indiana/Vevay"; "America/Indiana/Marengo": "America/Indiana/Marengo"; "America/Indiana/Knox": "America/Indiana/Knox"; "America/Indiana/Indianapolis": "America/Indiana/Indianapolis"; "America/Hermosillo": "America/Hermosillo"; "America/Havana": "America/Havana"; "America/Halifax": "America/Halifax"; "America/Guyana": "America/Guyana"; "America/Guayaquil": "America/Guayaquil"; "America/Guatemala": "America/Guatemala"; "America/Guadeloupe": "America/Guadeloupe"; "America/Grenada": "America/Grenada"; "America/Grand_Turk": "America/Grand_Turk"; "America/Goose_Bay": "America/Goose_Bay"; "America/Godthab": "America/Godthab"; "America/Glace_Bay": "America/Glace_Bay"; "America/Fort_Wayne": "America/Fort_Wayne"; "America/Fortaleza": "America/Fortaleza"; "America/Ensenada": "America/Ensenada"; "America/El_Salvador": "America/El_Salvador"; "America/Eirunepe": "America/Eirunepe"; "America/Edmonton": "America/Edmonton"; "America/Dominica": "America/Dominica"; "America/Detroit": "America/Detroit"; "America/Denver": "America/Denver"; "America/Dawson_Creek": "America/Dawson_Creek"; "America/Dawson": "America/Dawson"; "America/Danmarkshavn": "America/Danmarkshavn"; "America/Curacao": "America/Curacao"; "America/Cuiaba": "America/Cuiaba"; "America/Costa_Rica": "America/Costa_Rica"; "America/Cordoba": "America/Cordoba"; "America/Chihuahua": "America/Chihuahua"; "America/Chicago": "America/Chicago"; "America/Cayman": "America/Cayman"; "America/Cayenne": "America/Cayenne"; "America/Catamarca": "America/Catamarca"; "America/Caracas": "America/Caracas"; "America/Cancun": "America/Cancun"; "America/Cambridge_Bay": "America/Cambridge_Bay"; "America/Buenos_Aires": "America/Buenos_Aires"; "America/Boise": "America/Boise"; "America/Bogota": "America/Bogota"; "America/Boa_Vista": "America/Boa_Vista"; "America/Belize": "America/Belize"; "America/Belem": "America/Belem"; "America/Barbados": "America/Barbados"; "America/Atka": "America/Atka"; "America/Asuncion": "America/Asuncion"; "America/Aruba": "America/Aruba"; "America/Araguaina": "America/Araguaina"; "America/Antigua": "America/Antigua"; "America/Anguilla": "America/Anguilla"; "America/Anchorage": "America/Anchorage"; "America/Adak": "America/Adak"; "AGT": "AGT"; "Africa/Windhoek": "Africa/Windhoek"; "Africa/Tunis": "Africa/Tunis"; "Africa/Tripoli": "Africa/Tripoli"; "Africa/Timbuktu": "Africa/Timbuktu"; "Africa/Sao_Tome": "Africa/Sao_Tome"; "Africa/Porto-Novo": "Africa/Porto-Novo"; "Africa/Ouagadougou": "Africa/Ouagadougou"; "Africa/Nouakchott": "Africa/Nouakchott"; "Africa/Niamey": "Africa/Niamey"; "Africa/Ndjamena": "Africa/Ndjamena"; "Africa/Nairobi": "Africa/Nairobi"; "Africa/Monrovia": "Africa/Monrovia"; "Africa/Mogadishu": "Africa/Mogadishu"; "Africa/Mbabane": "Africa/Mbabane"; "Africa/Maseru": "Africa/Maseru"; "Africa/Maputo": "Africa/Maputo"; "Africa/Malabo": "Africa/Malabo"; "Africa/Lusaka": "Africa/Lusaka"; "Africa/Lubumbashi": "Africa/Lubumbashi"; "Africa/Luanda": "Africa/Luanda"; "Africa/Lome": "Africa/Lome"; "Africa/Libreville": "Africa/Libreville"; "Africa/Lagos": "Africa/Lagos"; "Africa/Kinshasa": "Africa/Kinshasa"; "Africa/Kigali": "Africa/Kigali"; "Africa/Khartoum": "Africa/Khartoum"; "Africa/Kampala": "Africa/Kampala"; "Africa/Johannesburg": "Africa/Johannesburg"; "Africa/Harare": "Africa/Harare"; "Asia/Kolkata": "Asia/Kolkata"; "Africa/Gaborone": "Africa/Gaborone"; "US/Pacific": "US/Pacific"; "Africa/Freetown": "Africa/Freetown"; "US/Mountain": "US/Mountain"; "Africa/El_Aaiun": "Africa/El_Aaiun"; "US/Hawaii": "US/Hawaii"; "Africa/Douala": "Africa/Douala"; "US/Eastern": "US/Eastern"; "Africa/Djibouti": "Africa/Djibouti"; "US/Central": "US/Central"; "Africa/Dar_es_Salaam": "Africa/Dar_es_Salaam"; "US/Arizona": "US/Arizona"; "Africa/Dakar": "Africa/Dakar"; "Hongkong": "Hongkong"; "Africa/Conakry": "Africa/Conakry"; "GMT": "GMT"; "Africa/Ceuta": "Africa/Ceuta"; "Europe/Zurich": "Europe/Zurich"; "Africa/Casablanca": "Africa/Casablanca"; "Europe/Stockholm": "Europe/Stockholm"; "Africa/Cairo": "Africa/Cairo"; "Europe/Rome": "Europe/Rome"; "Africa/Bujumbura": "Africa/Bujumbura"; "Europe/Paris": "Europe/Paris"; "Africa/Brazzaville": "Africa/Brazzaville"; "Europe/Madrid": "Europe/Madrid"; "Africa/Blantyre": "Africa/Blantyre"; "Europe/London": "Europe/London"; "Africa/Bissau": "Africa/Bissau"; "Europe/Dublin": "Europe/Dublin"; "Africa/Banjul": "Africa/Banjul"; "Europe/Copenhagen": "Europe/Copenhagen"; "Africa/Bangui": "Africa/Bangui"; "Europe/Brussels": "Europe/Brussels"; "Africa/Bamako": "Africa/Bamako"; "Europe/Berlin": "Europe/Berlin"; "Africa/Asmera": "Africa/Asmera"; "Europe/Amsterdam": "Europe/Amsterdam"; "Africa/Algiers": "Africa/Algiers"; "Canada/Pacific": "Canada/Pacific"; "Africa/Addis_Ababa": "Africa/Addis_Ababa"; "Canada/Mountain": "Canada/Mountain"; "Africa/Accra": "Africa/Accra"; "Canada/Eastern": "Canada/Eastern"; "Africa/Abidjan": "Africa/Abidjan"; "Canada/Central": "Canada/Central"; "AET": "AET"; "Canada/Atlantic": "Canada/Atlantic"; "ACT": "ACT"; "NULL_OVERRIDE": "javascript:\"System (\" + gs.getSysTimeZone() + \")\""
     *      Max length: 40
     */
    time_zone: StringGlideElement;

    /**
     * Title
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Choices: "Administrative Assistant": "Administrative Assistant"; "Chief Executive Officer": "Chief Executive Officer"; "Chief Financial Officer": "Chief Financial Officer"; "Chief Technology Officer": "Chief Technology Officer"; "Director": "Director"; "IT Technician": "IT Technician"; "Junior Developer": "Junior Developer"; "Sales Executive": "Sales Executive"; "Senior Developer": "Senior Developer"; "Solution Consultant": "Solution Consultant"; "System Administrator": "System Administrator"; "Vice President": "Vice President"
     *      Max length: 60
     */
    title: StringGlideElement;

    /**
     * User ID
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Max length: 40
     */
    user_name: StringGlideElement;

    /**
     * Password
     * @type {GlideElementPassword}
     * @memberof Isys_userColumns
     */
    user_password: GlideElement;

    /**
     * Grey Phone
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Max length: 40
     */
    u_grey_phone: StringGlideElement;

    /**
     * Rank
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Max length: 40
     */
    u_rank: StringGlideElement;

    /**
     * Red Phone
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Max length: 40
     */
    u_red_phone: StringGlideElement;

    /**
     * VIP
     * @type {GlideElementBoolean}
     * @memberof Isys_userColumns
     * @default false
     */
    vip: GlideElementBoolean;

    /**
     * Web service access only
     * @type {GlideElementBoolean}
     * @memberof Isys_userColumns
     * @default false
     */
    web_service_access_only: GlideElementBoolean;

    /**
     * Zip / Postal code
     * @type {StringGlideElement}
     * @memberof Isys_userColumns
     * @description Max length: 40
     */
    zip: StringGlideElement;
}

declare type sys_userGlideRecord = GlideRecord & Isys_userColumns;

declare type sys_userElementReference = GlidePropertiesElementReference<Isys_userColumns, sys_userGlideRecord>;

/**
 * GlideElement values from the Group table.
 * @interface Isys_user_groupColumns
 */
declare interface Isys_user_groupColumns extends IGlideElementColumns {
    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof Isys_user_groupColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Average Daily FTE Hours/Hours Per Person Day
     * @type {GlideElementNumeric}
     * @memberof Isys_user_groupColumns
     * @description Internal type is "decimal"
     */
    average_daily_fte: GlideElementNumeric;

    /**
     * Cost center
     * @type {cmn_cost_centerElementReference}
     * @memberof Isys_user_groupColumns
     * @description Reference to table "cmn_cost_center"
     */
    cost_center: GlideElementReference;

    /**
     * Default assignee
     * @type {sys_userElementReference}
     * @memberof Isys_user_groupColumns
     * @description Reference to table "sys_user"
     */
    default_assignee: sys_userElementReference;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Isys_user_groupColumns
     * @description Max length: 1000
     */
    description: StringGlideElement;

    /**
     * Group email
     * @type {StringGlideElement}
     * @memberof Isys_user_groupColumns
     * @description Internal type is "email"
     *      Max length: 100
     */
    email: StringGlideElement;

    /**
     * Exclude manager
     * @type {GlideElementBoolean}
     * @memberof Isys_user_groupColumns
     */
    exclude_manager: GlideElementBoolean;

    /**
     * Hourly rate
     * @type {GlideElementNumeric}
     * @memberof Isys_user_groupColumns
     * @default 0
     * @description Internal type is "currency"
     */
    hourly_rate: GlideElementNumeric;

    /**
     * Include members
     * @type {GlideElementBoolean}
     * @memberof Isys_user_groupColumns
     */
    include_members: GlideElementBoolean;

    /**
     * Manager
     * @type {sys_userElementReference}
     * @memberof Isys_user_groupColumns
     * @description Reference to table "sys_user"
     */
    manager: sys_userElementReference;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Isys_user_groupColumns
     * @description Max length: 80
     */
    name: StringGlideElement;

    /**
     * Parent
     * @type {sys_user_groupElementReference}
     * @memberof Isys_user_groupColumns
     * @description Reference to table "sys_user_group"
     */
    parent: sys_user_groupElementReference;

    /**
     * Points
     * @type {GlideElementNumeric}
     * @memberof Isys_user_groupColumns
     * @default 0
     */
    points: GlideElementNumeric;

    /**
     * Roles
     * @type {GlideElement}
     * @memberof Isys_user_groupColumns
     * @description Internal type is "Array<user_roles>"
     */
    roles: GlideElement;

    /**
     * Source
     * @type {StringGlideElement}
     * @memberof Isys_user_groupColumns
     * @description Max length: 255
     */
    source: StringGlideElement;

    /**
     * Type
     * @type {GlideElement}
     * @memberof Isys_user_groupColumns
     * @description Internal type is "glide_list"
     */
    type: GlideElement;

    /**
     * Vendors
     * @type {GlideElement}
     * @memberof Isys_user_groupColumns
     * @description Internal type is "glide_list"
     */
    vendors: GlideElement;
}

declare type sys_user_groupGlideRecord = GlideRecord & Isys_user_groupColumns;

declare type sys_user_groupElementReference = GlidePropertiesElementReference<Isys_user_groupColumns, sys_user_groupGlideRecord>;

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

/**
 * GlideElement values from the Calendar table.
 * @interface Isys_calendarColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isys_calendarColumns extends Isys_metadataColumns {
    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Isys_calendarColumns
     * @description Max length: 40
     */
    name: StringGlideElement;
}

declare type sys_calendarGlideRecord = sys_metadataGlideRecord & Isys_calendarColumns;

declare type sys_calendarElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isys_calendarColumns, sys_calendarGlideRecord>;

/**
 * GlideElement values from the Execution Plan table.
 * @interface Isc_cat_item_delivery_planColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isc_cat_item_delivery_planColumns extends Isys_metadataColumns {
    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_item_delivery_planColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Advanced
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_item_delivery_planColumns
     * @default false
     */
    advanced: GlideElementBoolean;

    /**
     * On Calendar
     * @type {sys_calendarElementReference}
     * @memberof Isc_cat_item_delivery_planColumns
     * @description Reference to table "sys_calendar"
     */
    calendar: sys_calendarElementReference;

    /**
     * Conditions
     * @type {GlideElementConditions}
     * @memberof Isc_cat_item_delivery_planColumns
     */
    condition: GlideElementConditions;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Isc_cat_item_delivery_planColumns
     * @description Max length: 100
     */
    name: StringGlideElement;

    /**
     * Order
     * @type {GlideElementNumeric}
     * @memberof Isc_cat_item_delivery_planColumns
     * @default 100
     */
    order: GlideElementNumeric;

    /**
     * Parent table
     * @type {StringGlideElement}
     * @memberof Isc_cat_item_delivery_planColumns
     * @default "sc_req_item"
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    parent_table: StringGlideElement;

    /**
     * Script
     * @type {StringGlideElement}
     * @memberof Isc_cat_item_delivery_planColumns
     * @description Max length: 8000
     */
    script: StringGlideElement;

    /**
     * Short description
     * @type {StringGlideElement}
     * @memberof Isc_cat_item_delivery_planColumns
     * @description Max length: 120
     */
    short_description: StringGlideElement;

    /**
     * Task table
     * @type {StringGlideElement}
     * @memberof Isc_cat_item_delivery_planColumns
     * @default "sc_task"
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    task_table: StringGlideElement;

    /**
     * Total delivery time
     * @type {StringGlideElement}
     * @memberof Isc_cat_item_delivery_planColumns
     * @description Internal type is "glide_duration"
     *      Max length: 40
     */
    total_delivery_time: StringGlideElement;
}

declare type sc_cat_item_delivery_planGlideRecord = sys_metadataGlideRecord & Isc_cat_item_delivery_planColumns;

declare type sc_cat_item_delivery_planElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isc_cat_item_delivery_planColumns, sc_cat_item_delivery_planGlideRecord>;

/**
 * GlideElement values from the Rule table.
 * @interface IsysruleColumns
 * @extends {Isys_metadataColumns}
 */
declare interface IsysruleColumns extends Isys_metadataColumns {
    /**
     * Description
     * @type {StringGlideElement}
     * @memberof IsysruleColumns
     * @description Max length: 4000
     */
    description: StringGlideElement;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof IsysruleColumns
     * @description Max length: 40
     */
    name: StringGlideElement;

    /**
     * Execution Order
     * @type {GlideElementNumeric}
     * @memberof IsysruleColumns
     * @default 100
     */
    order: GlideElementNumeric;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof IsysruleColumns
     * @default "global"
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof IsysruleColumns
     * @default "/"
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;

    /**
     * Overrides
     * @type {sysruleElementReference}
     * @memberof IsysruleColumns
     * @description Reference to table "sysrule"
     */
    sys_overrides: sysruleElementReference;
}

declare type sysruleGlideRecord = sys_metadataGlideRecord & IsysruleColumns;

declare type sysruleElementReference = sys_metadataElementReference & GlidePropertiesElementReference<IsysruleColumns, sysruleGlideRecord>;

/**
 * GlideElement values from the Service Level Agreement table.
 * @interface Isysrule_escalateColumns
 * @extends {IsysruleColumns}
 */
declare interface Isysrule_escalateColumns extends IsysruleColumns {
    /**
     * Advanced condition
     * @type {GlideElementScript}
     * @memberof Isysrule_escalateColumns
     */
    advanced_condition: GlideElementScript;

    /**
     * Assignment script
     * @type {GlideElementScript}
     * @memberof Isysrule_escalateColumns
     */
    assignment_script: GlideElementScript;

    /**
     * Calendar
     * @type {sys_calendarElementReference}
     * @memberof Isysrule_escalateColumns
     * @description Reference to table "sys_calendar"
     */
    calendar: sys_calendarElementReference;

    /**
     * Conditions
     * @type {GlideElementConditions}
     * @memberof Isysrule_escalateColumns
     */
    condition: GlideElementConditions;

    /**
     * Pause Conditions
     * @type {GlideElementConditions}
     * @memberof Isysrule_escalateColumns
     */
    pause_condition: GlideElementConditions;

    /**
     * Reset Conditions
     * @type {GlideElementConditions}
     * @memberof Isysrule_escalateColumns
     */
    reset_condition: GlideElementConditions;

    /**
     * Table
     * @type {StringGlideElement}
     * @memberof Isysrule_escalateColumns
     * @default "incident"
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    table: StringGlideElement;

    /**
     * Threshold
     * @type {StringGlideElement}
     * @memberof Isysrule_escalateColumns
     * @description Internal type is "glide_duration"
     *      Max length: 40
     */
    threshold: StringGlideElement;
}

declare type sysrule_escalateGlideRecord = sysruleGlideRecord & Isysrule_escalateColumns;

declare type sysrule_escalateElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isysrule_escalateColumns, sysrule_escalateGlideRecord>;

/**
 * GlideElement values from the Execution Plan Task table.
 * @interface Isc_cat_item_delivery_taskColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isc_cat_item_delivery_taskColumns extends Isys_metadataColumns {
    /**
     * Assigned to
     * @type {sys_userElementReference}
     * @memberof Isc_cat_item_delivery_taskColumns
     * @description Reference to table "sys_user"
     */
    assigned_to: sys_userElementReference;

    /**
     * Condition
     * @type {GlideElementConditions}
     * @memberof Isc_cat_item_delivery_taskColumns
     */
    condition: GlideElementConditions;

    /**
     * Condition script
     * @type {GlideElement}
     * @memberof Isc_cat_item_delivery_taskColumns
     * @description Internal type is "script_plain"
     */
    condition_script: GlideElement;

    /**
     * Delivery plan
     * @type {sc_cat_item_delivery_planElementReference}
     * @memberof Isc_cat_item_delivery_taskColumns
     * @description Reference to table "sc_cat_item_delivery_plan"
     */
    delivery_plan: sc_cat_item_delivery_planElementReference;

    /**
     * Delivery time
     * @type {StringGlideElement}
     * @memberof Isc_cat_item_delivery_taskColumns
     * @description Internal type is "glide_duration"
     *      Max length: 40
     */
    delivery_time: StringGlideElement;

    /**
     * Generation script
     * @type {GlideElement}
     * @memberof Isc_cat_item_delivery_taskColumns
     * @description Internal type is "script_plain"
     */
    generation_script: GlideElement;

    /**
     * Fulfillment group
     * @type {sys_user_groupElementReference}
     * @memberof Isc_cat_item_delivery_taskColumns
     * @description Reference to table "sys_user_group"
     */
    group: sys_user_groupElementReference;

    /**
     * Instructions
     * @type {StringGlideElement}
     * @memberof Isc_cat_item_delivery_taskColumns
     * @description Max length: 4000
     */
    instructions: StringGlideElement;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Isc_cat_item_delivery_taskColumns
     * @description Max length: 100
     */
    name: StringGlideElement;

    /**
     * Order
     * @type {GlideElementNumeric}
     * @memberof Isc_cat_item_delivery_taskColumns
     * @default 100
     * @description Internal type is "decimal"
     */
    order: GlideElementNumeric;

    /**
     * Short description
     * @type {StringGlideElement}
     * @memberof Isc_cat_item_delivery_taskColumns
     * @description Max length: 120
     */
    short_description: StringGlideElement;

    /**
     * SLA
     * @type {sysrule_escalateElementReference}
     * @memberof Isc_cat_item_delivery_taskColumns
     * @description Reference to table "sysrule_escalate"
     */
    sla: sysrule_escalateElementReference;

    /**
     * Work notes
     * @type {StringGlideElement}
     * @memberof Isc_cat_item_delivery_taskColumns
     * @description Max length: 4000
     */
    work_notes: StringGlideElement;
}

declare type sc_cat_item_delivery_taskGlideRecord = sys_metadataGlideRecord & Isc_cat_item_delivery_taskColumns;

declare type sc_cat_item_delivery_taskElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isc_cat_item_delivery_taskColumns, sc_cat_item_delivery_taskGlideRecord>;

/**
 * GlideElement values from the Template table.
 * @interface Isys_templateColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isys_templateColumns extends Isys_metadataColumns {
    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof Isys_templateColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Global
     * @type {GlideElementBoolean}
     * @memberof Isys_templateColumns
     * @default false
     */
    global: GlideElementBoolean;

    /**
     * Group
     * @type {sys_user_groupElementReference}
     * @memberof Isys_templateColumns
     * @description Reference to table "sys_user_group"
     */
    group: sys_user_groupElementReference;

    /**
     * Link element
     * @type {StringGlideElement}
     * @memberof Isys_templateColumns
     * @description Internal type is "field_name"
     *      Max length: 80
     */
    link_element: StringGlideElement;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Isys_templateColumns
     * @default "javascript:getNextObjNumberPadded();"
     * @description Max length: 40
     */
    name: StringGlideElement;

    /**
     * Next Related Template
     * @type {sys_templateElementReference}
     * @memberof Isys_templateColumns
     * @description Reference to table "sys_template"
     */
    next: sys_templateElementReference;

    /**
     * Next Related Child Template
     * @type {sys_templateElementReference}
     * @memberof Isys_templateColumns
     * @description Reference to table "sys_template"
     */
    next_child: sys_templateElementReference;

    /**
     * Roles
     * @type {GlideElement}
     * @memberof Isys_templateColumns
     * @description Internal type is "Array<user_roles>"
     */
    roles: GlideElement;

    /**
     * Short description
     * @type {StringGlideElement}
     * @memberof Isys_templateColumns
     * @description Max length: 100
     */
    short_description: StringGlideElement;

    /**
     * Show on template bar
     * @type {GlideElementBoolean}
     * @memberof Isys_templateColumns
     * @default true
     */
    show_on_template_bar: GlideElementBoolean;

    /**
     * Stand alone
     * @type {GlideElementBoolean}
     * @memberof Isys_templateColumns
     * @default false
     */
    stand_alone: GlideElementBoolean;

    /**
     * Table
     * @type {StringGlideElement}
     * @memberof Isys_templateColumns
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    table: StringGlideElement;

    /**
     * Template
     * @type {GlideElement}
     * @memberof Isys_templateColumns
     * @description Internal type is "template_value"
     */
    template: GlideElement;

    /**
     * User
     * @type {sys_userElementReference}
     * @memberof Isys_templateColumns
     * @default "javascript:gs.getUserID();"
     * @description Reference to table "sys_user"
     */
    user: sys_userElementReference;

    /**
     * View
     * @type {StringGlideElement}
     * @memberof Isys_templateColumns
     * @description Max length: 40
     */
    view: StringGlideElement;
}

declare type sys_templateGlideRecord = sys_metadataGlideRecord & Isys_templateColumns;

declare type sys_templateElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isys_templateColumns, sys_templateGlideRecord>;

/**
 * GlideElement values from the Event Registration table.
 * @interface Isysevent_registerColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isysevent_registerColumns extends Isys_metadataColumns {
    /**
     * Caller Access
     * @type {StringGlideElement}
     * @memberof Isysevent_registerColumns
     * @description Choices: "2": "Caller Restriction"; "1": "Caller Tracking"
     *      Max length: 40
     */
    caller_access: StringGlideElement;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Isysevent_registerColumns
     * @description Max length: 100
     */
    description: StringGlideElement;

    /**
     * Event name
     * @type {StringGlideElement}
     * @memberof Isysevent_registerColumns
     * @description Max length: 40
     */
    event_name: StringGlideElement;

    /**
     * Fired by
     * @type {StringGlideElement}
     * @memberof Isysevent_registerColumns
     * @description Max length: 100
     */
    fired_by: StringGlideElement;

    /**
     * Queue
     * @type {StringGlideElement}
     * @memberof Isysevent_registerColumns
     * @description Max length: 40
     */
    queue: StringGlideElement;

    /**
     * Suffix
     * @type {StringGlideElement}
     * @memberof Isysevent_registerColumns
     * @description Max length: 40
     */
    suffix: StringGlideElement;

    /**
     * Table
     * @type {StringGlideElement}
     * @memberof Isysevent_registerColumns
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    table: StringGlideElement;
}

declare type sysevent_registerGlideRecord = sys_metadataGlideRecord & Isysevent_registerColumns;

declare type sysevent_registerElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isysevent_registerColumns, sysevent_registerGlideRecord>;

/**
 * GlideElement values from the Event table.
 * @interface IsyseventColumns
 */
declare interface IsyseventColumns extends IGlideElementColumns {
    /**
     * Claimed by
     * @type {StringGlideElement}
     * @memberof IsyseventColumns
     * @description Max length: 100
     */
    claimed_by: StringGlideElement;

    /**
     * Descriptive name
     * @type {StringGlideElement}
     * @memberof IsyseventColumns
     * @description Max length: 40
     */
    descriptive_name: StringGlideElement;

    /**
     * Instance
     * @type {StringGlideElement}
     * @memberof IsyseventColumns
     * @description Max length: 40
     */
    instance: StringGlideElement;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof IsyseventColumns
     * @description Max length: 100
     */
    name: StringGlideElement;

    /**
     * Parm1
     * @type {StringGlideElement}
     * @memberof IsyseventColumns
     * @description Max length: 4000
     */
    parm1: StringGlideElement;

    /**
     * Parm2
     * @type {StringGlideElement}
     * @memberof IsyseventColumns
     * @description Max length: 4000
     */
    parm2: StringGlideElement;

    /**
     * Processed
     * @type {StringGlideElement}
     * @memberof IsyseventColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    processed: StringGlideElement;

    /**
     * Processing duration
     * @type {GlideElementNumeric}
     * @memberof IsyseventColumns
     * @default 0
     */
    processing_duration: GlideElementNumeric;

    /**
     * Process on
     * @type {StringGlideElement}
     * @memberof IsyseventColumns
     * @default "javascript:gs.nowDateTime()"
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    process_on: StringGlideElement;

    /**
     * Queue
     * @type {StringGlideElement}
     * @memberof IsyseventColumns
     * @description Max length: 40
     */
    queue: StringGlideElement;

    /**
     * State
     * @type {StringGlideElement}
     * @memberof IsyseventColumns
     * @default "ready"
     * @description Choices: "transferred": "transferred"; "error": "error"; "processed": "processed"; "ready": "ready"
     *      Max length: 40
     */
    state: StringGlideElement;

    /**
     * Table
     * @type {GlideElement}
     * @memberof IsyseventColumns
     * @description Internal type is "short_table_name"
     */
    table: GlideElement;

    /**
     * URI
     * @type {StringGlideElement}
     * @memberof IsyseventColumns
     * @description Max length: 4000
     */
    uri: StringGlideElement;

    /**
     * User ID
     * @type {StringGlideElement}
     * @memberof IsyseventColumns
     * @description Max length: 40
     */
    user_id: StringGlideElement;

    /**
     * User name
     * @type {StringGlideElement}
     * @memberof IsyseventColumns
     * @description Max length: 40
     */
    user_name: StringGlideElement;
}

declare type syseventGlideRecord = GlideRecord & IsyseventColumns;

declare type syseventElementReference = GlidePropertiesElementReference<IsyseventColumns, syseventGlideRecord>;


/**
 * GlideElement values from the Notification table.
 * @interface Isysevent_email_actionColumns
 * @extends {IsysruleColumns}
 */
declare interface Isysevent_email_actionColumns extends IsysruleColumns {
    /**
     * Inserted
     * @type {GlideElementBoolean}
     * @memberof Isysevent_email_actionColumns
     */
    action_insert: GlideElementBoolean;

    /**
     * Updated
     * @type {GlideElementBoolean}
     * @memberof Isysevent_email_actionColumns
     */
    action_update: GlideElementBoolean;

    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof Isysevent_email_actionColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Advanced condition
     * @type {GlideElementScript}
     * @memberof Isysevent_email_actionColumns
     */
    advanced_condition: GlideElementScript;

    /**
     * Affected field on event
     * @type {GlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Internal type is "choice"
     *      Choices: "parm2": "Parm2"; "parm1": "Parm1"
     */
    affected_field_on_event: GlideElement;

    /**
     * Category
     * @type {sys_notification_categoryElementReference}
     * @memberof Isysevent_email_actionColumns
     * @default "javascript:gs.getProperty('glide.notification.default_category', 'c97d83137f4432005f58108c3ffa917a');"
     * @description Reference to table "sys_notification_category"
     */
    category: sys_notification_categoryElementReference;

    /**
     * Table
     * @type {StringGlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    collection: StringGlideElement;

    /**
     * Conditions
     * @type {GlideElementConditions}
     * @memberof Isysevent_email_actionColumns
     */
    condition: GlideElementConditions;

    /**
     * Content type
     * @type {StringGlideElement}
     * @memberof Isysevent_email_actionColumns
     * @default "text/html"
     * @description Choices: "multipart/mixed": "HTML and plain text"; "text/html": "HTML only"; "text/plain": "Plain text only"; "text/xml": "XML only"
     *      Max length: 40
     */
    content_type: StringGlideElement;

    /**
     * Default Interval
     * @type {sys_email_digest_intervalElementReference}
     * @memberof Isysevent_email_actionColumns
     * @description Reference to table "sys_email_digest_interval"
     */
    default_interval: sys_email_digest_intervalElementReference;

    /**
     * Allow Digest
     * @type {GlideElementBoolean}
     * @memberof Isysevent_email_actionColumns
     * @default false
     */
    digestable: GlideElementBoolean;

    /**
     * Digest From
     * @type {StringGlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Max length: 100
     */
    digest_from: StringGlideElement;

    /**
     * Digest HTML
     * @type {GlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Internal type is "html_script"
     */
    digest_html: GlideElement;

    /**
     * Digest Reply To
     * @type {StringGlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Max length: 100
     */
    digest_reply_to: StringGlideElement;

    /**
     * Digest Separator (HTML)
     * @type {GlideElement}
     * @memberof Isysevent_email_actionColumns
     * @default "<br><hr><br>"
     * @description Internal type is "html_script"
     */
    digest_separator_html: GlideElement;

    /**
     * Digest Separator (text)
     * @type {GlideElement}
     * @memberof Isysevent_email_actionColumns
     * @default "\\n--------------------------------------------------------------------------------\\n"
     * @description Internal type is "email_script"
     */
    digest_separator_text: GlideElement;

    /**
     * Digest Subject
     * @type {StringGlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Max length: 100
     */
    digest_subject: StringGlideElement;

    /**
     * Digest Template
     * @type {sysevent_email_templateElementReference}
     * @memberof Isysevent_email_actionColumns
     * @description Reference to table "sysevent_email_template"
     */
    digest_template: sysevent_email_templateElementReference;

    /**
     * Digest Text
     * @type {GlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Internal type is "email_script"
     */
    digest_text: GlideElement;

    /**
     * Event name
     * @type {GlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Internal type is "sysevent_name"
     */
    event_name: GlideElement;

    /**
     * Event parm 1 contains recipient
     * @type {GlideElementBoolean}
     * @memberof Isysevent_email_actionColumns
     */
    event_parm_1: GlideElementBoolean;

    /**
     * Event parm 2 contains recipient
     * @type {GlideElementBoolean}
     * @memberof Isysevent_email_actionColumns
     */
    event_parm_2: GlideElementBoolean;

    /**
     * Exclude delegates
     * @type {GlideElementBoolean}
     * @memberof Isysevent_email_actionColumns
     * @default false
     */
    exclude_delegates: GlideElementBoolean;

    /**
     * Force delivery
     * @type {GlideElementBoolean}
     * @memberof Isysevent_email_actionColumns
     * @default false
     */
    force_delivery: GlideElementBoolean;

    /**
     * From
     * @type {StringGlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Max length: 100
     */
    from: StringGlideElement;

    /**
     * Send when
     * @type {StringGlideElement}
     * @memberof Isysevent_email_actionColumns
     * @default "engine"
     * @description Choices: "triggered": "Triggered"; "event": "Event is fired"; "engine": "Record inserted or updated"
     *      Max length: 40
     */
    generation_type: StringGlideElement;

    /**
     * Importance
     * @type {StringGlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Choices: "high": "High"; "low": "Low"
     *      Max length: 40
     */
    importance: StringGlideElement;

    /**
     * Include attachments
     * @type {GlideElementBoolean}
     * @memberof Isysevent_email_actionColumns
     */
    include_attachments: GlideElementBoolean;

    /**
     * Item
     * @type {StringGlideElement}
     * @memberof Isysevent_email_actionColumns
     * @default "event.parm1"
     * @description Max length: 40
     */
    item: StringGlideElement;

    /**
     * Item table
     * @type {StringGlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Internal type is "table_name"
     *      Max length: 40
     */
    item_table: StringGlideElement;

    /**
     * Mandatory
     * @type {GlideElementBoolean}
     * @memberof Isysevent_email_actionColumns
     * @default false
     */
    mandatory: GlideElementBoolean;

    /**
     * Message
     * @type {GlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Internal type is "email_script"
     */
    message: GlideElement;

    /**
     * Message HTML
     * @type {GlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Internal type is "html_script"
     */
    message_html: GlideElement;

    /**
     * Push Messages
     * @type {GlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Internal type is "glide_list"
     */
    message_list: GlideElement;

    /**
     * Message text
     * @type {GlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Internal type is "email_script"
     */
    message_text: GlideElement;

    /**
     * Omit watermark
     * @type {GlideElementBoolean}
     * @memberof Isysevent_email_actionColumns
     * @default false
     */
    omit_watermark: GlideElementBoolean;

    /**
     * Push Message Only
     * @type {GlideElementBoolean}
     * @memberof Isysevent_email_actionColumns
     * @default false
     */
    push_message_only: GlideElementBoolean;

    /**
     * Users/Groups in fields
     * @type {GlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Internal type is "field_list"
     */
    recipient_fields: GlideElement;

    /**
     * Groups
     * @type {GlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Internal type is "glide_list"
     */
    recipient_groups: GlideElement;

    /**
     * Users
     * @type {GlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Internal type is "glide_list"
     */
    recipient_users: GlideElement;

    /**
     * Reply to
     * @type {StringGlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Max length: 100
     */
    reply_to: StringGlideElement;

    /**
     * Send to event creator
     * @type {GlideElementBoolean}
     * @memberof Isysevent_email_actionColumns
     * @default true
     */
    send_self: GlideElementBoolean;

    /**
     * SMS alternate
     * @type {GlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Internal type is "email_script"
     */
    sms_alternate: GlideElement;

    /**
     * Stationery
     * @type {sysevent_email_styleElementReference}
     * @memberof Isysevent_email_actionColumns
     * @description Reference to table "sysevent_email_style"
     */
    style: sysevent_email_styleElementReference;

    /**
     * Subject
     * @type {StringGlideElement}
     * @memberof Isysevent_email_actionColumns
     * @description Max length: 100
     */
    subject: StringGlideElement;

    /**
     * Subscribable
     * @type {GlideElementBoolean}
     * @memberof Isysevent_email_actionColumns
     * @default false
     */
    subscribable: GlideElementBoolean;

    /**
     * Sys version
     * @type {StringGlideElement}
     * @memberof Isysevent_email_actionColumns
     * @default "2"
     * @description Choices: "1": "V1"; "2": "V2"
     *      Max length: 40
     */
    sys_version: StringGlideElement;

    /**
     * Email template
     * @type {sysevent_email_templateElementReference}
     * @memberof Isysevent_email_actionColumns
     * @description Reference to table "sysevent_email_template"
     */
    template: sysevent_email_templateElementReference;

    /**
     * Type
     * @type {StringGlideElement}
     * @memberof Isysevent_email_actionColumns
     * @default "email"
     * @description Choices: "email": "EMAIL"; "vcalendar": "Meeting Invitation"
     *      Max length: 40
     */
    type: StringGlideElement;

    /**
     * Weight
     * @type {GlideElementNumeric}
     * @memberof Isysevent_email_actionColumns
     * @default 0
     */
    weight: GlideElementNumeric;
}

declare type sysevent_email_actionGlideRecord = sysruleGlideRecord & Isysevent_email_actionColumns;

declare type sysevent_email_actionElementReference = sysruleElementReference & GlidePropertiesElementReference<Isysevent_email_actionColumns, sysevent_email_actionGlideRecord>;

declare interface IScopedWorkflow {
    debug(message: string, args: Object): string;
    error(message: string, args: Object): string;
    getVariable<T>(name: string): T;
    info(message: string, args: Object): string;
    inputs: { [key: string]: any; };
    name: string;
    removeVariable(name: string): void;
    result: string;
    scratchpad: { [key: string]: any; };
    setResult(result: string): void;
    setVariable(name: string, value: Object): void;
    warn(message: string, args: Object): string;
}

/**
 * GlideElement values from the Workflow Element Definition table.
 * @interface Iwf_element_definitionColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Iwf_element_definitionColumns extends Isys_metadataColumns {
    /**
     * Accessible from
     * @type {StringGlideElement}
     * @memberof Iwf_element_definitionColumns
     * @default "public"
     * @description Choices: "public": "All application scopes"; "package_private": "This application scope only"
     *      Max length: 40
     */
    access: StringGlideElement;

    /**
     * Attributes
     * @type {StringGlideElement}
     * @memberof Iwf_element_definitionColumns
     * @description Max length: 255
     */
    attributes: StringGlideElement;

    /**
     * Provider
     * @type {wf_element_providerElementReference}
     * @memberof Iwf_element_definitionColumns
     * @readonly
     * @description Reference to table "wf_element_provider"
     */
    base_provider: GlideElementReference;

    /**
     * Category
     * @type {StringGlideElement}
     * @memberof Iwf_element_definitionColumns
     * @description Max length: 40
     */
    category: StringGlideElement;

    /**
     * Default height
     * @type {GlideElementNumeric}
     * @memberof Iwf_element_definitionColumns
     */
    default_height: GlideElementNumeric;

    /**
     * Default width
     * @type {GlideElementNumeric}
     * @memberof Iwf_element_definitionColumns
     */
    default_width: GlideElementNumeric;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Iwf_element_definitionColumns
     * @description Max length: 4000
     */
    description: StringGlideElement;

    /**
     * Image
     * @type {GlideElement}
     * @memberof Iwf_element_definitionColumns
     * @description Internal type is "image"
     */
    image: GlideElement;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Iwf_element_definitionColumns
     * @description Internal type is "translated_text"
     *      Max length: 40
     */
    name: StringGlideElement;

    /**
     * Style
     * @type {StringGlideElement}
     * @memberof Iwf_element_definitionColumns
     * @description Max length: 255
     */
    style: StringGlideElement;

    /**
     * Version Container
     * @type {StringGlideElement}
     * @memberof Iwf_element_definitionColumns
     * @description Max length: 100
     */
    version_container_id: StringGlideElement;
}

declare type wf_element_definitionGlideRecord = sys_metadataGlideRecord & Iwf_element_definitionColumns;

declare type wf_element_definitionElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Iwf_element_definitionColumns, wf_element_definitionGlideRecord>;

/**
 * GlideElement values from the Version table.
 * @interface Iwf_versionableColumns
 */
declare interface Iwf_versionableColumns extends IGlideElementColumns {
    /**
     * Checked out
     * @type {StringGlideElement}
     * @memberof Iwf_versionableColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    checked_out: StringGlideElement;

    /**
     * Checked out by
     * @type {sys_userElementReference}
     * @memberof Iwf_versionableColumns
     * @description Reference to table "sys_user"
     */
    checked_out_by: sys_userElementReference;

    /**
     * Published
     * @type {GlideElementBoolean}
     * @memberof Iwf_versionableColumns
     */
    published: GlideElementBoolean;

    /**
     * Valid from
     * @type {StringGlideElement}
     * @memberof Iwf_versionableColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    valid_from: StringGlideElement;

    /**
     * Valid to
     * @type {StringGlideElement}
     * @memberof Iwf_versionableColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    valid_to: StringGlideElement;

    /**
     * Version
     * @type {GlideElementNumeric}
     * @memberof Iwf_versionableColumns
     * @default 1
     */
    version: GlideElementNumeric;

    /**
     * Version Container
     * @type {StringGlideElement}
     * @memberof Iwf_versionableColumns
     * @description Max length: 100
     */
    version_container_id: StringGlideElement;

    /**
     * Element Definition
     * @type {wf_element_definitionElementReference}
     * @memberof Iwf_versionableColumns
     * @description Reference to table "wf_element_definition"
     */
    wf_element_definition: wf_element_definitionElementReference;
}

declare type wf_versionableGlideRecord = GlideRecord & Iwf_versionableColumns;

declare type wf_versionableElementReference = GlidePropertiesElementReference<Iwf_versionableColumns, wf_versionableGlideRecord>;

/**
 * GlideElement values from the Workflow Version table.
 * @interface Iwf_workflow_versionColumns
 */
declare interface Iwf_workflow_versionColumns extends IGlideElementColumns {
    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof Iwf_workflow_versionColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Activity stages
     * @type {GlideElement}
     * @memberof Iwf_workflow_versionColumns
     * @readonly
     * @description Internal type is "compressed"
     */
    activity_stages: GlideElement;

    /**
     * Run after bus. rules run
     * @type {GlideElementBoolean}
     * @memberof Iwf_workflow_versionColumns
     */
    after_business_rules: GlideElementBoolean;

    /**
     * Checked out
     * @type {StringGlideElement}
     * @memberof Iwf_workflow_versionColumns
     * @readonly
     * @default "javascript:gs.nowDateTime();"
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    checked_out: StringGlideElement;

    /**
     * Checked out by
     * @type {sys_userElementReference}
     * @memberof Iwf_workflow_versionColumns
     * @readonly
     * @default "javascript:gs.getUserID()"
     * @description Reference to table "sys_user"
     */
    checked_out_by: sys_userElementReference;

    /**
     * Stage rendering
     * @type {column_rendererElementReference}
     * @memberof Iwf_workflow_versionColumns
     * @default "a56213111b030100adca1e094f0713ac"
     * @description Reference to table "column_renderer"
     */
    column_renderer: GlideElementReference;

    /**
     * Condition
     * @type {GlideElementConditions}
     * @memberof Iwf_workflow_versionColumns
     */
    condition: GlideElementConditions;

    /**
     * If condition matches
     * @type {StringGlideElement}
     * @memberof Iwf_workflow_versionColumns
     * @default "run_match"
     * @description Choices: "none_match": "Run if no other workflows matched"; "first_match": "Run if no other workflows matched yet (Deprecated)"; "run_match": "Run the workflow always"
     *      Max length: 40
     */
    condition_type: StringGlideElement;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Iwf_workflow_versionColumns
     * @description Max length: 4000
     */
    description: StringGlideElement;

    /**
     * Expected sequences
     * @type {GlideElement}
     * @memberof Iwf_workflow_versionColumns
     * @readonly
     * @description Internal type is "compressed"
     */
    expected_sequences: GlideElement;

    /**
     * Expected time
     * @type {StringGlideElement}
     * @memberof Iwf_workflow_versionColumns
     * @description Internal type is "glide_duration"
     *      Max length: 40
     */
    expected_time: StringGlideElement;

    /**
     * Delivery based on
     * @type {StringGlideElement}
     * @memberof Iwf_workflow_versionColumns
     * @description Choices: "relative_duration": "Relative duration"; "NULL_OVERRIDE": "User-specified duration"
     *      Max length: 40
     */
    expected_time_type: StringGlideElement;

    /**
     * Full sequences
     * @type {GlideElement}
     * @memberof Iwf_workflow_versionColumns
     * @readonly
     * @description Internal type is "compressed"
     */
    full_sequences: GlideElement;

    /**
     * Journal
     * @type {GlideElement}
     * @memberof Iwf_workflow_versionColumns
     * @description Internal type is "journal"
     */
    journal: GlideElement;

    /**
     * Max activity count
     * @type {GlideElementNumeric}
     * @memberof Iwf_workflow_versionColumns
     * @default 100
     */
    max_activity_count: GlideElementNumeric;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Iwf_workflow_versionColumns
     * @description Max length: 100
     */
    name: StringGlideElement;

    /**
     * Not cacheable
     * @type {GlideElementBoolean}
     * @memberof Iwf_workflow_versionColumns
     * @default false
     */
    not_cacheable: GlideElementBoolean;

    /**
     * On-cancel script
     * @type {GlideElementScript}
     * @memberof Iwf_workflow_versionColumns
     * @default "// This script executes if the workflow is cancelled.\r// The global variable context_sys_id contains the sys_id of the cancelled workflow context.\r"
     */
    on_cancel: GlideElementScript;

    /**
     * Order
     * @type {GlideElementNumeric}
     * @memberof Iwf_workflow_versionColumns
     * @default 100
     */
    order: GlideElementNumeric;

    /**
     * Activity pinning
     * @type {StringGlideElement}
     * @memberof Iwf_workflow_versionColumns
     * @default "set_by_activity"
     * @description Choices: "unpin_all_activities": "Unpin all activities"; "pin_all_activities": "Pin all activities"; "set_by_activity": "Set by activity"
     *      Max length: 40
     */
    pin_type: StringGlideElement;

    /**
     * Published
     * @type {GlideElementBoolean}
     * @memberof Iwf_workflow_versionColumns
     * @readonly
     */
    published: GlideElementBoolean;

    /**
     * Relative duration
     * @type {cmn_relative_durationElementReference}
     * @memberof Iwf_workflow_versionColumns
     * @description Reference to table "cmn_relative_duration"
     */
    relative_duration: GlideElementReference;

    /**
     * Requires ERT
     * @type {GlideElementBoolean}
     * @memberof Iwf_workflow_versionColumns
     * @default true
     */
    requires_ert: GlideElementBoolean;

    /**
     * Run multiple
     * @type {GlideElementBoolean}
     * @memberof Iwf_workflow_versionColumns
     */
    run_multiple: GlideElementBoolean;

    /**
     * Schedule
     * @type {cmn_scheduleElementReference}
     * @memberof Iwf_workflow_versionColumns
     * @description Reference to table "cmn_schedule"
     */
    schedule: cmn_scheduleElementReference;

    /**
     * Stage field
     * @type {StringGlideElement}
     * @memberof Iwf_workflow_versionColumns
     * @description Internal type is "field_name"
     *      Max length: 80
     */
    stage_field: StringGlideElement;

    /**
     * Stage order
     * @type {StringGlideElement}
     * @memberof Iwf_workflow_versionColumns
     * @default "computed"
     * @description Choices: "user_specified": "User specified"; "computed": "Computed"
     *      Max length: 40
     */
    stage_order: StringGlideElement;

    /**
     * Starting activity
     * @type {wf_activityElementReference}
     * @memberof Iwf_workflow_versionColumns
     * @description Reference to table "wf_activity"
     */
    start: wf_activityElementReference;

    /**
     * Table
     * @type {StringGlideElement}
     * @memberof Iwf_workflow_versionColumns
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    table: StringGlideElement;

    /**
     * Timezone
     * @type {StringGlideElement}
     * @memberof Iwf_workflow_versionColumns
     * @description Choices: "NULL_OVERRIDE": "-- None --"
     *      Max length: 40
     */
    timezone: StringGlideElement;

    /**
     * Workflow Runtime Validation Status
     * @type {GlideElementBoolean}
     * @memberof Iwf_workflow_versionColumns
     */
    validated: GlideElementBoolean;

    /**
     * Workflow
     * @type {wf_workflowElementReference}
     * @memberof Iwf_workflow_versionColumns
     * @description Reference to table "wf_workflow"
     */
    workflow: wf_workflowElementReference;
}

declare type wf_workflow_versionGlideRecord = GlideRecord & Iwf_workflow_versionColumns;

declare type wf_workflow_versionElementReference = GlidePropertiesElementReference<Iwf_workflow_versionColumns, wf_workflow_versionGlideRecord>;

/**
 * GlideElement values from the Workflow Stage table.
 * @interface Iwf_stageColumns
 */
declare interface Iwf_stageColumns extends IGlideElementColumns {
    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Iwf_stageColumns
     * @description Internal type is "translated_field"
     *      Max length: 40
     */
    name: StringGlideElement;

    /**
     * Duration
     * @type {StringGlideElement}
     * @memberof Iwf_stageColumns
     * @default "0 00:00:00"
     * @description Internal type is "glide_duration"
     *      Max length: 40
     */
    ola: StringGlideElement;

    /**
     * Order
     * @type {GlideElementNumeric}
     * @memberof Iwf_stageColumns
     * @default 100
     */
    order: GlideElementNumeric;

    /**
     * Value
     * @type {StringGlideElement}
     * @memberof Iwf_stageColumns
     * @description Max length: 40
     */
    value: StringGlideElement;

    /**
     * Workflow version
     * @type {wf_workflow_versionElementReference}
     * @memberof Iwf_stageColumns
     * @description Reference to table "wf_workflow_version"
     */
    workflow_version: wf_workflow_versionElementReference;
}

declare type wf_stageGlideRecord = GlideRecord & Iwf_stageColumns;

declare type wf_stageElementReference = GlidePropertiesElementReference<Iwf_stageColumns, wf_stageGlideRecord>;

/**
 * GlideElement values from the Workflow Activity table.
 * @interface Iwf_activityColumns
 */
declare interface Iwf_activityColumns extends IGlideElementColumns {
    /**
     * Activity definition
     * @type {wf_element_definitionElementReference}
     * @memberof Iwf_activityColumns
     * @description Reference to table "wf_element_definition"
     */
    activity_definition: wf_element_definitionElementReference;

    /**
     * Activity definition updated
     * @type {GlideElementBoolean}
     * @memberof Iwf_activityColumns
     * @default false
     */
    activity_definition_updated: GlideElementBoolean;

    /**
     * Databus lookup ID
     * @type {GlideElementNumeric}
     * @memberof Iwf_activityColumns
     */
    databus_lookup_id: GlideElementNumeric;

    /**
     * Height
     * @type {GlideElementNumeric}
     * @memberof Iwf_activityColumns
     */
    height: GlideElementNumeric;

    /**
     * Input
     * @type {GlideElement}
     * @memberof Iwf_activityColumns
     * @description Internal type is "data_object"
     */
    input: GlideElement;

    /**
     * Is parent
     * @type {GlideElementBoolean}
     * @memberof Iwf_activityColumns
     * @default false
     */
    is_parent: GlideElementBoolean;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Iwf_activityColumns
     * @description Max length: 100
     */
    name: StringGlideElement;

    /**
     * New activity definition
     * @type {wf_element_definitionElementReference}
     * @memberof Iwf_activityColumns
     * @description Reference to table "wf_element_definition"
     */
    new_activity_definition: wf_element_definitionElementReference;

    /**
     * Notes
     * @type {StringGlideElement}
     * @memberof Iwf_activityColumns
     * @description Max length: 256
     */
    notes: StringGlideElement;

    /**
     * Out of date
     * @type {GlideElementBoolean}
     * @memberof Iwf_activityColumns
     * @default false
     */
    out_of_date: GlideElementBoolean;

    /**
     * Parent
     * @type {wf_activityElementReference}
     * @memberof Iwf_activityColumns
     * @description Reference to table "wf_activity"
     */
    parent: wf_activityElementReference;

    /**
     * Pinned
     * @type {GlideElementBoolean}
     * @memberof Iwf_activityColumns
     * @default false
     */
    pinned: GlideElementBoolean;

    /**
     * Pinned version
     * @type {wf_versionableElementReference}
     * @memberof Iwf_activityColumns
     * @description Reference to table "wf_versionable"
     */
    pinned_version: wf_versionableElementReference;

    /**
     * Stage
     * @type {wf_stageElementReference}
     * @memberof Iwf_activityColumns
     * @description Reference to table "wf_stage"
     */
    stage: wf_stageElementReference;

    /**
     * Timeout
     * @type {StringGlideElement}
     * @memberof Iwf_activityColumns
     * @default "0 00:00:00"
     * @description Internal type is "glide_duration"
     *      Max length: 40
     */
    timeout: StringGlideElement;

    /**
     * Variables
     * @type {GlideElement}
     * @memberof Iwf_activityColumns
     * @description Internal type is "glide_var"
     */
    vars: GlideElement;

    /**
     * Width
     * @type {GlideElementNumeric}
     * @memberof Iwf_activityColumns
     */
    width: GlideElementNumeric;

    /**
     * Workflow version
     * @type {wf_workflow_versionElementReference}
     * @memberof Iwf_activityColumns
     * @description Reference to table "wf_workflow_version"
     */
    workflow_version: wf_workflow_versionElementReference;

    /**
     * X
     * @type {GlideElementNumeric}
     * @memberof Iwf_activityColumns
     */
    x: GlideElementNumeric;

    /**
     * Y
     * @type {GlideElementNumeric}
     * @memberof Iwf_activityColumns
     */
    y: GlideElementNumeric;
}

declare type wf_activityGlideRecord = GlideRecord & Iwf_activityColumns;

declare type wf_activityElementReference = GlidePropertiesElementReference<Iwf_activityColumns, wf_activityGlideRecord>;

/**
 * GlideElement values from the Workflow Executing Activity table.
 * @interface Iwf_executingColumns
 */
declare interface Iwf_executingColumns extends IGlideElementColumns {
    /**
     * Activity
     * @type {wf_activityElementReference}
     * @memberof Iwf_executingColumns
     * @description Reference to table "wf_activity"
     */
    activity: wf_activityElementReference;

    /**
     * Activity index
     * @type {GlideElementNumeric}
     * @memberof Iwf_executingColumns
     */
    activity_index: GlideElementNumeric;

    /**
     * Context
     * @type {wf_contextElementReference}
     * @memberof Iwf_executingColumns
     * @description Reference to table "wf_context"
     */
    context: wf_contextElementReference;

    /**
     * Due
     * @type {StringGlideElement}
     * @memberof Iwf_executingColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    due: StringGlideElement;

    /**
     * Fault description
     * @type {StringGlideElement}
     * @memberof Iwf_executingColumns
     * @description Max length: 4000
     */
    fault_description: StringGlideElement;

    /**
     * Input Data
     * @type {StringGlideElement}
     * @memberof Iwf_executingColumns
     * @description Max length: 65000
     */
    input_data: StringGlideElement;

    /**
     * Is parent
     * @type {GlideElementBoolean}
     * @memberof Iwf_executingColumns
     * @default false
     */
    is_parent: GlideElementBoolean;

    /**
     * Notify Termination
     * @type {GlideElementBoolean}
     * @memberof Iwf_executingColumns
     * @default false
     */
    notify_termination: GlideElementBoolean;

    /**
     * Output
     * @type {StringGlideElement}
     * @memberof Iwf_executingColumns
     * @description Max length: 1024000
     */
    output: StringGlideElement;

    /**
     * Output Data
     * @type {StringGlideElement}
     * @memberof Iwf_executingColumns
     * @description Max length: 65000
     */
    output_data: StringGlideElement;

    /**
     * Parent
     * @type {wf_executingElementReference}
     * @memberof Iwf_executingColumns
     * @description Reference to table "wf_executing"
     */
    parent: wf_executingElementReference;

    /**
     * Previous activity
     * @type {wf_historyElementReference}
     * @memberof Iwf_executingColumns
     * @description Reference to table "wf_history"
     */
    previous_activity: GlideElementReference;

    /**
     * Registered events
     * @type {StringGlideElement}
     * @memberof Iwf_executingColumns
     * @readonly
     * @description Max length: 1000
     */
    registered_events: StringGlideElement;

    /**
     * Result
     * @type {StringGlideElement}
     * @memberof Iwf_executingColumns
     * @description Max length: 40
     */
    result: StringGlideElement;

    /**
     * Scratchpad
     * @type {GlideElement}
     * @memberof Iwf_executingColumns
     * @description Internal type is "name_values"
     */
    scratchpad: GlideElement;

    /**
     * Started
     * @type {StringGlideElement}
     * @memberof Iwf_executingColumns
     * @default "javascript:gs.nowDateTime()"
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    started: StringGlideElement;

    /**
     * State
     * @type {StringGlideElement}
     * @memberof Iwf_executingColumns
     * @default "executing"
     * @description Choices: "restart": "Restarted"; "timeout": "Timed Out"; "cancelled": "Cancelled"; "faulted": "Error"; "finished": "Finished"; "executing": "Executing"; "waiting": "Running"
     *      Max length: 40
     */
    state: StringGlideElement;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof Iwf_executingColumns
     * @default "global"
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof Iwf_executingColumns
     * @default "/"
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;

    /**
     * Workflow version
     * @type {wf_workflow_versionElementReference}
     * @memberof Iwf_executingColumns
     * @description Reference to table "wf_workflow_version"
     */
    workflow_version: wf_workflow_versionElementReference;
}

declare type wf_executingGlideRecord = GlideRecord & Iwf_executingColumns;

declare type wf_executingElementReference = GlidePropertiesElementReference<Iwf_executingColumns, wf_executingGlideRecord>;

/**
 * GlideElement values from the Workflow context table.
 * @interface Iwf_contextColumns
 */
declare interface Iwf_contextColumns extends IGlideElementColumns {
    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof Iwf_contextColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Activity count
     * @type {GlideElementNumeric}
     * @memberof Iwf_contextColumns
     * @default 0
     */
    activity_count: GlideElementNumeric;

    /**
     * Activity index
     * @type {GlideElementNumeric}
     * @memberof Iwf_contextColumns
     * @default 0
     */
    activity_index: GlideElementNumeric;

    /**
     * Run after bus. rules run
     * @type {GlideElementBoolean}
     * @memberof Iwf_contextColumns
     * @default false
     */
    after_business_rules: GlideElementBoolean;

    /**
     * Auto start
     * @type {GlideElementBoolean}
     * @memberof Iwf_contextColumns
     */
    auto_start: GlideElementBoolean;

    /**
     * Stage rendering
     * @type {column_rendererElementReference}
     * @memberof Iwf_contextColumns
     * @description Reference to table "column_renderer"
     */
    column_renderer: GlideElementReference;

    /**
     * Cumulative to ERT
     * @type {GlideElementBoolean}
     * @memberof Iwf_contextColumns
     */
    cumulated_avg_ert: GlideElementBoolean;

    /**
     * Due
     * @type {StringGlideElement}
     * @memberof Iwf_contextColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    due: StringGlideElement;

    /**
     * Ended
     * @type {StringGlideElement}
     * @memberof Iwf_contextColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    ended: StringGlideElement;

    /**
     * Available actions
     * @type {GlideElement}
     * @memberof Iwf_contextColumns
     * @default "51782761ac1464174baaeb9af4b9ae76,803b3c728f320100ec9a6441f0f923ef,b69c7e18eb532100ec9a82810206fea4"
     * @description Internal type is "glide_action_list"
     */
    ert_long_running_actions: GlideElement;

    /**
     * Available actions
     * @type {GlideElement}
     * @memberof Iwf_contextColumns
     * @default "b69c7e18eb532100ec9a82810206fea4"
     * @description Internal type is "glide_action_list"
     */
    ert_outlier_workflow_actions: GlideElement;

    /**
     * Related record
     * @type {GlideElement}
     * @memberof Iwf_contextColumns
     * @readonly
     * @description Internal type is "document_id"
     */
    id: GlideElement;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Iwf_contextColumns
     * @readonly
     * @description Max length: 100
     */
    name: StringGlideElement;

    /**
     * Parent Workflow
     * @type {wf_contextElementReference}
     * @memberof Iwf_contextColumns
     * @readonly
     * @description Reference to table "wf_context"
     */
    parent: wf_contextElementReference;

    /**
     * Parent activity
     * @type {wf_executingElementReference}
     * @memberof Iwf_contextColumns
     * @readonly
     * @description Reference to table "wf_executing"
     */
    parent_activity: wf_executingElementReference;

    /**
     * Requires ERT
     * @type {GlideElementBoolean}
     * @memberof Iwf_contextColumns
     * @default false
     */
    requires_ert: GlideElementBoolean;

    /**
     * Result
     * @type {StringGlideElement}
     * @memberof Iwf_contextColumns
     * @description Max length: 40
     */
    result: StringGlideElement;

    /**
     * Return value
     * @type {GlideElement}
     * @memberof Iwf_contextColumns
     * @readonly
     * @description Internal type is "name_values"
     */
    return_value: GlideElement;

    /**
     * Running duration
     * @type {StringGlideElement}
     * @memberof Iwf_contextColumns
     * @description Internal type is "glide_duration"
     *      Max length: 40
     */
    running_duration: StringGlideElement;

    /**
     * Schedule
     * @type {cmn_scheduleElementReference}
     * @memberof Iwf_contextColumns
     * @description Reference to table "cmn_schedule"
     */
    schedule: cmn_scheduleElementReference;

    /**
     * Scratchpad
     * @type {GlideElement}
     * @memberof Iwf_contextColumns
     * @readonly
     * @description Internal type is "name_values"
     */
    scratchpad: GlideElement;

    /**
     * Stage
     * @type {wf_stageElementReference}
     * @memberof Iwf_contextColumns
     * @description Reference to table "wf_stage"
     */
    stage: wf_stageElementReference;

    /**
     * Stage states
     * @type {StringGlideElement}
     * @memberof Iwf_contextColumns
     * @readonly
     * @description Max length: 8000
     */
    stage_state: StringGlideElement;

    /**
     * Started
     * @type {StringGlideElement}
     * @memberof Iwf_contextColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    started: StringGlideElement;

    /**
     * Started by
     * @type {sys_userElementReference}
     * @memberof Iwf_contextColumns
     * @description Reference to table "sys_user"
     */
    started_by: sys_userElementReference;

    /**
     * State
     * @type {StringGlideElement}
     * @memberof Iwf_contextColumns
     * @default "executing"
     * @description Choices: "cancelled": "Cancelled"; "faulted": "Error"; "finished": "Finished"; "executing": "Executing"
     *      Max length: 40
     */
    state: StringGlideElement;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof Iwf_contextColumns
     * @default "global"
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof Iwf_contextColumns
     * @default "/"
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;

    /**
     * Table
     * @type {GlideElement}
     * @memberof Iwf_contextColumns
     * @readonly
     * @description Internal type is "short_table_name"
     */
    table: GlideElement;

    /**
     * Timezone
     * @type {StringGlideElement}
     * @memberof Iwf_contextColumns
     * @description Max length: 40
     */
    timezone: StringGlideElement;

    /**
     * Available actions
     * @type {GlideElement}
     * @memberof Iwf_contextColumns
     * @default "51782761ac1464174baaeb9af4b9ae76,b69c7e18eb532100ec9a82810206fea4"
     * @description Internal type is "glide_action_list"
     */
    without_current_wf_actions: GlideElement;

    /**
     * Workflow
     * @type {wf_workflowElementReference}
     * @memberof Iwf_contextColumns
     * @description Reference to table "wf_workflow"
     */
    workflow: wf_workflowElementReference;

    /**
     * Workflow version
     * @type {wf_workflow_versionElementReference}
     * @memberof Iwf_contextColumns
     * @readonly
     * @description Reference to table "wf_workflow_version"
     */
    workflow_version: wf_workflow_versionElementReference;
}

declare type wf_contextGlideRecord = GlideRecord & Iwf_contextColumns;

declare type wf_contextElementReference = GlidePropertiesElementReference<Iwf_contextColumns, wf_contextGlideRecord>;

/**
 * GlideElement values from the Workflow table.
 * @interface Iwf_workflowColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Iwf_workflowColumns extends Isys_metadataColumns {
    /**
     * Accessible from
     * @type {StringGlideElement}
     * @memberof Iwf_workflowColumns
     * @default "public"
     * @description Choices: "public": "All application scopes"; "package_private": "This application scope only"
     *      Max length: 40
     */
    access: StringGlideElement;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Iwf_workflowColumns
     * @description Max length: 4000
     */
    description: StringGlideElement;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Iwf_workflowColumns
     * @readonly
     * @description Max length: 100
     */
    name: StringGlideElement;

    /**
     * Preview
     * @type {GlideElementUserImage}
     * @memberof Iwf_workflowColumns
     */
    preview: GlideElementUserImage;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof Iwf_workflowColumns
     * @default "global"
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof Iwf_workflowColumns
     * @default "/"
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;

    /**
     * Sys overrides
     * @type {wf_workflowElementReference}
     * @memberof Iwf_workflowColumns
     * @description Reference to table "wf_workflow"
     */
    sys_overrides: wf_workflowElementReference;

    /**
     * Table
     * @type {StringGlideElement}
     * @memberof Iwf_workflowColumns
     * @readonly
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    table: StringGlideElement;

    /**
     * Template
     * @type {GlideElementBoolean}
     * @memberof Iwf_workflowColumns
     * @default false
     */
    template: GlideElementBoolean;
}

declare type wf_workflowGlideRecord = sys_metadataGlideRecord & Iwf_workflowColumns;

declare type wf_workflowElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Iwf_workflowColumns, wf_workflowGlideRecord>;

/**
 * GlideElement values from the Agreement table.
 * @interface IslaColumns
 */
declare interface IslaColumns extends IGlideElementColumns {
    /**
     * Accountable user
     * @type {sys_userElementReference}
     * @memberof IslaColumns
     * @description Reference to table "sys_user"
     */
    accountable_user: sys_userElementReference;

    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof IslaColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Avail pct
     * @type {GlideElementNumeric}
     * @memberof IslaColumns
     * @default 90
     * @description Internal type is "decimal"
     */
    avail_pct: GlideElementNumeric;

    /**
     * Begins
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @default "javascript:gs.now();"
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    begins: StringGlideElement;

    /**
     * Business lead
     * @type {sys_userElementReference}
     * @memberof IslaColumns
     * @description Reference to table "sys_user"
     */
    business_lead: sys_userElementReference;

    /**
     * Business unit
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @description Choices: "Operations": "Operations"; "Sales": "Sales"
     *      Max length: 40
     */
    business_unit: StringGlideElement;

    /**
     * Calendar
     * @type {sys_calendarElementReference}
     * @memberof IslaColumns
     * @description Reference to table "sys_calendar"
     */
    calendar: sys_calendarElementReference;

    /**
     * Change procedures
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @description Internal type is "html"
     *      Max length: 8000
     */
    change_procedures: StringGlideElement;

    /**
     * Consultant user
     * @type {sys_userElementReference}
     * @memberof IslaColumns
     * @description Reference to table "sys_user"
     */
    consultant_user: sys_userElementReference;

    /**
     * Contract
     * @type {ast_contractElementReference}
     * @memberof IslaColumns
     * @description Reference to table "ast_contract"
     */
    contract: GlideElementReference;

    /**
     * Department
     * @type {cmn_departmentElementReference}
     * @memberof IslaColumns
     * @description Reference to table "cmn_department"
     */
    department: cmn_departmentElementReference;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @description Internal type is "html"
     *      Max length: 8000
     */
    description: StringGlideElement;

    /**
     * Disaster recovery
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @description Internal type is "html"
     *      Max length: 8000
     */
    disaster_recovery: StringGlideElement;

    /**
     * Ends
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @default "javascript:var d = new GlideDate(); d.setValue('2020-01-01'); d.getDisplayValue();"
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    ends: StringGlideElement;

    /**
     * Functional area
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @description Choices: "Data Management": "Data Management"; "Network": "Network"; "Security": "Security"
     *      Max length: 40
     */
    functional_area: StringGlideElement;

    /**
     * Incident procedures
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @description Internal type is "html"
     *      Max length: 8000
     */
    incident_procedures: StringGlideElement;

    /**
     * Informed user
     * @type {sys_userElementReference}
     * @memberof IslaColumns
     * @description Reference to table "sys_user"
     */
    informed_user: sys_userElementReference;

    /**
     * Maintenance
     * @type {sys_calendarElementReference}
     * @memberof IslaColumns
     * @description Reference to table "sys_calendar"
     */
    maintenance: sys_calendarElementReference;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @description Max length: 40
     */
    name: StringGlideElement;

    /**
     * Next review
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    next_review: StringGlideElement;

    /**
     * Notes
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @description Internal type is "html"
     *      Max length: 8000
     */
    notes: StringGlideElement;

    /**
     * Number
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @default "javascript:getNextObjNumberPadded();"
     * @description Max length: 40
     */
    number: StringGlideElement;

    /**
     * Reponsibilities
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @description Internal type is "html"
     *      Max length: 8000
     */
    reponsibilities: StringGlideElement;

    /**
     * Response time
     * @type {GlideElementNumeric}
     * @memberof IslaColumns
     * @default 10
     * @description Internal type is "decimal"
     */
    response_time: GlideElementNumeric;

    /**
     * Responsible user
     * @type {sys_userElementReference}
     * @memberof IslaColumns
     * @description Reference to table "sys_user"
     */
    responsible_user: sys_userElementReference;

    /**
     * Security notes
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @description Internal type is "html"
     *      Max length: 8000
     */
    security_notes: StringGlideElement;

    /**
     * Service goals
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @description Internal type is "html"
     *      Max length: 8000
     */
    service_goals: StringGlideElement;

    /**
     * Short description
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @description Max length: 80
     */
    short_description: StringGlideElement;

    /**
     * Signatures
     * @type {StringGlideElement}
     * @memberof IslaColumns
     * @description Internal type is "html"
     *      Max length: 8000
     */
    signatures: StringGlideElement;

    /**
     * Agreement type
     * @type {GlideElementSysClassName}
     * @memberof IslaColumns
     * @default "javascript:current.getTableName();"
     */
    sys_class_name: GlideElementSysClassName;

    /**
     * Technical lead
     * @type {sys_userElementReference}
     * @memberof IslaColumns
     * @description Reference to table "sys_user"
     */
    technical_lead: sys_userElementReference;

    /**
     * Transaction load
     * @type {GlideElementNumeric}
     * @memberof IslaColumns
     * @description Internal type is "decimal"
     */
    transaction_load: GlideElementNumeric;

    /**
     * Users
     * @type {sys_user_groupElementReference}
     * @memberof IslaColumns
     * @description Reference to table "sys_user_group"
     */
    users: sys_user_groupElementReference;
}

declare type slaGlideRecord = GlideRecord & IslaColumns;

declare type slaElementReference = GlidePropertiesElementReference<IslaColumns, slaGlideRecord>;

/**
 * GlideElement values from the Menu Category table.
 * @interface Isys_app_categoryColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isys_app_categoryColumns extends Isys_metadataColumns {
    /**
     * Default order
     * @type {GlideElementNumeric}
     * @memberof Isys_app_categoryColumns
     * @description Internal type is "decimal"
     */
    default_order: GlideElementNumeric;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Isys_app_categoryColumns
     * @description Max length: 40
     */
    name: StringGlideElement;

    /**
     * Style
     * @type {StringGlideElement}
     * @memberof Isys_app_categoryColumns
     * @description Max length: 100
     */
    style: StringGlideElement;
}

declare type sys_app_categoryGlideRecord = sys_metadataGlideRecord & Isys_app_categoryColumns;

declare type sys_app_categoryElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isys_app_categoryColumns, sys_app_categoryGlideRecord>;

/**
 * GlideElement values from the Application Menu table.
 * @interface Isys_app_applicationColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isys_app_applicationColumns extends Isys_metadataColumns {
    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof Isys_app_applicationColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Category
     * @type {sys_app_categoryElementReference}
     * @memberof Isys_app_applicationColumns
     * @description Reference to table "sys_app_category"
     */
    category: sys_app_categoryElementReference;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Isys_app_applicationColumns
     * @description Max length: 4000
     */
    description: StringGlideElement;

    /**
     * Device type
     * @type {StringGlideElement}
     * @memberof Isys_app_applicationColumns
     * @default "browser"
     * @description Choices: "any": "Any"; "browser": "Browser"; "mobile": "Mobile"
     *      Max length: 40
     */
    device_type: StringGlideElement;

    /**
     * Hint
     * @type {StringGlideElement}
     * @memberof Isys_app_applicationColumns
     * @description Max length: 255
     */
    hint: StringGlideElement;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Isys_app_applicationColumns
     * @description Max length: 40
     */
    name: StringGlideElement;

    /**
     * Order
     * @type {GlideElementNumeric}
     * @memberof Isys_app_applicationColumns
     * @description Internal type is "decimal"
     */
    order: GlideElementNumeric;

    /**
     * Roles
     * @type {GlideElement}
     * @memberof Isys_app_applicationColumns
     * @description Internal type is "Array<user_roles>"
     */
    roles: GlideElement;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof Isys_app_applicationColumns
     * @default "global"
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof Isys_app_applicationColumns
     * @default "/"
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;

    /**
     * Overrides
     * @type {sys_app_applicationElementReference}
     * @memberof Isys_app_applicationColumns
     * @description Reference to table "sys_app_application"
     */
    sys_overrides: sys_app_applicationElementReference;

    /**
     * Title
     * @type {StringGlideElement}
     * @memberof Isys_app_applicationColumns
     * @description Internal type is "translated_field"
     *      Max length: 40
     */
    title: StringGlideElement;

    /**
     * View name
     * @type {StringGlideElement}
     * @memberof Isys_app_applicationColumns
     * @description Max length: 40
     */
    view_name: StringGlideElement;
}

declare type sys_app_applicationGlideRecord = sys_metadataGlideRecord & Isys_app_applicationColumns;

declare type sys_app_applicationElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isys_app_applicationColumns, sys_app_applicationGlideRecord>;

/**
 * GlideElement values from the Module table.
 * @interface Isys_app_moduleColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isys_app_moduleColumns extends Isys_metadataColumns {
    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof Isys_app_moduleColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Application menu
     * @type {sys_app_applicationElementReference}
     * @memberof Isys_app_moduleColumns
     * @description Reference to table "sys_app_application"
     */
    application: sys_app_applicationElementReference;

    /**
     * Assessment
     * @type {asmt_metric_typeElementReference}
     * @memberof Isys_app_moduleColumns
     * @description Reference to table "asmt_metric_type"
     */
    assessment: GlideElementReference;

    /**
     * Content Page
     * @type {content_pageElementReference}
     * @memberof Isys_app_moduleColumns
     * @description Reference to table "content_page"
     */
    content_page: GlideElementReference;

    /**
     * Device type
     * @type {StringGlideElement}
     * @memberof Isys_app_moduleColumns
     * @description Choices: "any": "Any"; "browser": "Browser"; "mobile": "Mobile"
     *      Max length: 40
     */
    device_type: StringGlideElement;

    /**
     * Filter
     * @type {GlideElementConditions}
     * @memberof Isys_app_moduleColumns
     */
    filter: GlideElementConditions;

    /**
     * Hint
     * @type {StringGlideElement}
     * @memberof Isys_app_moduleColumns
     * @description Internal type is "translated_field"
     *      Max length: 255
     */
    hint: StringGlideElement;

    /**
     * Homepage
     * @type {sys_portal_pageElementReference}
     * @memberof Isys_app_moduleColumns
     * @description Reference to table "sys_portal_page"
     */
    homepage: GlideElementReference;

    /**
     * Image (UI11)
     * @type {GlideElement}
     * @memberof Isys_app_moduleColumns
     * @description Internal type is "image"
     */
    image: GlideElement;

    /**
     * Link type
     * @type {StringGlideElement}
     * @memberof Isys_app_moduleColumns
     * @default "LIST"
     * @description Choices: "ASSESSMENT": "Assessment"; "CONTENT_PAGE": "Content Page"; "DOC_LINK": "Documentation Link"; "HOMEPAGE": "Homepage"; "HTML": "HTML (from Arguments:)"; "FILTER": "List Filter"; "LIST": "List of Records"; "MAP": "Map Page"; "NEW": "New Record"; "REPORT": "Run a Report"; "SCRIPT": "Script (from Arguments:)"; "SEARCH": "Search Screen"; "SEPARATOR": "Separator"; "DETAIL": "Single Record"; "SURVEY": "Survey"; "TIMELINE": "Timeline Page"; "DIRECT": "URL (from Arguments:)"
     *      Max length: 40
     */
    link_type: StringGlideElement;

    /**
     * Map page
     * @type {cmn_map_pageElementReference}
     * @memberof Isys_app_moduleColumns
     * @description Reference to table "cmn_map_page"
     */
    map_page: GlideElementReference;

    /**
     * Mobile title
     * @type {StringGlideElement}
     * @memberof Isys_app_moduleColumns
     * @description Internal type is "translated_field"
     *      Max length: 80
     */
    mobile_title: StringGlideElement;

    /**
     * Mobile view name
     * @type {StringGlideElement}
     * @memberof Isys_app_moduleColumns
     * @default "Mobile"
     * @description Max length: 40
     */
    mobile_view_name: StringGlideElement;

    /**
     * Table
     * @type {StringGlideElement}
     * @memberof Isys_app_moduleColumns
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    name: StringGlideElement;

    /**
     * Order
     * @type {GlideElementNumeric}
     * @memberof Isys_app_moduleColumns
     * @description Internal type is "decimal"
     */
    order: GlideElementNumeric;

    /**
     * Override application menu roles
     * @type {GlideElementBoolean}
     * @memberof Isys_app_moduleColumns
     * @default false
     */
    override_menu_roles: GlideElementBoolean;

    /**
     * Arguments
     * @type {StringGlideElement}
     * @memberof Isys_app_moduleColumns
     * @description Max length: 3500
     */
    query: StringGlideElement;

    /**
     * Report
     * @type {sys_reportElementReference}
     * @memberof Isys_app_moduleColumns
     * @description Reference to table "sys_report"
     */
    report: GlideElementReference;

    /**
     * Roles
     * @type {GlideElement}
     * @memberof Isys_app_moduleColumns
     * @description Internal type is "Array<user_roles>"
     */
    roles: GlideElement;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof Isys_app_moduleColumns
     * @default "global"
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof Isys_app_moduleColumns
     * @default "/"
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;

    /**
     * Overrides
     * @type {sys_app_moduleElementReference}
     * @memberof Isys_app_moduleColumns
     * @description Reference to table "sys_app_module"
     */
    sys_overrides: sys_app_moduleElementReference;

    /**
     * Timeline page
     * @type {cmn_timeline_pageElementReference}
     * @memberof Isys_app_moduleColumns
     * @description Reference to table "cmn_timeline_page"
     */
    timeline_page: GlideElementReference;

    /**
     * Title
     * @type {StringGlideElement}
     * @memberof Isys_app_moduleColumns
     * @description Internal type is "translated_field"
     *      Max length: 80
     */
    title: StringGlideElement;

    /**
     * Uncancelable by Other Modules
     * @type {GlideElementBoolean}
     * @memberof Isys_app_moduleColumns
     * @default false
     */
    uncancelable: GlideElementBoolean;

    /**
     * New Icon
     * @type {GlideElement}
     * @memberof Isys_app_moduleColumns
     * @description Internal type is "icon"
     */
    u_icon_2: GlideElement;

    /**
     * View name
     * @type {StringGlideElement}
     * @memberof Isys_app_moduleColumns
     * @default "javascript:var viewDefault='';if(current.device_type=='mobile') viewDefault='Mobile';else if(!current.application.nil() && current.application.device_type=='mobile' && current.device_type.nil()) viewDefault='Mobile';viewDefault"
     * @description Max length: 40
     */
    view_name: StringGlideElement;

    /**
     * Window name
     * @type {StringGlideElement}
     * @memberof Isys_app_moduleColumns
     * @description Max length: 40
     */
    window_name: StringGlideElement;
}

declare type sys_app_moduleGlideRecord = sys_metadataGlideRecord & Isys_app_moduleColumns;

declare type sys_app_moduleElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isys_app_moduleColumns, sys_app_moduleGlideRecord>;

/**
 * GlideElement values from the Task table.
 * @interface ItaskColumns
 */
declare interface ItaskColumns extends IGlideElementColumns {
    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof ItaskColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Activity due
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "due_date"
     *      Max length: 40
     */
    activity_due: StringGlideElement;

    /**
     * Additional assignee list
     * @type {GlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "glide_list"
     */
    additional_assignee_list: GlideElement;

    /**
     * Approval
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @default "not requested"
     * @description Choices: "rejected": "Rejected"; "approved": "Approved"; "requested": "Requested"; "not requested": "Not Yet Requested"
     *      Max length: 40
     */
    approval: TaskAppprovalGlideElement;

    /**
     * Approval history
     * @type {GlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "journal"
     */
    approval_history: GlideElement;

    /**
     * Approval set
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    approval_set: StringGlideElement;

    /**
     * Assigned to
     * @type {sys_userElementReference}
     * @memberof ItaskColumns
     * @description Reference to table "sys_user"
     */
    assigned_to: sys_userElementReference;

    /**
     * Assignment group
     * @type {sys_user_groupElementReference}
     * @memberof ItaskColumns
     * @description Reference to table "sys_user_group"
     */
    assignment_group: sys_user_groupElementReference;

    /**
     * Business duration
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @readonly
     * @description Internal type is "glide_duration"
     *      Max length: 40
     */
    business_duration: StringGlideElement;

    /**
     * Business service
     * @type {cmdb_ci_serviceElementReference}
     * @memberof ItaskColumns
     * @description Reference to table "cmdb_ci_service"
     */
    business_service: cmdb_ci_serviceElementReference;

    /**
     * Duration
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @readonly
     * @description Internal type is "glide_duration"
     *      Max length: 40
     */
    calendar_duration: StringGlideElement;

    /**
     * Closed
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    closed_at: StringGlideElement;

    /**
     * Closed by
     * @type {sys_userElementReference}
     * @memberof ItaskColumns
     * @description Reference to table "sys_user"
     */
    closed_by: sys_userElementReference;

    /**
     * Close notes
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @description Max length: 4000
     */
    close_notes: StringGlideElement;

    /**
     * Configuration item
     * @type {cmdb_ciElementReference}
     * @memberof ItaskColumns
     * @description Reference to table "cmdb_ci"
     */
    cmdb_ci: cmdb_ciElementReference;

    /**
     * Additional comments
     * @type {GlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "journal_input"
     */
    comments: GlideElement;

    /**
     * Comments and Work notes
     * @type {GlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "journal_list"
     */
    comments_and_work_notes: GlideElement;

    /**
     * Company
     * @type {core_companyElementReference}
     * @memberof ItaskColumns
     * @description Reference to table "core_company"
     */
    company: core_companyElementReference;

    /**
     * Contact type
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @description Choices: "email": "Email"; "phone": "Phone"; "self-service": "Self-service"; "virtual_agent": "Virtual Agent"; "walk-in": "Walk-in"
     *      Max length: 40
     */
    contact_type: TaskContactTypeGlideElement;

    /**
     * Contract
     * @type {ast_contractElementReference}
     * @memberof ItaskColumns
     * @description Reference to table "ast_contract"
     */
    contract: GlideElementReference;

    /**
     * Correlation display
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @description Max length: 100
     */
    correlation_display: StringGlideElement;

    /**
     * Correlation ID
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @description Max length: 100
     */
    correlation_id: StringGlideElement;

    /**
     * Delivery plan
     * @type {sc_cat_item_delivery_planElementReference}
     * @memberof ItaskColumns
     * @description Reference to table "sc_cat_item_delivery_plan"
     */
    delivery_plan: sc_cat_item_delivery_planElementReference;

    /**
     * Delivery task
     * @type {sc_cat_item_delivery_taskElementReference}
     * @memberof ItaskColumns
     * @description Reference to table "sc_cat_item_delivery_task"
     */
    delivery_task: sc_cat_item_delivery_taskElementReference;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @description Max length: 4000
     */
    description: StringGlideElement;

    /**
     * Due date
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    due_date: StringGlideElement;

    /**
     * Escalation
     * @type {GlideElementNumeric}
     * @memberof ItaskColumns
     * @readonly
     * @default 0
     * @description Choices: "3": "Overdue"; "2": "High"; "1": "Moderate"; "0": "Normal"
     */
    escalation: Task3ScaleGlideElement;

    /**
     * Expected start
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    expected_start: StringGlideElement;

    /**
     * Follow up
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    follow_up: StringGlideElement;

    /**
     * Group list
     * @type {GlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "glide_list"
     */
    group_list: GlideElement;

    /**
     * Impact
     * @type {GlideElementNumeric}
     * @memberof ItaskColumns
     * @default 3
     * @description Choices: "3": "3 - Low"; "2": "2 - Medium"; "1": "1 - High"
     */
    impact: Task3ScaleGlideElement;

    /**
     * Knowledge
     * @type {GlideElementBoolean}
     * @memberof ItaskColumns
     * @default false
     */
    knowledge: GlideElementBoolean;

    /**
     * Location
     * @type {cmn_locationElementReference}
     * @memberof ItaskColumns
     * @description Reference to table "cmn_location"
     */
    location: cmn_locationElementReference;

    /**
     * Made SLA
     * @type {GlideElementBoolean}
     * @memberof ItaskColumns
     * @default true
     */
    made_sla: GlideElementBoolean;

    /**
     * Number
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @default "javascript:getNextObjNumberPadded();"
     * @description Max length: 40
     */
    number: StringGlideElement;

    /**
     * Opened
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @default "javascript:gs.nowDateTime()"
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    opened_at: StringGlideElement;

    /**
     * Opened by
     * @type {sys_userElementReference}
     * @memberof ItaskColumns
     * @default "javascript:gs.getUserID()"
     * @description Reference to table "sys_user"
     */
    opened_by: sys_userElementReference;

    /**
     * Order
     * @type {GlideElementNumeric}
     * @memberof ItaskColumns
     */
    order: GlideElementNumeric;

    /**
     * Parent
     * @type {taskElementReference}
     * @memberof ItaskColumns
     * @description Reference to table "task"
     */
    parent: taskElementReference;

    /**
     * Priority
     * @type {GlideElementNumeric}
     * @memberof ItaskColumns
     * @default 4
     * @description Choices: "5": "5 - Planning"; "4": "4 - Low"; "3": "3 - Moderate"; "2": "2 - High"; "1": "1 - Critical"
     */
    priority: TaskPriorityGlideElement;

    /**
     * Reassignment count
     * @type {GlideElementNumeric}
     * @memberof ItaskColumns
     * @default 0
     */
    reassignment_count: GlideElementNumeric;

    /**
     * Service offering
     * @type {service_offeringElementReference}
     * @memberof ItaskColumns
     * @description Reference to table "service_offering"
     */
    service_offering: service_offeringElementReference;

    /**
     * Short description
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @description Choices: "Issue with a web page": "Issue with a web page"; "Issue with email": "Issue with email"; "Issue with networking": "Issue with networking"; "New employee hire": "New employee hire"; "Request for a Blackberry": "Request for a Blackberry"; "Request for a new service": "Request for a new service"; "Request for help": "Request for help"; "Request for new or upgraded hardware": "Request for new or upgraded hardware"; "Request for new or upgraded software": "Request for new or upgraded software"; "Reset my password": "Reset my password"
     *      Max length: 160
     */
    short_description: StringGlideElement;

    /**
     * Skills
     * @type {GlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "glide_list"
     */
    skills: GlideElement;

    /**
     * SLA due
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "due_date"
     *      Max length: 40
     */
    sla_due: StringGlideElement;

    /**
     * State
     * @type {GlideElementNumeric}
     * @memberof ItaskColumns
     * @default 1
     * @description Choices: "7": "Closed Skipped"; "4": "Closed Incomplete"; "3": "Closed Complete"; "2": "Work in Progress"; "1": "Open"; "-5": "Pending"
     */
    state: TaskStateGlideElement;

    /**
     * Task type
     * @type {GlideElementSysClassName}
     * @memberof ItaskColumns
     * @default "javascript:current.getTableName();"
     */
    sys_class_name: GlideElementSysClassName;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof ItaskColumns
     * @default "global"
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof ItaskColumns
     * @default "/"
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;

    /**
     * Time worked
     * @type {GlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "timer"
     */
    time_worked: GlideElement;

    /**
     * Upon approval
     * @type {IStringChoiceGlideElement<"proceed" | "do_nothing"> & GlideElement}
     * @memberof ItaskColumns
     * @default "proceed"
     * @description Choices: "do_nothing": "Wait for a User to Close this task"; "proceed": "Proceed to Next Task"
     *      Max length: 40
     */
    upon_approval: IStringChoiceGlideElement<"proceed" | "do_nothing"> & GlideElement;
    /**
     * Upon reject
     * @type {IStringChoiceGlideElement<"cancel" | "goto"> & GlideElement}
     * @memberof ItaskColumns
     * @default "cancel"
     * @description Choices: "goto": "Go to a previous Task"; "cancel": "Cancel all future Tasks"
     *      Max length: 40
     */
    upon_reject: IStringChoiceGlideElement<"cancel" | "goto"> & GlideElement;

    /**
     * Urgency
     * @type {Task3ScaleGlideElement}
     * @memberof ItaskColumns
     * @default 3
     * @description Choices: "3": "3 - Low"; "2": "2 - Medium"; "1": "1 - High"
     */
    urgency: Task3ScaleGlideElement;

    /**
     * User input
     * @type {GlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "user_input"
     */
    user_input: GlideElement;

    /**
     * Watch list
     * @type {GlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "glide_list"
     */
    watch_list: GlideElement;

    /**
     * Actual end
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    work_end: StringGlideElement;

    /**
     * Work notes
     * @type {GlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "journal_input"
     */
    work_notes: GlideElement;

    /**
     * Work notes list
     * @type {GlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "glide_list"
     */
    work_notes_list: GlideElement;

    /**
     * Actual start
     * @type {StringGlideElement}
     * @memberof ItaskColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    work_start: StringGlideElement;
}

declare type taskGlideRecord = GlideRecord & ItaskColumns;
declare type taskElementReference = GlidePropertiesElementReference<ItaskColumns, taskGlideRecord>;

declare namespace com {
    export namespace glide {
        export namespace script {
            export abstract class FieldGlideDescriptor extends GlideElement {
            }
        }
    }
}