import { AuthService } from '../../../core/common/auth/auth.service';
import { Controller, Body, Post, Request } from '@nestjs/common';
import { ForgotPasswordService, LINK_TYPE } from './forgot-password.service';

@Controller({
    path: 'auth/password',
    version: '1'
})
export class PasswordController {
    constructor(
        private authService: AuthService,
        private forgotPasswordService: ForgotPasswordService
    ) { }
	
    @Post('confirm')
    async confirmPassword(@Request() request: any, @Body('password') password: string) {
        try {			
            return await this.authService.confirmPassword(request.user._uid, password);
        } catch (error) {
            throw error;
        }
    }

    @Post('email')
    async sendResetPasswordLink(@Body('email') email: string) {
        try {
            const link = await this.forgotPasswordService.generateLink(email, LINK_TYPE.FORGOT_PASSWORD);
            // TODO: Send email after link generated

            return link;
        } catch (error) {
            throw error;
        }
    }
}