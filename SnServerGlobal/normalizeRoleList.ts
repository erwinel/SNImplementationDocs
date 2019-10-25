namespace normalizeRoleList {
    function splitRoleNames(csv: string): string[] {
        return (typeof csv !== "string" || (csv = csv.trim()).length == 0) ? [] :
            csv.split(",").map(function (value: string): string { return value.trim(); }).filter(function (value: string): boolean { return value.length > 0; })
    }

    function fillAllRoles(source: string, target: string[], ignore: string[]): void {
        ignore.push(source);
        try {
            var gr: sys_user_roleGlideRecord = <sys_user_roleGlideRecord>new GlideRecord('sys_user_role');
            gr.addQuery('name', source);
            gr.query();
            if (gr.next()) {
                if (!gr.includes_roles.nil())
                    splitRoleNames("" + gr.includes_roles).forEach(function (value: string): void {
                        if (target.indexOf(value) < 0) {
                            target.push(value);
                            fillAllRoles(value, target, ignore);
                        }
                    });
            } else
                gs.addErrorMessage('Could not find role ' + source);
        } finally { ignore.pop(); }
    }

    function removeRedundantRoles(roleNames: string[]): string[] {
        let result: { [key: string]: boolean; } = {};
        roleNames.forEach(function (name: string): void {
            if (typeof result[name] !== "boolean")
                result[name] = false;
            let target: string[] = [];
            fillAllRoles(name, target, []);
            target.forEach(function (role: string) { result[role] = true; });
        });
        return roleNames.filter(function (role: string): boolean { return result[role] !== true; });
    }

    let sys_user_group: sys_user_groupGlideRecord = <sys_user_groupGlideRecord>new GlideRecord('sys_user_group');
    sys_user_group.query();
    while (sys_user_group.next()) {
        var gr: sys_group_has_roleGlideRecord = <sys_group_has_roleGlideRecord>new GlideRecord('sys_group_has_role');
        gr.addQuery('group', sys_user_group.sys_id);
        gr.query();
        let source: string[] = [];
        while (gr.next())
            source.push("" + gr.role.name);
        if (source.length == 0)
            gs.warn("Group has no roles");
        else {
            let result: string[] = removeRedundantRoles(source);
            if (result.length < source.length)
                gs.info("{0}: {1}", sys_user_group.getDisplayValue(), result.join(","));
            else
                gs.info("{0} is okay", sys_user_group.getDisplayValue());
        }
    }
    //fromCsv('catalog,gauge_maker,template_editor,itil,knowledge,report_group,report_publisher,report_user,approver_user,business_planner,financial_mgmt_user,fiscal_calendar_user,itfm_planner,itfm_plan_analyst,it_program_manager,it_portfolio_manager');
}