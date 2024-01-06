import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RequestInterceptorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the request URL is for the login or register routes
    if (request.url.includes('/login') || request.url.includes('/register')) {
      // Do not add the token header for login and register routes
      return next.handle(request).pipe(
        tap(() => this.toastr.success('Sucess')),
        catchError((error: HttpErrorResponse) => {
          // Handle errors here
          this.toastr.error(
            error.error.error ??
              'Une Erreur Produite Veuillez Ressayer Ulterieurement'
          );
          return throwError(error);
        })
      );
    }

    // Add your token logic here
    const token = localStorage.getItem('token'); // Replace with your actual token

    // Clone the request and add the token header for all other routes
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Continue with the modified request
    return next.handle(authRequest).pipe(
      tap(() => this.toastr.success('Sucess')),
      catchError((error: HttpErrorResponse) => {
        console.log(
          error.error.error ??
            'Une Erreur Produite Veuillez Ressayer Ulterieurement'
        );

        // Handle errors here
        this.toastr.error(
          error.error.error ??
            'Une Erreur Produite Veuillez Ressayer Ulterieurement'
        );
        return throwError(error);
      })
    );
  }
}
