import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { PapersRoutingModule } from './papers-routing.module';
import { PapersComponent } from './papers.component';
import { PaperEditComponent } from './paper-edit/paper-edit.component';
import { PaperCreateComponent } from './paper-create/paper-create.component';

@NgModule({
  declarations: [
    PapersComponent,
    PaperEditComponent,
    PaperCreateComponent
  ],
  imports: [
    PapersRoutingModule,
    SharedModule,
  ],
})
export class PapersModule {
}
