import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { createUserSchema, updateUserSchema, validateIdSchema } from './user.validator.schema';
import { FileInterceptor } from '@nest-lab/fastify-multer/src/lib/interceptors';
import { localStorage } from 'src/core/common/storage/local.storage';
import { UserService } from './user.service';
import { ValidatorService } from 'src/core/common/validator/validator.service';

@Controller({
    path: 'user',
    version: '1',
})
export class UserController {
    constructor(
        private userService: UserService,
        private validator: ValidatorService,
    ) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: localStorage(),
    }))
    async create(@Req() request: any, @Body() body: any, @UploadedFile() file: Express.Multer.File) {
        try {
            this.validator.schema(createUserSchema).validate({ 
                ...body, 
                ...file 
            });

            const result = await this.userService
                                    .setHttpRequest(request)
                                    .create(body, file);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Delete('delete')
    async delete(@Body('id') id: string) {
        try {
            this.validator.schema(validateIdSchema).validate({ id });

            const result = await this.userService.delete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Put('update')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: localStorage(),
    }))
    async update(@Req() request: any, @Body() body: any, @UploadedFile() file: Express.Multer.File) {
        try {
            this.validator.schema(updateUserSchema).validate({ 
                ...body, 
                ...file 
            });

            const result = await this.userService
                                    .setHttpRequest(request)
                                    .update(body, file);
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
            this.validator.schema(validateIdSchema).validate({ id });

            const result = await this.userService.find(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
