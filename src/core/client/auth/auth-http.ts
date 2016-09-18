import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptionsArgs, RequestMethod, Response } from "@angular/http";
import { AuthToken } from "./auth-token";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthHttp {
  constructor(private http: Http,
              private authToken: AuthToken) {
  }

  get(url: string, params?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, Object.assign({
      method: RequestMethod.Get
    }, params));
  }

  post(url: string, body?: any, params?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, Object.assign({
      body: body,
      method: RequestMethod.Post
    }, params));
  }

  put(url: string, body?: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, Object.assign({
      body: body,
      method: RequestMethod.Put
    }, options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, Object.assign({
      method: RequestMethod.Delete
    }, options));
  }

  private request(url: string,
                  options: RequestOptionsArgs): Observable<Response> {

    let request: any;

    if (this.authToken.isExpired()) {
      return new Observable<Response>((obs: any) => {
        obs.error(new Error('No JWT present'));
      });
    }
    options.headers = this.createHeader();
    if (typeof options.body !== 'string' &&
      typeof options.body !== 'undefined') {
      options.body = JSON.stringify(options.body);
    }
    request = this.http.request(url, options)
      .catch(
        (error: any, caught: Observable<Response>) => {
          if (error.status === 401) {
            this.authToken.reset();
          }
          return Observable.throw(error);
        }
      );

    return request;
  }

  private createHeader(): Headers {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken.token);
    return headers;
  }
}
