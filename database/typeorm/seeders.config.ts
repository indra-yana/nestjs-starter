import 'dotenv/config';
import { DataSource } from "typeorm";
import { User } from "../../src/core/common/database/typeorm/entities/user";
import { File } from "../../src/core/common/database/typeorm/entities/file";
import { Role } from "../../src/core/common/database/typeorm/entities/role";
import { resolve } from 'path';
import { readMigrationFile } from './file-loader';

async function buildDataSource(): Promise<any> { 
    return new DataSource({
        type: "postgres",
        host: process.env.DB_PG_HOST,
        port: +process.env.DB_PG_PORT || 5432,
        username: process.env.DB_PG_USERNAME,
        password: process.env.DB_PG_PASSWORD,
        database: process.env.DB_PG_DATABASE,
        migrations: await readMigrationFile(resolve(`${__dirname}/seeders`)),
        migrationsTableName: 'typeorm_seeders',
        entities: [
            User,
            File,
            Role,
        ],
        logging: true,
        synchronize: false,
    });
}

export default buildDataSource();