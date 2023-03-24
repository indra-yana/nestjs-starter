import { registerAs } from "@nestjs/config";

export default registerAs('ratelimiter', () => ({
    default: {
        ttl: 60,
        limit: 60,
        ignoreUserAgents: [],
    }
}));