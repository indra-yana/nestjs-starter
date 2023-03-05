import { DataSource } from "typeorm";
import 'dotenv/config';
import * as path from 'path';
import * as fs from 'fs';
import { CreateTestingTable1678019550621 } from "../common/database/typeorm/migrations/1678004126714-CreateTestingTable";

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
        // path.resolve(`${__dirname}/../common/database/typeorm/migrations/*{.ts,.js}`),
        CreateTestingTable1678019550621
    ],
    migrationsTableName: 'typeorm_migrations',
    logging: false,
    synchronize: false,
});

export default config;