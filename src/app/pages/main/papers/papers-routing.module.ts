import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetPaperByIdResolver } from '../../../shared/guards/get-paper-by-id/get-paper-by-id.resolver';
import { PaperCreateComponent } from './paper-create/paper-create.component';
import { PaperEditComponent } from './paper-edit/paper-edit.component';
import { PapersComponent } from './papers.component';
import { ExitGuard } from '../../../shared/guards/exit-guard/exit-guard';

const routes: Routes = [
  { path: '', component: PapersComponent },
  { path: 'edit/:id', resolve: { paper: GetPaperByIdResolver }, component: PaperEditComponent, canDeactivate: [ExitGuard] },
  { path: 'create', component: PaperCreateComponent, canDeactivate: [ExitGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PapersRoutingModule {
}
