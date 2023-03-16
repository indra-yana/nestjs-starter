import 'dotenv/config';
import { DataSource } from "typeorm";
import { readdirSync } from 'fs';
import { resolve } from 'path';

async function readMigrationFile(): Promise<any> {
    const files = readdirSync(resolve(`${__dirname}/migrations`))
    .map(function(file) {
        return file;
    });

    const migrationFiles = [];
    for (let i = 0; i < files.length; i++) {
        const module = await import(`./migrations/${files[i]}`); 
        const value = module[Object.keys(module)[0]];

        migrationFiles.push(value);
    }
    
    return migrationFiles;
}

const buildDataSource = async () => { 
    return new DataSource({
        type: "postgres",
        host: process.env.DB_PG_HOST,
        port: +process.env.DB_PG_PORT || 5432,
        username: process.env.DB_PG_USERNAME,
        password: process.env.DB_PG_PASSWORD,
        database: process.env.DB_PG_DATABASE,
        migrations: await readMigrationFile(),
        migrationsTableName: 'typeorm_migrations',
        logging: false,
        synchronize: false,
    });
}

export default buildDataSource();