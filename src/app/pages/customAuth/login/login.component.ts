import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { HttpCustormClient } from '../../../providers/HttpClient';
import { ServiceConfig } from '../../../providers/service.config';
import { Router } from '@angular/router';
import { ConfigService } from "../../../providers/configService";
import { Toastrervice } from "../../../providers/toastrService";

@Component({
    selector: 'ngx-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html',
})

export class LoginComponent implements AfterViewInit, OnInit {
    @ViewChild('loginDiv') loginDiv: ElementRef;
    username: string = '13072923459';
    password: string = '923459';
    configInfo: Object;
    errInfo: string = '';
    loading: boolean = false;
    loadingText: string = '正在登录...';

    constructor ( private http: HttpCustormClient,
                  private configService: ConfigService,
                  private router: Router,
                  private toastr: Toastrervice,
                  private renderer2: Renderer2 ) {
        //监听浏览器宽度的改变
        const self = this;
        window.onresize = function () {
            self.renderer2.setStyle(self.loginDiv.nativeElement, 'height', window.innerHeight + 'px');
        };
    }

    ngOnInit () {
        this.configInfo = this.configService.getTitleInfo;
    }

    ngAfterViewInit () {
        this.renderer2.setStyle(this.loginDiv.nativeElement, 'height', window.innerHeight + 'px');
    }

    // 提交登录
    loginSubmit () {
        this.loading = true;
        this.http.post(ServiceConfig.LOGIN, {
            username: this.username,
            password: this.password
        }, ( res ) => {
            this.loading = false;
            if ( res.code === 10000 ) {
                this.router.navigate([ '/pages/authority/authority-user' ]);
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem('token', res.data.token);
            }
            else {
                this.errInfo = res.message;
            }
        });
        setTimeout(() => {
            this.loading = false;
        },5000)
    }

    // enter按键事件
    onEnter () {
        this.loginSubmit();
    }
}
