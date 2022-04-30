import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReputationModelsComponent } from './reputation-models.component';
import { ReputationModelCreateComponent } from './reputation-model-create/reputation-model-create.component';
import { GetModelByIdResolver } from '../../../shared/guards/get-model-by-id/get-model-by-id.resolver';
import { ReputationModelEditComponent } from './reputation-model-edit/reputation-model-edit.component';
import { ExitGuard } from '../../../shared/guards/exit-guard/exit-guard';


const routes: Routes = [
  { path: '', component: ReputationModelsComponent },
  { path: 'edit/:id', resolve: { model: GetModelByIdResolver }, component: ReputationModelEditComponent, canDeactivate: [ExitGuard] },
  { path: 'create', component: ReputationModelCreateComponent, canDeactivate: [ExitGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReputationModelsRoutingModule {
}
