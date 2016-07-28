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
import { HOME_PAGE } from '../common/home';
import { Auth } from '../auth/auth';

//const styles = require('./home.component.scss');
const template = require('./home.component.html');

@Component({
  directives: [],
  template: template,
  //styles: [ styles ]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('homeContent', {read: ViewContainerRef})
  public homeContent: ViewContainerRef;
  private dynamicBlocks: ComponentRef<any>[] = [];

  constructor(private componentResolver: ComponentResolver,
              private auth: Auth) {
  }

  ngAfterViewInit() {
    this.buildHomeContent();
  }

  ngOnDestroy() {
    this.clearHomeContent();
  }

  private clearHomeContent() {
    this.dynamicBlocks.forEach((block: ComponentRef<any>) => {
      block.destroy();
    });
    this.dynamicBlocks.splice(0, this.dynamicBlocks.length);
  }

  buildHomeContent() {
    this.clearHomeContent();
    let homeContent = this.homeContent;
    HOME_PAGE.content.forEach(block => {
      this.componentResolver
        .resolveComponent(block.factory)
        .then((factory: ComponentFactory<any>) => {
          if (!this.auth.hasRole(block.role)) {
            return;
          }
          let blockComponentRef =
            homeContent.createComponent(factory);
          this.dynamicBlocks.push(blockComponentRef);
        });
    });
  }
}
