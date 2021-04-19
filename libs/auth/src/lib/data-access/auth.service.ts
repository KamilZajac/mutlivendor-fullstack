import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUserDto, LoginDto } from '@multivendor-fullstack/dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject('apiURL') private apiURL: string
    ) { }


    login(data: LoginDto) {
      return this.http.post(`${this.apiURL}/auth/login`, data)
    }

  public register(data: CreateUserDto) {
    return this.http.post(`${this.apiURL}/auth/register`, data)
  }
}
