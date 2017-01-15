import { Injectable, Inject, forwardRef, Injector, OpaqueToken } from "@angular/core";

import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IResponse, IContainerScanned, IWeatherForecast } from "../models/viewModels";
import { IWebRequest, IDashboardService } from "../interfaces/interfaces";
import { WebRequest } from "../services/webRequest";


@Injectable()
export class DashboardService implements IDashboardService {
    getContainerScanStatus: <IContainerScanned>() => Observable<IResponse<IContainerScanned>>;
    getWeatherStatus: <IWeatherForecast>() => Observable<IResponse<IWeatherForecast>>;

    constructor( @Inject('IWebRequest')private webRequest : IWebRequest) {
        var vm = this;

        vm.getContainerScanStatus = <IContainerScanned>() => {
            return webRequest.get<IContainerScanned>("/api/GetContainerScannedStatus");
        }

        vm.getWeatherStatus = <IWeatherForecast>() => {
            return webRequest.get<IWeatherForecast>("/api/SampleData/WeatherForecasts");
        }
    }
}