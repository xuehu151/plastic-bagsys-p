import { Component, OnInit } from '@angular/core';
import { Toastrervice } from "../../../providers/toastrService";
import { AddAgentsComponent } from "../new-agents/new-agents.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpCustormClient } from '../../../providers/HttpClient';
import { AreaDataService } from '../../../providers/areaDataService';
import { ServiceConfig } from '../../../providers/service.config';
import { EditAgentComponent } from "../edit-agent/edit-agent.component";

@Component({
    selector: 'ngx-agent',
    styleUrls: [ './agent.component.scss' ],
    templateUrl: './agent.component.html',
})

export class AgentComponent implements OnInit {
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    private proviceData: Array<any> = [];
    private cityData: Array<any> = [];
    private cityArray: Array<any> = [];
    private agentName: string;
    private agentTelephone: string;
    private agentCompanyName: string;
    private managerPhone: string;
    private cityId: number;
    private provinceId: number;
    private currPage: number = 1;
    private pageSize: number = 15;


    constructor ( private modalService: NgbModal,
                  private areaDataService: AreaDataService,
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
                title: 'ID',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '姓名',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '代理商手机号',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '代理商公司名',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '代理商级别',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '管理员',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '代理范围',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '正常运行设备数',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '操作',
                sortIcon: false,
                isShowInput: true
            }
        ];
        this.searchAgentList();
        this.proviceData = this.areaDataService.getAreaInfo().proviceData;
        this.cityArray = this.areaDataService.getAreaInfo().cityArray;
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
        this.cityId = this.cityData[ 0 ].id;
    }

    searchAgentList (): void {
        //查询
        let params = {
            currPage: this.currPage,
            entity: {
                compName: this.agentCompanyName,
                managerPhone: this.managerPhone,
                name: this.agentName,
                phone: this.agentTelephone,
                cityId: Number(this.cityId) || this.cityId,
                provinceId: this.provinceId
            },
            pageSize: this.pageSize
        };
        this.http.post(ServiceConfig.AGENTLIST, params, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.tableList = res.data.records;
                this.tableList.forEach(item => {
                    item.isShowInput = false;
                    item.isSelect = true;
                    item.editButtonText = '修改';
                    item.isOperation = true;
                    item.name = item.name ? item.name : '- - -';
                })
            }
            else {
                this.toastr.showToast('danger', '', res.message);
            }
        })
    }

    exportAgentExcel (): void {
        //导出AGENTLIST
        console.info('导出')
    }

    startEditAgent ( item ): void {
        //编辑
        const activeModal = this.modalService.open(EditAgentComponent, {
            size: 'lg',
            windowClass: 'midModal',
            container: 'nb-layout',
            backdrop: 'static',
            keyboard: false
        });
        activeModal.componentInstance.agentData = item;
        activeModal.result.then(result => {
            if ( result == 'success' ) {
                this.searchAgentList();
            }
            else {
                return;
            }
        });
    }

    addAgent (): void {
        //新增
        const activeModal = this.modalService.open(AddAgentsComponent, {
            size: 'lg',
            windowClass: 'midModal',
            container: 'nb-layout',
            backdrop: 'static',
            keyboard: false
        });
        activeModal.result.then(result => {
            if ( result == 'success' ) {
                this.searchAgentList();
            }
            else {
                return;
            }
        });
    }
}
