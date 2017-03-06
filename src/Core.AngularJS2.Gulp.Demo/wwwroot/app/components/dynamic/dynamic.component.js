System.register(["@angular/core", "rxjs/observable/timer", "../dynamic/dynamicBuilder", "@angular/http", "rxjs/Observable"], function (exports_1, context_1) {
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
    var core_1, timer_1, dynamicBuilder_1, http_1, Observable_1, DynamicComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (timer_1_1) {
                timer_1 = timer_1_1;
            },
            function (dynamicBuilder_1_1) {
                dynamicBuilder_1 = dynamicBuilder_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }
        ],
        execute: function () {
            DynamicComponent = (function () {
                function DynamicComponent(typeBuilder, componentResolver, http) {
                    this.typeBuilder = typeBuilder;
                    this.componentResolver = componentResolver;
                    this.http = http;
                    this.timer = timer_1.timer(2000, 1000);
                    this.wasViewInitialized = false;
                    this.props = {
                        code: 'Angular 2 Dynamic Componenent',
                        description: 'This generated the component dynamically with the given HTML string and Json object.',
                        obs: this.timer,
                        date: null,
                        chartOptions: {}
                    };
                    this.currentComponent = null;
                    this.props.date = new Observable_1.Observable(function (observer) {
                        setInterval(function () { return observer.next(new Date().toString()); }, 1000);
                    });
                }
                ;
                DynamicComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    // We can destroy the old component by calling destroy
                    if (this.componentRef) {
                        this.componentRef.destroy();
                    }
                    var template = "\n      <div class=\"row\"><div class=\"col-md-2\">Title:       </div><div class=\"col-md-4\"><b>{{entity.code}}</b></div></div><br>\n      <div class=\"row\"><div class=\"col-md-2\">Description: </div><div class=\"col-md-4\"><b>{{entity.description}}</b></div></div><br>\n      <div class=\"row\"><div class=\"col-md-2\">DateTime:    </div><div class=\"col-md-4\"><b>{{entity.date | async | formatDate}}</b></div></div><br>\n      <hr />\n      <chart type=\"StockChart\" [options]=\"entity.chartOptions\"></chart>\n    ";
                    this.http.get('https://cdn.rawgit.com/gevgeny/angular2-highcharts/99c6324d/examples/aapl.json').subscribe(function (res) {
                        _this.props.chartOptions = {
                            title: { text: 'Hitachi Stock Price' },
                            series: [{
                                    name: 'HCL',
                                    data: res.json(),
                                    tooltip: {
                                        valueDecimals: 2
                                    }
                                }]
                        };
                        _this.typeBuilder
                            .createComponentFactory(template)
                            .then(function (factory) {
                            // Target will instantiate and inject component (we'll keep reference to it)
                            _this.componentRef = _this
                                .dynamicComponentTarget
                                .createComponent(factory);
                            // let's inject @Inputs to component instance
                            var component = _this.componentRef.instance;
                            component.entity = _this.props;
                        });
                    });
                };
                return DynamicComponent;
            }());
            __decorate([
                core_1.ViewChild('dynamicChild', { read: core_1.ViewContainerRef }),
                __metadata("design:type", core_1.ViewContainerRef)
            ], DynamicComponent.prototype, "dynamicComponentTarget", void 0);
            DynamicComponent = __decorate([
                core_1.Component({
                    selector: 'dynamic-component',
                    templateUrl: '/view/components/dynamic/dynamic.component.html',
                }),
                __metadata("design:paramtypes", [dynamicBuilder_1.DynamicBuilder, core_1.ComponentFactoryResolver, http_1.Http])
            ], DynamicComponent);
            exports_1("DynamicComponent", DynamicComponent);
        }
    };
});

//# sourceMappingURL=dynamic.component.js.map
