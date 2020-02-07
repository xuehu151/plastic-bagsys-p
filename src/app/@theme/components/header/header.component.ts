import { Component, Input, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { ConfigService } from "../../../providers/configService";
import { Router } from "@angular/router";
import { HttpCustormClient } from '../../../providers/HttpClient';
import { ServiceConfig } from '../../../providers/service.config';
import { Toastrervice } from "../../../providers/toastrService";

@Component ({
    selector: 'ngx-header',
    styleUrls: [ './header.component.scss' ],
    templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit {
    @Input () position = 'normal';
    configInfo: Object;
    userInfo: any;

    constructor ( private configService: ConfigService,
                  private router: Router,
                  private http: HttpCustormClient,
                  private sidebarService: NbSidebarService,
                  private toastr: Toastrervice,) {
    }

    ngOnInit () {
        this.configInfo = this.configService.getTitleInfo;
        this.getUserInfo();
    }

    toggleSidebar (): boolean {
        this.sidebarService.toggle (true, 'menu-sidebar');
        return false;
    }

    getUserInfo(): void{
        this.http.get(ServiceConfig.GETUSERINFO, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.userInfo = res.data;
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    logout(): void{
        this.router.navigate(['/customAuth/login']);
        localStorage.clear()
    }
}
