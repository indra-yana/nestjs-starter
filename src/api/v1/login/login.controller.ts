import { Controller, Body, HttpCode, Post, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from 'src/core/common/auth/local-auth.guard';

@Controller({
    path: 'auth',
    version: '1'
})
export class LoginController {
    constructor() { }

	@UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @Post('login')
    async login(@Request() request: any) {
        try {			
            return request.user;
        } catch (error) {
            throw error;
        }
    }
	
	@UseGuards(LocalAuthGuard)
    @Get('whoami')
    async whoami(@Request() request: any) {
        try {			
            return request.user;
        } catch (error) {
            throw error;
        }
    }
}
