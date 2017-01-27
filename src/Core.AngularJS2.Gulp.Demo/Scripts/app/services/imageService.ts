import { Injectable, Inject, forwardRef, Injector, OpaqueToken } from "@angular/core";

import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IResponse, IContainerScanned, IContainerDetail } from "../models/viewModels";
import { IWebRequest, IImageService } from "../interfaces/interfaces";
import { WebRequest } from "../services/webRequest";


@Injectable()
export class ImageService implements IImageService {
    getImagePath: () => Observable<IContainerDetail>;
    getImageAsBase64: () => Observable<IContainerDetail>;
    getImageAsByteArrray: () => Observable<IContainerDetail>;

    constructor( @Inject('IWebRequest') private webRequest: IWebRequest) {
        var vm = this;

        vm.getImagePath = () => {
            return webRequest.get<IContainerDetail>("http://localhost:53919/api/Image");
        }

        vm.getImageAsBase64 = () => {
            return webRequest.get<IContainerDetail>("http://localhost:53919/api/ImageBase64");
        }

        vm.getImageAsByteArrray = () => {
            return webRequest.get<IContainerDetail>("http://localhost:53919/api/ImageByte");
        }
    }
}