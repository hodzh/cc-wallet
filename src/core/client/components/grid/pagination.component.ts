import { Component, EventEmitter, Output, Input } from '@angular/core';

const DEFAULT_PAGINATION_SIZE = 16;
const DEFAULT_PAGE_SIZE = 50;

const template = require('./pagination.component.html');

@Component({
  selector: 'cc-pagination',
  template: template
})
export class PaginationComponent {
  @Input() set currentPage(value: number) {
    if (this._currentPage === value) {
      return;
    }
    this._currentPage = value;
    this.makePages();
    this.currentPageChange.emit(value);
  }

  get currentPage(): number {
    return this._currentPage;
  }

  @Output() currentPageChange: EventEmitter<number> =
    new EventEmitter<number>();

  @Input() set pageSize(value: number) {
    this._pageSize = value;
    this.makePages();
  }

  @Input() set totalCount(value: number) {
    this._totalCount = value;
    this.makePages();
  }

  @Input() set size(value: number) {
    this._size = value;
    this.makePages();
  }

  public pages: string[];
  private _currentPage: number;
  private _size: number = DEFAULT_PAGINATION_SIZE;
  private _totalCount: number;
  private _pageSize: number;

  constructor() {
  }

  ngOnChanges() {
    //this.makePages();
  }

  private makePages() {
    //console.log('make pages');
    let count = Math.ceil(this._totalCount / this._pageSize);
    if (count === 0 || isNaN(count)) {
      this.pages = [];
      return;
    }
    if (count <= this._size) {
      this.pages = new Array(count);
      for (let i = 0; i < count; ++i) {
        this.pages[i] = String(i + 1);
      }
      return;
    }

    this.pages = new Array(this._size);
    let pageStart: number;
    let iMin: number;
    let iMax: number;
    let middle = this._size >> 1;
    if (this._currentPage <= middle) {
      pageStart = 1;
      iMin = 0;
      iMax = this._size - 3;
      this.pages[this._size - 2] = '...';
      this.pages[this._size - 1] = String(count);
    } else if (this._currentPage >= count - middle) {
      pageStart = count - this._size + 3;
      iMin = 2;
      iMax = this._size - 1;
      this.pages[1] = '...';
      this.pages[0] = '1';
    } else {
      pageStart = this._currentPage - middle + 3;
      iMin = 2;
      iMax = this._size - 3;
      this.pages[1] = '...';
      this.pages[0] = '1';
      this.pages[this._size - 2] = '...';
      this.pages[this._size - 1] = String(count);
    }

    for (let i = iMin; i <= iMax; ++i, ++pageStart) {
      this.pages[i] = String(pageStart);
    }

  }

  public setCurrentPage(page) {
    var index = parseInt(page);
    if (isNaN(index)) {
      return;
    }
    this.currentPage = index;
  }
}
