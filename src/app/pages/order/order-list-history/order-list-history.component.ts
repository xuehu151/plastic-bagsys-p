import { Component, OnInit } from '@angular/core';
import { Toastrervice } from "../../../providers/toastrService";
import { AreaDataService } from '../../../providers/areaDataService';

@Component ({
    selector: 'ngx-order-list-history',
    styleUrls: [ './order-list-history.component.scss' ],
    templateUrl: './order-list-history.component.html',
})

export class OrderListHistoryComponent implements OnInit {
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    private goodsList = [];
    private consignee: string;
    private signeeMobile: string;
    private operatorName: string;
    private trackNum: string;
    private status: number = 0;
    private applyDate: string;
    private issuanceDate: string;

    constructor ( private areaDataService: AreaDataService,
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
                title: '收货人姓名',
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
                title: '发货日期',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '发货地址',
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
                title: '运单号',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '操作人',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '备注',
                sortIcon: false,
                isShowInput: true
            },
        ];
        this.goodsList = this.areaDataService.getGoodsList();
    }

    exportOrderHistoryExcel (): void {

    }

    searchOrderHistoryList(): void{

    }

}
