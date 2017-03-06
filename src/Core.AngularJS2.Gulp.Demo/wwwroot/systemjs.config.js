﻿(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'js/',
            //'ng2-drag-drop': '/node_modules/ng2-drag-drop/index.js',
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

            // angular testing umd bundles
            '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
            '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
            '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
            '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
            '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
            '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
            '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',
            '@angular/forms/testing': 'npm:@angular/forms/bundles/forms-testing.umd.js',

            // other libraries
            'rxjs': 'npm:rxjs',
            'tiff': 'npm:tiff',
            'raphael': 'npm:raphael',
            'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
            'moment': 'js/moment.js',
            'd3':'js/build/d3.js',
            //'ng2-dragula': '/js/ng2-dragula.js', //'https://cdnjs.cloudflare.com/ajax/libs/dragula/1.3.0/dragula.min.js'
            'ng2-drag-drop': 'src/ng2-drag-drop.module.js',
            //'angular2-highcharts': 'npm:angular2-highcharts',
            //'ng2-drag-drop': '/node_modules/ng2-drag-drop/index.js',// /src/ng2-drag-drop.module.js',
            'angular2-highcharts': 'https://cdn.rawgit.com/gevgeny/angular2-highcharts/v0.3.0/dist',
            'highcharts/highstock.src': 'https://cdn.rawgit.com/highcharts/highcharts-dist/v4.2.1/highstock.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './boot.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            tiff: {
                defaultExtension: 'js'
            },
            raphael: {
                defaultExtension: 'js'
            },
            //'ng2-dragula': {
            //    format: 'register',
            //    defaultExtension: 'js'
            //},
            'angular2-in-memory-web-api': {
                defaultExtension: 'js'
            },
            'angular2-highcharts': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'moment': {
                defaultExtension: 'js'
            },
            'd3': {
                defaultExtension: 'js'
            },
            'ng2-drag-drop': {
                defaultExtension: 'js'
            },
        }
    });
})(this);

