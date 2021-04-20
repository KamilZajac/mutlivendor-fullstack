import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { RefreshToken } from './entities/refreshToken.entity';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthenticationResponse, UserResponse } from '@multivendor-fullstack/interfaces';
import { LoginDto, RefreshTokenDto, RegisterDto } from '@multivendor-fullstack/dto';
import { User } from '../user/entities/user.entity';


const BASE_OPTIONS: SignOptions = {
  issuer: 'http://localhost:4200',
  audience: 'http://localhost:4200'
};

export interface RefreshTokenPayload {
  jti: number;
  sub: number
}

@Injectable()
export class AuthService {

  filterUser(user: User): UserResponse {
    const { email, id, username } = user;
    return { email, id, username };
  }

  constructor(protected jwt: JwtService, private usersService: UserService) {
  }

  public async generateAccessToken(user: User): Promise<string> {
    const opts: SignOptions = {
      ...BASE_OPTIONS,
      subject: String(user.id)
    };

    return this.jwt.signAsync({}, opts);
  }

  public async generateRefreshToken(user: User, expiresIn: number): Promise<string> {
    const token = await this.createRefreshToken(user, expiresIn);

    const opts: SignOptions = {
      ...BASE_OPTIONS,
      expiresIn,
      subject: String(user.id),
      jwtid: String(token.id)
    };

    return this.jwt.signAsync({}, opts);
  }


  public async resolveRefreshToken(encoded: string): Promise<{ user: User, token: RefreshToken }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

    if (!token) {
      throw new UnprocessableEntityException('Refresh token not found');
    }

    if (token.is_revoked) {
      throw new UnprocessableEntityException('Refresh token revoked');
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return { user, token };
  }

  public async createAccessTokenFromRefreshToken(refresh: string): Promise<{ token: string, user: User }> {
    const { user } = await this.resolveRefreshToken(refresh);

    const token = await this.generateAccessToken(user);

    return { user, token };
  }

  private async decodeRefreshToken(token: string): Promise<RefreshTokenPayload> {
    try {
      return this.jwt.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  private async getUserFromRefreshTokenPayload(payload: RefreshTokenPayload): Promise<User> {
    const subId = payload.sub;

    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.usersService.findById(subId);
  }

  private async getStoredTokenFromRefreshTokenPayload(payload: RefreshTokenPayload): Promise<RefreshToken | null> {
    const tokenId = payload.jti;

    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.findTokenById(tokenId);
  }


  public async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {
    const token = new RefreshToken();

    token.user_id = user.id;
    token.is_revoked = false;

    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    token.expires = expiration;

    return token.save();
  }

  public async findTokenById(id: number): Promise<RefreshToken | null> {
    return RefreshToken.findOne(id);
  }

  public async login(loginData: LoginDto): Promise<AuthenticationResponse> {
    const user = await this.usersService.findByUserName(loginData.username);
    const valid = user ? await this.usersService.validateCredentials(user, loginData.password) : false;

    if (!valid) {
      throw new UnauthorizedException('The login is invalid');
    }

    const token = await this.generateAccessToken(user);
    const refresh = await this.generateRefreshToken(user, 60 * 60 * 24 * 30);

    return {
      success: true,
      data: {
        user: this.filterUser(user),
        jwt: { token, refresh }
      }
    };
  }

  public async register(registerData: RegisterDto): Promise<AuthenticationResponse> {
    const user = await this.usersService.create(registerData);

    const token = await this.generateAccessToken(user);
    const refresh = await this.generateRefreshToken(user, 60 * 60 * 24 * 30);


    return {
      success: true,
      data: {
        user: this.filterUser(user),
        jwt: { token, refresh }
      }
    };
  }

  public async refreshToken(body: RefreshTokenDto): Promise<AuthenticationResponse> {
    const { user, token } = await this.createAccessTokenFromRefreshToken(body.refresh_token);

    return {
      success: true,
      data: {
        user: this.filterUser(user),
        jwt: { token }
      }
    };
  }
}
