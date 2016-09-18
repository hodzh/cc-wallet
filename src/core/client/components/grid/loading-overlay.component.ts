import { Component, Input } from "@angular/core";

const styles = require('./loading-overlay.component.scss');
const template = require('./loading-overlay.component.html');

@Component({
  selector: 'cc-loading-overlay',
  template: template,
  styles: [styles]
})
export class LoadingOverlayComponent {
  @Input() active: boolean;

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    //$('.table-loading-overlay').css('height', $('#' + divID).height() + 'px');
    //$('.table-loading-inner').css('padding-top', ($('#' + divID).height() / 2) + 'px');
  }
}
