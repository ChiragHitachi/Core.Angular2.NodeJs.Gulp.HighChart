import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Directive, Inject, HostListener, Injector } from "@angular/core";

import { BrowserModule } from '@angular/platform-browser';

@Directive({
    selector: "[canvasEvents]"
})
export class canvasClickDirective {
    @HostListener('click', ['$event'])
    confirmFirst(event: Event) {
        return window.confirm('Are you sure you want to do this?');
    }

    @HostListener('mouseleave') onMouseLeave() {
    }
    @HostListener('mousedown') onMouseDown() {
    }
    @HostListener('mouseup') onMouseUp() {
    }
    @HostListener('mouseMove') onMouseMove() {
    }

    hover(shouldUnderline: boolean) {
        if (shouldUnderline) {
            // Mouse enter   this.renderer.setElementStyle(this.el.nativeElement, 'text-decoration', 'underline');
        } else {
            // Mouse leave           this.renderer.setElementStyle(this.el.nativeElement, 'text-decoration', 'none');
        }
    }

}