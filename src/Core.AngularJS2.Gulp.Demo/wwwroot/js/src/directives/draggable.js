"use strict";
var core_1 = require('@angular/core');
/**
 * Makes an element draggable by adding the draggable html attribute
 */
var Draggable = (function () {
    function Draggable() {
        /**
         * Currently not used
         */
        this.dragEffect = 'move';
        /**
         * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
         */
        this.dragScope = 'default';
        /**
         * Event fired when Drag is started
         */
        this.onDragStart = new core_1.EventEmitter();
        /**
         * Event fired while the element is being dragged
         */
        this.onDrag = new core_1.EventEmitter();
        /**
         * Event fired when dragged ends
         */
        this.onDragEnd = new core_1.EventEmitter();
    }
    Draggable.prototype.dragStart = function (e) {
        if (this.allowDrag()) {
            e.target.classList.add(this.dragOverClass);
            e.dataTransfer.setData('application/json', JSON.stringify(this.dragData));
            e.dataTransfer.setData(this.dragScope, this.dragScope);
            e.stopPropagation();
            this.onDragStart.emit(e);
        }
        else {
            e.preventDefault();
        }
    };
    Draggable.prototype.drag = function (e) {
        this.onDrag.emit(e);
    };
    Draggable.prototype.dragEnd = function (e) {
        e.target.classList.remove(this.dragOverClass);
        this.onDragEnd.emit(e);
        e.stopPropagation();
        e.preventDefault();
    };
    Draggable.prototype.mouseover = function (e) {
        this.mouseOverElement = e.target;
    };
    Draggable.prototype.allowDrag = function () {
        if (this.dragHandle)
            return this.mouseOverElement.matches(this.dragHandle);
        else
            return true;
    };
    Draggable.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[draggable]',
                    host: {
                        '[draggable]': 'true'
                    }
                },] },
    ];
    /** @nocollapse */
    Draggable.ctorParameters = function () { return []; };
    Draggable.propDecorators = {
        'dragData': [{ type: core_1.Input },],
        'dragHandle': [{ type: core_1.Input },],
        'dragEffect': [{ type: core_1.Input },],
        'dragScope': [{ type: core_1.Input },],
        'dragOverClass': [{ type: core_1.Input },],
        'onDragStart': [{ type: core_1.Output },],
        'onDrag': [{ type: core_1.Output },],
        'onDragEnd': [{ type: core_1.Output },],
        'dragStart': [{ type: core_1.HostListener, args: ['dragstart', ['$event'],] },],
        'drag': [{ type: core_1.HostListener, args: ['drag', ['$event'],] },],
        'dragEnd': [{ type: core_1.HostListener, args: ['dragend', ['$event'],] },],
        'mouseover': [{ type: core_1.HostListener, args: ['mouseover', ['$event'],] },],
    };
    return Draggable;
}());
exports.Draggable = Draggable;
//# sourceMappingURL=draggable.js.map