import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { RefreshToken } from './entities/refreshToken.entity';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserResponse } from '@multivendor-fullstack/interfaces';


const BASE_OPTIONS: SignOptions = {
	issuer: 'http://localhost:4200',
	audience:'http://localhost:4200',
}
export interface RefreshTokenPayload {
	jti: number;
	sub: number
}

@Injectable()
export class AuthService {

	constructor(protected jwt: JwtService, private users: UserService) {
	}

	public async generateAccessToken (user: UserResponse): Promise<string> {
		const opts: SignOptions = {
			...BASE_OPTIONS,
			subject: String(user.id),
		}

		return this.jwt.signAsync({}, opts)
	}

	public async generateRefreshToken (user: UserResponse, expiresIn: number): Promise<string> {
		const token = await this.createRefreshToken(user, expiresIn)

		const opts: SignOptions = {
			...BASE_OPTIONS,
			expiresIn,
			subject: String(user.id),
			jwtid: String(token.id),
		}

		return this.jwt.signAsync({}, opts)
	}


	public async resolveRefreshToken (encoded: string): Promise<{ user: UserResponse, token: RefreshToken }> {
		const payload = await this.decodeRefreshToken(encoded)
		const token = await this.getStoredTokenFromRefreshTokenPayload(payload)

		if (!token) {
			throw new UnprocessableEntityException('Refresh token not found')
		}

		if (token.is_revoked) {
			throw new UnprocessableEntityException('Refresh token revoked')
		}

		const user = await this.getUserFromRefreshTokenPayload(payload)

		if (!user) {
			throw new UnprocessableEntityException('Refresh token malformed')
		}

		return { user, token }
	}

	public async createAccessTokenFromRefreshToken (refresh: string): Promise<{ token: string, user: UserResponse }> {
		const { user } = await this.resolveRefreshToken(refresh)

		const token = await this.generateAccessToken(user)

		return { user, token }
	}

	private async decodeRefreshToken (token: string): Promise<RefreshTokenPayload> {
		try {
			return this.jwt.verifyAsync(token)
		} catch (e) {
			if (e instanceof TokenExpiredError) {
				throw new UnprocessableEntityException('Refresh token expired')
			} else {
				throw new UnprocessableEntityException('Refresh token malformed')
			}
		}
	}

	private async getUserFromRefreshTokenPayload (payload: RefreshTokenPayload): Promise<UserResponse> {
		const subId = payload.sub

		if (!subId) {
			throw new UnprocessableEntityException('Refresh token malformed')
		}

		return this.users.findById(subId)
	}

	private async getStoredTokenFromRefreshTokenPayload (payload: RefreshTokenPayload): Promise<RefreshToken | null> {
		const tokenId = payload.jti

		if (!tokenId) {
			throw new UnprocessableEntityException('Refresh token malformed')
		}

		return this.findTokenById(tokenId)
	}


	public async createRefreshToken (user: UserResponse, ttl: number): Promise<RefreshToken> {
		const token = new RefreshToken()

		token.user_id = user.id
		token.is_revoked = false

		const expiration = new Date()
		expiration.setTime(expiration.getTime() + ttl)

		token.expires = expiration

		return token.save()
	}

	public async findTokenById (id: number): Promise<RefreshToken | null> {
		return RefreshToken.findOne(id)
	}
}
