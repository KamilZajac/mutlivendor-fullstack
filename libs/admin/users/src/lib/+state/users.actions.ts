import { createAction, props } from '@ngrx/store';
import { SimpleUser } from '@multivendor-fullstack/interfaces';
import { Update } from '@ngrx/entity';

export const loadAllUsers = createAction('[Users Page] Init');

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
  props<{update: Update<SimpleUser>}>()
);

export const updateUserSuccess = createAction(
  '[Users/API] Update User Success',
  props<{ user: SimpleUser }>()
);

export const updateUserFailure = createAction(
  '[Users/API] Update User Success',
  props<{ error: any }>()
);
