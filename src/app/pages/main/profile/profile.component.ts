import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { User } from '../../../core/interfaces/user.interface';
import { SnackBarService } from '../../../core/services/snack-bar/snack-bar.service';
import { getErrorMessage } from '../../../shared/utils/functions';
import { OnExit } from '../../../shared/guards/exit-guard/exit-guard';
import { OrvDialogService } from '../../../shared/components/dialogs/orv-dialog.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnExit {
  public userForm: FormGroup;
  private user: User;
  public getErrorMessage = getErrorMessage;

  constructor(
    private fb: FormBuilder,
    private snackService: SnackBarService,
    public dialogService: OrvDialogService,
    public userService: UserService
  ) {
    this.user = this.userService.user;
    this.userForm = this.fb.group({
      firstName: [this.user && this.user.firstName || '', [Validators.required]],
      lastName: [this.user && this.user.lastName || '', [Validators.required]],
      email: [this.user && this.user.email || '', [Validators.required, Validators.email]],
      aboutMe: [this.user && this.user.aboutMe || ''],
      linkedin: [this.user && this.user.linkedin || ''],
      role: [this.user && this.user.role || '']
    });
  }

  public save(): void {
    this.userService.update(this.user._id, this.userForm.value).pipe(
      tap(() => this.snackService.openSnackBar('Success', 'Hide'))
    ).subscribe();
  }

  public getControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }

  onExit(): Observable<boolean> | boolean {
    if (!this.userForm.dirty) {
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
