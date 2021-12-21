import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { DashboardComponent } from './dashboard.component';


const routes = [
 {
    path: 'home',
    component: DashboardComponent,
    data: { animation: 'home' }
  },
  // {
  //   path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],
  exports: [DashboardComponent]
})
export class DashboardModule {}