import { Component } from '@angular/core';
import { LoginDto } from '@multivendor-fullstack/dto';
import { AuthState } from '@multivendor-fullstack/auth';
import { Store } from '@ngrx/store';
import * as authActions from './../../+state/auth.actions';

@Component({
  selector: 'multivendor-fullstack-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private store: Store<AuthState>) {}

  public onLogin(data: LoginDto) {
    this.store.dispatch(authActions.login({ payload: data }));
  }
}
