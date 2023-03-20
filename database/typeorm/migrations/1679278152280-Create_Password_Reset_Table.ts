import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { idColumn } from "../general-column.migration";

export class CreatePasswordResetTable1679278152280 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "password_resets",
                columns: [
                    ...idColumn,
                    {
                        name: "email",
                        length: "191",
                        isNullable: false,
                        type: "varchar",
                    },
                    {
                        name: "token",
                        isNullable: false,
                        type: "text",
                    },
                    {
                        name: "expire_at",
                        type: "bigint",
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        isNullable: true,
                        default: "now()",
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("password_resets");
    }

}
