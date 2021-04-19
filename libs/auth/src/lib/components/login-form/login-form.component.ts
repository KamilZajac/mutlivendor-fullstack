import { Component, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { loginForm } from './login.form';
import { EventEmitter } from '@angular/core';
import { LoginDto } from '@multivendor-fullstack/dto';

@Component({
  selector: 'multivendor-fullstack-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  public form: FormGroup = loginForm;
  @Output() onSubmit = new EventEmitter()

  public onLogin() {
    if(this.form.valid) {
      let loginData: LoginDto = {
        password: this.form.get('password').value,
        username: this.form.get('username').value
      }
      this.onSubmit.emit(loginData)
    }
  }
}
