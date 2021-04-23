import { Inject, Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { SimpleUser } from '@multivendor-fullstack/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

@Injectable()
export class UserDataService extends DefaultDataService<SimpleUser>{
  constructor(public http: HttpClient,
              httpUrlGenerator: HttpUrlGenerator,
              @Inject('apiURL') private apiURL: string ) {
    super('User', http, httpUrlGenerator);
  }

  public getAll(): Observable<SimpleUser[]> {
    return this.http.get<SimpleUser[]>(this.apiURL + '/user')
  }
  public update(update: Update<SimpleUser>): Observable<SimpleUser> {
    const {role, email, username} = update.changes
    return this.http.patch<SimpleUser>(this.apiURL + '/user/' + update.changes.id, { role, email, username })
  }
  public delete(id: string): Observable<string> {
    return this.http.delete<string>(this.apiURL + '/user/' + id)
  }
}


