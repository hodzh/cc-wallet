import "../../core/client/setup";
import "../../../src/paygates-bitcoin/client/user/account-list-actions.boot.ts";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./module";

platformBrowserDynamic().bootstrapModule(AppModule);
