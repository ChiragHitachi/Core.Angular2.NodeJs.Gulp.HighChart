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
    var core_1, ImageService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            ImageService = (function () {
                function ImageService(webRequest) {
                    this.webRequest = webRequest;
                    var vm = this;
                    vm.getImagePath = function () {
                        return webRequest.get("http://localhost:53920/api/Image");
                    };
                    vm.getImageAsBase64 = function () {
                        return webRequest.get("http://localhost:53920/api/ImageBase64");
                    };
                    vm.getImageAsByteArrray = function () {
                        return webRequest.getImage("http://localhost:53920/api/ImageByte");
                    };
                }
                return ImageService;
            }());
            ImageService = __decorate([
                core_1.Injectable(),
                __param(0, core_1.Inject('IWebRequest')),
                __metadata("design:paramtypes", [Object])
            ], ImageService);
            exports_1("ImageService", ImageService);
        }
    };
});

//# sourceMappingURL=imageService.js.map
