import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// routing
const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  // },
  // {
  //   path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];



@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AppsModule {}
