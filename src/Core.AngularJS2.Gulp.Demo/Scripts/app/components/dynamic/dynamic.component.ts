import { Component, ComponentRef, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentFactory, ReflectiveInjector } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { IHaveDynamicData, DynamicBuilder } from '../dynamic/dynamicBuilder';
import { Http, Response } from "@angular/http";
import { FormatDate } from "../../pipes/formatDate";
import { Observable } from "rxjs/Observable";
import { Subscriber } from "rxjs/Subscriber";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ChartModule } from 'angular2-highcharts';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'dynamic-component',
    templateUrl: '/view/components/dynamic/dynamic.component.html',
    //providers: [DynamicBuilder]
})
export class DynamicComponent {
    @ViewChild('dynamicChild', { read: ViewContainerRef })
    private dynamicComponentTarget: ViewContainerRef;
    private timer = timer(2000, 1000);

    protected componentRef: ComponentRef<IHaveDynamicData>;
    protected wasViewInitialized = false;
    props = {
        code: 'Angular 2 Dynamic Componenent',
        description: 'This generated the component dynamically with the given HTML string and Json object.',
        obs: this.timer,
        date: null,
        chartOptions: {}
    };
    constructor(private typeBuilder: DynamicBuilder, private componentResolver: ComponentFactoryResolver, private http: Http) {
        this.props.date = new Observable<string>((observer: Subscriber<string>) => {
            setInterval(() => observer.next(new Date().toString()), 1000);
        });
    };

    currentComponent: any = null;
    public ngOnInit() {
        // We can destroy the old component by calling destroy
        if (this.componentRef) {
            this.componentRef.destroy();
        }

        let template = `
      <div class="row"><div class="col-md-2">Title:       </div><div class="col-md-4"><b>{{entity.code}}</b></div></div><br>
      <div class="row"><div class="col-md-2">Description: </div><div class="col-md-4"><b>{{entity.description}}</b></div></div><br>
      <div class="row"><div class="col-md-2">DateTime:    </div><div class="col-md-4"><b>{{entity.date | async | formatDate}}</b></div></div><br>
      <hr />
      <chart type="StockChart" [options]="entity.chartOptions"></chart>
    `;

        this.http.get('https://cdn.rawgit.com/gevgeny/angular2-highcharts/99c6324d/examples/aapl.json').subscribe(res => {
            this.props.chartOptions = {
                title: { text: 'Hitachi Stock Price' },
                series: [{
                    name: 'HCL',
                    data: res.json(),
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            };
            this.typeBuilder
                .createComponentFactory(template)
                .then((factory: ComponentFactory<IHaveDynamicData>) => {
                    // Target will instantiate and inject component (we'll keep reference to it)
                    this.componentRef = this
                        .dynamicComponentTarget
                        .createComponent(factory);

                    // let's inject @Inputs to component instance
                    let component = this.componentRef.instance;

                    component.entity = this.props;
                });
        });
    }
}