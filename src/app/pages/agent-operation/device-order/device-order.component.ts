import { Component, OnInit } from '@angular/core';
import { Toastrervice } from "../../../providers/toastrService";
import { HttpCustormClient } from '../../../providers/HttpClient'
import { ServiceConfig } from '../../../providers/service.config';

@Component ({
    selector: 'ngx-device-order',
    styleUrls: [ './device-order.component.scss' ],
    templateUrl: './device-order.component.html',
})

export class DeviceOrderComponent implements OnInit {
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    sn: string;
    transactionNo: string;
    agentName: string;
    address: string;
    memberNum: number;
    deviceCode: number;
    status: string = '';
    currPage: number = 1;
    pageSize: number = 10;
    totalCount: number = 0;
    totalPage: number = 0;

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
                title: '设备编号',
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
                title: '购买用户编号',
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
        this.searchDeviceOrderList();
    }

    searchDeviceOrderList(): void{
        let params = {
            currPage: this.currPage,
            pageSize: this.pageSize,
            entity: {
                address: this.address,
                agentName: this.agentName,
                deviceCode: this.deviceCode,
                memberNum: this.memberNum,
                sn: this.sn,
                status: this.status,
                transactionNo: this.transactionNo
            }
        };
        this.http.post(ServiceConfig.SCANORDER, params, ( res ) => {
            console.info(res);
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

    exportDeviceExcel(): void{

    }

    changePage ( $event ) {
        this.currPage = $event;
        this.searchDeviceOrderList();
    }

}
