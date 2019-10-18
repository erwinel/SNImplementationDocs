var x_44813_devjournal;
(function (x_44813_devjournal) {
    var DevJournalFieldValues = Class.create();
    DevJournalFieldValues.prototype = {
        initialize: function () {
        },
        process: function (tableName) {
            var gr = new GlideRecord('sys_dictionary');
            gr.addActiveQuery();
            gr.addNotNullQuery('element');
            gr.addQuery('name', tableName);
            gr.query();
            var names = [];
            while (gr.next())
                names.push("" + gr.element);
            return names;
            var gr = new GlideRecord('sys_ui_bookmark');
            gr.next();
            gs.info(gr.Url);
            var gr = new GlideRecord('sys_user');
            gr.addQuery('vip', 'false');
            gr.query();
            gr.next();
            gs.info(gr.getEncodedQuery());
        },
        type: 'DevJournalFieldValues'
    };
})(x_44813_devjournal || (x_44813_devjournal = {}));
//# sourceMappingURL=DevJournalFieldValues.js.map