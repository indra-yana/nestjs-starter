import { Body, Controller, Post, Get, UseInterceptors, HttpCode } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller({
    path: 'auth',
    version: '1',
})
export class RegisterController {
    constructor(
        private registerService: RegisterService,
    ) { }

    @HttpCode(200)
    @Post('register')
    async register(@Body() body: object) {
        try {
            return this.registerService.register(body);
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(200)
    @Get('find-all')
    async findAll() {
        try {
            return this.registerService.findAll();
        } catch (error) {
            throw error;
        }
    }

}
