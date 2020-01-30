var sys_portal_page = new GlideRecord('sys_portal_page');
sys_portal_page.initialize();
sys_portal_page.setValue('sys_id', '598ae1bfeb2111003623666cd206feb2');
sys_portal_page.setValue('layout', 'f6defafa0a0a0b12000d5016bd12ff06');
sys_portal_page.setValue('title', 'catalog_technical_catalog');
sys_portal_page.setValue('view', 'catalog_technical_catalog');
var r = sys_portal_page.insert();
gs.info(r);
var sys_id = '598ae1bfeb2111003623666cd206feb2';
sys_portal_page = new GlideRecord('sys_portal_page');
sys_portal_page.addQuery(sys_id);
sys_portal_page.query();
if (sys_portal_page.next())
    gs.info("yes");
else
    gs.info("no");
sys_portal_page.addQuery(sys_id);
sys_portal_page.query();
if (sys_portal_page.next()) {
    var um = new GlideUpdateManager2();
    um.saveRecord(sys_portal_page);
    var sys_portal = new GlideRecord('sys_portal');
    sys_portal.addQuery('page', sys_id);
    sys_portal.query();
    var count = 0;
    var sectionIds = [];
    while (sys_portal.next()) {
        count++;
        sectionIds.push('' + sys_portal.sys_id);
        um.saveRecord(sys_portal);
    }
    gs.info(count + " sys_portal records saved to current update set");
    count = 0;
    for (var i = 0; i < sectionIds.length; i++) {
        var sys_portal_preferences = new GlideRecord('sys_portal_preferences');
        sys_portal_preferences.addQuery('portal_section', sectionIds[i]);
        sys_portal_preferences.query();
        while (sys_portal_preferences.next) {
            count++;
            um.saveRecord(sys_portal_preferences);
        }
    }
    gs.info(count + " sys_portal_preferences records saved to current update set");
}
else
    gs.error("Portal page not found");
//# sourceMappingURL=forceCatalogPortalPageToUpdateSet.js.map