import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ModalDirective } from "./modal.directive";
import { ModalFooterComponent } from "./modal-footer";
import { ModalBodyComponent } from "./modal-body";
import { ModalHeaderComponent } from "./modal-header";
import { ModalComponent } from "./modal.component";
import { ModalBackdropComponent } from "./modal-backdrop.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalDirective,
    ModalBackdropComponent
  ],
  entryComponents: [
    ModalBackdropComponent
  ],
  exports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalDirective
  ],

  providers: [
  ]
})
export class CoreModalModule {}
