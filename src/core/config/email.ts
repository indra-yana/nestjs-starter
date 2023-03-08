import { registerAs } from "@nestjs/config";
import { join } from "path";

export default registerAs('email', () => ({
    driver: process.env.MAIL_MAILER,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    encryption: process.env.MAIL_ENCRYPTION,
    from: process.env.MAIL_FROM_ADDRESS,
    name: process.env.MAIL_FROM_NAME,

    template_dir: join(__dirname, '../resources/views/email/'),

    forgot_password: {
        link_expire_minutes: +process.env.RESET_LINK_EXPIRE_MINUTES || 60,
        frontend_url: `${process.env.FE_RESET_URL}`,
    },

    verify: {
        link_expire_minutes: +process.env.VERIFY_LINK_EXPIRE_MINUTES || 60,
        frontend_url: `${process.env.FE_VERIFY_URL}`,
    }
}));