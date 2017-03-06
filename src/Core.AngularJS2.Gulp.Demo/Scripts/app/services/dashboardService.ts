import { Injectable, Inject, forwardRef, Injector, OpaqueToken } from "@angular/core";

//import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IResponse, Role, IContainerScanned, IWeatherForecast } from "../models/viewModels";
import { IWebRequest, IDashboardService } from "../interfaces/interfaces";
import { WebRequest } from "../services/webRequest";


@Injectable()
export class DashboardService implements IDashboardService {
    getContainerScanStatus: <IContainerScanned>() => Observable<IContainerScanned>;
    getWeatherStatus: <IWeatherForecast>() => Observable<IResponse<IWeatherForecast>>;
    getMyRoles: () => Observable<Role[]>;
    getMyRole: (number) => Observable<Role>;

    constructor( @Inject('IWebRequest')private webRequest : IWebRequest) {
        var vm = this;

        vm.getContainerScanStatus = <IContainerScanned>() => {
            return webRequest.get<IContainerScanned>("http://localhost:53920/api/ContainerStatus");
        }

        vm.getMyRoles = () => {
            return webRequest.get<Role[]>("http://localhost:53920/api/Role");
        };

        vm.getMyRole = (id: number) => {
            return webRequest.get<Role>("http://localhost:53920/api/Role", {id: id });
        };

    }
}