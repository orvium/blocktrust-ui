import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Review } from '../../../core/interfaces/review.interface';
import { ReviewsService } from '../../../core/services/reviews/reviews.service';

@Injectable({
  providedIn: 'root'
})
export class GetReviewByIdResolver implements Resolve<Review> {
  constructor(private reviewsService: ReviewsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Review> {
    return this.reviewsService.getReviewById$(route.paramMap.get('id'));
  }
}
