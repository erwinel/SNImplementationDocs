/// <reference path="ServiceNow.d.ts" />

function validateUserProfileCompliance(current: GlideRecord) {
    gs.error("Table is " + current.getTableName());
}
