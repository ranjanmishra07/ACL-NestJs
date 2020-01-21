import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { googleSecret } from "src/config/typeorm.config";
import { AuthService } from "./auth.service";
import { UserService } from "src/users/services/user.service";
import {Provider} from './auth.service';
import { UserRoleService } from "src/users/services/user-roles.service";
import { UserPermissionService } from "src/users/services/user-permissions.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{

    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UserService,
        private readonly userRoleService: UserRoleService,
        private readonly userPermissionService: UserPermissionService,
    ) {
        super({
            clientID: googleSecret.clientID,
            clientSecret: googleSecret.clientSecret,
            callbackURL: '/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile', 'email']
        });
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
        try {
            const user = await this.usersService.findOne(profile.emails[0].value);
            if (!user) throw new HttpException('User not found', HttpStatus.FORBIDDEN);
            const roles = await this.userRoleService.getUserRoles(user);
            const roleIds = roles.map(r => r.id);
            const permissions = await this.userPermissionService.getUserPermissions(user);
            const pcodes = permissions.map(p => p.pcode);
            const jwt: string = await this.authService.validateOAuthLogin(user, Provider.GOOGLE);
            const payload = {accessToken: jwt, roles, permissions}
            // console.log(accessToken);
            done(null, {payload});
        }
        catch (err) {
            done(err, false);
        }
    }

}