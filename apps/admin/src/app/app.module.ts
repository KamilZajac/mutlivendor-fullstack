import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthModule, authRoutes } from '@multivendor-fullstack/auth';
import { config } from '../../../client/src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../../../libs/auth/src/lib/services/auth.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@multivendor-fullstack/material';
import { dashboardRoutes } from '@multivendor-fullstack/admin/dashboard';
import { AdminUsersModule } from '@multivendor-fullstack/admin/users';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminUsersModule,
    RouterModule.forRoot(
      [
        { path: 'dashboard', children: dashboardRoutes },
        { path: 'auth', children: authRoutes },
      ],
      { initialNavigation: 'enabled' }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({})
  ],
  providers: [
    {
      provide: 'apiURL', useValue: config.apiURL
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
