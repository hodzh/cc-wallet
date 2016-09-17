import "../../core/client/setup";
import "../../../src/dev/client/main-menu.boot.ts";
import "../../../src/wallet/client/admin/main-menu.boot.ts";
import "../../../src/wallet/client/user/home-page.boot.ts";
import "../../../src/wallet/client/user/main-menu.boot.ts";
import "../../../src/vp/client/admin/main-menu.boot.ts";
import "../../../src/vp/client/user/main-menu.boot.ts";
import "../../../src/paygates/client/admin/main-menu.boot.ts";
import "../../../src/paygates-bitcoin/client/admin/main-menu.boot.ts";
import "../../../src/paygates-bitcoin/client/user/account-list-actions.boot.ts";
import "../../../src/paygates-bitcoin/client/user/event-listener.boot.ts";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./module";

// inject boot
// end inject

platformBrowserDynamic().bootstrapModule(AppModule);
