import { faker } from '@faker-js/faker';
import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../../../src/core/common/database/typeorm/entities/user";

export class UsersTableSeeder1679300204635 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        faker.setLocale('id_ID');
        const users: Partial<User>[] = [];

        users.push(new User({
            name: 'root',
            username: 'root',
            email: 'root@comsys.id',
            password: 'secret',
        }));

        for (let i = 0; i < 50; i++) {
            const sex = faker.name.sexType();
            const firstName = faker.name.firstName(sex);
            const lastName = faker.name.lastName();
            const username = faker.random.alphaNumeric(8);
            const email = faker.helpers.unique(faker.internet.email, [
                firstName,
                lastName,
            ]).toLowerCase();

            users.push(new User({
                name: `${firstName} ${lastName}`,
                username,
                email,
                password: 'secret',
            }));
        }

        await queryRunner.connection
            .getRepository(User)
            .insert(users);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.connection
            .createQueryBuilder()
            .delete()
            .from(User)
            .execute()
    }

}
