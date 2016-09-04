import { Type } from '@angular/core';

export interface TableRowAction {
  type: string;
  factory?: Type;
  bind?: string;
}
