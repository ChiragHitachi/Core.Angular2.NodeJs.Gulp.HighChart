import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component,  Inject, forwardRef, Injector, OpaqueToken } from "@angular/core";

import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular2-highcharts'; 
import { IDashboardService } from "../../interfaces/interfaces";
import { DashboardService } from "../../services/dashboardService";
import { IResponse, IContainerScanned, IWeatherForecast } from "../../models/viewModels";



@Component({
    selector: "charts",
    templateUrl: "/view/components/charts/chart.component.html"
})

export class ChartComponent {
    title :string = "Charts";
    options: any;
    forecasts: IWeatherForecast;

    getWeatherForcast: () => void;

    constructor( @Inject('IDashboardService')private dashboardService : IDashboardService) {
        var vm = this;

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

        vm.getWeatherForcast = () => {
            dashboardService.getWeatherStatus<IWeatherForecast>().subscribe(result => {
                vm.forecasts = result.data;
            });
        }

        //var Highcharts = require('highcharts');

        // Load module after Highcharts is loaded
        //require('highcharts/modules/exporting')(Highcharts);
        // Create the chart
        //var myChart = Highcharts.chart('container', {
        //    chart: {
        //        type: 'bar'
        //    },
        //    title: {
        //        text: 'Fruit Consumption'
        //    },
        //    xAxis: {
        //        categories: ['Apples', 'Bananas', 'Oranges']
        //    },
        //    yAxis: {
        //        title: {
        //            text: 'Fruit eaten'
        //        }
        //    },
        //    series: [{
        //        name: 'Jane',
        //        data: [1, 0, 4]
        //    }, {
        //        name: 'John',
        //        data: [5, 7, 3]
        //    }]
        //});

    }
}
