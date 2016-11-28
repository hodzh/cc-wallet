import { Component } from '@angular/core';
import { Auth } from '../../auth';
import { LayoutModule } from '../module';

const template = require('./navbar.component.html');

@Component({
  selector: 'cc-navbar',
  template: template
})
export class NavbarComponent {
  public menu = LayoutModule.MainMenu;
  public isCollapsed: boolean = true;

  constructor(private auth: Auth) {
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn;
  }

  hasRole(role: string) {
    return this.auth.hasRole(role);
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  logout($event) {
    $event.preventDefault();
    return this.auth.signOut();
  }
}
