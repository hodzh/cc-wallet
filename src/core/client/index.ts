import 'rxjs/add/operator/last';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';

// inject boot
import '../../../src/wallet/client/user/root-providers.boot.ts';
import '../../../src/wallet/client/user/main-menu.boot.ts';
import '../../../src/wallet/client/user/home-page.boot.ts';
import '../../../src/wallet/client/currency/provider.boot.ts';
import '../../../src/wallet/client/admin/routes.boot.ts';
import '../../../src/wallet/client/admin/providers.boot.ts';
import '../../../src/wallet/client/admin/main-menu.boot.ts';
import '../../../src/vp/client/admin/main-menu.boot.ts';
import '../../../src/vp/client/admin/routes.boot.ts';
import '../../../src/vp/client/user/main-menu.boot.ts';
import '../../../src/vp/client/user/routes.boot.ts';
import '../../../src/paygates/client/admin/routes.boot.ts';
import '../../../src/paygates/client/admin/main-menu.boot.ts';
import '../../../src/paygates-bitcoin/client/user/root-providers.boot.ts';
import '../../../src/paygates-bitcoin/client/user/event-listener.boot.ts';
import '../../../src/paygates-bitcoin/client/user/account-list-actions.boot.ts';
import '../../../src/paygates-bitcoin/client/admin/routes.boot.ts';
import '../../../src/paygates-bitcoin/client/admin/main-menu.boot.ts';
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
