import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReputationModelDTO } from '../../interfaces/reputation-model.interface';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReputationModelService {

  constructor(private http: HttpClient) {
  }

  public getAllModels$(): Observable<ReputationModelDTO[]> {
    return this.http.get<ReputationModelDTO[]>(`${environment.apiEndpoint}/reputation-model`);
  }

  public getModelById$(id: string): Observable<ReputationModelDTO> {
    return this.http.get<ReputationModelDTO>(`${environment.apiEndpoint}/reputation-model/${id}`);
  }

  public createModel$(payload: Partial<ReputationModelDTO>): Observable<ReputationModelDTO> {
    return this.http.post<ReputationModelDTO>(`${environment.apiEndpoint}/reputation-model`, payload);
  }

  public editModel$(id: string, payload: Partial<ReputationModelDTO>): Observable<ReputationModelDTO> {
    return this.http.patch<ReputationModelDTO>(
      `${environment.apiEndpoint}/reputation-model/${id}`, payload
    );
  }

  public deleteModel$(id: string): Observable<ReputationModelDTO> {
    return this.http.delete<ReputationModelDTO>(
      `${environment.apiEndpoint}/reputation-model/${id}`
    );
  }

}
