import { AuthState } from '@multivendor-fullstack/auth';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY } from './auth.reducer';


export const selectAuthState =
  createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);


export const selectCurrentUser = createSelector(
  selectAuthState,
  auth => auth.user
)

export const isLoggedIn = createSelector(
  selectAuthState,
  auth =>  !!auth.user
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);
