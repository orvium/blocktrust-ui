import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Review } from '../../../../core/interfaces/review.interface';
import { ReviewsService } from '../../../../core/services/reviews/reviews.service';
import { SnackBarService } from '../../../../core/services/snack-bar/snack-bar.service';
import { getErrorMessage } from '../../../../shared/utils/functions';
import { OrvDialogService } from '../../../../shared/components/dialogs/orv-dialog.service';
import { OnExit } from '../../../../shared/guards/exit-guard/exit-guard';

@Component({
  selector: 'app-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.scss'],
})
export class ReviewEditComponent implements OnInit, OnExit {
  public review: Review;
  public reviewForm: FormGroup;
  public getErrorMessage: Function;
  public fileName: string;

  constructor(
    private routerSnapshot: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private reviewsService: ReviewsService,
    private cdr: ChangeDetectorRef,
    private snackService: SnackBarService,
    public dialogService: OrvDialogService
  ) {
  }

  ngOnInit(): void {
    this.review = this.routerSnapshot.snapshot.data['review'];
    this.setForm();
    this.getErrorMessage = getErrorMessage;
  }

  public save(): void {
    const formValue = this.reviewForm.value;
    this.reviewsService.editReview$(this.review._id, formValue).pipe(
      tap((review: Review): void => {
        this.review = review;
        this.cdr.markForCheck();
        this.snackService.openSnackBar('Success', 'Hide');
      })
    ).subscribe();
  }

  public goBack(): void {
    this.router.navigate(['/reviews']);
  }

  public getControl(name: string): FormControl {
    return this.reviewForm.get(name) as FormControl;
  }

  // public getPaperTypesValues(): string[] {
  //   return Object.values(this.PaperType);
  // }

  // public getPaperTypesKeys(index: number): string {
  //   return Object.keys(this.PaperType)[index];
  // }

  private setForm(): void {
    this.reviewForm = this.fb.group({
      title: [this.review.title],
    });
  }

  onExit(): Observable<boolean> | boolean {
    if (!this.reviewForm.dirty) {
      return true;
    }
    const dialog = this.dialogService.openConfirm({
      title: 'Exit publication',
      content: 'Are you sure you want to exit? You have unsaved changes that will be lost.',
      cancelMessage: 'Cancel',
      acceptMessage: 'Ok'
    }).afterClosed() as Observable<boolean>;

    return dialog;
  }
}
