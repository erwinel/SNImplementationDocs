
declare interface GlideElementDescriptor {
    getAttachmentEncryptionType(): string;
    getEncryptionType(): string;
    getInternalType(): string;
    getLabel(): string;
    getLength(): number;
    getName(): string;
    getPlural(): string;
    hasAttachmentsEncrypted(): boolean;
    isAutoOrSysID(): boolean;
    isChoiceTable(): boolean;
    isEdgeEncrypted(): boolean;
    isVirtual(): boolean;
}

declare interface IGlideElement {
    sys_id: GlideElement;
    sys_created_by: GlideElement;
    sys_created_on: GlideElement;
    sys_mod_count: GlideElement;
    sys_updated_by: GlideElement;
    sys_updated_on: GlideElement;
    canCreate(): boolean;
    canRead(): boolean;
    canWrite(): boolean;
    changes(): boolean;
    changesFrom(o: any): boolean;
    changesTo(o: any): boolean;
    dateNumericValue(): number;
    getAttribute(attributeName: string): string;
    getBooleanAttribute(attributeName: string): boolean;
    getChoices(dependent?: string): any[];
    getChoiceValue(): string;
    getDecryptedValue(): string;
    getDisplayValue(maxCharacters?: number): string;
    getED(): GlideElementDescriptor;
    getGlobalDisplayValue(): string;
    getHTMLValue(maxCharacters?: number): string;
    getJournalEntry(mostRecent: number): string;
    /**
     * Gets the object label.
     * @returns {string} The object label.
     */
    getLabel(): string;

    // getModifiedBy(): string;

    /**
     * Gets the name of the field.
     * @returns {string} The name of the field.
     */
    getName(): string;
    getReferenceTable(): string;
    getRefRecord(): IGlideRecord;
    getTableName(): string;
    getValue(): string;

    /**
     * Determines if a field is null.
     * @returns {boolean} True if the field is null or an empty string, false if not.
     */
    nil(): boolean;

    setDateNumericValue(milliseconds: number): void;
    setDisplayValue(value: any): void;
    setError(errorMessage: string): void;
    setPhoneNumber(phoneNumber: any, strict: boolean): void;

    /**
     * Sets the value of a field.
     * @param {*} value Object value to set the field to.
     */
    setValue(value: any): void;

    /**
     * Converts the value to a string.
     * @returns {string} The value as a string
     */
    toString(): string;
}

declare interface GlideElement extends IGlideRefElement<IGenericGlideRecord> { }
declare interface IGlideRefElement<T extends IGlideRecord> extends IGlideElement {
    getRefRecord(): T;
}
declare interface Icmn_departmentGlideElement extends IGlideRefElement<Icmn_departmentGlideRecord> {
    business_unit: Ibusiness_unitGlideElement;
    code: GlideElement;
    company: GlideElement;
    cost_center: GlideElement;
    dept_head: IArmyUserGlideElement;
    description: GlideElement;
    head_count: GlideElement;
    id: GlideElement;
    name: GlideElement;
    parent: Icmn_departmentGlideElement;
    primary_contact: IArmyUserGlideElement;
}
declare interface Ibusiness_unitGlideElement extends IGlideRefElement<Ibusiness_unitGlideRecord> {
    bu_head: IArmyUserGlideElement;
    company: GlideElement;
    description: GlideElement;
    sys_domain: GlideElement;
    sys_domain_path: GlideElement;
    hierarchy_level: GlideElement;
    name: GlideElement;
    parent: Ibusiness_unitGlideElement;
}
declare interface IlocationGlideElement extends IGlideRefElement<IlocationGlideRecord> {
    city: GlideElement;
    company: GlideElement;
    contact: IArmyUserGlideElement;
    country: GlideElement;
    fax_phone: GlideElement;
    full_name: GlideElement;
    lat_long_error: GlideElement;
    latitude: GlideElement;
    longitude: GlideElement;
    name: GlideElement;
    parent: IlocationGlideElement;
    phone: GlideElement;
    phone_territory: GlideElement;
    state: GlideElement;
    stock_room: GlideElement;
    street: GlideElement;
    time_zone: GlideElement;
    zip: GlideElement;
}
declare interface Isys_user_IGlideElementBase<T extends Isys_user_GlideRecord> extends IGlideRefElement<T> {
    accumulated_roles: GlideElement;
    active: GlideElement;
    agent_status: GlideElement;
    average_daily_fte: GlideElement;
    building: Icmn_buildingGlideElement;
    business_criticality: GlideElement;
    calendar_integration: GlideElement;
    city: GlideElement;
    company: GlideElement;
    cost_center: GlideElement;
    country: GlideElement;
    date_format: GlideElement;
    default_perspective: GlideElement;
    department: Icmn_departmentGlideElement;
    edu_status: GlideElement;
    email: GlideElement;
    employee_number: GlideElement;
    enable_multifactor_authn: GlideElement;
    failed_attempts: GlideElement;
    first_name: GlideElement;
    gender: GlideElement;
    geolocation_tracked: GlideElement;
    home_phone: GlideElement;
    internal_integration_user: GlideElement;
    introduction: GlideElement;
    last_login: GlideElement;
    last_login_device: GlideElement;
    last_login_time: GlideElement;
    last_name: GlideElement;
    last_password: GlideElement;
    last_position_update: GlideElement;
    latitude: GlideElement;
    ldap_server: GlideElement;
    location: IlocationGlideElement;
    locked_out: GlideElement;
    longitude: GlideElement;
    manager: IArmyUserGlideElement;
    middle_name: GlideElement;
    mobile_phone: GlideElement;
    name: GlideElement;
    notification: GlideElement;
    on_schedule: GlideElement;
    password_needs_reset: GlideElement;
    phone: GlideElement;
    photo: GlideElement;
    preferred_language: GlideElement;
    roles: GlideElement;
    schedule: GlideElement;
    source: GlideElement;
    state: GlideElement;
    street: GlideElement;
    sys_class_name: GlideElement;
    sys_domain: GlideElement;
    sys_domain_path: GlideElement;
    time_format: GlideElement;
    time_sheet_policy: GlideElement;
    time_zone: GlideElement;
    title: GlideElement;
    user_name: GlideElement;
    user_password: GlideElement;
    vip: GlideElement;
    web_service_access_only: GlideElement;
    zip: GlideElement;
}
declare interface Icmn_buildingGlideElement extends IGlideRefElement<Icmn_buildingGlideRecord> {
    contact: IArmyUserGlideElement;
    floors: GlideElement;
    location: IlocationGlideElement;
    name: GlideElement;
    notes: GlideElement;
}
declare interface Isys_user_IGlideElement extends Isys_user_IGlideElementBase<Isys_user_GlideRecord> { }
declare interface IArmyUserGlideElement extends Isys_user_IGlideElementBase<IArmyUserGlideRecord> {
    u_grey_phone: GlideElement;
    u_rank: GlideElement;
    u_red_phone: GlideElement;
}
declare interface ITaskGlideElementBase<T extends ItaskGlideRecordBase> extends IGlideRefElement<T> {
    active: GlideElement;
    activity_due: GlideElement;
    additional_assignee_list: GlideElement;
    approval: GlideElement;
    approval_history: GlideElement;
    approval_set: GlideElement;
    assigned_to: IArmyUserGlideElement;
    assignment_group: GlideElement;
    business_duration: GlideElement;
    business_service: GlideElement;
    calendar_duration: GlideElement;
    closed_at: GlideElement;
    closed_by: IArmyUserGlideElement;
    close_notes: GlideElement;
    cmdb_ci: GlideElement;
    comments: GlideElement;
    comments_and_work_notes: GlideElement;
    company: GlideElement;
    contact_type: GlideElement;
    contract: GlideElement;
    correlation_display: GlideElement;
    correlation_id: GlideElement;
    delivery_plan: GlideElement;
    delivery_task: GlideElement;
    description: GlideElement;
    due_date: GlideElement;
    escalation: GlideElement;
    expected_start: GlideElement;
    follow_up: GlideElement;
    group_list: GlideElement;
    impact: GlideElement;
    knowledge: GlideElement;
    location: IlocationGlideElement;
    made_sla: GlideElement;
    number: GlideElement;
    opened_at: GlideElement;
    opened_by: IArmyUserGlideElement;
    order: GlideElement;
    parent: ITaskGlideElement;
    priority: GlideElement;
    reassignment_count: GlideElement;
    rejection_goto: ITaskGlideElement;
    service_offering: GlideElement;
    short_description: GlideElement;
    skills: GlideElement;
    sla_due: GlideElement;
    state: GlideElement;
    sys_class_name: GlideElement;
    sys_domain: GlideElement;
    sys_domain_path: GlideElement;
    time_worked: GlideElement;
    upon_approval: GlideElement;
    upon_reject: GlideElement;
    urgency: GlideElement;
    user_input: GlideElement;
    variables: GlideElement;
    watch_list: GlideElement;
    wf_activity: GlideElement;
    work_end: GlideElement;
    work_notes: GlideElement;
    work_notes_list: GlideElement;
    work_start: GlideElement;
}
declare interface ITaskGlideElement extends ITaskGlideElementBase<ItaskGlideRecord> { }
declare interface Isys_metadataGlideElementBase<T extends Isys_metadataGlideRecordBase> extends IGlideRefElement<T> {
    sys_class_name: GlideElement;
    sys_name: GlideElement;
    sys_package: GlideElement;
    sys_policy: GlideElement;
    sys_scope: GlideElement;
    sys_update_name: GlideElement;
}
declare interface Isys_metadataGlideElement extends Isys_metadataGlideElementBase<Isys_metadataGlideRecord> { }
declare interface Isc_cat_itemGlideElement extends Isys_metadataGlideElementBase<Isc_cat_itemGlideRecord> {
    active: GlideElement;
    availability: GlideElement;
    billable: GlideElement;
    category: Isc_categoryGlideElement;
    cost: GlideElement;
    custom_cart: GlideElement;
    delivery_plan: GlideElement;
    delivery_plan_script: GlideElement;
    delivery_time: GlideElement;
    description: GlideElement;
    entitlement_script: GlideElement;
    group: GlideElement;
    hide_sp: GlideElement;
    icon: GlideElement;
    ignore_price: GlideElement;
    image: GlideElement;
    list_price: GlideElement;
    location: IlocationGlideElement;
    meta: GlideElement;
    mobile_hide_price: GlideElement;
    mobile_picture: GlideElement;
    mobile_picture_type: GlideElement;
    model: GlideElement;
    name: GlideElement;
    no_cart: GlideElement;
    no_order: GlideElement;
    no_order_now: GlideElement;
    no_proceed_checkout: GlideElement;
    no_quantity: GlideElement;
    no_search: GlideElement;
    omit_price: GlideElement;
    order: GlideElement;
    ordered_item_link: GlideElement;
    picture: GlideElement;
    preview: GlideElement;
    price: GlideElement;
    recurring_frequency: GlideElement;
    recurring_price: GlideElement;
    roles: GlideElement;
    sc_catalogs: GlideElement;
    sc_ic_item_staging: GlideElement;
    sc_ic_version: GlideElement;
    short_description: GlideElement;
    show_variable_help_on_load: GlideElement;
    start_closed: GlideElement;
    template: GlideElement;
    type: GlideElement;
    use_sc_layout: GlideElement;
    vendor: GlideElement;
    visible_bundle: GlideElement;
    visible_guide: GlideElement;
    visible_standalone: GlideElement;
    workflow: GlideElement;
}
declare interface Isc_requestGlideElement extends ITaskGlideElementBase<Isc_requestGlideRecord> {
    calendar_stc: GlideElement;
    delivery_address: GlideElement;
    price: GlideElement;
    requested_date: GlideElement;
    requested_for: IArmyUserGlideElement;
    request_state: GlideElement;
    sourceable: GlideElement;
    sourced: GlideElement;
    special_instructions: GlideElement;
    stage: GlideElement;
}
declare interface Isc_req_itemGlideElement extends ITaskGlideElementBase<Isc_req_itemGlideRecord> {
    backordered: GlideElement;
    billable: GlideElement;
    cat_item: Isc_cat_itemGlideElement;
    configuration_item: GlideElement;
    context: GlideElement;
    estimated_delivery: GlideElement;
    order_guide: GlideElement;
    price: GlideElement;
    quantity: GlideElement;
    quantity_sourced: GlideElement;
    received: GlideElement;
    recurring_frequency: GlideElement;
    recurring_price: GlideElement;
    request: Isc_requestGlideElement;
    sc_catalog: Isc_catalogGlideElement;
    sourced: GlideElement;
    stage: GlideElement;
}
declare interface IincidentGlideElementBase<T extends IincidentGlideRecord> extends ITaskGlideElementBase<T> {
    business_stc: GlideElement;
    calendar_stc: GlideElement;
    caller_id: IArmyUserGlideElement;
    category: GlideElement;
    caused_by: GlideElement;
    child_incidents: GlideElement;
    close_code: GlideElement;
    hold_reason: GlideElement;
    incident_state: GlideElement;
    notify: GlideElement;
    parent_incident: GlideElement;
    problem_id: GlideElement;
    reopened_by: IArmyUserGlideElement;
    reopened_time: GlideElement;
    reopen_count: GlideElement;
    resolved_at: GlideElement;
    resolved_by: IArmyUserGlideElement;
    rfc: GlideElement;
    severity: GlideElement;
    subcategory: GlideElement;
}
declare interface IincidentGlidElement extends IincidentGlideElementBase<IincidentGlideRecord> { }
declare interface IArmyIncidentGlideElement extends IincidentGlideElementBase<IArmyIncidentGlideRecord> {
    u_is_mission_related: GlideElement;
    u_network: GlideElement;
    u_vip_priority: GlideElement;
}
declare interface Isc_catalogGlideElement extends Isys_metadataGlideElementBase<Isc_catalogGlideRecord> {
    active: GlideElement;
    background_color: GlideElement;
    description: GlideElement;
    desktop_continue_shopping: GlideElement;
    desktop_home_page: GlideElement;
    desktop_image: GlideElement;
    editors: GlideElement;
    enable_wish_list: GlideElement;
    manager: IArmyUserGlideElement;
    title: GlideElement;
}
declare interface Isc_categoryGlideElement extends Isys_metadataGlideElementBase<Isc_categoryGlideRecord> {
    active: GlideElement;
    description: GlideElement;
    entitlement_script: GlideElement;
    enable_wish_list: GlideElement;
    header_icon: GlideElement;
    homepage_image: GlideElement;
    homepage_renderer: GlideElement;
    icon: GlideElement;
    image: GlideElement;
    location: IlocationGlideElement;
    mobile_hide_description: GlideElement;
    mobile_picture: GlideElement;
    mobile_subcategory_render_type: GlideElement;
    module: GlideElement;
    order: GlideElement;
    parent: Isc_categoryGlideElement;
    roles: GlideElement;
    sc_catalog: Isc_catalogGlideElement;
    show_in_cms: GlideElement;
    title: GlideElement;
}
declare type StringQueryOperator = "=" | "!=" | "IN" | "NOT IN" | "STARTSWITH" | "ENDSWITH" | "CONTAINS" | "DOES NOT CONTAIN" | "INSTANCEOF";
declare type NumberQueryOperator = "=" | "!=" | ">" | ">=" | "<" | "<=";
declare type QueryOperator = StringQueryOperator | NumberQueryOperator;

declare class GlideQueryCondition {
    addCondition(name: string, oper: QueryOperator | undefined, value: any): GlideQueryCondition;
    addOrCondition(name: string, oper: QueryOperator | undefined, value: any): GlideQueryCondition;
}

declare interface IGlideRecord {
    sys_id: GlideElement;
    sys_created_by: GlideElement;
    sys_created_on: GlideElement;
    sys_mod_count: GlideElement;
    sys_updated_by: GlideElement;
    sys_updated_on: GlideElement;
    addActiveQuery(): GlideQueryCondition;
    addEncodedQuery(query: string): void;
    addJoinQuery(joinTable: string, primaryField?: string, joinTableField?: string): GlideQueryCondition;
    addNotNullQuery(fieldName: string): GlideQueryCondition;
    addNullQuery(fieldName: string): GlideQueryCondition;
    addQuery(query: string): GlideQueryCondition;
    addQuery(name: string, value: any): GlideQueryCondition;
    addQuery(name: string, operator: QueryOperator, value: any): GlideQueryCondition;
    canCreate(): boolean;
    canDelete(): boolean;
    canRead(): boolean;
    canWrite(): boolean;
    deleteRecord(): boolean;
    get(name: string, value: any): boolean;
    getAttribute(name: string): string;
    getClassDisplayValue(): string;
    getDisplayValue(): string;
    getED(): GlideElementDescriptor;
    getElement(): GlideElement;
    getEncodedQuery(): string;
    getLabel(): string;
    getLastErrorMessage(): string;
    getLink(noStack: boolean): string;
    getRecordClassName(): string;
    getRowCount(): number;
    getTableName(): string;
    getUniqueValue(): string;
    getValue(name: string): string | null | undefined;
    hasNext(): boolean;
    initialize(): void;
    insert(): string;
    isActionAborted(): boolean;
    isNewRecord(): boolean;
    isValid(): boolean;
    isValidField(columnName: string): boolean;
    isValidRecord(): boolean;
    newRecord(): void;
    next(): boolean;
    _next(): boolean;
    operation(): string;
    orderBy(name: string): void;
    orderByDesc(name: string): void;
    query(): void;
    query(field: string, value: any): void;
    _query(): void;
    _query(field: string, value: any): void;
    setAbortAction(b: boolean): void;
    setLimit(maxNumRecords: number): void;
    setNewGuidValue(guid: string): void;
    setValue(name: string, value: any): void;
    setWorkflow(enable: boolean): void;
    update(reason?: string): string;
}
declare interface Isys_user_GlideRecord extends IGlideRecord {
    accumulated_roles: GlideElement;
    active: GlideElement;
    agent_status: GlideElement;
    average_daily_fte: GlideElement;
    building: Icmn_buildingGlideElement;
    business_criticality: GlideElement;
    calendar_integration: GlideElement;
    city: GlideElement;
    company: GlideElement;
    cost_center: GlideElement;
    country: GlideElement;
    date_format: GlideElement;
    default_perspective: GlideElement;
    department: Icmn_departmentGlideElement;
    edu_status: GlideElement;
    email: GlideElement;
    employee_number: GlideElement;
    enable_multifactor_authn: GlideElement;
    failed_attempts: GlideElement;
    first_name: GlideElement;
    gender: GlideElement;
    geolocation_tracked: GlideElement;
    home_phone: GlideElement;
    internal_integration_user: GlideElement;
    introduction: GlideElement;
    last_login: GlideElement;
    last_login_device: GlideElement;
    last_login_time: GlideElement;
    last_name: GlideElement;
    last_password: GlideElement;
    last_position_update: GlideElement;
    latitude: GlideElement;
    ldap_server: GlideElement;
    location: IlocationGlideElement;
    locked_out: GlideElement;
    longitude: GlideElement;
    manager: IArmyUserGlideElement;
    middle_name: GlideElement;
    mobile_phone: GlideElement;
    name: GlideElement;
    notification: GlideElement;
    on_schedule: GlideElement;
    password_needs_reset: GlideElement;
    phone: GlideElement;
    photo: GlideElement;
    preferred_language: GlideElement;
    roles: GlideElement;
    schedule: GlideElement;
    source: GlideElement;
    state: GlideElement;
    street: GlideElement;
    sys_class_name: GlideElement;
    sys_domain: GlideElement;
    sys_domain_path: GlideElement;
    time_format: GlideElement;
    time_sheet_policy: GlideElement;
    time_zone: GlideElement;
    title: GlideElement;
    user_name: GlideElement;
    user_password: GlideElement;
    vip: GlideElement;
    web_service_access_only: GlideElement;
    zip: GlideElement;
}
declare interface IArmyUserGlideRecord extends Isys_user_GlideRecord {
    u_grey_phone: GlideElement;
    u_rank: GlideElement;
    u_red_phone: GlideElement;
}
declare interface Icmn_departmentGlideRecord extends IGlideRecord {
    business_unit: Ibusiness_unitGlideElement;
    code: GlideElement;
    company: GlideElement;
    cost_center: GlideElement;
    dept_head: IArmyUserGlideElement;
    description: GlideElement;
    head_count: GlideElement;
    id: GlideElement;
    name: GlideElement;
    parent: Icmn_departmentGlideElement;
    primary_contact: IArmyUserGlideElement;
}
declare interface Ibusiness_unitGlideRecord extends IGlideRecord {
    bu_head: IArmyUserGlideElement;
    company: GlideElement;
    description: GlideElement;
    sys_domain: GlideElement;
    sys_domain_path: GlideElement;
    hierarchy_level: GlideElement;
    name: GlideElement;
    parent: Ibusiness_unitGlideElement;
}
declare interface IlocationGlideRecord extends IGlideRecord {
    city: GlideElement;
    company: GlideElement;
    contact: IArmyUserGlideElement;
    country: GlideElement;
    fax_phone: GlideElement;
    full_name: GlideElement;
    lat_long_error: GlideElement;
    latitude: GlideElement;
    longitude: GlideElement;
    name: GlideElement;
    parent: IlocationGlideElement;
    phone: GlideElement;
    phone_territory: GlideElement;
    state: GlideElement;
    stock_room: GlideElement;
    street: GlideElement;
    time_zone: GlideElement;
    zip: GlideElement;
}
declare interface Icmn_buildingGlideRecord extends IGlideRecord {
    contact: IArmyUserGlideElement;
    floors: GlideElement;
    location: IlocationGlideElement;
    name: GlideElement;
    notes: GlideElement;
}
declare interface ItaskGlideRecordBase extends IGlideRecord {
    active: GlideElement;
    activity_due: GlideElement;
    additional_assignee_list: GlideElement;
    approval: GlideElement;
    approval_history: GlideElement;
    approval_set: GlideElement;
    assigned_to: IArmyUserGlideElement;
    assignment_group: GlideElement;
    business_duration: GlideElement;
    business_service: GlideElement;
    calendar_duration: GlideElement;
    closed_at: GlideElement;
    closed_by: IArmyUserGlideElement;
    close_notes: GlideElement;
    cmdb_ci: GlideElement;
    comments: GlideElement;
    comments_and_work_notes: GlideElement;
    company: GlideElement;
    contact_type: GlideElement;
    contract: GlideElement;
    correlation_display: GlideElement;
    correlation_id: GlideElement;
    delivery_plan: GlideElement;
    delivery_task: GlideElement;
    description: GlideElement;
    due_date: GlideElement;
    escalation: GlideElement;
    expected_start: GlideElement;
    follow_up: GlideElement;
    group_list: GlideElement;
    impact: GlideElement;
    knowledge: GlideElement;
    location: IlocationGlideElement;
    made_sla: GlideElement;
    number: GlideElement;
    opened_at: GlideElement;
    opened_by: IArmyUserGlideElement;
    order: GlideElement;
    parent: ITaskGlideElement;
    priority: GlideElement;
    reassignment_count: GlideElement;
    rejection_goto: ITaskGlideElement;
    service_offering: GlideElement;
    short_description: GlideElement;
    skills: GlideElement;
    sla_due: GlideElement;
    state: GlideElement;
    sys_class_name: GlideElement;
    sys_domain: GlideElement;
    sys_domain_path: GlideElement;
    time_worked: GlideElement;
    upon_approval: GlideElement;
    upon_reject: GlideElement;
    urgency: GlideElement;
    user_input: GlideElement;
    variables: GlideElement;
    watch_list: GlideElement;
    wf_activity: GlideElement;
    work_end: GlideElement;
    work_notes: GlideElement;
    work_notes_list: GlideElement;
    work_start: GlideElement;
}
declare interface ItaskGlideRecord extends ItaskGlideRecordBase, IGenericGlideRecord { }
declare interface Isc_requestGlideRecord extends ItaskGlideRecordBase {
    calendar_stc: GlideElement;
    delivery_address: GlideElement;
    price: GlideElement;
    requested_date: GlideElement;
    requested_for: IArmyUserGlideElement;
    request_state: GlideElement;
    sourceable: GlideElement;
    sourced: GlideElement;
    special_instructions: GlideElement;
    stage: GlideElement;
}
declare interface Isc_req_itemGlideRecord extends ItaskGlideRecordBase {
    backordered: GlideElement;
    billable: GlideElement;
    cat_item: Isc_cat_itemGlideElement;
    configuration_item: GlideElement;
    context: GlideElement;
    estimated_delivery: GlideElement;
    order_guide: GlideElement;
    price: GlideElement;
    quantity: GlideElement;
    quantity_sourced: GlideElement;
    received: GlideElement;
    recurring_frequency: GlideElement;
    recurring_price: GlideElement;
    request: Isc_requestGlideElement;
    sc_catalog: Isc_catalogGlideElement;
    sourced: GlideElement;
    stage: GlideElement;
}
declare interface IincidentGlideRecord extends ItaskGlideRecordBase {
    business_stc: GlideElement;
    calendar_stc: GlideElement;
    caller_id: IArmyUserGlideElement;
    category: GlideElement;
    caused_by: GlideElement;
    child_incidents: GlideElement;
    close_code: GlideElement;
    hold_reason: GlideElement;
    incident_state: GlideElement;
    notify: GlideElement;
    parent_incident: GlideElement;
    problem_id: GlideElement;
    reopened_by: IArmyUserGlideElement;
    reopened_time: GlideElement;
    reopen_count: GlideElement;
    resolved_at: GlideElement;
    resolved_by: IArmyUserGlideElement;
    rfc: GlideElement;
    severity: GlideElement;
    subcategory: GlideElement;
}
declare interface IArmyIncidentGlideRecord extends IincidentGlideRecord {
    u_is_mission_related: GlideElement;
    u_network: GlideElement;
    u_vip_priority: GlideElement;
}
declare interface Isys_metadataGlideRecordBase extends IGlideRecord {
    sys_class_name: GlideElement;
    sys_name: GlideElement;
    sys_package: GlideElement;
    sys_policy: GlideElement;
    sys_scope: GlideElement;
    sys_update_name: GlideElement;
}
declare interface Isys_metadataGlideRecord extends Isys_metadataGlideRecordBase, IGenericGlideRecord { }
declare interface Isc_cat_itemGlideRecord extends Isys_metadataGlideRecordBase {
    active: GlideElement;
    availability: GlideElement;
    billable: GlideElement;
    category: Isc_categoryGlideElement;
    cost: GlideElement;
    custom_cart: GlideElement;
    delivery_plan: GlideElement;
    delivery_plan_script: GlideElement;
    delivery_time: GlideElement;
    description: GlideElement;
    entitlement_script: GlideElement;
    group: GlideElement;
    hide_sp: GlideElement;
    icon: GlideElement;
    ignore_price: GlideElement;
    image: GlideElement;
    list_price: GlideElement;
    location: IlocationGlideElement;
    meta: GlideElement;
    mobile_hide_price: GlideElement;
    mobile_picture: GlideElement;
    mobile_picture_type: GlideElement;
    model: GlideElement;
    name: GlideElement;
    no_cart: GlideElement;
    no_order: GlideElement;
    no_order_now: GlideElement;
    no_proceed_checkout: GlideElement;
    no_quantity: GlideElement;
    no_search: GlideElement;
    omit_price: GlideElement;
    order: GlideElement;
    ordered_item_link: GlideElement;
    picture: GlideElement;
    preview: GlideElement;
    price: GlideElement;
    recurring_frequency: GlideElement;
    recurring_price: GlideElement;
    roles: GlideElement;
    sc_catalogs: GlideElement;
    sc_ic_item_staging: GlideElement;
    sc_ic_version: GlideElement;
    short_description: GlideElement;
    show_variable_help_on_load: GlideElement;
    start_closed: GlideElement;
    template: GlideElement;
    type: GlideElement;
    use_sc_layout: GlideElement;
    vendor: GlideElement;
    visible_bundle: GlideElement;
    visible_guide: GlideElement;
    visible_standalone: GlideElement;
    workflow: GlideElement;
}
declare interface Isc_catalogGlideRecord extends Isys_metadataGlideRecordBase {
    active: GlideElement;
    background_color: GlideElement;
    description: IlocationGlideElement;
    desktop_continue_shopping: GlideElement;
    desktop_home_page: GlideElement;
    desktop_image: GlideElement;
    editors: GlideElement;
    enable_wish_list: GlideElement;
    manager: IArmyUserGlideElement;
    title: GlideElement;
}
declare interface Isc_categoryGlideRecord extends Isys_metadataGlideRecordBase {
    active: GlideElement;
    description: GlideElement;
    entitlement_script: GlideElement;
    enable_wish_list: GlideElement;
    header_icon: GlideElement;
    homepage_image: GlideElement;
    homepage_renderer: GlideElement;
    icon: GlideElement;
    image: GlideElement;
    location: IlocationGlideElement;
    mobile_hide_description: GlideElement;
    mobile_picture: GlideElement;
    mobile_subcategory_render_type: GlideElement;
    module: GlideElement;
    order: GlideElement;
    parent: Isc_categoryGlideElement;
    roles: GlideElement;
    sc_catalog: Isc_catalogGlideElement;
    show_in_cms: GlideElement;
    title: GlideElement;
}
declare interface IGenericGlideRecord extends IGlideRecord { [key: string]: any; }
declare class GlideRecord implements IGenericGlideRecord {
    [key: string]: any;
    sys_id: GlideElement;
    sys_created_by: GlideElement;
    sys_created_on: GlideElement;
    sys_mod_count: GlideElement;
    sys_updated_by: GlideElement;
    sys_updated_on: GlideElement;
    constructor(tableName: string);
    addActiveQuery(): GlideQueryCondition;
    addEncodedQuery(query: string): void;
    addJoinQuery(joinTable: string, primaryField?: string, joinTableField?: string): GlideQueryCondition;
    addNotNullQuery(fieldName: string): GlideQueryCondition;
    addNullQuery(fieldName: string): GlideQueryCondition;
    addQuery(query: string): GlideQueryCondition;
    addQuery(name: string, value: any): GlideQueryCondition;
    addQuery(name: string, operator: QueryOperator, value: any): GlideQueryCondition;
    canCreate(): boolean;
    canDelete(): boolean;
    /**
     * Indicates whether the user's role permits them to read the associated GlideRecord.
     * @returns {boolean} True if the field can be read, false otherwise.
     */
    canRead(): boolean;

    /**
     * Determines whether the user's role permits them to write to the associated GlideRecord.
     * @returns {boolean} True if the user can write to the field, false otherwis.
     */
    canWrite(): boolean;
    deleteRecord(): boolean;
    get(name: string, value: any): boolean;
    getAttribute(name: string): string;
    getClassDisplayValue(): string;
    getDisplayValue(): string;
    getED(): GlideElementDescriptor;
    getElement(): GlideElement;
    getEncodedQuery(): string;
    getLabel(): string;
    getLastErrorMessage(): string;
    getLink(noStack: boolean): string;
    getRecordClassName(): string;
    getRowCount(): number;
    getTableName(): string;
    getUniqueValue(): string;

    /**
     * Retrieves the string value of an underlying element in a field.
     * @param {string} name The name of the field to get the value from.
     * @returns {string|null|undefined} The value of the field.
     */
    getValue(name: string): string | null | undefined;

    hasNext(): boolean;
    initialize(): void;
    insert(): string;
    isActionAborted(): boolean;
    /**
     * Checks if the current record is a new record that has not yet been inserted into the database.
     * @returns {boolean} True if the record is new and has not been inserted into the database.
     */
    isNewRecord(): boolean;
    isValid(): boolean;
    isValidField(columnName: string): boolean;
    isValidRecord(): boolean;
    newRecord(): void;
    next(): boolean;
    _next(): boolean;
    operation(): string;
    orderBy(name: string): void;
    orderByDesc(name: string): void;
    query(): void;
    query(field: string, value: any): void;
    _query(): void;
    _query(field: string, value: any): void;
    setAbortAction(b: boolean): void;
    setLimit(maxNumRecords: number): void;
    setNewGuidValue(guid: string): void;
    setValue(name: string, value: any): void;
    setWorkflow(enable: boolean): void;
    update(reason?: string): string;
}

declare class GlideSession {
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
    putClientData(paramName: string, paramValue: string): void
}

declare class GlideUser {
    getCompanyID(): string;
    getDisplayName(): string;
    getDomainID(): string;
    getEmail(): string;
    getFirstName(): string;
    getID(): string;
    getLastName(): string;
    getName(): string;
    getName(): string;
    getPreference(name: string): string;
    getRoles(): string[];
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
    isMemberOf(group: string): boolean;
    savePreference(name: string, value: string): void;
}

declare class GlideUri {
    constructor();
    get(name: string): string;
    getFileFromPath(): string;
    set(name: string, value: string): string;
    toString(path: string): string;
}

declare let gs: {
    isInteractive(): boolean;
    isLoggedIn(): boolean;
    addErrorMessage(message: any): void;
    addInfoMessage(message: any): void;
    debug(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
    error(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
    warn(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
    info(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;
    nil<T>(o?: T | null): o is null | undefined;
    base64Decode(source: string): string;
    base64Encode(source: string): string;
    eventQueue(name: string, glideRecord: IGlideRecord, parm1?: any, parm2?: any, queue?: string);
    generateGUID(): string;
    getCallerScopeName(): string;
    getCssCacheVersionString(): string;
    getCurrentApplicationId(): string;
    getCurrentScopeName(): string;
    getErrorMessages(): string[];
    getEscapedMessage(id: string, args?: any[]): string;
    getMessage(id: string, args?: any[]): string;
    getProperty(key: string): string;
    getProperty<T>(key: string, alt: T): string | T;
    getSession(): GlideSession;
    getSessionID(): string;
    getSessionToken(): string;
    getTimeZoneName(): string;
    getUrlOnStack(): string;
    getUser(): GlideUser;
    getUserDisplayName(): string;
    getUserID(): string;
    getUserName(): string;
    hasRole(role: string): boolean;
    isDebugging(): boolean;
    isInteractive(): boolean;
    isLoggedIn(): boolean;
    isMobile(): boolean;
    nil(o: any | null | undefined): o is "" | null | undefined;
    setProperty(key: string, value: string, description: string): void;
    setRedirect(uri: GlideUri | string): void;
    tableExists(name: string): boolean;
    urlDecode(url: string): string;
    urlEncode(url: string): string;
    xmlToJSON(xmlString: string): string;
}

declare let GlideStringUtil: {
    dotToUnderBar(sourceString: string): string;
    escapeAllQuotes(sourceString: string): string;
    escapeForHomePage(sourceString: string): string;
    escapeHTML(htmlString: string): string;
    escapeNonPrintable(sourceString: string): string;
    escapeQueryTermSeparator(sourceString: string): string;
    escapeTicks(sourceString: string): string;
    getHTMLValue(sourceString: string): string;
    getNumeric(sourceString: string): string;
    isBase64(sourceString: string): boolean;
    isEligibleSysID(sourceString: string): boolean;
    newLinesToBreaks(sourceString: string): string;
    normalizeWhitespace(sourceString: string): string;
    unEscapeHTML(htmlString: string): string;
}
