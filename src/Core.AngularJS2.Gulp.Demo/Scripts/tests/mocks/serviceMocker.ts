import { IResponse, IContainerScanned, IContainerStatus, Role } from "../../app/models/viewModels";
import { IWebRequest, IDashboardService } from "../../app/interfaces/interfaces";
import { Observable } from "rxjs/Observable";
import { Http, Response, RequestOptions, Headers, Request, RequestMethod, ResponseContentType } from "@angular/http";
import { MockBackend } from '@angular/http/testing';

export class ServiceMocker {
    mockWebRequest: <T> (result: T) => IWebRequest;
    mockDashboardService: <T> (result: T) => IDashboardService;

    constructor() {
        var vm = this;

        vm.mockWebRequest = <T>(result: T) => {
            var mockDependency: IWebRequest = {
                get<T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean): Observable<T> {
                    return Observable.create(() => { return result })
                },
                post<T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean): Observable<T> {
                    return Observable.create(() => { return result })

                },
                getImage<T>(url: string, data?: any, params?: any, header?: any, goToErrorState?: boolean): any {
                    return Observable.create(() => { return result })
                },
            }
            return mockDependency;
        }

        vm.mockDashboardService = <T>(result: T) => {
            var mockDependency: IDashboardService = {
                getContainerScanStatus<T>(): Observable<T> {
                    return Observable.create(() => { return result })
                },

                getMyRoles(): Observable<Role[]>  {
                    return Observable.create(() => { return result })

                },

                getMyRole: (id: number): Observable<Role>  => {
                    return Observable.create(() => { return result })
                }
            }
            return mockDependency;
        }
    }
}