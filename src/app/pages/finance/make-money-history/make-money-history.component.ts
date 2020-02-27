import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Toastrervice } from "../../../providers/toastrService";
import { HttpCustormClient } from '../../../providers/HttpClient'
import { ServiceConfig } from '../../../providers/service.config';

@Component ({
    selector: 'ngx-make-money-history',
    styleUrls: [ './make-money-history.component.scss', '../refuse-payment/refuse-payment.component.scss' ],
    templateUrl: './make-money-history.component.html',
})

export class MakeMoneyHistoryComponent implements OnInit {
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    currPage: number = 1;
    pageSize: number = 15;
    totalCount: number = 0;
    totalPage: number = 0;
    payeeName: string;
    payeephone: string;
    sortArg: number = 2;

    constructor ( private router: Router,
                  private http: HttpCustormClient,
                  private toastr: Toastrervice, ) {
    }

    ngOnInit () {
        this.tableTitle = [
            {
                title: '',
                isSelect: false,
                isChecked: false,
                isShowInput: false
            },
            {
                title: '代理商ID',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '开户人',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '手机号',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '身份证号',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '开户行',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '银行卡号',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '申请金额',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '申请时间',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '操作人',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '操作时间',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '操作结果',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '拒绝理由',
                sortIcon: false,
                isShowInput: true
            }
        ];
        this.searchPayHistoryList();
    }

    searchPayHistoryList (): void {
        //搜索
        let params = {
            currPage: this.currPage,
            pageSize: this.pageSize,
            entity: {
                name: this.payeeName,
                phone: this.payeephone,
                status: [ 2, 3 ],
                timeSort: this.sortArg
            }
        };
        this.http.post(ServiceConfig.WITHDRAW, params, ( res ) => {
            console.info(res);
            if ( res.code === 10000 ) {
                this.tableList = res.data.records;
                this.totalCount = res.data.totalCount;
                this.totalPage = Math.ceil(res.data.totalCount / this.pageSize);
                this.tableList.forEach(item => {
                    item.isShowInput = false;
                    item.isSelect = true;
                    item.isOperation = true;
                    item.refuseText = '拒绝';
                    item.alreadyPaidText = '已打款';
                })
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    exportPayHistoryExcel(): void{
        //导出
        let params = {
            name: this.payeeName || '',
            phone: this.payeephone || '',
            status: [ 2, 3 ],
            timeSort: this.sortArg
        };
        this.http.exportExcel(ServiceConfig.EXPORTHISTORYWITHDRAWRECORD, '打款历史列表', params)
    }

}
