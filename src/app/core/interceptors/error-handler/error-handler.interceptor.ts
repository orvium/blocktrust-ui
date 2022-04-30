import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private snackService: SnackBarService) {
  }

  intercept(
    request: HttpRequest<unknown>, next: HttpHandler
  ): Observable<any> {
    return next.handle(request).pipe(
      catchError(
        (err: HttpErrorResponse, caught: Observable<HttpEvent<any>>) => {
          console.log(err);
          this.snackService.openSnackBar(err.message || 'Error', 'Hide');

          return of(err);
        }
      )
    );
  }
}
