import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

import { DrawerComponent } from './drawer.component';
import { DrawerService } from './drawer.service';



@NgModule({
  declarations: [
    DrawerComponent
  ],
  exports: [
    DrawerComponent
  ],
  entryComponents: [
    DrawerComponent,
  ],
  providers: [
    DrawerService,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
  ]
})
export class DrawerModule {}
