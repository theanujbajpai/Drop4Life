import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;

  let authReq = req;
  if (token && !req.url.includes('/auth/login') && !req.url.includes('/auth/register')) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // If 401 Unauthorized, try to refresh token once
      if (error.status === 401 && !req.url.includes('/auth/refresh-token') && !req.url.includes('/auth/login')) {
        return authService.refresh().pipe(
          switchMap(newAuth => {
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAuth.accessToken}`
              }
            });
            return next(retryReq);
          }),
          catchError(refreshErr => {
            authService.logout();
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
