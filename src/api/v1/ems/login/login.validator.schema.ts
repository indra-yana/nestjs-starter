import {
	usernameSchema,
} from 'src/core/common/validator/shared.validator.schema';
import { Joi } from 'src/core/common/validator/validator.service';

export const loginSchema = Joi.object({
	username: usernameSchema,
	password: Joi
		.string()
		.min(6)
		.max(191)
		.required(),
}).unknown();