import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular2-highcharts'; 


@Component({
    selector: "charts",
    templateUrl: "/view/components/charts/chart.component.html"
})

export class ChartComponent {
    title :string = "Charts";
    options: any;
    //npm install highcharts --save
    //npm install @types/node --save-dev
    //npm install --save-dev gulp-concat - css
    //npm -g install htmlmin
    //npm install --save del
    //npm install --save-dev gulp-load-plugins
    //npm install --save-dev gulp-gzip
    //npm install -g browser-sync
    //npm install gulp-compress
    constructor() {
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
