export class SignupForm {
  recaptcha: boolean;

  constructor() {
    this.recaptcha = true;
  }
}

export const signupForm = new SignupForm();
