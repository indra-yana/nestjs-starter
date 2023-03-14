import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"
import { idColumn, dateColumn } from "../general-column.migration";

export class CreateFilesTable1678768412234 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "files",
                columns: [
                    ...idColumn,
                    {
                        name: "user_id",
                        length: "16",
                        isNullable: true,
                        type: "varchar",
                    },
                    {
                        name: "name",
                        length: "255",
                        isNullable: false,
                        type: "varchar",
                    },
                    {
                        name: "url",
                        length: "255",
                        isNullable: true,
                        default: null,
                        type: "varchar",
                    },
                    {
                        name: "type",
                        length: "50",
                        isNullable: true,
                        default: null,
                        type: "varchar",
                    },
                    ...dateColumn(),
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            "files",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("files");
    }

}
