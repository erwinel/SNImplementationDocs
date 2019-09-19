
declare interface Icore_companyGlideElement extends IGlideRefElement<Icore_companyGlideRecord> {
	/**
	 * Apple icon
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "user_image"
	 */
    apple_icon: GlideElement;
	/**
	 * Banner image
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "user_image"
	 */
    banner_image: GlideElement;
	/**
	 * UI16 Banner Image
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "user_image"
	 */
    banner_image_light: GlideElement;
	/**
	 * Banner text
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    banner_text: IStringGlideElement;
	/**
	 * City
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    city: IStringGlideElement;
	/**
	 * Contact
	 * @type {Isys_userGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    contact: Isys_userGlideElement;
	/**
	 * Country
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    country: IStringGlideElement;
	/**
	 * Customer
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    customer: IBooleanGlideElement;
	/**
	 * Discount
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "decimal"
	 */
    discount: IStringGlideElement;
	/**
	 * Fax phone
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "ph_number"
	 */
    fax_phone: IStringGlideElement;
	/**
	 * Fiscal year
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "glide_date"
	 */
    fiscal_year: IStringGlideElement;
	/**
	 * Latitude
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "float"
	 */
    latitude: IStringGlideElement;
	/**
	 * Lat long error
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    lat_long_error: IStringGlideElement;
	/**
	 * Longitude
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "float"
	 */
    longitude: IStringGlideElement;
	/**
	 * Manufacturer
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    manufacturer: IBooleanGlideElement;
	/**
	 * Market cap
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "currency"
	 */
    market_cap: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    name: IStringGlideElement;
	/**
	 * Notes
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    notes: IStringGlideElement;
	/**
	 * Number of employees
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "integer"
	 */
    num_employees: IStringGlideElement;
	/**
	 * Parent
	 * @type {Icore_companyGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    parent: Icore_companyGlideElement;
	/**
	 * Phone
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "ph_number"
	 */
    phone: IStringGlideElement;
	/**
	 * Primary
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    primary: IBooleanGlideElement;
	/**
	 * Profits
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "currency"
	 */
    profits: IStringGlideElement;
	/**
	 * Publicly traded
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    publicly_traded: IBooleanGlideElement;
	/**
	 * Rank tier
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    rank_tier: IStringGlideElement;
	/**
	 * Revenue per year
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "currency"
	 */
    revenue_per_year: IStringGlideElement;
	/**
	 * State / Province
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    state: IStringGlideElement;
	/**
	 * Stock price
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    stock_price: IStringGlideElement;
	/**
	 * Stock symbol
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    stock_symbol: IStringGlideElement;
	/**
	 * Street
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "multi_two_lines"
	 */
    street: GlideElement;
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Theme
	 * @type {GlideReferenceElement}
	 * @memberof Icore_companyGlideElement
	 * @description Reference to Theme (IGlideRefElement<Isys_ui_themeGlideRecord>)
	 */
    theme: GlideReferenceElement;
	/**
	 * Vendor
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    vendor: IBooleanGlideElement;
	/**
	 * Vendor manager
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "glide_list"
	 */
    vendor_manager: GlideElement;
	/**
	 * Vendor type
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "glide_list"
	 */
    vendor_type: GlideElement;
	/**
	 * Website
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "url"
	 */
    website: IStringGlideElement;
	/**
	 * Zip / Postal code
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    zip: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Company table.
 * @interface Icore_companyGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Icore_companyGlideRecord extends IGlideRecord {
	/**
	 * Apple icon
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "user_image"
	 */
    apple_icon: GlideElement;
	/**
	 * Banner image
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "user_image"
	 */
    banner_image: GlideElement;
	/**
	 * UI16 Banner Image
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "user_image"
	 */
    banner_image_light: GlideElement;
	/**
	 * Banner text
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    banner_text: IStringGlideElement;
	/**
	 * City
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    city: IStringGlideElement;
	/**
	 * Contact
	 * @type {Isys_userGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    contact: Isys_userGlideElement;
	/**
	 * Country
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    country: IStringGlideElement;
	/**
	 * Customer
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    customer: IBooleanGlideElement;
	/**
	 * Discount
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "decimal"
	 */
    discount: IStringGlideElement;
	/**
	 * Fax phone
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "ph_number"
	 */
    fax_phone: IStringGlideElement;
	/**
	 * Fiscal year
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "glide_date"
	 */
    fiscal_year: IStringGlideElement;
	/**
	 * Latitude
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "float"
	 */
    latitude: IStringGlideElement;
	/**
	 * Lat long error
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    lat_long_error: IStringGlideElement;
	/**
	 * Longitude
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "float"
	 */
    longitude: IStringGlideElement;
	/**
	 * Manufacturer
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    manufacturer: IBooleanGlideElement;
	/**
	 * Market cap
	 * @type {INumberGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "currency"
	 */
    market_cap: INumberGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Notes
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    notes: IStringGlideElement;
	/**
	 * Number of employees
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "integer"
	 */
    num_employees: IStringGlideElement;
	/**
	 * Parent
	 * @type {Icore_companyGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    parent: Icore_companyGlideElement;
	/**
	 * Phone
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "ph_number"
	 */
    phone: IStringGlideElement;
	/**
	 * Primary
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    primary: IBooleanGlideElement;
	/**
	 * Profits
	 * @type {INumberGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "currency"
	 */
    profits: INumberGlideElement;
	/**
	 * Publicly traded
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    publicly_traded: IBooleanGlideElement;
	/**
	 * Rank tier
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    rank_tier: IStringGlideElement;
	/**
	 * Revenue per year
	 * @type {INumberGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "currency"
	 */
    revenue_per_year: INumberGlideElement;
	/**
	 * State / Province
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    state: IStringGlideElement;
	/**
	 * Stock price
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    stock_price: IStringGlideElement;
	/**
	 * Stock symbol
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    stock_symbol: IStringGlideElement;
	/**
	 * Street
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "multi_two_lines"
	 */
    street: GlideElement;
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Theme
	 * @type {GlideReferenceElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Reference to Theme (IGlideRefElement<Isys_ui_themeGlideRecord>)
	 */
    theme: GlideReferenceElement;
	/**
	 * Vendor
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    vendor: IBooleanGlideElement;
	/**
	 * Vendor manager
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "glide_list"
	 */
    vendor_manager: GlideElement;
	/**
	 * Vendor type
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "glide_list"
	 */
    vendor_type: GlideElement;
	/**
	 * Website
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "url"
	 */
    website: IStringGlideElement;
	/**
	 * Zip / Postal code
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    zip: IStringGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the cmn_department table.
 * @interface Icmn_departmentGlideElement
 * @extends {IGlideRefElement<Icmn_departmentGlideRecord>}
 */
declare interface Icmn_departmentGlideElement extends IGlideRefElement<Icmn_departmentGlideRecord> {
    /**
     * Business unit
     * @type {Ibusiness_unitGlideElement}
     * @memberof Icmn_departmentGlideElement
     * @description Reference to Business Unit (IGlideRefElement<Ibusiness_unitGlideRecord>)
     */
    business_unit: Ibusiness_unitGlideElement;
    /**
     * Code
     * @type {IStringGlideElement}
     * @memberof Icmn_departmentGlideElement
     */
    code: IStringGlideElement;
    /**
     * Company
     * @type {Icore_companyGlideElement}
     * @memberof Icmn_departmentGlideElement
     * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
     */
    company: Icore_companyGlideElement;
    /**
     * Cost center
     * @type {GlideReferenceElement}
     * @memberof Icmn_departmentGlideElement
     * @description Reference to Cost Center (IGlideRefElement<Icmn_cost_centerGlideRecord>)
     */
    cost_center: GlideReferenceElement;
    /**
     * Department head
     * @type {Isys_userGlideElement}
     * @memberof Icmn_departmentGlideElement
     * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
     */
    dept_head: Isys_userGlideElement;
    /**
     * Description
     * @type {IStringGlideElement}
     * @memberof Icmn_departmentGlideElement
     */
    description: IStringGlideElement;
    /**
     * Head count
     * @type {IStringGlideElement}
     * @memberof Icmn_departmentGlideElement
     * @description Internal type is "integer"
     */
    head_count: IStringGlideElement;
    /**
     * ID
     * @type {IStringGlideElement}
     * @memberof Icmn_departmentGlideElement
     */
    id: IStringGlideElement;
    /**
     * Name
     * @type {IStringGlideElement}
     * @memberof Icmn_departmentGlideElement
     */
    name: IStringGlideElement;
    /**
     * Parent
     * @type {Icmn_departmentGlideElement}
     * @memberof Icmn_departmentGlideElement
     * @description Reference to Department (IGlideRefElement<Icmn_departmentGlideRecord>)
     */
    parent: Icmn_departmentGlideElement;
    /**
     * Primary contact
     * @type {Isys_userGlideElement}
     * @memberof Icmn_departmentGlideElement
     * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
     */
    primary_contact: Isys_userGlideElement;
    /**
     * Created by
     * @type {IStringGlideElement}
     * @memberof Icmn_departmentGlideElement
     */
    sys_created_by: IStringGlideElement;
    /**
     * Created
     * @type {IStringGlideElement}
     * @memberof Icmn_departmentGlideElement
     * @description Internal type is "glide_date_time"
     */
    sys_created_on: IStringGlideElement;
    /**
     * Sys ID
     * @type {IGUIDGlideElement}
     * @memberof Icmn_departmentGlideElement
     */
    sys_id: IGUIDGlideElement;
    /**
     * Updates
     * @type {IStringGlideElement}
     * @memberof Icmn_departmentGlideElement
     * @description Internal type is "integer"
     */
    sys_mod_count: IStringGlideElement;
    /**
     * Updated by
     * @type {IStringGlideElement}
     * @memberof Icmn_departmentGlideElement
     */
    sys_updated_by: IStringGlideElement;
    /**
     * Updated
     * @type {IStringGlideElement}
     * @memberof Icmn_departmentGlideElement
     * @description Internal type is "glide_date_time"
     */
    sys_updated_on: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Department table.
 * @interface Icmn_departmentGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Icmn_departmentGlideRecord extends IGlideRecord {
	/**
	 * Business unit
	 * @type {Ibusiness_unitGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Reference to Business Unit (IGlideRefElement<Ibusiness_unitGlideRecord>)
	 */
    business_unit: Ibusiness_unitGlideElement;
	/**
	 * Code
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 */
    code: IStringGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Cost center
	 * @type {GlideReferenceElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Reference to Cost Center (IGlideRefElement<Icmn_cost_centerGlideRecord>)
	 */
    cost_center: GlideReferenceElement;
	/**
	 * Department head
	 * @type {Isys_userGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    dept_head: Isys_userGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 */
    description: IStringGlideElement;
	/**
	 * Head count
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Internal type is "integer"
	 */
    head_count: IStringGlideElement;
	/**
	 * ID
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 */
    id: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Icmn_departmentGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Reference to Department (IGlideRefElement<Icmn_departmentGlideRecord>)
	 */
    parent: Icmn_departmentGlideElement;
	/**
	 * Primary contact
	 * @type {Isys_userGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    primary_contact: Isys_userGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the business_unit table.
 * @interface Ibusiness_unitGlideElement
 * @extends {IGlideRefElement<Ibusiness_unitGlideRecord>}
 */
declare interface Ibusiness_unitGlideElement extends IGlideRefElement<Ibusiness_unitGlideRecord> {
	/**
	 * Business Unit Head
	 * @type {Isys_userGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    bu_head: Isys_userGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Internal type is "wide_text"
	 */
    description: IStringGlideElement;
	/**
	 * Hierarchy level
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Internal type is "integer"
	 */
    hierarchy_level: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Ibusiness_unitGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Reference to Business Unit (IGlideRefElement<Ibusiness_unitGlideRecord>)
	 */
    parent: Ibusiness_unitGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Internal type is "domain_path"
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Business Unit table.
 * @interface Ibusiness_unitGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Ibusiness_unitGlideRecord extends IGlideRecord {
	/**
	 * Business Unit Head
	 * @type {Isys_userGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    bu_head: Isys_userGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Internal type is "wide_text"
	 */
    description: IStringGlideElement;
	/**
	 * Hierarchy level
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Internal type is "integer"
	 */
    hierarchy_level: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Ibusiness_unitGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Reference to Business Unit (IGlideRefElement<Ibusiness_unitGlideRecord>)
	 */
    parent: Ibusiness_unitGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Internal type is "domain_path"
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the location table.
 * @interface IlocationGlideElement
 * @extends {IGlideRefElement<Icmn_locationGlideRecord>}
 */
declare interface Icmn_locationGlideElement extends IGlideRefElement<Icmn_locationGlideRecord> {
	/**
	 * City
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    city: IStringGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Contact
	 * @type {Isys_userGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    contact: Isys_userGlideElement;
	/**
	 * Country
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    country: IStringGlideElement;
	/**
	 * Fax phone
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    fax_phone: IStringGlideElement;
	/**
	 * Full name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    full_name: IStringGlideElement;
	/**
	 * Latitude
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Internal type is "float"
	 */
    latitude: IStringGlideElement;
	/**
	 * Lat long error
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    lat_long_error: IStringGlideElement;
	/**
	 * Longitude
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Internal type is "float"
	 */
    longitude: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Icmn_locationGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    parent: Icmn_locationGlideElement;
	/**
	 * Phone
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    phone: IStringGlideElement;
	/**
	 * Phone territory
	 * @type {GlideReferenceElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Reference to Sys Phone Territory (IGlideRefElement<Isys_phone_territoryGlideRecord>)
	 */
    phone_territory: GlideReferenceElement;
	/**
	 * State / Province
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    state: IStringGlideElement;
	/**
	 * Stock room
	 * @type {IBooleanGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    stock_room: IBooleanGlideElement;
	/**
	 * Street
	 * @type {GlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Internal type is "multi_two_lines"
	 */
    street: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Time zone
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    time_zone: IStringGlideElement;
	/**
	 * Zip / Postal Code
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    zip: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Location table.
 * @interface Icmn_locationGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Icmn_locationGlideRecord extends IGlideRecord {
	/**
	 * City
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    city: IStringGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Contact
	 * @type {Isys_userGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    contact: Isys_userGlideElement;
	/**
	 * Country
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    country: IStringGlideElement;
	/**
	 * Fax phone
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    fax_phone: IStringGlideElement;
	/**
	 * Full name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    full_name: IStringGlideElement;
	/**
	 * Latitude
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Internal type is "float"
	 */
    latitude: IStringGlideElement;
	/**
	 * Lat long error
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    lat_long_error: IStringGlideElement;
	/**
	 * Longitude
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Internal type is "float"
	 */
    longitude: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Icmn_locationGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    parent: Icmn_locationGlideElement;
	/**
	 * Phone
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    phone: IStringGlideElement;
	/**
	 * Phone territory
	 * @type {GlideReferenceElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Reference to Sys Phone Territory (IGlideRefElement<Isys_phone_territoryGlideRecord>)
	 */
    phone_territory: GlideReferenceElement;
	/**
	 * State / Province
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    state: IStringGlideElement;
	/**
	 * Stock room
	 * @type {IBooleanGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    stock_room: IBooleanGlideElement;
	/**
	 * Street
	 * @type {GlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Internal type is "multi_two_lines"
	 */
    street: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Time zone
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    time_zone: IStringGlideElement;
	/**
	 * Zip / Postal Code
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    zip: IStringGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the cmn_building table.
 * @interface Icmn_buildingGlideElement
 * @extends {IGlideRefElement<Icmn_buildingGlideRecord>}
 */
declare interface Icmn_buildingGlideElement extends IGlideRefElement<Icmn_buildingGlideRecord> {
	/**
	 * Contact
	 * @type {Isys_userGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    contact: Isys_userGlideElement;
	/**
	 * Floors
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 * @description Internal type is "integer"
	 */
    floors: IStringGlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 */
    name: IStringGlideElement;
	/**
	 * Notes
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 */
    notes: IStringGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Building table.
 * @interface Icmn_buildingGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Icmn_buildingGlideRecord extends IGlideRecord {
	/**
	 * Contact
	 * @type {Isys_userGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    contact: Isys_userGlideElement;
	/**
	 * Floors
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 * @description Internal type is "integer"
	 */
    floors: IStringGlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Notes
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 */
    notes: IStringGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the sys_user table.
 * @interface Isys_userGlideElement
 * @extends {IGlideRefElement<Isys_userGlideRecord>}
 */
declare interface Isys_userGlideElement extends IGlideRefElement<Isys_userGlideRecord> {
	/**
	 * Accumulated roles
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    accumulated_roles: IStringGlideElement;
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    active: IBooleanGlideElement;
	/**
	 * Work agent status
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is choice
	 */
    agent_status: GlideElement;
	/**
	 * Average Daily FTE Hours/Hours Per Person Day
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is decimal
	 */
    average_daily_fte: INumberGlideElement;
	/**
	 * Building
	 * @type {Icmn_buildingGlideElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Building (IGlideRefElement<Icmn_buildingGlideRecord>)
	 */
    building: Icmn_buildingGlideElement;
	/**
	 * Business impact
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is integer
	 */
    business_criticality: INumberGlideElement;
	/**
	 * Calendar integration
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is integer
	 */
    calendar_integration: INumberGlideElement;
	/**
	 * City
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    city: IStringGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Cost center
	 * @type {GlideReferenceElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Cost Center (IGlideRefElement<Icmn_cost_centerGlideRecord>)
	 */
    cost_center: GlideReferenceElement;
	/**
	 * Country code
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    country: IStringGlideElement;
	/**
	 * Date format
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    date_format: IStringGlideElement;
	/**
	 * Default perspective
	 * @type {GlideReferenceElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Menu List (IGlideRefElement<Isys_perspectiveGlideRecord>)
	 */
    default_perspective: GlideReferenceElement;
	/**
	 * Department
	 * @type {Icmn_departmentGlideElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Department (IGlideRefElement<Icmn_departmentGlideRecord>)
	 */
    department: Icmn_departmentGlideElement;
	/**
	 * EDU Status
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    edu_status: IStringGlideElement;
	/**
	 * Email
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is email
	 */
    email: IStringGlideElement;
	/**
	 * Employee number
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    employee_number: IStringGlideElement;
	/**
	 * Enable Multifactor Authentication
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    enable_multifactor_authn: IBooleanGlideElement;
	/**
	 * Failed login attempts
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is integer
	 */
    failed_attempts: INumberGlideElement;
	/**
	 * First name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    first_name: IStringGlideElement;
	/**
	 * Gender
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    gender: IStringGlideElement;
	/**
	 * Geolocation tracked
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    geolocation_tracked: IBooleanGlideElement;
	/**
	 * Home phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is ph_number
	 */
    home_phone: IStringGlideElement;
	/**
	 * Internal Integration User
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    internal_integration_user: IBooleanGlideElement;
	/**
	 * Prefix
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    introduction: IStringGlideElement;
	/**
	 * Last login
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is glide_date
	 */
    last_login: IStringGlideElement;
	/**
	 * Last login device
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    last_login_device: IStringGlideElement;
	/**
	 * Last login time
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is glide_date_time
	 */
    last_login_time: IStringGlideElement;
	/**
	 * Last name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    last_name: IStringGlideElement;
	/**
	 * Last password
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    last_password: IStringGlideElement;
	/**
	 * Last position update
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is glide_date_time
	 */
    last_position_update: IStringGlideElement;
	/**
	 * Latitude
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is float
	 */
    latitude: INumberGlideElement;
	/**
	 * LDAP server
	 * @type {GlideReferenceElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to LDAP Server (IGlideRefElement<Ildap_server_configGlideRecord>)
	 */
    ldap_server: GlideReferenceElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Locked out
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    locked_out: IBooleanGlideElement;
	/**
	 * Longitude
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is float
	 */
    longitude: INumberGlideElement;
	/**
	 * Manager
	 * @type {Isys_userGlideElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    manager: Isys_userGlideElement;
	/**
	 * Middle name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    middle_name: IStringGlideElement;
	/**
	 * Mobile phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is ph_number
	 */
    mobile_phone: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    name: IStringGlideElement;
	/**
	 * Notification
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is integer
	 */
    notification: INumberGlideElement;
	/**
	 * On schedule
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is choice
	 */
    on_schedule: GlideElement;
	/**
	 * Password needs reset
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    password_needs_reset: IBooleanGlideElement;
	/**
	 * Black phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is ph_number
	 */
    phone: IStringGlideElement;
	/**
	 * Photo
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is user_image
	 */
    photo: GlideElement;
	/**
	 * Language
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    preferred_language: IStringGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is user_roles
	 */
    roles: GlideElement;
	/**
	 * Schedule
	 * @type {Icmn_scheduleGlideElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Schedule (IGlideRefElement<Icmn_scheduleGlideRecord>)
	 */
    schedule: Icmn_scheduleGlideElement;
	/**
	 * Source
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    source: IStringGlideElement;
	/**
	 * State / Province
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    state: IStringGlideElement;
	/**
	 * Street
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is multi_two_lines
	 */
    street: GlideElement;
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is sys_class_name
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is domain_id
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is domain_path
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Time format
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    time_format: IStringGlideElement;
	/**
	 * Time sheet policy
	 * @type {GlideReferenceElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Time Sheet Policy (IGlideRefElement<Itime_sheet_policyGlideRecord>)
	 */
    time_sheet_policy: GlideReferenceElement;
	/**
	 * Time zone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    time_zone: IStringGlideElement;
	/**
	 * Title
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    title: IStringGlideElement;
	/**
	 * User ID
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    user_name: IStringGlideElement;
	/**
	 * Password
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is password
	 */
    user_password: GlideElement;
	/**
	 * Grey Phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    u_grey_phone: IStringGlideElement;
	/**
	 * Rank
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    u_rank: IStringGlideElement;
	/**
	 * Red Phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    u_red_phone: IStringGlideElement;
	/**
	 * VIP
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    vip: IBooleanGlideElement;
	/**
	 * Web service access only
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    web_service_access_only: IBooleanGlideElement;
	/**
	 * Zip / Postal code
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    zip: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the sys_user table.
 * @interface Isys_userGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Isys_userGlideRecord extends IGlideRecord {
	/**
	 * Accumulated roles
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    accumulated_roles: IStringGlideElement;
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    active: IBooleanGlideElement;
	/**
	 * Work agent status
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is choice
	 */
    agent_status: GlideElement;
	/**
	 * Average Daily FTE Hours/Hours Per Person Day
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is decimal
	 */
    average_daily_fte: INumberGlideElement;
	/**
	 * Building
	 * @type {Icmn_buildingGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Building (IGlideRefElement<Icmn_buildingGlideRecord>)
	 */
    building: Icmn_buildingGlideElement;
	/**
	 * Business impact
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is integer
	 */
    business_criticality: INumberGlideElement;
	/**
	 * Calendar integration
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is integer
	 */
    calendar_integration: INumberGlideElement;
	/**
	 * City
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    city: IStringGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Cost center
	 * @type {GlideReferenceElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Cost Center (IGlideRefElement<Icmn_cost_centerGlideRecord>)
	 */
    cost_center: GlideReferenceElement;
	/**
	 * Country code
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    country: IStringGlideElement;
	/**
	 * Date format
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    date_format: IStringGlideElement;
	/**
	 * Default perspective
	 * @type {GlideReferenceElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Menu List (IGlideRefElement<Isys_perspectiveGlideRecord>)
	 */
    default_perspective: GlideReferenceElement;
	/**
	 * Department
	 * @type {Icmn_departmentGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Department (IGlideRefElement<Icmn_departmentGlideRecord>)
	 */
    department: Icmn_departmentGlideElement;
	/**
	 * EDU Status
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    edu_status: IStringGlideElement;
	/**
	 * Email
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is email
	 */
    email: IStringGlideElement;
	/**
	 * Employee number
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    employee_number: IStringGlideElement;
	/**
	 * Enable Multifactor Authentication
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    enable_multifactor_authn: IBooleanGlideElement;
	/**
	 * Failed login attempts
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is integer
	 */
    failed_attempts: INumberGlideElement;
	/**
	 * First name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    first_name: IStringGlideElement;
	/**
	 * Gender
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    gender: IStringGlideElement;
	/**
	 * Geolocation tracked
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    geolocation_tracked: IBooleanGlideElement;
	/**
	 * Home phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is ph_number
	 */
    home_phone: IStringGlideElement;
	/**
	 * Internal Integration User
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    internal_integration_user: IBooleanGlideElement;
	/**
	 * Prefix
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    introduction: IStringGlideElement;
	/**
	 * Last login
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is glide_date
	 */
    last_login: IStringGlideElement;
	/**
	 * Last login device
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    last_login_device: IStringGlideElement;
	/**
	 * Last login time
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is glide_date_time
	 */
    last_login_time: IStringGlideElement;
	/**
	 * Last name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    last_name: IStringGlideElement;
	/**
	 * Last password
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    last_password: IStringGlideElement;
	/**
	 * Last position update
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is glide_date_time
	 */
    last_position_update: IStringGlideElement;
	/**
	 * Latitude
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is float
	 */
    latitude: INumberGlideElement;
	/**
	 * LDAP server
	 * @type {GlideReferenceElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to LDAP Server (IGlideRefElement<Ildap_server_configGlideRecord>)
	 */
    ldap_server: GlideReferenceElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Locked out
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    locked_out: IBooleanGlideElement;
	/**
	 * Longitude
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is float
	 */
    longitude: INumberGlideElement;
	/**
	 * Manager
	 * @type {Isys_userGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    manager: Isys_userGlideElement;
	/**
	 * Middle name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    middle_name: IStringGlideElement;
	/**
	 * Mobile phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is ph_number
	 */
    mobile_phone: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Notification
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is integer
	 */
    notification: INumberGlideElement;
	/**
	 * On schedule
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is choice
	 */
    on_schedule: GlideElement;
	/**
	 * Password needs reset
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    password_needs_reset: IBooleanGlideElement;
	/**
	 * Black phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is ph_number
	 */
    phone: IStringGlideElement;
	/**
	 * Photo
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is user_image
	 */
    photo: GlideElement;
	/**
	 * Language
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    preferred_language: IStringGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is user_roles
	 */
    roles: GlideElement;
	/**
	 * Schedule
	 * @type {Icmn_scheduleGlideElement>}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Schedule (IGlideRefElement<Icmn_scheduleGlideRecord>)
	 */
    schedule: Icmn_scheduleGlideElement;
	/**
	 * Source
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    source: IStringGlideElement;
	/**
	 * State / Province
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    state: IStringGlideElement;
	/**
	 * Street
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is multi_two_lines
	 */
    street: GlideElement;
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is sys_class_name
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is domain_id
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is domain_path
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Time format
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    time_format: IStringGlideElement;
	/**
	 * Time sheet policy
	 * @type {GlideReferenceElement>}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Time Sheet Policy (IGlideRefElement<Itime_sheet_policyGlideRecord>)
	 */
    time_sheet_policy: GlideReferenceElement;
	/**
	 * Time zone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    time_zone: IStringGlideElement;
	/**
	 * Title
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    title: IStringGlideElement;
	/**
	 * User ID
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    user_name: IStringGlideElement;
	/**
	 * Password
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is password
	 */
    user_password: GlideElement;
	/**
	 * Grey Phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    u_grey_phone: IStringGlideElement;
	/**
	 * Rank
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    u_rank: IStringGlideElement;
	/**
	 * Red Phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    u_red_phone: IStringGlideElement;
	/**
	 * VIP
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    vip: IBooleanGlideElement;
	/**
	 * Web service access only
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    web_service_access_only: IBooleanGlideElement;
	/**
	 * Zip / Postal code
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    zip: IStringGlideElement;
}

declare interface Isys_user_groupGlideElement extends IGlideRefElement<Isys_user_groupGlideRecord> {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    active: IBooleanGlideElement;
	/**
	 * Average Daily FTE Hours/Hours Per Person Day
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "decimal"
	 */
    average_daily_fte: IStringGlideElement;
	/**
	 * Cost center
	 * @type {GlideReferenceElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Reference to Cost Center (IGlideRefElement<Icmn_cost_centerGlideRecord>)
	 */
    cost_center: GlideReferenceElement;
	/**
	 * Default assignee
	 * @type {Isys_userGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    default_assignee: Isys_userGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    description: IStringGlideElement;
	/**
	 * Group email
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "email"
	 */
    email: IStringGlideElement;
	/**
	 * Exclude manager
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    exclude_manager: IBooleanGlideElement;
	/**
	 * Hourly rate
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "currency"
	 */
    hourly_rate: IStringGlideElement;
	/**
	 * Include members
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    include_members: IBooleanGlideElement;
	/**
	 * Manager
	 * @type {Isys_userGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    manager: Isys_userGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Isys_user_groupGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    parent: Isys_user_groupGlideElement;
	/**
	 * Points
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "integer"
	 */
    points: IStringGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "user_roles"
	 */
    roles: GlideElement;
	/**
	 * Source
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    source: IStringGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Type
	 * @type {GlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "glide_list"
	 */
    type: GlideElement;
	/**
	 * Vendors
	 * @type {GlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "glide_list"
	 */
    vendors: GlideElement;
}

/**
 * GlideRecord that contains values from a record in the Group table.
 * @interface Isys_user_groupGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Isys_user_groupGlideRecord extends IGlideRecord {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    active: IBooleanGlideElement;
	/**
	 * Average Daily FTE Hours/Hours Per Person Day
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "decimal"
	 */
    average_daily_fte: IStringGlideElement;
	/**
	 * Cost center
	 * @type {GlideReferenceElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Reference to Cost Center (IGlideRefElement<Icmn_cost_centerGlideRecord>)
	 */
    cost_center: GlideReferenceElement;
	/**
	 * Default assignee
	 * @type {Isys_userGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    default_assignee: Isys_userGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    description: IStringGlideElement;
	/**
	 * Group email
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "email"
	 */
    email: IStringGlideElement;
	/**
	 * Exclude manager
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    exclude_manager: IBooleanGlideElement;
	/**
	 * Hourly rate
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "currency"
	 */
    hourly_rate: IStringGlideElement;
	/**
	 * Include members
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    include_members: IBooleanGlideElement;
	/**
	 * Manager
	 * @type {Isys_userGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    manager: Isys_userGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Isys_user_groupGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    parent: Isys_user_groupGlideElement;
	/**
	 * Points
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "integer"
	 */
    points: IStringGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "user_roles"
	 */
    roles: GlideElement;
	/**
	 * Source
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    source: IStringGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Type
	 * @type {GlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "glide_list"
	 */
    type: GlideElement;
	/**
	 * Vendors
	 * @type {GlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "glide_list"
	 */
    vendors: GlideElement;
}
