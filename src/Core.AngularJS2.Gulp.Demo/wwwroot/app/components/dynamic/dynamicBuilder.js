System.register(["@angular/core", "@angular/compiler", "angular2-highcharts", "../../pipes/formatDate", "@angular/common"], function (exports_1, context_1) {
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
    var core_1, compiler_1, angular2_highcharts_1, formatDate_1, common_1, DynamicBuilder;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (compiler_1_1) {
                compiler_1 = compiler_1_1;
            },
            function (angular2_highcharts_1_1) {
                angular2_highcharts_1 = angular2_highcharts_1_1;
            },
            function (formatDate_1_1) {
                formatDate_1 = formatDate_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }
        ],
        execute: function () {
            DynamicBuilder = (function () {
                function DynamicBuilder(compiler) {
                    this.compiler = compiler;
                    this._cacheOfFactories = {};
                }
                DynamicBuilder.prototype.createComponentFactory = function (template) {
                    var _this = this;
                    var factory = this._cacheOfFactories[template];
                    if (factory) {
                        console.log("Module and Type are returned from cache");
                        return new Promise(function (resolve) {
                            resolve(factory);
                        });
                    }
                    // unknown template ... let's create a Type for it
                    var type = this.createNewComponent(template);
                    var module = this.createComponentModule(type);
                    return new Promise(function (resolve) {
                        _this.compiler
                            .compileModuleAndAllComponentsAsync(module)
                            .then(function (moduleWithFactories) {
                            for (var i = 0; i < moduleWithFactories.componentFactories.length; i++) {
                                if (moduleWithFactories.componentFactories[i].componentType == type) {
                                    factory = moduleWithFactories.componentFactories[i];
                                    break;
                                }
                            }
                            //factory = _.find(moduleWithFactories.componentFactories, { componentType: type });
                            _this._cacheOfFactories[template] = factory;
                            resolve(factory);
                        });
                    });
                };
                DynamicBuilder.prototype.createNewComponent = function (tmpl) {
                    var CustomDynamicComponent = (function () {
                        function CustomDynamicComponent() {
                        }
                        return CustomDynamicComponent;
                    }());
                    __decorate([
                        core_1.Input(),
                        __metadata("design:type", Object)
                    ], CustomDynamicComponent.prototype, "entity", void 0);
                    CustomDynamicComponent = __decorate([
                        core_1.Component({
                            selector: 'dynamic-component',
                            template: tmpl,
                        }),
                        __metadata("design:paramtypes", [])
                    ], CustomDynamicComponent);
                    ;
                    // a component for this particular template
                    return CustomDynamicComponent;
                };
                DynamicBuilder.prototype.createComponentModule = function (componentType) {
                    var RuntimeComponentModule = (function () {
                        function RuntimeComponentModule() {
                        }
                        return RuntimeComponentModule;
                    }());
                    RuntimeComponentModule = __decorate([
                        core_1.NgModule({
                            imports: [
                                angular2_highcharts_1.ChartModule,
                                common_1.CommonModule
                            ],
                            declarations: [
                                componentType,
                                formatDate_1.FormatDate,
                            ],
                            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
                        }),
                        __metadata("design:paramtypes", [])
                    ], RuntimeComponentModule);
                    // a module for just this Type
                    return RuntimeComponentModule;
                };
                return DynamicBuilder;
            }());
            DynamicBuilder = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [compiler_1.JitCompiler])
            ], DynamicBuilder);
            exports_1("DynamicBuilder", DynamicBuilder);
        }
    };
});

//# sourceMappingURL=dynamicBuilder.js.map
