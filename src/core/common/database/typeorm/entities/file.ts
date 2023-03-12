import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"
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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
