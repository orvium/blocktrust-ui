import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from '../../../core/interfaces/review.interface';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
})
export class ReviewCardComponent {
  @Input() review: Review;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  public edit(): void {
    this.router.navigate([`reviews/edit/${this.review._id}`]);
  }

  public view(): void {
    // TODO: view review logic
  }
}
