import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Paper } from '../../interfaces/paper.interface';
import { Review } from '../../interfaces/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  public paperForReview: Paper;

  constructor(private http: HttpClient) {
  }

  public getAllReviews$(): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiEndpoint}/review`);
  }

  public getReviewById$(id: string): Observable<Review> {
    return this.http.get<Review>(`${environment.apiEndpoint}/review/${id}`);
  }

  public editReview$(id: string, review: Partial<Review>): Observable<Review> {
    return this.http.patch<Review>(
      `${environment.apiEndpoint}/review/${id}`, review
    );
  }

  public createReview$(review: Partial<Review>): Observable<Review> {
    return this.http.post<Review>(`${environment.apiEndpoint}/review`, review);
  }
}
