/**
 * Created by admin on 2020/1/17.
 */
import { Injectable } from '@angular/core';
import { NbToastStatus } from "@nebular/theme/components/toastr/model";
import {
    NbGlobalPhysicalPosition,
    NbGlobalPosition,
    NbToastrService
} from "@nebular/theme";

@Injectable ()
export class Toastrervice {
    destroyByClick = true;
    duration = 3000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    types = {
        danger: NbToastStatus.DANGER,
        primary: NbToastStatus.PRIMARY,
        success: NbToastStatus.SUCCESS,
        warning: NbToastStatus.WARNING,
    };

    constructor ( private toastrService: NbToastrService, ) {
    }

    public showToast ( type: string, title: string, body: string ) {
        const config = {
            status: this.types[ type ],
            destroyByClick: this.destroyByClick,
            duration: this.duration,
            hasIcon: this.hasIcon,
            position: this.position,
            preventDuplicates: this.preventDuplicates,
        };
        const titleContent = title ? ` ${title}` : '';
        this.toastrService.show (body, `${titleContent}`, config);
    }

}
