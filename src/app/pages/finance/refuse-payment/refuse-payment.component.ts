import { Component, OnInit } from '@angular/core';
import { Toastrervice } from "../../../providers/toastrService";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DialogBoxModalComponent } from "../dialog/dialogBoxModal.component";
import { RefuseRemarkComponent } from "../refuseRemark/refuseRemark.component";

@Component({
    selector: 'ngx-refuse-payment',
    styleUrls: [ './refuse-payment.component.scss' ],
    templateUrl: './refuse-payment.component.html',
})

export class RefusePaymentComponent implements OnInit {
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    signatureIdArr: Array<any> = [];
    private agentName: string;
    private agentTelephone: string;
    id: string;


    constructor ( private modalService: NgbModal,
                  private toastr: Toastrervice, ) {
    }

    ngOnInit () {
        this.tableTitle = [
            {
                title: '',
                isSelect: true,
                isChecked: false,
                isShowInput: true,
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
                sortIcon: true,
                isShowInput: true
            },
            {
                title: '操作',
                sortIcon: false,
                isShowInput: true
            }
        ];
        this.tableList = [
            {
                sid: 1,
                name: '李强',
                age: 30,
                address: '西安市',
                isShowInput: true,
                creatTime: '2020-01-19 10:02:56',
                isSelect: true,
                editButtonText: '已打款',
                deleteButtonText: '拒绝',
                isOperation: true
            },
            {
                sid: 2,
                name: '雪狐',
                age: 10,
                address: '陕西省西安市',
                isShowInput: true,
                creatTime: '2020-01-19 10:02:56',
                isSelect: true,
                editButtonText: '已打款',
                deleteButtonText: '拒绝',
                isOperation: true
            },
            {
                sid: 3,
                name: '雪狐151',
                age: 6,
                address: '陕西省西安市',
                isShowInput: true,
                creatTime: '2020-01-19 10:02:56',
                isSelect: true,
                editButtonText: '已打款',
                deleteButtonText: '拒绝',
                isOperation: true
            },
            {
                sid: 4,
                name: '雪狼',
                age: 50,
                address: '陕西省西安市',
                isShowInput: true,
                creatTime: '2020-01-19 10:02:56',
                isSelect: true,
                editButtonText: '已打款',
                deleteButtonText: '拒绝',
                isOperation: true
            }
        ];
    }

    editRefusePay ( id ): void {
        //拒绝打款理由
        const activeModal = this.modalService.open(RefuseRemarkComponent, {
            size: 'lg',
            windowClass: 'midModal',
            container: 'nb-layout',
            backdrop: 'static',
            keyboard: false
        });
        activeModal.componentInstance.id = id;
        activeModal.result.then(result => {
            console.info('add', result);
            if ( result == 'success' ) {
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
            if ( data != 'ok' ) {
                /*this.http.delete(ServiceConfig.MAJOR_TASK + '/' + id, {}, ( res ) => {
                 if ( res && res.status_code == 200 ) {
                 this.toast.showToastr('success', '删除成功');
                 this.getTaskList();
                 }
                 else {
                 this.toast.showToastr('error', res.message);
                 }
                 });*/
            }
        });
    }

    sortPayList ( $event ) {
        //排序
        console.info($event);
    }

    selectAllPayData ( $event ): void {
        //全选
        this.tableTitle[ 0 ].isChecked = $event;
        if ( $event ) {
            this.signatureIdArr = [];
            this.tableList.forEach(item => {
                this.signatureIdArr.push(item.sid);
            })
        }
        else {
            this.signatureIdArr = [];
        }
    }

    selectPayOneData ( $event ): void {
        //单条筛选
        if ( $event.checked ) {
            this.signatureIdArr.push(Number($event.sid));
        }
        else {
            let idx = this.signatureIdArr.indexOf(Number($event.sid));
            this.signatureIdArr.splice(idx, 1);
        }
        this.tableTitle[ 0 ].isChecked = this.signatureIdArr.length === this.tableList.length ? true : false;
    }

    searchPayList (): void {
        //搜索
        console.info(123456);

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

}
