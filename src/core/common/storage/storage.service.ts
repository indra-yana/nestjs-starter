import { fileMapper, FILE_PATH } from 'src/core/common/storage/file-helper';
import { Injectable } from '@nestjs/common';
import { LocaleService } from '../locale/locale.service';
import { nanoid } from 'nanoid';
import { pipeline } from 'stream';
import * as fs from 'fs';
import * as path from 'path';
import InvariantException from 'src/core/exceptions/InvariantException';

export enum STORAGE_DRIVER {
    LOCAL = 'local',
    FTP = 'ftp',
}

type UploadResult = {
    fileName: string,
    url: string,
}

@Injectable()
export class StorageService {

    private rootFolder: string;

    private driver: STORAGE_DRIVER;

    constructor(
        private localeService: LocaleService,
    ) {
        const root = path.resolve(FILE_PATH.ROOT);
        this.rootFolder = root;
        this.createFolder(root);

        this.setDriver(STORAGE_DRIVER.LOCAL);
    }

    public setDriver(driver?: STORAGE_DRIVER) {
        this.driver = driver || STORAGE_DRIVER.LOCAL;
        return this;
    }

    public upload(file: Express.Multer.File, destination: string, request?: any): UploadResult {
        let uploadResult: UploadResult = null;

        switch (this.driver) {
            case STORAGE_DRIVER.FTP:
                uploadResult = this.uploadToFtp(file, destination);
                break;
            case STORAGE_DRIVER.LOCAL:
            default:
                uploadResult = this.uploadToLocalStorage(file, destination, request);
                break;
        }

        return uploadResult;
    }

    private uploadToLocalStorage(file: Express.Multer.File, destination: string, request?: any): UploadResult {
        const { path: tempFile, originalname: name } = file;
        const fileName = this.createFileName(name);
        const folder = `${this.rootFolder}/${destination}`;
        if (destination) {
            this.createFolder(folder);
        }

        let filePath = `${folder}/${fileName}`;
        const readFileStream = fs.createReadStream(tempFile);
        const writeFileStream = fs.createWriteStream(filePath);
        pipeline(readFileStream, writeFileStream, (err) => {
            // Delete temporary file
            this.rmFile(tempFile);

            if (err) {
                throw new InvariantException({
                    message: `${this.localeService.t('app.message.uploaded_fail')}: ${err.message}`,
                    tags: ['StorageService', '@writeFile']
                });
            }
        });

        return {
            fileName,
            url: fileMapper(fileName, destination, request),
        }
    }

    private uploadToFtp(file: Express.Multer.File, destination: string): UploadResult {
        throw new Error('Not yet implemented!');
    }

    private createFolder(folder: any): void {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
    }

    private createFileName(fileName: string): string {
        return `${+new Date()}-${nanoid(16)}${this.getFileExtension(fileName)}`;
    }

    private getFileExtension(fileName: string): string {
        return path.extname(fileName);
    }

    private rmFile(fileName: string) {
        fs.rmSync(fileName, {
            force: true,
        });
    }
}
