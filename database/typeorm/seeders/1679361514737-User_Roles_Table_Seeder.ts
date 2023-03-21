import { MigrationInterface, QueryRunner } from "typeorm"
import { User } from "../../../src/core/common/database/typeorm/entities/user";
import { Role } from "../../../src/core/common/database/typeorm/entities/role";

export class UserRolesTableSeeder1679361514737 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const rootUser = await queryRunner.connection
            .getRepository(User)
            .findOne({
                where: {
                    username: 'root',
                },
                relations: {
                    roles: true,
                }
            });

        const role = await queryRunner.connection
            .getRepository(Role)
            .findOneBy({
                name: 'ROOT'
            });

        rootUser.roles = [
            ...rootUser.roles,
            role
        ];

        await queryRunner.connection
            .getRepository(User)
            .save(rootUser);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const role = await queryRunner.connection
            .getRepository(Role)
            .findOneBy({
                name: 'ROOT'
            });

        const role_id = role.id;
        const rootUser = await queryRunner.connection
            .getRepository(User)
            .findOne({
                where: {
                    username: 'root',
                },
                relations: {
                    roles: true,
                }
            });

        rootUser.roles = rootUser.roles.filter((role) => role.id !== role_id);
        await queryRunner.connection
            .getRepository(User)
            .save(rootUser);
    }

}
