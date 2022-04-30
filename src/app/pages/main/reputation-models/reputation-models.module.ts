import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { ReputationModelsRoutingModule } from './reputation-models-routing.module';
import { ReputationModelsComponent } from './reputation-models.component';
import { ReputationModelEditComponent } from './reputation-model-edit/reputation-model-edit.component';
import { ReputationModelCreateComponent } from './reputation-model-create/reputation-model-create.component';


@NgModule({
  declarations: [
    ReputationModelsComponent,
    ReputationModelEditComponent,
    ReputationModelCreateComponent
  ],
  imports: [
    ReputationModelsRoutingModule,
    SharedModule
  ]
})
export class ReputationModelsModule {
}
