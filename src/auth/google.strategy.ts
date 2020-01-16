import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { googleSecret } from "src/config/typeorm.config";
import { AuthService, Provider } from "./auth.service";
import { httpErrorMessage } from "src/errorModule/error-message";
import { Users } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{

    constructor(private readonly authService: AuthService,
            private readonly usersService : UsersService) {
        super({
            clientID: googleSecret.clientID,
            clientSecret: googleSecret.clientSecret,
            callbackURL: '/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile', 'email']
        })
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
        try {
            const user = await this.usersService.findOne(profile.emails[0].value);
            if (!user) throw new HttpException(httpErrorMessage.oauthUserNotFound, HttpStatus.FORBIDDEN);
            const jwt: string = await this.authService.validateOAuthLogin(user, Provider.GOOGLE)
            const accessToken = { jwt }
            done(null, accessToken);
        }
        catch (err) {
            done(err, false);
        }
    }

}