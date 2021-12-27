import { SelectModule } from './../forms/form-elements/select/select.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';


import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { ProfileModule } from './profile/profile.module';

//import { FaqModule } from 'app/main/pages/faq/faq.module';
import { AccountSettingsModule } from './account-settings/account-settings.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsModule } from './settings/settings.module';
import { FileViewModule } from './file-view/file-view.module';
import { FileSearchService } from './services/file-search.service';
import { FileSettingService } from './services/file-setting.service';

const appRoutes: Routes = [

  // {
  //   path: '',
  //   loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  // },
  {
    path: 'home',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
  },
  {
    path: 'files',
    loadChildren: () => import('./file-view/file-view.module').then(m => m.FileViewModule),
  },
  {
    path: '**',
    redirectTo: '/miscellaneous/error' //Error 404 - Page not found
  }
 
];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AuthenticationModule,
    MiscellaneousModule,
    Ng2FlatpickrModule,
    ProfileModule,
   // FaqModule,
    AccountSettingsModule,
    DashboardModule,
    FileViewModule,
    SettingsModule
  ],

  providers: [ 
    FileSearchService,
    FileSettingService
  ]
})
export class PagesModule {}
