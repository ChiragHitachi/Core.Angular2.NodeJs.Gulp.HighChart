import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, ViewChild, Input, HostListener } from "@angular/core";
import { IResponse, IImageOptions } from "../../models/viewModels";
import { Http, Response } from "@angular/http";
declare var d3: any;
//import * as d3 from "d3";
//declare var anno: any;

@Component({
    selector: "canvas-viewer",
    templateUrl: "/view/components/canvas/canvasViewer.component.html"
})

export class CanvasViewerComponent {
    clear: any; currentX: any; currentY: any; lineCol: any; lineWidth: any = 1; mouseIsDown: any; oldX: any; oldY: any; startX: any; startY: any; endX: any; endY: any;
    canvas: any;
    @ViewChild("imageViewer") imageViewer;
    context: CanvasRenderingContext2D;
    imageReader = new ImageReader();
    svg: any;
    reader: any;
    @Input() public imagePath;
    @Input() public options: IImageOptions;
    @Input() public overlays;
    // @Input() title = "";
    httpRequest: any;
    curPos = { x: 0, y: 0 };
    picPos = { x: 0, y: 0 };
    mousePos = { x: 0, y: 0 };

    onchange = () => {
        this.imageReader = new ImageReader();
        this.options.zoom.value = 1.0;
        this.options.rotate.value = 0;
        this.curPos = { x: 0, y: 0 };
        this.picPos = { x: 0, y: 0 };
        this.canvas = this.imageViewer.nativeElement;
        this.context = this.canvas.getContext("2d");
        this.options.ctx = this.context;
        var canvasSize = this.canvas.parentNode;
        this.context.canvas.width = canvasSize.clientWidth;
        this.context.canvas.height = canvasSize.clientHeight;
        var resize = { height: canvasSize.clientHeight, width: canvasSize.clientWidth };
        if (typeof (this.imagePath) === 'object') {
            // Object type file
            if (this.imageReader.IsSupported(this.imagePath.type)) {
                this.reader = this.imageReader.CreateReader(this.imagePath.type, this.imagePath, this.httpRequest).create(this.imagePath, this.options, this.onloadeddata);
            } else {
                console.log(this.imagePath.type, ' not supported !');
            }
        } else if (typeof (this.imagePath) === 'string') {
            var options: any = {
                url: this.imagePath,
                method: 'GET',
                responseType: 2
            };
            var overImage = "";
            this.reader = this.imageReader.CreateReader("", this.imagePath).create(this.imagePath, this.options, this.onloadeddata, overImage);//, $q, $timeout);
            if (this.options.controls.enableOverlay) {
                overImage = "http://localhost:61662/images/test.jpg";

                var options2 = this.options;
                var reader2 = this.imageReader.CreateReader("", "http://localhost:61662/images/test.jpg").create("http://localhost:61662/images/test.jpg", options2, this.onloadeddata);//, $q, $timeout);
            }
            //this.reader = imageReader.CreateReader("image/jpeg").create(this.imagePath, this.options, this.onloadeddata);//, $q, $timeout);
        }
        this.applyTransform();
    }
    ngAfterViewInit() {
        this.resizeTo('width');
    }

    @HostListener('window:unload', ['$event'])
    unloadHandler(event) {
        alert('unload');
    }

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHander(event) {
        alert('before unload');

    }
    constructor(private http: Http) {
        this.httpRequest = http;
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

    negative = () => {
        var destX = 0;
        var destY = 0;

        //context.drawImage(imageObj, destX, destY);

        var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var pixels = imageData.data;
        for (var i = 0; i < pixels.length; i += 4) {
            pixels[i] = 255 - pixels[i];   // red
            pixels[i + 1] = 255 - pixels[i + 1]; // green
            pixels[i + 2] = 255 - pixels[i + 2]; // blue
            // i+3 is alpha (the fourth element)
        }

        // overwrite original image
        this.context.putImageData(imageData, 0, 0);
    }
    /*
        blur = () => {
            var i, x, y, passes = 8;
            var imageObj = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    
            passes = passes || 4;
            this.context.globalAlpha = 0.125;
            // Loop for each blur pass.
            for (i = 1; i <= passes; i++) {
                for (y = -1; y < 2; y++) {
                    for (x = -1; x < 2; x++) {
                        this.context.drawImage(imageObj, x, y);
                    }
                }
            }
            this.context.globalAlpha = 1.0;
        }
    */
    zoom = (direction) => {
        var oldWidth, newWidth = 0;
        var oldHeight, newHeight = 0;
        // Does reader support zoom ?
        // Compute correct width
        if (!this.reader.isZoom) {
            oldWidth = this.reader.oldwidth;
            oldHeight = this.reader.height;
        } else {
            oldWidth = this.reader.width * this.options.zoom.value;
            oldHeight = this.reader.height * this.options.zoom.value;
        }

        // Compute new zoom
        this.options.zoom.value += this.options.zoom.step * direction;
        // Round
        this.options.zoom.value = Math.round(this.options.zoom.value * 100) / 100;
        if (this.options.zoom.value >= this.options.zoom.max) {
            this.options.zoom.value = this.options.zoom.max;
        }
        if (this.options.zoom.value <= this.options.zoom.min) {
            this.options.zoom.value = this.options.zoom.min;
        }
        //alert(this.options.zoom.value);
        // Refresh picture
        if (this.reader.refresh != null) {
            this.reader.refresh();
        }

        // Compute new image size
        if (!this.reader.isZoom) {
            newWidth = this.reader.width;
            newHeight = this.reader.height;
        } else {
            newWidth = this.reader.width * this.options.zoom.value;
            newHeight = this.reader.height * this.options.zoom.value;
        }
        // new image position after zoom
        this.picPos.x = this.picPos.x - (newWidth - oldWidth) / 2;
        this.picPos.y = this.picPos.y - (newHeight - oldHeight) / 2;
        this.applyTransform();
    }
    getMousePosition = function (evt) {
        return {
            x: evt.pageX - this.canvas.offsetLeft,
            y: evt.pageY - this.canvas.offsetTop
        };
    };
    draw = function (evt) {
        if (!this.mouseIsDown) {
            this.currentX = null;
            this.currentY = null;
            this.startX = null;
            this.startY = null;
            return;
        }

        if (!this.currentX || !this.currentY) {
            this.currentX = this.getMousePosition(evt).x;
            this.currentY = this.getMousePosition(evt).y;
        }
        if (!this.startX || !this.startY) {
            this.startX = this.currentX;
            this.startY = this.currentY;
        }

        this.oldX = this.currentX;
        this.oldY = this.currentY;
        this.currentX = this.getMousePosition(evt).x;
        this.currentY = this.getMousePosition(evt).y;
        this.context.beginPath();
        this.context.moveTo(this.oldX, this.oldY);
        this.context.lineTo(this.currentX, this.currentY);
        this.context.strokeStyle = this.lineCol;
        this.context.lineJoin = 'round';
        this.context.lineCap = 'round';
        this.context.lineWidth = this.lineWidth;
        this.context.stroke();
        this.context.closePath();
    };
    zoomD3() {
        this.svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        console.log("translate: " + d3.event.translate + ", scale: " + d3.event.scale);
    }

    annotate = () => {

        var imgHeight = 900, imgWidth = 900,      // Image dimensions (don't change these)
            width = 900, height = 900,             // Dimensions of cropped region
            translate0 = [-290, -180], scale0 = 1;  // Initial offset & scale

        this.svg = d3.select("body").append("svg")
            .attr("width", width + "px")
            .attr("height", height + "px");

        this.svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width + "px")
            .attr("height", height + "px");

        this.svg = this.svg.append("g")
            .attr("transform", "translate(" + translate0 + ")scale(" + scale0 + ")")
            .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", this.zoomD3))
            .append("g");

        this.svg.append("image")
            .attr("width", imgWidth + "px")
            .attr("height", imgHeight + "px")
            .attr("xlink:href", "http://localhost:53428/Images/test.jpg");

        //var scale = d3.scale.linear()
        //    .range([10, 390])
        //    .domain([1, 23]);

        this.options.ctx.beginPath();
        this.options.ctx.rect(1, 150, 10, 10);
        this.options.ctx.fillStyle = "red";
        this.options.ctx.fill();
        this.options.ctx.closePath();
    }
    rotate = (direction) => {
        // alert(this.options.zoom.value);

        this.options.rotate.value += this.options.rotate.step * direction;
        if ((this.options.rotate.value <= -360) || (this.options.rotate.value >= 360)) {
            this.options.rotate.value = 0;
        }
        this.applyTransform();
        //this.resizeTo('page');
    }
    resizeTo = (value) => {
        if ((this.context.canvas == null) || (this.reader == null)) {
            return;
        }
        // Compute page ratio
        var options = this.options;
        var ratioH = this.context.canvas.height / this.reader.height;
        var ratioW = this.context.canvas.width / this.reader.width;
        // If reader render zoom itself
        // Precompute from its ratio
        if (!this.reader.isZoom) {
            ratioH *= this.options.zoom.value;
            ratioW *= this.options.zoom.value;
        }
        // Adjust value
        switch (value) {
            case 'width': this.options.zoom.value = ratioW; break;
            case 'height': this.options.zoom.value = ratioH; break;
            case 'page':
            default: this.options.zoom.value = Math.min(ratioH, ratioW);
        }
        this.options.zoom.value = Math.round(this.options.zoom.value * 100) / 100;
        // Update options state
        this.options.controls.fit = value;
        if (!this.reader.isZoom) {
            if (this.reader.refresh != null) {
                this.reader.refresh();
            }

            // Re center image
            this.centerPics();
        } else {
            // Re center image
            this.centerPics();
            this.applyTransform();
        }
    }

    centerPics = () => {
        // Position to canvas center
        var centerX = this.context.canvas.width / 2;
        var picPosX = 0;
        picPosX = centerX - (this.reader.width * this.options.zoom.value) / 2;
        this.curPos = { x: picPosX, y: 0 };
        this.picPos = { x: picPosX, y: 0 };
    }

    overLay = () => {

        this.options.controls.enableOverlay = !this.options.controls.enableOverlay;
        var overImage = "";
        if (this.options.controls.enableOverlay)
            overImage = "http://localhost:53428/Images/test.jpg";
        this.reader = this.imageReader.CreateReader("", this.imagePath).create(this.imagePath, this.options, this.onloadeddata, overImage);//, $q, $timeout);

        this.applyTransform();
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
                    //var imagedata: ImageData = this.context.getImageData(0, 0, 100, 100);
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
                this.context.lineWidth = 11;
                this.context.strokeStyle = item.color;
                this.context.stroke();
                this.context.restore();
            }
        }
    }

    public onMouseDown(event: MouseEvent): void {
        this.mouseIsDown = true;
    }

    public onMouseUp(event: MouseEvent): void {
        this.mouseIsDown = false;
        this.endX = this.getMousePosition(event).x;
        this.endY = this.getMousePosition(event).y;
        this.context.beginPath();
        this.context.moveTo(this.startX, this.startY);
        this.context.strokeStyle = this.lineCol;
        this.context.lineJoin = 'round';
        this.context.lineCap = 'round';
        this.context.lineWidth = this.lineWidth;
        this.context.rect(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY);

        this.context.stroke();
        this.context.closePath();
        let img = new Image();

        img.src = this.canvas.toDataURL();
        this.context.drawImage(img, 0, 0);
    }

    public onMouseMove(event: MouseEvent): void {
        this.draw(event);

    }
}