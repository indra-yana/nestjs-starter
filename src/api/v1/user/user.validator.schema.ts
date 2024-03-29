import {
	nameSchema,
	usernameSchema,
	passwordSchema,
	passwordConfirmationSchema,
	emailSchema,
	imageMimetypeSchema,
	idSchema,
} from 'src/core/common/validator/shared.validator.schema';
import { Joi } from 'src/core/common/validator/validator.service';

export const createUserSchema = Joi.object({
	name: nameSchema,
	username: usernameSchema,
	password: passwordSchema,
	password_confirmation: passwordConfirmationSchema,
	email: emailSchema,
	avatar: Joi.object({
		fieldname: Joi.string().optional(),
		originalname: Joi.string().optional(),
		mimetype: imageMimetypeSchema.optional(),
		size: Joi.number().min(1000).max(1100000).optional(),  // Limit file size to 1MB 
	}).unknown().optional(),
}).unknown();

export const updateUserSchema = Joi.object({
	id: Joi.string().required(),
	name: nameSchema,
	username: usernameSchema,
	email: emailSchema,
	avatar: Joi.object({
		fieldname: Joi.string().optional(),
		originalname: Joi.string().optional(),
		mimetype: imageMimetypeSchema.optional(),
		size: Joi.number().min(1000).max(1100000).optional(),  // Limit file size to 1MB 
	}).unknown().optional(),
}).unknown();

export const validateIdSchema = Joi.object({
	id: idSchema,
});

export const addUserRoleSchema = Joi.object({
	user_id: idSchema,
	role_id: idSchema,
});