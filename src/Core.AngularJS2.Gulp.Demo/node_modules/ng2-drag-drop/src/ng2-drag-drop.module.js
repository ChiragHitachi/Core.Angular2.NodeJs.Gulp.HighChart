"use strict";
var core_1 = require('@angular/core');
var draggable_1 = require("./directives/draggable");
var droppable_1 = require("./directives/droppable");
var Ng2DragDropModule = (function () {
    function Ng2DragDropModule() {
    }
    Ng2DragDropModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [],
                    declarations: [
                        draggable_1.Draggable,
                        droppable_1.Droppable
                    ],
                    exports: [
                        draggable_1.Draggable,
                        droppable_1.Droppable
                    ],
                    providers: [],
                },] },
    ];
    /** @nocollapse */
    Ng2DragDropModule.ctorParameters = function () { return []; };
    return Ng2DragDropModule;
}());
exports.Ng2DragDropModule = Ng2DragDropModule;
//# sourceMappingURL=ng2-drag-drop.module.js.map