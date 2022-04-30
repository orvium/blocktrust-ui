import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Review } from '../../../core/interfaces/review.interface';
import { ReviewsService } from '../../../core/services/reviews/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  public reviews: Review[] = [];

  constructor(private reviewsService: ReviewsService) {
  }

  ngOnInit(): void {
    this.reviewsService.getAllReviews$().pipe(
      tap((list: Review[]) => this.reviews = list)
    ).subscribe();
  }
}
