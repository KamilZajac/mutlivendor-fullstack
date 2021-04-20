import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
	imports: [
		UserModule,
		JwtModule.register({
			secret: '123123',
			signOptions: {
				expiresIn: '10s',
			}
		}),
	],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
