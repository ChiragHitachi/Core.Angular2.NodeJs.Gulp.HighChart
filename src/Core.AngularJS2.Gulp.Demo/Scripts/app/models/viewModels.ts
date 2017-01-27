﻿import { responseStatus } from "../models/enums";

export interface IResponse<T> {
    data: T,
    status: responseStatus,
    messageKey: string,
    apiUrl: string
}

export interface IContainerScanned {
    received : number,
    scanned : number
}

export interface IContainerStatus {
    ignoredContainers: number,
    goodContainers: number,
    badContainers: number,
}

export interface IContainerDetail {
    containerId: number,
    containerImage: string,
    containerImageBase64 : string,
    containerImageAsBytes: string,
}

export interface IWeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}