import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { createUserSchema, updateUserSchema, validateIdSchema } from './user.validator.schema';
import { FILE_PATH } from 'src/core/common/storage/file-helper';
import { FileInterceptor } from '@nest-lab/fastify-multer/src/lib/interceptors';
import { localStorage } from 'src/core/common/storage/local.storage';
import { StorageService } from 'src/core/common/storage/storage.service';
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
        private storageService: StorageService,
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

            if (file) {
                const uploadedFile = this.storageService.upload(file, `${FILE_PATH.AVATAR}/${request.user._uid}`, request);                
                body.avatar = uploadedFile.fileName;
            }

            const result = await this.userService.create(body);
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

            if (file) {
                const uploadedFile = this.storageService.upload(file, `${FILE_PATH.AVATAR}/${body.id}`, request);
                body.avatar = uploadedFile.fileName;
            }
            
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
            this.validator.schema(validateIdSchema).validate({ id });

            const result = await this.userService.find(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
