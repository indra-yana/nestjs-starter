import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { LoginService } from 'src/api/v1/login/login.service';

@Injectable()
export class JWTStrategyService extends PassportStrategy(Strategy, 'jwt_auth') {
    constructor(configService: ConfigService, private loginService: LoginService) {
        const secretOrKey = configService.get('auth.jwt.access_token_key');
    
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey,
        });
    }

    async validate(payload: any) {
        return { 
            _uid: payload._uid, 
            email: payload.email,
            username: payload.username,
        };
    }
}
