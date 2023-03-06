import { Controller, Body, HttpCode, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller({
    path: 'auth',
    version: '1'
})
export class LoginController {
    constructor() { }

	@UseGuards(AuthGuard('basic_auth'))
    @HttpCode(200)
    @Post('login')
    async login(@Request() request: any) {
        try {			
            return request.user;
        } catch (error) {
            throw error;
        }
    }
}
