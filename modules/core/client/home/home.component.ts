import {
  Component,
  ComponentResolver,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactory,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { HOME_PAGE, HomePageContent } from '../common/home-page';
import { Auth } from '../auth/auth';
import { DynamicBlock } from '../components/dynamic-block/dynamic-block.component.ts';

//const styles = require('./home.component.scss');
const template = require('./home.component.html');

@Component({
  directives: [DynamicBlock],
  template: template,
  //styles: [ styles ]
})
export class HomeComponent {
  public content: HomePageContent[] = HOME_PAGE;

  constructor(private auth: Auth) {
  }

  public hasRole(role:string) {
    return this.auth.hasRole(role);
  }
}
