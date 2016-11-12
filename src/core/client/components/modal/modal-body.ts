import { Component } from '@angular/core';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'modal-body',
  template: `
        <div class="modal-body">
            <ng-content></ng-content>
        </div>
    `
})
export class ModalBodyComponent {
  constructor(private modal: ModalComponent) {
  }
}
