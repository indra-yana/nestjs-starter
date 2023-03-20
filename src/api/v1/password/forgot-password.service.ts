import { ConfigService } from '@nestjs/config';
import { createToken, joiValidationFormat } from 'src/core/helper/helper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { PasswordReset } from 'src/core/common/database/typeorm/entities/password-reset';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import NotFoundException from 'src/core/exceptions/NotFoundException';
import ValidationException from 'src/core/exceptions/ValidationException';

@Injectable()
export class ForgotPasswordService {
    constructor(
        private userService: UserService,
        private locale: LocaleService,
        private configService: ConfigService,
        @InjectRepository(PasswordReset)
        private passwordResetRepository: Repository<PasswordReset>,
    ) {}

    async resetPassword(payload: any) {
        const { email, password, token } = payload;
        const tokenPart = await this.checkToken(email, token);
        const expires = tokenPart.expire_at;
        const matches = tokenPart.token === createToken(email, expires);

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

        await this.deleteToken(email, token);
        
        const user = await this.userService.findOneBy('email', email);
        return await this.userService.updatePassword(user.id, password);
    }

    async createPasswordResetLink(email: string) {
        await this.userService.findOneBy('email', email);
        
        const expires = new Date();
        const expireMinutes = expires.getMinutes() + this.configService.get('email.forgot_password.link_expire_minutes');
        const feURL = this.configService.get('email.forgot_password.frontend_url');
        
        expires.setMinutes(expireMinutes);
        const expiresMs = expires.getTime();
        const token = createToken(email, expiresMs);        
        const encodedToken = encodeURIComponent(token);
        const encodedEmail = encodeURIComponent(email);

        const url = `${feURL}/${encodedToken}?email=${encodedEmail}`;
        await this.passwordResetRepository.save(new PasswordReset({
            email,
            token,
            expire_at: expiresMs,
        }));

        return {
            message: this.locale.t('app.password.sent'),
            url
        };
    }

    async checkToken(email: string, token: string): Promise<PasswordReset> {
        const result = await this.passwordResetRepository.findOne({
            where: {
                email,
                token,
            },
            order: {
                created_at: 'DESC'
            }
        });

        if (!result) {
            throw new NotFoundException({
                message: this.locale.t('app.password.token_notfound'), 
                error: joiValidationFormat([
                    {
                        path: ['email'],
                        message: this.locale.t('app.password.token_notfound'),
                    },
                ])
            });
        }
        
        return result;
    }

    async deleteToken(email: string, token: string) {
        const result = await this.passwordResetRepository.delete({ email, token });
        return result.affected !== 0;
    }
}
