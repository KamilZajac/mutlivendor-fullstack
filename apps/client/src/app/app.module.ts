import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UiModule } from '@multivendor-fullstack/ui';
import { AuthModule, authRoutes } from '@multivendor-fullstack/auth';
import {config} from '../environments/environment'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UiModule,
    HttpClientModule,
    RouterModule.forRoot(
      [{ path: 'auth', children: authRoutes }],
      { initialNavigation: 'enabled' }),
    AuthModule
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
