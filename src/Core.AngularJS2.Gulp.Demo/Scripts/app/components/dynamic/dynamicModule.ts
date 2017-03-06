import { DynamicBuilder  } from "../dynamic/dynamicBuilder";
import { NgModule } from "@angular/core";

export class DynamicModule {

    static forRoot() {
        return {
            ngModule: DynamicModule,
            providers: [ // singletons accross the whole app
                DynamicBuilder
            ],
        };
    }
}