var forceToUpdateSet;
(function (forceToUpdateSet) {
    !current.IsNewRecord();
    (function () {
        current.update();
        action.setRedirectURL(current);
        var um = new GlideUpdateManager2();
        um.saveRecord(current);
        var sys_id = gs.getUser().getPreference("sys_update_set");
        var gr = new GlideRecord("sys_update_set");
        gr.get(sys_id);
        gs.addInfoMessage("Record " + JSON.stringify(gr.getDisplayValue()) + " included in <a href=\"sys_update_set.do?sys_id=" + sys_id + "\">" + gr.name + "</a> update set.");
    })();
})(forceToUpdateSet || (forceToUpdateSet = {}));
//# sourceMappingURL=forceToUpdateSet.js.map