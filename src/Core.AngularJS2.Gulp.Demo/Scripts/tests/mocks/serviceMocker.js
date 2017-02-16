System.register(["rxjs/Observable"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, ServiceMocker;
    return {
        setters: [
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }
        ],
        execute: function () {
            ServiceMocker = (function () {
                function ServiceMocker() {
                    var vm = this;
                    vm.mockWebRequest = function (result) {
                        var mockDependency = {
                            get: function (url, data, params, header, goToErrorState) {
                                return Observable_1.Observable.create(function () { return result; });
                            },
                            post: function (url, data, params, header, goToErrorState) {
                                return Observable_1.Observable.create(function () { return result; });
                            },
                            getImage: function (url, data, params, header, goToErrorState) {
                                return Observable_1.Observable.create(function () { return result; });
                            },
                        };
                        return mockDependency;
                    };
                    vm.mockDashboardService = function (result) {
                        var mockDependency = {
                            getContainerScanStatus: function () {
                                return Observable_1.Observable.create(function () { return result; });
                            },
                            getToDoList: function () {
                                return Observable_1.Observable.create(function () { return result; });
                            },
                            getToDoItem: function (id) {
                                return Observable_1.Observable.create(function () { return result; });
                            }
                        };
                        return mockDependency;
                    };
                }
                return ServiceMocker;
            }());
            exports_1("ServiceMocker", ServiceMocker);
        }
    };
});
