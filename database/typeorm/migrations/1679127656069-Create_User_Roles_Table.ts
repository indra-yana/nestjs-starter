import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"
import { idColumn, dateColumn } from "../general-column.migration";

export class CreateUserRolesTable1679127656069 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_roles",
                columns: [
                    {
                        name: "user_id",
                        length: "16",
                        isNullable: true,
                        type: "varchar",
                    },
                    {
                        name: "role_id",
                        length: "16",
                        isNullable: true,
                        type: "varchar",
                    },
                    ...dateColumn(false),
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        columnNames: ["role_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "roles",
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    }
                ]
            }),
            true,
        );

        // await queryRunner.createForeignKey(
        //     "user_roles",
        //     new TableForeignKey({
        //         columnNames: ["user_id"],
        //         referencedColumnNames: ["id"],
        //         referencedTableName: "users",
        //         onDelete: "CASCADE",
        //         onUpdate: "CASCADE",
        //     }),
        // )
        
        // await queryRunner.createForeignKey(
        //     "user_roles",
        //     new TableForeignKey({
        //         columnNames: ["role_id"],
        //         referencedColumnNames: ["id"],
        //         referencedTableName: "roles",
        //         onDelete: "CASCADE",
        //         onUpdate: "CASCADE",
        //     }),
        // )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_roles");
    }

}
