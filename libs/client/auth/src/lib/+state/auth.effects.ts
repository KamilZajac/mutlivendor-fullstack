import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { AuthActionTypes } from './auth.actions';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginDto } from '@multivendor-fullstack/dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      exhaustMap((action: { payload: LoginDto }) =>
        this.authService.login(action.payload).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          tap(() => this.router.navigate(['/'])),
          catchError(error => of(AuthActions.loginFailure({ payload: error })))
        )
      )
    ));

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {
  }
}
