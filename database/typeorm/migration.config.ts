import 'dotenv/config';
import { DataSource } from "typeorm";
import { resolve } from 'path';
import { loadClassFile } from './file-loader';

async function buildDataSource(): Promise<any> { 
    return new DataSource({
        type: "postgres",
        host: process.env.DB_PG_HOST,
        port: +process.env.DB_PG_PORT || 5432,
        username: process.env.DB_PG_USERNAME,
        password: process.env.DB_PG_PASSWORD,
        database: process.env.DB_PG_DATABASE,
        migrations: await loadClassFile(resolve(`${__dirname}/migrations`)),
        migrationsTableName: 'typeorm_migrations',
        logging: true,
        synchronize: false,
    });
}

export default buildDataSource();