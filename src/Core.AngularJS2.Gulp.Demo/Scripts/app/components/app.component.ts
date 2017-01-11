import {Component} from "@angular/core";


@Component({
    selector: "angularjs2demo",     
    template: `
        <h1>{{title}}</h1>
         
            <div class="menu"> 
                <a class="home" [routerLink]="['/home']">Home</a> 
                 <a class="chart" [routerLink]="['/charts']">Charts</a> 
            </div>
           <router-outlet></router-outlet>
    `
})


export class AppComponent {
    title = "Angular 2 Application";
  
}
