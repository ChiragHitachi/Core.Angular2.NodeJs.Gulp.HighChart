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
    var core_1, HomeComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            HomeComponent = (function () {
                function HomeComponent() {
                    this.overlays = [];
                    var vm = this;
                    vm.title = "Welcome Chirag Gupta";
                    //this.imagePath = "http://localhost:61662/images/container.tiff";
                    this.imagePath = "http://localhost:61662/images/test.jpg";
                    this.overlays = [{ x: 50, y: 155, w: 106, h: 29, color: '#00FF00' }];
                    // @ViewChild('imageViewer', undefined) imageViewer: CanvasViewerComponent;
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
                HomeComponent.prototype.onChange = function (event) {
                    this.imagePath = event.srcElement.files[0];
                    var eventObj = event;
                    var target = eventObj.target;
                    var files = target.files;
                    //this.imagePath = files[0];
                };
                return HomeComponent;
            }());
            HomeComponent = __decorate([
                core_1.Component({
                    selector: "home",
                    templateUrl: "/view/components/home/home.component.html",
                }),
                __metadata("design:paramtypes", [])
            ], HomeComponent);
            exports_1("HomeComponent", HomeComponent);
        }
    };
});

//# sourceMappingURL=home.component.js.map
