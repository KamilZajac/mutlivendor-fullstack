import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegisterDto } from '@multivendor-fullstack/dto';
import { take } from 'rxjs/operators';
import { AuthenticationPayload } from '@multivendor-fullstack/interfaces';

@Component({
  selector: 'multivendor-fullstack-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private authService: AuthService) { }

  public register(data: RegisterDto) {
    this.authService.register(data).pipe(take(1)).subscribe((res: AuthenticationPayload) => {
      console.log(res)
    })
  }

}
