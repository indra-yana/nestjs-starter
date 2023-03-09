import {
	nameSchema,
	usernameSchema,
	passwordSchema,
	passwordConfirmationSchema,
	emailSchema,
} from 'src/core/common/validator/shared.validator.schema';
import { Joi } from 'src/core/common/validator/validator.service';

export const createUserSchema = Joi.object({
	name: nameSchema,
	username: usernameSchema,
	password: passwordSchema,
	password_confirmation: passwordConfirmationSchema,
	email: emailSchema,
	avatar: Joi.string().optional(),
}).unknown();
