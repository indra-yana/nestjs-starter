import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { createUserSchema } from './user.validator.schema';
import { UserService } from './user.service';
import { ValidatorService } from 'src/core/common/validator/validator.service';

@Controller({
    path: 'user',
    version: '1',
})
export class UserController {
    constructor(
        private userService: UserService,
        private validator: ValidatorService
    ) { }

    @Post('create')
    async create(@Body() body: object) {
        try {
            this.validator.schema(createUserSchema).validate(body);

            const result = await this.userService.create(body);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Delete('delete')
    async delete(@Body('id') id: string) {
        try {
            const result = await this.userService.delete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Put('update')
    async update(@Body() body: object) {
        try {
            const result = await this.userService.update(body);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Get('list')
    async all() {
        try {
            const result = await this.userService.all();
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Get('show/:id')
    async show(@Param('id') id: string) {
        try {
            const result = await this.userService.find(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
