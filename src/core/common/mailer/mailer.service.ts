import { Injectable } from '@nestjs/common';
import { MailerService as NodeMailerService } from "@nestjs-modules/mailer";
import { LocaleService } from '../locale/locale.service';

@Injectable()
export class MailerService {
    
    constructor(
        private mailerService: NodeMailerService,
        private localeService: LocaleService,
    ) { }

    async sendForgotPasswordEmail(email: string, params: any) {
        await this.mailerService.sendMail({
            to: email,
            subject: this.localeService.t('app.password.notification'), 
            template: 'reset-password',
            context: {
                url: params.url
            }
        });
    }

    async sendVerificationEmail(email: string, params: any) {
        await this.mailerService.sendMail({
            to: email,
            subject: this.localeService.t('app.verify.notification'), 
            template: 'verify',
            context: {
                url: params.url
            }
        });
    }

    async sendWelcomeEmail(email: string, params: any) {
        const trans = {
            args: { 
                name: params.name || 'User', 
            }
        }

        await this.mailerService.sendMail({
            to: email,
            subject: this.localeService.t('app.verify.welcome', trans), 
            template: 'welcome',
            context: {
                trans,
            }
        });
    }

}
