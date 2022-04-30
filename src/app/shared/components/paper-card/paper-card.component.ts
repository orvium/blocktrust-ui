import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Paper } from '../../../core/interfaces/paper.interface';
import { ReviewsService } from '../../../core/services/reviews/reviews.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-paper-card',
  templateUrl: './paper-card.component.html',
  styleUrls: ['./paper-card.component.scss'],
})
export class PaperCardComponent {
  @Input() paper: Paper;

  constructor(
    private router: Router,
    private userService: UserService,
    private reviewService: ReviewsService
  ) {
  }

  public edit(): void {
    this.router.navigate([`papers/edit/${this.paper._id}`]);
  }

  public view(): void {
    // TODO: view paper logic
  }

  public createReview(): void {
    this.reviewService.paperForReview = this.paper;
    this.router.navigate([`reviews/create`]);
  }
}
