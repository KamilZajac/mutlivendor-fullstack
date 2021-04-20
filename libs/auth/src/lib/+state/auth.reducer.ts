import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as AuthActions from './auth.actions';
import { UserResponse } from '@multivendor-fullstack/interfaces';


export const AUTH_FEATURE_KEY = 'auth';

export interface AuthData {
  loading: boolean;
  user: UserResponse;
  error: Error
}

export interface AuthState {
  readonly auth: AuthData;
}

export interface State extends EntityState<UserResponse> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const authAdapter: EntityAdapter<UserResponse> = createEntityAdapter<UserResponse>();

export const initialState: State = authAdapter.getInitialState({
  action: AuthActions,
  loaded: false
});
const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({ ...state, loading: true })),
  on(AuthActions.loginSuccess, (state, action) => ({ ...state, user: action.user, loading: false })),
  on(AuthActions.loginFailure, state => ({ ...state, user: null, loading: false })),
  on(AuthActions.logout, state => ({ ...state, user: null, loading: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
