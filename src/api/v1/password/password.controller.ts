import { Controller, Body, Post, Request } from '@nestjs/common';
import { AuthService } from '../../../core/common/auth/auth.service';

@Controller({
    path: 'auth/password',
    version: '1'
})
export class PasswordController {
    constructor(private authService: AuthService) { }
	
    @Post('confirm')
    async confirmPassword(@Request() request: any, @Body('password') password: string) {
        try {			
            return await this.authService.confirmPassword(request.user._uid, password);
        } catch (error) {
            throw error;
        }
    }
}
