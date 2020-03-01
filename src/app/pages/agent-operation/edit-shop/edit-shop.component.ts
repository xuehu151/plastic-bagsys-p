import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toastrervice } from "../../../providers/toastrService";
import { HttpCustormClient } from '../../../providers/HttpClient';
import { ServiceConfig } from '../../../providers/service.config';

@Component({
    selector: 'ngx-edit-shop',
    templateUrl: './edit-shop.component.html',
    styleUrls: [ '../new-agents/new-agents.component.scss' ],
})

export class EditShopComponent implements OnInit, AfterViewInit {
    @Input() data: any;
    goodsList: Array<any> = [];
    name: string;
    cost: string;
    price: string;
    standard: string = '';
    apiUrl = '';
    isSale: string = '1';
    titleName: string;

    constructor ( private activeModal: NgbActiveModal,
                  private http: HttpCustormClient,
                  private toastr: Toastrervice, ) {
    }

    ngOnInit () {
        if(this.data){
            this.name = this.data.name;
            this.cost = this.data.cost;
            this.price = this.data.price;
            this.standard = this.data.standard;
            this.apiUrl = 'update';
            this.titleName = '编辑';
        }
        else {
            this.apiUrl = 'add';
            this.titleName = '添加';
        }
    }

    ngAfterViewInit(){
    }

    cancel () {
        this.activeModal.close();
    }

    isSure (): any {
        if ( !this.name ) {
            this.toastr.showToast('danger', '', '输入商品名称!');
            return false;
        }
        else if ( !this.cost ) {
            this.toastr.showToast('danger', '', '输入商品成本价!');
            return false;
        }
        else if ( this.price === '' ) {
            this.toastr.showToast('danger', '', '输入商品售价!');
            return false;
        }
        else if ( !this.standard ) {
            this.toastr.showToast('danger', '', '选择商品规格!');
            return false;
        }
        let params;
        let method;
        if(this.data){
            method = 'put';
            params = {
                id: this.data.id,
                cost: Number(this.cost),
                name: this.name,
                price: Number(this.price),
                standard: Number(this.standard)
            };
        }
        else {
            method = 'post';
            params = {
                cost: Number(this.cost),
                name: this.name,
                price: Number(this.price),
                isSale: Number(this.isSale),
                standard: Number(this.standard),
            };
        }
        this.http[method](ServiceConfig.UPDATEGOODS + this.apiUrl, params, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.toastr.showToast('success', '', '修改成功!');
                this.activeModal.close('success');
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

}
