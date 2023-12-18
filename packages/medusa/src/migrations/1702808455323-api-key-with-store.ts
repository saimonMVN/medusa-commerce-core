import { MigrationInterface, QueryRunner } from "typeorm"

export class ApiKeyWithStore1702808455323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "publishable_api_key" ADD COLUMN "store_id" character varying NOT NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "publishable_api_key" ADD CONSTRAINT "FK_api_key_with_store_id" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "publishable_api_key" DROP CONSTRAINT "FK_api_key_with_store_id"`
        )
        await queryRunner.query(
            `ALTER TABLE "publishable_api_key" DROP COLUMN "store_id"`
        )
    }

}
