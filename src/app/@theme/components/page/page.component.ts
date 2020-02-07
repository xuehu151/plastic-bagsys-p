import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'ng-page',
    styleUrls: ['./page.component.scss'],
    templateUrl: './page.component.html'
})

export class PageComponent implements OnChanges {
    @Input() totalPage: number;
    @Input() page: number;
    @Input() maxSize: number;
    @Input() collectionSize: number;
    @Input() pageSize: number;
    @Output() changePage = new EventEmitter<number>();
    start: number;
    end: number;
    pages: any[];
    leftOffset: number;
    rightOffset: number;
    searchPage: number = 1;

    constructor () {
    }

    pageChange ( pageNum ) {
        this.page = pageNum;
        this.changePage.emit(pageNum);
        this.initPageList();
    }

    goPrevious ( pageNum ) {
        console.log(pageNum);
        if ( pageNum >= 1 && pageNum !== this.page ) {
            this.pageChange(pageNum);
        }
        else {
            return false;
        }
    }

    goNext ( pageNum ) {
        if ( pageNum <= this.totalPage && pageNum !== this.page ) {
            this.pageChange(pageNum);
        }
        else {
            return false;
        }
    }

    ngOnChanges () {
        this.initPageList()
    }

    initPageList () {
        this.pages = [];
        this.start = 0;
        this.end = this.totalPage;

        this.leftOffset = Math.floor(this.maxSize / 2);
        this.rightOffset = (this.maxSize % 2) == 0 ? this.leftOffset - 1 : this.leftOffset;
        if ( this.page <= this.leftOffset ) {
            this.end = this.maxSize;
        }
        else if ( this.totalPage - this.page < this.leftOffset ) {
            this.start = this.totalPage - this.maxSize;
        }
        else {
            this.start = this.page - this.leftOffset - 1;
            this.end = this.page + this.rightOffset;
        }
        for ( let i = 1; i <= this.totalPage; i++ ) {
            this.pages.push(i);
        }
        if ( this.start > -1 ) {
            this.pages = this.pages.slice(this.start, this.end);
        }
    }

    jump () {
        if ( !isNaN(this.searchPage) && this.searchPage <= this.totalPage && this.searchPage >= 1 ) {
            this.pageChange(this.searchPage);
        }
    }

    onEnter () {
        this.jump();
    }
}
