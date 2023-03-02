import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterService {
    private readonly users: Array<object> = [];

    register(body: object) {
        this.users.push(body);

        return 'Register successfully!';
    }

    findAll() {
        return this.users;
    }
}
