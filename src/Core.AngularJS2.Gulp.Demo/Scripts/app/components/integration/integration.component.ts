import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component, Inject, forwardRef, Injector, OpaqueToken } from "@angular/core";

import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular2-highcharts';
import { IDashboardService, IImageService } from "../../interfaces/interfaces";
import { DashboardService } from "../../services/dashboardService";
import { ImageService } from "../../services/imageService";
import { IResponse, IContainerScanned, IContainerStatus } from "../../models/viewModels";

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
    imageAsBytes: any;

    ngOnInit() {
        this.getContainerStatus();
        //this.getImageBase64();
        this.getImagePath();
        //this.getImageBytes();
    }
    constructor( @Inject('IDashboardService') private dashboardService: IDashboardService, @Inject('IImageService') private imageService: IImageService) {

    }

    getImagePath = () => {
        this.imageService.getImagePath().subscribe(result => {
            this.imagePath = result.containerImage;
            console.info(this.imagePath);

            var fr = new FileReader();
            var extension = "tiff";
            fr.onload = function (e) {
                
                    ////Using tiff.min.js library - https://github.com/seikichi/tiff.js/tree/master
                    //console.debug("Parsing TIFF image...");
                    ////initialize with 100MB for large files
                    //Tiff.initialize({
                    //    TOTAL_MEMORY: 100000000
                    //});
                    //var tiff = new Tiff({
                    //    buffer: e.target.result
                    //});
                    //var tiffCanvas = tiff.toCanvas();
                    //(tiffCanvas).css({
                    //    "max-width": "100px",
                    //    "width": "100%",
                    //    "height": "auto",
                    //    "display": "block",
                    //    "padding-top": "10px"
                    //}).addClass("preview");
                    //doc.append(tiffCanvas);
                

            }
            fr.onloadend = function (e) {
                console.debug("Load End");
            }
            //fr.readAsArrayBuffer(files[0]);
        });
    }
    getImageBase64 = () => {
        this.imageService.getImageAsBase64().subscribe(result => {
            this.imageBase64 = result.containerImageBase64;
            console.info(this.imageBase64);
        });
    }
    getImageBytes = () => {
        this.imageService.getImageAsByteArrray().subscribe(result => {
            this.imageBytes = result;
            var uInt8Array = new Uint8Array(this.imageBytes);
            var i = uInt8Array.length;
            var binaryString = new Array(i);
            while (i--) {
                binaryString[i] = String.fromCharCode(uInt8Array[i]);
            }
            var data = binaryString.join('');

            // Base64 encoded image and assign it to the scope
            this.imageAsBytes = window.btoa(data);

            console.info(this.imageAsBytes);
        });
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
