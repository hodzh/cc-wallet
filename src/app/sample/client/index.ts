import '../../../core/client/setup';
import '../../../paygates-bitcoin/client/user/account-list-actions.boot';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './module';
import {enableProdMode} from '@angular/core';

require('!file-loader?name=../[name].[ext]!./favicon.ico');
require('!file-loader?name=../[name].[ext]!./favicon.png');

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
