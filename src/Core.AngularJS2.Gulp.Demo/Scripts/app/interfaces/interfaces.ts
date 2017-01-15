import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { IResponse } from "../models/viewModels";


export interface IWebRequest {
    get: <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => Observable<T>;
    post: <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;

}

export interface IDashboardService {
    getContainerScanStatus: <ContainerScanned>() => Observable<ContainerScanned>;

}