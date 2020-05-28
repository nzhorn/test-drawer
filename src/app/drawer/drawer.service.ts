import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, PortalInjector } from '@angular/cdk/portal';

import { DrawerRef } from './drawer-ref';
import { DRAWER_DATA } from './drawer-data';
import { IDrawerConfig } from './config';
import { DrawerComponent } from './drawer.component';

@Injectable()
export class DrawerService {

  constructor(private _overlay: Overlay,
              private _injector: Injector) {
  }

  public open(component: ComponentType<any>, config?: IDrawerConfig) {
    const overlayRef = this._createOverlay();
    const drawerRef = new DrawerRef(overlayRef, config);

    const containerRef = this._attachDrawerContainer(overlayRef, drawerRef, config);
    const componentRef = this._attachComponent(component, containerRef, drawerRef, config);

    drawerRef.containerRef = containerRef;
    containerRef.setDrawerRef(drawerRef);

    drawerRef.componentRef = componentRef;

    drawerRef.events();
    drawerRef.open();

    return drawerRef;
  }

  private _createOverlay(): OverlayRef {
    const overlayConfig = this._getOverlayConfig();
    return this._overlay.create(overlayConfig);
  }

  private _getOverlayConfig(): OverlayConfig {
    return new OverlayConfig();
  }

  private _attachDrawerContainer<T, R>(
    overlayRef: OverlayRef,
    drawerRef: DrawerRef<T, R>,
    config: IDrawerConfig
  ) {
    const injector = this._createInjector(drawerRef, config);
    const containerPortal = new ComponentPortal(DrawerComponent, undefined, injector);
    const containerRef = overlayRef.attach<DrawerComponent>(containerPortal);

    return containerRef.instance;
  }

  private _attachComponent<T, R>(
    componentRef: ComponentType<T>,
    drawerContainer: DrawerComponent,
    drawerRef: DrawerRef<T, R>,
    config: IDrawerConfig
  ) {
    const injector = this._createInjector(drawerRef, config);

    return drawerContainer.attachComponentPortal<T>(
      new ComponentPortal<T>(componentRef, undefined, injector)
    );
  }


  private _createInjector(componentRef, config) {
    const injectionTokens = new WeakMap<any, any>([
      [DrawerRef, componentRef],
      [DRAWER_DATA, config.data]
    ]);

    return new PortalInjector(this._injector, injectionTokens);
  }


}
