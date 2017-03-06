import { IDashboardService, IImageService } from "../app/interfaces/interfaces";
import { DashboardService } from "../app/services/dashboardService";
import { IResponse, IContainerScanned, IContainerStatus, Role } from "../app/models/viewModels";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceMocker } from "../tests/mocks/serviceMocker";
import { responseStatus } from "../app/models/enums";


describe('Dashboard Service Tests', () => {
    var serviceMocker : ServiceMocker;

    beforeEach(function () {
        serviceMocker = new ServiceMocker();
    });

    it('should get the conainer status successfully', function () {
        var data: IContainerStatus = { badContainers : 1, goodContainers : 2, ignoredContainers :10};
        var result: IResponse<IContainerStatus> = { apiUrl: "", data: data, messageKey: "", status : responseStatus.Success};
        var actualResult: IContainerStatus;
        var dashboardService = new DashboardService(serviceMocker.mockWebRequest<IResponse<IContainerStatus>>(result));

        dashboardService.getContainerScanStatus().subscribe((response : IContainerStatus) => {
            actualResult = response;
            expect(actualResult.badContainers).toBe(data.badContainers);
            expect(actualResult.goodContainers).toBe(data.goodContainers);
        });
    });

});