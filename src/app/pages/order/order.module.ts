import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { OrderRoutingModule, routedComponents } from './order-routing.module';
import { WaybillNoComponent } from './waybill-No/waybill-No.component';

const components = [
    WaybillNoComponent,
];

@NgModule({
    imports: [
        ThemeModule,
        OrderRoutingModule,
    ],
    exports: [],
    providers: [
    ],
    declarations: [
        ...routedComponents,
        ...components,
    ],
    entryComponents: [
        ...components,
    ],
})
export class OrderModule {
}
