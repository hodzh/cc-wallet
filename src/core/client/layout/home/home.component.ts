import { Component } from "@angular/core";
import { Auth } from "../../auth/auth";
import { LayoutModule } from "../module";
import { HomePageContent } from "../home-page";

const template = require('./home.component.html');

@Component({
  template
})
export class HomeComponent {
  public content: HomePageContent[] = [];//LayoutModule.HomePage;

  constructor(private auth: Auth) {
  }

  public hasRole(role: string) {
    return this.auth.hasRole(role);
  }
}
