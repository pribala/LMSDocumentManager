import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { NgModule } from '@angular/core';
import { CoreCommonModule } from '@core/common.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadComponent } from './file-upload/file-upload.component';


@NgModule({
  declarations: [CustomModalComponent, FileUploadComponent],
  imports: [CoreCommonModule, NgSelectModule],
  exports: [CustomModalComponent, FileUploadComponent],
  providers: []
})
export class SharedModule {}