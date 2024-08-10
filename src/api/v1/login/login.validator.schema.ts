import {
	usernameSchema,
	passwordSchema,
} from 'src/core/common/validator/shared.validator.schema';
import { Joi } from 'src/core/common/validator/validator.service';

export const loginSchema = Joi.object({
	credential: usernameSchema,
	password: passwordSchema,
}).unknown();
