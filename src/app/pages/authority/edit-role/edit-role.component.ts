import { Component, OnInit, Input } from '@angular/core';
import { Toastrervice } from "../../../providers/toastrService";
import { HttpCustormClient } from '../../../providers/HttpClient';
import { ServiceConfig } from '../../../providers/service.config';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-role',
    templateUrl: './edit-role.component.html',
    styleUrls: [ './edit-role.component.scss' ],
})

export class EditRoleComponent implements OnInit {
    @Input() item:any;
    private roleName: string;
    private auth: string;
    private roleId: number = 0;

    constructor ( private http: HttpCustormClient,
                  private activeModal: NgbActiveModal,
                  private router: Router,
                  private toastr: Toastrervice, ) {
    }

    ngOnInit () {
    }

    suer (): any {
        let params = {
            id: this.item.id,
            name:  this.item.name,
            funcIds: []
        };
        if ( !this.item.name ) {
            this.toastr.showToast('danger', '', '输入角色名!');
            return false
        }
        this.http.post(ServiceConfig.EDITROLE, params, ( res ) => {
            if ( res.code === 10000 ) {
                this.toastr.showToast('success', '', '编辑成功!');
                this.activeModal.close('success');
                this.router.navigate([ '/pages/authority/authority-role' ]);
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    cancel() {
        this.activeModal.close();
    }

}
