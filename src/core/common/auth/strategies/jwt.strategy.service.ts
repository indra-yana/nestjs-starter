import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JWTStrategyService extends PassportStrategy(Strategy, 'jwt_auth') {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {    
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('auth.jwt.access_token_key'),
        });
    }

    async validate(payload: any) {        
        return await this.authService.whoami(payload._uid);
    }
}
