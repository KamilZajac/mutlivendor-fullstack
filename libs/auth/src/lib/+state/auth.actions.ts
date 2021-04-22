import { createAction, props } from '@ngrx/store';
import { SimpleUser } from '@multivendor-fullstack/interfaces';
import { LoginDto } from '@multivendor-fullstack/dto';

export enum AuthActionTypes {
  Login = '[Auth Page] Login',
  LoginSuccess = '[Auth API] Login Success',
  LoginFail = '[Auth API] Login Fail',
  Logout = '[Auth API] Logout',
}

export const login = createAction(
  AuthActionTypes.Login,
  props<{ payload: LoginDto }> ()
);

export const loginSuccess = createAction(
  AuthActionTypes.LoginSuccess,
  props<{ user: SimpleUser }>()
);

export const loginFailure = createAction(
  AuthActionTypes.LoginFail,
  props<{ payload: any }>()
);

export const logout = createAction(
  AuthActionTypes.Logout,
  props<any>()
);
