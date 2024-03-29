import { File } from 'src/core/common/database/typeorm/entities/file';
import { FILE_PATH } from 'src/core/common/storage/file-helper';
import { getSkip, paginate, PagingQuery } from 'src/core/helper/pagination';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { Repository } from 'typeorm';
import { StorageService } from 'src/core/common/storage/storage.service';
import InvariantException from 'src/core/exceptions/InvariantException';
import NotFoundException from 'src/core/exceptions/NotFoundException';

@Injectable()
export class FileService {

    private httpRequest: any;

    constructor(
        @InjectRepository(File)
        private fileRepository: Repository<File>,
        private locale: LocaleService,
        private storageService: StorageService,
    ) { }

    public setHttpRequest(request: any) {
        this.httpRequest = request;
        return this;
    }

    public getHttpRequest() {
        if (!this.httpRequest) {
            throw new InvariantException({
                message: 'The request object is required',
            });
        }

        return this.httpRequest;
    }

    async create(payload: any, file: Express.Multer.File) {
        const { userId, type } = payload;
        const params: Partial<File> = {
            user_id: userId,
            type,
        }

        const request = this.getHttpRequest();
        const uploadedFile = await this.storageService.upload(file, `${FILE_PATH[type.toUpperCase()] || 'unknown'}/${userId}`, request);
        params.name = uploadedFile.fileName;
        params.driver = this.storageService.getDriver();

        const data = new File(params);
        const result = await this.fileRepository.save(data);

        return {
            id: result.id, 
            url: uploadedFile.url,
        }
    }

    async all(query: PagingQuery) {
        const { page, limit } = query;
        const skip = getSkip(page, limit);
        const result = await this.fileRepository.findAndCount({
            take: limit,
            skip
        });

        const [data = null, total = 0] = result;
        return paginate(data, page, limit, total);
    }

    async find(id: string) {
        const result = await this.fileRepository.findOne({
            where: {
                id,
            }
        });

        if (!result) {
            throw new NotFoundException({
                message: this.locale.t('app.message.data_notfound'),
            });
        }

        return result;
    }

}
