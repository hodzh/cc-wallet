import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  AfterViewInit,
  OnDestroy,
  Input,
  Type
} from "@angular/core";

//const styles = require('./block.component.scss');
const template = require('./dynamic-block.component.html');

interface DynamicBlockBind {
  [propertyName: string]: any;
}

@Component({
  selector: 'cc-dynamic-block',
  template: template,
  //styles: [ styles ]
})
export class DynamicBlock implements AfterViewInit, OnDestroy {
  @ViewChild('content', {read: ViewContainerRef})
  public content: ViewContainerRef;
  private dynamicBlock: ComponentRef<any>;

  @Input() set factory(type: Type<any>) {
    this.buildContent(type);
  }

  /**
   *  property name of context
   */
  @Input() set bind(value: DynamicBlockBind) {
    this.bindContext = value;
    this.bindSetup();
  }

  private bindContext: DynamicBlockBind;

  constructor(private componentResolver: ComponentFactoryResolver) {
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

  private buildContent(type: Type<any>) {
    this.clearContent();
    if (!type) {
      return;
    }
    let factory = this.componentResolver
      .resolveComponentFactory(type);
    this.dynamicBlock = this.content.createComponent(factory);
    this.bindSetup();
  }

  private bindSetup() {
    if (!this.bindContext || !this.dynamicBlock) {
      return;
    }
    Object.keys(this.bindContext).forEach(key => {
      this.dynamicBlock.instance[key] = this.bindContext[key];
    })

  }
}
