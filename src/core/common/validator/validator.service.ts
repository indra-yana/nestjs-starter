import { Injectable } from '@nestjs/common';
import { joiValidationFormat } from 'src/core/helper/helper';
import { LocaleService } from '../locale/locale.service';
import { ObjectSchema } from 'joi';
import ValidationException from 'src/core/exceptions/ValidationException';
import InvariantException from 'src/core/exceptions/InvariantException';

const en = require('../../resources/lang/en/validation.json').joi;
const id = require('../../resources/lang/id/validation.json').joi;
const JoiBase = require('joi');

const defaultsOpts = {
    abortEarly: false,
    messages: {
        id,
        en,
    },
    errors: {
        language: 'en',
    },
};

export const Joi = JoiBase.defaults((schema: any) => schema.options(defaultsOpts));

@Injectable()
export class ValidatorService {

    private objectSchema: ObjectSchema;

    constructor(
        private localeService: LocaleService
    ) { }

    schema(schema: ObjectSchema) {
        this.objectSchema = schema;
        return this;
    }

    validate(value: any) {
        if (!this.objectSchema) {
            throw new InvariantException({
                message: 'Undefined object schema!',
            });
        }

        defaultsOpts.errors.language = this.localeService.getLang();        

        const { error } = this.objectSchema.validate(value, defaultsOpts);
        if (error) {
            throw new ValidationException({ 
                message: this.localeService.t('app.message.validation_fail'), 
                error: joiValidationFormat(error.details),
            });
        }

        return value;
    }
}
