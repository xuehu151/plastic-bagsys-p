import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Toastrervice } from "../../../providers/toastrService";

@Component ({
    selector: 'ngx-device-order',
    styleUrls: [ './device-order.component.scss' ],
    templateUrl: './device-order.component.html',
})

export class DeviceOrderComponent implements OnInit {
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    private orderNum: string;
    private agentName: string;
    private address: string;
    private purchaser: string;
    private transactionNum: string;
    private deviceId: string;
    private status: number = 0;


    constructor ( private router: Router,
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
                title: '订单号',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '代理商',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '设备ID',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '发袋地址',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '商品价格',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '分润比例',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '代理商利润',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '购买用户ID',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '交易号',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '购买时间',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '交易状态',
                sortIcon: false,
                isShowInput: true
            },
        ];
    }

}
