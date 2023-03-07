import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
    jwt: {
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        refresh_token_key: process.env.REFRESH_TOKEN_KEY,
        access_token_age: process.env.ACCESS_TOKEN_AGE || '1d',
        refresh_token_age: process.env.REFRESH_TOKEN_AGE || '60d',
    },

    forgot_password: {
        link_expire_minutes: +process.env.PASSWORD_LINK_EXPIRE || 60,
        frontend_url: `${process.env.APP_FE_URL}/${process.env.APP_RESET_URL}`,
    },

    verify: {
        link_expire_minutes: +process.env.VERIFY_LINK_EXPIRE || 60,
        frontend_url: `${process.env.APP_FE_URL}/${process.env.APP_VERIFY_URL}`,
    }
}));