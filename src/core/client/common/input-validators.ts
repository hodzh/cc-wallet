import { AbstractControl, FormGroup } from '@angular/forms';
import { EMAIL_PATTERN } from '../../common/validate';

export class InputValidators {

  static emailFormat(control: AbstractControl): {[s: string]: boolean} {
    if (control.value !== '' &&
      (control.value.length <= 5 || !EMAIL_PATTERN.test(control.value))) {
      return {
        emailFormat: true
      };
    }

    return null;
  }

  static needsCapitalLetter(ctrl: AbstractControl): {[s: string]: boolean} {
    if (!ctrl.value.match(/[A-Z]/)) {
      return {
        needsCapitalLetter: true
      };
    }
    return null;
  }

  static needsLowerLetter(ctrl: AbstractControl): {[s: string]: boolean} {
    if (!ctrl.value.match(/[a-z]/)) {
      return {
        needsLowerLetter: true
      };
    }
    return null;
  }

  static needsNumber(ctrl: AbstractControl): {[s: string]: boolean} {
    if (!ctrl.value.match(/\d/)) {
      return {
        needsNumber: true
      };
    }
    return null;
  }

  static needsSpecialCharacter(ctrl: AbstractControl): {[s: string]: boolean} {
    if (!ctrl.value.match(/[^a-zA-Z\d]/)) {
      return {
        needsSpecialCharacter: true
      };
    }
    return null;
  }

  static areEqual(group: FormGroup): {[s: string]: boolean} {
    let val;
    let valid = true;
    for (let name in group.controls) {
      if (val === undefined) {
        val = group.controls[name].value;
      } else {
        if (val !== group.controls[name].value) {
          valid = false;
          break;
        }
      }
    }
    if (valid) {
      return null;
    }
    return {
      areEqual: true
    };
  }
}
