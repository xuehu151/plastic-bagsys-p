import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpCustormClient } from '../../../providers/HttpClient'
import { TrimService } from '../../../providers/areaDataService';

@Component({
    selector: 'ngx-waybill-No',
    styleUrls: [ './waybill-No.component.scss' ],
    templateUrl: './waybill-No.component.html',
})

export class WaybillNoComponent implements OnInit {
    private trackNumber: string;

    constructor ( private activeModal: NgbActiveModal,
                  private trimService: TrimService,
                  private http: HttpCustormClient, ) {
    }

    ngOnInit () {
    }


    isSure () {
        // if ( !this.deviceName ) {
        //     this.toastr.showToast('danger', '', '输入设备名称!');
        //     return false;
        // }
        // }
        // this.http.post(ServiceConfig.ADDDEVICE, params, ( res ) => {
        //     // console.info(res);
        //     if ( res.code === 10000 ) {
        //         this.toastr.showToast('success', '', '添加成功!');
        //         this.activeModal.close('success');
        //     }
        //     else {
        //         this.toastr.showToast('danger', '', res.message);
        //     }
        // })

    }

    cancel (): void {
        this.activeModal.close();
    }

}
