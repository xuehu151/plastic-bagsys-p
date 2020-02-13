import { Component, OnInit } from '@angular/core';
import { Toastrervice } from "../../../providers/toastrService";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddDeviceComponent } from "../add-deviced/add-device.component";
import { EditDeviceComponent } from "../edit-deviced/edit-device.component";
import { QRcodeModalComponent } from "../QRcode/QRcode.component";
import { HttpCustormClient } from '../../../providers/HttpClient'
import { AreaDataService, TrimService } from '../../../providers/areaDataService';
import { ServiceConfig } from '../../../providers/service.config';

@Component ({
    selector: 'ngx-device-manage',
    styleUrls: [ './device-manage.component.scss' ],
    templateUrl: './device-manage.component.html',
})

export class DeviceManageComponent implements OnInit {
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    areaInfo: Array<any> = [];
    proviceData: Array<any> = [];
    cityData: Array<any> = [];
    cityArray: Array<any> = [];
    deviceId: string;
    agentName: string;
    agentPhone: string;
    deviceCode: string;
    address: string;
    managerPhone: string;
    provinceId: string = '';
    cityId: string = '';
    currPage: number = 1;
    pageSize: number = 10;
    totalCount: number = 0;
    totalPage: number = 0;
    runStatus: number = 1;
    isEnable: number = 1;

    constructor ( private http: HttpCustormClient,
                  private areaDataService: AreaDataService,
                  private modalService: NgbModal,
                  private trimService: TrimService,
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
                title: '设备ID',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '设备名称',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '设备编号',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '代理商',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '代理商手机号',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '管理员',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '发袋城市',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '发袋地点',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '袋子售价',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '分润比例',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '今日发袋',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '发袋总计',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '运行状态',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '操作',
                sortIcon: false,
                isShowInput: true
            }
        ];
        this.proviceData = this.areaDataService.getAreaInfo().proviceData;
        this.cityArray = this.areaDataService.getAreaInfo().cityArray;
        this.searchDeviceList();
    }

    changeProvice ( $event ): void {
        //改变省
        this.cityData = [];
        this.cityArray.forEach(item => {
            if ( Number($event.target.value) === item.parentId ) {
                this.cityData.push(item);
            }
        });
        // this.agentCity = this.cityData[ 0 ].name;
    }

    searchDeviceList (): any {
        //查询
        let telReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if (( this.agentPhone && !telReg.test(this.agentPhone)) ||
            (this.managerPhone && !telReg.test(this.managerPhone))) {
            this.toastr.showToast('danger', '', '填写正确的手机号!');
            return false
        }
        let params = {
            currPage: this.currPage,
            pageSize: this.pageSize,
            entity: {
                address: this.trimService.trim(this.address),
                deviceId: this.trimService.trim(this.deviceId),
                agentName: this.trimService.trim(this.agentName),
                agentPhone: this.trimService.trim(this.agentPhone),
                managerPhone: this.trimService.trim(this.managerPhone),
                deviceCode: this.trimService.trim(this.deviceCode),
                cityId: this.cityId,
                provinceId: this.provinceId,
                runStatus: this.runStatus
            },
        };
        this.http.post(ServiceConfig.DEVICELIST, params, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.tableList = res.data.records;
                this.totalCount = res.data.totalCount;
                this.totalPage = Math.ceil(res.data.totalCount / this.pageSize);
                this.tableList.forEach(item => {
                    item.isShowInput = false;
                    item.isSelect = true;
                    item.editButtonText = '修改';
                    item.QRcodeText = '二维码';
                    item.isOperation = true;
                    item.name = item.name ? item.name : '- - -';
                })
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })

    }

    exportDeviceExcel (): void {
        //导出
        console.info('导出')
    }

    QRcode(item):void{
        const activeModal = this.modalService.open(QRcodeModalComponent, {
            size: 'lg',
            windowClass: 'lg-4-modal',
            container: 'nb-layout',
            backdrop: 'static',
            keyboard: false
        });
        activeModal.componentInstance.data = item;
        activeModal.result.then(result => {
            if ( result == 'success' ) {
            }
            else {
                return;
            }
        });
    }

    addDevice(): void{
        //新增
        const activeModal = this.modalService.open(AddDeviceComponent, {
            size: 'lg',
            windowClass: 'lg-6-modal',
            container: 'nb-layout',
            backdrop: 'static',
            keyboard: false
        });
        activeModal.result.then(result => {
            if ( result == 'success' ) {
                this.searchDeviceList();
            }
            else {
                return;
            }
        });
    }

    isUpperLowerShelf(item): void{
        //上架下架
        item.isEnable =  item.isEnable === 1 ? 0 : 1;
        this.http.put(ServiceConfig.ISENABLE + '?id=' + item.id + '&isEnable=' + item.isEnable, {}, ( res ) => {
            if ( res.code === 10000 ) {
                this.toastr.showToast('success', '', res.message);
                this.searchDeviceList();
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    startEditdevice(item): void{
        //修改
        const activeModal = this.modalService.open(EditDeviceComponent, {
            size: 'lg',
            windowClass: 'lg-6-modal',
            container: 'nb-layout',
            backdrop: 'static',
            keyboard: false
        });
        activeModal.componentInstance.data = item;
        activeModal.result.then(result => {
            if ( result == 'success' ) {
                this.searchDeviceList();
            }
            else {
                return;
            }
        });
    }

    changePage ( $event ) {
        this.currPage = $event;
        this.searchDeviceList();
    }

}
