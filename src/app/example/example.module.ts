import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { ExampleComponent } from './example.component';
import { TaskDrawerComponent } from './task-drawer';
import { ExampleRoutingModule } from './example-routing.module';
import { DrawerModule } from '../drawer';



@NgModule({
  declarations: [
    ExampleComponent,
    TaskDrawerComponent
  ],
  imports: [
    CommonModule,
    ExampleRoutingModule,
    DrawerModule,
    MatButtonModule,
  ],
  entryComponents: [
    TaskDrawerComponent
  ],
})
export class ExampleModule { }
