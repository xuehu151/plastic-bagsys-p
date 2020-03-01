import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'runStatus' })
export class RunStatusPipe implements PipeTransform {

    transform ( value: number ) {
        let runStatus;
        switch ( value ) {
            case 1:
                runStatus = '正常';
                break;
            case 2:
                runStatus = '异常';
                break;
            case 3:
                runStatus = '离线';
                break;
            default:
                runStatus = '未知';
        }
        return runStatus;
    }
}
