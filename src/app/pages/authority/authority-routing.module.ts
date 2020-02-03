import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorityComponent } from './authority.component';
import { AuthorityRoleComponent } from "./authority-role/authority-role.component";
import { AuthorityUserComponent } from "./authority-user/authority-user.component";
import { AddRoleComponent } from "./add-role/add-role.component";

const routes: Routes = [ {
    path: '',
    component: AuthorityComponent,
    children: [
        {
            path: 'authority-role',
            component: AuthorityRoleComponent,
        },
        {
            path: 'authority-user',
            component: AuthorityUserComponent,
        },
        {
            path: 'add-role',
            component: AddRoleComponent,
        }
    ],
} ];

@NgModule ({
    imports: [ RouterModule.forChild (routes) ],
    exports: [ RouterModule ],
})
export class AuthorityRoutingModule {
}

export const routedComponents = [
    AuthorityComponent,
    AuthorityRoleComponent,
    AuthorityUserComponent,
    AddRoleComponent,
];
