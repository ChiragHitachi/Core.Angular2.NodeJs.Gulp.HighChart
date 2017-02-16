import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component, Inject, forwardRef, Injector, OpaqueToken } from "@angular/core";

import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular2-highcharts';
import { IDashboardService, IImageService } from "../../interfaces/interfaces";
import { DashboardService } from "../../services/dashboardService";
import { ImageService } from "../../services/imageService";
import { IResponse, IContainerScanned, IContainerStatus, IToDo } from "../../models/viewModels";

@Component({
    selector: "charts",
    templateUrl: "/view/components/integration/integration.component.html"
})

export class IntegrationComponent {
    title: string = "Integration Charts";
    pieOptions: any;
    imagePath: string;
    imageBase64: string;
    imageBytes: any;
    containerStatus: IContainerStatus;
    toDoList: IToDo[];

    imageAsBytes: any;

    ngOnInit() {
        this.getContainerStatus();
        this.getToDoList();
    }
    constructor( @Inject('IDashboardService') private dashboardService: IDashboardService, @Inject('IImageService') private imageService: IImageService) {

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

    getToDoList = () => {
        this.dashboardService.getToDoList().subscribe(result => {
            this.toDoList = result;

        });

    }
}
