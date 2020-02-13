import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-QRcode',
    templateUrl: './QRcode.component.html',
    styles: [
        `
            .qrcode{
                width: 100%;
                height: 100%;
                margin-top: 4rem;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
            }
            .qrcode img{
                width: 12rem;
                height: 12rem;
            }
            i{
                font-size: 3rem;
                position: absolute;
                top: 1rem;
                right: 1rem;
                cursor: pointer;
            }
            .qrcode-btn{
                margin: 1rem 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .qrcode-btn span{
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
    @Input() text: string;

    constructor( private activeModal: NgbActiveModal ) {
    }

    ngOnInit() {
    }

    closeModal(  ) {
        this.activeModal.close();
    }

    updateQrcode(): void{

    }

}
