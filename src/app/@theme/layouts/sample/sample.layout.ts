import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, withLatestFrom, takeWhile } from 'rxjs/operators';
import {
    NbMediaBreakpoint,
    NbMediaBreakpointsService,
    NbMenuItem,
    NbMenuService,
    NbSidebarService,
    NbThemeService,
} from '@nebular/theme';

@Component({
    selector: 'ngx-sample-layout',
    styleUrls: ['./sample.layout.scss'],
    template: `
        <nb-layout [center]="layout.id === 'center-column'" windowMode>
            <nb-layout-header fixed>
                <ngx-header [position]="sidebar.id === 'start' ? 'normal': 'inverse'"></ngx-header>
            </nb-layout-header>

            <nb-sidebar class="menu-sidebar"
                        tag="menu-sidebar"
                        responsive
                        [end]="sidebar.id === 'end'">
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
    private alive = true;
    currentTheme: string;

    constructor ( private themeService: NbThemeService,
                  protected menuService: NbMenuService,
                  protected bpService: NbMediaBreakpointsService,
                  protected sidebarService: NbSidebarService ) {
        this.themeService.changeTheme('default');


        const isBp = this.bpService.getByName('is');
        this.menuService.onItemSelect()
            .pipe(
                takeWhile(() => this.alive),
                withLatestFrom(this.themeService.onMediaQueryChange()),
                delay(20),
            )
            .subscribe(( [item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]] ) => {

                if ( bpTo.width <= isBp.width ) {
                    this.sidebarService.collapse('menu-sidebar');
                }
            });

        this.themeService.getJsTheme()
            .pipe(takeWhile(() => this.alive))
            .subscribe(theme => {
                this.currentTheme = theme.name;
            });
    }

    ngOnInit(): void{
    }

    ngOnDestroy () {
        this.alive = false;
    }
}
