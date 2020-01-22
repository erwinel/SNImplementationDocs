/// <reference path="SnTypings/GlideSystem.d.ts" />
/// <reference path="SnTypings/GlideRecord.d.ts" />
/// <reference path="SnTypings/ServiceCatalog.d.ts" />

namespace BackgroundScript {
    //interface IUserCacheInfo {
    //    display: string;
    //    link: string;
    //    vip?: true
    //}
    //interface ITaskDisplayInfo {
    //    number: string;
    //    short_description: string;
    //    opened_at: string;
    //    link: string;
    //    sys_created_on: string;
    //    sys_created_by: string;
    //    sys_updated_on: string;
    //    sys_updated_by: string;
    //    customer?: string;
    //}
    interface IClassDisplayInfo {
        display: string;
        count: number;
        vip: number;
        oldestUpdate: string;
        oldestRecord: string;
    }
    (function (dayOfWeek: number) {
        if (dayOfWeek < 1 || dayOfWeek > 5)
            return;
        var vipCache: { [key: string]: boolean; } = {};
        function isVip(id: string) {
            if (typeof vipCache[id] == "boolean")
                return vipCache[id];
            var uGr: sys_userGlideRecord = <sys_userGlideRecord>new GlideRecord('sys_user');
            uGr.addQuery('user_name', id);
            uGr.query();
            if (!uGr.next()) {
                uGr = <sys_userGlideRecord>new GlideRecord('sys_user');
                uGr.addQuery('user_name', id);
                uGr.query();
                if (!uGr.next()) {
                    vipCache[id] = false;
                    return false;
                }
            }
            if (<any>uGr.vip == true) {
                vipCache[id] = true;
                return true;
            }
            vipCache[id] = false;
            return false;
        }
        //var allUserCache: { [key: string]: IUserCacheInfo; };
        //function getUserInfo(user_name: string): { key: string; user: IUserCacheInfo; } {
        //    if (!gs.nil(allUserCache[user_name]))
        //        return { key: user_name, user: allUserCache[user_name] };
        //    var userInfo: IUserCacheInfo;
        //    var uGr: sys_userGlideRecord = <sys_userGlideRecord>new GlideRecord('sys_user');
        //    uGr.addQuery('user_name', user_name);
        //    uGr.query();
        //    if (!uGr.next()) {
        //        uGr = <sys_userGlideRecord>new GlideRecord('sys_user');
        //        uGr.addQuery('sys_id', user_name);
        //        uGr.query();
        //        if (!uGr.next())
        //            return;
        //    }
        //    userInfo = { display: uGr.getDisplayValue(), link: gs.getProperty('glide.servlet.uri') + uGr.getLink(true) };
        //    if (<any>uGr.vip == true)
        //        userInfo.vip = true;
        //    var key: string = "" + uGr.user_name;
        //    allUserCache[key] = userInfo;
        //    return { key: key, user: userInfo };
        //}
        var gGr: sys_user_groupGlideRecord = <sys_user_groupGlideRecord>new GlideRecord('sys_user_group');
        gGr.addActiveQuery();
        gGr.query();
        while (gGr.next()) {
            var sys_id = gGr.sys_id;
            gs.info("Checking " + sys_id + ": " + gGr.getDisplayValue());
            var gr: taskGlideRecord = <taskGlideRecord>new GlideRecord('task');
            gr.addActiveQuery();
            gr.addQuery('state', '<', 3);
            gr.addNullQuery('assigned_to');
            gr.addQuery('assignment_group', sys_id);
            gr.query();
            
            if (gr.next()) {
                var infoByClass: { [key: string]: IClassDisplayInfo; } = {};
                var oldestByClass: { [key: string]: { created: GlideDateTime; update: GlideDateTime; }; } = {};
                var sys_class_name = "" + gr.sys_class_name;
                var c: IClassDisplayInfo = { display: gr.getClassDisplayValue(), count: 1, vip: 0, oldestRecord: "" + gr.sys_created_on, oldestUpdate: "" + gr.sys_updated_on };
                infoByClass[sys_class_name] = c;
                oldestByClass[sys_class_name] = { created: new GlideDateTime("" + gr.sys_created_on), update: new GlideDateTime("" + gr.sys_updated_on) };
                if (gs.nil(gr.caller_id)) {
                    if (gs.nil(gr.requested_for)) {
                        if (!(gs.nil(gr.request) || gs.nil(gr.request.requested_for)) && isVip(gr.request.requested_for))
                            c.vip = 1;
                    } else if (isVip(gr.requested_for))
                        c.vip = 1;
                } else if (isVip(gr.caller_id))
                    c.vip = 1;
                while (gr.next()) {
                    sys_class_name = "" + gr.sys_class_name;
                    if (gs.nil(infoByClass[sys_class_name])) {
                        c = { display: gr.getClassDisplayValue(), count: 1, vip: 0, oldestRecord: "" + gr.sys_created_on, oldestUpdate: "" + gr.sys_updated_on };
                        oldestByClass[sys_class_name] = { created: new GlideDateTime("" + gr.sys_created_on), update: new GlideDateTime("" + gr.sys_updated_on) };
                    } else {
                        c = infoByClass[sys_class_name];
                        var o: { created: GlideDateTime; update: GlideDateTime; } = oldestByClass[sys_class_name];
                        var d: GlideDateTime = new GlideDateTime("" + gr.sys_created_on);
                        if (d < o.created) {
                            o.created = d;
                            c.oldestRecord = "" + gr.sys_created_on;
                        }
                        d = new GlideDateTime("" + gr.sys_updated_on);
                        if (d < o.update) {
                            o.update = d;
                            c.oldestUpdate = "" + gr.sys_updated_on;
                        }
                        c.count++;
                    }
                    if (gs.nil(gr.caller_id)) {
                        if (gs.nil(gr.requested_for)) {
                            if (!(gs.nil(gr.request) || gs.nil(gr.request.requested_for)) && isVip(gr.request.requested_for))
                                c.vip++;
                        } else if (isVip(gr.requested_for))
                            c.vip++;
                    } else if (isVip(gr.caller_id))
                        c.vip++;
                }
                //var userInfoCache: { [key: string]: IUserCacheInfo; };
                //let byClass: { [key: string]: IClassDisplayInfo } = {};
                //byClass["" + gr.sys_class_name] = { display: gr.getClassDisplayValue(), items: [] };
                //while (gr.next()) {
                //    let n: string = "" + gr.sys_class_name;
                //    if (gs.nil(byClass[n]))
                //        byClass[n] = { display: gr.getClassDisplayValue(), items: [] };
                //}
                //for (var sys_class_name in byClass) {
                //    try {
                //        gr = <taskGlideRecord>new GlideRecord(sys_class_name);
                //        gr.addActiveQuery();
                //        gr.addQuery('state', '<', 3);
                //        gr.addNullQuery('assigned_to');
                //        gr.addQuery('assignment_group', sys_id);
                //        gr.orderBy('sys_updated_on');
                //    } catch {
                //        gr = <taskGlideRecord>new GlideRecord('task');
                //        gr.addActiveQuery();
                //        gr.addQuery('state', '<', 3);
                //        gr.addNullQuery('assigned_to');
                //        gr.addQuery('assignment_group', sys_id);
                //        gr.orderBy('sys_updated_on');
                //        gr.addQuery('sys_class_name', sys_class_name);
                //    }
                //    gr.query();
                //    while (gr.next) {
                //        var u: { key: string; user: IUserCacheInfo; } | undefined = getUserInfo("" + gr.sys_created_by);
                //        if (typeof u !== 'undefined')
                //            userInfoCache[u.key] = u.user;
                //        var sys_updated_by: { key: string; user: IUserCacheInfo; } | undefined = getUserInfo("" + gr.sys_updated_by);
                //        if (typeof sys_updated_by !== 'undefined')
                //            userInfoCache[sys_updated_by.key] = sys_updated_by.user;
                //        var item: ITaskDisplayInfo = {
                //            number: "" + gr.number,
                //            opened_at: "" + gr.opened_at,
                //            sys_updated_on: "" + gr.sys_updated_on,
                //            sys_created_on: "" + gr.sys_created_on,
                //            sys_updated_by: (typeof sys_updated_by !== 'undefined') ? sys_updated_by.key : "" + gr.sys_updated_by,
                //            sys_created_by: (typeof u !== 'undefined') ? u.key : "" + gr.sys_created_by,
                //            short_description: "" + gr.short_description,
                //            link: "" + gs.getProperty('glide.servlet.uri') + gr.getLink(true)
                //        };
                //        if (gs.nil(gr.caller_id)) {
                //            if (gs.nil(gr.requested_for)) {
                //                if (!(gs.nil(gr.request) || gs.nil(gr.request.requested_for))) {
                //                    u = getUserInfo("" + gr.request.requested_for);
                //                    if (typeof u !== 'undefined') {
                //                        userInfoCache[u.key] = u.user;
                //                        item.customer = u.key;
                //                    } else
                //                        item.customer = "" + gr.request.requested_for;
                //                }
                //            } else {
                //                u = getUserInfo("" + gr.requested_for);
                //                if (typeof u !== 'undefined') {
                //                    userInfoCache[u.key] = u.user;
                //                    item.customer = u.key;
                //                } else
                //                    item.customer = "" + gr.requested_for;
                //            }
                //        } else {
                //            u = getUserInfo("" + gr.caller_id);
                //            if (typeof u !== 'undefined') {
                //                userInfoCache[u.key] = u.user;
                //                item.customer = u.key;
                //            } else
                //                item.customer = "" + gr.caller_id;
                //        }
                //        byClass[sys_class_name].items.push(item);
                //    }
                //}
                var mGr: sys_user_grmemberGlideRecord = <sys_user_grmemberGlideRecord>new GlideRecord('sys_user_grmember');
                mGr.addQuery('group', sys_id);
                var r: string[] = [];
                mGr.query();
                while (mGr.next())
                    r.push("" + mGr.user.sys_id);
                gs.eventQueue('army.sys_user_group.task_unassigned', gr, r.join(","), JSON.stringify(infoByClass));
            }
        }
    })((new GlideDateTime()).getDayOfWeekLocalTime());

    function runMailScript(/* GlideRecord */ current: sys_user_groupGlideRecord, /* TemplatePrinter */ template: TemplatePrinter, /* Optional EmailOutbound */ email: GlideEmailOutbound, /* Optional GlideRecord */ email_action: any, /* Optional GlideRecord */ event: { parm1: string, parm2: string }) {
        var sys_id = "" + current.sys_id;
        gs.info("Creating mail content for " + sys_id);
        var infoByClass: { [key: string]: IClassDisplayInfo; } = JSON.parse(event.parm2);
        function escHtml(value: string): string {
            return (gs.nil(value)) ? "" : ((typeof value === 'string') ? value : "" + value).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
        }
        var totalCount = 0;
        var totalVip = 0;
        var classCount = 0;
        var nowUtc = "" + (new GlideDateTime());
        for (var sys_class_name in infoByClass.byClass) {
            classCount++;
            totalCount += infoByClass[sys_class_name].count;
            totalVip += infoByClass[sys_class_name].vip;
        }

        if (classCount > 1) {
            if (totalVip == classCount)
                template.print("There are a total of " + totalCount + " records <strong>(all are VIP status)</strong> assigned to " + escHtml(current.getDisplayValue()) + " that are not assigned to a user.");
            else if (totalVip == 0)
                template.print("There are a total of " + totalCount + " records assigned to " + escHtml(current.getDisplayValue()) + " that are not assigned to a user.");
            else if (totalVip == 1)
                template.print("There is <strong>1 record</strong> with VIP status in a total of " + totalCount + " records assigned to " + escHtml(current.getDisplayValue()) + " that are not assigned to a user.");
            else
                template.print("There are <strong>" + totalVip + " records with VIP status</strong> in a total of " + totalCount + " records assigned to " + escHtml(current.getDisplayValue()) + " that are not assigned to a user.");
            template.print('<table><tr><th scope="col">Type</th><th scope="col">Total</th><th scope="col">VIP Status</th><th scope="col">Oldest Update</th><th scope="col">Oldest Item</th></tr>');
        }

        for (var sys_class_name in infoByClass) {
            gs.info("Generating summary of " + sys_class_name + ' for ' + sys_id);
            if (classCount == 1) {
                if (totalVip == 1)
                    template.print("There is <strong>1 " + escHtml(infoByClass[sys_class_name].display) + " record with VIP status</strong> assigned to " + escHtml(current.getDisplayValue()) + " that is not assigned to a user.");
                else
                    template.print("There is 1 " + escHtml(infoByClass[sys_class_name].display) + " record assigned to " + escHtml(current.getDisplayValue()) + " that is not assigned to a user.");
            } else
                template.print('\n<tr><th scope="row">' + escHtml(infoByClass[sys_class_name].display) + '</th><td>' + infoByClass[sys_class_name].count + '</td><td>' +
                    infoByClass[sys_class_name].vip + '</td><td>' + infoByClass[sys_class_name].oldestUpdate + ' (' +
                    Math.floor(gs.dateDiff(infoByClass[sys_class_name].oldestUpdate, nowUtc, true) / 86400) + ' days ago)</td><td>' +
                    infoByClass[sys_class_name].oldestRecord + ' (' +
                    Math.floor(gs.dateDiff(infoByClass[sys_class_name].oldestRecord, nowUtc, true) / 86400) + ' days ago)</td></tr>');
            
        }
        if (classCount > 12)
        template.print('</table>');
    }
}