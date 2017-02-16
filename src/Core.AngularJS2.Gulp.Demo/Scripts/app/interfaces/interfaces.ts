import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { IResponse, IContainerDetail, IToDo } from "../models/viewModels";


export interface IWebRequest {
    get: <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => Observable<T>;
    post: <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => Observable<T>;
    getImage: <T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean) => any;

}

export interface IDashboardService {
    getContainerScanStatus: <ContainerScanned>() => Observable<ContainerScanned>;
    getToDoList: () => Observable<IToDo[]>;
    getToDoItem: (number) => Observable<IToDo>;
}

export interface IImageService {
    getImagePath: () => Observable<IContainerDetail>;
    getImageAsBase64: () => Observable<IContainerDetail>;
    getImageAsByteArrray: () => Observable<any>;
}