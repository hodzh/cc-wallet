import { Component } from '@angular/core';
import { ADMIN_CURRENCY_LIST_SCHEMA } from './currency-list-schema';
import { AdminCurrencyDataSource } from './currency-data-source';

//const styles   = require('./currency-list.component.scss');
const template = require('./currency-list.component.html');

@Component({
  template: template,
  //styles: [styles],
  providers: [AdminCurrencyDataSource]
})
export class AdminCurrencyListComponent {
  public schema = ADMIN_CURRENCY_LIST_SCHEMA;

  constructor(public source: AdminCurrencyDataSource) {
    this.source.read();
  }
}
