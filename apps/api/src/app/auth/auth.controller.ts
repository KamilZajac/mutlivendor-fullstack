import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthenticationPayload, UserResponse } from '@multivendor-fullstack/interfaces';
import { CreateUserDto, LoginDto, RefreshTokenDto } from '@multivendor-fullstack/dto';

@Controller('auth')
export class AuthController {
  constructor(
  						private readonly authService: AuthService,
							private readonly usersService: UserService
	) {}

	@Post('/register')
	public async register (@Body() body: CreateUserDto) {
		const user = await this.usersService.create(body)

		const token = await this.authService.generateAccessToken(user)
		const refresh = await this.authService.generateRefreshToken(user, 60 * 60 * 24 * 30)

		const payload = this.buildResponsePayload(user, token, refresh)

		return {
			status: 'success',
			data: payload,
		}
	}
	@Post('/login')
	public async login (@Body() body: LoginDto) {
		const { username, password } = body

		const user = await this.usersService.findByUserName(username)
		const valid = user ? await this.usersService.validateCredentials(user, password) : false

		if (!valid) {
			throw new UnauthorizedException('The login is invalid')
		}

		const token = await this.authService.generateAccessToken(user)
		const refresh = await this.authService.generateRefreshToken(user, 60 * 60 * 24 * 30)

		const payload = this.buildResponsePayload(user, token, refresh)

		return {
			status: 'success',
			data: payload,
		}
	}

	@Post('/refresh')
	public async refresh (@Body() body: RefreshTokenDto) {
		const { user, token } = await this.authService.createAccessTokenFromRefreshToken(body.refresh_token)

		const payload = this.buildResponsePayload(user, token)

		return {
			status: 'success',
			data: payload,
		}
	}


	private buildResponsePayload (user: UserResponse, accessToken: string, refreshToken?: string): AuthenticationPayload {
		return {
			user: user,
			payload: {
				type: 'bearer',
				token: accessToken,
				...(refreshToken ? { refresh_token: refreshToken } : {}),
			}
		}
	}


}
