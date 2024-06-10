import { NgModule } from '@angular/core';
import { materialModules } from './app.module';


@NgModule({
    declarations: [],
    imports: [
        ...materialModules
    ],
    exports: [
        ...materialModules
    ]
})
export class MaterialModule {
}
