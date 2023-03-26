import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, finalize, Observable, of, switchMap, take, throwError} from 'rxjs';
import {AuthResponse} from "../interfaces";
import {AuthFacadeService} from "../../pages/auth/auth.facade.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isRefreshToken = false;
  tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)

  static addTokenToRequest(
    request: HttpRequest<any>,
    token: string | null
  ): HttpRequest<any> {
    if (token) {
      return request.clone({setHeaders: {Authorization: `Bearer ${token}`}})
    }
    return request
  }


  constructor(
    private authFacadeService: AuthFacadeService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.authFacadeService.token) {
      request = request.clone( {
        headers: request.headers.set('Authorization', `Bearer ${this.authFacadeService.token}`)
      })
    }

    return next.handle(request)
      .pipe(
        catchError(err => {
          switch (err.status) {
            case 401:
              return this.handleError401(request, next);

            case 403:
              this.handleError401(request, next);

          }
          const error = err.error.message || err.statusText
          return throwError(error)
        })
      );
  }

  handleError401(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<any> {

    if (!this.isRefreshToken) {
      this.isRefreshToken = true;
      this.tokenSubject.next(null);

      return this.authFacadeService
        .refreshToken(this.authFacadeService.RefreshToken)
        .pipe(
          switchMap((res: AuthResponse) => {
            if (res) {
              this.tokenSubject.next(res.token.accessToken);
              return next.handle(
                AuthInterceptor.addTokenToRequest(
                  request,
                  res.token.accessToken
                )
              );
            }
              this.authFacadeService.signOut();
              return of(false);

          }),
          catchError((err) => {
            this.authFacadeService.signOut();
            return of(false);
          }),
          finalize(() => {
            this.isRefreshToken = false;
          })
        );
    } else {
      return this.tokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          return next.handle(
            AuthInterceptor.addTokenToRequest(request, token)
          );
        }),
        catchError((err: HttpErrorResponse) => {
          this.authFacadeService.signOut();
          return of(false);
        })
      );
    }
  }


}
