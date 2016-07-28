import {
  Injectable,
  Inject
} from '@angular/core';

import {
  Http,
  Headers,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  RequestMethod,
  Response
} from '@angular/http';

import { AuthToken } from './auth-token';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthHttp {
  constructor(private http: Http,
              private authToken: AuthToken) {
  }

  get(url: string, params?: any) {
    return this.request(url, Object.assign({
      method: RequestMethod.Get
    }, params));
  }

  post(url: string, data?: any) {
    return this.request(url, {
      body: data,
      method: RequestMethod.Post
    });
  }

  put(url: string, data?: any) {
    return this.request(url, {
      body: data,
      method: RequestMethod.Put
    });
  }

  del(url: string) {
    let headers = this.createHeader();
    return this.request(url, {
      method: RequestMethod.Delete
    });
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
    request = this.http.request(url, options);
    request.subscribe(
      (response) => {

      },
      (error) => {
        if (error.status === 401) {
          this.authToken.reset();
          return;
        }
        // todo process error
        console.log(error);
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
