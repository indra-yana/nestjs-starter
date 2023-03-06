import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/common/auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller({
    path: 'user',
    version: '1',
})
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() body: object) {
        try {
            const result = await this.userService.create(body);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    async delete(@Body('id') id: string) {
        try {
            const result = await this.userService.delete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    async update(@Body() body: object) {
        try {
            const result = await this.userService.update(body);
            return result;
        } catch (error) {
            throw error;
        }
    }

	@UseGuards(JwtAuthGuard)
    @Get('list')
    async all() {
        try {
            const result = await this.userService.all();
            return result;
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard)
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
