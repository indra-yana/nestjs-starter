import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AuthService, LINK_TYPE } from 'src/core/common/auth/auth.service';
import { VerifyService } from './verify.service';

@Controller({
    path: 'auth/verify',
    version: '1',
})
export class VerifyController {
    constructor(
        private authService: AuthService,
        private verifyService: VerifyService,
    ) { }

    @Post('resend')
    async resendEmailVerification(@Req() request: any) {
        try {
            const user = request.user;
            const email = user.email;
            const link = await this.authService.generateLink(email, LINK_TYPE.VERIFY);

            // TODO: Send link to user email
            if (link.url !== null) {
    
            }

            return link;
        } catch (error) {
            throw error;
        }
    }

    @Get(':email/:token')
    async verifyAccount(@Param('email') email: string, @Param('token') token: string) {
        try {
            const result = await this.verifyService.verify({ email, token });
            // TODO: Send welcome email to user after verified

            return result;
        } catch (error) {
            throw error;
        }
    }
}
