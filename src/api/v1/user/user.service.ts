import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocaleService } from 'src/core/common/locale/locale.service';
import { Repository } from 'typeorm';
import { User } from 'src/core/common/database/typeorm/entities/user';
import NotFoundException from 'src/core/exceptions/NotFoundException';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private locale: LocaleService
    ) { }

    async create(user: any) {
        // TODO
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

}
