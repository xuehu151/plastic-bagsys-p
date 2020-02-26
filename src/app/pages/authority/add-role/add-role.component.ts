import { Component, OnInit } from '@angular/core';
import { Toastrervice } from "../../../providers/toastrService";
import { HttpCustormClient } from '../../../providers/HttpClient';
import { ServiceConfig } from '../../../providers/service.config';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ngx-role',
    templateUrl: './add-role.component.html',
    styleUrls: [ './add-role.component.scss' ],
})

export class AddRoleComponent implements OnInit {
    roleArray: Array<any> = [];
    roleList: Array<any> = [];
    signatureIdArr: Array<any> = [];
    roleName: string;
    auth: boolean;
    requestUrl: string = '';
    cancelBtn: boolean = false;
    roleId: string;

    constructor ( private http: HttpCustormClient,
                  private activeRoute: ActivatedRoute,
                  private router: Router,
                  private toastr: Toastrervice, ) {
    }

    ngOnInit () {
        this.roleArray = [
            {
                name: '权限管理',
                resourceKey: '1',
                isShow: false,
                children: [
                    {
                        name: '角色',
                        resourceKey: '1001',
                        isShow: false,
                    },
                    {
                        name: '用户',
                        resourceKey: '1002',
                        isShow: false,
                    },
                ]
            },
            {
                name: '财务管理',
                resourceKey: '2',
                isShow: false,
                children: [
                    {
                        name: '打款',
                        resourceKey: '2001',
                        isShow: false,
                    },
                    {
                        name: '打款历史',
                        resourceKey: '2002',
                        isShow: false,
                    },
                ]
            },
            {
                name: '运营管理',
                resourceKey: '3',
                isShow: false,
                children: [
                    {
                        name: '代理商管理',
                        resourceKey: '3001',
                        isShow: false,
                    },
                    {
                        name: '设备管理',
                        resourceKey: '3002',
                        isShow: false,
                    },
                    {
                        name: 'C端用户管理',
                        resourceKey: '3003',
                        isShow: false,
                    },
                    {
                        name: '订单',
                        resourceKey: '3004',
                        isShow: false,
                    },
                ]
            },
            {
                name: '采购订单管理',
                resourceKey: '4',
                isShow: false,
                children: [
                    {
                        name: '订单信息',
                        resourceKey: '4001',
                        isShow: false,
                    },
                    {
                        name: '订单历史',
                        resourceKey: '4002',
                        isShow: false,
                    }
                ]
            },
        ];
        this.activeRoute.queryParams.subscribe(params => {
            if ( Object.keys(params).length === 0 ) {
                this.requestUrl = 'add';
                this.cancelBtn = false;
            }
            else {
                this.requestUrl = 'edit';
                this.cancelBtn = true;
                let obj = JSON.parse(params.data);
                this.roleName = obj.name;
                this.roleId = obj.id;
            }
        });
    }

    selectRole($event, item): any{
        item.isShow = $event.target.checked;
        if ( $event.target.checked ) {
            this.signatureIdArr = [];
            for (let list of item.children){
                this.signatureIdArr.push(list.resourceKey);
            }
        }
        else {
            this.signatureIdArr = [];
        }
        console.info( this.signatureIdArr )
    }

    selectRoleItem($event, roleCh, role): void{
        // roleCh.isShow = $event.target.checked;
        //单条筛选
        if ( $event.target.checked ) {
            this.signatureIdArr.push(Number($event.target.resourceKey));
        }
        else {
            let idx = this.signatureIdArr.indexOf(Number($event.target.resourceKey));
            this.signatureIdArr.splice(idx, 1);
        }
        role.isShow = this.signatureIdArr.length === this.roleArray.length ? true : false;
    }

    addRole (): any {
        let params = {
            id: this.roleId,
            name: this.roleName,
            funcIds: []
        };
        if ( !this.roleName ) {
            this.toastr.showToast('danger', '', '输入角色名!');
            return false
        }
        this.http.post(ServiceConfig.CHANGEROLE + this.requestUrl, params, ( res ) => {
            if ( res.code === 10000 ) {
                this.toastr.showToast('success', '', res.message);
                this.router.navigate([ '/pages/authority/authority-role' ]);
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    cancel(): void{
        this.router.navigate([ '/pages/authority/authority-role' ]);
    }

}
