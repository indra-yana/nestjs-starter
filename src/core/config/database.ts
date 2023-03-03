import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    postgres: {
        client: process.env.DB_CLIENT,
        connection_string: process.env.DB_CONNECTION,
    }
}));