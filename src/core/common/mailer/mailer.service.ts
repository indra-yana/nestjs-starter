import { Injectable } from '@nestjs/common';
import { MailerService as NodeMailerService } from "@nestjs-modules/mailer";
import { LocaleService } from '../locale/locale.service';

@Injectable()
export class MailerService {
    
    constructor(
        private nodeMailer: NodeMailerService,
        private localeService: LocaleService,
    ) { }

    async sendForgotPasswordEmail(email: string, params: any) {
        await this.nodeMailer.sendMail({
            to: email,
            subject: this.localeService.t('app.password.notification'), 
            template: 'auth/reset-password', 
            context: {
                url: params.url
            }
        });
    }

    async sendVerificationEmail(email: string, params: any) {
        await this.nodeMailer.sendMail({
            to: email,
            subject: this.localeService.t('app.verify.notification'), 
            template: 'auth/verify',
            context: {
                url: params.url
            }
        });
    }

    async sendWelcomeEmail(email: string, params: any) {
        const args = {
            name: params.name || 'User', 
        }

        await this.nodeMailer.sendMail({
            to: email,
            subject: this.localeService.t('app.verify.welcome', args), 
            template: 'auth/welcome',
            context: {
                args,
            }
        });
    }

}
