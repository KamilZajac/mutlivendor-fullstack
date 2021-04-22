import { createAction, props } from '@ngrx/store';
import { SimpleUser } from '@multivendor-fullstack/interfaces';

export const init = createAction('[Users Page] Init');

export const loadUsersSuccess = createAction(
  '[Users/API] Load Users Success',
  props<{ users: SimpleUser[] }>()
);

export const loadUsersFailure = createAction(
  '[Users/API] Load Users Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[Users/API] Update User',
  props<{ id: string, role: string }>()
);

export const updateUserSuccess = createAction(
  '[Users/API] Update User Success',
  props<{ user: SimpleUser }>()
);

export const updateUserFailure = createAction(
  '[Users/API] Update User Success',
  props<{ error: any }>()
);
