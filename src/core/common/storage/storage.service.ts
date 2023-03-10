import { Injectable } from '@nestjs/common';
import { LocaleService } from '../locale/locale.service';
import { nanoid } from 'nanoid';
import { pipeline } from 'stream';
import * as fs from 'fs';
import * as path from 'path';
import InvariantException from 'src/core/exceptions/InvariantException';
import { fileMapper } from 'src/core/helper/file-mapper';

@Injectable()
export class StorageService {

    private rootFolder: string;

    constructor(
        private localeService: LocaleService,
    ) {
        const root = path.resolve('public/uploads');
        this.rootFolder = root;
        this.createFolder(root);
    }
    
    writeFile(data: any, destination: string = '', request?: any): any {
        const { path: file, originalname: name } = data;
        const fileName = this.createFileName(name);
        const folder = `${this.rootFolder}/${destination}`;
        if (destination) {
            this.createFolder(folder);
        }

        let filePath = `${folder}/${fileName}`;
        const readFileStream = fs.createReadStream(file);
        const writeFileStream = fs.createWriteStream(filePath);
        pipeline(readFileStream, writeFileStream, (err) => {
            // Delete temporary file
            this.rmFile(file);
            
            if (err) {
                throw new InvariantException({ 
                    message: `${this.localeService.t('app.message.uploaded_fail')}: ${err.message}`, 
                    tags: ['StorageService', '@writeFile'] 
                });
            }
        });

        filePath = `public/uploads/${destination}/${fileName}`;
        return {
            fileName,
            url: request ? fileMapper(filePath, request) : filePath,
        }
    }

    createFolder(folder: any): void {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
    }

    createFileName(fileName: string): string {
        return `${+new Date()}-${nanoid(16)}${this.getFileExtension(fileName)}`;
    }

    getFileExtension(fileName: string): string {
        return path.extname(fileName);
    }

    rmFile(fileName: string) {
        fs.rmSync(fileName, {
            force: true,
        });
    }
}
