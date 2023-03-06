import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPGConfigService } from './typeorm.pg.service';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmPGConfigService,
            inject: [ConfigService],
        }),
    ],
    exports: [TypeOrmModule],
})
export class TypeOrmDatabaseModule { }
