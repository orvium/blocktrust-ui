import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReputationModelDTO } from '../../../../core/interfaces/reputation-model.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { ReputationModelService } from '../../../../core/services/reputation-model/reputation-model.service';
import { SnackBarService } from '../../../../core/services/snack-bar/snack-bar.service';
import { customValidators } from '../../../../shared/utils/validators';
import { ScoringsService } from '../../../../core/services/scorings/scorings.service';
import { Scoring } from '../../../../core/interfaces/scoring.interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-reputation-model-edit',
  templateUrl: './reputation-model-edit.component.html',
  styleUrls: ['./reputation-model-edit.component.scss'],
})
export class ReputationModelEditComponent implements OnInit {
  public model: ReputationModelDTO;
  public modelForm: FormGroup;
  public scorings: Scoring[] = [];
  public environment = environment.publicUrl;


  constructor(private routerSnapshot: ActivatedRoute,
              private formbuilder: FormBuilder,
              private modelService: ReputationModelService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private snackService: SnackBarService,
              private scoringsService: ScoringsService
  ) {
  }

  ngOnInit(): void {
    this.model = this.routerSnapshot.snapshot.data['model'];
    this.scoringsService.getModelScorings$(this.model._id).subscribe(scorings => {
      console.log(scorings);
      this.scorings = scorings;
    });
    this.setForm();
  }

  public save(): void {
    const formValue = this.modelForm.value;

    this.modelService.editModel$(this.model._id, formValue).pipe(
      tap((model: ReputationModelDTO): void => {
        this.model = model;
        this.cdr.markForCheck();
        this.snackService.openSnackBar('Success', 'Hide');
      })
    ).subscribe();
  }

  public delete() {
    this.modelService.deleteModel$(this.model._id).pipe(
      tap((model: ReputationModelDTO): void => {
        this.model = model;
        this.cdr.markForCheck();
        this.snackService.openSnackBar('Model deleted', 'Hide');
        this.router.navigate([`reputation-models`]);
      })
    ).subscribe();
  }

  setForm() {
    this.modelForm = this.formbuilder.group({
      name: [this.model.name, Validators.required],
      description: [this.model.description, Validators.required],
      sourceCodeURL: [this.model.sourceCodeURL, customValidators.validateURL],
      provider: [this.model.provider, Validators.required]
    });
  }

  public goBack(): void {
    this.router.navigate(['/reputation-models']);
  }

}
