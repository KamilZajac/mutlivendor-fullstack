import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UiModule } from '@multivendor-fullstack/ui';
import {config} from '../environments/environment'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthInterceptor } from '../../../../libs/auth/src/lib/services/auth.interceptor';
import { ClientStorefrontModule } from '@multivendor-fullstack/client/storefront';
import { AuthModule, authRoutes } from '@multivendor-fullstack/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UiModule,
    ClientStorefrontModule,
    RouterModule.forRoot(
      [{ path: 'auth', children: authRoutes }],
      { initialNavigation: 'enabled' }),
    AuthModule,
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
