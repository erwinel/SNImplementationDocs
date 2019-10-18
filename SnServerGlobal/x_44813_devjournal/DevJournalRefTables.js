/// <reference path="../SnTypings/JavaTypes.d.ts" />
/// <reference path="../SnTypings/GlideSystem.d.ts" />
/// <reference path="../SnTypings/GlideRecord.d.ts" />
var x_44813_devjournal;
(function (x_44813_devjournal) {
    var DevJournalRefTables = Class.create();
    DevJournalRefTables.prototype = {
        initialize: function () {
        },
        process: function () {
            var gr = new GlideRecord('sys_dictionary');
            gr.addActiveQuery();
            gr.addNullQuery('element');
            gr.addNotNullQuery('name');
            gr.addQuery('sys_scope.scope', '!=', 'x_44813_devjournal');
            gr.query();
            var names = [];
            while (gr.next())
                names.push("" + gr.name);
            return names;
        },
        type: 'DevJournalRefTables'
    };
})(x_44813_devjournal || (x_44813_devjournal = {}));
//# sourceMappingURL=DevJournalRefTables.js.map