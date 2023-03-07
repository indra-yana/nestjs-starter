import { Controller, Body, HttpCode, Post, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from 'src/core/common/auth/guards/local.guard';
import { PublicRoute } from 'src/core/decorator/public-route.decorator';
import { AuthService } from '../../../core/common/auth/auth.service';

@Controller({
    path: 'auth',
    version: '1'
})
export class LoginController {
    constructor(private authService: AuthService) { }

	@UseGuards(LocalAuthGuard)
    @PublicRoute()
    @HttpCode(200)
    @Post('login')
    async login(@Request() request: any) {
        try {			
            return this.authService.jwtAuth(request.user);
        } catch (error) {
            throw error;
        }
    }
	
    @Get('whoami')
    async whoami(@Request() request: any) {
        try {			
            return await this.authService.whoami(request.user._uid);
        } catch (error) {
            throw error;
        }
    }
}
