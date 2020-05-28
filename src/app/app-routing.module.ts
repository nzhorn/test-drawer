import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'drawer',
    pathMatch: 'full'
  },
  {
    path: 'drawer',
    loadChildren: () => import('./example/example.module').then(m => m.ExampleModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
