import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  ComponentRef,
  EmbeddedViewRef
} from '@angular/core';

import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal,
} from '@angular/cdk/portal';

import { Subject } from 'rxjs';

import { DrawerConfig, IDrawerConfig } from './config';
import { DrawerRef } from './drawer-ref';


@Component({
  selector: 'app-drawer',
  templateUrl: 'drawer.component.html',
  styleUrls: [ 'drawer.component.scss' ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent extends BasePortalOutlet implements OnInit, OnDestroy {
  @ViewChild(CdkPortalOutlet, { static: true })
  private _portalOutlet: CdkPortalOutlet;

  @ViewChild('drawerContentContainer', { static: true })
  private _drawerContentContainer: ElementRef;

  public config: IDrawerConfig;
  public drawerConfig: IDrawerConfig;
  public isOpen = false;

  public drawerRef: DrawerRef<any>;

  private _destroy$ = new Subject();

  constructor(
    private _el: ElementRef<HTMLElement>,
    private _drawerRef: DrawerRef<any>,
    private _cdRef: ChangeDetectorRef,
  ) {
    super();
  }

  public ngOnInit() {
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public open() {
    this.isOpen = true;
  }

  public close() {
    this.isOpen = false;
  }

  public setDrawerRef(value: DrawerRef<any>) {
    this.drawerRef = value;

    this.config = this.drawerRef.drawerConfig;

    // Need to be like a parent for children resize
    this.drawerRef.drawerContentContainer = this._drawerContentContainer;
  }

  /**
   * Attach a ComponentPortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  public attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this._portalOutlet.hasAttached()) {
      throw Error('Drawer component already attached');
    }

    return this._portalOutlet.attachComponentPortal(portal);
  }

  /**
   * Attach a TemplatePortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  public attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this._portalOutlet.hasAttached()) {
      throw Error('Drawer template already attached');
    }

    return this._portalOutlet.attachTemplatePortal(portal);
  }

}
