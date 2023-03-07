import { ConfigService } from '@nestjs/config';
import { createToken, joiValidationFormat } from 'src/core/helper/helper';
import { Injectable } from '@nestjs/common';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { UserService } from '../user/user.service';
import InvariantException from 'src/core/exceptions/InvariantException';
import ValidationException from 'src/core/exceptions/ValidationException';

export enum LINK_TYPE {
    FORGOT_PASSWORD = 1,
    VERIFY = 2,
}

@Injectable()
export class ForgotPasswordService {
    constructor(
        private configService: ConfigService, 
        private userService: UserService,
        private locale: LocaleService,
    ) {}

    async generateLink(email: string, type: LINK_TYPE) {
        await this.userService.findOneBy('email', email);
        
        const expires = new Date();
        let feURL = '';
        let expireMinutes = 0;

        if (type == LINK_TYPE.FORGOT_PASSWORD) {
            expireMinutes = expires.getMinutes() + this.configService.get('auth.forgot_password.link_expire_minutes');
            feURL = this.configService.get('auth.forgot_password.frontend_url');
        } else if (type == LINK_TYPE.VERIFY) {
            expireMinutes = expires.getMinutes() + this.configService.get('auth.verify.link_expire_minutes');
            feURL = this.configService.get('auth.verify.frontend_url');
        } else {
            throw new InvariantException({ message: 'Invalid reset link type!' });
        }
        
        expires.setMinutes(expireMinutes);
        const expiresMs = expires.getTime();
        const token = `${expiresMs}#${createToken(email, expiresMs)}`;        
        const encodedToken = encodeURIComponent(token);
        const encodedEmail = encodeURIComponent(email);
        
        const link = `${feURL}/${encodedToken}?email=${encodedEmail}`;
        
        // TODO: Save token to database
        return link;
    }

    async resetPassword(payload: any) {
        const { email, password, token } = payload;

        // TODO: Check token from database for comparison
        // Determine if the token matches with specified email and expires timestamp.
        const tokenPart = token.split('#');
        const expires = tokenPart[0];
        const matches = tokenPart[1] === createToken(email, expires);

        if (!matches) {
            throw new ValidationException({ 
                message: this.locale.t('app.password.token'), 
                error: joiValidationFormat([
                    {
                        path: ['email'],
                        message: this.locale.t('app.password.token'),
                    },
                ])
            });
        }

        if (Date.now() > expires) {
            throw new ValidationException({ 
                message: this.locale.t('app.password.expired'), 
                error: joiValidationFormat([
                    {
                        path: ['email'],
                        message: this.locale.t('app.password.expired'),
                    },
                ])
            });
        }

        // TODO: delete token from database to create one time token
        
        const user = await this.userService.findOneBy('email', email);
        return await this.userService.updatePassword(user.id, password);
    }
}
