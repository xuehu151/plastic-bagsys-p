import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Toastrervice } from "../../../providers/toastrService";
import { HttpCustormClient } from '../../../providers/HttpClient'
import { WaybillNoComponent } from '../waybill-No/waybill-No.component';
import { AreaDataService } from '../../../providers/areaDataService';

@Component({
    selector: 'ngx-order-list',
    styleUrls: [ './order-list.component.scss' ],
    templateUrl: './order-list.component.html',
})

export class OrderListComponent implements OnInit {
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    private goodsList: Array<any> = [];
    private receivGoodsName: string;
    private receivGoodsPhone: string;
    private orderStatus: number = 0;
    private purchaser: string;
    private transactionNum: string;
    private deviceId: string;
    private status: number = 0;
    private choiceGoods: number = 0;
    private applyDate: string;

    constructor ( private areaDataService: AreaDataService,
                  private modalService: NgbModal,
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
                title: '收货人',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '收货人手机号',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '申请物品',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '申请数量',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '申请日期',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '收货地址',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '订单金额',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '订单状态',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '备注',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '操作',
                sortIcon: false,
                isShowInput: true
            },
        ];
        this.goodsList = this.areaDataService.getGoodsList();
    }

    searchOrderList (): void {

    }

    fillBillNumber (): void {
        //新增
        const activeModal = this.modalService.open(WaybillNoComponent, {
            size: 'lg',
            windowClass: 'lg-6-modal',
            container: 'nb-layout',
            backdrop: 'static',
            keyboard: false
        });
        activeModal.result.then(result => {
            if ( result == 'success' ) {
                this.searchOrderList();
            }
            else {
                return;
            }
        });
    }

    exportOrderExcel (): void {

    }


}
