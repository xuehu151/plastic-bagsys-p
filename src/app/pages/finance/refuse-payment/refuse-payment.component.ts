import { Component, OnInit } from '@angular/core';
import { Toastrervice } from "../../../providers/toastrService";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DialogBoxModalComponent } from "../dialog/dialogBoxModal.component";
import { RefuseRemarkComponent } from "../refuseRemark/refuseRemark.component";
import { ServiceConfig } from '../../../providers/service.config';
import { HttpCustormClient } from '../../../providers/HttpClient'

@Component({
    selector: 'ngx-refuse-payment',
    styleUrls: [ './refuse-payment.component.scss' ],
    templateUrl: './refuse-payment.component.html',
})

export class RefusePaymentComponent implements OnInit {
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    signatureIdArr: Array<any> = [];
    payeeName: string;
    payeephone: string;
    id: string;
    currPage: number = 1;
    pageSize: number = 15;
    totalCount: number = 0;
    totalPage: number = 0;
    sortArg: number = 2;
    statusArr = [ 1 ];

    constructor ( private modalService: NgbModal,
                  private http: HttpCustormClient,
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
                sortIcon: true,
                isShowInput: true
            },
            {
                title: '操作',
                sortIcon: false,
                isShowInput: true
            }
        ];
        this.searchPayList();
    }

    editRefusePay ( item ): void {
        //拒绝打款理由
        const activeModal = this.modalService.open(RefuseRemarkComponent, {
            size: 'lg',
            windowClass: 'midModal',
            container: 'nb-layout',
            backdrop: 'static',
            keyboard: false
        });
        activeModal.componentInstance.data = item;
        activeModal.result.then(result => {
            if ( result == 'success' ) {
                this.searchPayList();
            }
            else {
                return;
            }
        });
    }

    refusePayMoney ( id ): void {
        //拒绝打款询问
        const activeModal = this.modalService.open(DialogBoxModalComponent, {
            size: 'sm',
            windowClass: 'dialogueBox',
            container: 'nb-layout',
            backdrop: 'static',
            keyboard: false
        });
        activeModal.componentInstance.operating = 'delete';
        activeModal.componentInstance.text = '是否确定已打款?';
        activeModal.result.then(( data ) => {
            if ( data === 'ok' ) {
                this.http.post(ServiceConfig.AUDIT + '?id=' + id + '&status=2', {}, ( res ) => {
                    if ( res.code === 10000) {
                        this.searchPayList();
                    }
                    else {
                        this.toastr.showToast('danger', '', res.message);
                    }
                });
            }
        });
    }

    sortPayList ( ) {
        //排序
        if (this.sortArg === 1){
            this.sortArg = 2;
        }
        else {
            this.sortArg = 1;
        }
        this.searchPayList();
    }

    selectAllPayData ( $event ): void {
        //全选
        this.tableTitle[ 0 ].isChecked = $event.target.checked;
        if ( $event.target.checked ) {
            this.signatureIdArr = [];
            this.tableList.forEach(item => {
                this.signatureIdArr.push(item.id);
            })
        }
        else {
            this.signatureIdArr = [];
        }
    }

    selectPayOneData ( $event ): void {
        //单条筛选
        if ( $event.target.checked ) {
            this.signatureIdArr.push(Number($event.target.id));
        }
        else {
            let idx = this.signatureIdArr.indexOf(Number($event.target.id));
            this.signatureIdArr.splice(idx, 1);
        }
        this.tableTitle[ 0 ].isChecked = this.signatureIdArr.length === this.tableList.length ? true : false;
    }

    searchPayList (): void {
        //搜索
        let params = {
            currPage: this.currPage,
            pageSize: this.pageSize,
            entity: {
                name: this.payeeName,
                phone: this.payeephone,
                status: this.statusArr,
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
                    item.isChecked = false;
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

    exportExcel (): void {
        //导出
        console.info('导出')
    }

    batchRefuse (): void {
        //批量拒绝

    }

    batchPayment (): void {
        //批量打款
    }

    changePage ( $event ) {
        this.currPage = $event;
        this.searchPayList();
    }

}
