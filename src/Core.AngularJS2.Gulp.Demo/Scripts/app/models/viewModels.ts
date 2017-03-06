import { responseStatus } from "../models/enums";

export interface IResponse<T> {
    data: T,
    status: responseStatus,
    messageKey: string,
    apiUrl: string
}

export interface IContainerScanned {
    received: number,
    scanned: number
}

export interface IContainerStatus {
    ignoredContainers: number,
    goodContainers: number,
    badContainers: number,
}

export interface IContainerDetail {
    containerId: number,
    containerImage: string,
    containerImageBase64: string,
    containerImageAsBytes: string,
}

export interface IWeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
export interface IImageZoom {
    value: number,
    step: number,
    min: number,
    max: number
}

export interface IImageRotate {
    value: number,
    step: number
}

export interface IImageControl {
    toolbar: boolean,
    image: boolean,
    sound: boolean,
    fit: string,
    disableZoom: boolean,
    disableMove: boolean,
    disableRotate: boolean,
    numPage: number,
    totalPage: number,
    filmStrip: boolean,
    enableOverlay: boolean
}

export interface IImageOptions {
    ctx: any,
    adsrc: any,
    zoom: IImageZoom,
    rotate: IImageRotate,
    controls: IImageControl,
    info: any
}

export interface Role {
    RoleId: number,
    roleText: string,
    roleGivenTime: Date,
    isValid:boolean
}


export interface IWidget {
    id: number,
    name: string,
    type: string,
    image: string,
    position:number
}

export interface IWidgetPosition {
    position: string,
    widget: IWidget
}

export interface ILoginDetail {
    userId: string,
    userName: string;
    accessToken: string;
    expires: Date;
    loggedinDate?: Date;
    isLoggedIn?: boolean;
}

