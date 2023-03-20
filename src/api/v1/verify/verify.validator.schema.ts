import { emailSchema } from 'src/core/common/validator/shared.validator.schema';
import { Joi } from 'src/core/common/validator/validator.service';

export const verifyAccountSchema = Joi.object({
	email: emailSchema,
	token: Joi.string().required(),
	expire: Joi.number().required(),
});
