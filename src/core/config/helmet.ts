import { registerAs } from "@nestjs/config";

export default registerAs('helmet', () => ({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: [
                `'self'`, 
                'unpkg.com',
                'cdn.comsys.com',
            ],
            styleSrc: [
                `'self'`,
                `'unsafe-inline'`,
                'cdn.jsdelivr.net',
                'fonts.googleapis.com',
                'unpkg.com',
                'cdn.comsys.com',
            ],
            fontSrc: [
                `'self'`, 
                'fonts.gstatic.com', 
                'data:',
            ],
            imgSrc: [
                `'self'`, 
                'data:', 
                'cdn.jsdelivr.net',
                'cdn.comsys.com',
            ],
            scriptSrc: [
                `'self'`,
                `https: 'unsafe-inline'`,
                `cdn.jsdelivr.net`,
                `'unsafe-eval'`,
                'cdn.comsys.com',
            ],
        },
    },
}));