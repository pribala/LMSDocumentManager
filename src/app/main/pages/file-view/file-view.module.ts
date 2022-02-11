import { SharedModule } from './../../shared/shared.module';
import { ModalsComponent } from 'app/main/components/modals/modals.component';
import { ModalsModule } from 'app/main/components/modals/modals.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { FileViewComponent } from './file-view.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';

import { DatatablesService } from 'app/main/tables/datatables/datatables.service';
import { FormsModule } from '@angular/forms';

const routes = [
  {
    path: 'files',
    component: FileViewComponent,
    resolve: {
      datatables: DatatablesService
    },
    data: { animation: 'files' },
  },
  
];

@NgModule({
  declarations: [FileViewComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule,
    NgbModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule,
    SharedModule,
    FormsModule],
  exports: [FileViewComponent],
  providers: [DatatablesService]
})
export class FileViewModule {}