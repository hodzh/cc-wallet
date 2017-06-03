import { callback2promise } from '../polyfills/promisify';
var request = require('request');

export class AuthRequest {
  private options: any;
  private authToken: string;

  constructor(options) {
    this.options = options;
  }

  async auth() {
    if (this.authToken) {
      return;
    }
    let result = await callback2promise(request.bind(
      request, this.options.auth.url, {
        form: {
          email: this.options.auth.email,
          password: this.options.auth.password,
        },
        method: 'POST',
      }));
    if (result.statusCode !== 401) {
      this.authToken = JSON.parse(result.body).token;
      return;
    }
    return Promise.reject(new Error('bad authToken'));
  }

  async request(data) {
    await this.auth();
    let url = this.options.url + data.url;
    let result: any = await callback2promise(request.bind(request, url, {
      form: data.form || {},
      method: data.method || 'GET',
      headers: {
        Authorization: 'Bearer ' + this.authToken,
      }
    }));
    if (!result) {
      return Promise.reject(new Error('bad request result'));
    }
    if (result.statusCode === 401) {
      // auth error
      this.authToken = null;
      return await request(data);
    }
    if (result.statusCode !== 200) {
      return Promise.reject(new Error('bad request status'));
    }
    return JSON.parse(result.body);
  }
}
