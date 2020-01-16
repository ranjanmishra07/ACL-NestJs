import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { jwtConstants } from 'src/config/typeorm.config';


@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    (forwardRef(() => UsersModule)),
  ],
  providers: [AuthService, JwtStrategy,GoogleStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
