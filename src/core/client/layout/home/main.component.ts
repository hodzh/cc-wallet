import { Component } from "@angular/core";
import { Auth } from "../../auth/auth";

const template = require('./main.component.html');

@Component({
  template
})
export class MainComponent {

  constructor(private auth: Auth) {
  }

  public hasRole(role: string): boolean {
    return this.auth.hasRole(role);
  }
}
