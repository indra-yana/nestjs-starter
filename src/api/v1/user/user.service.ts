import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocaleService } from 'src/core/common/service/locale.service';
import { Repository } from 'typeorm';
import { User } from 'src/core/common/database/typeorm/entities/user.entity';
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

    async find(userId: string) {
        const result = await this.usersRepository.findOne({
            where: {
                id: userId,
            }
        });

        if (!result) {
            throw new NotFoundException({
                message: this.locale.t('app.message.data_notfound'),
            });
        }

        return result;
    }

    async all() {
        return await this.usersRepository.find();
    }

}
