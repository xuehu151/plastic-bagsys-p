import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        {
            path: 'authority',
            loadChildren: './authority/authority.module#AuthorityModule',
        },
        {
            path: 'agent-operation',
            loadChildren: './agent-operation/agent-operation.module#AgentOperationModule',
        },
        {
            path: 'finance',
            loadChildren: './finance/finance.module#FinanceModule',
        },
        {
            path: 'order',
            loadChildren: './order/order.module#OrderModule',
        },
        {
            path: '',
            redirectTo: 'authority/authority-user',
        },
        {
            path: '**',
            component: NotFoundComponent,
        }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
