System.register(["@angular/core", "@angular/http"], function (exports_1, context_1) {
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
    var core_1, http_1, StockComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }
        ],
        execute: function () {
            StockComponent = (function () {
                function StockComponent(http) {
                    var _this = this;
                    this.http = http;
                    this.template = "<chart type='StockChart' [options]='chartOptions'></chart>";
                    var vm = this;
                    vm.title = "Stock Chart";
                    http.get('https://cdn.rawgit.com/gevgeny/angular2-highcharts/99c6324d/examples/aapl.json').subscribe(function (res) {
                        _this.chartOptions = {
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
                return StockComponent;
            }());
            StockComponent = __decorate([
                core_1.Component({
                    selector: "stock-viewer",
                    //template : this.template
                    templateUrl: "/view/components/stock/stock.component.html"
                }),
                __metadata("design:paramtypes", [http_1.Http])
            ], StockComponent);
            exports_1("StockComponent", StockComponent);
        }
    };
});

//# sourceMappingURL=stock.component.js.map
