import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AgentOperationRoutingModule, routedComponents } from './agent-operation-routing.module';
import { AddAgentsComponent } from "./new-agents/new-agents.component";
import { AddDeviceComponent } from "./add-deviced/add-device.component";
import { EditAgentComponent } from "./edit-agent/edit-agent.component";
import { EditDeviceComponent } from "./edit-deviced/edit-device.component";

const components = [
    AddAgentsComponent,
    AddDeviceComponent,
    EditDeviceComponent,
    EditAgentComponent,
];

@NgModule({
    imports: [
        ThemeModule,
        AgentOperationRoutingModule,
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
export class AgentOperationModule {
}
