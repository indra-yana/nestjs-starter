import { Body, ClassSerializerInterceptor, Controller, Post, Req } from '@nestjs/common';
import { MailerService } from 'src/core/common/mailer/mailer.service';
import { Put, UseInterceptors } from '@nestjs/common/decorators';
import { Throttle } from '@nestjs/throttler';
import { ValidatorService } from 'src/core/common/validator/validator.service';
import { verifyAccountSchema } from './verify.validator.schema';
import { VerifyService } from './verify.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({
    path: 'auth/verify',
    version: '1',
})
export class VerifyController {
    constructor(
        private verifyService: VerifyService,
        private mailerService: MailerService,
        private validator: ValidatorService,
    ) { }

    @Throttle(5, 60)
    @Post('resend')
    async resendEmailVerification(@Req() request: any) {
        try {
            const user = request.user;
            const email = user.email;
            const link = await this.verifyService.createVerificationLink(email);

            if (link.url !== null) {
                this.mailerService.sendVerificationEmail(email, link);
            }

            return link;
        } catch (error) {
            throw error;
        }
    }

    @Put()
    async verifyAccount(@Body() body: any) {
        try {
            this.validator.schema(verifyAccountSchema).validate(body);
            
            const result = await this.verifyService.verify(body);
            if (!result.already_verify) {
                this.mailerService.sendWelcomeEmail(body.email, result);
            }
            
            delete result.already_verify;
            return result;
        } catch (error) {
            throw error;
        }
    }
}
