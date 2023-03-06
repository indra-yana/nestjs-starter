import { Body, HttpCode, Post } from '@nestjs/common/decorators';
import { Controller } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller({
    path: 'auth',
    version: '1'
})
export class LoginController {
    constructor(private loginService: LoginService) { }

    @HttpCode(200)
    @Post('login')
    async login(@Body() body: object) {
        try {
			// TODO: Handle validation
            return this.loginService.basicLogin(body['credential'], body['password'])
        } catch (error) {
            throw error;
        }
    }
}
