import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { SettingsComponent } from './settings.component';
//import { FormRepeaterModule } from 'app/main/forms/form-repeater/form-repeater.module';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
//import { FormRepeaterComponent } from 'app/main/forms/form-repeater/form-repeater.component';
import { DropdownsModule } from 'app/main/components/dropdowns/dropdowns.module';
const routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    data: { animation: 'settings' }
  },

];

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), CardSnippetModule, FormsModule, CoreCommonModule, ContentHeaderModule, DropdownsModule],
  exports: [SettingsComponent]
})
export class SettingsModule {}