import { Component, Inject } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { IWebRequest, ILoginService } from "../interfaces/interfaces";

@Component({
    selector: "angularjs2demo", 
    templateUrl: '/view/components/app.component.html',
})

export class AppComponent {
    title = "Angular 2 Demo Application";
    get IsLoggedIn(): boolean {
        return this.loginService.LoginDetail.isLoggedIn;
    }
    constructor( @Inject('ILoginService') private loginService: ILoginService, private router: Router) {
        var vm = this;
       
        //if (vm.isLoggedin)
        //    this.router.navigateByUrl('/landing');
        //else
        //    this.router.navigateByUrl('/login');

    }   
}
