import { Injectable } from '@angular/core';
import { AuthToken } from './auth-token';
import { Observable } from 'rxjs/Observable';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

@Injectable()
export class AuthHttp {
  constructor(
    private http: HttpClient,
    private authToken: AuthToken,
  ) {
  }

  get<T>(url: string, params?: any): Observable<T> {
    return this.request<T>('get', url, {params});
  }

  post<T>(url: string, body?: any, params?: any): Observable<T> {
    return this.request<T>('post', url, {body, params});
  }

  put<T>(url: string, body?: any, params?: any): Observable<T> {
    return this.request<T>('put', url, {body, params});
  }

  delete<T>(url: string, params?: any): Observable<T> {
    return this.request<T>('delete', url, {params});
  }

  private request<T>(method: string, url: string, options: {
    body?: any;
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    withCredentials?: boolean;
  }): Observable<T> {

    let request: any;

    if (this.authToken.isExpired()) {
      return new Observable<T>((obs: any) => {
        obs.error(new Error('No JWT present'));
      });
    }
    let authOptions = Object.assign({
      observe: 'body',
      // responseType: 'text',
    }, options);
    authOptions.headers = this.createHeader();
    request = this.http.request<T>(method, url, authOptions)
      .catch(
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            if (this.authToken.refreshToken) {
              return this.refresh()
                .flatMap((refreshResult: any): Observable<any> => {
                  this.authToken.token = refreshResult.token;
                  authOptions.headers = this.createHeader();
                  return this.http.request(url, authOptions);
                })
                .catch((error: HttpErrorResponse) => {
                  if (error.status === 401) {
                    this.authToken.reset();
                  }
                  return Observable.throw(error);
                });
            }
            this.authToken.reset();
            return Observable.throw(error);
          }
          return Observable.throw(error);
        },
      )
    ;

    return request;
  }

  private refresh(): Observable<any> {
    let body = {
      refreshToken: this.authToken.refreshToken,
    };
    let request = this.http.post(
      '/auth/local/refresh',
      body, {
        headers: this.createHeader(),
      },
    );
    return request;
  }

  private createHeader(): {
    [header: string]: string | string[];
  } {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +this.authToken.token,
    };
    return headers;
  }
}
