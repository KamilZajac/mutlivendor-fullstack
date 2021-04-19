import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './containers/login/login.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegisterComponent } from './containers/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

export const authRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    LoginFormComponent,
    LoginComponent,
    RegisterFormComponent,
    RegisterComponent
  ]
})
export class AuthModule {
}
