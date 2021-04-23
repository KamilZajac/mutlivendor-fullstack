import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as UsersActions from './users.actions';
import { SimpleUser } from '@multivendor-fullstack/interfaces';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState extends EntityState<SimpleUser> {}

export const adapter = createEntityAdapter<SimpleUser>();

export const initialState: UsersState = adapter.getInitialState();

const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsersSuccess, (state, action) => adapter.setAll(action.users, state)),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error })),
  // on(UsersActions.updateUserSuccess, (state, action) => adapter.updateOne({id: action.user.id, changes: {...state.user}}, state))
  // on(UsersActions.updateUserSuccess, (state, action) => {
  //   return state.users && state.users.length > 0
  //     ? {
  //       ...state,
  //       users: state.users.map((user) => user.id === action.user.id
  //         ? {
  //           ...user,
  //           ...action.user
  //         }
  //         : user)
  //     }
  //     : state;
  // })
);

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
export const { selectAll } = adapter.getSelectors()
