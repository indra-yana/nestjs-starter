import { User } from "../../../src/core/common/database/typeorm/entities/user";
import { MigrationInterface, QueryRunner } from "typeorm";
import { nanoid } from "nanoid";

export class UsersTableSeeder1679300204635 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // TODO: Handle seeder up and down
        const user: Partial<User> = new User({
            id: nanoid(16),
            name: "root",
            username: "root",
            email: "root@comsys.id",
            password: "secret",
        })

        const result = await queryRunner.connection
                            .getRepository(User)
                            .save(user);        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
