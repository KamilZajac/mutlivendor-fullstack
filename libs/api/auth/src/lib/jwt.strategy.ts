import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { SimpleUser } from '@multivendor-fullstack/interfaces';
import { UserService } from '@multivendor-fullstack/api/user';

export interface AccessTokenPayload {
	sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	public constructor (private users: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: '123123',
			signOptions: {
				expiresIn: '5m',
			},
		})

		this.users = users
	}

	async validate (payload: AccessTokenPayload): Promise<SimpleUser> {
		const { sub: id } = payload

		const user = await this.users.findById(id)

		if (!user) {
			return null
		}

		return user
	}
}
