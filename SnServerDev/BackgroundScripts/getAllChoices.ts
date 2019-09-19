namespace getAllChoices {
    var tableName: string = 'incident';
    var fieldName: string = 'state';
    var gr: GlideRecord = new GlideRecord(tableName);
    gr.initialize();
    var element: GlideElement = gr.getElement(fieldName);
    var choices: Packages.java.lang.util.IArrayList<Packages.java.lang.String> = element.getChoices();
    var values: string[] = [];
    for (var i: number = 0; i < choices.size(); i++)
        values.push(<string><any>choices.get(i));
    gs.info(JSON.stringify(values));
    gs.info(values.map(function (value: string) {
        element.setValue(value);
        var i: number = parseInt(value);
        if (isNaN(i))
            return JSON.stringify(value) + "=" + JSON.stringify(element.getDisplayValue());
        return JSON.stringify(i) + "=" + JSON.stringify(element.getDisplayValue());
    }).join("; "));
}