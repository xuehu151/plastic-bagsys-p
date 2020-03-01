import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toastrervice } from "../../../providers/toastrService";
import { HttpCustormClient } from '../../../providers/HttpClient';
import { ServiceConfig } from '../../../providers/service.config';

@Component({
    selector: 'ngx-edit-agent',
    templateUrl: './edit-agent.component.html',
    styleUrls: [ '../new-agents/new-agents.component.scss' ],
})

export class EditAgentComponent implements OnInit, AfterViewInit {
    @Input() id: any;
    compName: string;
    provinceName: string = '';
    cityName: string = '';
    agentPassword: string = '';
    areaInfo: Array<any> = [];
    proviceData: Array<any> = [];
    cityData: Array<any> = [];
    cityArray: Array<any> = [];
    editAgentParams = {
        id: '',
        name: '',
        phone: '',
        compName: '',
        managerPhone: '',
        level: '',
        areaList: []
    };
    cityId: number;
    provinceId: number;
    areaArray: Array<any> = [];

    constructor ( private activeModal: NgbActiveModal,
                  private http: HttpCustormClient,
                  private toastr: Toastrervice, ) {
    }

    ngOnInit () {
        this.getAreaInfo();
    }

    ngAfterViewInit(){
        this.getAgentId();
    }

    getAgentId (): void {
        this.http.get(ServiceConfig.QUERYAGENT + this.id, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.editAgentParams = res.data;
                this.areaArray = res.data.areaList;
                this.provinceId = this.areaArray[ 0 ].provinceId;
                this.provinceName = this.areaArray[ 0 ].provinceName;
                this.cityArray.filter( item => {
                    if(this.provinceId === item.parentId){
                        this.cityData.push(item);
                    }
                });
                this.cityId = this.areaArray[ 0 ].cityId;
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    cancel () {
        this.activeModal.close();
    }

    getAreaInfo () {
        this.http.getJson('././././assets/json/city1.json', res => {
            res.filter(item => {
                if ( !item.parentId ) {
                    this.proviceData.push(item);
                }
                else if ( item.parentId ) {
                    this.cityArray.push(item);
                }
            });
        });
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
        this.cityName = this.cityData[ 0 ].name;
        this.cityId = this.cityData[ 0 ].id;
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
        if ( !han.test(this.editAgentParams.name) || this.editAgentParams.name.length > 10 ) {
            this.toastr.showToast('danger', '', '代理商姓名必须为汉字且不能为空并且长度不能大于10!');
            return false;
        }
        else if ( !telReg.test(this.editAgentParams.phone) ) {
            this.toastr.showToast('danger', '', '输入合法的手机号!');
            return false;
        }
        else if ( !this.provinceName ) {
            this.toastr.showToast('danger', '', '区域信息不能为空!');
            return false;
        }
        else if ( !passReg.test(this.agentPassword) ) {
            this.toastr.showToast('danger', '', '密码必须为6位数字组成!');
            return false;
        }
        else if ( !this.areaInfo.length && this.provinceName ) {
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
            id: this.editAgentParams.id,
            level: Number(this.editAgentParams.level),
            compName: this.editAgentParams.compName,
            managerPhone: this.editAgentParams.managerPhone,
            name: this.editAgentParams.name,
            password: this.agentPassword,
            phone: this.editAgentParams.phone,
            areaList: this.areaInfo,
        };
        this.http.put(ServiceConfig.EDITAGENT, params, ( res ) => {
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
