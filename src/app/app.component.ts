/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ConfigService } from "./providers/configService";
import { HttpClient } from "@angular/common/http";

@Component ({
    selector: 'root-app',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

    constructor ( private title: Title,
                  private configService: ConfigService,
                  private http: HttpClient, ) {
    }

    ngOnInit (): void {
        this.setConfigInfo();
    }

    setConfigInfo (): void {
        this.http.get ('./././././assets/json/config.json')
            .subscribe(data => {
                this.title.setTitle(data['title']);
                this.configService.setTitleInfo = data;
            });
    }
}
