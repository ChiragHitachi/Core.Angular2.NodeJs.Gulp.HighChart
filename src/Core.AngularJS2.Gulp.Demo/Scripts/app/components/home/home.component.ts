import { Component } from "@angular/core";
import { IResponse, IImageOptions } from "../../models/viewModels";
//import { CanvasViewerComponent } from "../canvas/canvasViewer.component";

@Component({
    selector: "home",
    templateUrl: "/view/components/home/home.component.html"
})

export class HomeComponent {
    title: string;
    imagePath: string;

    //npm install highcharts --save
    //npm install @types/node --save-dev
    //npm install --save-dev gulp-concat - css
    //npm -g install htmlmin
    //npm install --save del
    //npm install --save-dev gulp-load-plugins
    //npm install --save-dev gulp-gzip
    //npm install -g browser-sync
    //npm install gulp-compress
    //npm install angular2-highcharts --save
    //npm install raphael
    //npm i font-awesome - webpack
    //npm install bootstrap
    options: IImageOptions;
    overlays = [];

    constructor() {
        var vm = this;
        vm.title = "Welcome Chirag Gupta";
        this.imagePath = "http://localhost:61662/images/container.tiff";
        //this.imagePath = "http://localhost:61662/images/test.jpg";

        this.overlays = [{ x: 50, y: 155, w: 106, h: 29, color: '#00FF00' }];
       // @ViewChild('canvasViewer', undefined) canvasViewer: CanvasViewerComponent;
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

        let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        let files: FileList = target.files;
        //this.imagePath = files[0];
    }
}
