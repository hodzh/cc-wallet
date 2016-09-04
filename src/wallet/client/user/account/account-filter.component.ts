import { Component, Input } from '@angular/core';
import { FilteredAccountDataSource } from './filtered-account.data-source';

const styles   = require('./account-filter.component.scss');
const template = require('./account-filter.component.html');

@Component({
  selector: "cc-account-filter",
  directives: [
  ],
  template,
  styles: [styles],
  providers: [FilteredAccountDataSource]
})
export class AccountFilterComponent {
  @Input() public source: FilteredAccountDataSource;

  constructor(private source: FilteredAccountDataSource) {
    source.read();
  }
}
