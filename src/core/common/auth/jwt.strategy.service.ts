import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';

@Injectable()
export class JWTStrategyService extends PassportStrategy(Strategy, 'jwt_auth') {
    constructor(configService: ConfigService) {    
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('auth.jwt.access_token_key'),
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
