import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Toastrervice } from "../../../providers/toastrService";
import { HttpCustormClient } from '../../../providers/HttpClient'
import { ServiceConfig } from '../../../providers/service.config';
import { EditShopComponent } from '../edit-shop/edit-shop.component';

@Component({
    selector: 'ngx-shop-home',
    styleUrls: [ './shop-home.component.scss' ],
    templateUrl: './shop-home.component.html',
})

export class ShopComponent implements OnInit {
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    goodsList: Array<any> = [];
    currPage: number = 1;
    pageSize: number = 10;
    totalCount: number = 0;
    totalPage: number = 0;
    name: string;
    cost: string;
    price: string;
    standard: string = '';


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
                title: '商品名称',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '商品成本价',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '商品售价',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '商品规格',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '操作',
                sortIcon: false,
                isShowInput: true
            },
        ];
        this.getShopList();
    }

    getShopList (): void {
        let params = {
            currPage: this.currPage,
            pageSize: this.pageSize,
            entity: {
                cost: this.cost,
                name: this.name,
                price: this.price,
                standard: this.standard
            },
        };
        this.http.post(ServiceConfig.GOODSPAGE, params, ( res ) => {
            // console.info(res)
            if ( res.code === 10000 ) {
                this.tableList = res.data.records;
                this.totalCount = res.data.totalCount;
                this.totalPage = Math.ceil(res.data.totalCount / this.pageSize);
                this.tableList.forEach(item => {
                    item.isShowInput = false;
                    item.isSelect = true;
                    item.isOperation = true;
                    item.editBtn = '编辑';
                })
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    editShop (item): void {
        //编辑添加
        const activeModal = this.modalService.open(EditShopComponent, {
            size: 'lg',
            windowClass: 'lg-6-modal',
            container: 'nb-layout',
            backdrop: 'static',
            keyboard: false
        });
        if(item !== 'add'){
            activeModal.componentInstance.data = item;
        }
        activeModal.result.then(result => {
            if ( result == 'success' ) {
                this.getShopList();
            }
            else {
                return;
            }
        });
    }

    changePage ( $event ) {
        this.currPage = $event;
        this.getShopList();
    }

}
