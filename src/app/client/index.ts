import '../../core/client/before-start';

// inject boot
import '../../../src/dev/client/main-menu.boot.ts';
import '../../../src/wallet/client/admin/main-menu.boot.ts';
import '../../../src/wallet/client/user/home-page.boot.ts';
import '../../../src/wallet/client/user/main-menu.boot.ts';
import '../../../src/vp/client/admin/main-menu.boot.ts';
import '../../../src/vp/client/user/main-menu.boot.ts';
import '../../../src/paygates/client/admin/main-menu.boot.ts';
import '../../../src/paygates-bitcoin/client/admin/main-menu.boot.ts';
import '../../../src/paygates-bitcoin/client/user/account-list-actions.boot.ts';
import '../../../src/paygates-bitcoin/client/user/event-listener.boot.ts';
// end inject

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {AppModule} from "./module";

platformBrowserDynamic().bootstrapModule(AppModule);
