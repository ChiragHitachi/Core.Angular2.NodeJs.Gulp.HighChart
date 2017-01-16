import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component, Inject, forwardRef, Injector, OpaqueToken } from "@angular/core";

import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular2-highcharts';
import { IDashboardService } from "../../interfaces/interfaces";
import { DashboardService } from "../../services/dashboardService";
import { IResponse, IContainerScanned, IContainerStatus } from "../../models/viewModels";

@Component({
    selector: "charts",
    templateUrl: "/view/components/charts/chart.component.html"
})

export class ChartComponent {
    title: string = "Charts";
    options: any;
    pieOptions: any;
    chart3Options: any;
    barOptions: any;

    containerStatus: IContainerStatus;

    //getContainerStatus: () => void;
    
    constructor( @Inject('IDashboardService') private dashboardService: IDashboardService) {
        this.options = {
            title: { text: 'angular2-highcharts example' },
            series: [{
                name: 's1',
                data: [2, 3, 5, 8, 13],
                allowPointSelect: true
            }, {
                name: 's2',
                data: [-2, -3, -5, -8, -13],
                allowPointSelect: true
            }]
        };

        this.chart3Options = {
            title: { text: 'simple chart' },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Microsoft Internet Explorer',
                    y: 56.33
                }, {
                    name: 'Chrome',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Firefox',
                    y: 10.38
                }, {
                    name: 'Safari',
                    y: 4.77
                }, {
                    name: 'Opera',
                    y: 0.91
                }, {
                    name: 'Proprietary or Undetectable',
                    y: 0.2
                }]
            }]
        };

        this.barOptions =
            {
            chart: { type: 'bar' },
                title: {
                    text: 'Fruit Consumption'
                },
                xAxis: {
                    categories: ['Apples', 'Bananas', 'Oranges']
                },
                yAxis: {
                    title: {
                        text: 'Fruit eaten'
                    }
                },
                series: [{
                    name: 'Jane',
                    data: [1, 0, 4]
                }, {
                    name: 'John',
                    data: [5, 7, 3]
                }]
            };

        this.pieOptions = {
            title: { text: 'Pie chart' },
            chart: { type: 'pie' },
           
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Microsoft Internet Explorer',
                    y: 56.33
                }, {
                    name: 'Chrome',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Firefox',
                    y: 10.38
                }, {
                    name: 'Safari',
                    y: 4.77
                }, {
                    name: 'Opera',
                    y: 0.91
                }, {
                    name: 'Proprietary or Undetectable',
                    y: 0.2
                }]
            }]
        };

    }
     
}
