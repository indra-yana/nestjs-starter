import { nanoid } from 'nanoid';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';

export enum FILE_PATH {
    ROOT = 'public/uploads',
    AVATAR = 'avatar',
    DOCUMENT = 'document',
    TEMP_FILE = 'temp',
}

function getBaseURL(request?: any) {
    if (process.env.STORAGE_DRIVER === 'local') {
        return request ? `${request.protocol}://${request.headers.host}` : '';
    }

    if (process.env.STORAGE_DRIVER === 'ftp') {
        return process.env.APP_CDN_BASE_URL;
    }

    return 'localhost';
}

export function fileMapper(fileName: string, destination: string, request?: any): string {
    let baseURL = getBaseURL(request);
    return `${baseURL}/${FILE_PATH.ROOT}/${destination}/${fileName}`;
};

export function filesMapper(files: Array<string>, destination: string, request: any): Array<string> {
    let baseURL = getBaseURL(request);
    return files.map((fileName) => {
        return `${baseURL}/${FILE_PATH.ROOT}/${destination}/${fileName}`;
    });
};

export const imageFileFilter = (
    req: any,
    file: Express.Multer.File,
    callback: (arg0: any, arg1: boolean) => void
) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }

    callback(null, true);
};

export async function readRemoteFile(url: any, dest: any) {
    return new Promise((resolve, reject) => {

        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        const fileName = `${+new Date}-${nanoid(16)}.tmp`;
        const fileLocation = `${dest}\\${fileName}`;
        const writeFileStream = fs.createWriteStream(fileLocation);

        const remoteUrlFile = new URL(url);
        let httpClient = null;
        if (remoteUrlFile.protocol.replace(':', '') === 'https') {
            httpClient = https;
        } else {
            httpClient = http;
        }

        const request = httpClient.get(url, (response: any) => {
            if (response.statusCode === 200) {
                response.pipe(writeFileStream);
            } else {
                writeFileStream.close();
                fs.unlink(fileLocation, () => { }); // Delete temp file
                reject(new Error(`The remote file doesn't exist! ${response.statusCode}: ${response.statusMessage}`));
            }
        });

        request.on("error", (err: any) => {
            writeFileStream.close();
            fs.unlink(fileLocation, () => { }); // Delete temp file
            reject(new Error(err.message));
        });

        writeFileStream.on("finish", () => {
            resolve(fileName);
            setTimeout(() => {
                fs.unlink(fileLocation, () => { }); // Delete temp file
            }, 5000);
        });

        writeFileStream.on("error", (err: any) => {
            writeFileStream.close();

            if (err.code === "EEXIST") {
                reject(new Error("File already exists"));
            } else {
                fs.unlink(fileLocation, () => { }); // Delete temp file
                reject(new Error(err.message));
            }
        });
    });
}