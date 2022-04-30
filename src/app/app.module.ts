import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler/error-handler.interceptor';
import { DialogsModule } from './shared/components/dialogs/dialogs.module';
import { OrvDialogService } from './shared/components/dialogs/orv-dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthConfigModule } from './auth/auth-config.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    DialogsModule,
    MatDialogModule,
    AuthConfigModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    OrvDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
