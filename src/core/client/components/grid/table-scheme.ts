import { ValueConverter } from './value-converter';
import { TableRowAction } from './table-row-action';
import { Type, PipeTransform } from '@angular/core';

export interface TableColumn {
  title?: string;
  field?: string;
  type?: string;
  sortable?: string;
  sort?: string;
  converter?: ValueConverter;
  actions?: TableRowAction[];
  factory?: Type<any>;
  format?: any;
  pipe?: PipeTransform;
  pipeArgs?: any[];
}

export type TableSchema = TableColumn[];
