import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddProviderToUserTable1686735010610 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            "users",
            [
                new TableColumn({
                    name: "provider",
                    length: "50",
                    isNullable: true,
                    type: "varchar",
                }),
                new TableColumn({
                    name: "provider_id",
                    length: "50",
                    isNullable: true,
                    type: "varchar",
                }),
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("users", [
            "provider",
            "provider_id",
        ]);
    }

}
