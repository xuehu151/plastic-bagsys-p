import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
    selector: 'ngx-sample-layout',
    styleUrls: ['./sample.layout.scss'],
    template: `
        <nb-layout windowMode>
            <nb-layout-header fixed>
                <ngx-header></ngx-header>
            </nb-layout-header>

            <nb-sidebar class="menu-sidebar"
                        tag="menu-sidebar"
                        responsive>
                <ng-content select="nb-menu"></ng-content>
            </nb-sidebar>

            <nb-layout-column class="main-content">
                <ng-content select="router-outlet"></ng-content>
            </nb-layout-column>

            <!--<nb-layout-column start class="small" *ngIf="layout.id === 'two-column' || layout.id === 'three-column'">-->
                <!--<nb-menu [items]="subMenu"></nb-menu>-->
            <!--</nb-layout-column>-->

            <!--<nb-layout-column class="small" *ngIf="layout.id === 'three-column'">-->
                <!--<nb-menu [items]="subMenu"></nb-menu>-->
            <!--</nb-layout-column>-->

            <!--<nb-layout-footer fixed>-->
                <!--<ngx-footer></ngx-footer>-->
            <!--</nb-layout-footer>-->

            <!--<nb-sidebar class="settings-sidebar"-->
                        <!--tag="settings-sidebar"-->
                        <!--state="collapsed"-->
                        <!--fixed-->
                        <!--[end]="sidebar.id !== 'end'">-->
                <!--<ngx-theme-settings></ngx-theme-settings>-->
            <!--</nb-sidebar>-->
        </nb-layout>
    `,
})

export class SampleLayoutComponent implements OnDestroy, OnInit {
    layout: any = {};
    sidebar: any = {};

    constructor ( private themeService: NbThemeService,) {
        this.themeService.changeTheme('default');
    }

    ngOnInit(): void{
    }

    ngOnDestroy () {
    }
}
