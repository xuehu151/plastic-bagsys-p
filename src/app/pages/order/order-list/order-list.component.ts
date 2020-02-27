import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Toastrervice } from "../../../providers/toastrService";
import { HttpCustormClient } from '../../../providers/HttpClient'
import { WaybillNoComponent } from '../waybill-No/waybill-No.component';
import { AreaDataService } from '../../../providers/areaDataService';
import { ServiceConfig } from '../../../providers/service.config';

@Component({
    selector: 'ngx-order-list',
    styleUrls: [ './order-list.component.scss' ],
    templateUrl: './order-list.component.html',
})

export class OrderListComponent implements OnInit {
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    goodsList: Array<any> = [];
    consignee: string;
    signeeMobile: string;
    orderStatus: string = '';
    goodsId: string = '';
    status: number = 0;
    startApplyDate: string;
    endApplyDate: string;
    currPage: number = 1;
    pageSize: number = 10;
    totalCount: number = 0;
    totalPage: number = 0;
    startCreateTime: string;
    endCreateTime: string;

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
        this.searchOrderList();
    }

    searchOrderList (): void {
        this.startCreateTime = this.startApplyDate && this.startApplyDate['year'] + '-' + this.startApplyDate['month'] + '-' + this.startApplyDate['day'] + ' 00:00:00';
        // this.endCreateTime = this.endApplyDate && this.endApplyDate['year'] + '-' + this.endApplyDate['month'] + '-' + this.endApplyDate['day'] + '00:00:00';
        let params = {
            currPage: this.currPage,
            pageSize: this.pageSize,
            entity: {
                consignee: this.consignee,
                signeeMobile: this.signeeMobile,
                status: this.orderStatus,
                goodsId: this.goodsId,
                startCreateTime: this.startCreateTime,
                endCreateTime: this.endCreateTime
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
                    item.isOperation = true;
                    item.fillBillNumberText = '填写快递单号';
                })
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    fillBillNumber (item): void {
        //新增
        const activeModal = this.modalService.open(WaybillNoComponent, {
            size: 'lg',
            windowClass: 'lg-6-modal',
            container: 'nb-layout',
            backdrop: 'static',
            keyboard: false
        });
        activeModal.componentInstance.data = item;
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
        this.startCreateTime = this.startApplyDate && this.startApplyDate['year'] + '-' + this.startApplyDate['month'] + '-' + this.startApplyDate['day'] + ' 00:00:00';
        // this.endCreateTime = this.endApplyDate && this.endApplyDate['year'] + '-' + this.endApplyDate['month'] + '-' + this.endApplyDate['day'] + '00:00:00';
        //导出
        let params = {
            consignee: this.consignee || '',
            signeeMobile: this.signeeMobile || '',
            status: this.orderStatus || '',
            goodsId: this.goodsId || '',
            startCreateTime: this.startCreateTime || '',
            endCreateTime: this.endCreateTime || ''
        };
        this.http.exportExcel(ServiceConfig.EXPORTORDER, '采购订单列表', params)
    }

    changePage ( $event ) {
        this.currPage = $event;
        this.searchOrderList();
    }

}
