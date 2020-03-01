import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shopStandard' })
export class StandardPipe implements PipeTransform {

    transform ( value: number ) {
        let standard;
        switch ( value ) {
            case 1:
                standard = '小袋子';
                break;
            case 2:
                standard = '大袋子';
                break;
            default:
                standard = '未知';
        }
        return standard;
    }
}
