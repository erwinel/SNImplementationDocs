/**
 * GlideElement values from the Planned Task table.
 * @interface Iplanned_taskFields
 * @extends {ItaskFields}
 */
declare interface Iplanned_taskFields extends ItaskFields {
	/**
	 * Allow dates outside schedule
	 * @type {IBooleanGlideElement}
	 * @memberof Iplanned_taskFields
	 */
    allow_dates_outside_schedule: IBooleanGlideElement;
	/**
	 * Planned benefit
	 * @type {INumberGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is currency
	 */
    benefits: INumberGlideElement;
	/**
	 * Budget cost
	 * @type {INumberGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is currency
	 */
    budget_cost: INumberGlideElement;
	/**
	 * Calculation
	 * @type {IStringBasedGlideElement<("automatic" | "manual")>}
	 * @memberof Iplanned_taskFields
	 * @description "automatic"="Automatic"; "manual"="Manual"
	 */
    calculation_type: IStringBasedGlideElement<("automatic" | "manual")>;
	/**
	 * Planned Capital
	 * @type {INumberGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is currency
	 */
    capex_cost: INumberGlideElement;
	/**
	 * Total Planned cost
	 * @type {INumberGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is currency
	 */
    cost: INumberGlideElement;
	/**
	 * Critical path
	 * @type {IBooleanGlideElement}
	 * @memberof Iplanned_taskFields
	 */
    critical_path: IBooleanGlideElement;
	/**
	 * Dependency
	 * @type {GlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is "decoration"
	 */
    dependency: GlideElement;
	/**
	 * Planned duration
	 * @type {IStringGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is glide_duration
	 */
    duration: IStringGlideElement;
	/**
	 * Planned effort
	 * @type {IStringGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is glide_duration
	 */
    effort: IStringGlideElement;
	/**
	 * Planned end date
	 * @type {IStringGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is glide_date_time
	 */
    end_date: IStringGlideElement;
	/**
	 * End date derived from
	 * @type {Iplanned_taskGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Reference to Planned Task (IGlideRefElement<Iplanned_taskGlideRecord>)
	 */
    end_date_derived_from: Iplanned_taskGlideElement;
	/**
	 * HTML description
	 * @type {IStringGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is html
	 */
    html_description: IStringGlideElement;
	/**
	 * Key milestone
	 * @type {IBooleanGlideElement}
	 * @memberof Iplanned_taskFields
	 */
    key_milestone: IBooleanGlideElement;
	/**
	 * Level
	 * @type {INumberGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is integer
	 */
    level: INumberGlideElement;
	/**
	 * Milestone
	 * @type {IBooleanGlideElement}
	 * @memberof Iplanned_taskFields
	 */
    milestone: IBooleanGlideElement;
	/**
	 * MPP task id
	 * @type {INumberGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is integer
	 */
    mpp_task_id: INumberGlideElement;
	/**
	 * Planned Operating
	 * @type {INumberGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is currency
	 */
    opex_cost: INumberGlideElement;
	/**
	 * Orig sys ID
	 * @type {Iplanned_taskGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Reference to Planned Task (IGlideRefElement<Iplanned_taskGlideRecord>)
	 */
    orig_sys_id: Iplanned_taskGlideElement;
	/**
	 * Orig top task ID
	 * @type {Iplanned_taskGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Reference to Planned Task (IGlideRefElement<Iplanned_taskGlideRecord>)
	 */
    orig_top_task_id: Iplanned_taskGlideElement;
	/**
	 * Percent complete
	 * @type {GlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is "percent_complete"
	 */
    percent_complete: GlideElement;
	/**
	 * Phase type
	 * @type {IStringBasedGlideElement<("waterfall" | "agile" | "test")>}
	 * @memberof Iplanned_taskFields
	 * @description "waterfall"="Waterfall"; "agile"="Agile"; "test"="Test"
	 */
    phase_type: IStringBasedGlideElement<("waterfall" | "agile" | "test")>;
	/**
	 * Relation applied
	 * @type {Iplanned_task_rel_planned_taskGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Reference to Planned Task Relationship (IGlideRefElement<Iplanned_task_rel_planned_taskGlideRecord>)
	 */
    relation_applied: Iplanned_task_rel_planned_taskGlideElement;
	/**
	 * Remaining duration
	 * @type {IStringGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is glide_duration
	 */
    remaining_duration: IStringGlideElement;
	/**
	 * Remaining effort
	 * @type {IStringGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is glide_duration
	 */
    remaining_effort: IStringGlideElement;
	/**
	 * Resource allocated cost
	 * @type {INumberGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is currency
	 */
    resource_allocated_cost: INumberGlideElement;
	/**
	 * Resource planned cost
	 * @type {INumberGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is currency
	 */
    resource_planned_cost: INumberGlideElement;
	/**
	 * Rollup
	 * @type {IBooleanGlideElement}
	 * @memberof Iplanned_taskFields
	 */
    rollup: IBooleanGlideElement;
	/**
	 * Original end date
	 * @type {IStringGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is glide_date_time
	 */
    schedule_end_date: IStringGlideElement;
	/**
	 * Original start date
	 * @type {IStringGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is glide_date_time
	 */
    schedule_start_date: IStringGlideElement;
	/**
	 * Shadow
	 * @type {IBooleanGlideElement}
	 * @memberof Iplanned_taskFields
	 */
    shadow: IBooleanGlideElement;
	/**
	 * Planned start date
	 * @type {IStringGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is glide_date_time
	 */
    start_date: IStringGlideElement;
	/**
	 * Start date derived from
	 * @type {Iplanned_taskGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Reference to Planned Task (IGlideRefElement<Iplanned_taskGlideRecord>)
	 */
    start_date_derived_from: Iplanned_taskGlideElement;
	/**
	 * Status
	 * @type {IStringBasedGlideElement<("green" | "yellow" | "red")>}
	 * @memberof Iplanned_taskFields
	 * @description "green"="Green"; "yellow"="Yellow"; "red"="Red"
	 */
    status: IStringBasedGlideElement<("green" | "yellow" | "red")>;
	/**
	 * Sub tree root
	 * @type {Iplanned_taskGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Reference to Planned Task (IGlideRefElement<Iplanned_taskGlideRecord>)
	 */
    sub_tree_root: Iplanned_taskGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Iplanned_taskFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Task
	 * @type {GlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is "composite_field"
	 */
    task: GlideElement;
	/**
	 * Generate time cards for top task only
	 * @type {IBooleanGlideElement}
	 * @memberof Iplanned_taskFields
	 */
    time_card_at_top_task: IBooleanGlideElement;
	/**
	 * Time constraint
	 * @type {IStringBasedGlideElement<("asap" | "start_on")>}
	 * @memberof Iplanned_taskFields
	 * @description "asap"="Start ASAP"; "start_on"="Start on specific date"
	 */
    time_constraint: IStringBasedGlideElement<("asap" | "start_on")>;
	/**
	 * Top portfolio
	 * @type {Ipm_portfolioGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Reference to Portfolio (IGlideRefElement<Ipm_portfolioGlideRecord>)
	 */
    top_portfolio: Ipm_portfolioGlideElement;
	/**
	 * Top program
	 * @type {Ipm_programGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Reference to Program (IGlideRefElement<Ipm_programGlideRecord>)
	 */
    top_program: Ipm_programGlideElement;
	/**
	 * Top task
	 * @type {Iplanned_taskGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Reference to Planned Task (IGlideRefElement<Iplanned_taskGlideRecord>)
	 */
    top_task: Iplanned_taskGlideElement;
	/**
	 * Version
	 * @type {INumberGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is integer
	 */
    version: INumberGlideElement;
	/**
	 * WBS
	 * @type {IStringGlideElement}
	 * @memberof Iplanned_taskFields
	 */
    wbs: IStringGlideElement;
	/**
	 * WBS Order
	 * @type {INumberGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is integer
	 */
    wbs_order: INumberGlideElement;
	/**
	 * Actual cost
	 * @type {INumberGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is currency
	 */
    work_cost: INumberGlideElement;
	/**
	 * Actual duration
	 * @type {IStringGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is glide_duration
	 */
    work_duration: IStringGlideElement;
	/**
	 * Actual effort
	 * @type {IStringGlideElement}
	 * @memberof Iplanned_taskFields
	 * @description Internal type is glide_duration
	 */
    work_effort: IStringGlideElement;
}
declare interface Iplanned_taskGlideRecord extends ItaskGlideRecordBase, Iplanned_taskFields { }
declare interface Iplanned_taskGlideElementBase<T extends Iplanned_taskGlideRecord> extends ItaskGlideElementBase<T> { }
declare interface Iplanned_taskGlideElement extends Iplanned_taskGlideElementBase<Iplanned_taskGlideRecord> { }


/**
 * GlideElement values from the Task Relationship Type table.
 * @interface Itask_rel_typeFields
 * @extends {Isys_metadataFields}
 */
declare interface Itask_rel_typeFields extends Isys_metadataFields {
	/**
	 * Child descriptor
	 * @type {IStringGlideElement}
	 * @memberof Itask_rel_typeFields
	 */
    child_descriptor: IStringGlideElement;
	/**
	 * Child script
	 * @type {IStringGlideElement}
	 * @memberof Itask_rel_typeFields
	 */
    child_script: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Itask_rel_typeFields
	 */
    name: IStringGlideElement;
	/**
	 * Parent descriptor
	 * @type {IStringGlideElement}
	 * @memberof Itask_rel_typeFields
	 */
    parent_descriptor: IStringGlideElement;
	/**
	 * Parent script
	 * @type {IStringGlideElement}
	 * @memberof Itask_rel_typeFields
	 */
    parent_script: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Itask_rel_typeFields
	 */
    sys_id: IGUIDGlideElement;
}
declare interface Itask_rel_typeGlideRecord extends Isys_metadataGlideRecordBase, Itask_rel_typeFields { }
declare interface Itask_rel_typeGlideElement extends Isys_metadataGlideElementBase<Itask_rel_typeGlideRecord>, Itask_rel_typeFields { }

/**
 * GlideElement values from the Task Relationship table.
 * @interface Itask_rel_taskFields
 */
declare interface Itask_rel_taskFields {
	/**
	 * Child
	 * @type {ItaskGlideElement}
	 * @memberof Itask_rel_taskFields
	 * @description Reference to Task (IGlideRefElement<ItaskGlideRecord>)
	 */
    child: ItaskGlideElement;
	/**
	 * Parent
	 * @type {ItaskGlideElement}
	 * @memberof Itask_rel_taskFields
	 * @description Reference to Task (IGlideRefElement<ItaskGlideRecord>)
	 */
    parent: ItaskGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Itask_rel_taskFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Itask_rel_taskFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Itask_rel_taskFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Itask_rel_taskFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Itask_rel_taskFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Itask_rel_taskFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Type
	 * @type {Itask_rel_typeGlideElement}
	 * @memberof Itask_rel_taskFields
	 * @description Reference to Task Relationship Type (IGlideRefElement<Itask_rel_typeGlideRecord>)
	 */
    type: Itask_rel_typeGlideElement;
}
declare interface Itask_rel_taskGlideRecord extends IGlideRecord, Itask_rel_taskFields { }
declare interface Itask_rel_taskGlideElementBase<T extends Itask_rel_taskGlideRecord> extends IGlideRefElement<T>, Itask_rel_taskFields { }
declare interface Itask_rel_taskGlideElement extends Itask_rel_taskGlideElementBase<Itask_rel_taskGlideRecord> { }

/**
 * GlideElement values from the Planned Task Relationship table.
 * @interface Iplanned_task_rel_planned_taskFields
 * @extends {Itask_rel_taskFields}
 */
declare interface Iplanned_task_rel_planned_taskFields extends Itask_rel_taskFields {
	/**
	 * Child top task
	 * @type {Iplanned_taskGlideElement}
	 * @memberof Iplanned_task_rel_planned_taskFields
	 * @description Reference to Planned Task (IGlideRefElement<Iplanned_taskGlideRecord>)
	 */
    child_top_task: Iplanned_taskGlideElement;
	/**
	 * External Relation
	 * @type {IBooleanGlideElement}
	 * @memberof Iplanned_task_rel_planned_taskFields
	 */
    external: IBooleanGlideElement;
	/**
	 * Inter Task Dependency Type
	 * @type {IStringBasedGlideElement<("hard" | "soft")>}
	 * @memberof Iplanned_task_rel_planned_taskFields
	 * @description "hard"="Hard"; "soft"="Soft"
	 */
    inter_task_dependency_type: IStringBasedGlideElement<("hard" | "soft")>;
	/**
	 * Lag
	 * @type {IStringGlideElement}
	 * @memberof Iplanned_task_rel_planned_taskFields
	 * @description Internal type is glide_duration
	 */
    lag: IStringGlideElement;
	/**
	 * External Relation Id
	 * @type {Iplanned_task_rel_planned_taskGlideElement}
	 * @memberof Iplanned_task_rel_planned_taskFields
	 * @description Reference to Planned Task Relationship (IGlideRefElement<Iplanned_task_rel_planned_taskGlideRecord>)
	 */
    orig_sys_id: Iplanned_task_rel_planned_taskGlideElement;
	/**
	 * Parent top task
	 * @type {Iplanned_taskGlideElement}
	 * @memberof Iplanned_task_rel_planned_taskFields
	 * @description Reference to Planned Task (IGlideRefElement<Iplanned_taskGlideRecord>)
	 */
    parent_top_task: Iplanned_taskGlideElement;
	/**
	 * Process Flag
	 * @type {IBooleanGlideElement}
	 * @memberof Iplanned_task_rel_planned_taskFields
	 */
    process_flag: IBooleanGlideElement;
	/**
	 * Sub Type
	 * @type {IStringBasedGlideElement<("fs" | "ss" | "ff" | "sf")>}
	 * @memberof Iplanned_task_rel_planned_taskFields
	 * @description "fs"="Finish to Start"; "ss"="Start to Start"; "ff"="Finish to Finish"; "sf"="Start to Finish"
	 */
    sub_type: IStringBasedGlideElement<("fs" | "ss" | "ff" | "sf")>;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Iplanned_task_rel_planned_taskFields
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Iplanned_task_rel_planned_taskFields
	 */
    sys_id: IGUIDGlideElement;
}
declare interface Iplanned_task_rel_planned_taskGlideRecord extends Itask_rel_taskGlideRecord, Iplanned_task_rel_planned_taskFields { }
declare interface Iplanned_task_rel_planned_taskGlideElement extends Itask_rel_taskGlideElementBase<Iplanned_task_rel_planned_taskGlideRecord>, Iplanned_task_rel_planned_taskFields { }

/**
 * GlideElement values from the Test Suite table.
 * @interface Itm_test_suiteFields
 */
declare interface Itm_test_suiteFields {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Itm_test_suiteFields
	 */
    active: IBooleanGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_suiteFields
	 */
    description: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_suiteFields
	 */
    name: IStringGlideElement;
	/**
	 * Number
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_suiteFields
	 */
    number: IStringGlideElement;
	/**
	 * Owner
	 * @type {Isys_userGlideElement}
	 * @memberof Itm_test_suiteFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    owner: Isys_userGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_suiteFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_suiteFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Itm_test_suiteFields
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Itm_test_suiteFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Itm_test_suiteFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_suiteFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_suiteFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
}
declare interface Itm_test_suiteGlideRecord extends IGlideRecord, Itm_test_suiteFields { }
declare interface Itm_test_suiteGlideElement extends IGlideRefElement<Itm_test_suiteGlideRecord>, Itm_test_suiteFields { }

/**
 * GlideElement values from the Test Plan table.
 * @interface Itm_test_planFields
 * @extends {Iplanned_taskFields}
 */
declare interface Itm_test_planFields extends Iplanned_taskFields {
	/**
	 * Sign-off by
	 * @type {Isys_userGlideElement}
	 * @memberof Itm_test_planFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    approved_by: Isys_userGlideElement;
	/**
	 * Sign-off date
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_planFields
	 * @description Internal type is "date"
	 */
    approved_date: IStringGlideElement;
	/**
	 * Assessment metric type
	 * @type {GlideReferenceElement}
	 * @memberof Itm_test_planFields
	 * @description Reference to Assessment Metric Type (IGlideRefElement<Iasmt_metric_typeGlideRecord>)
	 */
    asmt_metric_type: GlideReferenceElement;
	/**
	 * Test cases failed
	 * @type {INumberGlideElement}
	 * @memberof Itm_test_planFields
	 * @description Internal type is integer
	 */
    cases_failed: INumberGlideElement;
	/**
	 * Test cases passed
	 * @type {INumberGlideElement}
	 * @memberof Itm_test_planFields
	 * @description Internal type is integer
	 */
    cases_passed: INumberGlideElement;
	/**
	 * Instructions
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_planFields
	 * @description Internal type is html
	 */
    instructions: IStringGlideElement;
	/**
	 * Number of test cases
	 * @type {INumberGlideElement}
	 * @memberof Itm_test_planFields
	 * @description Internal type is integer
	 */
    number_cases: INumberGlideElement;
	/**
	 * Owner
	 * @type {Isys_userGlideElement}
	 * @memberof Itm_test_planFields
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    owner: Isys_userGlideElement;
	/**
	 * Project
	 * @type {Ipm_projectGlideElement}
	 * @memberof Itm_test_planFields
	 * @description Reference to Project (IGlideRefElement<Ipm_projectGlideRecord>)
	 */
    project: Ipm_projectGlideElement;
	/**
	 * Project phase
	 * @type {Ipm_project_taskGlideElement}
	 * @memberof Itm_test_planFields
	 * @description Reference to Project Task (IGlideRefElement<Ipm_project_taskGlideRecord>)
	 */
    project_phase: Ipm_project_taskGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Itm_test_planFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Test environment
	 * @type {Itm_test_environmentGlideElement}
	 * @memberof Itm_test_planFields
	 * @description Reference to Test Environment (IGlideRefElement<Itm_test_environmentGlideRecord>)
	 */
    tm_test_environment: Itm_test_environmentGlideElement;
}
declare interface Itm_test_planGlideRecord extends Iplanned_taskGlideRecord, Itm_test_planFields { }
declare interface Itm_test_planGlideElement extends Iplanned_taskGlideElementBase<Itm_test_planGlideRecord>, Itm_test_planFields { }

/**
 * GlideElement values from the Test Environment table.
 * @interface Itm_test_environmentFields
 */
declare interface Itm_test_environmentFields {
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_environmentFields
	 */
    name: IStringGlideElement;
	/**
	 * Number
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_environmentFields
	 */
    number: IStringGlideElement;
	/**
	 * Short description
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_environmentFields
	 */
    short_description: IStringGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_environmentFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_environmentFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Itm_test_environmentFields
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Itm_test_environmentFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Itm_test_environmentFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_environmentFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_environmentFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Type
	 * @type {IStringBasedGlideElement<("development" | "production" | "qa" | "uat" | "staging" | "support")>}
	 * @memberof Itm_test_environmentFields
	 * @description "development"="Development"; "production"="Production"; "qa"="QA"; "uat"="UAT"; "staging"="Staging"; "support"="Support"
	 */
    type: IStringBasedGlideElement<("development" | "production" | "qa" | "uat" | "staging" | "support")>;
	/**
	 * URL
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_environmentFields
	 * @description Internal type is url
	 */
    url: IStringGlideElement;
}
declare interface Itm_test_environmentGlideRecord extends IGlideRecord, Itm_test_environmentFields { }
declare interface Itm_test_environmentGlideElement extends IGlideRefElement<Itm_test_environmentGlideRecord>, Itm_test_environmentFields { }

/**
 * GlideRecord that contains values from a record in the Test Plan table.
 * @interface Itm_test_planGlideRecord
 * @extends {Iplanned_taskGlideRecord}
 */
declare interface Itm_test_planGlideRecord extends Iplanned_taskGlideRecord {
	/**
	 * Sign-off by
	 * @type {Isys_userGlideElement}
	 * @memberof Itm_test_planGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    approved_by: Isys_userGlideElement;
	/**
	 * Sign-off date
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_planGlideRecord
	 * @description Internal type is "date"
	 */
    approved_date: IStringGlideElement;
	/**
	 * Assessment metric type
	 * @type {GlideReferenceElement}
	 * @memberof Itm_test_planGlideRecord
	 * @description Reference to Assessment Metric Type (IGlideRefElement<Iasmt_metric_typeGlideRecord>)
	 */
    asmt_metric_type: GlideReferenceElement;
	/**
	 * Test cases failed
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_planGlideRecord
	 * @description Internal type is "integer"
	 */
    cases_failed: IStringGlideElement;
	/**
	 * Test cases passed
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_planGlideRecord
	 * @description Internal type is "integer"
	 */
    cases_passed: IStringGlideElement;
	/**
	 * Instructions
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_planGlideRecord
	 * @description Internal type is "html"
	 */
    instructions: IStringGlideElement;
	/**
	 * Number of test cases
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_planGlideRecord
	 * @description Internal type is "integer"
	 */
    number_cases: IStringGlideElement;
	/**
	 * Owner
	 * @type {Isys_userGlideElement}
	 * @memberof Itm_test_planGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    owner: Isys_userGlideElement;
	/**
	 * Project
	 * @type {Ipm_projectGlideElement}
	 * @memberof Itm_test_planGlideRecord
	 * @description Reference to Project (IGlideRefElement<Ipm_projectGlideRecord>)
	 */
    project: Ipm_projectGlideElement;
	/**
	 * Project phase
	 * @type {Ipm_project_taskGlideElement}
	 * @memberof Itm_test_planGlideRecord
	 * @description Reference to Project Task (IGlideRefElement<Ipm_project_taskGlideRecord>)
	 */
    project_phase: Ipm_project_taskGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Itm_test_planGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Test environment
	 * @type {Itm_test_environmentGlideElement}
	 * @memberof Itm_test_planGlideRecord
	 * @description Reference to Test Environment (IGlideRefElement<Itm_test_environmentGlideRecord>)
	 */
    tm_test_environment: Itm_test_environmentGlideElement;
}

/**
 * GlideElement values from the Test Case table.
 * @interface Itm_test_caseFields
 */
declare interface Itm_test_caseFields {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Itm_test_caseFields
	 */
    active: IBooleanGlideElement;
	/**
	 * Number
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_caseFields
	 */
    number: IStringGlideElement;
	/**
	 * Order
	 * @type {INumberGlideElement}
	 * @memberof Itm_test_caseFields
	 * @description Internal type is integer
	 */
    order: INumberGlideElement;
	/**
	 * Prerequisites
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_caseFields
	 * @description Internal type is "html"
	 */
    prereq: IStringGlideElement;
	/**
	 * Short Description
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_caseFields
	 */
    short_description: IStringGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_caseFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_caseFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Itm_test_caseFields
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Itm_test_caseFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Itm_test_caseFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_caseFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Itm_test_caseFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Test Suite
	 * @type {Itm_test_suiteGlideElement}
	 * @memberof Itm_test_caseFields
	 * @description Reference to Test Suite (IGlideRefElement<Itm_test_suiteGlideRecord>)
	 */
    tm_test_suite: Itm_test_suiteGlideElement;
}
declare interface Itm_test_caseGlideRecord extends IGlideRecord, Itm_test_caseFields { }
declare interface Itm_test_caseGlideElement extends IGlideRefElement<Itm_test_caseGlideRecord>, Itm_test_caseFields { }

/**
 * GlideElement values from the Test table.
 * @interface Itm_testFields
 */
declare interface Itm_testFields {
	/**
	 * Expected Result
	 * @type {IStringGlideElement}
	 * @memberof Itm_testFields
	 */
    expected_result: IStringGlideElement;
	/**
	 * Number
	 * @type {IStringGlideElement}
	 * @memberof Itm_testFields
	 */
    number: IStringGlideElement;
	/**
	 * Order
	 * @type {INumberGlideElement}
	 * @memberof Itm_testFields
	 * @description Internal type is integer
	 */
    order: INumberGlideElement;
	/**
	 * State
	 * @type {IStringGlideElement}
	 * @memberof Itm_testFields
	 */
    state: IStringGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Itm_testFields
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Itm_testFields
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Itm_testFields
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Itm_testFields
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {INumberGlideElement}
	 * @memberof Itm_testFields
	 * @description Internal type is integer
	 */
    sys_mod_count: INumberGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Itm_testFields
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Itm_testFields
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Test
	 * @type {IStringGlideElement}
	 * @memberof Itm_testFields
	 */
    test: IStringGlideElement;
	/**
	 * Test data
	 * @type {IStringGlideElement}
	 * @memberof Itm_testFields
	 * @description Internal type is "html"
	 */
    test_data: IStringGlideElement;
	/**
	 * Detailed Description
	 * @type {IStringGlideElement}
	 * @memberof Itm_testFields
	 * @description Internal type is "html"
	 */
    test_description: IStringGlideElement;
	/**
	 * Test Case
	 * @type {Itm_test_caseGlideElement}
	 * @memberof Itm_testFields
	 * @description Reference to Test Case (IGlideRefElement<Itm_test_caseGlideRecord>)
	 */
    tm_test_case: Itm_test_caseGlideElement;
}
declare interface Itm_testGlideRecord extends IGlideRecord, Itm_testFields { }
declare interface Itm_testGlideElement extends IGlideRefElement<Itm_testGlideRecord>, Itm_testFields { }