import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'ng-table',
    styleUrls: [ './table.component.scss' ],
    templateUrl: './table.component.html'
})

export class TableComponent implements OnInit {
    @Input() tableTitle: Array<any> = [];
    @Input() tableList: Array<any> = [];
    @Input() signatureIdArr: Array<any> = [];
    @Output() sortEvent = new EventEmitter<string>();
    @Output() selectAllData = new EventEmitter<boolean>();
    @Output() selectOneData = new EventEmitter<any>();
    @Output() editItem = new EventEmitter<number>();
    @Output() operateItem = new EventEmitter<number>();
    // @Output() changePage = new EventEmitter<number>();

    sortArg: string;
    isSort: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    clickSort(): void {
        this.isSort = !this.isSort;
        this.sortArg = this.isSort ? 'desc' : 'asc';
        this.sortEvent.emit(this.sortArg);
    }

    selectAll( $event ): void {
        this.selectAllData.emit($event.target.checked);
    }

    selectOne( $event ): void {
        this.selectOneData.emit({
            checked: $event.target.checked,
            sid: $event.target.id
        });
    }

    startEdit(item): void{
        this.editItem.emit(item);
    }

    operate(item): void{
        this.operateItem.emit(item);
    }

}
