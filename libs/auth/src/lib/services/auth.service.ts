import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterDto, LoginDto } from '@multivendor-fullstack/dto';
import { AuthenticationResponse, UserResponse } from '@multivendor-fullstack/interfaces';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(
    private http: HttpClient,
    @Inject('apiURL') private apiURL: string
  ) {
  }

  public login(data: LoginDto): Observable<UserResponse> {
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
        catchError(e => of(e))
      );
  }


  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
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
