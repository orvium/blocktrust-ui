import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ExitGuard } from '../../../shared/guards/exit-guard/exit-guard';

const routes: Routes = [
  { path: '', component: ProfileComponent, canDeactivate: [ExitGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
