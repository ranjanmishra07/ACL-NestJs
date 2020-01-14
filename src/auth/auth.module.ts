import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
    (forwardRef(() => UsersModule)),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
