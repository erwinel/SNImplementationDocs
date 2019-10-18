var x_44813_devjournal;
(function (x_44813_devjournal) {
    var DevJournalColumnChoiceFields = Class.create();
    DevJournalColumnChoiceFields.prototype = {
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
        },
        type: 'DevJournalColumnChoiceFields'
    };
})(x_44813_devjournal || (x_44813_devjournal = {})); /*
 *
 * Dev Journal Entry: general
 *      Event Registry Journal Entry: event_registry
 *          Business Rules
 *          Fix Scripts
 *          Script Includes
 *          Workflow Activities
 *      Table Dev Journal Entry: table
 *          Field Dev Journal Entry: column
 *              Relationship Dev Journal Entry: table_relationship
 *              Record Dev Journal Entry: table_record
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
//# sourceMappingURL=DevJournalColumnChoiceFields.js.map