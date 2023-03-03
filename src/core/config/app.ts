import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    env: process.env.NODE_ENV || 'production',
    debug: process.env.APP_DEBUG || true,
    server: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT, 10) || 3000,
    },
}));