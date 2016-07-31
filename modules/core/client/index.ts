import 'rxjs/add/operator/last';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';

// inject boot
import '../../../modules/wallet/client/admin/home-page.boot.ts';
import '../../../modules/wallet/client/user/currency/provider.boot.ts';
import '../../../modules/wallet/client/user/main-menu.boot.ts';
import '../../../modules/wallet/client/user/home-page.boot.ts';
import '../../../modules/wallet/client/admin/routes.boot.ts';
import '../../../modules/wallet/client/admin/main-menu.boot.ts';
import '../../../modules/vp/client/admin/main-menu.boot.ts';
import '../../../modules/paygates/client/admin/routes.boot.ts';
import '../../../modules/paygates/client/user/account-actions.boot.ts';
import '../../../modules/paygates/client/admin/main-menu.boot.ts';
import '../../../modules/paygates-bitcoin/client/admin/routes.boot.ts';
import '../../../modules/paygates-bitcoin/client/admin/main-menu.boot.ts';
// end inject

import { App } from './app';
import { routes } from './app.routes';
import { AUTH_PROVIDERS } from './auth';
import { ROOT_PROVIDERS } from './common/root-providers';

//require('file?name=../css/[name].[ext]?[hash]!bootstrap/dist/css/bootstrap.min.css');
//require('file?name=../css/[name].[ext]?[hash]!bootstrap/dist/css/bootstrap.min.css.map');
//require('file?name=../[name].[ext]?[hash]!../modules/core/client/index.html');

bootstrap(
  <any>App,
  [
    disableDeprecatedForms(),
    provideForms(),
    provideRouter(routes),
    HTTP_PROVIDERS,
    ...AUTH_PROVIDERS,
    ...ROOT_PROVIDERS
  ]
);
