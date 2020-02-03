import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'roleNamePipe' })
export class RolePipe implements PipeTransform {

    transform ( value: string ) {
        let role;
        switch ( value ) {
            case '1':
                role = '运营人员';
                break;
            case '2':
                role = '代理商';
                break;
            case '3':
                role = '财务';
                break;
            default:
                role = '运营人员';
        }
        return role;
    }
}
