import { Component, OnInit } from '@angular/core';
import { Toastrervice } from "../../../providers/toastrService";
import { AreaDataService } from '../../../providers/areaDataService';
import { HttpCustormClient } from '../../../providers/HttpClient'
import { ServiceConfig } from '../../../providers/service.config';

@Component ({
    selector: 'ngx-order-list-history',
    styleUrls: [ './order-list-history.component.scss' ],
    templateUrl: './order-list-history.component.html',
})

export class OrderListHistoryComponent implements OnInit {
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    goodsList = [];
    consignee: string;
    signeeMobile: string;
    handleUserName: string;
    trackNum: string;
    status: string = '';
    goodsId: string = '';
    applyDate: string;
    issuanceDate: string;
    currPage: number = 1;
    pageSize: number = 10;
    totalCount: number = 0;
    totalPage: number = 0;
    startCreateTime: string;
    endCreateTime: string;
    startHandleTime: string;
    endHandleTime: string;

    constructor ( private areaDataService: AreaDataService,
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
        this.searchOrderHistoryList();
    }

    exportOrderHistoryExcel (): void {

    }

    searchOrderHistoryList(): void{
        this.startCreateTime = this.applyDate && this.applyDate['year'] + '-' + this.applyDate['month'] + '-' + this.applyDate['day'] + ' 00:00:00';
        this.startHandleTime = this.issuanceDate && this.issuanceDate['year'] + '-' + this.issuanceDate['month'] + '-' + this.issuanceDate['day'] + ' 00:00:00';
        let params = {
            currPage: this.currPage,
            pageSize: this.pageSize,
            entity: {
                consignee: this.consignee,
                goodsId: this.goodsId,
                signeeMobile: this.signeeMobile,
                status: this.status,
                handleUserName: this.handleUserName,
                trackNum: this.trackNum,
                startCreateTime: this.startCreateTime,
                endCreateTime: this.endCreateTime,
                startHandleTime	: this.startHandleTime	,
                endHandleTime: this.endHandleTime
            }
        };
        this.http.post(ServiceConfig.PURCHASE, params, ( res ) => {
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

    changePage ( $event ) {
        this.currPage = $event;
        this.searchOrderHistoryList();
    }

}
