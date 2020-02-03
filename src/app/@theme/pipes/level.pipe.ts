import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'levelAgent' })
export class LevelPipe implements PipeTransform {

    transform ( value: number ) {
        let level;
        switch ( value ) {
            case 1:
                level = '一级';
                break;
            case 2:
                level = '二级';
                break;
            default:
                level = '未知';
        }
        return level;
    }
}
