import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import BaseEntity from "../base.entity";

@Entity('password_resets')
export class PasswordReset extends BaseEntity<PasswordReset> {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;
    
    @Column()
    token: string;
    
    @Column()
    expire_at: number;

    @CreateDateColumn()
    created_at: Date;
}
