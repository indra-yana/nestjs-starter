import { FILE_PATH } from 'src/core/common/storage/file-helper';
import { getSkip, paginate, PagingQuery } from 'src/core/helper/pagination';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { joiValidationFormat, randomName, randomPassword, randomUserName } from 'src/core/helper/helper';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { Repository } from 'typeorm';
import { Role } from 'src/core/common/database/typeorm/entities/role';
import { RoleService } from '../role/role.service';
import { StorageService } from 'src/core/common/storage/storage.service';
import { User } from 'src/core/common/database/typeorm/entities/user';
import * as bcrypt from 'bcrypt';
import InvariantException from 'src/core/exceptions/InvariantException';
import NotFoundException from 'src/core/exceptions/NotFoundException';
import ValidationException from 'src/core/exceptions/ValidationException';

@Injectable()
export class UserService {

    private httpRequest: any;

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private locale: LocaleService,
        private storageService: StorageService,
        private roleService: RoleService,
    ) { }

    public setHttpRequest(request: any) {
        this.httpRequest = request;
        return this;
    }

    public getHttpRequest() {
        if (!this.httpRequest) {
            throw new InvariantException({
                message: 'The request object is required',
            });
        }

        return this.httpRequest;
    }

    async create(payload: any, file?: Express.Multer.File, directUpload: boolean = true) {
        const { name, username, email, password } = payload;

        await this.checkUsernameOrEmailExists(username, email);

        const params: Partial<User> = {
            name,
            username,
            email,
            password,
        }

        if (file && directUpload) {
            const request = this.getHttpRequest();
            const uploadedFile = await this.storageService.upload(file, `${FILE_PATH.AVATAR}/${request.user.id}`, request);
            params.avatar = uploadedFile.fileName;
        }

        const data = new User(params);
        const result = await this.usersRepository.save(data);

        return {
            id: result.id
        }
    }

    async uploadAvatar(id: string, file: Express.Multer.File) {
        const request = this.getHttpRequest();
        const uploadedFile = await this.storageService.upload(file, `${FILE_PATH.AVATAR}/${id}`, request);

        await this.patchOneBy(id, 'avatar', uploadedFile.fileName);
    }

    async update(payload: any, file?: Express.Multer.File, directUpload: boolean = true) {
        const { id, name, username, email } = payload;

        await this.checkUniqueUsernameOrEmail(id, username, email);

        const params: any = {
            name,
            username,
            email,
        }

        if (file && directUpload) {
            const request = this.getHttpRequest();
            const uploadedFile = await this.storageService.upload(file, `${FILE_PATH.AVATAR}/${id}`, request);
            params.avatar = uploadedFile.fileName;
        }

        const result = await this.usersRepository.update(id, params);
        if (result.affected === 0) {
            throw new InvariantException({
                message: this.locale.t('app.message.updated_fail'),
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
                avatar: true,
                created_at: true,
                updated_at: true,
                email_verified_at: true,
                roles: true,
            },
            relations: {
                roles: true,
            },
        });

        if (!result) {
            throw new NotFoundException({
                message: this.locale.t('app.message.data_notfound'),
            });
        }

        return result;
    }

    async findOneBy(key: string, value: any) {
        const result = await this.usersRepository.findOneBy({
            [key]: value
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

    async all(query: PagingQuery) {
        const { page, limit } = query;
        const skip = getSkip(page, limit);
        const result = await this.usersRepository.findAndCount({
            select: {
                files: {
                    id: true,
                    name: true,
                    type: true,
                }
            },
            relations: {
                files: true,
                roles: true,
            },
            take: limit,
            skip
        });

        const [data = null, total = 0] = result;
        return paginate(data, page, limit, total);
    }

    async patchOneBy(id: string, key: string, value: any) {
        const updatedUser = {
            [key]: value,
        }

        const result = await this.usersRepository.update(id, updatedUser);
        if (result.affected === 0) {
            throw new InvariantException({
                message: this.locale.t('app.message.updated_fail'),
            });
        }

        return await this.find(id);
    }

    async updatePassword(id: string, password: any) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await this.usersRepository.update(id, {
            password: hashedPassword,
        })

        return result.affected !== 0;
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
                message: this.locale.t('validation.common.unique', { attribute: 'username' }),
            })
        }

        if (emailExist) {
            validations.push({
                path: ['email'],
                message: this.locale.t('validation.common.unique', { attribute: 'email' }),
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
                message: this.locale.t('validation.common.unique', { attribute: 'username' }),
            })
        }

        if (emailExist) {
            validations.push({
                path: ['email'],
                message: this.locale.t('validation.common.unique', { attribute: 'email' }),
            })
        }

        if (validations.length) {
            throw new ValidationException({
                message: this.locale.t('app.message.validation_fail'),
                error: joiValidationFormat(validations),
            });
        }
    }

    async addRole(payloads: any) {
        const { user_id, role_id } = payloads;
        await this.roleService.find(role_id);
        
        const user = await this.find(user_id);
        const isRoleExist = user.roles.find((role: Role) => role.id === role_id);

        if (isRoleExist) {
            throw new InvariantException({
                message: this.locale.t('app.message.role_exist'),
            })
        }

        const role = new Role({
            id: role_id
        });

        user.roles = [...user.roles, role];
        await this.usersRepository.save(user);
        
        return true;
    }

    async removeRole(payloads: any) {
        const { user_id, role_id } = payloads;
        await this.roleService.find(role_id);
        
        const user = await this.find(user_id);
        user.roles = user.roles.filter((role) => role.id !== role_id);

        await this.usersRepository.save(user);

        return true;
    }

    async findOrCreate(payloads: Partial<User>): Promise<User> {
        const { 
            name = randomName(), 
            username = randomUserName(), 
            password = randomPassword(),
            email, 
            avatar,
            provider,
        } = payloads;

        let user = await this.usersRepository.findOne({
            where: { 
                email,
            },
            relations: {
                roles: true,
            },
        });

        if (user) {
            return user;
        }

        user = await this.usersRepository.save(new User({
            name,
            username,
            email,
            password,
            avatar,
            provider,
        }));

        // TODO: Assign roles

        return await this.find(user.id);
    }

}
