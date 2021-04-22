import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SimpleUser } from '@multivendor-fullstack/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,
              @Inject('apiURL') private apiURL: string) { }

  fetchAllUsers(): Observable<SimpleUser[]> {
    return this.http.get<SimpleUser[]>(this.apiURL + '/admin/users')
  }

  updateUser(id, role) {
    return this.http.patch<SimpleUser>(this.apiURL + '/admin/users/' + id, {role})
  }
}
