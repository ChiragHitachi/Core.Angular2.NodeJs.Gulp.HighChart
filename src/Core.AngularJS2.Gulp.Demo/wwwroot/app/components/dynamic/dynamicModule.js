System.register(["../dynamic/dynamicBuilder"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var dynamicBuilder_1, DynamicModule;
    return {
        setters: [
            function (dynamicBuilder_1_1) {
                dynamicBuilder_1 = dynamicBuilder_1_1;
            }
        ],
        execute: function () {
            DynamicModule = (function () {
                function DynamicModule() {
                }
                DynamicModule.forRoot = function () {
                    return {
                        ngModule: DynamicModule,
                        providers: [
                            dynamicBuilder_1.DynamicBuilder
                        ],
                    };
                };
                return DynamicModule;
            }());
            exports_1("DynamicModule", DynamicModule);
        }
    };
});

//# sourceMappingURL=dynamicModule.js.map
