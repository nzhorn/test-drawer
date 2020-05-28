import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DrawerRef, DRAWER_DATA } from '../../drawer';

@Component({
  selector: 'app-task-drawer',
  templateUrl: './task-drawer.component.html',
  styleUrls: ['./task-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDrawerComponent implements OnInit {

  constructor(
    private drawerRef: DrawerRef<TaskDrawerComponent>,
    @Inject(DRAWER_DATA) public data: any
  ) { }

  ngOnInit() {

  }

}
