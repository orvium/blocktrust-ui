import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Scoring } from '../../interfaces/scoring.interface';

@Injectable({
  providedIn: 'root'
})
export class ScoringsService {

  constructor(private http: HttpClient) {
  }

  public getAllScorings$(): Observable<Scoring[]> {
    return this.http.get<Scoring[]>(`${environment.apiEndpoint}/scoring`);
  }

  public getModelScorings$(id: string): Observable<Scoring[]> {
    const params = new HttpParams().set('modelId', id);
    return this.http.get<Scoring[]>(`${environment.apiEndpoint}/reputation-model/${id}/scorings`);
  }

  public getScoringById$(id: string): Observable<Scoring> {
    return this.http.get<Scoring>(`${environment.apiEndpoint}/scoring/${id}`);
  }

  public createScoring$(payload: Partial<Scoring>): Observable<Scoring> {
    return this.http.post<Scoring>(`${environment.apiEndpoint}/scoring`, payload);
  }

  public editScoring$(id: string, payload: Partial<Scoring>): Observable<Scoring> {
    return this.http.patch<Scoring>(
      `${environment.apiEndpoint}/scoring/${id}`, payload
    );
  }

  public deleteScoring$(id: string): Observable<Scoring> {
    return this.http.delete<Scoring>(
      `${environment.apiEndpoint}/scoring/${id}`
    );
  }

}
