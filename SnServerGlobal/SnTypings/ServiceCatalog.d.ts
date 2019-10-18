/// <reference path="JavaTypes.d.ts" />
/// <reference path="GlideSystem.d.ts" />
/// <reference path="GlideRecord.d.ts" />

declare type cmdbInstall_statusValue = 100 | 3 | 6 | 1 | 2 | 4 | 5 | 7 | 8;
declare type cmdbInstall_statusString = "100" | "3" | "6" | "1" | "2" | "4" | "5" | "7" | "8";
declare type cmdbInstall_status = cmdbInstall_statusValue | cmdbInstall_statusString;
declare type cmdb_ciOperational_statusValue = 1 | 2 | 3 | 4 | 5 | 6;
declare type cmdb_ciOperational_statusString = "1" | "2" | "3" | "4" | "5" | "6";
declare type cmdb_ciOperational_status = cmdb_ciOperational_statusString | cmdb_ciOperational_statusValue;
// "8": "Catalog"; "7": "Pipeline"; "6": "Retired"; "5": "Ready"; "4": "DR Standby"; "3": "Repair in Progress"; "2": "Non-Operational"; "1": "Operational"
declare type cmdb_ci_serviceOperational_statusValue = cmdb_ciOperational_statusValue | 8;
declare type cmdb_ci_serviceOperational_statusString = cmdb_ciOperational_statusString | "8";
declare type cmdb_ci_serviceOperational_status = cmdb_ci_serviceOperational_statusString | cmdb_ci_serviceOperational_statusValue;
declare type alm_assetInstallStatusValue = 2 | 6 | 9 | 1 | 10 | 3 | 7 | 8;
declare type alm_assetInstallStatusString = "2" | "6" | "9" | "1" | "10" | "3" | "7" | "8";
declare type alm_assetInstallStatus = alm_assetInstallStatusValue | alm_assetInstallStatusString;
declare type sc_cat_itemType = "item" | "task" | "bundle" | "template" | "package";
declare type recurring_frequency = "daily" | "weekly" | "weekly2" | "monthly" | "monthly2" | "quarterly" | "semiannual" | "yearly";
declare type IRequestState = "requested" | "in_process" | "closed_complete" | "closed_incomplete" | "closed_cancelled" | "closed_rejected" | "closed_skipped";
declare type alm_assetJustification = "New employee hire" | "Replace in repair" | "Replace stolen" | "Replacement" | "Stock replenishment" | "Swap" | "Testing" | "Upgrade";
declare type alm_assetSubstatus = "available" | "disposed" | "lost" | "reserved" | "sold" | "stolen" | "defective" | "donated" | "pending_repair" | "vendor_credit" | "pending_install" | "pending_disposal" | "pending_transfer" | "pre_allocated";
declare type cmdi_ci_serviceService_classification = "Business Service" | "Technical Service" | "Service Offering" | "Shared Service" | "Application Service" | "Billable Service";
declare type cmdi_ci_serviceService_status = "design" | "requirements" | "definition" | "development" | "analysis" | "buildtestrelease" | "approved" | "operational" | "chartered" | "retiring";
declare type cmdi_ci_serviceUsed_for = "Production" | "Staging" | "QA" | "Test" | "Development" | "Demonstration" | "Training" | "Disaster recovery";

/**
 * GlideElement values from the Category table.
 * @interface Isc_categoryColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isc_categoryColumns extends Isys_metadataColumns {
    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof Isc_categoryColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Isc_categoryColumns
     * @description Internal type is "translated_text"
     *      Max length: 4000
     */
    description: StringGlideElement;

    /**
     * Entitlement script
     * @type {GlideElement}
     * @memberof Isc_categoryColumns
     * @description Internal type is "script_plain"
     */
    entitlement_script: GlideElement;

    /**
     * Header icon
     * @type {GlideElementUserImage}
     * @memberof Isc_categoryColumns
     */
    header_icon: GlideElementUserImage;

    /**
     * Homepage image
     * @type {GlideElementUserImage}
     * @memberof Isc_categoryColumns
     */
    homepage_image: GlideElementUserImage;

    /**
     * Homepage renderer
     * @type {sc_homepage_rendererElementReference}
     * @memberof Isc_categoryColumns
     * @default "47ebe8aa3742300054b6a3549dbe5dfa"
     * @description Reference to table "sc_homepage_renderer"
     */
    homepage_renderer: GlideElementReference;

    /**
     * Icon
     * @type {GlideElementUserImage}
     * @memberof Isc_categoryColumns
     */
    icon: GlideElementUserImage;

    /**
     * Image
     * @type {GlideElement}
     * @memberof Isc_categoryColumns
     * @description Internal type is "image"
     */
    image: GlideElement;

    /**
     * Location
     * @type {cmn_locationElementReference}
     * @memberof Isc_categoryColumns
     * @description Reference to table "cmn_location"
     */
    location: cmn_locationElementReference;

    /**
     * Hide description (mobile browsing)
     * @type {GlideElementBoolean}
     * @memberof Isc_categoryColumns
     * @default false
     */
    mobile_hide_description: GlideElementBoolean;

    /**
     * Mobile Picture
     * @type {GlideElementUserImage}
     * @memberof Isc_categoryColumns
     */
    mobile_picture: GlideElementUserImage;

    /**
     * Mobile Subcategory Render Type
     * @type {StringGlideElement}
     * @memberof Isc_categoryColumns
     * @default "list"
     * @description Choices: "card": "Card"; "list": "List"
     *      Max length: 40
     */
    mobile_subcategory_render_type: StringGlideElement;

    /**
     * Module link
     * @type {sys_app_moduleElementReference}
     * @memberof Isc_categoryColumns
     * @description Reference to table "sys_app_module"
     */
    module: sys_app_moduleElementReference;

    /**
     * Order
     * @type {GlideElementNumeric}
     * @memberof Isc_categoryColumns
     * @default 0
     */
    order: GlideElementNumeric;

    /**
     * Parent
     * @type {sc_categoryElementReference}
     * @memberof Isc_categoryColumns
     * @description Reference to table "sc_category"
     */
    parent: sc_categoryElementReference;

    /**
     * Roles
     * @type {GlideElement}
     * @memberof Isc_categoryColumns
     * @description Internal type is "Array<user_roles>"
     */
    roles: GlideElement;

    /**
     * Catalog
     * @type {sc_catalogElementReference}
     * @memberof Isc_categoryColumns
     * @default "javascript: new Category().getDefaultCatalogValue();"
     * @description Reference to table "sc_catalog"
     */
    sc_catalog: sc_catalogElementReference;

    /**
     * Show in CMS
     * @type {GlideElementBoolean}
     * @memberof Isc_categoryColumns
     * @default false
     */
    show_in_cms: GlideElementBoolean;

    /**
     * Title
     * @type {StringGlideElement}
     * @memberof Isc_categoryColumns
     * @description Internal type is "translated_text"
     *      Max length: 100
     */
    title: StringGlideElement;
}
declare type sc_categoryGlideRecord = sys_metadataGlideRecord & Isc_categoryColumns;
declare type sc_categoryElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isc_categoryColumns, sc_categoryGlideRecord>;

/**
 * GlideElement values from the Catalog table.
 * @interface Isc_catalogColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isc_catalogColumns extends Isys_metadataColumns {
    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof Isc_catalogColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Background Color
     * @type {GlideElement}
     * @memberof Isc_catalogColumns
     * @default "white"
     * @description Internal type is "color"
     */
    background_color: GlideElement;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Isc_catalogColumns
     * @description Internal type is "translated_text"
     *      Max length: 4000
     */
    description: StringGlideElement;

    /**
     * 'Continue Shopping' page
     * @type {StringGlideElement}
     * @memberof Isc_catalogColumns
     * @description Max length: 3000
     */
    desktop_continue_shopping: StringGlideElement;

    /**
     * 'Catalog Home' Page
     * @type {StringGlideElement}
     * @memberof Isc_catalogColumns
     * @description Max length: 3000
     */
    desktop_home_page: StringGlideElement;

    /**
     * Desktop image
     * @type {GlideElementUserImage}
     * @memberof Isc_catalogColumns
     */
    desktop_image: GlideElementUserImage;

    /**
     * Editors
     * @type {GlideElement}
     * @memberof Isc_catalogColumns
     * @description Internal type is "glide_list"
     */
    editors: GlideElement;

    /**
     * Enable Wish List
     * @type {GlideElementBoolean}
     * @memberof Isc_catalogColumns
     * @default false
     */
    enable_wish_list: GlideElementBoolean;

    /**
     * Manager
     * @type {sys_userElementReference}
     * @memberof Isc_catalogColumns
     * @description Reference to table "sys_user"
     */
    manager: sys_userElementReference;

    /**
     * Title
     * @type {StringGlideElement}
     * @memberof Isc_catalogColumns
     * @description Internal type is "translated_field"
     *      Max length: 100
     */
    title: StringGlideElement;
}
declare type sc_catalogGlideRecord = sys_metadataGlideRecord & Isc_catalogColumns;
declare type sc_catalogElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isc_catalogColumns, sc_catalogGlideRecord>;

/**
 * GlideElement values from the Catalog Item table.
 * @interface Isc_cat_itemColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isc_cat_itemColumns extends Isys_metadataColumns {
    /**
     * Active
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @default true
     */
    active: GlideElementBoolean;

    /**
     * Availability
     * @type {StringGlideElement}
     * @memberof Isc_cat_itemColumns
     * @default "on_desktop"
     * @description Choices: "on_mobile": "Mobile Only"; "on_desktop": "Desktop Only"; "on_both": "Desktop and Mobile"
     *      Max length: 40
     */
    availability: StringGlideElement;

    /**
     * Billable
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     */
    billable: GlideElementBoolean;

    /**
     * Category
     * @type {sc_categoryElementReference}
     * @memberof Isc_cat_itemColumns
     * @default "javascript: new SNCCatalogUtil().getCategoryIDFromURL();"
     * @description Reference to table "sc_category"
     */
    category: sc_categoryElementReference;

    /**
     * Cost
     * @type {GlideElementNumeric}
     * @memberof Isc_cat_itemColumns
     * @default 0
     * @description Internal type is "decimal"
     */
    cost: GlideElementNumeric;

    /**
     * Cart
     * @type {sys_ui_macroElementReference}
     * @memberof Isc_cat_itemColumns
     * @description Reference to table "sys_ui_macro"
     */
    custom_cart: GlideElementReference;

    /**
     * Execution Plan
     * @type {sc_cat_item_delivery_planElementReference}
     * @memberof Isc_cat_itemColumns
     * @default "javascript:getDefaultDeliveryPlan()"
     * @description Reference to table "sc_cat_item_delivery_plan"
     */
    delivery_plan: sc_cat_item_delivery_planElementReference;

    /**
     * Delivery plan script
     * @type {GlideElement}
     * @memberof Isc_cat_itemColumns
     * @description Internal type is "script_plain"
     */
    delivery_plan_script: GlideElement;

    /**
     * Delivery time
     * @type {StringGlideElement}
     * @memberof Isc_cat_itemColumns
     * @default "2 00:00:00"
     * @description Internal type is "glide_duration"
     *      Max length: 40
     */
    delivery_time: StringGlideElement;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Isc_cat_itemColumns
     * @description Internal type is "translated_html"
     *      Max length: 8000
     */
    description: StringGlideElement;

    /**
     * Entitlement script
     * @type {GlideElement}
     * @memberof Isc_cat_itemColumns
     * @description Internal type is "script_plain"
     */
    entitlement_script: GlideElement;

    /**
     * Fulfillment group
     * @type {sys_user_groupElementReference}
     * @memberof Isc_cat_itemColumns
     * @description Reference to table "sys_user_group"
     */
    group: sys_user_groupElementReference;

    /**
     * Hide on Service Portal
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @default false
     */
    hide_sp: GlideElementBoolean;

    /**
     * Icon
     * @type {GlideElementUserImage}
     * @memberof Isc_cat_itemColumns
     */
    icon: GlideElementUserImage;

    /**
     * Ignore price
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @readonly
     * @default false
     */
    ignore_price: GlideElementBoolean;

    /**
     * Image
     * @type {GlideElement}
     * @memberof Isc_cat_itemColumns
     * @description Internal type is "image"
     */
    image: GlideElement;

    /**
     * List Price
     * @type {GlideElementNumeric}
     * @memberof Isc_cat_itemColumns
     * @description Internal type is "currency"
     */
    list_price: GlideElementNumeric;

    /**
     * Location
     * @type {cmn_locationElementReference}
     * @memberof Isc_cat_itemColumns
     * @description Reference to table "cmn_location"
     */
    location: cmn_locationElementReference;

    /**
     * Meta
     * @type {StringGlideElement}
     * @memberof Isc_cat_itemColumns
     * @description Max length: 4000
     */
    meta: StringGlideElement;

    /**
     * Hide price (mobile listings)
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @default false
     */
    mobile_hide_price: GlideElementBoolean;

    /**
     * Mobile Picture
     * @type {GlideElementUserImage}
     * @memberof Isc_cat_itemColumns
     */
    mobile_picture: GlideElementUserImage;

    /**
     * Mobile Picture Type
     * @type {StringGlideElement}
     * @memberof Isc_cat_itemColumns
     * @default "use_desktop_picture"
     * @description Choices: "use_no_picture": "None"; "use_mobile_picture": "Mobile"; "use_desktop_picture": "Desktop"
     *      Max length: 40
     */
    mobile_picture_type: StringGlideElement;

    /**
     * Model
     * @type {cmdb_modelElementReference}
     * @memberof Isc_cat_itemColumns
     * @description Reference to table "cmdb_model"
     */
    model: cmdb_modelElementReference;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Isc_cat_itemColumns
     * @description Internal type is "translated_text"
     *      Max length: 100
     */
    name: StringGlideElement;

    /**
     * No cart
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @default false
     */
    no_cart: GlideElementBoolean;

    /**
     * No order
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @default false
     */
    no_order: GlideElementBoolean;

    /**
     * No order now
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @default false
     */
    no_order_now: GlideElementBoolean;

    /**
     * No proceed checkout
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @default false
     */
    no_proceed_checkout: GlideElementBoolean;

    /**
     * No quantity
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @default false
     */
    no_quantity: GlideElementBoolean;

    /**
     * No search
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @default false
     */
    no_search: GlideElementBoolean;

    /**
     * Omit price in cart
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @default false
     */
    omit_price: GlideElementBoolean;

    /**
     * Order
     * @type {GlideElementNumeric}
     * @memberof Isc_cat_itemColumns
     * @default 0
     */
    order: GlideElementNumeric;

    /**
     * Ordered item link
     * @type {sc_ordered_item_linkElementReference}
     * @memberof Isc_cat_itemColumns
     * @description Reference to table "sc_ordered_item_link"
     */
    ordered_item_link: GlideElementReference;

    /**
     * Picture
     * @type {GlideElementUserImage}
     * @memberof Isc_cat_itemColumns
     */
    picture: GlideElementUserImage;

    /**
     * Preview link
     * @type {GlideElement}
     * @memberof Isc_cat_itemColumns
     * @description Internal type is "catalog_preview"
     */
    preview: GlideElement;

    /**
     * Price
     * @type {GlideElementNumeric}
     * @memberof Isc_cat_itemColumns
     * @default 0
     * @description Internal type is "price"
     */
    price: GlideElementNumeric;

    /**
     * Recurring Price Frequency
     * @type {IStringChoiceGlideElement<recurring_frequency>}
     * @memberof Isc_cat_itemColumns
     * @description Internal type is "choice"
     *      Choices: "yearly": "Annually"; "semiannual": "Semi-Annual"; "quarterly": "Quarterly"; "monthly2": "Every 2 Months"; "monthly": "Monthly"; "weekly2": "Every 2 Weeks"; "weekly": "Weekly"; "daily": "Daily"
     */
    recurring_frequency: IStringChoiceGlideElement<recurring_frequency>;

    /**
     * Recurring price
     * @type {GlideElementNumeric}
     * @memberof Isc_cat_itemColumns
     * @description Internal type is "price"
     */
    recurring_price: GlideElementNumeric;

    /**
     * Roles
     * @type {GlideElement}
     * @memberof Isc_cat_itemColumns
     * @description Internal type is "Array<user_roles>"
     */
    roles: GlideElement;

    /**
     * Catalogs
     * @type {GlideElement}
     * @memberof Isc_cat_itemColumns
     * @default "javascript: new SNCCatalogUtil().getCatalogIDFromURL();"
     * @description Internal type is "glide_list"
     */
    sc_catalogs: GlideElement;

    /**
     * Created from item design
     * @type {sc_ic_item_stagingElementReference}
     * @memberof Isc_cat_itemColumns
     * @readonly
     * @description Reference to table "sc_ic_item_staging"
     */
    sc_ic_item_staging: GlideElementReference;

    /**
     * Published version
     * @type {GlideElementNumeric}
     * @memberof Isc_cat_itemColumns
     * @readonly
     */
    sc_ic_version: GlideElementNumeric;

    /**
     * Short description
     * @type {StringGlideElement}
     * @memberof Isc_cat_itemColumns
     * @description Internal type is "translated_text"
     *      Max length: 200
     */
    short_description: StringGlideElement;

    /**
     * Expand help for all questions
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @default false
     */
    show_variable_help_on_load: GlideElementBoolean;

    /**
     * Start closed
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     */
    start_closed: GlideElementBoolean;

    /**
     * Template
     * @type {sys_templateElementReference}
     * @memberof Isc_cat_itemColumns
     * @description Reference to table "sys_template"
     */
    template: sys_templateElementReference;

    /**
     * Type
     * @type {IStringChoiceGlideElement<sc_cat_itemType>}
     * @memberof Isc_cat_itemColumns
     * @default "item"
     * @description Choices: "package": "Package"; "template": "Template"; "bundle": "Bundle"; "task": "Task"; "item": "Item"
     *      Max length: 40
     */
    type: IStringChoiceGlideElement<sc_cat_itemType>;

    /**
     * Use cart layout
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @default true
     */
    use_sc_layout: GlideElementBoolean;

    /**
     * Vendor
     * @type {core_companyElementReference}
     * @memberof Isc_cat_itemColumns
     * @description Reference to table "core_company"
     */
    vendor: core_companyElementReference;

    /**
     * Visible on Bundles
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @default true
     */
    visible_bundle: GlideElementBoolean;

    /**
     * Visible on Guides
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @default true
     */
    visible_guide: GlideElementBoolean;

    /**
     * Visible elsewhere
     * @type {GlideElementBoolean}
     * @memberof Isc_cat_itemColumns
     * @default true
     */
    visible_standalone: GlideElementBoolean;

    /**
     * Workflow
     * @type {wf_workflowElementReference}
     * @memberof Isc_cat_itemColumns
     * @description Reference to table "wf_workflow"
     */
    workflow: wf_workflowElementReference;
}
declare type sc_cat_itemGlideRecord = sys_metadataGlideRecord & Isc_cat_itemColumns;
declare type sc_cat_itemElementReference = sys_metadataElementReference & GlidePropertiesElementReference<Isc_cat_itemColumns, sc_cat_itemGlideRecord>;

/**
 * GlideElement values from the Request table.
 * @interface Isc_requestColumns
 * @extends {ItaskColumns}
 */
declare interface Isc_requestColumns extends ItaskColumns {
    /**
     * Resolve Time
     * @type {GlideElementNumeric}
     * @memberof Isc_requestColumns
     */
    calendar_stc: GlideElementNumeric;

    /**
     * Delivery address
     * @type {StringGlideElement}
     * @memberof Isc_requestColumns
     * @description Max length: 4000
     */
    delivery_address: StringGlideElement;

    /**
     * Price
     * @type {GlideElementNumeric}
     * @memberof Isc_requestColumns
     * @readonly
     * @description Internal type is "currency"
     */
    price: GlideElementNumeric;

    /**
     * Requested for date
     * @type {StringGlideElement}
     * @memberof Isc_requestColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    requested_date: StringGlideElement;

    /**
     * Requested for
     * @type {sys_userElementReference}
     * @memberof Isc_requestColumns
     * @default "javascript:gs.getUserID()"
     * @description Reference to table "sys_user"
     */
    requested_for: sys_userElementReference;

    /**
     * Request state
     * @type {IStringChoiceGlideElement<IRequestState>}
     * @memberof Isc_requestColumns
     * @default "requested"
     * @description Choices: "closed_skipped": "Closed Skipped"; "closed_rejected": "Closed Rejected"; "closed_cancelled": "Closed Cancelled"; "closed_incomplete": "Closed Incomplete"; "closed_complete": "Closed Complete"; "in_process": "Approved"; "requested": "Pending Approval"
     *      Max length: 40
     */
    request_state: IStringChoiceGlideElement<IRequestState>;

    /**
     * Sourceable
     * @type {GlideElementBoolean}
     * @memberof Isc_requestColumns
     * @readonly
     */
    sourceable: GlideElementBoolean;

    /**
     * Sourced
     * @type {GlideElementBoolean}
     * @memberof Isc_requestColumns
     * @readonly
     */
    sourced: GlideElementBoolean;

    /**
     * Special instructions
     * @type {StringGlideElement}
     * @memberof Isc_requestColumns
     * @description Max length: 4000
     */
    special_instructions: StringGlideElement;

    /**
     * Stage
     * @type {GlideElement}
     * @memberof Isc_requestColumns
     * @default "requested"
     * @description Internal type is "workflow"
     *      Choices: "closed_incomplete": "Closed Incomplete"; "closed_complete": "Closed Complete"; "delivery": "Delivery"; "fulfillment": "Fulfillment"; "approval": "Approval"; "requested": "Requested"
     */
    stage: GlideElement;
}
declare type sc_requestGlideRecord = taskGlideRecord & Isc_requestColumns;
declare type sc_requestElementReference = taskElementReference & GlidePropertiesElementReference<Isc_requestColumns, sc_requestGlideRecord>;

/**
 * GlideElement values from the Requested Item table.
 * @interface Isc_req_itemColumns
 * @extends {ItaskColumns}
 */
declare interface Isc_req_itemColumns extends ItaskColumns {
    /**
     * Backordered
     * @type {GlideElementBoolean}
     * @memberof Isc_req_itemColumns
     */
    backordered: GlideElementBoolean;

    /**
     * Billable
     * @type {GlideElementBoolean}
     * @memberof Isc_req_itemColumns
     */
    billable: GlideElementBoolean;

    /**
     * Item
     * @type {sc_cat_itemElementReference}
     * @memberof Isc_req_itemColumns
     * @description Reference to table "sc_cat_item"
     */
    cat_item: sc_cat_itemElementReference;

    /**
     * Configuration item
     * @type {cmdb_ciElementReference}
     * @memberof Isc_req_itemColumns
     * @description Reference to table "cmdb_ci"
     */
    configuration_item: cmdb_ciElementReference;

    /**
     * Context
     * @type {wf_contextElementReference}
     * @memberof Isc_req_itemColumns
     * @description Reference to table "wf_context"
     */
    context: wf_contextElementReference;

    /**
     * Estimated delivery
     * @type {StringGlideElement}
     * @memberof Isc_req_itemColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    estimated_delivery: StringGlideElement;

    /**
     * Order Guide
     * @type {sc_cat_item_guideElementReference}
     * @memberof Isc_req_itemColumns
     * @description Reference to table "sc_cat_item_guide"
     */
    order_guide: GlideElementReference;

    /**
     * Price
     * @type {GlideElementNumeric}
     * @memberof Isc_req_itemColumns
     * @description Internal type is "currency"
     */
    price: GlideElementNumeric;

    /**
     * Quantity
     * @type {GlideElementNumeric}
     * @memberof Isc_req_itemColumns
     * @default 1
     */
    quantity: GlideElementNumeric;

    /**
     * Quantity Sourced
     * @type {GlideElementNumeric}
     * @memberof Isc_req_itemColumns
     * @readonly
     * @default 0
     */
    quantity_sourced: GlideElementNumeric;

    /**
     * Received
     * @type {GlideElementBoolean}
     * @memberof Isc_req_itemColumns
     */
    received: GlideElementBoolean;

    /**
     * Recurring Price Frequency
     * @type {GlideElement}
     * @memberof Isc_req_itemColumns
     * @description Internal type is "choice"
     */
    recurring_frequency: GlideElement;

    /**
     * Recurring Price
     * @type {GlideElementNumeric}
     * @memberof Isc_req_itemColumns
     * @default 0
     * @description Internal type is "price"
     */
    recurring_price: GlideElementNumeric;

    /**
     * Request
     * @type {sc_requestElementReference}
     * @memberof Isc_req_itemColumns
     * @description Reference to table "sc_request"
     */
    request: sc_requestElementReference;

    /**
     * Catalog
     * @type {sc_catalogElementReference}
     * @memberof Isc_req_itemColumns
     * @readonly
     * @description Reference to table "sc_catalog"
     */
    sc_catalog: sc_catalogElementReference;

    /**
     * Sourced
     * @type {GlideElementBoolean}
     * @memberof Isc_req_itemColumns
     * @readonly
     * @default false
     */
    sourced: GlideElementBoolean;

    /**
     * Stage
     * @type {GlideElement}
     * @memberof Isc_req_itemColumns
     * @readonly
     * @default "waiting_for_approval"
     * @description Internal type is "workflow"
     *      Choices: "waiting_for_approval": "Waiting for Approval"; "request_approved": "Request Approved"; "Request Cancelled": "Request Cancelled"; "fulfilment": "Fulfilment"; "fulfillment": "Fulfillment"; "delivery": "Delivery"; "configuration": "Configuration"; "complete": "Completed"; "awaiting_delivery": "Awaiting Delivery"; "approval": "Approval"
     */
    stage: GlideElement;
}
declare type sc_req_itemGlideRecord = taskGlideRecord & Isc_req_itemColumns;
declare type sc_req_itemElementReference = taskElementReference & GlidePropertiesElementReference<Isc_req_itemColumns, sc_req_itemGlideRecord>;

/**
 * GlideElement values from the Catalog Task table.
 * @interface Isc_taskColumns
 * @extends {ItaskColumns}
 */
declare interface Isc_taskColumns extends ItaskColumns {
    /**
     * Resolve Time
     * @type {GlideElementNumeric}
     * @memberof Isc_taskColumns
     */
    calendar_stc: GlideElementNumeric;

    /**
     * Request
     * @type {sc_requestElementReference}
     * @memberof Isc_taskColumns
     * @readonly
     * @description Reference to table "sc_request"
     */
    request: sc_requestElementReference;

    /**
     * Request item
     * @type {sc_req_itemElementReference}
     * @memberof Isc_taskColumns
     * @description Reference to table "sc_req_item"
     */
    request_item: sc_req_itemElementReference;

    /**
     * Catalog
     * @type {sc_catalogElementReference}
     * @memberof Isc_taskColumns
     * @readonly
     * @description Reference to table "sc_catalog"
     */
    sc_catalog: sc_catalogElementReference;
}
declare type sc_taskGlideRecord = taskGlideRecord & Isc_taskColumns;
declare type sc_taskElementReference = taskElementReference & GlidePropertiesElementReference<Isc_taskColumns, sc_taskGlideRecord>;

/**
 * GlideElement values from the Model Category table.
 * @interface Icmdb_model_categoryColumns
 */
declare interface Icmdb_model_categoryColumns extends IGlideElementColumns {
    /**
     * Allow as master
     * @type {GlideElementBoolean}
     * @memberof Icmdb_model_categoryColumns
     * @default false
     */
    allow_as_master: GlideElementBoolean;

    /**
     * Allow in bundle
     * @type {GlideElementBoolean}
     * @memberof Icmdb_model_categoryColumns
     * @default false
     */
    allow_in_bundle: GlideElementBoolean;

    /**
     * Allow pre-allocation
     * @type {GlideElementBoolean}
     * @memberof Icmdb_model_categoryColumns
     * @default false
     */
    allow_pre_allocation: GlideElementBoolean;

    /**
     * Asset class
     * @type {StringGlideElement}
     * @memberof Icmdb_model_categoryColumns
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    asset_class: StringGlideElement;

    /**
     * Bundle
     * @type {GlideElementBoolean}
     * @memberof Icmdb_model_categoryColumns
     * @readonly
     * @default false
     */
    bundle: GlideElementBoolean;

    /**
     * CI class
     * @type {StringGlideElement}
     * @memberof Icmdb_model_categoryColumns
     * @description Internal type is "table_name"
     *      Max length: 80
     */
    cmdb_ci_class: StringGlideElement;

    /**
     * Enforce CI verification
     * @type {GlideElementBoolean}
     * @memberof Icmdb_model_categoryColumns
     */
    enforce_verification: GlideElementBoolean;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Icmdb_model_categoryColumns
     * @description Max length: 100
     */
    name: StringGlideElement;
}
declare type cmdb_model_categoryGlideRecord = GlideRecord & Icmdb_model_categoryColumns;
declare type cmdb_model_categoryElementReference = GlideElementReference & GlidePropertiesElementReference<Icmdb_model_categoryColumns, cmdb_model_categoryGlideRecord>;

/**
 * GlideElement values from the Model Component table.
 * @interface Icmdb_m2m_model_componentColumns
 */
declare interface Icmdb_m2m_model_componentColumns extends IGlideElementColumns {
    /**
     * Component
     * @type {cmdb_modelElementReference}
     * @memberof Icmdb_m2m_model_componentColumns
     * @description Reference to table "cmdb_model"
     */
    child: cmdb_modelElementReference;

    /**
     * Is main component
     * @type {GlideElementBoolean}
     * @memberof Icmdb_m2m_model_componentColumns
     */
    master: GlideElementBoolean;

    /**
     * Model category of component
     * @type {cmdb_model_categoryElementReference}
     * @memberof Icmdb_m2m_model_componentColumns
     * @description Reference to table "cmdb_model_category"
     */
    model_category: cmdb_model_categoryElementReference;

    /**
     * Bundle
     * @type {cmdb_modelElementReference}
     * @memberof Icmdb_m2m_model_componentColumns
     * @description Reference to table "cmdb_model"
     */
    parent: cmdb_modelElementReference;
}
declare type cmdb_m2m_model_componentGlideRecord = GlideRecord & Icmdb_m2m_model_componentColumns;
declare type cmdb_m2m_model_componentElementReference = GlideElementReference & GlidePropertiesElementReference<Icmdb_m2m_model_componentColumns, cmdb_m2m_model_componentGlideRecord>;

/**
 * GlideElement values from the Product Model table.
 * @interface Icmdb_modelColumns
 */
declare interface Icmdb_modelColumns extends IGlideElementColumns {
    /**
     * Acquisition method
     * @type {StringGlideElement}
     * @memberof Icmdb_modelColumns
     * @description Choices: "Both": "Both"; "Buy": "Buy"; "Lease": "Lease"
     *      Max length: 40
     */
    acquisition_method: StringGlideElement;

    /**
     * Asset tracking strategy
     * @type {StringGlideElement}
     * @memberof Icmdb_modelColumns
     * @default "leave_to_category"
     * @description Choices: "do_not_track": "Don't create assets"; "track_as_consumable": "Create consumable asset"; "leave_to_category": "Leave to category"
     *      Max length: 40
     */
    asset_tracking_strategy: StringGlideElement;

    /**
     * Barcode
     * @type {StringGlideElement}
     * @memberof Icmdb_modelColumns
     * @description Max length: 40
     */
    barcode: StringGlideElement;

    /**
     * Bundle
     * @type {GlideElementBoolean}
     * @memberof Icmdb_modelColumns
     */
    bundle: GlideElementBoolean;

    /**
     * Certified
     * @type {GlideElementBoolean}
     * @memberof Icmdb_modelColumns
     */
    certified: GlideElementBoolean;

    /**
     * CMDB CI class
     * @type {StringGlideElement}
     * @memberof Icmdb_modelColumns
     * @description Max length: 40
     */
    cmdb_ci_class: StringGlideElement;

    /**
     * Model categories
     * @type {GlideElement}
     * @memberof Icmdb_modelColumns
     * @default "Bundle"
     * @description Internal type is "glide_list"
     */
    cmdb_model_category: GlideElement;

    /**
     * Comments
     * @type {StringGlideElement}
     * @memberof Icmdb_modelColumns
     * @description Max length: 4000
     */
    comments: StringGlideElement;

    /**
     * Cost
     * @type {GlideElementNumeric}
     * @memberof Icmdb_modelColumns
     * @description Internal type is "price"
     */
    cost: GlideElementNumeric;

    /**
     * Depreciation
     * @type {cmdb_depreciationElementReference}
     * @memberof Icmdb_modelColumns
     * @description Reference to table "cmdb_depreciation"
     */
    depreciation: GlideElementReference;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Icmdb_modelColumns
     * @description Internal type is "translated_html"
     *      Max length: 8000
     */
    description: StringGlideElement;

    /**
     * Display name
     * @type {StringGlideElement}
     * @memberof Icmdb_modelColumns
     * @readonly
     * @description Max length: 255
     */
    display_name: StringGlideElement;

    /**
     * Expenditure type
     * @type {StringGlideElement}
     * @memberof Icmdb_modelColumns
     * @description Choices: "opex": "Opex"; "capex": "Capex"
     *      Max length: 40
     */
    expenditure_type: StringGlideElement;

    /**
     * Flow Rate (cfm)
     * @type {GlideElementNumeric}
     * @memberof Icmdb_modelColumns
     */
    flow_rate: GlideElementNumeric;

    /**
     * Full name
     * @type {StringGlideElement}
     * @memberof Icmdb_modelColumns
     * @description Max length: 100
     */
    full_name: StringGlideElement;

    /**
     * Main component
     * @type {cmdb_m2m_model_componentElementReference}
     * @memberof Icmdb_modelColumns
     * @readonly
     * @description Reference to table "cmdb_m2m_model_component"
     */
    main_component: cmdb_m2m_model_componentElementReference;

    /**
     * Manufacturer
     * @type {core_companyElementReference}
     * @memberof Icmdb_modelColumns
     * @description Reference to table "core_company"
     */
    manufacturer: core_companyElementReference;

    /**
     * Model number
     * @type {StringGlideElement}
     * @memberof Icmdb_modelColumns
     * @description Max length: 80
     */
    model_number: StringGlideElement;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Icmdb_modelColumns
     * @description Max length: 80
     */
    name: StringGlideElement;

    /**
     * Owner
     * @type {sys_userElementReference}
     * @memberof Icmdb_modelColumns
     * @description Reference to table "sys_user"
     */
    owner: sys_userElementReference;

    /**
     * Picture
     * @type {GlideElementUserImage}
     * @memberof Icmdb_modelColumns
     */
    picture: GlideElementUserImage;

    /**
     * Power (watts)
     * @type {GlideElementNumeric}
     * @memberof Icmdb_modelColumns
     */
    power_consumption: GlideElementNumeric;

    /**
     * Product Catalog Item
     * @type {sc_cat_itemElementReference}
     * @memberof Icmdb_modelColumns
     * @readonly
     * @description Reference to table "sc_cat_item"
     */
    product_catalog_item: sc_cat_itemElementReference;

    /**
     * Height (U)
     * @type {GlideElementNumeric}
     * @memberof Icmdb_modelColumns
     * @default 1
     */
    rack_units: GlideElementNumeric;

    /**
     * Salvage value
     * @type {GlideElementNumeric}
     * @memberof Icmdb_modelColumns
     * @description Internal type is "currency"
     */
    salvage_value: GlideElementNumeric;

    /**
     * Short description
     * @type {StringGlideElement}
     * @memberof Icmdb_modelColumns
     * @description Max length: 100
     */
    short_description: StringGlideElement;

    /**
     * SLA
     * @type {StringGlideElement}
     * @memberof Icmdb_modelColumns
     * @description Max length: 30
     */
    sla: StringGlideElement;

    /**
     * Sound Power (bels)
     * @type {GlideElementNumeric}
     * @memberof Icmdb_modelColumns
     */
    sound_power: GlideElementNumeric;

    /**
     * Status
     * @type {StringGlideElement}
     * @memberof Icmdb_modelColumns
     * @default "In Production"
     * @description Choices: "In Production": "In Production"; "Retired": "Retired"; "Sold": "Sold"
     *      Max length: 40
     */
    status: StringGlideElement;

    /**
     * Class
     * @type {GlideElementSysClassName}
     * @memberof Icmdb_modelColumns
     * @default "javascript:current.getTableName();"
     */
    sys_class_name: GlideElementSysClassName;

    /**
     * Type
     * @type {StringGlideElement}
     * @memberof Icmdb_modelColumns
     * @default "Generic"
     * @description Choices: "Product": "Product"; "Scrum product": "Scrum product"; "Generic": "Generic"; "Generic": "Generic"
     *      Max length: 40
     */
    type: StringGlideElement;

    /**
     * Weight (lbs)
     * @type {GlideElementNumeric}
     * @memberof Icmdb_modelColumns
     */
    weight: GlideElementNumeric;
}
declare type cmdb_modelGlideRecord = GlideRecord & Icmdb_modelColumns;
declare type cmdb_modelElementReference = GlideElementReference & GlidePropertiesElementReference<Icmdb_modelColumns, cmdb_modelGlideRecord>;

/**
 * GlideElement values from the Asset table.
 * @interface Ialm_assetColumns
 */
declare interface Ialm_assetColumns extends IGlideElementColumns {
    /**
     * Acquisition method
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Choices: "loan": "Loan"; "rental": "Rental"; "lease": "Lease"; "purchase": "Purchase"
     *      Max length: 40
     */
    acquisition_method: StringGlideElement;

    /**
     * Active transfer order
     * @type {GlideElementBoolean}
     * @memberof Ialm_assetColumns
     * @readonly
     * @default false
     */
    active_to: GlideElementBoolean;

    /**
     * Asset tag
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Max length: 40
     */
    asset_tag: StringGlideElement;

    /**
     * Assigned
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    assigned: StringGlideElement;

    /**
     * Assigned to
     * @type {sys_userElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "sys_user"
     */
    assigned_to: sys_userElementReference;

    /**
     * Beneficiary
     * @type {core_companyElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "core_company"
     */
    beneficiary: core_companyElementReference;

    /**
     * Checked in
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    checked_in: StringGlideElement;

    /**
     * Checked out
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    checked_out: StringGlideElement;

    /**
     * Configuration Item
     * @type {cmdb_ciElementReference}
     * @memberof Ialm_assetColumns
     * @readonly
     * @description Reference to table "cmdb_ci"
     */
    ci: cmdb_ciElementReference;

    /**
     * Comments
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Max length: 4000
     */
    comments: StringGlideElement;

    /**
     * Company
     * @type {core_companyElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "core_company"
     */
    company: core_companyElementReference;

    /**
     * Cost
     * @type {GlideElementNumeric}
     * @memberof Ialm_assetColumns
     * @description Internal type is "currency"
     */
    cost: GlideElementNumeric;

    /**
     * Cost center
     * @type {cmn_cost_centerElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "cmn_cost_center"
     */
    cost_center: GlideElementReference;

    /**
     * Order received
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    delivery_date: StringGlideElement;

    /**
     * Department
     * @type {cmn_departmentElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "cmn_department"
     */
    department: cmn_departmentElementReference;

    /**
     * Depreciated amount
     * @type {GlideElementNumeric}
     * @memberof Ialm_assetColumns
     * @readonly
     * @description Internal type is "currency"
     */
    depreciated_amount: GlideElementNumeric;

    /**
     * Depreciation
     * @type {cmdb_depreciationElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "cmdb_depreciation"
     */
    depreciation: GlideElementReference;

    /**
     * Depreciation effective date
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    depreciation_date: StringGlideElement;

    /**
     * Display name
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @readonly
     * @description Max length: 255
     */
    display_name: StringGlideElement;

    /**
     * Disposal reason
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Max length: 255
     */
    disposal_reason: StringGlideElement;

    /**
     * Due
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    due: StringGlideElement;

    /**
     * Due in
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Choices: "1 Day": "1 Day"; "1 Hour": "1 Hour"; "1 Week": "1 Week"
     *      Max length: 40
     */
    due_in: StringGlideElement;

    /**
     * Expenditure type
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Choices: "opex": "Opex"; "capex": "Capex"
     *      Max length: 40
     */
    expenditure_type: StringGlideElement;

    /**
     * GL account
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Max length: 40
     */
    gl_account: StringGlideElement;

    /**
     * Installed
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    install_date: StringGlideElement;

    /**
     * State
     * @type {IGlideValueElement<alm_assetInstallStatus, alm_assetInstallStatusString>}
     * @memberof Ialm_assetColumns
     * @default 1
     * @description Choices: "8": "Missing"; "7": "Retired"; "3": "In maintenance"; "10": "Consumed"; "1": "In use"; "9": "In transit"; "6": "In stock"; "2": "On order"
     */
    install_status: IGlideValueElement<alm_assetInstallStatus, alm_assetInstallStatusString>;

    /**
     * Invoice number
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Max length: 40
     */
    invoice_number: StringGlideElement;

    /**
     * Justification
     * @type {IStringChoiceGlideElement<alm_assetJustification>}
     * @memberof Ialm_assetColumns
     * @description Choices: "New employee hire": "New employee hire"; "Replace in repair": "Replace in repair"; "Replace stolen": "Replace stolen"; "Replacement": "Replacement"; "Stock replenishment": "Stock replenishment"; "Swap": "Swap"; "Testing": "Testing"; "Upgrade": "Upgrade"
     *      Max length: 80
     */
    justification: IStringChoiceGlideElement<alm_assetJustification>;

    /**
     * Lease contract
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Max length: 40
     */
    lease_id: StringGlideElement;

    /**
     * Location
     * @type {cmn_locationElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "cmn_location"
     */
    location: cmn_locationElementReference;

    /**
     * Managed by
     * @type {sys_userElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "sys_user"
     */
    managed_by: sys_userElementReference;

    /**
     * Model
     * @type {cmdb_modelElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "cmdb_model"
     */
    model: cmdb_modelElementReference;

    /**
     * Model category
     * @type {cmdb_model_categoryElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "cmdb_model_category"
     */
    model_category: cmdb_model_categoryElementReference;

    /**
     * Old status
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @readonly
     * @description Max length: 40
     */
    old_status: StringGlideElement;

    /**
     * Old substatus
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @readonly
     * @description Max length: 40
     */
    old_substatus: StringGlideElement;

    /**
     * Ordered
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    order_date: StringGlideElement;

    /**
     * Owned by
     * @type {sys_userElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "sys_user"
     */
    owned_by: sys_userElementReference;

    /**
     * Parent
     * @type {alm_assetElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "alm_asset"
     */
    parent: alm_assetElementReference;

    /**
     * PO number
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Max length: 40
     */
    po_number: StringGlideElement;

    /**
     * Pre-allocated
     * @type {GlideElementBoolean}
     * @memberof Ialm_assetColumns
     * @readonly
     * @default false
     */
    pre_allocated: GlideElementBoolean;

    /**
     * Purchased
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    purchase_date: StringGlideElement;

    /**
     * Purchase order line
     * @type {proc_po_itemElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "proc_po_item"
     */
    purchase_line: GlideElementReference;

    /**
     * Quantity
     * @type {GlideElementNumeric}
     * @memberof Ialm_assetColumns
     * @default 1
     */
    quantity: GlideElementNumeric;

    /**
     * Receiving line
     * @type {proc_rec_slip_itemElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "proc_rec_slip_item"
     */
    receiving_line: GlideElementReference;

    /**
     * Request line
     * @type {sc_req_itemElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "sc_req_item"
     */
    request_line: sc_req_itemElementReference;

    /**
     * Resale price
     * @type {GlideElementNumeric}
     * @memberof Ialm_assetColumns
     * @description Internal type is "price"
     */
    resale_price: GlideElementNumeric;

    /**
     * Reserved for
     * @type {sys_userElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "sys_user"
     */
    reserved_for: sys_userElementReference;

    /**
     * Residual value
     * @type {GlideElementNumeric}
     * @memberof Ialm_assetColumns
     * @readonly
     * @description Internal type is "currency"
     */
    residual: GlideElementNumeric;

    /**
     * Residual date
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @readonly
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    residual_date: StringGlideElement;

    /**
     * Retired date
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    retired: StringGlideElement;

    /**
     * Scheduled retirement
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    retirement_date: StringGlideElement;

    /**
     * Salvage value
     * @type {GlideElementNumeric}
     * @memberof Ialm_assetColumns
     * @description Internal type is "currency"
     */
    salvage_value: GlideElementNumeric;

    /**
     * Serial number
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Max length: 100
     */
    serial_number: StringGlideElement;

    /**
     * Skip sync
     * @type {GlideElementBoolean}
     * @memberof Ialm_assetColumns
     * @readonly
     * @default false
     */
    skip_sync: GlideElementBoolean;

    /**
     * Stockroom
     * @type {alm_stockroomElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "alm_stockroom"
     */
    stockroom: GlideElementReference;

    /**
     * Substate
     * @type {IStringChoiceGlideElement<alm_assetSubstatus>}
     * @memberof Ialm_assetColumns
     * @default "javascript:if(current.install_status == '6')'available';"
     * @description Choices: "pre_allocated": "Pre-allocated"; "pending_transfer": "Pending transfer"; "pending_disposal": "Pending disposal"; "pre_allocated": "Pre-allocated"; "pending_disposal": "Pending disposal"; "pending_install": "Pending install"; "pending_install": "Pending install"; "pending_repair": "Pending repair"; "vendor_credit": "Vendor credit"; "defective": "Defective"; "defective": "Defective"; "donated": "Donated"; "reserved": "Reserved"; "reserved": "Reserved"; "sold": "Sold"; "stolen": "Stolen"; "available": "Available"; "available": "Available"; "disposed": "Disposed"; "lost": "Lost"
     *      Max length: 40
     */
    substatus: IStringChoiceGlideElement<alm_assetSubstatus>;

    /**
     * Supported by
     * @type {sys_userElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "sys_user"
     */
    supported_by: sys_userElementReference;

    /**
     * Support group
     * @type {sys_user_groupElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "sys_user_group"
     */
    support_group: sys_user_groupElementReference;

    /**
     * Class
     * @type {GlideElementSysClassName}
     * @memberof Ialm_assetColumns
     * @default "javascript:current.getTableName();"
     */
    sys_class_name: GlideElementSysClassName;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof Ialm_assetColumns
     * @default "global"
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof Ialm_assetColumns
     * @default "/"
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;

    /**
     * Vendor
     * @type {core_companyElementReference}
     * @memberof Ialm_assetColumns
     * @description Reference to table "core_company"
     */
    vendor: core_companyElementReference;

    /**
     * Warranty expiration
     * @type {StringGlideElement}
     * @memberof Ialm_assetColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    warranty_expiration: StringGlideElement;

    /**
     * Work notes
     * @type {GlideElement}
     * @memberof Ialm_assetColumns
     * @description Internal type is "journal_input"
     */
    work_notes: GlideElement;
}
declare type alm_assetGlideRecord = GlideRecord & Ialm_assetColumns;
declare type alm_assetElementReference = GlideElementReference & GlidePropertiesElementReference<Ialm_assetColumns, alm_assetGlideRecord>;

/**
 * GlideElement values from the Base Configuration Item table.
 * @interface IcmdbColumns
 */
declare interface IcmdbColumns extends IGlideElementColumns {
    /**
     * Asset
     * @type {alm_assetElementReference}
     * @memberof IcmdbColumns
     * @readonly
     * @description Reference to table "alm_asset"
     */
    asset: alm_assetElementReference;

    /**
     * Asset tag
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Max length: 40
     */
    asset_tag: StringGlideElement;

    /**
     * Assigned
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    assigned: StringGlideElement;

    /**
     * Assigned to
     * @type {sys_userElementReference}
     * @memberof IcmdbColumns
     * @description Reference to table "sys_user"
     */
    assigned_to: sys_userElementReference;

    /**
     * Assignment group
     * @type {sys_user_groupElementReference}
     * @memberof IcmdbColumns
     * @description Reference to table "sys_user_group"
     */
    assignment_group: sys_user_groupElementReference;

    /**
     * Checked in
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    checked_in: StringGlideElement;

    /**
     * Checked out
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    checked_out: StringGlideElement;

    /**
     * Company
     * @type {core_companyElementReference}
     * @memberof IcmdbColumns
     * @description Reference to table "core_company"
     */
    company: core_companyElementReference;

    /**
     * Cost
     * @type {GlideElementNumeric}
     * @memberof IcmdbColumns
     * @description Internal type is "float"
     */
    cost: GlideElementNumeric;

    /**
     * Cost currency
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @default "USD"
     * @description Choices: "EUR": "EUR"; "GBP": "GBP"; "USD": "USD"
     *      Max length: 3
     */
    cost_cc: StringGlideElement;

    /**
     * Cost center
     * @type {cmn_cost_centerElementReference}
     * @memberof IcmdbColumns
     * @description Reference to table "cmn_cost_center"
     */
    cost_center: GlideElementReference;

    /**
     * Order received
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    delivery_date: StringGlideElement;

    /**
     * Department
     * @type {cmn_departmentElementReference}
     * @memberof IcmdbColumns
     * @description Reference to table "cmn_department"
     */
    department: cmn_departmentElementReference;

    /**
     * Due
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    due: StringGlideElement;

    /**
     * Due in
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Choices: "1 Day": "1 Day"; "1 Hour": "1 Hour"; "1 Week": "1 Week"
     *      Max length: 40
     */
    due_in: StringGlideElement;

    /**
     * GL account
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Max length: 40
     */
    gl_account: StringGlideElement;

    /**
     * Installed
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    install_date: StringGlideElement;

    /**
     * Status
     * @type {IGlideValueElement<cmdbInstall_status, cmdbInstall_statusString>}
     * @memberof IcmdbColumns
     * @default 1
     * @description Choices: "100": "Absent"; "3": "In Maintenance"; "6": "In Stock"; "1": "Installed"; "2": "On Order"; "4": "Pending Install"; "5": "Pending Repair"; "7": "Retired"; "8": "Stolen"
     */
    install_status: IGlideValueElement<cmdbInstall_status, cmdbInstall_statusString>;

    /**
     * Invoice number
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Max length: 40
     */
    invoice_number: StringGlideElement;

    /**
     * Justification
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Choices: "New employee hire": "New employee hire"; "Replace in repair": "Replace in repair"; "Replace stolen": "Replace stolen"; "Replacement": "Replacement"; "Stock replenishment": "Stock replenishment"; "Swap": "Swap"; "Testing": "Testing"; "Upgrade": "Upgrade"
     *      Max length: 80
     */
    justification: StringGlideElement;

    /**
     * Lease contract
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Max length: 40
     */
    lease_id: StringGlideElement;

    /**
     * Location
     * @type {cmn_locationElementReference}
     * @memberof IcmdbColumns
     * @description Reference to table "cmn_location"
     */
    location: cmn_locationElementReference;

    /**
     * Managed by
     * @type {sys_userElementReference}
     * @memberof IcmdbColumns
     * @description Reference to table "sys_user"
     */
    managed_by: sys_userElementReference;

    /**
     * Manufacturer
     * @type {core_companyElementReference}
     * @memberof IcmdbColumns
     * @description Reference to table "core_company"
     */
    manufacturer: core_companyElementReference;

    /**
     * Model ID
     * @type {cmdb_modelElementReference}
     * @memberof IcmdbColumns
     * @description Reference to table "cmdb_model"
     */
    model_id: cmdb_modelElementReference;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Max length: 255
     */
    name: StringGlideElement;

    /**
     * Ordered
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    order_date: StringGlideElement;

    /**
     * Owned by
     * @type {sys_userElementReference}
     * @memberof IcmdbColumns
     * @description Reference to table "sys_user"
     */
    owned_by: sys_userElementReference;

    /**
     * PO number
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Max length: 40
     */
    po_number: StringGlideElement;

    /**
     * Purchased
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    purchase_date: StringGlideElement;

    /**
     * Serial number
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Max length: 255
     */
    serial_number: StringGlideElement;

    /**
     * Skip sync
     * @type {GlideElementBoolean}
     * @memberof IcmdbColumns
     * @readonly
     * @default false
     */
    skip_sync: GlideElementBoolean;

    /**
     * Supported by
     * @type {sys_userElementReference}
     * @memberof IcmdbColumns
     * @description Reference to table "sys_user"
     */
    supported_by: sys_userElementReference;

    /**
     * Support group
     * @type {sys_user_groupElementReference}
     * @memberof IcmdbColumns
     * @description Reference to table "sys_user_group"
     */
    support_group: sys_user_groupElementReference;

    /**
     * Class
     * @type {GlideElementSysClassName}
     * @memberof IcmdbColumns
     * @default "javascript:current.getTableName();"
     */
    sys_class_name: GlideElementSysClassName;

    /**
     * Sys class path
     * @type {GlideElement}
     * @memberof IcmdbColumns
     * @readonly
     * @default "javascript:GlideDBObjectManager.get().getClassPath(current.getTableName());"
     * @description Internal type is "sys_class_path"
     */
    sys_class_path: GlideElement;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof IcmdbColumns
     * @default "global"
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof IcmdbColumns
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;

    /**
     * Requires verification
     * @type {GlideElementBoolean}
     * @memberof IcmdbColumns
     * @readonly
     */
    unverified: GlideElementBoolean;

    /**
     * Vendor
     * @type {core_companyElementReference}
     * @memberof IcmdbColumns
     * @description Reference to table "core_company"
     */
    vendor: core_companyElementReference;

    /**
     * Warranty expiration
     * @type {StringGlideElement}
     * @memberof IcmdbColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    warranty_expiration: StringGlideElement;
}
declare type cmdbGlideRecord = GlideRecord & IcmdbColumns;
declare type cmdbElementReference = GlideElementReference & GlidePropertiesElementReference<IcmdbColumns, cmdbGlideRecord>;

declare interface Icmdb_ciColumnsBase<TOpStatusValue, TOpStatusString extends TOpStatusValue & string> extends IcmdbColumns {
    /**
     * Asset
     * @type {alm_assetElementReference}
     * @memberof Icmdb_ciColumns
     * @readonly
     * @description Reference to table "alm_asset"
     */
    asset: alm_assetElementReference;

    /**
     * Asset tag
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 40
     */
    asset_tag: StringGlideElement;

    /**
     * Assigned
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    assigned: StringGlideElement;

    /**
     * Assigned to
     * @type {sys_userElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "sys_user"
     */
    assigned_to: sys_userElementReference;

    /**
     * Assignment group
     * @type {sys_user_groupElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "sys_user_group"
     */
    assignment_group: sys_user_groupElementReference;

    /**
     * Attributes
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 65000
     */
    attributes: StringGlideElement;

    /**
     * Can Print
     * @type {GlideElementBoolean}
     * @memberof Icmdb_ciColumns
     * @default false
     */
    can_print: GlideElementBoolean;

    /**
     * Category
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @default "javascript:gs.include(\"CMDBItem\");var item = new CMDBItem(current);item.setCategory();"
     * @description Max length: 40
     */
    category: StringGlideElement;

    /**
     * Approval group
     * @type {sys_user_groupElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "sys_user_group"
     */
    change_control: sys_user_groupElementReference;

    /**
     * Checked in
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    checked_in: StringGlideElement;

    /**
     * Checked out
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    checked_out: StringGlideElement;

    /**
     * Comments
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 4000
     */
    comments: StringGlideElement;

    /**
     * Company
     * @type {core_companyElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "core_company"
     */
    company: core_companyElementReference;

    /**
     * Correlation ID
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 512
     */
    correlation_id: StringGlideElement;

    /**
     * Cost
     * @type {GlideElementNumeric}
     * @memberof Icmdb_ciColumns
     * @description Internal type is "float"
     */
    cost: GlideElementNumeric;

    /**
     * Cost currency
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @default "USD"
     * @description Max length: 3
     */
    cost_cc: StringGlideElement;

    /**
     * Cost center
     * @type {cmn_cost_centerElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "cmn_cost_center"
     */
    cost_center: GlideElementReference;

    /**
     * Order received
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    delivery_date: StringGlideElement;

    /**
     * Department
     * @type {cmn_departmentElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "cmn_department"
     */
    department: cmn_departmentElementReference;

    /**
     * Discovery source
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Choices: "Altiris": "Altiris"; "EventManagement": "EventManagement"; "ImportSet": "ImportSet"; "LANDesk": "LANDesk"; "Manual Entry": "Manual Entry"; "MS SMS": "MS SMS"; "OpenView": "OpenView"; "Other Automated": "Other Automated"; "PatternDesigner": "PatternDesigner"; "ServiceNow": "ServiceNow"; "ServiceWatch": "ServiceWatch"; "Tivoli": "Tivoli"
     *      Max length: 40
     */
    discovery_source: StringGlideElement;

    /**
     * DNS Domain
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 255
     */
    dns_domain: StringGlideElement;

    /**
     * Due
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    due: StringGlideElement;

    /**
     * Due in
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 40
     */
    due_in: StringGlideElement;

    /**
     * Fault count
     * @type {GlideElementNumeric}
     * @memberof Icmdb_ciColumns
     * @default 0
     */
    fault_count: GlideElementNumeric;

    /**
     * First discovered
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    first_discovered: StringGlideElement;

    /**
     * Fully qualified domain name
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 255
     */
    fqdn: StringGlideElement;

    /**
     * GL account
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 40
     */
    gl_account: StringGlideElement;

    /**
     * Installed
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    install_date: StringGlideElement;

    /**
     * Invoice number
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 40
     */
    invoice_number: StringGlideElement;

    /**
     * IP Address
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 255
     */
    ip_address: StringGlideElement;

    /**
     * Justification
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 80
     */
    justification: StringGlideElement;

    /**
     * Most recent discovery
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    last_discovered: StringGlideElement;

    /**
     * Lease contract
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 40
     */
    lease_id: StringGlideElement;

    /**
     * Location
     * @type {cmn_locationElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "cmn_location"
     */
    location: cmn_locationElementReference;

    /**
     * MAC Address
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 18
     */
    mac_address: StringGlideElement;

    /**
     * Maintenance schedule
     * @type {cmn_scheduleElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "cmn_schedule"
     */
    maintenance_schedule: cmn_scheduleElementReference;

    /**
     * Managed by
     * @type {sys_userElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "sys_user"
     */
    managed_by: sys_userElementReference;

    /**
     * Manufacturer
     * @type {core_companyElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "core_company"
     */
    manufacturer: core_companyElementReference;

    /**
     * Model ID
     * @type {cmdb_modelElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "cmdb_model"
     */
    model_id: cmdb_modelElementReference;

    /**
     * Model number
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 255
     */
    model_number: StringGlideElement;

    /**
     * Monitor
     * @type {GlideElementBoolean}
     * @memberof Icmdb_ciColumns
     * @default false
     */
    monitor: GlideElementBoolean;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 255
     */
    name: StringGlideElement;

    /**
     * Operational status
     * @type {GlideElementNumeric}
     * @memberof Icmdb_ciColumns
     */
    operational_status: IGlideValueElement<TOpStatusValue, TOpStatusString>;

    /**
     * Ordered
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    order_date: StringGlideElement;

    /**
     * Owned by
     * @type {sys_userElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "sys_user"
     */
    owned_by: sys_userElementReference;

    /**
     * PO number
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 40
     */
    po_number: StringGlideElement;

    /**
     * Purchased
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    purchase_date: StringGlideElement;

    /**
     * Schedule
     * @type {cmn_scheduleElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "cmn_schedule"
     */
    schedule: cmn_scheduleElementReference;

    /**
     * Serial number
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 255
     */
    serial_number: StringGlideElement;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 1000
     */
    short_description: StringGlideElement;

    /**
     * Skip sync
     * @type {GlideElementBoolean}
     * @memberof Icmdb_ciColumns
     * @readonly
     * @default false
     */
    skip_sync: GlideElementBoolean;

    /**
     * Start date
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    start_date: StringGlideElement;

    /**
     * Subcategory
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Max length: 40
     */
    subcategory: StringGlideElement;

    /**
     * Supported by
     * @type {sys_userElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "sys_user"
     */
    supported_by: sys_userElementReference;

    /**
     * Support group
     * @type {sys_user_groupElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "sys_user_group"
     */
    support_group: sys_user_groupElementReference;

    /**
     * Class
     * @type {GlideElementSysClassName}
     * @memberof Icmdb_ciColumns
     * @default "javascript:current.getTableName();"
     */
    sys_class_name: GlideElementSysClassName;

    /**
     * Sys class path
     * @type {GlideElement}
     * @memberof Icmdb_ciColumns
     * @readonly
     * @default "javascript:GlideDBObjectManager.get().getClassPath(current.getTableName());"
     * @description Internal type is "sys_class_path"
     */
    sys_class_path: GlideElement;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof Icmdb_ciColumns
     * @default "global"
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof Icmdb_ciColumns
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;

    /**
     * Requires verification
     * @type {GlideElementBoolean}
     * @memberof Icmdb_ciColumns
     * @readonly
     */
    unverified: GlideElementBoolean;

    /**
     * Vendor
     * @type {core_companyElementReference}
     * @memberof Icmdb_ciColumns
     * @description Reference to table "core_company"
     */
    vendor: core_companyElementReference;

    /**
     * Warranty expiration
     * @type {StringGlideElement}
     * @memberof Icmdb_ciColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    warranty_expiration: StringGlideElement;
}

/**
 * GlideElement values from the Configuration Item table.
 * @interface Icmdb_ciColumns
 * @extends {IcmdbColumns}
 */
declare interface Icmdb_ciColumns extends Icmdb_ciColumnsBase<cmdb_ciOperational_status, cmdb_ciOperational_statusString> {
    /**
     * Operational status
     * @type {GlideElementNumeric}
     * @memberof Icmdb_ciColumns
     * @default 1
     * @description Choices: "6": "Retired"; "5": "Ready"; "4": "DR Standby"; "3": "Repair in Progress"; "2": "Non-Operational"; "1": "Operational"
     */
    operational_status: IGlideValueElement<cmdb_ciOperational_status, cmdb_ciOperational_statusString>;
}
declare type cmdb_ciGlideRecord = cmdbGlideRecord & Icmdb_ciColumns;
declare type cmdb_ciElementReference = cmdbElementReference & GlidePropertiesElementReference<Icmdb_ciColumns, cmdb_ciGlideRecord>;

/**
 * GlideElement values from the Business Service table.
 * @interface Icmdb_ci_serviceColumns
 * @extends {Icmdb_ciColumns}
 */
declare interface Icmdb_ci_serviceColumns extends Icmdb_ciColumnsBase<cmdb_ci_serviceOperational_status, cmdb_ci_serviceOperational_statusString> {
    /**
     * Asset
     * @type {alm_assetElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @readonly
     * @description Reference to table "alm_asset"
     */
    asset: alm_assetElementReference;

    /**
     * Asset tag
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 40
     */
    asset_tag: StringGlideElement;

    /**
     * Assigned
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    assigned: StringGlideElement;

    /**
     * Assigned to
     * @type {sys_userElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "sys_user"
     */
    assigned_to: sys_userElementReference;

    /**
     * Assignment group
     * @type {sys_user_groupElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "sys_user_group"
     */
    assignment_group: sys_user_groupElementReference;

    /**
     * Attributes
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 65000
     */
    attributes: StringGlideElement;

    /**
     * Business Criticality
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @default "2 - somewhat critical"
     * @description Choices: "4 - not critical": "4 - not critical"; "3 - less critical": "3 - less critical"; "2 - somewhat critical": "2 - somewhat critical"; "1 - most critical": "1 - most critical"
     *      Max length: 40
     */
    busines_criticality: StringGlideElement;

    /**
     * Can Print
     * @type {GlideElementBoolean}
     * @memberof Icmdb_ci_serviceColumns
     * @default false
     */
    can_print: GlideElementBoolean;

    /**
     * Category
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @default "javascript:gs.include(\"CMDBItem\");var item = new CMDBItem(current);item.setCategory();"
     * @description Max length: 40
     */
    category: StringGlideElement;

    /**
     * Approval group
     * @type {sys_user_groupElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "sys_user_group"
     */
    change_control: sys_user_groupElementReference;

    /**
     * Checked in
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    checked_in: StringGlideElement;

    /**
     * Checked out
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    checked_out: StringGlideElement;

    /**
     * Comments
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 4000
     */
    comments: StringGlideElement;

    /**
     * Company
     * @type {core_companyElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "core_company"
     */
    company: core_companyElementReference;

    /**
     * Correlation ID
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 512
     */
    correlation_id: StringGlideElement;

    /**
     * Cost
     * @type {GlideElementNumeric}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "float"
     */
    cost: GlideElementNumeric;

    /**
     * Cost currency
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @default "USD"
     * @description Max length: 3
     */
    cost_cc: StringGlideElement;

    /**
     * Cost center
     * @type {cmn_cost_centerElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "cmn_cost_center"
     */
    cost_center: GlideElementReference;

    /**
     * Order received
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    delivery_date: StringGlideElement;

    /**
     * Department
     * @type {cmn_departmentElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "cmn_department"
     */
    department: cmn_departmentElementReference;

    /**
     * Discovery source
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 40
     */
    discovery_source: StringGlideElement;

    /**
     * DNS Domain
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 255
     */
    dns_domain: StringGlideElement;

    /**
     * Due
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    due: StringGlideElement;

    /**
     * Due in
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 40
     */
    due_in: StringGlideElement;

    /**
     * Fault count
     * @type {GlideElementNumeric}
     * @memberof Icmdb_ci_serviceColumns
     * @default 0
     */
    fault_count: GlideElementNumeric;

    /**
     * First discovered
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    first_discovered: StringGlideElement;

    /**
     * Fully qualified domain name
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 255
     */
    fqdn: StringGlideElement;

    /**
     * GL account
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 40
     */
    gl_account: StringGlideElement;

    /**
     * Installed
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    install_date: StringGlideElement;

    /**
     * Invoice number
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 40
     */
    invoice_number: StringGlideElement;

    /**
     * IP Address
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 255
     */
    ip_address: StringGlideElement;

    /**
     * Justification
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 80
     */
    justification: StringGlideElement;

    /**
     * Most recent discovery
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    last_discovered: StringGlideElement;

    /**
     * Lease contract
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 40
     */
    lease_id: StringGlideElement;

    /**
     * Location
     * @type {cmn_locationElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "cmn_location"
     */
    location: cmn_locationElementReference;

    /**
     * MAC Address
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 18
     */
    mac_address: StringGlideElement;

    /**
     * Maintenance schedule
     * @type {cmn_scheduleElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "cmn_schedule"
     */
    maintenance_schedule: cmn_scheduleElementReference;

    /**
     * Managed by
     * @type {sys_userElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "sys_user"
     */
    managed_by: sys_userElementReference;

    /**
     * Manufacturer
     * @type {core_companyElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "core_company"
     */
    manufacturer: core_companyElementReference;

    /**
     * Model ID
     * @type {cmdb_modelElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "cmdb_model"
     */
    model_id: cmdb_modelElementReference;

    /**
     * Model number
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 255
     */
    model_number: StringGlideElement;

    /**
     * Monitor
     * @type {GlideElementBoolean}
     * @memberof Icmdb_ci_serviceColumns
     * @default false
     */
    monitor: GlideElementBoolean;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 255
     */
    name: StringGlideElement;

    /**
     * Number
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @readonly
     * @default "javascript:getNextObjNumberPadded();"
     * @description Max length: 40
     */
    number: StringGlideElement;

    /**
     * Operational status
     * @type {IGlideValueElement<cmdb_ci_serviceOperational_status, cmdb_ci_serviceOperational_statusString>}
     * @memberof Icmdb_ci_serviceColumns
     * @default 1
     * @description Choices: "8": "Catalog"; "7": "Pipeline"; "6": "Retired"; "5": "Ready"; "4": "DR Standby"; "3": "Repair in Progress"; "2": "Non-Operational"; "1": "Operational"
     */
    operational_status: IGlideValueElement<cmdb_ci_serviceOperational_status, cmdb_ci_serviceOperational_statusString>;

    /**
     * Ordered
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    order_date: StringGlideElement;

    /**
     * Owned by
     * @type {sys_userElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "sys_user"
     */
    owned_by: sys_userElementReference;

    /**
     * Parent
     * @type {cmdb_ci_serviceElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "cmdb_ci_service"
     */
    parent: cmdb_ci_serviceElementReference;

    /**
     * Portfolio status
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @default "pipeline"
     * @description Choices: "retired": "Retired"; "catalog": "Catalog"; "pipeline": "Pipeline"
     *      Max length: 40
     */
    portfolio_status: StringGlideElement;

    /**
     * PO number
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 40
     */
    po_number: StringGlideElement;

    /**
     * Price model
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @default "per_unit"
     * @description Choices: "per_unit": "Per Unit"; "fixed": "Fixed"
     *      Max length: 40
     */
    price_model: StringGlideElement;

    /**
     * Price unit
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 40
     */
    price_unit: StringGlideElement;

    /**
     * Purchased
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    purchase_date: StringGlideElement;

    /**
     * Schedule
     * @type {cmn_scheduleElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "cmn_schedule"
     */
    schedule: cmn_scheduleElementReference;

    /**
     * Serial number
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 255
     */
    serial_number: StringGlideElement;

    /**
     * Service classification
     * @type {IStringChoiceGlideElement<cmdi_ci_serviceService_classification>}
     * @memberof Icmdb_ci_serviceColumns
     * @default "Business Service"
     * @description Choices: "Billable Service": "Billable Service"; "Application Service": "Application Service"; "Shared Service": "Shared Service"; "Service Offering": "Service Offering"; "Technical Service": "Technical Service"; "Business Service": "Business Service"
     *      Max length: 40
     */
    service_classification: IStringChoiceGlideElement<cmdi_ci_serviceService_classification>;

    /**
     * Service level requirement
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "translated_html"
     *      Max length: 8000
     */
    service_level_requirement: StringGlideElement;

    /**
     * Service status
     * @type {IStringChoiceGlideElement<cmdi_ci_serviceService_status>}
     * @memberof Icmdb_ci_serviceColumns
     * @default "requirements"
     * @description Choices: "chartered": "Chartered"; "retiring": "Retiring"; "approved": "Approved"; "operational": "Operational"; "analysis": "Analysis"; "buildtestrelease": "Build/Test/Release"; "definition": "Definition"; "development": "Development"; "design": "Design"; "requirements": "Requirements"
     *      Max length: 40
     */
    service_status: IStringChoiceGlideElement<cmdi_ci_serviceService_status>;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 1000
     */
    short_description: StringGlideElement;

    /**
     * Skip sync
     * @type {GlideElementBoolean}
     * @memberof Icmdb_ci_serviceColumns
     * @readonly
     * @default false
     */
    skip_sync: GlideElementBoolean;

    /**
     * SLA
     * @type {slaElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "sla"
     */
    sla: slaElementReference;

    /**
     * Start date
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    start_date: StringGlideElement;

    /**
     * Subcategory
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 40
     */
    subcategory: StringGlideElement;

    /**
     * Supported by
     * @type {sys_userElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "sys_user"
     */
    supported_by: sys_userElementReference;

    /**
     * Support group
     * @type {sys_user_groupElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "sys_user_group"
     */
    support_group: sys_user_groupElementReference;

    /**
     * Class
     * @type {GlideElementSysClassName}
     * @memberof Icmdb_ci_serviceColumns
     * @default "javascript:current.getTableName();"
     */
    sys_class_name: GlideElementSysClassName;

    /**
     * Sys class path
     * @type {GlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @readonly
     * @default "javascript:GlideDBObjectManager.get().getClassPath(current.getTableName());"
     * @description Internal type is "sys_class_path"
     */
    sys_class_path: GlideElement;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof Icmdb_ci_serviceColumns
     * @default "global"
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;

    /**
     * Unit description
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "html"
     *      Max length: 4000
     */
    unit_description: StringGlideElement;

    /**
     * Requires verification
     * @type {GlideElementBoolean}
     * @memberof Icmdb_ci_serviceColumns
     * @readonly
     */
    unverified: GlideElementBoolean;

    /**
     * Used for
     * @type {IStringChoiceGlideElement<cmdi_ci_serviceUsed_for>}
     * @memberof Icmdb_ci_serviceColumns
     * @default "Production"
     * @description Choices: "Disaster recovery": "Disaster recovery"; "Training": "Training"; "Demonstration": "Demonstration"; "Development": "Development"; "Test": "Test"; "QA": "QA"; "Staging": "Staging"; "Production": "Production"
     *      Max length: 40
     */
    used_for: IStringChoiceGlideElement<cmdi_ci_serviceUsed_for>;

    /**
     * Users supported
     * @type {sys_user_groupElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "sys_user_group"
     */
    user_group: sys_user_groupElementReference;

    /**
     * Vendor
     * @type {core_companyElementReference}
     * @memberof Icmdb_ci_serviceColumns
     * @description Reference to table "core_company"
     */
    vendor: core_companyElementReference;

    /**
     * Version
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Max length: 40
     */
    version: StringGlideElement;

    /**
     * Warranty expiration
     * @type {StringGlideElement}
     * @memberof Icmdb_ci_serviceColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    warranty_expiration: StringGlideElement;
}
declare type cmdb_ci_serviceGlideRecord = cmdb_ciGlideRecord & Icmdb_ci_serviceColumns;
declare type cmdb_ci_serviceElementReference = cmdb_ciElementReference & GlidePropertiesElementReference<Icmdb_ci_serviceColumns, cmdb_ci_serviceGlideRecord>;

/**
 * GlideElement values from the Service Offering table.
 * @interface Iservice_offeringColumns
 * @extends {Icmdb_ci_serviceColumns}
 */
declare interface Iservice_offeringColumns extends Icmdb_ci_serviceColumns {
    /**
     * Asset
     * @type {alm_assetElementReference}
     * @memberof Iservice_offeringColumns
     * @readonly
     * @description Reference to table "alm_asset"
     */
    asset: alm_assetElementReference;

    /**
     * Asset tag
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 40
     */
    asset_tag: StringGlideElement;

    /**
     * Assigned
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    assigned: StringGlideElement;

    /**
     * Assigned to
     * @type {sys_userElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "sys_user"
     */
    assigned_to: sys_userElementReference;

    /**
     * Assignment group
     * @type {sys_user_groupElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "sys_user_group"
     */
    assignment_group: sys_user_groupElementReference;

    /**
     * Attributes
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 65000
     */
    attributes: StringGlideElement;

    /**
     * Billing
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @default "monthly"
     * @description Choices: "monthly": "Monthly"; "weekly": "Weekly"; "yearly": "Yearly"
     *      Max length: 40
     */
    billing: StringGlideElement;

    /**
     * Business criticality
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @default "2 - somewhat critical"
     * @description Max length: 40
     */
    busines_criticality: StringGlideElement;

    /**
     * Can Print
     * @type {GlideElementBoolean}
     * @memberof Iservice_offeringColumns
     * @default false
     */
    can_print: GlideElementBoolean;

    /**
     * Category
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @default "javascript:gs.include(\"CMDBItem\");var item = new CMDBItem(current);item.setCategory();"
     * @description Max length: 40
     */
    category: StringGlideElement;

    /**
     * Approval group
     * @type {sys_user_groupElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "sys_user_group"
     */
    change_control: sys_user_groupElementReference;

    /**
     * Checked in
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    checked_in: StringGlideElement;

    /**
     * Checked out
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    checked_out: StringGlideElement;

    /**
     * Comments
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 4000
     */
    comments: StringGlideElement;

    /**
     * Company
     * @type {core_companyElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "core_company"
     */
    company: core_companyElementReference;

    /**
     * Contract
     * @type {ast_contractElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "ast_contract"
     */
    contract: GlideElementReference;

    /**
     * Correlation ID
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 512
     */
    correlation_id: StringGlideElement;

    /**
     * Cost
     * @type {GlideElementNumeric}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "float"
     */
    cost: GlideElementNumeric;

    /**
     * Cost currency
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @default "USD"
     * @description Max length: 3
     */
    cost_cc: StringGlideElement;

    /**
     * Cost center
     * @type {cmn_cost_centerElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "cmn_cost_center"
     */
    cost_center: GlideElementReference;

    /**
     * Order received
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    delivery_date: StringGlideElement;

    /**
     * Department
     * @type {cmn_departmentElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "cmn_department"
     */
    department: cmn_departmentElementReference;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 4000
     */
    description: StringGlideElement;

    /**
     * Discovery source
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 40
     */
    discovery_source: StringGlideElement;

    /**
     * DNS Domain
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 255
     */
    dns_domain: StringGlideElement;

    /**
     * Due
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    due: StringGlideElement;

    /**
     * Due in
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 40
     */
    due_in: StringGlideElement;

    /**
     * Fault count
     * @type {GlideElementNumeric}
     * @memberof Iservice_offeringColumns
     * @default 0
     */
    fault_count: GlideElementNumeric;

    /**
     * First discovered
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    first_discovered: StringGlideElement;

    /**
     * Fully qualified domain name
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 255
     */
    fqdn: StringGlideElement;

    /**
     * GL account
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 40
     */
    gl_account: StringGlideElement;

    /**
     * Installed
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    install_date: StringGlideElement;

    /**
     * Invoice number
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 40
     */
    invoice_number: StringGlideElement;

    /**
     * IP Address
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 255
     */
    ip_address: StringGlideElement;

    /**
     * Justification
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 80
     */
    justification: StringGlideElement;

    /**
     * Most recent discovery
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    last_discovered: StringGlideElement;

    /**
     * Lease contract
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 40
     */
    lease_id: StringGlideElement;

    /**
     * Location
     * @type {cmn_locationElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "cmn_location"
     */
    location: cmn_locationElementReference;

    /**
     * MAC Address
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 18
     */
    mac_address: StringGlideElement;

    /**
     * Maintenance schedule
     * @type {cmn_scheduleElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "cmn_schedule"
     */
    maintenance_schedule: cmn_scheduleElementReference;

    /**
     * Managed by
     * @type {sys_userElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "sys_user"
     */
    managed_by: sys_userElementReference;

    /**
     * Manufacturer
     * @type {core_companyElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "core_company"
     */
    manufacturer: core_companyElementReference;

    /**
     * Model ID
     * @type {cmdb_modelElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "cmdb_model"
     */
    model_id: cmdb_modelElementReference;

    /**
     * Model number
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 255
     */
    model_number: StringGlideElement;

    /**
     * Monitor
     * @type {GlideElementBoolean}
     * @memberof Iservice_offeringColumns
     * @default false
     */
    monitor: GlideElementBoolean;

    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 255
     */
    name: StringGlideElement;

    /**
     * Number
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @readonly
     * @default "javascript:getNextObjNumberPadded();"
     * @description Max length: 40
     */
    number: StringGlideElement;

    /**
     * Order
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 40
     */
    order: StringGlideElement;

    /**
     * Ordered
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    order_date: StringGlideElement;

    /**
     * Owned by
     * @type {sys_userElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "sys_user"
     */
    owned_by: sys_userElementReference;

    /**
     * Parent
     * @type {cmdb_ci_serviceElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "cmdb_ci_service"
     */
    parent: cmdb_ci_serviceElementReference;

    /**
     * Portfolio status
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @default "pipeline"
     * @description Max length: 40
     */
    portfolio_status: StringGlideElement;

    /**
     * PO number
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 40
     */
    po_number: StringGlideElement;

    /**
     * Price
     * @type {GlideElementNumeric}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "price"
     */
    price: GlideElementNumeric;

    /**
     * Price model
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @default "per_unit"
     * @description Max length: 40
     */
    price_model: StringGlideElement;

    /**
     * Price unit
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 40
     */
    price_unit: StringGlideElement;

    /**
     * Purchased
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    purchase_date: StringGlideElement;

    /**
     * Schedule
     * @type {cmn_scheduleElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "cmn_schedule"
     */
    schedule: cmn_scheduleElementReference;

    /**
     * Serial number
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 255
     */
    serial_number: StringGlideElement;

    /**
     * Service classification
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @default "Business Service"
     * @description Max length: 40
     */
    service_classification: StringGlideElement;

    /**
     * Service level requirement
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "translated_html"
     *      Max length: 8000
     */
    service_level_requirement: StringGlideElement;

    /**
     * Service status
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @default "requirements"
     * @description Max length: 40
     */
    service_status: StringGlideElement;

    /**
     * Description
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 1000
     */
    short_description: StringGlideElement;

    /**
     * Skip sync
     * @type {GlideElementBoolean}
     * @memberof Iservice_offeringColumns
     * @readonly
     * @default false
     */
    skip_sync: GlideElementBoolean;

    /**
     * SLA
     * @type {slaElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "sla"
     */
    sla: slaElementReference;

    /**
     * Start date
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    start_date: StringGlideElement;

    /**
     * Subcategory
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 40
     */
    subcategory: StringGlideElement;

    /**
     * Supported by
     * @type {sys_userElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "sys_user"
     */
    supported_by: sys_userElementReference;

    /**
     * Support group
     * @type {sys_user_groupElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "sys_user_group"
     */
    support_group: sys_user_groupElementReference;

    /**
     * Class
     * @type {GlideElementSysClassName}
     * @memberof Iservice_offeringColumns
     * @default "javascript:current.getTableName();"
     */
    sys_class_name: GlideElementSysClassName;

    /**
     * Sys class path
     * @type {GlideElement}
     * @memberof Iservice_offeringColumns
     * @readonly
     * @default "javascript:GlideDBObjectManager.get().getClassPath(current.getTableName());"
     * @description Internal type is "sys_class_path"
     */
    sys_class_path: GlideElement;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof Iservice_offeringColumns
     * @default "global"
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;

    /**
     * Technical contact
     * @type {sys_userElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "sys_user"
     */
    technical_contact: sys_userElementReference;

    /**
     * Unit description
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "html"
     *      Max length: 4000
     */
    unit_description: StringGlideElement;

    /**
     * Requires verification
     * @type {GlideElementBoolean}
     * @memberof Iservice_offeringColumns
     * @readonly
     */
    unverified: GlideElementBoolean;

    /**
     * Used for
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @default "Production"
     * @description Max length: 40
     */
    used_for: StringGlideElement;

    /**
     * Users supported
     * @type {sys_user_groupElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "sys_user_group"
     */
    user_group: sys_user_groupElementReference;

    /**
     * Vendor
     * @type {core_companyElementReference}
     * @memberof Iservice_offeringColumns
     * @description Reference to table "core_company"
     */
    vendor: core_companyElementReference;

    /**
     * Version
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Max length: 40
     */
    version: StringGlideElement;

    /**
     * Warranty expiration
     * @type {StringGlideElement}
     * @memberof Iservice_offeringColumns
     * @description Internal type is "glide_date"
     *      Max length: 40
     */
    warranty_expiration: StringGlideElement;
}
declare type service_offeringGlideRecord = cmdb_ci_serviceGlideRecord & Iservice_offeringColumns;
declare type service_offeringElementReference = cmdb_ci_serviceElementReference & GlidePropertiesElementReference<Iservice_offeringColumns, service_offeringGlideRecord>;
