import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { PAPER_TYPE } from '../../../../core/enums/paper-type.enum';
import { Paper } from '../../../../core/interfaces/paper.interface';
import { FileUploadService } from '../../../../core/services/file-upload/file-upload.service';
import { PapersService } from '../../../../core/services/papers/papers.service';
import { SnackBarService } from '../../../../core/services/snack-bar/snack-bar.service';
import { getErrorMessage } from '../../../../shared/utils/functions';
import { saveAs } from 'file-saver';
import { FileMetadata } from '../../../../core/interfaces/file-metadata.interface';
import { OnExit } from '../../../../shared/guards/exit-guard/exit-guard';
import { OrvDialogService } from '../../../../shared/components/dialogs/orv-dialog.service';

@Component({
  selector: 'app-paper-edit',
  templateUrl: './paper-edit.component.html',
  styleUrls: ['./paper-edit.component.scss'],
})
export class PaperEditComponent implements OnInit, OnExit {
  public paper: Paper;
  public paperForm: FormGroup;
  public getErrorMessage = getErrorMessage;
  public PaperType = PAPER_TYPE;
  public fileName: string;

  constructor(
    private routerSnapshot: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private paperService: PapersService,
    private cdr: ChangeDetectorRef,
    private snackService: SnackBarService,
    private fileUpload: FileUploadService,
    public dialogService: OrvDialogService
  ) {
  }

  ngOnInit(): void {
    this.paper = this.routerSnapshot.snapshot.data['paper'];
    this.setForm();
    this.fileName = this.paper.publicationFile && this.paper.publicationFile.filename;
  }

  public save(): void {
    const formValue = this.paperForm.value;
    formValue.keywords = formValue.keywords ? formValue.keywords.split(',') : [];
    formValue.disciplines = formValue.keywords ? formValue.disciplines.split(',') : [];

    this.paperService.editPaper$(this.paper._id, formValue).pipe(
      tap((paper: Paper): void => {
        this.paper = paper;
        this.cdr.markForCheck();
        this.snackService.openSnackBar('Success', 'Hide');
      })
    ).subscribe();
  }

  public goBack(): void {
    this.router.navigate(['/papers']);
  }

  public getControl(name: string): FormControl {
    return this.paperForm.get(name) as FormControl;
  }

  public getPaperTypesValues(): string[] {
    return Object.values(this.PaperType);
  }

  public getPaperTypesKeys(index: number): string {
    return Object.keys(this.PaperType)[index];
  }

  public onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.fileUpload.uploadPaper$(formData).subscribe(
        (response: FileMetadata) => {
          this.fileName = response.filename;
          this.paperForm.get('publicationFile').setValue(response);
          this.cdr.markForCheck();
        }
      );
    }
  }

  public onDownloadFile(): void {
    const fileMetaData: FileMetadata = this.paperForm.get('publicationFile').value;

    this.fileUpload.downloadFile$(fileMetaData.url).subscribe(
      file => saveAs(file, fileMetaData.filename)
    );
  }

  private setForm(): void {
    this.paperForm = this.fb.group({
      abstract: [this.paper.abstract],
      canBeReviewed: [this.paper.canBeReviewed],
      disciplines: [this.paper.disciplines.join(',')],
      publicationFile: [this.paper.publicationFile],
      gitRepository: [this.paper.gitRepository],
      images: [this.paper.images.join(',')],
      keywords: [this.paper.keywords.join(',')],
      paperType: [this.paper.paperType],
      references: [this.paper.references.join(',')],
      title: [this.paper.title],
    });
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
