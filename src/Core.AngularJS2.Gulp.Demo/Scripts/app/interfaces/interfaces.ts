import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { IResponse, IContainerDetail, Role, ILoginDetail } from "../models/viewModels";

export interface IWebRequest {
    get: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<T>;
    post: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => Observable<T>;
    getImage: <T>(url: string, data?: any, header?: any, goToErrorState?: boolean) => any;
}

export interface IDashboardService {
    getContainerScanStatus: <ContainerScanned>() => Observable<ContainerScanned>;
    getMyRoles: () => Observable<Role[]>;
    getMyRole: (number) => Observable<Role>;
}

export interface IImageService {
    getImagePath: () => Observable<IContainerDetail>;
    getImageAsBase64: () => Observable<IContainerDetail>;
    getImageAsByteArrray: () => Observable<any>;
}


export interface ILoginService {
    LoginDetail: ILoginDetail;

    login: (userName: string, password: string) => Observable<ILoginDetail>
}
