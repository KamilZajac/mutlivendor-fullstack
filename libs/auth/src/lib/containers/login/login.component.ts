import { Component } from '@angular/core';
import { AuthService } from '../../data-access/auth.service';
import { LoginDto } from '@multivendor-fullstack/dto';
import { take } from 'rxjs/operators';
import { AuthenticationPayload } from '@multivendor-fullstack/interfaces';

@Component({
  selector: 'multivendor-fullstack-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  constructor(private authService: AuthService) { }

  public login(data:LoginDto) {
    this.authService.login(data).pipe(take(1)).subscribe((res: AuthenticationPayload) => {
      console.log(res)
    })
  }
}
