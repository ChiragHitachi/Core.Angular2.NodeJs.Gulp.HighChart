System.register(["../app/services/dashboardService", "../tests/mocks/serviceMocker", "../app/models/enums"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var dashboardService_1, serviceMocker_1, enums_1;
    return {
        setters: [
            function (dashboardService_1_1) {
                dashboardService_1 = dashboardService_1_1;
            },
            function (serviceMocker_1_1) {
                serviceMocker_1 = serviceMocker_1_1;
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            }
        ],
        execute: function () {
            describe('Dashboard Service Tests', function () {
                var serviceMocker;
                beforeEach(function () {
                    serviceMocker = new serviceMocker_1.ServiceMocker();
                });
                it('should get the conainer status successfully', function () {
                    var data = { badContainers: 1, goodContainers: 2, ignoredContainers: 10 };
                    var result = { apiUrl: "", data: data, messageKey: "", status: enums_1.responseStatus.Success };
                    var actualResult;
                    var dashboardService = new dashboardService_1.DashboardService(serviceMocker.mockWebRequest(result));
                    dashboardService.getContainerScanStatus().subscribe(function (response) {
                        actualResult = response;
                        expect(actualResult.badContainers).toBe(data.badContainers);
                        expect(actualResult.goodContainers).toBe(data.goodContainers);
                    });
                });
            });
        }
    };
});
