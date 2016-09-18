import {
  ApplicationRef,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  Type,
  Injectable,
  ReflectiveInjector,
  Injector
} from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

/**
 * Components helper class to easily work with
 * allows to:
 * - get application root view container ref
 */
@Injectable()
export class ComponentsHelper {

  private applicationRef: ApplicationRef;
  private componentResolver: ComponentFactoryResolver;
  private injector: Injector;

  public constructor(applicationRef: ApplicationRef, componentResolver: ComponentFactoryResolver, injector: Injector) {
    this.applicationRef = applicationRef;
    this.componentResolver = componentResolver;
    this.injector = injector;
  }

  public getDocument(): any {
    return this.injector.get(DOCUMENT);
  }

  /**
   * This is a name conventional class to get application root view component ref
   * to made this method working you need to add:
   * ```typescript
   *  @Component({
   *   selector: 'my-app',
   *   ...
   *   })
   *  export class MyApp {
   *    constructor(viewContainerRef: ViewContainerRef) {
   *        // A Default view container ref, usually the app root container ref.
   *        // Has to be set manually until we can find a way to get it automatically.
   *        this.viewContainerRef = viewContainerRef;
   *      }
   *  }
   * ```
   * @returns {ViewContainerRef} - application root view component ref
   */
  public getRootViewContainerRef(): ViewContainerRef {
    // The only way for now (by @mhevery)
    // https://github.com/angular/angular/issues/6446#issuecomment-173459525
    // this is a class of application bootstrap component (like my-app)
    const classOfRootComponent = this.applicationRef.componentTypes[0];
    // this is an instance of application bootstrap component
    const appInstance = this.injector.get(classOfRootComponent);
    return appInstance.viewContainerRef;
  }

  /**
   * Helper methods to add ComponentClass(like modal backdrop) with options
   * of type ComponentOptionsClass to element next to application root
   * or next to provided instance of view container
   * @param ComponentClass - @Component class
   * @param ComponentOptionsClass - options class
   * @param options - instance of options
   * @param _viewContainerRef - optional instance of ViewContainerRef
   * @returns {Promise<ComponentRef<T>>} - returns a promise with ComponentRef<T>
   */
  public appendNextToRoot<T extends Type<any>,N>(ComponentClass: T, ComponentOptionsClass: N, options: any, _viewContainerRef?: ViewContainerRef): Promise<ComponentRef<any>> {
    let componentFactory = this.componentResolver
      .resolveComponentFactory(ComponentClass);
    const viewContainerRef = _viewContainerRef || this.getRootViewContainerRef();
    let bindings = ReflectiveInjector.resolve([
      {provide: ComponentOptionsClass, useValue: options}
    ]);
    const ctxInjector = viewContainerRef.parentInjector;

    const childInjector = Array.isArray(bindings) && bindings.length > 0 ?
      ReflectiveInjector.fromResolvedProviders(bindings, ctxInjector) : ctxInjector;
    return Promise.resolve(viewContainerRef.createComponent(componentFactory, viewContainerRef.length, childInjector));
  }
}
