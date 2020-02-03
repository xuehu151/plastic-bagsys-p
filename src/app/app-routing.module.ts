import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomAuthComponent } from './pages/customAuth/customAuth.component';

const RootRoutes: Routes = [
    { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
    {
        path: 'customAuth',
        component: CustomAuthComponent,
        children: [
            {
                path: '',
                loadChildren: './pages/customAuth/customAuth.module#CustomAuthModule',
            },
            {
                path: 'login',
                loadChildren: './pages/customAuth/customAuth.module#CustomAuthModule',
            },
        ],
    },
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: '**', redirectTo: 'pages' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(RootRoutes, { useHash: true })
    ],
    exports: [RouterModule],
})

export class AppRoutingModule {
}
