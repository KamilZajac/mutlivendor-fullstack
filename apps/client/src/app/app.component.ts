import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { AuthState } from '@multivendor-fullstack/auth';

@Component({
  selector: 'multivendor-fullstack-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(private store: Store<AuthState>, private http: HttpClient) {
  }

  public sendRequest() {
    const body = {
      'price': 666
    };
    this.http.patch('http://localhost:3333/api/shop-item/25e63449-1746-4abd-9d47-1bb453994531', body)
      .pipe(take(1)).subscribe(res => console.log(res));
  }
}
