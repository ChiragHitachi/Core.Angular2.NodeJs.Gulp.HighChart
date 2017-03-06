import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, Inject } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from "../../services/loginService";
import { IResponse, ILoginDetail } from "../../models/viewModels";
import { IWebRequest, ILoginService } from "../../interfaces/interfaces";

import { Observable } from "rxjs/Observable";
import { Routes, Router } from "@angular/router";

@Component({
    selector: "login",
    templateUrl: "/view/components/login/login.component.html"
})

export class LoginComponent {
    userName: string;
    password: string;
    loginDetail: ILoginDetail;
    login: () => void;

    constructor( @Inject('ILoginService') private loginService: ILoginService, private  router: Router) {
        var vm = this;
        this.loginService.LoginDetail.isLoggedIn = false;
        vm.login = () =>{
            this.loginService.login(this.userName, this.password).subscribe(result => {
                this.loginDetail = result;
                this.loginDetail.isLoggedIn = true;
                this.loginService.LoginDetail = this.loginDetail;
                this.router.navigateByUrl('/landing');
            });
        }
    }
}