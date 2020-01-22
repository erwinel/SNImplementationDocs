namespace Task_Assignment_Reporter {

}
namespace Daily_Unassigned_Group_Task_Notification {
    export interface ITaskCountsSource {
        typeDisplayName: string;
        count: number;
        vipCount: number;
        oldestUpdate: {
            dateTime: GlideDateTime;
            sys_id: string;
        }
        oldestCreate: {
            dateTime: GlideDateTime;
            sys_id: string;
        };
    }
    (function (dayOfWeek: number) {
        if (dayOfWeek < 1 || dayOfWeek > 5)
            return;

        function hasVipCaller(t: taskGlideRecord): boolean {
            if (gs.nil(t.caller_id)) {
                if (gs.nil(t.requested_for)) {
                    if (!(gs.nil(t.request) || gs.nil(t.request.requested_for)) && <boolean><any>(<sys_userElementReference>t.request.requested_for).vip == true)
                        return true;
                } else if (<boolean><any>(<sys_userElementReference>t.requested_for).vip == true)
                    return true;
            } else if (<boolean><any>(<sys_userElementReference>t.caller_id).vip == true)
                return true;
            return false;
        }

        var grp: sys_user_groupGlideRecord = <sys_user_groupGlideRecord>new GlideRecord('sys_user_group');
        grp.addActiveQuery();
        grp.query();
        while (grp.next()) {
            var sys_id: string = '' + grp.sys_id;
            var task: taskGlideRecord = <taskGlideRecord>new GlideRecord('task');
            task.addActiveQuery();
            task.addQuery('state', '<', 3);
            task.addNullQuery('assigned_to');
            task.addQuery('assignment_group', sys_id);
            task.query();
            if (task.next()) {
                var taskCountsByType: { [key: string]: ITaskCountsSource; } = {};
                do {
                    var type: string = "" + task.sys_class_name;
                    var task_sys_id: string = '' + task.sys_id;
                    var gr: taskGlideRecord;
                    try {
                        gr = <taskGlideRecord>new GlideRecord(type);
                        gr.addQuery('sys_id', task_sys_id);
                        gr.query();
                        if (!gr.next())
                            gr = task;
                    }
                    catch { gr = task; }
                    var sys_created_on: GlideDateTime = new GlideDateTime("" + gr.sys_created_on);
                    var sys_updated_on: GlideDateTime = new GlideDateTime("" + gr.sys_updated_on);
                    var source: ITaskCountsSource | undefined = taskCountsByType[type];
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
                var eventParam: { [key: string]: army_task_group_notify_nouserassigned.IEventData; } = {};
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
                var mGr: sys_user_grmemberGlideRecord = <sys_user_grmemberGlideRecord>new GlideRecord('sys_user_grmember');
                mGr.addQuery('group', sys_id);
                var r: string[] = [];
                mGr.query();
                while (mGr.next())
                    r.push("" + mGr.user.sys_id);
                gs.eventQueue('army.sys_user_group.task_unassigned', grp, r.join(","), JSON.stringify(eventParam));
            }
        }
    })((new GlideDateTime()).getDayOfWeekLocalTime());
}

namespace army_task_group_notify_nouserassigned {
    export interface IEventData {
        typeDisplayName: string;
        count: number;
        vipCount: number;
        oldestUpdate: {
            dateTime: string;
            sys_id: string;
        };
        oldestCreate: {
            dateTime: string;
            sys_id: string;
        };
    }
    interface ITaskCountsByType extends Daily_Unassigned_Group_Task_Notification.ITaskCountsSource {
        type: string;
    }
    interface ITaskExtentInfo {
        dateTime: GlideDateTime;
        sys_id: string;
        type: string;
        typeDisplayName: string;
    }
    function runMailScript(/* GlideRecord */ current: sys_user_groupGlideRecord, /* TemplatePrinter */ template: TemplatePrinter, /* Optional EmailOutbound */ email: GlideEmailOutbound, /* Optional GlideRecord */ email_action: any, /* Optional GlideRecord */ event: { parm1: string, parm2: string }) {
        var sys_id = "" + current.sys_id;
        var eventData: { [key: string]: IEventData; } = JSON.parse(event.parm2);
        var taskCountsByType: { [key: string]: ITaskCountsByType; } = {};
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

        var baseUri: string = gs.getProperty('glide.servlet.uri');
        if (!baseUri.endsWith('/'))
            baseUri += '/';
        function escHtml(value: string | number | GlideDateTime): string {
            return (gs.nil(value)) ? "" : ((typeof value === 'string') ? value : "" + value).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
        }
        var taskDetail: { [key: string]: { [key: string]: { type: string; display: string; link: string; }; }; } = {};
        function getTaskDetail(type: string, id: string): { type: string; display: string; link: string; } {
            var byType: { [key: string]: { type: string; display: string; link: string; }; } | undefined = taskDetail[type];
            var result: { type: string; display: string; link: string; };
            if (typeof byType === 'undefined') {
                byType = {};
                taskDetail[type] = byType;
            } else {
                result = byType[id];
                if (typeof result !== 'undefined')
                    return result;
            }
            var gr: GlideRecord;
            try {
                gr = new GlideRecord(type);
                gr.addQuery('sys_id', id);
                gr.query();
                if (!gr.next())
                    throw new Error();
            } catch {
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
        function printTableRow(heading: string | { url: string; text: string }, ...value: (string | number | { url: string; text: GlideDateTime | string })[]) {
            template.print('<tr><th scope="row" style="text-align:right">');
            if (typeof heading === 'string')
                template.print(escHtml(heading));
            else
                template.print('<a href="' + heading.url + '">' + escHtml(heading.text) + '</a>');
            template.print(':</th>');
            for (var i = 0; i < value.length; i++) {
                var content: string | number | { url: string; text: GlideDateTime | string } = value[i];
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
        var oldestCreate: ITaskCountsByType;
        var oldestCreateSysId: string;
        var oldestUpdateDateTime: GlideDateTime = new GlideDateTime();
        var oldestUpdateSysId: string;
        var n: string;
        for (n in taskCountsByType) {
            totalTaskCount += taskCountsByType[n].count;
            totalVipCount += taskCountsByType[n].vipCount;
            var d: GlideDateTime = new GlideDateTime(taskCountsByType[n].oldestCreate.dateTime);
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
        var linkInfo: { type: string; display: string; link: string; } = getTaskDetail()
        printTableRow('Oldest Open Record', oldestCreateDateTime);
        printTableRow('Oldest Record Update', oldestUpdateDateTime);
        template.print('</table><h2>Open Record Counts by Type</h2><table><tr><th scope="col">Type</th><th scope="col">VIP</th><th scope="col">Total</th><th scope="col">Oldest Record</th><th scope="col">Oldest Update</th></tr>');
        for (n in taskCountsByType) 
            printTableRow(taskCountsByType[n].typeDisplayName, taskCountsByType[n].vipCount, taskCountsByType[n].count, taskCountsByType[n].oldestCreate, taskCountsByType[n].oldestUpdate);
        template.print('</table>');
    }
}