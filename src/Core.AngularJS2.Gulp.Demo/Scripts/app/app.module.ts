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

//import {PlaceListComponent} from "./components/explore/place-list.component";
//import {PlaceDetailComponent} from "./components/explore/place-detail.component";

import {AppRouting} from "./app.routing";
//import {AppService} from "./services/app.service";

@NgModule({
    // directives, components, and pipes
    declarations: [
        AppComponent,
        HomeComponent,
        ChartComponent
        //LoungeListComponent,
        //LoungeDetailComponent,
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
    //providers: [
    //    AppService
    //],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }



