System.register(["@angular/core", "@angular/http"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, CanvasViewerComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }
        ],
        execute: function () {
            CanvasViewerComponent = (function () {
                function CanvasViewerComponent(http) {
                    var _this = this;
                    this.http = http;
                    this.lineWidth = 1;
                    this.imageReader = new ImageReader();
                    this.curPos = { x: 0, y: 0 };
                    this.picPos = { x: 0, y: 0 };
                    this.mousePos = { x: 0, y: 0 };
                    this.onchange = function () {
                        _this.imageReader = new ImageReader();
                        _this.options.zoom.value = 1.0;
                        _this.options.rotate.value = 0;
                        _this.curPos = { x: 0, y: 0 };
                        _this.picPos = { x: 0, y: 0 };
                        _this.canvas = _this.imageViewer.nativeElement;
                        _this.context = _this.canvas.getContext("2d");
                        _this.options.ctx = _this.context;
                        var canvasSize = _this.canvas.parentNode;
                        _this.context.canvas.width = canvasSize.clientWidth;
                        _this.context.canvas.height = canvasSize.clientHeight;
                        var resize = { height: canvasSize.clientHeight, width: canvasSize.clientWidth };
                        if (typeof (_this.imagePath) === 'object') {
                            // Object type file
                            if (_this.imageReader.IsSupported(_this.imagePath.type)) {
                                _this.reader = _this.imageReader.CreateReader(_this.imagePath.type, _this.imagePath, _this.httpRequest).create(_this.imagePath, _this.options, _this.onloadeddata);
                            }
                            else {
                                console.log(_this.imagePath.type, ' not supported !');
                            }
                        }
                        else if (typeof (_this.imagePath) === 'string') {
                            var options = {
                                url: _this.imagePath,
                                method: 'GET',
                                responseType: 2
                            };
                            var overImage = "";
                            _this.reader = _this.imageReader.CreateReader("", _this.imagePath).create(_this.imagePath, _this.options, _this.onloadeddata, overImage); //, $q, $timeout);
                            if (_this.options.controls.enableOverlay) {
                                overImage = "http://localhost:61662/images/test.jpg";
                                var options2 = _this.options;
                                var reader2 = _this.imageReader.CreateReader("", "http://localhost:61662/images/test.jpg").create("http://localhost:61662/images/test.jpg", options2, _this.onloadeddata); //, $q, $timeout);
                            }
                        }
                        _this.applyTransform();
                    };
                    this.onloadeddata = function () {
                        if (_this.reader == null) {
                            return;
                        }
                        if (_this.reader.rendered) {
                            _this.applyTransform();
                        }
                        else {
                            _this.resizeTo(_this.options.controls.fit);
                        }
                    };
                    this.negative = function () {
                        var destX = 0;
                        var destY = 0;
                        //context.drawImage(imageObj, destX, destY);
                        var imageData = _this.context.getImageData(0, 0, _this.canvas.width, _this.canvas.height);
                        var pixels = imageData.data;
                        for (var i = 0; i < pixels.length; i += 4) {
                            pixels[i] = 255 - pixels[i]; // red
                            pixels[i + 1] = 255 - pixels[i + 1]; // green
                            pixels[i + 2] = 255 - pixels[i + 2]; // blue
                        }
                        // overwrite original image
                        _this.context.putImageData(imageData, 0, 0);
                    };
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
                    this.zoom = function (direction) {
                        var oldWidth, newWidth = 0;
                        var oldHeight, newHeight = 0;
                        // Does reader support zoom ?
                        // Compute correct width
                        if (!_this.reader.isZoom) {
                            oldWidth = _this.reader.oldwidth;
                            oldHeight = _this.reader.height;
                        }
                        else {
                            oldWidth = _this.reader.width * _this.options.zoom.value;
                            oldHeight = _this.reader.height * _this.options.zoom.value;
                        }
                        // Compute new zoom
                        _this.options.zoom.value += _this.options.zoom.step * direction;
                        // Round
                        _this.options.zoom.value = Math.round(_this.options.zoom.value * 100) / 100;
                        if (_this.options.zoom.value >= _this.options.zoom.max) {
                            _this.options.zoom.value = _this.options.zoom.max;
                        }
                        if (_this.options.zoom.value <= _this.options.zoom.min) {
                            _this.options.zoom.value = _this.options.zoom.min;
                        }
                        //alert(this.options.zoom.value);
                        // Refresh picture
                        if (_this.reader.refresh != null) {
                            _this.reader.refresh();
                        }
                        // Compute new image size
                        if (!_this.reader.isZoom) {
                            newWidth = _this.reader.width;
                            newHeight = _this.reader.height;
                        }
                        else {
                            newWidth = _this.reader.width * _this.options.zoom.value;
                            newHeight = _this.reader.height * _this.options.zoom.value;
                        }
                        // new image position after zoom
                        _this.picPos.x = _this.picPos.x - (newWidth - oldWidth) / 2;
                        _this.picPos.y = _this.picPos.y - (newHeight - oldHeight) / 2;
                        _this.applyTransform();
                    };
                    this.getMousePosition = function (evt) {
                        return {
                            x: evt.pageX - this.canvas.offsetLeft,
                            y: evt.pageY - this.canvas.offsetTop
                        };
                    };
                    this.draw = function (evt) {
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
                    this.annotate = function () {
                        var imgHeight = 900, imgWidth = 900, // Image dimensions (don't change these)
                        width = 900, height = 900, // Dimensions of cropped region
                        translate0 = [-290, -180], scale0 = 1; // Initial offset & scale
                        _this.svg = d3.select("body").append("svg")
                            .attr("width", width + "px")
                            .attr("height", height + "px");
                        _this.svg.append("rect")
                            .attr("class", "overlay")
                            .attr("width", width + "px")
                            .attr("height", height + "px");
                        _this.svg = _this.svg.append("g")
                            .attr("transform", "translate(" + translate0 + ")scale(" + scale0 + ")")
                            .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", _this.zoomD3))
                            .append("g");
                        _this.svg.append("image")
                            .attr("width", imgWidth + "px")
                            .attr("height", imgHeight + "px")
                            .attr("xlink:href", "http://localhost:53428/Images/test.jpg");
                        //var scale = d3.scale.linear()
                        //    .range([10, 390])
                        //    .domain([1, 23]);
                        _this.options.ctx.beginPath();
                        _this.options.ctx.rect(1, 150, 10, 10);
                        _this.options.ctx.fillStyle = "red";
                        _this.options.ctx.fill();
                        _this.options.ctx.closePath();
                    };
                    this.rotate = function (direction) {
                        // alert(this.options.zoom.value);
                        _this.options.rotate.value += _this.options.rotate.step * direction;
                        if ((_this.options.rotate.value <= -360) || (_this.options.rotate.value >= 360)) {
                            _this.options.rotate.value = 0;
                        }
                        _this.applyTransform();
                        //this.resizeTo('page');
                    };
                    this.resizeTo = function (value) {
                        if ((_this.context.canvas == null) || (_this.reader == null)) {
                            return;
                        }
                        // Compute page ratio
                        var options = _this.options;
                        var ratioH = _this.context.canvas.height / _this.reader.height;
                        var ratioW = _this.context.canvas.width / _this.reader.width;
                        // If reader render zoom itself
                        // Precompute from its ratio
                        if (!_this.reader.isZoom) {
                            ratioH *= _this.options.zoom.value;
                            ratioW *= _this.options.zoom.value;
                        }
                        // Adjust value
                        switch (value) {
                            case 'width':
                                _this.options.zoom.value = ratioW;
                                break;
                            case 'height':
                                _this.options.zoom.value = ratioH;
                                break;
                            case 'page':
                            default: _this.options.zoom.value = Math.min(ratioH, ratioW);
                        }
                        _this.options.zoom.value = Math.round(_this.options.zoom.value * 100) / 100;
                        // Update options state
                        _this.options.controls.fit = value;
                        if (!_this.reader.isZoom) {
                            if (_this.reader.refresh != null) {
                                _this.reader.refresh();
                            }
                            // Re center image
                            _this.centerPics();
                        }
                        else {
                            // Re center image
                            _this.centerPics();
                            _this.applyTransform();
                        }
                    };
                    this.centerPics = function () {
                        // Position to canvas center
                        var centerX = _this.context.canvas.width / 2;
                        var picPosX = 0;
                        picPosX = centerX - (_this.reader.width * _this.options.zoom.value) / 2;
                        _this.curPos = { x: picPosX, y: 0 };
                        _this.picPos = { x: picPosX, y: 0 };
                    };
                    this.overLay = function () {
                        _this.options.controls.enableOverlay = !_this.options.controls.enableOverlay;
                        var overImage = "";
                        if (_this.options.controls.enableOverlay)
                            overImage = "http://localhost:53428/Images/test.jpg";
                        _this.reader = _this.imageReader.CreateReader("", _this.imagePath).create(_this.imagePath, _this.options, _this.onloadeddata, overImage); //, $q, $timeout);
                        _this.applyTransform();
                    };
                    this.applyTransform = function () {
                        if (_this.reader == null) {
                            return;
                        }
                        if (!_this.reader.rendered) {
                            return;
                        }
                        var options = _this.options;
                        var canvas = _this.context.canvas;
                        var centerX = _this.reader.width * _this.options.zoom.value / 2;
                        var centerY = _this.reader.height * _this.options.zoom.value / 2;
                        // Clean before draw
                        _this.context.clearRect(0, 0, canvas.width, canvas.height);
                        // Save context
                        _this.context.save();
                        // move to mouse position
                        _this.context.translate((_this.picPos.x + centerX), (_this.picPos.y + centerY));
                        // Rotate canvas
                        _this.context.rotate(options.rotate.value * Math.PI / 180);
                        // Go back
                        _this.context.translate(-centerX, -centerY);
                        // Change scale
                        if (_this.reader.isZoom)
                            _this.context.scale(_this.options.zoom.value, _this.options.zoom.value);
                        if ((!_this.options.controls.filmStrip) || (_this.options.controls.totalPage == 1)) {
                            if (_this.reader.img != null) {
                                _this.context.drawImage(_this.reader.img, 0, 0, _this.reader.width, _this.reader.height);
                                _this.context.beginPath();
                                _this.context.rect(0, 0, _this.reader.width, _this.reader.height);
                                _this.context.lineWidth = 0.2;
                                _this.context.strokeStyle = "#000000";
                                _this.context.stroke();
                            }
                            // Draw image at correct position with correct scale
                            if (_this.reader.data != null) {
                                _this.context.putImageData(_this.reader.data, _this.picPos.x, _this.picPos.y);
                                _this.context.beginPath();
                                _this.context.rect(0, 0, _this.reader.width, _this.reader.height);
                                _this.context.lineWidth = 0.2;
                                _this.context.strokeStyle = "#000000";
                                _this.context.stroke();
                            }
                        }
                        else {
                            if (_this.reader.images != null) {
                                for (var i = 0; i < _this.reader.images.length; i++) {
                                    var image = _this.reader.images[i];
                                    // angular.forEach(this.reader.images, function (image) {
                                    _this.context.drawImage(image, 0, 0, image.width, image.height);
                                    _this.context.beginPath();
                                    _this.context.rect(0, 0, image.width, image.height);
                                    _this.context.lineWidth = 0.2;
                                    _this.context.strokeStyle = "#000000";
                                    _this.context.stroke();
                                    _this.context.translate(0, image.height + 15);
                                } //);
                            }
                            // Draw image at correct position with correct scale
                            if (_this.reader.data != null) {
                                var offsetY = 0;
                                for (var i = 0; i < _this.reader.data.length; i++) {
                                    var data = _this.reader.data[i];
                                    //var imagedata: ImageData = this.context.getImageData(0, 0, 100, 100);
                                    // angular.forEach(this.reader.data, function (data) {
                                    _this.context.putImageData(data, _this.picPos.x, _this.picPos.y + offsetY);
                                    _this.context.beginPath();
                                    _this.context.rect(0, 0, _this.reader.width, _this.reader.height);
                                    _this.context.lineWidth = 0.2;
                                    _this.context.strokeStyle = "#000000";
                                    _this.context.stroke();
                                    offsetY += _this.reader.height + 15;
                                    _this.context.translate(0, offsetY);
                                } //);
                            }
                        }
                        // Restore
                        _this.context.restore();
                        // Draw overlays
                        if (_this.overlays.length > 0) {
                            for (var i = 0; i < _this.overlays.length; i++) {
                                var item = _this.overlays[i];
                                //angular.forEach(this.overlays, function (item) {
                                _this.context.save();
                                // move to mouse position
                                _this.context.translate((_this.picPos.x + centerX), (_this.picPos.y + centerY));
                                // Rotate canvas
                                _this.context.rotate(_this.options.rotate.value * Math.PI / 180);
                                // Go back
                                _this.context.translate(-centerX, -centerY);
                                // Change scale
                                _this.context.scale(_this.options.zoom.value, _this.options.zoom.value);
                                // Start rect draw
                                _this.context.beginPath();
                                _this.context.rect((item.x), (item.y), item.w, item.h);
                                _this.context.fillStyle = item.color;
                                _this.context.globalAlpha = 0.4;
                                _this.context.fill();
                                _this.context.lineWidth = 11;
                                _this.context.strokeStyle = item.color;
                                _this.context.stroke();
                                _this.context.restore();
                            }
                        }
                    };
                    this.httpRequest = http;
                }
                CanvasViewerComponent.prototype.ngAfterViewInit = function () {
                    this.resizeTo('width');
                };
                CanvasViewerComponent.prototype.unloadHandler = function (event) {
                    alert('unload');
                };
                CanvasViewerComponent.prototype.beforeUnloadHander = function (event) {
                    alert('before unload');
                };
                CanvasViewerComponent.prototype.ngOnChanges = function () {
                    this.onchange();
                };
                CanvasViewerComponent.prototype.zoomD3 = function () {
                    this.svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                    console.log("translate: " + d3.event.translate + ", scale: " + d3.event.scale);
                };
                CanvasViewerComponent.prototype.onMouseDown = function (event) {
                    this.mouseIsDown = true;
                };
                CanvasViewerComponent.prototype.onMouseUp = function (event) {
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
                    var img = new Image();
                    img.src = this.canvas.toDataURL();
                    this.context.drawImage(img, 0, 0);
                };
                CanvasViewerComponent.prototype.onMouseMove = function (event) {
                    this.draw(event);
                };
                return CanvasViewerComponent;
            }());
            __decorate([
                core_1.ViewChild("imageViewer"),
                __metadata("design:type", Object)
            ], CanvasViewerComponent.prototype, "imageViewer", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], CanvasViewerComponent.prototype, "imagePath", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], CanvasViewerComponent.prototype, "options", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], CanvasViewerComponent.prototype, "overlays", void 0);
            __decorate([
                core_1.HostListener('window:unload', ['$event']),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], CanvasViewerComponent.prototype, "unloadHandler", null);
            __decorate([
                core_1.HostListener('window:beforeunload', ['$event']),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], CanvasViewerComponent.prototype, "beforeUnloadHander", null);
            CanvasViewerComponent = __decorate([
                core_1.Component({
                    selector: "canvas-viewer",
                    templateUrl: "/view/components/canvas/canvasViewer.component.html"
                }),
                __metadata("design:paramtypes", [http_1.Http])
            ], CanvasViewerComponent);
            exports_1("CanvasViewerComponent", CanvasViewerComponent);
        }
    };
});

//# sourceMappingURL=canvasViewer.component.js.map
