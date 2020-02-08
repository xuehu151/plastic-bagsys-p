import { Component, OnInit } from '@angular/core';
import { Toastrervice } from "../../../providers/toastrService";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpCustormClient } from '../../../providers/HttpClient'
import { AreaDataService, TrimService } from '../../../providers/areaDataService';
import { FloatNumberService } from '../../../providers/floatNumberService';
import { ServiceConfig } from '../../../providers/service.config';

@Component({
    selector: 'ngx-device',
    styleUrls: [ './add-device.component.scss' ],
    templateUrl: './add-device.component.html',
})

export class AddDeviceComponent implements OnInit {
    deviceName: string;
    deviceCode: string;
    phone: string;
    holderName: string;
    goodsId: number = 0;
    price: number = 0;
    cost: number = 0;
    profitPercent: number = 0.1000;
    address: string;
    provinceId: number;
    cityId: number = 0;
    userId: number;
    goodsList: Array<any> = [];
    cityData: Array<any> = [];
    cityArray: Array<any> = [];
    proviceData: Array<any> = [];
    provinceName: string = '';
    cityName: string = '';

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
        this.findAgent();
    }

    changeProvice ( $event ): void {
        //改变省
        this.provinceId = Number($event.target.value);
        this.cityData = [];
        this.cityArray.forEach(item => {
            if ( this.provinceId === item.parentId ) {
                this.cityData.push(item);
            }
        });
        this.cityName = this.cityData[ 0 ].name;
    }

    getGoodsList (): void {
        this.http.get(ServiceConfig.GOODLIST, ( res ) => {
            if ( res.code === 10000 ) {
                this.goodsList = res.data;
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    findAgent (): void {
        this.http.get(ServiceConfig.FINDAGENT, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.phone = res.data.phone;
                this.holderName = res.data.name;
                this.userId = res.data.userId;
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    changeGoods ( $event ): void {
        this.goodsList.forEach(item => {
            if ( Number(this.goodsId) === item.id ) {
                this.price = this.floatNumberService.floatNumber(item.price);
                this.cost = this.floatNumberService.floatNumber(item.cost);
            }
        })
    }

    queryPhone (): any {
        let telReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if ( !telReg.test(this.phone) ) {
            this.toastr.showToast('danger', '', '填写正确的手机号!');
            return false
        }
        this.http.get(ServiceConfig.FINDBYPHONE + this.phone, ( res ) => {
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
        if ( !this.deviceName ) {
            this.toastr.showToast('danger', '', '输入设备名称!');
            return false;
        }
        else if ( this.trimService.trim(this.deviceCode).length < 11 ) {
            this.toastr.showToast('danger', '', '输入合法的设备编号!');
            return false;
        }
        else if ( !this.goodsId ) {
            this.toastr.showToast('danger', '', '请添加商品!');
            return false;
        }
        else if ( this.floatNumberService.floatNumber(this.profitPercent) > 1 ) {
            this.toastr.showToast('danger', '', '分润比例必须是小于或等于1的值!');
            return false;
        }
        let params = {
            name: this.deviceName,
            address: this.address,
            cityId: Number(this.cityId),
            provinceId: Number(this.provinceId),
            goodsId: Number(this.goodsId),
            userId: Number(this.userId),
            deviceCode: this.deviceCode,
            profitPercent: Number(this.profitPercent)
        };
        this.http.post(ServiceConfig.ADDDEVICE, params, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.toastr.showToast('success', '', '添加成功!');
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
