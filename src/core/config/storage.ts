import { registerAs } from "@nestjs/config";
import { FILE_PATH } from "../common/storage/file-helper";

export default registerAs('storage', () => ({
    driver: process.env.STORAGE_DRIVER || 'local',

    disks: {
        local: {
            root: FILE_PATH.ROOT,
        },

        ftp: {
            root: process.env.FTP_ROOT,
            config: {
                host: process.env.FTP_HOST,
                port: process.env.FTP_PORT || 21,
                password: process.env.FTP_PASSWORD,
                user: process.env.FTP_USERNAME,
                secure: process.env.FTP_SECURE
            }
        },
    },
}));