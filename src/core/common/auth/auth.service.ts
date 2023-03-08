import { ConfigService } from '@nestjs/config';
import { createToken, joiValidationFormat } from 'src/core/helper/helper';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { UserService } from '../../../api/v1/user/user.service';
import * as bcrypt from 'bcrypt'; 
import AuthenticationException from 'src/core/exceptions/AuthenticationException';
import ForbidenException from 'src/core/exceptions/ForbidenException';
import InvariantException from 'src/core/exceptions/InvariantException';
import NotFoundException from 'src/core/exceptions/NotFoundException';
import validateEmail from 'filter-validate-email';

export enum LINK_TYPE {
    FORGOT_PASSWORD = 1,
    VERIFY = 2,
}

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService, 
        private jwtService: JwtService, 
        private locale: LocaleService,
        private configService: ConfigService,
    ){ }

    credentialField(value: string): string {
        return validateEmail(value, false) ? 'email' : 'username';
    }

    getCredentials(credential: string): object {
        return {
            [this.credentialField(credential)]: credential,
        };
    }

    async generateLink(email: string, type: LINK_TYPE) {
        const user = await this.userService.findOneBy('email', email);
        
        const expires = new Date();
        let feURL = '';
        let expireMinutes = 0;
        let message = '';

        if (type == LINK_TYPE.FORGOT_PASSWORD) {
            expireMinutes = expires.getMinutes() + this.configService.get('auth.forgot_password.link_expire_minutes');
            feURL = this.configService.get('auth.forgot_password.frontend_url');
            message = this.locale.t('app.password.sent');
        } else if (type == LINK_TYPE.VERIFY) {
            if (user.email_verified_at !== null) {
                return { 
                    message: this.locale.t('app.auth.email_verified'),
                    email_verified_at: user.email_verified_at,
                    url: null,
                }
            }

            expireMinutes = expires.getMinutes() + this.configService.get('auth.verify.link_expire_minutes');
            feURL = this.configService.get('auth.verify.frontend_url');
            message = this.locale.t('app.verify.sent');
        } else {
            throw new InvariantException({ message: 'Invalid reset link type!' });
        }
        
        expires.setMinutes(expireMinutes);
        const expiresMs = expires.getTime();
        const token = `${expiresMs}#${createToken(email, expiresMs)}`;        
        const encodedToken = encodeURIComponent(token);
        const encodedEmail = encodeURIComponent(email);

        const url = `${feURL}/${encodedToken}?email=${encodedEmail}`;

        // TODO: Save token to database
        return {
            message,
            url
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

        return {
            _uid: result.id,
            username: result.username,
            email: result.email,
        }
    }

    async jwtAuth(user: any) {
        const payload = { 
            _uid: user._uid, 
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
