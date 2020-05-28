import { ESCAPE } from '@angular/cdk/keycodes';
import { ComponentRef, ElementRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { DrawerComponent } from './drawer.component';
import { IDrawerConfig, DrawerConfig } from './config';

export class DrawerRef<T, R = any> {

  public readonly drawerConfig: DrawerConfig;

  /** Subject for notifying the user that the drawer has finished opening. */
  private readonly _afterOpened = new Subject<void>();

  /** Subject for notifying the user that the drawer has finished closing. */
  private readonly _afterClosed = new Subject<R | undefined>();

  /** Destroy notifier **/
  private readonly _destroy = new Subject<void>();

  /** Result to be passed to afterClosed. */
  private _result: R | undefined;

  /** Main drawer component and template */
  private _drawerContainerRef: DrawerComponent;

  /** Main drawer component and template */
  private _drawerComponentRef: ComponentRef<T>;

  /** Drawer Content Template */
  private _drawerContentContainer: ElementRef;

  constructor(private _overlayRef: OverlayRef,
              private _config: IDrawerConfig) {
    this.drawerConfig = new DrawerConfig(_config);
  }

  /**
   * Set reference to drawer container
   * @param value
   */
  public set containerRef(value: DrawerComponent) {
    this._drawerContainerRef = value;
  }

  /**
   * Set reference to drawer component
   * @param value
   */
  public set componentRef(value: ComponentRef<T>) {
    this._drawerComponentRef = value;
  }

  public set drawerContentContainer(value: ElementRef) {
    this._drawerContentContainer = value;
  }

  public get drawerContentContainer(): ElementRef {
    return this._drawerContentContainer;
  }

  public get destroy$() {
    return this._destroy.asObservable();
  }


  /**
   * Subscribe on keydown events to react on escape
   */
  public events(): void {
    this._overlayRef.keydownEvents()
      .pipe(
        filter(event => event.keyCode === ESCAPE && !this.drawerConfig.disableClose),
        takeUntil(this._destroy)
      )
      .subscribe(() => this.close());
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  public afterClosed(): Observable<R | undefined> {
    return this._afterClosed.pipe(takeUntil(this._destroy));
  }

  /**
   * Gets an observable that is notified when the dialog is finished opening.
   */
  public afterOpened(): Observable<void> {
    return this._afterOpened.pipe(takeUntil(this._destroy));
  }

  /**
   * Open drawer and notify observable
   */
  public open(): void {
    this._drawerContainerRef.open();
    this._afterOpened.next();
    this._afterOpened.complete();
  }

  /**
   * Close the drawer.
   * @param result Optional result to return to the dialog opener.
   */
  public close(result?: R): void {
    this._drawerContainerRef.close();
    this._result = result;

    this._afterClosed.next(result);
    this.destroy();
  }

  public destroy(): void {
    this._overlayRef.detachBackdrop();
    this._overlayRef.detach();
    this._drawerComponentRef.destroy();

    this._destroy.next();
    this._destroy.complete();
  }


}

