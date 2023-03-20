import { ConfigService } from '@nestjs/config';
import { createToken, joiValidationFormat } from 'src/core/helper/helper';
import { Injectable } from '@nestjs/common';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { UserService } from '../user/user.service';
import ValidationException from 'src/core/exceptions/ValidationException';

@Injectable()
export class VerifyService {
    constructor(
        private userService: UserService,
        private locale: LocaleService,
        private configService: ConfigService,
    ) {}

    async verify(payload: any) {
        const { email, token, expire } = payload;
        const expires = parseInt(expire);
        const matches = token === createToken(email, expires);

        if (!matches) {
            throw new ValidationException({
                message: this.locale.t('app.verify.token'),
                error: joiValidationFormat([
                    {
                        path: ['email'],
                        message: this.locale.t('app.verify.token'),
                    },
                ]),
            });
        }

        if (Date.now() > expires) {
            throw new ValidationException({
                message: this.locale.t('app.verify.expired'),
                error: joiValidationFormat([
                    {
                        path: ['email'],
                        message: this.locale.t('app.verify.expired'),
                    },
                ]),
            });
        }

        const user = await this.userService.findOneBy('email', email);
        if (user.email_verified_at !== null) {
            return { 
                message: this.locale.t('app.auth.email_verified'),
                name: user.name,
                email_verified_at: user.email_verified_at,
                already_verify: true,
            }
        }

        const updatedAt = new Date().toISOString();
        const result = await this.userService.patchOneBy(user.id, 'email_verified_at', updatedAt);
        return {
            message: this.locale.t('app.verify.verified'),
            email_verified_at: result.email_verified_at,
            name: result.name,
            already_verify: false,
        };
    }

    async createVerificationLink(email: string) {
        const user = await this.userService.findOneBy('email', email);

        if (user.email_verified_at !== null) {
            return { 
                message: this.locale.t('app.auth.email_verified'),
                email_verified_at: user.email_verified_at,
                url: null,
            }
        }
        
        const expires = new Date();
        const expireMinutes = expires.getMinutes() + this.configService.get('email.verify.link_expire_minutes');
        const feURL = this.configService.get('email.verify.frontend_url');

        expires.setMinutes(expireMinutes);
        const expiresMs = expires.getTime();
        const token = createToken(email, expiresMs);  
        const encodedToken = encodeURIComponent(token);
        const encodedEmail = encodeURIComponent(email);

        const url = `${feURL}/${expiresMs}/${encodedToken}?email=${encodedEmail}`;

        return {
            message: this.locale.t('app.verify.sent'),
            url
        };
    }

}
