import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as AuthActions from './auth.actions';
import { SimpleUser } from '@multivendor-fullstack/interfaces';

export const AUTH_FEATURE_KEY = 'auth'

export interface AuthState {
  user: SimpleUser
}

export const initialAuthState: AuthState = {
  user: undefined
};


const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, state => ({ ...state, loading: true })),
  on(AuthActions.loginSuccess, (state, action) => ({ ...state, user: action.user, loading: false })),
  on(AuthActions.loginFailure, state => ({ ...state, user: null, loading: false })),
  on(AuthActions.logout, state => ({ ...state, user: null, loading: false }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
