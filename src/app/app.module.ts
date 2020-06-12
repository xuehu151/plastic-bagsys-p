import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomAuthComponent } from "./pages/customAuth/customAuth.component";
import { HttpCustormClient } from "./providers/HttpClient";
import { ConfigService } from "./providers/configService";
import { Toastrervice } from "./providers/toastrService";
import { AreaDataService, TrimService } from "./providers/areaDataService";
import { FloatNumberService } from './providers/floatNumberService';
import { ToastrModule } from "ngx-toastr";

@NgModule({
    declarations: [
        AppComponent,
        CustomAuthComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,

        NgbModule.forRoot(),
        ThemeModule.forRoot(),
        ToastrModule.forRoot(),
    ],
    exports: [
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        HttpCustormClient,
        ConfigService,
        Title,
        Toastrervice,
        AreaDataService,
        TrimService,
        FloatNumberService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
