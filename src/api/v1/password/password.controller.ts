import { AuthService } from '../../../core/common/auth/auth.service';
import { Controller, Body, Post, Request, Put, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { MailerService } from 'src/core/common/mailer/mailer.service';
import { PublicRoute } from 'src/core/decorator/public-route.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Throttle } from '@nestjs/throttler';

@UseInterceptors(ClassSerializerInterceptor)
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
            return await this.authService.confirmPassword(request.user.id, password);
        } catch (error) {
            throw error;
        }
    }

    @Throttle(5, 60)
    @Post('email')
    @PublicRoute()
    async sendResetPasswordLink(@Body('email') email: string) {
        try {
            const link = await this.forgotPasswordService.createPasswordResetLink(email);
            this.mailerService.sendForgotPasswordEmail(email, link);            
        } catch (error) {
            throw error;
        }
    }

    @Throttle(5, 60)
    @Put('reset')
    @PublicRoute()
    async resetPassword(@Body() payloads: ResetPasswordDto) {
        try {
            return await this.forgotPasswordService.resetPassword(payloads);
        } catch (error) {
            throw error;
        }
    }
}
