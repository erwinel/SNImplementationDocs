var getAllChoices;
(function (getAllChoices) {
    var tableName = 'incident';
    var fieldName = 'state';
    var gr = new GlideRecord(tableName);
    gr.initialize();
    var element = gr.getElement(fieldName);
    var choices = element.getChoices();
    var values = [];
    for (var i = 0; i < choices.size(); i++)
        values.push(choices.get(i));
    gs.info(JSON.stringify(values));
    gs.info(values.map(function (value) {
        element.setValue(value);
        var i = parseInt(value);
        if (isNaN(i))
            return JSON.stringify(value) + "=" + JSON.stringify(element.getDisplayValue());
        return JSON.stringify(i) + "=" + JSON.stringify(element.getDisplayValue());
    }).join("; "));
})(getAllChoices || (getAllChoices = {}));
//# sourceMappingURL=getAllChoices.js.map