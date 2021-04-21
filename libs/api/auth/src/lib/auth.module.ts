import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '@multivendor-fullstack/api/user';

@Module({
  controllers: [AuthController],
	imports: [
		UserModule,
		JwtModule.register({
			secret: '123123',
			signOptions: {
				expiresIn: '60m',
			}
		}),
	],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
