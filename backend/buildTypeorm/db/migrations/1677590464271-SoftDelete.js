export class SoftDelete1677590464271 {
    name = 'SoftDelete1677590464271';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "match"
        ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users"
        ADD "badwords" integer NOT NULL DEFAULT 0`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users"
        DROP COLUMN "badwords"`);
        await queryRunner.query(`ALTER TABLE "match"
        DROP COLUMN "deleted_at"`);
    }
}
//# sourceMappingURL=1677590464271-SoftDelete.js.map