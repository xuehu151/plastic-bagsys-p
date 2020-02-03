import { Component } from '@angular/core';
import { NbSpinnerService } from '@nebular/theme/services/spinner.service';

@Component({
    selector: 'ngx-customauth',
    template: `
        <router-outlet></router-outlet>
    `,
})

export class CustomAuthComponent {
    constructor ( spinnerService: NbSpinnerService ) {
        spinnerService.load();
    }
}
