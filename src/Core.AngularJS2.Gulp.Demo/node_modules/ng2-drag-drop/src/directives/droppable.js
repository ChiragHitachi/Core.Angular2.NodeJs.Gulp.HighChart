"use strict";
var core_1 = require('@angular/core');
var drop_event_model_1 = require("../shared/drop-event.model");
var Droppable = (function () {
    function Droppable(el) {
        this.el = el;
        /**
         *  Event fired when Drag dragged element enters a valid drop target.
         */
        this.onDragEnter = new core_1.EventEmitter();
        /**
         * Event fired when an element is being dragged over a valid drop target
         */
        this.onDragOver = new core_1.EventEmitter();
        /**
         * Event fired when a dragged element leaves a valid drop target.
         */
        this.onDragLeave = new core_1.EventEmitter();
        /**
         * Event fired when an element is dropped on a valid drop target.
         */
        this.onDrop = new core_1.EventEmitter();
        /**
         * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
         */
        this.dropScope = 'default';
    }
    Droppable.prototype.dragEnter = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.onDragEnter.emit(e);
    };
    Droppable.prototype.dragOver = function (e) {
        if (this.allowDrop(e)) {
            e.target.classList.add(this.dragOverClass);
            e.preventDefault();
            this.onDragOver.emit(e);
        }
    };
    Droppable.prototype.dragLeave = function (e) {
        e.target.classList.remove(this.dragOverClass);
        e.preventDefault();
        this.onDragLeave.emit(e);
    };
    Droppable.prototype.drop = function (e) {
        e.target.classList.remove(this.dragOverClass);
        e.preventDefault();
        e.stopPropagation();
        var data;
        try {
            data = JSON.parse(e.dataTransfer.getData('application/json'));
        }
        catch (e) {
            data = e;
        }
        this.onDrop.emit(new drop_event_model_1.DropEvent(e, data));
    };
    Droppable.prototype.allowDrop = function (e) {
        var allow = false;
        var types = e.dataTransfer.types;
        if (types && types.length) {
            for (var i = 0; i < types.length; i++) {
                if (types[i] == this.dropScope) {
                    allow = true;
                    break;
                }
            }
        }
        return allow;
    };
    Droppable.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[droppable]',
                    host: {
                        '[draggable]': 'true'
                    }
                },] },
    ];
    /** @nocollapse */
    Droppable.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    Droppable.propDecorators = {
        'onDragEnter': [{ type: core_1.Output },],
        'onDragOver': [{ type: core_1.Output },],
        'onDragLeave': [{ type: core_1.Output },],
        'onDrop': [{ type: core_1.Output },],
        'dragOverClass': [{ type: core_1.Input },],
        'dropScope': [{ type: core_1.Input },],
        'dragEnter': [{ type: core_1.HostListener, args: ['dragenter', ['$event'],] },],
        'dragOver': [{ type: core_1.HostListener, args: ['dragover', ['$event'],] },],
        'dragLeave': [{ type: core_1.HostListener, args: ['dragleave', ['$event'],] },],
        'drop': [{ type: core_1.HostListener, args: ['drop', ['$event'],] },],
    };
    return Droppable;
}());
exports.Droppable = Droppable;
//# sourceMappingURL=droppable.js.map