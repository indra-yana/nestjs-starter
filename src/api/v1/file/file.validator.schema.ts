import { mimetypeSchema } from 'src/core/common/validator/shared.validator.schema';
import { Joi } from 'src/core/common/validator/validator.service';

export const createFileSchema = Joi.object({
	file: Joi.object({
		fieldname: Joi.string().required(),
		originalname: Joi.string().required(),
		mimetype: mimetypeSchema.required(),
		size: Joi.number().min(1000).max(1100000).required(),  // Limit file size to 1MB 
	}).unknown().required(),
}).unknown();

export const validateDownloadSchema = Joi.object({
	fileName: Joi.string().required(),
	type: Joi.string().optional(),
});
