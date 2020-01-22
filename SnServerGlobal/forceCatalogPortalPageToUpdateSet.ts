/**
 * GlideElement values from the Portal Page table.
 * @interface Isys_portal_pageColumns
 * @extends {Isys_metadataColumns}
 */
declare interface Isys_portal_pageColumns extends Isys_metadataColumns {
    /**
     * Layout
     * @type {GlideElementReference}
     * @memberof Isys_portal_pageColumns
     * @description Reference to table "sys_ui_macro"
     */
    layout: GlideElementReference;

    /**
     * Order
     * @type {GlideElementNumeric}
     * @memberof Isys_portal_pageColumns
     */
    order: GlideElementNumeric;

    /**
     * Read roles
     * @type {GlideElement}
     * @memberof Isys_portal_pageColumns
     * @description Internal type is "Array<user_roles>"
     */
    read_roles: GlideElement;

    /**
     * Write roles
     * @type {GlideElement}
     * @memberof Isys_portal_pageColumns
     * @description Internal type is "Array<user_roles>"
     */
    roles: GlideElement;

    /**
     * Selectable
     * @type {GlideElementBoolean}
     * @memberof Isys_portal_pageColumns
     * @default true
     */
    selectable: GlideElementBoolean;

    /**
     * Domain
     * @type {GlideElementDomainId}
     * @memberof Isys_portal_pageColumns
     * @default "global"
     */
    sys_domain: GlideElementDomainId;

    /**
     * Domain Path
     * @type {GlideElement}
     * @memberof Isys_portal_pageColumns
     * @default "/"
     * @description Internal type is "domain_path"
     */
    sys_domain_path: GlideElement;

    /**
     * Overrides
     * @type {sys_portal_pageElementReference}
     * @memberof Isys_portal_pageColumns
     * @description Reference to table "sys_portal_page"
     */
    sys_overrides: sys_portal_pageElementReference;

    /**
     * Title
     * @type {StringGlideElement}
     * @memberof Isys_portal_pageColumns
     * @description Internal type is "translated_field"
     *      Max length: 100
     */
    title: StringGlideElement;

    /**
     * User
     * @type {sys_userElementReference}
     * @memberof Isys_portal_pageColumns
     * @description Reference to table "sys_user"
     */
    user: sys_userElementReference;

    /**
     * View
     * @type {StringGlideElement}
     * @memberof Isys_portal_pageColumns
     * @description Max length: 40
     */
    view: StringGlideElement;
}

declare type sys_portal_pageGlideRecord = sys_metadataGlideRecord & Isys_portal_pageColumns;
declare type sys_portal_pageElementReference = GlidePropertiesElementReference<Isys_portal_pageColumns, sys_portal_pageGlideRecord>;

/**
 * GlideElement values from the Portal table.
 * @interface Isys_portalColumns
 */
declare interface Isys_portalColumns extends IGlideElementColumns {
    /**
     * Dropzone
     * @type {StringGlideElement}
     * @memberof Isys_portalColumns
     * @description Max length: 40
     */
    dropzone: StringGlideElement;

    /**
     * Offset
     * @type {GlideElementNumeric}
     * @memberof Isys_portalColumns
     */
    offset: GlideElementNumeric;

    /**
     * Page
     * @type {sys_portal_pageElementReference}
     * @memberof Isys_portalColumns
     */
    page: sys_portal_pageElementReference;

    /**
     * Summary
     * @type {StringGlideElement}
     * @memberof Isys_portalColumns
     */
    summary: StringGlideElement;
}

declare type sys_portalGlideRecord = GlideRecord & Isys_portalColumns;
declare type sys_portalElementReference = GlidePropertiesElementReference<Isys_portalColumns, sys_portalGlideRecord>;

/**
 * GlideElement values from the Portal Preference table.
 * @interface Isys_portal_preferencesColumns
 */
declare interface Isys_portal_preferencesColumns extends IGlideElementColumns {
    /**
     * Name
     * @type {StringGlideElement}
     * @memberof Isys_portal_preferencesColumns
     * @description Max length: 100
     */
    name: StringGlideElement;

    /**
     * Portal section
     * @type {sys_portalElementReference}
     * @memberof Isys_portal_preferencesColumns
     * @description Reference to table "sys_portal"
     */
    portal_section: sys_portalElementReference;
    
    /**
     * Value
     * @type {StringGlideElement}
     * @memberof Isys_portal_preferencesColumns
     * @description Max length: 1000
     */
    value: StringGlideElement;
}

declare type sys_portal_preferencesGlideRecord = GlideRecord & Isys_portal_preferencesColumns;
declare type sys_portal_preferencesElementReference = GlidePropertiesElementReference<Isys_portal_preferencesColumns, sys_portal_preferencesGlideRecord>;

var sys_portal_page: sys_portal_pageGlideRecord = <sys_portal_pageGlideRecord>new GlideRecord('sys_portal_page');
sys_portal_page.initialize();
sys_portal_page.setValue('sys_id', '598ae1bfeb2111003623666cd206feb2');
sys_portal_page.setValue('layout', 'f6defafa0a0a0b12000d5016bd12ff06');
sys_portal_page.setValue('title', 'catalog_technical_catalog');
sys_portal_page.setValue('view', 'catalog_technical_catalog');
var r = sys_portal_page.insert();
gs.info(r);

var sys_id: string = '598ae1bfeb2111003623666cd206feb2';
sys_portal_page = <sys_portal_pageGlideRecord>new GlideRecord('sys_portal_page');
sys_portal_page.addQuery(sys_id);
sys_portal_page.query();
if (sys_portal_page.next())
    gs.info("yes");
else
    gs.info("no");
sys_portal_page.addQuery(sys_id);
sys_portal_page.query();
if (sys_portal_page.next()) {
    var um: GlideUpdateManager2 = new GlideUpdateManager2();
    um.saveRecord(sys_portal_page);
    var sys_portal: sys_portalGlideRecord = <sys_portalGlideRecord>new GlideRecord('sys_portal');
    sys_portal.addQuery('page', sys_id);
    sys_portal.query();
    var count: number = 0;
    var sectionIds: string[] = [];
    while (sys_portal.next()) {
        count++;
        sectionIds.push('' + sys_portal.sys_id);
        um.saveRecord(sys_portal);
    }
    gs.info(count + " sys_portal records saved to current update set");
    count = 0;
    for (var i: number = 0; i < sectionIds.length; i++) {
        var sys_portal_preferences: sys_portal_preferencesGlideRecord = <sys_portal_preferencesGlideRecord>new GlideRecord('sys_portal_preferences');
        sys_portal_preferences.addQuery('portal_section', sectionIds[i]);
        sys_portal_preferences.query();
        while (sys_portal_preferences.next) {
            count++;
            um.saveRecord(sys_portal_preferences);
        }
    }
    gs.info(count + " sys_portal_preferences records saved to current update set");
} else
    gs.error("Portal page not found");