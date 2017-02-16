import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers, Request, RequestMethod, ResponseContentType } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IResponse } from "../models/viewModels";
import { IWebRequest } from "../interfaces/interfaces";

@Injectable()
export class WebRequest implements IWebRequest {
    get: <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => Observable<T>;
    post: <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => Observable<T>;
    getImage: <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => any;

    constructor(private http: Http) {
        var vm = this;
       
        vm.get = <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => {
            return this.http.get(url)
                .map(response => response.json())
                .catch(this.handleError);
        }

        vm.getImage = <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => {
            //let headers = new Headers({ responseType: 'arraybuffer'  });
            //var headers = new Headers();
            // headers.append("Content-Type", 'application/json');
             //headers.append("Authorization", 'Bearer ' + localStorage.getItem('id_token'))
            
            let options = new RequestOptions({ method: RequestMethod.Get, url: url, responseType: ResponseContentType.ArrayBuffer });
            //return this.http.get(url, options);
            return this.http.request(new Request(options));
                //.map(response =>  response)
                //.catch(this.handleError);
        }
        vm.post = <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => {
            return this.http.post(url, data)
                .map(response => response.json())
                .catch(this.handleError);
        }

        function getRequest(method: string, url: string, data?: any, params?: any, header?: any, timeout?: number) {
            var request: any = {
                method: method,
                url: url,
                data: null,
                params: null,
                headers: null,
            };

            if (data)
                request.data = data;
            if (params)
                request.params = params;
            if (header)
                request.headers = header;
            if (timeout)
                request.timeout = timeout;
            return request
        }
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}