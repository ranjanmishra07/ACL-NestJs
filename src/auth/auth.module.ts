import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
    (forwardRef(() => UserModule)),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy,GoogleStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
