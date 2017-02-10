System.register(["@angular/core"], function (exports_1, context_1) {
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
    var core_1, CanvasViewerComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            CanvasViewerComponent = (function () {
                function CanvasViewerComponent() {
                    var _this = this;
                    // @Input() title = "";
                    this.curPos = { x: 0, y: 0 };
                    this.picPos = { x: 0, y: 0 };
                    this.mousePos = { x: 0, y: 0 };
                    this.onchange = function () {
                        var imageReader = new ImageReader();
                        _this.options.zoom.value = 1.0;
                        _this.options.rotate.value = 0;
                        _this.curPos = { x: 0, y: 0 };
                        _this.picPos = { x: 0, y: 0 };
                        var canvas = _this.imageViewer.nativeElement;
                        _this.context = canvas.getContext("2d");
                        _this.options.ctx = _this.context;
                        var canvasSize = canvas.parentNode;
                        _this.context.canvas.width = canvasSize.clientWidth;
                        _this.context.canvas.height = canvasSize.clientHeight;
                        var resize = { height: canvasSize.clientHeight, width: canvasSize.clientWidth };
                        if (typeof (_this.imagePath) === 'object') {
                            // Object type file
                            if (imageReader.IsSupported(_this.imagePath.type)) {
                                // get object
                                _this.reader = imageReader.CreateReader(_this.imagePath.type, _this.imagePath).create(_this.imagePath, _this.options, _this.onloadeddata);
                            }
                            else {
                                console.log(_this.imagePath.type, ' not supported !');
                            }
                        }
                        else if (typeof (_this.imagePath) === 'string') {
                            _this.reader = imageReader.CreateReader("image/jpeg").create(_this.imagePath, _this.options, _this.onloadeddata); //, $q, $timeout);
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
                    this.rotate = function (direction) {
                        _this.options.rotate.value += _this.options.rotate.step * direction;
                        if ((_this.options.rotate.value <= -360) || (_this.options.rotate.value >= 360)) {
                            _this.options.rotate.value = 0;
                        }
                        _this.applyTransform();
                        _this.resizeTo('page');
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
                                _this.context.lineWidth = 1;
                                _this.context.strokeStyle = item.color;
                                _this.context.stroke();
                                _this.context.restore();
                            }
                        }
                    };
                }
                CanvasViewerComponent.prototype.ngAfterViewInit = function () {
                    this.onchange();
                };
                CanvasViewerComponent.prototype.ngOnChanges = function () {
                    this.onchange();
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
            CanvasViewerComponent = __decorate([
                core_1.Component({
                    selector: "canvas-viewer",
                    templateUrl: "/view/components/canvas/canvasViewer.component.html"
                }),
                __metadata("design:paramtypes", [])
            ], CanvasViewerComponent);
            exports_1("CanvasViewerComponent", CanvasViewerComponent);
        }
    };
});
