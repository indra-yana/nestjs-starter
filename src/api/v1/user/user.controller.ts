import { addUserRoleSchema, createUserSchema, updateUserSchema, validateIdSchema } from './user.validator.schema';
import { Body, ClassSerializerInterceptor, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nest-lab/fastify-multer/src/lib/interceptors';
import { localStorage } from 'src/core/common/storage/local.storage';
import { Roles } from 'src/core/decorator/role.decorator';
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

            const user = await this.userService.create(body, null, false);
            if (file) {
                this.userService
                    .setHttpRequest(request)
                    .uploadAvatar(user.id, file);
            }

            return user;
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

            const user = await this.userService.update(body, null, false);
            if (file) {
                this.userService
                    .setHttpRequest(request)
                    .uploadAvatar(user.id, file);
            }

            return user;
        } catch (error) {
            throw error;
        }
    }

    @Roles(['root'])
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('list')
    async all(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ) {
        try {
            const result = await this.userService.all({
                page,
                limit,
            });
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

    @Post('role/add')
    async addRole(@Body() body: object) {
        try {
            this.validator.schema(addUserRoleSchema).validate(body);

            const result = await this.userService.addRole(body);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Delete('role/remove')
    async removeRole(@Body() body: object) {
        try {
            this.validator.schema(addUserRoleSchema).validate(body);

            const result = await this.userService.removeRole(body);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
