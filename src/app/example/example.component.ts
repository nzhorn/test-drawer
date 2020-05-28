import { Component, OnInit } from '@angular/core';
import { TaskDrawerComponent } from './task-drawer';
import { DrawerService } from '../drawer';


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  constructor(public drawer: DrawerService) { }

  ngOnInit() {
  }

  openDrawer() {
    const drawerRef = this.drawer.open(TaskDrawerComponent, {
      data: { account: { name: 'Name', email: 'email@email.com' } },
      position: 'right',
    });

    drawerRef.afterClosed().subscribe(() => {
      console.log('The drawer was closed');
    });

    drawerRef.afterOpened().subscribe(() => {
      console.log('The drawer was opened');
    });

  }

}
