import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { Repository } from 'typeorm';
import { User } from 'src/core/common/database/typeorm/entities/user';
import NotFoundException from 'src/core/exceptions/NotFoundException';
import ValidationException from 'src/core/exceptions/ValidationException';
import { joiValidationFormat } from 'src/core/helper/helper';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private locale: LocaleService
    ) { }

    async create(payload: any) {
        const { name, username, email, password, avatar } = payload;

        await this.checkUsernameOrEmailExists(username, email);

        const newUser = new User({
            name,
            username,
            email,
            avatar,
            password,
        })

        const result = await this.usersRepository.save(newUser);
        return {
            id: result.id
        }
    }

    async update(payload: any) {
        const { id, name, username, email, avatar } = payload;

        await this.checkUniqueUsernameOrEmail(id, username, email);

        const updatedUser = {
            name,
            username,
            email,
            avatar,
        }

        const result = await this.usersRepository.update(id, updatedUser);
        if (result.affected === 0) {
            throw new NotFoundException({
                message: this.locale.t('app.message.data_notfound'),
            });    
        }

        return await this.find(id);
    }

    async delete(id: string) {
        const result = await this.usersRepository.delete(id);        
        return result.affected !== 0;
    }

    async find(userId: string, password: boolean = false) {
        const result = await this.usersRepository.findOne({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true, 
                username: true, 
                password, 
                email: true,
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

    async findWithCredential(credential: object) {
        const key = credential['username'] ? 'username' : 'email';        
        const result = await this.usersRepository.findOne({
            where: {
                [key]: credential[key],
            },
            select: {
                id: true,
                username: true,
                email: true,
                password: true,
            },
        });

        return result;
    }

    async all() {
        return await this.usersRepository.find();
    }

    async checkUsernameOrEmailExists(username: string, email: string) {
        const usernameExist = await this.usersRepository
                            .createQueryBuilder()
                            .where("username = :username", { username })
                            .getExists();

        const emailExist = await this.usersRepository
                            .createQueryBuilder()
                            .where("email = :email", { email })
                            .getExists();

        const validations = [];
        if (usernameExist) {
            validations.push({
                path: ['username'],
                message: this.locale.t('validation.common.unique', { args: { attribute: 'username' } }),
            })
        }

        if (emailExist) {
            validations.push({
                path: ['email'],
                message: this.locale.t('validation.common.unique', { args: { attribute: 'email' } }),
            })
        }

        if (validations.length) {
            throw new ValidationException({
                message: this.locale.t('app.message.validation_fail'),
                error: joiValidationFormat(validations),
            });
        }
    }

    async checkUniqueUsernameOrEmail(id: string, username: string, email: string) {
        const usernameExist = await this.usersRepository
                            .createQueryBuilder()
                            .where("username = :username", { username })
                            .andWhere("id != :id", { id })
                            .getExists();
        
        const emailExist = await this.usersRepository
                            .createQueryBuilder()
                            .where("email = :email", { email })
                            .andWhere("id != :id", { id })
                            .getExists();

        const validations = [];
        if (usernameExist) {
            validations.push({
                path: ['username'],
                message: this.locale.t('validation.common.unique', { args: { attribute: 'username' } }),
            })
        }

        if (emailExist) {
            validations.push({
                path: ['email'],
                message: this.locale.t('validation.common.unique', { args: { attribute: 'email' } }),
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
