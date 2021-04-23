import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, UsersState } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users')

export const selectAllUsers = createSelector(
  selectUsersState,
  selectAll
)


