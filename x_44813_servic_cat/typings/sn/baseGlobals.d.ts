/// <reference path="Packages.d.ts" />

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

/**
 * Members common to all property members of GlideRecord and GlideElementReference objects.
 * @interface IGlideTableElement
 */
declare interface IGlideTableElement {
    /**
     * Determines if the user's role permits the creation of new records in this field.
     * @returns {boolean} True if the field can be created, false otherwise.
     * @memberof IGlideTableElement
     */
    canCreate(): boolean;

    /**
     * Indicates whether the user's role permits them to read the associated GlideRecord.
     * @returns {boolean} True if the field can be read, false otherwise.
     * @memberof IGlideTableElement
     */
    canRead(): boolean;

    /**
     * Determines whether the user's role permits them to write to the associated GlideRecord.
     * @returns {boolean} True if the user can write to the field, false otherwise.
     * @memberof IGlideTableElement
     */
    canWrite(): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @returns {boolean} True if the fields have been changed, false if the field has not.
     * @memberof IGlideTableElement
     */
    changes(): boolean;

    /**
     * Determines if the previous value of the current field matches the specified object.
     * @param {*} o An object value to check against the previous value of the current field.
     * @returns {boolean} True if the previous value matches, false if it does not.
     * @memberof IGlideTableElement
     */
    changesFrom(o: any): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @param {*} o An object value to check against the new value of the current field.
     * @returns {boolean} True if the new value matches, false if it does not.
     * @memberof IGlideTableElement
     */
    changesTo(o: any): boolean;

    /**
     * Returns the value of the specified attribute from the dictionary.
     * @param {string} attributeName Attribute name
     * @returns {string} Attribute value.
     * @memberof IGlideTableElement
     */
    getAttribute(attributeName: string): string;

    /**
     * Returns the Boolean value of the specified attribute from the dictionary.
     * @param {string} attributeName Attribute name.
     * @returns {boolean} Boolean value of the attribute. Returns false if the attribute does not exist.
     * @memberof IGlideTableElement
     */
    getBooleanAttribute(attributeName: string): boolean;

    getChoiceValue(): string;

    getChoices(dependent?: string): Packages.java.util.IArrayList<Packages.java.lang.String>;

    getDecryptedValue(): string;

    /**
     * Gets the formatted display value of the field.
     * @param {number} [maxCharacters] Maximum characters desired
     * @memberof IGlideTableElement
     */
    getDisplayValue(maxCharacters?: number): string;

    /**
     * Gets the current element descriptor.
     * @returns {GlideElementDescriptor}
     * @memberof IGlideTableElement
     */
    getED(): GlideElementDescriptor;

    getGlobalDisplayValue(): string;

    /**
     * Returns the HTML value of a field.
     * @param {number} [maxChars] Maximum number of characters to return.
     * @returns {string} HTML value for the field.
     * @memberof IGlideTableElement
     */
    getHTMLValue(maxCharacters?: number): string;

    getJournalEntry(mostRecent: number): string;

    /**
     * Gets the object label.
     * @returns {string} The object label.
     * @memberof IGlideTableElement
     */
    getLabel(): string;

    // getModifiedBy(): string;

    /**
     * Gets the name of the field.
     * @returns {string} The name of the field.
     * @memberof IGlideTableElement
     */
    getName(): string;

    /**
     * Gets the name of the table on which the field resides.
     * @returns {string} Name of the table. The returned value may be different from the table Class that the record is in. See Tables and Classes in the product documentation.
     * @memberof IGlideTableElement
     */
    getTableName(): string;

    /**
     * Gets the value of the current element.
     * @returns {string}
     * @memberof IGlideTableElement
     */
    getValue(): string;

    /**
     * Determines if a field is null.
     * @returns {boolean} True if the field is null or an empty string, false if not.
     * @memberof IGlideTableElement
     */
    nil(): boolean;

    /**
     * Sets the value of a date/time element to the specified number of milliseconds since January 1, 1970 00:00:00 GMT.
     * @param {number} milliseconds Number of milliseconds since 1/1/1970.
     * @memberof IGlideTableElement
     */
    setDateNumericValue(milliseconds: number): void;

    setDisplayValue(value: any): void;

    setError(errorMessage: string): void;

    setPhoneNumber(phoneNumber: any, strict: boolean): void;

    /**
     * Sets the value of a field.
     * @param {*} value Object value to set the field to.
     * @memberof IGlideTableElement
     */
    setValue(value: any): void;

    /**
     * Converts the value to a string.
     * @returns {string} The value as a string
     * @memberof IGlideTableElement
     */
    toString(): string;
}

declare interface IGlideTableValueElement<TJs extends string | boolean | number, TObj, TStr extends string> extends IGlideTableElement {
    /**
     * Determines if the previous value of the current field matches the specified object.
     * @param {RhinoJava.Nilable<TStr> | TJs | TObj | IGlideTableValueElement<TJs, TObj, TStr>} o An object value to check against the previous value of the current field.
     * @returns {boolean} True if the previous value matches, false if it does not.
     * @memberof IGlideTableValueElement
     */
    changesFrom(o: RhinoJava.Nilable<TStr> | TJs | TObj | IGlideTableValueElement<TJs, TObj, TStr>): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @param {RhinoJava.Nilable<TStr> | TJs | TObj | IGlideTableValueElement<TJs, TObj, TStr>} o An object value to check against the new value of the current field.
     * @returns {boolean} True if the new value matches, false if it does not.
     * @memberof IGlideTableValueElement
     */
    changesTo(o: RhinoJava.Nilable<TStr> | TJs | TObj | IGlideTableValueElement<TJs, TObj, TStr>): boolean;

    /**
     * Gets the value of the current element.
     * @returns {RhinoJava.Nilable<TStr>}
     * @memberof IGlideTableValueElement
     */
    getValue(): RhinoJava.Nilable<TStr>;

    /**
     * Sets the value of a field.
     * @param {RhinoJava.Nilable<TStr> | TJs | TObj | IGlideTableValueElement<TJs, TObj, TStr>} value Object value to set the field to.
     * @memberof IGlideTableValueElement
     */
    setValue(value: RhinoJava.Nilable<TStr> | TJs | TObj | IGlideTableValueElement<TJs, TObj, TStr>): void;

    /**
     * Converts the value to a string.
     * @returns {RhinoJava.IncludeEmptyString<TStr>} The value as a string
     * @memberof IGlideTableValueElement
     */
    toString(): RhinoJava.IncludeEmptyString<TStr>;
}

declare type JavaStringGlideElement<T extends string> = IGlideTableValueElement<T, RhinoJava.JavaChar, T>;
//declare type GlideStringElement<T extends string, R extends GlideRecord & IGlideTableValueElement<T, R, T>;
declare type GlideElementString = JavaStringGlideElement<string>;
declare type GlideStringValue<T extends string> = RhinoJava.StringValue<T> | JavaStringGlideElement<T>;
declare type GlideStringValueOrEmpty<T extends string> = RhinoJava.StringValueOrEmpty<T> | JavaStringGlideElement<T>;
declare type NilableGlideStringValue<T extends string> = RhinoJava.StringValueOrNil<T> | JavaStringGlideElement<T>;
declare type GlideString = GlideStringValue<string>;
declare type GlideStringOrNil = RhinoJava.Nilable<GlideString>;

declare type GlideBoolean = RhinoJava.BooleanLike | GlideElementBoolean;
declare type GlideBooleanOrEmpty = RhinoJava.BooleanLikeOrEmpty | GlideElementBoolean;
declare type GlideBooleanOrNil = RhinoJava.NilableBooleanLike | GlideElementBoolean;

declare type GlideElementValueNumeric<N extends number, S extends string> = GlideElementNumeric & IGlideTableValueElement<N, RhinoJava.JavaIntegral, S>;
declare type GlideNumberValue<N extends number, S extends string> = RhinoJava.NumberLike<N, S> | GlideElementValueNumeric<N, S>;
declare type GlideNumberValueOrEmpty<N extends number, S extends string> = RhinoJava.NumberLikeOrEmpty<N, S> | GlideElementValueNumeric<N, S>;
declare type NilableGlideNumberValue<N extends number, S extends string> = RhinoJava.NilableNumberLike<N, S> | GlideElementValueNumeric<N, S>;
declare type GlideNumber = RhinoJava.NumberLike<number, string> | GlideElementNumeric;
declare type GlideNumberOrEmpty = RhinoJava.NumberLikeOrEmpty<number, string> | GlideElementNumeric;
declare type GlideNumberOrNil = RhinoJava.NilableNumberLike<number, string> | GlideElementNumeric;

declare type StringValuedGlideElement<S extends string, E extends GlideElement & StringValuedGlideElement<S, E>> = IGlideTableValueElement<S, E, S>;
declare type StringGlideElement<E extends GlideElement & StringGlideElement<E>> = StringValuedGlideElement<string, E>;
declare type StringValuedGlideElementValue<S extends string, E extends GlideElement & StringValuedGlideElement<S, E>> = S | E;
declare type StringValuedGlideElementValueOrEmpty<S extends string, E extends GlideElement & StringValuedGlideElement<S, E>> = RhinoJava.IncludeEmptyString<S> | E;
declare type NilableStringValuedGlideElementValue<S extends string, E extends GlideElement & StringValuedGlideElement<S, E>> = RhinoJava.Nilable<S> | E;
declare type StringGlideElementValue<E extends GlideElement & StringGlideElement<E>> = StringValuedGlideElementValue<string, E>;
declare type StringGlideElementValueOrEmpty<E extends GlideElement & StringGlideElement<E>> = StringValuedGlideElementValueOrEmpty<string, E>;
declare type NilableStringGlideElementValue<E extends GlideElement & StringGlideElement<E>> = NilableStringValuedGlideElementValue<string, E>;
declare type GlideElementVariablesProperty = GlideElementVariables | { [key: string]: GlideElementVariable; };
declare type GlideElementVariableValue<V extends string | boolean | number, TObj, S extends string> = S | TObj | V | GlideElementVariable & {
    getValue(): RhinoJava.Nilable<S>;
    setValue(value: GlideElementVariableValue<V, TObj, S>): void;
    toString(): RhinoJava.IncludeEmptyString<S>;
};
declare type GlideElementVariableStringValue<T extends string> = GlideElementVariableValue<T, T, T>;
declare type GlideElementVariableString = GlideElementVariableStringValue<string>;
declare type GlideElementVariableNumberValue<N extends number, S extends string> = GlideElementVariableValue<N, N, S>;
declare type GlideElementVariableNumber = GlideElementVariableNumberValue<number, string>;
declare type GlideElementVariableBoolean = GlideElementVariableValue<boolean, boolean, RhinoJava.BooleanString>;

/**
 * Properties common to all GlideRecord and GlideElementReference objects.
 * @interface IGlideTableProperties
 */
declare interface IGlideTableProperties {
	/**
     * Created by
     * @type {GlideString}
     * @memberof IGlideTableProperties
     * @description Max length: 40
     */
    sys_created_by: GlideString;

    /**
     * Created
     * @type {GlideString}
     * @memberof IGlideTableProperties
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    sys_created_on: GlideString;

    /**
     * Sys ID
     * @type {GlideString}
     * @memberof IGlideTableProperties
     * @description Internal type is "GUID"
     *      Max length: 32
     */
    sys_id: GlideString;

    /**
     * Updates
     * @type {GlideElementNumeric}
     * @memberof IGlideTableProperties
     */
    sys_mod_count: GlideNumber;

    /**
     * Updated by
     * @type {StringGlideElement}
     * @memberof IGlideTableProperties
     * @description Max length: 40
     */
    sys_updated_by: GlideString;

    /**
     * Updated
     * @type {GlideString}
     * @memberof IGlideTableProperties
     * @description Internal type is "glide_date_time"
     *      Max length: 40
     */
    sys_updated_on: GlideString;
}

declare type GlideTableRecord<TProperties extends IGlideTableProperties> = GlideRecord & IGlideTableProperties;

declare type GlideReferenceObject<TProperties extends IGlideTableProperties> = GlideTableRecord<TProperties> | GlideTableReference<TProperties>;

declare type GlideReferenceValue<TProperties extends IGlideTableProperties> = string | GlideReferenceObject<TProperties>;
declare type GlideReferenceValueOrEmpty<TProperties extends IGlideTableProperties> = RhinoJava.IncludeEmptyString<string> | GlideReferenceObject<TProperties>;
declare type NilableGlideReferenceValue<TProperties extends IGlideTableProperties> = RhinoJava.Nilable<string> | GlideReferenceObject<TProperties>;

declare type GlideTableReference<TProperties extends IGlideTableProperties> = GlideElementReference & TProperties & {
    /**
     * Determines if the previous value of the current field matches the specified object.
     * @param {NilableGlideReferenceValue<TProperties>} o An object value to check against the previous value of the current field.
     * @returns {boolean} True if the previous value matches, false if it does not.
     */
    changesFrom(o: NilableGlideReferenceValue<TProperties>): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @param {NilableGlideReferenceValue<TProperties, TRecord>} o An object value to check against the new value of the current field.
     * @returns {boolean} True if the new value matches, false if it does not.
     */
    changesTo(o: NilableGlideReferenceValue<TProperties>): boolean;

    /**
     * Gets a GlideRecord object for a given reference element.
     * @returns {TRecord} The GlideRecord object.
     * @memberof GlideElement
     */
    getRefRecord(): GlideTableRecord<TProperties>;

    /**
     * Sets the value of a field.
     * @param {NilableGlideReferenceValue<TProperties, TRecord>} value Object value to set the field to.
     */
    setValue(value: NilableGlideReferenceValue<TProperties>): void;
};

declare type GlideElementReferenceValue = string | GlideTableReference<IGlideTableProperties>;
declare type NilableGlideElementReferenceValue = RhinoJava.Nilable<string> | GlideTableReference<IGlideTableProperties>;

declare abstract class TemplatePrinter {
    print(text: string): void;
    space(spaces: number): void;
}

declare class GlideActionURL {
    setRedirectURL(o: string | GlideRecord): void;
}

declare interface ScriptedProgressWorkerCallback {
    process(...args: any[]): void;
}

declare interface IServerClass {
    intialize(...args: (any | null | undefined)[]): void;
    type: string;
}

declare interface IBackgroundProgressWorkerHandler extends IServerClass {
    process(...args: (any | null | undefined)[]): void;
}

declare interface ICustomClassPrototype0<TPrototype extends ICustomClassPrototype0<TPrototype, Type>, Type extends string> { initialize(this: TPrototype): void; type: Type; }
declare interface ICustomClassPrototype1<TPrototype extends ICustomClassPrototype1<TPrototype, Type, TArg>, Type extends string, TArg> { initialize(this: TPrototype, arg: TArg): void; type: Type; }
declare interface ICustomClassPrototype2<TPrototype extends ICustomClassPrototype2<TPrototype, Type, TArg0, TArg1>, Type extends string, TArg0, TArg1> { initialize(this: TPrototype, arg0: TArg0, arg1: TArg1): void; type: Type; }
declare interface ICustomClassPrototype3<TPrototype extends ICustomClassPrototype3<TPrototype, Type, TArg0, TArg1, TArg2>, Type extends string, TArg0, TArg1, TArg2> { initialize(this: TPrototype, arg0: TArg0, arg1: TArg1, arg2: TArg2): void; type: Type; }
declare interface ICustomClassPrototype4<TPrototype extends ICustomClassPrototype4<TPrototype, Type, TArg0, TArg1, TArg2, TArg3>, Type extends string, TArg0, TArg1, TArg2, TArg3> { initialize(this: TPrototype, arg0: TArg0, arg1: TArg1, arg2: TArg2, arg3: TArg3): void; type: Type; }
declare interface ICustomClassPrototypeN<TPrototype extends ICustomClassPrototypeN<TPrototype, Type>, Type extends string> { initialize(this: TPrototype, ...args: any[]): void; type: Type; }

declare interface CustomClassConstructor0<TPrototype extends ICustomClassPrototype0<TPrototype, string>, TInstance extends TPrototype> { new(): TInstance;(): TInstance; prototype: TPrototype; }
declare interface CustomClassConstructor1<TPrototype extends ICustomClassPrototype1<TPrototype, string, TArg>, TInstance extends TPrototype, TArg> { new(arg: TArg): TInstance;(arg: TArg): TInstance; prototype: TPrototype; }
declare interface CustomClassConstructor2<TPrototype extends ICustomClassPrototype2<TPrototype, string, TArg0, TArg1>, TInstance extends TPrototype, TArg0, TArg1> { new(arg0: TArg0, arg1: TArg1): TInstance;(arg0: TArg0, arg1: TArg1): TInstance; prototype: TPrototype; }
declare interface CustomClassConstructor3<TPrototype extends ICustomClassPrototype3<TPrototype, string, TArg0, TArg1, TArg2>, TInstance extends TPrototype, TArg0, TArg1, TArg2> { new(arg0: TArg0, arg1: TArg1, arg2: TArg2): TInstance;(arg0: TArg0, arg1: TArg1, arg2: TArg2): TInstance; prototype: TPrototype; }
declare interface CustomClassConstructor4<TPrototype extends ICustomClassPrototype4<TPrototype, string, TArg0, TArg1, TArg2, TArg3>, TInstance extends TPrototype, TArg0, TArg1, TArg2, TArg3> { new(arg0: TArg0, arg1: TArg1, arg2: TArg2, arg3: TArg3): TInstance;(arg0: TArg0, arg1: TArg1, arg2: TArg2, arg3: TArg3): TInstance; prototype: TPrototype; }
declare interface CustomClassConstructorN<TPrototype extends ICustomClassPrototypeN<TPrototype, string>, TInstance extends TPrototype> { new(...args: any[]): TInstance;(): TInstance; prototype: TPrototype; }

declare var Class: {
    create<TConstructor extends CustomClassConstructor0<ICustomClassPrototype0<any, string>, ICustomClassPrototype0<any, string>> |
        CustomClassConstructor1<ICustomClassPrototype1<any, string, any>, ICustomClassPrototype1<any, string, any>, any> |
        CustomClassConstructor2<ICustomClassPrototype2<any, string, any, any>, ICustomClassPrototype2<any, string, any, any>, any, any> |
        CustomClassConstructor3<ICustomClassPrototype3<any, string, any, any, any>, ICustomClassPrototype3<any, string, any, any, any>, any, any, any> |
        CustomClassConstructor4<ICustomClassPrototype4<any, string, any, any, any, any>, ICustomClassPrototype4<any, string, any, any, any, any>, any, any, any, any> |
        CustomClassConstructorN<ICustomClassPrototypeN<any, string>, ICustomClassPrototypeN<any, string>>>(): TConstructor;
};

/**
 * Represents a time zone offset, and also figures out daylight savings.
 * @typedef {Packages.java.util.TimeZone} TimeZone
 */
declare class TimeZone extends Packages.java.util.TimeZone { }
// declare class Glide extends Packages.com.glide.Glide { }
// declare class GlideAbstractBucketCollector extends Packages.com.glide.monitor.AbstractBucketCollector { }
// declare class GlideAbstractDomainProvider extends Packages.com.glide.db.domain.AbstractDomainProvider { }
// declare class GlideAbstractExecutionPlan extends Packages.com.glide.execution_plan.AbstractExecutionPlan { }
// declare class GlideAbstractListener extends Packages.com.glide.listener.AbstractListener { }
// declare class GlideAbstractRenderer extends Packages.com.glide.ui.portal.AbstractRenderer { }
// declare class GlideAction extends Packages.com.glide.script.Action { }
// declare class GlideActionManager extends Packages.com.glide.ui.action.ActionManager { }
// declare class GlideAJAXScheduleItem extends Packages.com.glide.schedules.AJAXScheduleItem { }
// declare class GlideAJAXSchedulePage extends Packages.com.glide.schedules.AJAXSchedulePage { }
// declare class GlideAlertActions extends Packages.com.glide.alerts.AlertActions { }
// declare class GlideappAbstractChoiceListQuestion extends Packages.com.glideapp.questionset.AbstractChoiceListQuestion { }
// declare class GlideappADSILoader extends Packages.com.glideapp.ecc.ADSILoader { }
// declare class GlideappAJAXMapPage extends Packages.com.glideapp.google_maps.AJAXMapPage { }
// declare class GlideappCalculationHelper extends Packages.com.glideapp.servicecatalog.CalculationHelper { }
// declare class GlideappCart extends Packages.com.glideapp.servicecatalog.Cart { }
// declare class GlideappCartItem extends Packages.com.glideapp.servicecatalog.CartItem { }
// declare class GlideappCatalogCategoryBatcher extends Packages.com.glideapp.servicecatalog.CatalogCategoryBatcher { }
// declare class GlideappCatalogItem extends Packages.com.glideapp.servicecatalog.CatalogItem { }
// declare class GlideappCategory extends Packages.com.glideapp.servicecatalog.Category { }
// declare class GlideappCategoryPopper extends Packages.com.glideapp.servicecatalog.CategoryPopper { }
// declare class GlideappCatItemPopper extends Packages.com.glideapp.servicecatalog.CatItemPopper { }
// declare class GlideappChartParameters extends Packages.com.glideapp.chart.ChartParameters { }
// declare class GlideappChatRoom extends Packages.com.glideapp.live.db.ChatRoom { }
// declare class GlideappChatRoom$Error extends Packages.com.glideapp.live.db.ChatRoom.Error { }
// declare class GlideappCheckBoxQuestion extends Packages.com.glideapp.questionset.CheckBoxQuestion { }
// declare class GlideappCMDBHelper extends Packages.com.glideapp.ecc.CMDBHelper { }
// declare class GlideappCMDBSoftwareHelper extends Packages.com.glideapp.ecc.CMDBSoftwareHelper { }
// declare class GlideappContainerAwareQuestionSet extends Packages.com.glideapp.questionset.ContainerAwareQuestionSet { }
// declare class GlideappContextDiagramProcessor extends Packages.com.glideapp.workflow.ui.ContextDiagramProcessor { }
// declare class GlideappDateQuestion extends Packages.com.glideapp.questionset.DateQuestion { }
// declare class GlideappDateTimeQuestion extends Packages.com.glideapp.questionset.DateTimeQuestion { }
// declare class GlideappDeliveryPlan extends Packages.com.glideapp.servicecatalog.DeliveryPlan { }
// declare class GlideappECCInputMessage extends Packages.com.glideapp.ecc.ECCInputMessage { }
// declare class GlideappECCOutputMessage extends Packages.com.glideapp.ecc.ECCOutputMessage { }
// declare class GlideappECCQueueConnector extends Packages.com.glideapp.ecc.ECCQueueConnector { }
// declare class GlideappECCQueueProcessor extends Packages.com.glideapp.ecc.ECCQueueProcessor { }
// declare class GlideappECCResponseMessage extends Packages.com.glideapp.ecc.ECCResponseMessage { }
// declare class GlideappExpandableText extends Packages.com.glideapp.live_feed.HTMLTransformers.ExpandableText { }
// declare class GlideappExpertPanelCatalogOrder extends Packages.com.glideapp.servicecatalog.ExpertPanelCatalogOrder { }
// declare class GlideappFixes extends Packages.com.glideapp.servicecatalog.Fixes { }
// declare class GlideappHome extends Packages.com.glideapp.home.Home { }
// declare class GlideappHomePage extends Packages.com.glideapp.home.HomePage { }
// declare class GlideappHomePageFactory extends Packages.com.glideapp.home.HomePageFactory { }
// declare class GlideappIECC extends Packages.com.glideapp.ecc.IECC { }
// declare class GlideappIOUpgrade extends Packages.com.glideapp.servicecatalog.IOUpgrade { }
// declare class GlideappItemOptionsQuestionSet extends Packages.com.glideapp.servicecatalog.ItemOptionsQuestionSet { }
// declare class GlideappJMSECCReceiver extends Packages.com.glideapp.jms.JMSECCReceiver { }
// declare class GlideappJMSECCSender extends Packages.com.glideapp.jms.JMSECCSender { }
// declare class GlideappKBIncludes extends Packages.com.glideapp.knowledge.KBIncludes { }
// declare class GlideApplication extends Packages.com.glide.sys.Application { }
// declare class GlideApplicationModule extends Packages.com.glide.processors.ApplicationModule { }
// declare class GlideappListCollectorQuestion extends Packages.com.glideapp.questionset.ListCollectorQuestion { }
// declare class GlideappLiveFeedEventHandler extends Packages.com.glideapp.live_feed.LiveFeedEventHandler { }
// declare class GlideappLiveFeedJournalWriter extends Packages.com.glideapp.live_feed.LiveFeedJournalWriter { }
// declare class GlideappLiveFeedUIAction extends Packages.com.glideapp.live_feed.LiveFeedUIAction { }
// declare class GlideappLiveProfile extends Packages.com.glideapp.live_common.LiveProfile { }
// declare class GlideappLiveUtils extends Packages.com.glideapp.live.LiveUtils { }
// declare class GlideappLookupSelectQuestion extends Packages.com.glideapp.questionset.LookupSelectQuestion { }
// declare class GlideappMessageTag extends Packages.com.glideapp.live_feed.MessageTag { }
// declare class GlideappOrderGuide extends Packages.com.glideapp.servicecatalog.OrderGuide { }
// declare class GlideappProcessQueue extends Packages.com.glideapp.ecc.ccmdb.ProcessQueue { }
// declare class GlideappQuestion extends Packages.com.glideapp.questionset.Question { }
// declare class GlideappQuestionChoice extends Packages.com.glideapp.questionset.QuestionChoice { }
// declare class GlideappQueueHelper extends Packages.com.glideapp.ecc.QueueHelper { }
// declare class GlideappQueueReader extends Packages.com.glideapp.ecc.QueueReader { }
// declare class GlideappReferenceQuestion extends Packages.com.glideapp.questionset.ReferenceQuestion { }
// declare class GlideappRequestItemWorkflow extends Packages.com.glideapp.servicecatalog.RequestItemWorkflow { }
// declare class GlideappRequestNew extends Packages.com.glideapp.servicecatalog.RequestNew { }
// declare class GlideappScriptHelper extends Packages.com.glideapp.servicecatalog.ScriptHelper { }
// declare class GlideappSecurityMask extends Packages.com.glideapp.servicecatalog.SecurityMask { }
// declare class GlideappSequencedQuestionSet extends Packages.com.glideapp.questionset.SequencedQuestionSet { }
// declare class GlideappTaskApprovalHelper extends Packages.com.glideapp.servicecatalog.TaskApprovalHelper { }
// declare class GlideappTimeAgo extends Packages.com.glideapp.live_feed.TimeAgo { }
// declare class GlideappUpdateVersion extends Packages.com.glideapp.version.UpdateVersion { }
// declare class GlideappUpgradeQuestions extends Packages.com.glideapp.survey.UpgradeQuestions { }
// declare class GlideappValveProcessor extends Packages.com.glideapp.servicecatalog.valve.ValveProcessor { }
// declare class GlideappVariable extends Packages.com.glideapp.servicecatalog.variables.Variable { }
// declare class GlideappVariablePoolQuestionSet extends Packages.com.glideapp.servicecatalog.variables.VariablePoolQuestionSet { }
// declare class GlideappWizardIntercept extends Packages.com.glideapp.wizard.WizardIntercept { }
// declare class GlideappWMILoader extends Packages.com.glideapp.ecc.WMILoader { }
// declare class GlideappWorkflow extends Packages.com.glideapp.workflow.Workflow { }
// declare class GlideappWorkflowHelper extends Packages.com.glideapp.workflow.WorkflowHelper { }
// declare class GlideappYesNoQuestion extends Packages.com.glideapp.questionset.YesNoQuestion { }
// declare class GlideAQueryExplanation extends Packages.com.glide.db.explain.AQueryExplanation { }
// declare class GlideArchiver extends Packages.com.glide.db.auxiliary.Archiver { }
// declare class GlideArchiveRecord extends Packages.com.glide.db.auxiliary.ArchiveRecord { }
// declare class GlideArchiveRestore extends Packages.com.glide.db.auxiliary.ArchiveRestore { }
// declare class GlideArchiveStatus extends Packages.com.glide.db.auxiliary.ArchiveStatus { }
// declare class GlideArchiveTable extends Packages.com.glide.db.auxiliary.ArchiveTable { }
// declare class GlideARecurrence extends Packages.com.glide.schedule.recurrence.ARecurrence { }
// declare class GlideAttachmentIndexDocument extends Packages.com.glide.lucene.attachments.AttachmentIndexDocument { }
// declare class GlideAttachmentIndexTypes extends Packages.com.glide.lucene.attachments.AttachmentIndexTypes { }
// declare class GlideAttributes extends Packages.com.glide.util.GlideAttributes { }
// declare class GlideAuditDelete extends Packages.com.glide.audit.AuditDelete { }
// declare class GlideAuditor extends Packages.com.glide.script.Auditor { }
// declare class GlideAutomationEncrypter extends Packages.com.glide.util.AutomationEncrypter { }
// declare class GlideBaseTag extends Packages.com.glide.ui.jelly.tags.BaseTag { }
// declare class GlideBootstrap extends Packages.com.glide.db.impex.Bootstrap { }
// declare class GlideBoundedIntProperty extends Packages.com.glide.util.BoundedIntProperty { }
// declare class GlideCacheManager extends Packages.com.glide.sys.cache.CacheManager { }
// declare class GlideCalendar extends Packages.com.glide.schedule.GlideCalendar { }
// declare class GlideCalendarWeekEntry extends Packages.com.glide.calendar.GlideCalendarWeekEntry { }
// declare class GlideCanceledUITransaction extends Packages.com.glide.ui.CanceledUITransaction { }
// declare class GlideCascadeFromDelete extends Packages.com.glide.db.CascadeFromDelete { }
// declare class GlideCatalogCloneWorker extends Packages.com.glide.catalog.cloner.CatalogCloneWorker { }
// declare class GlideChannel extends Packages.com.glide.channel.Channel { }
// declare class GlideChannelManager extends Packages.com.glide.channel.ChannelManager { }
// declare class GlideChannelMessage extends Packages.com.glide.channel.ChannelMessage { }
// declare class GlideChartFieldColors extends Packages.com.glide.ui.chart.dataset.ChartFieldColors { }
// declare class GlideChartGeneratorFactory extends Packages.com.glide.ui.chart.ChartGeneratorFactory { }
// declare class GlideChartUtil extends Packages.com.glide.ui.chart.dataset.ChartUtil { }
// declare class GlideChartValue extends Packages.com.glide.ui.chart.dataset.ChartValue { }
// declare class GlideChecksum extends Packages.com.glide.util.Checksum { }
declare class GlideChoice extends Packages.com.glide.choice.Choice { }
declare class GlideChoiceList extends Packages.com.glide.choice.ChoiceList { }
// declare class GlideChoiceListGenerator extends Packages.com.glide.choice.ChoiceListGenerator { }
declare class GlideChoiceListSet extends Packages.com.glide.choice.ChoiceListSet { }
// declare class GlideChoiceListUpdateSaver extends Packages.com.glide.update.saver.ChoiceListUpdateSaver { }
// declare class GlideClientBrowserTimes extends Packages.com.glide.client_transaction.ClientBrowserTimes { }
// declare class GlideClientNetworkTimes extends Packages.com.glide.client_transaction.ClientNetworkTimes { }
// declare class GlideClusterMessage extends Packages.com.glide.cluster.ClusterMessage { }
// declare class GlideClusterState extends Packages.com.glide.cluster.ClusterState { }
// declare class GlideClusterSynchronizer extends Packages.com.glide.cluster.ClusterSynchronizer { }
// declare class GlideCMSLinkHelper extends Packages.com.glide.cms.CMSLinkHelper { }
// declare class GlideCMSPageLink extends Packages.com.glide.cms.CMSPageLink { }
// declare class GlideCollectionEnumerator extends Packages.com.glide.util.CollectionEnumerator { }
// declare class GlideCollectionQueryCalculator extends Packages.com.glide.ui.CollectionQueryCalculator { }
// declare class GlideCollisionDetector extends Packages.com.glide.update.collisions.CollisionDetector { }
// declare class GlideColumnAttributes extends Packages.com.glide.db.impex.ColumnAttributes { }
// declare class GlideCompanyResolver extends Packages.com.glide.misc.CompanyResolver { }
// declare class GlideCompiler extends Packages.com.glide.script.Compiler { }
// declare class GlideCompositeElement extends Packages.com.glide.db.CompositeElement { }
// declare class GlideConfiguration extends Packages.com.glide.notification.Configuration { }
// declare class GlideContentConfig extends Packages.com.glide.cms.ContentConfig { }
// declare class GlideContentPage extends Packages.com.glide.cms.ContentPage { }
// declare class GlideContentSite extends Packages.com.glide.cms.ContentSite { }
// declare class GlideContentType extends Packages.com.glide.cms.ContentType { }
// declare class GlideContextMenu extends Packages.com.glide.db_context_menu.ContextMenu { }
// declare class GlideContextMenuItem extends Packages.com.glide.db_context_menu.ContextMenuItem { }
// declare class GlideContextualSecurityManager extends Packages.com.glide.sys.security.ContextualSecurityManager { }
declare class GlideController extends Packages.com.glide.script.GlideController { }
// declare class GlideConverter extends Packages.com.glide.currency.Converter { }
// declare class GlideCookieMan extends Packages.com.glide.ui.CookieMan { }
// declare class GlideCounter extends Packages.com.glide.util.Counter { }
// declare class GlideCredentials extends Packages.com.glide.communications.crypto.Credentials { }
// declare class GlideCryptoService extends Packages.com.glide.security.CryptoService { }
// declare class GlideCSVExporter extends Packages.com.glide.generators.CSVExporter { }
// declare class GlideCustomerScriptFixer extends Packages.com.glide.script.api.CustomerScriptFixer { }
// declare class GlideDatabaseVerifier extends Packages.com.glide.db.DatabaseVerifier { }
// declare class GlideDatabaseViewLink extends Packages.com.glide.database_views.DatabaseViewLink { }
// declare class GlideDataSource extends Packages.com.glide.db.impex.datasource.DataSource { }
declare class GlideDate extends Packages.com.glide.glideobject.GlideDate { }
declare class GlideDateTime extends Packages.com.glide.glideobject.GlideDateTime { }
// declare class GlideDateUtil extends Packages.com.glide.util.DateUtil { }
// declare class GlideDBAction extends Packages.com.glide.db.DBAction { }
// declare class GlideDBAggregateQuery extends Packages.com.glide.db.DBAggregateQuery { }
// declare class GlideDBAggregateUtil extends Packages.com.glide.db.DBAggregateUtil { }
// declare class GlideDBCategoryDebug extends Packages.com.glide.secondary_db_pools.DBCategoryDebug { }
// declare class GlideDBChangeManager extends Packages.com.glide.db.change.DBChangeManager { }
// declare class GlideDBCompositeAction extends Packages.com.glide.db.DBCompositeAction { }
// declare class GlideDBConfiguration extends Packages.com.glide.db.DBConfiguration { }
// declare class GlideDBConfigurationManager extends Packages.com.glide.db.DBConfigurationManager { }
// declare class GlideDBConfigurationManagerEventHandler extends Packages.com.glide.db.DBConfigurationManagerEventHandler { }
// declare class GlideDBConfigurationParms extends Packages.com.glide.db.DBConfigurationParms { }
// declare class GlideDBConfigurationV2Migrator extends Packages.com.glide.db.DBConfigurationV2Migrator { }
// declare class GlideDBConnection extends Packages.com.glide.db.pool.DBConnection { }
// declare class GlideDBConnectionPool extends Packages.com.glide.db.pool.DBConnectionPool { }
// declare class GlideDBConnectionPooler extends Packages.com.glide.db.pool.DBConnectionPooler { }
// declare class GlideDBDelete extends Packages.com.glide.db.DBDelete { }
// declare class GlideDBI extends Packages.com.glide.db.DBI { }
// declare class GlideDBImageProvider extends Packages.com.glide.db_image.DBImageProvider { }
// declare class GlideDBIMySQL extends Packages.com.glide.db.rdbms.mysql.DBIMySQL { }
// declare class GlideDBIndex extends Packages.com.glide.db.DBIndex { }
// declare class GlideDBKeyStoreFactory extends Packages.com.glide.certificates.DBKeyStoreFactory { }
// declare class GlideDBMacro extends Packages.com.glide.ui.jelly.tags.form.DBMacro { }
// declare class GlideDBMicroStats extends Packages.com.glide.db.DBMicroStats { }
// declare class GlideDBMultiTargetAction extends Packages.com.glide.db.DBMultiTargetAction { }
// declare class GlideDBObjectManager extends Packages.com.glide.db.DBObjectManager { }
// declare class GlideDBObjectToken extends Packages.com.glide.db.DBObjectToken { }
// declare class GlideDBPoolTest extends Packages.com.glide.secondary_db_pools.DBPoolTest { }
// declare class GlideDBPropertiesConfig extends Packages.com.glide.db.DBPropertiesConfig { }
// declare class GlideDBQuery extends Packages.com.glide.db.DBQuery { }
// declare class GlideDBTypes extends Packages.com.glide.db.DBTypes { }
// declare class GlideDBUpdate extends Packages.com.glide.db.DBUpdate { }
// declare class GlideDBUtil extends Packages.com.glide.db.DBUtil { }
// declare class GlideDBView extends Packages.com.glide.db.DBView { }
// declare class GlideDebugEvaluator extends Packages.com.glide.jsdebug.DebugEvaluator { }
// declare class GlideDefaultUpdateSaver extends Packages.com.glide.update.saver.DefaultUpdateSaver { }
// declare class GlideDiagram extends Packages.com.glide.diagrammer.Diagram { }
// declare class GlideDiagramAction extends Packages.com.glide.diagrammer.DiagramAction { }
// declare class GlideDiagramEdge extends Packages.com.glide.diagrammer.DiagramEdge { }
// declare class GlideDiagramElement extends Packages.com.glide.diagrammer.DiagramElement { }
// declare class GlideDiagramNode extends Packages.com.glide.diagrammer.DiagramNode { }
// declare class GlideDistUpgradeRunner extends Packages.com.glide.dist.upgrade.runner.DistUpgradeRunner { }
// declare class GlideDocument extends Packages.com.glide.util.GlideDocument { }
// declare class GlideDomain extends Packages.com.glide.db.domain.Domain { }
// declare class GlideDomainDisplay extends Packages.com.glide.db.domain.DomainDisplay { }
// declare class GlideDomainHierarchy extends Packages.com.glide.db.domain.DomainHierarchy { }
// declare class GlideDomainNumberProvider extends Packages.com.glide.db.domain.DomainNumberProvider { }
// declare class GlideDomainPathDisplay extends Packages.com.glide.db.domain.DomainPathDisplay { }
// declare class GlideDomainPathProvider extends Packages.com.glide.db.domain.DomainPathProvider { }
// declare class GlideDomainSpoolProvider extends Packages.com.glide.db.domain.DomainSpoolProvider { }
// declare class GlideDomainSupport extends Packages.com.glide.db.domain.DomainSupport { }
// declare class GlideDomainTree extends Packages.com.glide.db.domain.DomainTree { }
// declare class GlideDomainUtil extends Packages.com.glide.db.domain.DomainUtil { }
// declare class GlideDomainValidator extends Packages.com.glide.db.domain.DomainValidator { }
declare class GlideDuration extends Packages.com.glide.glideobject.GlideDuration { }
// declare class GlideECBDownloader extends Packages.com.glide.currency.ECBDownloader { }
// declare class GlideECCQueueTransformer extends Packages.com.glide.db.impex.ECCQueueTransformer { }
declare class GlideElement extends Packages.com.glide.script.GlideElement { private constructor(); }
declare class GlideElementBoolean extends Packages.com.glide.script.glide_elements.GlideElementBoolean { private constructor(); }
declare class GlideElementConditions extends Packages.com.glide.script.glide_elements.GlideElementConditions { private constructor(); }
declare class GlideElementDescriptor extends Packages.com.glide.db.ElementDescriptor { private constructor(); }
declare class GlideElementDocumentation extends Packages.com.glide.script.glide_elements.GlideElementDocumentation { private constructor(); }
declare class GlideElementDomainId extends Packages.com.glide.script.glide_elements.GlideElementDomainId { private constructor(); }
// declare class GlideElementIterator extends Packages.com.glide.util.ElementIterator { }
declare class GlideElementNumeric extends Packages.com.glide.script.glide_elements.GlideElementNumeric { private constructor(); }
declare class GlideElementPassword2 extends Packages.com.glide.script.glide_elements.GlideElementPassword2 { private constructor(); }
declare class GlideElementReference extends Packages.com.glide.script.glide_elements.GlideElementReference { private constructor(); }
declare class GlideElementRelatedTags extends Packages.com.glide.script.glide_elements.GlideElementRelatedTags { private constructor(); }
declare class GlideElementScript extends Packages.com.glide.script.glide_elements.GlideElementScript { private constructor(); }
declare class GlideElementSysClassName extends Packages.com.glide.script.glide_elements.GlideElementSysClassName { private constructor(); }
declare class GlideElementUserImage extends Packages.com.glide.script.glide_elements.GlideElementUserImage { private constructor(); }
declare class GlideElementVariables extends Packages.com.glide.script.glide_elements.GlideElementVariables { private constructor(); }
declare class GlideElementVariable extends Packages.com.glide.script.glide_elements.GlideElementVariable { private constructor(); }
// declare class GlideElementXMLSerializer extends Packages.com.glide.script.GlideElementXMLSerializer { }
 declare class GlideEmail extends Packages.com.glide.notification.Email { }
// declare class GlideEmailAction extends Packages.com.glide.notification.outbound.EmailAction { }
// declare class GlideEmailFormatter extends Packages.com.glide.notification.outbound.EmailFormatter { }
// declare class GlideEmailInbound extends Packages.com.glide.notification.inbound.EmailInbound { }
declare class GlideEmailOutbound extends Packages.com.glide.notification.outbound.EmailOutbound { }
// declare class GlideEmailReader extends Packages.com.glide.notification.inbound.EmailReader { }
// declare class GlideEmailSender extends Packages.com.glide.notification.outbound.EmailSender { }
 declare class GlideEmailWatermark extends Packages.com.glide.notification.EmailWatermark { }
// declare class GlideEmitter extends Packages.com.glide.ui.jelly.Emitter { }
// declare class GlideEncrypter extends Packages.com.glide.util.Encrypter { }
// declare class GlideEncryptionContext extends Packages.com.glide.sys.EncryptionContext { }
// declare class GlideEncryptionContextCipher extends Packages.com.glide.sys.security.EncryptionContextCipher { }
// declare class GlideEncryptionWrapperDB extends Packages.com.glide.sys.security.EncryptionWrapperDB { }
// declare class GlideEncryptionWrapperDBAdmin extends Packages.com.glide.sys.security.EncryptionWrapperDBAdmin { }
// declare class GlideEncryptionWrapperNAE extends Packages.com.glide.sys.security.EncryptionWrapperNAE { }
// declare class GlideEncryptionWrapperNAEAdmin extends Packages.com.glide.sys.security.EncryptionWrapperNAEAdmin { }
// declare class GlideEscalationManager extends Packages.com.glide.escalation.EscalationManager { }
// declare class GlideEscalationTimerJobMarkII extends Packages.com.glide.job.EscalationTimerJobMarkII { }
declare class GlideEvaluator extends Packages.com.glide.script.Evaluator { }
// declare class GlideEvent extends Packages.com.glide.policy.Event { }
// declare class GlideEventManager extends Packages.com.glide.policy.EventManager { }
// declare class GlideExcelExporter extends Packages.com.glide.generators.ExcelExporter { }
// declare class GlideExcelLoader2 extends Packages.com.glide.db.impex.ExcelLoader2 { }
// declare class GlideExecutionPlan extends Packages.com.glide.execution_plan.ExecutionPlan { }
// declare class GlideExpressionWrapper extends Packages.com.glide.ui.jelly.GlideExpressionWrapper { }
declare class GlideExtensionPoint extends Packages.com.glide.sys.ExtensionPoint { }
// declare class GlideFieldList extends Packages.com.glide.processors.FieldList { }
// declare class GlideFile extends Packages.com.glide.script.proxy.File { }
// declare class GlideFileUtil extends Packages.com.glide.util.FileUtil { }
// declare class GlideFilter extends Packages.com.glide.script.Filter { }
// declare class GlideFilterList extends Packages.com.glide.script.FilterList { }
// declare class GlideFixCatalogPlans extends Packages.com.glide.fixes.FixCatalogPlans { }
// declare class GlideFixDeliveryPlans extends Packages.com.glide.fixes.FixDeliveryPlans { }
// declare class GlideFixGroups extends Packages.com.glide.fixes.FixGroups { }
// declare class GlideFixItemOptionsAgain extends Packages.com.glide.fixes.FixItemOptionsAgain { }
// declare class GlideFixRules extends Packages.com.glide.fixes.FixRules { }
// declare class GlideFixSpellCheck extends Packages.com.glide.fixes.FixSpellCheck { }
// declare class GlideFixStuff extends Packages.com.glide.fixes.FixStuff { }
// declare class GlideFixUsers extends Packages.com.glide.fixes.FixUsers { }
// declare class GlideForm extends Packages.com.glide.ui.GlideForm { }
// declare class GlideFormCommon extends Packages.com.glide.ui.GlideFormCommon { }
// declare class GlideFormulator extends Packages.com.glide.ui.GlideFormulator { }
// declare class GlideGauge extends Packages.com.glide.report.Gauge { }
// declare class GlideGovernor extends Packages.com.glide.sys.util.Governor { }
// declare class GlideGregorianCalendar extends Packages.com.glide.util.GlideGregorianCalendar { }
// declare class GlideGroup extends Packages.com.glide.sys.Group { }
// declare class GlideGroupByListTag extends Packages.com.glide.ui.jelly.tags.form.GroupByListTag { }
// declare class GlideGuid extends Packages.com.glide.util.Guid { }
// declare class GlideHierarchicalReference extends Packages.com.glide.glideobject.HierarchicalReference { }
// declare class GlideHistorySet extends Packages.com.glide.audit.HistorySet { }
// declare class GlideHistoryTag2 extends Packages.com.glide.ui.jelly.tags.mergedata.HistoryTag2 { }
// declare class GlideHostUtil extends Packages.com.glide.util.HostUtil { }
// declare class GlideHTTPClient extends Packages.com.glide.communications.HTTPClient { }
// declare class GlideHTTPRequest extends Packages.com.glide.communications.HTTPRequest { }
// declare class GlideHTTPResponse extends Packages.com.glide.communications.HTTPResponse { }
// declare class GlideI18NStyle extends Packages.com.glide.ui.I18NStyle { }
// declare class GlideICALUtil extends Packages.com.glide.policy.ICALUtil { }
// declare class GlideIConstants extends Packages.com.glide.util.IConstants { }
// declare class GlideIGlideRecord extends Packages.com.glide.util.IGlideRecord { }
// declare class GlideImageLoader extends Packages.com.glide.script.ImageLoader { }
// declare class GlideImpersonate extends Packages.com.glide.sys.Impersonate { }
// declare class GlideImportLog extends Packages.com.glide.db.impex.ImportLog { }
// declare class GlideImportMap extends Packages.com.glide.db.impex.ImportMap { }
// declare class GlideImportMapField extends Packages.com.glide.db.impex.ImportMapField { }
// declare class GlideImportSet extends Packages.com.glide.system_import_set.ImportSet { }
// declare class GlideImportSetLoader extends Packages.com.glide.system_import_set.ImportSetLoader { }
// declare class GlideImportSetRun extends Packages.com.glide.system_import_set.ImportSetRun { }
// declare class GlideImportSetTransformer extends Packages.com.glide.system_import_set.ImportSetTransformer { }
// declare class GlideImportSetTransformerWorker extends Packages.com.glide.system_import_set.ImportSetTransformerWorker { }
// declare class GlideIndexDescriptor extends Packages.com.glide.db.IndexDescriptor { }
// declare class GlideIndexUtils extends Packages.com.glide.db.IndexUtils { }
// declare class GlideIntegerTime extends Packages.com.glide.glideobject.IntegerTime { }
// declare class GlideInternalElementTypeChoiceList extends Packages.com.glide.script.InternalElementTypeChoiceList { }
// declare class GlideInternalMonitor extends Packages.com.glide.ui.monitor.InternalMonitor { }
// declare class GlideIOMonitor extends Packages.com.glide.ui.monitor.IOMonitor { }
// declare class GlideIOStats extends Packages.com.glide.db.IOStats { }
// declare class GlideIPAddressUtil extends Packages.com.glide.util.IPAddressUtil { }
// declare class GlideIQueryCondition extends Packages.com.glide.util.IQueryCondition { }
// declare class GlideIRow extends Packages.com.glide.db.meta.IRow { }
// declare class GlideIRQuerySummary extends Packages.com.glide.db.ir.IRQuerySummary { }
// declare class GlideIRQuerySummarySimple extends Packages.com.glide.db.ir.IRQuerySummarySimple { }
// declare class GlideISecurityManager extends Packages.com.glide.sys.security.ISecurityManager { }
// declare class GlideITableIterator extends Packages.com.glide.db.access.ITableIterator { }
// declare class GlideJDBCLoader extends Packages.com.glide.db.impex.JDBCLoader { }
// declare class GlideJDBCProbeTestWorker extends Packages.com.glide.db.impex.JDBCProbeTestWorker { }
// declare class GlideJellyContext extends Packages.com.glide.ui.jelly.GlideJellyContext { }
// declare class GlideJellyRunner extends Packages.com.glide.ui.jelly.JellyRunner { }
// declare class GlideJID extends Packages.com.glide.xmpp.JID { }
// declare class GlideJSTestUtil extends Packages.com.glide.autotester.JSTestUtil { }
// declare class GlideJSUtil extends Packages.com.glide.script.JSUtil { }
// declare class GlideLabelEventHandler extends Packages.com.glide.labels.LabelEventHandler { }
// declare class GlideLabelGenerator extends Packages.com.glide.db.LabelGenerator { }
// declare class GlideLabelUtil extends Packages.com.glide.labels.LabelUtil { }
// declare class GlideLDAP extends Packages.com.glide.sys.ldap.LDAP { }
// declare class GlideLDAPConfig extends Packages.com.glide.sys.ldap.LDAPConfig { }
// declare class GlideLDAPConfigurations extends Packages.com.glide.sys.ldap.LDAPConfigurations { }
// declare class GlideLDAPErrorAnalyzer extends Packages.com.glide.sys.ldap.LDAPErrorAnalyzer { }
// declare class GlideLDAPGroups extends Packages.com.glide.sys.ldap.LDAPGroups { }
// declare class GlideLDAPRefresh extends Packages.com.glide.sys.ldap.LDAPRefresh { }
// declare class GlideLDAPResult extends Packages.com.glide.sys.ldap.LDAPResult { }
// declare class GlideLDAPTarget extends Packages.com.glide.sys.ldap.LDAPTarget { }
// declare class GlideLDAPTransformQueue extends Packages.com.glide.sys.ldap.LDAPTransformQueue { }
// declare class GlideLDAPUsers extends Packages.com.glide.sys.ldap.LDAPUsers { }
// declare class GlideLDAPUserUpdate extends Packages.com.glide.sys.ldap.LDAPUserUpdate { }
// declare class GlideList extends Packages.com.glide.glideobject.GlideList { }
// declare class GlideListGroupProperties extends Packages.com.glide.list_v2.ListGroupProperties { }
// declare class GlideListLabel extends Packages.com.glide.ui.ListLabel { }
// declare class GlideListM2MBacking extends Packages.com.glide.glideobject.GlideListM2MBacking { }
// declare class GlideListProperties extends Packages.com.glide.list_v2.ListProperties { }
// declare class GlideListSearchQuery extends Packages.com.glide.ui.ListSearchQuery { }
// declare class GlideLoader extends Packages.com.glide.db.impex.Loader { }
// declare class GlideLoadTestDirector extends Packages.com.glide.load_test.LoadTestDirector { }
// declare class GlideLocale extends Packages.com.glide.sys.GlideLocale { }
// declare class GlideLocaleLoader extends Packages.com.glide.currency.LocaleLoader { }
// declare class GlideLock extends Packages.com.glide.script.Lock { }
// declare class GlideLog extends Packages.com.glide.util.Log { }
// declare class GlideLogCleanup extends Packages.com.glide.util.LogCleanup { }
// declare class GlideLogFileReader extends Packages.com.glide.log_file.LogFileReader { }
declare class GlideLRUCache extends Packages.com.glide.sys.cache.LRUCache { }
// declare class GlideLuceneTextIndexEvent extends Packages.com.glide.lucene.TextIndexEvent { }
// declare class GlideMarkupWriter extends Packages.com.glide.util.MarkupWriter { }
// declare class GlideMemoryActive extends Packages.com.glide.ui.monitor.MemoryActive { }
// declare class GlideMemoryCache extends Packages.com.glide.ui.monitor.MemoryCache { }
// declare class GlideMemoryRecord extends Packages.com.glide.script.GlideMemoryRecord { }
// declare class GlideMemorySwap extends Packages.com.glide.ui.monitor.MemorySwap { }
// declare class GlideMemoryTable extends Packages.com.glide.util.MemoryTable { }
// declare class GlideMemoryTotal extends Packages.com.glide.ui.monitor.MemoryTotal { }
// declare class GlideMetaData extends Packages.com.glide.script.MetaData { }
// declare class GlideMIDServerInfoAccessor extends Packages.com.glide.script.MIDServerInfoAccessor { }
// declare class GlideMobileExtensions extends Packages.com.glide.ui.MobileExtensions { }
// declare class GlideModule extends Packages.com.glide.sys.Module { }
// declare class GlideMultipleAction extends Packages.com.glide.db.MultipleAction { }
// declare class GlideMultipleDelete extends Packages.com.glide.db.MultipleDelete { }
// declare class GlideMultipleInsert extends Packages.com.glide.db.MultipleInsert { }
// declare class GlideMultipleUpdate extends Packages.com.glide.db.MultipleUpdate { }
// declare class GlideMutex extends Packages.com.glide.sys.lock.Mutex { }
// declare class GlideMySQLWatch extends Packages.com.glide.sys.stats.MySQLWatch { }
// declare class GlideNumber extends Packages.com.glide.script.glide_elements.GlideNumber { }
// declare class GlideNumberManager extends Packages.com.glide.db.NumberManager { }
// declare class GlideObjectManager extends Packages.com.glide.glideobject.GlideObjectManager { }
// declare class GlideObjectUtil extends Packages.com.glide.util.ObjectUtil { }
// declare class GlideOrderingDefinitionCreator extends Packages.com.glide.sorting.OrderingDefinitionCreator { }
// declare class GlideOrderingManager extends Packages.com.glide.sorting.OrderingManager { }
// declare class GlideOutputWriter extends Packages.com.glide.ui.io.GlideOutputWriter { }
// declare class GlideOutputWriterFactory extends Packages.com.glide.ui.io.GlideOutputWriterFactory { }
// declare class GlideOverLoadedChoices extends Packages.com.glide.script.OverLoadedChoices { }
// declare class GlidePartitionMonitor extends Packages.com.glide.ui.monitor.PartitionMonitor { }
// declare class GlidePivotTableSummaryTableWriter extends Packages.com.glide.ui.chart.dataset.PivotTableSummaryTableWriter { }
declare class GlidePlugin extends Packages.com.glide.sys.Plugin { }
declare class GlidePluginManager extends Packages.com.glide.sys.PluginManager { }
declare class GlidePluginManagerWorker extends Packages.com.glide.sys.PluginManagerWorker { }
// declare class GlidePluginUtils extends Packages.com.glide.sys.PluginUtils { }
// declare class GlidePOP3Reader extends Packages.com.glide.notification.inbound.POP3Reader { }
// declare class GlidePOP3ReaderJob extends Packages.com.glide.job.POP3ReaderJob { }
// declare class GlidePopup extends Packages.com.glide.ui.Popup { }
// declare class GlidePriceGenerator extends Packages.com.glide.currency.PriceGenerator { }
// declare class GlidePriceLoader extends Packages.com.glide.currency.PriceLoader { }
// declare class GlideProcessor extends Packages.com.glide.processors.Processor { }
// declare class GlideProcessRunner extends Packages.com.glide.util.ProcessRunner { }
// declare class GlideProgressMonitor extends Packages.com.glide.worker.ProgressMonitor { }
declare class GlideProgressWorker extends Packages.com.glide.worker.ProgressWorker { }
// declare class GlideProperties extends Packages.com.glide.util.GlideProperties { }
// declare class GlidePropertiesDB extends Packages.com.glide.util.GlidePropertiesDB { }
// declare class GlideProperty extends Packages.com.glide.util.GlideProperty { }
// declare class GlidePublicPage extends Packages.com.glide.ui.PublicPage { }
// declare class GlideQueryBreadcrumbs extends Packages.com.glide.misc.QueryBreadcrumbs { }
declare class GlideQueryCondition extends Packages.com.glide.db.conditions.QueryCondition { protected constructor(); }
// declare class GlideQueryFormatter extends Packages.com.glide.ui.jelly.tags.form.QueryFormatter { }
// declare class GlideQueryString extends Packages.com.glide.db.QueryString { }
// declare class GlideQueryTerm extends Packages.com.glide.db.QueryTerm { }
declare class GlideRecord extends Packages.com.glide.script.GlideRecord { }
// declare class GlideRecordCache extends Packages.com.glide.sys.RecordCache { }
// declare class GlideRecordEnsurer extends Packages.com.glide.misc.RecordEnsurer { }
// declare class GlideRecordFactory extends Packages.com.glide.script.GlideRecordFactory { }
// declare class GlideRecordKeySetLoader extends Packages.com.glide.script.GlideRecordKeySetLoader { }
// declare class GlideRecordLock extends Packages.com.glide.script.RecordLock { }
// declare class GlideRecordPopupGenerator extends Packages.com.glide.calendar.RecordPopupGenerator { }
// declare class GlideRecordRollback extends Packages.com.glide.script.GlideRecordRollback { }
// declare class GlideRecordSet extends Packages.com.glide.script.GlideRecordSet { }
// declare class GlideRecordSimpleSerializer extends Packages.com.glide.script.GlideRecordSimpleSerializer { }
// declare class GlideRecordXMLSerializer extends Packages.com.glide.script.GlideRecordXMLSerializer { }
// declare class GlideReferenceField extends Packages.com.glide.script.ReferenceField { }
// declare class GlideRegexUtil extends Packages.com.glide.util.RegexUtil { }
// declare class GlideRegisterEscalationEvents extends Packages.com.glide.fixes.RegisterEscalationEvents { }
// declare class GlideRelatedListReconciler extends Packages.com.glide.misc.RelatedListReconciler { }
// declare class GlideRelationship extends Packages.com.glide.sys.Relationship { }
// declare class GlideRelationships extends Packages.com.glide.db.Relationships { }
// declare class GlideRelationshipUtil extends Packages.com.glide.sys.RelationshipUtil { }
// declare class GlideRemoteGlideRecord extends Packages.com.glide.communications.RemoteGlideRecord { }
// declare class GlideRenderProperties extends Packages.com.glide.ui.RenderProperties { }
// declare class GlideReplaceUpdateFiles extends Packages.com.glide.util.ReplaceUpdateFiles { }
// declare class GlideReplicationEngine extends Packages.com.glide.replicator.ReplicationEngine { }
// declare class GlideReport extends Packages.com.glide.report.Report { }
// declare class GlideReportChoiceList extends Packages.com.glide.script.ReportChoiceList { }
// declare class GlideReportViewManagement extends Packages.com.glide.report.ReportViewManagement { }
// declare class GlideRequestMap extends Packages.com.glide.util.RequestMap { }
// declare class GlideRevertToOutOfBox extends Packages.com.glide.update.RevertToOutOfBox { }
// declare class GlideRhinoEnvironment extends Packages.com.glide.script.GlideRhinoEnvironment { }
// declare class GlideRhinoHelper extends Packages.com.glide.script.GlideRhinoHelper { }
// declare class GlideRhinoScope extends Packages.com.glide.script.RhinoScope { }
// declare class GlideRhinoScopeHandler extends Packages.com.glide.script.GlideRhinoScopeHandler { }
// declare class GlideRhinoTestCase extends Packages.com.glide.autotester.RhinoTestCase { }
// declare class GlideRRDBAlertProcessor extends Packages.com.glide.rrdb.alerts.RRDBAlertProcessor { }
// declare class GlideRRDBDefinition extends Packages.com.glide.rrdb.RRDBDefinition { }
// declare class GlideRunScriptJob extends Packages.com.glide.job.RunScriptJob { }
// declare class GlideSchedule extends Packages.com.glide.schedules.Schedule { }
// declare class GlideScheduleDateTime extends Packages.com.glide.glideobject.ScheduleDateTime { }
// declare class GlideScheduleDateTimeSpan extends Packages.com.glide.schedules.ScheduleDateTimeSpan { }
// declare class GlideScheduleItem extends Packages.com.glide.schedules.ScheduleItem { }
// declare class GlideScheduler extends Packages.com.glide.schedule.GlideScheduler { }
// declare class GlideScheduleTimeMap extends Packages.com.glide.schedules.ScheduleTimeMap { }
// declare class GlideScheduleTimeSpan extends Packages.com.glide.schedules.ScheduleTimeSpan { }
// declare class GlideScriptChoiceList extends Packages.com.glide.script.ChoiceList { }
declare class GlideScriptedProgressWorker extends Packages.com.glide.worker.ScriptedProgressWorker { }
declare class GlideScriptEvaluator extends Packages.com.glide.script.ScriptEvaluator { }
// declare class GlideScriptGlobals extends Packages.com.glide.script.GlideScriptGlobals { }
// declare class GlideScriptListener extends Packages.com.glide.listener.ScriptListener { }
// declare class GlideScriptProcessor extends Packages.com.glide.processors.ScriptProcessor { }
// declare class GlideScriptRecordUtil extends Packages.com.glide.script.GlideRecordUtil { }
// declare class GlideScriptSystemUtilDB extends Packages.com.glide.script.GlideSystemUtilDB { }
// declare class GlideScriptViewManager extends Packages.com.glide.ui.ViewManager { }
// declare class GlideScriptWriter extends Packages.com.glide.script.ScriptWriter { }
// declare class GlideSearchQueryFormatter extends Packages.com.glide.text_search.SearchQueryFormatter { }
// declare class GlideSecondaryDatabaseBehindnessChecker extends Packages.com.glide.secondary_db_pools.SecondaryDatabaseBehindnessChecker { }
// declare class GlideSecondaryDatabaseConfiguration extends Packages.com.glide.secondary_db_pools.SecondaryDatabaseConfiguration { }
// declare class GlideSecurityManager extends Packages.com.glide.sys.security.GlideSecurityManager { }
// declare class GlideSecurityQueryCalculator extends Packages.com.glide.sys.security.SecurityQueryCalculator { }
// declare class GlideSecurityUtils extends Packages.com.glide.util.SecurityUtils { }
// declare class GlideSelfCleaningMutex extends Packages.com.glide.sys.lock.SelfCleaningMutex { }
// declare class GlideServiceAPIWrapper extends Packages.com.glide.service_api.ServiceAPIWrapper { }
// declare class GlideServlet extends Packages.com.glide.ui.GlideServlet { }
// declare class GlideServletRequest extends Packages.com.glide.ui.GlideServletRequest { }
// declare class GlideServletResponse extends Packages.com.glide.ui.GlideServletResponse { }
// declare class GlideServletStatus extends Packages.com.glide.ui.ServletStatus { }
declare class GlideSession extends Packages.com.glide.sys.GlideSession { protected constructor(); }
// declare class GlideSessionDebug extends Packages.com.glide.sys.SessionDebug { }
// declare class GlideSessions extends Packages.com.glide.ui.Sessions { }
// declare class GlideSessionSandbox extends Packages.com.glide.script.GlideSessionSandbox { }
// declare class GlideShellCommand extends Packages.com.glide.util.ShellCommand { }
// declare class GlideSimmerDown extends Packages.com.glide.db.change.command.SimmerDown { }
// declare class GlideSimmerUp extends Packages.com.glide.db.change.command.SimmerUp { }
// declare class GlideSimpleDateFormatEx extends Packages.com.glide.util.SimpleDateFormatEx { }
// declare class GlideSimpleHTTPClient extends Packages.com.glide.communications.SimpleHTTPClient { }
// declare class GlideSimpleScriptListener extends Packages.com.glide.listener.SimpleScriptListener { }
// declare class GlideSMTPConnection extends Packages.com.glide.notification.outbound.SMTPConnection { }
// declare class GlideSMTPSender extends Packages.com.glide.notification.outbound.SMTPSender { }
// declare class GlideSMTPSenderJob extends Packages.com.glide.job.SMTPSenderJob { }
// declare class GlideSOAPDocument extends Packages.com.glide.communications.soap.SOAPDocument { }
// declare class GlideSOAPRequest extends Packages.com.glide.communications.soap.SOAPRequest { }
// declare class GlideSOAPResponse extends Packages.com.glide.communications.soap.SOAPResponse { }
// declare class GlideSOAPSecurity extends Packages.com.glide.processors.soap.SOAPSecurity { }
// declare class GlideSOAPSigner extends Packages.com.glide.communications.soap.SOAPSigner { }
// declare class GlideSocket extends Packages.com.glide.script.proxy.Socket { }
// declare class GlidesoftGlideAttributesImpl extends Packages.com.glidesoft.util.xml.GlideAttributesImpl { }
// declare class GlidesoftXMLMemoryTable extends Packages.com.glidesoft.util.xml.XMLMemoryTable { }
// declare class GlideSQLChildMonitor extends Packages.com.glide.monitor.sql.SQLChildMonitor { }
// declare class GlideSQLDebug extends Packages.com.glide.ui.diagnostics.SQLDebug { }
// declare class GlideSQLDeleteMonitor extends Packages.com.glide.monitor.sql.SQLDeleteMonitor { }
// declare class GlideSQLInsertMonitor extends Packages.com.glide.monitor.sql.SQLInsertMonitor { }
// declare class GlideSQLResponseMonitor extends Packages.com.glide.monitor.sql.SQLResponseMonitor { }
// declare class GlideSQLSelectMonitor extends Packages.com.glide.monitor.sql.SQLSelectMonitor { }
// declare class GlideSQLUpdateMonitor extends Packages.com.glide.monitor.sql.SQLUpdateMonitor { }
// declare class GlideSSHClient extends Packages.com.glide.communications.SSHClient { }
// declare class GlideStack extends Packages.com.glide.sys.GlideStack { }
// declare class GlideStatistician extends Packages.com.glide.sys.stats.Statistician { }
// declare class GlideStatsInfo extends Packages.com.glide.monitor.StatsInfo { }
// declare class GlideStatus extends Packages.com.glide.util.GlideStatus { }
// declare class GlideStopWatch extends Packages.com.glide.util.StopWatch { }
// declare class GlideStorageUtils extends Packages.com.glide.db.meta.StorageUtils { }
// declare class GlideStringCache extends Packages.com.glide.sys.cache.StringCache { }
// declare class GlideStringInputStream extends Packages.com.glide.util.StringInputStream { }
// declare class GlideStringList extends Packages.com.glide.collections.StringList { }
// declare class GlideStringUtil extends Packages.com.glide.util.StringUtil { }
// declare class GlideSubQuery extends Packages.com.glide.db.conditions.SubQuery { }
// declare class GlideSubstituteURL extends Packages.com.glide.notification.substitution.SubstituteURL { }
// declare class GlideSummaryTableGroupReader extends Packages.com.glide.ui.chart.dataset.SummaryTableGroupReader { }
// declare class GlideSummaryTableOrderedReader extends Packages.com.glide.ui.chart.dataset.SummaryTableOrderedReader { }
// declare class GlideSummaryTableReader extends Packages.com.glide.ui.chart.dataset.SummaryTableReader { }
// declare class GlideSummaryTableWriter extends Packages.com.glide.ui.chart.dataset.SummaryTableWriter { }
// declare class GlideSynchronizedLRUCache extends Packages.com.glide.sys.cache.SynchronizedLRUCache { }
// declare class GlideSysAttachment extends Packages.com.glide.ui.SysAttachment { }
// declare class GlideSysAttachmentInputStream extends Packages.com.glide.ui.SysAttachmentInputStream { }
// declare class GlideSysBRThreadMonitor extends Packages.com.glide.monitor.threads.SysBRThreadMonitor { }
// declare class GlideSysChoice extends Packages.com.glide.script.SysChoice { }
// declare class GlideSysConcurrencyMonitor extends Packages.com.glide.monitor.threads.SysConcurrencyMonitor { }
// declare class GlideSysCPUThreadMonitor extends Packages.com.glide.monitor.threads.SysCPUThreadMonitor { }
// declare class GlideSysDateUtil extends Packages.com.glide.sys.util.SysDateUtil { }
// declare class GlideSysDBThreadMonitor extends Packages.com.glide.monitor.threads.SysDBThreadMonitor { }
// declare class GlideSysField extends Packages.com.glide.db.SysField { }
// declare class GlideSysFileUtil extends Packages.com.glide.sys.util.SysFileUtil { }
declare class GlideSysForm extends Packages.com.glide.ui.SysForm { }
// declare class GlideSysForms extends Packages.com.glide.ui.SysForms { }
declare class GlideSysList extends Packages.com.glide.ui.SysList { }
// declare class GlideSysListControl extends Packages.com.glide.ui.SysListControl { }
// declare class GlideSysLog extends Packages.com.glide.sys.SysLog { }
// declare class GlideSYSMany2Many extends Packages.com.glide.db.SYSMany2Many { }
// declare class GlideSysMessage extends Packages.com.glide.ui.SysMessage { }
// declare class GlideSysNetThreadMonitor extends Packages.com.glide.monitor.threads.SysNetThreadMonitor { }
// declare class GlideSysRelatedList extends Packages.com.glide.ui.SysRelatedList { }
// declare class GlideSysSection extends Packages.com.glide.ui.SysSection { }
// declare class GlideSysSemaphore extends Packages.com.glide.sys.util.SysSemaphore { }
declare class GlideSystem extends Packages.com.glide.script.GlideSystem { protected constructor(); }
// declare class GlideSystemDateUtil extends Packages.com.glide.script.system.GlideSystemDateUtil { }
// declare class GlideSystemUtil extends Packages.com.glide.util.SystemUtil { }
// declare class GlideSystemUtilDB extends Packages.com.glide.script.system.GlideSystemUtilDB { }
// declare class GlideSystemUtilScript extends Packages.com.glide.script.system.GlideSystemUtilScript { }
// declare class GlideSysThreadMonitor extends Packages.com.glide.monitor.threads.SysThreadMonitor { }
// declare class GlideSysUserList extends Packages.com.glide.ui.SysUserList { }
// declare class GlideTable extends Packages.com.glide.db.meta.Table { }
// declare class GlideTableChoiceList extends Packages.com.glide.script.TableChoiceList { }
// declare class GlideTableCleaner extends Packages.com.glide.misc.TableCleaner { }
// declare class GlideTableCleanerJob extends Packages.com.glide.job.TableCleanerJob { }
// declare class GlideTableCreator extends Packages.com.glide.db.impex.TableCreator { }
// declare class GlideTableDescriptor extends Packages.com.glide.db.TableDescriptor { }
// declare class GlideTableGroupMover extends Packages.com.glide.db.auxiliary.TableGroupMover { }
// declare class GlideTableManager extends Packages.com.glide.db.TableManager { }
// declare class GlideTableMover extends Packages.com.glide.db.auxiliary.TableMover { }
// declare class GlideTableParentChange extends Packages.com.glide.db.table.TableParentChange { }
// declare class GlideTableParentColumnChange extends Packages.com.glide.db.table.TableParentColumnChange { }
// declare class GlideTaskToken extends Packages.com.glide.execution_plan.TaskToken { }
// declare class GlideTemplate extends Packages.com.glide.script.Template { }
// declare class GlideTestAgent extends Packages.com.glide.autotester.GlideTestAgent { }
// declare class GlideTextIndexEvent extends Packages.com.glide.ts.event.TextIndexEvent { }
// declare class GlideThreadAttributes extends Packages.com.glide.ui.GlideThreadAttributes { }
// declare class GlideThreadUtil extends Packages.com.glide.util.ThreadUtil { }
declare class GlideTime extends Packages.com.glide.glideobject.GlideTime { }
// declare class GlideTimelineFrameSeparator extends Packages.com.glide.schedules.TimelineFrameSeparator { }
// declare class GlideTimelineItem extends Packages.com.glide.schedules.TimelineItem { }
// declare class GlideTimelineSpan extends Packages.com.glide.schedules.TimelineSpan { }
// declare class GlideTomcatHelper extends Packages.com.glide.startup.TomcatHelper { }
// declare class GlideTransaction extends Packages.com.glide.sys.Transaction { }
// declare class GlideTransactionManager extends Packages.com.glide.sys.TransactionManager { }
// declare class GlideTransferAuditDataHelper extends Packages.com.glide.audit.TransferAuditDataHelper { }
// declare class GlideTransformer extends Packages.com.glide.db.impex.transformer.Transformer { }
// declare class GlideTreePicker extends Packages.com.glide.ui.TreePicker { }
// declare class GlideTSAnalysisViewer extends Packages.com.glide.ts.cluster.TSAnalysisViewer { }
// declare class GlideTSAnalyticsProcessor extends Packages.com.glide.ts.cluster.TSAnalyticsProcessor { }
// declare class GlideTSChainsHandler extends Packages.com.glide.ts.trends.TSChainsHandler { }
// declare class GlideTSChainsLoader extends Packages.com.glide.ts.trends.TSChainsLoader { }
// declare class GlideTSChainsPusher extends Packages.com.glide.ts.trends.TSChainsPusher { }
// declare class GlideTSChainsSummarizer extends Packages.com.glide.ts.trends.TSChainsSummarizer { }
// declare class GlideTSClusterDefinitions extends Packages.com.glide.ts.cluster.TSClusterDefinitions { }
// declare class GlideTSDebug extends Packages.com.glide.ts.util.TSDebug { }
// declare class GlideTSDidYouMean extends Packages.com.glide.ts.util.TSDidYouMean { }
// declare class GlideTSGlobalKeywordSummarizer extends Packages.com.glide.ts.trends.TSGlobalKeywordSummarizer { }
// declare class GlideTSIndexStatistician extends Packages.com.glide.ts.stats.TSIndexStatistician { }
// declare class GlideTSIndexStopGenerator extends Packages.com.glide.ts.stats.TSIndexStopGenerator { }
// declare class GlideTSIndexTables extends Packages.com.glide.ts.indexer.TSIndexTables { }
// declare class GlideTSKeywordHandler extends Packages.com.glide.ts.trends.TSKeywordHandler { }
// declare class GlideTSKeywordLoader extends Packages.com.glide.ts.trends.TSKeywordLoader { }
// declare class GlideTSKeywordPusher extends Packages.com.glide.ts.trends.TSKeywordPusher { }
// declare class GlideTSMoversViewer extends Packages.com.glide.ts.cluster.TSMoversViewer { }
// declare class GlideTSSearchStatistician extends Packages.com.glide.ts.stats.TSSearchStatistician { }
// declare class GlideTSSearchSummary extends Packages.com.glide.ts.trends.TSSearchSummary { }
// declare class GlideTSTopSearches extends Packages.com.glide.ts.util.TSTopSearches { }
// declare class GlideTSUtil extends Packages.com.glide.ts.util.TSUtil { }
// declare class GlideTSVersion extends Packages.com.glide.ts.TSVersion { }
// declare class GlideUIAction extends Packages.com.glide.ui.action.UIAction { }
// declare class GlideUISession extends Packages.com.glide.ui.Session { }
// declare class GlideUnloader extends Packages.com.glide.db.impex.Unloader { }
declare class GlideUpdateManager2 extends Packages.com.glide.update.UpdateManager2 { }
// declare class GlideUpdateSet extends Packages.com.glide.update.UpdateSet { }
// declare class GlideUpdateSetController extends Packages.com.glide.system_update_set.UpdateSetController { }
// declare class GlideUpdateSetPreviewer extends Packages.com.glide.update.UpdateSetPreviewer { }
// declare class GlideUpdateSetWorker extends Packages.com.glide.update.UpdateSetWorker { }
// declare class GlideUpdateSyncher extends Packages.com.glide.policy.UpdateSyncher { }
// declare class GlideUpdateTableChoiceList extends Packages.com.glide.script.UpdateTableChoiceList { }
// declare class GlideUpgrade extends Packages.com.glide.sys.Upgrade { }
// declare class GlideUpgradeArtifactManager extends Packages.com.glide.misc.UpgradeArtifactManager { }
// declare class GlideUpgradeLog extends Packages.com.glide.update.UpgradeLog { }
// declare class GlideUpgradeMonitor extends Packages.com.glide.update.UpgradeMonitor { }
declare class GlideURI extends Packages.com.glide.ui.GlideURI { }
// declare class GlideURL extends Packages.com.glide.util.GlideURL { }
// declare class GlideURLUTF8Encoder extends Packages.com.glide.util.URLUTF8Encoder { }
// declare class GlideURLUtil extends Packages.com.glide.util.URLUtil { }
declare class GlideUser extends Packages.com.glide.sys.User { }
// declare class GlideUserAuthenticator extends Packages.com.glide.sys.UserAuthenticator { }
// declare class GlideUserGroup extends Packages.com.glide.sys.UserGroup { }
// declare class GlideUtil extends Packages.com.glide.util.GlideUtil { }
// declare class GlideViewRuleNavigator extends Packages.com.glide.ui.ViewRuleNavigator { }
// declare class GlideWarDeleter extends Packages.com.glide.misc.WarDeleter { }
// declare class GlideWarDownloader extends Packages.com.glide.misc.WarDownloader { }
// declare class GlideWhiteListManager extends Packages.com.glide.script.api.GlideWhiteListManager { }
// declare class GlideWikiModel extends Packages.com.glide.wiki.GlideWikiModel { }
// declare class GlideWorkerThread extends Packages.com.glide.worker.WorkerThread { }
// declare class GlideWorkerThreadManager extends Packages.com.glide.sys.WorkerThreadManager { }
// declare class GlideWSClient extends Packages.com.glide.util.WSClient { }
// declare class GlideWSDefinition extends Packages.com.glide.wsdlreader.WSDefinition { }
// declare class GlideWSDLReader extends Packages.com.glide.wsdlreader.GlideWSDLReader { }
// declare class GlideXMLChoiceListSerializer extends Packages.com.glide.choice.XMLChoiceListSerializer { }
declare class GlideXMLDocument extends Packages.com.glide.util.XMLDocument { }
// declare class GlideXMLElementIterator extends Packages.com.glide.util.XMLElementIterator { }
// declare class GlideXMLGlideRecordSerializer extends Packages.com.glide.processors.xmlhttp.XMLGlideRecordSerializer { }
// declare class GlideXMLParameters extends Packages.com.glide.util.XMLParameters { }
// declare class GlideXMLStats extends Packages.com.glide.ui.XMLStats { }
// declare class GlideXMLSysMetaSerializer extends Packages.com.glide.processors.xmlhttp.XMLSysMetaSerializer { }
// declare class GlideXMLUtil extends Packages.com.glide.util.XMLUtil { }
// declare class GlideZipUtil extends Packages.com.glide.util.ZipUtil { }
// declare class RhinoEnvironment extends Packages.com.glide.script.RhinoEnvironment { }
// declare class RhinoHelper extends Packages.com.glide.script.RhinoHelper { }
// declare class SecurelyAccess extends Packages.com.glide.sys.util.SecurelyAccess { }
// declare class ServiceAPI extends Packages.com.glide.service_api.ServiceAPI { }
// declare class SncAddress32Bit extends Packages.com.snc.commons.networks.Address32Bit { }
// declare class SncAliasApplier extends Packages.com.snc.field_normalization.AliasApplier { }
// declare class SncAppFiles extends Packages.com.snc.apps.api.AppFiles { }
// declare class SncApplicationFileListener extends Packages.com.snc.apps.db.ApplicationFileListener { }
// declare class SncAppsAccess extends Packages.com.snc.apps.api.AppsAccess { }
// declare class SncAppsUI extends Packages.com.snc.apps.api.AppsUI { }
// declare class SncASensor extends Packages.com.snc.discovery.sensor.ASensor { }
// declare class SncAuthentication extends Packages.com.snc.authentication.digest.Authentication { }
// declare class SncBaselineCMDB extends Packages.com.snc.cmdb.BaselineCMDB { }
// declare class SncBulkCopy extends Packages.com.snc.ha.clone.BulkCopy { }
// declare class SncClassifiedProcess extends Packages.com.snc.discovery.sensor.ClassifiedProcess { }
// declare class SncClassify extends Packages.com.snc.discovery.sensor.snmp.Classify { }
// declare class SncCloneController extends Packages.com.snc.ha.clone.CloneController { }
// declare class SncCloneInstance extends Packages.com.snc.ha.clone.instance.Instance { }
// declare class SncCloneLogger extends Packages.com.snc.ha.clone.CloneLogger { }
// declare class SncCloneTask extends Packages.com.snc.ha.clone.CloneTask { }
// declare class SncCloneUtils extends Packages.com.snc.ha.clone.CloneUtils { }
// declare class SncConfiguration extends Packages.com.snc.field_normalization.db.Configuration { }
// declare class SncConfigurations extends Packages.com.snc.field_normalization.Configurations { }
// declare class SncConnectionTest extends Packages.com.snc.ha.connectivity.ConnectionTest { }
// declare class SncDBChangeManagerFactoryHA extends Packages.com.snc.db.clone.change.DBChangeManagerFactoryHA { }
// declare class SncDeviceHistory extends Packages.com.snc.discovery.logging.DeviceHistory { }
// declare class SncDiscoveryCancel extends Packages.com.snc.discovery.DiscoveryCancel { }
// declare class SncDiscoveryClassification extends Packages.com.snc.discovery.DiscoveryClassification { }
// declare class SncDiscoveryLog extends Packages.com.snc.discovery.logging.DiscoveryLog { }
// declare class SncDiscoveryRanges extends Packages.com.snc.commons.networks.DiscoveryRanges { }
// declare class SncDiscoveryRangesDB extends Packages.com.snc.discovery.DiscoveryRangesDB { }
// declare class SncDiscoveryReconciler extends Packages.com.snc.discovery.database.DiscoveryReconciler { }
// declare class SncDiscoverySNMPClassification extends Packages.com.snc.discovery.sensor.snmp.DiscoverySNMPClassificatio { }
// declare class SncDiscoveryUtils extends Packages.com.snc.discovery.DiscoveryUtils { }
// declare class SncDropBackupTablesTask extends Packages.com.snc.ha.clone.instance.DropBackupTablesTask { }
// declare class SncDropTablesTask extends Packages.com.snc.ha.clone.DropTablesTask { }
// declare class SncEC2Properties extends Packages.com.snc.ec2.EC2Properties { }
// declare class SncECMDBUtil extends Packages.com.snc.cmdb.ECMDBUtil { }
// declare class SncElrondClient extends Packages.com.snc.customer_logon.ElrondClient { }
// declare class SncExpert extends Packages.com.snc.expert.Expert { }
// declare class SncExpertInstance extends Packages.com.snc.expert.ExpertInstance { }
// declare class SncExpertPanel extends Packages.com.snc.expert.ExpertPanel { }
// declare class SncExtantDataJob extends Packages.com.snc.field_normalization.db.ExtantDataJob { }
// declare class SncExtantDataJobState extends Packages.com.snc.field_normalization.ExtantDataJobState { }
// declare class SncFailoverController extends Packages.com.snc.da.gateway.replication.FailoverController { }
// declare class SncFileTree extends Packages.com.snc.apps.file.FileTree { }
// declare class SncGatewayCache extends Packages.com.snc.da.gateway.GatewayCache { }
// declare class SncGatewayClone extends Packages.com.snc.da.gateway.clone.GatewayClone { }
// declare class SncGatewayConnectivity extends Packages.com.snc.da.gateway.GatewayConnectivity { }
// declare class SncGatewayPluginStartup extends Packages.com.snc.da.gateway.replication.GatewayPluginStartup { }
// declare class SncGatewayTruncateHierarchy extends Packages.com.snc.da.gateway.clone.GatewayTruncateHierarchy { }
// declare class SncGlideGateways extends Packages.com.snc.da.gateway.GlideGateways { }
// declare class SncHAClone extends Packages.com.snc.ha.clone.HAClone { }
// declare class SncHAConnectionTest extends Packages.com.snc.ha.connectivity.HAConnectionTest { }
// declare class SncHADatabaseCheck extends Packages.com.snc.ha.tablecheck.HADatabaseCheck { }
// declare class SncHAPairingUtils extends Packages.com.snc.ha.HAPairingUtils { }
// declare class SncHAReplicationController extends Packages.com.snc.ha.HAReplicationController { }
// declare class SncHAReplicationQueueSnapshotBuilder extends Packages.com.snc.ha.tablecheck.HAReplicationQueueSnapshotBuilder { }
// declare class SncHATableCheck extends Packages.com.snc.ha.tablecheck.HATableCheck { }
// declare class SncHATableCheckThread extends Packages.com.snc.ha.tablecheck.HATableCheckThread { }
// declare class SncHATableQuickCheck extends Packages.com.snc.ha.tablecheck.HATableQuickCheck { }
// declare class SncHATableRepair extends Packages.com.snc.ha.tablecheck.HATableRepair { }
// declare class SncHAUtils extends Packages.com.snc.ha.HAUtils { }
// declare class SncHostname extends Packages.com.snc.discovery.utils.Hostname { }
// declare class SncInstanceClone extends Packages.com.snc.ha.clone.instance.InstanceClone { }
// declare class SncInstanceConnectionTest extends Packages.com.snc.ha.connectivity.InstanceConnectionTest { }
// declare class SncInstanceRollback extends Packages.com.snc.ha.clone.instance.InstanceRollback { }
// declare class SncIPAddressV4 extends Packages.com.snc.commons.networks.IPAddressV4 { }
// declare class SncIPAddressV6 extends Packages.com.snc.commons.networks.IPAddressV6 { }
// declare class SncIPAuthenticator extends Packages.com.snc.ipauthenticator.IPAuthenticator { }
// declare class SncIPIterator extends Packages.com.snc.commons.networks.IPIterator { }
// declare class SncIPList extends Packages.com.snc.commons.networks.IPList { }
// declare class SncIPMetaCollection extends Packages.com.snc.commons.networks.IPMetaCollection { }
// declare class SncIPNetmaskV4 extends Packages.com.snc.commons.networks.IPNetmaskV4 { }
// declare class SncIPNetworkV4 extends Packages.com.snc.commons.networks.IPNetworkV4 { }
// declare class SncIPRangeV4 extends Packages.com.snc.commons.networks.IPRangeV4 { }
// declare class SncJRobinGraphDef extends Packages.com.snc.jrobin.JRobinGraphDef { }
// declare class SncLayer7Connections extends Packages.com.snc.discovery.Layer7Connections { }
// declare class SncMACAddress extends Packages.com.snc.commons.networks.MACAddress { }
// declare class SncMACAddressMfr extends Packages.com.snc.commons.networks.MACAddressMfr { }
// declare class SncMakeAndModel extends Packages.com.snc.cmdb.MakeAndModel { }
// declare class SncMIDConfigParameter extends Packages.com.snc.commons.MIDConfigParameter { }
// declare class SncMIDServerRangesDB extends Packages.com.snc.discovery.MIDServerRangesDB { }
// declare class SncNormalCoalescer extends Packages.com.snc.field_normalization.NormalCoalescer { }
// declare class SncNormalizer extends Packages.com.snc.field_normalization.Normalizer { }
// declare class SncNormalValueChanger extends Packages.com.snc.field_normalization.NormalValueChanger { }
// declare class SncNotifySNC extends Packages.com.snc.system.NotifySNC { }
// declare class SncOnCallRotation extends Packages.com.snc.on_call_rotation.OnCallRotation { }
// declare class SncPendingValueCollector extends Packages.com.snc.field_normalization.PendingValueCollector { }
// declare class SncPreferences extends Packages.com.snc.field_normalization.Preferences { }
// declare class SncPrintServerHelper extends Packages.com.snc.discovery.database.PrintServerHelper { }
// declare class SncProbe extends Packages.com.snc.discovery.Probe { }
// declare class SncProbeRunTime extends Packages.com.snc.discovery.perfmon.ProbeRunTime { }
// declare class SncRBSensorProcessor extends Packages.com.snc.discovery_automation.RBSensorProcessor { }
// declare class SncReadTest extends Packages.com.snc.ha.ReadTest { }
// declare class SncReclassifyCI extends Packages.com.snc.cmdb.ReclassifyCI { }
// declare class SncRelationships extends Packages.com.snc.cmdb.Relationships { }
// declare class SncReplicationAdvisor extends Packages.com.snc.db.replicate.ReplicationAdvisor { }
// declare class SncReplicationEngine extends Packages.com.snc.db.replicate.ReplicationEngine { }
// declare class SncReplicationQueue extends Packages.com.snc.db.replicate.ReplicationQueue { }
// declare class SncRequestCredentials extends Packages.com.snc.customer_logon.RequestCredentials { }
// declare class SncRrdGlideBackendFactory extends Packages.com.snc.jrobin.RrdGlideBackendFactory { }
// declare class SncRuleApplier extends Packages.com.snc.field_normalization.RuleApplier { }
// declare class SncRuleToPending extends Packages.com.snc.field_normalization.RuleToPending { }
// declare class SncSAMCounter extends Packages.com.snc.software_asset_management.SAMCounter { }
// declare class SncScheduleDropBackupTablesTask extends Packages.com.snc.ha.clone.instance.ScheduleDropBackupTablesTask { }
// declare class SncScrapeIANAEnterpriseNumbers extends Packages.com.snc.discovery.database.ScrapeIANAEnterpriseNumbers { }
// declare class SncScrapeIEEENICCodes extends Packages.com.snc.discovery.database.ScrapeIEEENICCodes { }
// declare class SncSendNotificationTask extends Packages.com.snc.ha.clone.instance.SendNotificationTask { }
// declare class SncSensorProcessor extends Packages.com.snc.discovery.SensorProcessor { }
// declare class SncSerialNumber extends Packages.com.snc.discovery.SerialNumber { }
// declare class SncSerialNumberList extends Packages.com.snc.discovery.SerialNumberList { }
// declare class SncSessionMate extends Packages.com.snc.discovery.SessionMate { }
// declare class SncSimmerControl extends Packages.com.snc.ha.clone.instance.SimmerControl { }
// declare class SncTableEditor extends Packages.com.snc.apps.api.TableEditor { }
// declare class SncTableRotation extends Packages.com.snc.db.replicate.TableRotation { }
// declare class SncTableRotationExtension extends Packages.com.snc.db.replicate.TableRotationExtension { }
// declare class SncTableRotationExtensions extends Packages.com.snc.db.replicate.TableRotationExtensions { }
// declare class SncTableRotationWatcher extends Packages.com.snc.db.replicate.TableRotationWatcher { }
// declare class SncTransformApplier extends Packages.com.snc.field_normalization.TransformApplier { }
// declare class SncTreeBuilder extends Packages.com.snc.apps.tree.TreeBuilder { }
// declare class SncTriggerSynchronizer extends Packages.com.snc.automation.TriggerSynchronizer { }
// declare class SncValue extends Packages.com.snc.field_normalization.db.Value { }
// declare class TestExtension extends Packages.com.glide.junit.misc.TestExtension { }
// declare class UINotification extends Packages.com.glide.ui.UINotification { }

/**
 * Global GlideSystem instance.
 */
declare let gs: GlideSystem;