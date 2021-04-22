import { createSelector } from '@ngrx/store';
import {
  State,
} from './users.reducer';

export interface AppState {
  users: State;
}


export const selectFeature = (state: AppState) => state.users;

export const selectAllUsers = createSelector(
  selectFeature,
  (state: State) => state? state.users : []
);
