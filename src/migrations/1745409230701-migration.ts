import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1745409230701 implements MigrationInterface {
    name = 'Migration1745409230701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "traffic_log" ("id" SERIAL NOT NULL, "ip" character varying NOT NULL, "url" character varying NOT NULL, "method" character varying NOT NULL, "userAgent" character varying NOT NULL, "timestamp" bigint NOT NULL, CONSTRAINT "PK_2b74dead5ccea95bbe303d43694" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "traffic_log"`);
    }

}
