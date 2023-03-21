/** @module Models/Match */
import TypeORM from "typeorm";
import {User} from "./user";

@TypeORM.Entity()
export class Experience extends TypeORM.BaseEntity {
	@TypeORM.PrimaryGeneratedColumn()
	id: number;

    @TypeORM.ManyToOne((type) => User, (user: User) => user.experience, {
		cascade: true,
		onDelete: "CASCADE"
	})
	user: TypeORM.Relation<User>;

    @TypeORM.Column('text')
	title: string;

    @TypeORM.Column('text')
	experience: string;

    @TypeORM.Column('text')
	sub: string;

    @TypeORM.Column('text')
	date: string;

    @TypeORM.Column('text')
	image: string;

	@TypeORM.CreateDateColumn()
	created_at: string;

	@TypeORM.DeleteDateColumn()
	deleted_at?: string;
}

