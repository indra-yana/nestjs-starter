import { idSchema, nameSchema } from 'src/core/common/validator/shared.validator.schema';
import { Joi } from 'src/core/common/validator/validator.service';

export const createRoleSchema = Joi.object({
	name: nameSchema,
});

export const updateRoleSchema = Joi.object({
	id: Joi.string().required(),
	name: nameSchema,
});

export const validateIdSchema = Joi.object({
	id: idSchema,
});
