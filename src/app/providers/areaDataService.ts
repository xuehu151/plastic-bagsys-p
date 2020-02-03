import { Injectable } from '@angular/core';
import { HttpCustormClient } from '../providers/HttpClient';
import { ServiceConfig } from '../providers/service.config';

@Injectable()
export class AreaDataService {
    areaData = {
        proviceData: [],
        cityArray: []
    };

    constructor ( private http: HttpCustormClient, ) {
    }

    getAreaInfo () {
        this.http.getJson('././././assets/json/city1.json', res => {
            res.filter(item => {
                if ( !item.parentId ) {
                    this.areaData.proviceData.push(item);
                }
                else if ( item.parentId ) {
                    this.areaData.cityArray.push(item);
                }
            });
        });
        return this.areaData;
    }

    getGoodsList () {
        let goodsList = [];
        this.http.get(ServiceConfig.GOODLIST, ( res ) => {
            if ( res.code === 10000 ) {
                goodsList.push(...res.data);
            }
        });
        return goodsList;
    }


}


@Injectable()
export class TrimService {

    constructor ( ) {
    }

    trim(s){
        if(typeof s === 'string'){
            return s.replace(/(^\s*)|(\s*$)/g, "");
        }
    }



}


