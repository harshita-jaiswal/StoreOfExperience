/** @module Models/Match */
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity, JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	Relation
} from "typeorm";
import {User} from "./user";

@Entity()
export class Experience extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

    @ManyToOne((type) => User, (user: User) => user.experience, {
		cascade: true,
		onDelete: "CASCADE"
	})
	user: Relation<User>;

    @Column('text')
	title: string;

    @Column('text')
	experience: string;

    @Column('text')
	sub: string;

    @Column('text')
	date: string;

    @Column('text')
	image: string;

	@CreateDateColumn()
	created_at: string;

	@DeleteDateColumn()
	deleted_at?: string;
}

