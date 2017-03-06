import { Component, Inject, ViewChild } from "@angular/core";
import { ImageService } from "../../services/imageService";
import { IResponse, IImageOptions, IContainerScanned, IContainerStatus } from "../../models/viewModels";
import { IImageService } from "../../interfaces/interfaces";

@Component({
    selector: "landing",
    templateUrl: "/view/components/landing/landing.component.html"
})

export class LandingComponent {
    title: string;

    constructor() {
        var vm = this;
        vm.title = "Welcome Chirag Gupta";
    }
}
