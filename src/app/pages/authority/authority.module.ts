import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AuthorityRoutingModule, routedComponents } from './authority-routing.module';
import { EditUserModalComponent } from "./edit-user/editUserModal.component";
import { DialogBoxModalComponent } from "./dialog/dialogBoxModal.component";
import { AddUserModalComponent } from "./add-user/addUserModal.component";

const components = [
    EditUserModalComponent,
    AddUserModalComponent,
    DialogBoxModalComponent,
];

@NgModule({
    imports: [
        ThemeModule,
        AuthorityRoutingModule,
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
export class AuthorityModule {
}
