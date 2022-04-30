import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Paper } from '../../../../core/interfaces/paper.interface';
import { Review } from '../../../../core/interfaces/review.interface';
import { ReviewsService } from '../../../../core/services/reviews/reviews.service';
import { SnackBarService } from '../../../../core/services/snack-bar/snack-bar.service';
import { getErrorMessage } from '../../../../shared/utils/functions';
import { OrvDialogService } from '../../../../shared/components/dialogs/orv-dialog.service';
import { OnExit } from '../../../../shared/guards/exit-guard/exit-guard';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.scss'],
})
export class ReviewCreateComponent implements OnInit, OnExit {
  public sourcePaper: Paper;
  public reviewForm: FormGroup;
  public fileName: string;
  public getErrorMessage = getErrorMessage;

  constructor(
    private router: Router,
    private reviewService: ReviewsService,
    private snackService: SnackBarService,
    private fb: FormBuilder,
    private userService: UserService,
    public dialogService: OrvDialogService
  ) {
  }

  ngOnInit(): void {
    this.sourcePaper = this.reviewService.paperForReview;
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      creator: [],
      comment: [''],
      doi: [''],
      reward: [0, [Validators.min(0)]],
      revealReviewerIdentity: [true],
      paper: [this.sourcePaper._id],
      file: [null]
    });
  }

  public goBack(): void {
    this.router.navigate(['/papers']);
    this.reviewService.paperForReview = null;
  }

  public getControl(name: string): FormControl {
    return this.reviewForm.get(name) as FormControl;
  }

  public create(): void {
    const formValue = this.reviewForm.value;
    formValue.creator = this.userService.user._id;

    this.reviewService.createReview$(formValue).pipe(
      tap((review: Review): void => {
        this.snackService.openSnackBar('Success', 'Hide');
        this.reviewForm.markAsPristine();
      })
    ).subscribe();
  }

  public onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.reviewForm.get('file').setValue(file);
    }
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
