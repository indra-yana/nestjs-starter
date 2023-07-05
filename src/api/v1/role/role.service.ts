import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { joiValidationFormat } from 'src/core/helper/helper';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { Repository } from 'typeorm';
import { Role } from 'src/core/common/database/typeorm/entities/role';
import InvariantException from 'src/core/exceptions/InvariantException';
import NotFoundException from 'src/core/exceptions/NotFoundException';
import ValidationException from 'src/core/exceptions/ValidationException';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        private locale: LocaleService
    ) {}

    async create(payloads: any) {
        let { name } = payloads;
        name = name.toUpperCase()

        await this.checkNameExists(name);

        const data = new Role({
            name,
        })

        const result = await this.roleRepository.save(data);
        return {
            id: result.id
        }
    }

    async update(payloads: any) {
        const { id, name } = payloads;

        await this.checkUniqueName(id, name);

        const data = {
            name,
        }

        const result = await this.roleRepository.update(id, data);
        if (result.affected === 0) {
            throw new InvariantException({
                message: this.locale.t('app.message.updated_fail'),
            });    
        }

        return await this.find(id);
    }

    async delete(id: string) {
        const result = await this.roleRepository.delete(id);        
        return result.affected !== 0;
    }

    async all() {
        return await this.roleRepository.find();
    }

    async find(id: string) {
        const result = await this.roleRepository.findOne({
            where: {
                id,
            },
            select: {
                id: true,
                name: true, 
                created_at: true, 
                updated_at: true,
            }
        });

        if (!result) {
            throw new NotFoundException({
                message: this.locale.t('app.message.data_notfound'),
            });
        }

        return result;
    }

    async checkNameExists(name: string) {
        const nameExist = await this.roleRepository
                            .createQueryBuilder()
                            .where("name = :name", { name })
                            .getExists();

        const validations = [];
        if (nameExist) {
            validations.push({
                path: ['name'],
                message: this.locale.t('validation.common.unique', { attribute: 'name' }),
            })
        }

        if (validations.length) {
            throw new ValidationException({
                message: this.locale.t('app.message.validation_fail'),
                error: joiValidationFormat(validations),
            });
        }
    }

    async checkUniqueName(id: string, name: string) {
        const nameExist = await this.roleRepository
                            .createQueryBuilder()
                            .where("name = :name", { name })
                            .andWhere("id != :id", { id })
                            .getExists();

        const validations = [];
        if (nameExist) {
            validations.push({
                path: ['name'],
                message: this.locale.t('validation.common.unique', { attribute: 'name' }),
            })
        }

        if (validations.length) {
            throw new ValidationException({
                message: this.locale.t('app.message.validation_fail'),
                error: joiValidationFormat(validations),
            });
        }
    }
}
