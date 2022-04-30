import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    MainRoutingModule,
    SharedModule,
    CoreModule,
    MatDialogModule
  ],
  providers: [],
})
export class MainModule {
}
