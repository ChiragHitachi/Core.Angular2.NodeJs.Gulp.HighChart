import { Component, ComponentFactory, NgModule, Input, Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JitCompiler } from '@angular/compiler';
import { ChartModule } from 'angular2-highcharts';
import { FormatDate } from "../../pipes/formatDate";
import { CommonModule } from '@angular/common';

export interface IHaveDynamicData {
    entity: any;
}

@Injectable()
export class DynamicBuilder {
    constructor(protected compiler: JitCompiler) {

    }
    private _cacheOfFactories: { [templateKey: string]: ComponentFactory<IHaveDynamicData> } = {};

    public createComponentFactory(template: string)
        : Promise<ComponentFactory<IHaveDynamicData>> {

        let factory = this._cacheOfFactories[template];

        if (factory) {
            console.log("Module and Type are returned from cache")

            return new Promise((resolve) => {
                resolve(factory);
            });
        }

        // unknown template ... let's create a Type for it
        let type = this.createNewComponent(template);
        let module = this.createComponentModule(type);

        return new Promise((resolve) => {
            this.compiler
                .compileModuleAndAllComponentsAsync(module)
                .then((moduleWithFactories) => {
                    for (var i = 0; i < moduleWithFactories.componentFactories.length; i++) {
                        if (moduleWithFactories.componentFactories[i].componentType == type) {
                            factory = moduleWithFactories.componentFactories[i];
                            break;
                        }
                    }
                    //factory = _.find(moduleWithFactories.componentFactories, { componentType: type });

                    this._cacheOfFactories[template] = factory;

                    resolve(factory);
                });
        });
    }

    protected createNewComponent(tmpl: string) {

        @Component({
            selector: 'dynamic-component',
            template: tmpl,
        })
        class CustomDynamicComponent implements IHaveDynamicData {
            @Input() public entity: any;
        };
        // a component for this particular template
        return CustomDynamicComponent;
    }
    protected createComponentModule(componentType: any) {
        @NgModule({
            imports: [
                ChartModule, 
                CommonModule 
            ],
            declarations: [
                componentType,
                FormatDate,
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA]
        })
        class RuntimeComponentModule {
        }
        // a module for just this Type
        return RuntimeComponentModule;
    }
}
