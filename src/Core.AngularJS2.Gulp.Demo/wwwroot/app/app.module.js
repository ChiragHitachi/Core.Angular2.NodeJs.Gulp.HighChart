System.register(["@angular/core", "@angular/platform-browser", "@angular/http", "@angular/router", "@angular/forms", "rxjs/Rx", "angular2-highcharts", "./components/app.component", "./components/home/home.component", "./components/charts/chart.component", "./components/integration/integration.component", "./components/redisCache/redisCache.component", "./components/signalR/signalR.component", "./app.routing", "./services/webRequest", "./services/dashboardService", "./services/imageService"], function (exports_1, context_1) {
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
    var core_1, platform_browser_1, http_1, router_1, forms_1, angular2_highcharts_1, app_component_1, home_component_1, chart_component_1, integration_component_1, redisCache_component_1, signalR_component_1, app_routing_1, webRequest_1, dashboardService_1, imageService_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (_1) {
            },
            function (angular2_highcharts_1_1) {
                angular2_highcharts_1 = angular2_highcharts_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (chart_component_1_1) {
                chart_component_1 = chart_component_1_1;
            },
            function (integration_component_1_1) {
                integration_component_1 = integration_component_1_1;
            },
            function (redisCache_component_1_1) {
                redisCache_component_1 = redisCache_component_1_1;
            },
            function (signalR_component_1_1) {
                signalR_component_1 = signalR_component_1_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            },
            function (webRequest_1_1) {
                webRequest_1 = webRequest_1_1;
            },
            function (dashboardService_1_1) {
                dashboardService_1 = dashboardService_1_1;
            },
            function (imageService_1_1) {
                imageService_1 = imageService_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_1.NgModule({
                    // directives, components, and pipes
                    declarations: [
                        app_component_1.AppComponent,
                        home_component_1.HomeComponent,
                        chart_component_1.ChartComponent,
                        integration_component_1.IntegrationComponent,
                        redisCache_component_1.RedisCacheComponent,
                        signalR_component_1.SignalRComponent
                    ],
                    // modules
                    imports: [
                        platform_browser_1.BrowserModule,
                        http_1.HttpModule,
                        forms_1.FormsModule,
                        router_1.RouterModule,
                        app_routing_1.AppRouting,
                        angular2_highcharts_1.ChartModule
                    ],
                    providers: [
                        { provide: 'IWebRequest', useClass: webRequest_1.WebRequest },
                        { provide: 'IDashboardService', useClass: dashboardService_1.DashboardService },
                        { provide: 'IImageService', useClass: imageService_1.ImageService }
                    ],
                    bootstrap: [
                        app_component_1.AppComponent
                    ]
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    };
});

//# sourceMappingURL=app.module.js.map
