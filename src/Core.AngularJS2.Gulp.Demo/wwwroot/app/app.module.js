System.register(["@angular/core", "@angular/platform-browser", "@angular/http", "@angular/router", "@angular/forms", "rxjs/Rx", "angular2-highcharts", "./components/app.component", "./components/home/home.component", "./components/charts/chart.component", "./components/integration/integration.component", "./components/redisCache/redisCache.component", "./components/signalR/signalR.component", "./components/canvas/canvasViewer.component", "./components/map/map.component", "./components/stock/stock.component", "./components/landing/landing.component", "./components/dynamic/dynamic.component", "./components/dynamic/dynamicBuilder", "./app.routing", "./services/webRequest", "./services/dashboardService", "./services/imageService", "@angular/compiler", "./pipes/formatDate", "./components/login/login.component", "./services/loginService"], function (exports_1, context_1) {
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
    var core_1, platform_browser_1, http_1, router_1, forms_1, angular2_highcharts_1, app_component_1, home_component_1, chart_component_1, integration_component_1, redisCache_component_1, signalR_component_1, canvasViewer_component_1, map_component_1, stock_component_1, landing_component_1, dynamic_component_1, dynamicBuilder_1, app_routing_1, webRequest_1, dashboardService_1, imageService_1, compiler_1, formatDate_1, login_component_1, loginService_1, AppModule;
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
            function (canvasViewer_component_1_1) {
                canvasViewer_component_1 = canvasViewer_component_1_1;
            },
            function (map_component_1_1) {
                map_component_1 = map_component_1_1;
            },
            function (stock_component_1_1) {
                stock_component_1 = stock_component_1_1;
            },
            function (landing_component_1_1) {
                landing_component_1 = landing_component_1_1;
            },
            function (dynamic_component_1_1) {
                dynamic_component_1 = dynamic_component_1_1;
            },
            function (dynamicBuilder_1_1) {
                dynamicBuilder_1 = dynamicBuilder_1_1;
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
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (formatDate_1_1) {
                formatDate_1 = formatDate_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (loginService_1_1) {
                loginService_1 = loginService_1_1;
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
                        landing_component_1.LandingComponent,
                        login_component_1.LoginComponent,
                        home_component_1.HomeComponent,
                        chart_component_1.ChartComponent,
                        integration_component_1.IntegrationComponent,
                        redisCache_component_1.RedisCacheComponent,
                        signalR_component_1.SignalRComponent,
                        canvasViewer_component_1.CanvasViewerComponent,
                        map_component_1.MapComponent,
                        stock_component_1.StockComponent,
                        dynamic_component_1.DynamicComponent,
                        formatDate_1.FormatDate
                    ],
                    // modules
                    imports: [
                        platform_browser_1.BrowserModule,
                        http_1.HttpModule,
                        forms_1.FormsModule,
                        router_1.RouterModule,
                        app_routing_1.AppRouting,
                        angular2_highcharts_1.ChartModule,
                    ],
                    providers: [
                        { provide: 'IWebRequest', useClass: webRequest_1.WebRequest },
                        { provide: 'IDashboardService', useClass: dashboardService_1.DashboardService },
                        { provide: 'IImageService', useClass: imageService_1.ImageService },
                        { provide: 'ILoginService', useClass: loginService_1.LoginService },
                        compiler_1.COMPILER_PROVIDERS,
                        dynamicBuilder_1.DynamicBuilder
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
