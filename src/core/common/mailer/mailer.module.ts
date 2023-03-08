import { ConfigService } from '@nestjs/config';
import { Global } from '@nestjs/common/decorators';
import { MailerConfigService } from './mailer-config.service';
import { MailerModule as NodeMailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { MailerService } from './mailer.service';

@Global()
@Module({
  imports: [
    NodeMailerModule.forRootAsync({
      useClass: MailerConfigService,
      inject: [ConfigService, I18nService],
    }),
  ],
  exports: [MailerService],
  providers: [MailerConfigService, MailerService]
})
export class MailerModule {}
