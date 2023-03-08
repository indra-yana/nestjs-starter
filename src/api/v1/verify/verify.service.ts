import { createToken, joiValidationFormat } from 'src/core/helper/helper';
import { Injectable } from '@nestjs/common';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { UserService } from '../user/user.service';
import ValidationException from 'src/core/exceptions/ValidationException';

@Injectable()
export class VerifyService {
    constructor(
        private userService: UserService,
        private locale: LocaleService
    ) {}

    async verify(payload: any) {
        const { email, token } = payload;

        // TODO: Check token from database for comparison
        // Determine if the token matches with specified email and expires timestamp.
        const tokenPart = token.split('#');
        const expires = tokenPart[0];
        const matches = tokenPart[1] === createToken(email, expires);

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

}
