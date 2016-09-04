import { Component, Input } from '@angular/core';
import { PaginationComponent } from './pagination.component';
import { PageSizeComponent } from './page-size.component';
import { LoadingOverlayComponent } from './loading-overlay.component';
import { PageDataSource } from '../../common/page-data-source';
import { DynamicBlock } from '../dynamic-block/dynamic-block.component';
import { TableComponent } from './table.component';

const PAGE_SIZES = [20, 50, 100];
const DEFAULT_PAGE_SIZE = 50;
const DEFAULT_PAGINATION_SIZE = 16;

const template = require('./page-table.component.html');

interface GridColumn {
  title?: string,
  field?: string,
  sortable?: string,
  sort?: string
}

type GridSchema = GridColumn[];

@Component({
  selector: 'cc-page-table',
  template: template,
  directives: [
    PaginationComponent,
    PageSizeComponent,
    LoadingOverlayComponent,
    DynamicBlock,
    TableComponent
  ]
})
export class PageTableComponent {
  @Input() schema: GridSchema;
  @Input() source: PageDataSource<any>;

  constructor() {
  }
}
