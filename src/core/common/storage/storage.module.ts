import { ConfigService } from '@nestjs/config';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { FtpModule } from 'nestjs-ftp';
import { Global, Module } from '@nestjs/common';
import { StorageService } from './storage.service';

@Global()
@Module({
    imports: [
        FastifyMulterModule,
        FtpModule.forRootFtpAsync({
            useFactory: async (configService: ConfigService) => {
                return configService.get('storage.disks.ftp.config');
            },
            inject: [ConfigService]
        })
    ],
    exports: [StorageService],
    providers: [StorageService]
})
export class StorageModule {}
