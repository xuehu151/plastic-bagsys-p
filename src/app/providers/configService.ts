import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    private data: Object;

    constructor () {
    }

    set setTitleInfo ( data ) {
        this.data = data
    }

    get getTitleInfo () {
        return this.data;
    }

}
