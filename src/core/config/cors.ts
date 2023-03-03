import { registerAs } from "@nestjs/config";

export default registerAs('cors', () => ({
    enable: process.env.ENABLE || false,
    origins: process.env.ORIGINS || '*',
}));