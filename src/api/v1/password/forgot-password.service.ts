import { createToken, joiValidationFormat } from 'src/core/helper/helper';
import { Injectable } from '@nestjs/common';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { UserService } from '../user/user.service';
import ValidationException from 'src/core/exceptions/ValidationException';

@Injectable()
export class ForgotPasswordService {
    constructor(
        private userService: UserService,
        private locale: LocaleService,
    ) {}

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
