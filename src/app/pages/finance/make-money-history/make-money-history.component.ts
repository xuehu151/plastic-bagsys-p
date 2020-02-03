import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Toastrervice } from "../../../providers/toastrService";

@Component ({
    selector: 'ngx-make-money-history',
    styleUrls: [ './make-money-history.component.scss', '../refuse-payment/refuse-payment.component.scss' ],
    templateUrl: './make-money-history.component.html',
})

export class MakeMoneyHistoryComponent implements OnInit {
    tableTitle: Array<any> = [];
    tableList: Array<any> = [];
    signatureIdArr: Array<any> = [];

    constructor ( private router: Router,
                  private toastr: Toastrervice, ) {
    }

    ngOnInit () {
        this.tableTitle = [
            {
                title: '',
                isSelect: false,
                isChecked: false,
                isShowInput: false
            },
            {
                title: '用户姓名',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '用户手机号',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '当前角色',
                sortIcon: false,
                isShowInput: true
            },
            {
                title: '创建时间',
                sortIcon: false,
                isShowInput: true
            },
        ];
        this.tableList = [
            {
                sid: 1,
                name: '李强',
                age: 30,
                address: '西安市',
                isShowInput: false,
                creatTime: '2020-01-19 10:02:56',
                isSelect: true,
                editButtonText: '已打款',
                deleteButtonText: '拒绝',
                isOperation: false
            },
            {
                sid: 2,
                name: '雪狐',
                age: 10,
                address: '陕西省西安市',
                isShowInput: false,
                creatTime: '2020-01-19 10:02:56',
                isSelect: true,
                editButtonText: '已打款',
                deleteButtonText: '拒绝',
                isOperation: false
            },
            {
                sid: 3,
                name: '雪狐151',
                age: 6,
                address: '陕西省西安市',
                isShowInput: false,
                creatTime: '2020-01-19 10:02:56',
                isSelect: true,
                editButtonText: '已打款',
                deleteButtonText: '拒绝',
                isOperation: false
            },
            {
                sid: 4,
                name: '雪狼',
                age: 50,
                address: '陕西省西安市',
                isShowInput: false,
                creatTime: '2020-01-19 10:02:56',
                isSelect: true,
                editButtonText: '已打款',
                deleteButtonText: '拒绝',
                isOperation: false
            }
        ];
    }

}
