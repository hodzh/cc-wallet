import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Auth } from './auth';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private router: Router,
              private auth: Auth) {
  }

  canActivate() {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    if (this.auth.hasRole('user')) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
