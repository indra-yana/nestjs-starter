import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddDriverColumnToFilesTable1678939253903 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "files",
            new TableColumn({
                name: "driver",
                type: "varchar",
                length: "12",
                isNullable: true,
                default: null,
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("files", "driver")
    }

}
