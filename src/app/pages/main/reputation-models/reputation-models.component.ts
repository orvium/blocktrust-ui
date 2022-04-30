import { Component } from '@angular/core';
import { ReputationModelDTO } from '../../../core/interfaces/reputation-model.interface';
import { Router } from '@angular/router';
import { ReputationModelService } from '../../../core/services/reputation-model/reputation-model.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-reputation-models',
  templateUrl: './reputation-models.component.html',
  styleUrls: ['./reputation-models.component.scss']
})
export class ReputationModelsComponent {

  public models: ReputationModelDTO[] = [];

  constructor(private modelService: ReputationModelService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.modelService.getAllModels$().pipe(
      tap((list: ReputationModelDTO[]) => this.models = list)
    ).subscribe();
  }

  public createModel(): void {
    this.router.navigate(['reputation-models', 'create']);
  }
}
