import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    postgres: {
        client: process.env.DB_CLIENT,
        connection_string: process.env.DB_CONNECTION,
        host: process.env.DB_PG_HOST,
        port: process.env.DB_PG_PORT,
        username: process.env.DB_PG_USERNAME,
        password: process.env.DB_PG_PASSWORD,
        database: process.env.DB_PG_DATABASE,
    },
    
    datasources: {
        default: {
            name: 'default',
            type: 'postgres',
            host: process.env.DB_PG_HOST,
            port: process.env.DB_PG_PORT,
            username: process.env.DB_PG_USERNAME,
            password: process.env.DB_PG_PASSWORD,
            database: process.env.DB_PG_DATABASE,
            entities: [],
            synchronize: false,
            autoLoadEntities: true,
            migrations: [],
        }
    }
}));