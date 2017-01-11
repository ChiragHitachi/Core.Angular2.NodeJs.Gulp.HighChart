System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, ChartComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            ChartComponent = (function () {
                //npm install highcharts --save
                //npm install @types/node --save-dev
                //npm install --save-dev gulp-concat - css
                //npm -g install htmlmin
                //npm install --save del
                //npm install --save-dev gulp-load-plugins
                //npm install --save-dev gulp-gzip
                //npm install -g browser-sync
                //npm install gulp-compress
                function ChartComponent() {
                    this.title = "Charts";
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
                return ChartComponent;
            }());
            ChartComponent = __decorate([
                core_1.Component({
                    selector: "charts",
                    templateUrl: "/view/components/charts/chart.component.html"
                }),
                __metadata("design:paramtypes", [])
            ], ChartComponent);
            exports_1("ChartComponent", ChartComponent);
        }
    };
});
