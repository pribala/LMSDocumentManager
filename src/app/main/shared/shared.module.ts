import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { NgModule } from '@angular/core';
import { CoreCommonModule } from '@core/common.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadModule } from 'ng2-file-upload';
//import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';


@NgModule({
  declarations: [CustomModalComponent, FileUploadComponent],
  imports: [CoreCommonModule, NgSelectModule, FileUploadModule],
  exports: [CustomModalComponent, FileUploadComponent, FileUploadModule],
  providers: []
})
export class SharedModule {}