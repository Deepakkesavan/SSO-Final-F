import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const globalErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      // Handle login-specific errors
      if (error.status === 404) {
        errorMessage = 'User not found';
      } else if (error.status === 401) {
        errorMessage = 'Invalid credentials';
      } else if (error.status === 400) {
        errorMessage = 'Please enter both username and password';
      } else {
        errorMessage = 'Login failed';
      }

      // Return the formatted error
      return throwError(() => ({
        status: error.status,
        message: errorMessage
      }));
    })
  );
};