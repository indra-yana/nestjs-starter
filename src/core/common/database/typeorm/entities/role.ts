import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import BaseEntity from '../base.entity';
import { User } from './user';

@Entity('roles')
export class Role extends BaseEntity<Role> {

	@PrimaryColumn()
	id: string;

	@Column({ unique: true })
	name: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;

	@ManyToMany(() => User)
	@JoinTable({
		name: 'user_roles',
		inverseJoinColumn: {
			name: 'user_id',
			referencedColumnName: 'id'
		},
		joinColumn: {
			name: 'role_id',
			referencedColumnName: 'id'
		}
	})
	users: User[];

	@BeforeInsert()
    formatName() {
        this.name = this.name.toUpperCase();
    }
}
