
var sys_id = '598ae1bfeb2111003623666cd206feb2';
var sys_portal_page = new GlideRecord('sys_portal_page');
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
        while (sys_portal_preferences.next()) {
            count++;
            um.saveRecord(sys_portal_preferences);
        }
    }
    gs.info(count + " sys_portal_preferences records saved to current update set");
} else
    gs.error("Portal page not found");
['']