import { Component, Input, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

const styles = require('./password-input.component.scss');
const template = require('./password-input.component.html');

@Component({
  selector: 'cc-password-input',
  template: template,
  styles: [styles],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PasswordInputComponent),
    multi: true
  }]
})
export class PasswordInputComponent {
  @Input() public name: string;
  @Input() public placeholderHidden: string;
  @Input() public placeholderVisible: string;

  private states = {
    hidden: {
      type: 'password',
      placeholder: 'Password',
      show: false,
      tooltipText: 'Show password'
    },
    visible: {
      type: 'text',
      placeholder: 'Visible Password',
      show: true,
      tooltipText: 'Hide password'
    }
  };

  private inputState;
  private _value;

  constructor() {
    this.inputState = this.states.hidden;
  }

  ngOnInit() {
    if (this.placeholderHidden) {
      this.states.hidden.placeholder = this.placeholderHidden;
    }
    if (this.placeholderVisible) {
      this.states.visible.placeholder = this.placeholderVisible;
    }
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

  togglePasswordVisible() {
    this.inputState = this.states.hidden === this.inputState ?
      this.states.visible : this.states.hidden;
  }
}
