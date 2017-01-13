import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IResponse } from "../models/viewModels";
import { IWebRequest } from "../interfaces/interfaces";


@Injectable()
export class WebRequest implements IWebRequest {
    get: <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;
    post: <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;

    constructor(private http: Http) {
        var vm = this;

        vm.get = <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => {
            return this.http.get(url)
                .map(response => response.json())
                .catch(this.handleError);
        }

        vm.post = <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => {
            return this.http.post(url, data)
                .map(response => response.json())
                .catch(this.handleError);
        }
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}