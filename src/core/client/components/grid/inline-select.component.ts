import {Component, Output, EventEmitter, ViewChild, Renderer, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

const template = require('./inline-select.component.html');
const styles = require('./inline-select.component.scss');

@Component({
  selector: 'cc-inline-select',
  providers: [],
  template,
  styles: [styles]
})
export class InlineSelectComponent {
  @ViewChild('inlineEditControl') inlineEditControl;
  @Output() public onSave:EventEmitter<any> = new EventEmitter<any>();
  @Input() public value: any;
  @Input() public options: any;
  @Output() public valueChange:EventEmitter<any> = new EventEmitter<any>();

  private preValue: any;
  private editing: boolean = false;

  constructor(builder: FormBuilder, private renderer:Renderer,
  ) {
  }

  edit(){
    this.preValue = this.value;
    this.editing = true;

    setTimeout( () => this.renderer.invokeElementMethod(
      this.inlineEditControl.nativeElement, 'focus', []));
  }

  onSubmit(){
    this.onSave.emit(this.value);
    this.editing = false;
  }

  cancel(){
    this.valueChange.emit(this.preValue);
    this.editing = false;
  }

}
