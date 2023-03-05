import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmPGConfigService implements TypeOrmOptionsFactory {

    constructor(private configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            name: 'default',
            type: 'postgres',
            host: this.configService.get('DB_PG_HOST', 'localhost'),
            port: this.configService.get('DB_PG_PORT', 5432),
            username: this.configService.get('DB_PG_USERNAME'),
            password: this.configService.get('DB_PG_PASSWORD'),
            database: this.configService.get('DB_PG_DATABASE'),
            entities: [],
            synchronize: false,
            autoLoadEntities: true,
        };
    }
}
