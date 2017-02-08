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
    var core_1, IntegrationComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            IntegrationComponent = (function () {
                function IntegrationComponent(dashboardService, imageService) {
                    var _this = this;
                    this.dashboardService = dashboardService;
                    this.imageService = imageService;
                    this.title = "Integration Charts";
                    this.getImagePath = function () {
                        _this.imageService.getImagePath().subscribe(function (result) {
                            _this.imagePath = result.containerImage;
                            console.info(_this.imagePath);
                            var fr = new FileReader();
                            var extension = "tiff";
                            fr.onload = function (e) {
                                ////Using tiff.min.js library - https://github.com/seikichi/tiff.js/tree/master
                                //console.debug("Parsing TIFF image...");
                                ////initialize with 100MB for large files
                                //Tiff.initialize({
                                //    TOTAL_MEMORY: 100000000
                                //});
                                //var tiff = new Tiff({
                                //    buffer: e.target.result
                                //});
                                //var tiffCanvas = tiff.toCanvas();
                                //(tiffCanvas).css({
                                //    "max-width": "100px",
                                //    "width": "100%",
                                //    "height": "auto",
                                //    "display": "block",
                                //    "padding-top": "10px"
                                //}).addClass("preview");
                                //doc.append(tiffCanvas);
                            };
                            fr.onloadend = function (e) {
                                console.debug("Load End");
                            };
                            //fr.readAsArrayBuffer(files[0]);
                        });
                    };
                    this.getImageBase64 = function () {
                        _this.imageService.getImageAsBase64().subscribe(function (result) {
                            _this.imageBase64 = result.containerImageBase64;
                            console.info(_this.imageBase64);
                        });
                    };
                    this.getImageBytes = function () {
                        _this.imageService.getImageAsByteArrray().subscribe(function (result) {
                            _this.imageBytes = result;
                            var uInt8Array = new Uint8Array(_this.imageBytes);
                            var i = uInt8Array.length;
                            var binaryString = new Array(i);
                            while (i--) {
                                binaryString[i] = String.fromCharCode(uInt8Array[i]);
                            }
                            var data = binaryString.join('');
                            // Base64 encoded image and assign it to the scope
                            _this.imageAsBytes = window.btoa(data);
                            console.info(_this.imageAsBytes);
                        });
                    };
                    this.getContainerStatus = function () {
                        _this.dashboardService.getContainerScanStatus().subscribe(function (result) {
                            _this.containerStatus = result;
                            console.info(_this.containerStatus);
                            _this.pieOptions = {
                                title: { text: 'Container Scan Status' },
                                chart: { type: 'pie' },
                                series: [{
                                        name: 'Container Scan Status',
                                        colorByPoint: true,
                                        data: [{
                                                name: 'Ignored Containers',
                                                y: _this.containerStatus.ignoredContainers
                                            }, {
                                                name: 'Bad Containers',
                                                y: _this.containerStatus.badContainers
                                            },
                                            {
                                                name: 'Passed Containers',
                                                y: _this.containerStatus.goodContainers,
                                                sliced: true,
                                                selected: true
                                            }]
                                    }]
                            };
                        });
                    };
                }
                IntegrationComponent.prototype.ngOnInit = function () {
                    this.getContainerStatus();
                    //this.getImageBase64();
                    this.getImagePath();
                    //this.getImageBytes();
                };
                return IntegrationComponent;
            }());
            IntegrationComponent = __decorate([
                core_1.Component({
                    selector: "charts",
                    templateUrl: "/view/components/integration/integration.component.html"
                }),
                __param(0, core_1.Inject('IDashboardService')), __param(1, core_1.Inject('IImageService')),
                __metadata("design:paramtypes", [Object, Object])
            ], IntegrationComponent);
            exports_1("IntegrationComponent", IntegrationComponent);
        }
    };
});

//# sourceMappingURL=integration.component.js.map
