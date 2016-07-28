import {
  Component,
  EventEmitter,
  Output,
  Input
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

const template = require('./page-size.component.html');

@Component({
  selector: 'cc-page-size',
  template: template
})
export class PageSizeComponent {
  @Input() set size(value: number) {
    if (this._size === value) {
      return;
    }
    this._size = value;
    this.sizeChange.emit(value);
  }

  get size(): number {
    return this._size;
  }

  @Output() sizeChange: EventEmitter<number> =
    new EventEmitter<number>();

  @Input() public sizes: number[] = [20, 50, 100];

  private _size: number = 50;

  constructor() {
  }

  public setCurrentSize(size) {
    this.size = size;
  }
}
