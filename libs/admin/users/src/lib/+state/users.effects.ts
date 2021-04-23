import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as UsersActions from './users.actions';
// import { UsersService } from '../services/users.service';
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';

@Injectable()
export class UsersEffects {
  // loadAllUsers$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(UsersActions.loadAllUsers),
  //     fetch({
  //       run: (action) => {
  //         return this.usersService.fetchAllUsers()
  //           .pipe(map(users =>  UsersActions.loadUsersSuccess({ users })))
  //       },
  //       onError: (action, error) => {
  //         return UsersActions.loadUsersFailure({ error });
  //       },
  //     })
  //   )}
  // );
  //
  // updateUser$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(UsersActions.updateUser),
  //     fetch({
  //       run: (action) => {
  //         return this.usersService.updateUser(action.id, action.role)
  //           .pipe(map(user =>  UsersActions.updateUserSuccess( {user} )))
  //       },
  //       onError: (action, error) => {
  //         return UsersActions.loadUsersFailure({ error });
  //       },
  //     })
  //   )}
  // );
  //
  //
  // constructor(private actions$: Actions) {
  // }
}
