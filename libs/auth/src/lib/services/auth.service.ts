import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterDto, LoginDto } from '@multivendor-fullstack/dto';
import { AuthenticationResponse, SimpleUser } from '@multivendor-fullstack/interfaces';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthState } from '../+state/auth.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../+state/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(
    private store: Store<AuthState>,
    private http: HttpClient,
    @Inject('apiURL') private apiURL: string
  ) {
  }

  public login(data: LoginDto): Observable<SimpleUser> {
    return this.http.post<AuthenticationResponse>(`${this.apiURL}/auth/login`, data)
      .pipe(
        tap((res: AuthenticationResponse) => {
          this.storeTokens(res.data.jwt.token, res.data.jwt.refresh);
        }),
        map((res: AuthenticationResponse) => {
          return res.data.user;
        }),
        catchError(e => of(null))
      );
  }

  public register(data: RegisterDto) {
    return this.http.post(`${this.apiURL}/auth/register`, data);
  }

  public refreshToken() {
    const refreshToken = this.getRefreshToken();

    return this.http.post<AuthenticationResponse>(`${this.apiURL}/auth/refresh`, { refresh_token: refreshToken })
      .pipe(
        tap((res: AuthenticationResponse) => {
          this.storeTokens(res.data.jwt.token, res.data.jwt.refresh);
        }),
        map((res: AuthenticationResponse) => {
          return res.data.jwt;
        }),
        catchError(e => {
          this.logout()
          this.store.dispatch(authActions.logout(null))
          return of(e)
        })
      );
  }

  getMe() {
    return this.http.get<SimpleUser>(`${this.apiURL}/user/me`)
  }


  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private logout() {
    this.removeTokens();

  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(token, refresh?) {
    localStorage.setItem(this.JWT_TOKEN, token);
    if (refresh) {
      localStorage.setItem(this.REFRESH_TOKEN, refresh);
    }
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
