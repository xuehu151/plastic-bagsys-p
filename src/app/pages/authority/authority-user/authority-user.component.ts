import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditUserModalComponent } from "../edit-user/editUserModal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DialogBoxModalComponent } from "../dialog/dialogBoxModal.component";
import { AddUserModalComponent } from "../add-user/addUserModal.component";
import { Toastrervice } from "../../../providers/toastrService";
import { HttpCustormClient } from '../../../providers/HttpClient';
import { ServiceConfig } from '../../../providers/service.config';

@Component({
    selector: 'ngx-authority-user',
    styleUrls: [ './authority-user.component.scss' ],
    templateUrl: './authority-user.component.html',
})

export class AuthorityUserComponent implements OnInit {
    @ViewChild('datepicker') datepicker: ElementRef;
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    signatureIdArr: Array<any> = [];
    currPage: number = 1;
    pageSize: number = 15;
    totalCount: number = 0;
    totalPage: number = 0;
    username: string;
    userTelephone: string;
    roleId: string = '';
    roleList: Array<any> = [];

    constructor ( private modalService: NgbModal,
                  private http: HttpCustormClient,
                  private toastr: Toastrervice, ) {
    }

    ngOnInit () {
        this.searchUser();
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
                title: '用户姓名',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '用户手机号',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '当前角色',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '创建时间',
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

    getRoleList(): void{
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

    searchUser (): void {
        let params = {
            currPage: this.currPage,
            entity: {
                name: this.username,
                phone: this.userTelephone,
                roleId: this.roleId
            },
            pageSize: this.pageSize
        };
        this.http.post(ServiceConfig.USER, params, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.totalCount = res.data.totalCount;
                this.totalPage = Math.ceil(res.data.totalCount / this.pageSize);
                this.tableList = res.data.records;
                this.tableList.forEach( item => {
                    item.isShowInput = false;
                    item.isSelect = true;
                    item.editBtn = true;
                    item.disableBtn = true;
                    if( item.type !== '1' ){
                        item.disableBtn = false;
                    }
                    item.editButtonText = '修改';
                    item.operateBtn = false;
                    item.operateButtonText = '删除';
                    item.isOperation = true;
                    item.name = item.name?item.name : '- - -';
                })
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    editItem ( item ): void {
        const activeModal = this.modalService.open(EditUserModalComponent, {
            size: 'lg',
            windowClass: 'midModal',
            container: 'nb-layout',
            backdrop: 'static',
            keyboard: false
        });
        activeModal.componentInstance.data = item;
        activeModal.result.then(result => {
            if ( result == 'success' ) {
                this.searchUser();
            }
            else {
                return;
            }
        });
    }

    deleteItem ( item ): void {
        const activeModal = this.modalService.open(DialogBoxModalComponent, {
            size: 'sm',
            windowClass: 'dialogueBox',
            container: 'nb-layout',
            backdrop: 'static',
            keyboard: false
        });

        activeModal.componentInstance.operating = 'delete';
        activeModal.componentInstance.text = '是否确定删除?';
        activeModal.result.then(( data ) => {
            if ( data != 'ok' ) {
                // this.http.delete(ServiceConfig.MAJOR_TASK + '/' + id, {}, ( res ) => {
                //     if ( res && res.status_code == 200 ) {
                //         this.toast.showToastr('success', '删除成功');
                //         this.getTaskList();
                //     }
                //     else {
                //         this.toast.showToastr('error', res.message);
                //     }
                // });
            }
        });
    }

    addUser (): void {
        const activeModal = this.modalService.open(AddUserModalComponent, {
            size: 'lg',
            windowClass: 'midModal',
            container: 'nb-layout',
            backdrop: 'static',
            keyboard: false
        });
        activeModal.result.then(result => {
            if ( result == 'success' ) {
                this.searchUser();
            }
            else {
                return;
            }
        });
    }

    changePage ( $event ) {
        this.currPage = $event;
        this.searchUser();
    }

}
