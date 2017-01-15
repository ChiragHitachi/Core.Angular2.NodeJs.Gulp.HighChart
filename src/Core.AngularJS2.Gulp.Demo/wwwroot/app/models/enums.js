System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var responseStatus;
    return {
        setters: [],
        execute: function () {
            (function (responseStatus) {
                responseStatus[responseStatus["Success"] = 0] = "Success";
                responseStatus[responseStatus["Failure"] = 1] = "Failure";
                responseStatus[responseStatus["NotAuthenticated"] = 2] = "NotAuthenticated";
                responseStatus[responseStatus["ApiNotAvailable"] = 3] = "ApiNotAvailable";
                responseStatus[responseStatus["InvalidInput"] = 4] = "InvalidInput";
                responseStatus[responseStatus["ClientDetailsNotFound"] = 5] = "ClientDetailsNotFound";
                responseStatus[responseStatus["NoDataFound"] = 6] = "NoDataFound";
                responseStatus[responseStatus["SessionExpired"] = 7] = "SessionExpired";
                responseStatus[responseStatus["UnknownError"] = 8] = "UnknownError";
            })(responseStatus || (responseStatus = {}));
            exports_1("responseStatus", responseStatus);
        }
    };
});

//# sourceMappingURL=enums.js.map
