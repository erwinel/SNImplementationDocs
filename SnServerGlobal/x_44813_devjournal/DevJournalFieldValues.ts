namespace x_44813_devjournal {
    interface IDevJournalFieldValues {
        process: { (tableName: string): string[]; };
    }
    interface IDevJournalFieldValuesPrototype extends IDevJournalFieldValues, ICustomClassPrototype0<IDevJournalFieldValuesPrototype, 'DevJournalFieldValues'> { }
    type DevJournalFieldValuesInstance = IDevJournalFieldValuesPrototype & Readonly<IDevJournalFieldValues>;
    interface IDevGournalColumnChoiceConstructor extends CustomClassConstructor0<IDevJournalFieldValuesPrototype, DevJournalFieldValuesInstance> { }
    var DevJournalFieldValues: IDevGournalColumnChoiceConstructor = Class.create<IDevGournalColumnChoiceConstructor>();
    DevJournalFieldValues.prototype = {
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
}