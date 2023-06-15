import { Body, ClassSerializerInterceptor, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { createFileSchema } from './file.validator.schema';
import { FileInterceptor } from '@nest-lab/fastify-multer';
import { fileMapper, FILE_PATH, readRemoteFile, STORAGE_DRIVER } from 'src/core/common/storage/file-helper';
import { FileService } from './file.service';
import { localStorage } from 'src/core/common/storage/local.storage';
import { resolve } from 'path';
import { ValidatorService } from 'src/core/common/validator/validator.service';
import NotFoundException from 'src/core/exceptions/NotFoundException';

@UseInterceptors(ClassSerializerInterceptor)
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

            body.userId = request.user.id;
            const result = await this.fileService
                .setHttpRequest(request)
                .create(body, file);

            return result;
        } catch (error) {
            throw error;
        }
    }

    @Get('all/:type?')
    async all(
        @Req() request: any,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ) {
        try {
            let files = await this.fileService.all({
                page,
                limit,
            });

            files.data = files.data.map(function (file) {
                const { name, type, user_id, driver } = file;
                
                return {
                    ...file,
                    url: fileMapper(name, `${FILE_PATH[type.toUpperCase()] || 'unknown'}/${user_id}`, { 
                        request, 
                        driver: driver || 'local',
                    }),
                }
            })

            return files;
        } catch (error) {
            throw error;
        }
    }

    @Get('download/:id')
    async download(@Req() request: any, @Res() response: any, @Param('id') id: string) {
        try {
            const file = await this.fileService.find(id);
            const filePath = await this.getFile(request, file);
            
            return response.download(filePath);
        } catch (error) {
            throw error;
        }
    }

    @Get('preview/:id')
    async preview(@Req() request: any, @Res() response: any, @Param('id') id: string) {
        try {
            const file = await this.fileService.find(id);
            const filePath = await this.getFile(request, file);

            return response.sendFile(filePath);
        } catch (error) {
            throw error;
        }
    }

    async getFile(request: any, file: any) {
        const { name, type, user_id, driver } = file;
        
        let filePath = '';
        if (driver === STORAGE_DRIVER.LOCAL) {
            const url = fileMapper(name, `${FILE_PATH[type.toUpperCase()] || 'unknown'}/${user_id}`, { 
                driver: driver || 'local', 
            });

            filePath = url.replace('public', '');
        } else if (driver === STORAGE_DRIVER.FTP) {
            const url = fileMapper(name, `${FILE_PATH[type.toUpperCase()] || 'unknown'}/${user_id}`, { 
                request, 
                driver: driver || 'local',
            }); 

            const tempPath = `${FILE_PATH.ROOT}/${FILE_PATH.TEMP_FILE}`;
            const root = resolve(tempPath);            
            const tempFile = await readRemoteFile(url, root);

            filePath = `uploads/temp/${tempFile}`;
        } else {
            throw new NotFoundException({
                message: 'File not exist in storage!',
            });
        }

        return filePath;
    }

}
