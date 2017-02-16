import { Injectable, Inject, forwardRef, Injector, OpaqueToken } from "@angular/core";

import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IResponse, IToDo, IContainerScanned, IWeatherForecast } from "../models/viewModels";
import { IWebRequest, IDashboardService } from "../interfaces/interfaces";
import { WebRequest } from "../services/webRequest";


@Injectable()
export class DashboardService implements IDashboardService {
    getContainerScanStatus: <IContainerScanned>() => Observable<IContainerScanned>;
    getWeatherStatus: <IWeatherForecast>() => Observable<IResponse<IWeatherForecast>>;
    getToDoList: () => Observable<IToDo[]>;
    getToDoItem: (number) => Observable<IToDo>;

    constructor( @Inject('IWebRequest')private webRequest : IWebRequest) {
        var vm = this;

        vm.getContainerScanStatus = <IContainerScanned>() => {
            return webRequest.get<IContainerScanned>("http://localhost:53919/api/ContainerStatus");
        }

        vm.getToDoList = () => {
            return webRequest.get<IToDo[]>("http://localhost:53919/api/ToDoList");

        };

        vm.getToDoItem = (id: number) => {
            return webRequest.get<IToDo>("http://localhost:53919/api/ToDoList",null, id);
        };

    }
}