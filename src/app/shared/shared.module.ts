import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { PaperCardComponent } from './components/paper-card/paper-card.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModelCardComponent } from './components/model-card/model-card.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const MaterialExports = [
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatDividerModule,
  MatSidenavModule,
  MatListModule,
  MatChipsModule,
  MatSelectModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatSlideToggleModule
];

const AngularExports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule
];

const Components = [
  HeaderComponent,
  PaperCardComponent,
  ReviewCardComponent,
  ModelCardComponent,
];

@NgModule({
  declarations: [
    Components,
  ],
  imports: [
    AngularExports,
    MaterialExports
  ],
  exports: [
    AngularExports,
    MaterialExports,
    Components
  ]
})
export class SharedModule {
}
