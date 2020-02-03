import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanceComponent } from "./finance.component";
import { MakeMoneyHistoryComponent } from "./make-money-history/make-money-history.component";
import { RefusePaymentComponent } from "./refuse-payment/refuse-payment.component";

const routes: Routes = [ {
    path: '',
    component: FinanceComponent,
    children: [
        {
            path: 'refuse-payment',
            component: RefusePaymentComponent,
        },
        {
            path: 'make-money-history',
            component: MakeMoneyHistoryComponent,
        },
    ],
} ];

@NgModule ({
    imports: [ RouterModule.forChild (routes) ],
    exports: [ RouterModule ],
})
export class FinanceRoutingModule {
}

export const routedComponents = [
    FinanceComponent,
    MakeMoneyHistoryComponent,
    RefusePaymentComponent,
];
