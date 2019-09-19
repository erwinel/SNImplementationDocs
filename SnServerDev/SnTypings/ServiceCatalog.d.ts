
/**
 * GlideElement that references a GlideRecord from the sc_category table.
 * @interface Isc_categoryGlideElement
 * @extends {Isys_metadataGlideElementBase<Isc_categoryGlideRecord>}
 */
declare interface Isc_categoryGlideElement extends Isys_metadataGlideElementBase<Isc_categoryGlideRecord> {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_categoryGlideElement
	 */
    active: IBooleanGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "translated_text"
	 */
    description: IStringGlideElement;
	/**
	 * Entitlement script
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "script_plain"
	 */
    entitlement_script: GlideElement;
	/**
	 * Header icon
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "user_image"
	 */
    header_icon: GlideElement;
	/**
	 * Homepage image
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "user_image"
	 */
    homepage_image: GlideElement;
	/**
	 * Homepage renderer
	 * @type {GlideReferenceElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Reference to Homepage Category Renderer (IGlideRefElement<Isc_homepage_rendererGlideRecord>)
	 */
    homepage_renderer: GlideReferenceElement;
	/**
	 * Icon
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "user_image"
	 */
    icon: GlideElement;
	/**
	 * Image
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "image"
	 */
    image: GlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Hide description (mobile browsing)
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_categoryGlideElement
	 */
    mobile_hide_description: IBooleanGlideElement;
	/**
	 * Mobile Picture
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "user_image"
	 */
    mobile_picture: GlideElement;
	/**
	 * Mobile Subcategory Render Type
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideElement
	 */
    mobile_subcategory_render_type: IStringGlideElement;
	/**
	 * Module link
	 * @type {GlideReferenceElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Reference to Module (IGlideRefElement<Isys_app_moduleGlideRecord>)
	 */
    module: GlideReferenceElement;
	/**
	 * Order
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "integer"
	 */
    order: IStringGlideElement;
	/**
	 * Parent
	 * @type {Isc_categoryGlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Reference to Category (IGlideRefElement<Isc_categoryGlideRecord>)
	 */
    parent: Isc_categoryGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "user_roles"
	 */
    roles: GlideElement;
	/**
	 * Catalog
	 * @type {Isc_catalogGlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Reference to Catalog (IGlideRefElement<Isc_catalogGlideRecord>)
	 */
    sc_catalog: Isc_catalogGlideElement;
	/**
	 * Show in CMS
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_categoryGlideElement
	 */
    show_in_cms: IBooleanGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_categoryGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Title
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "translated_text"
	 */
    title: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Category table.
 * @interface Isc_categoryGlideRecord
 * @extends {Isys_metadataGlideRecord}
 */
declare interface Isc_categoryGlideRecord extends Isys_metadataGlideRecordBase {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 */
    active: IBooleanGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "translated_text"
	 */
    description: IStringGlideElement;
	/**
	 * Entitlement script
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "script_plain"
	 */
    entitlement_script: GlideElement;
	/**
	 * Header icon
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "user_image"
	 */
    header_icon: GlideElement;
	/**
	 * Homepage image
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "user_image"
	 */
    homepage_image: GlideElement;
	/**
	 * Homepage renderer
	 * @type {GlideReferenceElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Reference to Homepage Category Renderer (IGlideRefElement<Isc_homepage_rendererGlideRecord>)
	 */
    homepage_renderer: GlideReferenceElement;
	/**
	 * Icon
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "user_image"
	 */
    icon: GlideElement;
	/**
	 * Image
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "image"
	 */
    image: GlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Hide description (mobile browsing)
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 */
    mobile_hide_description: IBooleanGlideElement;
	/**
	 * Mobile Picture
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "user_image"
	 */
    mobile_picture: GlideElement;
	/**
	 * Mobile Subcategory Render Type
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 */
    mobile_subcategory_render_type: IStringGlideElement;
	/**
	 * Module link
	 * @type {GlideReferenceElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Reference to Module (IGlideRefElement<Isys_app_moduleGlideRecord>)
	 */
    module: GlideReferenceElement;
	/**
	 * Order
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "integer"
	 */
    order: IStringGlideElement;
	/**
	 * Parent
	 * @type {Isc_categoryGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Reference to Category (IGlideRefElement<Isc_categoryGlideRecord>)
	 */
    parent: Isc_categoryGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "user_roles"
	 */
    roles: GlideElement;
	/**
	 * Catalog
	 * @type {Isc_catalogGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Reference to Catalog (IGlideRefElement<Isc_catalogGlideRecord>)
	 */
    sc_catalog: Isc_catalogGlideElement;
	/**
	 * Show in CMS
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 */
    show_in_cms: IBooleanGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Title
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "translated_text"
	 */
    title: IStringGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the sc_catalog table.
 * @interface Isc_catalogGlideElement
 * @extends {Isys_metadataGlideElementBase<Isc_catalogGlideRecord>}
 */
declare interface Isc_catalogGlideElement extends Isys_metadataGlideElementBase<Isc_catalogGlideRecord> {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_catalogGlideElement
	 */
    active: IBooleanGlideElement;
	/**
	 * Background Color
	 * @type {GlideElement}
	 * @memberof Isc_catalogGlideElement
	 * @description Internal type is "color"
	 */
    background_color: GlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideElement
	 * @description Internal type is "translated_text"
	 */
    description: IStringGlideElement;
	/**
	 * 'Continue Shopping' page
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideElement
	 */
    desktop_continue_shopping: IStringGlideElement;
	/**
	 * 'Catalog Home' Page
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideElement
	 */
    desktop_home_page: IStringGlideElement;
	/**
	 * Desktop image
	 * @type {GlideElement}
	 * @memberof Isc_catalogGlideElement
	 * @description Internal type is "user_image"
	 */
    desktop_image: GlideElement;
	/**
	 * Editors
	 * @type {GlideElement}
	 * @memberof Isc_catalogGlideElement
	 * @description Internal type is "glide_list"
	 */
    editors: GlideElement;
	/**
	 * Enable Wish List
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_catalogGlideElement
	 */
    enable_wish_list: IBooleanGlideElement;
	/**
	 * Manager
	 * @type {Isys_userGlideElement}
	 * @memberof Isc_catalogGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    manager: Isys_userGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_catalogGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Title
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideElement
	 * @description Internal type is "translated_field"
	 */
    title: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Catalog table.
 * @interface Isc_catalogGlideRecord
 * @extends {Isys_metadataGlideRecord}
 */
declare interface Isc_catalogGlideRecord extends Isys_metadataGlideRecordBase {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 */
    active: IBooleanGlideElement;
	/**
	 * Background Color
	 * @type {GlideElement}
	 * @memberof Isc_catalogGlideRecord
	 * @description Internal type is "color"
	 */
    background_color: GlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 * @description Internal type is "translated_text"
	 */
    description: IStringGlideElement;
	/**
	 * 'Continue Shopping' page
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 */
    desktop_continue_shopping: IStringGlideElement;
	/**
	 * 'Catalog Home' Page
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 */
    desktop_home_page: IStringGlideElement;
	/**
	 * Desktop image
	 * @type {GlideElement}
	 * @memberof Isc_catalogGlideRecord
	 * @description Internal type is "user_image"
	 */
    desktop_image: GlideElement;
	/**
	 * Editors
	 * @type {GlideElement}
	 * @memberof Isc_catalogGlideRecord
	 * @description Internal type is "glide_list"
	 */
    editors: GlideElement;
	/**
	 * Enable Wish List
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 */
    enable_wish_list: IBooleanGlideElement;
	/**
	 * Manager
	 * @type {Isys_userGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    manager: Isys_userGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Title
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 * @description Internal type is "translated_field"
	 */
    title: IStringGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the sc_cat_item table.
 * @interface Isc_cat_itemGlideElement
 * @extends {Isys_metadataGlideElementBase<Isc_cat_itemGlideRecord>}
 */
declare interface Isc_cat_itemGlideElement extends Isys_metadataGlideElementBase<Isc_cat_itemGlideRecord> {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    active: IBooleanGlideElement;
	/**
	 * Availability
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    availability: IStringGlideElement;
	/**
	 * Billable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    billable: IBooleanGlideElement;
	/**
	 * Category
	 * @type {Isc_categoryGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Category (IGlideRefElement<Isc_categoryGlideRecord>)
	 */
    category: Isc_categoryGlideElement;
	/**
	 * Cost
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "decimal"
	 */
    cost: IStringGlideElement;
	/**
	 * Cart
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Macro (IGlideRefElement<Isys_ui_macroGlideRecord>)
	 */
    custom_cart: GlideReferenceElement;
	/**
	 * Execution Plan
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Execution Plan (IGlideRefElement<Isc_cat_item_delivery_planGlideRecord>)
	 */
    delivery_plan: GlideReferenceElement;
	/**
	 * Delivery plan script
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "script_plain"
	 */
    delivery_plan_script: GlideElement;
	/**
	 * Delivery time
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "glide_duration"
	 */
    delivery_time: IStringGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "translated_html"
	 */
    description: IStringGlideElement;
	/**
	 * Entitlement script
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "script_plain"
	 */
    entitlement_script: GlideElement;
	/**
	 * Fulfillment group
	 * @type {Isys_user_groupGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    group: Isys_user_groupGlideElement;
	/**
	 * Hide on Service Portal
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    hide_sp: IBooleanGlideElement;
	/**
	 * Icon
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "user_image"
	 */
    icon: GlideElement;
	/**
	 * Ignore price
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    ignore_price: IBooleanGlideElement;
	/**
	 * Image
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "image"
	 */
    image: GlideElement;
	/**
	 * List Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "currency"
	 */
    list_price: IStringGlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Meta
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    meta: IStringGlideElement;
	/**
	 * Hide price (mobile listings)
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    mobile_hide_price: IBooleanGlideElement;
	/**
	 * Mobile Picture
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "user_image"
	 */
    mobile_picture: GlideElement;
	/**
	 * Mobile Picture Type
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    mobile_picture_type: IStringGlideElement;
	/**
	 * Model
	 * @type {Icmdb_modelGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Product Model (IGlideRefElement<Icmdb_modelGlideRecord>)
	 */
    model: Icmdb_modelGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "translated_text"
	 */
    name: IStringGlideElement;
	/**
	 * No cart
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    no_cart: IBooleanGlideElement;
	/**
	 * No order
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    no_order: IBooleanGlideElement;
	/**
	 * No order now
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    no_order_now: IBooleanGlideElement;
	/**
	 * No proceed checkout
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    no_proceed_checkout: IBooleanGlideElement;
	/**
	 * No quantity
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    no_quantity: IBooleanGlideElement;
	/**
	 * No search
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    no_search: IBooleanGlideElement;
	/**
	 * Omit price in cart
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    omit_price: IBooleanGlideElement;
	/**
	 * Order
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "integer"
	 */
    order: IStringGlideElement;
	/**
	 * Ordered item link
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Ordered Item Link (IGlideRefElement<Isc_ordered_item_linkGlideRecord>)
	 */
    ordered_item_link: GlideReferenceElement;
	/**
	 * Picture
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "user_image"
	 */
    picture: GlideElement;
	/**
	 * Preview link
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "catalog_preview"
	 */
    preview: GlideElement;
	/**
	 * Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "price"
	 */
    price: IStringGlideElement;
	/**
	 * Recurring Price Frequency
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "choice"
	 */
    recurring_frequency: GlideElement;
	/**
	 * Recurring price
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "price"
	 */
    recurring_price: IStringGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "user_roles"
	 */
    roles: GlideElement;
	/**
	 * Catalogs
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "glide_list"
	 */
    sc_catalogs: GlideElement;
	/**
	 * Created from item design
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Item (IGlideRefElement<Isc_ic_item_stagingGlideRecord>)
	 */
    sc_ic_item_staging: GlideReferenceElement;
	/**
	 * Published version
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "integer"
	 */
    sc_ic_version: IStringGlideElement;
	/**
	 * Short description
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "translated_text"
	 */
    short_description: IStringGlideElement;
	/**
	 * Expand help for all questions
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    show_variable_help_on_load: IBooleanGlideElement;
	/**
	 * Start closed
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    start_closed: IBooleanGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Template
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Template (IGlideRefElement<Isys_templateGlideRecord>)
	 */
    template: GlideReferenceElement;
	/**
	 * Type
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    type: IStringGlideElement;
	/**
	 * Use cart layout
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    use_sc_layout: IBooleanGlideElement;
	/**
	 * Vendor
	 * @type {Icore_companyGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    vendor: Icore_companyGlideElement;
	/**
	 * Visible on Bundles
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    visible_bundle: IBooleanGlideElement;
	/**
	 * Visible on Guides
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    visible_guide: IBooleanGlideElement;
	/**
	 * Visible elsewhere
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    visible_standalone: IBooleanGlideElement;
	/**
	 * Workflow
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Workflow (IGlideRefElement<Iwf_workflowGlideRecord>)
	 */
    workflow: GlideReferenceElement;
}

/**
 * GlideRecord that contains values from a record in the Catalog Item table.
 * @interface Isc_cat_itemGlideRecord
 * @extends {Isys_metadataGlideRecord}
 */
declare interface Isc_cat_itemGlideRecord extends Isys_metadataGlideRecordBase {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    active: IBooleanGlideElement;
	/**
	 * Availability
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    availability: IStringGlideElement;
	/**
	 * Billable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    billable: IBooleanGlideElement;
	/**
	 * Category
	 * @type {Isc_categoryGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Category (IGlideRefElement<Isc_categoryGlideRecord>)
	 */
    category: Isc_categoryGlideElement;
	/**
	 * Cost
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "decimal"
	 */
    cost: IStringGlideElement;
	/**
	 * Cart
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Macro (IGlideRefElement<Isys_ui_macroGlideRecord>)
	 */
    custom_cart: GlideReferenceElement;
	/**
	 * Execution Plan
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Execution Plan (IGlideRefElement<Isc_cat_item_delivery_planGlideRecord>)
	 */
    delivery_plan: GlideReferenceElement;
	/**
	 * Delivery plan script
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "script_plain"
	 */
    delivery_plan_script: GlideElement;
	/**
	 * Delivery time
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "glide_duration"
	 */
    delivery_time: IStringGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "translated_html"
	 */
    description: IStringGlideElement;
	/**
	 * Entitlement script
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "script_plain"
	 */
    entitlement_script: GlideElement;
	/**
	 * Fulfillment group
	 * @type {Isys_user_groupGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    group: Isys_user_groupGlideElement;
	/**
	 * Hide on Service Portal
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    hide_sp: IBooleanGlideElement;
	/**
	 * Icon
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "user_image"
	 */
    icon: GlideElement;
	/**
	 * Ignore price
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    ignore_price: IBooleanGlideElement;
	/**
	 * Image
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "image"
	 */
    image: GlideElement;
	/**
	 * List Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "currency"
	 */
    list_price: IStringGlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Meta
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    meta: IStringGlideElement;
	/**
	 * Hide price (mobile listings)
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    mobile_hide_price: IBooleanGlideElement;
	/**
	 * Mobile Picture
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "user_image"
	 */
    mobile_picture: GlideElement;
	/**
	 * Mobile Picture Type
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    mobile_picture_type: IStringGlideElement;
	/**
	 * Model
	 * @type {Icmdb_modelGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Product Model (IGlideRefElement<Icmdb_modelGlideRecord>)
	 */
    model: Icmdb_modelGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "translated_text"
	 */
    name: IStringGlideElement;
	/**
	 * No cart
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    no_cart: IBooleanGlideElement;
	/**
	 * No order
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    no_order: IBooleanGlideElement;
	/**
	 * No order now
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    no_order_now: IBooleanGlideElement;
	/**
	 * No proceed checkout
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    no_proceed_checkout: IBooleanGlideElement;
	/**
	 * No quantity
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    no_quantity: IBooleanGlideElement;
	/**
	 * No search
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    no_search: IBooleanGlideElement;
	/**
	 * Omit price in cart
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    omit_price: IBooleanGlideElement;
	/**
	 * Order
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "integer"
	 */
    order: IStringGlideElement;
	/**
	 * Ordered item link
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Ordered Item Link (IGlideRefElement<Isc_ordered_item_linkGlideRecord>)
	 */
    ordered_item_link: GlideReferenceElement;
	/**
	 * Picture
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "user_image"
	 */
    picture: GlideElement;
	/**
	 * Preview link
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "catalog_preview"
	 */
    preview: GlideElement;
	/**
	 * Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "price"
	 */
    price: IStringGlideElement;
	/**
	 * Recurring Price Frequency
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "choice"
	 */
    recurring_frequency: GlideElement;
	/**
	 * Recurring price
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "price"
	 */
    recurring_price: IStringGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "user_roles"
	 */
    roles: GlideElement;
	/**
	 * Catalogs
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "glide_list"
	 */
    sc_catalogs: GlideElement;
	/**
	 * Created from item design
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Item (IGlideRefElement<Isc_ic_item_stagingGlideRecord>)
	 */
    sc_ic_item_staging: GlideReferenceElement;
	/**
	 * Published version
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "integer"
	 */
    sc_ic_version: IStringGlideElement;
	/**
	 * Short description
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "translated_text"
	 */
    short_description: IStringGlideElement;
	/**
	 * Expand help for all questions
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    show_variable_help_on_load: IBooleanGlideElement;
	/**
	 * Start closed
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    start_closed: IBooleanGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Template
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Template (IGlideRefElement<Isys_templateGlideRecord>)
	 */
    template: GlideReferenceElement;
	/**
	 * Type
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    type: IStringGlideElement;
	/**
	 * Use cart layout
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    use_sc_layout: IBooleanGlideElement;
	/**
	 * Vendor
	 * @type {Icore_companyGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    vendor: Icore_companyGlideElement;
	/**
	 * Visible on Bundles
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    visible_bundle: IBooleanGlideElement;
	/**
	 * Visible on Guides
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    visible_guide: IBooleanGlideElement;
	/**
	 * Visible elsewhere
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    visible_standalone: IBooleanGlideElement;
	/**
	 * Workflow
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Workflow (IGlideRefElement<Iwf_workflowGlideRecord>)
	 */
    workflow: GlideReferenceElement;
}

/**
 * GlideElement that references a GlideRecord from the sc_request table.
 * @interface Isc_requestGlideElement
 * @extends {ItaskGlideElementBase<Isc_requestGlideRecord>}
 */
declare interface Isc_requestGlideElement extends ItaskGlideElementBase<Isc_requestGlideRecord> {
	/**
	 * Resolve Time
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideElement
	 * @description Internal type is "integer"
	 */
    calendar_stc: IStringGlideElement;
	/**
	 * Delivery address
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideElement
	 */
    delivery_address: IStringGlideElement;
	/**
	 * Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideElement
	 * @description Internal type is "currency"
	 */
    price: IStringGlideElement;
	/**
	 * Requested for date
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideElement
	 * @description Internal type is "glide_date"
	 */
    requested_date: IStringGlideElement;
	/**
	 * Requested for
	 * @type {Isys_userGlideElement}
	 * @memberof Isc_requestGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    requested_for: Isys_userGlideElement;
	/**
	 * Request state
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideElement
	 */
    request_state: IStringGlideElement;
	/**
	 * Sourceable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_requestGlideElement
	 */
    sourceable: IBooleanGlideElement;
	/**
	 * Sourced
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_requestGlideElement
	 */
    sourced: IBooleanGlideElement;
	/**
	 * Special instructions
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideElement
	 */
    special_instructions: IStringGlideElement;
	/**
	 * Stage
	 * @type {GlideElement}
	 * @memberof Isc_requestGlideElement
	 * @description Internal type is "workflow"
	 */
    stage: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_requestGlideElement
	 */
    sys_id: IGUIDGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Request table.
 * @interface Isc_requestGlideRecord
 * @extends {Isc_requestGlideRecord extends ItaskGlideRecord}
 */
declare interface Isc_requestGlideRecord extends ItaskGlideRecordBase {
	/**
	 * Resolve Time
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideRecord
	 * @description Internal type is "integer"
	 */
    calendar_stc: IStringGlideElement;
	/**
	 * Delivery address
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideRecord
	 */
    delivery_address: IStringGlideElement;
	/**
	 * Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideRecord
	 * @description Internal type is "currency"
	 */
    price: IStringGlideElement;
	/**
	 * Requested for date
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideRecord
	 * @description Internal type is "glide_date"
	 */
    requested_date: IStringGlideElement;
	/**
	 * Requested for
	 * @type {Isys_userGlideElement}
	 * @memberof Isc_requestGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    requested_for: Isys_userGlideElement;
	/**
	 * Request state
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideRecord
	 */
    request_state: IStringGlideElement;
	/**
	 * Sourceable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_requestGlideRecord
	 */
    sourceable: IBooleanGlideElement;
	/**
	 * Sourced
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_requestGlideRecord
	 */
    sourced: IBooleanGlideElement;
	/**
	 * Special instructions
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideRecord
	 */
    special_instructions: IStringGlideElement;
	/**
	 * Stage
	 * @type {GlideElement}
	 * @memberof Isc_requestGlideRecord
	 * @description Internal type is "workflow"
	 */
    stage: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_requestGlideRecord
	 */
    sys_id: IGUIDGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the sc_req_item table.
 * @interface Isc_req_itemGlideElement
 * @extends {ItaskGlideElementBase<Isc_req_itemGlideRecord>}
 */
declare interface Isc_req_itemGlideElement extends ItaskGlideElementBase<Isc_req_itemGlideRecord> {
	/**
	 * Backordered
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 */
    backordered: IBooleanGlideElement;
	/**
	 * Billable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 */
    billable: IBooleanGlideElement;
	/**
	 * Item
	 * @type {Isc_cat_itemGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Reference to Catalog Item (IGlideRefElement<Isc_cat_itemGlideRecord>)
	 */
    cat_item: Isc_cat_itemGlideElement;
	/**
	 * Configuration item
	 * @type {Icmdb_ciGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Reference to Configuration Item (IGlideRefElement<Icmdb_ciGlideRecord>)
	 */
    configuration_item: Icmdb_ciGlideElement;
	/**
	 * Context
	 * @type {GlideReferenceElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Reference to Workflow context (IGlideRefElement<Iwf_contextGlideRecord>)
	 */
    context: GlideReferenceElement;
	/**
	 * Estimated delivery
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    estimated_delivery: IStringGlideElement;
	/**
	 * Order Guide
	 * @type {GlideReferenceElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Reference to Order guide (IGlideRefElement<Isc_cat_item_guideGlideRecord>)
	 */
    order_guide: GlideReferenceElement;
	/**
	 * Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Internal type is "currency"
	 */
    price: IStringGlideElement;
	/**
	 * Quantity
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Internal type is "integer"
	 */
    quantity: IStringGlideElement;
	/**
	 * Quantity Sourced
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Internal type is "integer"
	 */
    quantity_sourced: IStringGlideElement;
	/**
	 * Received
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 */
    received: IBooleanGlideElement;
	/**
	 * Recurring Price Frequency
	 * @type {GlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Internal type is "choice"
	 */
    recurring_frequency: GlideElement;
	/**
	 * Recurring Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Internal type is "price"
	 */
    recurring_price: IStringGlideElement;
	/**
	 * Request
	 * @type {Isc_requestGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Reference to Request (IGlideRefElement<Isc_requestGlideRecord>)
	 */
    request: Isc_requestGlideElement;
	/**
	 * Catalog
	 * @type {Isc_catalogGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Reference to Catalog (IGlideRefElement<Isc_catalogGlideRecord>)
	 */
    sc_catalog: Isc_catalogGlideElement;
	/**
	 * Sourced
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 */
    sourced: IBooleanGlideElement;
	/**
	 * Stage
	 * @type {GlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Internal type is "workflow"
	 */
    stage: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 */
    sys_id: IGUIDGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Requested Item table.
 * @interface Isc_req_itemGlideRecord
 * @extends {Isc_req_itemGlideRecord extends ItaskGlideRecord}
 */
declare interface Isc_req_itemGlideRecord extends ItaskGlideRecordBase {
	/**
	 * Backordered
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 */
    backordered: IBooleanGlideElement;
	/**
	 * Billable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 */
    billable: IBooleanGlideElement;
	/**
	 * Item
	 * @type {Isc_cat_itemGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Reference to Catalog Item (IGlideRefElement<Isc_cat_itemGlideRecord>)
	 */
    cat_item: Isc_cat_itemGlideElement;
	/**
	 * Configuration item
	 * @type {Icmdb_ciGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Reference to Configuration Item (IGlideRefElement<Icmdb_ciGlideRecord>)
	 */
    configuration_item: Icmdb_ciGlideElement;
	/**
	 * Context
	 * @type {GlideReferenceElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Reference to Workflow context (IGlideRefElement<Iwf_contextGlideRecord>)
	 */
    context: GlideReferenceElement;
	/**
	 * Estimated delivery
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    estimated_delivery: IStringGlideElement;
	/**
	 * Order Guide
	 * @type {GlideReferenceElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Reference to Order guide (IGlideRefElement<Isc_cat_item_guideGlideRecord>)
	 */
    order_guide: GlideReferenceElement;
	/**
	 * Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Internal type is "currency"
	 */
    price: IStringGlideElement;
	/**
	 * Quantity
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Internal type is "integer"
	 */
    quantity: IStringGlideElement;
	/**
	 * Quantity Sourced
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Internal type is "integer"
	 */
    quantity_sourced: IStringGlideElement;
	/**
	 * Received
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 */
    received: IBooleanGlideElement;
	/**
	 * Recurring Price Frequency
	 * @type {GlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Internal type is "choice"
	 */
    recurring_frequency: GlideElement;
	/**
	 * Recurring Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Internal type is "price"
	 */
    recurring_price: IStringGlideElement;
	/**
	 * Request
	 * @type {Isc_requestGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Reference to Request (IGlideRefElement<Isc_requestGlideRecord>)
	 */
    request: Isc_requestGlideElement;
	/**
	 * Catalog
	 * @type {Isc_catalogGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Reference to Catalog (IGlideRefElement<Isc_catalogGlideRecord>)
	 */
    sc_catalog: Isc_catalogGlideElement;
	/**
	 * Sourced
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 */
    sourced: IBooleanGlideElement;
	/**
	 * Stage
	 * @type {GlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Internal type is "workflow"
	 */
    stage: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 */
    sys_id: IGUIDGlideElement;
}

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
