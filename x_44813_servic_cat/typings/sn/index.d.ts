/// <reference path="baseGlobals.d.ts" />

/**
 * GlideElement values from the Application File table.
 * @interface Isys_metadataProperties
 */
declare interface Isys_metadataProperties extends IGlideTableProperties {
    /**
     * Class
     * @type {GlideStringValue<GlideElementSysClassName>}
     * @memberof Isys_metadataProperties
     * @default "javascript:current.getTableName();"
     */
    sys_class_name: NilableStringGlideElementValue<GlideElementSysClassName>;

    /**
     * Display name
     * @type {GlideString}
     * @memberof Isys_metadataProperties
     * @description Max length: 255
     */
    sys_name: GlideString;

    /**
     * Package
     * @type {NilableGlideReferenceValue<Isys_packageProperties>}
     * @memberof Isys_metadataProperties
     * @readonly
     * @description Reference to table "sys_package"
     */
    sys_package: NilableGlideReferenceValue<Isys_packageProperties>;

    /**
     * Protection policy
     * @type {GlideStringValue<"protected" | "read">}
     * @memberof Isys_metadataProperties
     * @description Choices: "protected": "Protected"; "read": "Read-only"
     *      Max length: 40
     */
    sys_policy: GlideStringValue<"protected" | "read">;

    /**
     * Application
     * @type {NilableGlideReferenceValue<Isys_scopeProperties>}
     * @memberof Isys_metadataProperties
     * @default "javascript:(((typeof parent == 'object') && parent != null && parent.getTableName() == 'sys_app') ? parent.sys_id : gs.getCurrentApplicationId())"
     * @description Reference to table "sys_scope"
     */
    sys_scope: NilableGlideReferenceValue<Isys_scopeProperties>;

    /**
     * Update name
     * @type {GlideString}
     * @memberof Isys_metadataProperties
     * @description Max length: 250
     */
    sys_update_name: GlideString;
}

declare interface Isys_packageProperties extends IGlideTableProperties {
    /**
     * Active
     * @type {GlideBoolean}
     * @memberof Isys_packageColumns
     * @default true
     */
    active: GlideBoolean;

    /**
     * Subscription requirement
     * @type {GlideStringValue<"enforce" | "log" | "none">}
     * @memberof Isys_packageColumns
     * @default "none"
     * @description Choices: "enforce": "Required"; "log": "Monitor"; "none": "None"
     *      Max length: 40
     */
    enforce_license: GlideStringValue<"enforce" | "log" | "none">;

    /**
     * Licensable
     * @type {GlideBoolean}
     * @memberof Isys_packageColumns
     */
    licensable: GlideBoolean;

    /**
     * Subscription Category
     * @type {GlideStringValue<"beta" | "general" | "none">}
     * @memberof Isys_packageColumns
     * @default "none"
     * @description Choices: "beta": "Beta"; "general": "General"; "none": "Not applicable"
     *      Max length: 40
     */
    license_category: GlideStringValue<"beta" | "general" | "none">;

    /**
     * Subscription Model
     * @type {GlideStringValue<"app_use" | "mixed" | "capacity" | "producer" | "fulfiller" | "none">}
     * @memberof Isys_packageColumns
     * @default "none"
     * @description Choices: "app_use": "Application in use"; "mixed": "Mixed"; "capacity": "Capacity"; "producer": "Producer"; "fulfiller": "Fulfiller/Requester"; "none": "Not applicable"
     *      Max length: 40
     */
    license_model: GlideStringValue<"app_use" | "mixed" | "capacity" | "producer" | "fulfiller" | "none">;

    /**
     * Name
     * @type {GlideString}
     * @memberof Isys_packageColumns
     * @description Max length: 100
     */
    name: GlideString;

    /**
     * ID
     * @type {GlideString}
     * @memberof Isys_packageColumns
     * @description Max length: 100
     */
    source: GlideString;

    /**
     * Class
     * @type {NilableStringGlideElementValue<GlideElementSysClassName>}
     * @memberof Isys_packageColumns
     * @default "javascript:current.getTableName();"
     */
    sys_class_name: NilableStringGlideElementValue<GlideElementSysClassName>;

    /**
     * Trackable
     * @type {GlideBoolean}
     * @memberof Isys_packageColumns
     * @default false
     */
    trackable: GlideBoolean;

    /**
     * Version
     * @type {RhinoJava.Nilable<GlideElement>}
     * @memberof Isys_packageColumns
     * @description Internal type is "version"
     */
    version: RhinoJava.Nilable<GlideElement>;
}

declare interface Isys_scopeProperties extends IGlideTableProperties {
    /**
     * JavaScript Mode
     * @type {GlideStringValue<"helsinki_es5" | "traditional">}
     * @memberof Isys_scopeColumns
     * @default "helsinki_es5"
     * @description Choices: "helsinki_es5": "ES5 Standards Mode"; "traditional": "Compatibility Mode"
     *      Max length: 40
     */
    js_level: GlideStringValue<"helsinki_es5" | "traditional">;

    /**
     * Logo
     * @type {NilableStringGlideElementValue<GlideElementUserImage>}
     * @memberof Isys_scopeColumns
     */
    logo: NilableStringGlideElementValue<GlideElementUserImage>;

    /**
     * Private
     * @type {GlideBoolean}
     * @memberof Isys_scopeColumns
     * @default false
     */
    private: GlideBoolean;

    /**
     * Restrict Table Choices
     * @type {GlideBoolean}
     * @memberof Isys_scopeColumns
     * @default false
     */
    restrict_table_access: GlideBoolean;

    /**
     * Restrict Runtime Access
     * @type {GlideStringValue<"enforcing" | "permissive">}
     * @memberof Isys_scopeColumns
     * @description Choices: "enforcing": "Enforcing"; "permissive": "Tracking"
     *      Max length: 40
     */
    runtime_access_tracking: GlideStringValue<"enforcing" | "permissive">;

    /**
     * Scope
     * @type {GlideString}
     * @memberof Isys_scopeColumns
     * @description Max length: 18
     */
    scope: GlideString;

    /**
     * Application administration
     * @type {GlideBoolean}
     * @memberof Isys_scopeColumns
     * @default false
     */
    scoped_administration: GlideBoolean;

    /**
     * Short description
     * @type {GlideString}
     * @memberof Isys_scopeColumns
     * @description Max length: 160
     */
    short_description: GlideString;

    /**
     * Template
     * @type {GlideStringValue<"service" | "esa">}
     * @memberof Isys_scopeColumns
     * @readonly
     * @description Choices: "service": "Service"; "esa": "ESA"
     *      Max length: 40
     */
    template: GlideStringValue<"service" | "esa">;

    /**
     * Vendor
     * @type {GlideString}
     * @memberof Isys_scopeColumns
     * @description Max length: 40
     */
    vendor: GlideString;

    /**
     * Vendor prefix
     * @type {GlideString}
     * @memberof Isys_scopeColumns
     * @readonly
     * @description Max length: 40
     */
    vendor_prefix: GlideString;
}

/**
 * GlideElement values from the Number table.
 * @interface Isys_numberProperties
 * @extends {Isys_metadataProperties}
 */
declare interface Isys_numberProperties extends Isys_metadataProperties {
    /**
     * Table
     * @type {NilableGlideReferenceValue<Isys_db_objectProperties>}
     * @memberof Isys_numberProperties
     * @description Reference to table "sys_db_object"
     */
    category: NilableGlideReferenceValue<Isys_db_objectProperties>;

    /**
     * Number of digits
     * @type {GlideNumber}
     * @memberof Isys_numberProperties
     * @default 7
     */
    maximum_digits: GlideNumber;

    /**
     * Number
     * @type {GlideNumber}
     * @memberof Isys_numberProperties
     * @default 1000
     */
    number: GlideNumber;

    /**
     * Prefix
     * @type {GlideString}
     * @memberof Isys_numberProperties
     * @description Max length: 40
     */
    prefix: GlideString;
}

/**
 * GlideElement values from the Encryption Context table.
 * @interface Isys_encryption_contextProperites
 * @extends {Isys_metadataProperties}
 */
declare interface Isys_encryption_contextProperites extends Isys_metadataProperties {
    /**
     * Encryption key
     * @type {NilableStringGlideElementValue<GlideElementPassword2>}
     * @memberof Isys_encryption_contextProperites
     */
    encryption_key: NilableStringGlideElementValue<GlideElementPassword2>;

    /**
     * Name
     * @type {GlideString}
     * @memberof Isys_encryption_contextProperites
     * @description Max length: 40
     */
    name: GlideString;

    /**
     * Type
     * @type {GlideStringValue<"AES" | "AES256" | "3DES">}
     * @memberof Isys_encryption_contextProperites
     * @default "AES"
     * @description Choices: "AES": "AES 128-bit"; "AES256": "AES 256-bit"; "3DES": "Triple DES"
     *      Max length: 40
     */
    type: GlideStringValue<"AES" | "AES256" | "3DES">;
}

/**
 * GlideElement values from the Table table.
 * @interface Isys_db_objectProperties
 * @extends {Isys_metadataProperties}
 */
declare interface Isys_db_objectProperties extends Isys_metadataProperties {
    /**
     * Accessible from
     * @type {GlideStringValue<"package_private" | "public">}
     * @memberof Isys_db_objectProperties
     * @default "public"
     * @description Choices: "package_private": "This application scope only"; "public": "All application scopes"
     *      Max length: 40
     */
    access: GlideStringValue<"package_private" | "public">;

    /**
     * Allow UI actions
     * @type {GlideBoolean}
     * @memberof Isys_db_objectProperties
     * @default false
     */
    actions_access: GlideBoolean;

    /**
     * Allow new fields
     * @type {GlideBoolean}
     * @memberof Isys_db_objectProperties
     * @default false
     */
    alter_access: GlideBoolean;

    /**
     * Caller Access
     * @type {GlideString}
     * @memberof Isys_db_objectProperties
     * @description Choices: "2": "Caller Restriction"; "1": "Caller Tracking"
     *      Max length: 40
     */
    caller_access: GlideString;

    /**
     * Allow client scripts
     * @type {GlideBoolean}
     * @memberof Isys_db_objectProperties
     * @default false
     */
    client_scripts_access: GlideBoolean;

    /**
     * Allow configuration
     * @type {GlideBoolean}
     * @memberof Isys_db_objectProperties
     * @default false
     */
    configuration_access: GlideBoolean;

    /**
     * Can create
     * @type {GlideBoolean}
     * @memberof Isys_db_objectProperties
     * @default false
     */
    create_access: GlideBoolean;

    /**
     * Create access controls
     * @type {GlideBoolean}
     * @memberof Isys_db_objectProperties
     */
    create_access_controls: GlideBoolean;

    /**
     * Can delete
     * @type {GlideBoolean}
     * @memberof Isys_db_objectProperties
     * @default false
     */
    delete_access: GlideBoolean;

    /**
     * Extension model
     * @type {GlideString}
     * @memberof Isys_db_objectProperties
     * @readonly
     * @description Choices: "partition": "Table per partition"; "hierarchy": "Table per hierarchy"; "class": "Table per class"
     *      Max length: 40
     */
    extension_model: GlideString;

    /**
     * Extensible
     * @type {GlideBoolean}
     * @memberof Isys_db_objectProperties
     * @default false
     */
    is_extendable: GlideBoolean;

    /**
     * Label
     * @type {NilableStringGlideElementValue<GlideElementDocumentation>}
     * @memberof Isys_db_objectProperties
     */
    label: NilableStringGlideElementValue<GlideElementDocumentation>;

    /**
     * Live feed
     * @type {GlideBoolean}
     * @memberof Isys_db_objectProperties
     * @default false
     */
    live_feed_enabled: GlideBoolean;

    /**
     * Name
     * @type {GlideString}
     * @memberof Isys_db_objectProperties
     * @description Max length: 80
     */
    name: GlideString;

    /**
     * Auto number
     * @type {NilableGlideReferenceValue<Isys_numberProperties>}
     * @memberof Isys_db_objectProperties
     * @description Reference to table "sys_number"
     */
    number_ref: NilableGlideReferenceValue<Isys_numberProperties>;

    /**
     * Provider class
     * @type {GlideString}
     * @memberof Isys_db_objectProperties
     * @description Max length: 100
     */
    provider_class: GlideString;

    /**
     * Can read
     * @type {GlideBoolean}
     * @memberof Isys_db_objectProperties
     * @default true
     */
    read_access: GlideBoolean;

    /**
     * Extends table
     * @type {NilableGlideReferenceValue<Isys_db_objectProperties>}
     * @memberof Isys_db_objectProperties
     * @description Reference to table "sys_db_object"
     */
    super_class: NilableGlideReferenceValue<Isys_db_objectProperties>;

    /**
     * Sys class code
     * @type {RhinoJava.Nilable<GlideElement>}
     * @memberof Isys_db_objectProperties
     * @description Internal type is "sys_class_code"
     */
    sys_class_code: RhinoJava.Nilable<GlideElement>;

    /**
     * Sys class path
     * @type {RhinoJava.Nilable<GlideElement>}
     * @memberof Isys_db_objectProperties
     * @description Internal type is "sys_class_path"
     */
    sys_class_path: RhinoJava.Nilable<GlideElement>;

    /**
     * Can update
     * @type {GlideBoolean}
     * @memberof Isys_db_objectProperties
     * @default false
     */
    update_access: GlideBoolean;

    /**
     * User role
     * @type {NilableGlideReferenceValue<Isys_user_roleColumns>}
     * @memberof Isys_db_objectProperties
     * @description Reference to table "sys_user_role"
     */
    user_role: NilableGlideReferenceValue<Isys_user_roleColumns>;

    /**
     * Allow access to this table via web services
     * @type {GlideBoolean}
     * @memberof Isys_db_objectProperties
     * @default true
     */
    ws_access: GlideBoolean;
}

/**
 * GlideElement values from the Field class table.
 * @interface Isys_glide_objectProperties
 * @extends {Isys_metadataProperties}
 */
declare interface Isys_glide_objectProperties extends Isys_metadataProperties {
    /**
     * Attributes
     * @type {GlideString}
     * @memberof Isys_glide_objectProperties
     * @description Max length: 255
     */
    attributes: GlideString;

    /**
     * Class name
     * @type {GlideString}
     * @memberof Isys_glide_objectProperties
     * @description Max length: 80
     */
    class_name: GlideString;

    /**
     * Label
     * @type {GlideString}
     * @memberof Isys_glide_objectProperties
     * @description Internal type is "translated_field"
     *      Max length: 40
     */
    label: GlideString;

    /**
     * Name
     * @type {GlideString}
     * @memberof Isys_glide_objectProperties
     * @description Max length: 40
     */
    name: GlideString;

    /**
     * Length
     * @type {GlideString}
     * @memberof Isys_glide_objectProperties
     * @description Max length: 40
     */
    scalar_length: GlideString;

    /**
     * Extends
     * @type {GlideString}
     * @memberof Isys_glide_objectProperties
     * @default "string"
     * @description Choices: "binary": "Binary"; "boolean": "Boolean"; "char": "Char"; "date": "Date"; "datetime": "Date/Time"; "decimal": "Decimal"; "float": "Floating Point Number"; "integer": "Integer"; "longint": "Longint"; "string": "String"; "GUID": "Sys ID"; "time": "Time"
     *      Max length: 40
     */
    scalar_type: GlideString;

    /**
     * Use original value
     * @type {GlideBoolean}
     * @memberof Isys_glide_objectProperties
     * @default true
     */
    use_original_value: GlideBoolean;

    /**
     * Visible
     * @type {GlideBoolean}
     * @memberof Isys_glide_objectProperties
     */
    visible: GlideBoolean;
}

/**
 * GlideElement values from the Dictionary Entry table.
 * @interface Isys_dictionaryColumns
 * @extends {Isys_metadataProperties}
 */
declare interface Isys_dictionaryColumns extends Isys_metadataProperties {
    /**
     * Active
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     * @default true
     */
    active: GlideBoolean;

    /**
     * Array
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    array: GlideBoolean;

    /**
     * Array denormalized
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    array_denormalized: GlideBoolean;

    /**
     * Attributes
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 1000
     */
    attributes: GlideString;

    /**
     * Audit
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    audit: GlideBoolean;

    /**
     * Calculation
     * @type {NilableStringGlideElementValue<GlideElementScript>}
     * @memberof Isys_dictionaryColumns
     */
    calculation: NilableStringGlideElementValue<GlideElementScript>;

    /**
     * Choice
     * @type {GlideNumber}
     * @memberof Isys_dictionaryColumns
     * @description Choices: "2": "Suggestion"; "1": "Dropdown with -- None --"; "3": "Dropdown without -- None -- (must specify a default value)"
     */
    choice: GlideNumber;

    /**
     * Choice field
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "field_name"
     *      Max length: 80
     */
    choice_field: GlideString;

    /**
     * Choice table
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    choice_table: GlideString;

    /**
     * Column label
     * @type {NilableStringGlideElementValue<GlideElementDocumentation>}
     * @memberof Isys_dictionaryColumns
     */
    column_label: NilableStringGlideElementValue<GlideElementDocumentation>;

    /**
     * Comments
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 4000
     */
    comments: GlideString;

    /**
     * Create roles
     * @type {RhinoJava.Nilable<GlideElement>}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "user_roles"
     */
    create_roles: RhinoJava.Nilable<GlideElement>;

    /**
     * Defaultsort
     * @type {GlideNumber}
     * @memberof Isys_dictionaryColumns
     */
    defaultsort: GlideNumber;

    /**
     * Default value
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 512
     */
    default_value: GlideString;

    /**
     * Delete roles
     * @type {RhinoJava.Nilable<GlideElement>}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "user_roles"
     */
    delete_roles: RhinoJava.Nilable<GlideElement>;

    /**
     * Dependent
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 80
     */
    dependent: GlideString;

    /**
     * Dependent on field
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "field_name"
     *      Max length: 80
     */
    dependent_on_field: GlideString;

    /**
     * Display
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    display: GlideBoolean;

    /**
     * Dynamic creation
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    dynamic_creation: GlideBoolean;

    /**
     * Dynamic creation script
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 4000
     */
    dynamic_creation_script: GlideString;

    /**
     * Dynamic default value
     * @type {NilableGlideElementReferenceValue}
     * @memberof Isys_dictionaryColumns
     * @description Reference to table "sys_filter_option_dynamic"
     */
    dynamic_default_value: NilableGlideElementReferenceValue;

    /**
     * Dynamic ref qual
     * @type {NilableGlideElementReferenceValue}
     * @memberof Isys_dictionaryColumns
     * @description Reference to table "sys_filter_option_dynamic"
     */
    dynamic_ref_qual: NilableGlideElementReferenceValue;

    /**
     * Column name
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 80
     */
    element: GlideString;

    /**
     * Element reference
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    element_reference: GlideBoolean;

    /**
     * Foreign database
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 40
     */
    foreign_database: GlideString;

    /**
     * Function definition
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 4000
     */
    function_definition: GlideString;

    /**
     * Function field
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     * @default false
     */
    function_field: GlideBoolean;

    /**
     * Type
     * @type {sys_glide_objectElementReference}
     * @memberof Isys_dictionaryColumns
     * @description Reference to table "sys_glide_object"
     */
    internal_type: NilableGlideReferenceValue<Isys_glide_objectProperties>;

    /**
     * Mandatory
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    mandatory: GlideBoolean;

    /**
     * Max length
     * @type {GlideNumber}
     * @memberof Isys_dictionaryColumns
     */
    max_length: GlideNumber;

    /**
     * Table
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    name: GlideString;

    /**
     * Next element
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @readonly
     * @description Max length: 80
     */
    next_element: GlideString;

    /**
     * Primary
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    primary: GlideBoolean;

    /**
     * Read only
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    read_only: GlideBoolean;

    /**
     * Read roles
     * @type {GlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "user_roles"
     */
    read_roles: RhinoJava.Nilable<GlideElement>;

    /**
     * Reference
     * @type {NilableGlideReferenceValue<Isys_db_objectProperties>}
     * @memberof Isys_dictionaryColumns
     * @description Reference to table "sys_db_object"
     */
    reference: NilableGlideReferenceValue<Isys_db_objectProperties>;

    /**
     * Reference cascade rule
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Choices: "cascade": "Cascade"; "clear": "Clear"; "delete": "Delete"; "delete_no_workflow": "Delete no workflow"; "none": "None"; "restrict": "Restrict"
     *      Max length: 20
     */
    reference_cascade_rule: GlideString;

    /**
     * Reference floats
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    reference_floats: GlideBoolean;

    /**
     * Reference key
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 40
     */
    reference_key: GlideString;

    /**
     * Reference qual
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 1000
     */
    reference_qual: GlideString;

    /**
     * Reference qual condition
     * @type {GlideElementConditions}
     * @memberof Isys_dictionaryColumns
     */
    reference_qual_condition: NilableStringGlideElementValue<GlideElementConditions>;

    /**
     * Reference type
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 10
     */
    reference_type: GlideString;

    /**
     * Sizeclass
     * @type {GlideNumber}
     * @memberof Isys_dictionaryColumns
     */
    sizeclass: GlideNumber;

    /**
     * Spell check
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    spell_check: GlideBoolean;

    /**
     * Staged
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     * @default false
     */
    staged: GlideBoolean;

    /**
     * Table reference
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    table_reference: GlideBoolean;

    /**
     * Text index
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    text_index: GlideBoolean;

    /**
     * Unique
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    unique: GlideBoolean;

    /**
     * Use dependent field
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     * @default false
     */
    use_dependent_field: GlideBoolean;

    /**
     * Use dynamic default
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    use_dynamic_default: GlideBoolean;

    /**
     * Use reference qualifier
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @default "simple"
     * @description Choices: "advanced": "Advanced"; "dynamic": "Dynamic"; "simple": "Simple"
     *      Max length: 40
     */
    use_reference_qualifier: GlideString;

    /**
     * Calculated
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    virtual: GlideBoolean;

    /**
     * Widget
     * @type {GlideString}
     * @memberof Isys_dictionaryColumns
     * @description Max length: 40
     */
    widget: GlideString;

    /**
     * Write roles
     * @type {GlideElement}
     * @memberof Isys_dictionaryColumns
     * @description Internal type is "user_roles"
     */
    write_roles: RhinoJava.Nilable<GlideElement>;

    /**
     * XML view
     * @type {GlideBoolean}
     * @memberof Isys_dictionaryColumns
     */
    xml_view: GlideBoolean;
}

/**
 * GlideElement values from the Choice table.
 * @interface Isys_choiceColumns
 */
declare interface Isys_choiceColumns extends IGlideTableProperties {
    /**
     * Dependent value
     * @type {GlideString}
     * @memberof Isys_choiceColumns
     * @description Max length: 100
     */
    dependent_value: GlideString;

    /**
     * Element
     * @type {GlideString}
     * @memberof Isys_choiceColumns
     * @description Max length: 40
     */
    element: GlideString;

    /**
     * Hint
     * @type {GlideString}
     * @memberof Isys_choiceColumns
     * @description Max length: 255
     */
    hint: GlideString;

    /**
     * Inactive
     * @type {GlideBoolean}
     * @memberof Isys_choiceColumns
     * @default false
     */
    inactive: GlideBoolean;

    /**
     * Label
     * @type {GlideString}
     * @memberof Isys_choiceColumns
     * @description Max length: 100
     */
    label: GlideString;

    /**
     * Language
     * @type {GlideString}
     * @memberof Isys_choiceColumns
     * @default "en"
     * @description Max length: 2
     */
    language: GlideString;

    /**
     * Table
     * @type {GlideString}
     * @memberof Isys_choiceColumns
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    name: GlideString;

    /**
     * Sequence
     * @type {GlideNumber}
     * @memberof Isys_choiceColumns
     */
    sequence: GlideNumber;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof Isys_choiceColumns
     * @default "global"
     */
    sys_domain: NilableStringGlideElementValue<GlideElementDomainId>;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof Isys_choiceColumns
     * @default "/"
     * @description Internal type is "domain_path"
     */
    sys_domain_path: RhinoJava.Nilable<GlideElement>;

    /**
     * Value
     * @type {GlideString}
     * @memberof Isys_choiceColumns
     * @description Max length: 4000
     */
    value: GlideString;
}

/**
 * GlideElement values from the Role table.
 * @interface Isys_user_roleColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isys_user_roleColumns extends Isys_metadataProperties {
    /**
     * Assignable by
     * @type {sys_user_roleElementReference}
     * @memberof Isys_user_roleColumns
     * @description Reference to table "sys_user_role"
     */
    assignable_by: NilableGlideReferenceValue<Isys_user_roleColumns>;

    /**
     * Can delegate
     * @type {GlideBoolean}
     * @memberof Isys_user_roleColumns
     * @default true
     */
    can_delegate: GlideBoolean;

    /**
     * Description
     * @type {GlideString}
     * @memberof Isys_user_roleColumns
     * @description Max length: 1000
     */
    description: GlideString;

    /**
     * Elevated privilege
     * @type {GlideBoolean}
     * @memberof Isys_user_roleColumns
     * @default false
     */
    elevated_privilege: GlideBoolean;

    /**
     * Encryption context
     * @type {NilableGlideReferenceValue<Isys_encryption_contextProperites>}
     * @memberof Isys_user_roleColumns
     * @description Reference to table "sys_encryption_context"
     */
    encryption_context: NilableGlideReferenceValue<Isys_encryption_contextProperites>;

    /**
     * Grantable
     * @type {GlideBoolean}
     * @memberof Isys_user_roleColumns
     * @default true
     */
    grantable: GlideBoolean;

    /**
     * Includes roles
     * @type {GlideString}
     * @memberof Isys_user_roleColumns
     * @description Internal type is "Array<string>"
     *      Max length: 40
     */
    includes_roles: GlideString;

    /**
     * Name
     * @type {GlideString}
     * @memberof Isys_user_roleColumns
     * @description Max length: 100
     */
    name: GlideString;

    /**
     * Requires Subscription
     * @type {GlideString}
     * @memberof Isys_user_roleColumns
     * @default "-1"
     * @description Choices: "0": "No"; "-1": "Unspecified"; "1": "Yes"
     *      Max length: 40
     */
    requires_subscription: GlideString;

    /**
     * Application Administrator
     * @type {GlideBoolean}
     * @memberof Isys_user_roleColumns
     * @default false
     */
    scoped_admin: GlideBoolean;

    /**
     * Suffix
     * @type {GlideString}
     * @memberof Isys_user_roleColumns
     * @description Max length: 100
     */
    suffix: GlideString;
}
