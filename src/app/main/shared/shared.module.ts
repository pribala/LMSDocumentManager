import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { NgModule } from '@angular/core';
import { CoreCommonModule } from '@core/common.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [CustomModalComponent],
  imports: [CoreCommonModule, NgSelectModule],
  exports: [CustomModalComponent],
  providers: []
})
export class SharedModule {}