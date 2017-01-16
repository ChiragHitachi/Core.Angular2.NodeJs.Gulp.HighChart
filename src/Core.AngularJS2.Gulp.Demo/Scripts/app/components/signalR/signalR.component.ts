import { Component } from "@angular/core";


@Component({
    selector: "signalR",
    templateUrl: "/view/components/signalR/signalR.component.html"
})


export class SignalRComponent {
    title : string;
   
    constructor() {
        var vm = this;
        vm.title = "To Do";
    }
}
