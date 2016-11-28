import { Component, Input } from '@angular/core';
import { PageDataSource } from '../../common/page-data-source';

const PAGE_SIZES = [20, 50, 100];
const DEFAULT_PAGE_SIZE = 50;
const DEFAULT_PAGINATION_SIZE = 16;

const template = require('./page-table.component.html');

interface GridColumn {
  title?: string;
  field?: string;
  sortable?: string;
  sort?: string;
}

type GridSchema = GridColumn[];

@Component({
  selector: 'cc-page-table',
  template: template
})
export class PageTableComponent {
  @Input() schema: GridSchema;
  @Input() source: PageDataSource<any>;

  constructor() {
  }
}
