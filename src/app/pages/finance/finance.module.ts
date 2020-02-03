import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FinanceRoutingModule, routedComponents } from './finance-routing.module';
import { DialogBoxModalComponent } from "./dialog/dialogBoxModal.component";
import { RefuseRemarkComponent } from "./refuseRemark/refuseRemark.component";


const components = [
    DialogBoxModalComponent,
    RefuseRemarkComponent,
];

@NgModule({
    imports: [
        ThemeModule,
        FinanceRoutingModule,
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
export class FinanceModule {
}
