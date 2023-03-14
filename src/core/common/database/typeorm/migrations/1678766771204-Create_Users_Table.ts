import { dateColumn, idColumn } from "../general-column.migration";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1678766771204 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    ...idColumn,
                    {
                        name: "name",
                        length: "255",
                        isNullable: false,
                        type: "varchar",
                    },
                    {
                        name: "username",
                        length: "191",
                        isNullable: true,
                        isUnique: true,
                        type: "varchar",
                    },
                    {
                        name: "email",
                        length: "191",
                        isNullable: false,
                        isUnique: true,
                        type: "varchar",
                    },
                    {
                        name: "password",
                        isNullable: false,
                        type: "text",
                    },
                    {
                        name: "avatar",
                        length: "255",
                        isNullable: true,
                        type: "varchar",
                        default: null,
                    },
                    {
                        name: "avatar_url",
                        length: "255",
                        isNullable: true,
                        type: "varchar",
                        default: null,
                    },
                    ...dateColumn(),
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
