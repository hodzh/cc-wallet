import {
  Component,
  Output,
  Provider,
  forwardRef,
  EventEmitter,
  ElementRef,
  ViewChild,
  Renderer,
  OnInit
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from "@angular/forms";

const template = require('./inline-edit.component.html');

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => InlineEditComponent),
    multi: true
  });

@Component({
  selector: 'cc-inline-edit',
  providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR],
  template: template
})
export class InlineEditComponent implements ControlValueAccessor {
  @ViewChild('inlineEditControl') inlineEditControl;
  @Output() public onSave: EventEmitter<any> = new EventEmitter();

  private _value: string = '';
  private preValue: string = '';
  private editing: boolean = false;

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  get value(): any {
    return this._value;
  };

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  constructor(element: ElementRef, private _renderer: Renderer) {
  }

  writeValue(value: any) {
    this._value = value;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  };

  edit(value) {
    this.preValue = value;
    this.editing = true;

    setTimeout(_ => this._renderer.invokeElementMethod(this.inlineEditControl.nativeElement, 'focus', []));
  }

  onSubmit(value) {
    this.onSave.emit(value);
    this.editing = false;
  }

  cancel(value: any) {
    this._value = this.preValue;
    this.editing = false;
  }

}
