import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceConfig } from '../../../providers/service.config';
import { HttpCustormClient } from '../../../providers/HttpClient'

@Component({
    selector: 'ngx-refuseRemark',
    templateUrl: './refuseRemark.component.html',
    styles: [
            `
            .remark {
                width: 100%;
                height: 10rem;
                resize: none;
                outline: none;
            }
        `
    ],
})

export class RefuseRemarkComponent implements OnInit {
    @Input() data: any;
    remarks: string;

    constructor ( private activeModal: NgbActiveModal,
                  private http: HttpCustormClient, ) {
    }

    ngOnInit () {
    }

    cancel (): void {
        this.activeModal.close();
    }

    sure (): void {
        this.http.post(ServiceConfig.AUDIT + '?id=' + this.data.id + '&status=3&remarks=' + this.remarks, {}, ( res ) => {
            if(res.code === 10000){
                this.activeModal.close('success');
            }
        })
    }

}
