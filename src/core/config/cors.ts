import { registerAs } from "@nestjs/config";

export default registerAs('cors', () => ({
    origin: process.env.ORIGINS?.split(',') || false,
    methods: [
        'GET',
        'HEAD',
        'PUT',
        'PATCH',
        'POST',
        'DELETE'
    ],
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'Accept', 
        'Accept-Language', 
        'X-Requested-With',
        'Origin'
    ],
    exposedHeaders: null,
    maxAge: null,
    credentials: true,
}));