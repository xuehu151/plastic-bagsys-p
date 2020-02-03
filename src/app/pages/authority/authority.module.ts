import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AuthorityRoutingModule, routedComponents } from './authority-routing.module';
import { EditUserModalComponent } from "./edit-user/editUserModal.component";
import { DialogBoxModalComponent } from "./dialog/dialogBoxModal.component";
import { AddUserModalComponent } from "./add-user/addUserModal.component";
import { EditRoleComponent } from "./edit-role/edit-role.component";

const components = [
    EditUserModalComponent,
    AddUserModalComponent,
    DialogBoxModalComponent,
    EditRoleComponent,
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
