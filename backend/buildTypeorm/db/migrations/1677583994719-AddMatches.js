export class AddMatches1677583994719 {
    name = 'AddMatches1677583994719';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "matcherId" integer NOT NULL, "matcheeId" integer, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_80e61381b28b6b6dd958c13be6d" FOREIGN KEY ("matcherId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_d5b0c1cdda6e33736477797ea70" FOREIGN KEY ("matcheeId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_d5b0c1cdda6e33736477797ea70"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_80e61381b28b6b6dd958c13be6d"`);
        await queryRunner.query(`DROP TABLE "match"`);
    }
}
//# sourceMappingURL=1677583994719-AddMatches.js.map