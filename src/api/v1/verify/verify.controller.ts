import { AuthService, LINK_TYPE } from 'src/core/common/auth/auth.service';
import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { MailerService } from 'src/core/common/mailer/mailer.service';
import { VerifyService } from './verify.service';

@Controller({
    path: 'auth/verify',
    version: '1',
})
export class VerifyController {
    constructor(
        private authService: AuthService,
        private verifyService: VerifyService,
        private mailerService: MailerService,
    ) { }

    @Post('resend')
    async resendEmailVerification(@Req() request: any) {
        try {
            const user = request.user;
            const email = user.email;
            const link = await this.authService.generateLink(email, LINK_TYPE.VERIFY);

            if (link.url !== null) {
                this.mailerService.sendVerificationEmail(email, link);
            }

            return link;
        } catch (error) {
            throw error;
        }
    }

    @Get(':email/:token')
    async verifyAccount(@Req() request: any, @Param('email') email: string, @Param('token') token: string) {
        try {
            const result = await this.verifyService.verify({ email, token });
            if (!result.already_verify) {
                this.mailerService.sendWelcomeEmail(email, result);
            }

            return result;
        } catch (error) {
            throw error;
        }
    }
}
