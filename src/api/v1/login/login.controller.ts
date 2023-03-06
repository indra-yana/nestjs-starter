import { Controller, Body, HttpCode, Post, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/common/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/core/common/auth/local-auth.guard';
import { LoginService } from './login.service';

@Controller({
    path: 'auth',
    version: '1'
})
export class LoginController {
    constructor(private loginService: LoginService) { }

	@UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @Post('login')
    async login(@Request() request: any) {
        try {			
            return this.loginService.jwtAuth(request.user);
        } catch (error) {
            throw error;
        }
    }
	
    @Get('whoami')
    async whoami(@Request() request: any) {
        try {			
            return request.user;
        } catch (error) {
            throw error;
        }
    }
}
