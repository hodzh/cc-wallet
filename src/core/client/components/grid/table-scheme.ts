import { ValueConverter } from './value-converter';
import { TableRowAction } from './table-row-action';

export interface TableColumn {
  title?: string,
  field?: string,
  sortable?: string,
  sort?: string,
  converter?: ValueConverter,
  actions?: TableRowAction[]
}

export type TableSchema = TableColumn[];
