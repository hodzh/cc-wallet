import { Component, ViewChild, Input } from '@angular/core';
import { ModalOptions, modalConfigDefaults } from './modal-options';
import { ModalDirective } from './modal.directive';
import { ComponentsHelper } from './helper';

const template = require('./modal.component.html');

@Component({
  selector: 'cc-modal',
  providers: [],
  viewProviders: [{provide: ComponentsHelper, useClass: ComponentsHelper}],
  directives: [
    ModalDirective
  ],
  template: template
})
export class ModalComponent {
  @Input() public config: ModalOptions = modalConfigDefaults;
  @ViewChild('childModal') childModal: ModalDirective;

  public constructor() {
  }

  public show() {
    this.childModal.show();
  }

  public hide() {
    this.childModal.hide();
  }
}
