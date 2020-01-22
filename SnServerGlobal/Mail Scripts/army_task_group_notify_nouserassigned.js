var Daily_Unassigned_Group_Task_Notification;
(function (Daily_Unassigned_Group_Task_Notification) {
    (function (dayOfWeek) {
        if (dayOfWeek < 1 || dayOfWeek > 5)
            return;
        function hasVipCaller(t) {
            if (gs.nil(t.caller_id)) {
                if (gs.nil(t.requested_for)) {
                    if (!(gs.nil(t.request) || gs.nil(t.request.requested_for)) && t.request.requested_for.vip == true)
                        return true;
                }
                else if (t.requested_for.vip == true)
                    return true;
            }
            else if (t.caller_id.vip == true)
                return true;
            return false;
        }
        var grp = new GlideRecord('sys_user_group');
        grp.addActiveQuery();
        grp.query();
        while (grp.next()) {
            var sys_id = '' + grp.sys_id;
            var task = new GlideRecord('task');
            task.addActiveQuery();
            task.addQuery('state', '<', 3);
            task.addNullQuery('assigned_to');
            task.addQuery('assignment_group', sys_id);
            task.query();
            if (task.next()) {
                var taskCountsByType = {};
                do {
                    var type = "" + task.sys_class_name;
                    var task_sys_id = '' + task.sys_id;
                    var gr;
                    try {
                        gr = new GlideRecord(type);
                        gr.addQuery('sys_id', task_sys_id);
                        gr.query();
                        if (!gr.next())
                            gr = task;
                    }
                    catch (_a) {
                        gr = task;
                    }
                    var sys_created_on = new GlideDateTime("" + gr.sys_created_on);
                    var sys_updated_on = new GlideDateTime("" + gr.sys_updated_on);
                    var source = taskCountsByType[type];
                    if (typeof source === "undefined")
                        taskCountsByType[type] = {
                            count: 1,
                            vipCount: (hasVipCaller(gr)) ? 1 : 0,
                            typeDisplayName: gr.getClassDisplayValue(),
                            oldestCreate: {
                                dateTime: sys_created_on,
                                sys_id: task_sys_id
                            },
                            oldestUpdate: {
                                dateTime: sys_updated_on,
                                sys_id: task_sys_id
                            }
                        };
                    else {
                        source.count++;
                        if (hasVipCaller(gr))
                            source.vipCount++;
                        if (source.oldestCreate.dateTime.compareTo(sys_created_on) > 0)
                            source.oldestCreate = {
                                dateTime: sys_created_on,
                                sys_id: task_sys_id
                            };
                        if (source.oldestUpdate.dateTime.compareTo(sys_updated_on) > 0)
                            source.oldestUpdate = {
                                dateTime: sys_updated_on,
                                sys_id: task_sys_id
                            };
                    }
                } while (task.next());
                var eventParam = {};
                for (var typeName in taskCountsByType)
                    eventParam[typeName] = {
                        typeDisplayName: taskCountsByType[typeName].typeDisplayName,
                        count: taskCountsByType[typeName].count,
                        vipCount: taskCountsByType[typeName].vipCount,
                        oldestCreate: {
                            dateTime: '' + taskCountsByType[typeName].oldestCreate.dateTime,
                            sys_id: taskCountsByType[typeName].oldestCreate.sys_id
                        },
                        oldestUpdate: {
                            dateTime: '' + taskCountsByType[typeName].oldestUpdate.dateTime,
                            sys_id: taskCountsByType[typeName].oldestUpdate.sys_id
                        }
                    };
                var mGr = new GlideRecord('sys_user_grmember');
                mGr.addQuery('group', sys_id);
                var r = [];
                mGr.query();
                while (mGr.next())
                    r.push("" + mGr.user.sys_id);
                gs.eventQueue('army.sys_user_group.task_unassigned', grp, r.join(","), JSON.stringify(eventParam));
            }
        }
    })((new GlideDateTime()).getDayOfWeekLocalTime());
})(Daily_Unassigned_Group_Task_Notification || (Daily_Unassigned_Group_Task_Notification = {}));
var army_task_group_notify_nouserassigned;
(function (army_task_group_notify_nouserassigned) {
    function runMailScript(/* GlideRecord */ current, /* TemplatePrinter */ template, /* Optional EmailOutbound */ email, /* Optional GlideRecord */ email_action, /* Optional GlideRecord */ event) {
        var sys_id = "" + current.sys_id;
        var eventData = JSON.parse(event.parm2);
        var taskCountsByType = {};
        for (var key in eventData)
            taskCountsByType[key] = {
                count: eventData[key].count,
                vipCount: eventData[key].vipCount,
                typeDisplayName: eventData[key].typeDisplayName,
                type: key,
                oldestCreate: {
                    dateTime: new GlideDateTime(eventData[key].oldestCreate.dateTime),
                    sys_id: eventData[key].oldestCreate.sys_id
                },
                oldestUpdate: {
                    dateTime: new GlideDateTime(eventData[key].oldestUpdate.dateTime),
                    sys_id: eventData[key].oldestUpdate.sys_id
                }
            };
        var baseUri = gs.getProperty('glide.servlet.uri');
        if (!baseUri.endsWith('/'))
            baseUri += '/';
        function escHtml(value) {
            return (gs.nil(value)) ? "" : ((typeof value === 'string') ? value : "" + value).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
        }
        var taskDetail = {};
        function getTaskDetail(type, id) {
            var byType = taskDetail[type];
            var result;
            if (typeof byType === 'undefined') {
                byType = {};
                taskDetail[type] = byType;
            }
            else {
                result = byType[id];
                if (typeof result !== 'undefined')
                    return result;
            }
            var gr;
            try {
                gr = new GlideRecord(type);
                gr.addQuery('sys_id', id);
                gr.query();
                if (!gr.next())
                    throw new Error();
            }
            catch (_a) {
                gr = new GlideRecord('task');
                gr.addQuery('sys_id', id);
                gr.query();
                if (!gr.next()) {
                    result = {
                        type: 'Task',
                        display: id,
                        link: 'task.do?id=' + id
                    };
                    byType[id] = result;
                    return result;
                }
            }
            result = {
                type: gr.getClassDisplayValue(),
                display: gr.getDisplayValue(),
                link: gr.getLink(true)
            };
            byType[id] = result;
            return result;
        }
        function printTableRow(heading) {
            var value = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                value[_i - 1] = arguments[_i];
            }
            template.print('<tr><th scope="row" style="text-align:right">');
            if (typeof heading === 'string')
                template.print(escHtml(heading));
            else
                template.print('<a href="' + heading.url + '">' + escHtml(heading.text) + '</a>');
            template.print(':</th>');
            for (var i = 0; i < value.length; i++) {
                var content = value[i];
                template.print('<td>');
                if (typeof content === 'object')
                    template.print('<a href="' + content.url + '">' + escHtml(content.text) + '</a>');
                else
                    template.print(escHtml(content));
                template.print('</td>');
            }
            template.print('</tr>');
        }
        var totalTaskCount = 0;
        var totalVipCount = 0;
        var oldestCreate;
        var oldestCreateSysId;
        var oldestUpdateDateTime = new GlideDateTime();
        var oldestUpdateSysId;
        var n;
        for (n in taskCountsByType) {
            totalTaskCount += taskCountsByType[n].count;
            totalVipCount += taskCountsByType[n].vipCount;
            var d = new GlideDateTime(taskCountsByType[n].oldestCreate.dateTime);
            if (oldestCreateDateTime.compareTo(d) > 0) {
                oldestCreateDateTime = d;
                oldestCreateSysId = taskCountsByType[n].oldestCreate.sys_id;
            }
            d = new GlideDateTime(taskCountsByType[n].oldestUpdate.dateTime);
            if (oldestUpdateDateTime.compareTo(d) > 0) {
                oldestUpdateDateTime = d;
                oldestUpdateSysId = taskCountsByType[n].oldestUpdate.sys_id;
            }
        }
        template.print('<h2>Summary Open Record Counts for ' + escHtml(current.getDisplayValue()) + '</h2><table>');
        printTableRow('Total Open VIP Records', totalVipCount);
        printTableRow('Total Open Records', totalTaskCount);
        var linkInfo = getTaskDetail();
        printTableRow('Oldest Open Record', oldestCreateDateTime);
        printTableRow('Oldest Record Update', oldestUpdateDateTime);
        template.print('</table><h2>Open Record Counts by Type</h2><table><tr><th scope="col">Type</th><th scope="col">VIP</th><th scope="col">Total</th><th scope="col">Oldest Record</th><th scope="col">Oldest Update</th></tr>');
        for (n in taskCountsByType)
            printTableRow(taskCountsByType[n].typeDisplayName, taskCountsByType[n].vipCount, taskCountsByType[n].count, taskCountsByType[n].oldestCreate, taskCountsByType[n].oldestUpdate);
        template.print('</table>');
    }
})(army_task_group_notify_nouserassigned || (army_task_group_notify_nouserassigned = {}));
//# sourceMappingURL=army_task_group_notify_nouserassigned.js.map