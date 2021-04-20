import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterDto, LoginDto } from '@multivendor-fullstack/dto';
import { AuthenticationPayload, AuthenticationResponse, UserResponse } from '@multivendor-fullstack/interfaces';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject('apiURL') private apiURL: string
  ) {
  }

  public login(data: LoginDto): Observable<UserResponse> {
    console.log(data)
    return this.http.post<AuthenticationResponse>(`${this.apiURL}/auth/login`, data)
      .pipe(
        tap((res: AuthenticationResponse) => {
          console.log('I WILL ASSIGN TOKENS')
          console.log(res.data.jwt)
          console.log('-----')
        }),
        map((res: AuthenticationResponse) => {
          return res.data.user
        }),
        catchError(e => of(null))
      )
  }

  public register(data: RegisterDto) {
    return this.http.post(`${this.apiURL}/auth/register`, data);
  }
}
