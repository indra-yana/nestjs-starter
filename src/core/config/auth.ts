import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
    jwt: {
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        refresh_token_key: process.env.REFRESH_TOKEN_KEY,
        access_token_age: process.env.ACCESS_TOKEN_AGE || '1d',
        refresh_token_age: process.env.REFRESH_TOKEN_AGE || '60d',
    },
}));