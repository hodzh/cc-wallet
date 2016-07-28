import { Injectable, EventEmitter } from '@angular/core';
//import { tokenNotExpired } from "angular2-jwt/angular2-jwt";

const TOKEN_KEY = 'id_token';

@Injectable()
export class AuthToken {
  constructor() {
  }

  public get token() {
    return localStorage.getItem(TOKEN_KEY);
  }

  public set token(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    this.tokenChange.emit(this.token);
  }

  public tokenChange: EventEmitter<string>
    = new EventEmitter<string>();

  public reset() {
    localStorage.removeItem(TOKEN_KEY);
    this.tokenChange.emit(this.token);
  }

  public isExpired() {
    return false;
  }
}
