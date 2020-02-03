import { NgModule } from '@angular/core';
import { CustomAuthRoutingModule, routedComponents } from './customAuth-routing.module';
import { ThemeModule } from '../../@theme/theme.module';

const components = [];

@NgModule({
    imports: [
        ThemeModule,
        CustomAuthRoutingModule,
    ],
    exports: [],
    providers: [
    ],
    declarations: [
        ...routedComponents,
        ...components,
    ],
    entryComponents: [],
})
export class CustomAuthModule {
}
