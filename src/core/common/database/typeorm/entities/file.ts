import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { User } from "./user";
import BaseEntity from "../base.entity";

@Entity('files')
export class File extends BaseEntity<File> {
    @PrimaryColumn()
    id: string;

    @Column()
    user_id: string;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column()
    type: string;

    @Column()
    driver: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ select: false })
    deleted_at: Date;

    @ManyToOne(() => User, (user) => user.files)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User
}
