import { Component, OnInit } from '@angular/core';
import { Toastrervice } from "../../../providers/toastrService";
import { HttpCustormClient } from '../../../providers/HttpClient';
import { ServiceConfig } from '../../../providers/service.config';
import { Router } from '@angular/router';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'ngx-authority-role',
    styleUrls: [ './authority-role.component.scss' ],
    templateUrl: './authority-role.component.html',
})

export class AuthorityRoleComponent implements OnInit {
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    // private roleName: string;
    auth: string;
    currPage: number = 1;
    pageSize: number = 15;
    totalCount: number = 0;
    totalPage: number = 0;

    constructor ( private http: HttpCustormClient,
                  private modalService: NgbModal,
                  private router: Router,
                  private toastr: Toastrervice, ) {
    }

    ngOnInit () {
        this.getRoleList();
        this.tableTitle = [
            {
                title: '',
                isSelect: true,
                isChecked: false,
                isShowInput: false,
                isOperation: true
            },
            {
                title: '角色名称',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '权限序列',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '操作',
                sortIcon: false,
                isShowInput: true
            }
        ];
    }

    newRole (): any {
        this.router.navigate([ '/pages/authority/add-role' ]);
    }

    getRoleList (): void {
        let params = {
            currPage: this.currPage,
            entity: {
                name: "",
            },
            pageSize: this.pageSize
        };

        this.http.post(ServiceConfig.ROLE, params, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.tableList = res.data.records;
                this.totalCount = res.data.totalCount;
                this.totalPage = Math.ceil(res.data.totalCount / this.pageSize);
                this.tableList.forEach(item => {
                    item.isShowInput = false;
                    item.isSelect = true;
                    item.editButtonText = '修改';
                    item.isOperation = true;
                    item.name = item.name ? item.name : '- - -';
                })
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    startEdit ( item ): void {
        this.router.navigate([ '/pages/authority/add-role' ],
            {
                queryParams: {
                    data: JSON.stringify(item)
                }
            });
    }

    changePage ( $event ) {
        this.currPage = $event;
        this.getRoleList();
    }

}
