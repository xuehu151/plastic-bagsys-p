import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpCustormClient } from '../../../providers/HttpClient'
import { TrimService } from '../../../providers/areaDataService';
import { Toastrervice } from "../../../providers/toastrService";
import { ServiceConfig } from '../../../providers/service.config';

@Component({
    selector: 'ngx-waybill-No',
    styleUrls: [ './waybill-No.component.scss' ],
    templateUrl: './waybill-No.component.html',
})

export class WaybillNoComponent implements OnInit {
    @Input() data: any;
    trackNum: string;

    constructor ( private activeModal: NgbActiveModal,
                  private trimService: TrimService,
                  private http: HttpCustormClient,
                  private toastr: Toastrervice,  ) {
    }

    ngOnInit () {
        console.info(this.data)
    }


    isSure () {
        if ( !this.trackNum ) {
            this.toastr.showToast('danger', '', '输入运单号');
            return false;
        }
        let params = {
            orderSn: this.data.sn,
            trackNum: this.trackNum
        };
        this.http.put(ServiceConfig.TRACKNUM, params, ( res ) => {
            // console.info(res);
            if ( res.code === 10000 ) {
                this.toastr.showToast('success', '', '添写成功!');
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
