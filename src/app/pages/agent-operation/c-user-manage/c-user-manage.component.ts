import { Component, OnInit } from '@angular/core';
import { Toastrervice } from "../../../providers/toastrService";
import { HttpCustormClient } from '../../../providers/HttpClient';
import { ServiceConfig } from '../../../providers/service.config';

@Component({
    selector: 'ngx-c-user-manage',
    styleUrls: [ './c-user-manage.component.scss' ],
    templateUrl: './c-user-manage.component.html',
})

export class CUserManageComponent implements OnInit {
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    memNum: string;
    nickname: string;
    currPage: number = 1;
    pageSize: number = 10;
    totalCount: number = 0;
    totalPage: number = 0;
    headImg: string = '../../../../assets/images/user.svg';

    constructor ( private http: HttpCustormClient,
                  private toastr: Toastrervice, ) {
    }

    ngOnInit () {
        this.tableTitle = [
            {
                title: '',
                isSelect: true,
                isChecked: false,
                isShowInput: false,
                isOperation: true
            },
            {
                title: '微信OpenID',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '微信昵称',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '头像',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '用户ID',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '购袋次数',
                sortIcon: false,
                isShowInput: true
            }
        ];
        this.searchCUserList();
    }

    searchCUserList (): void {
        let params = {
            currPage: this.currPage,
            pageSize: this.pageSize,
            entity: {
                memNum: this.memNum,
                nickname: this.nickname
            }
        };
        this.http.post(ServiceConfig.MEMBER, params, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.tableList = res.data.records;
                this.totalCount = res.data.totalCount;
                this.totalPage = Math.ceil(res.data.totalCount / this.pageSize);
                this.tableList.forEach(item => {
                    item.isShowInput = false;
                    item.isSelect = true;
                })
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    exportCUserExcel (): void {
        //导出
        let params = {
            memNum: this.memNum || '',
            nickname: this.nickname || ''
        };
        this.http.exportExcel(ServiceConfig.EXPORTMEMBER, 'C端会员列表', params)
    }

    changePage ( $event ) {
        this.currPage = $event;
        this.searchCUserList();
    }

}
