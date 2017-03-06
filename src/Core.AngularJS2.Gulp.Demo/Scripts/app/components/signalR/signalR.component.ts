import { Component, ViewChild, TemplateRef } from "@angular/core";
import { IResponse, IWidget, IWidgetPosition, IImageOptions } from "../../models/viewModels";
import { } from 'ng2-drag-drop';
@Component({
    selector: "signalR",
    templateUrl: "/view/components/signalR/signalR.component.html"
})


export class SignalRComponent {
    title: string;
    widgets: IWidget[];
    imagePath: any;
    widgetPosition: IWidgetPosition[];
    options: IImageOptions;
    overlays = [];
    @ViewChild("mapTemplate") mapTemplate: TemplateRef<any>;
    @ViewChild("imageTemplate") imageTemplate: TemplateRef<any>;
    @ViewChild("stockTemplate") stockTemplate: TemplateRef<any>;
    @ViewChild("imageTemplateViewer") imageTemplateViewer;
    template1: any;
    template2: any;
    template3: any;

    constructor() {
        let vm = this;
        vm.title = "My Dashboard";
        vm.widgets = [
            { id: 1, image: "", name: "imageTemplate", type: "Image", position : 0 },
            { id: 2, image: "", name: "mapTemplate", type: "Chart", position: 0},
            { id: 3, image: "", name: "stockTemplate", type: "Chart", position: 0}
        ];
        vm.widgetPosition = [
            { position: '1', widget: null },
            { position: '2', widget: null },
            { position: '3', widget: null },
        ];
        vm.imagePath = "http://localhost:53428/Images/Container.Tiff";
        //this.imagePath = "http://localhost:61662/images/test.jpg";

        vm.overlays = [{ x: 50, y: 155, w: 106, h: 29, color: '#00FF00' }];
        vm.options = {
            ctx: null,
            adsrc: null,
            zoom: {
                value: 1.0,
                step: 0.1,
                min: 0.05,
                max: 6
            },
            rotate: {
                value: 0,
                step: 90
            },
            controls: {
                toolbar: true,
                image: true,
                sound: false,
                fit: 'page',
                disableZoom: false,
                disableMove: false,
                disableRotate: false,
                numPage: 1,
                totalPage: 1,
                filmStrip: false,
                enableOverlay : false
            },
            info: {}
        };
    }

    onDropFirst(e: any) {
        let index = this.widgets.indexOf(e.dragData);
        if (index >= 0)
            this.udpatePosition(this.widgets[index], '1');
    }
    onDropSecond(e: any) {
        let index = this.widgets.indexOf(e.dragData);
        if (index >= 0)
            this.udpatePosition(this.widgets[index], '2');
    }
    onDropThird(e: any) {
        let index = this.widgets.indexOf(e.dragData);
        if (index >= 0)
            this.udpatePosition(this.widgets[index], '3');
    }
    udpatePosition = (widget: IWidget, position: string) => {
        this.widgetPosition.forEach((item) => {
            if (item.position === position)
                item.widget = widget;
        });
        this.removeItem(widget, this.widgets);
        switch (position) {
            case '1':
                this.template1 = this.getTemplate(widget.name) 
                break;
            case '2':
                this.template2 = this.getTemplate(widget.name) 
                break;
            case '3':
                this.template3 = this.getTemplate(widget.name) 
                break;
        }
    };

    removeItem = (item: any, list: Array<any>) => {
        let index = list.map((e) => {
            return e.name
        }).indexOf(item.name);
        list.splice(index, 1);
    }

    getTemplate = (name: string) => {
        switch (name) {
            case 'imageTemplate':
                return this.imageTemplate;
            case 'mapTemplate':
                return this.mapTemplate;
            case 'stockTemplate':
                return this.stockTemplate;

        }
    }

    positionTemplates = () => {
        this.widgets.forEach((item) => {
            if (item.position == 1)
                this.template1 = this.getTemplate(item.name) 
            else if (item.position == 2)
                this.template2 = this.getTemplate(item.name) 
            else if (item.position == 3)
                this.template3 = this.getTemplate(item.name) 
        });
    }

}
