System.register(["@angular/router", "./components/home/home.component", "./components/charts/chart.component", "./components/integration/integration.component", "./components/redisCache/redisCache.component", "./components/signalR/signalR.component", "./components/dynamic/dynamic.component", "./components/login/login.component", "./components/landing/landing.component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, home_component_1, chart_component_1, integration_component_1, redisCache_component_1, signalR_component_1, dynamic_component_1, login_component_1, landing_component_1, routes, AppRoutingProviders, AppRouting;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
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
            function (dynamic_component_1_1) {
                dynamic_component_1 = dynamic_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (landing_component_1_1) {
                landing_component_1 = landing_component_1_1;
            }
        ],
        execute: function () {
            //import { LoungeDetailComponent } from "./components/lounge/lounge-detail.component";
            routes = [
                {
                    path: '',
                    redirectTo: '/login',
                    pathMatch: 'full'
                },
                {
                    path: 'login',
                    component: login_component_1.LoginComponent
                },
                {
                    path: 'landing',
                    component: landing_component_1.LandingComponent
                },
                {
                    path: 'home',
                    component: home_component_1.HomeComponent
                },
                {
                    path: 'charts',
                    component: chart_component_1.ChartComponent
                },
                {
                    path: 'integration',
                    component: integration_component_1.IntegrationComponent
                },
                {
                    path: 'redisCache',
                    component: redisCache_component_1.RedisCacheComponent
                }, {
                    path: 'signalR',
                    component: signalR_component_1.SignalRComponent
                },
                {
                    path: 'dynamic',
                    component: dynamic_component_1.DynamicComponent
                },
            ];
            exports_1("AppRoutingProviders", AppRoutingProviders = []);
            exports_1("AppRouting", AppRouting = router_1.RouterModule.forRoot(routes));
        }
    };
});

//# sourceMappingURL=app.routing.js.map
