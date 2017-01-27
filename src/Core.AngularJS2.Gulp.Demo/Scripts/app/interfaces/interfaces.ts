import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { IResponse, IContainerDetail } from "../models/viewModels";


export interface IWebRequest {
    get: <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => Observable<T>;
    post: <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => Observable<IResponse<T>>;

}

export interface IDashboardService {
    getContainerScanStatus: <ContainerScanned>() => Observable<ContainerScanned>;

}

export interface IImageService {
    getImagePath: () => Observable<IContainerDetail>;
    getImageAsBase64: () => Observable<IContainerDetail>;
    getImageAsByteArrray: () => Observable<IContainerDetail>;
}