import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../../core/services/snack-bar/snack-bar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReputationModelService } from '../../../../core/services/reputation-model/reputation-model.service';
import { tap } from 'rxjs';
import { ReputationModelDTO } from '../../../../core/interfaces/reputation-model.interface';
import { customValidators } from '../../../../shared/utils/validators';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-reputation-model-create',
  templateUrl: './reputation-model-create.component.html',
  styleUrls: ['./reputation-model-create.component.scss'],
})
export class ReputationModelCreateComponent implements OnInit {

  modelForm: FormGroup;

  constructor(private router: Router,
              private modelService: ReputationModelService,
              private snackService: SnackBarService,
              private fb: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.setForm();
  }

  public goBack(): void {
    this.router.navigate(['/reputation-models']);
  }

  public create(): void {
    const formValue = this.modelForm.value;
    formValue.creator = this.userService.user._id;
    this.modelService.createModel$(formValue).pipe(
      tap((payload: ReputationModelDTO): void => {
        this.snackService.openSnackBar('Success', 'Hide');
      })
    ).subscribe();
  }

  private setForm(): void {
    this.modelForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      sourceCodeURL: ['', customValidators.validateURL],
      provider: ['', Validators.required],
      creator: [],
      version: [1],
    });
  }

}
