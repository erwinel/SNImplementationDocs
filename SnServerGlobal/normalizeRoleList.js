var normalizeRoleList;
(function (normalizeRoleList) {
    function splitRoleNames(csv) {
        return (typeof csv !== "string" || (csv = csv.trim()).length == 0) ? [] :
            csv.split(",").map(function (value) { return value.trim(); }).filter(function (value) { return value.length > 0; });
    }
    function fillAllRoles(source, target, ignore) {
        ignore.push(source);
        try {
            var gr = new GlideRecord('sys_user_role');
            gr.addQuery('name', source);
            gr.query();
            if (gr.next()) {
                if (!gr.includes_roles.nil())
                    splitRoleNames("" + gr.includes_roles).forEach(function (value) {
                        if (target.indexOf(value) < 0) {
                            target.push(value);
                            fillAllRoles(value, target, ignore);
                        }
                    });
            }
            else
                gs.addErrorMessage('Could not find role ' + source);
        }
        finally {
            ignore.pop();
        }
    }
    function removeRedundantRoles(roleNames) {
        var result = {};
        roleNames.forEach(function (name) {
            if (typeof result[name] !== "boolean")
                result[name] = false;
            var target = [];
            fillAllRoles(name, target, []);
            target.forEach(function (role) { result[role] = true; });
        });
        return roleNames.filter(function (role) { return result[role] !== true; });
    }
    var sys_user_group = new GlideRecord('sys_user_group');
    sys_user_group.query();
    while (sys_user_group.next()) {
        var gr = new GlideRecord('sys_group_has_role');
        gr.addQuery('group', sys_user_group.sys_id);
        gr.query();
        var source = [];
        while (gr.next())
            source.push("" + gr.role.name);
        if (source.length == 0)
            gs.warn("Group has no roles");
        else {
            var result = removeRedundantRoles(source);
            if (result.length < source.length)
                gs.info("{0}: {1}", sys_user_group.getDisplayValue(), result.join(","));
            else
                gs.info("{0} is okay", sys_user_group.getDisplayValue());
        }
    }
    //fromCsv('catalog,gauge_maker,template_editor,itil,knowledge,report_group,report_publisher,report_user,approver_user,business_planner,financial_mgmt_user,fiscal_calendar_user,itfm_planner,itfm_plan_analyst,it_program_manager,it_portfolio_manager');
})(normalizeRoleList || (normalizeRoleList = {}));
//# sourceMappingURL=normalizeRoleList.js.map