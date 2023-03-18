export class initialize1679092974036 {
    name = 'initialize1679092974036';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "experience" ("id" SERIAL NOT NULL, "title" text NOT NULL, "experience" text NOT NULL, "sub" text NOT NULL, "date" text NOT NULL, "image" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" integer, CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" text NOT NULL, "sub" text NOT NULL, "picture" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_cbfb1d1219454c9b45f1b3c4274" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_cbfb1d1219454c9b45f1b3c4274"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "experience"`);
    }
}
//# sourceMappingURL=1679092974036-initialize.js.map