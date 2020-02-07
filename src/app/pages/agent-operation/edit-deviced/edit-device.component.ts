import { Component, OnInit, Input } from '@angular/core';
import { Toastrervice } from "../../../providers/toastrService";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpCustormClient } from '../../../providers/HttpClient'
import { AreaDataService, TrimService } from '../../../providers/areaDataService';
import { FloatNumberService } from '../../../providers/floatNumberService';
import { ServiceConfig } from '../../../providers/service.config';

@Component({
    selector: 'ngx-device',
    styleUrls: [ './edit-device.component.scss' ],
    templateUrl: './edit-device.component.html',
})

export class EditDeviceComponent implements OnInit {
    @Input() data: any;
    price: number = 0;
    cost: number = 0;
    userId: number;
    holderName: string;
    goodsList: Array<any> = [];
    cityData: Array<any> = [];
    cityArray: Array<any> = [];
    proviceData: Array<any> = [];

    constructor ( private activeModal: NgbActiveModal,
                  private areaDataService: AreaDataService,
                  private trimService: TrimService,
                  private floatNumberService: FloatNumberService,
                  private http: HttpCustormClient,
                  private toastr: Toastrervice, ) {
    }

    ngOnInit () {
        this.proviceData = this.areaDataService.getAreaInfo().proviceData;
        this.cityArray = this.areaDataService.getAreaInfo().cityArray;
        this.getGoodsList();
        this.changeProvice();
        this.queryPhone();
    }

    changeProvice ( $event? ): void {
        //改变省
        this.data.provinceId = $event ? Number($event.target.value) : this.data.provinceId;
        this.cityData = [];
        this.cityArray.forEach(item => {
            if ( this.data.provinceId === item.parentId ) {
                this.cityData.push(item);
            }
        });
    }

    getGoodsList (): void {
        this.http.get(ServiceConfig.GOODLIST, ( res ) => {
            if ( res.code === 10000 ) {
                this.goodsList = res.data;
                this.changeGoods();
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    changeGoods ( $event? ): void {
        this.goodsList.forEach(item => {
            if ( Number(this.data.goodsId) === item.id ) {
                this.price = this.floatNumberService.floatNumber(item.price);
                this.cost = this.floatNumberService.floatNumber(item.cost);
            }
        })
    }

    queryPhone (): any {
        let telReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if ( !telReg.test(this.data.agentPhone) ) {
            this.toastr.showToast('danger', '', '填写正确的手机号!');
            return false
        }
        this.http.get(ServiceConfig.FINDBYPHONE + this.data.agentPhone, ( res ) => {
            if ( res.code === 10000 ) {
                if ( res.data ) {
                    this.holderName = res.data.name;
                    this.userId = res.data.userId;
                }
                else {
                    this.toastr.showToast('danger', '', '未查询到该手机号持有人信息，建议更换手机号重试!');
                }
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    isSure () {
        if ( !this.data.name ) {
            this.toastr.showToast('danger', '', '输入设备名称!');
            return false;
        }
        else if(this.trimService.trim(this.data.deviceCode).length < 11){
            this.toastr.showToast('danger', '', '输入合法的设备编号!');
            return false;
        }
        else if ( !this.data.goodsId ) {
            this.toastr.showToast('danger', '', '请添加商品!');
            return false;
        }
        else if ( this.floatNumberService.floatNumber(this.data.profitPercent) > 1) {
            this.toastr.showToast('danger', '', '分润比例必须是小于或等于1的值!');
            return false;
        }
        let params = {
            id: this.data.id,
            name: this.data.name,
            address: this.data.address,
            deviceCode: this.data.deviceCode,
            cityId: Number(this.data.cityId),
            provinceId: Number(this.data.provinceId),
            goodsId: Number(this.data.goodsId),
            userId: Number(this.userId),
            profitPercent: Number(this.data.profitPercent)
        };
        this.http.put(ServiceConfig.EDITDEVICE, params, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.toastr.showToast('success', '', '编辑成功!');
                this.activeModal.close('success');
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })

    }

    cancel (): void {
        this.activeModal.close();
    }

}
