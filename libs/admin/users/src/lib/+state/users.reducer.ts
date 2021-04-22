import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as UsersActions from './users.actions';
import { SimpleUser } from '@multivendor-fullstack/interfaces';

export const USERS_FEATURE_KEY = 'users';

export interface State extends EntityState<SimpleUser> {
  // additional entities state properties
  users: SimpleUser[]
}

export const adapter: EntityAdapter<SimpleUser> = createEntityAdapter<SimpleUser>();

export const initialState: State = adapter.getInitialState({
  users: null,
});

const usersReducer = createReducer(
  initialState,
  on(UsersActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({...state, users})),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error })),
  on(UsersActions.updateUserSuccess, (state, action) => {
    return state.users && state.users.length > 0
      ? {
        ...state,
        users: state.users.map((user) => user.id === action.user.id
          ? {
            ...user,
            ...action.user
          }
          : user)
      }
      : state;
  })
);

export function reducer(state: State | undefined, action: Action) {
  return usersReducer(state, action);
}
