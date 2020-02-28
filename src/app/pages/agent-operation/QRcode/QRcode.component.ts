import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpCustormClient } from '../../../providers/HttpClient'
import { ServiceConfig } from '../../../providers/service.config';
import { DomSanitizer } from '@angular/platform-browser';
import { Toastrervice } from "../../../providers/toastrService";

@Component({
    selector: 'ngx-QRcode',
    templateUrl: './QRcode.component.html',
    styles: [
            `
            .qrcode {
                width: 100%;
                height: 100%;
                margin-top: 4rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
            }

            .qrcode img,
            .qrcode span {
                width: 12rem;
                height: 12rem;
            }

            .qrcode span {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                text-align: center;
            }

            .qrcode img{
                cursor: pointer;
            }
            
            i {
                font-size: 3rem;
                position: absolute;
                top: 1rem;
                right: 1rem;
                cursor: pointer;
            }

            .qrcode-btn {
                margin: 1rem 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .qrcode-btn span {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 30%;
                padding: 8px 12px;
                font-size: 1.5rem;
                color: white;
                background: #348be6;
                cursor: pointer;
            }
        `
    ]
})

export class QRcodeModalComponent implements OnInit {
    @Input() data: string;
    imgUrl: string = '';
    pageUrl: string = 'pages/in-purchase/in-purchase';

    constructor ( private activeModal: NgbActiveModal,
                  private sanitizer: DomSanitizer,
                  private toastr: Toastrervice,
                  private http: HttpCustormClient, ) {
    }

    ngOnInit () {
        this.imgUrl = this.data[ 'qrCodeUrl' ];
    }

    closeModal () {
        this.activeModal.close();
    }

    updateQrcode (): void {
        let params = {
            id: this.data[ 'id' ],
            page: this.pageUrl,
            width: 430
        };
        this.http.post(ServiceConfig.CREATQRCODE, params, ( res ) => {
            if ( res.code === 10000 ) {
                // this.imgUrl = 'http://pic.qqtn.com/up/2017-7/201707261418467451826.png';
                this.imgUrl = res.data;
                this.toastr.showToast('success', '', '更新成功!');
            }
        })
    }

    downQRcode(): void{
        window.open(this.imgUrl)
    }

}
