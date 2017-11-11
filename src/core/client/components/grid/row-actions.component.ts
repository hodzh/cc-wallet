import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataSource } from '../../common/data-source';
import { TableRowAction } from './table-row-action';

const template = require('./row-actions.component.html');

@Component({
  selector: 'cc-table-row-actions',
  template: template
})
export class RowActionsComponent {
  @Input() source: DataSource<any>;
  @Input() row: any;
  @Input() actions: TableRowAction[];
  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  remove() {
    this.source.remove(this.row);
  }

  refresh() {
    this.source.refresh(this.row);
  }

  onAction(action) {
    // console.log(action);
    this.action.emit({
      target: this.row,
      action,
    });
  }

  getBind(action: TableRowAction) {
    return action.bind ? {[action.bind]: this.row} : null;
  }

  constructor() {
  }
}
