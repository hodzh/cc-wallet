export class LoginForm {
  recaptcha: boolean;

  constructor() {
    this.recaptcha = true;
  }
}

export const loginForm = new LoginForm();
