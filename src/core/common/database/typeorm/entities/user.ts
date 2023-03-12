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
import BaseEntity from '../base.entity';

@Entity('users')
export class User extends BaseEntity<User>  {

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
	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 10);
	}
}
