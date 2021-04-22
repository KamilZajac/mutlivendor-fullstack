import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { AuthService, AuthState, selectCurrentUser } from '@multivendor-fullstack/auth';
import { Store } from '@ngrx/store';
import { SimpleUser } from '@multivendor-fullstack/interfaces';
import * as authActions from '../+state/auth.actions';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private isFetchingMe = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    public authService: AuthService,
    private router: Router,
    private authStore: Store<AuthState>,
    ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (!request) {
      return;
    }

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(
      tap(() => {
        this.checkMe()
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      }));
  }


  private checkMe() {
    this.authStore.select(selectCurrentUser).pipe(take(1)).subscribe(user => {
      if(!this.isFetchingMe && !user && this.authService.getJwtToken()) {
        console.log('łełołeło')
          this.isFetchingMe = true
          this.authService.getMe().pipe(take(1)).subscribe((user: SimpleUser) =>{
            this.authStore.dispatch(authActions.loginSuccess({user}))
          }, e => console.log(e))

      }
    })
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((tokens: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(tokens.token);
          return next.handle(this.addToken(request, tokens.token));
        }),
        tap(() => {
          this.checkMe()
        }),
        catchError(e => {
          this.router.navigateByUrl('/auth');
          return of(e);
        })
      );

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(tokens => {
          return next.handle(this.addToken(request, tokens.token));
        }));
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
