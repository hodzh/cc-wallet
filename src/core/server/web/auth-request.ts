import { callback2promise } from '../util/promisify';
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
    throw new Error('bad authToken');
  }

  async request(data) {
    await this.auth();
    let url = this.options.url + data.url;
    let result: any = await callback2promise(request.bind(request, url, {
      body: data.body || {},
      json: true,
      method: data.method || 'GET',
      headers: {
        Authorization: 'Bearer ' + this.authToken,
      }
    }));
    if (!result || !result.statusCode) {
      throw new Error('bad request result');
    }
    if (result.statusCode === 401) {
      // auth error
      this.authToken = null;
      return await request(data);
    }
    if (result.statusCode === 404) {
      throw new Error('not found');
    }
    if (result.statusCode >= 400) {
      throw new Error('bad request status');
    }
    return result.body;
  }
}
