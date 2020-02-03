import { Injectable } from '@angular/core';

@Injectable()
export class FloatNumberService {

    constructor () {
    }

    floatNumber ( value ) {
        let sumMoney;
        let val = value.toString().split(".");
        if ( val.length === 1 ) {
            sumMoney = value.toString() + ".0000";
        }
        if ( val.length > 1 ) {
            if ( val[ 1 ].length === 1 ) {
                sumMoney = value.toString() + "000";
            }
            else if ( val[ 1 ].length === 2 ) {
                sumMoney = value.toString() + "00";
            }
            else if ( val[ 1 ].length === 3 ) {
                sumMoney = value.toString() + "0";
            }
            else {
                sumMoney = value.toString();
            }
        }
        return sumMoney;
    }

}



