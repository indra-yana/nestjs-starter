import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/core/common/auth/auth.service';

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy, 'basic_auth') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'credential',
            passwordField: 'password',
        });
    }

    async validate(credential: string, password: string): Promise<any> {
        const user = await this.authService.basicAuth(credential, password);
        return user;
      }
}
