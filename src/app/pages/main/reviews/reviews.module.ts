import { NgModule } from '@angular/core';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewsComponent } from './reviews.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReviewEditComponent } from './review-edit/review-edit.component';
import { ReviewCreateComponent } from './review-create/review-create.component';

@NgModule({
  declarations: [
    ReviewsComponent,
    ReviewEditComponent,
    ReviewCreateComponent
  ],
  imports: [
    ReviewsRoutingModule,
    SharedModule
  ]
})
export class ReviewsModule {
}
