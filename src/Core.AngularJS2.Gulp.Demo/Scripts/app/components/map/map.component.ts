import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, ViewChild, Input, HostListener } from "@angular/core";
import { IResponse, IImageOptions } from "../../models/viewModels";
//import 'js/tiff.js';
import { Http, Response } from "@angular/http";

@Component({
    selector: "map-viewer",
    templateUrl: "/view/components/map/map.component.html"
})

export class MapComponent {
    title: string
    constructor() {
        let vm = this;
        vm.title = "Map";
    }
}