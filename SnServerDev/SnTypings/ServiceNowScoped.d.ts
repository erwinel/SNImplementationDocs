/// <reference path="ServiceNowLegacy.d.ts" />

declare namespace sn_sc {
    export class CatItem {
        canViewOnSearch(isMobile: boolean): boolean;
        canViewInDomain(): boolean;
        getFirstAccessibleCategoryForSearch(catalogId: string): string;
        getRecordClass(): string;
        isVisibleServicePortal(): boolean;
        availableForUserCriteria(action: string, criteriaIDs: string[]): boolean;
        notAvailableForUserCriteria(action: string, criteriaIDs: string[]): boolean;
        create(standardUpdate: boolean): void;
        deleteRecord(standardUpdate: boolean): void;
        read(columns: any, standardUpdate: boolean): any;
        setAttributes(attributes: any): void;
        setCatalogs(catalogs: string): void;
        setCategories(categories: string): void;
        setImage(dbImageSysId: string, type: string): void;
        setTableName(tableName: string): void;
        setTableName(tableName: string): void;
        update(columnValues: any, standardUpdate: boolean): any;
    }
}

interface IGlideSPScriptable {
    canReadRecord(gr: GlideRecord): boolean;
    canReadRecord(table: string, sysId: GUIDString): boolean;
    canSeePage(pageID: string): boolean;
    getCatalogItem(sysId: GUIDString, isOrdering?: boolean): { [key: string]: any; };
    getDisplayValue(fieldName: string): string;
    getField(gr: GlideRecord, fieldName: string): { [key: string]: any; };
    getFields(gr: GlideRecord, fieldNames: string): string[];
    getFieldsObject(gr: GlideRecord, fieldName: string): { [key: string]: any; };
    getForm(tableName: string, sysId: GUIDString): { [key: string]: any; };
    getKBCategoryArticles(tableName: string, limit: number): any[];
    getKBCategoryArticleSummaries(sysId: GUIDString, limit: number, maxChars: number): any[];
    getKBCount(sysId: GUIDString): number;
    getListColumns(tableName: string, view: string): { [key: string]: any; };
    getMenuHREF(page: GlideRecord): string;
    getMenuItems(sysId: GUIDString): any[];
    getParameter(name: string): any;
    getPortalRecord(): GlideRecord;
    getRecord(table: string, sysId: GUIDString): GlideRecord;
    getRecordDisplayValues(data: { [key: string]: any; }, grFrom: GlideRecord, names: string): void;
    getRecordElements(data: { [key: string]: any; }, grFrom: GlideRecord, names: string): void;
    getRecordValues(data: { [key: string]: any; }, grFrom: GlideRecord, names: string): void;
    getRecordVariables(gr: GlideRecord, includeNilResponses?: boolean): string;
    getRecordVariablesArray(gr: GlideRecord, includeNilResponses?: boolean): { [key: string]: any; }[];
    getStream(table: string, sysId: GUIDString): any;
    getValue(name: string): any;
    getValues(data: { [key: string]: any; }, names: string): void;
    getVariablesArray(includeNilResponses?: boolean): { [key: string]: any; }[];
    getWidget(sysId: GUIDString, options: any): { [key: string]: any; };
    mapUrlToSPUrl(url: string): string;
}

