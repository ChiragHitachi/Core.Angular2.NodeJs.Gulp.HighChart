import { Component } from "@angular/core";


@Component({
    selector: "redisCache",
    templateUrl: "/view/components/redisCache/redisCache.component.html"
})


export class RedisCacheComponent {
    title : string;
    
    constructor() {
        var vm = this;
        vm.title = "To Do";
    }
}
