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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
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
                function ChartComponent(dashboardService) {
                    var _this = this;
                    this.dashboardService = dashboardService;
                    this.title = "Charts";
                    this.getContainerStatus = function () {
                        _this.dashboardService.getContainerScanStatus().subscribe(function (result) {
                            _this.containerStatus = result;
                            console.warn(_this.containerStatus);
                        });
                    };
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
                //getContainerStatus: () => void;
                ChartComponent.prototype.ngOnInit = function () {
                    this.getContainerStatus();
                };
                return ChartComponent;
            }());
            ChartComponent = __decorate([
                core_1.Component({
                    selector: "charts",
                    templateUrl: "/view/components/charts/chart.component.html"
                }),
                __param(0, core_1.Inject('IDashboardService')),
                __metadata("design:paramtypes", [Object])
            ], ChartComponent);
            exports_1("ChartComponent", ChartComponent);
        }
    };
});

//# sourceMappingURL=chart.component.js.map
