import 'dotenv/config';
import { DataSource } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';
import { CreateUsersTable1678766771204 } from './migrations/1678766771204-Create_Users_Table';
import { CreateRolesTable1678767760332 } from './migrations/1678767760332-Create_Roles_Table';
import { CreateFilesTable1678768412234 } from './migrations/1678768412234-Create_Files_Table';

function readFile() {
    const files = fs.readdirSync(path.resolve(`${__dirname}/../common/database/typeorm/migrations`))
    .map(function(file) {
        return file;
    });
    
    async function getFile() {
        let arr = [];
        for (let i = 0; i < files.length; i++) {
            const module = await import(`../common/database/typeorm/migrations/${files[i]}`);                        
            const value = module[Object.keys(module)[0]];
    
            arr.push(value);
        }

        return arr;
    }

    // console.log(arr);
    return getFile();
}


// console.log(readFile());
// readFile();

const config = new DataSource({
    type: "postgres",
    host: process.env.DB_PG_HOST,
    port: +process.env.DB_PG_PORT || 5432,
    username: process.env.DB_PG_USERNAME,
    password: process.env.DB_PG_PASSWORD,
    database: process.env.DB_PG_DATABASE,
    migrations: [
        // Deprecated: can'nt use string or path migration
        // path.resolve(`${__dirname}/../common/database/typeorm/migrations/*{.ts,.js}`),
        CreateUsersTable1678766771204,
        CreateRolesTable1678767760332,
        CreateFilesTable1678768412234,
    ],
    migrationsTableName: 'typeorm_migrations',
    logging: false,
    synchronize: false,
});

export default config;