import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MAIN_MENU } from '../../common';
import { Auth } from '../../auth';
import { ActiveNavItems } from './active-nav-items.pipe';

//const styles = require('./navbar.component.scss');
const template = require('./navbar.component.html');

@Component({
  selector: 'cc-navbar',
  template: template,
  //styles: [ styles ],
  directives: [
    ROUTER_DIRECTIVES
  ],
  providers: [],
  pipes: [ActiveNavItems]
})
export class NavbarComponent {
  public menu = MAIN_MENU;
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
    return this.auth.logout();
  }
}
