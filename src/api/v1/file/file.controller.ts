import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { createFileSchema } from './file.validator.schema';
import { FileInterceptor } from '@nest-lab/fastify-multer';
import { fileMapper, FILE_PATH } from 'src/core/common/storage/file-helper';
import { FileService } from './file.service';
import { localStorage } from 'src/core/common/storage/local.storage';
import { ValidatorService } from 'src/core/common/validator/validator.service';

@Controller({
    path: 'file',
    version: '1',
})
export class FileController {
    constructor(
        private fileService: FileService,
        private validator: ValidatorService,
    ) { }

    @UseInterceptors(FileInterceptor('file', {
        storage: localStorage(),
    }))
    @Post('upload')
    async create(@Req() request: any, @Body() body: any, @UploadedFile() file: Express.Multer.File) {
        try {
            this.validator.schema(createFileSchema).validate({
                ...body,
                file
            });

            body.userId = request.user._uid;
            const result = await this.fileService
                .setHttpRequest(request)
                .create(body, file);

            return result;
        } catch (error) {
            throw error;
        }
    }

    @Get('all/:type?')
    async all(@Req() request: any) {
        try {
            const files = await this.fileService.all();
            const fileMap = files.map(function (file) {
                const { name, type, user_id } = file;
                return {
                    ...file,
                    url: fileMapper(name, `${FILE_PATH[type.toUpperCase()] || 'unknown'}/${user_id}`, request),
                }
            })

            return fileMap;
        } catch (error) {
            throw error;
        }
    }

    @Get('download/:id')
    async download(@Res() response: any, @Param('id') id: string) {
        try {
            const file = await this.fileService.find(id);
            const { name, type, user_id } = file;

            const url = fileMapper(name, `${FILE_PATH[type.toUpperCase()] || 'unknown'}/${user_id}`);

            return response.download(url.replace('public', ''));
        } catch (error) {
            throw error;
        }
    }

    @Get('preview/:id')
    async preview(@Res() response: any, @Param('id') id: string) {
        try {
            const file = await this.fileService.find(id);
            const { name, type, user_id } = file;
            const url = fileMapper(name, `${FILE_PATH[type.toUpperCase()] || 'unknown'}/${user_id}`);

            return response.sendFile(url.replace('public', ''));
        } catch (error) {
            throw error;
        }
    }

}
