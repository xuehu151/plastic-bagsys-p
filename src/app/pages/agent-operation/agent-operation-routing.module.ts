import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentOperationComponent } from "./agent-operation.component";
import { DeviceManageComponent } from "./device-manage/device-manage.component";
import { CUserManageComponent } from "./c-user-manage/c-user-manage.component";
import { DeviceOrderComponent } from "./device-order/device-order.component";
import { ShopComponent } from "./shop-home/shop-home.component";
import { AgentComponent } from "./agent/agent.component";


const routes: Routes = [ {
    path: '',
    component: AgentOperationComponent,
    children: [
        {
            path: 'agent',
            component: AgentComponent,
        },
        {
            path: 'device-manage',
            component: DeviceManageComponent,
        },
        {
            path: 'c-user-manage',
            component: CUserManageComponent,
        },
        {
            path: 'device-order',
            component: DeviceOrderComponent,
        },
        {
            path: 'shop-home',
            component: ShopComponent,
        }
    ],
} ];

@NgModule ({
    imports: [ RouterModule.forChild (routes) ],
    exports: [ RouterModule ],
})
export class AgentOperationRoutingModule {
}

export const routedComponents = [
    AgentOperationComponent,
    DeviceManageComponent,
    CUserManageComponent,
    DeviceOrderComponent,
    AgentComponent,
    ShopComponent,
];
