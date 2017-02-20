import '../../../core/client/setup';
import '../../../paygates-bitcoin/client/user/account-list-actions.boot';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './module';
import {enableProdMode} from '@angular/core';

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
