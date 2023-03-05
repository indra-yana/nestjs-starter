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
            host: this.configService.get('database.postgres.host', 'localhost'),
            port: this.configService.get('database.postgres.port', 5432),
            username: this.configService.get('database.postgres.username'),
            password: this.configService.get('database.postgres.password'),
            database: this.configService.get('database.postgres.database'),
            entities: [],
            synchronize: false,
            autoLoadEntities: true,
        };
    }
}
