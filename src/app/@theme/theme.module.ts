import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";

import {
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    NbThemeModule,
    NbPopoverModule,
    NbCalendarModule,
    NbDatepickerModule,
    NbToastrModule,
    NbSpinnerModule,
    NbSidebarModule,
} from '@nebular/theme';

import {
    FooterComponent,
    HeaderComponent,
} from './components';
import {
    RolePipe,
    LevelPipe,
    RunStatusPipe,
    FloatNumberPipe,
    OrderStatusPipe,
    BusinessStatusPipe,
    PurchaseStatusPipe,
    StandardPipe,
} from './pipes';
import { SampleLayoutComponent } from './layouts';
import { TableComponent } from "./components/table-component/table.component";
import { PageComponent } from "./components/page/page.component";

const BASE_MODULES = [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
];

const NB_MODULES = [
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    NbPopoverModule,
    NgbModule,
    NbCalendarModule,
    NbToastrModule,
    NbDatepickerModule,
    NbSpinnerModule,
    NbSidebarModule,
];

const COMPONENTS = [
    SampleLayoutComponent,
    HeaderComponent,
    FooterComponent,
    TableComponent,
    PageComponent,
];

const ENTRY_COMPONENTS = [
];

const PIPES = [
    RolePipe,
    LevelPipe,
    RunStatusPipe,
    FloatNumberPipe,
    OrderStatusPipe,
    BusinessStatusPipe,
    PurchaseStatusPipe,
    StandardPipe,
];

const NB_THEME_PROVIDERS = [
    ...NbThemeModule.forRoot(
        {
            name: 'cosmic',
        },
    ).providers,
    ...NbSidebarModule.forRoot().providers,
    ...NbMenuModule.forRoot().providers,
    ...NbDatepickerModule.forRoot().providers,
    ...NbToastrModule.forRoot().providers,
];

@NgModule({
    imports: [...BASE_MODULES, ...NB_MODULES],
    exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
    declarations: [...COMPONENTS, ...PIPES],
    entryComponents: [...ENTRY_COMPONENTS],
})
export class ThemeModule {
    static forRoot (): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: ThemeModule,
            providers: [...NB_THEME_PROVIDERS],
        };
    }
}
