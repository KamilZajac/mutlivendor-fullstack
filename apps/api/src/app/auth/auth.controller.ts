import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthenticationResponse } from '@multivendor-fullstack/interfaces';
import { RegisterDto, LoginDto, RefreshTokenDto } from '@multivendor-fullstack/dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

	@Post('/register')
	public async register (@Body() body: RegisterDto): Promise<AuthenticationResponse> {
    return this.authService.register(body)
  }

	@Post('/login')
	public async login (@Body() body: LoginDto): Promise<AuthenticationResponse> {
		return this.authService.login(body);
	}

	@Post('/refresh')
	public async refresh (@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body)
	}
}
