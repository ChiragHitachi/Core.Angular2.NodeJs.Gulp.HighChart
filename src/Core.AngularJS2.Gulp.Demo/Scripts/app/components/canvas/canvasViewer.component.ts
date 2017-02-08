import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, ViewChild, Input } from "@angular/core";
import { IResponse, IImageOptions } from "../../models/viewModels";
//import 'js/tiff.js';
//import { FormatReader } from "../canvas/FormatReader";
@Component({
    selector: "canvas-viewer",
    templateUrl: "/view/components/canvas/canvasViewer.component.html"
})

export class CanvasViewerComponent {
    @ViewChild("imageViewer") imageViewer;
    context: CanvasRenderingContext2D;
    reader: any;
    @Input() public imagePath;
    @Input() public options: IImageOptions;
    @Input() public overlays;
    // @Input() HTMLTitleElement = "";

    curPos = { x: 0, y: 0 };
    picPos = { x: 0, y: 0 };
    mousePos = { x: 0, y: 0 };
    onchange = () => {
        var imageReader = new ImageReader();
        this.options.zoom.value = 1.0;
        this.options.rotate.value = 0;
        this.curPos = { x: 0, y: 0 };
        this.picPos = { x: 0, y: 0 };
        let canvas = this.imageViewer.nativeElement;
        this.context = canvas.getContext("2d");
        this.options.ctx = this.context;
        var canvasSize = canvas.parentNode;
        this.context.canvas.width = canvasSize.clientWidth;
        this.context.canvas.height = 900;//canvasSize.clientHeight;
        var resize = { height: canvasSize.clientHeight, width: canvasSize.clientWidth };		
        if (typeof (this.imagePath) === 'object') {
            // Object type file
            if (imageReader.IsSupported(this.imagePath.type)) {
                // get object
                this.reader = imageReader.CreateReader(this.imagePath.type, this.imagePath).create(this.imagePath, this.options, this.onloadeddata);
                // Create image
                //this.reader = decoder.create(this.imagePath, this.options, onload);
            } else {
                console.log(this.imagePath.type, ' not supported !');
            }
        } else if (typeof (this.imagePath) === 'string') {
            this.reader = imageReader.CreateReader("image/jpeg").create(this.imagePath, this.options, this.onloadeddata);//, $q, $timeout);
        }
        this.applyTransform();
    }
    ngAfterViewInit() {
        this.onchange();
    }
    constructor() {

    }
    ngOnChanges() {
        this.onchange();
    }
    onloadeddata = () => {
        if (this.reader == null) {
            return;
        }

        if (this.reader.rendered) {
            this.applyTransform();
        } else {
            this.resizeTo(this.options.controls.fit);
        }
    }

    zoom = (direction) => {
    }
    rotate = (direction) => {
    }
    resizeTo = (value) => {
    }

    applyTransform = () => {
        if (this.reader == null) {
            return;
        }
        if (!this.reader.rendered) {
            return;
        }
        var options = this.options;
        var canvas = this.context.canvas;
        var centerX = this.reader.width * this.options.zoom.value / 2;
        var centerY = this.reader.height * this.options.zoom.value / 2;
        // Clean before draw
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        // Save context
        this.context.save();
        // move to mouse position
        this.context.translate((this.picPos.x + centerX), (this.picPos.y + centerY));
        // Rotate canvas
        this.context.rotate(options.rotate.value * Math.PI / 180);
        // Go back
        this.context.translate(- centerX, - centerY);
        // Change scale
        if (this.reader.isZoom)
            this.context.scale(this.options.zoom.value, this.options.zoom.value);
        if ((!this.options.controls.filmStrip) || (this.options.controls.totalPage == 1)) {
            if (this.reader.img != null) {
                this.context.drawImage(this.reader.img, 0, 0, this.reader.width, this.reader.height);
                this.context.beginPath();
                this.context.rect(0, 0, this.reader.width, this.reader.height);
                this.context.lineWidth = 0.2;
                this.context.strokeStyle = "#000000";
                this.context.stroke();
            }
            // Draw image at correct position with correct scale
            if (this.reader.data != null) {
                this.context.putImageData(this.reader.data, this.picPos.x, this.picPos.y);
                this.context.beginPath();
                this.context.rect(0, 0, this.reader.width, this.reader.height);
                this.context.lineWidth = 0.2;
                this.context.strokeStyle = "#000000";
                this.context.stroke();
            }
        } else {
            if (this.reader.images != null) {
                for (var i = 0; i < this.reader.images.length; i++) {
                    var image = this.reader.images[i];
                    // angular.forEach(this.reader.images, function (image) {
                    this.context.drawImage(image, 0, 0, image.width, image.height);
                    this.context.beginPath();
                    this.context.rect(0, 0, image.width, image.height);
                    this.context.lineWidth = 0.2;
                    this.context.strokeStyle = "#000000";
                    this.context.stroke();
                    this.context.translate(0, image.height + 15);
                }//);
            }
            // Draw image at correct position with correct scale
            if (this.reader.data != null) {
                var offsetY = 0;
                for (var i = 0; i < this.reader.data.length; i++) {
                    var data = this.reader.data[i];
                    // angular.forEach(this.reader.data, function (data) {
                    this.context.putImageData(data, this.picPos.x, this.picPos.y + offsetY);
                    this.context.beginPath();
                    this.context.rect(0, 0, this.reader.width, this.reader.height);
                    this.context.lineWidth = 0.2;
                    this.context.strokeStyle = "#000000";
                    this.context.stroke();
                    offsetY += this.reader.height + 15;
                    this.context.translate(0, offsetY);
                }//);
            }
        }
        // Restore
        this.context.restore();

        // Draw overlays
        if (this.overlays.length > 0) {
            for (var i = 0; i < this.overlays.length; i++) {
                var item = this.overlays[i];
                //angular.forEach(this.overlays, function (item) {
                this.context.save();
                // move to mouse position
                this.context.translate((this.picPos.x + centerX), (this.picPos.y + centerY));
                // Rotate canvas
                this.context.rotate(this.options.rotate.value * Math.PI / 180);
                // Go back
                this.context.translate(- centerX, - centerY);
                // Change scale
                this.context.scale(this.options.zoom.value, this.options.zoom.value);
                // Start rect draw
                this.context.beginPath();
                this.context.rect((item.x), (item.y), item.w, item.h);
                this.context.fillStyle = item.color;
                this.context.globalAlpha = 0.4;
                this.context.fill();
                this.context.lineWidth = 1;
                this.context.strokeStyle = item.color;
                this.context.stroke();
                this.context.restore();
            }
        }
    }

}