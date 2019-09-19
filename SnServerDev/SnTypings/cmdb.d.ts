/**
 * GlideElement values from the Model Category table.
 * @interface Icmdb_model_categoryFields
 */
declare interface Icmdb_model_categoryFields {
	/**
	 * Allow as master
	 * @type {IBooleanGlideElement}
	 * @memberof Icmdb_model_categoryFields
	 */
    allow_as_master: IBooleanGlideElement;
	/**
	 * Allow in bundle
	 * @type {IBooleanGlideElement}
	 * @memberof Icmdb_model_categoryFields
	 */
    allow_in_bundle: IBooleanGlideElement;
	/**
	 * Allow pre-allocation
	 * @type {IBooleanGlideElement}
	 * @memberof Icmdb_model_categoryFields
	 */
    allow_pre_allocation: IBooleanGlideElement;
	/**
	 * Asset class
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_model_categoryFields
	 * @description Internal type is table_name
	 */
    asset_class: IStringGlideElement;
	/**
	 * Bundle
	 * @type {IBooleanGlideElement}
	 * @memberof Icmdb_model_categoryFields
	 */
    bundle: IBooleanGlideElement;
	/**
	 * CI class
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_model_categoryFields
	 * @description Internal type is table_name
	 */
    cmdb_ci_class: IStringGlideElement;
	/**
	 * Enforce CI verification
	 * @type {IBooleanGlideElement}
	 * @memberof Icmdb_model_categoryFields
	 */
    enforce_verification: IBooleanGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_model_categoryFields
	 */
    name: IStringGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_model_categoryFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_model_categoryFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmdb_model_categoryFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Icmdb_model_categoryFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_model_categoryFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_model_categoryFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
}
declare interface Icmdb_model_categoryGlideRecord extends IGlideRecord, Icmdb_model_categoryFields { }
declare interface Icmdb_model_categoryGlideElement extends IGlideRefElement<Icmdb_model_categoryGlideRecord>, Icmdb_model_categoryFields { }

/**
 * GlideElement values from the Model Component table.
 * @interface Icmdb_m2m_model_componentFields
 */
declare interface Icmdb_m2m_model_componentFields {
	/**
	 * Component
	 * @type {Icmdb_modelGlideElement}
	 * @memberof Icmdb_m2m_model_componentFields
	 * @description Reference to Product Model (IGlideRefElement<Icmdb_modelGlideRecord>)
	 */
    child: Icmdb_modelGlideElement;
	/**
	 * Is main component
	 * @type {IBooleanGlideElement}
	 * @memberof Icmdb_m2m_model_componentFields
	 */
    master: IBooleanGlideElement;
	/**
	 * Model category of component
	 * @type {Icmdb_model_categoryGlideElement}
	 * @memberof Icmdb_m2m_model_componentFields
	 * @description Reference to Model Category (IGlideRefElement<Icmdb_model_categoryGlideRecord>)
	 */
    model_category: Icmdb_model_categoryGlideElement;
	/**
	 * Bundle
	 * @type {Icmdb_modelGlideElement}
	 * @memberof Icmdb_m2m_model_componentFields
	 * @description Reference to Product Model (IGlideRefElement<Icmdb_modelGlideRecord>)
	 */
    parent: Icmdb_modelGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_m2m_model_componentFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_m2m_model_componentFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmdb_m2m_model_componentFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Icmdb_m2m_model_componentFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_m2m_model_componentFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_m2m_model_componentFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
}
declare interface Icmdb_m2m_model_componentGlideRecord extends IGlideRecord, Icmdb_m2m_model_componentFields { }
declare interface Icmdb_m2m_model_componentGlideElement extends IGlideRefElement<Icmdb_m2m_model_componentGlideRecord>, Icmdb_m2m_model_componentFields { }

/**
 * GlideElement values from the Product Model table.
 * @interface Icmdb_modelFields
 */
declare interface Icmdb_modelFields {
	/**
	 * Acquisition method
	 * @type {IStringBasedGlideElement<("Both" | "Buy" | "Lease")>}
	 * @memberof Icmdb_modelFields
	 */
    acquisition_method: IStringBasedGlideElement<("Both" | "Buy" | "Lease")>;
	/**
	 * Asset tracking strategy
	 * @type {IStringBasedGlideElement<("leave_to_category" | "track_as_consumable" | "do_not_track")>}
	 * @memberof Icmdb_modelFields
	 * @description "leave_to_category"="Leave to category"; "track_as_consumable"="Create consumable asset"; "do_not_track"="Don't create assets"
	 */
    asset_tracking_strategy: IStringBasedGlideElement<("leave_to_category" | "track_as_consumable" | "do_not_track")>;
	/**
	 * Barcode
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_modelFields
	 */
    barcode: IStringGlideElement;
	/**
	 * Bundle
	 * @type {IBooleanGlideElement}
	 * @memberof Icmdb_modelFields
	 */
    bundle: IBooleanGlideElement;
	/**
	 * Certified
	 * @type {IBooleanGlideElement}
	 * @memberof Icmdb_modelFields
	 */
    certified: IBooleanGlideElement;
	/**
	 * CMDB CI class
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_modelFields
	 */
    cmdb_ci_class: IStringGlideElement;
	/**
	 * Model categories
	 * @type {GlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Internal type is "glide_list"
	 */
    cmdb_model_category: GlideElement;
	/**
	 * Comments
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_modelFields
	 */
    comments: IStringGlideElement;
	/**
	 * Cost
	 * @type {INumberGlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Internal type is price
	 */
    cost: INumberGlideElement;
	/**
	 * Depreciation
	 * @type {GlideReferenceElement}
	 * @memberof Icmdb_modelFields
	 * @description Reference to Depreciation (IGlideRefElement<Icmdb_depreciationGlideRecord>)
	 */
    depreciation: GlideReferenceElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Internal type is "translated_html"
	 */
    description: IStringGlideElement;
	/**
	 * Display name
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_modelFields
	 */
    display_name: IStringGlideElement;
	/**
	 * Expenditure type
	 * @type {IStringBasedGlideElement<("capex" | "opex")>}
	 * @memberof Icmdb_modelFields
	 * @description "capex"="Capex"; "opex"="Opex"
	 */
    expenditure_type: IStringBasedGlideElement<("capex" | "opex")>;
	/**
	 * Flow Rate (cfm)
	 * @type {INumberGlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Internal type is integer
	 */
    flow_rate: INumberGlideElement;
	/**
	 * Full name
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_modelFields
	 */
    full_name: IStringGlideElement;
	/**
	 * Main component
	 * @type {Icmdb_m2m_model_componentGlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Reference to Model Component (IGlideRefElement<Icmdb_m2m_model_componentGlideRecord>)
	 */
    main_component: Icmdb_m2m_model_componentGlideElement;
	/**
	 * Manufacturer
	 * @type {Icore_companyGlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    manufacturer: Icore_companyGlideElement;
	/**
	 * Model number
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_modelFields
	 */
    model_number: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_modelFields
	 */
    name: IStringGlideElement;
	/**
	 * Owner
	 * @type {Isys_userGlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    owner: Isys_userGlideElement;
	/**
	 * Picture
	 * @type {GlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Internal type is "user_image"
	 */
    picture: GlideElement;
	/**
	 * Power (watts)
	 * @type {INumberGlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Internal type is integer
	 */
    power_consumption: INumberGlideElement;
	/**
	 * Product Catalog Item
	 * @type {Isc_cat_itemGlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Reference to Catalog Item (IGlideRefElement<Isc_cat_itemGlideRecord>)
	 */
    product_catalog_item: Isc_cat_itemGlideElement;
	/**
	 * Height (U)
	 * @type {INumberGlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Internal type is integer
	 */
    rack_units: INumberGlideElement;
	/**
	 * Salvage value
	 * @type {INumberGlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Internal type is currency
	 */
    salvage_value: INumberGlideElement;
	/**
	 * Short description
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_modelFields
	 */
    short_description: IStringGlideElement;
	/**
	 * SLA
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_modelFields
	 */
    sla: IStringGlideElement;
	/**
	 * Sound Power (bels)
	 * @type {INumberGlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Internal type is integer
	 */
    sound_power: INumberGlideElement;
	/**
	 * Status
	 * @type {IStringBasedGlideElement<("In Production" | "Retired" | "Sold")>}
	 * @memberof Icmdb_modelFields
	 */
    status: IStringBasedGlideElement<("In Production" | "Retired" | "Sold")>;
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_modelFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmdb_modelFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_modelFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Type
	 * @type {IStringBasedGlideElement<("Generic" | "Product" | "Scrum product")>}
	 * @memberof Icmdb_modelFields
	 */
    type: IStringBasedGlideElement<("Generic" | "Product" | "Scrum product")>;
	/**
	 * Weight (lbs)
	 * @type {INumberGlideElement}
	 * @memberof Icmdb_modelFields
	 * @description Internal type is integer
	 */
    weight: INumberGlideElement;
}
declare interface Icmdb_modelGlideRecord extends IGlideRecord, Icmdb_modelFields { }
declare interface Icmdb_modelGlideElement extends IGlideRefElement<Icmdb_modelGlideRecord>, Icmdb_modelFields { }

/**
 * GlideElement values from the Asset table.
 * @interface Ialm_assetFields
 */
declare interface Ialm_assetFields {
	/**
	 * Acquisition method
	 * @type {IStringBasedGlideElement<("purchase" | "lease" | "rental" | "loan")>}
	 * @memberof Ialm_assetFields
	 * @description "purchase"="Purchase"; "lease"="Lease"; "rental"="Rental"; "loan"="Loan"
	 */
    acquisition_method: IStringBasedGlideElement<("purchase" | "lease" | "rental" | "loan")>;
	/**
	 * Active transfer order
	 * @type {IBooleanGlideElement}
	 * @memberof Ialm_assetFields
	 */
    active_to: IBooleanGlideElement;
	/**
	 * Asset tag
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 */
    asset_tag: IStringGlideElement;
	/**
	 * Assigned
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is glide_date_time
	 */
    assigned: IStringGlideElement;
	/**
	 * Assigned to
	 * @type {Isys_userGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    assigned_to: Isys_userGlideElement;
	/**
	 * Beneficiary
	 * @type {Icore_companyGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    beneficiary: Icore_companyGlideElement;
	/**
	 * Checked in
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is glide_date_time
	 */
    checked_in: IStringGlideElement;
	/**
	 * Checked out
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is glide_date_time
	 */
    checked_out: IStringGlideElement;
	/**
	 * Configuration Item
	 * @type {Icmdb_ciGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Configuration Item (IGlideRefElement<Icmdb_ciGlideRecord>)
	 */
    ci: Icmdb_ciGlideElement;
	/**
	 * Comments
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 */
    comments: IStringGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Cost
	 * @type {INumberGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is currency
	 */
    cost: INumberGlideElement;
	/**
	 * Cost center
	 * @type {GlideReferenceElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Cost Center (IGlideRefElement<Icmn_cost_centerGlideRecord>)
	 */
    cost_center: GlideReferenceElement;
	/**
	 * Order received
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is glide_date_time
	 */
    delivery_date: IStringGlideElement;
	/**
	 * Department
	 * @type {Icmn_departmentGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Department (IGlideRefElement<Icmn_departmentGlideRecord>)
	 */
    department: Icmn_departmentGlideElement;
	/**
	 * Depreciated amount
	 * @type {INumberGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is currency
	 */
    depreciated_amount: INumberGlideElement;
	/**
	 * Depreciation
	 * @type {GlideReferenceElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Depreciation (IGlideRefElement<Icmdb_depreciationGlideRecord>)
	 */
    depreciation: GlideReferenceElement;
	/**
	 * Depreciation effective date
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is glide_date_time
	 */
    depreciation_date: IStringGlideElement;
	/**
	 * Display name
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 */
    display_name: IStringGlideElement;
	/**
	 * Disposal reason
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 */
    disposal_reason: IStringGlideElement;
	/**
	 * Due
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is glide_date_time
	 */
    due: IStringGlideElement;
	/**
	 * Due in
	 * @type {IStringBasedGlideElement<("1 Day" | "1 Hour" | "1 Week")>}
	 * @memberof Ialm_assetFields
	 */
    due_in: IStringBasedGlideElement<("1 Day" | "1 Hour" | "1 Week")>;
	/**
	 * Expenditure type
	 * @type {IStringBasedGlideElement<("capex" | "opex")>}
	 * @memberof Ialm_assetFields
	 * @description "capex"="Capex"; "opex"="Opex"
	 */
    expenditure_type: IStringBasedGlideElement<("capex" | "opex")>;
	/**
	 * GL account
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 */
    gl_account: IStringGlideElement;
	/**
	 * Installed
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is glide_date_time
	 */
    install_date: IStringGlideElement;
	/**
	 * State
	 * @type {IStringBasedGlideElement<("2" | "6" | "9" | "1" | "10" | "3" | "7" | "8")>}
	 * @memberof Ialm_assetFields
	 * @description Internal type is integer; "2"="On order"; "6"="In stock"; "9"="In transit"; "1"="In use"; "10"="Consumed"; "3"="In maintenance"; "7"="Retired"; "8"="Missing"
	 */
    install_status: IStringBasedGlideElement<("2" | "6" | "9" | "1" | "10" | "3" | "7" | "8")>;
	/**
	 * Invoice number
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 */
    invoice_number: IStringGlideElement;
	/**
	 * Justification
	 * @type {IStringBasedGlideElement<("New employee hire" | "Replace in repair" | "Replace stolen" | "Replacement" | "Stock replenishment" | "Swap" | "Testing" | "Upgrade")>}
	 * @memberof Ialm_assetFields
	 */
    justification: IStringBasedGlideElement<("New employee hire" | "Replace in repair" | "Replace stolen" | "Replacement" | "Stock replenishment" | "Swap" | "Testing" | "Upgrade")>;
	/**
	 * Lease contract
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 */
    lease_id: IStringGlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Managed by
	 * @type {Isys_userGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    managed_by: Isys_userGlideElement;
	/**
	 * Model
	 * @type {Icmdb_modelGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Product Model (IGlideRefElement<Icmdb_modelGlideRecord>)
	 */
    model: Icmdb_modelGlideElement;
	/**
	 * Model category
	 * @type {Icmdb_model_categoryGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Model Category (IGlideRefElement<Icmdb_model_categoryGlideRecord>)
	 */
    model_category: Icmdb_model_categoryGlideElement;
	/**
	 * Old status
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 */
    old_status: IStringGlideElement;
	/**
	 * Old substatus
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 */
    old_substatus: IStringGlideElement;
	/**
	 * Ordered
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is glide_date_time
	 */
    order_date: IStringGlideElement;
	/**
	 * Owned by
	 * @type {Isys_userGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    owned_by: Isys_userGlideElement;
	/**
	 * Parent
	 * @type {Ialm_assetGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Asset (IGlideRefElement<Ialm_assetGlideRecord>)
	 */
    parent: Ialm_assetGlideElement;
	/**
	 * PO number
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 */
    po_number: IStringGlideElement;
	/**
	 * Pre-allocated
	 * @type {IBooleanGlideElement}
	 * @memberof Ialm_assetFields
	 */
    pre_allocated: IBooleanGlideElement;
	/**
	 * Purchased
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is glide_date
	 */
    purchase_date: IStringGlideElement;
	/**
	 * Purchase order line
	 * @type {GlideReferenceElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Purchase order line items (IGlideRefElement<Iproc_po_itemGlideRecord>)
	 */
    purchase_line: GlideReferenceElement;
	/**
	 * Quantity
	 * @type {INumberGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is integer
	 */
    quantity: INumberGlideElement;
	/**
	 * Receiving line
	 * @type {GlideReferenceElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Receiving Slip Line (IGlideRefElement<Iproc_rec_slip_itemGlideRecord>)
	 */
    receiving_line: GlideReferenceElement;
	/**
	 * Request line
	 * @type {Isc_req_itemGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Requested Item (IGlideRefElement<Isc_req_itemGlideRecord>)
	 */
    request_line: Isc_req_itemGlideElement;
	/**
	 * Resale price
	 * @type {INumberGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is price
	 */
    resale_price: INumberGlideElement;
	/**
	 * Reserved for
	 * @type {Isys_userGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    reserved_for: Isys_userGlideElement;
	/**
	 * Residual value
	 * @type {INumberGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is currency
	 */
    residual: INumberGlideElement;
	/**
	 * Residual date
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is glide_date
	 */
    residual_date: IStringGlideElement;
	/**
	 * Retired date
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is glide_date
	 */
    retired: IStringGlideElement;
	/**
	 * Scheduled retirement
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is glide_date
	 */
    retirement_date: IStringGlideElement;
	/**
	 * Salvage value
	 * @type {INumberGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is currency
	 */
    salvage_value: INumberGlideElement;
	/**
	 * Serial number
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 */
    serial_number: IStringGlideElement;
	/**
	 * Skip sync
	 * @type {IBooleanGlideElement}
	 * @memberof Ialm_assetFields
	 */
    skip_sync: IBooleanGlideElement;
	/**
	 * Stockroom
	 * @type {GlideReferenceElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Stockroom (IGlideRefElement<Ialm_stockroomGlideRecord>)
	 */
    stockroom: GlideReferenceElement;
	/**
	 * Substate
	 * @type {IStringBasedGlideElement<("available" | "disposed" | "lost" | "reserved" | "sold" | "stolen" | "defective" | "donated" | "pending_repair" | "vendor_credit" | "pending_install" | "pending_disposal" | "pending_transfer" | "pre_allocated")>}
	 * @memberof Ialm_assetFields
	 * @description "available"="Available"; "available"="Available"; "disposed"="Disposed"; "lost"="Lost"; "reserved"="Reserved"; "reserved"="Reserved"; "sold"="Sold"; "stolen"="Stolen"; "defective"="Defective"; "defective"="Defective"; "donated"="Donated"; "pending_install"="Pending install"; "pending_repair"="Pending repair"; "vendor_credit"="Vendor credit"; "pending_disposal"="Pending disposal"; "pending_install"="Pending install"; "pending_disposal"="Pending disposal"; "pre_allocated"="Pre-allocated"; "pending_transfer"="Pending transfer"; "pre_allocated"="Pre-allocated"
	 */
    substatus: IStringBasedGlideElement<("available" | "disposed" | "lost" | "reserved" | "sold" | "stolen" | "defective" | "donated" | "pending_repair" | "vendor_credit" | "pending_install" | "pending_disposal" | "pending_transfer" | "pre_allocated")>;
	/**
	 * Supported by
	 * @type {Isys_userGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    supported_by: Isys_userGlideElement;
	/**
	 * Support group
	 * @type {Isys_user_groupGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    support_group: Isys_user_groupGlideElement;
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is "domain_path"
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Ialm_assetFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Vendor
	 * @type {Icore_companyGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    vendor: Icore_companyGlideElement;
	/**
	 * Warranty expiration
	 * @type {IStringGlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is glide_date
	 */
    warranty_expiration: IStringGlideElement;
	/**
	 * Work notes
	 * @type {GlideElement}
	 * @memberof Ialm_assetFields
	 * @description Internal type is "journal_input"
	 */
    work_notes: GlideElement;
}
declare interface Ialm_assetGlideRecord extends IGlideRecord, Ialm_assetFields { }
declare interface Ialm_assetGlideElement extends IGlideRefElement<Ialm_assetGlideRecord>, Ialm_assetFields { }

/**
 * GlideElement values from the Base Configuration Item table.
 * @interface IcmdbFields
 */
declare interface IcmdbFields {
	/**
	 * Asset
	 * @type {Ialm_assetGlideElement}
	 * @memberof IcmdbFields
	 * @description Reference to Asset (IGlideRefElement<Ialm_assetGlideRecord>)
	 */
    asset: Ialm_assetGlideElement;
	/**
	 * Asset tag
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 */
    asset_tag: IStringGlideElement;
	/**
	 * Assigned
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is glide_date_time
	 */
    assigned: IStringGlideElement;
	/**
	 * Assigned to
	 * @type {Isys_userGlideElement}
	 * @memberof IcmdbFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    assigned_to: Isys_userGlideElement;
	/**
	 * Assignment group
	 * @type {Isys_user_groupGlideElement}
	 * @memberof IcmdbFields
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    assignment_group: Isys_user_groupGlideElement;
	/**
	 * Checked in
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is glide_date_time
	 */
    checked_in: IStringGlideElement;
	/**
	 * Checked out
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is glide_date_time
	 */
    checked_out: IStringGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof IcmdbFields
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Cost
	 * @type {INumberGlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is float
	 */
    cost: INumberGlideElement;
	/**
	 * Cost currency
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 */
    cost_cc: IStringGlideElement;
	/**
	 * Cost center
	 * @type {GlideReferenceElement}
	 * @memberof IcmdbFields
	 * @description Reference to Cost Center (IGlideRefElement<Icmn_cost_centerGlideRecord>)
	 */
    cost_center: GlideReferenceElement;
	/**
	 * Order received
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is glide_date_time
	 */
    delivery_date: IStringGlideElement;
	/**
	 * Department
	 * @type {Icmn_departmentGlideElement}
	 * @memberof IcmdbFields
	 * @description Reference to Department (IGlideRefElement<Icmn_departmentGlideRecord>)
	 */
    department: Icmn_departmentGlideElement;
	/**
	 * Due
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is glide_date_time
	 */
    due: IStringGlideElement;
	/**
	 * Due in
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 */
    due_in: IStringGlideElement;
	/**
	 * GL account
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 */
    gl_account: IStringGlideElement;
	/**
	 * Installed
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is glide_date_time
	 */
    install_date: IStringGlideElement;
	/**
	 * Status
	 * @type {IStringBasedGlideElement<("100" | "3" | "6" | "1" | "2" | "4" | "5" | "7" | "8")>}
	 * @memberof IcmdbFields
	 * @description Internal type is integer; "100"="Absent"; "3"="In Maintenance"; "6"="In Stock"; "1"="Installed"; "2"="On Order"; "4"="Pending Install"; "5"="Pending Repair"; "7"="Retired"; "8"="Stolen"
	 */
    install_status: IStringBasedGlideElement<("100" | "3" | "6" | "1" | "2" | "4" | "5" | "7" | "8")>;
	/**
	 * Invoice number
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 */
    invoice_number: IStringGlideElement;
	/**
	 * Justification
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 */
    justification: IStringGlideElement;
	/**
	 * Lease contract
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 */
    lease_id: IStringGlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof IcmdbFields
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Managed by
	 * @type {Isys_userGlideElement}
	 * @memberof IcmdbFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    managed_by: Isys_userGlideElement;
	/**
	 * Manufacturer
	 * @type {Icore_companyGlideElement}
	 * @memberof IcmdbFields
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    manufacturer: Icore_companyGlideElement;
	/**
	 * Model ID
	 * @type {Icmdb_modelGlideElement}
	 * @memberof IcmdbFields
	 * @description Reference to Product Model (IGlideRefElement<Icmdb_modelGlideRecord>)
	 */
    model_id: Icmdb_modelGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 */
    name: IStringGlideElement;
	/**
	 * Ordered
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is glide_date_time
	 */
    order_date: IStringGlideElement;
	/**
	 * Owned by
	 * @type {Isys_userGlideElement}
	 * @memberof IcmdbFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    owned_by: Isys_userGlideElement;
	/**
	 * PO number
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 */
    po_number: IStringGlideElement;
	/**
	 * Purchased
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is glide_date
	 */
    purchase_date: IStringGlideElement;
	/**
	 * Serial number
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 */
    serial_number: IStringGlideElement;
	/**
	 * Skip sync
	 * @type {IBooleanGlideElement}
	 * @memberof IcmdbFields
	 */
    skip_sync: IBooleanGlideElement;
	/**
	 * Supported by
	 * @type {Isys_userGlideElement}
	 * @memberof IcmdbFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    supported_by: Isys_userGlideElement;
	/**
	 * Support group
	 * @type {Isys_user_groupGlideElement}
	 * @memberof IcmdbFields
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    support_group: Isys_user_groupGlideElement;
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElement;
	/**
	 * Sys class path
	 * @type {GlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is "sys_class_path"
	 */
    sys_class_path: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is "domain_path"
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof IcmdbFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Requires verification
	 * @type {IBooleanGlideElement}
	 * @memberof IcmdbFields
	 */
    unverified: IBooleanGlideElement;
	/**
	 * Vendor
	 * @type {Icore_companyGlideElement}
	 * @memberof IcmdbFields
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    vendor: Icore_companyGlideElement;
	/**
	 * Warranty expiration
	 * @type {IStringGlideElement}
	 * @memberof IcmdbFields
	 * @description Internal type is glide_date
	 */
    warranty_expiration: IStringGlideElement;
}
declare interface IcmdbGlideRecord extends IGlideRecord, IcmdbFields { }
declare interface IcmdbGlideElementBase<T extends IcmdbGlideRecord> extends IGlideRefElement<T>, IcmdbFields { }
declare interface IcmdbGlideElement extends IcmdbGlideElementBase<IcmdbGlideRecord>, IcmdbFields { }

/**
 * GlideElement values from the Configuration Item table.
 * @interface Icmdb_ciFields
 * @extends {IcmdbFields}
 */
declare interface Icmdb_ciFields extends IcmdbFields {
	/**
	 * Asset
	 * @type {Ialm_assetGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to Asset (IGlideRefElement<Ialm_assetGlideRecord>)
	 */
    asset: Ialm_assetGlideElement;
	/**
	 * Asset tag
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    asset_tag: IStringGlideElement;
	/**
	 * Assigned
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is glide_date_time
	 */
    assigned: IStringGlideElement;
	/**
	 * Assigned to
	 * @type {Isys_userGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    assigned_to: Isys_userGlideElement;
	/**
	 * Assignment group
	 * @type {Isys_user_groupGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    assignment_group: Isys_user_groupGlideElement;
	/**
	 * Attributes
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    attributes: IStringGlideElement;
	/**
	 * Can Print
	 * @type {IBooleanGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    can_print: IBooleanGlideElement;
	/**
	 * Category
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    category: IStringGlideElement;
	/**
	 * Approval group
	 * @type {Isys_user_groupGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    change_control: Isys_user_groupGlideElement;
	/**
	 * Checked in
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is glide_date_time
	 */
    checked_in: IStringGlideElement;
	/**
	 * Checked out
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is glide_date_time
	 */
    checked_out: IStringGlideElement;
	/**
	 * Comments
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    comments: IStringGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Correlation ID
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    correlation_id: IStringGlideElement;
	/**
	 * Cost
	 * @type {INumberGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is float
	 */
    cost: INumberGlideElement;
	/**
	 * Cost currency
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    cost_cc: IStringGlideElement;
	/**
	 * Cost center
	 * @type {GlideReferenceElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to Cost Center (IGlideRefElement<Icmn_cost_centerGlideRecord>)
	 */
    cost_center: GlideReferenceElement;
	/**
	 * Order received
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is glide_date_time
	 */
    delivery_date: IStringGlideElement;
	/**
	 * Department
	 * @type {Icmn_departmentGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to Department (IGlideRefElement<Icmn_departmentGlideRecord>)
	 */
    department: Icmn_departmentGlideElement;
	/**
	 * Discovery source
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    discovery_source: IStringGlideElement;
	/**
	 * DNS Domain
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    dns_domain: IStringGlideElement;
	/**
	 * Due
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is glide_date_time
	 */
    due: IStringGlideElement;
	/**
	 * Due in
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    due_in: IStringGlideElement;
	/**
	 * Fault count
	 * @type {INumberGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is integer
	 */
    fault_count: INumberGlideElement;
	/**
	 * First discovered
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is glide_date_time
	 */
    first_discovered: IStringGlideElement;
	/**
	 * Fully qualified domain name
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    fqdn: IStringGlideElement;
	/**
	 * GL account
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    gl_account: IStringGlideElement;
	/**
	 * Installed
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is glide_date_time
	 */
    install_date: IStringGlideElement;
	/**
	 * Status
	 * @type {IStringBasedGlideElement<("100" | "3" | "6" | "1" | "2" | "4" | "5" | "7" | "8")>}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is integer; "100"="Absent"; "3"="In Maintenance"; "6"="In Stock"; "1"="Installed"; "2"="On Order"; "4"="Pending Install"; "5"="Pending Repair"; "7"="Retired"; "8"="Stolen"
	 */
    install_status: IStringBasedGlideElement<("100" | "3" | "6" | "1" | "2" | "4" | "5" | "7" | "8")>;
	/**
	 * Invoice number
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    invoice_number: IStringGlideElement;
	/**
	 * IP Address
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    ip_address: IStringGlideElement;
	/**
	 * Justification
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    justification: IStringGlideElement;
	/**
	 * Most recent discovery
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is glide_date_time
	 */
    last_discovered: IStringGlideElement;
	/**
	 * Lease contract
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    lease_id: IStringGlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * MAC Address
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    mac_address: IStringGlideElement;
	/**
	 * Maintenance schedule
	 * @type {Icmn_scheduleGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to Schedule (IGlideRefElement<Icmn_scheduleGlideRecord>)
	 */
    maintenance_schedule: Icmn_scheduleGlideElement;
	/**
	 * Managed by
	 * @type {Isys_userGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    managed_by: Isys_userGlideElement;
	/**
	 * Manufacturer
	 * @type {Icore_companyGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    manufacturer: Icore_companyGlideElement;
	/**
	 * Model ID
	 * @type {Icmdb_modelGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to Product Model (IGlideRefElement<Icmdb_modelGlideRecord>)
	 */
    model_id: Icmdb_modelGlideElement;
	/**
	 * Model number
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    model_number: IStringGlideElement;
	/**
	 * Monitor
	 * @type {IBooleanGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    monitor: IBooleanGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    name: IStringGlideElement;
	/**
	 * Operational status
	 * @type {IStringBasedGlideElement<("1" | "2" | "3" | "4" | "5" | "6")>}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is integer; "1"="Operational"; "2"="Non-Operational"; "3"="Repair in Progress"; "4"="DR Standby"; "5"="Ready"; "6"="Retired"
	 */
    operational_status: IStringBasedGlideElement<("1" | "2" | "3" | "4" | "5" | "6")>;
	/**
	 * Ordered
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is glide_date_time
	 */
    order_date: IStringGlideElement;
	/**
	 * Owned by
	 * @type {Isys_userGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    owned_by: Isys_userGlideElement;
	/**
	 * PO number
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    po_number: IStringGlideElement;
	/**
	 * Purchased
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is glide_date
	 */
    purchase_date: IStringGlideElement;
	/**
	 * Schedule
	 * @type {Icmn_scheduleGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to Schedule (IGlideRefElement<Icmn_scheduleGlideRecord>)
	 */
    schedule: Icmn_scheduleGlideElement;
	/**
	 * Serial number
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    serial_number: IStringGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    short_description: IStringGlideElement;
	/**
	 * Skip sync
	 * @type {IBooleanGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    skip_sync: IBooleanGlideElement;
	/**
	 * Start date
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is glide_date_time
	 */
    start_date: IStringGlideElement;
	/**
	 * Subcategory
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    subcategory: IStringGlideElement;
	/**
	 * Supported by
	 * @type {Isys_userGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    supported_by: Isys_userGlideElement;
	/**
	 * Support group
	 * @type {Isys_user_groupGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    support_group: Isys_user_groupGlideElement;
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElement;
	/**
	 * Sys class path
	 * @type {GlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is "sys_class_path"
	 */
    sys_class_path: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is "domain_path"
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Requires verification
	 * @type {IBooleanGlideElement}
	 * @memberof Icmdb_ciFields
	 */
    unverified: IBooleanGlideElement;
	/**
	 * Vendor
	 * @type {Icore_companyGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    vendor: Icore_companyGlideElement;
	/**
	 * Warranty expiration
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ciFields
	 * @description Internal type is glide_date
	 */
    warranty_expiration: IStringGlideElement;
}
declare interface Icmdb_ciGlideRecord extends IcmdbGlideRecord, Icmdb_ciFields { }
declare interface Icmdb_ciGlideElementBase<T extends Icmdb_ciGlideRecord> extends IcmdbGlideElementBase<T>, Icmdb_ciFields { }
declare interface Icmdb_ciGlideElement extends Icmdb_ciGlideElementBase<Icmdb_ciGlideRecord>, Icmdb_ciFields { }

/**
 * GlideElement values from the Business Service table.
 * @interface Icmdb_ci_serviceFields
 * @extends {Icmdb_ciFields}
 */
declare interface Icmdb_ci_serviceFields extends Icmdb_ciFields {
	/**
	 * Business Criticality
	 * @type {IStringBasedGlideElement<("1 - most critical" | "2 - somewhat critical" | "3 - less critical" | "4 - not critical")>}
	 * @memberof Icmdb_ci_serviceFields
	 */
    busines_criticality: IStringBasedGlideElement<("1 - most critical" | "2 - somewhat critical" | "3 - less critical" | "4 - not critical")>;
	/**
	 * Parent
	 * @type {Icmdb_ci_serviceGlideElement}
	 * @memberof Icmdb_ci_serviceFields
	 * @description Reference to Business Service (IGlideRefElement<Icmdb_ci_serviceGlideRecord>)
	 */
    parent: Icmdb_ci_serviceGlideElement;
	/**
	 * Portfolio status
	 * @type {IStringBasedGlideElement<("pipeline" | "catalog" | "retired")>}
	 * @memberof Icmdb_ci_serviceFields
	 * @description "pipeline"="Pipeline"; "catalog"="Catalog"; "retired"="Retired"
	 */
    portfolio_status: IStringBasedGlideElement<("pipeline" | "catalog" | "retired")>;
	/**
	 * Price model
	 * @type {IStringBasedGlideElement<("fixed" | "per_unit")>}
	 * @memberof Icmdb_ci_serviceFields
	 * @description "fixed"="Fixed"; "per_unit"="Per Unit"
	 */
    price_model: IStringBasedGlideElement<("fixed" | "per_unit")>;
	/**
	 * Price unit
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ci_serviceFields
	 */
    price_unit: IStringGlideElement;
	/**
	 * Service classification
	 * @type {IStringBasedGlideElement<("Business Service" | "Technical Service" | "Service Offering" | "Shared Service" | "Application Service" | "Billable Service")>}
	 * @memberof Icmdb_ci_serviceFields
	 */
    service_classification: IStringBasedGlideElement<("Business Service" | "Technical Service" | "Service Offering" | "Shared Service" | "Application Service" | "Billable Service")>;
	/**
	 * Service level requirement
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ci_serviceFields
	 * @description Internal type is "translated_html"
	 */
    service_level_requirement: IStringGlideElement;
	/**
	 * Service status
	 * @type {IStringBasedGlideElement<("design" | "requirements" | "definition" | "development" | "analysis" | "buildtestrelease" | "approved" | "operational" | "chartered" | "retiring")>}
	 * @memberof Icmdb_ci_serviceFields
	 * @description "design"="Design"; "requirements"="Requirements"; "definition"="Definition"; "development"="Development"; "analysis"="Analysis"; "buildtestrelease"="Build/Test/Release"; "approved"="Approved"; "operational"="Operational"; "chartered"="Chartered"; "retiring"="Retiring"
	 */
    service_status: IStringBasedGlideElement<("design" | "requirements" | "definition" | "development" | "analysis" | "buildtestrelease" | "approved" | "operational" | "chartered" | "retiring")>;
	/**
	 * SLA
	 * @type {IslaGlideElement}
	 * @memberof Icmdb_ci_serviceFields
	 * @description Reference to Agreement (IGlideRefElement<IslaGlideRecord>)
	 */
    sla: IslaGlideElement;
	/**
	 * Unit description
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ci_serviceFields
	 * @description Internal type is html
	 */
    unit_description: IStringGlideElement;
	/**
	 * Used for
	 * @type {IStringBasedGlideElement<("Production" | "Staging" | "QA" | "Test" | "Development" | "Demonstration" | "Training" | "Disaster recovery")>}
	 * @memberof Icmdb_ci_serviceFields
	 */
    used_for: IStringBasedGlideElement<("Production" | "Staging" | "QA" | "Test" | "Development" | "Demonstration" | "Training" | "Disaster recovery")>;
	/**
	 * Users supported
	 * @type {Isys_user_groupGlideElement}
	 * @memberof Icmdb_ci_serviceFields
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    user_group: Isys_user_groupGlideElement;
	/**
	 * Version
	 * @type {IStringGlideElement}
	 * @memberof Icmdb_ci_serviceFields
	 */
    version: IStringGlideElement;
}
declare interface Icmdb_ci_serviceGlideRecord extends Icmdb_ciGlideRecord, Icmdb_ci_serviceFields { }
declare interface Icmdb_ci_serviceGlideElementBase<T extends Icmdb_ci_serviceGlideRecord> extends Icmdb_ciGlideElementBase<T>, Icmdb_ci_serviceFields { }
declare interface Icmdb_ci_serviceGlideElement extends Icmdb_ci_serviceGlideElementBase<Icmdb_ci_serviceGlideRecord>, Icmdb_ci_serviceFields { }