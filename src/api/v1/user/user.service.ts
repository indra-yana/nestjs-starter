import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class UserService {
    private readonly users: Array<any>;

    constructor() {
        this.users = [
            {
                userId: 1,
                username: 'john',
                password: 'changeme',
            },
            {
                userId: 2,
                username: 'chris',
                password: 'secret',
            },
            {
                userId: 3,
                username: 'maria',
                password: 'guess',
            },
        ];
    }

    async create(user: any) {
        user['userId'] = nanoid(16);
        this.users.push(user);

        return {
            userId: user.userId,
        };
    }

    async update(user: any) {
        // TODO
    }

    async delete(id: string) {
        // TODO
    }

    async find(userId: string) {
        return this.users.find(user => user.userId == userId);
    }

    async all() {
        return this.users;
    }

}
