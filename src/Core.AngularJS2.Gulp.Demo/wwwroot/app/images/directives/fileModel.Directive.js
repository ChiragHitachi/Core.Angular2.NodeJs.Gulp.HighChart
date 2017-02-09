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
    var core_1, canvasClickDirective;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            canvasClickDirective = (function () {
                function canvasClickDirective() {
                }
                canvasClickDirective.prototype.selectImage = function (event) {
                    return window.confirm('Are you sure you want to do this?');
                };
                return canvasClickDirective;
            }());
            __decorate([
                core_1.HostListener('change', ['$event']),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Event]),
                __metadata("design:returntype", void 0)
            ], canvasClickDirective.prototype, "selectImage", null);
            canvasClickDirective = __decorate([
                core_1.Directive({
                    selector: "[fileModel]"
                }),
                __metadata("design:paramtypes", [])
            ], canvasClickDirective);
            exports_1("canvasClickDirective", canvasClickDirective);
        }
    };
});

//# sourceMappingURL=fileModel.Directive.js.map
