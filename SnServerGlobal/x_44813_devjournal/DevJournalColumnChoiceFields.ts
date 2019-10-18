namespace x_44813_devjournal {
    interface IDevJournalColumnChoiceFields {
        process: { (tableName: string): string[]; };
    }
    interface IDevJournalColumnChoicePrototype extends IDevJournalColumnChoiceFields, ICustomClassPrototype0<IDevJournalColumnChoicePrototype, 'DevJournalColumnChoiceFields'> { }
    type DevJournalColumnChoiceInstance = IDevJournalColumnChoicePrototype & Readonly<IDevJournalColumnChoiceFields>;
    interface IDevGournalColumnChoiceConstructor extends CustomClassConstructor0<IDevJournalColumnChoicePrototype, DevJournalColumnChoiceInstance> { }
    var DevJournalColumnChoiceFields: IDevGournalColumnChoiceConstructor = Class.create<IDevGournalColumnChoiceConstructor>();
    DevJournalColumnChoiceFields.prototype = {
        initialize: function () {
        },
        process: function (tableName: string): string[] {
            var gr: GlideRecord = new GlideRecord('sys_dictionary');
            gr.addActiveQuery();
            gr.addNotNullQuery('element');
            gr.addQuery('name', tableName);
            gr.query();
            var names: string[] = [];
            while (gr.next())
                names.push("" + gr.element);
            return names;
        },
        type: 'DevJournalColumnChoiceFields'
    };
}/*
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