import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { Auth } from "./auth";

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router,
              private auth: Auth) {
  }

  canActivate() {
    if (!this.auth.isLoggedIn) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
