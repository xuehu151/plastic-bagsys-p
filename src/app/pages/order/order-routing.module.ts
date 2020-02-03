import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from "./order.component";
import { OrderListComponent } from "./order-list/order-list.component";
import { OrderListHistoryComponent } from "./order-list-history/order-list-history.component";

const routes: Routes = [ {
    path: '',
    component: OrderComponent,
    children: [
        {
            path: 'order-list',
            component: OrderListComponent,
        },
        {
            path: 'order-list-history',
            component: OrderListHistoryComponent,
        }
    ],
} ];

@NgModule ({
    imports: [ RouterModule.forChild (routes) ],
    exports: [ RouterModule ],
})
export class OrderRoutingModule {
}

export const routedComponents = [
    OrderComponent,
    OrderListComponent,
    OrderListHistoryComponent,
];
