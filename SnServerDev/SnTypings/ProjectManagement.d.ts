/**
 * GlideElement values from the Portfolio table.
 * @interface Ipm_portfolioFields
 */
declare interface Ipm_portfolioFields {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Ipm_portfolioFields
	 */
    active: IBooleanGlideElement;
	/**
	 * Category
	 * @type {IStringBasedGlideElement<("ttb" | "gtb" | "rtb")>}
	 * @memberof Ipm_portfolioFields
	 * @description "ttb"="Transform business"; "gtb"="Grow business"; "rtb"="Run business"
	 */
    category: IStringBasedGlideElement<("ttb" | "gtb" | "rtb")>;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Ipm_portfolioFields
	 */
    description: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Ipm_portfolioFields
	 */
    name: IStringGlideElement;
	/**
	 * Portfolio manager
	 * @type {Isys_userGlideElement}
	 * @memberof Ipm_portfolioFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    portfolio_manager: Isys_userGlideElement;
	/**
	 * Portfolio planning
	 * @type {IStringBasedGlideElement<("advanced" | "simple")>}
	 * @memberof Ipm_portfolioFields
	 * @description "advanced"="Advanced"; "simple"="Simple"
	 */
    portfolio_planning: IStringBasedGlideElement<("advanced" | "simple")>;
	/**
	 * State
	 * @type {IStringBasedGlideElement<("define" | "analyse" | "approve" | "charter")>}
	 * @memberof Ipm_portfolioFields
	 * @description "define"="Define"; "analyse"="Analyze"; "approve"="Approve"; "charter"="Charter"
	 */
    state: IStringBasedGlideElement<("define" | "analyse" | "approve" | "charter")>;
	/**
	 * Task type
	 * @type {GlideElement}
	 * @memberof Ipm_portfolioFields
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Ipm_portfolioFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Ipm_portfolioFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Ipm_portfolioFields
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Ipm_portfolioFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Ipm_portfolioFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Ipm_portfolioFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Ipm_portfolioFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
}
declare interface Ipm_portfolioGlideRecord extends IGlideRecord, Ipm_portfolioFields { }
declare interface Ipm_portfolioGlideElement extends IGlideRefElement<Ipm_portfolioGlideRecord>, Ipm_portfolioFields { }

/**
 * GlideElement values from the Program table.
 * @interface Ipm_programFields
 * @extends {Iplanned_taskFields}
 */
declare interface Ipm_programFields extends Iplanned_taskFields {
	/**
	 * Cost Status
	 * @type {IStringBasedGlideElement<("green" | "yellow" | "red")>}
	 * @memberof Ipm_programFields
	 * @description "green"="Green"; "yellow"="Yellow"; "red"="Red"
	 */
    cost_status: IStringBasedGlideElement<("green" | "yellow" | "red")>;
	/**
	 * Goals
	 * @type {GlideElement}
	 * @memberof Ipm_programFields
	 * @description Internal type is "glide_list"
	 */
    goals: GlideElement;
	/**
	 * Planned returns
	 * @type {INumberGlideElement}
	 * @memberof Ipm_programFields
	 * @description Internal type is currency
	 */
    planned_return: INumberGlideElement;
	/**
	 * Portfolio
	 * @type {Ipm_portfolioGlideElement}
	 * @memberof Ipm_programFields
	 * @description Reference to Portfolio (IGlideRefElement<Ipm_portfolioGlideRecord>)
	 */
    portfolio: Ipm_portfolioGlideElement;
	/**
	 * Program manager
	 * @type {Isys_userGlideElement}
	 * @memberof Ipm_programFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    program_manager: Isys_userGlideElement;
	/**
	 * Project/Demand Portfolios
	 * @type {GlideElement}
	 * @memberof Ipm_programFields
	 * @description Internal type is "glide_list"
	 */
    related_portfolios: GlideElement;
	/**
	 * Resource Status
	 * @type {IStringBasedGlideElement<("green" | "yellow" | "red")>}
	 * @memberof Ipm_programFields
	 * @description "green"="Green"; "yellow"="Yellow"; "red"="Red"
	 */
    resource_status: IStringBasedGlideElement<("green" | "yellow" | "red")>;
	/**
	 * Risk
	 * @type {IStringBasedGlideElement<("critical" | "high" | "moderate" | "low" | "planning")>}
	 * @memberof Ipm_programFields
	 * @description "critical"="Critical"; "high"="High"; "moderate"="Moderate"; "low"="Low"; "planning"="Planning"
	 */
    risk: IStringBasedGlideElement<("critical" | "high" | "moderate" | "low" | "planning")>;
	/**
	 * Planned ROI %
	 * @type {INumberGlideElement}
	 * @memberof Ipm_programFields
	 * @description Internal type is decimal
	 */
    roi: INumberGlideElement;
	/**
	 * Schedule Status
	 * @type {IStringBasedGlideElement<("green" | "yellow" | "red")>}
	 * @memberof Ipm_programFields
	 * @description "green"="Green"; "yellow"="Yellow"; "red"="Red"
	 */
    schedule_status: IStringBasedGlideElement<("green" | "yellow" | "red")>;
	/**
	 * Scope Status
	 * @type {IStringBasedGlideElement<("green" | "yellow" | "red")>}
	 * @memberof Ipm_programFields
	 * @description "green"="Green"; "yellow"="Yellow"; "red"="Red"
	 */
    scope_status: IStringBasedGlideElement<("green" | "yellow" | "red")>;
	/**
	 * Score
	 * @type {INumberGlideElement}
	 * @memberof Ipm_programFields
	 * @description Internal type is decimal
	 */
    score: INumberGlideElement;
	/**
	 * Risk
	 * @type {INumberGlideElement}
	 * @memberof Ipm_programFields
	 * @description Internal type is decimal
	 */
    score_risk: INumberGlideElement;
	/**
	 * Size
	 * @type {INumberGlideElement}
	 * @memberof Ipm_programFields
	 * @description Internal type is decimal
	 */
    score_size: INumberGlideElement;
	/**
	 * Value
	 * @type {INumberGlideElement}
	 * @memberof Ipm_programFields
	 * @description Internal type is decimal
	 */
    score_value: INumberGlideElement;
	/**
	 * Strategies
	 * @type {GlideElement}
	 * @memberof Ipm_programFields
	 * @description Internal type is "glide_list"
	 */
    strategic_objectives: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Ipm_programFields
	 */
    sys_id: IGUIDGlideElement;
}
declare interface Ipm_programGlideRecord extends Iplanned_taskGlideRecord, Ipm_programFields { }
declare interface Ipm_programGlideElement extends Iplanned_taskGlideElementBase<Ipm_programGlideRecord>, Ipm_programFields { }

/**
 * GlideElement values from the Goal table.
 * @interface IgoalFields
 */
declare interface IgoalFields {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof IgoalFields
	 */
    active: IBooleanGlideElement;
	/**
	 * Actual achievement till date
	 * @type {INumberGlideElement}
	 * @memberof IgoalFields
	 * @description Internal type is float
	 */
    actual_achievement_till_date: INumberGlideElement;
	/**
	 * Comments
	 * @type {IStringGlideElement}
	 * @memberof IgoalFields
	 */
    comments: IStringGlideElement;
	/**
	 * Direction
	 * @type {IStringBasedGlideElement<("increase" | "decrease")>}
	 * @memberof IgoalFields
	 * @description Internal type is choice; "increase"="Maximize"; "decrease"="Minimize"
	 */
    direction: IStringBasedGlideElement<("increase" | "decrease")>;
	/**
	 * Planned achievement
	 * @type {INumberGlideElement}
	 * @memberof IgoalFields
	 * @description Internal type is float
	 */
    estimated_achievement: INumberGlideElement;
	/**
	 * Goal Indicator
	 * @type {IStringGlideElement}
	 * @memberof IgoalFields
	 */
    goal_indicator: IStringGlideElement;
	/**
	 * Owner
	 * @type {Isys_userGlideElement}
	 * @memberof IgoalFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    goal_owner: Isys_userGlideElement;
	/**
	 * Portfolio
	 * @type {Ipm_portfolioGlideElement}
	 * @memberof IgoalFields
	 * @description Reference to Portfolio (IGlideRefElement<Ipm_portfolioGlideRecord>)
	 */
    portfolio: Ipm_portfolioGlideElement;
	/**
	 * Short description
	 * @type {IStringGlideElement}
	 * @memberof IgoalFields
	 */
    short_description: IStringGlideElement;
	/**
	 * State
	 * @type {IStringBasedGlideElement<("pending" | "achieved" | "not_achieved")>}
	 * @memberof IgoalFields
	 * @description "pending"="Pending"; "achieved"="Achieved"; "not_achieved"="Not Achieved"
	 */
    state: IStringBasedGlideElement<("pending" | "achieved" | "not_achieved")>;
	/**
	 * Status indicator
	 * @type {IStringBasedGlideElement<("red" | "yellow" | "green")>}
	 * @memberof IgoalFields
	 * @description Internal type is choice; "red"="Red"; "yellow"="Yellow"; "green"="Green"
	 */
    status_indicator: IStringBasedGlideElement<("red" | "yellow" | "green")>;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof IgoalFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof IgoalFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof IgoalFields
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof IgoalFields
	 * @description Internal type is "domain_path"
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof IgoalFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof IgoalFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof IgoalFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof IgoalFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Target
	 * @type {INumberGlideElement}
	 * @memberof IgoalFields
	 * @description Internal type is float
	 */
    target_value: INumberGlideElement;
	/**
	 * Task
	 * @type {ItaskGlideElement}
	 * @memberof IgoalFields
	 * @description Reference to Task (IGlideRefElement<ItaskGlideRecord>)
	 */
    task: ItaskGlideElement;
	/**
	 * Unit
	 * @type {GlideReferenceElement}
	 * @memberof IgoalFields
	 * @description Reference to Unit (IGlideRefElement<Ipa_unitsGlideRecord>)
	 */
    unit: GlideReferenceElement;
}
declare interface IgoalGlideRecord extends IGlideRecord, IgoalFields { }
declare interface IgoalGlideElement extends IGlideRefElement<IgoalGlideRecord>, IgoalFields { }

/**
 * GlideElement values from the Project Task table.
 * @interface Ipm_project_taskFields
 * @extends {Iplanned_taskFields}
 */
declare interface Ipm_project_taskFields extends Iplanned_taskFields {
	/**
	 * Rollup dates from stories
	 * @type {IBooleanGlideElement}
	 * @memberof Ipm_project_taskFields
	 */
    agile_rollup_dates: IBooleanGlideElement;
	/**
	 * End Sprint
	 * @type {GlideReferenceElement}
	 * @memberof Ipm_project_taskFields
	 * @description Reference to Sprint (IGlideRefElement<Irm_sprintGlideRecord>)
	 */
    end_sprint: GlideReferenceElement;
	/**
	 * Link
	 * @type {IBooleanGlideElement}
	 * @memberof Ipm_project_taskFields
	 */
    link: IBooleanGlideElement;
	/**
	 * Project
	 * @type {GlideElement}
	 * @memberof Ipm_project_taskFields
	 * @description Internal type is "composite_field"
	 */
    project: GlideElement;
	/**
	 * Team
	 * @type {GlideReferenceElement}
	 * @memberof Ipm_project_taskFields
	 * @description Reference to Team (IGlideRefElement<Iscrum_pp_teamGlideRecord>)
	 */
    scrum_team: GlideReferenceElement;
	/**
	 * Start Sprint
	 * @type {GlideReferenceElement}
	 * @memberof Ipm_project_taskFields
	 * @description Reference to Sprint (IGlideRefElement<Irm_sprintGlideRecord>)
	 */
    start_sprint: GlideReferenceElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Ipm_project_taskFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Test plan
	 * @type {Itm_test_planGlideElement}
	 * @memberof Ipm_project_taskFields
	 * @description Reference to Test Plan (IGlideRefElement<Itm_test_planGlideRecord>)
	 */
    test_plan: Itm_test_planGlideElement;
}
declare interface Ipm_project_taskGlideRecord extends Iplanned_taskGlideRecord, Ipm_project_taskFields { }
declare interface Ipm_project_taskGlideElement extends Iplanned_taskGlideElementBase<Ipm_project_taskGlideRecord>, Ipm_project_taskFields { }

/**
 * GlideElement values from the Project table.
 * @interface Ipm_projectFields
 * @extends {Iplanned_taskFields}
 */
declare interface Ipm_projectFields extends Iplanned_taskFields {
	/**
	 * Assumptions
	 * @type {IStringGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is html
	 */
    assumptions: IStringGlideElement;
	/**
	 * Backlog
	 * @type {GlideReferenceElement}
	 * @memberof Ipm_projectFields
	 * @description Reference to Personal backlog (IGlideRefElement<Ibacklog_definitionGlideRecord>)
	 */
    backlog_definition: GlideReferenceElement;
	/**
	 * Barriers
	 * @type {IStringGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is html
	 */
    barriers: IStringGlideElement;
	/**
	 * Business Applications
	 * @type {GlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is "glide_list"
	 */
    business_applications: GlideElement;
	/**
	 * Business Capabilities
	 * @type {GlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is "glide_list"
	 */
    business_capabilities: GlideElement;
	/**
	 * Business case
	 * @type {IStringGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is html
	 */
    business_case: IStringGlideElement;
	/**
	 * Business Unit
	 * @type {Ibusiness_unitGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Reference to Business Unit (IGlideRefElement<Ibusiness_unitGlideRecord>)
	 */
    business_unit: Ibusiness_unitGlideElement;
	/**
	 * Operating Estimate at completion
	 * @type {INumberGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is currency
	 */
    capex_forecast_cost: INumberGlideElement;
	/**
	 * Demand
	 * @type {GlideReferenceElement}
	 * @memberof Ipm_projectFields
	 * @description Reference to Demand (IGlideRefElement<Idmn_demandGlideRecord>)
	 */
    demand: GlideReferenceElement;
	/**
	 * Department
	 * @type {Icmn_departmentGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Reference to Department (IGlideRefElement<Icmn_departmentGlideRecord>)
	 */
    department: Icmn_departmentGlideElement;
	/**
	 * Discount Rate %
	 * @type {INumberGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is decimal
	 */
    discount_rate: INumberGlideElement;
	/**
	 * Enablers
	 * @type {IStringGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is html
	 */
    enablers: IStringGlideElement;
	/**
	 * Execution type
	 * @type {IStringBasedGlideElement<("waterfall" | "agile" | "hybrid")>}
	 * @memberof Ipm_projectFields
	 * @description "waterfall"="Waterfall"; "agile"="Agile"; "hybrid"="Hybrid"
	 */
    execution_type: IStringBasedGlideElement<("waterfall" | "agile" | "hybrid")>;
	/**
	 * Estimate at completion
	 * @type {INumberGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is currency
	 */
    forecast_cost: INumberGlideElement;
	/**
	 * Goal
	 * @type {IgoalGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Reference to Goal (IGlideRefElement<IgoalGlideRecord>)
	 */
    goal: IgoalGlideElement;
	/**
	 * Goals
	 * @type {GlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is "glide_list"
	 */
    goals: GlideElement;
	/**
	 * Impacted Business Units
	 * @type {GlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is "glide_list"
	 */
    impacted_business_units: GlideElement;
	/**
	 * Investment Class
	 * @type {IStringBasedGlideElement<("run" | "change")>}
	 * @memberof Ipm_projectFields
	 * @description "run"="Run"; "change"="Change"
	 */
    investment_class: IStringBasedGlideElement<("run" | "change")>;
	/**
	 * Investment Type
	 * @type {IStringBasedGlideElement<("cost_reduction" | "end_user_experience" | "legal_and_regulatory" | "revenue_generating" | "service_sustaining" | "strategic_enabler")>}
	 * @memberof Ipm_projectFields
	 * @description "cost_reduction"="Cost Reduction"; "end_user_experience"="End User Experience"; "legal_and_regulatory"="Legal and Regulatory"; "revenue_generating"="Revenue Generating"; "service_sustaining"="Service Sustaining"; "strategic_enabler"="Strategic Enabler"
	 */
    investment_type: IStringBasedGlideElement<("cost_reduction" | "end_user_experience" | "legal_and_regulatory" | "revenue_generating" | "service_sustaining" | "strategic_enabler")>;
	/**
	 * In scope
	 * @type {IStringGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is html
	 */
    in_scope: IStringGlideElement;
	/**
	 * Internal rate of return %
	 * @type {INumberGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is decimal
	 */
    irr_value: INumberGlideElement;
	/**
	 * Net present value
	 * @type {INumberGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is currency
	 */
    npv_value: INumberGlideElement;
	/**
	 * Capital Estimate at completion
	 * @type {INumberGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is currency
	 */
    opex_forecast_cost: INumberGlideElement;
	/**
	 * Out of scope
	 * @type {IStringGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is html
	 */
    out_of_scope: IStringGlideElement;
	/**
	 * Phase
	 * @type {IStringBasedGlideElement<("initiating" | "planning" | "executing" | "delivering" | "closing")>}
	 * @memberof Ipm_projectFields
	 * @description "initiating"="Initiating"; "planning"="Planning"; "executing"="Executing"; "delivering"="Delivering"; "closing"="Closing"
	 */
    phase: IStringBasedGlideElement<("initiating" | "planning" | "executing" | "delivering" | "closing")>;
	/**
	 * Portfolio
	 * @type {Ipm_portfolioGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Reference to Portfolio (IGlideRefElement<Ipm_portfolioGlideRecord>)
	 */
    primary_portfolio: Ipm_portfolioGlideElement;
	/**
	 * Program
	 * @type {Ipm_programGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Reference to Program (IGlideRefElement<Ipm_programGlideRecord>)
	 */
    primary_program: Ipm_programGlideElement;
	/**
	 * Project manager
	 * @type {Isys_userGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    project_manager: Isys_userGlideElement;
	/**
	 * Project schedule date format
	 * @type {IStringBasedGlideElement<("date_time" | "date")>}
	 * @memberof Ipm_projectFields
	 * @description "date_time"="Date and Time"; "date"="Date"
	 */
    project_schedule_date_format: IStringBasedGlideElement<("date_time" | "date")>;
	/**
	 * Project type
	 * @type {IStringBasedGlideElement<("regular" | "workbench")>}
	 * @memberof Ipm_projectFields
	 * @description "regular"="Regular"; "workbench"="Workbench"
	 */
    project_type: IStringBasedGlideElement<("regular" | "workbench")>;
	/**
	 * Derive assignee list from resource plan
	 * @type {IBooleanGlideElement}
	 * @memberof Ipm_projectFields
	 */
    resources_from_resource_plan: IBooleanGlideElement;
	/**
	 * Risk
	 * @type {IStringBasedGlideElement<("critical" | "high" | "moderate" | "low" | "planning")>}
	 * @memberof Ipm_projectFields
	 * @description "critical"="Critical"; "high"="High"; "moderate"="Moderate"; "low"="Low"; "planning"="Planning"
	 */
    risk: IStringBasedGlideElement<("critical" | "high" | "moderate" | "low" | "planning")>;
	/**
	 * Risk cost
	 * @type {INumberGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is currency
	 */
    risk_cost: INumberGlideElement;
	/**
	 * Risk of not performing
	 * @type {IStringGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is html
	 */
    risk_of_not_performing: IStringGlideElement;
	/**
	 * Risk of performing
	 * @type {IStringGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is html
	 */
    risk_of_performing: IStringGlideElement;
	/**
	 * Planned ROI %
	 * @type {INumberGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is decimal
	 */
    roi: INumberGlideElement;
	/**
	 * Schedule
	 * @type {Icmn_scheduleGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Reference to Schedule (IGlideRefElement<Icmn_scheduleGlideRecord>)
	 */
    schedule: Icmn_scheduleGlideElement;
	/**
	 * Score
	 * @type {INumberGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is decimal
	 */
    score: INumberGlideElement;
	/**
	 * Risk Score
	 * @type {INumberGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is decimal
	 */
    score_risk: INumberGlideElement;
	/**
	 * Size Score
	 * @type {INumberGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is decimal
	 */
    score_size: INumberGlideElement;
	/**
	 * Value Score
	 * @type {INumberGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is decimal
	 */
    score_value: INumberGlideElement;
	/**
	 * Strategies
	 * @type {GlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is "glide_list"
	 */
    strategic_objectives: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Ipm_projectFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Allow time card reporting on
	 * @type {IStringBasedGlideElement<("project" | "project_task" | "project_project_task" | "no_time_card")>}
	 * @memberof Ipm_projectFields
	 * @description "project"="Project only"; "project_task"="Project tasks only"; "project_project_task"="Project and project tasks"; "no_time_card"="No time reporting"
	 */
    time_card_preference: IStringBasedGlideElement<("project" | "project_task" | "project_project_task" | "no_time_card")>;
	/**
	 * Derive time component from planned dates
	 * @type {IBooleanGlideElement}
	 * @memberof Ipm_projectFields
	 */
    time_component_from_planned: IBooleanGlideElement;
	/**
	 * Title
	 * @type {IStringGlideElement}
	 * @memberof Ipm_projectFields
	 */
    title: IStringGlideElement;
	/**
	 * Update actual effort from time card
	 * @type {IStringBasedGlideElement<("yes" | "no")>}
	 * @memberof Ipm_projectFields
	 * @description "yes"="Yes"; "no"="No"
	 */
    update_actual_effort_from_time_card: IStringBasedGlideElement<("yes" | "no")>;
	/**
	 * Recalculate score on project change
	 * @type {IStringBasedGlideElement<("yes" | "no")>}
	 * @memberof Ipm_projectFields
	 * @description "yes"="Yes"; "no"="No"
	 */
    update_score_on_value_change: IStringBasedGlideElement<("yes" | "no")>;
	/**
	 * Planned return
	 * @type {INumberGlideElement}
	 * @memberof Ipm_projectFields
	 * @description Internal type is currency
	 */
    value: INumberGlideElement;
}
declare interface Ipm_projectGlideRecord extends Iplanned_taskGlideRecord, Ipm_projectFields { }
declare interface Ipm_projectGlideElement extends Iplanned_taskGlideElementBase<Ipm_projectGlideRecord>, Ipm_projectFields { }
