import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CoreComponentsModule } from "../components/module";
import { HomeComponent } from "./home/home.component";
import { GuestHome } from "./home/guest.component";
import { RouterModule } from "@angular/router";
import { SideBarItem } from "./sidebar-item";
import { MenuItem } from "./main-menu";
import { HomePageContent } from "./home-page";
import { NavbarComponent } from "./navbar/navbar.component";
import { ActiveNavItems } from "./navbar/active-nav-items.pipe";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GuestHome,
    NavbarComponent,
    FooterComponent,
    ActiveNavItems
  ],
  entryComponents: [
    GuestHome
  ],
  imports: [
    RouterModule,
    CoreComponentsModule
  ],
  exports: [
    AppComponent
  ],
  providers: []
})
export class LayoutModule {
  public static HomePage: HomePageContent[] = [];
  public static MainMenu: MenuItem[] = [];
  public static SideBar: SideBarItem[] = [];
}
