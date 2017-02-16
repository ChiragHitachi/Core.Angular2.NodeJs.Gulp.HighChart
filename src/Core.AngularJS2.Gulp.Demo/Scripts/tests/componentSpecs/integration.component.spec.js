System.register(["../../tests/mocks/serviceMocker", "../../app/components/integration/integration.component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var serviceMocker_1, integration_component_1;
    return {
        setters: [
            function (serviceMocker_1_1) {
                serviceMocker_1 = serviceMocker_1_1;
            },
            function (integration_component_1_1) {
                integration_component_1 = integration_component_1_1;
            }
        ],
        execute: function () {
            //import { browser, by, element } from 'protractor';
            describe('Integration Component Tests', function () {
                var serviceMocker;
                beforeEach(function () {
                    serviceMocker = new serviceMocker_1.ServiceMocker();
                });
                it('should get the conainer status successfully', function () {
                    var data = { badContainers: 1, goodContainers: 2, ignoredContainers: 10 };
                    var actualResult;
                    var integrationComponent = new integration_component_1.IntegrationComponent(serviceMocker.mockDashboardService(data), null);
                    integrationComponent.getContainerStatus();
                    expect(integrationComponent.containerStatus.badContainers).toBe(data.badContainers);
                    expect(integrationComponent.containerStatus.goodContainers).toBe(data.goodContainers);
                    expect(integrationComponent.pieOptions.chart).toBe({ type: 'pie' });
                });
                it('should load page successfully', function () {
                });
            });
        }
    };
});
