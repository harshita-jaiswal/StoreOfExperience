/** @module Models/User */
import TypeORM from "typeorm";

import {Experience} from "./experience";

/**
 *  Class representing user table
 */
@TypeORM.Entity({name: "users"})
export class User extends TypeORM.BaseEntity {
	@TypeORM.PrimaryGeneratedColumn()
	id: number;

	@TypeORM.Column({
		length: 100,
		type: "varchar"
	})
	name: string;

	@TypeORM.Column('text')
	email: string;

	@TypeORM.Column('text')
	sub: string;

	@TypeORM.Column('text')
	picture: string;

	// Experience
	@TypeORM.OneToMany((type) => Experience, (e: Experience) => e.user)
	experience: TypeORM.Relation<Experience[]>;

	@TypeORM.CreateDateColumn()
	created_at: string;

	@TypeORM.UpdateDateColumn()
	updated_at: string;
}
