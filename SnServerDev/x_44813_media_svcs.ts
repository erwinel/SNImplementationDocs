/// <reference path="SnTypings/ServiceNowLegacy.d.ts" />

namespace x_44813_media_svcs {
    namespace my_multimedia_requests {
        interface IServerScriptData {

        }
        interface IClientScriptInput {

        }
        
        declare var $sp: IGlideSPScriptable;
        declare var data: IServerScriptData;
        declare var input: IClientScriptInput | undefined;
        (function () {
            /* populate the 'data' object */
            /* e.g., data.table = $sp.getValue('table'); */
            var myRequests: Isc_req_itemGlideRecord
        })();
    }
}