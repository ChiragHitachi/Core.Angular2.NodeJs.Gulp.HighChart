import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, ViewChild, Input, HostListener } from "@angular/core";
import { IResponse, IImageOptions } from "../../models/viewModels";
//import 'js/tiff.js';
import { Http, Response } from "@angular/http";
import { ChartModule } from 'angular2-highcharts';

@Component({
    selector: "stock-viewer",
    //template : this.template
    templateUrl: "/view/components/stock/stock.component.html"
})

export class StockComponent {
    title: string;
    chartOptions: any;
    template: any = "<chart type='StockChart' [options]='chartOptions'></chart>";
    constructor(private http : Http) {
        let vm = this;
        vm.title = "Stock Chart";
        http.get('https://cdn.rawgit.com/gevgeny/angular2-highcharts/99c6324d/examples/aapl.json').subscribe(res => {
            this.chartOptions = {
                title: { text: 'Hitachi Stock Price' },
                series: [{
                    name: 'AAPL',
                    data: res.json(),
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            };
        });
    }
}