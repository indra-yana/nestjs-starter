import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { LocaleService } from './service/locale.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPGConfigService } from './service/typeorm.pg.service';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmPGConfigService,
            inject: [ConfigService],
        }),
    ],
    providers: [LocaleService],
    exports: [LocaleService]
})
export class CommonModule { }
