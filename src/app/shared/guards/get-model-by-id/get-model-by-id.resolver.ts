import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ReputationModelService } from '../../../core/services/reputation-model/reputation-model.service';
import { ReputationModelDTO } from '../../../core/interfaces/reputation-model.interface';

@Injectable({
  providedIn: 'root'
})
export class GetModelByIdResolver implements Resolve<ReputationModelDTO> {
  constructor(private modelService: ReputationModelService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ReputationModelDTO> {
    return this.modelService.getModelById$(route.paramMap.get('id'));
  }
}
