import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

export abstract class AbstractForm {
  public errors: string = '';
  public form: FormGroup;
  public submitted: boolean = false;
  public submitPending: boolean = false;

  constructor() {
  }

  public submit() {
    if (this.submitPending) {
      // already submitted
      return;
    }
    this.submitted = true;
    if (!this.form.valid) {
      return;
    }
    this.submitPending = true;
    this.onSubmit()
      .subscribe(
        () => {
          this.submitPending = false;
        },
        (error) => {
          this.displayErrors(error.json());
          this.submitPending = false;
        }
      );
  }

  displayErrors(submitResponse) {
    if (submitResponse.messages) {
      let messages = submitResponse.messages;
      messages.forEach((message) => {
        let control = this.getControl(message.property);
        if (!control) {
          return;
        }
        control.setErrors({
          remote: message.message
        });
      });
    } else {
      this.errors = `${submitResponse.message || 'Unknown error'}`;
    }
  }

  getControl(name: string): AbstractControl {
    return this.findControlByName(this.form.controls, name);
  }

  shouldDisableSubmitButton(): boolean {
    // todo
    return false && (!this.form.valid ||
      this.form.pending ||
      this.submitPending);
  }

  shouldDisplaySubmitProgress() {
    return this.submitPending || this.form.pending;
  }

  protected abstract onSubmit(): Observable<Response>;

  private findControlByName(controls, name: string): AbstractControl {
    let control = controls[name];
    if (control) {
      return control;
    }
    for (const key in controls) {
      let child = controls[key];
      if (child instanceof FormGroup) {
        control = this.findControlByName(child.controls, name);
        if (control) {
          return control;
        }
      }
    }
  }
}
