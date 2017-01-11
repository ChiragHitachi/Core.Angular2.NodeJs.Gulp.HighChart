import { Component } from "@angular/core";


@Component({
    selector: "home",
    templateUrl: "/view/components/home/home.component.html"
})


export class HomeComponent {
    title : string;
    //npm install highcharts --save
    //npm install @types/node --save-dev
    //npm install --save-dev gulp-concat - css
    //npm -g install htmlmin
    //npm install --save del
    //npm install --save-dev gulp-load-plugins
    //npm install --save-dev gulp-gzip
    //npm install -g browser-sync
    //npm install gulp-compress
    //npm install angular2-highcharts --save

    constructor() {
        var vm = this;
        vm.title = "Welcome Chirag Gupta";
    }
}
