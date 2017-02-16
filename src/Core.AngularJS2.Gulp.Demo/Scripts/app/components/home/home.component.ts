import { Component, Inject, ViewChild } from "@angular/core";
import { ImageService } from "../../services/imageService";
import { IResponse, IImageOptions, IContainerScanned, IContainerStatus } from "../../models/viewModels";
import { IImageService } from "../../interfaces/interfaces";

@Component({
    selector: "home",
    templateUrl: "/view/components/home/home.component.html"
})

export class HomeComponent {
    title: string;
    imagePath: any;
    img: any;

    options: IImageOptions;
    overlays = [];
    imageBytes: any;
    imageAsBytes: any;
    @ViewChild("tiffViewer") tiffViewer;
    tiffContext: CanvasRenderingContext2D;

    constructor( @Inject('IImageService') private imageService: IImageService) {
        var vm = this;
        vm.title = "Welcome Chirag Gupta";
        this.imagePath = "http://localhost:53428/Images/Container.Tiff";
        //this.imagePath = "http://localhost:61662/images/test.jpg";

        this.overlays = [{ x: 50, y: 155, w: 106, h: 29, color: '#00FF00' }];
        this.options = {
            ctx: null,
            adsrc: null,
            zoom: {
                value: 1.0,
                step: 0.1,
                min: 0.05,
                max: 6
            },
            rotate: {
                value: 0,
                step: 90
            },
            controls: {
                toolbar: true,
                image: true,
                sound: false,
                fit: 'page',
                disableZoom: false,
                disableMove: false,
                disableRotate: false,
                numPage: 1,
                totalPage: 1,
                filmStrip: false
            },
            info: {}
        };
    }

    onChange(event) {
        this.imagePath = event.srcElement.files[0];
        //let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        //let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        //let files: FileList = target.files;

        //careerstage_td.selectAll('div')
        //    .data(dataset)
        //    .enter().append('div')
        //    .attr("class", "career-count")
        //    .text(function (d) { return d; })
        //    .style("color", function (d) { return d.color; })
        //    .append('div')
        //    .attr("class", "childClass")
        //    .style("background-image", function (d) { return "url('images/" + d.icon + "')"; })
        //    .style("background-repeat", "no-repeat")
        //    .style("background-position", "center center");
    }
}
