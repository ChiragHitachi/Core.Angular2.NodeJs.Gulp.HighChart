import { Injectable, Inject, Injector } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { IResponse, ILoginDetail } from "../models/viewModels";
import { IWebRequest, ILoginService } from "../interfaces/interfaces";
import { WebRequest } from "../services/webRequest";

@Injectable()
export class LoginService implements ILoginService {
    private loginDetail: ILoginDetail = { accessToken: "", isLoggedIn: false, userName: "", expires : new Date(), loggedinDate : new Date(), userId : 'cgupta' };

    login: <ILoginDetail>(userName: string, password: string) => Observable<ILoginDetail>;
    get LoginDetail(): ILoginDetail {
        return this.loginDetail;
    }
    set LoginDetail(value: ILoginDetail) {
        this.loginDetail = value;
    }
    constructor( @Inject('IWebRequest') private webRequest: IWebRequest) {
        var vm = this;
        vm.login = <ILoginDetail>(userName: string, password: string) => {
            return webRequest.get<ILoginDetail>("http://localhost:53920/api/login", { userName: userName, password: password});
        }

    }
}
