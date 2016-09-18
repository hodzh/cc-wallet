import { Component, Input } from "@angular/core";
import { Broadcast } from "../../common/broadcast";
import { DataSource } from "../../common/data-source";
import { TableRowAction } from "./table-row-action";

const template = require('./row-actions.component.html');

@Component({
  selector: 'cc-table-row-actions',
  template: template
})
export class RowActionsComponent {
  @Input() source: DataSource<any>;
  @Input() row: any;
  @Input() actions: TableRowAction[];

  remove() {
    this.source.remove(this.row);
  }

  refresh() {
    this.source.refresh(this.row);
  }

  broadcast(action) {
    console.log(action);
    Broadcast.emit({
      source: this.row,
      action
    });
  }

  getBind(action: TableRowAction) {
    return action.bind ? {[action.bind]: this.row} : null;
  }

  constructor() {
  }
}
