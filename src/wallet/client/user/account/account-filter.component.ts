import { Component, Input } from '@angular/core';
import { FilteredAccountDataSource } from './filtered-account.data-source';

const styles = require('./account-filter.component.scss');
const template = require('./account-filter.component.html');

@Component({
  selector: "cc-account-filter",
  template,
  styles: [styles]
})
export class AccountFilterComponent {
  @Input() public source: FilteredAccountDataSource;

  constructor() {
  }
}
