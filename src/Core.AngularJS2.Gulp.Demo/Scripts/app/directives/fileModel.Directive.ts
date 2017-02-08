import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Directive, Inject, HostListener, Injector } from "@angular/core";

import { BrowserModule } from '@angular/platform-browser';

@Directive({
    selector: "[fileModel]"
})
export class canvasClickDirective {


    @HostListener('change', ['$event'])
    selectImage(event: Event) {
        return window.confirm('Are you sure you want to do this?');
    }
}