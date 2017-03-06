import { ServiceMocker } from "../../tests/mocks/serviceMocker";
import { IResponse, IContainerScanned, IContainerStatus, Role } from "../../app/models/viewModels";
import { IDashboardService, IImageService } from "../../app/interfaces/interfaces";
import { IntegrationComponent } from "../../app/components/integration/integration.component";

//import { browser, by, element } from 'protractor';

describe('Integration Component Tests', () => {
    var serviceMocker: ServiceMocker;

    beforeEach(function () {
        serviceMocker = new ServiceMocker();
    });

    it('should get the conainer status successfully', function () {
        var data: IContainerStatus = { badContainers: 1, goodContainers: 2, ignoredContainers: 10 };
        var actualResult: IContainerStatus;

        var integrationComponent = new IntegrationComponent(serviceMocker.mockDashboardService(data), null);
        
        integrationComponent.getContainerStatus();

        expect(integrationComponent.containerStatus.badContainers).toBe(data.badContainers);
        expect(integrationComponent.containerStatus.goodContainers).toBe(data.goodContainers);
        expect(integrationComponent.pieOptions.chart).toBe({ type: 'pie' });

    });

    it('should load page successfully', function () {

    });

});