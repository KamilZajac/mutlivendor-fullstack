import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UiModule } from '@multivendor-fullstack/ui';
import { AuthModule, authRoutes } from '@multivendor-fullstack/auth';
import {config} from '../environments/environment'
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UiModule,
    HttpClientModule,
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
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
