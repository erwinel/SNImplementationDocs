/// <reference path="../SnTypings/JavaTypes.d.ts" />
/// <reference path="../SnTypings/GlideSystem.d.ts" />
/// <reference path="../SnTypings/GlideRecord.d.ts" />

namespace x_44813_devjournal {
    interface IDevJournalRefTablesFields {
        process: { (): string[]; };
    }
    interface IDevJournalRefTablesPrototype extends IDevJournalRefTablesFields, ICustomClassPrototype0<IDevJournalRefTablesPrototype, 'DevJournalRefTables'> { }
    type DevJournalRefTablesInstance = IDevJournalRefTablesPrototype & Readonly<IDevJournalRefTablesFields>;
    interface DevJournalRefTablesConstructor extends CustomClassConstructor0<IDevJournalRefTablesPrototype, DevJournalRefTablesInstance> { }
    var DevJournalRefTables: DevJournalRefTablesConstructor = Class.create<DevJournalRefTablesConstructor>();
    DevJournalRefTables.prototype = {
        initialize: function () {
        },
        process: function (): string[] {
            var gr: GlideRecord = new GlideRecord('sys_dictionary');
            gr.addActiveQuery();
            gr.addNullQuery('element');
            gr.addNotNullQuery('name');
            gr.addQuery('sys_scope.scope', '!=', 'x_44813_devjournal');
            gr.query();
            var names: string[] = [];
            while (gr.next())
                names.push("" + gr.name);
            return names;
        },
        type: 'DevJournalRefTables'
    };
}