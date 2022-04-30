import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { PAPER_TYPE } from '../../../../core/enums/paper-type.enum';
import { Paper } from '../../../../core/interfaces/paper.interface';
import { PapersService } from '../../../../core/services/papers/papers.service';
import { SnackBarService } from '../../../../core/services/snack-bar/snack-bar.service';
import { getErrorMessage } from '../../../../shared/utils/functions';
import { OrvDialogService } from '../../../../shared/components/dialogs/orv-dialog.service';
import { OnExit } from '../../../../shared/guards/exit-guard/exit-guard';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-paper-create',
  templateUrl: './paper-create.component.html',
  styleUrls: ['./paper-create.component.scss'],
})
export class PaperCreateComponent implements OnInit, OnExit {
  public paperForm: FormGroup;
  public getErrorMessage = getErrorMessage;
  public PaperType = PAPER_TYPE;
  public fileName: string;

  constructor(
    private router: Router,
    private paperService: PapersService,
    private snackService: SnackBarService,
    private fb: FormBuilder,
    public dialogService: OrvDialogService,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.paperForm = this.fb.group({
      abstract: [''],
      canBeReviewed: [true],
      disciplines: [''],
      doi: [''],
      publicationFile: [null],
      gitRepository: [''],
      images: [''],
      keywords: [''],
      openAireIdentifier: [''],
      paperType: [this.PaperType.article],
      references: [''],
      title: ['', Validators.required],
      creator: [],
      authors: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          surname: ['', Validators.required],
          email: ['', Validators.email],
          orcid: [''],
        })
      ])
    });
  }

  public create(): void {
    const formValue = this.paperForm.value;
    formValue.keywords = formValue.keywords ? formValue.keywords.split(',') : [];
    formValue.disciplines = formValue.disciplines ? formValue.disciplines.split(',') : [];
    formValue.references = formValue.references ? formValue.references.split(',') : [];
    formValue.images = formValue.images ? formValue.images.split(',') : [];
    formValue.creator = this.userService.user._id;
    this.paperService.createPaper$(formValue).pipe(
      tap((paper: Paper): void => {
        this.snackService.openSnackBar('Success', 'Hide');
      })
    ).subscribe(call => {
      this.paperForm.markAsPristine();
    });
  }

  public onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.paperForm.get('publicationFile').setValue(file);
    }
  }

  public goBack(): void {
    this.router.navigate(['/papers']);
  }

  public getControl(name: string): FormControl {
    return this.paperForm.get(name) as FormControl;
  }

  deleteAuthor(authorIndex: number) {
    this.authors.removeAt(authorIndex);
  }

  public getPaperTypesValues(): string[] {
    return Object.values(this.PaperType);
  }

  public getPaperTypesKeys(index: number): string {
    return Object.keys(this.PaperType)[index];
  }

  addAuthor(): void {
    this.authors.push(this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.email],
      orcid: [''],
    }));
  }

  get authors() {
    return this.paperForm.get('authors') as FormArray;
  }

  onExit(): Observable<boolean> | boolean {
    if (!this.paperForm.dirty) {
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
