import { Injectable } from '@nestjs/common';
import { joiValidationFormat } from 'src/core/helper/helper';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'; 
import AuthenticationException from 'src/core/exceptions/AuthenticationException';
import validateEmail from 'filter-validate-email';

@Injectable()
export class LoginService {

    constructor(private userService: UserService, private locale: LocaleService){ }

    credentialField(value: string): string {
        return validateEmail(value, false) ? 'email' : 'username';
    }

    getCredentials(credential: string): object {
        return {
            [this.credentialField(credential)]: credential,
        };
    }

    async basicLogin(credential: string, password: string) {
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
}
