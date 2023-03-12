export enum FILE_PATH {
    ROOT = 'public/uploads',
    AVATAR = 'avatar',
    DOCUMENT = 'document',
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