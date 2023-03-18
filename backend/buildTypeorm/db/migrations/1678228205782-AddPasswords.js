export class AddPasswords1678228205782 {
    name = 'AddPasswords1678228205782';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_80e61381b28b6b6dd958c13be6d"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_d5b0c1cdda6e33736477797ea70"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" text NOT NULL DEFAULT '$2b$04$LshqQGvmiilmipW4jtM9p.8Fb.11l2Pr4BgitSClcItIQtzfCaYO6'`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_80e61381b28b6b6dd958c13be6d" FOREIGN KEY ("matcherId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_d5b0c1cdda6e33736477797ea70" FOREIGN KEY ("matcheeId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_d5b0c1cdda6e33736477797ea70"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_80e61381b28b6b6dd958c13be6d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_d5b0c1cdda6e33736477797ea70" FOREIGN KEY ("matcheeId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_80e61381b28b6b6dd958c13be6d" FOREIGN KEY ("matcherId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
//# sourceMappingURL=1678228205782-AddPasswords.js.map