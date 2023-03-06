import { nanoid } from 'nanoid';
import { Entity, Column, PrimaryColumn, BeforeInsert, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  createId() {
    this.id = nanoid(16);
  }

}