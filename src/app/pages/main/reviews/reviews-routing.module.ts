import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetReviewByIdResolver } from '../../../shared/guards/get-review-by-id/get-review-by-id.resolver';
import { ReviewCreateComponent } from './review-create/review-create.component';
import { ReviewEditComponent } from './review-edit/review-edit.component';
import { ReviewsComponent } from './reviews.component';
import { ExitGuard } from '../../../shared/guards/exit-guard/exit-guard';

const routes: Routes = [
  { path: '', component: ReviewsComponent, pathMatch: 'full' },
  { path: 'edit/:id', resolve: { review: GetReviewByIdResolver }, component: ReviewEditComponent, canDeactivate: [ExitGuard] },
  { path: 'create', component: ReviewCreateComponent, canDeactivate: [ExitGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule {
}
