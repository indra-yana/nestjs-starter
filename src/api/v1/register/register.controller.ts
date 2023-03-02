import { Body, Controller, Post, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { RegisterService } from './register.service';

@Controller({
    path: 'auth',
    version: '1',
})
export class RegisterController {
    constructor(private registerService: RegisterService, private appService: AppService){}

    @Post('register')
    async register(@Body() body: object) {
        try {
            return this.registerService.register(body);
        } catch (error) {
            throw error;
        }
    }

    @Get('find-all')
    async findAll() {
        try {
            return this.registerService.findAll();
        } catch (error) {
            throw error;
        }
    }

    @Get('hello-world')
    async getHello() {
        try {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            return this.appService.getHello();
        } catch (error) {
            throw error;
        }
    }

}
