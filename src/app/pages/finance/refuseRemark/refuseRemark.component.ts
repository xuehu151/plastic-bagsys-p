import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
    @Input() id: number;
    private refuseRemark: string;

    constructor ( private activeModal: NgbActiveModal, ) {
    }

    ngOnInit () {
    }

    cancel (): void {
        this.activeModal.close();
    }

    sure (): void {
        this.activeModal.close();

    }

}
