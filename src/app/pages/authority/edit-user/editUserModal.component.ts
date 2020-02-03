import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toastrervice } from "../../../providers/toastrService";
import { HttpCustormClient } from '../../../providers/HttpClient';
import { ServiceConfig } from '../../../providers/service.config';

@Component({
    selector: 'ngx-modal',
    templateUrl: './editUserModal.component.html',
    styles: [  ]
})

export class EditUserModalComponent implements OnInit {
    @Input() data: any;
    private roleList: Array<any> = [];


    constructor( private activeModal: NgbActiveModal,
                 private http: HttpCustormClient,
                 private toastr: Toastrervice, ) {
    }

    ngOnInit() {
        this.getRoleList();
    }

    cancel() {
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


    sure(): any{
        let telReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        let params = {
            id: this.data.id,
            name: this.data.name,
            phone: this.data.phone,
            roleId: 0
        };
        if ( !this.data.name ) {
            this.toastr.showToast('danger', '', '输入姓名');
            return false
        }
        else if ( !telReg.test(this.data.phone) ) {
            this.toastr.showToast('danger', '', '输入合法手机号');
            return false
        }
        this.http.put(ServiceConfig.EDITUSER, params, ( res ) => {
            if ( res.code === 10000 ) {
                this.toastr.showToast('success', '', '修改成功!');
                this.activeModal.close('success');
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

}
