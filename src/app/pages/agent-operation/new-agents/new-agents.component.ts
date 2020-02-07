import { Component, OnInit } from '@angular/core';
import { Toastrervice } from "../../../providers/toastrService";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpCustormClient } from '../../../providers/HttpClient'
import { ServiceConfig } from '../../../providers/service.config';
import { AreaDataService } from '../../../providers/areaDataService';

@Component({
    selector: 'ngx-new-agents',
    styleUrls: [ './new-agents.component.scss' ],
    templateUrl: './new-agents.component.html',
})

export class AddAgentsComponent implements OnInit {
    name: string = '';
    phone: string;
    compName: string;
    managerPhone: string;
    agentLevel: string = '1';
    provinceName: string = '';
    cityName: string = '';
    agentPassword: string = '';
    areaInfo: Array<any> = [];
    proviceData: Array<any> = [];
    cityData: Array<any> = [];
    cityArray: Array<any> = [];
    cityId: number;
    provinceId: number;

    constructor ( private activeModal: NgbActiveModal,
                  private areaDataService: AreaDataService,
                  private http: HttpCustormClient,
                  private toastr: Toastrervice, ) {
    }

    ngOnInit () {
        this.proviceData = this.areaDataService.getAreaInfo().proviceData;
        this.cityArray = this.areaDataService.getAreaInfo().cityArray;
    }

    cancel (): void {
        this.activeModal.close();
    }

    addAreaInfo (): any {
        if ( this.provinceName ) {
            if ( !this.areaInfo.length ) {
                this.areaInfo.push({
                    cityId: Number(this.cityId),
                    cityName: this.cityName,
                    provinceId: Number(this.provinceId),
                    provinceName: this.provinceName,
                });
            }
            else {
                for ( let item  of this.areaInfo ) {
                    if ( item.provinceName === this.provinceName ) {
                        this.toastr.showToast('danger', '', '同一区域不能重复添加!');
                        return false
                    }
                }
                this.areaInfo.push({
                    cityId: Number(this.cityId),
                    cityName: this.cityName,
                    provinceId: Number(this.provinceId),
                    provinceName: this.provinceName,
                });
            }
        }
        else {
            this.toastr.showToast('danger', '', '省市名称不能为空!');
        }
    }

    changeProvice ( $event ): void {
        //改变省
        this.provinceId = Number($event.target.value);
        this.cityData = [];
        this.proviceData.filter(item => {
            if ( this.provinceId === item.id ) {
                this.provinceName = item.name;
            }
        });
        this.cityArray.forEach(item => {
            if ( this.provinceId === item.parentId ) {
                this.cityData.push(item);
            }
        });
        // this.cityName = this.cityData[ 0 ].name;
        // this.cityId = this.cityData[ 0 ].id;
    }

    changeCity ( $event ): void {
        //改变市
        this.cityId = Number($event.target.value);
        this.cityData.filter(item => {
            if ( this.cityId === item.id ) {
                this.cityName = item.name;
            }
        });
    }

    deleteArea ( idx ): void {
        this.areaInfo.splice(idx, 1);
    }

    isSure (): any {
        let telReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        let han = /^[\u4e00-\u9fa5]+$/;
        let passReg = /^[0-9]*$/;
        if ( !han.test(this.name) || this.name.length > 10) {
            this.toastr.showToast('danger', '', '代理商姓名必须为汉字且不能为空并且长度不能大于10!');
            return false;
        }
        else if ( !telReg.test(this.phone ) ) {
            this.toastr.showToast('danger', '', '输入合法的手机号!');
            return false;
        }
        else if ( !this.provinceName ) {
            this.toastr.showToast('danger', '', '区域信息不能为空!');
            return false;
        }
        else if(!passReg.test(this.agentPassword)){
            this.toastr.showToast('danger', '', '密码必须为6位数字组成!');
            return false;
        }
        else if(!this.areaInfo.length && this.provinceName ){
            this.areaInfo = [
                {
                    cityId: Number(this.cityId),
                    cityName: this.cityName,
                    provinceId: Number(this.provinceId),
                    provinceName: this.provinceName,
                }
            ]
        }

        let params = {
            level: Number(this.agentLevel),
            compName: this.compName,
            managerPhone: this.managerPhone,
            name: this.name,
            password: this.agentPassword,
            phone: this.phone,
            areaList: this.areaInfo,
        };
        this.http.post(ServiceConfig.ADDAGENT, params, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.toastr.showToast('success', '', '修改成功!');
                this.activeModal.close();
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }
}
