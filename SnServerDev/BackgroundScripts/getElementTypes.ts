/// <reference path="../SnTypings/ServiceNowLegacy.ts" />

var tableName: string = 'sc_category';
function indentLines(l: string[]): string[] { return l.map(function (value: string): string { return (value.trim().length === 0) ? "" : "\t" + value; }); }
var typeMap: { [key: string]: string } = {
    "integer": "IStringGlideElement", "decimal": "IStringGlideElement", "email": "IStringGlideElement", "ph_number": "IStringGlideElement", "glide_date": "IStringGlideElement",
    "glide_date_time": "IStringGlideElement", "float": "IStringGlideElement", "string": "IStringGlideElement", "boolean": "IBooleanGlideElement", "GUID": "IGUIDGlideElement",
    "url": "IStringGlideElement", "currency": "IStringGlideElement", "wide_text": "IStringGlideElement", "due_date": "IStringGlideElement",
    "glide_duration": "IStringGlideElement", "price": "IStringGlideElement", "translated_text": "IStringGlideElement", "translated_field": "IStringGlideElement"
}
var stringTypes: string[] = ["integer", "decimal", "email", "ph_number", "glide_date", "glide_date_time", "float"];
var sys_db_object: Isys_db_objectGlideRecord = <Isys_db_objectGlideRecord><any>new GlideRecord('sys_db_object');
sys_db_object.addQuery('name', tableName);
sys_db_object.query();
if (sys_db_object.next()) {
    var lines: string[] = [];
    var sys_id = sys_db_object.sys_id.toString();
    var gr: Isys_dictionaryGlideRecord = <Isys_dictionaryGlideRecord><any>new GlideRecord('sys_dictionary');
    gr.addQuery('name', tableName)
    gr.query();
    var memberOf = " * @memberof I" + tableName + "GlideRecord";
    while (gr.next()) {
        if (!gr.element.nil()) {
            var element: string = gr.element.toString();
            if (element.length > 0) {
                var internal_type: string = gr.internal_type.toString();
                var jsType: string = "GlideElement";
                var description: string = "";
                if (internal_type == "reference") {
                    jsType = "I" + gr.reference.name.toString() + "GlideElement";
                    description = "Reference to " + gr.reference.label.toString() + " (IGlideRefElement<I" + gr.reference.name.toString() + "GlideRecord>)";
                } else if (typeof typeMap[internal_type] === "undefined")
                    description = "Internal type is " + JSON.stringify(internal_type);
                else {
                    jsType = typeMap[internal_type];
                    if (internal_type !== "boolean" && internal_type != "string" && internal_type != "GUID")
                        description = "Internal type is " + JSON.stringify(internal_type);
                }
                lines.push("/" + "**");
                lines.push(" * " + gr.column_label.toString());
                lines.push(" * @type {" + jsType + "}");
                lines.push(memberOf);
                if (description.length > 0)
                    lines.push(" * @description " + description);
                lines.push(" *" + "/");
                lines.push(element + ": " + jsType + ";");
            }
        }
    }
    lines = indentLines(lines);
    var extnds: string = "IGlideRecord";
    if (!sys_db_object.super_class.nil())
        extnds = "I" + sys_db_object.super_class.name.toString() + "GlideRecord";
    lines.unshift("declare interface I" + tableName + "GlideRecord extends " + extnds + " {");
    lines.unshift(" *" + "/");
    lines.unshift(" * @extends {" + extnds + "}");
    lines.unshift(" * @interface I" + tableName + "GlideRecord");
    lines.unshift(" * GlideRecord that contains values from a record in the " + sys_db_object.label.toString() + " table.");
    lines.unshift("/" + "**");
    lines.push("}");
    gs.info(lines.join("\n"));
} else
    gs.warn("Table " + JSON.stringify(tableName) + " not found");
