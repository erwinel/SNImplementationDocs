/// <reference path="SnTypings/ServiceNowScoped.d.ts" />
/// <reference path="../packages/Microsoft.TypeScript.MSBuild.3.6.3/tools/tsc/lib.es2015.iterable.d.ts" />

namespace x_44813_dev_ts_hlp {
    interface IMemberDefinition {
        name: string;
        label: string;
        jsType: string;
        dbType: string;
        description?: string;
    }
    interface IChoiceItem {
        label: string;
        value: string;
        sequence: number;
    }
    interface ITableDefinition {
        name: string;
    }
    export class TypeDefinition {

    }
    export class TypeDefinitionMap implements Map<string, TypeDefinitionMap> {
        [Symbol.iterator](): IterableIterator<[string, TypeDefinitionMap]> {
            throw new Error("Method not implemented.");
        }        entries(): IterableIterator<[string, TypeDefinitionMap]> {
            throw new Error("Method not implemented.");
        }
        keys(): IterableIterator<string> {
            throw new Error("Method not implemented.");
        }
        values(): IterableIterator<TypeDefinitionMap> {
            throw new Error("Method not implemented.");
        }

        
    }
    interface ITableHash { [key: string]: ITableDefinition; }
    export class TypeScriptDefinitionGenerator {
        static type: string = "TypeScriptDefinitionGenerator";
        initialize() {

        }
        addTable(tableName: string): void {
            var gr: Isys_db_objectGlideRecord = <Isys_db_objectGlideRecord><any>new GlideRecord('sys_db_object');
            gr.addQuery('name', tableName);
            gr.query();
            if (gr.next())
                this.importTable(gr);
            else
                throw new Error('Table ' + JSON.stringify(tableName) + ' not found');
        }
        importTable(gr: Isys_db_objectGlideRecord): void {
            gr.getTableName()
            throw new Error("Method not implemented.");
        }
    }
}