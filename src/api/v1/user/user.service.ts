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
        const { name, username, email, password, avatar = null } = payload;

        await this.checkUsernameAndEmailExists(username, email);

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

    async update(user: any) {
        // TODO
    }

    async delete(id: string) {
        // TODO
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

    async checkUsernameAndEmailExists(username: string, email: string) {
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

}
