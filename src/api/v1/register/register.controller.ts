import { Body, Controller, Post, Get } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller({
    path: 'auth',
    version: '1',
})
export class RegisterController {

    constructor(
        private registerService: RegisterService,
    ) { }

    @Post('register')
    async register(@Body() body: object) {
        try {
            return this.registerService.register(body);
        } catch (error) {
            throw error;
        }
    }

}
