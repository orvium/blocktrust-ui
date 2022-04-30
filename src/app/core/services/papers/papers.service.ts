import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Paper } from '../../interfaces/paper.interface';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class PapersService {
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
  }

  public getMyPapers$(): Observable<Paper[]> {
    const userId = this.userService.user._id;
    return this.http.get<Paper[]>(`${environment.apiEndpoint}/paper/my/${userId}`);
  }

  public getAllPapers$(): Observable<Paper[]> {
    return this.http.get<Paper[]>(`${environment.apiEndpoint}/paper`);
  }

  public getPapers$(params: { query?: string }): Observable<Paper[]> {
    const httpParams = new HttpParams().appendAll(params || {});
    return this.http.get<Paper[]>(`${environment.apiEndpoint}/paper/search`, { params: httpParams });
  }

  public getPaperById$(id: string): Observable<Paper> {
    return this.http.get<Paper>(`${environment.apiEndpoint}/paper/${id}`);
  }

  public editPaper$(id: string, paper: Partial<Paper>): Observable<Paper> {
    return this.http.patch<Paper>(
      `${environment.apiEndpoint}/paper/${id}`, paper
    );
  }

  public createPaper$(paper: Partial<Paper>): Observable<Paper> {
    return this.http.post<Paper>(`${environment.apiEndpoint}/paper`, paper);
  }
}
