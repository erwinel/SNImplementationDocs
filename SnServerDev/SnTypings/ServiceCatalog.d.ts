/**
 * GlideElement values from the Category table.
 * @interface Isc_categoryFields
 * @extends {Isys_metadataFields}
 */
declare interface Isc_categoryFields extends Isys_metadataFields {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_categoryFields
	 */
    active: IBooleanGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryFields
	 * @description Internal type is translated_text
	 */
    description: IStringGlideElement;
	/**
	 * Entitlement script
	 * @type {GlideElement}
	 * @memberof Isc_categoryFields
	 * @description Internal type is "script_plain"
	 */
    entitlement_script: GlideElement;
	/**
	 * Header icon
	 * @type {GlideElement}
	 * @memberof Isc_categoryFields
	 * @description Internal type is "user_image"
	 */
    header_icon: GlideElement;
	/**
	 * Homepage image
	 * @type {GlideElement}
	 * @memberof Isc_categoryFields
	 * @description Internal type is "user_image"
	 */
    homepage_image: GlideElement;
	/**
	 * Homepage renderer
	 * @type {Isc_homepage_rendererGlideElement}
	 * @memberof Isc_categoryFields
	 * @description Reference to Homepage Category Renderer (IGlideRefElement<Isc_homepage_rendererGlideRecord>)
	 */
    homepage_renderer: GlideReferenceElement;
	/**
	 * Icon
	 * @type {GlideElement}
	 * @memberof Isc_categoryFields
	 * @description Internal type is "user_image"
	 */
    icon: GlideElement;
	/**
	 * Image
	 * @type {GlideElement}
	 * @memberof Isc_categoryFields
	 * @description Internal type is "image"
	 */
    image: GlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Isc_categoryFields
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Hide description (mobile browsing)
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_categoryFields
	 */
    mobile_hide_description: IBooleanGlideElement;
	/**
	 * Mobile Picture
	 * @type {GlideElement}
	 * @memberof Isc_categoryFields
	 * @description Internal type is "user_image"
	 */
    mobile_picture: GlideElement;
	/**
	 * Mobile Subcategory Render Type
	 * @type {IStringBasedGlideElement<("list" | "card")>}
	 * @memberof Isc_categoryFields
	 * @description "list"="List"; "card"="Card"
	 */
    mobile_subcategory_render_type: IStringBasedGlideElement<("list" | "card")>;
	/**
	 * Module link
	 * @type {Isys_app_moduleGlideElement}
	 * @memberof Isc_categoryFields
	 * @description Reference to Module (IGlideRefElement<Isys_app_moduleGlideRecord>)
	 */
    module: GlideReferenceElement;
	/**
	 * Order
	 * @type {INumberGlideElement}
	 * @memberof Isc_categoryFields
	 * @description Internal type is integer
	 */
    order: INumberGlideElement;
	/**
	 * Parent
	 * @type {Isc_categoryGlideElement}
	 * @memberof Isc_categoryFields
	 * @description Reference to Category (IGlideRefElement<Isc_categoryGlideRecord>)
	 */
    parent: Isc_categoryGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isc_categoryFields
	 * @description Internal type is "user_roles"
	 */
    roles: GlideElement;
	/**
	 * Catalog
	 * @type {Isc_catalogGlideElement}
	 * @memberof Isc_categoryFields
	 * @description Reference to Catalog (IGlideRefElement<Isc_catalogGlideRecord>)
	 */
    sc_catalog: Isc_catalogGlideElement;
	/**
	 * Show in CMS
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_categoryFields
	 */
    show_in_cms: IBooleanGlideElement;
	/**
	 * Title
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryFields
	 * @description Internal type is translated_text
	 */
    title: IStringGlideElement;
}
declare interface Isc_categoryGlideRecord extends Isys_metadataGlideRecordBase, Isc_categoryFields { }
declare interface Isc_categoryGlideElement extends Isys_metadataGlideElementBase<Isc_categoryGlideRecord>, Isc_categoryFields { }

/**
 * GlideElement values from the Catalog table.
 * @interface Isc_catalogFields
 * @extends {Isys_metadataFields}
 */
declare interface Isc_catalogFields extends Isys_metadataFields {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_catalogFields
	 */
    active: IBooleanGlideElement;
	/**
	 * Background Color
	 * @type {GlideElement}
	 * @memberof Isc_catalogFields
	 * @description Internal type is "color"
	 */
    background_color: GlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogFields
	 * @description Internal type is translated_text
	 */
    description: IStringGlideElement;
	/**
	 * 'Continue Shopping' page
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogFields
	 */
    desktop_continue_shopping: IStringGlideElement;
	/**
	 * 'Catalog Home' Page
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogFields
	 */
    desktop_home_page: IStringGlideElement;
	/**
	 * Desktop image
	 * @type {GlideElement}
	 * @memberof Isc_catalogFields
	 * @description Internal type is "user_image"
	 */
    desktop_image: GlideElement;
	/**
	 * Editors
	 * @type {GlideElement}
	 * @memberof Isc_catalogFields
	 * @description Internal type is "glide_list"
	 */
    editors: GlideElement;
	/**
	 * Enable Wish List
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_catalogFields
	 */
    enable_wish_list: IBooleanGlideElement;
	/**
	 * Manager
	 * @type {Isys_userGlideElement}
	 * @memberof Isc_catalogFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    manager: Isys_userGlideElement;
	/**
	 * Title
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogFields
	 * @description Internal type is translated_field
	 */
    title: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Catalog table.
 * @interface Isc_catalogGlideRecord
 * @extends {Isys_metadataGlideRecord}
 */
declare interface Isc_catalogGlideRecord extends Isys_metadataGlideRecordBase, Isc_catalogFields { }
/**
 * GlideElement that references a GlideRecord from the sc_catalog table.
 * @interface Isc_catalogGlideElement
 * @extends {Isys_metadataGlideElementBase<Isc_catalogGlideRecord>}
 */
declare interface Isc_catalogGlideElement extends Isys_metadataGlideElementBase<Isc_catalogGlideRecord>, Isc_catalogFields { }

/**
 * GlideElement values from the Catalog Item table.
 * @interface Isc_cat_itemFields
 * @extends {Isys_metadataFields}
 */
declare interface Isc_cat_itemFields extends Isys_metadataFields {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    active: IBooleanGlideElement;
	/**
	 * Availability
	 * @type {IStringBasedGlideElement<("on_both" | "on_desktop" | "on_mobile")>}
	 * @memberof Isc_cat_itemFields
	 * @description "on_both"="Desktop and Mobile"; "on_desktop"="Desktop Only"; "on_mobile"="Mobile Only"
	 */
    availability: IStringBasedGlideElement<("on_both" | "on_desktop" | "on_mobile")>;
	/**
	 * Billable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    billable: IBooleanGlideElement;
	/**
	 * Category
	 * @type {Isc_categoryGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Reference to Category (IGlideRefElement<Isc_categoryGlideRecord>)
	 */
    category: Isc_categoryGlideElement;
	/**
	 * Cost
	 * @type {INumberGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is decimal
	 */
    cost: INumberGlideElement;
	/**
	 * Cart
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemFields
	 * @description Reference to Macro (IGlideRefElement<Isys_ui_macroGlideRecord>)
	 */
    custom_cart: GlideReferenceElement;
	/**
	 * Execution Plan
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemFields
	 * @description Reference to Execution Plan (IGlideRefElement<Isc_cat_item_delivery_planGlideRecord>)
	 */
    delivery_plan: GlideReferenceElement;
	/**
	 * Delivery plan script
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is "script_plain"
	 */
    delivery_plan_script: GlideElement;
	/**
	 * Delivery time
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is glide_duration
	 */
    delivery_time: IStringGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is translated_html
	 */
    description: IStringGlideElement;
	/**
	 * Entitlement script
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is "script_plain"
	 */
    entitlement_script: GlideElement;
	/**
	 * Fulfillment group
	 * @type {Isys_user_groupGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    group: Isys_user_groupGlideElement;
	/**
	 * Hide on Service Portal
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    hide_sp: IBooleanGlideElement;
	/**
	 * Icon
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is "user_image"
	 */
    icon: GlideElement;
	/**
	 * Ignore price
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    ignore_price: IBooleanGlideElement;
	/**
	 * Image
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is "image"
	 */
    image: GlideElement;
	/**
	 * List Price
	 * @type {INumberGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is currency
	 */
    list_price: INumberGlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Meta
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    meta: IStringGlideElement;
	/**
	 * Hide price (mobile listings)
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    mobile_hide_price: IBooleanGlideElement;
	/**
	 * Mobile Picture
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is "user_image"
	 */
    mobile_picture: GlideElement;
	/**
	 * Mobile Picture Type
	 * @type {IStringBasedGlideElement<("use_desktop_picture" | "use_mobile_picture" | "use_no_picture")>}
	 * @memberof Isc_cat_itemFields
	 * @description "use_desktop_picture"="Desktop"; "use_mobile_picture"="Mobile"; "use_no_picture"="None"
	 */
    mobile_picture_type: IStringBasedGlideElement<("use_desktop_picture" | "use_mobile_picture" | "use_no_picture")>;
	/**
	 * Model
	 * @type {Icmdb_modelGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Reference to Product Model (IGlideRefElement<Icmdb_modelGlideRecord>)
	 */
    model: Icmdb_modelGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is translated_text
	 */
    name: IStringGlideElement;
	/**
	 * No cart
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    no_cart: IBooleanGlideElement;
	/**
	 * No order
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    no_order: IBooleanGlideElement;
	/**
	 * No order now
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    no_order_now: IBooleanGlideElement;
	/**
	 * No proceed checkout
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    no_proceed_checkout: IBooleanGlideElement;
	/**
	 * No quantity
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    no_quantity: IBooleanGlideElement;
	/**
	 * No search
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    no_search: IBooleanGlideElement;
	/**
	 * Omit price in cart
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    omit_price: IBooleanGlideElement;
	/**
	 * Order
	 * @type {INumberGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is integer
	 */
    order: INumberGlideElement;
	/**
	 * Ordered item link
	 * @type {Isc_ordered_item_linkGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Reference to Ordered Item Link (IGlideRefElement<Isc_ordered_item_linkGlideRecord>)
	 */
    ordered_item_link: GlideReferenceElement;
	/**
	 * Picture
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is "user_image"
	 */
    picture: GlideElement;
	/**
	 * Preview link
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is "catalog_preview"
	 */
    preview: GlideElement;
	/**
	 * Price
	 * @type {INumberGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is price
	 */
    price: INumberGlideElement;
	/**
	 * Recurring Price Frequency
	 * @type {IStringBasedGlideElement<("daily" | "weekly" | "weekly2" | "monthly" | "monthly2" | "quarterly" | "semiannual" | "yearly")>}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is choice; "daily"="Daily"; "weekly"="Weekly"; "weekly2"="Every 2 Weeks"; "monthly"="Monthly"; "monthly2"="Every 2 Months"; "quarterly"="Quarterly"; "semiannual"="Semi-Annual"; "yearly"="Annually"
	 */
    recurring_frequency: IStringBasedGlideElement<("daily" | "weekly" | "weekly2" | "monthly" | "monthly2" | "quarterly" | "semiannual" | "yearly")>;
	/**
	 * Recurring price
	 * @type {INumberGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is price
	 */
    recurring_price: INumberGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is "user_roles"
	 */
    roles: GlideElement;
	/**
	 * Catalogs
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is "glide_list"
	 */
    sc_catalogs: GlideElement;
	/**
	 * Created from item design
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemFields
	 * @description Reference to Item (IGlideRefElement<Isc_ic_item_stagingGlideRecord>)
	 */
    sc_ic_item_staging: GlideReferenceElement;
	/**
	 * Published version
	 * @type {INumberGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is integer
	 */
    sc_ic_version: INumberGlideElement;
	/**
	 * Short description
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Internal type is translated_text
	 */
    short_description: IStringGlideElement;
	/**
	 * Expand help for all questions
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    show_variable_help_on_load: IBooleanGlideElement;
	/**
	 * Start closed
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    start_closed: IBooleanGlideElement;
	/**
	 * Template
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemFields
	 * @description Reference to Template (IGlideRefElement<Isys_templateGlideRecord>)
	 */
    template: GlideReferenceElement;
	/**
	 * Type
	 * @type {IStringBasedGlideElement<("item" | "task" | "bundle" | "template" | "package")>}
	 * @memberof Isc_cat_itemFields
	 * @description "item"="Item"; "task"="Task"; "bundle"="Bundle"; "template"="Template"; "package"="Package"
	 */
    type: IStringBasedGlideElement<("item" | "task" | "bundle" | "template" | "package")>;
	/**
	 * Use cart layout
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    use_sc_layout: IBooleanGlideElement;
	/**
	 * Vendor
	 * @type {Icore_companyGlideElement}
	 * @memberof Isc_cat_itemFields
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    vendor: Icore_companyGlideElement;
	/**
	 * Visible on Bundles
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    visible_bundle: IBooleanGlideElement;
	/**
	 * Visible on Guides
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    visible_guide: IBooleanGlideElement;
	/**
	 * Visible elsewhere
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemFields
	 */
    visible_standalone: IBooleanGlideElement;
	/**
	 * Workflow
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemFields
	 * @description Reference to Workflow (IGlideRefElement<Iwf_workflowGlideRecord>)
	 */
    workflow: GlideReferenceElement;
}

/**
 * GlideRecord that contains values from a record in the Catalog Item table.
 * @interface Isc_cat_itemGlideRecord
 * @extends {Isys_metadataGlideRecord}
 */
declare interface Isc_cat_itemGlideRecord extends Isys_metadataGlideRecordBase, Isc_cat_itemFields { }
/**
 * GlideElement that references a GlideRecord from the sc_cat_item table.
 * @interface Isc_cat_itemGlideElement
 * @extends {Isys_metadataGlideElementBase<Isc_cat_itemGlideRecord>}
 */
declare interface Isc_cat_itemGlideElement extends Isys_metadataGlideElementBase<Isc_cat_itemGlideRecord>, Isc_cat_itemFields { }

declare type IRequestState = "requested" | "in_process" | "closed_complete" | "closed_incomplete" | "closed_cancelled" | "closed_rejected" | "closed_skipped";

/**
 * GlideElement values from the Request table.
 * @interface Isc_requestFields
 * @extends {ItaskFields}
 */
declare interface Isc_requestFields extends ItaskFields {
	/**
	 * Resolve Time
	 * @type {INumberGlideElement}
	 * @memberof Isc_requestFields
	 * @description Internal type is integer
	 */
    calendar_stc: INumberGlideElement;
	/**
	 * Delivery address
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestFields
	 */
    delivery_address: IStringGlideElement;
	/**
	 * Price
	 * @type {INumberGlideElement}
	 * @memberof Isc_requestFields
	 * @description Internal type is currency
	 */
    price: INumberGlideElement;
	/**
	 * Requested for date
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestFields
	 * @description Internal type is glide_date
	 */
    requested_date: IStringGlideElement;
	/**
	 * Requested for
	 * @type {Isys_userGlideElement}
	 * @memberof Isc_requestFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    requested_for: Isys_userGlideElement;
	/**
	 * Request state
	 * @type {IRequestState}
	 * @memberof Isc_requestFields
	 * @description "requested"="Pending Approval"; "in_process"="Approved"; "closed_complete"="Closed Complete"; "closed_incomplete"="Closed Incomplete"; "closed_cancelled"="Closed Cancelled"; "closed_rejected"="Closed Rejected"; "closed_skipped"="Closed Skipped"
	 */
    request_state: IRequestState;
	/**
	 * Sourceable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_requestFields
	 */
    sourceable: IBooleanGlideElement;
	/**
	 * Sourced
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_requestFields
	 */
    sourced: IBooleanGlideElement;
	/**
	 * Special instructions
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestFields
	 */
    special_instructions: IStringGlideElement;
	/**
	 * Stage
	 * @type {GlideElement}
	 * @memberof Isc_requestFields
	 * @description Internal type is "workflow"
	 */
    stage: GlideElement;
}
/**
 * GlideRecord that contains values from a record in the Request table.
 * @interface Isc_requestGlideRecord
 * @extends {Isc_requestGlideRecord extends ItaskGlideRecord}
 */
declare interface Isc_requestGlideRecord extends ItaskGlideRecordBase, Isc_requestFields { }
/**
 * GlideElement that references a GlideRecord from the sc_request table.
 * @interface Isc_requestGlideElement
 * @extends {ItaskGlideElementBase<Isc_requestGlideRecord>}
 */
declare interface Isc_requestGlideElement extends ItaskGlideElementBase<Isc_requestGlideRecord>, Isc_requestFields { }
declare type sc_requestGlideRecord = Isc_requestGlideRecord & GlideRecord;
declare type sc_requestGlideElement = Isc_requestGlideElement & GlideElement;

/**
 * GlideElement values from the Requested Item table.
 * @interface Isc_req_itemFields
 * @extends {ItaskFields}
 */
declare interface Isc_req_itemFields extends ItaskFields {
	/**
	 * Backordered
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemFields
	 */
    backordered: IBooleanGlideElement;
	/**
	 * Billable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemFields
	 */
    billable: IBooleanGlideElement;
	/**
	 * Item
	 * @type {Isc_cat_itemGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Reference to Catalog Item (IGlideRefElement<Isc_cat_itemGlideRecord>)
	 */
    cat_item: Isc_cat_itemGlideElement;
	/**
	 * Configuration item
	 * @type {Icmdb_ciGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Reference to Configuration Item (IGlideRefElement<Icmdb_ciGlideRecord>)
	 */
    configuration_item: Icmdb_ciGlideElement;
	/**
	 * Context
	 * @type {GlideReferenceElement}
	 * @memberof Isc_req_itemFields
	 * @description Reference to Workflow context (IGlideRefElement<Iwf_contextGlideRecord>)
	 */
    context: GlideReferenceElement;
	/**
	 * Estimated delivery
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Internal type is glide_date_time
	 */
    estimated_delivery: IStringGlideElement;
	/**
	 * Order Guide
	 * @type {GlideReferenceElement}
	 * @memberof Isc_req_itemFields
	 * @description Reference to Order guide (IGlideRefElement<Isc_cat_item_guideGlideRecord>)
	 */
    order_guide: GlideReferenceElement;
	/**
	 * Price
	 * @type {INumberGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Internal type is currency
	 */
    price: INumberGlideElement;
	/**
	 * Quantity
	 * @type {INumberGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Internal type is integer
	 */
    quantity: INumberGlideElement;
	/**
	 * Quantity Sourced
	 * @type {INumberGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Internal type is integer
	 */
    quantity_sourced: INumberGlideElement;
	/**
	 * Received
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemFields
	 */
    received: IBooleanGlideElement;
	/**
	 * Recurring Price Frequency
	 * @type {GlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Internal type is "choice"
	 */
    recurring_frequency: GlideElement;
	/**
	 * Recurring Price
	 * @type {INumberGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Internal type is price
	 */
    recurring_price: INumberGlideElement;
	/**
	 * Request
	 * @type {Isc_requestGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Reference to Request (IGlideRefElement<Isc_requestGlideRecord>)
	 */
    request: Isc_requestGlideElement;
	/**
	 * Catalog
	 * @type {Isc_catalogGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Reference to Catalog (IGlideRefElement<Isc_catalogGlideRecord>)
	 */
    sc_catalog: Isc_catalogGlideElement;
	/**
	 * Sourced
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemFields
	 */
    sourced: IBooleanGlideElement;
	/**
	 * Stage
	 * @type {GlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Internal type is workflow;
	 */
    stage: GlideElement;
}
/**
 * GlideRecord that contains values from a record in the Requested Item table.
 * @interface Isc_req_itemGlideRecord
 * @extends {Isc_req_itemGlideRecord extends ItaskGlideRecord}
 */
declare interface Isc_req_itemGlideRecord extends ItaskGlideRecordBase, Isc_req_itemFields { }
/**
 * GlideElement that references a GlideRecord from the sc_req_item table.
 * @interface Isc_req_itemGlideElement
 * @extends {ItaskGlideElementBase<Isc_req_itemGlideRecord>}
 */
declare interface Isc_req_itemGlideElement extends ItaskGlideElementBase<Isc_req_itemGlideRecord>, Isc_req_itemFields { }
declare type sc_req_itemGlideRecord = Isc_req_itemGlideRecord & GlideRecord;
declare type sc_req_itemGlideElement = Isc_req_itemGlideElement & GlideElement;

declare interface Isc_req_itemFieldsV<TVariables extends GlideElementVariables> extends ItaskFieldsV<TVariables> {
	/**
	 * Backordered
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemFields
	 */
    backordered: IBooleanGlideElement;
	/**
	 * Billable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemFields
	 */
    billable: IBooleanGlideElement;
	/**
	 * Item
	 * @type {Isc_cat_itemGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Reference to Catalog Item (IGlideRefElement<Isc_cat_itemGlideRecord>)
	 */
    cat_item: Isc_cat_itemGlideElement;
	/**
	 * Configuration item
	 * @type {Icmdb_ciGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Reference to Configuration Item (IGlideRefElement<Icmdb_ciGlideRecord>)
	 */
    configuration_item: Icmdb_ciGlideElement;
	/**
	 * Context
	 * @type {GlideReferenceElement}
	 * @memberof Isc_req_itemFields
	 * @description Reference to Workflow context (IGlideRefElement<Iwf_contextGlideRecord>)
	 */
    context: GlideReferenceElement;
	/**
	 * Estimated delivery
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Internal type is glide_date_time
	 */
    estimated_delivery: IStringGlideElement;
	/**
	 * Order Guide
	 * @type {GlideReferenceElement}
	 * @memberof Isc_req_itemFields
	 * @description Reference to Order guide (IGlideRefElement<Isc_cat_item_guideGlideRecord>)
	 */
    order_guide: GlideReferenceElement;
	/**
	 * Price
	 * @type {INumberGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Internal type is currency
	 */
    price: INumberGlideElement;
	/**
	 * Quantity
	 * @type {INumberGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Internal type is integer
	 */
    quantity: INumberGlideElement;
	/**
	 * Quantity Sourced
	 * @type {INumberGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Internal type is integer
	 */
    quantity_sourced: INumberGlideElement;
	/**
	 * Received
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemFields
	 */
    received: IBooleanGlideElement;
	/**
	 * Recurring Price Frequency
	 * @type {GlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Internal type is "choice"
	 */
    recurring_frequency: GlideElement;
	/**
	 * Recurring Price
	 * @type {INumberGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Internal type is price
	 */
    recurring_price: INumberGlideElement;
	/**
	 * Request
	 * @type {Isc_requestGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Reference to Request (IGlideRefElement<Isc_requestGlideRecord>)
	 */
    request: Isc_requestGlideElement;
	/**
	 * Catalog
	 * @type {Isc_catalogGlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Reference to Catalog (IGlideRefElement<Isc_catalogGlideRecord>)
	 */
    sc_catalog: Isc_catalogGlideElement;
	/**
	 * Sourced
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemFields
	 */
    sourced: IBooleanGlideElement;
	/**
	 * Stage
	 * @type {GlideElement}
	 * @memberof Isc_req_itemFields
	 * @description Internal type is workflow;
	 */
    stage: GlideElement;
}
declare interface Isc_req_itemGlideRecordV<TVariables extends GlideElementVariables> extends ItaskGlideRecordBaseV<TVariables>, Isc_req_itemFieldsV<TVariables> { }
declare interface Isc_req_itemGlideElementV<TVariables extends GlideElementVariables> extends ItaskGlideElementBaseV<TVariables, Isc_req_itemGlideRecordV<TVariables>>, Isc_req_itemFieldsV<TVariables> { }
declare type sc_req_itemGlideRecordV<TVariables extends GlideElementVariables> = Isc_req_itemGlideRecordV<TVariables> & GlideRecord;
declare type sc_req_itemGlideElementV<TVariables extends GlideElementVariables> = Isc_req_itemGlideElementV<TVariables> & GlideElement;

/**
 * GlideElement values from the Catalog Task table.
 * @interface Isc_taskFields
 * @extends {ItaskFields}
 */
declare interface Isc_taskFields extends ItaskFields {
	/**
	 * Resolve Time
	 * @type {INumberGlideElement}
	 * @memberof Isc_taskFields
	 * @description Internal type is integer
	 */
    calendar_stc: INumberGlideElement;
	/**
	 * Request
	 * @type {Isc_requestGlideElement}
	 * @memberof Isc_taskFields
	 * @description Reference to Request (IGlideRefElement<Isc_requestGlideRecord>)
	 */
    request: Isc_requestGlideElement;
	/**
	 * Request item
	 * @type {Isc_req_itemGlideElement}
	 * @memberof Isc_taskFields
	 * @description Reference to Requested Item (IGlideRefElement<Isc_req_itemGlideRecord>)
	 */
    request_item: Isc_req_itemGlideElement;
	/**
	 * Catalog
	 * @type {Isc_catalogGlideElement}
	 * @memberof Isc_taskFields
	 * @description Reference to Catalog (IGlideRefElement<Isc_catalogGlideRecord>)
	 */
    sc_catalog: Isc_catalogGlideElement;
}
declare interface Isc_taskGlideRecord extends ItaskGlideRecordBase, Isc_taskFields { }
declare interface Isc_taskGlideElement extends ItaskGlideElementBase<Isc_taskGlideRecord>, Isc_taskFields { }
declare type sc_taskGlideRecord = Isc_taskGlideRecord & GlideRecord;
declare type sc_taskGlideElement = Isc_taskGlideRecord & GlideElement;
/**
 * GlideElement values from the Service Offering table.
 * @interface Iservice_offeringFields
 * @extends {Icmdb_ci_serviceFields}
 */
declare interface Iservice_offeringFields extends Icmdb_ci_serviceFields {
	/**
	 * Billing
	 * @type {IStringBasedGlideElement<("monthly" | "weekly" | "yearly")>}
	 * @memberof Iservice_offeringFields
	 * @description "monthly"="Monthly"; "weekly"="Weekly"; "yearly"="Yearly"
	 */
    billing: IStringBasedGlideElement<("monthly" | "weekly" | "yearly")>;
	/**
	 * Contract
	 * @type {GlideReferenceElement}
	 * @memberof Iservice_offeringFields
	 * @description Reference to Contract (IGlideRefElement<Iast_contractGlideRecord>)
	 */
    contract: GlideReferenceElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Iservice_offeringFields
	 */
    description: IStringGlideElement;
	/**
	 * Price
	 * @type {INumberGlideElement}
	 * @memberof Iservice_offeringFields
	 * @description Internal type is price
	 */
    price: INumberGlideElement;
	/**
	 * Service level requirement
	 * @type {IStringGlideElement}
	 * @memberof Iservice_offeringFields
	 * @description Internal type is "translated_html"
	 */
    service_level_requirement: IStringGlideElement;
	/**
	 * Technical contact
	 * @type {Isys_userGlideElement}
	 * @memberof Iservice_offeringFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    technical_contact: Isys_userGlideElement;
}
declare interface Iservice_offeringGlideRecord extends Icmdb_ci_serviceGlideRecord, Iservice_offeringFields { }
declare interface Iservice_offeringGlideElement extends Icmdb_ci_serviceGlideElementBase<Iservice_offeringGlideRecord>, Iservice_offeringFields { }
