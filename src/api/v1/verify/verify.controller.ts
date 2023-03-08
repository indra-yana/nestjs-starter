import { Controller, Post, Req } from '@nestjs/common';
import { AuthService, LINK_TYPE } from 'src/core/common/auth/auth.service';

@Controller({
    path: 'auth/verify',
    version: '1',
})
export class VerifyController {
    constructor(
        private authService: AuthService
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
            
        }
    }
}
