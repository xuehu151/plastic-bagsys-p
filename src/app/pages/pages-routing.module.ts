import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
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
            path: 'dashboard',
            component: ECommerceComponent,
        },
        {
            path: 'iot-dashboard',
            component: DashboardComponent,
        },
        {
            path: 'ui-features',
            loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
        },
        {
            path: 'modal-overlays',
            loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
        },
        {
            path: 'extra-components',
            loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',
        },
        {
            path: 'bootstrap',
            loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
        },
        {
            path: 'maps',
            loadChildren: './maps/maps.module#MapsModule',
        },
        {
            path: 'charts',
            loadChildren: './charts/charts.module#ChartsModule',
        },
        {
            path: 'editors',
            loadChildren: './editors/editors.module#EditorsModule',
        },
        {
            path: 'forms',
            loadChildren: './forms/forms.module#FormsModule',
        },
        {
            path: 'tables',
            loadChildren: './tables/tables.module#TablesModule',
        },
        {
            path: 'miscellaneous',
            loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
        },
        {
            path: '',
            redirectTo: 'authority/authority-user',
        },
        // {
        //     path: '',
        //     redirectTo: 'dashboard',
        // },
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
