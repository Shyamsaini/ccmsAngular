import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        return http.post<any>('api/auth/refresh-token', {
          refreshToken: localStorage.getItem('refreshToken')
        }).pipe(
          switchMap(res => {
            localStorage.setItem('jwttoken', res.accessToken);
            return next(req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.accessToken}`
              }
            }));
          }),
          catchError(() => {
            authService.logout();
            return throwError(() => err);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
