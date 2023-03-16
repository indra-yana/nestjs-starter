import { ConfigService } from '@nestjs/config';
import { createReadStream, createWriteStream, existsSync, mkdirSync, rmSync } from 'fs';
import { extname, resolve } from 'path';
import { fileMapper, STORAGE_DRIVER } from 'src/core/common/storage/file-helper';
import { FtpExtendedService } from './ftp-extended.service';
import { FtpService } from 'nestjs-ftp';
import { Injectable } from '@nestjs/common';
import { LocaleService } from '../locale/locale.service';
import { nanoid } from 'nanoid';
import { pipeline } from 'stream';
import InvariantException from 'src/core/exceptions/InvariantException';

type UploadResult = {
    fileName: string,
    url: string,
}

@Injectable()
export class StorageService {

    private driver: string;

    constructor(
        private localeService: LocaleService,
        private configService: ConfigService,
        private ftpService: FtpService,
        private ftpExtendedService: FtpExtendedService,
    ) {
        const driver = this.configService.get('storage.driver');
        this.setDriver(driver);
    }

    public setDriver(driver?: string) {
        this.driver = driver || STORAGE_DRIVER.LOCAL;
        return this;
    }

    public getDriver(): string {
        return this.driver || STORAGE_DRIVER.LOCAL;
    }

    public async upload(file: Express.Multer.File, destination: string, request?: any): Promise<UploadResult> {
        let uploadResult: any = null;

        switch (this.getDriver()) {
            case STORAGE_DRIVER.FTP:
                uploadResult = await this.uploadToFtp(file, destination);
                break;
            case STORAGE_DRIVER.LOCAL:
            default:
                uploadResult = await this.uploadToLocalStorage(file, destination, request);
                break;
        }

        return uploadResult;
    }

    private async uploadToLocalStorage(file: Express.Multer.File, destination: string, request?: any): Promise<UploadResult> {        
        const { path: tempFile, originalname: name } = file;
        const fileName = this.createFileName(name);
        const rootDir = resolve(this.configService.get('storage.disks.local.root'));
        const destDirectory = `${rootDir}/${destination}`;
        const finalDestination = `${destDirectory}/${fileName}`;

        this.createFolder(destDirectory);

        const readFileStream = createReadStream(tempFile);
        const writeFileStream = createWriteStream(finalDestination);
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
            url: fileMapper(fileName, destination, { 
                driver: this.getDriver(), 
                request,
            }),
        }
    }

    private async uploadToFtp(file: Express.Multer.File, destination: string): Promise<UploadResult> {
        const { path: tempFile, originalname: name } = file;
        const fileName = this.createFileName(name);
        const rootDir = this.configService.get('storage.disks.ftp.root');
        const destDirectory = `${rootDir}/${destination}`;
        const finalDestination = `${destDirectory}/${fileName}`;

        await this.ftpExtendedService.ensureDirectory(destDirectory);
        await this.ftpService.upload(tempFile, finalDestination);

        return {
            fileName,
            url: fileMapper(fileName, destination, { 
                driver: this.getDriver() 
            }),
        }
    }

    private createFolder(folder: any): void {
        if (!existsSync(folder)) {
            mkdirSync(folder, { recursive: true });
        }
    }

    private createFileName(fileName: string): string {
        return `${+new Date()}-${nanoid(16)}${this.getFileExtension(fileName)}`;
    }

    private getFileExtension(fileName: string): string {
        return extname(fileName);
    }

    private rmFile(fileName: string) {
        rmSync(fileName, {
            force: true,
        });
    }
}
