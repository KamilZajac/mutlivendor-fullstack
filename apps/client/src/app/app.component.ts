import { Component } from '@angular/core';
import { AuthState } from '@multivendor-fullstack/auth';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'multivendor-fullstack-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  constructor(private store: Store<AuthState>) {

    store.pipe(select((state) => state.auth.user)).subscribe(res => {
      console.log(res)
    })
  }
}
