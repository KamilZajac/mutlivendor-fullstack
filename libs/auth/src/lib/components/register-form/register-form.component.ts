import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { registerForm } from './register.form';

@Component({
  selector: 'multivendor-fullstack-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent  {
  public form: FormGroup = registerForm;
  @Output() onSubmit = new EventEmitter()

  public onRegister() {
    if(this.form.valid) {
      let registerData = {
        password: this.form.get('password').value,
        username: this.form.get('username').value,
        email: this.form.get('email').value
      }
      this.onSubmit.emit(registerData)
    }
  }

}
