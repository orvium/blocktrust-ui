import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'papers',
        loadChildren: () => import('./papers/papers.module').then(m => m.PapersModule)
      },
      {
        path: 'reviews',
        loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsModule)
      },
      {
        path: 'reputation-models',
        loadChildren: () => import('./reputation-models/reputation-models.module').then(m => m.ReputationModelsModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'papers'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
