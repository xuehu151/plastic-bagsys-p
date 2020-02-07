import { Component, OnInit } from '@angular/core';
import { Toastrervice } from "../../../providers/toastrService";
import { HttpCustormClient } from '../../../providers/HttpClient';
import { ServiceConfig } from '../../../providers/service.config';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-role',
    templateUrl: './add-role.component.html',
    styleUrls: [ './add-role.component.scss' ],
})

export class AddRoleComponent implements OnInit {
    roleName: string;
    auth: boolean;
    roleId: number = 0;

    constructor ( private http: HttpCustormClient,
                  private router: Router,
                  private toastr: Toastrervice, ) {
    }

    ngOnInit () {
    }

    addRole (): any {
        let params = {
            name: this.roleName,
            funcIds: []
        };
        if ( !this.roleName ) {
            this.toastr.showToast('danger', '', '输入角色名!');
            return false
        }
        this.http.post(ServiceConfig.ADDROLE, params, ( res ) => {
            if ( res.code === 10000 ) {
                this.toastr.showToast('success', '', '添加成功!');
                this.router.navigate([ '/pages/authority/authority-role' ]);
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

}
