import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
    jwt: {
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        refresh_token_key: process.env.REFRESH_TOKEN_KEY,
        access_token_age: process.env.ACCESS_TOKEN_AGE || '1d',
        refresh_token_age: process.env.REFRESH_TOKEN_AGE || '60d',
    },

    forgot_password: {
        link_expire_minutes: +process.env.RESET_LINK_EXPIRE_MINUTES || 60,
        frontend_url: `${process.env.FE_RESET_URL}`,
    },

    verify: {
        link_expire_minutes: +process.env.VERIFY_LINK_EXPIRE_MINUTES || 60,
        frontend_url: `${process.env.FE_VERIFY_URL}`,
    }
}));