import { responseStatus } from "../models/enums";

export interface IResponse<T> {
    data: T,
    status: responseStatus,
    messageKey: string,
    apiUrl: string
}

export interface IContainerScanned {
    Received : number,
    Scanned : number
}

export interface IContainerStatus {
    IgnoredContainers: number,
    GoodContainers: number,
    BadContainers: number,
}


export interface IWeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}