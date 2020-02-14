import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import { HttpCustormClient } from '../providers/HttpClient';
import { ServiceConfig } from '../providers/service.config';

@Component({
    selector: 'ngx-pages',
    styleUrls: [ 'pages.component.scss' ],
    template: `
        <ngx-sample-layout>
            <nb-menu [items]="menu"></nb-menu>
            <router-outlet></router-outlet>
        </ngx-sample-layout>
    `,
})
export class PagesComponent implements OnInit {
    menuList = MENU_ITEMS;
    // menu: Array<any> = [];
    menu = MENU_ITEMS;

    constructor ( private http: HttpCustormClient, ) {

    }

    ngOnInit () {
        // this.getMentJsonq();
        this.getMentJson();
    }

    getMentJson (): any {
        this.http.get(ServiceConfig.GETUSERINFO, ( res ) => {
            console.info(res);
            if ( res.code === 10000 ) {
                for ( let list of this.menu ) {
                    for ( let item of res.data.resources ) {
                        if ( list.data.id === Number(item) ) {
                            list.hidden = false;
                            return
                        }
                        else {
                            list.hidden = true;
                        }
                    }
                    for ( let item of list.children ) {
                        for ( let itemch of res.data.resources ) {
                            if ( item.data.id === Number(itemch) ) {
                                item.hidden = false;
                                return
                            }
                            else {
                                item.hidden = true;
                            }
                        }
                    }
                }
            }
        })
    }


    getMentJsonq (): void {
        this.http.getJson('./././././assets/json/menu.json', ( res ) => {
            for ( let item of res ) {
                for ( let list of this.menuList ) {
                    if ( item.data.id === list.data.id ) {
                        this.menu.push(list);
                    }
                }
            }
        })
    }

}
