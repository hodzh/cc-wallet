import { Component, Input } from "@angular/core";
import { DataSource } from "../../common/data-source";
import { TableSchema, TableColumn } from "./table-scheme";

const styles = require('./table.component.scss');
const template = require('./table.component.html');

@Component({
  selector: 'cc-table',
  template,
  styles: [styles]
})
export class TableComponent {
  @Input() schema: TableSchema;
  @Input() source: DataSource<any>;

  constructor() {
  }

  public getCellValue(row, column: TableColumn): any {
    return column.field.split('.').reduce(
      (prev, field) => prev ? prev[field] : '', row);
  }

  public setCellValue(row, column: TableColumn, value): void {
    let fields = column.field.split('.');
    let lastField = fields.pop();
    return fields.reduce(
      (prev, field) =>
      prev[field] || (prev[field] = {}),
      row)[lastField] = value;
  }

  public getCellText(row, column: TableColumn): any {
    let value = this.getCellValue(row, column);
    if (!column.converter) {
      return value;
    }
    value = column.converter.fromValue(value, row);
    return value;
  }

  public setCellText(row, column: TableColumn, text: string): void {
    this.setCellValue(row, column,
      this.textToValue(row, column, text));
  }

  public saveEdit(row, column: TableColumn, text: string) {
    let data = {};
    let value = this.textToValue(row, column, text);
    this.setCellValue(data, column, value);
    this.source.update(row, data);
  }

  private textToValue(row, column: TableColumn, text: string): any {
    let value = column.converter ?
      column.converter.toValue(text, row) : text;
    return value;
  }

  headerClick(column: TableColumn) {
    if (!column.sortable) {
      return;
    }
    let modes;
    switch (column.sortable) {
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