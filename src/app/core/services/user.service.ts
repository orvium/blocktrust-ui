import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

export interface UserData {
  family_name: string,
  given_name: string,
  id: string,
  name: string,
  sub: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User;

  constructor(private http: HttpClient) {
  }

  public get(userData: UserData): Observable<User> {
    return this.http.post<User>(
      `${environment.apiEndpoint}/user`, userData
    ).pipe(
      tap((user: User) => this.user = user)
    );
  }

  public update(id: string, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(
      `${environment.apiEndpoint}/user/${id}`, user
    );
  }
}
