/// <reference path="SnTypings/ServiceNowScoped.d.ts" />
var x_44813_util;
(function (x_44813_util) {
    var IncidentHelper = /** @class */ (function () {
        function IncidentHelper() {
            this.type = "IncidentHelper";
        }
        return IncidentHelper;
    }());
    x_44813_util.IncidentHelper = IncidentHelper;
    var CatalogHelper = /** @class */ (function () {
        function CatalogHelper() {
            this.type = 'CatalogHelper';
        }
        CatalogHelper.prototype.initialize = function () {
            var gr = new GlideRecord('sc_cat_item');
            gr.addQuery('sys_id', 'fdafdfa1dba4bb00683b300f7c9619f6');
            gr.query();
            gr.next();
            var category = gr.category.getRefRecord();
            category;
        };
        return CatalogHelper;
    }());
    x_44813_util.CatalogHelper = CatalogHelper;
})(x_44813_util || (x_44813_util = {}));
//# sourceMappingURL=x_44813_util.js.map