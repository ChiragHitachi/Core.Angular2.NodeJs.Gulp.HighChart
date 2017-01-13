///<reference path="../../typings/index.d.ts"/>
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {RouterModule}  from "@angular/router";
import {FormsModule} from "@angular/forms";
import "rxjs/Rx";
import { ChartModule } from 'angular2-highcharts';

import {AppComponent} from "./components/app.component";
import {HomeComponent} from "./components/home/home.component";
import { ChartComponent } from "./components/charts/chart.component";

import {AppRouting} from "./app.routing";
import {WebRequest} from "./services/webRequest";
import { DashboardService } from "./services/dashboardService";

@NgModule({
    // directives, components, and pipes
    declarations: [
        AppComponent,
        HomeComponent,
        ChartComponent
    ],
    // modules
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterModule,
        AppRouting,
        ChartModule
    ],
    providers: [
        WebRequest, 
        DashboardService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }



