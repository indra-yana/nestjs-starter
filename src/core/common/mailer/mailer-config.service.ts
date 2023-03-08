import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Injectable } from '@nestjs/common';
import { LocaleService } from '../locale/locale.service';
import { MailerOptions } from '@nestjs-modules/mailer/dist';
import { MailerOptionsFactory } from '@nestjs-modules/mailer';

@Injectable()
export class MailerConfigService implements MailerOptionsFactory {
    constructor(
        private configService: ConfigService,
        private localeService: LocaleService,
    ) { }

    createMailerOptions(): MailerOptions | Promise<MailerOptions> {
        return {
            transport: {
                host: this.configService.get('email.host'),
                port: this.configService.get('email.port'),
                ignoreTLS: true,
                secure: false,
                auth: {
                  user: this.configService.get('email.username'),
                  pass: this.configService.get('email.password'),
                },
            },
            defaults: {
                from: this.configService.get('email.from'),
            },
            template: {
                dir: this.configService.get('email.template_dir'),
                adapter: new HandlebarsAdapter({ t: this.localeService.t }),
                options: {
                    strict: true
                }
            }
        }
    }

}
