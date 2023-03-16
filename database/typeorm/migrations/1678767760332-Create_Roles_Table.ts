import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { idColumn, dateColumn } from "../general-column.migration";

export class CreateRolesTable1678767760332 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "roles",
                columns: [
                    ...idColumn,
                    {
                        name: "name",
                        length: "255",
                        isNullable: false,
                        type: "varchar",
                    },
                    ...dateColumn(),
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("roles");
    }

}
