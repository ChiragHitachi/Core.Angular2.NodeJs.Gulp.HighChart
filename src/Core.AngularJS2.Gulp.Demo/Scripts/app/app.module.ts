///<reference path="../../typings/index.d.ts"/>
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import "rxjs/Rx";
import { ChartModule } from 'angular2-highcharts';

import { AppComponent } from "./components/app.component";
import { HomeComponent } from "./components/home/home.component";
import { ChartComponent } from "./components/charts/chart.component";
import { IntegrationComponent } from "./components/integration/integration.component";
import { RedisCacheComponent } from "./components/redisCache/redisCache.component";
import { SignalRComponent } from "./components/signalR/signalR.component";
import { CanvasViewerComponent } from "./components/canvas/canvasViewer.component";
import { MapComponent } from "./components/map/map.component";
import { StockComponent } from "./components/stock/stock.component";
import { LandingComponent } from "./components/landing/landing.component";
import { DynamicComponent } from "./components/dynamic/dynamic.component";
import { DynamicBuilder  } from "./components/dynamic/dynamicBuilder";

import { AppRouting } from "./app.routing";
import { WebRequest } from "./services/webRequest";
import { DashboardService } from "./services/dashboardService";
import { ImageService } from "./services/imageService";
//import { Ng2DragDropModule } from "ng2-drag-drop";
//import { DragulaModule } from 'ng2-dragula';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { DynamicModule } from "./components/dynamic/dynamicModule";
import { FormatDate } from "./pipes/formatDate";
import { LoginComponent } from "./components/login/login.component";
import { LoginService } from "./services/loginService";

@NgModule({
    // directives, components, and pipes
    declarations: [
        AppComponent,
        LandingComponent,
        LoginComponent,
        HomeComponent,
        ChartComponent,
        IntegrationComponent,
        RedisCacheComponent,
        SignalRComponent,
        CanvasViewerComponent,
        MapComponent,
        StockComponent,
        DynamicComponent,
        FormatDate

    ],
    // modules
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterModule,
        AppRouting,
        ChartModule,
        //DynamicModule 
        //  DragulaModule
        //      Ng2DragDropModule
    ],
    providers: [
        { provide: 'IWebRequest', useClass: WebRequest },
        { provide: 'IDashboardService', useClass: DashboardService },
        { provide: 'IImageService', useClass: ImageService },
        { provide: 'ILoginService', useClass: LoginService },

        COMPILER_PROVIDERS,
        DynamicBuilder
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }


