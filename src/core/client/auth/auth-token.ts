import { EventEmitter, Injectable } from '@angular/core';
//import { tokenNotExpired } from "angular2-jwt/angular2-jwt";

const TOKEN_KEY = 'id_token';
const REFRESH_KEY = 'refresh_token';

@Injectable()
export class AuthToken {
  public tokenChange: EventEmitter<string>
    = new EventEmitter<string>();

  constructor() {
  }

  public get token() {
    return localStorage.getItem(TOKEN_KEY);
  }

  public set token(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    this.tokenChange.emit(this.token);
  }

  public get refreshToken() {
    return localStorage.getItem(REFRESH_KEY);
  }

  public set refreshToken(token: string) {
    localStorage.setItem(REFRESH_KEY, token);
  }

  public reset() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    this.tokenChange.emit(this.token);
  }

  public isExpired() {
    // todo check expiration
    return false;
  }
}
