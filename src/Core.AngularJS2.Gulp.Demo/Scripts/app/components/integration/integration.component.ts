import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component, Inject, forwardRef, Injector, OpaqueToken } from "@angular/core";

import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular2-highcharts';
import { IDashboardService } from "../../interfaces/interfaces";
import { DashboardService } from "../../services/dashboardService";
import { IResponse, IContainerScanned, IContainerStatus } from "../../models/viewModels";

@Component({
    selector: "charts",
    templateUrl: "/view/components/integration/integration.component.html"
})

export class IntegrationComponent {
    title: string = "Integration Charts";
    pieOptions: any;

    containerStatus: IContainerStatus;

    ngOnInit() {
        this.getContainerStatus();
    }
    constructor( @Inject('IDashboardService') private dashboardService: IDashboardService) {


    }

    getContainerStatus = () => {
        this.dashboardService.getContainerScanStatus<IContainerStatus>().subscribe(result => {
            this.containerStatus = result;
            console.info(this.containerStatus);
            this.pieOptions = {
                title: { text: 'Container Scan Status' },
                chart: { type: 'pie' },

                series: [{
                    name: 'Container Scan Status',
                    colorByPoint: true,
                    data: [{
                        name: 'Ignored Containers',
                        y: this.containerStatus.ignoredContainers
                    }, {
                        name: 'Bad Containers',
                        y: this.containerStatus.badContainers
                    },
                    {
                        name: 'Passed Containers',
                        y: this.containerStatus.goodContainers,
                        sliced: true,
                        selected: true
                    }]
                }]
            };

        });

    }

}
