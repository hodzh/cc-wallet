import {
  Component,
  ComponentResolver,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactory,
  AfterViewInit,
  OnDestroy,
  Input,
  Type
} from '@angular/core';

//const styles = require('./block.component.scss');
const template = require('./dynamic-block.component.html');

@Component({
  selector: 'dynamic-block',
  directives: [],
  template: template,
  //styles: [ styles ]
})
export class DynamicBlock implements AfterViewInit, OnDestroy {
  @ViewChild('content', {read: ViewContainerRef})
  public content: ViewContainerRef;
  private dynamicBlock: ComponentRef<any>;

  @Input() set factory(type: Type) {
    this.buildContent(type);
  }

  constructor(
    private componentResolver: ComponentResolver) {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.clearContent();
  }

  private clearContent() {
    if (!this.dynamicBlock) {
      return;
    }
    this.dynamicBlock.destroy();
    delete this.dynamicBlock;
  }

  private buildContent(type: Type) {
    this.clearContent();
    if (!type) {
      return;
    }
    this.componentResolver
      .resolveComponent(type)
      .then((factory: ComponentFactory<any>) => {
        this.dynamicBlock = this.content.createComponent(factory);
      });
  }
}
