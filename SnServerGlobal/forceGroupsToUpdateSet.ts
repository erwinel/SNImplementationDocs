var sys_user_group: sys_user_groupGlideRecord = <sys_user_groupGlideRecord>new GlideRecord('sys_user_group');
sys_user_group.addActiveQuery();
sys_user_group.query();
var um: GlideUpdateManager2 = new GlideUpdateManager2();
while (sys_user_group.next()) {
    um.saveRecord(sys_user_group);
    var sys_id = '' + sys_user_group.sys_id;
    var sys_group_has_role: sys_group_has_roleGlideRecord = <sys_group_has_roleGlideRecord>(new GlideRecord('sys_group_has_role'));
    sys_group_has_role.addQuery('group', sys_id);
    sys_group_has_role.query();
    while (sys_group_has_role.next())
        um.saveRecord(sys_group_has_role);
}