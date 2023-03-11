import { diskStorage, DiskStorageOptions } from "multer";

export function localStorage(opts?: DiskStorageOptions): any {
    return diskStorage({
        destination: '/uploads/temp',
        ...opts,
    });
}