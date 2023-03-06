import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginService } from 'src/api/v1/login/login.service';

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy, 'basic_auth') {
    constructor(private loginService: LoginService) {
        super({
            usernameField: 'credential',
            passwordField: 'password',
        });
    }

    async validate(credential: string, password: string): Promise<any> {
        
        const user = await this.loginService.basicLogin(credential, password);
        return user;
      }
}
