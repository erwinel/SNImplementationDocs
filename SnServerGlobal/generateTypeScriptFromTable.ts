namespace generateTypeScriptFromTable {
    var targetTableName: string = 'wf_workflow';

    interface IChoiceItem {
        readonly label: string;
        readonly value: string;
        readonly sequence: number;
    }

    interface IFieldInfo {
        internal_type: string;
        js_type: string;
        title: string;
        isArray: boolean;
        mandatory: boolean;
        read_only: boolean;
        max_length: number;
        column_label: string;
        comments: string;
        default_value: string;
        choices: IChoiceItem[];
        overides?: string | null;
        inheritedFrom?: string | null;
        referenceTable?: string;
    }

    interface IOverriddenField extends IFieldInfo {
        overides: string;
        inheritedFrom?: null;
    }

    interface IInheritedField extends IFieldInfo {
        overides?: null;
        inheritedFrom: string;
    }

    interface IInstanceField extends IFieldInfo {
        overides?: null;
        inheritedFrom?: null;
    }

    type FieldInfo = IOverriddenField | IInstanceField | IInheritedField;

    interface IFieldInfoPrototype extends IFieldInfo, ICustomClassPrototype1<IFieldInfoPrototype, 'FieldInfoItem', FieldInfo> {
        toJSON(): FieldInfo;
    }

    type FieldInfoInstance = IFieldInfoPrototype & Readonly<IFieldInfo>;

    interface IFieldInfoConstructor extends CustomClassConstructor1<IFieldInfoPrototype, FieldInfoInstance, FieldInfo> {
        new(source: FieldInfo): FieldInfoInstance;
        (source: FieldInfo): FieldInfoInstance;
        isOverriddenField(field: IFieldInfoPrototype): field is IFieldInfoPrototype & { overides: string; inheritedFrom?: null; };
        isInheritedField(field: IFieldInfoPrototype): field is IFieldInfoPrototype & { overides?: null; inheritedFrom: string; };
        isInstanceField(field: IFieldInfoPrototype): field is IFieldInfoPrototype & { overides?: null; inheritedFrom?: null; };
    }

    interface ITableClass {
        sys_id: string;
        name: string;
        label: string;
        providerClass: string;
        super_class?: string;
    }

    interface ITableClassCacheItem extends ITableClass {
        fields: { [key: string]: IOverriddenField | IInstanceField; };
    }

    interface ITableClassInfo extends ITableClass {
        fields: { [key: string]: FieldInfoInstance; };
    }

    interface ITableClassInfoPrototype extends ITableClassInfo, ICustomClassPrototype2<ITableClassInfoPrototype, 'TableClassInfo', string, boolean | undefined> {
        toJSON(): ITableClass & { fields: { [key: string]: FieldInfo; }; };
        toTypeScript(): string;
    }

    type TableClassInfoInstance = ITableClassInfoPrototype & Readonly<ITableClassInfo>;

    interface ITableClassInfoConstructor extends CustomClassConstructor2<ITableClassInfoPrototype, TableClassInfoInstance, string, boolean | undefined> {
        new(table: string | sys_db_objectGlideRecord, allFields?: boolean): TableClassInfoInstance;
        (table: string | sys_db_objectGlideRecord, allFields?: boolean): TableClassInfoInstance;
    }
    
    let TableClassInfo: ITableClassInfoConstructor & Function = (function (): ITableClassInfoConstructor & Function {
        var jsTypeMapping: { [key: string]: { className: string; shouldAnnotate: boolean; } } = {
            "integer": { className: "GlideElementNumeric", shouldAnnotate: false }, "decimal": { className: "GlideElementNumeric", shouldAnnotate: true }, "float": { className: "GlideElementNumeric", shouldAnnotate: true },
            "currency": { className: "GlideElementNumeric", shouldAnnotate: true }, "price": { className: "GlideElementNumeric", shouldAnnotate: true }, "longint": { className: "GlideElementNumeric", shouldAnnotate: true },
            "string": { className: "StringGlideElement", shouldAnnotate: false }, "GUID": { className: "StringGlideElement", shouldAnnotate: true }, "email": { className: "StringGlideElement", shouldAnnotate: true },
            "ph_number": { className: "StringGlideElement", shouldAnnotate: true }, "glide_date": { className: "StringGlideElement", shouldAnnotate: true }, "glide_date_time": { className: "StringGlideElement", shouldAnnotate: true },
            "due_date": { className: "StringGlideElement", shouldAnnotate: true }, "date": { className: "StringGlideElement", shouldAnnotate: true }, "boolean": { className: "GlideElementBoolean", shouldAnnotate: false },
            "url": { className: "StringGlideElement", shouldAnnotate: true }, "wide_text": { className: "StringGlideElement", shouldAnnotate: true }, "glide_duration": { className: "StringGlideElement", shouldAnnotate: true },
            "translated_text": { className: "StringGlideElement", shouldAnnotate: true }, "translated_field": { className: "StringGlideElement", shouldAnnotate: true }, "html": { className: "StringGlideElement", shouldAnnotate: true },
            "char": { className: "StringGlideElement", shouldAnnotate: true }, "table_name": { className: "StringGlideElement", shouldAnnotate: true }, "field_name": { className: "StringGlideElement", shouldAnnotate: true },
            "translated_html": { className: "StringGlideElement", shouldAnnotate: true }, "password": { className: "GlideElementPassword", shouldAnnotate: false }, "password2": { className: "GlideElementPassword2", shouldAnnotate: false },
            "script": { className: "GlideElementScript", shouldAnnotate: false }, "domain_id": { className: "GlideElementDomainId", shouldAnnotate: false }, "variables": { className: "GlideElementVariables", shouldAnnotate: false },
            "user_image": { className: "GlideElementUserImage", shouldAnnotate: false }, "documentation_field": { className: "GlideElementDocumentation", shouldAnnotate: false }, "sys_class_name": { className: "GlideElementSysClassName", shouldAnnotate: false },
            "conditions": { className: "GlideElementConditions", shouldAnnotate: false }
        };

        function sortObjects<T>(source: T[], compare: { (x: T, y: T): number }): T[] {
            if (typeof source !== "object" || source === null || !(Array.isArray(source) && source.length > 1))
                return source;
            if (source.length == 2)
                return (compare(source[0], source[1]) > 0) ? [source[1], source[0]] : source;

            let i: number = 0;
            let e: number = 1;
            let result: T[] = [source[0]];
            do {
                let x: T = result[i];
                let n: number = i + 1;
                let y: T = (n < result.length) ? result[n] : source[n];
                if (compare(x, y) > 0) {
                    result[i] = y;
                    if (n < result.length)
                        result[n] = x;
                    else
                        result.push(x);
                    if (i == 0)
                        i = e++;
                    else
                        i--;
                } else if ((i = e++) == result.length)
                    result.push(y);
            } while (e < source.length);
            return result;
        }

        function sortChoices(source: IChoiceItem[]): IChoiceItem[] {
            return sortObjects<IChoiceItem>(source, function (x: IChoiceItem, y: IChoiceItem) {
                if (isNaN(x.sequence))
                    return (isNaN(y.sequence)) ? 0 : 1;
                if (isNaN(y.sequence))
                    return -1;
                let result: number = y.sequence - x.sequence;
                if (result !== 0)
                    return result;
                if (x.value === y.value)
                    return (x.label == y.label) ? 0 : (x.label < y.label) ? -1 : 1;
                return (x.value < y.value) ? -1 : 1;
            });
        }

        function areChoicesEqual(x: IChoiceItem, y: IChoiceItem) {
            if (typeof x !== "object" || x === null)
                return typeof y !== "object" || y === null;
            return typeof y === "object" && y !== null && x.label === y.label && x.value === y.value && x.sequence == y.sequence;
        }

        function areFieldsEqual(x: FieldInfo, y: FieldInfo, excludeChoices?: boolean): boolean {
            if (typeof x !== "object" || x === null)
                return typeof y !== "object" || y === null;
            if (typeof y !== "object" || y === null || x.internal_type !== y.internal_type || x.js_type !== y.js_type || x.title !== y.title || x.isArray !== y.isArray || x.mandatory !== y.mandatory || x.read_only !== y.read_only ||
                x.max_length !== y.max_length || x.column_label !== y.column_label || x.comments !== y.comments || x.default_value !== y.default_value || x.referenceTable !== y.referenceTable)
                return false;
            if (excludeChoices)
                return true;
            if (x.choices.length != y.choices.length)
                return false;

            if (x.choices.length == 1)
                return areChoicesEqual(x.choices[0], y.choices[0]);
            if (x.choices.length > 1) {
                let arrX: IChoiceItem[] = sortChoices(x.choices);
                let arrY: IChoiceItem[] = sortChoices(y.choices);
                for (let i: number = 0; i < arrX.length; i++)
                    if (!areChoicesEqual(arrX[0], arrY[0]))
                        return false;
            }
            return true;
        }

        function duplicateFieldInfo(source: FieldInfo, replace?: Partial<FieldInfo>, ...omit: string[]): FieldInfo {
            if (typeof source !== "object" || source === null)
                return source;
            let result = {};
            if (typeof omit !== "object" || omit === null || omit.length == 0) {
                if (typeof replace === "object" && replace !== null)
                    for (var n in source) {
                        if (typeof replace[n] === "undefined") {
                            if (n === 'choices')
                                result['choices'] = source.choices.map(function (value: IChoiceItem): IChoiceItem { return { label: value.label, sequence: value.sequence, value: value.value }; });
                            else
                                result[n] = source[n];
                        }
                        else
                            result[n] = replace[n];
                    }
                else
                    for (var n in source) {
                        if (n === 'choices')
                            result['choices'] = source.choices.map(function (value: IChoiceItem): IChoiceItem { return { label: value.label, sequence: value.sequence, value: value.value }; });
                        else
                            result[n] = source[n];
                    }
            } else if (omit.length == 1) {
                let o: string = omit[0];
                if (typeof replace === "object" && replace !== null)
                    for (var n in source) {
                        if (n !== o) {
                            if (typeof replace[n] === "undefined") {
                                if (n === 'choices')
                                    result['choices'] = source.choices.map(function (value: IChoiceItem): IChoiceItem { return { label: value.label, sequence: value.sequence, value: value.value }; });
                                else
                                    result[n] = source[n];
                            }
                            else
                                result[n] = replace[n];
                        }
                    }
                else
                    for (var n in source) {
                        if (n !== o) {
                            if (n === 'choices')
                                result['choices'] = source.choices.map(function (value: IChoiceItem): IChoiceItem { return { label: value.label, sequence: value.sequence, value: value.value }; });
                            else
                                result[n] = source[n];
                        }
                    }
            } else if (typeof replace === "object" && replace !== null)
                for (var n in source) {
                    if (omit.indexOf(n) < 0) {
                        if (typeof replace[n] === "undefined") {
                            if (n === 'choices')
                                result['choices'] = source.choices.map(function (value: IChoiceItem): IChoiceItem { return { label: value.label, sequence: value.sequence, value: value.value }; });
                            else
                                result[n] = source[n];
                        }
                        else
                            result[n] = replace[n];
                    }
                }
            else
                for (var n in source) {
                    if (omit.indexOf(n) < 0) {
                        if (n === 'choices')
                            result['choices'] = source.choices.map(function (value: IChoiceItem): IChoiceItem { return { label: value.label, sequence: value.sequence, value: value.value }; });
                        else
                            result[n] = source[n];
                    }
                }

            return <FieldInfo>result;
        }

        function isOverriddenField(field: IFieldInfo): field is IOverriddenField { return typeof field === "object" && field !== null && typeof field.overides === "string" }

        function isInheritedField(field: IFieldInfo): field is IInheritedField { return typeof field === "object" && field !== null && typeof field.inheritedFrom === "string" }

        function isInstanceField(field: IFieldInfo): field is IInstanceField { return typeof field === "object" && field !== null && typeof field.overides !== "string" && typeof field.inheritedFrom !== "string" }

        function toOverriddenField(field: FieldInfo, overrides: string): IOverriddenField { return <IOverriddenField>duplicateFieldInfo(field, { overides: overrides }, 'inheritedFrom'); }

        function toInheritedField(field: FieldInfo, inheritedFrom: string): IInheritedField { return <IInheritedField>duplicateFieldInfo(field, { inheritedFrom: inheritedFrom }, 'overrides'); }

        var rootFields: { [key: string]: FieldInfo; } = {
            sys_created_by: { column_label: "Created by", comments: "", default_value: "", internal_type: "string", isArray: false, js_type: "StringGlideElement", mandatory: false, max_length: 40, read_only: false, title: "Created by", choices: [] },
            sys_created_on: { column_label: "Created", comments: "", default_value: "", internal_type: "glide_date_time", isArray: false, js_type: "StringGlideElement", mandatory: false, max_length: 40, read_only: false, title: "Created", choices: [] },
            sys_id: { column_label: "Sys ID", comments: "", default_value: "", internal_type: "GUID", isArray: false, js_type: "StringGlideElement", mandatory: false, max_length: 32, read_only: false, title: "Sys ID", choices: [] },
            sys_mod_count: { column_label: "Updates", comments: "", default_value: "", internal_type: "integer", isArray: false, js_type: "GlideElementNumeric", mandatory: false, max_length: 40, read_only: false, title: "Updates", choices: [] },
            sys_updated_by: { column_label: "Updated by", comments: "", default_value: "", internal_type: "string", isArray: false, js_type: "StringGlideElement", mandatory: false, max_length: 40, read_only: false, title: "Updated by", choices: [] },
            sys_updated_on: { column_label: "Updated", comments: "", default_value: "", internal_type: "glide_date_time", isArray: false, js_type: "StringGlideElement", mandatory: false, max_length: 40, read_only: false, title: "Updated", choices: [] }
        };

        let cache: { [key: string]: ITableClassCacheItem; } = {};

        function getAllFields(tableName: string): { [key: string]: FieldInfo; } {
            let item: ITableClassCacheItem = cache[tableName];
            if (typeof item !== "object" || item === null)
                return {};

            let result: { [key: string]: FieldInfo; } | undefined = {};
            for (var n in item.fields)
                result[n] = duplicateFieldInfo(item.fields[n]);
            let super_class: { [key: string]: FieldInfo; };
            if (typeof item.super_class === "string")
                super_class = getAllFields(item.super_class);
            if (typeof super_class != "undefined")
                for (var n in super_class) {
                    if (typeof result[n] === "undefined")
                        result[n] = (isInheritedField(super_class[n])) ? super_class[n] : toInheritedField(super_class[n], item.super_class);
                }
            else {
                let r: { [key: string]: FieldInfo; } = {};
                for (var n in result) {
                    if (typeof rootFields[n] === "undefined" || !areFieldsEqual(rootFields[n], result[n]))
                        r[n] = result[n];
                }
                return r;
            }
            return result;
        }

        function getTableClassInfo(table: string | sys_db_objectGlideRecord, doNotCreate?: boolean): ITableClassCacheItem | null | undefined {
            let sys_db_object: sys_db_objectGlideRecord;
            let tableName: string;
            let t: ITableClassCacheItem;
            //gs.info("Invoked getTableClassInfo(" + (typeof table) + " " + JSON.stringify(table) + ((typeof doNotCreate === "undefined") ? ")" : JSON.stringify(doNotCreate) + ")"));
            if (typeof table === "string") {
                t = cache[table];
                if (typeof t === "object") {
                    //gs.info("Returning table " + JSON.stringify(table) + " from cache");
                    return t;
                }
                if (doNotCreate === true)
                    return;
                
                sys_db_object = <sys_db_objectGlideRecord>new GlideRecord("sys_db_object");
                sys_db_object.addQuery('name', table);
                //gs.info("Querying table sys_db_object with " + sys_db_object.getEncodedQuery());
                sys_db_object.query();
                if (!sys_db_object.next()) {
                    //gs.warn("Table " + JSON.stringify(table) + " not found");
                    cache[table] = null;
                    return null;
                }
                tableName = table;
            } else {
                if (typeof table !== "object" || table === null)
                    return;
                tableName = "" + table.name;
                t = cache[tableName];
                if (typeof t === "object") {
                    //gs.info("Returning table " + JSON.stringify(tableName) + " from cache");
                    return t;
                }
                sys_db_object = table;
            }
            let super_class: ITableClassCacheItem | null;
            if (sys_db_object.super_class.nil() || typeof (super_class = getTableClassInfo(sys_db_object.super_class.getRefRecord())) !== "object")
                super_class = null;
            let cacheItem: ITableClassCacheItem = {
                fields: {},
                name: "" + sys_db_object.name,
                sys_id: "" + sys_db_object.sys_id,
                label: "" + sys_db_object.label,
                providerClass: "" + sys_db_object.provider_class
            };
            //gs.info("Creating new cache item: " + JSON.stringify(cacheItem));
            let sys_dictionary: sys_dictionaryGlideRecord = <sys_dictionaryGlideRecord>new GlideRecord('sys_dictionary');
            sys_dictionary.addActiveQuery();
            sys_dictionary.addNotNullQuery('element');
            sys_dictionary.addQuery('name', tableName);
            //gs.info('Querying sys_dictionary with ' + sys_dictionary.getEncodedQuery());
            sys_dictionary.query();

            let allFields: { [key: string]: IOverriddenField | IInstanceField; } = {};
            while (sys_dictionary.next()) {
                let element: string = "" + sys_dictionary.element;
                let internal_type: string = "" + sys_dictionary.internal_type;
                let typeMapping: { className: string; shouldAnnotate: boolean; } = jsTypeMapping[internal_type];
                let field: IInstanceField = {
                    column_label: "" + sys_dictionary.column_label,
                    comments: (sys_dictionary.comments.nil()) ? "" : "" + sys_dictionary.comments,
                    default_value: (sys_dictionary.default_value.nil()) ? "" : "" + sys_dictionary.default_value,
                    internal_type: internal_type,
                    isArray: !(sys_dictionary.array.nil() || ("" + sys_dictionary.array) !== "true"),
                    js_type: (internal_type === "reference") ? sys_dictionary.reference.name + "ElementReference" : ((typeof typeMapping === "object") ? typeMapping.className : 'GlideElement'),
                    mandatory: !(sys_dictionary.mandatory.nil() || ("" + sys_dictionary.mandatory) !== "true"),
                    max_length: (sys_dictionary.max_length.nil()) ? NaN : parseInt("" + sys_dictionary.max_length),
                    read_only: !(sys_dictionary.read_only.nil() || ("" + sys_dictionary.read_only) !== "true"),
                    title: "" + sys_dictionary.column_label,
                    choices: []
                };

                if (field.internal_type !== "reference") {
                    var gr: sys_choiceGlideRecord = <sys_choiceGlideRecord>new GlideRecord('sys_choice');
                    gr.addQuery('name', tableName);
                    gr.addQuery('element', element);
                    //gs.info('Querying sys_choice with ' + gr.getEncodedQuery());
                    gr.query();
                    while (gr.next())
                        field.choices.push({
                            label: "" + gr.label,
                            sequence: (gr.sequence.nil()) ? NaN : parseInt("" + gr.sequence),
                            value: (gr.value.nil()) ? "" : "" + gr.value
                        });
                } else if (!sys_dictionary.reference.nil())
                    field.referenceTable = "" + sys_dictionary.reference.name;
                allFields[element] = field;
            }
            //gs.info("All fields: " + JSON.stringify(allFields));
            let parentFields: { [key: string]: FieldInfo; } | null;


            if (super_class !== null) {
                cacheItem.super_class = super_class.name;
                parentFields = getAllFields(super_class.name);
                if (typeof parentFields !== "object" || parentFields === null)
                    for (var n in allFields) {
                        if (typeof rootFields[n] !== "undefined")
                            continue;
                        if (typeof parentFields[n] === "undefined")
                            cacheItem.fields[n] = allFields[n];
                        else if (allFields[n].choices.length > 0) {
                            //gs.info('Comparing ' + JSON.stringify(allFields[n]) + " to " + JSON.stringify(parentFields[n]));
                            if (!areFieldsEqual(allFields[n], parentFields[n]))
                                (cacheItem.fields[n] = allFields[n]).overides = (isInheritedField(parentFields[n])) ? parentFields[n].inheritedFrom : super_class.name;
                            //else
                            //    gs.info("Skipping equal field");
                        } else if (!areFieldsEqual(allFields[n], parentFields[n], true)) {
                            //gs.info('Not equal: ' + JSON.stringify(allFields[n]) + " : " + JSON.stringify(parentFields[n]));
                            if (parentFields[n].choices.length > 0)
                                allFields[n].choices = parentFields[n].choices.map(function (value: IChoiceItem): IChoiceItem { return { label: value.label, sequence: value.sequence, value: value.value }; });
                            (cacheItem.fields[n] = allFields[n]).overides = (isInheritedField(parentFields[n])) ? parentFields[n].inheritedFrom : super_class.name;
                        }
                        //else
                        //    gs.info('Are equal: ' + JSON.stringify(allFields[n]) + " : " + JSON.stringify(parentFields[n]));
                    }
                else
                    for (var n in allFields) {
                        if (typeof rootFields[n] === "undefined")
                            cacheItem.fields[n] = allFields[n];
                    }
            }
            else
                for (var n in allFields) {
                    if (typeof rootFields[n] === "undefined")
                        cacheItem.fields[n] = allFields[n];
                }

            cache[tableName] = cacheItem;
            return cacheItem;
        }

        let FieldInfoItem: IFieldInfoConstructor = Class.create<IFieldInfoConstructor>();
        FieldInfoItem.prototype = {
            initialize(this: IFieldInfoPrototype, source: FieldInfo): void {
                this.choices = (source.choices.length == 0) ? [] : source.choices.map(function (value: IChoiceItem): IChoiceItem { return { label: value.label, sequence: value.sequence, value: value.value }; });
                this.column_label = source.column_label;
                this.comments = source.comments;
                this.default_value = source.default_value;
                if (typeof source.inheritedFrom === "string")
                    this.inheritedFrom = source.inheritedFrom;
                this.internal_type = source.internal_type;
                this.isArray = source.isArray;
                this.js_type = source.js_type;
                this.mandatory = source.mandatory;
                this.max_length = source.max_length;
                if (typeof source.overides === "string")
                    this.overides = source.overides;
                this.read_only = source.read_only;
                this.title = source.title;
                if (typeof source.referenceTable === "string")
                    this.referenceTable = source.referenceTable;
            },
            toJSON: function (this: IFieldInfoPrototype): FieldInfo {
                let result: FieldInfo;
                if (typeof this.inheritedFrom === "string")
                    result = <IInheritedField>{
                        choices: (this.choices.length == 0) ? [] : this.choices.map(function (value: IChoiceItem): IChoiceItem { return { label: value.label, sequence: value.sequence, value: value.value }; }),
                        column_label: this.column_label,
                        comments: this.comments,
                        default_value: this.default_value,
                        internal_type: this.internal_type,
                        isArray: this.isArray,
                        js_type: this.js_type,
                        mandatory: this.mandatory,
                        max_length: this.max_length,
                        read_only: this.read_only,
                        title: this.title,
                        inheritedFrom: this.inheritedFrom
                    };
                else if (typeof this.overides === "string")
                    result = <IOverriddenField>{
                        choices: (this.choices.length == 0) ? [] : this.choices.map(function (value: IChoiceItem): IChoiceItem { return { label: value.label, sequence: value.sequence, value: value.value }; }),
                        column_label: this.column_label,
                        comments: this.comments,
                        default_value: this.default_value,
                        internal_type: this.internal_type,
                        isArray: this.isArray,
                        js_type: this.js_type,
                        mandatory: this.mandatory,
                        max_length: this.max_length,
                        read_only: this.read_only,
                        title: this.title,
                        overides: this.overides
                    };
                else
                    result = <IInstanceField>{
                        choices: (this.choices.length == 0) ? [] : this.choices.map(function (value: IChoiceItem): IChoiceItem { return { label: value.label, sequence: value.sequence, value: value.value }; }),
                        column_label: this.column_label,
                        comments: this.comments,
                        default_value: this.default_value,
                        internal_type: this.internal_type,
                        isArray: this.isArray,
                        js_type: this.js_type,
                        mandatory: this.mandatory,
                        max_length: this.max_length,
                        read_only: this.read_only,
                        title: this.title
                    };
                if (typeof this.referenceTable === "string")
                    result.referenceTable = this.referenceTable;
                return result;
            },
            choices: [],
            column_label: '',
            comments: '',
            default_value: '',
            internal_type: '',
            isArray: false,
            js_type: '',
            mandatory: false,
            max_length: NaN,
            read_only: false,
            title: '',
            type: "FieldInfoItem"
        };
        FieldInfoItem.isOverriddenField = function (field: IFieldInfoPrototype): field is IFieldInfoPrototype & { overides: string; inheritedFrom?: null; } { return typeof field === "object" && field !== null && typeof field.overides === "string"; }
        FieldInfoItem.isInheritedField = function (field: IFieldInfoPrototype): field is IFieldInfoPrototype & { overides?: null; inheritedFrom: string; } { return typeof field === "object" && field !== null && typeof field.inheritedFrom === "string"; }
        FieldInfoItem.isInstanceField = function (field: IFieldInfoPrototype): field is IFieldInfoPrototype & { overides?: null; inheritedFrom?: null; } { return typeof field === "object" && field !== null && typeof field.overides !== "string" && field.inheritedFrom !== "string"; }

        let lineSplitRe: RegExp = /[\r\n]+/g;

        let classObj: ITableClassInfoConstructor = Class.create<ITableClassInfoConstructor>();
        classObj.prototype = {
            initialize(this: ITableClassInfoPrototype, table: string | sys_db_objectGlideRecord, allFields?: boolean): void {
                let item: ITableClassCacheItem = getTableClassInfo(table);
                if (typeof item !== "object" || item === null)
                    throw new Error("Table " + JSON.stringify((typeof table === "string") ? table : table + "") + " not found");
                this.label = item.label;
                this.name = item.name;
                this.providerClass = item.providerClass;
                this.sys_id = item.sys_id;
                if (typeof item.super_class === "string")
                    this.super_class = item.super_class;
                if (allFields === true) {
                    let allFields: { [key: string]: FieldInfo; } = getAllFields(item.name);
                    for (var n in allFields)
                        this.fields[n] = new FieldInfoItem(allFields[n]);
                } else
                    for (var n in item.fields)
                        this.fields[n] = new FieldInfoItem(item.fields[n]);
            },
            toJSON: function (this: ITableClassInfoPrototype): ITableClass & { fields: { [key: string]: FieldInfo; } } {
                let result: ITableClass & { fields: { [key: string]: FieldInfo; } } = {
                    label: this.label,
                    name: this.name,
                    providerClass: this.providerClass,
                    sys_id: this.sys_id,
                    fields: {}
                };
                if (typeof this.super_class === "string")
                    result.super_class = this.super_class;
                for (var n in this.fields)
                    result.fields[n] = this.fields[n].toJSON();
                return result;
            },
            toTypeScript: function (this: ITableClassInfoPrototype): string {
                let name: string = "I" + this.name + "Columns";
                let lines: string[] = [
                    "/**",
                    " * GlideElement values from the " + this.label + " table.",
                    " * @interface " + name
                ];
                if (typeof this.super_class === "string")
                    lines.push(" * @extends {I" + this.super_class + "Columns}", " */", "declare interface " + name + " extends I" + this.super_class + "Columns {")
                else
                    lines.push(" */", "declare interface " + name + " extends IGlideElementColumns {");
                for (var n in this.fields) {
                    let f: FieldInfoInstance = this.fields[n];
                    lines.push("    /**", "     * " + f.column_label, "     * @type {" + f.js_type + "}", "     * @memberof " + name);
                    if (f.read_only)
                        lines.push("     * @readonly");

                    if (typeof f.default_value == "string" && f.default_value.length > 0) {
                        let default_value: string = f.default_value;
                        if (f.js_type === "GlideElementBoolean") {
                            if (default_value !== "true" && default_value !== "false") {
                                let dn: number = parseFloat(default_value);
                                if (isNaN(dn))
                                    default_value = JSON.stringify(default_value);
                                else
                                    default_value = dn.toString();
                            }
                        } else if (f.js_type === "GlideElementNumeric") {
                            let nn: number = parseFloat(default_value);
                            if (isNaN(nn))
                                default_value = JSON.stringify(default_value);
                            else
                                default_value = nn.toString();
                        } else
                            default_value = JSON.stringify(default_value);
                        lines.push("     * @default " + default_value);
                    }
                    let internalType: string = "";
                    let comments: string[] = (typeof f.comments === "string" && f.comments.trim().length > 0) ? f.comments.trim().split(lineSplitRe) : [];
                    let endsWithComments: boolean = comments.length > 0;
                    if (typeof f.referenceTable === "string") {
                        if (endsWithComments) {
                            endsWithComments = false;
                            comments.push("");
                        }
                        comments.push("Reference to table \"" + f.referenceTable + "\"");
                        if (f.isArray)
                            comments.push("Internal type is \"Array<reference>\"");
                    } else {
                        let typeMapping: { className: string; shouldAnnotate: boolean; } = jsTypeMapping[f.internal_type];
                        if (typeof typeMapping === "undefined" || typeMapping.shouldAnnotate) {
                            if (endsWithComments) {
                                endsWithComments = false;
                                comments.push("");
                            }
                            if (f.isArray)
                                comments.push("Internal type is \"Array<" + f.internal_type + ">\"");
                            else
                                comments.push("Internal type is \"" + f.internal_type + "\"");
                        } else if (f.isArray) {
                            if (endsWithComments) {
                                endsWithComments = false;
                                comments.push("");
                            }
                            comments.push("Internal type is \"Array<" + ((typeof typeMapping === "undefined") ? "GlideElement" : f.internal_type) + ">\"");
                        }
                        if (f.choices.length > 0) {
                            if (endsWithComments) {
                                endsWithComments = false;
                                comments.push("");
                            }
                            comments.push("Choices: " + sortChoices(f.choices).map(function (c: IChoiceItem) {
                                return JSON.stringify(c.value) + ": " + JSON.stringify(c.label);
                            }).join("; "));
                        }
                    }

                    if (f.js_type === "StringGlideElement" && !(isNaN(f.max_length) || f.max_length < 1)) {
                        if (endsWithComments) {
                            endsWithComments = false;
                            comments.push("");
                        }
                        comments.push("Max length: " + f.max_length);
                    }
                    if (typeof f.overides === "string") {
                        if (endsWithComments) {
                            endsWithComments = false;
                            comments.push("");
                        }
                        comments.push("Overrides: " + JSON.stringify(f.overides));
                    }
                    if (comments.length > 0) {
                        lines.push("     * @description " + comments[0]);
                        for (let n: number = 1; n < comments.length; n++)
                            lines.push("     *      " + comments[n]);
                    }
                    lines.push("     */", "    " + n + ": " + f.js_type + ";", "");
                }
                return lines.join("\n") + "}";
            },
            fields: {},
            label: '',
            name: '',
            providerClass: '',
            sys_id: '',
            type: "TableClassInfo"
        };
        return classObj;
    })();

    let tableInfo: TableClassInfoInstance = new TableClassInfo(targetTableName);
    gs.info(tableInfo.toTypeScript());
}