import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import { AppComponent } from "./components/app.component";
import {HomeComponent} from "./components/home/home.component";
import {ChartComponent} from "./components/charts/chart.component";

//import { LoungeDetailComponent } from "./components/lounge/lounge-detail.component";


const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
  
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'charts',
        component: ChartComponent
    },
    //{
    //    path: 'lounge/:id',
    //    component: LoungeDetailComponent
    //},
    
];

export const AppRoutingProviders: any[] = [
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);