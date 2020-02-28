import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toastrervice } from "../../../providers/toastrService";
import { HttpCustormClient } from '../../../providers/HttpClient';
import { ServiceConfig } from '../../../providers/service.config';

@Component({
    selector: 'ngx-modal',
    templateUrl: './addUserModal.component.html',
    styles: [
            `
            .footer-box span {
                color: #c70000;
                margin-right: 20px;
            }
        `
    ]
})

export class AddUserModalComponent implements OnInit {
    username: string;
    userTelephone: string;
    roleId: string = '';
    roleList: Array<any> = [];

    constructor ( private activeModal: NgbActiveModal,
                  private http: HttpCustormClient,
                  private toastr: Toastrervice, ) {
    }

    ngOnInit () {
        this.getRoleList();
    }

    cancel () {
        this.activeModal.close();
    }

    getRoleList (): void {
        this.http.get(ServiceConfig.ROLELIST, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.roleList = res.data;
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    sure (): any {
        let telReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        let params = {
            name: this.username,
            phone: this.userTelephone,
            roleId: this.roleId
        };
        if ( !this.username ) {
            this.toastr.showToast('danger', '', '输入姓名');
            return false
        }
        else if ( !telReg.test(this.userTelephone) ) {
            this.toastr.showToast('danger', '', '输入合法手机号');
            return false
        }
        this.http.post(ServiceConfig.ADDUSER, params, ( res ) => {
            if ( res.code === 10000 ) {
                this.activeModal.close('success');
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

}
