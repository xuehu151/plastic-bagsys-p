import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-dialogueboxmodal',
    templateUrl: './dialogBoxModal.component.html',
})

export class DialogBoxModalComponent implements OnInit {
    @Input() operating: string;
    @Input() text: string;

    constructor( private activeModal: NgbActiveModal ) {
    }

    ngOnInit() {
    }

    closeModal( status ) {
        this.activeModal.close(status);
    }


}
