import { Component, Input } from '@angular/core';
import { AbstractForm } from '../../../../core/client/common/abstract-form';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataSource } from '../../common/data-source';
import { TableSchema } from './table-scheme';

const styles = require('./create-form.component.scss');
const template = require('./create-form.component.html');

@Component({
  template,
  styles: [styles],
  selector: 'cc-create-form',
})
export class CreateFormComponent extends AbstractForm {
  @Input() schema: TableSchema;
  @Input() source: DataSource<any>;

  constructor(
    private builder: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    let controlsConfig: any = {};
    this.schema.forEach(column => {
      if (!column.field || !column.type) {
        return;
      }
      const defaultValue = '';
      controlsConfig[column.field] = [defaultValue, Validators.required];
    });
    this.form = this.builder.group(controlsConfig);
  }

  ngOnDestroy() {
  }

  protected onSubmit(): Observable<any> {
    let params = this.form.value;
    return this.source.create(params);
  }
}
