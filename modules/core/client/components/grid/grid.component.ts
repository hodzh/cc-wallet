import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild
} from '@angular/core';

import { PaginationComponent } from './pagination.component';
import { PageSizeComponent } from './page-size.component';
import { LoadingOverlayComponent } from './loading-overlay.component';
import { DataSource } from '../../common/data-source';

const PAGE_SIZES = [20, 50, 100];
const DEFAULT_PAGE_SIZE = 50;
const DEFAULT_PAGINATION_SIZE = 16;

const template = require('./grid.component.html');

interface GridColumn {
  title?: string,
  field?: string,
  sortable?: string,
  sort?: string
}

type GridSchema = GridColumn[];

@Component({
  selector: 'cc-grid',
  template: template,
  directives: [
    PaginationComponent,
    PageSizeComponent,
    LoadingOverlayComponent
  ]
})
export class GridComponent {
  @Input() schema: GridSchema;
  @Input() source: DataSource;

  constructor() {
  }

  remove(row) {
    this.source.remove(row);
  }

  public getCellValue(row, column): any {
    return row[column.field];
  }

  public setCellValue(row, column, value): void {
    return row[column.field] = value;
  }

  ngOnInit() {
    //this.source.currentPage.next(1);
  }

  ngAfterViewInit() {
  }

  headerClick(column: GridColumn) {
    if (!column.sortable) {
      return;
    }
    let modes;
    switch(column.sortable) {
      case 'none':
        return;
      case 'asc':
        modes = ['no', 'asc'];
        break;
      case 'desc':
        modes = ['no', 'desc'];
        break;
      case 'both':
        modes = ['no', 'asc', 'desc'];
        break;
      default:
        console.error('unknown sortable mode');
        return;
    }
    let index = modes.indexOf(column.sort);
    if (index === -1) {
      index = 1;
    } else {
      ++index;
      index %= modes.length;
    }
    column.sort = modes[index];
  }
}
