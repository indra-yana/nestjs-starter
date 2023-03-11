import { Joi } from "./validator.service";

export const passwordSchema = Joi
    .string()
    .min(6)
    .max(128)
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required();

export const passwordConfirmationSchema = Joi
    .string()
    .min(6)
    .max(128)
    .valid(Joi.ref('password'))
    .required();

export const emailSchema = Joi
    .string()
    .email()
    .required();

export const usernameSchema = Joi
    .string()
    .min(3)
    .pattern(/^[0-9A-Za-z.\-_]+$/)
    .required();

export const nameSchema = Joi
    .string()
    .min(2)
    .max(255)
    .required();

export const idSchema = Joi
    .string()
    .min(16)
    .max(16)
    .required();

export const mimetypeSchema = Joi
    .string()
    .valid(
        'image/apng', 
        'image/avif', 
        'image/gif', 
        'image/jpeg', 
        'image/png', 
        'image/webp', 
        'application/pdf', 
        'application/vnd.ms-excel', 
        'application/msword', 
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    )
    .required();

export const imageMimetypeSchema = Joi
    .string()
    .valid(
        'image/apng', 
        'image/avif', 
        'image/gif', 
        'image/jpeg', 
        'image/png', 
        'image/webp'
    );