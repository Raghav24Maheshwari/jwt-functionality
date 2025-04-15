import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744289571024 implements MigrationInterface {
    name = 'Migration1744289571024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "otp" ("userId" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "otp" character varying NOT NULL, "timestamp" bigint NOT NULL, CONSTRAINT "PK_db724db1bc3d94ad5ba38518433" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "otp"`);
    }

}
