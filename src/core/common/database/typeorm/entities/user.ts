import { nanoid } from 'nanoid';
import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
	constructor(params?: Partial<User>) {
		if (params) {
			Object.assign(this, params);
		}
	}

	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column({
		unique: true,
	})
	username: string;

	@Column({ select: false })
	password: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column()
	avatar: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;

	@Column({ default: null })
	email_verified_at: Date;

	@BeforeInsert()
	createId() {
		this.id = nanoid(16);
	}

	@BeforeInsert()
	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 10);
	}
}
