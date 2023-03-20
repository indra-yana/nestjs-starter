import { AuthService } from '../../../core/common/auth/auth.service';
import { Controller, Body, Post, Request } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { MailerService } from 'src/core/common/mailer/mailer.service';

@Controller({
    path: 'auth/password',
    version: '1'
})
export class PasswordController {
    constructor(
        private authService: AuthService,
        private forgotPasswordService: ForgotPasswordService,
        private mailerService: MailerService,
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
            const link = await this.forgotPasswordService.createPasswordResetLink(email);
            this.mailerService.sendForgotPasswordEmail(email, link);            
        } catch (error) {
            throw error;
        }
    }

    @Post('reset')
    async resetPassword(@Body() payload: any) {
        try {
            return await this.forgotPasswordService.resetPassword(payload);
        } catch (error) {
            throw error;
        }
    }
}
