import { Component, Inject, ViewChild } from "@angular/core";
//import { CanvasViewerComponent } from "../canvas/canvasViewer.component";
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

        //this.getImageBytes();
    }

    //tried to get the byte array from server and show the image - didnt work - 
    //To show tiff image we need to hage the url for the image and use tiff.js to show the image..this is done by image reader when we set image path.
    getImageBytes = () => {
        this.imageService.getImageAsByteArrray().subscribe(result => {
            let canvas = this.tiffViewer.nativeElement;
            this.tiffContext = canvas.getContext("2d");
            this.img = new Image();

            //var file = new Blob([result._body]);
            //this.imagePath = file;
            //var fileURL = URL.createObjectURL(file);
            //window.open(fileURL);
            //this.img.src = fileURL;
         
            //this.imageBytes = result._body;
            //var uInt8Array = new Uint8Array(this.imageBytes);
            //var i = uInt8Array.length;
            //var binaryString = new Array(i);
            //while (i--) {
            //    binaryString[i] = String.fromCharCode(uInt8Array[i]);
            //}
            //var data = binaryString.join('');

            //// Base64 encoded image and assign it to the scope
            //this.imageAsBytes = window.btoa(data);
            //console.info(this.imageAsBytes);

            var base = this.base64ArrayBuffer(result._body);
            this.img.src = "data:image/png;base64," + base;

            this.tiffContext.drawImage(this.img, 0, 0);

        });
    }

 

    onChange(event) {
        this.imagePath = event.srcElement.files[0];

        let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        let files: FileList = target.files;
        //this.imagePath = files[0];
    }

    
 base64ArrayBuffer =  (arrayBuffer) => {
    var base64 = ''
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    var bytes = new Uint8Array(arrayBuffer)
    var byteLength = bytes.byteLength
    var byteRemainder = byteLength % 3
    var mainLength = byteLength - byteRemainder

    var a, b, c, d
    var chunk

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
        d = chunk & 63               // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
        chunk = bytes[mainLength]

        a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4 // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

        a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2 // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }

    return base64
}


}
