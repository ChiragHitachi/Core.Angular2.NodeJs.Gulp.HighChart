﻿import {Component} from "@angular/core";


@Component({
    selector: "angularjs2demo",     
    template: `
      <h1>{{title}}</h1>

<div class="menu">
    <div class="row">
        <div class="col-lg-2">
            <a class="home" [routerLink]="['/home']">Home</a>
        </div>
        <div class="col-lg-2">
            <a class="chart" [routerLink]="['/charts']">Charts</a>
        </div>
        <div class="col-lg-2">
            <a class="chart" [routerLink]="['/integration']">API Integration</a>
        </div>
        <div class="col-lg-2">
            <a class="chart" [routerLink]="['/signalR']">Signal R</a>
        </div>
        <div class="col-lg-2">
            <a class="chart" [routerLink]="['/redisCache']">Redis Cache</a>
        </div>
    </div>
</div>
<router-outlet></router-outlet>
    `
})


export class AppComponent {
    title = "Angular 2 Demo Application";
  
}
