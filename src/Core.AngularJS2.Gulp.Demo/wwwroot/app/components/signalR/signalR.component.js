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
    var core_1, SignalRComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            SignalRComponent = (function () {
                function SignalRComponent() {
                    var _this = this;
                    this.overlays = [];
                    this.udpatePosition = function (widget, position) {
                        _this.widgetPosition.forEach(function (item) {
                            if (item.position === position)
                                item.widget = widget;
                        });
                        _this.removeItem(widget, _this.widgets);
                        switch (position) {
                            case '1':
                                _this.template1 = _this.getTemplate(widget.name);
                                break;
                            case '2':
                                _this.template2 = _this.getTemplate(widget.name);
                                break;
                            case '3':
                                _this.template3 = _this.getTemplate(widget.name);
                                break;
                        }
                    };
                    this.removeItem = function (item, list) {
                        var index = list.map(function (e) {
                            return e.name;
                        }).indexOf(item.name);
                        list.splice(index, 1);
                    };
                    this.getTemplate = function (name) {
                        switch (name) {
                            case 'imageTemplate':
                                return _this.imageTemplate;
                            case 'mapTemplate':
                                return _this.mapTemplate;
                            case 'stockTemplate':
                                return _this.stockTemplate;
                        }
                    };
                    this.positionTemplates = function () {
                        _this.widgets.forEach(function (item) {
                            if (item.position == 1)
                                _this.template1 = _this.getTemplate(item.name);
                            else if (item.position == 2)
                                _this.template2 = _this.getTemplate(item.name);
                            else if (item.position == 3)
                                _this.template3 = _this.getTemplate(item.name);
                        });
                    };
                    var vm = this;
                    vm.title = "My Dashboard";
                    vm.widgets = [
                        { id: 1, image: "", name: "imageTemplate", type: "Image", position: 0 },
                        { id: 2, image: "", name: "mapTemplate", type: "Chart", position: 0 },
                        { id: 3, image: "", name: "stockTemplate", type: "Chart", position: 0 }
                    ];
                    vm.widgetPosition = [
                        { position: '1', widget: null },
                        { position: '2', widget: null },
                        { position: '3', widget: null },
                    ];
                    vm.imagePath = "http://localhost:53428/Images/Container.Tiff";
                    //this.imagePath = "http://localhost:61662/images/test.jpg";
                    vm.overlays = [{ x: 50, y: 155, w: 106, h: 29, color: '#00FF00' }];
                    vm.options = {
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
                            filmStrip: false,
                            enableOverlay: false
                        },
                        info: {}
                    };
                }
                SignalRComponent.prototype.onDropFirst = function (e) {
                    var index = this.widgets.indexOf(e.dragData);
                    if (index >= 0)
                        this.udpatePosition(this.widgets[index], '1');
                };
                SignalRComponent.prototype.onDropSecond = function (e) {
                    var index = this.widgets.indexOf(e.dragData);
                    if (index >= 0)
                        this.udpatePosition(this.widgets[index], '2');
                };
                SignalRComponent.prototype.onDropThird = function (e) {
                    var index = this.widgets.indexOf(e.dragData);
                    if (index >= 0)
                        this.udpatePosition(this.widgets[index], '3');
                };
                return SignalRComponent;
            }());
            __decorate([
                core_1.ViewChild("mapTemplate"),
                __metadata("design:type", core_1.TemplateRef)
            ], SignalRComponent.prototype, "mapTemplate", void 0);
            __decorate([
                core_1.ViewChild("imageTemplate"),
                __metadata("design:type", core_1.TemplateRef)
            ], SignalRComponent.prototype, "imageTemplate", void 0);
            __decorate([
                core_1.ViewChild("stockTemplate"),
                __metadata("design:type", core_1.TemplateRef)
            ], SignalRComponent.prototype, "stockTemplate", void 0);
            __decorate([
                core_1.ViewChild("imageTemplateViewer"),
                __metadata("design:type", Object)
            ], SignalRComponent.prototype, "imageTemplateViewer", void 0);
            SignalRComponent = __decorate([
                core_1.Component({
                    selector: "signalR",
                    templateUrl: "/view/components/signalR/signalR.component.html"
                }),
                __metadata("design:paramtypes", [])
            ], SignalRComponent);
            exports_1("SignalRComponent", SignalRComponent);
        }
    };
});

//# sourceMappingURL=signalR.component.js.map
