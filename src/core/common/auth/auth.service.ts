import { Injectable } from '@nestjs/common';
import { joiValidationFormat } from 'src/core/helper/helper';
import { JwtService } from '@nestjs/jwt';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { UserService } from '../../../api/v1/user/user.service';
import * as bcrypt from 'bcrypt'; 
import AuthenticationException from 'src/core/exceptions/AuthenticationException';
import ForbidenException from 'src/core/exceptions/ForbidenException';
import NotFoundException from 'src/core/exceptions/NotFoundException';
import validateEmail from 'filter-validate-email';
import { User } from '../database/typeorm/entities/user';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService, 
        private jwtService: JwtService, 
        private locale: LocaleService,
    ) { }

    credentialField(value: string): string {
        return validateEmail(value, false) ? 'email' : 'username';
    }

    getCredentials(credential: string): object {
        return {
            [this.credentialField(credential)]: credential,
        };
    }

    async whoami(id: string) {        
        return await this.userService.find(id);
    }

    async basicAuth(credential: string, password: string) {
        const credentials = this.getCredentials(credential);        
        const result = await this.userService.findWithCredential(credentials);

        if (!result) {
            throw new AuthenticationException({
                message: this.locale.t('app.auth.login_failed'),
                error: joiValidationFormat([
                    {
                        path: ['credential'],
                        message: this.locale.t('app.auth.failed'),
                    },
                ]),
            });
        }

        const hashedPassword = result.password;
        const match = await bcrypt.compare(password, hashedPassword);
        if (!match) {
            throw new AuthenticationException({
                message: this.locale.t('app.auth.login_failed'),
                error: joiValidationFormat([
                    {
                        path: ['password'],
                        message: this.locale.t('app.auth.failed'),
                    },
                ]),
            });
        }

        return result;
    }

    async jwtAuth(user: User) {
        const payload = { 
            _uid: user.id, 
            username: user.username, 
            email: user.email 
        }

        return {
            token: {
                accessToken: this.jwtService.sign(payload),
                // refreshToken: null,
            }
        }
    }

    async socialAuth(data: any, provider: string) {
        return await this.userService.findOrCreate({
            ...data,
            provider,
        });
    }

    verifyJwt(token: string) {
        try {
            const user = this.jwtService.verify(token);            
            return user;
        } catch (error) {
            return null;
        }
    }

    async confirmPassword(id: string, password: string) {
        const user = await this.userService.find(id, true);
        if (!user) {
            throw new NotFoundException({ message: this.locale.t('app.message.data_notfound')});
        }
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new ForbidenException({
                message: this.locale.t('app.password.incorrect'),
                error: joiValidationFormat([
                    {
                        path: ['password'],
                        message: this.locale.t('app.auth.password'),
                    },
                ]),
            });
        }
    }
}
