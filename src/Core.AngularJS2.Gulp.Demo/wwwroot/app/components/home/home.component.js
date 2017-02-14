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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, HomeComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            HomeComponent = (function () {
                function HomeComponent(imageService) {
                    var _this = this;
                    this.imageService = imageService;
                    this.overlays = [];
                    this.getImageBytes = function () {
                        _this.imageService.getImageAsByteArrray().subscribe(function (result) {
                            var canvas = _this.tiffViewer.nativeElement;
                            _this.tiffContext = canvas.getContext("2d");
                            _this.img = new Image();
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
                            var base = _this.base64ArrayBuffer(result._body);
                            _this.img.src = "data:image/png;base64," + base;
                            _this.tiffContext.drawImage(_this.img, 0, 0);
                        });
                    };
                    this.base64ArrayBuffer = function (arrayBuffer) {
                        var base64 = '';
                        var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                        var bytes = new Uint8Array(arrayBuffer);
                        var byteLength = bytes.byteLength;
                        var byteRemainder = byteLength % 3;
                        var mainLength = byteLength - byteRemainder;
                        var a, b, c, d;
                        var chunk;
                        // Main loop deals with bytes in chunks of 3
                        for (var i = 0; i < mainLength; i = i + 3) {
                            // Combine the three bytes into a single integer
                            chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
                            // Use bitmasks to extract 6-bit segments from the triplet
                            a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
                            b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
                            c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
                            d = chunk & 63; // 63       = 2^6 - 1
                            // Convert the raw binary segments to the appropriate ASCII encoding
                            base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
                        }
                        // Deal with the remaining bytes and padding
                        if (byteRemainder == 1) {
                            chunk = bytes[mainLength];
                            a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
                            // Set the 4 least significant bits to zero
                            b = (chunk & 3) << 4; // 3   = 2^2 - 1
                            base64 += encodings[a] + encodings[b] + '==';
                        }
                        else if (byteRemainder == 2) {
                            chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
                            a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
                            b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4
                            // Set the 2 least significant bits to zero
                            c = (chunk & 15) << 2; // 15    = 2^4 - 1
                            base64 += encodings[a] + encodings[b] + encodings[c] + '=';
                        }
                        return base64;
                    };
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
                HomeComponent.prototype.onChange = function (event) {
                    this.imagePath = event.srcElement.files[0];
                    var eventObj = event;
                    var target = eventObj.target;
                    var files = target.files;
                    //this.imagePath = files[0];
                };
                return HomeComponent;
            }());
            __decorate([
                core_1.ViewChild("tiffViewer"),
                __metadata("design:type", Object)
            ], HomeComponent.prototype, "tiffViewer", void 0);
            HomeComponent = __decorate([
                core_1.Component({
                    selector: "home",
                    templateUrl: "/view/components/home/home.component.html"
                }),
                __param(0, core_1.Inject('IImageService')),
                __metadata("design:paramtypes", [Object])
            ], HomeComponent);
            exports_1("HomeComponent", HomeComponent);
        }
    };
});

//# sourceMappingURL=home.component.js.map
