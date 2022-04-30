import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Paper } from '../../../core/interfaces/paper.interface';
import { PapersService } from '../../../core/services/papers/papers.service';

@Injectable({
  providedIn: 'root'
})
export class GetPaperByIdResolver implements Resolve<Paper> {
  constructor(private paperService: PapersService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Paper> {
    return this.paperService.getPaperById$(route.paramMap.get('id'));
  }
}
