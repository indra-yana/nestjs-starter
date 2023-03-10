import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { Global, Module } from '@nestjs/common';
import { StorageService } from './storage.service';

@Global()
@Module({
    imports: [
        FastifyMulterModule,
    ],
    exports: [StorageService],
    providers: [StorageService]
})
export class StorageModule {}
