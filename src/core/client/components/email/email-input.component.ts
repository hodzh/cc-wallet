import { Component, Input, forwardRef, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const EMAIL_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => EmailInputComponent),
    multi: true
  });

const styles = require('./email-input.component.scss');
const template = require('./email-input.component.html');

@Component({
  selector: 'cc-email-input',
  styles: [styles],
  template: template,
  providers: [EMAIL_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class EmailInputComponent implements ControlValueAccessor {
  @Input() public name: string;

  private _value;

  constructor() {
  }

  private _onTouchedCallback: () => void = () => {
  };

  private _onChangeCallback: (_: any) => void = (_: any) => {
  };

  //get accessor
  get value(): any {
    return this._value;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this._onChangeCallback(v);
    }
  }

  //Set touched on blur
  onTouched() {
    this._onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    this._value = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }
}
